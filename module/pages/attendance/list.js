(function() {
    'use strict';

    // Mock Data
    const mockGroupsData = [
        {
            id: "group_001",
            name: "Production Team A",
            department: "Manufacturing",
            isFullyApproved: false,
            overallScore: 43,
            groupApprovalStatus: "Pending",
            shifts: [
                {
                    id: "shift_001",
                    name: "Morning Shift",
                    startTime: "06:00 AM",
                    endTime: "02:00 PM",
                    approvalStatus: "Pending",
                    score: 80,
                    members: [
                        { id: "1", name: "Rajesh Kumar", empCode: "EMP001", designation: "Supervisor", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", inTime: "06:15 AM", outTime: "02:10 PM", status: 0, approved: true, late: "15 min", permission: null, earlyGoing: null, overtime: "10 min" },
                        { id: "2", name: "Priya Sharma", empCode: "EMP002", designation: "Operator", photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", inTime: "06:05 AM", outTime: "02:00 PM", status: 1, approved: true, late: null, permission: "1 hour", earlyGoing: null, overtime: null },
                        { id: "3", name: "Amit Singh", empCode: "EMP003", designation: "Technician", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", inTime: "06:30 AM", outTime: null, status: 1, approved: false, late: "30 min", permission: null, earlyGoing: null, overtime: null },
                        { id: "4", name: "Sunita Devi", empCode: "EMP004", designation: "Helper", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", inTime: "06:05 AM", outTime: null, status: 1, approved: false, late: null, permission: null, earlyGoing: "30 min", overtime: null },
                        { id: "5", name: "Rajesh Kumar", empCode: "EMP001", designation: "Supervisor", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", inTime: "06:15 AM", outTime: "02:10 PM", status: 0, approved: true, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "6", name: "Priya Sharma", empCode: "EMP002", designation: "Operator", photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", inTime: "06:05 AM", outTime: "02:00 PM", status: 1, approved: true, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "7", name: "Amit Singh", empCode: "EMP003", designation: "Technician", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", inTime: "06:30 AM", outTime: "02:15 PM", status: 0, approved: false, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "8", name: "Sunita Devi", empCode: "EMP004", designation: "Helper", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", inTime: "06:05 AM", outTime: "02:15 PM", status: 1, approved: false, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "9", name: "Rajesh Kumar", empCode: "EMP001", designation: "Supervisor", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face", inTime: "06:15 AM", outTime: "02:10 PM", status: 0, approved: true, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "10", name: "Priya Sharma", empCode: "EMP002", designation: "Operator", photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", inTime: "06:05 AM", outTime: "02:00 PM", status: 1, approved: true, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "11", name: "Amit Singh", empCode: "EMP003", designation: "Technician", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face", inTime: "06:30 AM", outTime: null, status: 1, approved: false, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "12", name: "Sunita Devi", empCode: "EMP004", designation: "Helper", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face", inTime: "06:05 AM", outTime: null, status: 1, approved: false, late: null, permission: null, earlyGoing: null, overtime: null }
                    ]
                },
                {
                    id: "shift_002",
                    name: "Afternoon Shift",
                    startTime: "02:00 PM",
                    endTime: "10:00 PM",
                    approvalStatus: "Approved",
                    score: 95,
                    members: [
                        { id: "13", name: "Vikram Patel", empCode: "EMP005", designation: "Machine Operator", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face", inTime: "02:00 PM", outTime: "10:00 PM", status: 0, approved: true, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "14", name: "Meera Iyer", empCode: "EMP006", designation: "Quality Checker", photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face", inTime: "01:55 PM", outTime: "09:58 PM", status: 0, approved: true, late: null, permission: null, earlyGoing: null, overtime: null }
                    ]
                },
                {
                    id: "shift_003",
                    name: "Night Shift",
                    startTime: "10:00 PM",
                    endTime: "06:00 AM",
                    approvalStatus: "Pending",
                    score: 45,
                    members: [
                        { id: "15", name: "Deepak Rao", empCode: "EMP007", designation: "Shift Lead", photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face", inTime: "10:15 PM", outTime: "06:05 AM", status: 0, approved: false, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "16", name: "Kavitha Nair", empCode: "EMP008", designation: "Operator", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face", inTime: "10:00 PM", outTime: "06:00 AM", status: 1, approved: false, late: null, permission: null, earlyGoing: null, overtime: null }
                    ]
                }
            ]
        },
        {
            id: "group_002",
            name: "Quality Control Team",
            department: "QC Department",
            isFullyApproved: true,
            overallScore: 81,
            groupApprovalStatus: "Approved",
            shifts: [
                {
                    id: "shift_004",
                    name: "Day Shift",
                    startTime: "09:00 AM",
                    endTime: "05:00 PM",
                    approvalStatus: "Approved",
                    score: 88,
                    members: [
                        { id: "17", name: "Arjun Reddy", empCode: "EMP009", designation: "QC Analyst", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face", inTime: "09:00 AM", outTime: "05:00 PM", status: 1, approved: true, late: null, permission: null, earlyGoing: null, overtime: null },
                        { id: "18", name: "Lakshmi Devi", empCode: "EMP010", designation: "Lab Technician", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face", inTime: "08:58 AM", outTime: "05:02 PM", status: 1, approved: true, late: null, permission: null, earlyGoing: null, overtime: null }
                    ]
                },
                {
                    id: "shift_005",
                    name: "Evening Shift",
                    startTime: "05:00 PM",
                    endTime: "01:00 AM",
                    approvalStatus: "Approved",
                    score: 96,
                    members: [
                        { id: "19", name: "Suresh Babu", empCode: "EMP011", designation: "QC Supervisor", photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face", inTime: "05:00 PM", outTime: "01:00 AM", status: 0, approved: true, late: null, permission: null, earlyGoing: null, overtime: null }
                    ]
                }
            ]
        },
        {
            id: "group_003",
            name: "Security Team",
            department: "Security",
            isFullyApproved: false,
            overallScore: 32,
            groupApprovalStatus: "Rejected",
            shifts: [
                {
                    id: "shift_006",
                    name: "Day Security",
                    startTime: "08:00 AM",
                    endTime: "08:00 PM",
                    approvalStatus: "Rejected",
                    score: 35,
                    members: [
                        { id: "20", name: "Raman Singh", empCode: "EMP012", designation: "Security Guard", photo: "/images/user.png", inTime: "08:00 AM", outTime: "08:00 PM", status: 1, approved: false, late: null, permission: null, earlyGoing: null, overtime: null }
                    ]
                }
            ]
        }
    ];

    // State management
    const state = {
        groups: JSON.parse(JSON.stringify(mockGroupsData)), // Deep clone
        selectedGroup: null,
        activeTab: '',
        activeFilter: 'all',
        newTaskDate: '',
        searchTerm: '',
        isApproveModalOpen: false,
        modalTarget: null,
        modalState: {
            needOut: false,
            needEG: false,
            needOT: false,
            outTime: null,
            remarkEG: '',
            remarkOT: ''
        },
        datepicker: null
    };

    // Utility Functions
    function parseTimeToDate(timeStr) {
        if (!timeStr) return null;
        const [time, period] = timeStr.split(' ');
        const [hours, minutes] = time.split(':');
        let hour24 = parseInt(hours, 10);
        if (period === 'PM' && hour24 !== 12) hour24 += 12;
        if (period === 'AM' && hour24 === 12) hour24 = 0;
        const date = new Date();
        date.setHours(hour24, parseInt(minutes, 10), 0, 0);
        return date;
    }

    function formatTime(date) {
        if (!date) return '';
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
    }

    function calculateWorkingHours(inTime, outTime) {
        if (!outTime) return "0h 0m";
        const inDate = parseTimeToDate(inTime);
        const outDate = parseTimeToDate(outTime);
        if (!inDate || !outDate) return "0h 0m";
        
        // Handle next day scenarios
        if (outDate < inDate) {
            outDate.setDate(outDate.getDate() + 1);
        }
        
        const diff = Math.abs(outDate - inDate);
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        
        return `${hours}h ${mins}m`;
    }

    function getApprovalStatusIcon(status) {
        if (status === "Approved") {
            return '<i class="ri-check-double-line text-xs"></i>';
        } else if (status === "Rejected") {
            return '<i class="ri-close-line text-xs"></i>';
        } else {
            return '<i class="ri-timer-line text-xs"></i>';
        }
    }

    function getApprovalStatusClasses(status) {
        if (status === "Approved") {
            return "text-green-600 bg-green-100";
        } else if (status === "Rejected") {
            return "text-red-600 bg-red-100";
        } else {
            return "text-orange-600 bg-orange-100";
        }
    }

    // Rendering Functions
    function renderGroupsList() {
        const container = document.getElementById('groups-list-container');
        const filteredGroups = getFilteredGroups();
        
        if (filteredGroups.length === 0) {
            container.innerHTML = '<div class="p-4 text-center text-gray-500">No groups found in this category.</div>';
            return;
        }

        container.innerHTML = filteredGroups.map(group => {
            const totalMembers = group.shifts.reduce((total, shift) => total + shift.members.length, 0);
            const pendingMembers = group.shifts.reduce((total, shift) => 
                total + shift.members.filter(member => member.outTime === null).length, 0
            );

            const isSelected = state.selectedGroup && state.selectedGroup.id === group.id;
            
            return `
                <div
                    class="group-item p-3 m-3 border rounded-md cursor-pointer transition-all ${isSelected ? 'border-[#009333] bg-green-50' : 'border-[#cbcbcb] hover:bg-gray-50'}"
                    data-group-id="${group.id}"
                >
                    <div class="flex justify-between items-center">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900 text-sm">${escapeHtml(group.name)}</h3>
                            <div class="flex items-center space-x-3 mt-1">
                                <span class="text-xs text-gray-600">
                                    Total: <span class="font-medium">${totalMembers}</span>
                                </span>
                                <span class="text-xs text-gray-600">
                                    Pending: <span class="font-medium text-orange-600">${pendingMembers}</span>
                                </span>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="inline-flex items-center ${getApprovalStatusClasses(group.groupApprovalStatus)} px-2 py-1 rounded-full">
                                ${getApprovalStatusIcon(group.groupApprovalStatus)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach click handlers
        container.querySelectorAll('.group-item').forEach(item => {
            item.addEventListener('click', () => {
                const groupId = item.getAttribute('data-group-id');
                const group = state.groups.find(g => g.id === groupId);
                if (group) {
                    handleGroupSelect(group);
                }
            });
        });
    }

    function renderShifts() {
        if (!state.selectedGroup) return;
        
        const container = document.getElementById('shifts-container');
        container.innerHTML = state.selectedGroup.shifts.map(shift => {
            const totalMembers = shift.members.length;
            const pendingMembers = shift.members.filter(member => member.outTime === null).length;
            const isActive = state.activeTab === shift.id;

            return `
                <div
                    class="p-4 border rounded-lg cursor-pointer transition-all ${isActive ? 'border-[#009333] bg-green-50' : 'border-gray-200 hover:bg-gray-50'}"
                    data-shift-id="${shift.id}"
                >
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-900 text-sm">${escapeHtml(shift.name)}</h3>
                            <p class="text-xs text-gray-500 mt-1">${shift.startTime} - ${shift.endTime}</p>
                        </div>
                        <div class="text-right">
                            <div class="inline-flex items-center ${getApprovalStatusClasses(shift.approvalStatus)} px-2 py-1 rounded-full">
                                ${getApprovalStatusIcon(shift.approvalStatus)}
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-xs text-gray-600">
                            Total: <span class="font-medium">${totalMembers}</span>
                        </span>
                        <span class="text-xs text-gray-600">
                            Pending: <span class="font-medium text-orange-600">${pendingMembers}</span>
                        </span>
                    </div>
                </div>
            `;
        }).join('');

        // Attach click handlers
        container.querySelectorAll('[data-shift-id]').forEach(item => {
            item.addEventListener('click', () => {
                const shiftId = item.getAttribute('data-shift-id');
                state.activeTab = shiftId;
                renderShifts();
                renderMembersTable();
                updateSelectedShiftHeader();
            });
        });
    }

    function renderMembersTable() {
        if (!state.selectedGroup || !state.activeTab) {
            document.getElementById('members-content-area').innerHTML = '';
            return;
        }

        const activeShift = state.selectedGroup.shifts.find(shift => shift.id === state.activeTab);
        if (!activeShift) return;

        const container = document.getElementById('members-content-area');
        container.innerHTML = `
            <div class="space-y-5">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-lg font-medium text-gray-900 flex items-center">
                            ${escapeHtml(activeShift.name)} Members
                            ${activeShift.approvalStatus === "Approved" ? '<i class="ri-check-line text-green-600 ml-2"></i>' : ''}
                            ${activeShift.approvalStatus === "Rejected" ? '<i class="ri-close-line text-red-600 ml-2"></i>' : ''}
                        </h2>
                        <p class="text-sm mt-1 text-gray-700">
                            ${activeShift.startTime} - ${activeShift.endTime}
                            <span class="${activeShift.approvalStatus === "Pending" ? "text-orange-500" : activeShift.approvalStatus === "Approved" ? "text-green-600" : "text-red-600"}">
                                • ${activeShift.approvalStatus}
                            </span>
                        </p>
                    </div>
                    <div class="flex space-x-3">
                        <button
                            onclick="attendanceApp.handleShiftApproval('${state.selectedGroup.id}', '${activeShift.id}', 'Rejected')"
                            class="px-3 py-1.5 text-sm rounded border cursor-pointer bg-[#dc3545] text-white border border-[#dc3545] hover:bg-[#c82333] transition"
                        >
                            <i class="ri-close-line mr-1"></i>
                            Reject Shift
                        </button>
                        <button
                            onclick="attendanceApp.handleShiftApproval('${state.selectedGroup.id}', '${activeShift.id}', 'Approved')"
                            class="px-3 py-1.5 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition"
                        >
                            <i class="ri-check-line mr-1"></i>
                            Approve Shift
                        </button>
                    </div>
                </div>
                <div class="bg-white rounded-lg border border-[#ebeff3] overflow-hidden">
                    <div class="max-h-[calc(100vh-400px)] overflow-y-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 sticky top-0 z-20 shadow-[0_1px_0_0_#ebeff3]">
                                <tr class="divide-x divide-[#ebeff3]">
                                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">S.No</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">Employee</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">Role</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">In</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">Out</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">Late</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">Permission</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">EG</th>
                                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">OT</th>
                                    <th class="w-[10px] px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">Status</th>
                                    <th class="w-[1px] px-3 py-2 text-left text-xs font-medium text-gray-800 font-semibold uppercase tracking-wider">Approval</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-[#ebeff3]">
                                ${activeShift.members.map((member, index) => {
                                    const statusValue = member.outTime === null ? "MSP" : member.status === 1 ? "MSP" : "OT";
                                    return `
                                        <tr class="hover:bg-gray-50 transition-colors cursor-pointer divide-x divide-[#ebeff3]">
                                            <td class="px-3 py-2 whitespace-nowrap">
                                                <span class="text-sm font-medium text-gray-900">${index + 1}</span>
                                            </td>
                                            <td class="px-3 py-2 whitespace-nowrap">
                                                <div class="flex items-center space-x-3">
                                                    <img src="${escapeHtml(member.photo)}" alt="${escapeHtml(member.name)}" class="w-8 h-8 rounded-full object-cover" />
                                                    <div>
                                                        <div class="font-medium text-sm text-gray-900">
                                                            ${escapeHtml(member.name)}<br/>${escapeHtml(member.empCode)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-3 py-2 whitespace-nowrap font-medium text-sm text-gray-900">${escapeHtml(member.designation)}</td>
                                            <td class="px-3 py-2 whitespace-nowrap font-medium text-sm text-gray-900">${member.inTime}</td>
                                            <td class="px-3 py-2 whitespace-nowrap font-medium text-sm text-gray-900">${member.outTime || "Pending"}</td>
                                            <td class="px-3 py-2 whitespace-nowrap font-medium text-sm text-gray-900">${member.late || "-"}</td>
                                            <td class="px-3 py-2 whitespace-nowrap font-medium text-sm text-gray-900">${member.permission || "-"}</td>
                                            <td class="px-3 py-2 whitespace-nowrap font-medium text-sm text-gray-900">${member.earlyGoing || "-"}</td>
                                            <td class="px-3 py-2 whitespace-nowrap font-medium text-sm text-gray-900">${member.overtime || "-"}</td>
                                            <td class="px-3 py-2 whitespace-nowrap">
                                                ${renderStatusDropdown(member.id, statusValue)}
                                            </td>
                                            <td class="w-[1px] px-3 py-2 whitespace-nowrap">
                                                ${renderApprovalButton(member, activeShift)}
                                            </td>
                                        </tr>
                                    `;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;

        // Reinitialize status dropdowns after rendering
        setTimeout(() => {
            initializeStatusDropdowns();
        }, 100);
    }

    function renderStatusDropdown(memberId, value) {
        const dropdownId = `status-dropdown-${memberId}`;
        return `
            <div class="relative inline-block text-left" id="${dropdownId}">
                <button
                    type="button"
                    class="status-dropdown-btn border px-3 py-1.5 rounded-md bg-white text-sm flex items-center justify-between min-w-[100px] max-w-full cursor-pointer"
                    data-member-id="${memberId}"
                    data-value="${value}"
                >
                    <span class="${value === "Select" ? "text-gray-500" : "text-[#12344d]"} truncate">${value}</span>
                    <i class="ri-arrow-down-s-fill ml-2 text-sm text-gray-700"></i>
                </button>
            </div>
        `;
    }

    function renderApprovalButton(member, shift) {
        if (member.outTime === null) {
            return `
                <button
                    onclick="attendanceApp.handleApproveClick('${member.id}', '${shift.id}')"
                    class="inline-flex items-center justify-center w-8 h-8 rounded-full text-white bg-[#009333] cursor-pointer hover:bg-[#007a2a] transition-colors"
                    title="Approve"
                >
                    <i class="ri-check-line text-sm"></i>
                </button>
            `;
        } else if (shift.approvalStatus === "Approved") {
            return `
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700" title="Approved">
                    <i class="ri-check-double-line text-sm"></i>
                </div>
            `;
        } else if (shift.approvalStatus === "Rejected") {
            return `
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-100 text-red-700" title="Rejected">
                    <i class="ri-close-line text-sm"></i>
                </div>
            `;
        } else {
            return `
                <div class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-600" title="Pending">
                    <i class="ri-timer-line text-sm"></i>
                </div>
            `;
        }
    }

    function renderApprovalModal() {
        if (!state.isApproveModalOpen || !state.modalTarget) return;

        const modal = document.getElementById('approval-modal');
        const content = document.getElementById('approval-modal-content');
        
        const member = state.selectedGroup?.shifts
            .find(s => s.id === state.modalTarget.shiftId)
            ?.members.find(m => m.id === state.modalTarget.memberId);

        if (!member) return;

        let modalHTML = '';
        
        if (state.modalState.needOut) {
            const inTimeDate = parseTimeToDate(member.inTime);
            
            modalHTML += `
                <div>
                    <label class="block text-sm font-medium mb-1 text-black">Out Time (12-hour, e.g., 05:45 PM)</label>
                    <div class="flex gap-2">
                        <input
                            type="number"
                            id="modal-out-time-hour"
                            placeholder="HH"
                            min="1"
                            max="12"
                            class="block w-20 text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        />
                        <span class="flex items-center text-gray-500">:</span>
                        <input
                            type="number"
                            id="modal-out-time-minute"
                            placeholder="MM"
                            min="0"
                            max="59"
                            class="block w-20 text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        />
                        <select
                            id="modal-out-time-period"
                            class="block w-20 text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                </div>
            `;
        }

        if (state.modalState.needEG) {
            modalHTML += `
                <div>
                    <label class="block text-sm font-medium mb-1 text-black">Early Going Remark</label>
                    <input
                        type="text"
                        id="modal-eg-remark"
                        placeholder="Enter EG remark"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        value="${escapeHtml(state.modalState.remarkEG)}"
                    />
                </div>
            `;
        }

        if (state.modalState.needOT) {
            modalHTML += `
                <div>
                    <label class="block text-sm font-medium mb-1 text-black">Overtime Remark</label>
                    <input
                        type="text"
                        id="modal-ot-remark"
                        placeholder="Enter OT remark"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        value="${escapeHtml(state.modalState.remarkOT)}"
                    />
                </div>
            `;
        }

        content.innerHTML = modalHTML;
        modal.classList.remove('hidden');
    }

    function updateSelectedShiftHeader() {
        const header = document.getElementById('selected-shift-header');
        const nameSpan = document.getElementById('selected-shift-name');
        
        if (state.activeTab && state.selectedGroup) {
            const shift = state.selectedGroup.shifts.find(s => s.id === state.activeTab);
            if (shift) {
                nameSpan.textContent = shift.name;
                header.classList.remove('hidden');
            } else {
                header.classList.add('hidden');
            }
        } else {
            header.classList.add('hidden');
        }
    }

    function updateFilterCounts() {
        const totalGroups = state.groups.length;
        const finalizedCount = state.groups.filter(g => 
            g.groupApprovalStatus === 'Approved' || g.groupApprovalStatus === 'Rejected'
        ).length;

        document.getElementById('filter-all-count').textContent = totalGroups;
        document.getElementById('filter-finalized-count').textContent = finalizedCount;
    }

    function getFilteredGroups() {
        return state.groups.filter(group => {
            const matchesSearch = group.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
                group.department.toLowerCase().includes(state.searchTerm.toLowerCase());
            
            let matchesFilter = false;
            if (state.activeFilter === 'all') {
                matchesFilter = true;
            } else if (state.activeFilter === 'finalized') {
                matchesFilter = group.groupApprovalStatus === 'Approved' || group.groupApprovalStatus === 'Rejected';
            }

            return matchesSearch && matchesFilter;
        });
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Status Dropdown Functionality
    function initializeStatusDropdowns() {
        document.querySelectorAll('.status-dropdown-btn').forEach(btn => {
            if (btn.hasAttribute('data-initialized')) return;
            btn.setAttribute('data-initialized', 'true');
            
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const memberId = btn.getAttribute('data-member-id');
                const currentValue = btn.getAttribute('data-value');
                toggleStatusDropdown(memberId, currentValue, btn);
            });
        });
    }

    function toggleStatusDropdown(memberId, currentValue, button) {
        // Close any open dropdowns
        document.querySelectorAll('.status-dropdown-menu').forEach(menu => menu.remove());

        const options = ["OT", "MSP"];
        const rect = button.getBoundingClientRect();
        
        const menu = document.createElement('div');
        menu.className = 'status-dropdown-menu border bg-white rounded-sm shadow-lg shadow-[0_4px_16px_#27313a66] overflow-hidden';
        menu.style.position = 'fixed';
        menu.style.top = `${rect.bottom + 4}px`;
        menu.style.left = `${rect.left}px`;
        menu.style.width = `${rect.width}px`;
        menu.style.zIndex = '10000';

        menu.innerHTML = `
            <ul class="text-[15px] text-[#12344d]">
                ${options.map(option => `
                    <li
                        class="flex items-center px-4 py-1.5 cursor-pointer ${currentValue === option ? 'text-white font-medium bg-green-600' : 'hover:bg-gray-100'}"
                        data-option="${option}"
                    >
                        <i class="ri-time-line mr-2 ${currentValue === option ? 'text-white' : ''}"></i> ${option}
                    </li>
                `).join('')}
            </ul>
        `;

        document.body.appendChild(menu);

        menu.querySelectorAll('li').forEach(li => {
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                const option = li.getAttribute('data-option');
                handleStatusChange(memberId, option);
                menu.remove();
            });
        });

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target) && !button.contains(e.target)) {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 0);
    }

    // Event Handlers
    function handleGroupSelect(group) {
        state.selectedGroup = group;
        if (group.shifts.length > 0) {
            state.activeTab = group.shifts[0].id;
        } else {
            state.activeTab = '';
        }
        
        document.getElementById('welcome-screen').classList.add('hidden');
        document.getElementById('group-details-container').classList.remove('hidden');
        
        document.getElementById('selected-group-name').textContent = group.name;
        document.getElementById('selected-group-department').textContent = group.department;
        
        renderShifts();
        renderMembersTable();
        updateSelectedShiftHeader();
        renderGroupsList();
    }

    function handleStatusChange(memberId, status) {
        console.log(`Member ${memberId} status changed to: ${status}`);
        // Update the button display
        const btn = document.querySelector(`[data-member-id="${memberId}"].status-dropdown-btn`);
        if (btn) {
            btn.setAttribute('data-value', status);
            const span = btn.querySelector('span');
            if (span) {
                span.textContent = status;
                span.className = "text-[#12344d] truncate";
            }
        }
        // Here you can call API to update backend if needed
    }

    function handleApproveClick(memberId, shiftId) {
        const member = state.selectedGroup?.shifts
            .find(s => s.id === shiftId)
            ?.members.find(m => m.id === memberId);

        if (member && member.outTime === null) {
            state.modalTarget = { memberId, shiftId };
            state.modalState = {
                needOut: true,
                needEG: false,
                needOT: false,
                outTime: null,
                remarkEG: '',
                remarkOT: ''
            };
            state.isApproveModalOpen = true;
            renderApprovalModal();
        }
    }

    function handleShiftApproval(groupId, shiftId, status) {
        state.groups = state.groups.map(group => {
            if (group.id !== groupId) return group;

            const updatedShifts = group.shifts.map(shift => {
                if (shift.id !== shiftId) return shift;

                const isApproved = status === "Approved";
                const updatedMembers = shift.members.map(member => ({
                    ...member,
                    approved: isApproved
                }));

                return { ...shift, members: updatedMembers, approvalStatus: status };
            });

            const allApproved = updatedShifts.every(s => s.approvalStatus === "Approved");
            const allRejected = updatedShifts.every(s => s.approvalStatus === "Rejected");
            let newGroupApprovalStatus = "Pending";
            
            if (allApproved) {
                newGroupApprovalStatus = "Approved";
            } else if (allRejected) {
                newGroupApprovalStatus = "Rejected";
            }

            return {
                ...group,
                shifts: updatedShifts,
                groupApprovalStatus: newGroupApprovalStatus,
                isFullyApproved: allApproved
            };
        });

        // Update selected group reference
        const updatedSelectedGroup = state.groups.find(g => g.id === (state.selectedGroup?.id || ''));
        if (updatedSelectedGroup) {
            state.selectedGroup = updatedSelectedGroup;
        }

        renderShifts();
        renderMembersTable();
        renderGroupsList();
        updateFilterCounts();
    }

    function handleModalConfirm() {
        if (!state.modalTarget) return;

        const outTimeHourInput = document.getElementById('modal-out-time-hour');
        const outTimeMinuteInput = document.getElementById('modal-out-time-minute');
        const outTimePeriodSelect = document.getElementById('modal-out-time-period');
        const egRemarkInput = document.getElementById('modal-eg-remark');
        const otRemarkInput = document.getElementById('modal-ot-remark');

        let updatedOutTime = null;
        if (state.modalState.needOut && outTimeHourInput && outTimeMinuteInput && outTimePeriodSelect) {
            const hour = outTimeHourInput.value;
            const minute = outTimeMinuteInput.value;
            const period = outTimePeriodSelect.value;
            
            if (hour && minute) {
                updatedOutTime = `${hour.padStart(2, '0')}:${minute.padStart(2, '0')} ${period}`;
            }
        }

        // Update member in state
        state.groups = state.groups.map((g) => {
            if (g.id !== (state.selectedGroup?.id || '')) return g;

            return {
                ...g,
                shifts: g.shifts.map((s) => {
                    if (s.id !== state.modalTarget.shiftId) return s;

                    return {
                        ...s,
                        members: s.members.map((m) => {
                            if (m.id !== state.modalTarget.memberId) return m;

                            const finalOutTime = updatedOutTime || m.outTime;
                            return {
                                ...m,
                                outTime: finalOutTime,
                                earlyGoing: egRemarkInput ? egRemarkInput.value : m.earlyGoing,
                                overtime: otRemarkInput ? otRemarkInput.value : m.overtime
                            };
                        })
                    };
                })
            };
        });

        // Update selected group reference
        const updatedSelectedGroup = state.groups.find(g => g.id === (state.selectedGroup?.id || ''));
        if (updatedSelectedGroup) {
            state.selectedGroup = updatedSelectedGroup;
        }

        handleStatusChange(state.modalTarget.memberId, 'Approved');
        closeApprovalModal();
        renderMembersTable();
        renderGroupsList();
    }

    function closeApprovalModal() {
        state.isApproveModalOpen = false;
        state.modalTarget = null;
        document.getElementById('approval-modal').classList.add('hidden');
    }

    // Initialize Date Picker
    function initializeDatePicker() {
        const dateInput = document.getElementById('attendance-date-picker');
        if (dateInput && typeof Datepicker !== 'undefined') {
            state.datepicker = new Datepicker(dateInput, {
                format: 'dd/mm/yyyy',
                autohide: true,
                orientation: 'bottom'
            });

            dateInput.addEventListener('changeDate', function(e) {
                state.newTaskDate = e.target.value;
            });

            // Set today's date as default
            const today = new Date();
            const formattedDate = today.toLocaleDateString('en-GB');
            dateInput.value = formattedDate;
            state.newTaskDate = formattedDate;
        }
    }

    // Public API
    window.attendanceApp = {
        handleApproveClick: handleApproveClick,
        handleShiftApproval: handleShiftApproval
    };

    // Initialize on DOM ready
    $(document).ready(function() {
        initializeDatePicker();
        updateFilterCounts();
        renderGroupsList();

        // Auto-select first group initially
        const filteredGroups = getFilteredGroups();
        if (filteredGroups.length > 0) {
            handleGroupSelect(filteredGroups[0]);
        }

        // Filter buttons
        document.getElementById('filter-all-btn').addEventListener('click', () => {
            state.activeFilter = 'all';
            document.getElementById('filter-all-btn').className = 'flex-1 px-3 py-1.5 rounded-md transition-colors cursor-pointer bg-white text-gray-900 shadow';
            document.getElementById('filter-finalized-btn').className = 'flex-1 px-3 py-1.5 rounded-md transition-colors cursor-pointer text-gray-700';
            renderGroupsList();
            
            // Auto-select first group when filter changes
            const filteredGroups = getFilteredGroups();
            if (filteredGroups.length > 0 && !filteredGroups.find(g => g.id === state.selectedGroup?.id)) {
                handleGroupSelect(filteredGroups[0]);
            }
        });

        document.getElementById('filter-finalized-btn').addEventListener('click', () => {
            state.activeFilter = 'finalized';
            document.getElementById('filter-finalized-btn').className = 'flex-1 px-3 py-1.5 rounded-md transition-colors cursor-pointer bg-white text-gray-900 shadow';
            document.getElementById('filter-all-btn').className = 'flex-1 px-3 py-1.5 rounded-md transition-colors cursor-pointer text-gray-700';
            renderGroupsList();
            
            // Auto-select first group when filter changes
            const filteredGroups = getFilteredGroups();
            if (filteredGroups.length > 0 && !filteredGroups.find(g => g.id === state.selectedGroup?.id)) {
                handleGroupSelect(filteredGroups[0]);
            }
        });

        // Search input
        document.getElementById('group-search-input').addEventListener('input', (e) => {
            state.searchTerm = e.target.value;
            renderGroupsList();
            
            // Auto-select first group when search results change and current selection is not in results
            const filteredGroups = getFilteredGroups();
            if (filteredGroups.length > 0) {
                const isCurrentGroupInResults = state.selectedGroup && filteredGroups.find(g => g.id === state.selectedGroup.id);
                if (!isCurrentGroupInResults) {
                    handleGroupSelect(filteredGroups[0]);
                }
            } else if (state.selectedGroup) {
                // Hide group details if no results
                document.getElementById('welcome-screen').classList.remove('hidden');
                document.getElementById('group-details-container').classList.add('hidden');
            }
        });

        // Approval modal handlers
        document.getElementById('approval-modal-close').addEventListener('click', closeApprovalModal);
        document.getElementById('approval-modal-backdrop').addEventListener('click', closeApprovalModal);
        document.getElementById('approval-modal-cancel').addEventListener('click', closeApprovalModal);
        document.getElementById('approval-modal-confirm').addEventListener('click', handleModalConfirm);
    });
})();

