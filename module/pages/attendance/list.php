<div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="w-75 bg-white border-r border-gray-200 flex flex-col">
        <!-- Header Section -->
        <div class="p-4 border-b border-gray-200 flex items-center space-x-3 justify-between">
            <!-- Left side: Icon + Title and DatePicker -->
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-[#009333] rounded-lg flex items-center justify-center">
                    <i class="ri-calendar-check-fill text-white text-xl"></i>
                </div>
                <div>
                    <h2 class="text-xl font-medium text-gray-900">Attendance</h2>
                </div>
                <div class="relative">
                    <input
                        type="text"
                        id="attendance-date-picker"
                        class="pl-9 pr-2 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        placeholder="Choose date"
                        readonly
                    />
                    <i class="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none"></i>
                </div>
            </div>
            <!-- Right side (empty) -->
        </div>

        <!-- Tabs for Filtering -->
        <div class="p-4 border-b border-gray-200">
            <div class="flex rounded-lg bg-gray-200 p-1 space-x-1 text-sm font-medium">
                <button
                    id="filter-all-btn"
                    class="flex-1 px-3 py-1.5 rounded-md transition-colors cursor-pointer bg-white text-gray-900 shadow"
                >
                    All<span class="ml-2 text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded border border-gray-300" id="filter-all-count">0</span>
                </button>
                <button
                    id="filter-finalized-btn"
                    class="flex-1 px-3 py-1.5 rounded-md transition-colors cursor-pointer text-gray-700"
                >
                    Finalized<span class="ml-2 text-xs bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded border border-gray-300" id="filter-finalized-count">0</span>
                </button>
            </div>
        </div>

        <!-- Search and Filters Section -->
        <div class="p-4 border-b border-gray-200">
            <div class="flex space-x-2">
                <div class="flex-1">
                    <input
                        type="text"
                        id="group-search-input"
                        placeholder="Search groups..."
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                    />
                </div>
                <button id="filter-btn" class="px-3 py-1 border border-[#cbcbcb] rounded-md hover:bg-gray-50 cursor-pointer">
                    <i class="ri-filter-line text-gray-500"></i>
                </button>
            </div>
        </div>

        <!-- Groups List Section -->
        <div class="flex-1 max-h-[calc(100vh-260px)] overflow-y-auto" id="groups-list-container">
            <!-- Groups will be populated by JavaScript -->
        </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col" id="main-content-area">
        <!-- Welcome Screen (shown when no group selected) -->
        <div class="flex-1 flex items-center justify-center bg-white" id="welcome-screen">
            <div class="text-center">
                <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="ri-team-fill text-green-600 text-3xl"></i>
                </div>
                <h2 class="text-xl font-semibold text-gray-900 mb-2">Select a Group</h2>
                <p class="text-gray-600 max-w-md">
                    Choose a group from the sidebar to view detailed attendance information,
                    manage shifts, and approve member attendance records.
                </p>
            </div>
        </div>

        <!-- Group Details (hidden by default) -->
        <div id="group-details-container" class="hidden flex-1 flex flex-col">
            <!-- Main Header for selected group -->
            <div class="bg-white border-b border-gray-200 p-6">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center space-x-4">
                        <div class="w-12 h-12 bg-[#009333] rounded-lg flex items-center justify-center">
                            <i class="ri-team-fill text-white text-xl"></i>
                        </div>
                        <div>
                            <h1 class="text-2xl font-semibold text-gray-900" id="selected-group-name"></h1>
                            <p class="text-gray-600" id="selected-group-department"></p>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="shifts-container">
                    <!-- Shifts will be populated by JavaScript -->
                </div>
            </div>

            <!-- Selected Shift Header -->
            <div class="bg-[#fafcfe] border-b border-gray-200 px-6 py-3 hidden" id="selected-shift-header">
                <div class="flex items-center space-x-2">
                    <span class="text-sm font-medium text-gray-700">Selected Shift:</span>
                    <span class="text-sm font-semibold text-[#009333]" id="selected-shift-name"></span>
                </div>
            </div>

            <!-- Content Area - Members List for Selected Shift -->
            <div class="flex-1 bg-white p-4" id="members-content-area">
                <!-- Members table will be populated by JavaScript -->
            </div>
        </div>
    </div>
</div>

<!-- Approval Modal -->
<div id="approval-modal" class="fixed inset-0 z-50 flex items-center justify-center hidden">
    <div class="fixed inset-0 bg-black/50" id="approval-modal-backdrop"></div>
    <div class="bg-white rounded-lg w-full max-w-md overflow-hidden relative z-10">
        <div class="flex justify-between text-[#12375D] bg-gray-50 items-center px-4 py-3 mb-3 border-b border-gray-200 pb-2">
            <h3 class="text-lg font-medium">Approve Attendance</h3>
            <button id="approval-modal-close" class="cursor-pointer">
                <i class="ri-close-line text-lg"></i>
            </button>
        </div>
        <div class="space-y-3 px-4" id="approval-modal-content">
            <!-- Content will be populated by JavaScript -->
        </div>
        <div class="flex justify-end space-x-2 px-4 py-2.5 border-t border-gray-200 mt-4">
            <button class="px-3 py-1.5 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition" id="approval-modal-cancel">Cancel</button>
            <button class="px-3 py-1.5 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition" id="approval-modal-confirm">Confirm Approve</button>
        </div>
    </div>
</div>

<script src="/module/pages/attendance/list.js"></script>

