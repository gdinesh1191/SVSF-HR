(function () {
    // Leave Policy Component - Plain JavaScript
    const rotationShiftStore = {
      selectedIds: [],
      selectAll: false,
      loading: false,
      initialLoading: false,
      isFilterOpen: false,
      isAddGroupOpen: false,
      groupDetails: [],
      filters: {},
      localFilters: {},
      isRotationShiftSidebarOpen: false,
      selectedStaffForRotationShift: null,
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
    const rotationShiftGroupDummyData = [
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
        status: "active",
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
        status: "inactive",
      },
    ];
    
    // Default columns
    const defaultRotationShiftColumns = [
      { id: "groupName", label: "Group Name", visible: true },
      { id: "level1", label: "Level 1", visible: true },
      { id: "level2", label: "Level 2", visible: true },
      { id: "level3", label: "Level 3", visible: true },
      { id: "approved", label: "Approved", visible: false },
    ];
    
    // DOM Elements
    const rotationShiftGroupEls = {
      container: null,
      searchInput: null,
      tableBody: null,
      tableHead: null,
      selectAllCheckbox: null,
      filterModal: null,
      addGroupModal: null,
      rotationShiftModal: null,
      footer: null,
    };
    
    // Utility to defer modal initialization until scripts are ready
    function deferRotationShiftModalInit() {
      if (typeof window.initRotationShiftModal === "function") {
        window.initRotationShiftModal("#rotationShiftContent");
      } else {
        setTimeout(deferRotationShiftModalInit, 100);
      }
    }
    
    // Initialize on DOM ready
    $(document).ready(function () {
      if ($("#RotationShiftContent").length) {
        initRotationShiftGroup();
      }
    });
    
    function initRotationShiftGroup() {
      cacheRotationShiftGroupElements();
      bindRotationShiftGroupEvents();
      registerDefaultColumns();
      renderRotationShift();
      fetchRotationShift(1);
    }
    
    function cacheRotationShiftGroupElements() {
      rotationShiftGroupEls.container = $("#RotationShiftContent");
      rotationShiftGroupEls.searchInput = $("#rotationShiftSearchInput");
      rotationShiftGroupEls.tableBody = $("#rotationShiftTableBody");
      rotationShiftGroupEls.tableHead = $("#rotationShiftTableHead");
      rotationShiftGroupEls.selectAllCheckbox = $("#rotationShiftSelectAll");
      rotationShiftGroupEls.filterModal = $("#rotationShiftFilterModal");
      rotationShiftGroupEls.addGroupModal = $("#rotationShiftAddGroupModal");
      rotationShiftGroupEls.rotationShiftModal = $("#rotationShiftModal");
      rotationShiftGroupEls.footer = $("#rotationShiftFooter");
    }
    
    function bindRotationShiftGroupEvents() {
      // Search input with debounce
      if (rotationShiftGroupEls.searchInput && rotationShiftGroupEls.searchInput.length) {
        rotationShiftGroupEls.searchInput.on("input", handleSearchTerm);
      }
    
      // Select all checkbox (delegate to handle re-rendered head)
      $(document).on("change", "#rotationShiftSelectAll", handleSelectAll);
    
      // Filter toggle
      $(document).on("click", "#rotationShiftFilterBtn", handleFilterToggle);
      $(document).on("click", "#rotationShiftFilterClose", handleFilterClose);
      $(document).on("click", "#rotationShiftFilterBackdrop", handleFilterClose);
      $(document).on("click", "#rotationShiftFilterApply", handleApplyFilters);
      $(document).on("click", "#rotationShiftFilterReset", handleClearFilters);
    
      // Add Group toggle
      $(document).on("click", "#rotationShiftAddBtn", () => {
        rotationShiftStore.isAddGroupOpen = true;
        renderModals();
        // Initialize group modal after render
        setTimeout(() => {
          if (window.initRotationShiftGroupModal) {
            window.initRotationShiftGroupModal("#rotationShiftAddGroupContent");
          }
        }, 100);
      });
      $(document).on("click", "#rotationShiftAddGroupClose", () => {
        rotationShiftStore.isAddGroupOpen = false;
        renderModals();
      });
      $(document).on("click", "#rotationShiftAddGroupBackdrop", () => {
        rotationShiftStore.isAddGroupOpen = false;
        renderModals();
      });
    
      // Leave Policy modal toggle
      $(document).on("click", "#rotationShiftBackdrop", () => {
        rotationShiftStore.isRotationShiftSidebarOpen = false;
        renderRotationShiftSidebar();
      });
      $(document).on("click", "#rotationShiftClose", () => {
        rotationShiftStore.isRotationShiftSidebarOpen = false;
        renderRotationShiftSidebar();
      });
    
      // Row checkbox
      $(document).on("change", ".rotation-shift-row-checkbox", function () {
        const id = parseInt($(this).data("id"));
        handleCheckboxChange(id);
      });
    
      // Edit icon click
      $(document).on("click", ".rotation-shift-p-1 rounded border border-[#cfd7df] text-[#4d5e6c]", function () {
        const id = parseInt($(this).data("id"));
        handleRotationShiftEdit(id);
      });
    
      // Group name click
      $(document).on("click", ".rotation-shift-name-cell", function () {
        const id = parseInt($(this).data("id"));
        handleRotationShiftEdit(id);
      });
    
      // Entire row click (except checkbox)
      $(document).on("click", ".rotation-shift-row", function (e) {
        if ($(e.target).closest("input[type='checkbox']").length) {
          return;
        }
        const attrId = $(this).attr("data-id");
        const id = attrId ? parseInt(attrId, 10) : NaN;
        if (!Number.isNaN(id)) {
          handleRotationShiftEdit(id);
        }
      });
    
      // Filter input changes
      $(document).on("input", "#rotationShiftFilterEmployeeCode", function () {
        handleFilterInputChange("employeeCode", $(this).val());
      });
      $(document).on("input", "#rotationShiftFilterDesignation", function () {
        handleFilterInputChange("designation", $(this).val());
      });
      $(document).on("change", 'input[name="rotationShiftFilterStatus"]', function () {
        handleFilterInputChange("status", $(this).val());
      });
    
      // Escape key to close modals
      $(document).on("keydown", function (e) {
        if (e.key === "Escape") {
          if (rotationShiftStore.isRotationShiftSidebarOpen) {
            rotationShiftStore.isRotationShiftSidebarOpen = false;
            renderModals();
          }
          if (rotationShiftStore.isFilterOpen) {
            handleFilterClose();
          }
          if (rotationShiftStore.isAddGroupOpen) {
            rotationShiftStore.isAddGroupOpen = false;
            renderModals();
          }
        }
      });
    }
    
    function registerDefaultColumns() {
      if (window.policyModule && window.policyModule.registerColumns) {
        window.policyModule.registerColumns("RotationShiftGroup", defaultRotationShiftColumns);
      }
      rotationShiftStore.fields = defaultRotationShiftColumns;
      updateFieldsFromPolicyModule();
    }
    
    function updateFieldsFromPolicyModule() {
      if (window.policyModule && window.policyModule.getFields) {
        const registeredFields = window.policyModule.getFields("RotationShiftGroup");
        if (registeredFields && registeredFields.length > 0) {
          rotationShiftStore.fields = registeredFields;
        }
      }
    }
    
    function getOrderedVisibleFields() {
      updateFieldsFromPolicyModule();
      return rotationShiftStore.fields.filter((f) => f.visible);
    }
    
    function getWidthClass(id) {
      switch (id) {
        case "groupName":
          return "w-[20%]";
        case "level1":
          return "w-[13%]";
        case "level2":
          return "w-[13%]";
        case "level3":
          return "w-[10%]";
        case "approved":
          return "w-[10%]";
        default:
          return "";
      }
    }
    
    // Debounce function
    function debounce(func, wait) {
      return function (...args) {
        clearTimeout(rotationShiftStore.debounceTimer);
        rotationShiftStore.debounceTimer = setTimeout(() => {
          func.apply(this, args);
        }, wait);
      };
    }
    
    function handleSearchTerm(e) {
      const value = $(e.target).val();
      rotationShiftStore.searchTerm = value;
      debounceRotationShiftSearch();
    }
    
    const debounceRotationShiftSearch = debounce(() => {
      rotationShiftStore.debouncedSearchTerm = rotationShiftStore.searchTerm;
      rotationShiftStore.page = 1;
      rotationShiftStore.groupDetails = [];
      fetchRotationShift(1);
    }, 300);
    
    function handleSelectAll(e) {
      const checked = $(e.target).is(":checked");
      rotationShiftStore.selectAll = checked;
      rotationShiftStore.selectedIds = checked
        ? rotationShiftStore.groupDetails.map((p) => p.id)
        : [];
      renderTable();
    }
    
    function handleCheckboxChange(id) {
      if (rotationShiftStore.selectedIds.includes(id)) {
        rotationShiftStore.selectedIds = rotationShiftStore.selectedIds.filter(
          (i) => i !== id
        );
      } else {
        rotationShiftStore.selectedIds = [...rotationShiftStore.selectedIds, id];
      }
      rotationShiftStore.selectAll =
        rotationShiftStore.groupDetails.length > 0 &&
        rotationShiftStore.selectedIds.length === rotationShiftStore.groupDetails.length;
      renderTable();
      updateSelectAllCheckbox();
    }
    
    function handleRotationShiftEdit(staffId) {
      console.log(staffId);
      const staffMember = rotationShiftStore.groupDetails.find(
        (staff) => staff.id === staffId
      );
      if (staffMember) {
        rotationShiftStore.selectedStaffForRotationShift = staffMember;
        rotationShiftStore.isRotationShiftSidebarOpen = true;
        renderRotationShiftSidebar();
        // Initialize leave policy modal after render
        setTimeout(deferRotationShiftModalInit, 100);
      }
    }
    
    function handleFilterToggle() {
      rotationShiftStore.isFilterOpen = true;
      rotationShiftStore.localFilters = { ...rotationShiftStore.filters };
      renderModals();
    }
    
    function handleFilterClose() {
      rotationShiftStore.isFilterOpen = false;
      renderModals();
    }
    
    function handleFilterInputChange(key, value) {
      rotationShiftStore.localFilters = {
        ...rotationShiftStore.localFilters,
        [key]: value,
      };
      // Update filter inputs
      if (key === "employeeCode") {
        $("#rotationShiftFilterEmployeeCode").val(value || "");
      } else if (key === "designation") {
        $("#rotationShiftFilterDesignation").val(value || "");
      } else if (key === "status") {
        $(`input[name="rotationShiftFilterStatus"][value="${value}"]`).prop("checked", true);
      }
    }
    
    function handleApplyFilters() {
      rotationShiftStore.filters = { ...rotationShiftStore.localFilters };
      handleFilterClose();
      // Trigger fetch with filters
      rotationShiftStore.page = 1;
      rotationShiftStore.groupDetails = [];
      fetchRotationShift(1);
    }
    
    function handleClearFilters() {
      const clearedFilters = {};
      rotationShiftStore.localFilters = clearedFilters;
      rotationShiftStore.filters = clearedFilters;
      $("#rotationShiftFilterEmployeeCode").val("");
      $("#rotationShiftFilterDesignation").val("");
      $('input[name="rotationShiftFilterStatus"]').prop("checked", false);
    }
    
    async function fetchRotationShift(page = 1) {
      try {
        if (page === 1) {
          rotationShiftStore.initialLoading = true;
        } else {
          rotationShiftStore.loading = true;
        }
        renderTable();
    
        // Simulate API latency
        await new Promise((resolve) => setTimeout(resolve, 300));
    
        const limit = 30;
        let filteredData = [...rotationShiftGroupDummyData];
    
        // Search filter
        if (rotationShiftStore.debouncedSearchTerm?.trim()) {
          const term = rotationShiftStore.debouncedSearchTerm.toLowerCase();
          filteredData = filteredData.filter((item) =>
            (item.staff_name || "").toLowerCase().includes(term)
          );
        }
    
        // Advanced filters
        if (rotationShiftStore.filters.employeeCode) {
          const code = rotationShiftStore.filters.employeeCode.toLowerCase();
          filteredData = filteredData.filter((item) =>
            (item.userID || "").toLowerCase().includes(code)
          );
        }
    
        if (rotationShiftStore.filters.designation) {
          const designation = rotationShiftStore.filters.designation.toLowerCase();
          filteredData = filteredData.filter((item) =>
            (item.DESIGNATION || "").toLowerCase().includes(designation)
          );
        }
    
        if (rotationShiftStore.filters.status) {
          filteredData = filteredData.filter(
            (item) =>
              (item.status || "").toLowerCase() ===
              rotationShiftStore.filters.status.toLowerCase()
          );
        }
    
        const totalRecords = filteredData.length;
        const offset = (page - 1) * limit;
        const newStaff = filteredData.slice(offset, offset + limit);
    
        if (page === 1 || rotationShiftStore.debouncedSearchTerm) {
          rotationShiftStore.groupDetails = newStaff;
        } else {
          rotationShiftStore.groupDetails = [
            ...rotationShiftStore.groupDetails,
            ...newStaff,
          ];
        }
    
        rotationShiftStore.hasMore = offset + limit < totalRecords;
        rotationShiftStore.total = totalRecords;
      } catch (err) {
        console.error("Error fetching rotation shift group:", err);
        rotationShiftStore.hasMore = false;
      } finally {
        rotationShiftStore.loading = false;
        rotationShiftStore.initialLoading = false;
        renderTable();
        setupInfiniteScroll();
      }
    }
    
    function setupInfiniteScroll() {
      // Clean up existing observer
      if (rotationShiftStore.observer) {
        rotationShiftStore.observer.disconnect();
      }
    
      if (rotationShiftStore.loading || !rotationShiftStore.hasMore) {
        return;
      }
    
      const lastRow = rotationShiftGroupEls.tableBody.find("tr:last");
      if (lastRow.length === 0) return;
    
      rotationShiftStore.observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            const nextPage = rotationShiftStore.page + 1;
            rotationShiftStore.page = nextPage;
            fetchRotationShift(nextPage);
          }
        },
        { threshold: 0.1 }
      );
    
      rotationShiftStore.observer.observe(lastRow[0]);
    }
    
    function renderRotationShift() {
      if (!rotationShiftGroupEls.container || !rotationShiftGroupEls.container.length) return;
    
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
              id="rotationShiftSearchInput"
              placeholder="Enter Group Name"
              value="${escapeHtml(rotationShiftStore.searchTerm)}"
            />
    
            <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3]" id="rotationShiftAddBtn">
              <i class="ri-function-add-line mr-1"></i>
              Group
            </button>
    
            <button class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]" id="rotationShiftFilterBtn">
              <i class="ri-sort-desc"></i>
            </button>
          </div>
        </div>
    
        <!-- Table Section -->
        <div class="bg-[#ebeff3]">
          <div id="rotationShiftSelectedBadge" class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d] hidden">
            <span id="rotationShiftSelectedCount">0</span> items selected
          </div>
    
          <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
            <div class="h-full overflow-y-auto">
              <table class="w-full">
                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]" id="rotationShiftTableHead">
                  <tr>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center" id="checkboxColumn">
                      <input
                        type="checkbox"
                        id="rotationShiftSelectAll"
                        class="form-check accent-[#009333] "
                        ${rotationShiftStore.selectAll ? "checked" : ""}
                      />
                    </th>
                    <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
                      <div class="flex justify-center items-center gap-1">
                        <span>S.No.</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody id="rotationShiftTableBody">
                </tbody>
              </table>
            </div>
          </div>
        </div>
    
        <!-- Footer -->
        <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start" id="rotationShiftFooter">
          <span class="text-sm">
            Showing <span class="text-red-600" id="rotationShiftShowingCount">0</span> of
            <span class="text-blue-600" id="rotationShiftTotalCount">0</span>
          </span>
        </div>
      `;
    
      rotationShiftGroupEls.container.html(html);
      cacheRotationShiftGroupElements();
      renderTableHead();
      renderTable();
      renderModals();
    }
    
    function renderTableHead() {
      if (!rotationShiftGroupEls.tableHead || !rotationShiftGroupEls.tableHead.length) return;
    
      const visibleFields = getOrderedVisibleFields();
      let headHtml = `
        <tr>
          <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center" id="checkboxColumn">
            <input
              type="checkbox"
              id="rotationShiftSelectAll"
              class="form-check accent-[#009333] "
              ${rotationShiftStore.selectAll ? "checked" : ""}
            />
          </th>
          <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
            <div class="flex justify-center items-center gap-1">
              <span>S.No.</span>
            </div>
          </th>
      `;
    
      visibleFields.forEach((f) => {
        headHtml += `<th key="${f.id}" class="border-r border-[#ebeff3] p-[0.3rem] ${getWidthClass(f.id)}">${escapeHtml(f.label)}</th>`;
      });
    
      headHtml += `</tr>`;
      rotationShiftGroupEls.tableHead.html(headHtml);
    }
    
    function renderTable() {
      if (!rotationShiftGroupEls.tableBody || !rotationShiftGroupEls.tableBody.length) return;
    
      const visibleFields = getOrderedVisibleFields();
      let tableHtml = "";
    
      // Show shimmer loading for initial load
      if (rotationShiftStore.initialLoading) {
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
        rotationShiftGroupEls.tableBody.html(tableHtml);
        return;
      }
    
      // Render actual data
      if (rotationShiftStore.groupDetails.length === 0) {
        const colSpan = visibleFields.length + 2;
        tableHtml = `
          <tr>
            <td colspan="${colSpan}" class="py-10 text-center text-gray-500">
              No List available
            </td>
          </tr>
        `;
        rotationShiftGroupEls.tableBody.html(tableHtml);
        return;
      }
    
      rotationShiftStore.groupDetails.forEach((Staff, index) => {
        const isSelected = rotationShiftStore.selectedIds.includes(Staff.id);
        const isLastRow = index === rotationShiftStore.groupDetails.length - 1;
        tableHtml += `
          <tr
            class="rotation-shift-row hover:bg-[#f5f7f9] text-sm cursor-pointer group ${isSelected ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""}"
            data-id="${Staff.id}"
            ${isLastRow ? 'data-last-row="true"' : ""}
          >
            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
              <input
                type="checkbox"
                class="form-check rotation-shift-row-checkbox accent-[#009333] "
                data-id="${Staff.id}"
                ${isSelected ? "checked" : ""}
              />
            </td>
            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%]">
              <div class="flex justify-between items-center">
                <span></span>
                <span class="text-center">${index + 1}</span>
                <span class="cursor-pointer rotation-shift-p-1 rounded border border-[#cfd7df] text-[#4d5e6c]" data-id="${Staff.id}">
                  <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>
                </span>
              </div>
            </td>
        `;
    
        visibleFields.forEach((f) => {
          switch (f.id) {
            case "groupName":
              tableHtml += `
                <td key="${f.id}" class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%] rotation-shift-name-cell" data-id="${Staff.id}">
                  <div class="flex items-center gap-2 cursor-pointer">
                    <img
                      src="/images/user.png"
                      alt="avatar"
                      class="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div class="text-sm font-medium text-gray-900">
                        ${escapeHtml(Staff.staff_name || "")}
                      </div>
                      <div class="text-sm text-gray-500">
                        ${escapeHtml(Staff.userID || "")}
                      </div>
                    </div>
                  </div>
                </td>
              `;
              break;
            case "level1":
              tableHtml += `
                <td key="${f.id}" class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[12%]">
                  <div class="text-sm text-gray-900">
                    ${escapeHtml(Staff.userID || "")}
                  </div>
                </td>
              `;
              break;
            case "level2":
              tableHtml += `
                <td key="${f.id}" class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[12%]">
                  <div class="text-sm text-gray-900">
                    ${escapeHtml(Staff.userID || "")}
                  </div>
                </td>
              `;
              break;
            case "level3":
              tableHtml += `
                <td key="${f.id}" class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[13%]">
                  <div class="text-sm text-gray-900">
                    ${escapeHtml(Staff.userID || "")}
                  </div>
                </td>
              `;
              break;
            case "approved":
              tableHtml += `
                <td key="${f.id}" class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]">
                  <div class="text-sm text-gray-900">
                    ${escapeHtml(Staff.staff_name || "")}
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
      if (rotationShiftStore.loading) {
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
    
      rotationShiftGroupEls.tableBody.html(tableHtml);
    
      // Update footer counts
      $("#rotationShiftShowingCount").text(rotationShiftStore.groupDetails.length);
      $("#rotationShiftTotalCount").text(rotationShiftStore.total);
    
      // Update selected badge
      if (rotationShiftStore.selectedIds.length > 1) {
        $("#rotationShiftSelectedBadge").show();
        $("#rotationShiftSelectedCount").text(rotationShiftStore.selectedIds.length);
      } else {
        $("#rotationShiftSelectedBadge").hide();
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
      if (!rotationShiftGroupEls.filterModal || !rotationShiftGroupEls.filterModal.length) {
        // Create filter modal if it doesn't exist
        const modalHtml = `
          <div id="rotationShiftFilterModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
            rotationShiftStore.isFilterOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }">
            <div id="rotationShiftFilterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
            <div class="auth-filter-modal-panel relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ${
              rotationShiftStore.isFilterOpen ? "translate-x-0" : "translate-x-full"
            }">
              <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
                <h5>Add Filters</h5>
                <button id="rotationShiftFilterClose" class="cursor-pointer">
                  <i class="ri-close-line"></i>
                </button>
              </div>
              <div class="p-4 overflow-y-auto flex-1">
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-[#000000] mb-1.5">Employee Code</label>
                  <input
                    type="text"
                    id="rotationShiftFilterEmployeeCode"
                    placeholder="Enter Employee code"
                    class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                    value="${escapeHtml(rotationShiftStore.localFilters.employeeCode || "")}"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-[#000000] mb-1.5">Designation</label>
                  <input
                    type="text"
                    id="rotationShiftFilterDesignation"
                    placeholder="Enter Designation"
                    class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                    value="${escapeHtml(rotationShiftStore.localFilters.designation || "")}"
                  />
                </div>
                <div class="mb-4">
                  <label class="block text-sm font-semibold text-[#000000] mb-1.5">Status</label>
                  <div class="flex gap-4">
                    <label class="flex items-center">
                      <input
                        type="radio"
                        name="rotationShiftFilterStatus"
                        value="active"
                        class="mr-2 accent-[#009333] cursor-pointer"
                        ${rotationShiftStore.localFilters.status === "active" ? "checked" : ""}
                      />
                      Active
                    </label>
                    <label class="flex items-center">
                      <input
                        type="radio"
                        name="rotationShiftFilterStatus"
                        value="inactive"
                        class="mr-2 accent-[#009333] cursor-pointer"
                        ${rotationShiftStore.localFilters.status === "inactive" ? "checked" : ""}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
              <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
                <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" id="rotationShiftFilterReset">Reset All</button>
                <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="rotationShiftFilterApply">Apply</button>
              </div>
            </div>
          </div>
        `;
        $("body").append(modalHtml);
        rotationShiftGroupEls.filterModal = $("#rotationShiftFilterModal");
      } else {
        // Update existing modal
        rotationShiftGroupEls.filterModal
          .toggleClass("opacity-100", rotationShiftStore.isFilterOpen)
          .toggleClass("opacity-0 pointer-events-none", !rotationShiftStore.isFilterOpen);
        rotationShiftGroupEls.filterModal
          .find(".auth-filter-modal-panel")
          .toggleClass("translate-x-0", rotationShiftStore.isFilterOpen)
          .toggleClass("translate-x-full", !rotationShiftStore.isFilterOpen);
      }
    }
    
    function updateSelectAllCheckbox() {
      const checkbox = $("#rotationShiftSelectAll");
      if (checkbox.length) {
        checkbox.prop("checked", rotationShiftStore.selectAll);
      }
    }
    
    function renderAddGroupModal() {
      if (!rotationShiftGroupEls.addGroupModal || !rotationShiftGroupEls.addGroupModal.length) {
        const modalHtml = `
          <div id="rotationShiftAddGroupModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
            rotationShiftStore.isAddGroupOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }">
            <div id="rotationShiftAddGroupBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
            <div class="rotation-shift-group-modal-panel relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ${
              rotationShiftStore.isAddGroupOpen ? "translate-x-0" : "translate-x-full"
            }">
              <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
                <h5>Add Group</h5>
                <button id="rotationShiftAddGroupClose" class="cursor-pointer">
                  <i class="ri-close-line"></i>
                </button>
              </div>
              <div id="rotationShiftAddGroupContent"></div>
            </div>
          </div>
        `;
        $("body").append(modalHtml);
        rotationShiftGroupEls.addGroupModal = $("#rotationShiftAddGroupModal");
        // Initialize group modal after a short delay to ensure DOM is ready
        setTimeout(() => {
          if (window.initGroupModal) {
            window.initGroupModal("#rotationShiftAddGroupContent");
          }
        }, 50);
      } else {
        rotationShiftGroupEls.addGroupModal
          .toggleClass("opacity-100", rotationShiftStore.isAddGroupOpen)
          .toggleClass("opacity-0 pointer-events-none", !rotationShiftStore.isAddGroupOpen);
        rotationShiftGroupEls.addGroupModal
          .find(".rotation-shift-group-modal-panel")
          .toggleClass("translate-x-0", rotationShiftStore.isAddGroupOpen)
          .toggleClass("translate-x-full", !rotationShiftStore.isAddGroupOpen);
      }
    }
    
    function renderRotationShiftSidebar() {
      if (!rotationShiftGroupEls.rotationShiftModal || !rotationShiftGroupEls.rotationShiftModal.length) {
        const modalHtml = `
          <div id="rotationShiftModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
            rotationShiftStore.isRotationShiftSidebarOpen
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }">
            <div id="rotationShiftBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
            <div class="rotation-shift-modal-panel relative w-[750px] mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ease-in-out ${
              rotationShiftStore.isRotationShiftSidebarOpen
                ? "translate-x-0"
                : "translate-x-full"
            }">
              <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
                <h5 class="text-lg">
                  Rotation Shift Level for ${escapeHtml(
                    rotationShiftStore.selectedStaffForRotationShift?.groupName || ""
                  )}
                </h5>
                <button id="rotationShiftClose" class="cursor-pointer">
                      <i class="ri-close-line text-xl"></i>
                </button>
              </div>
              <div id="rotationShiftContent"></div>
            </div>
          </div>
        `;
        $("body").append(modalHtml);
        rotationShiftGroupEls.rotationShiftModal = $("#rotationShiftModal");
        // Initialize rotation shift modal after a short delay to ensure DOM is ready
        setTimeout(deferRotationShiftModalInit, 50);
      } else {
        rotationShiftGroupEls.rotationShiftModal
          .toggleClass("opacity-100", rotationShiftStore.isRotationShiftSidebarOpen)
          .toggleClass("opacity-0 pointer-events-none", !rotationShiftStore.isRotationShiftSidebarOpen);
        rotationShiftGroupEls.rotationShiftModal
          .find(".rotation-shift-modal-panel")
          .toggleClass("translate-x-0", rotationShiftStore.isRotationShiftSidebarOpen)
          .toggleClass("translate-x-full", !rotationShiftStore.isRotationShiftSidebarOpen);
    
        // Update header text
        if (rotationShiftStore.selectedStaffForRotationShift) {
          rotationShiftGroupEls.rotationShiftModal
            .find("h5")
            .text(
              `Rotation Shift Level for ${rotationShiftStore.selectedStaffForRotationShift.groupName || ""}`
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
    window.rotationShiftModule = {
      renderRotationShift,
      fetchRotationShift,
      renderModals,
      getStore: () => rotationShiftStore,
    };
    })();
    