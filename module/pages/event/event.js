// Vanilla JS implementation of the Events page converted from the original
// React/Next.js components. This script controls tabs, the event list table,
// the create-event form, filters, and simple toast messages.

(function () {
  const tabsRoot = document.getElementById("event-tabs");
  if (!tabsRoot) return;

  // --- State ---
  let activeTab = "event-list"; // "event-list" | "new-event"

  /** @type {Array<{id:string,date:string,fromTime:string,toTime:string,eventDescription:string}>} */
  let events = [
    {
      id: "1",
      date: "2025-11-01",
      fromTime: "09:00",
      toTime: "10:00",
      eventDescription: "Monthly planning meeting",
    },
    {
      id: "2",
      date: "2025-11-05",
      fromTime: "14:00",
      toTime: "15:30",
      eventDescription: "HR policy review session",
    },
  ];

  let selectedIds = new Set();

  const filters = {
    search: "",
    month: "",
    date: "",
    fromTime: "",
    toTime: "",
    description: "",
  };

  // --- DOM refs ---
  const eventListSection = document.getElementById("event-list-section");
  const newEventSection = document.getElementById("new-event-section");
  const eventListFooter = document.getElementById("event-list-footer");
  const newEventFooter = document.getElementById("new-event-footer");
  const visibleCountEl = document.getElementById("event-visible-count");
  const totalCountEl = document.getElementById("event-total-count");
  const countBadgeEl = document.getElementById("event-list-count");
  const selectedBadgeEl = document.getElementById("event-selected-badge");

  const tableBody = document.getElementById("event-table-body");
  const selectAllEl = document.getElementById("event-select-all");
  const searchInput = document.getElementById("event-search");
  const monthFilterInput = document.getElementById("event-month-filter");

  // Form
  const formEl = document.getElementById("event-form");
  const dateInput = document.getElementById("event-date");
  const fromTimeInput = document.getElementById("event-from-time");
  const toTimeInput = document.getElementById("event-to-time");
  const descInput = document.getElementById("event-description");
  const formErrorEl = document.getElementById("event-form-error");
  const submitBtn = document.getElementById("event-submit-btn");
  const cancelBtn = document.getElementById("event-cancel-btn");

  // Filter sidebar
  const filterSidebar = document.getElementById("event-filter-sidebar");
  const filterPanel = document.getElementById("event-filter-panel");
  const filterBackdrop = document.getElementById("event-filter-backdrop");
  const filterOpenBtn = document.getElementById("event-open-filter-btn");
  const filterCloseBtn = document.getElementById("event-filter-close-btn");
  const filterApplyBtn = document.getElementById("event-filter-apply-btn");
  const filterResetBtn = document.getElementById("event-filter-reset-btn");
  const filterDate = document.getElementById("filter-date");
  const filterFromTime = document.getElementById("filter-from-time");
  const filterToTime = document.getElementById("filter-to-time");
  const filterDescription = document.getElementById("filter-description");

  // Toast
  const toastEl = document.getElementById("event-toast");

  // --- Helpers ---


  function applyFilters(list) {
    return list.filter((e) => {
      if (filters.search) {
        const s = filters.search.toLowerCase();
        if (
          !(
            e.eventDescription.toLowerCase().includes(s) ||
            e.date.includes(s)
          )
        ) {
          return false;
        }
      }
      if (filters.month) {
        // filters.month is "YYYY-MM"; event date is "YYYY-MM-DD"
        if (!e.date.startsWith(filters.month)) return false;
      }
      if (filters.date && e.date !== filters.date) return false;
      if (filters.description) {
        if (!e.eventDescription.toLowerCase().includes(filters.description)) {
          return false;
        }
      }
      // from/to time as simple string compare (HH:mm)
      if (filters.fromTime && e.fromTime < filters.fromTime) return false;
      if (filters.toTime && e.toTime > filters.toTime) return false;
      return true;
    });
  }

  function renderEvents() {
    if (!tableBody) return;

    const filtered = applyFilters(events);

    tableBody.innerHTML = "";

    filtered.forEach((ev, index) => {
      const tr = document.createElement("tr");
      const isSelected = selectedIds.has(ev.id);
      tr.className =
        "hover:bg-[#f5f7f9] text-sm cursor-pointer group transition-all duration-300 ease-in-out " +
        (isSelected ? "bg-[#e5f2fd] hover:bg-[#f5f7f9]" : "");

      // checkbox
      const tdCheck = document.createElement("td");
      tdCheck.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center ";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.className = "form-check accent-[#009333]";
      cb.checked = isSelected;
      cb.addEventListener("change", () => {
        if (cb.checked) {
          selectedIds.add(ev.id);
        } else {
          selectedIds.delete(ev.id);
        }
        updateSelectionUI();
      });
      tdCheck.appendChild(cb);

      // S.no + edit icon
      const tdNo = document.createElement("td");
      tdNo.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center";
      const wrapper = document.createElement("div");
      wrapper.className = "flex justify-between items-center";
      const leftSpan = document.createElement("span");
      const centerSpan = document.createElement("span");
      centerSpan.className = "text-center";
      centerSpan.textContent = String(index + 1);
      const editSpan = document.createElement("span");
      editSpan.className = "cursor-pointer";
      editSpan.innerHTML =
        '<i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>';
      editSpan.addEventListener("click", () => {
        showToast("Edit clicked for ID " + ev.id, "info");
      });
      wrapper.appendChild(leftSpan);
      wrapper.appendChild(centerSpan);
      wrapper.appendChild(editSpan);
      tdNo.appendChild(wrapper);

      const tdDate = document.createElement("td");
      tdDate.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]";
      tdDate.innerHTML =
        '<div class="text-sm font-medium text-gray-900">' + ev.date + "</div>";

      const tdFrom = document.createElement("td");
      tdFrom.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]";
      tdFrom.innerHTML =
        '<div class="text-sm font-medium text-gray-900">' +
        ev.fromTime +
        "</div>";

      const tdTo = document.createElement("td");
      tdTo.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]";
      tdTo.innerHTML =
        '<div class="text-sm text-gray-900">' + ev.toTime + "</div>";

      const tdDesc = document.createElement("td");
      tdDesc.className = "border-r border-b border-[#ebeff3] p-[0.3rem] w-[50%]";
      tdDesc.innerHTML =
        '<div class="text-sm text-gray-900">' +
        ev.eventDescription +
        "</div>";

      tr.appendChild(tdCheck);
      tr.appendChild(tdNo);
      tr.appendChild(tdDate);
      tr.appendChild(tdFrom);
      tr.appendChild(tdTo);
      tr.appendChild(tdDesc);

      tableBody.appendChild(tr);
    });

    // counts
    if (visibleCountEl) visibleCountEl.textContent = String(filtered.length);
    if (totalCountEl) totalCountEl.textContent = String(events.length);
    if (countBadgeEl) countBadgeEl.textContent = String(events.length);

    // select-all checkbox state
    if (selectAllEl) {
      selectAllEl.checked =
        filtered.length > 0 && filtered.every((ev) => selectedIds.has(ev.id));
    }

    updateSelectionUI();
  }

  function updateSelectionUI() {
    const selectedCount = selectedIds.size;

    // Keep the header "select all" checkbox in sync with row selections
    if (selectAllEl) {
      const filtered = applyFilters(events);
      selectAllEl.checked =
        filtered.length > 0 && filtered.every((ev) => selectedIds.has(ev.id));
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
    const tabButtons = tabsRoot.querySelectorAll(".event-tab");
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

    if (activeTab === "new-event") {
      if (newEventSection) newEventSection.classList.remove("hidden");
      if (eventListSection) eventListSection.classList.add("hidden");
      if (newEventFooter) newEventFooter.classList.remove("hidden");
      if (eventListFooter) eventListFooter.classList.add("hidden");
    } else {
      if (newEventSection) newEventSection.classList.add("hidden");
      if (eventListSection) eventListSection.classList.remove("hidden");
      if (newEventFooter) newEventFooter.classList.add("hidden");
      if (eventListFooter) eventListFooter.classList.remove("hidden");
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
    if (!dateInput || !fromTimeInput || !toTimeInput || !descInput) return;
    const date = dateInput.value;
    const fromTime = fromTimeInput.value;
    const toTime = toTimeInput.value;
    const description = descInput.value.trim();

    if (!date || !fromTime || !toTime || !description) {
      if (formErrorEl) {
        formErrorEl.textContent = "Please fill all required fields.";
        formErrorEl.classList.remove("hidden");
      }
      return null;
    }

    if (toTime <= fromTime) {
      if (formErrorEl) {
        formErrorEl.textContent =
          "End time cannot be before or equal to start time.";
        formErrorEl.classList.remove("hidden");
      }
      return null;
    }

    if (formErrorEl) {
      formErrorEl.textContent = "";
      formErrorEl.classList.add("hidden");
    }

    return { date, fromTime, toTime, eventDescription: description };
  }

  // --- Event wiring ---
  // Tabs
  tabsRoot.addEventListener("click", function (e) {
    const btn = e.target.closest("button.event-tab");
    if (!btn) return;
    const tabId = btn.getAttribute("data-tab");
    if (!tabId) return;
    setActiveTab(tabId);
  });

  // Close icons on tabs -> go back to Event List
  const closeIcons = tabsRoot.querySelectorAll(".close-tab");
  closeIcons.forEach((icon) => {
    icon.addEventListener("click", function (e) {
      e.stopPropagation();
      setActiveTab("event-list");
    });
  });

  // Select all
  if (selectAllEl) {
    selectAllEl.addEventListener("change", function () {
      const checked = !!selectAllEl.checked;
      const filtered = applyFilters(events);
      if (checked) {
        filtered.forEach((e) => selectedIds.add(e.id));
      } else {
        filtered.forEach((e) => selectedIds.delete(e.id));
      }
      renderEvents();
    });
  }

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      filters.search = searchInput.value || "";
      renderEvents();
    });
  }

  // Month filter
  if (monthFilterInput) {
    monthFilterInput.addEventListener("change", function () {
      filters.month = monthFilterInput.value || "";
      renderEvents();
    });
  }

  // Delete button
  const deleteBtn = document.getElementById("event-delete-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", function () {
      if (selectedIds.size === 0) {
        showToast("Please select at least one record to delete.", "warning");
        return;
      }
      showConfirmationModal({
        title: `Delete Event`,
        message: `Are you sure you want to delete the event? This action cannot be undone.`,
        confirmText: `Delete Event`,
        cancelText: "Cancel",
        iconName: "delete",
        onConfirm: () => {
          events = events.filter((e) => !selectedIds.has(e.id));
          selectedIds.clear();
          renderEvents();
          showToast("Event deleted successfully!", "success");
        },
      });
    });
  }

  // Print / Summary / Download – just log for now
  const printBtn = document.getElementById("event-print-btn");
  const summaryBtn = document.getElementById("event-summary-btn");
  const downloadBtn = document.getElementById("event-download-btn");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      showToast("Print triggered (implement as needed).", "info");
      console.log("Print events:", applyFilters(events));
    });
  }
  if (summaryBtn) {
    summaryBtn.addEventListener("click", function () {
      showToast("Summary triggered (implement as needed).", "info");
    });
  }
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function () {
      showToast("Download triggered (implement as needed).", "info");
      console.log("Download events:", applyFilters(events));
    });
  }

  // Form submit
  if (submitBtn) {
    submitBtn.addEventListener("click", function () {
      const data = validateForm();
      if (!data) return;
      const newId = String(
        events.length ? Number(events[events.length - 1].id) + 1 : 1
      );
      events.push({ id: newId, ...data });
      renderEvents();
      showToast("Event form submitted successfully!", "success");
      resetForm();
      setActiveTab("event-list");
    });
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", function () {
      resetForm();
      showToast("Form cleared.", "info");
    });
  }

  // Filter sidebar
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
  if (filterOpenBtn) filterOpenBtn.addEventListener("click", openFilter);
  if (filterCloseBtn) filterCloseBtn.addEventListener("click", closeFilter);
  if (filterBackdrop) filterBackdrop.addEventListener("click", closeFilter);

  if (filterApplyBtn) {
    filterApplyBtn.addEventListener("click", function () {
      filters.date = filterDate && filterDate.value ? filterDate.value : "";
      filters.fromTime =
        filterFromTime && filterFromTime.value ? filterFromTime.value : "";
      filters.toTime =
        filterToTime && filterToTime.value ? filterToTime.value : "";
      filters.description =
        filterDescription && filterDescription.value
          ? filterDescription.value.toLowerCase()
          : "";
      console.log("Applied Filters:", { ...filters });
      renderEvents();
      closeFilter();
    });
  }

  if (filterResetBtn) {
    filterResetBtn.addEventListener("click", function () {
      if (filterDate) filterDate.value = "";
      if (filterFromTime) filterFromTime.value = "";
      if (filterToTime) filterToTime.value = "";
      if (filterDescription) filterDescription.value = "";
      filters.date = "";
      filters.fromTime = "";
      filters.toTime = "";
      filters.description = "";
      renderEvents();
    });
  }

  // Initial render
  setActiveTab("event-list");
  renderEvents();
})();


