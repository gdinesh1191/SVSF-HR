// Plain JS implementation of Shift Change List + Apply Form using dummy data
(function () {
  const employeeCode = "230509";

  // ----- Dummy JSON Data -----
  // Dummy shift change records grouped by month (YYYY-MM)
  const dummyShiftRecordsByMonth = {
    "2025-11": [
      {
        id: "1",
        shift_id: "101",
        fromDate: "2025-11-01",
        toDate: "2025-11-03",
        totalDays: "3",
        remarks: "Project deployment support",
        userID: "230509",
        shiftName: "General Shift",
        status: "Pending",
      },
      {
        id: "2",
        shift_id: "102",
        fromDate: "2025-11-05",
        toDate: "2025-11-05",
        totalDays: "1",
        remarks: "Personal work",
        userID: "230509",
        shiftName: "Morning Shift",
        status: "Approved",
      },
      {
        id: "3",
        shift_id: "103",
        fromDate: "2025-11-10",
        toDate: "2025-11-12",
        totalDays: "3",
        remarks: "Night support for rollout",
        userID: "230509",
        shiftName: "Night Shift",
        status: "Rejected",
      },
    ],
    "2025-10": [
      {
        id: "4",
        shift_id: "101",
        fromDate: "2025-10-15",
        toDate: "2025-10-17",
        totalDays: "3",
        remarks: "Training batch",
        userID: "230509",
        shiftName: "General Shift",
        status: "Approved",
      },
    ],
  };

  // Dummy shift master options
  const dummyShiftOptions = [
    {
      id: "101",
      name: "General Shift",
      in_time: "09:00AM",
      out_time: "06:00PM",
      code: "GEN",
      total_time: "09:00",
    },
    {
      id: "102",
      name: "Morning Shift",
      in_time: "06:00AM",
      out_time: "02:00PM",
      code: "MOR",
      total_time: "08:00",
    },
    {
      id: "103",
      name: "Night Shift",
      in_time: "10:00PM",
      out_time: "06:00AM",
      code: "NIT",
      total_time: "08:00",
    },
];

  // ----- Helpers -----
  function qs(id) {
    return document.getElementById(id);
  }

  function formatDateDisplay(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return day + "/" + month + "/" + year;
  }

  function formatDateForAPI(dateStr) {
    if (!dateStr) return null;
    // dateStr expected as yyyy-mm-dd from <input type="date">
    return dateStr;
  }

  function diffDaysInclusive(fromStr, toStr) {
    if (!fromStr || !toStr) return 0;
    const from = new Date(fromStr);
    const to = new Date(toStr);
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return 0;
    const diff = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 ? diff + 1 : 0;
  }

  function convertTimeFormat(timeStr) {
    // Convert from "09:30AM" to "09:30:00"
    if (!timeStr) return "";
    const match = timeStr.match(/(\d{1,2}):(\d{2})(AM|PM)/i);
    if (!match) return timeStr;
    let [, hours, minutes, period] = match;
    let hour24 = parseInt(hours, 10);
    if (period.toUpperCase() === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period.toUpperCase() === "AM" && hour24 === 12) {
      hour24 = 0;
    }
    return String(hour24).padStart(2, "0") + ":" + minutes + ":00";
  }

  function showToast(message, type) {
    const wrapper = qs("shiftToast");
    const inner = qs("shiftToastInner");
    if (!wrapper || !inner) return;

    let bg = "#e0f2fe";
    let border = "#0ea5e9";
    let textColor = "#0369a1";
    let icon = "ri-information-line";

    if (type === "success") {
      bg = "#dcfce7";
      border = "#22c55e";
      textColor = "#166534";
      icon = "ri-checkbox-circle-line";
    } else if (type === "error") {
      bg = "#fee2e2";
      border = "#ef4444";
      textColor = "#991b1b";
      icon = "ri-error-warning-line";
    } else if (type === "warning") {
      bg = "#fef9c3";
      border = "#eab308";
      textColor = "#854d0e";
      icon = "ri-alert-line";
    }

    inner.innerHTML =
      '<i class="' + icon + ' mt-[2px]"></i>' +
      '<div class="flex-1">' + message + "</div>";
    inner.style.backgroundColor = bg;
    inner.style.border = "1px solid " + border;
    inner.style.color = textColor;

    wrapper.classList.remove("hidden");
    wrapper.classList.remove("opacity-0", "translate-y-4");
    wrapper.classList.add("opacity-100", "translate-y-0");

    setTimeout(function () {
      wrapper.classList.add("opacity-0", "translate-y-4");
      wrapper.classList.remove("opacity-100", "translate-y-0");
      setTimeout(function () {
        wrapper.classList.add("hidden");
      }, 200);
    }, 3000);
  }

  // ----- Tabs -----
  function initTabs() {
    const tabsContainer = qs("shiftTabsContainer");
    if (!tabsContainer) return;
    const tabButtons = tabsContainer.querySelectorAll(".shift-tab");

    function setActiveTab(tabId) {
      tabButtons.forEach(function (btn) {
        const id = btn.getAttribute("data-tab");
        if (id === tabId) {
          btn.classList.add("bg-[#ebeff3]", "text-[#384551]");
          btn.classList.remove("hover:text-[#6689b8]", "hover:bg-[#f5f7f9]");
        } else {
          btn.classList.remove("bg-[#ebeff3]", "text-[#384551]");
          btn.classList.add("hover:text-[#6689b8]", "hover:bg-[#f5f7f9]");
        }
      });

      const listContent = qs("shiftChangeListContent");
      const applyContent = qs("newShiftChangeContent");
      if (listContent && applyContent) {
        if (tabId === "shiftChangeList") {
          listContent.classList.remove("hidden");
          applyContent.classList.add("hidden");
        } else {
          listContent.classList.add("hidden");
          applyContent.classList.remove("hidden");
        }
      }
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        // Ignore click on close icon
        const target = e.target;
        if (target && target.classList && target.classList.contains("closeShiftTab")) {
          e.stopPropagation();
          setActiveTab("shiftChangeList");
          return;
        }
        const id = btn.getAttribute("data-tab");
        if (id) setActiveTab(id);
      });
    });

    // default
    setActiveTab("shiftChangeList");
  }

  // ----- Customize Table -----
  const defaultColumns = [
    { id: "actualShift", label: "Actual Shift", visible: true },
    { id: "shiftName", label: "Shift Name", visible: true },
    { id: "fromDate", label: "From Date", visible: true },
    { id: "toDate", label: "To Date", visible: true },
    { id: "totalDays", label: "Total Days", visible: true },
    { id: "remarks", label: "Remarks", visible: true },
    { id: "status", label: "Status", visible: true },
  ];

  let appliedColumns = JSON.parse(JSON.stringify(defaultColumns));
  let draftColumns = JSON.parse(JSON.stringify(defaultColumns));

  function getVisibleColumns() {
    return appliedColumns.filter(function (c) {
      return c.visible;
    });
  }

  function renderTableHeaderFromColumns() {
    const thead = qs("shiftListThead");
    if (!thead) return;
    const tr = thead.querySelector("tr");
    if (!tr) return;

    // Remove existing dynamic th (data-col-id)
    const dynamicThs = tr.querySelectorAll("th[data-col-id]");
    dynamicThs.forEach(function (th) {
      th.remove();
    });

    getVisibleColumns().forEach(function (col) {
      const th = document.createElement("th");
      th.className = "border-r border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b";
      th.setAttribute("data-col-id", col.id);
      th.textContent = col.label;
      tr.appendChild(th);
    });
  }

  function renderCustomizeSidebar() {
    const visibleContainer = qs("shiftVisibleFields");
    const hiddenContainer = qs("shiftHiddenFields");
    const countSpan = qs("shiftVisibleCount");
    if (!visibleContainer || !hiddenContainer || !countSpan) return;

    visibleContainer.innerHTML = "";
    hiddenContainer.innerHTML = "";

    const visible = draftColumns.filter(function (c) {
      return c.visible;
    });
    const hidden = draftColumns.filter(function (c) {
      return !c.visible;
    });

    countSpan.textContent = visible.length + "/" + draftColumns.length;

    function createFieldRow(col, isVisible) {
      const div = document.createElement("div");
      div.className =
        "field-item flex items-center gap-2 p-2 hover:bg-gray-50 rounded " +
        (isVisible ? "cursor-move" : "");
      div.setAttribute("data-field-id", col.id);
      div.innerHTML =
        '<i class="ri-draggable text-gray-400"></i>' +
        '<input type="checkbox" class="field-checkbox accent-[#009333] cursor-pointer" ' +
        (col.visible ? "checked" : "") +
        ' data-field-id="' +
        col.id +
        '"/>' +
        '<label class="flex-1 text-sm text-gray-700 cursor-pointer">' +
        col.label +
        "</label>";
      return div;
    }

    if (visible.length === 0) {
      visibleContainer.innerHTML =
        '<p class="text-sm text-gray-500 py-2">No visible fields</p>';
    } else {
      visible.forEach(function (c) {
        visibleContainer.appendChild(createFieldRow(c, true));
      });
    }

    if (hidden.length === 0) {
      hiddenContainer.innerHTML =
        '<p class="text-sm text-gray-500 py-2">No hidden fields</p>';
    } else {
      hidden.forEach(function (c) {
        hiddenContainer.appendChild(createFieldRow(c, false));
      });
    }

    const allCheckboxes = document.querySelectorAll(
      "#shiftVisibleFields .field-checkbox, #shiftHiddenFields .field-checkbox"
    );
    allCheckboxes.forEach(function (cb) {
      cb.addEventListener("change", function () {
        const id = cb.getAttribute("data-field-id");
        if (!id) return;
        draftColumns = draftColumns.map(function (col) {
          if (col.id === id) {
            return {
              id: col.id,
              label: col.label,
              visible: cb.checked,
            };
          }
          return col;
        });
        renderCustomizeSidebar();
      });
    });
  }

  function openCustomizeSidebar() {
    const wrapper = qs("shiftCustomizeSidebar");
    const panel = qs("shiftCustomizePanel");
    if (!wrapper || !panel) return;

    // Initialize draft from applied
    draftColumns = JSON.parse(JSON.stringify(appliedColumns));
    renderCustomizeSidebar();

    wrapper.classList.remove("pointer-events-none");
    wrapper.classList.add("opacity-100");
    wrapper.classList.remove("opacity-0");
    panel.classList.remove("translate-x-full");
    panel.classList.add("translate-x-0");
  }

  function closeCustomizeSidebar() {
    const wrapper = qs("shiftCustomizeSidebar");
    const panel = qs("shiftCustomizePanel");
    if (!wrapper || !panel) return;
    wrapper.classList.add("pointer-events-none");
    wrapper.classList.remove("opacity-100");
    wrapper.classList.add("opacity-0");
    panel.classList.add("translate-x-full");
    panel.classList.remove("translate-x-0");
  }

  function initCustomizeSidebar() {
    const openBtn = qs("openSidebarCustomizeShift");
    const closeBtn = qs("shiftCustomizeCloseBtn");
    const backdrop = qs("shiftCustomizeBackdrop");
    const resetBtn = qs("shiftCustomizeResetBtn");
    const applyBtn = qs("shiftCustomizeApplyBtn");

    if (openBtn) openBtn.addEventListener("click", openCustomizeSidebar);
    if (closeBtn) closeBtn.addEventListener("click", closeCustomizeSidebar);
    if (backdrop) backdrop.addEventListener("click", closeCustomizeSidebar);
    if (resetBtn)
      resetBtn.addEventListener("click", function () {
        draftColumns = JSON.parse(JSON.stringify(defaultColumns));
        renderCustomizeSidebar();
      });
    if (applyBtn)
      applyBtn.addEventListener("click", function () {
        appliedColumns = JSON.parse(JSON.stringify(draftColumns));
        renderTableHeaderFromColumns();
        renderShiftTable(); // re-render rows to match visible cols
        closeCustomizeSidebar();
      });
  }

  // ----- Shift List (data + table) -----
  let shiftRecords = [];
  let selectedIds = [];

  function renderShiftTable() {
    const tbody = qs("shiftListTbody");
    const selectAll = qs("shiftSelectAll");
    const showingSpan = qs("shiftShowingCount");
    const totalSpan = qs("shiftTotalCount");
    const counterBadge = qs("shiftListCounter");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (!shiftRecords.length) {
      const tr = document.createElement("tr");
      const colSpan = 2 + getVisibleColumns().length;
      tr.innerHTML =
        '<td colspan="' +
        colSpan +
        '" class="py-10 text-center text-gray-500 text-sm">' +
        "No shift records available" +
        "</td>";
      tbody.appendChild(tr);
    } else {
      shiftRecords.forEach(function (rec, index) {
        const isSelected = selectedIds.indexOf(rec.id) !== -1;
        const tr = document.createElement("tr");
        tr.className =
          (isSelected ? "bg-[#e5f2fd] " : "") + "hover:bg-[#f5f7f9] hover:bg-[#f5f7f9] text-sm cursor-pointer group";

        let html = "";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center px-2 py-1 border-b">' +
          '<input type="checkbox" class="form-check shift-row-checkbox accent-[#009333]" data-id="' +
          rec.id +
          '" ' +
          (isSelected ? "checked" : "") +
          " />" +
          "</td>";

        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center px-2 py-1 border-b">' +
          '<div class="flex justify-between items-center">' +
          "<span></span>" +
          '<span class="text-center">' +
          (index + 1) +
          "</span>" +
          '<span class="cursor-pointer shift-edit-icon" data-id="' +
          rec.id +
          '">' +
          '<i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>' +
          "</span>" +
          "</div>" +
          "</td>";

        getVisibleColumns().forEach(function (col) {
          if (col.id === "actualShift" || col.id === "shiftName") {
            html +=
              '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b">' +
              '<div class="text-sm font-medium text-gray-900">' +
              (rec.shiftName || "") +
              "</div>" +
              "</td>";
          } else if (col.id === "fromDate") {
            html +=
              '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b text-sm text-gray-900">' +
              formatDateDisplay(rec.fromDate) +
              "</td>";
          } else if (col.id === "toDate") {
            html +=
              '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b text-sm text-gray-900">' +
              formatDateDisplay(rec.toDate) +
              "</td>";
          } else if (col.id === "totalDays") {
            html +=
              '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b text-sm text-gray-900">' +
              (rec.totalDays || "") +
              "</td>";
          } else if (col.id === "remarks") {
            html +=
              '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b text-sm text-gray-900">' +
              (rec.remarks || "") +
              "</td>";
          } else if (col.id === "status") {
            html +=
              '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] px-2 py-1 border-b">' +
              '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">' +
              (rec.status || "Pending") +
              "</span>" +
              "</td>";
          }
        });

        tr.innerHTML = html;
        tbody.appendChild(tr);
      });
    }

    // Counts
    if (showingSpan) showingSpan.textContent = String(shiftRecords.length);
    if (totalSpan) totalSpan.textContent = String(shiftRecords.length);
    if (counterBadge) counterBadge.textContent = String(shiftRecords.length);

    // Update select all state
    if (selectAll) {
      selectAll.checked =
        shiftRecords.length > 0 && selectedIds.length === shiftRecords.length;
    }

    // Attach checkbox listeners
    const rowCheckboxes = tbody.querySelectorAll(".shift-row-checkbox");
    rowCheckboxes.forEach(function (cb) {
      cb.addEventListener("change", function () {
        const id = cb.getAttribute("data-id");
        if (!id) return;
        if (cb.checked) {
          if (selectedIds.indexOf(id) === -1) selectedIds.push(id);
        } else {
          selectedIds = selectedIds.filter(function (x) {
            return x !== id;
          });
        }
        renderShiftTable();
      });
    });
  }

  function initShiftTableSelection() {
    const selectAll = qs("shiftSelectAll");
    if (!selectAll) return;
    selectAll.addEventListener("change", function () {
      if (selectAll.checked) {
        selectedIds = shiftRecords.map(function (r) {
          return r.id;
        });
      } else {
        selectedIds = [];
      }
      renderShiftTable();
    });
  }

  function fetchShiftList(monthValue) {
    // Use dummy JSON data instead of API
    const monthKey =
      monthValue && monthValue.length >= 7 ? monthValue.slice(0, 7) : null;
    const allMonths = Object.keys(dummyShiftRecordsByMonth);

    const effectiveKey =
      monthKey && dummyShiftRecordsByMonth[monthKey]
        ? monthKey
        : allMonths.length
        ? allMonths[0]
        : null;

    shiftRecords = effectiveKey
      ? dummyShiftRecordsByMonth[effectiveKey] || []
      : [];
    selectedIds = [];
    renderShiftTable();
  }

  function initShiftMonthPicker() {
    const monthInput = qs("shiftMonthInput");
    if (!monthInput) return;
    const now = new Date();
    const ym =
      now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
    monthInput.value = ym;

    monthInput.addEventListener("change", function () {
      const v = monthInput.value;
      fetchShiftList(v);
    });

    // Initial load
    fetchShiftList(ym);
  }

  // ----- Apply Shift Change Form -----
  let shiftOptions = []; // full shift data from dummyShiftOptions

  function fetchShiftOptions() {
    // Use dummy JSON data instead of API
    shiftOptions = dummyShiftOptions.slice();
    populateShiftSelect();
  }

  function populateShiftSelect() {
    const select = qs("applyShiftId");
    if (!select) return;
    select.innerHTML = '<option value="">Select Shift</option>';
    shiftOptions.forEach(function (opt) {
      const o = document.createElement("option");
      o.value = opt.id;
      o.textContent = opt.name + " (" + (opt.code || "") + ")";
      select.appendChild(o);
    });
  }

  function getSelectedShiftDetails(shiftId) {
    return (
      shiftOptions.find(function (s) {
        return String(s.id) === String(shiftId);
      }) || null
    );
  }

  function initApplyFormDates() {
    const fromInput = qs("applyFromDate");
    const toInput = qs("applyToDate");
    const totalInput = qs("applyTotalDays");
    if (!fromInput || !toInput || !totalInput) return;

    const today = new Date();
    const ymd =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");
    fromInput.value = ymd;
    toInput.value = ymd;
    totalInput.value = "1";

    function recalc() {
      if (toInput.min !== fromInput.value) {
        toInput.min = fromInput.value;
      }
      const days = diffDaysInclusive(fromInput.value, toInput.value);
      totalInput.value = String(days || 0);
    }

    fromInput.addEventListener("change", recalc);
    toInput.addEventListener("change", recalc);
  }

  function resetApplyForm() {
    const form = qs("applyShiftForm");
    if (!form) return;
    form.reset();
    initApplyFormDates();
  }

  function initApplyForm() {
    const form = qs("applyShiftForm");
    const cancelBtn = qs("applyShiftCancelBtn");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const fromInput = qs("applyFromDate");
      const toInput = qs("applyToDate");
      const totalInput = qs("applyTotalDays");
      const shiftIdInput = qs("applyShiftId");
      const remarksInput = qs("applyRemarks");

      if (!fromInput || !toInput || !totalInput || !shiftIdInput) return;

      const shiftId = shiftIdInput.value;
      if (!shiftId) {
        showToast("Please select a shift.", "error");
        return;
      }

      const selectedShift = getSelectedShiftDetails(shiftId);
      if (!selectedShift) {
        showToast("Please select a valid shift.", "error");
        return;
      }

      const apiData = {
        employeeCode: employeeCode,
        fromDate: formatDateForAPI(fromInput.value),
        toDate: formatDateForAPI(toInput.value),
        totalDays: totalInput.value || "0",
        shiftCode: selectedShift.code,
        shiftName: selectedShift.name,
        shiftInTime: convertTimeFormat(selectedShift.in_time),
        shiftOutTime: convertTimeFormat(selectedShift.out_time),
        shiftId: selectedShift.id,
        remarks: (remarksInput && remarksInput.value) || "",
      };

      console.log("Dummy submit payload:", apiData);
      showToast(
        "Shift change application submitted (dummy). Check console log.",
        "success"
      );
      resetApplyForm();

      // refresh list for current month
      const monthInput = qs("shiftMonthInput");
      if (monthInput && monthInput.value) {
        fetchShiftList(monthInput.value);
      }
    });

    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        resetApplyForm();
      });
    }

    initApplyFormDates();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    initCustomizeSidebar();
    renderTableHeaderFromColumns();
    initShiftTableSelection();
    initShiftMonthPicker();
    initApplyForm();
    fetchShiftOptions();
  });
})();


