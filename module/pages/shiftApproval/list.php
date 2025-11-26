<div id="shift-approval-root" class="flex flex-col h-full">
  <!-- Tabs -->
  <div class="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
    <ul class="flex flex-nowrap text-sm font-medium text-center">
      <li>
        <button
          class="bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-default">
          <span class="flex items-center gap-1">
            <i class="mr-1 ri-todo-line"></i>
            Shift Approval List
            <span
              class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full bg-[#009333] text-white">
              0
            </span>
          </span>
        </button>
      </li>
    </ul>

    <div class="flex items-center flex-shrink-0 ml-auto">
      <button
        id="openSidebarCustomize"
        class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#12344d] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">
        <i class="ri-equalizer-line mr-1"></i>
        <span class="text-sm">Customize Table</span>
      </button>
      <div
        class="inline-flex border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm ml-2">
        <button class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer">
          <i class="ri-download-line mr-1"></i>Import Shifts
        </button>
        <button class="px-2 border-l border-[#cfd7df] hover:bg-[#ebeff3] cursor-pointer">
          <i class="ri-arrow-down-s-line"></i>
        </button>
      </div>
      <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] ml-2 transition">
        <i class="ri-add-fill mr-1"></i>
        <span class="text-sm">Add Shifts</span>
      </button>
    </div>
  </div>

  <!-- Main content -->
  <main class="flex-1">
    <div class="overflow-y-hidden">
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

      <!-- Header Section -->
      <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
        <div class="flex items-center space-x-2 ml-2">
          <div class="bulk-actions flex items-center space-x-2">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm">
              <i class="ri-printer-line mr-1"></i> Print
            </button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm">
              <i class="ri-sticky-note-line mr-1"></i> Summary
            </button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm">
              <i class="ri-arrow-down-line mr-1"></i> Download
            </button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="shift-approval-delete-btn">
              <i class="ri-delete-bin-6-line mr-1"></i>
              Delete
            </button>
          </div>
        </div>

        <div class="flex items-center relative gap-2">
          <button
            class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm"
            id="shift-approval-open-filter-btn">
            <i class="ri-sort-desc"></i>
          </button>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-[#ebeff3]">
        <div id="shift-approval-selected-badge"
          class="hidden fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
          0 items selected
        </div>

        <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
          <div class="h-full overflow-y-auto">
            <table class="w-full">
              <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                <tr>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center" id="checkboxColumn">
                    <input
                      type="checkbox"
                      id="shift-approval-select-all"
                      class="form-check accent-[#009333]"
                    />
                  </th>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
                    <div class="flex justify-center items-center gap-1">
                      <span>S.No.</span>
                    </div>
                  </th>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[20%]">Shift Id</th>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[12%]">From Date</th>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">To Date</th>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[13%]">Total Days</th>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Remarks</th>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[10%]">Action</th>
                </tr>
              </thead>
              <tbody id="shift-approval-table-body">
                <!-- Filled by JS -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </main>

  <!-- Footer -->
  <footer class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
    <div class="text-sm">
      Showing
      <span class="text-red-600" id="shift-approval-visible-count">0</span>
      of
      <span class="text-blue-600" id="shift-approval-total-count">0</span>
    </div>
  </footer>
</div>

<!-- Filter Sidebar -->
<div id="shift-approval-filter-sidebar"
  class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-0 pointer-events-none">
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)]" id="shift-approval-filter-backdrop"></div>

  <!-- Sidebar Content -->
  <div
    class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col translate-x-full"
    id="shift-approval-filter-panel">
    <!-- Header -->
    <div
      class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
      <h5 class="">Add Filters</h5>
      <button class="cursor-pointer" id="shift-approval-filter-close-btn">
        <i class="ri-close-line"></i>
      </button>
    </div>

    <!-- Scrollable Content -->
    <div class="p-4 overflow-y-auto space-y-4 flex-1">
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">From Date</label>
        <input type="date" id="shift-filter-fromDate"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">To Date</label>
        <input type="date" id="shift-filter-toDate"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">Shift Name</label>
        <select id="shift-filter-shiftId"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
          <option value="">All Shifts</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">Staff Name</label>
        <select id="shift-filter-staff"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
          <option value="">All Staff</option>
        </select>
      </div>
    </div>

    <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
      <button
        class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition"
        id="shift-approval-filter-reset-btn">
        Reset All
      </button>
      <button
        class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition"
        id="shift-approval-filter-apply-btn">
        Apply
      </button>
    </div>
  </div>
