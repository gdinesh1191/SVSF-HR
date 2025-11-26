// Vanilla JS implementation of the Shift Approval page converted from
// the original React/Next.js components. This controls the shift
// approval list table, filters, delete, and approve/reject actions.

(function () {
  const root = document.getElementById("shift-approval-root");
  if (!root) return;

  /** @type {Array<{id:string,shift_id:string,userID:string,fromDate:string,toDate:string,totalDays:string,remarks:string}>} */
  let shiftData = [];
  let selectedIds = new Set();
  let deletedIds = new Set();

  let filters = {};

  // --- Dummy data (used instead of APIs) ---
  const dummyShiftData = [
    {
      id: "1",
      shift_id: "SHIFT-001",
      userID: "101",
      fromDate: "2025-11-01",
      toDate: "2025-11-05",
      totalDays: "5",
      remarks: "Night shift approval for project deadline",
    },
    {
      id: "2",
      shift_id: "SHIFT-002",
      userID: "102",
      fromDate: "2025-11-03",
      toDate: "2025-11-04",
      totalDays: "2",
      remarks: "Swap to morning shift due to travel",
    },
    {
      id: "3",
      shift_id: "SHIFT-003",
      userID: "101",
      fromDate: "2025-11-10",
      toDate: "2025-11-12",
      totalDays: "3",
      remarks: "Temporary shift change for training",
    },
  ];

  const dummyShiftOptions = [
    { id: "SHIFT-001", name: "Night Shift" },
    { id: "SHIFT-002", name: "Morning Shift" },
    { id: "SHIFT-003", name: "Evening Shift" },
  ];

  const dummyStaffOptions = [
    { id: "101", staff_name: "John Doe" },
    { id: "102", staff_name: "Jane Smith" },
    { id: "103", staff_name: "Alex Johnson" },
  ];

  // DOM refs
  const tableBody = document.getElementById("shift-approval-table-body");
  const selectAllEl = document.getElementById("shift-approval-select-all");
  const visibleCountEl = document.getElementById("shift-approval-visible-count");
  const totalCountEl = document.getElementById("shift-approval-total-count");
  const selectedBadgeEl = document.getElementById("shift-approval-selected-badge");

  const deleteBtn = document.getElementById("shift-approval-delete-btn");
  const filterOpenBtn = document.getElementById("shift-approval-open-filter-btn");

  const filterSidebar = document.getElementById("shift-approval-filter-sidebar");
  const filterPanel = document.getElementById("shift-approval-filter-panel");
  const filterBackdrop = document.getElementById("shift-approval-filter-backdrop");
  const filterCloseBtn = document.getElementById("shift-approval-filter-close-btn");
  const filterResetBtn = document.getElementById("shift-approval-filter-reset-btn");
  const filterApplyBtn = document.getElementById("shift-approval-filter-apply-btn");

  const filterFromDate = document.getElementById("shift-filter-fromDate");
  const filterToDate = document.getElementById("shift-filter-toDate");
  const filterShiftId = document.getElementById("shift-filter-shiftId");
  const filterStaff = document.getElementById("shift-filter-staff");

  // View / approve / reject modal
  const viewModal = document.getElementById("shift-approval-view-modal");
  const viewModalBackdrop = document.getElementById("shift-approval-view-backdrop");
  const viewModalCloseBtn = document.getElementById("shift-approval-view-close-btn");
  const viewSummaryEl = document.getElementById("shift-approval-view-summary");
  const viewIdEl = document.getElementById("shift-approval-view-id");
  const remarksInput = document.getElementById("shift-approval-remarks");
  const approveBtn = document.getElementById("shift-approval-approve-btn");
  const rejectBtn = document.getElementById("shift-approval-reject-btn");

  let selectedPermission = null;

  // Helper: AJAX wrapper using jQuery if available
  function postJSON(url, data, onSuccess, onError, always) {
    if (typeof $ === "undefined" || !$.ajax) {
      if (typeof onError === "function") {
        onError(new Error("jQuery $.ajax is not available"));
      }
      if (typeof always === "function") always();
      return;
    }
    $.ajax({
      url,
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(data || {}),
    })
      .done(function (resp) {
        if (typeof onSuccess === "function") onSuccess(resp);
      })
      .fail(function (jq, textStatus) {
        if (typeof onError === "function") onError(textStatus || "Request failed");
      })
      .always(function () {
        if (typeof always === "function") always();
      });
  }

  function showToastSafe(message, type) {
    if (typeof showToast === "function") {
      showToast(message, type || "info");
    } else {
      console.log(type ? "[" + type + "]" : "", message);
    }
  }

  function applyFiltersArray() {
    // Simple client-side filtering on dummy data
    let rows = shiftData.slice();

    if (filters.fromDate) {
      rows = rows.filter(function (row) {
        return !row.fromDate || row.fromDate >= filters.fromDate;
      });
    }

    if (filters.toDate) {
      rows = rows.filter(function (row) {
        return !row.toDate || row.toDate <= filters.toDate;
      });
    }

    if (filters.shift_id) {
      rows = rows.filter(function (row) {
        return row.shift_id === filters.shift_id;
      });
    }

    if (filters.staff_id) {
      rows = rows.filter(function (row) {
        return String(row.userID) === String(filters.staff_id);
      });
    }

    return rows;
  }

  function renderTable() {
    if (!tableBody) return;

    const rows = applyFiltersArray();
    tableBody.innerHTML = "";

    rows.forEach(function (row, index) {
      const tr = document.createElement("tr");
      const isSelected = selectedIds.has(row.id);
      const isDeleted = deletedIds.has(row.id);

      tr.className =
        " hover:bg-[#f5f7f9] text-sm cursor-pointer group transition-all duration-500 ease-in-out transform " +
        (isSelected ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : "") +
        (isDeleted ? " opacity-0 scale-95" : "");

      // Checkbox
      const tdCheck = document.createElement("td");
      tdCheck.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.className = "form-check accent-[#009333]";
      cb.checked = isSelected;
      cb.addEventListener("change", function () {
        if (cb.checked) {
          selectedIds.add(row.id);
        } else {
          selectedIds.delete(row.id);
        }
        updateSelectionUI();
      });
      tdCheck.appendChild(cb);

      // S.No
      const tdNo = document.createElement("td");
      tdNo.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%] text-center";
      const wrapper = document.createElement("div");
      wrapper.className = "flex justify-between items-center";
      const leftSpan = document.createElement("span");
      const centerSpan = document.createElement("span");
      centerSpan.className = "text-center";
      centerSpan.textContent = String(index + 1);
      const rightSpan = document.createElement("span");
      rightSpan.className = "cursor-pointer";
      rightSpan.innerHTML =
        '<i class="ri-pencil-fill edit-icon opacity-0 group-hover:opacity-100"></i>';
      wrapper.appendChild(leftSpan);
      wrapper.appendChild(centerSpan);
      wrapper.appendChild(rightSpan);
      tdNo.appendChild(wrapper);

      // Shift ID
      const tdShiftId = document.createElement("td");
      tdShiftId.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[20%]";
      tdShiftId.innerHTML =
        '<div class="text-sm font-medium text-gray-900">' +
        (row.shift_id || "") +
        "</div>";

      // From Date
      const tdFromDate = document.createElement("td");
      tdFromDate.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[12%]";
      tdFromDate.innerHTML =
        '<div class="text-sm text-gray-900">' +
        (row.fromDate || "") +
        "</div>";

      // To Date
      const tdToDate = document.createElement("td");
      tdToDate.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[13%]";
      tdToDate.innerHTML =
        '<div class="text-sm text-gray-900">' +
        (row.toDate || "") +
        "</div>";

      // Total Days
      const tdTotal = document.createElement("td");
      tdTotal.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[13%]";
      tdTotal.innerHTML =
        '<div class="text-sm text-gray-900">' +
        (row.fromDate || "") +
        " - " +
        (row.toDate || "") +
        '<br><span class="text-xs text-gray-500">(' +
        (row.totalDays || "") +
        ")</span></div>";

      // Remarks
      const tdRemarks = document.createElement("td");
      tdRemarks.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]";
      tdRemarks.innerHTML =
        '<div class="text-sm text-gray-900">' +
        (row.remarks || "") +
        "</div>";

      // Action
      const tdAction = document.createElement("td");
      tdAction.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[10%]";
      const statusSpan = document.createElement("span");
      statusSpan.className =
        "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 cursor-pointer";
      statusSpan.textContent = "status";
      statusSpan.addEventListener("click", function () {
        openViewModal(row);
      });
      tdAction.appendChild(statusSpan);

      tr.appendChild(tdCheck);
      tr.appendChild(tdNo);
      tr.appendChild(tdShiftId);
      tr.appendChild(tdFromDate);
      tr.appendChild(tdToDate);
      tr.appendChild(tdTotal);
      tr.appendChild(tdRemarks);
      tr.appendChild(tdAction);

      tableBody.appendChild(tr);
    });

    if (visibleCountEl) visibleCountEl.textContent = String(rows.length);
    if (totalCountEl) totalCountEl.textContent = String(shiftData.length);

    updateSelectionUI();
  }

  function updateSelectionUI() {
    const selectedCount = selectedIds.size;

    // Keep header "select all" in sync
    if (selectAllEl) {
      const rows = applyFiltersArray();
      selectAllEl.checked =
        rows.length > 0 && rows.every((row) => selectedIds.has(row.id));
    }

    if (!selectedBadgeEl) return;

    if (selectedCount > 1) {
      selectedBadgeEl.textContent = selectedCount + " items selected";
      selectedBadgeEl.classList.remove("hidden");
    } else {
      selectedBadgeEl.classList.add("hidden");
    }
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

  function openViewModal(row) {
    selectedPermission = row;
    if (!viewModal || !viewSummaryEl || !viewIdEl || !remarksInput) return;

    viewSummaryEl.textContent = row.shift_id || "";
    viewIdEl.textContent = row.id || "";
    remarksInput.value = "";

    viewModal.classList.remove("opacity-0", "pointer-events-none");
    viewModal.classList.add("opacity-100");
  }

  function closeViewModal() {
    selectedPermission = null;
    if (!viewModal) return;
    viewModal.classList.add("opacity-0", "pointer-events-none");
    viewModal.classList.remove("opacity-100");
  }

  function fetchShiftOptions() {
    if (!filterShiftId) return;

    // Populate from dummy shift options
    filterShiftId.innerHTML =
      '<option value="">All Shifts</option>' +
      dummyShiftOptions
        .map(function (item) {
          const v = item.id;
          const label = item.name;
          return (
            '<option value="' +
            String(v) +
            '">' +
            String(label) +
            "</option>"
          );
        })
        .join("");
  }

  function fetchStaffOptions() {
    if (!filterStaff) return;

    // Populate from dummy staff options
    filterStaff.innerHTML =
      '<option value="">All Staff</option>' +
      dummyStaffOptions
        .map(function (item) {
          const v = item.id;
          const label = item.staff_name;
          return (
            '<option value="' +
            String(v) +
            '">' +
            String(label) +
            "</option>"
          );
        })
        .join("");
  }

  function buildFilterPayload() {
    const payload = {
      data: {
        userID: 52,
      },
      conditions: [],
    };

    if (filters.fromDate) {
      payload.conditions.push({
        field: "fromDate",
        operator: "=",
        value: filters.fromDate,
      });
    }
    if (filters.toDate) {
      payload.conditions.push({
        field: "toDate",
        operator: "=",
        value: filters.toDate,
      });
    }
    if (filters.shift_id) {
      payload.conditions.push({
        field: "shift_id",
        operator: "=",
        value: filters.shift_id,
      });
    }
    if (filters.staff_id) {
      payload.conditions.push({
        field: "id",
        operator: "=",
        value: filters.staff_id,
      });
    }

    return payload;
  }

  function fetchShiftList() {
    // Use dummy data instead of API
    shiftData = dummyShiftData.map(function (item) {
      return { ...item };
    });
    selectedIds.clear();
    deletedIds.clear();
    renderTable();
  }

  function handleDelete() {
    if (selectedIds.size === 0) {
      showToastSafe("Please select at least one record to delete.", "warning");
      return;
    }

    if (typeof showConfirmationModal === "function") {
      showConfirmationModal({
        title: "Delete Shift List",
        message:
          "Are you sure you want to delete the " +
          (selectedIds.size > 1 ? "records" : "record") +
          "? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
        iconName: "delete",
        onConfirm: function () {
          const ids = Array.from(selectedIds);
          const numericIds = ids.map(function (id) {
            return Number(id);
          });

          // Dummy delete: update local data only
          shiftData = shiftData.filter(function (row) {
            return !numericIds.includes(Number(row.id));
          });
          selectedIds.clear();
          renderTable();
          showToastSafe("Records deleted (dummy data).", "success");
        },
      });
    }
  }

  function handleDecision(type) {
    if (!selectedPermission) return;

    // Dummy status update: just show a toast and close modal
    const msg =
      type === "approve"
        ? "Shift approval approved successfully. (dummy)"
        : "Shift approval rejected. (dummy)";

    showToastSafe(msg, "success");
    closeViewModal();
  }

  // --- Event wiring ---

  if (selectAllEl) {
    selectAllEl.addEventListener("change", function () {
      const checked = !!selectAllEl.checked;
      const rows = applyFiltersArray();
      if (checked) {
        rows.forEach(function (row) {
          selectedIds.add(row.id);
        });
      } else {
        rows.forEach(function (row) {
          selectedIds.delete(row.id);
        });
      }
      renderTable();
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener("click", handleDelete);
  }

  if (filterOpenBtn) {
    filterOpenBtn.addEventListener("click", openFilter);
  }
  if (filterCloseBtn) {
    filterCloseBtn.addEventListener("click", closeFilter);
  }
  if (filterBackdrop) {
    filterBackdrop.addEventListener("click", closeFilter);
  }

  if (filterResetBtn) {
    filterResetBtn.addEventListener("click", function () {
      if (filterFromDate) filterFromDate.value = "";
      if (filterToDate) filterToDate.value = "";
      if (filterShiftId) filterShiftId.value = "";
      if (filterStaff) filterStaff.value = "";
      filters = {};
      fetchShiftList();
    });
  }

  if (filterApplyBtn) {
    filterApplyBtn.addEventListener("click", function () {
      filters = {
        fromDate: filterFromDate ? filterFromDate.value || "" : "",
        toDate: filterToDate ? filterToDate.value || "" : "",
        shift_id: filterShiftId ? filterShiftId.value || "" : "",
        staff_id: filterStaff ? filterStaff.value || "" : "",
      };
      fetchShiftList();
      closeFilter();
    });
  }

  if (viewModalCloseBtn) {
    viewModalCloseBtn.addEventListener("click", closeViewModal);
  }
  if (viewModalBackdrop) {
    viewModalBackdrop.addEventListener("click", closeViewModal);
  }

  if (approveBtn) {
    approveBtn.addEventListener("click", function () {
      handleDecision("approve");
    });
  }
  if (rejectBtn) {
    rejectBtn.addEventListener("click", function () {
      handleDecision("reject");
    });
  }

  // --- Initial load ---
  fetchShiftOptions();
  fetchStaffOptions();
  fetchShiftList();
})(); 


