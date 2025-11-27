<div class="flex flex-col h-full">
  <!-- Tabs -->
  <div class="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
    <ul id="leave-tabs" class="flex flex-nowrap text-sm font-medium text-center">
      <!-- Pending -->
      <li>
        <button class="leave-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer"
          data-tab="pending">
          <span class="flex items-center gap-1">
            <i class="ri-hourglass-line mr-1"></i>
            Pending
            <span id="pending-count-badge"
              class="ml-1 counter-badge hidden inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full bg-[#009333] text-white">
              0
            </span>
            <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] leave-close-tab"></i>
          </span>
        </button>
      </li>
      <!-- History -->
      <li>
        <button
          class="leave-tab inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]"
          data-tab="history">
          <span class="flex items-center gap-1">
            <i class="ri-time-line mr-1"></i>
            History
            <span id="history-count-badge"
              class="ml-1 counter-badge hidden inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full bg-[#009333] text-white">
              0
            </span>
            <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] leave-close-tab"></i>
          </span>
        </button>
      </li>
      <!-- Apply Leave -->
      <li>
        <button
          class="leave-tab inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]"
          data-tab="apply">
          <span class="flex items-center gap-1">
            <i class="ri-calendar-check-line mr-1"></i>
            Apply Leave
            <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] leave-close-tab"></i>
          </span>
        </button>
      </li>
    </ul>
  </div>

  <!-- Main content -->
  <main class="flex-1">
    <div class="overflow-y-hidden">
      <!-- Apply Leave Section -->
      <div id="apply-leave-section" class="hidden">
        <div class="bg-[#ebeff3] h-[calc(100vh-144px)] overflow-y-auto">
          <div class="p-2 pb-0 bg-[#ebeff3] h-[calc(100vh-144px)] overflow-y-auto">
            <div class="bg-white rounded-lg p-6 h-full">
              <div class="grid grid-cols-1 lg:grid-cols-2">
                <form id="apply-leave-form" autocomplete="off">
                  <!-- Category -->
                  <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]"
                      for="leaveCategory">
                      Category
                      <span class=" text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <select id="leaveCategory" name="leaveCategory"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        required>
                        <option value="">Select Category</option>
                        <option value="leaveWithoutPay">Leave Without Pay</option>
                        <option value="overDutyLeave">Over Duty Leave</option>
                        <option value="permission">Permission</option>
                        <option value="medicalLeave">Medical Leave</option>
                        <option value="localFestival">Local Festival</option>
                        <option value="weekOff">Week Off</option>
                      </select>
                    </div>
                  </div>

                  <!-- Leave Type -->
                  <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]" for="leaveType">
                      Leave Type
                      <span class=" text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <select id="leaveType" name="leaveType"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        required>
                        <option value="">Select Leave Type</option>
                      </select>
                    </div>
                  </div>

                  <!-- Single Date -->
                  <div id="single-date-wrapper"
                    class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]" for="defaultDate">
                      Date
                      <span class=" text-red-500 ml-1">*</span>
                    </label>
                    <div class="flex-1">
                      <input id="defaultDate" name="defaultDate" type="date"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        required />
                    </div>
                  </div>

                  <!-- Date Range -->
                  <div id="range-date-wrapper" class="hidden">
                    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]" for="fromDate">
                        From Date
                        <span class=" text-red-500 ml-1">*</span>
                      </label>
                      <div class="flex-1">
                        <input id="fromDate" name="fromDate" type="date"
                          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
                      </div>
                    </div>
                    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]" for="toDate">
                        To Date
                        <span class=" text-red-500 ml-1">*</span>
                      </label>
                      <div class="flex-1">
                        <input id="toDate" name="toDate" type="date"
                          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
                      </div>
                    </div>
                    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]" for="totalDays">
                        Total Days
                      </label>
                      <div class="flex-1">
                        <input id="totalDays" name="totalDays" type="text" readonly
                          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
                      </div>
                    </div>
                  </div>

                  <!-- Permission Time -->
                  <div id="permission-time-wrapper" class="hidden">
                    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]" for="fromTime">
                        In Time
                        <span class=" text-red-500 ml-1">*</span>
                      </label>
                      <div class="flex-1">
                        <input id="fromTime" name="fromTime" type="time"
                          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
                      </div>
                    </div>
                    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]" for="toTime">
                        Out Time
                        <span class=" text-red-500 ml-1">*</span>
                      </label>
                      <div class="flex-1">
                        <input id="toTime" name="toTime" type="time"
                          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
                      </div>
                    </div>
                    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                      <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]" for="totalTime">
                        Total Time
                      </label>
                      <div class="flex-1">
                        <input id="totalTime" name="totalTime" type="text" readonly
                          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
                      </div>
                    </div>
                  </div>

                  <!-- Remarks -->
                  <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]" for="remarks">
                      Remarks
                    </label>
                    <div class="flex-1">
                      <input id="remarks" name="remarks" type="text"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        placeholder="Enter any remarks" autocomplete="off" />
                    </div>
                  </div>

                  <!-- Attachment (non-functional placeholder) -->
                  <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-full md:w-48 flex-shrink-0 text-[#1d1d1d]">
                      Attachment
                    </label>
                    <div class="flex-1">
                      <div class="flex items-center space-x-3">
                        <label
                          class="border border-gray-200 rounded-sm px-3 py-[6px] flex items-center gap-1 text-[#009333] text-sm cursor-pointer">
                          <i class="ri-upload-2-line text-md"></i>Upload File
                        </label>
                        <span class="text-sm text-gray-600 truncate">
                          (Demo) Attachment not uploaded
                        </span>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <footer class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
          <div class="flex items-center space-x-2 w-full">
            <button type="button" id="apply-cancel-btn"
              class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#6c757d] text-white border border-[#6c757d] hover:bg-[#5a6268]">
              Cancel
            </button>
            <button type="submit" form="apply-leave-form"
              class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a]">
              Submit
            </button>
          </div>
        </footer>
      </div>

      <!-- Pending Section -->
      <div id="pending-leave-section">
        <!-- Header -->
        <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
          <div class="flex items-center space-x-2 ml-2">
            <div class="bulk-actions flex items-center space-x-2">
              <button
                class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60">
                <i class="ri-printer-line mr-1"></i>
                Print
              </button>
              <button
                class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60">
                <i class="ri-sticky-note-line mr-1"></i>
                Summary
              </button>
              <button
                class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60">
                <i class="ri-arrow-down-line mr-1"></i>
                Download
              </button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-[#ebeff3]">
          <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
            <div class="h-full overflow-y-auto">
              <table class="w-full">
                <thead
                  class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                  <tr>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                      <div class="flex justify-center items-center gap-1">
                        <span>S.No.</span>
                      </div>
                    </th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Leave Category</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Leave Type</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Date Range</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%]">Total Days</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[25%]">Remarks</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Status</th>
                  </tr>
                </thead>
                <tbody id="pending-leave-tbody">
                  <!-- Filled by JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
          <span class="text-sm">
            Showing
            <span class="text-red-600" id="pending-visible-count">0</span>
            of
            <span class="text-blue-600" id="pending-total-count">0</span>
          </span>
        </div>
      </div>

      <!-- History Section -->
      <div id="history-leave-section" class="hidden">
        <!-- Header -->
        <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
          <div class="flex items-center space-x-2 ml-2">
            <div class="bulk-actions flex items-center space-x-2">
              <button
                class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60">
                <i class="ri-printer-line mr-1"></i>
                Print
              </button>
              <button
                class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60">
                <i class="ri-sticky-note-line mr-1"></i>
                Summary
              </button>
              <button
                class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60">
                <i class="ri-arrow-down-line mr-1"></i>
                Download
              </button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-[#ebeff3]">
          <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
            <div class="h-full overflow-y-auto">
              <table class="w-full">
                <thead
                  class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                  <tr>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                      <div class="flex justify-center items-center gap-1">
                        <span>S.No.</span>
                      </div>
                    </th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Leave Category</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Leave Type</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Date Range</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%]">Total Days</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[25%]">Remarks</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">Status</th>
                  </tr>
                </thead>
                <tbody id="history-leave-tbody">
                  <!-- Filled by JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
          <span class="text-sm">
            Showing
            <span class="text-red-600" id="history-visible-count">0</span>
            of
            <span class="text-blue-600" id="history-total-count">0</span>
          </span>
        </div>
      </div>
    </div>
  </main>

  <div id="departmentToast"
    class="fixed top-14 right-3 z-[2000] w-[280px] hidden opacity-0 translate-y-4 transition-all duration-200 pointer-events-none">
  </div>
</div>

<!-- Attach JS -->
<script src="/module/pages/leave/list.js"></script>

