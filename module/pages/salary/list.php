<div class="flex justify-between items-center bg-white px-1.5 mt-[8px] ml-2 whitespace-nowrap">

    <!-- STATIC TABS (HTML Only) -->
    <ul id="tabsContainer" class="flex flex-nowrap text-sm font-medium text-center">

        <li>
            <button
                class="tab active-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer "
                data-tab="all">
                <span class="flex items-center gap-1">
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
    <button 
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
         placeholder:text-sm placeholder:text-[#585858]" />
        <button id="openFilterBtn"
            class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]"><i
                class="ri-filter-3-fill"></i></button>
    </div>
</div>

<!-- TABLE WRAPPER -->
<div class="bg-[#ebeff3]">
    <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
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
            <button id="filterCloseBtn" class="cursor-pointer text-lg">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-4 overflow-y-auto flex-1">

            <!-- Designation -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Designation</label>
                <input type="text" id="designationInput"
                    class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                    placeholder="Enter Designation">
            </div>

            <!-- Status -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Status</label>

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
       
        <!-- Footer -->
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button id="resetBtn" class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">
                Reset All
            </button>
            <button id="applyBtn" class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                Apply
            </button>
        </div>
    </div>
</div>




<!-- Customized Table Sidebar -->
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

        <!-- Scrollable Content -->
        <div class="overflow-y-auto flex-1 flex flex-col">
            
            <!-- Search Box -->
            <div class="p-4 pb-3">
                <div class="relative">
                    <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="text" id="fieldSearchInput" placeholder="Search fields here..." 
                        class="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#009333] focus:ring-1 focus:ring-[#009333]">
                </div>
            </div>

            <!-- Fields visible in table -->
            <div class="px-4 pb-3">
                <div class="text-sm font-semibold text-[#12344d] mb-2">
                    Fields visible in table <span id="visibleCount" class="font-normal text-gray-600">0/0</span>
                </div>
                <div id="visibleFields" class="space-y-1"></div>
            </div>

            <!-- Fields not shown in table -->
            <div class="px-4 pb-3 border-t border-gray-200 pt-3">
                <div class="text-sm font-semibold text-[#12344d] mb-2">
                    Fields not shown in table
                </div>
                <div id="hiddenFields" class="space-y-1"></div>
            </div>

        </div>

        <!-- Footer -->
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button id="customizedTableResetBtn" class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">
                Reset All
            </button>
            <button id="customizedTableApplyBtn" class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                Apply
            </button>
        </div>
    </div>
</div>

     <!-- Overlay -->
     <div id="payrollSidebarOverlay" class="fixed inset-0 bg-black bg-opacity-40 hidden z-40"></div>

