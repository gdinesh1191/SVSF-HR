<div class="flex justify-between items-center bg-white px-1.5 mt-[8px] ml-2 whitespace-nowrap">
   <ul id="tabsContainer" class="flex flex-nowrap text-sm font-medium text-center">

    <!-- MSP List TAB (Default Active) -->
    <li>
        <button class="tab active-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer "
            data-tab="list">
            <span class="flex items-center gap-1">
               <i class="ri-todo-line mr-1"></i>
                MSP List
                <span
                    class="ml-2 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full bg-[#009333] text-white">
                    8
                </span>

                <!-- CLOSE ICON (visible ONLY when active) -->
                <i class="ri-close-fill closeTab font-bold px-1 rounded hover:bg-[#dce0e5]"></i>
            </span>
        </button>
    </li>

    <!-- MSP New TAB -->
    <li>
        <button class="tab bg-white text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]"
            data-tab="new">
            <span class="flex items-center gap-1">
                <i class="ri-task-line mr-1"></i>
                Apply MSP

                <!-- Hide close icon on inactive tabs -->
                <i class="ri-close-fill closeTab hidden font-bold px-1 rounded hover:bg-[#dce0e5]"></i>
            </span>
        </button>
    </li>

</ul>

   <div class="flex items-center flex-shrink-0 ml-auto">

                    <button id="openCustomizeSidebar"
                        class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#eceff1] hover:border-[#eceff1]">
                        <i class="ri-equalizer-line mr-1"></i> Customize Table
                    </button>

                    <div
                        class="inline-flex border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm ml-2">
                        <button class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer">
                            <i class="ri-download-line mr-1"></i>
                            Import Leaves
                        </button>
                        <button class="px-2 border-l border-[#cfd7df] hover:bg-[#ebeff3] cursor-pointer">
                            <i class="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>
     


</div>




<!-- SUB HEADER -->
<div id="listTopBar" class="hidden flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
   <div class="flex items-center space-x-2 ml-2">
        <div class="bulk-actions flex items-center space-x-2">
          <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" id="printBtn">
            <i class="ri-printer-line mr-1"></i>
            Print
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" id="summaryBtn">
            <i class="ri-sticky-note-line mr-1"></i>
            Summary
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" id="downloadBtn">
            <i class="ri-arrow-down-line mr-1"></i>
            Download
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3]" id="deleteBtn">
            <i class="ri-delete-bin-6-line mr-1"></i>
            Delete
          </button>
        </div>
      </div>



    <div class="flex items-center relative space-x-2">
        <input type="text" placeholder="Search Staff Name..." class="block w-full h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]
         placeholder:text-sm placeholder:text-[#585858]" />
        <button id="openFilterBtn"
            class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]"><i
                class="ri-filter-3-fill"></i></button>
    </div>
</div>

<!-- TABLE WRAPPER -->
<div class="bg-[#ebeff3]">
    <div id="contentBox" class="mx-2 h-[calc(100vh-189px)] overflow-hidden rounded-lg bg-white ">
        <div class="h-full overflow-y-auto overflow-x-auto w-full dynamic-content">
   

        </div>
    </div>
</div>


