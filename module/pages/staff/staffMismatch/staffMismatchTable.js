// Staff Mismatch Table Component - Plain JavaScript
// This follows the same pattern as activeStaffTable.js
(function () {
  "use strict";

  const staffMismatchStore = {
    staffMismatch: [],
    selectedIds: [],
    selectAll: false,
    loading: false,
    initialLoading: false,
    isFilterOpen: false,
    filters: {},
    localFilters: {},
    page: 1,
    total: 0,
    hasMore: false,
    colSpan: 0,
    searchTerm: "",
    debouncedSearchTerm: "",
    debounceTimer: null,
    deletedIds: [],
    fields: [],
    observer: null,
  };

  const defaultColumns = [
    { id: "staffDetails", label: "Staff Details", visible: true },
    { id: "designation", label: "Designation", visible: true },
    { id: "department", label: "Department", visible: true },
    { id: "contact", label: "Contact", visible: true },
    { id: "joinDate", label: "Join Date", visible: false },
  ];

  const dummyStaffMismatchData = [
    {
      id: 201,
      staff_name: "John Carter",
      userID: "EMP001",
      gender: "Male",
      phone_number: "9876543210",
      DEPARTMENT: "Sales",
      DESIGNATION: "Sales Manager",
      address_line_1: "123 Main Street",
      joining_date: "2021-01-15",
      dob: "1990-05-12",
      GratuityStartDate: "2021-02-01",
      father_name: "Robert Carter",
    },
    {
      id: 202,
      staff_name: "Emma Watson",
      userID: "EMP002",
      gender: "Female",
      phone_number: "9876543211",
      DEPARTMENT: "HR",
      DESIGNATION: "HR Lead",
      address_line_1: "12 River Road",
      joining_date: "2020-07-22",
      dob: "1992-11-02",
      GratuityStartDate: "2020-08-01",
      father_name: "Peter Watson",
    },
    {
      id: 203,
      staff_name: "Michael Brown",
      userID: "EMP003",
      gender: "Male",
      phone_number: "9876543212",
      DEPARTMENT: "IT",
      DESIGNATION: "Senior Developer",
      address_line_1: "45 Ocean Drive",
      joining_date: "2019-03-10",
      dob: "1988-03-21",
      GratuityStartDate: "2019-04-01",
      father_name: "Thomas Brown",
    },
    {
      id: 204,
      staff_name: "Sophia Lee",
      userID: "EMP004",
      gender: "Female",
      phone_number: "9876543213",
      DEPARTMENT: "Finance",
      DESIGNATION: "Finance Analyst",
      address_line_1: "78 Lake View",
      joining_date: "2022-05-05",
      dob: "1994-09-14",
      GratuityStartDate: "2022-05-15",
      father_name: "William Lee",
    },
    {
      id: 205,
      staff_name: "David Miller",
      userID: "EMP005",
      gender: "Male",
      phone_number: "9876543214",
      DEPARTMENT: "Operations",
      DESIGNATION: "Operations Head",
      address_line_1: "98 Sunrise Blvd",
      joining_date: "2018-11-30",
      dob: "1985-12-06",
      GratuityStartDate: "2018-12-15",
      father_name: "George Miller",
    },
  ];

  let staffMismatchData = [...dummyStaffMismatchData];
  const STAFF_MISMATCH_PAGE_SIZE = 30;

  if (window.staffModule) {
    window.staffModule.registerColumns("staffMismatch", defaultColumns);
  }

  function getOrderedVisibleFields() {
    const fields = window.staffModule && window.staffModule.getFields("staffMismatch");
    const source = fields && fields.length > 0 ? fields : defaultColumns;
    return source.filter((f) => f.visible);
  }

  function getWidthClass(id) {
    switch (id) {
      case "staffDetails": return "w-[20%]";
      case "designation": return "w-[13%]";
      case "department": return "w-[13%]";
      case "contact": return "w-[10%]";
      case "joinDate": return "w-[10%]";
      default: return "";
    }
  }

  function debounceSearch(term) {
    clearTimeout(staffMismatchStore.debounceTimer);
    staffMismatchStore.debounceTimer = setTimeout(() => {
      staffMismatchStore.debouncedSearchTerm = term;
      staffMismatchStore.page = 1;
      fetchStaffMismatch(1);
    }, 300);
  }

  function fetchStaffMismatch(page = 1) {
    if (page === 1) {
      staffMismatchStore.initialLoading = true;
      staffMismatchStore.staffMismatch = [];
      renderStaffMismatch();
    } else {
      staffMismatchStore.loading = true;
    }

    const searchTerm =
      (staffMismatchStore.debouncedSearchTerm || "").toLowerCase();
    const filtered = staffMismatchData.filter((staff) =>
      staff.staff_name.toLowerCase().includes(searchTerm)
    );

    const startIndex = (page - 1) * STAFF_MISMATCH_PAGE_SIZE;
    const newStaff = filtered.slice(
      startIndex,
      startIndex + STAFF_MISMATCH_PAGE_SIZE
    );

    setTimeout(() => {
      staffMismatchStore.staffMismatch =
        page === 1
          ? newStaff
          : [...staffMismatchStore.staffMismatch, ...newStaff];
      staffMismatchStore.hasMore =
        startIndex + STAFF_MISMATCH_PAGE_SIZE < filtered.length;
      staffMismatchStore.total = filtered.length;
      staffMismatchStore.loading = false;
      staffMismatchStore.initialLoading = false;

      if (window.staffModule && window.staffModule.updateCount) {
        window.staffModule.updateCount(
          "staffMismatch",
          staffMismatchStore.staffMismatch.length
        );
      }

      renderStaffMismatch();
    }, 200);
  }

  function renderStaffMismatch() {
    const container = $("#staffMismatchContent");
    if (!container.length) return;

    const orderedFields = getOrderedVisibleFields();
    const html = `
      ${staffMismatchStore.initialLoading ? `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009333]"></div>
        </div>
      ` : ""}
      <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
        <div class="flex items-center space-x-2 ml-2">
          <div class="bulk-actions flex items-center space-x-2">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm"><i class="ri-printer-line mr-1"></i> Print</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm"><i class="ri-sticky-note-line mr-1"></i> Summary</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm"><i class="ri-arrow-down-line mr-1"></i> Download</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="staffMismatchDeleteBtn"><i class="ri-delete-bin-6-line mr-1"></i> Delete</button>
          </div>
        </div>
        <div class="flex items-center relative space-x-2">
          <input class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]" type="text" id="staffMismatchSearch"
            placeholder="Enter Staff Name" value="${staffMismatchStore.searchTerm || ""}" />
          <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="staffMismatchFilterBtn"><i class="ri-sort-desc"></i></button>
        </div>
      </div>
      <div class="bg-[#ebeff3]">
        ${staffMismatchStore.selectedIds.length > 1 ? `
          <div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
            ${staffMismatchStore.selectedIds.length} items selected
          </div>
        ` : ""}
        <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
          <div class="h-full overflow-y-auto">
            <table class="w-full">
              <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                <tr>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                    <input type="checkbox" id="staffMismatchSelectAll" class="form-check accent-[#009333]" ${staffMismatchStore.staffMismatch.length > 0 && staffMismatchStore.selectAll ? "checked" : ""} />
                  </th>
                  <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center"><span>S.No.</span></th>
                  ${orderedFields.map(f => `<th class="border-r border-[#ebeff3] p-[0.3rem] ${getWidthClass(f.id)}">${escapeHtml(f.label)}</th>`).join("")}
                </tr>
              </thead>
              <tbody>
                ${staffMismatchStore.initialLoading ? renderShimmerRows(orderedFields.length) :
                  staffMismatchStore.staffMismatch.length === 0 ? `
                  <tr><td colspan="${2 + orderedFields.length}" class="py-10 text-center text-gray-500">No List available</td></tr>
                ` : staffMismatchStore.staffMismatch.map((staff, index) => renderStaffRow(staff, index, orderedFields)).join("")
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
        <span class="text-sm">
          Showing <span class="text-red-600">${staffMismatchStore.staffMismatch.length}</span> of
          <span class="text-blue-600">${staffMismatchStore.staffMismatch.length}</span>
        </span>
      </div>
      ${renderFilterModal()}
    `;

    container.html(html);
    bindEvents();
    bindStaffMismatchFilterModalEvents();
    setupInfiniteScroll();
  }

  function renderFilterModal() {
    return `
      <div
        id="staffMismatchFilterModal"
        class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300"
      >
        <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)] filter-backdrop"></div>
        <div class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 translate-x-full filter-panel flex flex-col">
          <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Filters</h5>
            <button class="cursor-pointer close-filter">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="p-4 overflow-y-auto space-y-4 flex-1">
            <div>
              <label class=" block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800">Employee Code</label>
              <input
                type="text"
                placeholder="Enter Employee code"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                id="staffMismatchFilterEmployeeCode"
                value="${staffMismatchStore.localFilters.employeeCode || ""}"
              />
            </div>
            <div>
              <label class=" block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800">Designation</label>
              <input
                type="text"
                placeholder="Enter Designation"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                id="staffMismatchFilterDesignation"
                value="${staffMismatchStore.localFilters.designation || ""}"
              />
            </div>
            <div>
              <label class=" block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800">Status</label>
              <div class="flex gap-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="staffMismatchFilterStatus"
                    value="active"
                    class="mr-2 accent-[#009333]"
                    ${
                      staffMismatchStore.localFilters.status === "active"
                        ? "checked"
                        : ""
                    }
                  />
                  Active
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="staffMismatchFilterStatus"
                    value="inactive"
                    class="mr-2 accent-[#009333]"
                    ${
                      staffMismatchStore.localFilters.status === "inactive"
                        ? "checked"
                        : ""
                    }
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition reset-filter">Reset All</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition apply-filter">Apply</button>
          </div>
        </div>
      </div>
    `;
  }

  function populateStaffMismatchFilterForm(modal) {
    if (!modal || !modal.length) return;
    modal.find("#staffMismatchFilterEmployeeCode").val(
      staffMismatchStore.localFilters.employeeCode || ""
    );
    modal.find("#staffMismatchFilterDesignation").val(
      staffMismatchStore.localFilters.designation || ""
    );
    modal
      .find("input[name='staffMismatchFilterStatus']")
      .prop("checked", false);
    if (staffMismatchStore.localFilters.status) {
      modal
        .find(
          `input[name='staffMismatchFilterStatus'][value='${staffMismatchStore.localFilters.status}']`
        )
        .prop("checked", true);
    }
  }

  function openStaffMismatchFilterModal() {
    const modal = $("#staffMismatchFilterModal");
    if (!modal.length) return;
    staffMismatchStore.localFilters = { ...staffMismatchStore.filters };
    populateStaffMismatchFilterForm(modal);
    modal
      .removeClass("opacity-0 pointer-events-none")
      .addClass("opacity-100 pointer-events-auto");
    const panel = modal.find(".filter-panel");
    requestAnimationFrame(() => {
      panel.removeClass("translate-x-full");
    });
  }

  function closeStaffMismatchFilterModal(callback) {
    const modal = $("#staffMismatchFilterModal");
    if (!modal.length) {
      if (typeof callback === "function") callback();
      return;
    }
    const panel = modal.find(".filter-panel");
    panel.addClass("translate-x-full");
    setTimeout(() => {
      modal
        .removeClass("opacity-100 pointer-events-auto")
        .addClass("opacity-0 pointer-events-none");
      if (typeof callback === "function") callback();
    }, 300);
  }

  function bindStaffMismatchFilterModalEvents() {
    const modal = $("#staffMismatchFilterModal");
    if (!modal.length) return;

    modal
      .find(".filter-backdrop, .close-filter")
      .off("click")
      .on("click", function () {
        closeStaffMismatchFilterModal();
      });

    modal
      .find(".reset-filter")
      .off("click")
      .on("click", function () {
        staffMismatchStore.localFilters = {};
        staffMismatchStore.filters = {};
        closeStaffMismatchFilterModal(() => renderStaffMismatch());
      });

    modal
      .find(".apply-filter")
      .off("click")
      .on("click", function () {
        const employeeCode = modal
          .find("#staffMismatchFilterEmployeeCode")
          .val()
          ?.trim();
        const designation = modal
          .find("#staffMismatchFilterDesignation")
          .val()
          ?.trim();
        const status =
          modal
            .find("input[name='staffMismatchFilterStatus']:checked")
            .val() || "";

        staffMismatchStore.localFilters = {
          employeeCode: employeeCode || "",
          designation: designation || "",
          status,
        };
        staffMismatchStore.filters = { ...staffMismatchStore.localFilters };
        closeStaffMismatchFilterModal(() => renderStaffMismatch());
      });
  }

  function renderStaffRow(staff, index, orderedFields) {
    const isSelected = staffMismatchStore.selectedIds.includes(staff.id);
    const isLastRow = index === staffMismatchStore.staffMismatch.length - 1;

    return `
      <tr data-staff-id="${staff.id}" data-last-row="${isLastRow ? "true" : "false"}"
        class="hover:bg-[#f5f7f9] text-sm cursor-pointer group ${isSelected ? "bg-[#e5f2fd]" : ""}">
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
          <input type="checkbox" class="form-check accent-[#009333] staff-checkbox" data-staff-id="${staff.id}" ${isSelected ? "checked" : ""} />
        </td>
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%]">
          <div class="flex justify-between items-center">
            <span></span><span class="text-center">${index + 1}</span>
            <span class="cursor-pointer"><i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i></span>
          </div>
        </td>
        ${orderedFields.map(f => renderFieldCell(staff, f)).join("")}
      </tr>
    `;
  }

  function renderFieldCell(staff, field) {
    switch (field.id) {
      case "staffDetails":
        return `<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[20%]">
          <div class="flex items-center gap-2">
            <img src="/images/user.png" alt="avatar" class="w-8 h-8 rounded-full" />
            <div>
              <div class="text-sm font-medium text-gray-900">${escapeHtml(staff.staff_name || "")}</div>
              <div class="text-sm text-gray-500">${escapeHtml(staff.userID || "")}</div>
            </div>
          </div>
        </td>`;
      case "designation":
        return `<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[13%]"><div class="text-sm text-gray-900">${escapeHtml(staff.DESIGNATION || "")}</div></td>`;
      case "department":
        return `<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[13%]"><div class="text-sm text-gray-900">${escapeHtml(staff.DEPARTMENT || "")}</div></td>`;
      case "contact":
        return `<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]"><div class="text-sm text-gray-900">${escapeHtml(staff.phone_number || "")}</div></td>`;
      case "joinDate":
        return `<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]"><div class="text-sm text-gray-900">${escapeHtml(staff.joining_date || "")}</div></td>`;
      default:
        return "<td></td>";
    }
  }

  function renderShimmerRows(fieldCount, count = 30) {
    return Array.from({ length: count }).map(() => `
      <tr class="animate-pulse">
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>
        ${Array.from({ length: fieldCount }).map(() => '<td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>').join("")}
      </tr>
    `).join("");
  }

  function bindEvents() {
    $("#staffMismatchSearch").off("input").on("input", function () {
      staffMismatchStore.searchTerm = $(this).val();
      debounceSearch(staffMismatchStore.searchTerm);
    });

    $("#staffMismatchSelectAll").off("change").on("change", function () {
      const checked = $(this).is(":checked");
      staffMismatchStore.selectAll = checked;
      staffMismatchStore.selectedIds = checked
        ? staffMismatchStore.staffMismatch.map(s => s.id)
        : [];
      renderStaffMismatch();
    });

    $(document).off("change", ".staff-checkbox").on("change", ".staff-checkbox", function () {
      const staffId = parseInt($(this).data("staff-id"));
      if ($(this).is(":checked")) {
        if (!staffMismatchStore.selectedIds.includes(staffId)) {
          staffMismatchStore.selectedIds.push(staffId);
        }
      } else {
        staffMismatchStore.selectedIds = staffMismatchStore.selectedIds.filter(id => id !== staffId);
      }
      
      // Update selectAll state: true only if all items are selected AND there are items
      const allSelected = staffMismatchStore.staffMismatch.length > 0 && 
                         staffMismatchStore.selectedIds.length === staffMismatchStore.staffMismatch.length;
      staffMismatchStore.selectAll = allSelected;
      
      renderStaffMismatch();
    });

    $("#staffMismatchFilterBtn").off("click").on("click", function () {
      openStaffMismatchFilterModal();
    });
  }

  function setupInfiniteScroll() {
    if (staffMismatchStore.observer) staffMismatchStore.observer.disconnect();
    if (!staffMismatchStore.loading && staffMismatchStore.hasMore) {
      const lastRow = $('[data-last-row="true"]');
      if (lastRow.length) {
        staffMismatchStore.observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            staffMismatchStore.page++;
            fetchStaffMismatch(staffMismatchStore.page);
          }
        }, { threshold: 0.1 });
        staffMismatchStore.observer.observe(lastRow[0]);
      }
    }
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m]));
  }

  $(document).ready(function () {
    setTimeout(() => fetchStaffMismatch(1), 100);
  });

  window.staffMismatchModule = {
    renderStaffMismatch,
    getStore: () => staffMismatchStore,
  };
})();

