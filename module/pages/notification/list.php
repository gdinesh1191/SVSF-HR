<div class="flex flex-col h-full">
  <!-- Tabs -->
  <div class="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
    <ul id="notification-tabs" class="flex flex-nowrap text-sm font-medium text-center">
      <li>
        <button
          class="notification-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer"
          data-tab="notification-list">
          <span class="flex items-center gap-1">
            <i class="mr-1 ri-todo-line"></i>
            Notification List
            <span id="notification-list-count"
              class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full bg-[#009333] text-white">
              0
            </span>
            <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] close-tab hidden"></i>
          </span>
        </button>
      </li>
      <li>
        <button
          class="notification-tab inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]"
          data-tab="new-notification">
          <span class="flex items-center gap-1">
            <i class="mr-1 ri-add-circle-line"></i>
            Create Notification
            <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] close-tab hidden"></i>
          </span>
        </button>
      </li>
    </ul>
  </div>

  <!-- Main content -->
  <main class="flex-1">
    <div class="overflow-y-hidden">
      <!-- Create Notification form -->
      <div id="new-notification-section" class="hidden">
        <div class="bg-[#ebeff3] h-[calc(100vh-144px)] overflow-y-auto">
          <div class="p-2 pb-0 bg-[#ebeff3] h-[calc(100vh-144px)] overflow-y-auto">
            <div class="bg-white rounded-lg p-6 h-full">
              <div class="grid grid-cols-1 lg:grid-cols-2">
                <form id="notification-form" autocomplete="off">
                  <!-- Department -->
                  <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-1/2">
                      Department
                      <span class=" text-red-500">*</span>
                    </label>
                    <div class="flex flex-col w-3/4">
                      <select id="notification-department" name="department"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                        <option value="">Select Department</option>
                      </select>
                    </div>
                  </div>

                  <!-- Sub-Department -->
                  <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-1/2">
                      Sub-Department
                      <span class=" text-red-500">*</span>
                    </label>
                    <div class="flex flex-col w-3/4">
                      <select id="notification-subDepartment" name="subDepartment"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                        <option value="">Select Sub-Department</option>
                      </select>
                    </div>
                  </div>

                  <!-- From Date -->
                  <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-1/2">
                      From Date
                      <span class=" text-red-500">*</span>
                    </label>
                    <div class="flex flex-col w-3/4">
                      <input type="date" id="notification-fromDate" name="fromDate"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        required />
                    </div>
                  </div>

                  <!-- To Date -->
                  <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-1/2">
                      To Date
                      <span class=" text-red-500">*</span>
                    </label>
                    <div class="flex flex-col w-3/4">
                      <input type="date" id="notification-toDate" name="toDate"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        required />
                    </div>
                  </div>

                  <!-- Notification Message -->
                  <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <label class="text-sm text-[#1D1D1D] w-1/2">
                      Notification Message
                      <span class=" text-red-500">*</span>
                    </label>
                    <div class="flex flex-col w-3/4">
                      <input type="text" id="notification-message" name="notificationMessage"
                        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                        placeholder="Enter Notification Message" maxlength="255" required />
                    </div>
                  </div>

                  <!-- Error -->
                  <div id="notification-form-error" class="text-red-500 text-sm mb-4 hidden"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Shared Toast / Confirm (reuse existing IDs for global utilities) -->
      <div id="departmentToast"
        class="fixed top-14 right-3 z-[2000] w-[280px] hidden opacity-0 translate-y-4 transition-all duration-200 pointer-events-none">
      </div>
      <div id="departmentConfirmModal" class="fixed inset-0 z-[2100] hidden items-center justify-center bg-black/50 p-4">
        <div class="relative max-w-[470px] w-full text-center">
          <div class="bg-white rounded-[20px] p-8 relative w-full text-center">
            <button id="confirmModalCloseBtn"
              class="absolute top-4 right-4 text-[#0f0f0f] cursor-pointer text-2xl leading-none">
              <i class="ri-close-line"></i>
            </button>
            <div class="relative mx-auto flex items-center justify-center w-[67px] h-[67px] mb-4">
              <div id="confirmModalOuterCircle" class="absolute w-[66px] h-[66px] rounded-full opacity-70"></div>
              <div id="confirmModalMiddleCircle" class="absolute w-[46px] h-[46px] rounded-full opacity-90"></div>
              <div id="confirmModalInnerCircle"
                class="z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center">
                <i id="confirmModalIcon" class="ri-information-line text-white"></i>
              </div>
            </div>
            <h3 id="confirmModalTitle" class="text-xl font-semibold text-gray-900 mb-2.5">Confirm action</h3>
            <p id="confirmModalMessage" class="text-sm text-gray-500 mb-6 px-4">Are you sure you want to proceed?</p>
            <div class="flex justify-center space-x-2">
              <button id="confirmModalCancel"
                class="px-6 py-2 w-full text-black cursor-pointer text-sm font-medium bg-white border border-[#d5d5d5] rounded-lg">
                Cancel
              </button>
              <button id="confirmModalConfirm"
                class="px-6 py-2 w-full cursor-pointer text-sm font-medium text-white rounded-lg bg-[#d53635]">
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Notification List -->
      <div id="notification-list-section">
        <!-- Header Section -->
        <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
          <div class="flex items-center space-x-2 ml-2">
            <div class="bulk-actions flex items-center space-x-2">
              <button
                class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm"
                id="notification-print-btn">
                <i class="ri-printer-line mr-1"></i>
                Print
              </button>
              <button
                class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm"
                id="notification-summary-btn">
                <i class="ri-sticky-note-line mr-1"></i>
                Summary
              </button>
              <button
                class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm"
                id="notification-download-btn">
                <i class="ri-arrow-down-line mr-1"></i>
                Download
              </button>
              <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="notification-delete-btn">
                <i class="ri-delete-bin-6-line mr-1"></i>
                Delete
              </button>
            </div>
          </div>
          <div class="flex items-center relative gap-2">
            <input
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]"
              type="text" id="notification-search" placeholder="Search..." />
            <input type="month" id="notification-month-filter"
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px] w-[135px]" />
            <button
              class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm"
              id="notification-open-filter-btn">
              <i class="ri-sort-desc"></i>
            </button>
          </div>
        </div>

        <!-- Table Section -->
        <div class="bg-[#ebeff3]">
          <div id="notification-selected-badge"
            class="hidden fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
            0 items selected
          </div>

          <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
            <div class="h-full overflow-y-auto">
              <table class="w-full" id="notification-table">
                <thead
                  class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                  <tr>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                      <input type="checkbox" id="notification-select-all" class="form-check accent-[#009333]" />
                    </th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                      <div class="flex justify-center items-center gap-1">
                        <span>S.No.</span>
                      </div>
                    </th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[20%]">Department</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[20%]">Sub-Department</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">From Date</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[15%]">To Date</th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[25%]">Remarks</th>
                  </tr>
                </thead>
                <tbody id="notification-table-body">
                  <!-- Filled by JS -->
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
    <!-- Create Notification footer -->
    <div id="new-notification-footer" class="flex items-center space-x-2 w-full hidden">
      <button type="button"
        class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#6c757d] text-white border border-[#6c757d] hover:bg-[#5a6268] cursor-pointer transition"
        id="notification-cancel-btn">
        Cancel
      </button>
      <button type="button"
        class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition"
        id="notification-submit-btn">
        Submit
      </button>
    </div>

    <!-- Notification list footer -->
    <div id="notification-list-footer" class="text-sm">
      Showing
      <span class="text-red-600" id="notification-visible-count">0</span>
      of
      <span class="text-blue-600" id="notification-total-count">0</span>
    </div>
  </footer>
