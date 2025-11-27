
<div class="flex-1 overflow-y-hidden h-[calc(100vh-43px)]">
    <div class="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
        <ul class="flex flex-nowrap text-sm font-medium text-center" id="approval-tabs">
            <li>
                <button data-tab="Permission" class="tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer bg-[#ebeff3] text-[#384551]">
                    <span class="flex items-center gap-1">
                        <i class="ri-shield-user-line mr-1"></i>
                        Permission
                        <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white" id="count-Permission">0</span>
                        <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] tab-close hidden"></i>
                    </span>
                </button>
            </li>
            <li>
                <button data-tab="Leave" class="tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]">
                    <span class="flex items-center gap-1">
                        <i class="ri-calendar-close-line mr-1"></i>
                        Leave
                        <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white hidden" id="count-Leave">0</span>
                        <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] tab-close hidden"></i>
                    </span>
                </button>
            </li>
            <li>
                <button data-tab="OT" class="tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]">
                    <span class="flex items-center gap-1">
                        <i class="ri-timer-line mr-1"></i>
                        OT
                        <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white hidden" id="count-OT">0</span>
                        <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] tab-close hidden"></i>
                    </span>
                </button>
            </li>
            <li>
                <button data-tab="OD" class="tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]">
                    <span class="flex items-center gap-1">
                        <i class="ri-map-pin-user-line mr-1"></i>
                        OD
                        <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white hidden" id="count-OD">0</span>
                        <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] tab-close hidden"></i>
                    </span>
                </button>
            </li>
            <li>
                <button data-tab="ShiftChange" class="tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]">
                    <span class="flex items-center gap-1">
                        <i class="ri-arrow-left-right-line mr-1"></i>
                        Shift Change
                        <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white hidden" id="count-ShiftChange">0</span>
                        <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] tab-close hidden"></i>
                    </span>
                </button>
            </li>
        </ul>
        <div class="flex items-center flex-shrink-0 ml-auto">
            <button id="openSidebarCustomize" class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#eceff1] hover:border-[#eceff1] ">
                <i class="ri-equalizer-line mr-1"></i>
                <span class="text-sm">Customize Table</span>
            </button>
            <div class="inline-flex border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm ml-2">
                <button class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer">
                    <i class="ri-file-excel-2-line mr-1"></i>
                    <span>Excel</span>
                </button>
                <button class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer border-l border-[#cfd7df]">
                    <i class="ri-file-pdf-2-line mr-1"></i>
                    <span>PDF</span>
                </button>
                <button class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer border-l border-[#cfd7df]">
                    <i class="ri-printer-line mr-1"></i>
                    <span>Print</span>
                </button>
            </div>
        </div>
    </div>

    <!-- Tab Content Container -->
    <div id="tab-content-container">
        <!-- Content will be dynamically loaded here -->
    </div>
</div>

<!-- Filter Modal Template -->
<div id="filter-modal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-0 pointer-events-none">
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-50 transition-opacity duration-300" id="filter-backdrop"></div>
    <div class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 z-50 flex flex-col translate-x-full" id="filter-sidebar">
        <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Filters</h5>
            <button id="filter-close-btn" class="cursor-pointer">
                <i class="ri-close-line"></i>
            </button>
        </div>
        <div class="p-4 overflow-y-auto flex-1" id="filter-content">
            <!-- Filter content will be dynamically loaded -->
        </div>
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" id="filter-reset-btn">Reset All</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="filter-apply-btn">Apply</button>
        </div>
    </div>
</div>

<!-- Approval Modal Template -->
<div id="approval-modal" class="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none">
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 z-50 transition-opacity duration-300" id="approval-backdrop"></div>
    <div class="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 z-50" id="approval-modal-content">
        <button id="approval-close-btn" class="absolute top-4 right-4 text-gray-500 hover:text-gray-600 transition-colors">
            <i class="ri-close-line text-xl cursor-pointer"></i>
        </button>
        <div class="px-6 pt-6 text-center border-b pb-4">
            <h2 class="text-lg font-semibold text-gray-900" id="approval-modal-title">Action</h2>
            <p class="text-sm text-gray-500 mt-1">Add remarks and approve or reject this request.</p>
        </div>
        <div class="px-6 py-4">
            <label for="approval-remarks" class="block text-sm font-semibold text-gray-700 mb-1">Remarks</label>
            <textarea id="approval-remarks" rows="4" class="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#009333]" placeholder="Enter remarks..."></textarea>
        </div>
        <div class="px-6 py-4 flex items-center justify-end border-t">
            <div class="flex space-x-3">
                <button id="approval-reject-btn" class="px-3 py-1.5 text-white bg-[#D90000] hover:bg-[#A30000] rounded-md text-sm font-medium transition-colors">Reject</button>
                <button id="approval-approve-btn" class="px-3 py-1.5 bg-[#009333] hover:bg-[#006622] text-white rounded-md text-sm font-medium transition-colors">Approve</button>
            </div>
        </div>
    </div>
</div>

<script src="/module/pages/approval/approval.js"></script>

