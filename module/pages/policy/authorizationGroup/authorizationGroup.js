// Authorization Group Component - Plain JavaScript
const authorizationGroupStore = {
  selectedIds: [],
  selectAll: false,
  loading: false,
  initialLoading: false,
  isFilterOpen: false,
  isAddGroupOpen: false,
  groupDetails: [],
  filters: {},
  localFilters: {},
  isAuthorizationSidebarOpen: false,
  selectedStaffForAuthorization: null,
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
const authorizationGroupDummyData = [
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
    status: "active",
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
    status: "active",
  },
  {
    id: 11,
    staff_name: "Ethan Ross",
    userID: "EMP011",
    gender: "Male",
    phone_number: "9876543220",
    DEPARTMENT: "QA",
    DESIGNATION: "QA Manager",
    address_line_1: "610 Pine Street",
    joining_date: "2014-10-10",
    dob: "1984-02-11",
    GratuityStartDate: "2014-11-01",
    father_name: "Albert Ross",
    status: "inactive",
  },
  {
    id: 12,
    staff_name: "Isabella Clark",
    userID: "EMP012",
    gender: "Female",
    phone_number: "9876543221",
    DEPARTMENT: "Training",
    DESIGNATION: "Trainer",
    address_line_1: "742 Sunset Avenue",
    joining_date: "2022-12-05",
    dob: "1991-07-15",
    GratuityStartDate: "2023-01-01",
    father_name: "Victor Clark",
    status: "active",
  },
];

// Default columns
const defaultColumns = [
  { id: "groupName", label: "Group Name", visible: true },
  { id: "level1", label: "Level 1", visible: true },
  { id: "level2", label: "Level 2", visible: true },
  { id: "level3", label: "Level 3", visible: true },
  { id: "approved", label: "Approved", visible: false },
];

// DOM Elements
const authGroupEls = {
  container: null,
  searchInput: null,
  tableBody: null,
  tableHead: null,
  selectAllCheckbox: null,
  filterModal: null,
  addGroupModal: null,
  authorizationModal: null,
  footer: null,
};

// Utility to defer modal initialization until scripts are ready
function deferAuthorizationModalInit() {
  if (typeof window.initAuthorizationModal === "function") {
    window.initAuthorizationModal("#authGroupAuthorizationContent");
  } else {
    setTimeout(deferAuthorizationModalInit, 100);
  }
}

// Initialize on DOM ready
$(document).ready(function () {
  if ($("#AuthorizationGroupContent").length) {
    initAuthorizationGroup();
  }
});

function initAuthorizationGroup() {
  cacheAuthGroupElements();
  bindAuthGroupEvents();
  registerDefaultColumns();
  renderAuthorizationGroup();
  fetchAuthorizationGroup(1);
}

function cacheAuthGroupElements() {
  authGroupEls.container = $("#AuthorizationGroupContent");
  authGroupEls.searchInput = $("#authGroupSearchInput");
  authGroupEls.tableBody = $("#authGroupTableBody");
  authGroupEls.tableHead = $("#authGroupTableHead");
  authGroupEls.selectAllCheckbox = $("#authGroupSelectAll");
  authGroupEls.filterModal = $("#authGroupFilterModal");
  authGroupEls.addGroupModal = $("#authGroupAddGroupModal");
  authGroupEls.authorizationModal = $("#authGroupAuthorizationModal");
  authGroupEls.footer = $("#authGroupFooter");
}

