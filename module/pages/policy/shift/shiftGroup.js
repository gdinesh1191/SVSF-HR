(function () {
  // Leave Policy Component - Plain JavaScript
  const shiftStore = {
    selectedIds: [],
    selectAll: false,
    loading: false,
    initialLoading: false,
    isFilterOpen: false,
    isAddGroupOpen: false,
    groupDetails: [],
    filters: {},
    localFilters: {},
    isShiftSidebarOpen: false,
    selectedStaffForShift: null,
    searchTerm: "",
    debouncedSearchTerm: "",
    page: 1,
    total: 0,
    hasMore: false,
    fields: [],
    observer: null,
    debounceTimer: null,
  };

  // Dummy data for authorization groups (replace API)
  const shiftGroupDummyData = [
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
      status: "active",
      noOfShifts: 3,
      policyName: "Shift Policy 1",
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
      status: "inactive",
      noOfShifts: 3,
      policyName: "Shift Policy 2",
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
      status: "active",
      noOfShifts: 3,
      policyName: "Shift Policy 3",
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
      status: "active",
      noOfShifts: 3,
      policyName: "Shift Policy 4",
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
      status: "inactive",
      noOfShifts: 3,
      policyName: "Shift Policy 5",
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
      status: "active",
      noOfShifts: 3,
      policyName: "Shift Policy 6",
    },
  ];

  // Default columns
  const defaultShiftColumns = [
    { id: "policyName", label: "Policy Name", visible: true },
    { id: "noOfShifts", label: "No of Shifts", visible: true },
  ];

  // DOM Elements
  const shiftGroupEls = {
    container: null,
    searchInput: null,
    tableBody: null,
    tableHead: null,
    selectAllCheckbox: null,
    filterModal: null,
    addGroupModal: null,
    shiftModal: null,
    footer: null,
  };

  // Utility to defer modal initialization until scripts are ready
  function deferShiftModalInit() {
    if (typeof window.initShiftModal === "function") {
      window.initShiftModal("#shiftContent");
    } else {
      setTimeout(deferShiftModalInit, 100);
    }
  }

  // Initialize on DOM ready (in case ShiftPolicy tab is initially active)
  $(document).ready(function () {
    if ($("#ShiftPolicyContent").length) {
      initShiftGroup();
    }
  });

  function initShiftGroup() {
    cacheShiftGroupElements();
    bindShiftGroupEvents();
    registerDefaultColumns();
    renderShift();
    fetchShift(1);
  }

  function cacheShiftGroupElements() {
    // Main list/table lives inside ShiftPolicyContent (see list.php)
    shiftGroupEls.container = $("#ShiftPolicyContent");
    shiftGroupEls.searchInput = $("#shiftSearchInput");
    shiftGroupEls.tableBody = $("#shiftTableBody");
    shiftGroupEls.tableHead = $("#shiftTableHead");
    shiftGroupEls.selectAllCheckbox = $("#shiftSelectAll");
    shiftGroupEls.filterModal = $("#shiftFilterModal");
    shiftGroupEls.addGroupModal = $("#shiftAddGroupModal");
    shiftGroupEls.shiftModal = $("#shiftModal");
    shiftGroupEls.footer = $("#shiftFooter");
  }

  function bindShiftGroupEvents() {
    // Search input with debounce
    if (shiftGroupEls.searchInput && shiftGroupEls.searchInput.length) {
      shiftGroupEls.searchInput.on("input", handleSearchTerm);
    }

    // Select all checkbox (delegate to handle re-rendered head)
    $(document).on("change", "#shiftSelectAll", handleSelectAll);

    // Filter toggle
    $(document).on("click", "#shiftFilterBtn", handleFilterToggle);
    $(document).on("click", "#shiftFilterClose", handleFilterClose);
    $(document).on("click", "#shiftFilterBackdrop", handleFilterClose);
    $(document).on("click", "#shiftFilterApply", handleApplyFilters);
    $(document).on("click", "#shiftFilterReset", handleClearFilters);

    // Add Group toggle
    $(document).on("click", "#shiftAddBtn", () => {
      shiftStore.isAddGroupOpen = true;
      renderModals();
      // Initialize group modal after render
      setTimeout(() => {
        if (window.initShiftGroupModal) {
          window.initShiftGroupModal("#shiftAddGroupContent");
        }
      }, 100);
    });
    $(document).on("click", "#shiftAddGroupClose", () => {
      shiftStore.isAddGroupOpen = false;
      renderModals();
    });
    $(document).on("click", "#shiftAddGroupBackdrop", () => {
      shiftStore.isAddGroupOpen = false;
      renderModals();
    });

    // Leave Policy modal toggle
    $(document).on("click", "#shiftBackdrop", () => {
      shiftStore.isShiftSidebarOpen = false;
      renderShiftSidebar();
    });
    $(document).on("click", "#shiftClose", () => {
      shiftStore.isShiftSidebarOpen = false;
      renderShiftSidebar();
    });

    // Row checkbox
    $(document).on("change", ".shift-row-checkbox", function () {
      const id = parseInt($(this).data("id"));
      handleCheckboxChange(id);
    });

    // Edit icon click
    $(document).on("click", ".shift-p-1 rounded border border-[#cfd7df] text-[#4d5e6c]", function () {
      const id = parseInt($(this).data("id"));
      handleShiftEdit(id);
    });

    // Group name click
    $(document).on("click", ".shift-name-cell", function () {
      const id = parseInt($(this).data("id"));
      handleShiftEdit(id);
    });

    // Entire row click (except checkbox)
    $(document).on("click", ".shift-row", function (e) {
      if ($(e.target).closest("input[type='checkbox']").length) {
        return;
      }
      const attrId = $(this).attr("data-id");
      const id = attrId ? parseInt(attrId, 10) : NaN;
      if (!Number.isNaN(id)) {
        handleShiftEdit(id);
      }
    });

    // Filter input changes
    $(document).on("input", "#shiftFilterEmployeeCode", function () {
      handleFilterInputChange("employeeCode", $(this).val());
    });
    $(document).on("input", "#shiftFilterDesignation", function () {
      handleFilterInputChange("designation", $(this).val());
    });
    $(document).on("change", 'input[name="shiftFilterStatus"]', function () {
      handleFilterInputChange("status", $(this).val());
    });

    // Escape key to close modals
    $(document).on("keydown", function (e) {
      if (e.key === "Escape") {
        if (shiftStore.isShiftSidebarOpen) {
          shiftStore.isShiftSidebarOpen = false;
          renderModals();
        }
        if (shiftStore.isFilterOpen) {
          handleFilterClose();
        }
        if (shiftStore.isAddGroupOpen) {
          shiftStore.isAddGroupOpen = false;
          renderModals();
        }
      }
    });
  }

  function registerDefaultColumns() {
    if (window.policyModule && window.policyModule.registerColumns) {
      window.policyModule.registerColumns("ShiftGroup", defaultShiftColumns);
    }
    shiftStore.fields = defaultShiftColumns;
    updateFieldsFromPolicyModule();
  }

  function updateFieldsFromPolicyModule() {
    if (window.policyModule && window.policyModule.getFields) {
      const registeredFields = window.policyModule.getFields("ShiftGroup");
      if (registeredFields && registeredFields.length > 0) {
        shiftStore.fields = registeredFields;
      }
    }
  }

  function getOrderedVisibleFields() {
    updateFieldsFromPolicyModule();
    return shiftStore.fields.filter((f) => f.visible);
  }

  function getWidthClass(id) {
    switch (id) {
      case "policyName":
        return "w-[40%]";
      case "noOfShifts":
        return "w-[30%]";
      default:
        return "";
    }
  }

  // Debounce function
  function debounce(func, wait) {
    return function (...args) {
      clearTimeout(shiftStore.debounceTimer);
      shiftStore.debounceTimer = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    };
  }

  function handleSearchTerm(e) {
    const value = $(e.target).val();
    shiftStore.searchTerm = value;
    debounceShiftSearch();
  }

  const debounceShiftSearch = debounce(() => {
    shiftStore.debouncedSearchTerm = shiftStore.searchTerm;
    shiftStore.page = 1;
    shiftStore.groupDetails = [];
    fetchShift(1);
  }, 300);

  function handleSelectAll(e) {
    const checked = $(e.target).is(":checked");
    shiftStore.selectAll = checked;
    shiftStore.selectedIds = checked
      ? shiftStore.groupDetails.map((p) => p.id)
      : [];
    renderTable();
  }

  function handleCheckboxChange(id) {
    if (shiftStore.selectedIds.includes(id)) {
      shiftStore.selectedIds = shiftStore.selectedIds.filter((i) => i !== id);
    } else {
      shiftStore.selectedIds = [...shiftStore.selectedIds, id];
    }
    shiftStore.selectAll =
      shiftStore.groupDetails.length > 0 &&
      shiftStore.selectedIds.length === shiftStore.groupDetails.length;
    renderTable();
    updateSelectAllCheckbox();
  }

  function handleShiftEdit(staffId) {
    console.log(staffId);
    const staffMember = shiftStore.groupDetails.find(
      (staff) => staff.id === staffId
    );
    if (staffMember) {
      shiftStore.selectedStaffForShift = staffMember;
      shiftStore.isShiftSidebarOpen = true;
      renderShiftSidebar();
      // Initialize leave policy modal after render
      setTimeout(deferShiftModalInit, 100);
    }
  }

  function handleFilterToggle() {
    shiftStore.isFilterOpen = true;
    shiftStore.localFilters = { ...shiftStore.filters };
    renderModals();
  }

  function handleFilterClose() {
    shiftStore.isFilterOpen = false;
    renderModals();
  }

  function handleFilterInputChange(key, value) {
    shiftStore.localFilters = {
      ...shiftStore.localFilters,
      [key]: value,
    };
    // Update filter inputs
    if (key === "employeeCode") {
      $("#shiftFilterEmployeeCode").val(value || "");
    } else if (key === "designation") {
      $("#shiftFilterDesignation").val(value || "");
    } else if (key === "status") {
      $(`input[name="shiftFilterStatus"][value="${value}"]`).prop(
        "checked",
        true
      );
    }
  }

  function handleApplyFilters() {
    shiftStore.filters = { ...shiftStore.localFilters };
    handleFilterClose();
    // Trigger fetch with filters
    shiftStore.page = 1;
    shiftStore.groupDetails = [];
    fetchShift(1);
  }

  function handleClearFilters() {
    const clearedFilters = {};
    shiftStore.localFilters = clearedFilters;
    shiftStore.filters = clearedFilters;
    $("#shiftFilterEmployeeCode").val("");
    $("#shiftFilterDesignation").val("");
    $('input[name="shiftFilterStatus"]').prop("checked", false);
  }

  async function fetchShift(page = 1) {
    try {
      if (page === 1) {
        shiftStore.initialLoading = true;
      } else {
        shiftStore.loading = true;
      }
      renderTable();

      // Simulate API latency
      await new Promise((resolve) => setTimeout(resolve, 300));

      const limit = 30;
      let filteredData = [...shiftGroupDummyData];

      // Search filter
      if (shiftStore.debouncedSearchTerm?.trim()) {
        const term = shiftStore.debouncedSearchTerm.toLowerCase();
        filteredData = filteredData.filter((item) =>
          (item.staff_name || "").toLowerCase().includes(term)
        );
      }

      // Advanced filters
      if (shiftStore.filters.employeeCode) {
        const code = shiftStore.filters.employeeCode.toLowerCase();
        filteredData = filteredData.filter((item) =>
          (item.userID || "").toLowerCase().includes(code)
        );
      }

      if (shiftStore.filters.designation) {
        const designation = shiftStore.filters.designation.toLowerCase();
        filteredData = filteredData.filter((item) =>
          (item.DESIGNATION || "").toLowerCase().includes(designation)
        );
      }

      if (shiftStore.filters.status) {
        filteredData = filteredData.filter(
          (item) =>
            (item.status || "").toLowerCase() ===
            shiftStore.filters.status.toLowerCase()
        );
      }

      const totalRecords = filteredData.length;
      const offset = (page - 1) * limit;
      const newStaff = filteredData.slice(offset, offset + limit);

      if (page === 1 || shiftStore.debouncedSearchTerm) {
        shiftStore.groupDetails = newStaff;
      } else {
        shiftStore.groupDetails = [...shiftStore.groupDetails, ...newStaff];
      }

      shiftStore.hasMore = offset + limit < totalRecords;
      shiftStore.total = totalRecords;
    } catch (err) {
      console.error("Error fetching shift group:", err);
      shiftStore.hasMore = false;
    } finally {
      shiftStore.loading = false;
      shiftStore.initialLoading = false;
      renderTable();
      setupInfiniteScroll();
    }
  }

  function setupInfiniteScroll() {
    // Clean up existing observer
    if (shiftStore.observer) {
      shiftStore.observer.disconnect();
    }

    if (shiftStore.loading || !shiftStore.hasMore) {
      return;
    }

    const lastRow = shiftGroupEls.tableBody.find("tr:last");
    if (lastRow.length === 0) return;

    shiftStore.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const nextPage = shiftStore.page + 1;
          shiftStore.page = nextPage;
          fetchShift(nextPage);
        }
      },
      { threshold: 0.1 }
    );

    shiftStore.observer.observe(lastRow[0]);
  }

  function renderShift() {
    if (!shiftGroupEls.container || !shiftGroupEls.container.length) return;

    const html = `
        <!-- Header Section -->
        <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
          <div class="flex items-center space-x-2 ml-2">
            <div class="bulk-actions flex items-center space-x-2">
              <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" id="printBtn">
                <i class="ri-printer-line mr-1"></i>
                Print
              </button>
              <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" id="summaryBtn">
                <i class="ri-sticky-note-line mr-1"></i>
                Summary
              </button>
              <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" id="downloadBtn">
                <i class="ri-arrow-down-line mr-1"></i>
                Download
              </button>
              <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3]" id="deleteBtn">
                <i class="ri-delete-bin-6-line mr-1"></i>
                Delete
              </button>
            </div>
          </div>
    
          <div class="flex items-center relative space-x-2">
            <input
              class="block  text-sm h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] "
              type="text"
              id="shiftSearchInput"
              placeholder="Enter Group Name"
              value="${escapeHtml(shiftStore.searchTerm)}"
            />
    
            <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3]" id="shiftAddBtn">
              <i class="ri-function-add-line mr-1"></i>
              Group
            </button>
    
            <button class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]" id="shiftFilterBtn">
              <i class="ri-sort-desc"></i>
            </button>
          </div>
        </div>
    
        <!-- Table Section -->
        <div class="bg-[#ebeff3]">
          <div id="shiftSelectedBadge" class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d] hidden">
            <span id="shiftSelectedCount">0</span> items selected
          </div>
    
          <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
            <div class="h-full overflow-y-auto">
              <table class="w-full">
                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]" id="shiftTableHead">
                  <tr>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center" id="checkboxColumn">
                      <input
                        type="checkbox"
                        id="shiftSelectAll"
                        class="form-check accent-[#009333] "
                        ${shiftStore.selectAll ? "checked" : ""}
                      />
                    </th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
                      <div class="flex justify-center items-center gap-1">
                        <span>S.No.</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody id="shiftTableBody">
                </tbody>
              </table>
            </div>
          </div>
        </div>
    
        <!-- Footer -->
        <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start" id="shiftFooter">
          <span class="text-sm">
            Showing <span class="text-red-600" id="shiftShowingCount">0</span> of
            <span class="text-blue-600" id="shiftTotalCount">0</span>
          </span>
        </div>
      `;

    shiftGroupEls.container.html(html);
    cacheShiftGroupElements();
    renderTableHead();
    renderTable();
    renderModals();
  }

  function renderTableHead() {
    if (!shiftGroupEls.tableHead || !shiftGroupEls.tableHead.length) return;

    const visibleFields = getOrderedVisibleFields();
    let headHtml = `
        <tr>
          <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center" id="checkboxColumn">
            <input
              type="checkbox"
              id="shiftSelectAll"
              class="form-check accent-[#009333] "
              ${shiftStore.selectAll ? "checked" : ""}
            />
          </th>
          <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
            <div class="flex justify-center items-center gap-1">
              <span>S.No.</span>
            </div>
          </th>
      `;

    visibleFields.forEach((f) => {
      headHtml += `<th key="${
        f.id
      }" class="border-r border-[#ebeff3] p-[0.3rem] ${getWidthClass(
        f.id
      )}">${escapeHtml(f.label)}</th>`;
    });

    headHtml += `</tr>`;
    shiftGroupEls.tableHead.html(headHtml);
  }

  function renderTable() {
    if (!shiftGroupEls.tableBody || !shiftGroupEls.tableBody.length) return;

    const visibleFields = getOrderedVisibleFields();
    let tableHtml = "";

    // Show shimmer loading for initial load
    if (shiftStore.initialLoading) {
      for (let i = 0; i < 30; i++) {
        tableHtml += `
            <tr class="animate-pulse">
              <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
          `;
        visibleFields.forEach(() => {
          tableHtml += `
              <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            `;
        });
        tableHtml += `</tr>`;
      }
      shiftGroupEls.tableBody.html(tableHtml);
      return;
    }

    // Render actual data
    if (shiftStore.groupDetails.length === 0) {
      const colSpan = visibleFields.length + 2;
      tableHtml = `
          <tr>
            <td colspan="${colSpan}" class="py-10 text-center text-gray-500">
              No List available
            </td>
          </tr>
        `;
      shiftGroupEls.tableBody.html(tableHtml);
      return;
    }

    shiftStore.groupDetails.forEach((Staff, index) => {
      const isSelected = shiftStore.selectedIds.includes(Staff.id);
      const isLastRow = index === shiftStore.groupDetails.length - 1;
      tableHtml += `
          <tr
            class="shift-row hover:bg-[#f5f7f9] text-sm cursor-pointer group ${
              isSelected ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""
            }"
            data-id="${Staff.id}"
            ${isLastRow ? 'data-last-row="true"' : ""}
          >
            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
              <input
                type="checkbox"
                class="form-check shift-row-checkbox accent-[#009333] "
                data-id="${Staff.id}"
                ${isSelected ? "checked" : ""}
              />
            </td>
            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%]">
              <div class="flex justify-between items-center">
                <span></span>
                <span class="text-center">${index + 1}</span>
                <span class="cursor-pointer rotation-shift-p-1 rounded border border-[#cfd7df] text-[#4d5e6c]" data-id="${
                  Staff.id
                }">
                  <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>
                </span>
              </div>
            </td>
        `;

      visibleFields.forEach((f) => {
        switch (f.id) {
          case "policyName":
            tableHtml += `
                <td key="${
                  f.id
                }" class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[40%]">
                  <div class="text-sm text-gray-900">
                    ${escapeHtml(Staff.policyName || "")}
                  </div>
                </td>
              `;
            break;
          case "noOfShifts":
            tableHtml += `
                <td key="${
                  f.id
                }" class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[30%]">
                  <div class="text-sm text-gray-900">
                    ${escapeHtml(Staff.noOfShifts || "")}
                  </div>
                </td>
              `;
            break;
          default:
            tableHtml += `<td key="${f.id}" class="border-r border-b border-[#ebeff3] p-[0.3rem]"></td>`;
        }
      });

      tableHtml += `</tr>`;
    });

    // Add pagination shimmer if loading more
    if (shiftStore.loading) {
      for (let i = 0; i < 10; i++) {
        tableHtml += `
            <tr class="animate-pulse">
              <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
          `;
        visibleFields.forEach(() => {
          tableHtml += `
              <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                <div class="h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
            `;
        });
        tableHtml += `</tr>`;
      }
    }

    shiftGroupEls.tableBody.html(tableHtml);

    // Update footer counts
    $("#shiftShowingCount").text(shiftStore.groupDetails.length);
    $("#shiftTotalCount").text(shiftStore.total);

    // Update selected badge
    if (shiftStore.selectedIds.length > 1) {
      $("#shiftSelectedBadge").show();
      $("#shiftSelectedCount").text(shiftStore.selectedIds.length);
    } else {
      $("#shiftSelectedBadge").hide();
    }

    updateSelectAllCheckbox();

    // Setup infinite scroll after render
    setTimeout(() => {
      setupInfiniteScroll();
    }, 100);
  }

  function renderModals() {
    renderFilterModal();
    renderAddGroupModal();
    renderAuthorizationSidebar();
  }

  function renderFilterModal() {
    if (!shiftGroupEls.filterModal || !shiftGroupEls.filterModal.length) {
      // Create filter modal if it doesn't exist
      const modalHtml = `
          <div id="shiftFilterModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
            shiftStore.isFilterOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }">
            <div id="shiftFilterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
            <div class="shift-filter-modal-panel relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ${
              shiftStore.isFilterOpen ? "translate-x-0" : "translate-x-full"
            }">
              <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
                <h5>Add Filters</h5>
                <button id="shiftFilterClose" class="cursor-pointer">
                  <i class="ri-close-line"></i>
                </button>
              </div>
              <div class="p-4 overflow-y-auto flex-1">
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-[#000000] mb-1.5">Employee Code</label>
                  <input
                    type="text"
                        id="shiftFilterEmployeeCode"
                    placeholder="Enter Employee code"
                    class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                    value="${escapeHtml(
                      shiftStore.localFilters.employeeCode || ""
                    )}"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-[#000000] mb-1.5">Designation</label>
                  <input
                    type="text"
                    id="shiftFilterDesignation"
                    placeholder="Enter Designation"
                    class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                    value="${escapeHtml(
                      shiftStore.localFilters.designation || ""
                    )}"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-[#000000] mb-1.5">Status</label>
                  <div class="flex gap-4">
                    <label class="flex items-center">
                      <input
                        type="radio"
                        name="shiftFilterStatus"
                        value="active"
                        class="mr-2 accent-[#009333] cursor-pointer"
                        ${
                          shiftStore.localFilters.status === "active"
                            ? "checked"
                            : ""
                        }
                      />
                      Active
                    </label>
                    <label class="flex items-center">
                      <input
                        type="radio"
                        name="shiftFilterStatus"
                        value="inactive"
                        class="mr-2 accent-[#009333] cursor-pointer"
                        ${
                          shiftStore.localFilters.status === "inactive"
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
                <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" id="shiftFilterReset">Reset All</button>
                <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="shiftFilterApply">Apply</button>
              </div>
            </div>
          </div>
        `;
      $("body").append(modalHtml);
      shiftGroupEls.filterModal = $("#shiftFilterModal");
    } else {
      // Update existing modal
      shiftGroupEls.filterModal
        .toggleClass("opacity-100", shiftStore.isFilterOpen)
        .toggleClass("opacity-0 pointer-events-none", !shiftStore.isFilterOpen);
      shiftGroupEls.filterModal
        .find(".shift-filter-modal-panel")
        .toggleClass("translate-x-0", shiftStore.isFilterOpen)
        .toggleClass("translate-x-full", !shiftStore.isFilterOpen);
    }
  }

  function updateSelectAllCheckbox() {
    const checkbox = $("#shiftSelectAll");
    if (checkbox.length) {
      checkbox.prop("checked", shiftStore.selectAll);
    }
  }

  function renderAddGroupModal() {
    if (!shiftGroupEls.addGroupModal || !shiftGroupEls.addGroupModal.length) {
      const modalHtml = `
          <div id="shiftAddGroupModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
            shiftStore.isAddGroupOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }">
            <div id="shiftAddGroupBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
            <div class="shift-group-modal-panel relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ${
              shiftStore.isAddGroupOpen ? "translate-x-0" : "translate-x-full"
            }">
              <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
                <h5>Add Group</h5>
                <button id="shiftAddGroupClose" class="cursor-pointer">
                  <i class="ri-close-line"></i>
                </button>
              </div>
              <div id="shiftAddGroupContent"></div>
            </div>
          </div>
        `;
      $("body").append(modalHtml);
      shiftGroupEls.addGroupModal = $("#shiftAddGroupModal");
      // Initialize group modal after a short delay to ensure DOM is ready
      setTimeout(() => {
        if (window.initGroupModal) {
          window.initGroupModal("#shiftAddGroupContent");
        }
      }, 50);
    } else {
      shiftGroupEls.addGroupModal
        .toggleClass("opacity-100", shiftStore.isAddGroupOpen)
        .toggleClass(
          "opacity-0 pointer-events-none",
          !shiftStore.isAddGroupOpen
        );
      shiftGroupEls.addGroupModal
        .find(".shift-group-modal-panel")
        .toggleClass("translate-x-0", shiftStore.isAddGroupOpen)
        .toggleClass("translate-x-full", !shiftStore.isAddGroupOpen);
    }
  }

  function renderShiftSidebar() {
    if (!shiftGroupEls.shiftModal || !shiftGroupEls.shiftModal.length) {
      const modalHtml = `
          <div id="shiftModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
            shiftStore.isShiftSidebarOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }">
            <div id="shiftBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
            <div class="shift-modal-panel relative w-[750px] mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ease-in-out ${
              shiftStore.isShiftSidebarOpen
                ? "translate-x-0"
                : "translate-x-full"
            }">
              <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
                <h5 class="text-lg">
                  Shift Level for ${escapeHtml(
                    shiftStore.selectedStaffForShift?.groupName || ""
                  )}
                </h5>
                <button id="shiftClose" class="cursor-pointer">
                      <i class="ri-close-line text-xl"></i>
                </button>
              </div>
              <div id="shiftContent"></div>
            </div>
          </div>
        `;
      $("body").append(modalHtml);
      shiftGroupEls.shiftModal = $("#shiftModal");
      // Initialize rotation shift modal after a short delay to ensure DOM is ready
      setTimeout(deferShiftModalInit, 50);
    } else {
      shiftGroupEls.shiftModal
        .toggleClass("opacity-100", shiftStore.isShiftSidebarOpen)
        .toggleClass(
          "opacity-0 pointer-events-none",
          !shiftStore.isShiftSidebarOpen
        );
      shiftGroupEls.shiftModal
        .find(".shift-modal-panel")
        .toggleClass("translate-x-0", shiftStore.isShiftSidebarOpen)
        .toggleClass("translate-x-full", !shiftStore.isShiftSidebarOpen);

      // Update header text
      if (shiftStore.selectedStaffForShift) {
        shiftGroupEls.shiftModal
          .find("h5")
          .text(
            `Shift Level for ${
              shiftStore.selectedStaffForShift.groupName || ""
            }`
          );
      }
    }
  }

  // Utility function
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

  // Export for external use
  window.shiftModule = {
    renderShift,
    fetchShift,
    renderModals,
    getStore: () => shiftStore,
  };
})();