<!-- Overlay + Sidebar Wrapper -->
<div id="rowSidebarWrapper"
     class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">

    <!-- Overlay -->
    <div id="overlayBg"
         class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <!-- Sidebar -->
    <div id="rowSidebar"
         class="relative w-[600px] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 overflow-hidden flex flex-col translate-x-full"
         >

        <!-- Header -->
        <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
            <h5 class="text-lg">Employee Details</h5>
            <button id="closeSidebarBtn" class="cursor-pointer">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>

        <!-- Content -->
        <div class="p-4 overflow-y-auto flex-1">
            <div class="bg-white  rounded-lg ">
                <div class="grid grid-cols-1 gap-y-4 gap-x-6 text-sm">

                    <!-- Employee Name -->
                    <div class="flex items-center">
                        <label class="font-medium text-gray-600 w-1/3 min-w-[120px]">Employee Name:</label>
                        <input type="text" id="sidebarEmployeeName" readonly
                               class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] border border-[#cbcbcb] 
                    rounded-md leading-[1.5] w-full flex-1 bg-[#f0f0f0] cursor-not-allowed"
                               value="-">
                    </div>

                    <!-- Employee Code -->
                    <div class="flex items-center">
                        <label class="font-medium text-gray-600 w-1/3 min-w-[120px]">Employee Code:</label>
                        <input type="text" id="sidebarEmployeeCode" readonly
                               class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] border border-[#cbcbcb] 
                    rounded-md leading-[1.5] w-full flex-1 bg-[#f0f0f0] cursor-not-allowed"
                               value="-">
                    </div>

                    <!-- Department -->
                    <div class="flex items-center">
                        <label class="font-medium text-gray-600 w-1/3 min-w-[120px]">Department:</label>
                        <input type="text" id="sidebarDepartment" readonly
                               class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] border border-[#cbcbcb] 
                    rounded-md leading-[1.5] w-full flex-1 bg-[#f0f0f0] cursor-not-allowed"
                               value="-">
                    </div>

                    <!-- Sub Department -->
                    <div class="flex items-center">
                        <label class="font-medium text-gray-600 w-1/3 min-w-[120px]">Sub Department:</label>
                        <input type="text" id="sidebarSubDepartment" readonly
                               class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] border border-[#cbcbcb] 
                    rounded-md leading-[1.5] w-full flex-1 bg-[#f0f0f0] cursor-not-allowed"
                               value="-">
                    </div>

                    <!-- Date -->
                    <div class="flex items-center">
                        <label class="font-medium text-gray-600 w-1/3 min-w-[120px]">Date:</label>
                        <input type="text" id="sidebarDate" readonly
                               class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] border border-[#cbcbcb] 
                    rounded-md leading-[1.5] w-full flex-1 bg-[#f0f0f0] cursor-not-allowed"
                               value="-">
                    </div>

                    <!-- Remarks -->
                    <div class="flex items-start">
                        <label class="font-medium text-gray-600 w-1/3 min-w-[120px] pt-2">Remarks:</label>
                        <textarea id="sidebarRemarks" readonly
                                  class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] border border-[#cbcbcb] 
                    rounded-md leading-[1.5] w-full flex-1 bg-[#f0f0f0] cursor-not-allowed min-h-[60px]">-</textarea>
                    </div>

                    <!-- In Time -->
                    <div class="flex items-center">
                        <label class="font-semibold w-1/3 min-w-[120px] text-red-600">In Time:</label>
                        <input type="time" id="sidebarInTime" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full flex-1">
                    </div>

                    <!-- Out Time -->
                    <div class="flex items-center">
                        <label class="font-semibold w-1/3 min-w-[120px] text-red-600">Out Time:</label>
                        <input id="sidebarOutTime" type="time" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full flex-1">
                    </div>

                </div>
            </div>
        </div>

        <!-- Footer Buttons -->
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button class="py-1 px-2 text-sm rounded bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer" id="cancelSidebarBtn">Cancel</button>
            <button class="py-1 px-2 text-sm rounded  cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a]">Save Updates</button>
        </div>
    </div>
</div>





<!-- Sidebar (Add class "open" to show) -->
<div
  id="customizeSidebar"
  class="fixed top-0.5 right-0 w-80 mt-[5.4rem] mb-[0.15rem]
         rounded-tl-[0.375rem] rounded-bl-[0.375rem]
         bg-white shadow-[0_4px_16px_#27313a66]
         h-[calc(100vh-90px)] z-50 transform transition-transform duration-300
         translate-x-full"> 

         
         
    <div class="flex flex-col h-full">

        <!-- Header -->
        <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6]
                    flex justify-between items-center text-sm text-[#12344d]">
            <h5>Customize table</h5>
            <button id="closeCustomizeTableSidebarBtn">
                <i class="ri-close-line text-lg"></i>
            </button>
        </div>

        <!-- Search Bar -->
        <div class="px-4 pt-4 pb-1">
            <div class="relative">
                <input 
                    type="text"
                    id="searchInput"
                    placeholder="Search fields here..."
                    class="pl-9 pr-4 h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full" autocomplete="off"
                />

                <div class="absolute top-[4px] left-0 pl-3 flex items-center pointer-events-none text-[#585858]">
                    <i class="ri-search-line"></i>
                </div>
            </div>
        </div>

        <!-- Fields List -->
        <div class="flex-1 overflow-y-auto px-4">

            <!-- Visible Fields -->
            <div class="mb-3">
                <h3 class="text-sm font-semibold text-[#12344d] my-[10px] flex items-center">
                    <span>Fields visible in table</span>
                    <span class="text-sm text-[#12344d] font-normal bg-[#ebeff3] rounded-[4px] px-[6px] py-[2.5px] ml-[10px]">
                        5/12
                    </span>
                </h3>

                <div class="space-y-2">

                    <!-- Example visible item -->
                    <div class="flex items-center rounded hover:bg-[#f5f7f9] py-1 px-1 cursor-pointer">
                        <i class="ri-draggable text-[18px] text-[#4c6578] cursor-grab"></i>

                        <input type="checkbox" class="h-4 w-4 ml-[10px] cursor-pointer accent-green-600" checked>

                        <label class="ml-2 text-sm text-[#3c3c3c] cursor-pointer select-none">
                            Field Name 1
                        </label>
                    </div>

                    <div class="flex items-center rounded hover:bg-[#f5f7f9] py-1 px-1 cursor-pointer">
                        <i class="ri-draggable text-[18px] text-[#4c6578] cursor-grab"></i>
                        <input type="checkbox" class="h-4 w-4 ml-[10px] cursor-pointer accent-green-600" checked>
                        <label class="ml-2 text-sm text-[#3c3c3c] cursor-pointer">Field Name 2</label>
                    </div>

                </div>
            </div>

            <!-- Hidden Fields -->
            <div>
                <h3 class="text-sm font-semibold text-[#12344d] my-[10px] pb-1">
                    Fields not shown in table
                </h3>

                <div class="space-y-3 mb-3">

                    <div class="flex items-center">
                        <input type="checkbox" class="h-4 w-4 cursor-pointer">
                        <label class="ml-2 text-sm text-[#3c3c3c] cursor-pointer accent-green-600">Field Name 6</label>
                    </div>

                    <div class="flex items-center">
                        <input type="checkbox" class="h-4 w-4 cursor-pointer">
                        <label class="ml-2 text-sm text-[#3c3c3c] cursor-pointer accent-green-600">Field Name 7</label>
                    </div>

                </div>
            </div>

        </div>

        <!-- Footer -->
        <div class="px-4 py-3 border-t border-gray-200 flex justify-between items-center">

            <button class="text-sm text-green-600 hover:text-green-800 font-medium transition duration-200 ease-in-out cursor-pointer">
                Reset to default
            </button>

            <div class="flex space-x-2">
                <button id="cancelSidebarBtnCustomTable" class="py-1 px-2 text-sm rounded bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer">
                    Cancel
                </button>

                <button class="py-1 px-2 text-sm rounded  cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a]">
                    Apply
                </button>
            </div>

        </div>

    </div>
</div>



<!-- Filter Sidebar + Backdrop -->
<div id="filterSidebarWrapper" 
     class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-0 pointer-events-none">

    <!-- Backdrop -->
    <div id="filterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <!-- Sidebar -->
    <div id="filterSidebar" 
         class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col translate-x-full">

        <!-- Header -->

         <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6]
                    flex justify-between items-center text-sm text-[#12344d]">
            <h5>Customize table</h5>
            <button id="closeFilterBtn">
                <i class="ri-close-line text-lg"></i>
            </button>
        </div>

        <!-- Content -->
        <div class="p-4 overflow-y-auto flex-1">
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Employee Name</label>
                <input type="text" placeholder="Enter Employee Name" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Employee Code</label>
                <input type="text" placeholder="Enter Employee Code" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Department</label>
                <input type="text" placeholder="Enter Department" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Sub Department</label>
                <input type="text" placeholder="Enter Sub Department" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full" />
            </div>
        </div>

        <!-- Footer -->
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button class="py-1 px-2 text-sm rounded bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer" id="resetFiltersBtn">Reset All</button>
            <button class="py-1 px-2 text-sm rounded  cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a]" id="applyFiltersBtn">Apply</button>
        </div>
    </div>
</div>


<!-- FOOTER -->
<footer id="footerSection" class="bg-[#ebeff3] h-[54px] px-4 flex items-center justify-start">
    <!-- Default footer (MSP List) -->
    <span class="text-sm" id="listFooter">
        Showing <span class="text-red-600">10</span> of <span class="text-blue-600">20</span>
    </span>

    <!-- Apply MSP Footer Buttons -->
    <div id="formFooter" class="hidden flex items-center gap-2">
        <button id="saveBtn"
        class="py-1.5 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border-[#009333] hover:bg-[#007a2a] transition">
        Save
    </button>
    <button type="button" id="cancelBtn"
        class="py-1.5 px-2 text-sm rounded border cursor-pointer bg-[#6c757d] text-white border-[#6c757d] hover:bg-[#5a6268] transition">
        Cancel
    </button>
    </div>
</footer>





</div>


<script src="/module/pages/manualPunch/list.js"></script>