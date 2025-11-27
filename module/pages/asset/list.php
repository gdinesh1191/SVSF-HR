<div class="flex-1 overflow-y-hidden h-[calc(100vh-43px)]">
    <!-- Main Container -->
    <div class="flex h-full">
        <!-- Sidebar Navigation -->
        <aside class="w-[240px] h-[100vh] bg-[#f8f9fa] border-[#ebeff3] px-3 flex flex-col space-y-4">
            <div class="relative mt-2">
                <div class="flex items-center overflow-hidden">
                    <i class="ri-search-line absolute left-2 text-sm"></i>
                    <input
                        type="text"
                        id="sidebarSearch"
                        placeholder="Search here..."
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] pl-7"
                    />
                </div>
            </div>
            <div class="flex flex-col gap-2 text-sm bg-[#f8f9fa] overflow-y-auto pr-2 max-h-[calc(100vh-110px)]" id="sidebarMenu">
                <!-- Menu items will be populated by JavaScript -->
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1" id="mainContent">
            <!-- Content will be dynamically loaded here -->
        </div>
    </div>
</div>

<!-- Filter Modal -->
<div id="filterModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-0 pointer-events-none">
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)]" id="filterBackdrop"></div>
    <div class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col translate-x-full" id="filterSidebar">
        <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Filters</h5>
            <button id="filterCloseBtn" class="cursor-pointer">
                <i class="ri-close-line"></i>
            </button>
        </div>
        <div class="p-4 overflow-y-auto flex-1" id="filterContent">
            <!-- Filter content will be dynamically loaded -->
        </div>
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" id="filterResetBtn">Reset All</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="filterApplyBtn">Apply</button>
        </div>
    </div>
</div>

<!-- Items Modal (Issued Details) -->
<div id="itemsModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-0 pointer-events-none">
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)]" id="itemsModalBackdrop"></div>
    <div class="full-relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col w-[750px] bg-white transform transition-transform duration-300 ease-in-out translate-x-full" id="itemsModalContent">
        <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
            <h5 class="text-lg" id="itemsModalTitle">Issued Details</h5>
            <button id="itemsModalCloseBtn" class="cursor-pointer">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>
        <div class="p-4 overflow-y-auto flex-1" id="itemsModalBody">
            <!-- Content will be dynamically loaded -->
        </div>
    </div>
</div>

<!-- Add Item Modal -->
<div id="addItemModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-0 pointer-events-none">
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)]" id="addItemModalBackdrop"></div>
    <div class="full-relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col w-[600px] bg-white transform transition-transform duration-300 ease-in-out translate-x-full" id="addItemModalContent">
        <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
            <h5 class="text-lg">Add Item</h5>
            <button id="addItemModalCloseBtn" class="cursor-pointer">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>
        <div class="p-4 overflow-y-auto flex-1">
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Item Name <span class="text-red-500">*</span></label>
                <input type="text" id="addItemName" placeholder="Enter Item Name" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Stock <span class="text-red-500">*</span></label>
                <input type="number" id="addItemStock" placeholder="Enter Stock" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
            </div>
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Description</label>
                <textarea id="addItemDescription" placeholder="Enter Description" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" rows="3"></textarea>
            </div>
        </div>
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" id="addItemCancelBtn">Cancel</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="addItemSaveBtn">Save</button>
        </div>
    </div>
</div>

<!-- Stock Issue Modal -->
<div id="stockIssueModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-0 pointer-events-none">
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)]" id="stockIssueModalBackdrop"></div>
    <div class="full-relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col w-[800px] bg-white transform transition-transform duration-300 ease-in-out translate-x-full" id="stockIssueModalContent">
        <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
            <h5 class="text-lg" id="stockIssueModalTitle">Stock Details</h5>
            <button id="stockIssueModalCloseBtn" class="cursor-pointer">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>
        <div class="flex border-b border-gray-200 bg-[#f0f5f3]" id="stockIssueTabs">
            <button class="stock-issue-tab px-3 py-2 border-b-2 font-medium cursor-pointer" data-tab="stockIssueNew">
                Stock Issue (New)
            </button>
            <button class="stock-issue-tab px-3 py-2 border-b-2 font-medium cursor-pointer active" data-tab="currentIssues">
                Current Issues
            </button>
            <button class="stock-issue-tab px-3 py-2 border-b-2 font-medium cursor-pointer" data-tab="returnedList">
                Returned List
            </button>
        </div>
        <div class="p-4 overflow-y-auto flex-1 bg-gray-50" id="stockIssueModalBody">
            <!-- Content will be dynamically loaded -->
        </div>
    </div>
</div>

<!-- Stock Report Modal -->
<div id="stockReportModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-0 pointer-events-none">
    <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)]" id="stockReportModalBackdrop"></div>
    <div class="full-relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col w-[800px] bg-white transform transition-transform duration-300 ease-in-out translate-x-full" id="stockReportModalContent">
        <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
            <h5 class="text-lg" id="stockReportModalTitle">Stock Details</h5>
            <button id="stockReportModalCloseBtn" class="cursor-pointer">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>
        <div class="flex border-b border-gray-200 bg-[#f0f5f3]" id="stockReportTabs">
            <button class="stock-report-tab px-3 py-2 border-b-2 font-medium cursor-pointer" data-tab="StockReportNew">
                Stock Issue (New)
            </button>
            <button class="stock-report-tab px-3 py-2 border-b-2 font-medium cursor-pointer active" data-tab="currentIssues">
                Current Issues
            </button>
            <button class="stock-report-tab px-3 py-2 border-b-2 font-medium cursor-pointer" data-tab="returnedList">
                Returned List
            </button>
        </div>
        <div class="p-4 overflow-y-auto flex-1 bg-gray-50" id="stockReportModalBody">
            <!-- Content will be dynamically loaded -->
        </div>
    </div>
</div>



<script src="/module/pages/asset/list.js"></script>

