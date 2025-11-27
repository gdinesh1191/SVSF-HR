

<!-- Punch Data / Monthly Attendance -->
<div class="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
    <div class="flex items-center space-x-2">
        <button class="bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-default">
            <span class="flex items-center gap-1">
                <i class="ri-user-follow-line mr-1"></i>
                Punch Data
            </span>
        </button>
    </div>
</div>

<div class="overflow-y-hidden h-[calc(100vh-43px)]">
    <div class="bg-gray-50 py-4 h-full">
        <div class="max-w-full mx-auto bg-white rounded-lg h-full flex flex-col">
            <!-- Header -->
            <div id="attendanceHeader"
                 class="bg-[#ebeff3] px-3 py-1 border-b flex justify-between items-center">
                <div class="flex items-center space-x-2 text-sm">
                    <h2 class="font-medium text-gray-900">
                        Employee Monthly Attendance:
                        <span class="font-bold text-[#009333]">
                            <?php echo htmlspecialchars($employeeName, ENT_QUOTES); ?>
                            (<?php echo htmlspecialchars($employeeCode, ENT_QUOTES); ?>)
                        </span>
                        -
                        <span id="attendanceMonthLabel">Select Month</span>
                    </h2>
                </div>

                <div class="flex items-center relative space-x-2 text-sm">
                    <!-- Month select (replaces React SearchableSelect) -->
                    <select id="monthSelect"
                            class="block min-w-[180px] text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                    ></select>

                    <div class="border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm">
                        <button id="currentMonthBtn"
                                class="flex items-center py-1.5 px-2 hover:bg-[#ebeff3] cursor-pointer">
                            Current Month
                        </button>
                    </div>

                    <!-- Print button / modal trigger -->
                    <button id="openPrintModalBtn"
                            class="bg-gray-700 text-white px-3 py-1 rounded cursor-pointer flex items-center justify-center">
                        <i class="ri-printer-line"></i>
                    </button>

                    <button class="bg-white border border-[#cfd7df] px-2 py-0.5 rounded">
                        <i class="ri-more-fill text-lg"></i>
                    </button>

                    <!-- Filters sidebar trigger -->
                    <button id="openFilterSidebarBtn"
                            class="py-1.5 px-2 text-sm rounded border cursor-pointer bg-white text-[#384551] border-[#cfd7df] hover:bg-[#eceff1]">
                        <i class="ri-sort-desc mr-1"></i>
                    </button>
                </div>
            </div>

            <!-- Stats Cards -->
            <div id="attendanceStatsHeader" class="px-6 py-4 bg-white border-b">
                <div class="grid grid-cols-9 gap-4 text-sm">
                    <div class="flex justify-around items-center bg-gray-50 space-x-2 border border-gray-200 rounded-md p-1">
                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="ri-checkbox-circle-fill text-green-500 text-lg text-center"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-sm font-medium">Present</div>
                            <div id="statPresent" class="text-xl font-bold">-</div>
                        </div>
                    </div>

                    <div class="flex justify-around items-center bg-gray-50 space-x-2 border border-gray-200 rounded-md p-1">
                        <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <i class="ri-close-circle-fill text-red-500 text-lg text-center"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-sm">Absent</div>
                            <div id="statAbsent" class="text-xl font-bold">-</div>
                        </div>
                    </div>

                    <div class="flex justify-around items-center bg-gray-50 space-x-2 border border-gray-200 rounded-md p-1">
                        <div class="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <i class="ri-error-warning-fill text-yellow-500 text-lg text-center"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-sm">W.S</div>
                            <div id="statWS" class="text-xl font-bold">-</div>
                        </div>
                    </div>

                    <div class="flex justify-around items-center bg-gray-50 space-x-2 border border-gray-200 rounded-md p-1">
                        <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <i class="ri-calendar-fill text-gray-500 text-lg text-center"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-sm">W.O</div>
                            <div id="statWO" class="text-xl font-bold">-</div>
                        </div>
                    </div>

                    <div class="flex justify-around items-center bg-gray-50 space-x-2 border border-gray-200 rounded-md p-1">
                        <div class="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                            <i class="ri-error-warning-fill text-cyan-500 text-lg text-center"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-sm">MSP</div>
                            <div id="statMSP" class="text-xl font-bold">-</div>
                        </div>
                    </div>

                    <div class="flex justify-around items-center bg-gray-50 space-x-2 border border-gray-200 rounded-md p-1">
                        <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <i class="ri-contrast-fill text-blue-500 text-lg text-center"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-sm">P/A</div>
                            <div id="statPA" class="text-xl font-bold">-</div>
                        </div>
                    </div>

                    <div class="flex justify-around items-center bg-gray-50 space-x-2 border border-gray-200 rounded-md p-1">
                        <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <i class="ri-time-fill text-green-500 text-lg text-center"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-sm">OT</div>
                            <div id="statOT" class="text-xl font-bold">-</div>
                        </div>
                    </div>

                    <div class="flex justify-around items-center bg-gray-50 space-x-2 border border-gray-200 rounded-md p-1">
                        <div class="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                            <i class="ri-briefcase-fill text-cyan-600 text-center"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-sm">OD</div>
                            <div id="statOD" class="text-xl font-bold">-</div>
                        </div>
                    </div>

                    <div class="flex justify-around items-center bg-gray-50 space-x-2 border border-gray-200 rounded-md p-1">
                        <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <i class="ri-time-fill text-red-500 text-lg text-center"></i>
                        </div>
                        <div class="text-center">
                            <div class="text-sm">Late</div>
                            <div id="statLate" class="text-xl font-bold">-</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="flex-1 overflow-hidden bg-white">
                <div class="h-full overflow-x-auto overflow-y-auto relative">
                    <table class="w-full text-[14px]">
                        <thead class="sticky top-0 bg-[#f8fafc] z-10">
                        <tr>
                            <th class="px-2 py-1 border text-center">Day</th>
                            <th class="px-2 py-1 border text-left">Day Name</th>
                            <th class="px-2 py-1 border text-center" colspan="2">Primary Shift</th>
                            <th class="px-2 py-1 border text-center" colspan="2">Shift 1</th>
                            <th class="px-2 py-1 border text-center" colspan="2">Shift 2</th>
                            <th class="px-2 py-1 border text-center">Late</th>
                            <th class="px-2 py-1 border text-center">P.R</th>
                            <th class="px-2 py-1 border text-center">E.G</th>
                            <th class="px-2 py-1 border text-center">OT</th>
                            <th class="px-2 py-1 border text-center">OD</th>
                            <th class="px-2 py-1 border text-center">Status</th>
                        </tr>
                        <tr>
                            <th class="px-2 py-1 border"></th>
                            <th class="px-2 py-1 border"></th>
                            <th class="px-2 py-1 border text-center">IN Time</th>
                            <th class="px-2 py-1 border text-center">Out Time</th>
                            <th class="px-2 py-1 border text-center">IN Time</th>
                            <th class="px-2 py-1 border text-center">Out Time</th>
                            <th class="px-2 py-1 border text-center">IN Time</th>
                            <th class="px-2 py-1 border text-center">Out Time</th>
                            <th class="px-2 py-1 border text-center"></th>
                            <th class="px-2 py-1 border text-center"></th>
                            <th class="px-2 py-1 border text-center"></th>
                            <th class="px-2 py-1 border text-center"></th>
                            <th class="px-2 py-1 border text-center"></th>
                            <th class="px-2 py-1 border text-center"></th>
                        </tr>
                        </thead>
                        <tbody id="attendanceTableBody">
                        <!-- Filled dynamically by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Print Preview Modal -->