function bindAuthGroupEvents() {
  // Search input with debounce
  if (authGroupEls.searchInput && authGroupEls.searchInput.length) {
    authGroupEls.searchInput.on("input", handleSearchTerm);
  }

  // Select all checkbox (delegate to handle re-rendered head)
  $(document).on("change", "#authGroupSelectAll", handleSelectAll);

  // Filter toggle
  $(document).on("click", "#authGroupFilterBtn", handleFilterToggle);
  $(document).on("click", "#authGroupFilterClose", handleFilterClose);
  $(document).on("click", "#authGroupFilterBackdrop", handleFilterClose);
  $(document).on("click", "#authGroupFilterApply", handleApplyFilters);
  $(document).on("click", "#authGroupFilterReset", handleClearFilters);

  // Add Group toggle
  $(document).on("click", "#authGroupAddBtn", () => {
    authorizationGroupStore.isAddGroupOpen = true;
    renderModals();
    // Initialize group modal after render
    setTimeout(() => {
      if (window.initGroupModal) {
        window.initGroupModal("#authGroupAddGroupContent");
      }
    }, 100);
  });
  $(document).on("click", "#authGroupAddGroupClose", () => {
    authorizationGroupStore.isAddGroupOpen = false;
    renderModals();
  });
  $(document).on("click", "#authGroupAddGroupBackdrop", () => {
    authorizationGroupStore.isAddGroupOpen = false;
    renderModals();
  });

  // Authorization modal toggle
  $(document).on("click", "#authGroupAuthorizationBackdrop", () => {
    authorizationGroupStore.isAuthorizationSidebarOpen = false;
    renderAuthorizationSidebar();
  });
  $(document).on("click", "#authGroupAuthorizationClose", () => {
    authorizationGroupStore.isAuthorizationSidebarOpen = false;
    renderAuthorizationSidebar();
  });

  // Row checkbox
  $(document).on("change", ".auth-group-row-checkbox", function () {
    const id = parseInt($(this).data("id"));
    handleCheckboxChange(id);
  });

  // Edit icon click
  $(document).on("click", ".auth-group-p-1 rounded border border-[#cfd7df] text-[#4d5e6c]", function () {
    const id = parseInt($(this).data("id"));
    handleAuthorizationEdit(id);
  });

  // Group name click
  $(document).on("click", ".auth-group-name-cell", function () {
    const id = parseInt($(this).data("id"));
    handleAuthorizationEdit(id);
  });

  // Entire row click (except checkbox)
  $(document).on("click", ".auth-group-row", function (e) {
    if ($(e.target).closest("input[type='checkbox']").length) {
      return;
    }
    const attrId = $(this).attr("data-id");
    const id = attrId ? parseInt(attrId, 10) : NaN;
    if (!Number.isNaN(id)) {
      handleAuthorizationEdit(id);
    }
  });

  // Filter input changes
  $(document).on("input", "#authGroupFilterEmployeeCode", function () {
    handleFilterInputChange("employeeCode", $(this).val());
  });
  $(document).on("input", "#authGroupFilterDesignation", function () {
    handleFilterInputChange("designation", $(this).val());
  });
  $(document).on("change", 'input[name="authGroupFilterStatus"]', function () {
    handleFilterInputChange("status", $(this).val());
  });

  // Escape key to close modals
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      if (authorizationGroupStore.isAuthorizationSidebarOpen) {
        authorizationGroupStore.isAuthorizationSidebarOpen = false;
        renderModals();
      }
      if (authorizationGroupStore.isFilterOpen) {
        handleFilterClose();
      }
      if (authorizationGroupStore.isAddGroupOpen) {
        authorizationGroupStore.isAddGroupOpen = false;
        renderModals();
      }
    }
  });
}

function registerDefaultColumns() {
  if (window.policyModule && window.policyModule.registerColumns) {
    window.policyModule.registerColumns("AuthorizationGroup", defaultColumns);
  }
  authorizationGroupStore.fields = defaultColumns;
  updateFieldsFromPolicyModule();
}

function updateFieldsFromPolicyModule() {
  if (window.policyModule && window.policyModule.getFields) {
    const registeredFields = window.policyModule.getFields("AuthorizationGroup");
    if (registeredFields && registeredFields.length > 0) {
      authorizationGroupStore.fields = registeredFields;
    }
  }
}

