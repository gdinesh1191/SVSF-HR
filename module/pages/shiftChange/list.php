

<!-- Shift Change - Tabs Header -->
<div class="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
    <ul id="shiftTabsContainer" class="flex flex-nowrap text-sm font-medium text-center">
        <li>
            <button
                    class="shift-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer"
                    data-tab="shiftChangeList"
            >
                <span class="flex items-center gap-1">
                    <i class="ri-repeat-line mr-1"></i>
                    Shift List
                    <span id="shiftListCounter"
                          class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">0</span>
                    <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closeShiftTab"></i>
                </span>
            </button>
        </li>
        <li>
            <button
                    class="shift-tab hover:text-[#6689b8] hover:bg-[#f5f7f9] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer"
                    data-tab="newShiftChange"
            >
                <span class="flex items-center gap-1">
                    <i class="ri-add-circle-line mr-1"></i>
                    Apply Shift Change
                </span>
            </button>
        </li>
    </ul>

    <div class="flex items-center flex-shrink-0 ml-auto">
        <button id="openSidebarCustomizeShift"
                class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#eceff1] hover:border-[#eceff1]">
            <i class="ri-equalizer-line mr-1"></i>
            <span class="text-sm">Customize Table</span>
        </button>
    </div>
</div>

<!-- Tab Content Container -->
<div id="shiftTabContent" class="overflow-y-hidden h-[calc(100vh-43px)] bg-[#ebeff3]">
    <!-- Shift List Content -->
    <div id="shiftChangeListContent" class="shift-tab-content h-full">
        <!-- Header Section -->
        <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
            <div class="flex items-center space-x-2 ml-2">
                <div class="bulk-actions flex items-center space-x-2">
                    <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm bg-white text-gray-500 border border-gray-200 rounded px-2 py-1 text-xs flex items-center gap-1"
                            id="shiftPrintBtn">
                        <i class="ri-printer-line mr-1"></i>
                        Print
                    </button>
                    <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm bg-white text-gray-500 border border-gray-200 rounded px-2 py-1 text-xs flex items-center gap-1"
                            id="shiftSummaryBtn">
                        <i class="ri-sticky-note-line mr-1"></i>
                        Summary
                    </button>
                    <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm bg-white text-gray-500 border border-gray-200 rounded px-2 py-1 text-xs flex items-center gap-1"
                            id="shiftDownloadBtn">
                        <i class="ri-arrow-down-line mr-1"></i>
                        Download
                    </button>
                    <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm bg-white text-red-600 border border-gray-200 rounded px-2 py-1 text-xs flex items-center gap-1 cursor-pointer"
                            id="shiftDeleteBtn">
                        <i class="ri-delete-bin-6-line mr-1"></i>
                        Delete
                    </button>
                </div>
            </div>

            <div class="flex items-center relative gap-2 mr-2">
                <!-- Month/Year picker (replaces MonthYearPickerWrapper) -->
                <div class="flex items-center gap-1">
                    <label for="shiftMonthInput" class="text-xs text-gray-700">Month</label>
                    <input
                            id="shiftMonthInput"
                            type="month"
                            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                    />
                </div>
            </div>
        </div>

        <!-- Table Section -->
        <div class="bg-[#ebeff3]">
            <div class="mx-2 h-[calc(100vh-190px)] max-h-[calc(100vh-190px)] overflow-hidden rounded-lg bg-white">
                <div class="h-full overflow-y-auto">
                    <table class="w-full text-sm">
                        <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]" id="shiftListThead">
                        <tr>
                            <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center px-2 py-1 border-b" id="shiftCheckboxColumn">
                                <input
                                        type="checkbox"
                                        id="shiftSelectAll"
                                        class="form-check accent-[#009333]"
                                />
                            </th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center px-2 py-1 border-b">
                                <div class="flex justify-center items-center gap-1">
                                    <span>S.No.</span>
                                </div>
                            </th>
                            <!-- Dynamic columns -->
                            <th class="border-r border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b" data-col-id="actualShift">Actual Shift</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b" data-col-id="shiftName">Shift Name</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b" data-col-id="fromDate">From Date</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b" data-col-id="toDate">To Date</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b" data-col-id="totalDays">Total Days</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b" data-col-id="remarks">Remarks</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b" data-col-id="status">Status</th>
                        </tr>
                        </thead>
                        <tbody id="shiftListTbody">
                        <!-- Filled by JavaScript -->
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
            <span class="text-sm">
                Showing <span id="shiftShowingCount" class="text-red-600">0</span> of
                <span id="shiftTotalCount" class="text-blue-600">0</span>
            </span>
        </div>
    </div>

    <!-- Apply Shift Change Content -->
    <div id="newShiftChangeContent" class="shift-tab-content hidden h-full">
        <div class="bg-[#ebeff3] h-[calc(100vh-145px)] overflow-y-auto">
            <div class="p-2 pb-0 bg-[#ebeff3] h-[calc(100vh-145px)] overflow-y-auto">
                <div class="bg-white rounded-lg p-6 h-full">
                    <div class="grid grid-cols-1 lg:grid-cols-2">
                        <form id="applyShiftForm">
                            <!-- From Date -->
                            <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-[10px]">
                                <label for="applyFromDate"
                                       class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d] text-sm">
                                    From Date
                                    <span class=" text-red-500 ml-1">*</span>
                                </label>
                                <div class="flex-1">
                                    <input
                                            type="date"
                                            id="applyFromDate"
                                            name="fromDate"
                                            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                                            required
                                    />
                                </div>
                            </div>

                            <!-- To Date -->
                            <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-[10px]">
                                <label for="applyToDate"
                                       class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d] text-sm">
                                    To Date
                                    <span class=" text-red-500 ml-1">*</span>
                                </label>
                                <div class="flex-1">
                                    <input
                                            type="date"
                                            id="applyToDate"
                                            name="toDate"
                                            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                                            required
                                    />
                                </div>
                            </div>

                            <!-- Total Days -->
                            <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-[10px]">
                                <label for="applyTotalDays"
                                       class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d] text-sm">
                                    Total Days
                                </label>
                                <div class="flex-1">
                                    <input
                                            type="text"
                                            id="applyTotalDays"
                                            name="totalDays"
                                            readonly
                                            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-gray-50 border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none "
                                            placeholder="0"
                                    />
                                </div>
                            </div>

                            <!-- Shift Master -->
                            <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-[10px]">
                                <label for="applyShiftId"
                                       class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d] text-sm">
                                    Shift Master
                                    <span class=" text-red-500 ml-1">*</span>
                                </label>
                                <div class="flex-1">
                                    <select
                                            id="applyShiftId"
                                            name="shift_id"
                                            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                                            required
                                    >
                                        <option value="">Select Shift</option>
                                        <!-- options added via JS -->
                                    </select>
                                </div>
                            </div>

                            <!-- Remarks -->
                            <div class="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-[10px]">
                                <label for="applyRemarks"
                                       class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d] text-sm">
                                    Remarks
                                </label>
                                <div class="flex-1">
                                    <input
                                            type="text"
                                            id="applyRemarks"
                                            name="remarks"
                                            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                                            placeholder="Enter any remarks"
                                            autocomplete="off"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Buttons -->
        <footer class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
            <div class="flex items-center space-x-2 w-full">
                <button
                        type="button"
                        id="applyShiftCancelBtn"
                        class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#6c757d] text-white border border-[#6c757d] hover:bg-[#5a6268] cursor-pointer transition">
                    Cancel
                </button>
                <button
                        type="submit"
                        form="applyShiftForm"
                        id="applyShiftSubmitBtn"
                        class="py-1 px-3 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a]">
                    Submit
                </button>
            </div>
        </footer>
    </div>