</div>

<!-- Filter Sidebar -->
<div id="notification-filter-sidebar"
  class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-0 pointer-events-none">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)]" id="notification-filter-backdrop"></div>

  <!-- Sidebar Content -->
  <div
    class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col translate-x-full"
    id="notification-filter-panel">
    <!-- Header -->
    <div
      class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
      <h5 class="">Add Filters</h5>
      <button class="cursor-pointer" id="notification-filter-close-btn">
        <i class="ri-close-line"></i>
      </button>
    </div>

    <!-- Scrollable Content -->
    <div class="p-4 overflow-y-auto space-y-4 flex-1">
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">Department</label>
        <select id="filter-notification-department"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
          <option value="">All Departments</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">Sub-Department</label>
        <select id="filter-notification-subDepartment"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
          <option value="">All Sub-Departments</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">From Date</label>
        <input type="date" id="filter-notification-fromDate"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">To Date</label>
        <input type="date" id="filter-notification-toDate"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
      </div>
    </div>

    <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
      <button
        class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition"
        id="notification-filter-reset-btn">
        Reset All
      </button>
      <button
        class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition"
        id="notification-filter-apply-btn">
        Apply
      </button>
    </div>
  </div>
</div>


<!-- Attach JS -->
<script src="/module/pages/notification/notification.js"></script>

