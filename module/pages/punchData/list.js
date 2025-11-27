// Plain JS implementation inspired by the original React PunchDataList component.
(function () {
    const employeeCode = "<?php echo isset($employeeCode) ? addslashes($employeeCode) : ''; ?>";

    // Dummy JSON data for development (per month)
    // Keyed by "YYYY-MM" and then by date "YYYY-MM-DD"
    const dummyAttendanceByMonth = {
        "2025-04": {
            "2025-04-01": {
                primaryShiftInTime: "09:00",
                primaryShiftOutTime: "18:00",
                primaryShift: "General",
                presentStatus: "P",
                late: 0,
                pr: 0,
                earlyGoing: 0,
                OT: 1,
                OD: 0,
                WorkingHrs: 9
            },
            "2025-04-02": {
                primaryShiftInTime: "09:20",
                primaryShiftOutTime: "18:00",
                primaryShift: "General",
                presentStatus: "P",
                late: 1,
                pr: 0,
                earlyGoing: 0,
                OT: 0,
                OD: 0,
                WorkingHrs: 8.5
            },
            "2025-04-03": {
                primaryShiftInTime: "",
                primaryShiftOutTime: "",
                primaryShift: "General",
                presentStatus: "A",
                late: 0,
                pr: 0,
                earlyGoing: 0,
                OT: 0,
                OD: 0,
                WorkingHrs: 0
            },
            "2025-04-06": {
                // Sunday with no punches -> WO
                primaryShiftInTime: "",
                primaryShiftOutTime: "",
                primaryShift: "General",
                presentStatus: "WO",
                late: 0,
                pr: 0,
                earlyGoing: 0,
                OT: 0,
                OD: 0,
                WorkingHrs: 0
            },
            "2025-04-07": {
                // Example of MSP (in punch but no out punch)
                primaryShiftInTime: "09:02",
                primaryShiftOutTime: "",
                primaryShift: "General",
                presentStatus: "P",
                late: 0,
                pr: 0,
                earlyGoing: 0,
                OT: 0,
                OD: 0,
                WorkingHrs: 4
            }
        }
    };

    // Dummy leave data (per month)
    // Array of leave objects with fromDate, toDate, leaveCategory, remarks
    const dummyLeaveByMonth = {
        "2025-04": [
            {
                fromDate: "2025-04-04",
                toDate: "2025-04-05",
                leaveCategory: "CL",
                remarks: "Casual leave - personal work"
            }
        ]
    };

    // State
    let monthOptions = [];
    let currentMonthValue = "";
    let isLoading = false;
    let errorMessage = null;

    let apiAttendanceData = null;
    let attendanceData = [];
    let leaveData = [];
    let leaveMap = new Map();

    let attendanceStats = {
        present: 0,
        absent: 0,
        weekOff: 0,
        msp: 0,
        ot: 0,
        od: 0,
        late: 0,
        ws: 0,
        pa: 0
    };

    // DOM helpers
    function qs(id) {
        return document.getElementById(id);
    }

    // Generate month options based on available dummy data
    function generateMonthOptions() {
        const options = [];
        const keys = Object.keys(dummyAttendanceByMonth);
        keys.sort(); // chronological

        keys.forEach(function (value) {
            const [year, month] = value.split('-');
            const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
            const label = d.toLocaleDateString('en-US', {month: 'long', year: 'numeric'});
            options.push({ value, label });
        });

        monthOptions = options;
    }

    function populateMonthSelect() {
        const select = qs('monthSelect');
        select.innerHTML = "";
        monthOptions.forEach(function (opt) {
            const optionEl = document.createElement('option');
            optionEl.value = opt.value;
            optionEl.textContent = opt.label;
            select.appendChild(optionEl);
        });
    }

    function setMonth(value) {
        currentMonthValue = value;
        const labelSpan = qs('attendanceMonthLabel');
        const found = monthOptions.find(function (o) {
            return o.value === value;
        });
        labelSpan.textContent = found ? found.label : 'Select Month';
    }

    // Populate leave data from dummy JSON for the given month
    function populateDummyLeaveForMonth(monthValue) {
        leaveData = [];
        leaveMap = new Map();

        const monthLeaves = dummyLeaveByMonth[monthValue] || [];
        leaveData = monthLeaves;

        monthLeaves.forEach(function (leave) {
            const startDate = new Date(leave.fromDate);
            const endDate = new Date(leave.toDate);
            for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
                const dateKey = d.toISOString().split('T')[0];
                leaveMap.set(dateKey, leave);
            }
        });
    }

    function getLeaveForDate(dateKey) {
        return leaveMap.get(dateKey) || null;
    }

    // Attendance data using dummy JSON instead of API
    function fetchAttendanceData(monthValue) {
        if (!monthValue) return;

        isLoading = true;
        errorMessage = null;
        renderTable(); // show loading row
        updateStatsUI();

        try {
            // Get dummy data for selected month
            const monthData = dummyAttendanceByMonth[monthValue];

            // Also populate leave data for this month from dummy JSON
            populateDummyLeaveForMonth(monthValue);

            if (monthData) {
                apiAttendanceData = monthData;
                attendanceData = processAttendanceData(monthData, monthValue);
                calculateStats(monthData);
                errorMessage = null;
            } else {
                apiAttendanceData = null;
                attendanceData = [];
                errorMessage = 'No dummy attendance data for selected month';
            }
        } catch (e) {
            console.error('Error loading dummy attendance data:', e);
            apiAttendanceData = null;
            attendanceData = [];
            errorMessage = e && e.message ? e.message : 'An unexpected error occurred while loading attendance data';
        }

        isLoading = false;
        renderTable();
        updateStatsUI();
    }

    function processAttendanceData(apiData, monthValue) {
        if (!apiData || !monthValue) return [];

        const parts = monthValue.split('-');
        const yearNum = parseInt(parts[0], 10);
        const monthNum = parseInt(parts[1], 10) - 1; // 0-indexed

        const daysInMonth = new Date(yearNum, monthNum + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const processed = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = parts[0] + '-' + parts[1] + '-' + String(day).padStart(2, '0');
            const date = new Date(yearNum, monthNum, day);
            const dayName = date.toLocaleDateString('en-US', {weekday: 'long'});

            const dayData = apiData[dateKey] || {};

            const isFutureDate = date > today;
            const isSunday = dayName === 'Sunday';

            const hasInPunch = dayData.primaryShiftInTime || dayData.SecondaryShiftInTime || dayData.ThirdShiftInTime;
            const hasPrimaryOutPunch = dayData.primaryShiftOutTime;
            const hasSecondaryOutPunch = dayData.SecondaryShiftOutTime;
            const hasThirdOutPunch = dayData.ThirdShiftOutTime;
            const hasAnyPunch = hasInPunch || hasPrimaryOutPunch || hasSecondaryOutPunch || hasThirdOutPunch;
            const isDateBeforeToday = date < today;

            const shouldDisableSunday = isSunday && !hasAnyPunch;

            let effectiveStatus = dayData.presentStatus || '';
            if (hasInPunch && !hasPrimaryOutPunch && !hasSecondaryOutPunch && !hasThirdOutPunch &&
                isDateBeforeToday && !isSunday) {
                effectiveStatus = 'MSP';
            }

            processed.push({
                day: day,
                dayName: dayName,
                dateKey: dateKey,
                date: date,
                isFutureDate: isFutureDate,
                isSunday: isSunday,
                shouldDisableSunday: shouldDisableSunday,
                hasAnyPunch: hasAnyPunch,
                isDateBeforeToday: isDateBeforeToday,
                primaryInTime: dayData.primaryShiftInTime || '',
                primaryOutTime: dayData.primaryShiftOutTime || '',
                primaryShiftName: dayData.primaryShift || '',
                secondaryInTime: dayData.SecondaryShiftInTime || '',
                secondaryOutTime: dayData.SecondaryShiftOutTime || '',
                secondaryShiftName: dayData.SecondaryShift || '',
                thirdInTime: dayData.ThirdShiftInTime || '',
                thirdOutTime: dayData.ThirdShiftOutTime || '',
                thirdShiftName: dayData.ThirdShift || '',
                status: effectiveStatus,
                originalStatus: dayData.presentStatus || '',
                late: dayData.late || 0,
                pr: dayData.pr || 0,
                earlyGoing: dayData.earlyGoing || 0,
                ot: dayData.OT || 0,
                od: dayData.OD || 0,
                workingHrs: dayData.WorkingHrs || 0,
                hasInPunch: hasInPunch,
                hasPrimaryOutPunch: hasPrimaryOutPunch,
                hasSecondaryOutPunch: hasSecondaryOutPunch,
                hasThirdOutPunch: hasThirdOutPunch,
                shouldShowMSP: hasInPunch && !hasPrimaryOutPunch && !hasSecondaryOutPunch && !hasThirdOutPunch &&
                    isDateBeforeToday && !shouldDisableSunday
            });
        }

        return processed;
    }

    function calculateStats(apiData) {
        if (!apiData) return;

        let present = 0, absent = 0, weekOff = 0, msp = 0, late = 0, ot = 0, od = 0, ws = 0, pa = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        Object.keys(apiData).forEach(function (dateKey) {
            const dayData = apiData[dateKey];
            const parts = dateKey.split('-');
            const currentDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
            const dayName = currentDate.toLocaleDateString('en-US', {weekday: 'long'});
            const isSunday = dayName === 'Sunday';
            const isDateBeforeToday = currentDate < today;

            const hasInPunch = dayData.primaryShiftInTime || dayData.SecondaryShiftInTime || dayData.ThirdShiftInTime;
            const hasPrimaryOutPunch = dayData.primaryShiftOutTime;
            const hasSecondaryOutPunch = dayData.SecondaryShiftOutTime;
            const hasThirdOutPunch = dayData.ThirdShiftOutTime;
            const hasAnyPunch = hasInPunch || hasPrimaryOutPunch || hasSecondaryOutPunch || hasThirdOutPunch;
            const shouldDisableSunday = isSunday && !hasAnyPunch;
            const shouldBeMSP = hasInPunch && !hasPrimaryOutPunch && !hasSecondaryOutPunch && !hasThirdOutPunch &&
                isDateBeforeToday && !shouldDisableSunday;

            const effectiveStatus = shouldBeMSP ? 'MSP' : dayData.presentStatus;

            switch (effectiveStatus) {
                case 'P':
                    present++;
                    break;
                case 'A':
                    absent++;
                    break;
                case 'WO':
                    weekOff++;
                    break;
                case 'MSP':
                    msp++;
                    break;
                case 'WS':
                    ws++;
                    break;
                case 'P/A':
                    pa++;
                    break;
                case 'WR':
                    present++;
                    break;
            }

            if (dayData.late > 0) late++;
            if (dayData.OT > 0) ot += dayData.OT;
            if (dayData.OD > 0) od += dayData.OD;
        });

        attendanceStats = {present, absent, weekOff, msp, late, ot, od, ws, pa};
    }

    function updateStatsUI() {
        qs('statPresent').textContent = isLoading ? '-' : String(attendanceStats.present);
        qs('statAbsent').textContent = isLoading ? '-' : String(attendanceStats.absent);
        qs('statWS').textContent = isLoading ? '-' : String(attendanceStats.ws);
        qs('statWO').textContent = isLoading ? '-' : String(attendanceStats.weekOff);
        qs('statMSP').textContent = isLoading ? '-' : String(attendanceStats.msp);
        qs('statPA').textContent = isLoading ? '-' : String(attendanceStats.pa);
        qs('statOT').textContent = isLoading ? '-' : String(attendanceStats.ot);
        qs('statOD').textContent = isLoading ? '-' : String(attendanceStats.od);
        qs('statLate').textContent = isLoading ? '-' : String(attendanceStats.late);
    }

    function getStatusBadgeHTML(status, isImportant, shouldShowMSP) {
        const importantClass = isImportant ? 'attendance-important ring-2 ring-offset-1' : '';

        switch (status) {
            case 'P':
                return '<span class="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs rounded-full font-medium">P</span>';
            case 'A':
                return '<span class="inline-flex items-center justify-center w-6 h-6 bg-red-600 text-white text-xs rounded-full font-bold shadow-lg ' +
                    importantClass + ' ring-red-300">A</span>';
            case 'L':
                return '<span class="inline-flex items-center px-2 py-1 bg-orange-600 text-white text-xs rounded font-bold shadow-lg ' +
                    importantClass + ' ring-orange-300">LATE</span>';
            case 'WO':
                return '<span class="inline-flex items-center px-2 py-1 bg-gray-400 text-white text-xs rounded font-medium">W.O</span>';
            case 'WR':
                return '<span class="inline-flex items-center px-2 py-1 bg-blue-600 text-white text-xs rounded font-bold shadow-lg ' +
                    importantClass + ' ring-blue-300">WR</span>';
            case 'MSP':
                return '<span class="inline-flex items-center px-2 py-1 ' +
                    (shouldShowMSP
                        ? 'bg-red-500 attendance-important ring-2 ring-red-300 ring-offset-1'
                        : 'bg-cyan-500') +
                    ' text-white text-xs rounded font-medium shadow-lg">MSP</span>';
            case 'WS':
                return '<span class="inline-flex items-center px-2 py-1 bg-yellow-500 text-white text-xs rounded font-medium">W.S</span>';
            case 'P/A':
                return '<span class="inline-flex items-center px-2 py-1 bg-purple-500 text-white text-xs rounded font-medium">P/A</span>';
            default:
                if (!status) return '';
                return '<span class="inline-flex items-center px-2 py-1 bg-gray-300 text-gray-700 text-xs rounded font-medium">' +
                    status + '</span>';
        }
    }

    function renderTable() {
        const tbody = qs('attendanceTableBody');
        if (!tbody) return;
        tbody.innerHTML = '';

        if (isLoading) {
            const row = document.createElement('tr');
            row.innerHTML =
                '<td colspan="14" class="px-2 py-4 border text-center">' +
                '<div class="flex items-center justify-center">' +
                '<div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-2"></div>' +
                'Loading attendance data...' +
                '</div>' +
                '</td>';
            tbody.appendChild(row);
            return;
        }

        if (errorMessage) {
            const row = document.createElement('tr');
            row.innerHTML =
                '<td colspan="14" class="px-2 py-4 border text-center">' +
                '<div class="text-red-500">' +
                '<i class="ri-error-warning-line text-xl mb-2 block"></i>' +
                '<div class="font-medium">Error loading attendance data</div>' +
                '<div class="text-sm mt-1">' + errorMessage + '</div>' +
                '<button id="retryAttendanceBtn" class="mt-3 px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">Try Again</button>' +
                '</div>' +
                '</td>';
            tbody.appendChild(row);

            const retryBtn = document.getElementById('retryAttendanceBtn');
            if (retryBtn) {
                retryBtn.addEventListener('click', function () {
                    if (currentMonthValue) {
                        fetchAttendanceData(currentMonthValue);
                    }
                });
            }
            return;
        }

        if (!attendanceData || attendanceData.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML =
                '<td colspan="14" class="px-2 py-4 border text-center text-gray-500">' +
                '<i class="ri-calendar-line text-2xl mb-2 block"></i>' +
                'No attendance data available for selected month' +
                '</td>';
            tbody.appendChild(row);
            return;
        }

        attendanceData.forEach(function (rowData) {
            const leaveInfo = getLeaveForDate(rowData.dateKey);
            const hasLeave = !!leaveInfo;

            let rowClasses = '';
            let isDisabled = false;

            if (hasLeave && leaveInfo.leaveCategory !== 'Permission') {
                rowClasses = 'bg-red-100 hover:bg-red-200';
                isDisabled = false;
            } else if (rowData.isFutureDate) {
                rowClasses = 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60 select-none';
                isDisabled = true;
            } else if (rowData.shouldDisableSunday) {
                rowClasses = 'bg-gray-50 text-gray-500 opacity-75';
                isDisabled = true;
            } else if (rowData.isSunday && rowData.hasAnyPunch) {
                rowClasses = 'bg-blue-50 hover:bg-blue-100 border-l-4 border-blue-400';
                isDisabled = false;
            } else {
                rowClasses = 'bg-white hover:bg-gray-50';
            }

            const isImportantStatus = ['WR', 'A', 'L'].indexOf(rowData.status) !== -1;

            const tr = document.createElement('tr');
            tr.className = rowClasses;
            let title = '';
            if (hasLeave) {
                title = 'Leave: ' + (leaveInfo.remarks || '');
            } else if (rowData.isFutureDate) {
                title = 'Future date - No data available';
            } else if (rowData.shouldDisableSunday) {
                title = 'Sunday - No punch data';
            } else if (rowData.isSunday && rowData.hasAnyPunch) {
                title = 'Working Sunday - Punch data available';
            }
            tr.title = title;

            let dayIcons = '';
            if (hasLeave && leaveInfo.leaveCategory !== 'Permission') {
                dayIcons += '<span class="text-xs text-green-600 ml-1">🏖️</span>';
            }
            if (rowData.isFutureDate) {
                dayIcons += '<span class="text-xs text-gray-400 ml-1">📅</span>';
            }
            if (rowData.shouldDisableSunday) {
                dayIcons += '<span class="text-xs text-gray-400 ml-1">🚫</span>';
            }
            if (rowData.isSunday && rowData.hasAnyPunch) {
                dayIcons += '<span class="text-xs text-blue-600 ml-1">💼</span>';
            }

            let html = '';
            html += '<td class="px-2 py-1 border text-center">' + rowData.day + dayIcons + '</td>';
            html += '<td class="px-2 py-1 border">' + rowData.dayName + '</td>';

            if (hasLeave && leaveInfo.leaveCategory !== 'Permission') {
                html += '<td colspan="12" class="px-2 py-1 border text-center">' +
                    '<div class="flex items-center justify-center space-x-2">' +
                    '<span class="font-medium text-sm">' + (leaveInfo.leaveCategory || 'Leave') + ' :</span>' +
                    '<span class="text-sm italic">' + (leaveInfo.remarks || '') + '</span>' +
                    '</div>' +
                    '</td>';
                tr.innerHTML = html;
                tbody.appendChild(tr);
                return;
            }

            function cellTimeContent(inTime, outTime, shouldShowMSPFlag) {
                const hasIn = !!inTime;
                const hasOut = !!outTime;
                if (isDisabled) return '-';
                if (hasOut) return outTime;
                if (shouldShowMSPFlag && hasIn && !hasOut) {
                    return '<span class="text-red-600 font-bold text-xs animate-pulse">Missing</span>';
                }
                return hasIn ? inTime : '';
            }

            const primaryMissing = rowData.shouldShowMSP && rowData.primaryInTime && !rowData.primaryOutTime;
            const secondaryMissing = rowData.shouldShowMSP && rowData.secondaryInTime && !rowData.secondaryOutTime;
            const thirdMissing = rowData.shouldShowMSP && rowData.thirdInTime && !rowData.thirdOutTime;

            html += '<td class="px-2 py-1 border text-center text-xs ' +
                (primaryMissing ? 'missing-punch-cell border-2' : '') + '">' +
                (isDisabled ? '-' : (rowData.primaryInTime || '')) + '</td>';
            html += '<td class="px-2 py-1 border text-center text-xs ' +
                (primaryMissing ? 'missing-punch-cell border-2' : '') + '">' +
                (isDisabled ? '-' : cellTimeContent(rowData.primaryInTime, rowData.primaryOutTime, rowData.shouldShowMSP)) + '</td>';

            html += '<td class="px-2 py-1 border text-center text-xs ' +
                (secondaryMissing ? 'missing-punch-cell border-2' : '') + '">' +
                (isDisabled ? '-' : (rowData.secondaryInTime || '')) + '</td>';
            html += '<td class="px-2 py-1 border text-center text-xs ' +
                (secondaryMissing ? 'missing-punch-cell border-2' : '') + '">' +
                (isDisabled ? '-' : cellTimeContent(rowData.secondaryInTime, rowData.secondaryOutTime, rowData.shouldShowMSP)) + '</td>';

            html += '<td class="px-2 py-1 border text-center text-xs ' +
                (thirdMissing ? 'missing-punch-cell border-2' : '') + '">' +
                (isDisabled ? '-' : (rowData.thirdInTime || '')) + '</td>';
            html += '<td class="px-2 py-1 border text-center text-xs ' +
                (thirdMissing ? 'missing-punch-cell border-2' : '') + '">' +
                (isDisabled ? '-' : cellTimeContent(rowData.thirdInTime, rowData.thirdOutTime, rowData.shouldShowMSP)) + '</td>';

            // Late
            html += '<td class="px-2 py-1 border text-center">';
            if (!isDisabled && rowData.late > 0) {
                html += '<span class="inline-flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs rounded-full">' +
                    rowData.late + '</span>';
            }
            html += '</td>';

            // P.R
            html += '<td class="px-2 py-1 border text-center">';
            if (!isDisabled && rowData.pr > 0) {
                html += '<span class="inline-flex items-center justify-center w-6 h-6 bg-orange-500 text-white text-xs rounded-full">' +
                    rowData.pr + '</span>';
            }
            html += '</td>';

            // E.G
            html += '<td class="px-2 py-1 border text-center">';
            if (!isDisabled && rowData.earlyGoing > 0) {
                html += '<span class="inline-flex items-center justify-center w-6 h-6 bg-yellow-500 text-white text-xs rounded-full">' +
                    rowData.earlyGoing + '</span>';
            }
            html += '</td>';

            // OT
            html += '<td class="px-2 py-1 border text-center">';
            if (!isDisabled && rowData.ot > 0) {
                html += '<span class="inline-flex items-center justify-center w-6 h-6 bg-green-500 text-white text-xs rounded-full font-medium">' +
                    rowData.ot + '</span>';
            }
            html += '</td>';

            // OD
            html += '<td class="px-2 py-1 border text-center">';
            if (!isDisabled && rowData.od > 0) {
                html += '<span class="inline-flex items-center justify-center w-6 h-6 bg-cyan-600 text-white text-xs rounded-full font-medium">' +
                    rowData.od + '</span>';
            }
            html += '</td>';

            // Status
            html += '<td class="px-2 py-1 border text-center">';
            if (isDisabled) {
                html += '<span class="text-gray-400 text-xs">-</span>';
            } else {
                html += getStatusBadgeHTML(rowData.status, isImportantStatus, rowData.shouldShowMSP);
            }
            html += '</td>';

            tr.innerHTML = html;
            tbody.appendChild(tr);
        });
    }

    function openPrintModal() {
        const modal = qs('printModal');
        if (!modal) return;
        modal.classList.remove('hidden');
    }

    function closePrintModal() {
        const modal = qs('printModal');
        if (!modal) return;
        modal.classList.add('hidden');
    }

    function openFilterSidebar() {
        const wrapper = qs('filterSidebarWrapper');
        const panel = qs('filterSidebarPanel');
        if (!wrapper || !panel) return;
        wrapper.classList.remove('pointer-events-none');
        wrapper.classList.add('opacity-100');
        wrapper.classList.remove('opacity-0');
        panel.classList.remove('translate-x-full');
        panel.classList.add('translate-x-0');
    }

    function closeFilterSidebar() {
        const wrapper = qs('filterSidebarWrapper');
        const panel = qs('filterSidebarPanel');
        if (!wrapper || !panel) return;
        wrapper.classList.add('pointer-events-none');
        wrapper.classList.remove('opacity-100');
        wrapper.classList.add('opacity-0');
        panel.classList.add('translate-x-full');
        panel.classList.remove('translate-x-0');
    }

    function resetFilters() {
        const from = qs('fromDateInput');
        const to = qs('toDateInput');
        const group = qs('groupSelect');
        const section = qs('sectionSelect');
        if (from) from.value = '';
        if (to) to.value = '';
        if (group) group.value = '';
        if (section) section.value = '';
        const radios = document.querySelectorAll('input[name="reportType"]');
        radios.forEach(function (r) {
            if (r.value === 'sectionWise') r.checked = true;
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        generateMonthOptions();
        populateMonthSelect();

        const select = qs('monthSelect');
        if (monthOptions.length > 0) {
            // Default to first available dummy month
            const first = monthOptions[0];
            select.value = first.value;
            setMonth(first.value);
            fetchAttendanceData(first.value);
        } else {
            setMonth('');
        }

        select.addEventListener('change', function () {
            const value = select.value;
            setMonth(value);
            if (value) fetchAttendanceData(value);
        });

        const currentMonthBtn = qs('currentMonthBtn');
        if (currentMonthBtn) {
            currentMonthBtn.addEventListener('click', function () {
                if (!monthOptions.length) return;
                // current month button will just switch back to first dummy month in this demo setup
                const first = monthOptions[0];
                qs('monthSelect').value = first.value;
                setMonth(first.value);
                fetchAttendanceData(first.value);
            });
        }

        // Print modal
        const openPrintBtn = qs('openPrintModalBtn');
        const closePrintBtn = qs('closePrintModalBtn');
        const printBtn = qs('printModalPrintBtn');
        if (openPrintBtn) openPrintBtn.addEventListener('click', openPrintModal);
        if (closePrintBtn) closePrintBtn.addEventListener('click', closePrintModal);
        if (printBtn) printBtn.addEventListener('click', function () {
            window.print();
        });

        // Filter sidebar
        const openFilterBtn = qs('openFilterSidebarBtn');
        const closeFilterBtn = qs('closeFilterSidebarBtn');
        const backdrop = qs('filterSidebarBackdrop');
        const resetBtn = qs('resetFilterBtn');
        const applyBtn = qs('applyFilterBtn');

        if (openFilterBtn) openFilterBtn.addEventListener('click', openFilterSidebar);
        if (closeFilterBtn) closeFilterBtn.addEventListener('click', closeFilterSidebar);
        if (backdrop) backdrop.addEventListener('click', closeFilterSidebar);
        if (resetBtn) resetBtn.addEventListener('click', function () {
            resetFilters();
            closeFilterSidebar();
        });
        if (applyBtn) applyBtn.addEventListener('click', function () {
            // Currently filters only affect UI; hook into fetchAttendanceData if needed.
            closeFilterSidebar();
        });
    });
})();