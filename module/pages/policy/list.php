<div class="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
    <ul id="policyTabsContainer" class="flex flex-nowrap text-sm font-medium text-center">
        <li>
            <button class="policy-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer" data-tab="AuthorizationGroup">
                <span class="flex items-center gap-1">
                    <i class="ri-shield-user-line mr-1"></i>
                    Authorization Group
                    <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">0</span>
                    <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closePolicyTab"></i>
                </span>
            </button>
        </li>
        <li>
            <button class="policy-tab hover:text-[#6689b8] hover:bg-[#f5f7f9] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer" data-tab="LeavePolicy">
                <span class="flex items-center gap-1">
                    <i class="ri-calendar-check-line mr-1"></i>
                    Leave Policy
                </span>
            </button>
        </li>
        <li>
            <button class="policy-tab hover:text-[#6689b8] hover:bg-[#f5f7f9] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer" data-tab="RotationShift">
                <span class="flex items-center gap-1">
                    <i class="ri-repeat-line mr-1"></i>
                    Rotation Shift
                </span>
            </button>
        </li>
        <li>
            <button class="policy-tab hover:text-[#6689b8] hover:bg-[#f5f7f9] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer" data-tab="ShiftPolicy">
                <span class="flex items-center gap-1">
                    <i class="ri-file-settings-line mr-1"></i>
                    Shift Policy
                </span>
            </button>
        </li>
    </ul>
    <div class="flex items-center flex-shrink-0 ml-auto">
        <button id="openSidebarCustomize" class="btn-sm btn-hover-ct py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#eceff1] hover:border-[#eceff1]">
            <i class="ri-equalizer-line mr-1"></i>
            <span class="text-sm">Customize Table</span>
        </button>
    </div>
</div>

<!-- Tab Content Container -->
<div id="policyTabContent" class="overflow-y-hidden h-[calc(100vh-43px)]">
    <!-- Authorization Group Content -->
    <div id="AuthorizationGroupContent" class="policy-tab-content">
        <!-- Content will be rendered here by JavaScript -->
    </div>
    
    <!-- Leave Policy Content -->
    <div id="LeavePolicyContent" class="policy-tab-content hidden">
        <!-- Content will be rendered here by JavaScript -->
    </div>
    
    <!-- Rotation Shift Content -->
    <div id="RotationShiftContent" class="policy-tab-content hidden">
        <!-- Content will be rendered here by JavaScript -->
    </div>
    
    <!-- Shift Policy Content -->
    <div id="ShiftPolicyContent" class="policy-tab-content hidden">
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

<script src="/module/pages/policy/list.js"></script>
<script src="/module/pages/policy/authorizationGroup/authorizationGroup.js"></script>
<script src="/module/pages/policy/authorizationGroup/authorizationModal.js"></script>
<script src="/module/pages/policy/authorizationGroup/groupModal.js"></script>

<script src="/module/pages/policy/leavePolicy/leavePolicyGroup.js"></script>
<script src="/module/pages/policy/leavePolicy/leavePolicyModal.js"></script>
<script src="/module/pages/policy/leavePolicy/leaveGroupModal.js"></script>
