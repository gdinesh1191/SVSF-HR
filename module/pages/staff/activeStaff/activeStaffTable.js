// Active Staff Table Component - Plain JavaScript
(function () {
  "use strict";

  const activeStaffStore = {
    activeStaff: [],
    selectedIds: [],
    selectAll: false,
    loading: false,
    initialLoading: false,
    isFilterOpen: false,
    filters: {},
    localFilters: {},
    isStaffSidebarOpen: false,
    selectedStaff: null,
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

  // Sample data (replace with API once available)
  const dummyActiveStaffData = [
    {
      id: 1,
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
      id: 2,
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
      id: 3,
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
      id: 4,
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
      id: 5,
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
    {
      id: 6,
      staff_name: "Olivia Green",
      userID: "EMP006",
      gender: "Female",
      phone_number: "9876543215",
      DEPARTMENT: "Marketing",
      DESIGNATION: "Brand Manager",
      address_line_1: "200 Hill Street",
      joining_date: "2021-09-18",
      dob: "1993-06-08",
      GratuityStartDate: "2021-10-01",
      father_name: "Henry Green",
    },
    {
      id: 7,
      staff_name: "Liam Johnson",
      userID: "EMP007",
      gender: "Male",
      phone_number: "9876543216",
      DEPARTMENT: "Support",
      DESIGNATION: "Support Lead",
      address_line_1: "54 Maple Avenue",
      joining_date: "2017-04-12",
      dob: "1987-08-30",
      GratuityStartDate: "2017-05-01",
      father_name: "Samuel Johnson",
    },
    {
      id: 8,
      staff_name: "Ava Martinez",
      userID: "EMP008",
      gender: "Female",
      phone_number: "9876543217",
      DEPARTMENT: "Administration",
      DESIGNATION: "Admin Officer",
      address_line_1: "32 Valley Road",
      joining_date: "2016-02-20",
      dob: "1989-10-25",
      GratuityStartDate: "2016-03-01",
      father_name: "Carlos Martinez",
    },
    {
      id: 9,
      staff_name: "Noah Wilson",
      userID: "EMP009",
      gender: "Male",
      phone_number: "9876543218",
      DEPARTMENT: "IT",
      DESIGNATION: "UI Engineer",
      address_line_1: "400 Forest Lane",
      joining_date: "2023-01-09",
      dob: "1995-01-19",
      GratuityStartDate: "2023-02-01",
      father_name: "Patrick Wilson",
    },
    {
      id: 10,
      staff_name: "Mia Davis",
      userID: "EMP010",
      gender: "Female",
      phone_number: "9876543219",
      DEPARTMENT: "Design",
      DESIGNATION: "Creative Lead",
      address_line_1: "500 Garden Street",
      joining_date: "2015-08-14",
      dob: "1986-04-02",
      GratuityStartDate: "2015-09-01",
      father_name: "James Davis",
    },
  ];

  let activeStaffData = [...dummyActiveStaffData];
  const ACTIVE_STAFF_PAGE_SIZE = 30;

  // Register columns with parent module
  if (window.staffModule) {
    window.staffModule.registerColumns("activeStaff", defaultColumns);
  }

  // Get ordered visible fields
  function getOrderedVisibleFields() {
    const fields =
      window.staffModule && window.staffModule.getFields("activeStaff");
    const source =
      fields && fields.length > 0 ? fields : defaultColumns;
    return source.filter((f) => f.visible);
  }

  function getWidthClass(id) {
    switch (id) {
      case "staffDetails":
        return "w-[20%]";
      case "designation":
        return "w-[13%]";
      case "department":
        return "w-[13%]";
      case "contact":
        return "w-[10%]";
      case "joinDate":
        return "w-[10%]";
      default:
        return "";
    }
  }

  // Debounce search
  function debounceSearch(term) {
    clearTimeout(activeStaffStore.debounceTimer);
    activeStaffStore.debounceTimer = setTimeout(() => {
      activeStaffStore.debouncedSearchTerm = term;
      activeStaffStore.page = 1;
      fetchActiveStaff(1);
    }, 300);
  }

  // Fetch active staff
  function fetchActiveStaff(page = 1) {
    if (page === 1) {
      activeStaffStore.initialLoading = true;
      activeStaffStore.activeStaff = [];
      renderActiveStaff();
    } else {
      activeStaffStore.loading = true;
    }

    const searchTerm =
      (activeStaffStore.debouncedSearchTerm || "").toLowerCase();

    const filtered = activeStaffData.filter((staff) =>
      staff.staff_name.toLowerCase().includes(searchTerm)
    );

    const startIndex = (page - 1) * ACTIVE_STAFF_PAGE_SIZE;
    const newStaff = filtered.slice(
      startIndex,
      startIndex + ACTIVE_STAFF_PAGE_SIZE
    );

    setTimeout(() => {
      activeStaffStore.activeStaff =
        page === 1
          ? newStaff
          : [...activeStaffStore.activeStaff, ...newStaff];
      activeStaffStore.hasMore =
        startIndex + ACTIVE_STAFF_PAGE_SIZE < filtered.length;
      activeStaffStore.total = filtered.length;
      activeStaffStore.loading = false;
      activeStaffStore.initialLoading = false;

      if (window.staffModule && window.staffModule.updateCount) {
        window.staffModule.updateCount(
          "activeStaff",
          activeStaffStore.activeStaff.length
        );
      }

      renderActiveStaff();
    }, 200);
  }

  // Render active staff table
  function renderActiveStaff() {
    const container = $("#activeStaffContent");
    if (!container.length) return;

    const orderedFields = getOrderedVisibleFields();
    const html = `
      ${renderLoadingSpinner()}
      <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
        ${renderSubHeader()}
      </div>
      ${renderTable(orderedFields)}
      ${renderFooter()}
      ${renderFilterModal()}
    `;

    container.html(html);
    bindEvents();
    bindActiveStaffFilterModalEvents();

    // Setup intersection observer for infinite scroll
    setupInfiniteScroll();
  }

  function renderLoadingSpinner() {
    if (!activeStaffStore.initialLoading) return "";
    return `
      <div id="activeStaffLoader" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#009333]"></div>
      </div>
    `;
  }

  function renderSubHeader() {
    return `
      <div class="flex items-center space-x-2 ml-2">
        <div class="bulk-actions flex items-center space-x-2">
          <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="printBtn">
            <i class="ri-printer-line mr-1"></i> Print
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="summaryBtn">
            <i class="ri-sticky-note-line mr-1"></i> Summary
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="downloadBtn">
            <i class="ri-arrow-down-line mr-1"></i> Download
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="activeStaffDeleteBtn">
            <i class="ri-delete-bin-6-line mr-1"></i> Delete
          </button>
        </div>
      </div>
      <div class="flex items-center relative space-x-2">
        <input
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]"
          type="text"
          id="activeStaffSearch"
          placeholder="Enter Staff Name"
          value="${activeStaffStore.searchTerm || ""}"
        />
        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="activeStaffFilterBtn">
          <i class="ri-sort-desc"></i>
        </button>
      </div>
    `;
  }

  function renderTable(orderedFields) {
    const checkboxTh = `
      <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
        <input type="checkbox" id="activeStaffSelectAll" class="form-check accent-[#009333]" ${
          activeStaffStore.selectAll ? "checked" : ""
        } />
      </th>
    `;

    const snoTh = `
      <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
        <div class="flex justify-center items-center gap-1">
          <span>S.No.</span>
        </div>
      </th>
    `;

    const fieldThs = orderedFields
      .map(
        (f) => `
      <th class="border-r border-[#ebeff3] p-[0.3rem] ${getWidthClass(f.id)}">${escapeHtml(f.label)}</th>
    `
      )
      .join("");

    const thead = `
      <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]" id="activeStaffThead">
        <tr>
          ${checkboxTh}
          ${snoTh}
          ${fieldThs}
        </tr>
      </thead>
    `;

    let tbody = "";
    if (activeStaffStore.initialLoading) {
      tbody = renderShimmerRows(orderedFields.length);
    } else if (activeStaffStore.activeStaff.length === 0) {
      tbody = `
        <tr>
          <td colspan="${
            2 + orderedFields.length
          }" class="py-10 text-center text-gray-500">
            No List available
          </td>
        </tr>
      `;
    } else {
      tbody = activeStaffStore.activeStaff
        .map((staff, index) => renderStaffRow(staff, index, orderedFields))
        .join("");

      // Add loading rows if pagination is in progress
      if (activeStaffStore.loading) {
        tbody += renderShimmerRows(orderedFields.length, 10);
      }
    }

    return `
      <div class="bg-[#ebeff3]">
        ${activeStaffStore.selectedIds.length > 1 ? renderSelectedBadge() : ""}
        <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
          <div class="h-full overflow-y-auto">
            <table class="w-full">
              ${thead}
              <tbody>${tbody}</tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function renderStaffRow(staff, index, orderedFields) {
    const isSelected = activeStaffStore.selectedIds.includes(staff.id);
    const isDeleted = activeStaffStore.deletedIds.includes(staff.id);
    const isLastRow = index === activeStaffStore.activeStaff.length - 1;

    return `
      <tr
        data-staff-id="${staff.id}"
        data-last-row="${isLastRow ? "true" : "false"}"
        class="hover:bg-[#f5f7f9] text-sm cursor-pointer group transition-all duration-500 ease-in-out transform ${
          isSelected ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""
        } ${isDeleted ? "opacity-0 scale-95" : ""}"
      >
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
          <input
            type="checkbox"
            class="form-check accent-[#009333] staff-checkbox"
            data-staff-id="${staff.id}"
            ${isSelected ? "checked" : ""}
          />
        </td>
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%]">
          <div class="flex justify-between items-center">
            <span></span>
            <span class="text-center">${index + 1}</span>
            <span class="cursor-pointer edit-staff" data-staff-id="${staff.id}">
              <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>
            </span>
          </div>
        </td>
        ${orderedFields.map((f) => renderFieldCell(staff, f)).join("")}
      </tr>
    `;
  }

  function renderFieldCell(staff, field) {
    switch (field.id) {
      case "staffDetails":
        return `
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[20%]">
            <div
              class="flex items-center gap-2 cursor-pointer view-staff-profile"
              data-staff-id="${staff.id}"
            >
              <img
                src="/images/user.png"
                alt="avatar"
                class="w-8 h-8 rounded-full"
              />
              <div>
                <div class="text-sm font-medium text-gray-900">
                  ${escapeHtml(staff.staff_name || "")}
                </div>
                <div class="text-sm text-gray-500">
                  ${escapeHtml(staff.userID || "")}
                </div>
              </div>
            </div>
          </td>
        `;
      case "designation":
        return `
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[13%]">
            <div class="text-sm text-gray-900">
              ${escapeHtml(staff.DESIGNATION || "")}
            </div>
          </td>
        `;
      case "department":
        return `
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[13%]">
            <div class="text-sm text-gray-900">
              ${escapeHtml(staff.DEPARTMENT || "")}
            </div>
          </td>
        `;
      case "contact":
        return `
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
            <div class="text-sm text-gray-900">
              ${escapeHtml(staff.phone_number || "")}
            </div>
          </td>
        `;
      case "joinDate":
        return `
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
            <div class="text-sm text-gray-900">
              ${escapeHtml(staff.joining_date || "")}
            </div>
          </td>
        `;
      default:
        return "<td></td>";
    }
  }

  function renderShimmerRows(fieldCount, count = 30) {
    return Array.from({ length: count })
      .map(
        () => `
      <tr class="animate-pulse">
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>
        ${Array.from({ length: fieldCount })
          .map(() => '<td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>')
          .join("")}
      </tr>
    `
      )
      .join("");
  }

  function renderSelectedBadge() {
    return `
      <div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
        ${activeStaffStore.selectedIds.length} items selected
      </div>
    `;
  }

  function renderFooter() {
    return `
      <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
        <span class="text-sm">
          Showing <span class="text-red-600">${activeStaffStore.activeStaff.length}</span> of
          <span class="text-blue-600">${activeStaffStore.activeStaff.length}</span>
        </span>
      </div>
    `;
  }

function renderFilterModal() {
  return `
    <div
      id="activeStaffFilterModal"
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
            <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800">Employee Code</label>
            <input
              type="text"
              placeholder="Enter Employee code"
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
              id="activeStaffFilterEmployeeCode"
              value="${activeStaffStore.localFilters.employeeCode || ""}"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800">Designation</label>
            <input
              type="text"
              placeholder="Enter Designation"
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
              id="activeStaffFilterDesignation"
              value="${activeStaffStore.localFilters.designation || ""}"
            />
          </div>
          <div>
            <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800">Status</label>
            <div class="flex gap-4">
              <label class="flex items-center">
                <input
                  type="radio"
                  name="activeStaffFilterStatus"
                  value="active"
                  class="mr-2 accent-[#009333] cursor-pointer"
                  ${activeStaffStore.localFilters.status === "active" ? "checked" : ""}
                />
                Active
              </label>
              <label class="flex items-center">
                <input
                  type="radio"
                  name="activeStaffFilterStatus"
                  value="inactive"
                  class="mr-2 accent-[#009333] cursor-pointer"
                  ${activeStaffStore.localFilters.status === "inactive" ? "checked" : ""}
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

function populateActiveStaffFilterForm(modal) {
  if (!modal || !modal.length) return;
  modal.find("#activeStaffFilterEmployeeCode").val(
    activeStaffStore.localFilters.employeeCode || ""
  );
  modal.find("#activeStaffFilterDesignation").val(
    activeStaffStore.localFilters.designation || ""
  );
  modal
    .find("input[name='activeStaffFilterStatus']")
    .prop("checked", false);
  if (activeStaffStore.localFilters.status) {
    modal
      .find(
        `input[name='activeStaffFilterStatus'][value='${activeStaffStore.localFilters.status}']`
      )
      .prop("checked", true);
  }
}

function openActiveStaffFilterModal() {
  const modal = $("#activeStaffFilterModal");
  if (!modal.length) return;
  activeStaffStore.localFilters = { ...activeStaffStore.filters };
  populateActiveStaffFilterForm(modal);
  modal
    .removeClass("opacity-0 pointer-events-none")
    .addClass("opacity-100 pointer-events-auto");
  const panel = modal.find(".filter-panel");
  requestAnimationFrame(() => {
    panel.removeClass("translate-x-full");
  });
}

function closeActiveStaffFilterModal(callback) {
  const modal = $("#activeStaffFilterModal");
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

function bindActiveStaffFilterModalEvents() {
  const modal = $("#activeStaffFilterModal");
  if (!modal.length) return;

  modal
    .find(".filter-backdrop, .close-filter")
    .off("click")
    .on("click", function () {
      closeActiveStaffFilterModal();
    });

  modal
    .find(".reset-filter")
    .off("click")
    .on("click", function () {
      activeStaffStore.localFilters = {};
      activeStaffStore.filters = {};
      closeActiveStaffFilterModal(() => renderActiveStaff());
    });

  modal
    .find(".apply-filter")
    .off("click")
    .on("click", function () {
      const employeeCode = modal
        .find("#activeStaffFilterEmployeeCode")
        .val()
        ?.trim();
      const designation = modal
        .find("#activeStaffFilterDesignation")
        .val()
        ?.trim();
      const status =
        modal
          .find("input[name='activeStaffFilterStatus']:checked")
          .val() || "";

      activeStaffStore.localFilters = {
        employeeCode: employeeCode || "",
        designation: designation || "",
        status,
      };
      activeStaffStore.filters = { ...activeStaffStore.localFilters };
      closeActiveStaffFilterModal(() => renderActiveStaff());
    });
}

  function bindEvents() {
    // Search
    $("#activeStaffSearch").off("input").on("input", function () {
      activeStaffStore.searchTerm = $(this).val();
      debounceSearch(activeStaffStore.searchTerm);
    });

    // Select all
    $("#activeStaffSelectAll").off("change").on("change", function () {
      const checked = $(this).is(":checked");
      activeStaffStore.selectAll = checked;
      activeStaffStore.selectedIds = checked
        ? activeStaffStore.activeStaff.map((s) => s.id)
        : [];
      renderActiveStaff();
    });

    // Individual checkbox
    $(document)
      // .off("change", ".staff-checkbox")
      .on("change", ".staff-checkbox", function () {
        const staffId = parseInt($(this).data("staff-id"));
        if ($(this).is(":checked")) {
          if (!activeStaffStore.selectedIds.includes(staffId)) {
            activeStaffStore.selectedIds.push(staffId);
          }
        } else {
          activeStaffStore.selectedIds = activeStaffStore.selectedIds.filter(
            (id) => id !== staffId
          );
        }
        activeStaffStore.selectAll =
          activeStaffStore.selectedIds.length ===
          activeStaffStore.activeStaff.length;
        renderActiveStaff();
      });

    // Delete
    $("#activeStaffDeleteBtn").off("click").on("click", handleDelete);

    // Edit staff
    $(document)
      .off("click", ".edit-staff")
      .on("click", ".edit-staff", function () {
        const staffId = $(this).data("staff-id");
      });

    // View profile
    $(document)
      .off("click", ".view-staff-profile")
      .on("click", ".view-staff-profile", function (event) {
        event.preventDefault();
        event.stopPropagation();
        const $target = $(event.target).closest(".view-staff-profile");
        if (!$target.length) return;
        
        const staffId = parseInt($target.data("staff-id"));
        if (!staffId) return;
        
        const staff = activeStaffStore.activeStaff.find(
          (s) => s.id === staffId
        );
        if (staff) {
          activeStaffStore.selectedStaff = staff;
          activeStaffStore.isStaffSidebarOpen = true;
          if (
            window.profileModalModule &&
            typeof window.profileModalModule.show === "function"
          ) {
            window.profileModalModule.show(staff);
          } else {
            console.error("profileModalModule.show is not available");
          }
        }
      });

    // Filter
    $("#activeStaffFilterBtn").off("click").on("click", function () {
      openActiveStaffFilterModal();
    });
  }

  function setupInfiniteScroll() {
    if (activeStaffStore.observer) {
      activeStaffStore.observer.disconnect();
    }

    if (!activeStaffStore.loading && activeStaffStore.hasMore) {
      const lastRow = $('[data-last-row="true"]');
      if (lastRow.length) {
        activeStaffStore.observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              const nextPage = activeStaffStore.page + 1;
              activeStaffStore.page = nextPage;
              fetchActiveStaff(nextPage);
            }
          },
          { threshold: 0.1 }
        );
        activeStaffStore.observer.observe(lastRow[0]);
      }
    }
  }

  function handleDelete() {
    if (activeStaffStore.selectedIds.length === 0) {
      if (typeof showToast === "function") {
        showToast("Please select items to delete", "warning");
      }
      return;
    }

    const count = activeStaffStore.selectedIds.length;
    if (window.confirmationModal && window.confirmationModal.show) {
      window.confirmationModal.show({
        title: "Delete Staff List",
        message: `Are you sure you want to delete the ${
          count > 1 ? "records" : "record"
        }? This action cannot be undone.`,
        confirmText: "Delete",
        iconName: "delete",
        onConfirm: confirmDelete,
      });
    } else {
      if (confirm(`Delete ${count} item(s)?`)) {
        confirmDelete();
      }
    }
  }

  function confirmDelete() {
    const ids = activeStaffStore.selectedIds.map((id) => Number(id));
    activeStaffStore.deletedIds = [...activeStaffStore.selectedIds];

    activeStaffData = activeStaffData.filter(
      (staff) => !ids.includes(Number(staff.id))
    );
    activeStaffStore.activeStaff = activeStaffStore.activeStaff.filter(
      (staff) => !ids.includes(Number(staff.id))
    );
    activeStaffStore.selectedIds = [];
    activeStaffStore.deletedIds = [];

    if (typeof showToast === "function") {
      showToast("Deleted successfully", "success");
    }

    if (window.staffModule && window.staffModule.updateCount) {
      window.staffModule.updateCount(
        "activeStaff",
        activeStaffStore.activeStaff.length
      );
    }

    renderActiveStaff();
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return str.replace(/[&<>"']/g, (m) => map[m]);
  }

  // Initialize on DOM ready
  $(document).ready(function () {
    // Wait a bit for parent module to be ready
    setTimeout(() => {
      fetchActiveStaff(1);
    }, 100);
  });

  // Export module
  window.activeStaffModule = {
    renderActiveStaff,
    getStore: () => activeStaffStore,
  };
})();

