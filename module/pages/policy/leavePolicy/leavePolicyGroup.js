(function () {
// Leave Policy Component - Plain JavaScript
const leavePolicyStore = {
  selectedIds: [],
  selectAll: false,
  loading: false,
  initialLoading: false,
  isFilterOpen: false,
  isAddGroupOpen: false,
  groupDetails: [],
  filters: {},
  localFilters: {},
  isLeavePolicySidebarOpen: false,
  selectedStaffForLeavePolicy: null,
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
const leavePolicyGroupDummyData = [
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
];

// Default columns
const defaultLeavePolicyColumns = [
  { id: "groupName", label: "Group Name", visible: true },
  { id: "level1", label: "Level 1", visible: true },
  { id: "level2", label: "Level 2", visible: true },
  { id: "level3", label: "Level 3", visible: true },
  { id: "approved", label: "Approved", visible: false },
];

// DOM Elements
const leavePolicyGroupEls = {
  container: null,
  searchInput: null,
  tableBody: null,
  tableHead: null,
  selectAllCheckbox: null,
  filterModal: null,
  addGroupModal: null,
  leavePolicyModal: null,
  footer: null,
};

// Utility to defer modal initialization until scripts are ready
function deferLeavePolicyModalInit() {
  if (typeof window.initLeavePolicyModal === "function") {
    window.initLeavePolicyModal("#leavePolicyContent");
  } else {
    setTimeout(deferLeavePolicyModalInit, 100);
  }
}

// Initialize on DOM ready
$(document).ready(function () {
  if ($("#LeavePolicyContent").length) {
    initLeavePolicyGroup();
  }
});

function initLeavePolicyGroup() {
  cacheLeavePolicyGroupElements();
  bindLeavePolicyGroupEvents();
  registerDefaultColumns();
  renderLeavePolicy();
  fetchLeavePolicy(1);
}

function cacheLeavePolicyGroupElements() {
  leavePolicyGroupEls.container = $("#LeavePolicyContent");
  leavePolicyGroupEls.searchInput = $("#leavePolicySearchInput");
  leavePolicyGroupEls.tableBody = $("#leaveGroupTableBody");
  leavePolicyGroupEls.tableHead = $("#leaveGroupTableHead");
  leavePolicyGroupEls.selectAllCheckbox = $("#leaveGroupSelectAll");
  leavePolicyGroupEls.filterModal = $("#leaveGroupFilterModal");
  leavePolicyGroupEls.addGroupModal = $("#leaveGroupAddGroupModal");
  leavePolicyGroupEls.leavePolicyModal = $("#leavePolicyModal");
  leavePolicyGroupEls.footer = $("#leaveGroupFooter");
}

function bindLeavePolicyGroupEvents() {
  // Search input with debounce
  if (leavePolicyGroupEls.searchInput && leavePolicyGroupEls.searchInput.length) {
    leavePolicyGroupEls.searchInput.on("input", handleSearchTerm);
  }

  // Select all checkbox (delegate to handle re-rendered head)
  $(document).on("change", "#leaveGroupSelectAll", handleSelectAll);

  // Filter toggle
  $(document).on("click", "#leaveGroupFilterBtn", handleFilterToggle);
  $(document).on("click", "#leaveGroupFilterClose", handleFilterClose);
  $(document).on("click", "#leaveGroupFilterBackdrop", handleFilterClose);
  $(document).on("click", "#leaveGroupFilterApply", handleApplyFilters);
  $(document).on("click", "#leaveGroupFilterReset", handleClearFilters);

  // Add Group toggle
  $(document).on("click", "#leaveGroupAddBtn", () => {
    leavePolicyStore.isAddGroupOpen = true;
    renderModals();
    // Initialize group modal after render
    setTimeout(() => {
      if (window.initLeaveGroupModal) {
        window.initLeaveGroupModal("#leaveGroupAddGroupContent");
      }
    }, 100);
  });
  $(document).on("click", "#leaveGroupAddGroupClose", () => {
    leavePolicyStore.isAddGroupOpen = false;
    renderModals();
  });
  $(document).on("click", "#leavePolicyAddGroupBackdrop", () => {
    leavePolicyStore.isAddGroupOpen = false;
    renderModals();
  });

  // Leave Policy modal toggle
  $(document).on("click", "#leavePolicyBackdrop", () => {
    leavePolicyStore.isLeavePolicySidebarOpen = false;
    renderLeavePolicySidebar();
  });
  $(document).on("click", "#leavePolicyClose", () => {
    leavePolicyStore.isLeavePolicySidebarOpen = false;
    renderLeavePolicySidebar();
  });

  // Row checkbox
  $(document).on("change", ".leave-group-row-checkbox", function () {
    const id = parseInt($(this).data("id"));
    handleCheckboxChange(id);
  });

  // Edit icon click
  $(document).on("click", ".leave-group-edit-icon", function () {
    const id = parseInt($(this).data("id"));
    handleLeavePolicyEdit(id);
  });

  // Group name click
  $(document).on("click", ".leave-group-name-cell", function () {
    const id = parseInt($(this).data("id"));
    handleLeavePolicyEdit(id);
  });

  // Entire row click (except checkbox)
  $(document).on("click", ".leave-group-row", function (e) {
    if ($(e.target).closest("input[type='checkbox']").length) {
      return;
    }
    const attrId = $(this).attr("data-id");
    const id = attrId ? parseInt(attrId, 10) : NaN;
    if (!Number.isNaN(id)) {
      handleLeavePolicyEdit(id);
    }
  });

  // Filter input changes
  $(document).on("input", "#leaveGroupFilterEmployeeCode", function () {
    handleFilterInputChange("employeeCode", $(this).val());
  });
  $(document).on("input", "#leaveGroupFilterDesignation", function () {
    handleFilterInputChange("designation", $(this).val());
  });
  $(document).on("change", 'input[name="leaveGroupFilterStatus"]', function () {
    handleFilterInputChange("status", $(this).val());
  });

  // Escape key to close modals
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      if (leavePolicyStore.isAuthorizationSidebarOpen) {
        leavePolicyStore.isAuthorizationSidebarOpen = false;
        renderModals();
      }
      if (leavePolicyStore.isFilterOpen) {
        handleFilterClose();
      }
      if (leavePolicyStore.isAddGroupOpen) {
        leavePolicyStore.isAddGroupOpen = false;
        renderModals();
      }
    }
  });
}

