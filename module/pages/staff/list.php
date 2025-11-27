<div class="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
    <ul id="staffTabsContainer" class="flex flex-nowrap text-sm font-medium text-center">
        <li>
            <button class="staff-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer" data-tab="activeStaff">
                <span class="flex items-center gap-1">
                    <i class="ri-user-settings-line mr-1"></i>
                    Active Staff
                    <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">0</span>
                    <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closeStaffTab"></i>
                </span>
            </button>
        </li>
        <li>
            <button class="staff-tab hover:text-[#6689b8] hover:bg-[#f5f7f9] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer" data-tab="authorizationDetails">
                <span class="flex items-center gap-1">
                    <i class="ri-shield-check-line mr-1"></i>
                    Authorization Details
                </span>
            </button>
        </li>
        <li>
            <button class="staff-tab hover:text-[#6689b8] hover:bg-[#f5f7f9] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer" data-tab="staffMismatch">
                <span class="flex items-center gap-1">
                    <i class="ri-user-unfollow-line mr-1"></i>
                    Staff Mismatch
                </span>
            </button>
        </li>
        <li>
            <button class="staff-tab hover:text-[#6689b8] hover:bg-[#f5f7f9] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer" data-tab="shiftReport">
                <span class="flex items-center gap-1">
                    <i class="ri-calendar-check-line mr-1"></i>
                    Shift Report
                </span>
            </button>
        </li>
    </ul>
    <div class="flex items-center flex-shrink-0 ml-auto">
        <button id="openSidebarCustomize" class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#eceff1] hover:border-[#eceff1]">
            <i class="ri-equalizer-line mr-1"></i>
            <span class="text-sm">Customize Table</span>
        </button>
        <div class="inline-flex border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm ml-2">
            <button id="importStaffBtn" class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer">
                <i class="ri-download-line mr-1"></i>
                Import Staff
            </button>
            <button class="px-2 border-l border-[#cfd7df] hover:bg-[#ebeff3] cursor-pointer">
                <i class="ri-arrow-down-s-line"></i>
            </button>
        </div>
        <a href="/app/staff/new" class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border-[#009333] hover:bg-[#007a2a] ml-2">
            <i class="ri-add-fill mr-1"></i>
            <span class="text-sm">Add Staff</span>
        </a>
    </div>
</div>

<!-- Tab Content Container -->
<div id="staffTabContent" class="overflow-y-hidden h-[calc(100vh-43px)]">
    <!-- Active Staff Content -->
    <div id="activeStaffContent" class="staff-tab-content">
        <!-- Content will be rendered here by JavaScript -->
    </div>
    
    <!-- Authorization Details Content -->
    <div id="authorizationDetailsContent" class="staff-tab-content hidden">
        <!-- Content will be rendered here by JavaScript -->
    </div>
    
    <!-- Staff Mismatch Content -->
    <div id="staffMismatchContent" class="staff-tab-content hidden">
        <!-- Content will be rendered here by JavaScript -->
    </div>
    
    <!-- Shift Report Content -->
    <div id="shiftReportContent" class="staff-tab-content hidden">
        <!-- Content will be rendered here by JavaScript -->
    </div>
</div>

<!-- Customize Table Sidebar -->
<div id="customizedTableSidebar" class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">
    <!-- Backdrop -->
    <div id="customizedTableBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
    
    <!-- Sidebar Content -->
    <div id="customizedTablePanel" class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col h-[calc(100vh-5.55rem)] translate-x-full">
        <!-- Header -->
        <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Customize Table</h5>
            <button id="customizedTableCloseBtn" class="cursor-pointer text-lg">
                <i class="ri-close-line"></i>
            </button>
        </div>
        
        <!-- Scrollable Content -->
        <div class="overflow-y-auto flex-1 flex flex-col p-4">
            <!-- Search Box -->
            <div class="mb-4">
                <div class="relative">
                    <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    <input type="text" id="fieldSearchInput" placeholder="Search fields here..." 
                        class="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:border-[#009333] focus:ring-1 focus:ring-[#009333]">
                </div>
            </div>
            
            <!-- Fields visible in table -->
            <div class="mb-4">
                <div class="text-sm font-semibold text-[#12344d] mb-2">
                    Fields visible in table <span id="visibleCount" class="font-normal text-gray-600">0/0</span>
                </div>
                <div id="visibleFields" class="space-y-1"></div>
            </div>
            
            <!-- Fields not shown in table -->
            <div class="border-t border-gray-200 pt-4">
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

<!-- Shared Toast / Confirm -->
<div id="departmentToast" class="fixed top-14 right-3 z-[2000] w-[280px] hidden opacity-0 translate-y-4 transition-all duration-200 pointer-events-none"></div>
<div id="departmentConfirmModal" class="fixed inset-0 z-[2100] hidden items-center justify-center bg-black/50 p-4">
    <div class="relative max-w-[470px] w-full text-center">
        <div class="bg-white rounded-[20px] p-8 relative w-full text-center">
            <button id="confirmModalCloseBtn" class="absolute top-4 right-4 text-[#0f0f0f] cursor-pointer text-2xl leading-none">
                <i class="ri-close-line"></i>
            </button>
            <div class="relative mx-auto flex items-center justify-center w-[67px] h-[67px] mb-4">
                <div id="confirmModalOuterCircle" class="absolute w-[66px] h-[66px] rounded-full opacity-70"></div>
                <div id="confirmModalMiddleCircle" class="absolute w-[46px] h-[46px] rounded-full opacity-90"></div>
                <div id="confirmModalInnerCircle" class="z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center">
                    <i id="confirmModalIcon" class="ri-information-line text-white"></i>
                </div>
            </div>
            <h3 id="confirmModalTitle" class="text-xl font-semibold text-gray-900 mb-2.5">Confirm action</h3>
            <p id="confirmModalMessage" class="text-sm text-gray-500 mb-6 px-4">Are you sure you want to proceed?</p>
            <div class="flex justify-center space-x-2">
                <button id="confirmModalCancelBtn" class="px-6 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition">Cancel</button>
                <button id="confirmModalConfirmBtn" class="px-6 py-2 w-full cursor-pointer text-sm font-medium text-white rounded-lg bg-[#d53635]">Confirm</button>
            </div>
        </div>
    </div>
</div>

<script src="/module/pages/staff/list.js"></script>

<!-- Active Staff -->
<script src="/module/pages/staff/activeStaff/profileModal.js"></script>
<script src="/module/pages/staff/activeStaff/activeStaffTable.js"></script>

<!-- Authorization Details -->
<script src="/module/pages/staff/authorizationDetails/authorizationTable.js"></script>
<script src="/module/pages/staff/authorizationDetails/authorizationModal.js"></script>

<!-- Staff Mismatch -->
<script src="/module/pages/staff/staffMismatch/staffMismatchTable.js"></script>

<!-- Shift Report -->
<script src="/module/pages/staff/shiftReport/shiftReportTable.js"></script>

<!-- Import Modal -->
<script src="/module/pages/staff/importModal.js"></script>
