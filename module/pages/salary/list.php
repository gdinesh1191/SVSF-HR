<div class="flex justify-between items-center bg-white px-1.5 mt-[8px] ml-2 whitespace-nowrap">

    <!-- STATIC TABS (HTML Only) -->
    <ul id="tabsContainer" class="flex flex-nowrap text-sm font-medium text-center">

        <li>
            <button
                class="tab active-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer"
                data-tab="all">
                <span class="flex items-center ">
                    <!-- Salary icon added here -->
                    <i class="ri-money-dollar-circle-line mr-1"></i>
                    Salary List
                    <span
                        class="ml-2 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">12</span>
                    <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closeTab"></i>
                </span>
            </button>

        </li>



    </ul>

    <!-- RIGHT BUTTONS -->
    <div class="flex items-center flex-shrink-0 ml-auto">
        <button id="openCustomizeBtn"
            class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#eceff1] hover:border-[#eceff1]">
            <i class="ri-equalizer-line mr-1"></i> Customize Table
        </button>


        <div class="inline-flex border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm ml-2">
            <button class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer">
                <i class="ri-download-line mr-1"></i>
                Import Salary
            </button>
            <button class="px-2 border-l border-[#cfd7df] hover:bg-[#ebeff3] cursor-pointer">
                <i class="ri-arrow-down-s-line"></i>
            </button>
        </div>


    </div>
</div>



<!-- SUB HEADER -->
<div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
    <div className="bulk-actions flex items-center space-x-2">
        <button
            class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 "
            disabled id="printBtn">
            <i class="ri-printer-line mr-1"></i>
            Print
        </button>
        <button
            class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 "
            disabled id="summaryBtn">
            <i class="ri-sticky-note-line mr-1"></i>
            Summary
        </button>
        <button id="downloadBtn"
            class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 "
            disabled>
            <i class="ri-arrow-down-line mr-1"></i>
            Download
        </button>

        <button id="deleteBtn"
            class="py-1 px-2 text-sm rounded border border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] cursor-pointer ">
            <i class="ri-delete-bin-6-line mr-1"></i>
            Delete
        </button>


    </div>



    <div class="flex items-center relative space-x-2">
        <input type="text" placeholder="Enter Salary Name" class="block w-full h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]
         placeholder:text-[13px] placeholder:text-[#585858]" />
        <button id="openFilterBtn"
            class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]"><i
                class="ri-filter-3-fill"></i></button>
    </div>
</div>
<div id="selectedBadge"
    class="hidden fixed top-[176px] left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
    0 items selected
</div>


<!-- TABLE WRAPPER -->
<div class="bg-[#ebeff3]">
    <div class="mx-2 h-[calc(100vh-189px)] overflow-hidden rounded-lg bg-white">
        <div class="h-full overflow-y-auto overflow-x-auto w-full">
            <table class="w-full min-w-max">
                <thead
                    class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                    <tr class="text-left divide-x divide-[#ebeff3]">
                        <th class="p-2"><input type="checkbox" id="selectAll" class="accent-green-600 cursor-pointer" />
                        </th>
                        <th class="p-2">S.no</th>
                        <th class="p-2">Salary Details</th>
                        <th class="p-2">Designation</th>
                        <th class="p-2">Department</th>
                        <th class="p-2">Base Salary</th>
                        <th class="p-2">Deduction Amount</th>
                        <th class="p-2">Status</th>


                    </tr>
                </thead>


                <tbody id="SalaryTableBody">
                    <!-- Rows will be inserted here dynamically -->
                </tbody>
            </table>

        </div>
    </div>
</div>

<!-- FOOTER -->
<footer class="bg-[#ebeff3] h-[54px] px-4 flex items-center justify-start">
    <span class="text-sm">
        Showing <span class="text-red-600">10</span> of <span class="text-blue-600">20</span>
    </span>
</footer>