</div>

<!-- View / Approve / Reject Modal -->
<div
  id="shift-approval-view-modal"
  class="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 opacity-0 pointer-events-none">
  <!-- Backdrop -->
  <div
    id="shift-approval-view-backdrop"
    class="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 transition-opacity duration-300">
  </div>

  <!-- Modal Content -->
  <div
    class="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 z-50">
    <!-- Close Button -->
    <button
      id="shift-approval-view-close-btn"
      class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
      <i class="ri-close-line text-xl"></i>
    </button>

    <!-- Modal Header -->
    <div class="px-6 pt-6 pb-4 text-center">
      <div class="flex justify-center items-center space-x-3 mb-4">
        <div class="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
          <i class="ri-eye-line text-white text-xl"></i>
        </div>
        <div class="flex items-center">
          <i class="ri-arrow-right-line text-gray-400 mx-2"></i>
        </div>
        <div class="w-12 h-12 bg-[#009333] rounded-lg flex items-center justify-center">
          <i class="ri-file-text-line text-white text-xl"></i>
        </div>
      </div>

      <h2 class="text-xl font-semibold text-gray-900 mb-2">
        View Permission Details
      </h2>
      <p class="text-gray-600 text-sm">
        Review the permission request details and take appropriate action
        on the request.
      </p>
    </div>

    <!-- Modal Content -->
    <div class="px-6 pb-4">
      <div class="space-y-3">
        <div class="text-gray-800 font-medium mb-3 flex justify-between items-center">
          <div>Conditions that are followed by staff</div>
          <div>( 2 / 3 )</div>
        </div>

        <div class="space-y-2">
          <div class="flex items-center text-sm text-gray-700">
            <i class="ri-check-line text-green-600 text-lg mr-3"></i>
            <span>
              Permission must be requested at least 24 hours in advance
            </span>
          </div>
          <div class="flex items-center text-sm text-gray-700">
            <i class="ri-check-line text-green-600 text-lg mr-3"></i>
            <span>
              Valid reason must be provided with necessary documentation
            </span>
          </div>
          <div class="flex items-center text-sm text-gray-700">
            <i class="ri-close-line text-red-600 text-lg mr-3"></i>
            <span>
              Leave Letter must be submitted to their Respective HR
            </span>
          </div>
        </div>

        <!-- Request Summary Box -->
        <div class="bg-[#d3d3d3] rounded-lg p-3 mt-4">
          <div class="text-xs text-gray-500 mb-1">
            Selected Request:
          </div>
          <div class="text-sm font-medium text-gray-900" id="shift-approval-view-summary">
            <!-- Filled by JS -->
          </div>
          <div class="text-xs text-gray-500 mt-1">
            ID: <span id="shift-approval-view-id"></span>
          </div>
        </div>
        <div>
          <input
            id="shift-approval-remarks"
            name="remarks"
            type="text"
            class="capitalize block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
            placeholder="Enter Remarks"
            autocomplete="off"
          />
        </div>
      </div>
    </div>

    <!-- Modal Footer -->
    <div class="px-6 pb-6 flex items-center justify-between">
      <button
        id="shift-approval-view-close-btn-2"
        class="px-3 py-1.5 text-black bg-[#EFEFEF] rounded-md text-sm font-medium transition-colors flex items-center">
        Close
      </button>

      <div class="flex space-x-3">
        <button
          id="shift-approval-reject-btn"
          class="px-3 py-1.5 text-white bg-[#D90000] hover:bg-[#A30000] rounded-md text-sm font-medium transition-colors">
          Reject
        </button>
        <button
          id="shift-approval-approve-btn"
          class="px-3 py-1.5 bg-[#009333] hover:bg-[#006622] text-white rounded-md text-sm font-medium transition-colors">
          Approve
        </button>
      </div>
    </div>
  </div>
</div>


<!-- Attach JS -->
<script src="/module/pages/shiftApproval/shiftApproval.js"></script>

