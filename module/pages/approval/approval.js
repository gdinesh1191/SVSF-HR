(function() {
    'use strict';

    // State management
    const state = {
        activeTab: 'Permission',
        selectedIds: [],
        selectAll: false,
        filters: {},
        localFilters: {},
        isFilterOpen: false,
        isApprovalModalOpen: false,
        selectedItem: null,
        remarks: '',
        counts: {
            Permission: 0,
            Leave: 0,
            OT: 0,
            OD: 0,
            ShiftChange: 0
        }
    };

    // Mock data
    const mockPermissionData = [
        {
            id: "Permission_001",
            name: "Muthu Kumar",
            category: "Full Day",
            type: "Casual Permission",
            date: "01/07/2025",
            days: 1,
            appliedOn: "28/06/2025",
            remarks: "Family commitment.",
            categoryIcon: "ri-briefcase-line",
            categoryColor: "text-yellow-600",
            approvalStatus: "Pending",
        },
        {
            id: "Permission_002",
            name: "Ananya Ramesh",
            category: "Half Day",
            type: "Sick Permission",
            date: "05/07/2025",
            days: 0.5,
            appliedOn: "04/07/2025",
            remarks: "Mild fever in the morning.",
            categoryIcon: "ri-stethoscope-line",
            categoryColor: "text-red-500",
            approvalStatus: "Approved",
        },
        {
            id: "Permission_003",
            name: "Karthik Raj",
            category: "Full Day",
            type: "Annual Permission",
            date: "10/07/2025",
            days: 1,
            appliedOn: "07/07/2025",
            remarks: "Planned family trip.",
            categoryIcon: "ri-calendar-event-line",
            categoryColor: "text-blue-500",
            approvalStatus: "Approved",
        },
        {
            id: "Permission_004",
            name: "Divya Sharma",
            category: "Half Day",
            type: "Casual Permission",
            date: "12/07/2025",
            days: 0.5,
            appliedOn: "11/07/2025",
            remarks: "Personal errand in the afternoon.",
            categoryIcon: "ri-briefcase-line",
            categoryColor: "text-yellow-600",
            approvalStatus: "Pending",
        },
        {
            id: "Permission_005",
            name: "Rahul Mehta",
            category: "Full Day",
            type: "Sick Permission",
            date: "15/07/2025",
            days: 1,
            appliedOn: "14/07/2025",
            remarks: "Severe headache and fatigue.",
            categoryIcon: "ri-stethoscope-line",
            categoryColor: "text-red-500",
            approvalStatus: "Rejected",
        }
    ];

    const mockLeaveData = [
        {
            id: "Leave_001",
            name: "Muthu Kumar",
            category: "Full Day",
            type: "Casual Leave",
            date: "01/07/2025",
            days: 1,
            appliedOn: "28/06/2025",
            remarks: "Family commitment.",
            categoryIcon: "ri-briefcase-line",
            categoryColor: "text-yellow-600",
            approvalStatus: "Pending",
        },
        {
            id: "Leave_002",
            name: "Priya Sharma",
            category: "Half Day",
            type: "Sick Leave",
            date: "02/07/2025",
            days: 0.5,
            appliedOn: "01/07/2025",
            remarks: "Fever and weakness.",
            categoryIcon: "ri-hospital-line",
            categoryColor: "text-red-600",
            approvalStatus: "Approved",
        },
        {
            id: "Leave_003",
            name: "Arun Kumar",
            category: "Full Day",
            type: "Annual Leave",
            date: "03/07/2025",
            days: 1,
            appliedOn: "29/06/2025",
            remarks: "Family event out of town.",
            categoryIcon: "ri-calendar-event-line",
            categoryColor: "text-blue-600",
            approvalStatus: "Pending",
        }
    ];

    const mockOTData = [
        {
            id: "OT_001",
            name: "Muthu Kumar",
            date: "01/09/2025",
            shift: "Night",
            othrs: 4,
            time: "18:00 - 22:00",
            categoryIcon: "ri-time-line",
            categoryColor: "text-blue-600",
            description: "Worked extra hours to complete the deployment task.",
            approvalStatus: "Pending",
        },
        {
            id: "OT_002",
            name: "Karthik Raja",
            date: "02/09/2025",
            shift: "Morning",
            othrs: 3,
            time: "06:00 - 09:00",
            categoryIcon: "ri-time-line",
            categoryColor: "text-green-600",
            description: "Supported early operations for client issue resolution.",
            approvalStatus: "Approved",
        },
        {
            id: "OT_003",
            name: "Priya Sharma",
            date: "03/09/2025",
            shift: "Evening",
            othrs: 5,
            time: "16:00 - 21:00",
            categoryIcon: "ri-time-line",
            categoryColor: "text-purple-600",
            description: "Handled overtime for system testing.",
            approvalStatus: "Rejected",
        }
    ];

    const mockODData = [
        {
            id: "OD_001",
            name: "Muthu Kumar",
            date: "01/09/2025",
            shift: "Night",
            odhrs: 4,
            time: "18:00 - 22:00",
            categoryIcon: "ri-time-line",
            categoryColor: "text-blue-600",
            description: "Worked extra hours to complete the deployment task.",
            approvalStatus: "Pending",
        },
        {
            id: "OD_002",
            name: "Karthik Raja",
            date: "02/09/2025",
            shift: "Morning",
            odhrs: 3,
            time: "06:00 - 09:00",
            categoryIcon: "ri-time-line",
            categoryColor: "text-green-600",
            description: "Supported early operations for client issue resolution.",
            approvalStatus: "Approved",
        }
    ];

    const mockShiftChangeData = [
        {
            id: "SC_001",
            name: "Muthu Kumar",
            fromDate: "01/07/2025",
            toDate: "01/07/2025",
            fromShift: "Morning (9 AM - 5 PM)",
            toShift: "Evening (1 PM - 9 PM)",
            categoryIcon: "ri-time-line",
            categoryColor: "text-indigo-600",
            description: "Requesting to change morning shift to evening shift for personal commitment.",
            approvalStatus: "Pending",
        },
        {
            id: "SC_002",
            name: "Lakshmi Devi",
            fromDate: "05/07/2025",
            toDate: "05/07/2025",
            fromShift: "Evening (1 PM - 9 PM)",
            toShift: "Night (9 PM - 5 AM)",
            categoryIcon: "ri-moon-line",
            categoryColor: "text-gray-700",
            description: "Need to switch to night shift for a temporary project assignment.",
            approvalStatus: "Approved",
        }
    ];

    // Get current data based on active tab
    function getCurrentData() {
        switch(state.activeTab) {
            case 'Permission': return mockPermissionData;
            case 'Leave': return mockLeaveData;
            case 'OT': return mockOTData;
            case 'OD': return mockODData;
            case 'ShiftChange': return mockShiftChangeData;
            default: return mockPermissionData;
        }
    }

    // Update counts
    function updateCounts() {
        state.counts.Permission = mockPermissionData.length;
        state.counts.Leave = mockLeaveData.length;
        state.counts.OT = mockOTData.length;
        state.counts.OD = mockODData.length;
        state.counts.ShiftChange = mockShiftChangeData.length;

        Object.keys(state.counts).forEach(tab => {
            const countEl = document.getElementById(`count-${tab}`);
            if (countEl) {
                countEl.textContent = state.counts[tab];
            }
        });
    }

    // Tab switching
    function switchTab(tabName) {
        state.activeTab = tabName;
        state.selectedIds = [];
        state.selectAll = false;
        state.filters = {};
        state.localFilters = {};

        // Update tab buttons
        document.querySelectorAll('#approval-tabs .tab').forEach(btn => {
            const tab = btn.getAttribute('data-tab');
            if (tab === tabName) {
                btn.className = 'tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer bg-[#ebeff3] text-[#384551]';
                const counter = btn.querySelector('.counter-badge');
                const close = btn.querySelector('.tab-close');
                if (counter) counter.classList.remove('hidden');
                if (close) close.classList.remove('hidden');
            } else {
                btn.className = 'tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]';
                const counter = btn.querySelector('.counter-badge');
                const close = btn.querySelector('.tab-close');
                if (counter) counter.classList.add('hidden');
                if (close) close.classList.add('hidden');
            }
        });

        renderTable();
    }

    // Render table based on active tab
    function renderTable() {
        const container = document.getElementById('tab-content-container');
        if (!container) return;

        const data = getCurrentData();
        let html = '';

        switch(state.activeTab) {
            case 'Permission':
                html = renderPermissionTable(data);
                break;
            case 'Leave':
                html = renderLeaveTable(data);
                break;
            case 'OT':
                html = renderOTTable(data);
                break;
            case 'OD':
                html = renderODTable(data);
                break;
            case 'ShiftChange':
                html = renderShiftChangeTable(data);
                break;
        }

        container.innerHTML = html;
        attachTableEventListeners();
    }

    // Render Permission Table
    function renderPermissionTable(data) {
        const filteredData = applyFilters(data);
        let rows = filteredData.map((item, index) => `
            <tr key="${item.id}" class="hover:bg-gray-50">
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                    <input type="checkbox" class="form-check row-checkbox accent-[#009333]" data-id="${item.id}" ${state.selectedIds.includes(item.id) ? 'checked' : ''}>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%] text-center">${index + 1}</td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[20%]">
                    <div class="flex items-center gap-2 cursor-pointer">
                        <img src="/images/user.png" alt="avatar" class="w-8 h-8 rounded-full">
                        <div>
                            <div class="text-sm font-medium text-gray-900">${item.name}</div>
                            <div class="text-sm text-gray-500">${item.id}</div>
                        </div>
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[12%]">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${item.category}</div>
                        <div class="text-sm text-gray-500">${item.id}</div>
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
                    <div class="text-sm text-gray-900">
                        <i class="${item.categoryIcon} ${item.categoryColor} mr-1"></i>
                        ${item.type}
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
                    <div class="text-sm text-gray-900">${item.date}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[8%]">
                    <div class="text-sm text-gray-900">${item.days}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
                    <div class="text-sm text-gray-900">${item.appliedOn}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[13%]">
                    <div class="text-sm text-gray-900">${item.remarks}</div>
                </td>
                <td class="border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-sm font-medium text-center">
                    ${renderActionButton(item)}
                </td>
            </tr>
        `).join('');

        return `
            <div class="permission-table-wrapper">
                <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
                    <div class="flex items-center space-x-2 ml-2">
                        <div class="bulk-actions flex items-center space-x-2">
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="printBtn">
                                <i class="ri-printer-line mr-1"></i> Print
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="summaryBtn">
                                <i class="ri-sticky-note-line mr-1"></i> Summary
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="downloadBtn">
                                <i class="ri-arrow-down-line mr-1"></i> Download
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn">
                                <i class="ri-delete-bin-6-line mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center relative space-x-2">
                        <input class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]" type="text" placeholder="Enter request Number" id="search-input" value="${state.localFilters.requestNumber || ''}">
                        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="filter-toggle-btn">
                            <i class="ri-sort-desc"></i>
                        </button>
                    </div>
                </div>
                <div class="bg-[#ebeff3]">
                    ${state.selectedIds.length > 1 ? `<div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">${state.selectedIds.length} requests selected</div>` : ''}
                    <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
                        <div class="h-full overflow-y-auto">
                            <table class="w-full text-sm">
                                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                                    <tr>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                                            <input type="checkbox" id="select-all-checkbox" class="form-check accent-[#009333]" ${state.selectAll ? 'checked' : ''}>
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">S.No.</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[20%]">Employee Name</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[12%]">Category</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Type</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Date</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[8%]">Days</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Applied On</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[13%]">Remarks</th>
                                        <th class="p-[0.3rem] w-[5%]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
                    <span class="text-sm">
                        Showing <span class="text-red-600">${filteredData.length}</span> of <span class="text-blue-600">${data.length}</span>
                    </span>
                </div>
            </div>
        `;
    }

    // Render Leave Table
    function renderLeaveTable(data) {
        const filteredData = applyFilters(data);
        let rows = filteredData.map((item, index) => `
            <tr key="${item.id}" class="hover:bg-gray-50">
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                    <input type="checkbox" class="form-check row-checkbox accent-[#009333]" data-id="${item.id}" ${state.selectedIds.includes(item.id) ? 'checked' : ''}>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">${index + 1}</td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[20%]">
                    <div class="flex items-center gap-2 cursor-pointer">
                        <img src="/images/user.png" alt="avatar" class="w-8 h-8 rounded-full">
                        <div>
                            <div class="text-sm font-medium text-gray-900">${item.name}</div>
                            <div class="text-sm text-gray-500">${item.id}</div>
                        </div>
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${item.category}</div>
                        <div class="text-sm text-gray-500">${item.id}</div>
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
                    <i class="${item.categoryIcon} ${item.categoryColor} mr-1"></i>
                    ${item.type}
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">${item.date}</td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">${item.days}</td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">${item.appliedOn}</td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">${item.remarks}</td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%] text-center">
                    ${renderActionButton(item)}
                </td>
            </tr>
        `).join('');

        return `
            <div class="Leave-table-wrapper">
                <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
                    <div class="flex items-center space-x-2 ml-2">
                        <div class="bulk-actions flex items-center space-x-2">
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="printBtn">
                                <i class="ri-printer-line mr-1"></i> Print
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="summaryBtn">
                                <i class="ri-sticky-note-line mr-1"></i> Summary
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="downloadBtn">
                                <i class="ri-arrow-down-line mr-1"></i> Download
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn">
                                <i class="ri-delete-bin-6-line mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center relative space-x-2">
                        <input class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]" type="text" placeholder="Enter request Number" id="search-input" value="${state.localFilters.requestNumber || ''}">
                        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="filter-toggle-btn">
                            <i class="ri-sort-desc"></i>
                        </button>
                    </div>
                </div>
                <div class="bg-[#ebeff3]">
                    ${state.selectedIds.length > 1 ? `<div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">${state.selectedIds.length} requests selected</div>` : ''}
                    <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
                        <div class="h-full overflow-y-auto">
                            <table class="w-full text-sm">
                                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                                    <tr>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                                            <input type="checkbox" id="select-all-checkbox" class="form-check accent-[#009333]" ${state.selectAll ? 'checked' : ''}>
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">S.No.</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Employee Name</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Category</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Type</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Date</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Days</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Applied On</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Remarks</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
                    <span class="text-sm">
                        Showing <span class="text-red-600">${filteredData.length}</span> of <span class="text-blue-600">${data.length}</span>
                    </span>
                </div>
            </div>
        `;
    }

    // Render OT Table
    function renderOTTable(data) {
        const filteredData = applyFilters(data);
        let rows = filteredData.map((item, index) => `
            <tr key="${item.id}" class="hover:bg-gray-50">
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                    <input type="checkbox" class="form-check row-checkbox accent-[#009333]" data-id="${item.id}" ${state.selectedIds.includes(item.id) ? 'checked' : ''}>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%] text-center">${index + 1}</td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[25%]">
                    <div class="flex items-center gap-2 cursor-pointer">
                        <img src="/images/user.png" alt="avatar" class="w-8 h-8 rounded-full">
                        <div>
                            <div class="text-sm font-medium text-gray-900">${item.name}</div>
                            <div class="text-sm text-gray-500">${item.id}</div>
                        </div>
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${item.date}</div>
                        <div class="text-sm text-gray-500">${item.id}</div>
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                    <div class="text-sm text-gray-900">
                        <i class="${item.categoryIcon} ${item.categoryColor} mr-1"></i>
                        ${item.shift}
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
                    <div class="text-sm text-gray-900">${item.othrs}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                    <div class="text-sm text-gray-900">${item.time}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%] text-sm font-medium text-center">
                    ${renderActionButton(item)}
                </td>
            </tr>
        `).join('');

        return `
            <div class="ot-table-wrapper">
                <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
                    <div class="flex items-center space-x-2 ml-2">
                        <div class="bulk-actions flex items-center space-x-2">
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="printBtn">
                                <i class="ri-printer-line mr-1"></i> Print
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="summaryBtn">
                                <i class="ri-sticky-note-line mr-1"></i> Summary
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="downloadBtn">
                                <i class="ri-arrow-down-line mr-1"></i> Download
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn">
                                <i class="ri-delete-bin-6-line mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center relative space-x-2">
                        <input class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]" type="text" placeholder="Enter request Number" id="search-input" value="${state.localFilters.requestNumber || ''}">
                        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="filter-toggle-btn">
                            <i class="ri-sort-desc"></i>
                        </button>
                    </div>
                </div>
                <div class="bg-[#ebeff3]">
                    ${state.selectedIds.length > 1 ? `<div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">${state.selectedIds.length} requests selected</div>` : ''}
                    <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
                        <div class="h-full overflow-y-auto">
                            <table class="w-full table-fixed border-collapse">
                                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                                    <tr>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                                            <input type="checkbox" id="select-all-checkbox" class="form-check accent-[#009333]" ${state.selectAll ? 'checked' : ''}>
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">S.No.</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[25%]">Employee Name</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Date</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Shift</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">OT Hrs</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Time</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
                    <span class="text-sm">
                        Showing <span class="text-red-600">${filteredData.length}</span> of <span class="text-blue-600">${data.length}</span>
                    </span>
                </div>
            </div>
        `;
    }

    // Render OD Table
    function renderODTable(data) {
        const filteredData = applyFilters(data);
        let rows = filteredData.map((item, index) => `
            <tr key="${item.id}" class="hover:bg-gray-50">
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                    <input type="checkbox" class="form-check row-checkbox accent-[#009333]" data-id="${item.id}" ${state.selectedIds.includes(item.id) ? 'checked' : ''}>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%] text-center">${index + 1}</td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[25%]">
                    <div class="flex items-center gap-2 cursor-pointer">
                        <img src="/images/user.png" alt="avatar" class="w-8 h-8 rounded-full">
                        <div>
                            <div class="text-sm font-medium text-gray-900">${item.name}</div>
                            <div class="text-sm text-gray-500">${item.id}</div>
                        </div>
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                    <div>
                        <div class="text-sm font-medium text-gray-900">${item.date}</div>
                        <div class="text-sm text-gray-500">${item.id}</div>
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                    <div class="text-sm text-gray-900">
                        <i class="${item.categoryIcon} ${item.categoryColor} mr-1"></i>
                        ${item.shift}
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
                    <div class="text-sm text-gray-900">${item.odhrs}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                    <div class="text-sm text-gray-900">${item.time}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%] text-sm font-medium text-center">
                    ${renderActionButton(item)}
                </td>
            </tr>
        `).join('');

        return `
            <div class="ot-table-wrapper">
                <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
                    <div class="flex items-center space-x-2 ml-2">
                        <div class="bulk-actions flex items-center space-x-2">
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="printBtn">
                                <i class="ri-printer-line mr-1"></i> Print
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="summaryBtn">
                                <i class="ri-sticky-note-line mr-1"></i> Summary
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="downloadBtn">
                                <i class="ri-arrow-down-line mr-1"></i> Download
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn">
                                <i class="ri-delete-bin-6-line mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center relative space-x-2">
                        <input class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]" type="text" placeholder="Enter request Number" id="search-input" value="${state.localFilters.requestNumber || ''}">
                        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="filter-toggle-btn">
                            <i class="ri-sort-desc"></i>
                        </button>
                    </div>
                </div>
                <div class="bg-[#ebeff3]">
                    ${state.selectedIds.length > 1 ? `<div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">${state.selectedIds.length} requests selected</div>` : ''}
                    <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
                        <div class="h-full overflow-y-auto">
                            <table class="w-full table-fixed border-collapse">
                                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                                    <tr>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                                            <input type="checkbox" id="select-all-checkbox" class="form-check accent-[#009333]" ${state.selectAll ? 'checked' : ''}>
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">S.No.</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[25%]">Employee Name</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Date</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Shift</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">OT Hrs</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Time</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
                    <span class="text-sm">
                        Showing <span class="text-red-600">${filteredData.length}</span> of <span class="text-blue-600">${data.length}</span>
                    </span>
                </div>
            </div>
        `;
    }

    // Render Shift Change Table
    function renderShiftChangeTable(data) {
        const filteredData = applyFilters(data);
        let rows = filteredData.map((item, index) => `
            <tr key="${item.id}" class="hover:bg-gray-50">
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                    <input type="checkbox" class="form-check row-checkbox accent-[#009333]" data-id="${item.id}" ${state.selectedIds.includes(item.id) ? 'checked' : ''}>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">${index + 1}</td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                    <div class="flex items-center gap-2 cursor-pointer">
                        <img src="/images/user.png" alt="avatar" class="w-8 h-8 rounded-full">
                        <div>
                            <div class="text-sm font-medium text-gray-900">${item.name}</div>
                            <div class="text-sm text-gray-500">${item.id}</div>
                        </div>
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%]">
                    <div class="text-sm text-gray-900">
                        <i class="${item.categoryIcon} ${item.categoryColor} mr-1"></i>
                        ${item.fromDate}
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%]">
                    <div class="text-sm text-gray-900">
                        <i class="${item.categoryIcon} ${item.categoryColor} mr-1"></i>
                        ${item.toDate}
                    </div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                    <div class="text-sm text-gray-900">${item.fromShift}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                    <div class="text-sm text-gray-900">${item.toShift}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[30%]">
                    <div class="text-sm text-gray-900">${item.description}</div>
                </td>
                <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center text-sm font-medium">
                    ${renderActionButton(item)}
                </td>
            </tr>
        `).join('');

        return `
            <div class="shift-change-table-wrapper">
                <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
                    <div class="flex items-center space-x-2 ml-2">
                        <div class="bulk-actions flex items-center space-x-2">
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="printBtn">
                                <i class="ri-printer-line mr-1"></i> Print
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="summaryBtn">
                                <i class="ri-sticky-note-line mr-1"></i> Summary
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="downloadBtn">
                                <i class="ri-arrow-down-line mr-1"></i> Download
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn">
                                <i class="ri-delete-bin-6-line mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center relative space-x-2">
                        <input class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]" type="text" placeholder="Enter request Number" id="search-input" value="${state.localFilters.requestNumber || ''}">
                        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="filter-toggle-btn">
                            <i class="ri-sort-desc"></i>
                        </button>
                    </div>
                </div>
                <div class="bg-[#ebeff3]">
                    ${state.selectedIds.length > 1 ? `<div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">${state.selectedIds.length} requests selected</div>` : ''}
                    <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
                        <div class="h-full overflow-y-auto">
                            <table class="w-full text-sm">
                                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                                    <tr>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                                            <input type="checkbox" id="select-all-checkbox" class="form-check accent-[#009333]" ${state.selectAll ? 'checked' : ''}>
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">S.No.</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Request Details</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%]">From Date</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%]">To Date</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">From shift</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">To Shift</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[30%]">Description</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
                    <span class="text-sm">
                        Showing <span class="text-red-600">${filteredData.length}</span> of <span class="text-blue-600">${data.length}</span>
                    </span>
                </div>
            </div>
        `;
    }

    // Render action button based on status
    function renderActionButton(item) {
        if (item.approvalStatus === "Approved") {
            return `<i class="ri-check-line text-green-600 text-lg cursor-pointer action-btn" data-id="${item.id}" title="Approved"></i>`;
        } else if (item.approvalStatus === "Rejected") {
            return `<i class="ri-close-line text-red-600 text-lg cursor-pointer action-btn" data-id="${item.id}" title="Rejected"></i>`;
        } else if (item.approvalStatus === "Pending") {
            return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 cursor-pointer action-btn" data-id="${item.id}">Needs Approval</span>`;
        }
        return `<span class="text-gray-500">Unknown Status</span>`;
    }

    // Apply filters
    function applyFilters(data) {
        let filtered = [...data];
        
        if (state.filters.requestNumber) {
            filtered = filtered.filter(item => item.id.includes(state.filters.requestNumber));
        }

        if (state.activeTab === 'Permission' && state.filters.permissionType) {
            filtered = filtered.filter(item => item.type.toLowerCase().includes(state.filters.permissionType.toLowerCase()));
        }

        if (state.activeTab === 'Leave' && state.filters.LeaveType) {
            filtered = filtered.filter(item => item.type.toLowerCase().includes(state.filters.LeaveType.toLowerCase()));
        }

        if (state.activeTab === 'OT' && state.filters.reason) {
            filtered = filtered.filter(item => item.description.toLowerCase().includes(state.filters.reason.toLowerCase()));
        }

        if (state.activeTab === 'OD' && state.filters.reason) {
            filtered = filtered.filter(item => item.description.toLowerCase().includes(state.filters.reason.toLowerCase()));
        }

        if (state.activeTab === 'ShiftChange') {
            if (state.filters.fromShift) {
                filtered = filtered.filter(item => item.fromShift.toLowerCase().includes(state.filters.fromShift.toLowerCase()));
            }
            if (state.filters.toShift) {
                filtered = filtered.filter(item => item.toShift.toLowerCase().includes(state.filters.toShift.toLowerCase()));
            }
        }

        if (state.filters.approvalStatus) {
            filtered = filtered.filter(item => item.approvalStatus?.toLowerCase() === state.filters.approvalStatus.toLowerCase());
        }

        return filtered;
    }

    // Render filter modal
    function renderFilterModal() {
        const content = document.getElementById('filter-content');
        if (!content) return;

        let html = '';

        if (state.activeTab === 'Permission') {
            html = `
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Request Number</label>
                    <input type="text" placeholder="Enter request number" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-request-number" value="${state.localFilters.requestNumber || ''}">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Permission Type</label>
                    <input type="text" placeholder="Enter permission type" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-permission-type" value="${state.localFilters.permissionType || ''}">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Approval Status</label>
                    <select class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-approval-status">
                        <option value="">All Status</option>
                        <option value="Approved" ${state.localFilters.approvalStatus === 'Approved' ? 'selected' : ''}>Approved</option>
                        <option value="Rejected" ${state.localFilters.approvalStatus === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        <option value="Pending" ${state.localFilters.approvalStatus === 'Pending' ? 'selected' : ''}>Needs Approval</option>
                    </select>
                </div>
            `;
        } else if (state.activeTab === 'Leave') {
            html = `
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Request Number</label>
                    <input type="text" placeholder="Enter request number" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-request-number" value="${state.localFilters.requestNumber || ''}">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Leave Type</label>
                    <input type="text" placeholder="Enter Leave type" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-leave-type" value="${state.localFilters.LeaveType || ''}">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Approval Status</label>
                    <select class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-approval-status">
                        <option value="">All Status</option>
                        <option value="Approved" ${state.localFilters.approvalStatus === 'Approved' ? 'selected' : ''}>Approved</option>
                        <option value="Rejected" ${state.localFilters.approvalStatus === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        <option value="Pending" ${state.localFilters.approvalStatus === 'Pending' ? 'selected' : ''}>Needs Approval</option>
                    </select>
                </div>
            `;
        } else if (state.activeTab === 'OT' || state.activeTab === 'OD') {
            html = `
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Request Number</label>
                    <input type="text" placeholder="Enter request number" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-request-number" value="${state.localFilters.requestNumber || ''}">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Reason</label>
                    <input type="text" placeholder="Enter reason" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-reason" value="${state.localFilters.reason || ''}">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Approval Status</label>
                    <select class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-approval-status">
                        <option value="">All Status</option>
                        <option value="Approved" ${state.localFilters.approvalStatus === 'Approved' ? 'selected' : ''}>Approved</option>
                        <option value="Rejected" ${state.localFilters.approvalStatus === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        <option value="Pending" ${state.localFilters.approvalStatus === 'Pending' ? 'selected' : ''}>Needs Approval</option>
                    </select>
                </div>
            `;
        } else if (state.activeTab === 'ShiftChange') {
            html = `
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Request Number</label>
                    <input type="text" placeholder="Enter request number" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-request-number" value="${state.localFilters.requestNumber || ''}">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">From Shift</label>
                    <select class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-from-shift">
                        <option value="">All Shifts</option>
                        <option value="Morning (9 AM - 5 PM)" ${state.localFilters.fromShift === 'Morning (9 AM - 5 PM)' ? 'selected' : ''}>Morning (9 AM - 5 PM)</option>
                        <option value="Evening (1 PM - 9 PM)" ${state.localFilters.fromShift === 'Evening (1 PM - 9 PM)' ? 'selected' : ''}>Evening (1 PM - 9 PM)</option>
                        <option value="Night (9 PM - 5 AM)" ${state.localFilters.fromShift === 'Night (9 PM - 5 AM)' ? 'selected' : ''}>Night (9 PM - 5 AM)</option>
                        <option value="Morning (6 AM - 2 PM)" ${state.localFilters.fromShift === 'Morning (6 AM - 2 PM)' ? 'selected' : ''}>Morning (6 AM - 2 PM)</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">To Shift</label>
                    <select class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-to-shift">
                        <option value="">All Shifts</option>
                        <option value="Morning (9 AM - 5 PM)" ${state.localFilters.toShift === 'Morning (9 AM - 5 PM)' ? 'selected' : ''}>Morning (9 AM - 5 PM)</option>
                        <option value="Evening (1 PM - 9 PM)" ${state.localFilters.toShift === 'Evening (1 PM - 9 PM)' ? 'selected' : ''}>Evening (1 PM - 9 PM)</option>
                        <option value="Night (9 PM - 5 AM)" ${state.localFilters.toShift === 'Night (9 PM - 5 AM)' ? 'selected' : ''}>Night (9 PM - 5 AM)</option>
                        <option value="Morning (6 AM - 2 PM)" ${state.localFilters.toShift === 'Morning (6 AM - 2 PM)' ? 'selected' : ''}>Morning (6 AM - 2 PM)</option>
                    </select>
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Approval Status</label>
                    <select class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" id="filter-approval-status">
                        <option value="">All Status</option>
                        <option value="Approved" ${state.localFilters.approvalStatus === 'Approved' ? 'selected' : ''}>Approved</option>
                        <option value="Rejected" ${state.localFilters.approvalStatus === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        <option value="Pending" ${state.localFilters.approvalStatus === 'Pending' ? 'selected' : ''}>Needs Approval</option>
                    </select>
                </div>
            `;
        }

        content.innerHTML = html;
    }

    // Open filter modal
    function openFilterModal() {
        state.isFilterOpen = true;
        state.localFilters = {...state.filters};
        renderFilterModal();
        
        const modal = document.getElementById('filter-modal');
        const sidebar = document.getElementById('filter-sidebar');
        if (modal && sidebar) {
            modal.classList.remove('opacity-0', 'pointer-events-none');
            sidebar.classList.remove('translate-x-full');
            sidebar.classList.add('translate-x-0');
        }
    }

    // Close filter modal
    function closeFilterModal() {
        state.isFilterOpen = false;
        const modal = document.getElementById('filter-modal');
        const sidebar = document.getElementById('filter-sidebar');
        if (modal && sidebar) {
            modal.classList.add('opacity-0', 'pointer-events-none');
            sidebar.classList.remove('translate-x-0');
            sidebar.classList.add('translate-x-full');
        }
    }

    // Apply filters
    function applyFilterFilters() {
        const data = getCurrentData();
        
        if (state.activeTab === 'Permission') {
            state.filters = {
                requestNumber: document.getElementById('filter-request-number')?.value || '',
                permissionType: document.getElementById('filter-permission-type')?.value || '',
                approvalStatus: document.getElementById('filter-approval-status')?.value || ''
            };
        } else if (state.activeTab === 'Leave') {
            state.filters = {
                requestNumber: document.getElementById('filter-request-number')?.value || '',
                LeaveType: document.getElementById('filter-leave-type')?.value || '',
                approvalStatus: document.getElementById('filter-approval-status')?.value || ''
            };
        } else if (state.activeTab === 'OT' || state.activeTab === 'OD') {
            state.filters = {
                requestNumber: document.getElementById('filter-request-number')?.value || '',
                reason: document.getElementById('filter-reason')?.value || '',
                approvalStatus: document.getElementById('filter-approval-status')?.value || ''
            };
        } else if (state.activeTab === 'ShiftChange') {
            state.filters = {
                requestNumber: document.getElementById('filter-request-number')?.value || '',
                fromShift: document.getElementById('filter-from-shift')?.value || '',
                toShift: document.getElementById('filter-to-shift')?.value || '',
                approvalStatus: document.getElementById('filter-approval-status')?.value || ''
            };
        }

        closeFilterModal();
        renderTable();
    }

    // Clear filters
    function clearFilters() {
        state.filters = {};
        state.localFilters = {};
        closeFilterModal();
        renderTable();
    }

    // Open approval modal
    function openApprovalModal(item) {
        state.isApprovalModalOpen = true;
        state.selectedItem = item;
        state.remarks = '';

        const modal = document.getElementById('approval-modal');
        const title = document.getElementById('approval-modal-title');
        const remarks = document.getElementById('approval-remarks');

        if (modal) {
            modal.classList.remove('opacity-0', 'pointer-events-none');
        }

        if (title) {
            const titles = {
                'Permission': 'Permission Action',
                'Leave': 'Leave Action',
                'OT': 'OT Action',
                'OD': 'OD Action',
                'ShiftChange': 'Shiftchange Action'
            };
            title.textContent = titles[state.activeTab] || 'Action';
        }

        if (remarks) {
            remarks.value = '';
        }
    }

    // Close approval modal
    function closeApprovalModal() {
        state.isApprovalModalOpen = false;
        state.selectedItem = null;
        state.remarks = '';

        const modal = document.getElementById('approval-modal');
        if (modal) {
            modal.classList.add('opacity-0', 'pointer-events-none');
        }
    }

    // Handle approval action
    function handleApprovalAction(type) {
        const remarks = document.getElementById('approval-remarks');
        if (remarks) {
            state.remarks = remarks.value;
        }

        const payload = {
            data: {
                id: state.selectedItem?.id,
                remarks: state.remarks,
                status: type === "approve" ? 1 : 0,
            },
        };

        console.log(payload);
        closeApprovalModal();
        // Here you would typically make an API call
    }

    // Attach event listeners to table
    function attachTableEventListeners() {
        // Select all checkbox
        const selectAll = document.getElementById('select-all-checkbox');
        if (selectAll) {
            selectAll.onchange = function(e) {
                state.selectAll = e.target.checked;
                const data = getCurrentData();
                if (state.selectAll) {
                    state.selectedIds = data.map(item => item.id);
                } else {
                    state.selectedIds = [];
                }
                renderTable();
            };
        }

        // Row checkboxes
        document.querySelectorAll('.row-checkbox').forEach(checkbox => {
            checkbox.onchange = function(e) {
                const id = e.target.getAttribute('data-id');
                if (e.target.checked) {
                    if (!state.selectedIds.includes(id)) {
                        state.selectedIds.push(id);
                    }
                } else {
                    state.selectedIds = state.selectedIds.filter(i => i !== id);
                }
                const data = getCurrentData();
                state.selectAll = state.selectedIds.length === data.length;
                renderTable();
            };
        });

        // Action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.onclick = function() {
                const id = btn.getAttribute('data-id');
                const data = getCurrentData();
                const item = data.find(d => d.id === id);
                if (item) {
                    openApprovalModal(item);
                }
            };
        });

        // Filter toggle
        const filterToggle = document.getElementById('filter-toggle-btn');
        if (filterToggle) {
            filterToggle.onclick = openFilterModal;
        }

        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.oninput = function(e) {
                state.localFilters.requestNumber = e.target.value;
            };
        }
    }

    // Initialize
    function init() {
        updateCounts();
        renderTable();

        // Tab switching
        document.querySelectorAll('#approval-tabs .tab').forEach(btn => {
            btn.onclick = function() {
                const tab = btn.getAttribute('data-tab');
                if (tab) {
                    switchTab(tab);
                }
            };
        });

        // Tab close buttons
        document.querySelectorAll('.tab-close').forEach(btn => {
            btn.onclick = function(e) {
                e.stopPropagation();
                switchTab('Permission');
            };
        });

        // Filter modal
        document.getElementById('filter-backdrop')?.addEventListener('click', closeFilterModal);
        document.getElementById('filter-close-btn')?.addEventListener('click', closeFilterModal);
        document.getElementById('filter-apply-btn')?.addEventListener('click', applyFilterFilters);
        document.getElementById('filter-reset-btn')?.addEventListener('click', clearFilters);

        // Approval modal
        document.getElementById('approval-backdrop')?.addEventListener('click', closeApprovalModal);
        document.getElementById('approval-close-btn')?.addEventListener('click', closeApprovalModal);
        document.getElementById('approval-approve-btn')?.addEventListener('click', () => handleApprovalAction('approve'));
        document.getElementById('approval-reject-btn')?.addEventListener('click', () => handleApprovalAction('reject'));
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

