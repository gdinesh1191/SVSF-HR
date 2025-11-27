// Rotation Shift Modal Component - Plain JavaScript

const rotationShiftModalStore = {
  activeTab: "shift_allocation", // "shift_allocation" | "shift_request_form"
  shiftRequestForm: {
    fromDate: "",
    toDate: "",
    shiftName: "",
    shiftInTime: "",
    shiftOutTime: "",
    remarks: "",
  },
  shiftManagement: [],
  isLoading: false,
  hasFetched: false,
};

// Dummy data for shift allocation table
const rotationShiftDummyData = [
  {
    id: 1,
    weekName: "Week 1",
    shiftName: "Morning",
    inTime: "09:00",
    outTime: "18:00",
  },
  {
    id: 2,
    weekName: "Week 2",
    shiftName: "Evening",
    inTime: "14:00",
    outTime: "23:00",
  },
  {
    id: 3,
    weekName: "Week 3",
    shiftName: "Night",
    inTime: "22:00",
    outTime: "07:00",
  },
];

// DOM Elements
const rotationShiftModalEls = {
  container: null,
};

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

// Fetch shift allocation list (dummy async to mimic API)
function fetchRotationShiftList() {
  rotationShiftModalStore.isLoading = true;
  renderRotationShiftTabContent();

  setTimeout(() => {
    rotationShiftModalStore.shiftManagement = [...rotationShiftDummyData];
    rotationShiftModalStore.isLoading = false;
    renderRotationShiftTabContent();
  }, 200);
}