function registerDefaultColumns() {
  if (window.policyModule && window.policyModule.registerColumns) {
    window.policyModule.registerColumns("LeavePolicyGroup", defaultLeavePolicyColumns);
  }
  leavePolicyStore.fields = defaultLeavePolicyColumns;
  updateFieldsFromPolicyModule();
}

function updateFieldsFromPolicyModule() {
  if (window.policyModule && window.policyModule.getFields) {
    const registeredFields = window.policyModule.getFields("LeavePolicyGroup");
    if (registeredFields && registeredFields.length > 0) {
      leavePolicyStore.fields = registeredFields;
    }
  }
}

function getOrderedVisibleFields() {
  updateFieldsFromPolicyModule();
  return leavePolicyStore.fields.filter((f) => f.visible);
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
    clearTimeout(leavePolicyStore.debounceTimer);
    leavePolicyStore.debounceTimer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

function handleSearchTerm(e) {
  const value = $(e.target).val();
  leavePolicyStore.searchTerm = value;
  debounceLeaveSearch();
}

const debounceLeaveSearch = debounce(() => {
  leavePolicyStore.debouncedSearchTerm = leavePolicyStore.searchTerm;
  leavePolicyStore.page = 1;
  leavePolicyStore.groupDetails = [];
  fetchLeavePolicy(1);
}, 300);

function handleSelectAll(e) {
  const checked = $(e.target).is(":checked");
  leavePolicyStore.selectAll = checked;
  leavePolicyStore.selectedIds = checked
    ? leavePolicyStore.groupDetails.map((p) => p.id)
    : [];
  renderTable();
}

function handleCheckboxChange(id) {
  if (leavePolicyStore.selectedIds.includes(id)) {
    leavePolicyStore.selectedIds = leavePolicyStore.selectedIds.filter(
      (i) => i !== id
    );
  } else {
    leavePolicyStore.selectedIds = [...leavePolicyStore.selectedIds, id];
  }
  leavePolicyStore.selectAll =
    leavePolicyStore.groupDetails.length > 0 &&
    leavePolicyStore.selectedIds.length === leavePolicyStore.groupDetails.length;
  renderTable();
  updateSelectAllCheckbox();
}

function handleLeavePolicyEdit(staffId) {
  console.log(staffId);
  const staffMember = leavePolicyStore.groupDetails.find(
    (staff) => staff.id === staffId
  );
  if (staffMember) {
    leavePolicyStore.selectedStaffForLeavePolicy = staffMember;
    leavePolicyStore.isLeavePolicySidebarOpen = true;
    renderLeavePolicySidebar();
    // Initialize leave policy modal after render
    setTimeout(deferLeavePolicyModalInit, 100);
  }
}

function handleFilterToggle() {
  leavePolicyStore.isFilterOpen = true;
  leavePolicyStore.localFilters = { ...leavePolicyStore.filters };
  renderModals();
}

function handleFilterClose() {
  leavePolicyStore.isFilterOpen = false;
  renderModals();
}

function handleFilterInputChange(key, value) {
  leavePolicyStore.localFilters = {
    ...leavePolicyStore.localFilters,
    [key]: value,
  };
  // Update filter inputs
  if (key === "employeeCode") {
    $("#leaveGroupFilterEmployeeCode").val(value || "");
  } else if (key === "designation") {
    $("#leaveGroupFilterDesignation").val(value || "");
  } else if (key === "status") {
    $(`input[name="leaveGroupFilterStatus"][value="${value}"]`).prop("checked", true);
  }
}

function handleApplyFilters() {
  leavePolicyStore.filters = { ...leavePolicyStore.localFilters };
  handleFilterClose();
  // Trigger fetch with filters
  leavePolicyStore.page = 1;
  leavePolicyStore.groupDetails = [];
  fetchLeavePolicy(1);
}

function handleClearFilters() {
  const clearedFilters = {};
  leavePolicyStore.localFilters = clearedFilters;
  leavePolicyStore.filters = clearedFilters;
  $("#leaveGroupFilterEmployeeCode").val("");
  $("#leaveGroupFilterDesignation").val("");
  $('input[name="leaveGroupFilterStatus"]').prop("checked", false);
}

async function fetchLeavePolicy(page = 1) {
  try {
    if (page === 1) {
      leavePolicyStore.initialLoading = true;
    } else {
      leavePolicyStore.loading = true;
    }
    renderTable();

    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 300));

    const limit = 30;
    let filteredData = [...leavePolicyGroupDummyData];

    // Search filter
    if (leavePolicyStore.debouncedSearchTerm?.trim()) {
      const term = leavePolicyStore.debouncedSearchTerm.toLowerCase();
      filteredData = filteredData.filter((item) =>
        (item.staff_name || "").toLowerCase().includes(term)
      );
    }

    // Advanced filters
    if (leavePolicyStore.filters.employeeCode) {
      const code = leavePolicyStore.filters.employeeCode.toLowerCase();
      filteredData = filteredData.filter((item) =>
        (item.userID || "").toLowerCase().includes(code)
      );
    }

    if (leavePolicyStore.filters.designation) {
      const designation = leavePolicyStore.filters.designation.toLowerCase();
      filteredData = filteredData.filter((item) =>
        (item.DESIGNATION || "").toLowerCase().includes(designation)
      );
    }

    if (leavePolicyStore.filters.status) {
      filteredData = filteredData.filter(
        (item) =>
          (item.status || "").toLowerCase() ===
          leavePolicyStore.filters.status.toLowerCase()
      );
    }

    const totalRecords = filteredData.length;
    const offset = (page - 1) * limit;
    const newStaff = filteredData.slice(offset, offset + limit);

    if (page === 1 || leavePolicyStore.debouncedSearchTerm) {
      leavePolicyStore.groupDetails = newStaff;
    } else {
      leavePolicyStore.groupDetails = [
        ...leavePolicyStore.groupDetails,
        ...newStaff,
      ];
    }

    leavePolicyStore.hasMore = offset + limit < totalRecords;
    leavePolicyStore.total = totalRecords;
  } catch (err) {
    console.error("Error fetching leave policy group:", err);
    leavePolicyStore.hasMore = false;
  } finally {
    leavePolicyStore.loading = false;
    leavePolicyStore.initialLoading = false;
    renderTable();
    setupInfiniteScroll();
  }
}