function getOrderedVisibleFields() {
  updateFieldsFromPolicyModule();
  return authorizationGroupStore.fields.filter((f) => f.visible);
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
    clearTimeout(authorizationGroupStore.debounceTimer);
    authorizationGroupStore.debounceTimer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

function handleSearchTerm(e) {
  const value = $(e.target).val();
  authorizationGroupStore.searchTerm = value;
  debounceSearch();
}

const debounceSearch = debounce(() => {
  authorizationGroupStore.debouncedSearchTerm = authorizationGroupStore.searchTerm;
  authorizationGroupStore.page = 1;
  authorizationGroupStore.groupDetails = [];
  fetchAuthorizationGroup(1);
}, 300);

function handleSelectAll(e) {
  const checked = $(e.target).is(":checked");
  authorizationGroupStore.selectAll = checked;
  authorizationGroupStore.selectedIds = checked
    ? authorizationGroupStore.groupDetails.map((p) => p.id)
    : [];
  renderTable();
}

function handleCheckboxChange(id) {
  if (authorizationGroupStore.selectedIds.includes(id)) {
    authorizationGroupStore.selectedIds = authorizationGroupStore.selectedIds.filter(
      (i) => i !== id
    );
  } else {
    authorizationGroupStore.selectedIds = [...authorizationGroupStore.selectedIds, id];
  }
  authorizationGroupStore.selectAll =
    authorizationGroupStore.groupDetails.length > 0 &&
    authorizationGroupStore.selectedIds.length === authorizationGroupStore.groupDetails.length;
  renderTable();
  updateSelectAllCheckbox();
}

function handleAuthorizationEdit(staffId) {
  console.log(staffId);
  const staffMember = authorizationGroupStore.groupDetails.find(
    (staff) => staff.id === staffId
  );
  if (staffMember) {
    authorizationGroupStore.selectedStaffForAuthorization = staffMember;
    authorizationGroupStore.isAuthorizationSidebarOpen = true;
    renderAuthorizationSidebar();
    // Initialize authorization modal after render
    setTimeout(deferAuthorizationModalInit, 100);
  }
}

function handleFilterToggle() {
  authorizationGroupStore.isFilterOpen = true;
  authorizationGroupStore.localFilters = { ...authorizationGroupStore.filters };
  renderModals();
}

function handleFilterClose() {
  authorizationGroupStore.isFilterOpen = false;
  renderModals();
}

function handleFilterInputChange(key, value) {
  authorizationGroupStore.localFilters = {
    ...authorizationGroupStore.localFilters,
    [key]: value,
  };
  // Update filter inputs
  if (key === "employeeCode") {
    $("#authGroupFilterEmployeeCode").val(value || "");
  } else if (key === "designation") {
    $("#authGroupFilterDesignation").val(value || "");
  } else if (key === "status") {
    $(`input[name="authGroupFilterStatus"][value="${value}"]`).prop("checked", true);
  }
}

function handleApplyFilters() {
  authorizationGroupStore.filters = { ...authorizationGroupStore.localFilters };
  handleFilterClose();
  // Trigger fetch with filters
  authorizationGroupStore.page = 1;
  authorizationGroupStore.groupDetails = [];
  fetchAuthorizationGroup(1);
}

function handleClearFilters() {
  const clearedFilters = {};
  authorizationGroupStore.localFilters = clearedFilters;
  authorizationGroupStore.filters = clearedFilters;
  $("#authGroupFilterEmployeeCode").val("");
  $("#authGroupFilterDesignation").val("");
  $('input[name="authGroupFilterStatus"]').prop("checked", false);
}

async function fetchAuthorizationGroup(page = 1) {
  try {
    if (page === 1) {
      authorizationGroupStore.initialLoading = true;
    } else {
      authorizationGroupStore.loading = true;
    }
    renderTable();

    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    const limit = 30;
    let filteredData = [...authorizationGroupDummyData];

    // Search filter
    if (authorizationGroupStore.debouncedSearchTerm?.trim()) {
      const term = authorizationGroupStore.debouncedSearchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        (item.staff_name || "").toLowerCase().includes(term)
      );
    }

    // Advanced filters
    if (authorizationGroupStore.filters.employeeCode) {
      const code = authorizationGroupStore.filters.employeeCode.toLowerCase();
      filteredData = filteredData.filter((item) =>
        (item.userID || "").toLowerCase().includes(code)
      );
    }

    if (authorizationGroupStore.filters.designation) {
      const designation = authorizationGroupStore.filters.designation.toLowerCase();
      filteredData = filteredData.filter((item) =>
        (item.DESIGNATION || "").toLowerCase().includes(designation)
      );
    }

    if (authorizationGroupStore.filters.status) {
      filteredData = filteredData.filter(
        (item) =>
          (item.status || "").toLowerCase() ===
          authorizationGroupStore.filters.status.toLowerCase()
      );
    }

    const totalRecords = filteredData.length;
    const offset = (page - 1) * limit;
    const newStaff = filteredData.slice(offset, offset + limit);

    if (page === 1 || authorizationGroupStore.debouncedSearchTerm) {
      authorizationGroupStore.groupDetails = newStaff;
    } else {
      authorizationGroupStore.groupDetails = [
        ...authorizationGroupStore.groupDetails,
        ...newStaff,
      ];
    }

    authorizationGroupStore.hasMore = offset + limit < totalRecords;
    authorizationGroupStore.total = totalRecords;
  } catch (err) {
    console.error("Error fetching authorization group:", err);
    authorizationGroupStore.hasMore = false;
  } finally {
    authorizationGroupStore.loading = false;
    authorizationGroupStore.initialLoading = false;
    renderTable();
    setupInfiniteScroll();
  }
}