</div>

<!-- Customize Table Sidebar (Shift List) -->
<div id="shiftCustomizeSidebar"
     class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">
    <!-- Backdrop -->
    <div id="shiftCustomizeBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <!-- Sidebar Content -->
    <div id="shiftCustomizePanel"
         class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col h-[calc(100vh-5.55rem)] translate-x-full">
        <!-- Header -->
        <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Customize Table</h5>
            <button id="shiftCustomizeCloseBtn" class="cursor-pointer text-lg">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <!-- Scrollable Content -->
        <div class="overflow-y-auto flex-1 flex flex-col p-4 text-sm">
            <!-- Fields visible in table -->
            <div class="mb-4">
                <div class="text-sm font-semibold text-[#12344d] mb-2">
                    Fields visible in table
                    <span id="shiftVisibleCount" class="font-normal text-gray-600">0/0</span>
                </div>
                <div id="shiftVisibleFields" class="space-y-1"></div>
            </div>

            <!-- Fields not shown in table -->
            <div class="border-t border-gray-200 pt-4">
                <div class="text-sm font-semibold text-[#12344d] mb-2">
                    Fields not shown in table
                </div>
                <div id="shiftHiddenFields" class="space-y-1"></div>
            </div>
        </div>

        <!-- Footer -->
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button id="shiftCustomizeResetBtn"
                    class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">
                Reset All
            </button>
            <button id="shiftCustomizeApplyBtn"
                    class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                Apply
            </button>
        </div>
    </div>
</div>

<!-- Simple Toast for this page -->
<div id="shiftToast"
     class="fixed top-16 right-3 z-[2000] w-[280px] hidden opacity-0 translate-y-4 transition-all duration-200 pointer-events-none">
    <div id="shiftToastInner" class="rounded-md shadow-lg px-4 py-3 text-sm flex items-start gap-2"></div>
</div>

<!-- Shift Change scripts -->
<script src="/module/pages/shiftChange/list.js"></script>