function setupInfiniteScroll() {
  // Clean up existing observer
  if (leavePolicyStore.observer) {
    leavePolicyStore.observer.disconnect();
  }

  if (leavePolicyStore.loading || !leavePolicyStore.hasMore) {
    return;
  }

  const lastRow = leavePolicyGroupEls.tableBody.find("tr:last");
  if (lastRow.length === 0) return;

  leavePolicyStore.observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        const nextPage = leavePolicyStore.page + 1;
        leavePolicyStore.page = nextPage;
        fetchLeavePolicy(nextPage);
      }
    },
    { threshold: 0.1 }
  );

  leavePolicyStore.observer.observe(lastRow[0]);
}

function renderLeavePolicy() {
  if (!leavePolicyGroupEls.container || !leavePolicyGroupEls.container.length) return;

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
          id="leavePolicySearchInput"
          placeholder="Enter Group Name"
          value="${escapeHtml(leavePolicyStore.searchTerm)}"
        />

        <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3]" id="leaveGroupAddBtn">
          <i class="ri-function-add-line mr-1"></i>
          Group
        </button>

        <button class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]" id="leaveGroupFilterBtn">
          <i class="ri-sort-desc"></i>
        </button>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-[#ebeff3]">
      <div id="leaveGroupSelectedBadge" class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d] hidden">
        <span id="leaveGroupSelectedCount">0</span> items selected
      </div>

      <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
        <div class="h-full overflow-y-auto">
          <table class="w-full">
            <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]" id="leaveGroupTableHead">
              <tr>
                <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center" id="checkboxColumn">
                  <input
                    type="checkbox"
                    id="leaveGroupSelectAll"
                    class="form-check accent-[#009333] "
                    ${leavePolicyStore.selectAll ? "checked" : ""}
                  />
                </th>
                <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
                  <div class="flex justify-center items-center gap-1">
                    <span>S.No.</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody id="leaveGroupTableBody">
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start" id="leaveGroupFooter">
      <span class="text-sm">
        Showing <span class="text-red-600" id="leaveGroupShowingCount">0</span> of
        <span class="text-blue-600" id="leaveGroupTotalCount">0</span>
      </span>
    </div>
  `;

  leavePolicyGroupEls.container.html(html);
  cacheLeavePolicyGroupElements();
  renderTableHead();
  renderTable();
  renderModals();
}

function renderTableHead() {
  if (!leavePolicyGroupEls.tableHead || !leavePolicyGroupEls.tableHead.length) return;

  const visibleFields = getOrderedVisibleFields();
  let headHtml = `
    <tr>
      <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center" id="checkboxColumn">
        <input
          type="checkbox"
          id="leaveGroupSelectAll"
          class="form-check accent-[#009333] "
          ${leavePolicyStore.selectAll ? "checked" : ""}
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
  leavePolicyGroupEls.tableHead.html(headHtml);
}