function setupInfiniteScroll() {
  // Clean up existing observer
  if (authorizationGroupStore.observer) {
    authorizationGroupStore.observer.disconnect();
  }

  if (authorizationGroupStore.loading || !authorizationGroupStore.hasMore) {
    return;
  }

  const lastRow = authGroupEls.tableBody.find("tr:last");
  if (lastRow.length === 0) return;

  authorizationGroupStore.observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        const nextPage = authorizationGroupStore.page + 1;
        authorizationGroupStore.page = nextPage;
        fetchAuthorizationGroup(nextPage);
      }
    },
    { threshold: 0.1 }
  );

  authorizationGroupStore.observer.observe(lastRow[0]);
}

function renderAuthorizationGroup() {
  if (!authGroupEls.container || !authGroupEls.container.length) return;

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
          id="authGroupSearchInput"
          placeholder="Enter Group Name"
          value="${escapeHtml(authorizationGroupStore.searchTerm)}"
        />

        <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3]" id="authGroupAddBtn">
          <i class="ri-function-add-line mr-1"></i>
          Group
        </button>

        <button class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]" id="authGroupFilterBtn">
          <i class="ri-sort-desc"></i>
        </button>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-[#ebeff3]">
      <div id="authGroupSelectedBadge" class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d] hidden">
        <span id="authGroupSelectedCount">0</span> items selected
      </div>

      <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
        <div class="h-full overflow-y-auto">
          <table class="w-full">
            <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]" id="authGroupTableHead">
              <tr>
                <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center" id="checkboxColumn">
                  <input
                    type="checkbox"
                    id="authGroupSelectAll"
                    class="form-check accent-[#009333] "
                    ${authorizationGroupStore.selectAll ? "checked" : ""}
                  />
                </th>
                <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
                  <div class="flex justify-center items-center gap-1">
                    <span>S.No.</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody id="authGroupTableBody">
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start" id="authGroupFooter">
      <span class="text-sm">
        Showing <span class="text-red-600" id="authGroupShowingCount">0</span> of
        <span class="text-blue-600" id="authGroupTotalCount">0</span>
      </span>
    </div>
  `;

  authGroupEls.container.html(html);
  cacheAuthGroupElements();
  renderTableHead();
  renderTable();
  renderModals();
}

function renderTableHead() {
  if (!authGroupEls.tableHead || !authGroupEls.tableHead.length) return;

  const visibleFields = getOrderedVisibleFields();
  let headHtml = `
    <tr>
      <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center" id="checkboxColumn">
        <input
          type="checkbox"
          id="authGroupSelectAll"
          class="form-check accent-[#009333] "
          ${authorizationGroupStore.selectAll ? "checked" : ""}
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
  authGroupEls.tableHead.html(headHtml);
}