// Renderers
function renderShiftAllocationTab() {
  const { shiftManagement, isLoading } = rotationShiftModalStore;

  let rowsHtml = "";

  if (isLoading) {
    for (let i = 0; i < 10; i++) {
      rowsHtml += `
        <tr class="animate-pulse table w-full">
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded"></div></td>
        </tr>
      `;
    }
  } else if (shiftManagement.length > 0) {
    shiftManagement.forEach((item, index) => {
      rowsHtml += `
        <tr class="table w-full table-fixed border-b hover:bg-gray-50">
          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
            ${index + 1}
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
            ${escapeHtml(item.weekName || "")}
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
            ${escapeHtml(item.shiftName || "")}
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
            ${escapeHtml(item.inTime || "")}
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
            ${escapeHtml(item.outTime || "")}
          </td>
        </tr>
      `;
    });
  } else {
    rowsHtml = `
      <tr class="table w-full table-fixed">
        <td colspan="5" class="px-4 py-6 text-center text-sm text-gray-500">
          No shift allocation records available.
        </td>
      </tr>
    `;
  }

  return `
    <div class="p-4">
      <div class="max-h-[calc(100vh-130px)] bg-white rounded-xl shadow-md overflow-y-auto">
        <table class="w-full text-sm text-left border-collapse table-fixed">
          <thead class="text-gray-500 border-b bg-gray-50 sticky top-0 z-10 block w-full">
            <tr class="table w-full table-fixed">
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                S.No
              </th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Week Name
              </th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shift Name
              </th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                In Time
              </th>
              <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Out Time
              </th>
            </tr>
          </thead>
          <tbody id="rotationShiftListBody">
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderShiftRequestFormTab() {
  const { shiftRequestForm } = rotationShiftModalStore;

  return `
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <div>
        <!-- From Date -->
        <div class="flex items-center mb-4">
          <label for="rotationShiftFromDate" class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
            From Date
          </label>
          <input
            type="date"
            id="rotationShiftFromDate"
            name="fromDate"
            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] flex-grow"
            value="${escapeHtml(shiftRequestForm.fromDate)}"
          />
        </div>

        <!-- To Date -->
        <div class="flex items-center mb-4">
          <label for="rotationShiftToDate" class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
            To Date
          </label>
          <input
            type="date"
            id="rotationShiftToDate"
            name="toDate"
            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] flex-grow"
            value="${escapeHtml(shiftRequestForm.toDate)}"
          />
        </div>

        <!-- Shift Name -->
        <div class="flex items-center mb-4">
          <label for="rotationShiftShiftName" class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
            Shift Name
          </label>
          <input
            type="text"
            id="rotationShiftShiftName"
            name="shiftName"
            maxlength="50"
            placeholder="Enter Shift Name"
            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] flex-grow"
            value="${escapeHtml(shiftRequestForm.shiftName)}"
          />
        </div>

        <!-- Shift In Time -->
        <div class="flex items-center mb-4">
          <label for="rotationShiftShiftInTime" class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
            Shift In Time
          </label>
          <input
            type="time"
            id="rotationShiftShiftInTime"
            name="shiftInTime"
            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] flex-grow"
            value="${escapeHtml(shiftRequestForm.shiftInTime)}"
          />
        </div>

        <!-- Shift Out Time -->
        <div class="flex items-center mb-4">
          <label for="rotationShiftShiftOutTime" class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
            Shift Out Time
          </label>
          <input
            type="time"
            id="rotationShiftShiftOutTime"
            name="shiftOutTime"
            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] flex-grow"
            value="${escapeHtml(shiftRequestForm.shiftOutTime)}"
          />
        </div>

        <!-- Remarks -->
        <div class="flex items-start mb-4">
          <label for="rotationShiftRemarks" class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
            Remarks
          </label>
          <textarea
            id="rotationShiftRemarks"
            name="remarks"
            rows="3"
            placeholder="Add any remarks here..."
            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] flex-grow"
          >${escapeHtml(shiftRequestForm.remarks)}</textarea>
        </div>
      </div>

      <div class="flex justify-end gap-2 mt-4">
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="rotationShiftSaveRequestBtn">
          Save Request
        </button>
      </div>
    </div>
  `;
}

function renderRotationShiftTabContent() {
  const container = $("#rotationShiftTabContent");
  if (!container || !container.length) return;

  const { activeTab } = rotationShiftModalStore;
  let html = "";

  if (activeTab === "shift_allocation") {
    html = renderShiftAllocationTab();
  } else {
    html = renderShiftRequestFormTab();
  }

  container.html(html);
  bindRotationShiftTabContentEvents();
}

function setRotationShiftActiveTab(tab) {
  rotationShiftModalStore.activeTab = tab;

  // Update tab styles
  $(".rotation-shift-tab")
    .removeClass("border-[#44745c] text-green-900 bg-white")
    .addClass(
      "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
    );

  $(`.rotation-shift-tab[data-tab="${tab}"]`)
    .removeClass(
      "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
    )
    .addClass("border-[#44745c] text-green-900 bg-white");

  if (tab === "shift_allocation" && !rotationShiftModalStore.hasFetched) {
    rotationShiftModalStore.hasFetched = true;
    fetchRotationShiftList();
  } else {
    renderRotationShiftTabContent();
  }
}

function bindRotationShiftTabContentEvents() {
  // Form inputs (delegated)
  $(document).off("change", "#rotationShiftFromDate");
  $(document).on("change", "#rotationShiftFromDate", function () {
    rotationShiftModalStore.shiftRequestForm.fromDate = $(this).val();
  });

  $(document).off("change", "#rotationShiftToDate");
  $(document).on("change", "#rotationShiftToDate", function () {
    rotationShiftModalStore.shiftRequestForm.toDate = $(this).val();
  });

  $(document).off("input", "#rotationShiftShiftName");
  $(document).on("input", "#rotationShiftShiftName", function () {
    rotationShiftModalStore.shiftRequestForm.shiftName = $(this).val();
  });

  $(document).off("change", "#rotationShiftShiftInTime");
  $(document).on("change", "#rotationShiftShiftInTime", function () {
    rotationShiftModalStore.shiftRequestForm.shiftInTime = $(this).val();
  });

  $(document).off("change", "#rotationShiftShiftOutTime");
  $(document).on("change", "#rotationShiftShiftOutTime", function () {
    rotationShiftModalStore.shiftRequestForm.shiftOutTime = $(this).val();
  });

  $(document).off("input", "#rotationShiftRemarks");
  $(document).on("input", "#rotationShiftRemarks", function () {
    rotationShiftModalStore.shiftRequestForm.remarks = $(this).val();
  });

  // Save button
  $(document).off("click", "#rotationShiftSaveRequestBtn");
  $(document).on("click", "#rotationShiftSaveRequestBtn", function () {
    handleShiftRequestFormSave();
  });
}

function handleShiftRequestFormSave() {
  const data = { ...rotationShiftModalStore.shiftRequestForm };

  console.log("Shift Request Saved:", data);
  alert("Shift Request Saved!");

  rotationShiftModalStore.shiftRequestForm = {
    fromDate: "",
    toDate: "",
    shiftName: "",
    shiftInTime: "",
    shiftOutTime: "",
    remarks: "",
  };

  // After save, go back to allocation tab and refetch list
  rotationShiftModalStore.activeTab = "shift_allocation";
  rotationShiftModalStore.hasFetched = false;
  setRotationShiftActiveTab("shift_allocation");
}

function initRotationShiftModal(containerSelector) {
  if (!containerSelector) {
    containerSelector = "#rotationShiftContent";
  }
  rotationShiftModalEls.container = $(containerSelector);
  if (!rotationShiftModalEls.container || !rotationShiftModalEls.container.length)
    return;

  bindRotationShiftModalEvents();
  renderRotationShiftModal();
}

function bindRotationShiftModalEvents() {
  // Tab switching
  $(document).off("click", ".rotation-shift-tab");
  $(document).on("click", ".rotation-shift-tab", function () {
    const tab = $(this).data("tab");
    if (tab) {
      setRotationShiftActiveTab(tab);
    }
  });
}

function renderRotationShiftModal() {
  if (!rotationShiftModalEls.container || !rotationShiftModalEls.container.length)
    return;

  const { activeTab } = rotationShiftModalStore;
  const tabs = ["shift_allocation", "shift_request_form"];
  const tabLabels = {
    shift_allocation: "Shift Allocation",
    shift_request_form: "New Shift Request",
  };

  let tabsHtml = "";
  tabs.forEach((tab) => {
    const isActive = tab === activeTab;
    tabsHtml += `
      <button
        class="rotation-shift-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${
          isActive
            ? "border-[#44745c] text-green-900 bg-white"
            : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
        }"
        data-tab="${tab}"
      >
        ${tabLabels[tab]}
      </button>
    `;
  });

  const html = `
    <!-- Tabs -->
    <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
      ${tabsHtml}
    </div>

    <!-- Content -->
    <div class="overflow-y-auto flex-1 bg-gray-50">
      <div id="rotationShiftTabContent"></div>
    </div>
  `;

  rotationShiftModalEls.container.html(html);
  // Initial render
  if (activeTab === "shift_allocation" && !rotationShiftModalStore.hasFetched) {
    rotationShiftModalStore.hasFetched = true;
    fetchRotationShiftList();
  } else {
    renderRotationShiftTabContent();
  }
}

// Export for external use
window.initRotationShiftModal = initRotationShiftModal;
window.rotationShiftModalModule = {
  initRotationShiftModal,
  getStore: () => rotationShiftModalStore,
  setActiveTab: setRotationShiftActiveTab,
  handleShiftRequestFormSave,
};