function renderTable() {
  if (!leavePolicyGroupEls.tableBody || !leavePolicyGroupEls.tableBody.length) return;

  const visibleFields = getOrderedVisibleFields();
  let tableHtml = "";

  // Show shimmer loading for initial load
  if (leavePolicyStore.initialLoading) {
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
    leavePolicyGroupEls.tableBody.html(tableHtml);
    return;
  }

  // Render actual data
  if (leavePolicyStore.groupDetails.length === 0) {
    const colSpan = visibleFields.length + 2;
    tableHtml = `
      <tr>
        <td colspan="${colSpan}" class="py-10 text-center text-gray-500">
          No List available
        </td>
      </tr>
    `;
    leavePolicyGroupEls.tableBody.html(tableHtml);
    return;
  }

  leavePolicyStore.groupDetails.forEach((Staff, index) => {
    const isSelected = leavePolicyStore.selectedIds.includes(Staff.id);
    const isLastRow = index === leavePolicyStore.groupDetails.length - 1;
    tableHtml += `
      <tr
        class="leave-group-row hover:bg-[#f5f7f9] text-sm cursor-pointer group ${isSelected ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""}"
        data-id="${Staff.id}"
        ${isLastRow ? 'data-last-row="true"' : ""}
      >
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
          <input
            type="checkbox"
            class="form-check leave-group-row-checkbox accent-[#009333] "
            data-id="${Staff.id}"
            ${isSelected ? "checked" : ""}
          />
        </td>
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%]">
          <div class="flex justify-between items-center">
            <span></span>
            <span class="text-center">${index + 1}</span>
            <span class="cursor-pointer leave-group-edit-icon" data-id="${Staff.id}">
              <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>
            </span>
          </div>
        </td>
    `;

    visibleFields.forEach((f) => {
      switch (f.id) {
        case "groupName":
          tableHtml += `
            <td key="${f.id}" class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%] leave-group-name-cell" data-id="${Staff.id}">
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
  if (leavePolicyStore.loading) {
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

  leavePolicyGroupEls.tableBody.html(tableHtml);

  // Update footer counts
  $("#leaveGroupShowingCount").text(leavePolicyStore.groupDetails.length);
  $("#leaveGroupTotalCount").text(leavePolicyStore.total);

  // Update selected badge
  if (leavePolicyStore.selectedIds.length > 1) {
    $("#leaveGroupSelectedBadge").show();
    $("#leaveGroupSelectedCount").text(leavePolicyStore.selectedIds.length);
  } else {
    $("#leaveGroupSelectedBadge").hide();
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
  if (!leavePolicyGroupEls.filterModal || !leavePolicyGroupEls.filterModal.length) {
    // Create filter modal if it doesn't exist
    const modalHtml = `
      <div id="leaveGroupFilterModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        leavePolicyStore.isFilterOpen
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }">
        <div id="leaveGroupFilterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div class="auth-filter-modal-panel relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ${
          leavePolicyStore.isFilterOpen ? "translate-x-0" : "translate-x-full"
        }">
          <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Filters</h5>
            <button id="leaveGroupFilterClose" class="cursor-pointer">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="p-4 overflow-y-auto flex-1">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Employee Code</label>
              <input
                type="text"
                id="leaveGroupFilterEmployeeCode"
                placeholder="Enter Employee code"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${escapeHtml(leavePolicyStore.localFilters.employeeCode || "")}"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Designation</label>
              <input
                type="text"
                id="leaveGroupFilterDesignation"
                placeholder="Enter Designation"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${escapeHtml(leavePolicyStore.localFilters.designation || "")}"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Status</label>
              <div class="flex gap-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="leaveGroupFilterStatus"
                    value="active"
                    class="mr-2 accent-[#009333] cursor-pointer"
                    ${leavePolicyStore.localFilters.status === "active" ? "checked" : ""}
                  />
                  Active
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="leaveGroupFilterStatus"
                    value="inactive"
                    class="mr-2 accent-[#009333] cursor-pointer"
                    ${leavePolicyStore.localFilters.status === "inactive" ? "checked" : ""}
                  />
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" id="leaveGroupFilterReset">Reset All</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="leaveGroupFilterApply">Apply</button>
          </div>
        </div>
      </div>
    `;
    $("body").append(modalHtml);
    leavePolicyGroupEls.filterModal = $("#leaveGroupFilterModal");
  } else {
    // Update existing modal
    leavePolicyGroupEls.filterModal
      .toggleClass("opacity-100", leavePolicyStore.isFilterOpen)
      .toggleClass("opacity-0 pointer-events-none", !leavePolicyStore.isFilterOpen);
    leavePolicyGroupEls.filterModal
      .find(".auth-filter-modal-panel")
      .toggleClass("translate-x-0", leavePolicyStore.isFilterOpen)
      .toggleClass("translate-x-full", !leavePolicyStore.isFilterOpen);
  }
}

function updateSelectAllCheckbox() {
  const checkbox = $("#leaveGroupSelectAll");
  if (checkbox.length) {
    checkbox.prop("checked", leavePolicyStore.selectAll);
  }
}

function renderAddGroupModal() {
  if (!leavePolicyGroupEls.addGroupModal || !leavePolicyGroupEls.addGroupModal.length) {
    const modalHtml = `
      <div id="leaveGroupAddGroupModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        leavePolicyStore.isAddGroupOpen
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }">
        <div id="leavePolicyAddGroupBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div class="leave-policy-group-modal-panel relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ${
          leavePolicyStore.isAddGroupOpen ? "translate-x-0" : "translate-x-full"
        }">
          <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Group</h5>
            <button id="leaveGroupAddGroupClose" class="cursor-pointer">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div id="leaveGroupAddGroupContent"></div>
        </div>
      </div>
    `;
    $("body").append(modalHtml);
    leavePolicyGroupEls.addGroupModal = $("#leaveGroupAddGroupModal");
    // Initialize group modal after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (window.initGroupModal) {
        window.initGroupModal("#leaveGroupAddGroupContent");
      }
    }, 50);
  } else {
    leavePolicyGroupEls.addGroupModal
      .toggleClass("opacity-100", leavePolicyStore.isAddGroupOpen)
      .toggleClass("opacity-0 pointer-events-none", !leavePolicyStore.isAddGroupOpen);
    leavePolicyGroupEls.addGroupModal
      .find(".leave-policy-group-modal-panel")
      .toggleClass("translate-x-0", leavePolicyStore.isAddGroupOpen)
      .toggleClass("translate-x-full", !leavePolicyStore.isAddGroupOpen);
  }
}

function renderLeavePolicySidebar() {
  if (!leavePolicyGroupEls.leavePolicyModal || !leavePolicyGroupEls.leavePolicyModal.length) {
    const modalHtml = `
      <div id="leavePolicyModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        leavePolicyStore.isLeavePolicySidebarOpen
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }">
        <div id="leavePolicyBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div class="leave-policy-modal-panel relative w-[750px] mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col ease-in-out ${
          leavePolicyStore.isLeavePolicySidebarOpen
            ? "translate-x-0"
            : "translate-x-full"
        }">
          <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
            <h5 class="text-lg">
              Leave Policy Level for ${escapeHtml(
                leavePolicyStore.selectedStaffForLeavePolicy?.groupName || ""
              )}
            </h5>
            <button id="leavePolicyClose" class="cursor-pointer">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>
          <div id="leavePolicyContent"></div>
        </div>
      </div>
    `;
    $("body").append(modalHtml);
    leavePolicyGroupEls.leavePolicyModal = $("#leavePolicyModal");
    // Initialize leave policy modal after a short delay to ensure DOM is ready
    setTimeout(deferLeavePolicyModalInit, 50);
  } else {
    leavePolicyGroupEls.leavePolicyModal
      .toggleClass("opacity-100", leavePolicyStore.isLeavePolicySidebarOpen)
      .toggleClass("opacity-0 pointer-events-none", !leavePolicyStore.isLeavePolicySidebarOpen);
    leavePolicyGroupEls.leavePolicyModal
      .find(".leave-policy-modal-panel")
      .toggleClass("translate-x-0", leavePolicyStore.isLeavePolicySidebarOpen)
      .toggleClass("translate-x-full", !leavePolicyStore.isLeavePolicySidebarOpen);

    // Update header text
    if (leavePolicyStore.selectedStaffForLeavePolicy) {
      leavePolicyGroupEls.leavePolicyModal
        .find("h5")
        .text(
          `Leave Policy Level for ${leavePolicyStore.selectedStaffForLeavePolicy.groupName || ""}`
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
window.leavePolicyModule = {
  renderLeavePolicy,
  fetchLeavePolicy,
  renderModals,
  getStore: () => leavePolicyStore,
};
})();