function renderTable() {
  if (!authGroupEls.tableBody || !authGroupEls.tableBody.length) return;

  const visibleFields = getOrderedVisibleFields();
  let tableHtml = "";

  // Show shimmer loading for initial load
  if (authorizationGroupStore.initialLoading) {
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
    authGroupEls.tableBody.html(tableHtml);
    return;
  }

  // Render actual data
  if (authorizationGroupStore.groupDetails.length === 0) {
    const colSpan = visibleFields.length + 2;
    tableHtml = `
      <tr>
        <td colspan="${colSpan}" class="py-10 text-center text-gray-500">
          No List available
        </td>
      </tr>
    `;
    authGroupEls.tableBody.html(tableHtml);
    return;
  }

  authorizationGroupStore.groupDetails.forEach((Staff, index) => {
    const isSelected = authorizationGroupStore.selectedIds.includes(Staff.id);
    const isLastRow = index === authorizationGroupStore.groupDetails.length - 1;
    tableHtml += `
      <tr
        class="auth-group-row hover:bg-[#f5f7f9] text-sm cursor-pointer group ${isSelected ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""}"
        data-id="${Staff.id}"
        ${isLastRow ? 'data-last-row="true"' : ""}
      >
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
          <input
            type="checkbox"
            class="form-check auth-group-row-checkbox accent-[#009333] "
            data-id="${Staff.id}"
            ${isSelected ? "checked" : ""}
          />
        </td>
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%]">
          <div class="flex justify-between items-center">
            <span></span>
            <span class="text-center">${index + 1}</span>
            <span class="cursor-pointer auth-group-p-1 rounded border border-[#cfd7df] text-[#4d5e6c]" data-id="${Staff.id}">
              <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>
            </span>
          </div>
        </td>
    `;

    visibleFields.forEach((f) => {
      switch (f.id) {
        case "groupName":
          tableHtml += `
            <td key="${f.id}" class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%] auth-group-name-cell" data-id="${Staff.id}">
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
  if (authorizationGroupStore.loading) {
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

  authGroupEls.tableBody.html(tableHtml);

  // Update footer counts
  $("#authGroupShowingCount").text(authorizationGroupStore.groupDetails.length);
  $("#authGroupTotalCount").text(authorizationGroupStore.total);

  // Update selected badge
  if (authorizationGroupStore.selectedIds.length > 1) {
    $("#authGroupSelectedBadge").show();
    $("#authGroupSelectedCount").text(authorizationGroupStore.selectedIds.length);
  } else {
    $("#authGroupSelectedBadge").hide();
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
  if (!authGroupEls.filterModal || !authGroupEls.filterModal.length) {
    // Create filter modal if it doesn't exist
    const modalHtml = `
      <div id="authGroupFilterModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        authorizationGroupStore.isFilterOpen
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }">
        <div id="authGroupFilterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div class="auth-filter-modal-panel relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ${
          authorizationGroupStore.isFilterOpen ? "translate-x-0" : "translate-x-full"
        }">
          <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Filters</h5>
            <button id="authGroupFilterClose" class="cursor-pointer">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="p-4 overflow-y-auto flex-1">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Employee Code</label>
              <input
                type="text"
                id="authGroupFilterEmployeeCode"
                placeholder="Enter Employee code"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${escapeHtml(authorizationGroupStore.localFilters.employeeCode || "")}"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Designation</label>
              <input
                type="text"
                id="authGroupFilterDesignation"
                placeholder="Enter Designation"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${escapeHtml(authorizationGroupStore.localFilters.designation || "")}"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Status</label>
              <div class="flex gap-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="authGroupFilterStatus"
                    value="active"
                    class="mr-2 accent-[#009333] cursor-pointer"
                    ${authorizationGroupStore.localFilters.status === "active" ? "checked" : ""}
                  />
                  Active
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="authGroupFilterStatus"
                    value="inactive"
                    class="mr-2 accent-[#009333] cursor-pointer"
                    ${authorizationGroupStore.localFilters.status === "inactive" ? "checked" : ""}
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" id="authGroupFilterReset">Reset All</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="authGroupFilterApply">Apply</button>
          </div>
        </div>
      </div>
    `;
    $("body").append(modalHtml);
    authGroupEls.filterModal = $("#authGroupFilterModal");
  } else {
    // Update existing modal
    authGroupEls.filterModal
      .toggleClass("opacity-100", authorizationGroupStore.isFilterOpen)
      .toggleClass("opacity-0 pointer-events-none", !authorizationGroupStore.isFilterOpen);
    authGroupEls.filterModal
      .find(".auth-filter-modal-panel")
      .toggleClass("translate-x-0", authorizationGroupStore.isFilterOpen)
      .toggleClass("translate-x-full", !authorizationGroupStore.isFilterOpen);
  }
}

function updateSelectAllCheckbox() {
  const checkbox = $("#authGroupSelectAll");
  if (checkbox.length) {
    checkbox.prop("checked", authorizationGroupStore.selectAll);
  }
}

function renderAddGroupModal() {
  if (!authGroupEls.addGroupModal || !authGroupEls.addGroupModal.length) {
    const modalHtml = `
      <div id="authGroupAddGroupModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        authorizationGroupStore.isAddGroupOpen
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }">
        <div id="authGroupAddGroupBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div class="auth-group-modal-panel relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ${
          authorizationGroupStore.isAddGroupOpen ? "translate-x-0" : "translate-x-full"
        }">
          <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Group</h5>
            <button id="authGroupAddGroupClose" class="cursor-pointer">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div id="authGroupAddGroupContent"></div>
        </div>
      </div>
    `;
    $("body").append(modalHtml);
    authGroupEls.addGroupModal = $("#authGroupAddGroupModal");
    // Initialize group modal after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (window.initGroupModal) {
        window.initGroupModal("#authGroupAddGroupContent");
      }
    }, 50);
  } else {
    authGroupEls.addGroupModal
      .toggleClass("opacity-100", authorizationGroupStore.isAddGroupOpen)
      .toggleClass("opacity-0 pointer-events-none", !authorizationGroupStore.isAddGroupOpen);
    authGroupEls.addGroupModal
      .find(".auth-group-modal-panel")
      .toggleClass("translate-x-0", authorizationGroupStore.isAddGroupOpen)
      .toggleClass("translate-x-full", !authorizationGroupStore.isAddGroupOpen);
  }
}

function renderAuthorizationSidebar() {
  console.log("renderAuthorizationSidebar", authorizationGroupStore.selectedStaffForAuthorization);
  if (!authGroupEls.authorizationModal || !authGroupEls.authorizationModal.length) {
    const modalHtml = `
      <div id="authGroupAuthorizationModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        authorizationGroupStore.isAuthorizationSidebarOpen
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }">
        <div id="authGroupAuthorizationBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div class="auth-authorization-modal-panel relative w-[750px] mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ease-in-out ${
          authorizationGroupStore.isAuthorizationSidebarOpen
            ? "translate-x-0"
            : "translate-x-full"
        }">
          <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
            <h5 class="text-lg">
              Authorization Level for ${escapeHtml(
                authorizationGroupStore.selectedStaffForAuthorization?.groupName || ""
              )}
            </h5>
            <button id="authGroupAuthorizationClose" class="cursor-pointer">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>
          <div id="authGroupAuthorizationContent"></div>
        </div>
      </div>
    `;
    $("body").append(modalHtml);
    authGroupEls.authorizationModal = $("#authGroupAuthorizationModal");
    // Initialize authorization modal after a short delay to ensure DOM is ready
    setTimeout(deferAuthorizationModalInit, 50);
  } else {
    authGroupEls.authorizationModal
      .toggleClass("opacity-100", authorizationGroupStore.isAuthorizationSidebarOpen)
      .toggleClass("opacity-0 pointer-events-none", !authorizationGroupStore.isAuthorizationSidebarOpen);
    authGroupEls.authorizationModal
      .find(".auth-authorization-modal-panel")
      .toggleClass("translate-x-0", authorizationGroupStore.isAuthorizationSidebarOpen)
      .toggleClass("translate-x-full", !authorizationGroupStore.isAuthorizationSidebarOpen);

    // Update header text
    if (authorizationGroupStore.selectedStaffForAuthorization) {
      authGroupEls.authorizationModal
        .find("h5")
        .text(
          `Authorization Level for ${authorizationGroupStore.selectedStaffForAuthorization.groupName || ""}`
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
window.authorizationGroupModule = {
  renderAuthorizationGroup,
  fetchAuthorizationGroup,
  renderModals,
  getStore: () => authorizationGroupStore,
};

