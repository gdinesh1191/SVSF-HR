// Authorization Details Table Component - Plain JavaScript
(function () {
  "use strict";

  const authorizationStore = {
    authorization: [],
    selectedIds: [],
    selectAll: false,
    loading: false,
    initialLoading: false,
    isFilterOpen: false,
    filters: {},
    localFilters: {},
    isAuthorizationSidebarOpen: false,
    selectedStaffForAuthorization: null,
    staffSuggestions: [],
    authorizationList: [],
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
    { id: "name", label: "Name", visible: true },
    { id: "level1", label: "Level 1", visible: true },
    { id: "level2", label: "Level 2", visible: true },
    { id: "level3", label: "Level 3", visible: true },
    { id: "approved", label: "Approved", visible: false },
  ];

  const dummyAuthorizationData = [
    {
        id: 101,
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
      id: 102,
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
      id: 103,
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
      id: 104,
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
      id: 105,
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

  let authorizationData = [...dummyAuthorizationData];
  const AUTHORIZATION_PAGE_SIZE = 30;

  // Register columns with parent module
  if (window.staffModule) {
    window.staffModule.registerColumns("authorizationDetails", defaultColumns);
  }

  function getOrderedVisibleFields() {
    const fields =
      window.staffModule && window.staffModule.getFields("authorizationDetails");
    const source = fields && fields.length > 0 ? fields : defaultColumns;
    return source.filter((f) => f.visible);
  }

  function getWidthClass(id) {
    switch (id) {
      case "name":
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

  function debounceSearch(term) {
    clearTimeout(authorizationStore.debounceTimer);
    authorizationStore.debounceTimer = setTimeout(() => {
      authorizationStore.debouncedSearchTerm = term;
      authorizationStore.page = 1;
      fetchAuthorization(1);
    }, 300);
  }

  function fetchAuthorization(page = 1) {
    if (page === 1) {
      authorizationStore.initialLoading = true;
      authorizationStore.authorization = [];
      renderAuthorizationDetails();
    } else {
      authorizationStore.loading = true;
    }

    const searchTerm =
      (authorizationStore.debouncedSearchTerm || "").toLowerCase();
    const filtered = authorizationData.filter((staff) =>
      staff.staff_name.toLowerCase().includes(searchTerm)
    );

    const startIndex = (page - 1) * AUTHORIZATION_PAGE_SIZE;
    const newStaff = filtered.slice(
      startIndex,
      startIndex + AUTHORIZATION_PAGE_SIZE
    );

    setTimeout(() => {
      authorizationStore.authorization =
        page === 1
          ? newStaff
          : [...authorizationStore.authorization, ...newStaff];
      authorizationStore.hasMore =
        startIndex + AUTHORIZATION_PAGE_SIZE < filtered.length;
      authorizationStore.total = filtered.length;
      authorizationStore.loading = false;
      authorizationStore.initialLoading = false;

      if (window.staffModule && window.staffModule.updateCount) {
        window.staffModule.updateCount(
          "authorizationDetails",
          authorizationStore.authorization.length
        );
      }

      renderAuthorizationDetails();
    }, 200);
  }

  function fetchStaffName() {
    authorizationStore.staffSuggestions = authorizationData.map((staff) => ({
      id: staff.id,
      name: staff.staff_name,
      designation: staff.DESIGNATION,
      department: staff.DEPARTMENT,
      phone_number: staff.phone_number,
      gender: staff.gender,
      address_line_1: staff.address_line_1,
      joining_date: staff.joining_date,
      dob: staff.dob,
    }));
  }

  function renderAuthorizationDetails() {
    const container = $("#authorizationDetailsContent");
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
    bindAuthorizationFilterModalEvents();
    setupInfiniteScroll();
  }

  function renderLoadingSpinner() {
    if (!authorizationStore.initialLoading) return "";
    return `
      <div id="authorizationLoader" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
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
          <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="authorizationDeleteBtn">
            <i class="ri-delete-bin-6-line mr-1"></i> Delete
          </button>
        </div>
      </div>
      <div class="flex items-center relative space-x-2">
        <input
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]"
          type="text"
          id="authorizationSearch"
          placeholder="Enter Staff Name"
          value="${authorizationStore.searchTerm || ""}"
        />
        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="authorizationFilterBtn">
          <i class="ri-sort-desc"></i>
        </button>
      </div>
    `;
  }

  function renderTable(orderedFields) {
    const thead = `
      <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]" id="authorizationThead">
        <tr>
          <th class="border-r border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
            <input type="checkbox" id="authorizationSelectAll" class="form-check accent-[#009333]" ${
              authorizationStore.selectAll ? "checked" : ""
            } />
          </th>
          <th class="border-r border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
            <div class="flex justify-center items-center gap-1">
              <span>S.No.</span>
            </div>
          </th>
          ${orderedFields
            .map(
              (f) => `
            <th class="border-r border-[#ebeff3] p-[0.3rem] ${getWidthClass(f.id)}">${escapeHtml(f.label)}</th>
          `
            )
            .join("")}
        </tr>
      </thead>
    `;

    let tbody = "";
    if (authorizationStore.initialLoading) {
      tbody = renderShimmerRows(orderedFields.length);
    } else if (authorizationStore.authorization.length === 0) {
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
      tbody = authorizationStore.authorization
        .map((auth, index) => renderAuthRow(auth, index, orderedFields))
        .join("");
    }

    return `
      <div class="bg-[#ebeff3]">
        ${authorizationStore.selectedIds.length > 1 ? renderSelectedBadge() : ""}
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

  function renderAuthRow(auth, index, orderedFields) {
    const isSelected = authorizationStore.selectedIds.includes(auth.id);
    const isDeleted = authorizationStore.deletedIds.includes(auth.id);
    const isLastRow = index === authorizationStore.authorization.length - 1;

    return `
      <tr
        data-auth-id="${auth.id}"
        data-last-row="${isLastRow ? "true" : "false"}"
        class="hover:bg-[#f5f7f9] text-sm cursor-pointer group transition-all duration-500 ease-in-out transform ${
          isSelected ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : ""
        } ${isDeleted ? "opacity-0 scale-95" : ""}"
      >
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">
          <input
            type="checkbox"
            class="form-check accent-[#009333] auth-checkbox"
            data-auth-id="${auth.id}"
            ${isSelected ? "checked" : ""}
          />
        </td>
        <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%] text-center">
          <div class="flex justify-between items-center">
            <span></span>
            <span class="text-center">${index + 1}</span>
            <span class="cursor-pointer edit-auth" data-auth-id="${auth.id}">
              <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>
            </span>
          </div>
        </td>
        ${orderedFields.map((f) => renderFieldCell(auth, f)).join("")}
      </tr>
    `;
  }

  function renderFieldCell(auth, field) {
    switch (field.id) {
      case "name":
        return `
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[20%]">
            <div
              class="flex items-center gap-2 cursor-pointer view-authorization"
              data-auth-id="${auth.id}"
            >
              <img
                src="/images/user.png"
                alt="avatar"
                class="w-8 h-8 rounded-full"
              />
              <div>
                <div class="text-sm font-medium text-gray-900">
                  ${escapeHtml(auth.staff_name || "")}
                </div>
                <div class="text-sm text-gray-500">
                  ${escapeHtml(auth.userID || "")}
                </div>
              </div>
            </div>
          </td>
        `;
      case "level1":
      case "level2":
      case "level3":
        return `
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[12%]">
            <div class="text-sm text-gray-900">
              ${escapeHtml(auth.userID || "")}
            </div>
          </td>
        `;
      case "approved":
        return `
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]">
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 cursor-pointer hover:bg-green-200 update-authorization"
              data-auth-id="${auth.id}"
            >
              Update
            </span>
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
          .map(
            () =>
              '<td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>'
          )
          .join("")}
      </tr>
    `
      )
      .join("");
  }

  function renderSelectedBadge() {
    return `
      <div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
        ${authorizationStore.selectedIds.length} items selected
      </div>
    `;
  }

  function renderFooter() {
    return `
      <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
        <span class="text-sm">
          Showing <span class="text-red-600">${authorizationStore.authorization.length}</span> of
          <span class="text-blue-600">${authorizationStore.authorization.length}</span>
        </span>
      </div>
    `;
  }

function renderFilterModal() {
  return `
      <div
        id="authorizationFilterModal"
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
                id="authorizationFilterEmployeeCode"
                value="${authorizationStore.localFilters.employeeCode || ""}"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800">Designation</label>
              <input
                type="text"
                placeholder="Enter Designation"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                id="authorizationFilterDesignation"
                value="${authorizationStore.localFilters.designation || ""}"
              />
            </div>
            <div>
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800">Status</label>
              <div class="flex gap-4">
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="authorizationFilterStatus"
                    value="active"
                    class="mr-2 accent-[#009333] cursor-pointer"
                    ${
                      authorizationStore.localFilters.status === "active"
                        ? "checked"
                        : ""
                    }
                  />
                  Active
                </label>
                <label class="flex items-center">
                  <input
                    type="radio"
                    name="authorizationFilterStatus"
                    value="inactive"
                    class="mr-2 accent-[#009333] cursor-pointer"
                    ${
                      authorizationStore.localFilters.status === "inactive"
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

function populateAuthorizationFilterForm(modal) {
  if (!modal || !modal.length) return;
  modal.find("#authorizationFilterEmployeeCode").val(
    authorizationStore.localFilters.employeeCode || ""
  );
  modal.find("#authorizationFilterDesignation").val(
    authorizationStore.localFilters.designation || ""
  );
  modal
    .find("input[name='authorizationFilterStatus']")
    .prop("checked", false);
  if (authorizationStore.localFilters.status) {
    modal
      .find(
        `input[name='authorizationFilterStatus'][value='${authorizationStore.localFilters.status}']`
      )
      .prop("checked", true);
  }
}

function openAuthorizationFilterModal() {
  const modal = $("#authorizationFilterModal");
  if (!modal.length) return;
  authorizationStore.localFilters = { ...authorizationStore.filters };
  populateAuthorizationFilterForm(modal);
  modal
    .removeClass("opacity-0 pointer-events-none")
    .addClass("opacity-100 pointer-events-auto");
  const panel = modal.find(".filter-panel");
  requestAnimationFrame(() => {
    panel.removeClass("translate-x-full");
  });
}

function closeAuthorizationFilterModal(callback) {
  const modal = $("#authorizationFilterModal");
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

function bindAuthorizationFilterModalEvents() {
  const modal = $("#authorizationFilterModal");
  if (!modal.length) return;

  modal
    .find(".filter-backdrop, .close-filter")
    .off("click")
    .on("click", function () {
      closeAuthorizationFilterModal();
    });

  modal
    .find(".reset-filter")
    .off("click")
    .on("click", function () {
      authorizationStore.localFilters = {};
      authorizationStore.filters = {};
      closeAuthorizationFilterModal(() => renderAuthorizationDetails());
    });

  modal
    .find(".apply-filter")
    .off("click")
    .on("click", function () {
      const employeeCode = modal
        .find("#authorizationFilterEmployeeCode")
        .val()
        ?.trim();
      const designation = modal
        .find("#authorizationFilterDesignation")
        .val()
        ?.trim();
      const status =
        modal
          .find("input[name='authorizationFilterStatus']:checked")
          .val() || "";

      authorizationStore.localFilters = {
        employeeCode: employeeCode || "",
        designation: designation || "",
        status,
      };
      authorizationStore.filters = { ...authorizationStore.localFilters };
      closeAuthorizationFilterModal(() => renderAuthorizationDetails());
    });
}

  function bindEvents() {
    // Search
    $("#authorizationSearch").off("input").on("input", function () {
      authorizationStore.searchTerm = $(this).val();
      debounceSearch(authorizationStore.searchTerm);
    });

    // Select all
    $("#authorizationSelectAll").off("change").on("change", function () {
      const checked = $(this).is(":checked");
      authorizationStore.selectAll = checked;
      authorizationStore.selectedIds = checked
        ? authorizationStore.authorization.map((a) => a.id)
        : [];
      renderAuthorizationDetails();
    });

    // Individual checkbox
    $(document)
      .off("change", ".auth-checkbox")
      .on("change", ".auth-checkbox", function () {
        const authId = parseInt($(this).data("auth-id"));
        if ($(this).is(":checked")) {
          if (!authorizationStore.selectedIds.includes(authId)) {
            authorizationStore.selectedIds.push(authId);
          }
        } else {
          authorizationStore.selectedIds = authorizationStore.selectedIds.filter(
            (id) => id !== authId
          );
        }
        authorizationStore.selectAll =
          authorizationStore.selectedIds.length ===
          authorizationStore.authorization.length;
        renderAuthorizationDetails();
      });

    // View authorization
    $(document)
      .off("click", ".view-authorization, .update-authorization")
      .on(
        "click",
        ".view-authorization, .update-authorization",
        function (event) {
          event.preventDefault();
          event.stopPropagation();
          const authId = $(this).data("auth-id");
          const auth = authorizationStore.authorization.find(
            (a) => a.id === authId
          );
          if (auth) {
            authorizationStore.selectedStaffForAuthorization = auth;
            authorizationStore.isAuthorizationSidebarOpen = true;
            if (
              window.authorizationModalModule &&
              window.authorizationModalModule.show
            ) {
              window.authorizationModalModule.show(
                auth,
                authorizationStore.staffSuggestions,
                authorizationStore.authorizationList
              );
            }
          }
        }
      );

    // Filter events
    $("#authorizationFilterBtn").off("click").on("click", function () {
      openAuthorizationFilterModal();
    });
  }

  function setupInfiniteScroll() {
    if (authorizationStore.observer) {
      authorizationStore.observer.disconnect();
    }

    if (!authorizationStore.loading && authorizationStore.hasMore) {
      const lastRow = $('[data-last-row="true"]');
      if (lastRow.length) {
        authorizationStore.observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              const nextPage = authorizationStore.page + 1;
              authorizationStore.page = nextPage;
              fetchAuthorization(nextPage);
            }
          },
          { threshold: 0.1 }
        );
        authorizationStore.observer.observe(lastRow[0]);
      }
    }
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
    setTimeout(() => {
      fetchStaffName();
      fetchAuthorization(1);
    }, 100);
  });

  // Export module
  window.authorizationDetailsModule = {
    renderAuthorizationDetails,
    getStore: () => authorizationStore,
  };
})();

