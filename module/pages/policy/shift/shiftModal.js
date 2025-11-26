// Shift Policy Modal Component - Plain JavaScript

// Local state store
const shiftModalStore = {
  activeTab: "shifts", // "shifts" | "rules"
  shiftForm: {
    selectedShiftValue: "",
    inTime: "",
    outTime: "",
  },
  ruleForm: {
    startDate: "",
    endDate: "",
    selectedShiftId: "",
  },
};

// Dummy shift options (replaces initialShiftOptions/SearchableSelect)
const shiftModalShiftOptions = [
  {
    value: "shift1",
    label: "Shift 1",
    inTime: "09:00",
    outTime: "12:00",
  },
  {
    value: "shift2",
    label: "Shift 2",
    inTime: "13:00",
    outTime: "17:00",
  },
];

// DOM Elements
const shiftModalEls = {
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

// ---- Tab rendering ----

function renderShiftTabContent() {
  const optionsHtml = shiftModalShiftOptions
    .map(
      (opt) => `
      <option value="${escapeHtml(opt.value)}">
        ${escapeHtml(opt.label)} - ${escapeHtml(opt.inTime)} - ${escapeHtml(
        opt.outTime
      )}
      </option>`
    )
    .join("");

  const { shiftForm } = shiftModalStore;

  return `
    <div>
      <h6 class="text-[15px] mb-3">Add New Shift</h6>
      <form id="shiftModalAddShiftForm" autocomplete="off" class="p-3 border rounded-md bg-white">
        <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label class="text-sm text-[#1D1D1D] w-1/3">
            Shift Name
            <span class=" text-red-500">*</span>
          </label>
          <div class="flex flex-col w-3/4 flex-grow">
            <select
              id="shiftModalShiftSelect"
              name="selectedShiftValue"
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
            >
              <option value="">Select Shift</option>
              ${optionsHtml}
            </select>
          </div>
        </div>

        <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label class="text-sm text-[#1D1D1D] w-1/3">
            In Time
          </label>
          <div class="flex flex-col w-3/4 flex-grow">
            <input
              type="text"
              id="shiftModalInTime"
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] rounded-md  focus:border-[#009333] bg-gray-100 border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none"
              value="${escapeHtml(shiftForm.inTime)}"
              readonly
            />
          </div>
        </div>

        <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label class="text-sm text-[#1D1D1D] w-1/3">
            Out Time
          </label>
          <div class="flex flex-col w-3/4 flex-grow">
            <input
              type="text"
              id="shiftModalOutTime"
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] rounded-md  focus:border-[#009333] bg-gray-100 border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none"
              value="${escapeHtml(shiftForm.outTime)}"
              readonly
            />
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button type="submit" class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition">
            Add Shift
          </button>
        </div>
      </form>

      <h6 class="text-[15px] mb-3 mt-6">
        Shifts for
      </h6>
      <div class="text-center text-gray-500 py-10 border rounded-md bg-white">
        No shifts added to this policy yet. Use the form above to add one.
      </div>
    </div>
  `;
}

function renderRulesTabContent() {
  const { ruleForm } = shiftModalStore;

  const shiftSelectOptions = shiftModalShiftOptions
    .map(
      (opt) => `
      <option value="${escapeHtml(opt.value)}">
        ${escapeHtml(opt.label)}
      </option>`
    )
    .join("");

  return `
    <div>
      <h6 class="text-[15px] mb-3">Add New Rule</h6>
      <form id="shiftModalAddRuleForm" autocomplete="off" class="p-3 border rounded-md bg-white">
        <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label class="text-sm text-[#1D1D1D] w-1/3">
            Start Date
            <span class=" text-red-500">*</span>
          </label>
          <div class="flex flex-col w-3/4 flex-grow">
            <input
              type="date"
              id="shiftModalStartDate"
              name="startDate"
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
              value="${escapeHtml(ruleForm.startDate)}"
            />
          </div>
        </div>

        <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label class="text-sm text-[#1D1D1D] w-1/3">
            End Date
            <span class=" text-red-500">*</span>
          </label>
          <div class="flex flex-col w-3/4 flex-grow">
            <input
              type="date"
              id="shiftModalEndDate"
              name="endDate"
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
              value="${escapeHtml(ruleForm.endDate)}"
            />
          </div>
        </div>

        <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <label class="text-sm text-[#1D1D1D] w-1/3">
            Select Shift
            <span class=" text-red-500">*</span>
          </label>
          <div class="flex flex-col w-3/4 flex-grow">
            <select
              id="shiftModalRuleShiftSelect"
              name="selectedShiftId"
              class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
            >
              <option value="">Select Shift</option>
              ${shiftSelectOptions}
            </select>
          </div>
        </div>

        <div class="flex justify-end mt-4">
          <button type="submit" class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition">
            Save Rule
          </button>
        </div>
      </form>

      <h6 class="text-[15px] mb-3 mt-6">
        Rules for
      </h6>
      <div class="text-center text-gray-500 py-10 border rounded-md bg-white">
        No rules added to this policy yet. Use the form above to add one.
      </div>
    </div>
  `;
}

function renderShiftModalTabContent() {
  const container = $("#shiftModalTabContent");
  if (!container || !container.length) return;

  const { activeTab } = shiftModalStore;
  let html = "";

  if (activeTab === "shifts") {
    html = renderShiftTabContent();
  } else {
    html = renderRulesTabContent();
  }

  container.html(html);
  bindShiftModalTabContentEvents();
}

function setShiftModalActiveTab(tab) {
  shiftModalStore.activeTab = tab;

  // Update tab styles
  $(".shift-modal-tab")
    .removeClass("border-[#44745c] text-green-900 bg-white")
    .addClass(
      "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
    );

  $(`.shift-modal-tab[data-tab="${tab}"]`)
    .removeClass(
      "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
    )
    .addClass("border-[#44745c] text-green-900 bg-white");

  renderShiftModalTabContent();
}

// ---- Event binding for tab content ----

function bindShiftModalTabContentEvents() {
  // Shift select
  $(document).off("change", "#shiftModalShiftSelect");
  $(document).on("change", "#shiftModalShiftSelect", function () {
    const value = $(this).val();
    shiftModalStore.shiftForm.selectedShiftValue = value;

    const selected = shiftModalShiftOptions.find((opt) => opt.value === value);
    shiftModalStore.shiftForm.inTime = selected ? selected.inTime : "";
    shiftModalStore.shiftForm.outTime = selected ? selected.outTime : "";

    // Update readonly fields
    $("#shiftModalInTime").val(shiftModalStore.shiftForm.inTime);
    $("#shiftModalOutTime").val(shiftModalStore.shiftForm.outTime);
  });

  // Add Shift form submit
  $(document).off("submit", "#shiftModalAddShiftForm");
  $(document).on("submit", "#shiftModalAddShiftForm", function (e) {
    e.preventDefault();
    const { selectedShiftValue } = shiftModalStore.shiftForm;
    if (!selectedShiftValue) {
      alert("Please select a shift before adding.");
      return;
    }

    console.log("Shift added to policy:", { ...shiftModalStore.shiftForm });
    alert("Shift added to policy (demo only).");

    // Reset form state
    shiftModalStore.shiftForm = {
      selectedShiftValue: "",
      inTime: "",
      outTime: "",
    };
    renderShiftModalTabContent();
  });

  // Rule form inputs
  $(document).off("change", "#shiftModalStartDate");
  $(document).on("change", "#shiftModalStartDate", function () {
    shiftModalStore.ruleForm.startDate = $(this).val();
  });

  $(document).off("change", "#shiftModalEndDate");
  $(document).on("change", "#shiftModalEndDate", function () {
    shiftModalStore.ruleForm.endDate = $(this).val();
  });

  $(document).off("change", "#shiftModalRuleShiftSelect");
  $(document).on("change", "#shiftModalRuleShiftSelect", function () {
    shiftModalStore.ruleForm.selectedShiftId = $(this).val();
  });

  // Add Rule form submit
  $(document).off("submit", "#shiftModalAddRuleForm");
  $(document).on("submit", "#shiftModalAddRuleForm", function (e) {
    e.preventDefault();
    const { startDate, endDate, selectedShiftId } = shiftModalStore.ruleForm;
    if (!startDate || !endDate || !selectedShiftId) {
      alert("Please fill all required fields before saving rule.");
      return;
    }

    console.log("Rule added to policy:", { ...shiftModalStore.ruleForm });
    alert("Rule added to policy (demo only).");

    // Reset rule form
    shiftModalStore.ruleForm = {
      startDate: "",
      endDate: "",
      selectedShiftId: "",
    };
    renderShiftModalTabContent();
  });
}

// ---- Modal shell rendering ----

function initShiftModal(containerSelector) {
  if (!containerSelector) {
    containerSelector = "#shiftContent";
  }
  shiftModalEls.container = $(containerSelector);
  if (!shiftModalEls.container || !shiftModalEls.container.length) return;

  bindShiftModalEvents();
  renderShiftModal();
}

function bindShiftModalEvents() {
  // Tab switching
  $(document).off("click", ".shift-modal-tab");
  $(document).on("click", ".shift-modal-tab", function () {
    const tab = $(this).data("tab");
    if (tab) {
      setShiftModalActiveTab(tab);
    }
  });
}

function renderShiftModal() {
  if (!shiftModalEls.container || !shiftModalEls.container.length) return;

  const { activeTab } = shiftModalStore;
  const tabs = ["shifts", "rules"];
  const tabLabels = {
    shifts: "Shifts (0)",
    rules: "Rules (0)",
  };

  let tabsHtml = "";
  tabs.forEach((tab) => {
    const isActive = tab === activeTab;
    tabsHtml += `
      <button
        class="shift-modal-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${
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
    <div class="border-gray-200 bg-[#f0f5f3] border-b">
      <nav class="flex">
        ${tabsHtml}
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="p-4 overflow-y-auto flex-1 bg-gray-50">
      <div id="shiftModalTabContent"></div>
    </div>
  `;

  shiftModalEls.container.html(html);
  renderShiftModalTabContent();
}

// Export for external use
window.initShiftModal = initShiftModal;
window.shiftModalModule = {
  initShiftModal,
  getStore: () => shiftModalStore,
  setActiveTab: setShiftModalActiveTab,
};
