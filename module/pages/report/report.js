
(function () {
  const reportItems = [
    { name: "Monthly Report", icon: "ri-calendar-line" },
    { name: "Attendance Report", icon: "ri-time-line" },
    { name: "Leave Report", icon: "ri-calendar-check-line" },
    { name: "MSP Report", icon: "ri-file-chart-line" },
    { name: "Manual Report", icon: "ri-edit-box-line" },
  ];

  const suggestedVideos = [
    {
      title: "Monthly Report",
      thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/mqdefault.jpg",
      duration: "5:12",
      id: "ysz5S6PUM-U",
    },
    {
      title: "Attendance Report",
      thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/mqdefault.jpg",
      duration: "5:12",
      id: "ysz5S6PUM-U",
    },
    {
      title: "Leave Report",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      duration: "3:44",
      id: "dQw4w9WgXcQ",
    },
    {
      title: "MSP Report",
      thumbnail: "https://img.youtube.com/vi/3fumBcKC6RE/mqdefault.jpg",
      duration: "8:29",
      id: "3fumBcKC6RE",
    },
    {
      title: "Manual Report",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg",
      duration: "8:29",
      id: "kJQP7kiw5Fk",
    },
  ];

  // Default initial form values, per report type
  const defaultFormDataByReport = {
    "Monthly Report": {
      group: "",
      section: "",
      reportType: "sectionWise",
      fromDate: "",
      toDate: "",
      showTime: false,
    },
    "Leave Report": {
      fromDate: "",
      toDate: "",
      reportType: "all",
    },
    "Attendance Report": {
      group: "",
      section: "",
      reportType: "sectionWise",
      fromDate: "",
      toDate: "",
      showTime: false,
    },
    "MSP Report": {
      fromDate: "",
      section: "",
    },
    "Manual Report": {
      fromDate: "",
      employeeCode: "",
      section: "",
      status: "all",
    },
  };

  function getInitialActiveReport() {
    const params = new URLSearchParams(window.location.search);
    const report = params.get("report");
    if (report && reportItems.some((item) => item.name === report)) {
      return report;
    }
    return reportItems[0].name;
  }

  function updateQueryParam(reportName) {
    const params = new URLSearchParams(window.location.search);
    params.set("report", reportName);
    const newUrl = window.location.pathname + "?" + params.toString();
    window.history.pushState({}, "", newUrl);
  }

  // Render sidebar report list
  function renderReportList(state) {
    const { searchTerm, activeReport } = state;
    const listEl = document.getElementById("report-list");
    const emptyEl = document.getElementById("report-list-empty");
    if (!listEl) return;

    const filteredReports = reportItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    listEl.innerHTML = "";

    if (filteredReports.length === 0) {
      if (emptyEl) {
        emptyEl.classList.remove("hidden");
      }
      return;
    }

    if (emptyEl) {
      emptyEl.classList.add("hidden");
    }

    filteredReports.forEach((item) => {
      const li = document.createElement("li");
      li.className =
        "cursor-pointer report-list-item p-1 rounded transition-colors duration-200 flex items-center";
      if (item.name === activeReport) {
        li.className += " bg-[#f0f0f0] text-[#009333] rounded-[5px]";
      } else {
        li.className += " hover:bg-gray-100";
      }

      li.dataset.reportName = item.name;

      const icon = document.createElement("i");
      icon.className = item.icon + " text-lg me-2";
      li.appendChild(icon);

      const text = document.createElement("span");
      text.textContent = item.name;
      li.appendChild(text);

      listEl.appendChild(li);
    });
  }

  // Render the dynamic form content for the selected report
  function renderFormContent(activeReport, initialValues) {
    const container = document.getElementById("report-form-content");
    if (!container) return;

    const values = initialValues || defaultFormDataByReport[activeReport] || {};

    let html = "";

    switch (activeReport) {
      case "Monthly Report":
        html = `
          <div id="Monthly_Report">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Group</label>
              <select name="group" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                <option value="">Select Group</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Section</label>
              <select name="section" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                <option value="">Select Section</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Report Type</label>
              <div class="flex items-center gap-4 text-sm">
                <label class="inline-flex items-center gap-1">
                  <input type="radio" name="reportType" value="sectionWise" ${
                    values.reportType === "employeeWise" ? "" : "checked"
                  } class="accent-[#009333]" />
                  <span>Section Wise</span>
                </label>
                <label class="inline-flex items-center gap-1">
                  <input type="radio" name="reportType" value="employeeWise" ${
                    values.reportType === "employeeWise" ? "checked" : ""
                  } class="accent-[#009333]" />
                  <span>Employee Wise</span>
                </label>
              </div>
            </div>

            <div class="flex flex-col md:flex-row gap-2">
              <div class="w-full md:w-1/2">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value="${values.fromDate || ""}"
                  class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                />
              </div>
              <div class="w-full md:w-1/2">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value="${values.toDate || ""}"
                  class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                />
              </div>
            </div>

            <div class="mb-4">
              <div class="text-sm text-gray-700 font-semibold mt-2 md:mt-0">
                Total Days: <span class="text-black font-bold">1</span>
              </div>
            </div>

            <div class="mb-4">
              <label class="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="showTime"
                  ${values.showTime ? "checked" : ""}
                  class="h-4 w-4 accent-[#009333]"
                />
                <span>Include time details in report</span>
              </label>
            </div>
          </div>
        `;
        break;

      case "Leave Report":
        html = `
          <div id="Leave_Report">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">From Date</label>
              <input
                type="date"
                name="fromDate"
                value="${values.fromDate || ""}"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">To Date</label>
              <input
                type="date"
                name="toDate"
                value="${values.toDate || ""}"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Type</label>
              <div class="flex items-center gap-4 text-sm">
                <label class="inline-flex items-center gap-1">
                  <input type="radio" name="reportType" value="all" ${
                    values.reportType === "all" ? "checked" : ""
                  } class="accent-[#009333]"/>
                  <span>All</span>
                </label>
                <label class="inline-flex items-center gap-1">
                  <input type="radio" name="reportType" value="leave" ${
                    values.reportType === "leave" ? "checked" : ""
                  }  class="accent-[#009333]"/>
                  <span>Leave</span>
                </label>
                <label class="inline-flex items-center gap-1">
                  <input type="radio" name="reportType" value="permission" ${
                    values.reportType === "permission" ? "checked" : ""
                  } class="accent-[#009333]"/>
                  <span>Permission</span>
                </label>
              </div>
            </div>

            <div class="mb-4">
              <div class="text-sm text-gray-700 font-semibold mt-2 md:mt-0">
                Total Days: <span class="text-black font-bold">1</span>
              </div>
            </div>
          </div>
        `;
        break;

      case "Attendance Report":
        html = `
          <div id="Attendance_Report">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Group</label>
              <select name="group" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                <option value="">Select Group</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Section</label>
              <select name="section" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                <option value="">Select Section</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Report Type</label>
              <div class="flex items-center gap-4 text-sm">
                <label class="inline-flex items-center gap-1">
                  <input type="radio" name="reportType" value="sectionWise" ${
                    values.reportType === "employeeWise" ? "" : "checked"
                  } class="accent-[#009333]"/>
                  <span>Section Wise</span>
                </label>
                <label class="inline-flex items-center gap-1">
                  <input type="radio" name="reportType" value="employeeWise" ${
                    values.reportType === "employeeWise" ? "checked" : ""
                  } class="accent-[#009333]"/>
                  <span>Employee Wise</span>
                </label>
              </div>
            </div>

            <div class="flex flex-col md:flex-row gap-2">
              <div class="w-full md:w-1/2">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">From Date</label>
                <input
                  type="date"
                  name="fromDate"
                  value="${values.fromDate || ""}"
                  class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                />
              </div>
              <div class="w-full md:w-1/2">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">To Date</label>
                <input
                  type="date"
                  name="toDate"
                  value="${values.toDate || ""}"
                  class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                />
              </div>
            </div>

            <div class="mb-4">
              <div class="text-sm text-gray-700 font-semibold mt-2 md:mt-0">
                Total Days: <span class="text-black font-bold">1</span>
              </div>
            </div>

            <div class="mb-4">
              <label class="flex items-center gap-2 text-sm text-gray-700 font-medium">
                <input
                  type="checkbox"
                  name="showTime"
                  ${values.showTime ? "checked" : ""}
                  class="h-4 w-4 accent-[#009333]"
                />
                <span>Include time details in report</span>
              </label>
            </div>
          </div>
        `;
        break;

      case "MSP Report":
        html = `
          <div id="Msp_Report">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Month</label>
              <input
                type="month"
                name="fromDate"
                value="${values.fromDate || ""}"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                placeholder="Select Month"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Section</label>
              <select name="section" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                <option value="">Select Section</option>
              </select>
            </div>
          </div>
        `;
        break;

      case "Manual Report":
        html = `
          <div id="Manual_Report">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Month</label>
              <input
                type="month"
                name="fromDate"
                value="${values.fromDate || ""}"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Employee Code</label>
              <input
                type="text"
                name="employeeCode"
                value="${values.employeeCode || ""}"
                placeholder="Enter Employee code"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
              />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Section</label>
              <select name="section" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                <option value="">Select Section</option>
              </select>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5 block mb-1 text-sm font-medium text-gray-700">Status</label>
              <select name="status" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                <option value="all" ${
                  values.status === "all" ? "selected" : ""
                }>All</option>
                <option value="approved" ${
                  values.status === "approved" ? "selected" : ""
                }>Approved</option>
                <option value="pending" ${
                  values.status === "pending" ? "selected" : ""
                }>Pending</option>
              </select>
            </div>
          </div>
        `;
        break;

      default:
        html = `
          <div class="text-gray-500 text-center p-4">
            No report selected.
          </div>
        `;
        break;
    }

    container.innerHTML = html;
  }

  // Render tutorial videos
  function renderSuggestedVideos(activeReport) {
    const container = document.getElementById("suggested-videos");
    const titleEl = document.getElementById("tutorial-title");
    const iframe = document.getElementById("tutorial-iframe");
    if (!container || !titleEl || !iframe) return;

    // Default video for current report
    const defaultVideo =
      suggestedVideos.find((v) => v.title === activeReport) ||
      suggestedVideos[0];

    titleEl.textContent = defaultVideo.title;
    iframe.src = "https://www.youtube.com/embed/" + defaultVideo.id;

    container.innerHTML = "";

    const row = document.createElement("div");
    // Horizontal row of cards with scroll
    row.className =
      "flex gap-4 items-stretch min-w-full";

    suggestedVideos.forEach((video) => {
      const item = document.createElement("div");
      // Card-style layout, fixed width for horizontal scroll
      item.className =
        "bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden cursor-pointer hover:shadow-md hover:border-[#009333] transition min-w-[220px] max-w-[260px]";

      const img = document.createElement("img");
      img.src = video.thumbnail;
      img.alt = "Video Thumbnail";
      img.className = "w-full h-55 object-cover";

      const info = document.createElement("div");
      info.className = "flex flex-col justify-between p-3";

      const title = document.createElement("p");
      title.className = "text-sm font-semibold line-clamp-2 text-[#12344d]";
      title.textContent = video.title;

      const duration = document.createElement("span");
      duration.className = "mt-1 text-xs text-gray-500";
      duration.textContent = video.duration;

      info.appendChild(title);
      info.appendChild(duration);

      item.appendChild(img);
      item.appendChild(info);

      item.addEventListener("click", function () {
        titleEl.textContent = video.title;
        iframe.src = "https://www.youtube.com/embed/" + video.id;
      });

      row.appendChild(item);
    });

    container.appendChild(row);
  }

  // Handle "Get Report" click: show modal and log payload
  function setupGetReportHandler(state) {
    const btn = document.getElementById("get-report-btn");
    const form = document.getElementById("report-form");
    const modal = document.getElementById("report-modal");
    const modalTitle = document.getElementById("report-modal-title");
    const modalBody = document.getElementById("report-modal-body");
    const modalClose = document.getElementById("report-modal-close");

    if (!btn || !form || !modal || !modalTitle || !modalBody || !modalClose) {
      return;
    }

    function openModal(payload) {
      modalTitle.textContent = state.activeReport || "Report";
      modalBody.innerHTML =
        '<pre class="text-xs bg-gray-100 p-3 rounded overflow-auto">' +
        JSON.stringify(payload, null, 2)
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;") +
        "</pre>";
      modal.classList.remove("hidden");
    }

    function closeModal() {
      modal.classList.add("hidden");
    }

    btn.addEventListener("click", function () {
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
        if (data[key] !== undefined) {
          // handle multiple values (e.g., checkboxes)
          if (!Array.isArray(data[key])) {
            data[key] = [data[key]];
          }
          data[key].push(value);
        } else {
          data[key] = value;
        }
      });

      const payload = {
        token: state.activeReport,
        data: data,
      };

      // Simulate original console log
      if (window.console && window.console.log) {
        console.log("Report Payload:", payload);
      }

      openModal(payload);
    });

    modalClose.addEventListener("click", closeModal);

    // Close modal when clicking on backdrop
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  function init() {
    const root = document.getElementById("reports-page");
    if (!root) return;

    const searchInput = document.getElementById("report-search");
    const titleEl = document.getElementById("active-report-title");

    const state = {
      searchTerm: "",
      activeReport: getInitialActiveReport(),
    };

    if (titleEl) {
      titleEl.textContent = state.activeReport;
    }

    renderReportList(state);
    renderFormContent(state.activeReport);
    renderSuggestedVideos(state.activeReport);
    setupGetReportHandler(state);

    // Sidebar list click handler (event delegation)
    const listEl = document.getElementById("report-list");
    if (listEl) {
      listEl.addEventListener("click", function (e) {
        const li = e.target.closest("li[data-report-name]");
        if (!li) return;
        const reportName = li.dataset.reportName;
        if (!reportName || reportName === state.activeReport) return;

        state.activeReport = reportName;
        if (titleEl) {
          titleEl.textContent = state.activeReport;
        }

        updateQueryParam(reportName);
        renderReportList(state);
        renderFormContent(state.activeReport);
        renderSuggestedVideos(state.activeReport);
      });
    }

    // Search filter
    if (searchInput) {
      searchInput.addEventListener("input", function (e) {
        state.searchTerm = e.target.value || "";
        renderReportList(state);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


