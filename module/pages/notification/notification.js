// Vanilla JS implementation of the Notifications page converted from
// the original React/Next.js components. This controls tabs, the
// notification list table, the create-notification form, filters,
// and toast / confirmation using the shared utilities.

(function () {
  const tabsRoot = document.getElementById("notification-tabs");
  if (!tabsRoot) return;

  // --- State ---
  let activeTab = "notification-list"; // "notification-list" | "new-notification"

  /** @type {Array<{id:string,department:string,subDepartment:string,fromDate:string,toDate:string,remarks:string}>} */
  let notifications = [];

  let selectedIds = new Set();

  const filters = {
    search: "",
    month: "",
    department: "",
    subDepartment: "",
    fromDate: "",
    toDate: "",
  };

  // --- DOM refs ---
  const notificationListSection = document.getElementById(
    "notification-list-section"
  );
  const newNotificationSection = document.getElementById(
    "new-notification-section"
  );
  const notificationListFooter = document.getElementById(
    "notification-list-footer"
  );
  const newNotificationFooter = document.getElementById(
    "new-notification-footer"
  );

  const visibleCountEl = document.getElementById(
    "notification-visible-count"
  );
  const totalCountEl = document.getElementById("notification-total-count");
  const countBadgeEl = document.getElementById("notification-list-count");
  const selectedBadgeEl = document.getElementById(
    "notification-selected-badge"
  );

  const tableBody = document.getElementById("notification-table-body");
  const selectAllEl = document.getElementById("notification-select-all");
  const searchInput = document.getElementById("notification-search");
  const monthFilterInput = document.getElementById(
    "notification-month-filter"
  );

  // Form
  const formEl = document.getElementById("notification-form");
  const departmentSelect = document.getElementById("notification-department");
  const subDepartmentSelect = document.getElementById(
    "notification-subDepartment"
  );
  const fromDateInput = document.getElementById("notification-fromDate");
  const toDateInput = document.getElementById("notification-toDate");
  const messageInput = document.getElementById(
    "notification-message"
  );
  const formErrorEl = document.getElementById("notification-form-error");
  const submitBtn = document.getElementById("notification-submit-btn");
  const cancelBtn = document.getElementById("notification-cancel-btn");

  // Filter sidebar
  const filterSidebar = document.getElementById(
    "notification-filter-sidebar"
  );
  const filterPanel = document.getElementById("notification-filter-panel");
  const filterBackdrop = document.getElementById(
    "notification-filter-backdrop"
  );
  const filterOpenBtn = document.getElementById(
    "notification-open-filter-btn"
  );
  const filterCloseBtn = document.getElementById(
    "notification-filter-close-btn"
  );
  const filterApplyBtn = document.getElementById(
    "notification-filter-apply-btn"
  );
  const filterResetBtn = document.getElementById(
    "notification-filter-reset-btn"
  );
  const filterDepartment = document.getElementById(
    "filter-notification-department"
  );
  const filterSubDepartment = document.getElementById(
    "filter-notification-subDepartment"
  );
  const filterFromDate = document.getElementById(
    "filter-notification-fromDate"
  );
  const filterToDate = document.getElementById(
    "filter-notification-toDate"
  );

  // --- Helpers ---

  function applyFilters(list) {
    return list.filter((n) => {
      if (filters.search) {
        const s = filters.search.toLowerCase();
        if (
          !(
            n.department.toLowerCase().includes(s) ||
            n.subDepartment.toLowerCase().includes(s) ||
            n.remarks.toLowerCase().includes(s)
          )
        ) {
          return false;
        }
      }

      if (filters.month) {
        // filters.month is "YYYY-MM"; fromDate is "YYYY-MM-DD" (or similar)
        if (!n.fromDate.startsWith(filters.month)) return false;
      }

      if (filters.department && n.department !== filters.department) {
        return false;
      }

      if (
        filters.subDepartment &&
        n.subDepartment !== filters.subDepartment
      ) {
        return false;
      }

      if (filters.fromDate && n.fromDate < filters.fromDate) {
        return false;
      }

      if (filters.toDate && n.toDate > filters.toDate) {
        return false;
      }

      return true;
    });
  }

  function renderNotifications() {
    if (!tableBody) return;

    const filtered = applyFilters(notifications);

    tableBody.innerHTML = "";

    filtered.forEach((rec, index) => {
      const tr = document.createElement("tr");
      const isSelected = selectedIds.has(rec.id);
      tr.className =
        "hover:bg-[#f5f7f9] text-sm cursor-pointer group transition-all duration-300 ease-in-out " +
        (isSelected ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : "");

      // checkbox
      const tdCheck = document.createElement("td");
      tdCheck.className =
        "border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.className = "form-check accent-[#009333]";
      cb.checked = isSelected;
      cb.addEventListener("change", () => {
        if (cb.checked) {
          selectedIds.add(rec.id);
        } else {
          selectedIds.delete(rec.id);
        }
        updateSelectionUI();
      });
      tdCheck.appendChild(cb);

      // S.no + edit icon
      const tdNo = document.createElement("td");
      tdNo.className =
        "border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center";
      const wrapper = document.createElement("div");
      wrapper.className = "flex justify-between items-center";
      const leftSpan = document.createElement("span");
      const centerSpan = document.createElement("span");
      centerSpan.className = "text-center";
      centerSpan.textContent = String(index + 1);
      const editSpan = document.createElement("span");
      editSpan.className = "cursor-pointer";
      editSpan.innerHTML =
        '<i class="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100"></i>';
      editSpan.addEventListener("click", () => {
        if (typeof showToast === "function") {
          showToast("Edit clicked for ID " + rec.id, "info");
        } else {
          console.log("Edit clicked for ID " + rec.id);
        }
      });
      wrapper.appendChild(leftSpan);
      wrapper.appendChild(centerSpan);
      wrapper.appendChild(editSpan);
      tdNo.appendChild(wrapper);

      const tdDept = document.createElement("td");
      tdDept.className =
        "border-r border-b border-[#ebeff3] p-[0.3rem] w-[20%]";
      tdDept.innerHTML =
        '<div class="text-sm font-medium text-gray-900">' +
        (rec.department || "") +
        "</div>";

      const tdSubDept = document.createElement("td");
      tdSubDept.className =
        "border-r border-b border-[#ebeff3] p-[0.3rem] w-[20%]";
      tdSubDept.innerHTML =
        '<div class="text-sm font-medium text-gray-900">' +
        (rec.subDepartment || "") +
        "</div>";

      const tdFrom = document.createElement("td");
      tdFrom.className =
        "border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]";
      tdFrom.innerHTML =
        '<div class="text-sm text-gray-900">' +
        (rec.fromDate || "") +
        "</div>";

      const tdTo = document.createElement("td");
      tdTo.className =
        "border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]";
      tdTo.innerHTML =
        '<div class="text-sm text-gray-900">' + (rec.toDate || "") + "</div>";

      const tdRemarks = document.createElement("td");
      tdRemarks.className =
        "border-r border-b border-[#ebeff3] p-[0.3rem] w-[25%]";
      tdRemarks.innerHTML =
        '<div class="text-sm text-gray-900">' +
        (rec.remarks || "") +
        "</div>";

      tr.appendChild(tdCheck);
      tr.appendChild(tdNo);
      tr.appendChild(tdDept);
      tr.appendChild(tdSubDept);
      tr.appendChild(tdFrom);
      tr.appendChild(tdTo);
      tr.appendChild(tdRemarks);

      tableBody.appendChild(tr);
    });

    if (visibleCountEl) visibleCountEl.textContent = String(filtered.length);
    if (totalCountEl) totalCountEl.textContent = String(notifications.length);
    if (countBadgeEl) countBadgeEl.textContent = String(notifications.length);

    if (selectAllEl) {
      selectAllEl.checked =
        filtered.length > 0 &&
        filtered.every((n) => selectedIds.has(n.id));
    }

    updateSelectionUI();
  }

  function updateSelectionUI() {
    const selectedCount = selectedIds.size;

    // Keep the header "select all" checkbox in sync with row selections
    if (selectAllEl) {
      const filtered = applyFilters(notifications);
      selectAllEl.checked =
        filtered.length > 0 &&
        filtered.every((n) => selectedIds.has(n.id));
    }

    if (!selectedBadgeEl) return;

    if (selectedCount > 1) {
      selectedBadgeEl.textContent = selectedCount + " items selected";
      selectedBadgeEl.classList.remove("hidden");
    } else {
      selectedBadgeEl.classList.add("hidden");
    }
  }

  function setActiveTab(tabId) {
    activeTab = tabId;
    const tabButtons = tabsRoot.querySelectorAll(".notification-tab");
    tabButtons.forEach((btn) => {
      const id = btn.getAttribute("data-tab");
      const closeIcon = btn.querySelector(".close-tab");
      if (id === activeTab) {
        btn.classList.add("bg-[#ebeff3]", "text-[#384551]");
        btn.classList.remove("hover:text-[#6689b8]", "hover:bg-[#f5f7f9]");
        if (closeIcon) {
          closeIcon.classList.remove("hidden");
        }
      } else {
        btn.classList.remove("bg-[#ebeff3]", "text-[#384551]");
        btn.classList.add("hover:text-[#6689b8]", "hover:bg-[#f5f7f9]");
        if (closeIcon) {
          closeIcon.classList.add("hidden");
        }
      }
    });

    if (activeTab === "new-notification") {
      if (newNotificationSection)
        newNotificationSection.classList.remove("hidden");
      if (notificationListSection)
        notificationListSection.classList.add("hidden");
      if (newNotificationFooter)
        newNotificationFooter.classList.remove("hidden");
      if (notificationListFooter)
        notificationListFooter.classList.add("hidden");
    } else {
      if (newNotificationSection)
        newNotificationSection.classList.add("hidden");
      if (notificationListSection)
        notificationListSection.classList.remove("hidden");
      if (newNotificationFooter)
        newNotificationFooter.classList.add("hidden");
      if (notificationListFooter)
        notificationListFooter.classList.remove("hidden");
    }
  }

  function resetForm() {
    if (formEl) formEl.reset();
    if (formErrorEl) {
      formErrorEl.textContent = "";
      formErrorEl.classList.add("hidden");
    }
  }

  function validateForm() {
    if (
      !departmentSelect ||
      !subDepartmentSelect ||
      !fromDateInput ||
      !toDateInput ||
      !messageInput
    )
      return;

    const department = departmentSelect.value;
    const subDepartment = subDepartmentSelect.value;
    const fromDate = fromDateInput.value;
    const toDate = toDateInput.value;
    const message = messageInput.value.trim();

    if (!department || !subDepartment || !fromDate || !toDate || !message) {
      if (formErrorEl) {
        formErrorEl.textContent = "Please fill all required fields.";
        formErrorEl.classList.remove("hidden");
      }
      return null;
    }

    if (toDate < fromDate) {
      if (formErrorEl) {
        formErrorEl.textContent =
          "To Date cannot be before From Date.";
        formErrorEl.classList.remove("hidden");
      }
      return null;
    }

    if (formErrorEl) {
      formErrorEl.textContent = "";
      formErrorEl.classList.add("hidden");
    }

    return {
      department,
      subDepartment,
      fromDate,
      toDate,
      remarks: message,
    };
  }

  function openFilter() {
    if (!filterSidebar || !filterPanel) return;
    filterSidebar.classList.remove("pointer-events-none", "opacity-0");
    filterSidebar.classList.add("opacity-100");
    filterPanel.classList.remove("translate-x-full");
  }

  function closeFilter() {
    if (!filterSidebar || !filterPanel) return;
    filterSidebar.classList.add("pointer-events-none", "opacity-0");
    filterSidebar.classList.remove("opacity-100");
    filterPanel.classList.add("translate-x-full");
  }

  function populateSelect(select, items, placeholder) {
    if (!select) return;
    select.innerHTML = "";
    const defaultOpt = document.createElement("option");
    defaultOpt.value = "";
    defaultOpt.textContent = placeholder || "Select";
    select.appendChild(defaultOpt);
    items.forEach((item) => {
      const opt = document.createElement("option");
      opt.value = item.value;
      opt.textContent = item.label;
      select.appendChild(opt);
    });
  }

  function fetchOptions(token, onSuccess) {
    if (typeof $ === "undefined" || !$.ajax) {
      if (typeof onSuccess === "function") onSuccess([]);
      return;
    }
    $.ajax({
      url: "/options/get",
      method: "POST",
      dataType: "json",
      data: { token },
    })
      .done((response) => {
        if (response && response.status === 1 && Array.isArray(response.data)) {
          const mapped = response.data.map((item, index) => ({
            value: String(item.id ?? index + 1),
            label: item.name ?? item.title ?? `Option ${index + 1}`,
          }));
          if (typeof onSuccess === "function") onSuccess(mapped);
        } else if (typeof onSuccess === "function") {
          onSuccess([]);
        }
      })
      .fail(() => {
        if (typeof onSuccess === "function") onSuccess([]);
      });
  }

  function hydrateFallbackNotifications() {
    notifications = [
      {
        id: "1",
        department: "Litigation",
        subDepartment: "Civil",
        fromDate: "2025-11-01",
        toDate: "2025-11-10",
        remarks: "Court notices for November schedule.",
      },
      {
        id: "2",
        department: "Corporate Advisory",
        subDepartment: "Mergers",
        fromDate: "2025-11-05",
        toDate: "2025-11-15",
        remarks: "Policy update for merger teams.",
      },
    ];
  }

  function fetchNotifications() {
    // Try to fetch from backend; fall back to static data on error.
    if (typeof $ === "undefined" || !$.ajax) {
      hydrateFallbackNotifications();
      renderNotifications();
      return;
    }

    $.ajax({
      url: "/notification/getNotification",
      method: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        columns: [
          "id",
          "department",
          "subDepartment",
          "fromDate",
          "toDate",
          "remarks",
        ],
        page: 1,
        limit: 100,
        conditions: [],
      }),
    })
      .done((response) => {
        if (response && response.status === 1 && Array.isArray(response.data)) {
          notifications = response.data.map((item, index) => ({
            id: String(item.id ?? index + 1),
            department: item.department || "",
            subDepartment: item.subDepartment || "",
            fromDate: item.fromDate || "",
            toDate: item.toDate || "",
            remarks: item.remarks || "",
          }));
        } else {
          hydrateFallbackNotifications();
          if (typeof showToast === "function") {
            showToast(
              response?.message ||
                "Failed to load notifications. Showing sample data.",
              "warning"
            );
          }
        }
      })
      .fail(() => {
        hydrateFallbackNotifications();
        if (typeof showToast === "function") {
          showToast(
            "Failed to load notifications. Showing sample data.",
            "warning"
          );
        }
      })
      .always(() => {
        renderNotifications();
      });
  }

  // --- Event wiring ---

  // Tabs
  tabsRoot.addEventListener("click", function (e) {
    const btn = e.target.closest("button.notification-tab");
    if (!btn) return;
    const tabId = btn.getAttribute("data-tab");
    if (!tabId) return;
    setActiveTab(tabId);
  });

  // Close icons on tabs -> go back to Notification List
  const closeIcons = tabsRoot.querySelectorAll(".close-tab");
  closeIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      setActiveTab("notification-list");
    });
  });

  // Select all
  if (selectAllEl) {
    selectAllEl.addEventListener("change", function () {
      const checked = !!selectAllEl.checked;
      const filtered = applyFilters(notifications);
      if (checked) {
        filtered.forEach((n) => selectedIds.add(n.id));
      } else {
        filtered.forEach((n) => selectedIds.delete(n.id));
      }
      renderNotifications();
    });
  }

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      filters.search = searchInput.value || "";
      renderNotifications();
    });
  }

  // Month filter
  if (monthFilterInput) {
    monthFilterInput.addEventListener("change", function () {
      filters.month = monthFilterInput.value || "";
      renderNotifications();
    });
  }

  // Delete button
  const deleteBtn = document.getElementById("notification-delete-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      if (selectedIds.size === 0) {
        if (typeof showToast === "function") {
          showToast("Please select at least one record to delete.", "warning");
        }
        return;
      }

      if (typeof showConfirmationModal === "function") {
        showConfirmationModal({
          title: "Delete Notification",
          message:
            "Are you sure you want to delete the selected notification(s)? This action cannot be undone.",
          confirmText: "Delete",
          cancelText: "Cancel",
          iconName: "delete",
          onConfirm: () => {
            notifications = notifications.filter((n) => !selectedIds.has(n.id));
            selectedIds.clear();
            renderNotifications();
            if (typeof showToast === "function") {
              showToast("Notification(s) deleted successfully!", "success");
            }
          },
        });
      } else {
        notifications = notifications.filter((n) => !selectedIds.has(n.id));
        selectedIds.clear();
        renderNotifications();
      }
    });
  }

  // Print / Summary / Download – stubs
  const printBtn = document.getElementById("notification-print-btn");
  const summaryBtn = document.getElementById("notification-summary-btn");
  const downloadBtn = document.getElementById("notification-download-btn");

  if (printBtn) {
    printBtn.addEventListener("click", function () {
      if (typeof showToast === "function") {
        showToast("Print triggered (implement as needed).", "info");
      }
      console.log("Print notifications:", applyFilters(notifications));
    });
  }

  if (summaryBtn) {
    summaryBtn.addEventListener("click", function () {
      if (typeof showToast === "function") {
        showToast("Summary triggered (implement as needed).", "info");
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      if (typeof showToast === "function") {
        showToast("Download triggered (implement as needed).", "info");
      }
      console.log("Download notifications:", applyFilters(notifications));
    });
  }

  // Form submit
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const data = validateForm();
      if (!data) return;

      const newId = String(
        notifications.length
          ? Number(notifications[notifications.length - 1].id) + 1
          : 1
      );
      notifications.push({ id: newId, ...data });
      renderNotifications();

      if (typeof showToast === "function") {
        showToast("Notification submitted successfully!", "success");
      }

      resetForm();
      setActiveTab("notification-list");
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
      resetForm();
      if (typeof showToast === "function") {
        showToast("Form cleared.", "info");
      }
    });
  }

  // Filter sidebar
  if (filterOpenBtn) filterOpenBtn.addEventListener("click", openFilter);
  if (filterCloseBtn) filterCloseBtn.addEventListener("click", closeFilter);
  if (filterBackdrop) filterBackdrop.addEventListener("click", closeFilter);

  if (filterApplyBtn) {
    filterApplyBtn.addEventListener("click", function () {
      filters.department = filterDepartment ? filterDepartment.value : "";
      filters.subDepartment = filterSubDepartment
        ? filterSubDepartment.value
        : "";
      filters.fromDate = filterFromDate ? filterFromDate.value : "";
      filters.toDate = filterToDate ? filterToDate.value : "";

      renderNotifications();
      closeFilter();
    });
  }

  if (filterResetBtn) {
    filterResetBtn.addEventListener("click", function () {
      if (filterDepartment) filterDepartment.value = "";
      if (filterSubDepartment) filterSubDepartment.value = "";
      if (filterFromDate) filterFromDate.value = "";
      if (filterToDate) filterToDate.value = "";

      filters.department = "";
      filters.subDepartment = "";
      filters.fromDate = "";
      filters.toDate = "";
      renderNotifications();
    });
  }

  // --- Initial load ---

  // Initialize selects
  fetchOptions("department", function (options) {
    populateSelect(
      departmentSelect,
      options,
      "Select Department"
    );
    populateSelect(
      filterDepartment,
      options,
      "All Departments"
    );
  });

  fetchOptions("subDepartment", function (options) {
    populateSelect(
      subDepartmentSelect,
      options,
      "Select Sub-Department"
    );
    populateSelect(
      filterSubDepartment,
      options,
      "All Sub-Departments"
    );
  });

  setActiveTab("notification-list");
  fetchNotifications();
})();