<div id="printModal"
     class="fixed inset-0 flex items-center justify-center bg-black/50 z-50 hidden">
    <div class="bg-white rounded-lg shadow-lg w-[60%] h-[80%] relative flex flex-col">
        <!-- Header -->
        <div class="flex items-center justify-between mb-0 px-4 py-3 border-b border-gray-200">
            <h2 class="text-lg text-[#12375D] font-medium flex items-center gap-1.5">
                <i class="ri-file-text-line text-[#12375D] text-xl"></i>
                Print Preview
            </h2>

            <div class="flex items-center gap-4">
                <button id="printModalPrintBtn"
                        class="py-1 px-3 text-sm rounded border cursor-pointer bg-[#009333] text-white border-[#009333] hover:bg-[#007a2a] flex items-center gap-1">
                    <i class="ri-printer-line text-base"></i>
                    Print
                </button>

                <button id="closePrintModalBtn"
                        class="text-gray-600 hover:text-black text-2xl leading-none cursor-pointer">
                    <i class="ri-close-line text-xl"></i>
                </button>
            </div>
        </div>

        <!-- Modal Content -->
        <div class="overflow-y-auto px-4 py-4 flex-1 text-sm">
            <!-- You can customize what should be printed; for now we show a small note. -->
            <p class="mb-4 text-gray-700">
                Use the browser print dialog to print the current attendance view.
            </p>
        </div>
    </div>
</div>

<!-- Filter Sidebar -->
<div id="filterSidebarWrapper"
     class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">
    <!-- Backdrop -->
    <div id="filterSidebarBackdrop"
         class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <!-- Sidebar Content -->
    <div id="filterSidebarPanel"
         class="relative w-80 mt-[7.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col translate-x-full">
        <!-- Header -->
        <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center">
            <h5 class="text-sm text-[#12344d]">Add Filters</h5>
            <button id="closeFilterSidebarBtn"
                    class="text-[#12344d] cursor-pointer">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-4 overflow-y-auto flex-1 text-sm">
            <div class="mb-4">
                <div class="flex flex-col md:flex-row gap-2">
                    <div class="w-35">
                        <label for="fromDateInput" class="block mb-1 text-xs text-gray-700">From Date</label>
                        <input id="fromDateInput" type="date"
                               class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                    </div>
                    <div class="w-35">
                        <label for="toDateInput" class="block mb-1 text-xs text-gray-700">To Date</label>
                        <input id="toDateInput" type="date"
                               class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <label for="groupSelect" class="block mb-1 text-xs text-gray-700">Group</label>
                <select id="groupSelect"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                    <option value="">Select Group</option>
                </select>
            </div>

            <div class="mb-4">
                <label for="sectionSelect" class="block mb-1 text-xs text-gray-700">Section</label>
                <select id="sectionSelect"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                    <option value="">Select Section</option>
                </select>
            </div>

            <div class="mb-4">
                <label class="block mb-1 text-xs text-gray-700">Report Type</label>
                <div class="space-y-1">
                    <label class="inline-flex items-center gap-1 text-sm text-gray-700">
                        <input type="radio" name="reportType" value="sectionWise" class="text-[#009333] accent-[#009333]" checked>
                        <span>Section Wise</span>
                    </label>
                    <label class="inline-flex items-center gap-1 text-sm text-gray-700">
                        <input type="radio" name="reportType" value="employeeWise" class="text-[#009333] accent-[#009333]">
                        <span>Employee Wise</span>
                    </label>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button id="resetFilterBtn"
                    class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef]">
                Reset All
            </button>
            <button id="applyFilterBtn"
                    class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a]">
                Apply
            </button>
        </div>
    </div>
</div>

<script src="/module/pages/punchData/list.js"></script>




