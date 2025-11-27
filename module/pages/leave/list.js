// Plain JS implementation of Leave page converted from the original React/Next.js code.
// Features:
// - Tabs: Pending, History, Apply Leave
// - Apply Leave form with basic validation and derived fields
// - In‑memory Pending & History tables based on dummy data (no backend dependency)

(function () {
  // ----- Helpers -----
  function qs(id) {
    return document.getElementById(id);
  }

  function formatDateDisplay(dateStr) {
    if (!dateStr) return "";
    // expect yyyy-mm-dd
    var d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    var day = String(d.getDate()).padStart(2, "0");
    var month = String(d.getMonth() + 1).padStart(2, "0");
    var year = d.getFullYear();
    return day + "-" + month + "-" + year;
  }

  function toISODate(value) {
    // value from <input type="date"> is already yyyy-mm-dd
    if (!value) return "";
    return value;
  }

  function diffDaysInclusive(fromStr, toStr) {
    if (!fromStr || !toStr) return 0;
    var from = new Date(fromStr);
    var to = new Date(toStr);
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return 0;
    var diff = (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 ? diff + 1 : 0;
  }

  function computeTimeDiff(fromTime, toTime) {
    // expects "HH:MM"
    if (!fromTime || !toTime) return "";
    var fromParts = fromTime.split(":");
    var toParts = toTime.split(":");
    if (fromParts.length < 2 || toParts.length < 2) return "";
    var fromMinutes =
      parseInt(fromParts[0], 10) * 60 + parseInt(fromParts[1], 10);
    var toMinutes = parseInt(toParts[0], 10) * 60 + parseInt(toParts[1], 10);
    var diff = toMinutes - fromMinutes;
    if (isNaN(diff) || diff < 0) return "Invalid time range";
    var hours = Math.floor(diff / 60);
    var minutes = diff % 60;
    return hours + " hours and " + minutes + " minutes";
  }

  function showSimpleToast(message, type) {
    // Minimal local toast for this module only
    var wrapper = qs("leaveToast");
    var inner = qs("leaveToastInner");
    if (!wrapper || !inner) return;

    var bg = "#e0f2fe";
    var border = "#0ea5e9";
    var textColor = "#0369a1";
    var icon = "ri-information-line";

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
      '<i class="' +
      icon +
      ' mt-[2px] mr-2"></i><div class="flex-1 text-sm">' +
      message +
      "</div>";
    inner.style.backgroundColor = bg;
    inner.style.border = "1px solid " + border;
    inner.style.color = textColor;

    wrapper.classList.remove("hidden", "opacity-0", "translate-y-4");
    wrapper.classList.add("opacity-100", "translate-y-0");

    setTimeout(function () {
      wrapper.classList.add("opacity-0", "translate-y-4");
      wrapper.classList.remove("opacity-100", "translate-y-0");
      setTimeout(function () {
        wrapper.classList.add("hidden");
      }, 200);
    }, 3000);
  }

  // ----- Dummy leave data -----
  var allLeaves = [
    {
      id: 1,
      Employee: "John Doe",
      Leavecategory: "Casual Leave",
      leavetype: "Full Day",
      fromDate: "2024-06-20",
      toDate: "2024-06-21",
      Days: "2",
      Remarks: "Family event",
      Status: "Approved",
      Level1: "Manager A",
      Level2: "HR B",
    },
    {
      id: 2,
      Employee: "Jane Smith",
      Leavecategory: "Sick Leave",
      leavetype: "Half Day",
      fromDate: "2024-06-21",
      toDate: "2024-06-21",
      Days: "0.5",
      Remarks: "Fever",
      Status: "Pending",
      Level1: "Manager B",
      Level2: "HR A",
    },
    {
      id: 3,
      Employee: "Alice Johnson",
      Leavecategory: "Personal Leave",
      leavetype: "Full Day",
      fromDate: "2024-06-19",
      toDate: "2024-06-19",
      Days: "1",
      Remarks: "Personal work",
      Status: "Rejected",
      Level1: "Manager C",
      Level2: "HR C",
    },
    {
      id: 4,
      Employee: "Bob Williams",
      Leavecategory: "Casual Leave",
      leavetype: "Full Day",
      fromDate: "2024-06-22",
      toDate: "2024-06-23",
      Days: "2",
      Remarks: "Travel",
      Status: "Approved",
      Level1: "Manager D",
      Level2: "HR D",
    },
    {
      id: 5,
      Employee: "Charlie Brown",
      Leavecategory: "Sick Leave",
      leavetype: "Half Day",
      fromDate: "2024-06-23",
      toDate: "2024-06-23",
      Days: "0.5",
      Remarks: "Doctor visit",
      Status: "Pending",
      Level1: "Manager E",
      Level2: "HR E",
    },
  ];

  function getPendingLeaves() {
    return allLeaves.filter(function (l) {
      return (l.Status || "").toLowerCase() === "pending";
    });
  }

  function getHistoryLeaves() {
    return allLeaves.filter(function (l) {
      var s = (l.Status || "").toLowerCase();
      return s === "approved" || s === "rejected";
    });
  }

  // ----- Tabs -----
  function initTabs() {
    var tabsRoot = qs("leave-tabs");
    if (!tabsRoot) return;

    var tabButtons = tabsRoot.querySelectorAll(".leave-tab");
    var activeTab = "pending"; // default

    function setActiveTab(tabId) {
      activeTab = tabId;

      var pendingBadge = qs("pending-count-badge");
      var historyBadge = qs("history-count-badge");

      tabButtons.forEach(function (btn) {
        var id = btn.getAttribute("data-tab");
        var closeIcon = btn.querySelector(".leave-close-tab");
        if (id === activeTab) {
          btn.classList.add("bg-[#ebeff3]", "text-[#384551]");
          btn.classList.remove("hover:text-[#6689b8]", "hover:bg-[#f5f7f9]");
          if (closeIcon) closeIcon.classList.remove("hidden");
        } else {
          btn.classList.remove("bg-[#ebeff3]", "text-[#384551]");
          btn.classList.add("hover:text-[#6689b8]", "hover:bg-[#f5f7f9]");
          if (closeIcon) closeIcon.classList.add("hidden");
        }
      });

      // Show count only on active tab
      if (pendingBadge) {
        if (activeTab === "pending") {
          pendingBadge.classList.remove("hidden");
        } else {
          pendingBadge.classList.add("hidden");
        }
      }
      if (historyBadge) {
        if (activeTab === "history") {
          historyBadge.classList.remove("hidden");
        } else {
          historyBadge.classList.add("hidden");
        }
      }

      var applySection = qs("apply-leave-section");
      var pendingSection = qs("pending-leave-section");
      var historySection = qs("history-leave-section");

      if (applySection) applySection.classList.add("hidden");
      if (pendingSection) pendingSection.classList.add("hidden");
      if (historySection) historySection.classList.add("hidden");

      if (activeTab === "apply" && applySection) {
        applySection.classList.remove("hidden");
      } else if (activeTab === "pending" && pendingSection) {
        pendingSection.classList.remove("hidden");
      } else if (activeTab === "history" && historySection) {
        historySection.classList.remove("hidden");
      }
    }

    tabsRoot.addEventListener("click", function (e) {
      var closeBtn = e.target.closest(".leave-close-tab");
      if (closeBtn) {
        e.stopPropagation();
        setActiveTab("apply");
        return;
      }
      var btn = e.target.closest("button.leave-tab");
      if (!btn) return;
      var tabId = btn.getAttribute("data-tab");
      if (!tabId) return;
      setActiveTab(tabId);
    });

    // initial
    setActiveTab(activeTab);
  }

  // ----- Pending table -----
  function renderPendingTable() {
    var tbody = qs("pending-leave-tbody");
    var countBadge = qs("pending-count-badge");
    var footerVisible = qs("pending-visible-count");
    var footerTotal = qs("pending-total-count");
    if (!tbody) return;

    var pending = getPendingLeaves();
    tbody.innerHTML = "";

    if (!pending.length) {
      var trEmpty = document.createElement("tr");
      trEmpty.innerHTML =
        '<td colspan="8" class="py-10 text-center text-gray-500 text-sm">No Leave records available</td>';
      tbody.appendChild(trEmpty);
    } else {
      pending.forEach(function (leave, index) {
        var tr = document.createElement("tr");
        tr.className =
          "hover:bg-[#f5f7f9] text-sm cursor-pointer group transition-all duration-300 ease-in-out hover:bg-[#f5f7f9]";

        var dateRange =
          formatDateDisplay(leave.fromDate) +
          " - " +
          formatDateDisplay(leave.toDate);

        var html = "";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">' +
          (index + 1) +
          "</td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]"><div class="text-sm font-medium text-gray-900">' +
          (leave.Leavecategory || "") +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]"><div class="text-sm text-gray-900">' +
          (leave.leavetype || "") +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]"><div class="text-sm text-gray-900">' +
          dateRange +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%]"><div class="text-sm text-gray-900">' +
          (leave.Days || "") +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[25%]"><div class="text-sm text-gray-900">' +
          (leave.Remarks || "") +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]"><div class="text-sm text-gray-900">' +
          (leave.Status || "") +
          "</div></td>";

        tr.innerHTML = html;
        tbody.appendChild(tr);
      });
    }

    if (countBadge) countBadge.textContent = String(pending.length);
    if (footerVisible) footerVisible.textContent = String(pending.length);
    if (footerTotal) footerTotal.textContent = String(pending.length);
  }

  // ----- History table -----
  function renderHistoryTable() {
    var tbody = qs("history-leave-tbody");
    var countBadge = qs("history-count-badge");
    var footerVisible = qs("history-visible-count");
    var footerTotal = qs("history-total-count");
    if (!tbody) return;

    var history = getHistoryLeaves();
    tbody.innerHTML = "";

    if (!history.length) {
      var trEmpty = document.createElement("tr");
      trEmpty.innerHTML =
        '<td colspan="8" class="py-10 text-center text-gray-500 text-sm">No Leave records available</td>';
      tbody.appendChild(trEmpty);
    } else {
      history.forEach(function (leave, index) {
        var tr = document.createElement("tr");
        tr.className =
          "hover:bg-[#f5f7f9] text-sm cursor-pointer group transition-all duration-300 ease-in-out hover:bg-[#f5f7f9]";

        var dateRange =
          formatDateDisplay(leave.fromDate) +
          " - " +
          formatDateDisplay(leave.toDate);

        var html = "";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[5%] text-center">' +
          (index + 1) +
          "</td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]"><div class="text-sm font-medium text-gray-900">' +
          (leave.Leavecategory || "") +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]"><div class="text-sm text-gray-900">' +
          (leave.leavetype || "") +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]"><div class="text-sm text-gray-900">' +
          dateRange +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[7%]"><div class="text-sm text-gray-900">' +
          (leave.Days || "") +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[25%]"><div class="text-sm text-gray-900">' +
          (leave.Remarks || "") +
          "</div></td>";
        html +=
          '<td class="border-r border-b border-[#ebeff3] p-[0.3rem] w-[15%]"><div class="text-sm text-gray-900">' +
          (leave.Status || "") +
          "</div></td>";

        tr.innerHTML = html;
        tbody.appendChild(tr);
      });
    }

    if (countBadge) countBadge.textContent = String(history.length);
    if (footerVisible) footerVisible.textContent = String(history.length);
    if (footerTotal) footerTotal.textContent = String(history.length);
  }

  // ----- Apply Leave form -----
  function initApplyForm() {
    var formEl = qs("apply-leave-form");
    if (!formEl) return;

    var categorySelect = qs("leaveCategory");
    var leaveTypeSelect = qs("leaveType");
    var singleDateInput = qs("defaultDate");
    var fromDateInput = qs("fromDate");
    var toDateInput = qs("toDate");
    var totalDaysInput = qs("totalDays");
    var fromTimeInput = qs("fromTime");
    var toTimeInput = qs("toTime");
    var totalTimeInput = qs("totalTime");
    var remarksInput = qs("remarks");

    function updateLeaveTypeOptions() {
      if (!categorySelect || !leaveTypeSelect) return;
      var category = categorySelect.value;
      var options = [
        { value: "firstHalf", label: "First Half" },
        { value: "secondHalf", label: "Second Half" },
        { value: "fullDay", label: "Full Day" },
      ];
      // In React version, permission cannot be full day
      if (category === "permission") {
        options = options.filter(function (o) {
          return o.value !== "fullDay";
        });
      }
      leaveTypeSelect.innerHTML = '<option value="">Select Leave Type</option>';
      options.forEach(function (opt) {
        var o = document.createElement("option");
        o.value = opt.value;
        o.textContent = opt.label;
        leaveTypeSelect.appendChild(o);
      });
    }

    function updateTotalDays() {
      if (!fromDateInput || !toDateInput || !totalDaysInput) return;
      var fromVal = fromDateInput.value;
      var toVal = toDateInput.value;
      var days = diffDaysInclusive(fromVal, toVal);
      totalDaysInput.value = days ? String(days) : "";
    }

    function updateTotalTime() {
      if (!fromTimeInput || !toTimeInput || !totalTimeInput) return;
      var fromVal = fromTimeInput.value;
      var toVal = toTimeInput.value;
      totalTimeInput.value = computeTimeDiff(fromVal, toVal);
    }

    function toggleDateFields() {
      if (!categorySelect || !leaveTypeSelect) return;
      var category = categorySelect.value;
      var leaveType = leaveTypeSelect.value;

      var isFullRangeCategory =
        (category === "leaveWithoutPay" ||
          category === "medicalLeave" ||
          category === "localFestival") &&
        leaveType === "fullDay";

      var singleWrapper = qs("single-date-wrapper");
      var rangeWrapper = qs("range-date-wrapper");

      if (singleWrapper && rangeWrapper) {
        if (isFullRangeCategory) {
          singleWrapper.classList.add("hidden");
          rangeWrapper.classList.remove("hidden");
        } else {
          singleWrapper.classList.remove("hidden");
          rangeWrapper.classList.add("hidden");
        }
      }
    }

    function togglePermissionTimeFields() {
      var timeWrapper = qs("permission-time-wrapper");
      if (!categorySelect || !timeWrapper) return;
      if (categorySelect.value === "permission") {
        timeWrapper.classList.remove("hidden");
      } else {
        timeWrapper.classList.add("hidden");
        if (fromTimeInput) fromTimeInput.value = "";
        if (toTimeInput) toTimeInput.value = "";
        if (totalTimeInput) totalTimeInput.value = "";
      }
    }

    if (categorySelect) {
      categorySelect.addEventListener("change", function () {
        updateLeaveTypeOptions();
        toggleDateFields();
        togglePermissionTimeFields();
      });
    }

    if (leaveTypeSelect) {
      leaveTypeSelect.addEventListener("change", function () {
        toggleDateFields();
      });
    }

    if (fromDateInput) {
      fromDateInput.addEventListener("change", function () {
        if (toDateInput && !toDateInput.value) {
          toDateInput.value = fromDateInput.value;
        }
        updateTotalDays();
      });
    }
    if (toDateInput) {
      toDateInput.addEventListener("change", function () {
        updateTotalDays();
      });
    }

    if (fromTimeInput)
      fromTimeInput.addEventListener("change", updateTotalTime);
    if (toTimeInput) toTimeInput.addEventListener("change", updateTotalTime);

    // Initialize defaults
    var today = new Date();
    var y = today.getFullYear();
    var m = String(today.getMonth() + 1).padStart(2, "0");
    var d = String(today.getDate()).padStart(2, "0");
    var ymd = y + "-" + m + "-" + d;
    if (singleDateInput) singleDateInput.value = ymd;
    if (fromDateInput) fromDateInput.value = ymd;
    if (toDateInput) toDateInput.value = ymd;
    if (totalDaysInput) totalDaysInput.value = "1";

    updateLeaveTypeOptions();
    toggleDateFields();
    togglePermissionTimeFields();

    // Submit
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!categorySelect || !leaveTypeSelect) return;

      var categoryVal = categorySelect.value;
      var leaveTypeVal = leaveTypeSelect.value;
      if (!categoryVal || !leaveTypeVal) {
        showSimpleToast("Please select Category and Leave Type.", "error");
        return;
      }

      var isFullRangeCategory =
        (categoryVal === "leaveWithoutPay" ||
          categoryVal === "medicalLeave" ||
          categoryVal === "localFestival") &&
        leaveTypeVal === "fullDay";

      var fromDateVal = "";
      var toDateVal = "";
      var totalDaysVal = "";

      if (isFullRangeCategory) {
        if (!fromDateInput || !toDateInput) return;
        if (!fromDateInput.value || !toDateInput.value) {
          showSimpleToast("Please select From and To Date.", "error");
          return;
        }
        fromDateVal = toISODate(fromDateInput.value);
        toDateVal = toISODate(toDateInput.value);
        totalDaysVal = totalDaysInput ? totalDaysInput.value : "";
      } else {
        if (!singleDateInput || !singleDateInput.value) {
          showSimpleToast("Please select Date.", "error");
          return;
        }
        fromDateVal = toISODate(singleDateInput.value);
        toDateVal = toISODate(singleDateInput.value);
        totalDaysVal = "1";
      }

      var remarksVal = remarksInput ? remarksInput.value.trim() : "";

      // Build new record (pending)
      var newId =
        allLeaves.length > 0
          ? Number(allLeaves[allLeaves.length - 1].id || 0) + 1
          : 1;
      var newLeave = {
        id: newId,
        Employee: "You",
        Leavecategory: categoryVal,
        leavetype: leaveTypeVal,
        fromDate: fromDateVal,
        toDate: toDateVal,
        Days: totalDaysVal,
        Remarks: remarksVal,
        Status: "Pending",
        Level1: "",
        Level2: "",
      };
      allLeaves.push(newLeave);

      renderPendingTable();
      renderHistoryTable();
      showSimpleToast("Leave application submitted (dummy).", "success");

      // reset form
      formEl.reset();
      if (singleDateInput) singleDateInput.value = ymd;
      if (fromDateInput) fromDateInput.value = ymd;
      if (toDateInput) toDateInput.value = ymd;
      if (totalDaysInput) totalDaysInput.value = "1";
      if (totalTimeInput) totalTimeInput.value = "";
      updateLeaveTypeOptions();
      toggleDateFields();
      togglePermissionTimeFields();
    });

    var cancelBtn = qs("apply-cancel-btn");
    if (cancelBtn) {
      cancelBtn.addEventListener("click", function () {
        formEl.reset();
        if (singleDateInput) singleDateInput.value = ymd;
        if (fromDateInput) fromDateInput.value = ymd;
        if (toDateInput) toDateInput.value = ymd;
        if (totalDaysInput) totalDaysInput.value = "1";
        if (totalTimeInput) totalTimeInput.value = "";
        updateLeaveTypeOptions();
        toggleDateFields();
        togglePermissionTimeFields();
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initTabs();
    renderPendingTable();
    renderHistoryTable();
    initApplyForm();
  });
})();