<!-- Filter Sidebar -->
<div id="filterSidebar"
    class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">

    <!-- Backdrop -->
    <div id="filterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <!-- Sidebar Content -->
    <div id="filterPanel"
        class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col h-[calc(100vh-5.55rem)]">

        <!-- Header -->
        <div
            class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Filters</h5>
            <button id="filterCloseBtn" class="cursor-pointer text-sm">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-4 overflow-y-auto flex-1">

            <!-- Designation -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Designation</label>
                <input type="text" id="designationInput" class="block w-full  h-[35px] px-[0.75rem] py-[0.375rem] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] 
               focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]"
                    placeholder="Enter Designation">
            </div>


            <!-- Status -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Status</label>

                <div class="flex space-x-6"> <!-- space-x-6 adds horizontal spacing -->
                    <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="status" value="active" class="accent-[#009333] cursor-pointer">
                        Active
                    </label>

                    <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="status" value="inactive" class="accent-[#009333] cursor-pointer">
                        Inactive
                    </label>
                </div>

            </div>

        </div>

        <!-- Footer -->
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button id="resetBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">
                Reset All
            </button>
            <button id="applyBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                Apply
            </button>
        </div>
    </div>
</div>


<!-- <div id="customizedTableSidebar"
    class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">
    <div id="customizedTablePanel"
        class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col h-[calc(100vh-5.55rem)]">
        <div
            class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Customize Table </h5>
            <button id="customizedTableCloseBtn" class="cursor-pointer text-lg">
                <i class="ri-close-line"></i>
            </button>
        </div>
        <div class="overflow-y-auto flex-1 flex flex-col px-4">
            <div class="py-3">
                <div class="relative">
                    <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[#585858]"></i>
                    <input type="text" id="fieldSearchInput" placeholder="Search fields here..."
                        class="pl-9 pr-4 block w-full  h-[35px] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]">
                </div>
            </div>
            <div class="pb-3 my-2.5">
                <div class="text-sm font-semibold text-[#12344d]">
                    Fields visible in table <span id="visibleCount" class="font-normal text-gray-600">0/0</span>
                </div>
                <div id="visibleFields" class="space-y-1"></div>
            </div>

            <div class="pb-3">
                <div class="text-sm font-semibold text-[#12344d] mb-2">
                    Fields not shown in table
                </div>
                <div id="hiddenFields" class="space-y-1"></div>
            </div>
        </div>
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2 sticky bottom-0 bg-white z-10">
            <button id="customizedTableResetBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">
                Reset All
            </button>
            <button id="customizedTableApplyBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                Apply
            </button>
        </div>
    </div> -->
    
    
    <div id="customizedTableSidebar"
    class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">

<!-- Backdrop -->
<div id="customizedTableBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

<!-- Sidebar Content -->
<div id="customizedTablePanel"
    class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col h-[calc(100vh-5.55rem)]">

    <!-- Header -->
    <div
        class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
        <h5>Customize Table </h5>
        <button id="customizedTableCloseBtn" class="cursor-pointer text-lg">
            <i class="ri-close-line"></i>
        </button>
    </div>

    <div class="overflow-y-auto flex-1 flex flex-col px-4">
            <div class="py-3">
                <div class="relative">
                    <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-[#585858]"></i>
                    <input type="text" id="fieldSearchInput" placeholder="Search fields here..."
                        class="pl-9 pr-4 block w-full  h-[35px] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]">
                </div>
            </div>
            <div class="pb-3 my-2.5">
                <div class="text-sm font-semibold text-[#12344d]">
                    Fields visible in table <span id="visibleCount" class="font-normal text-gray-600">0/0</span>
                </div>
                <div id="visibleFields" class="space-y-1"></div>
            </div>

            <div class="pb-3">
                <div class="text-sm font-semibold text-[#12344d] mb-2">
                    Fields not shown in table
                </div>
                <div id="hiddenFields" class="space-y-1"></div>
            </div>
        </div>
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2 sticky bottom-0 bg-white z-10">
            <button id="customizedTableResetBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">
                Reset All
            </button>
            <button id="customizedTableApplyBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                Apply
            </button>
    </div>
</div>
</div>


    <!-- Overlay -->
    <div id="payrollSidebarOverlay" class="fixed inset-0 bg-black bg-opacity-40 hidden z-40"></div>


    <!-- Sidebar -->
    <div id="payrollSidebar"
        class="fixed top-0 right-[-750px] w-[750px] h-full bg-white shadow-xl z-50 transition-all duration-300 flex flex-col">

        <!-- Header -->
        <div class="flex justify-between items-center px-4 py-3 text-[#12344d] border-b border-gray-200">
            <h2 class="text-lg" id="payrollSidebarTitle">Payroll Calculation Rules</h2>
            <button id="closePayrollSidebar" class="text-gray-500 hover:text-black">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
            <button class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-[#009333] text-[#009333] "
                data-tab="salaryTab">
                Salary Details
            </button>
            <button
                class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black"
                data-tab="incrementTab">
                Increment
            </button>
            <button
                class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black"
                data-tab="newIncrementTab">
                New Increment
            </button>
        </div>

        <!-- Salary Details TAB Content -->
        <div id="salaryTab" class="p-4 overflow-y-auto flex-1 bg-gray-50">

            <!-- Monthly Entries Section -->
            <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div class="mb-4">
                    <h3 class="text-lg font-semibold mb-2 text-gray-800">Monthly Entries</h3>
                    <div class="flex gap-2">
                        <button
                            class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                            <i class="ri-add-line"></i> Base Salary
                        </button>
                        <button
                            class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                            <i class="ri-add-line"></i> Non-working days
                        </button>
                    </div>
                </div>


                <div class="overflow-x-auto">
                    <table class="w-full  divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Designation</th>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount</th>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">10000</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">10000</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">10000</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">10000</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Deduction Section -->
            <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div class="mb-4">
                    <h3 class="text-lg font-semibold mb-2 text-gray-800">Deduction</h3>
                    <button
                        class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                        <i class="ri-add-line"></i> Apply a rule
                    </button>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full  divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Designation</th>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount</th>
                                <th
                                    class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">100</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Late Entry</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">100</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Late Entry</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">100</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Late Entry</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">100</td>
                                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Late Entry</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Increment TAB Content -->
        <div id="incrementTab" class="hidden flex-1 overflow-y-auto p-6 bg-gray-50">
            <div class="mb-6 bg-white rounded-lg shadow-sm p-4">
                <div>
                    <h2 class="text-lg font-semibold mb-3 text-gray-800">Increment</h2>

                    <!-- Table -->
                    <div class="overflow-x-auto">
                        <table class="w-full  divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        START DATE</th>
                                    <th
                                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        AMOUNT</th>
                                    <th
                                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        DESCRIPTION</th>
                                    <th
                                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ENTERED BY</th>
                                    <th
                                        class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        APPROVED BY</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">06/05/2023</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">1,500</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">06/05/2023</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">1,500</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">06/05/2023</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">1,500</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                                </tr>
                                <tr>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">06/05/2023</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">1,500</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill
                                    </td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                                    <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div id="newIncrementTab" class="hidden flex-1 overflow-y-auto p-4 bg-gray-50">
            <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div>
                    <h2 class="text-lg font-semibold mb-3 text-gray-800">New Increment</h2>

                    <form class="space-y-4">
                        <!-- Start Date -->
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">
                                Start Date<span class="text-red-500">*</span>
                            </label>
                            <input type="date" value="2025-11-24"
                                class="w-2/3 w-full px-2  py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#009333]" />
                        </div>

                        <!-- Amount -->
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">
                                Amount<span class="text-red-500">*</span>
                            </label>
                            <input type="text" placeholder="Enter Amount"
                                class="w-2/3 w-full px-2  py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#009333]" />
                        </div>

                        <!-- Description -->
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">
                                Description<span class="text-red-500">*</span>
                            </label>
                            <input type="text" placeholder="Enter Description"
                                class="w-2/3 w-full px-2  py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#009333]" />
                        </div>
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">

                            </label>
                            <button type="submit"
                                class="w-2/3 w-full px-2 py-2 text-sm  rounded bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition" />
                            Save
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>


    </div>


    <script src="/module/pages/salary/list.js"></script>