<!-- Sidebar -->
<div id="payrollSidebar" class="fixed top-0 right-[-750px] w-[750px] h-full bg-white shadow-xl z-50 transition-all duration-300 flex flex-col">
    
    <!-- Header -->
    <div class="flex justify-between items-center px-4 py-3 text-[#12344d] border-b border-gray-200">
        <h2 class="text-lg" id="payrollSidebarTitle">Payroll Calculation Rules</h2>
        <button id="closeSidebar" class="text-gray-500 hover:text-black">
            <i class="ri-close-line text-xl"></i>
        </button>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
        <button class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-[#009333] text-[#009333] " data-tab="salaryTab">
            Salary Details
        </button>
        <button class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black" data-tab="incrementTab">
            Increment
        </button>
        <button class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black" data-tab="newIncrementTab">
            New Increment
        </button>
    </div>

    <!-- Salary Details TAB Content -->
    <div id="salaryTab" class="flex-1 overflow-y-auto">
        
        <!-- Monthly Entries Section -->
        <div class="px-6 pt-6 pb-4">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-base font-semibold text-gray-900">Monthly Entries</h3>
                <div class="flex gap-2">
                    <button class="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded flex items-center gap-1">
                        <i class="ri-add-line"></i> Base Salary
                    </button>
                    <button class="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded flex items-center gap-1">
                        <i class="ri-add-line"></i> Non-working days
                    </button>
                </div>
            </div>

            <div class="border rounded-lg overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Designation</th>
                            <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                            <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900">HR</td>
                            <td class="px-4 py-3 text-sm text-gray-900">10000</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Good Working Skill</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900">HR</td>
                            <td class="px-4 py-3 text-sm text-gray-900">10000</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Good Working Skill</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900">HR</td>
                            <td class="px-4 py-3 text-sm text-gray-900">10000</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Good Working Skill</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900">HR</td>
                            <td class="px-4 py-3 text-sm text-gray-900">10000</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Good Working Skill</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Deduction Section -->
        <div class="px-6 pb-6">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-base font-semibold text-gray-900">Deduction</h3>
                <button class="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded flex items-center gap-1">
                    <i class="ri-add-line"></i> Apply a rule
                </button>
            </div>

            <div class="border rounded-lg overflow-hidden">
                <table class="w-full">
                    <thead class="bg-gray-50 border-b">
                        <tr>
                            <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Designation</th>
                            <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
                            <th class="px-4 py-2.5 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900">HR</td>
                            <td class="px-4 py-3 text-sm text-gray-900">100</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Late Entry</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900">HR</td>
                            <td class="px-4 py-3 text-sm text-gray-900">100</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Late Entry</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900">HR</td>
                            <td class="px-4 py-3 text-sm text-gray-900">100</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Late Entry</td>
                        </tr>
                        <tr class="hover:bg-gray-50">
                            <td class="px-4 py-3 text-sm text-gray-900">HR</td>
                            <td class="px-4 py-3 text-sm text-gray-900">100</td>
                            <td class="px-4 py-3 text-sm text-gray-600">Late Entry</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Increment TAB Content -->
    <div id="incrementTab" class="hidden flex-1 overflow-y-auto p-6">
    <div class="bg-white rounded-lg shadow">
        <div class="p-6">
            <h2 class="text-xl font-semibold mb-6">Increment</h2>
            
            <!-- Table -->
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead>
                        <tr class="border-b">
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">START DATE</th>
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">AMOUNT</th>
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">DESCRIPTION</th>
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">ENTERED BY</th>
                            <th class="text-left py-3 px-4 text-sm font-medium text-gray-600">APPROVED BY</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b hover:bg-gray-50">
                            <td class="py-3 px-4">06/05/2023</td>
                            <td class="py-3 px-4">1,500</td>
                            <td class="py-3 px-4">Good Working Skill</td>
                            <td class="py-3 px-4">-</td>
                            <td class="py-3 px-4">-</td>
                        </tr>
                        <tr class="border-b hover:bg-gray-50">
                            <td class="py-3 px-4">06/05/2023</td>
                            <td class="py-3 px-4">1,500</td>
                            <td class="py-3 px-4">Good Working Skill</td>
                            <td class="py-3 px-4">-</td>
                            <td class="py-3 px-4">-</td>
                        </tr>
                        <tr class="border-b hover:bg-gray-50">
                            <td class="py-3 px-4">06/05/2023</td>
                            <td class="py-3 px-4">1,500</td>
                            <td class="py-3 px-4">Good Working Skill</td>
                            <td class="py-3 px-4">-</td>
                            <td class="py-3 px-4">-</td>
                        </tr>
                        <tr class="border-b hover:bg-gray-50">
                            <td class="py-3 px-4">06/05/2023</td>
                            <td class="py-3 px-4">1,500</td>
                            <td class="py-3 px-4">Good Working Skill</td>
                            <td class="py-3 px-4">-</td>
                            <td class="py-3 px-4">-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div id="newIncrementTab" class="hidden flex-1 overflow-y-auto p-6">
    <div class="bg-white rounded-lg shadow max-w-2xl mx-auto">
        <div class="p-6">
            <h2 class="text-xl font-semibold mb-6">New Increment</h2>
            
            <form class="space-y-4">
                <!-- Start Date -->
                <div class="flex items-center space-x-4">
                    <label class="w-1/3 text-sm font-medium text-gray-700">
                        Start Date<span class="text-red-500">*</span>
                    </label>
                    <input 
                        type="date" 
                        value="2025-11-24"
                        class="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <!-- Amount -->
                <div class="flex items-center space-x-4">
                    <label class="w-1/3 text-sm font-medium text-gray-700">
                        Amount<span class="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter Amount"
                        class="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <!-- Description -->
                <div class="flex items-center space-x-4">
                    <label class="w-1/3 text-sm font-medium text-gray-700">
                        Description<span class="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Enter Description"
                        class="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <!-- Save Button -->
                <div class="flex justify-end">
                    <button 
                        type="submit"
                        class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>


</div>


<script src="/module/pages/salary/list.js"></script>