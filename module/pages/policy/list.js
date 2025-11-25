// Policy Management State
const policyStore = {
  activeTab: "AuthorizationGroup",
  isSidebarOpen: false,
  fieldsByTab: {
    AuthorizationGroup: [],
    LeavePolicy: [],
    RotationShift: [],
    ShiftPolicy: [],
  },
  draftFieldsByTab: {
    AuthorizationGroup: [],
    LeavePolicy: [],
    RotationShift: [],
    ShiftPolicy: [],
  },
  defaultsByTab: {
    AuthorizationGroup: [],
    LeavePolicy: [],
    RotationShift: [],
    ShiftPolicy: [],
  },
  counts: {
    AuthorizationGroup: 0,
    LeavePolicy: 0,
    RotationShift: 0,
    ShiftPolicy: 0,
  },
};

// Tab configuration
const tabs = ["AuthorizationGroup", "LeavePolicy", "RotationShift", "ShiftPolicy"];

const tabNames = {
  AuthorizationGroup: "Authorization Group",
  LeavePolicy: "Leave Policy",
  RotationShift: "Rotation Shift",
  ShiftPolicy: "Shift Policy",
};

// DOM Elements
const policyEls = {
  tabsContainer: null,
  tabContent: null,
  sidebar: null,
  panel: null,
  backdrop: null,
  closeBtn: null,
  resetBtn: null,
  applyBtn: null,
  toggleButton: null,
  visibleFields: null,
  hiddenFields: null,
  visibleCount: null,
  fieldSearchInput: null,
};

// Initialize on DOM ready
$(document).ready(function () {
  initPolicyModule();
});

function initPolicyModule() {
  cachePolicyElements();
  bindPolicyEvents();
  setActiveTab("AuthorizationGroup");
  initializeDefaultFields();
}

function cachePolicyElements() {
  policyEls.tabsContainer = $("#policyTabsContainer");
  policyEls.tabContent = $("#policyTabContent");
  policyEls.sidebar = $("#customizedTableSidebar");
  policyEls.panel = $("#customizedTablePanel");
  policyEls.backdrop = $("#customizedTableBackdrop");
  policyEls.closeBtn = $("#customizedTableCloseBtn");
  policyEls.resetBtn = $("#customizedTableResetBtn");
  policyEls.applyBtn = $("#customizedTableApplyBtn");
  policyEls.toggleButton = $("#openSidebarCustomize");
  policyEls.visibleFields = $("#visibleFields");
  policyEls.hiddenFields = $("#hiddenFields");
  policyEls.visibleCount = $("#visibleCount");
  policyEls.fieldSearchInput = $("#fieldSearchInput");
}

function bindPolicyEvents() {
  // Tab switching
  $(document).on("click", ".policy-tab", function (e) {
    if ($(e.target).hasClass("closePolicyTab") || $(e.target).closest(".closePolicyTab").length) {
      setActiveTab("AuthorizationGroup");
      return;
    }
    const tab = $(this).data("tab");
    if (tab) {
      setActiveTab(tab);
    }
  });

  // Sidebar toggle
  if (policyEls.toggleButton) {
    policyEls.toggleButton.on("click", toggleSidebar);
  }

  // Sidebar close
  if (policyEls.backdrop) {
    policyEls.backdrop.on("click", closeSidebar);
  }
  if (policyEls.closeBtn) {
    policyEls.closeBtn.on("click", closeSidebar);
  }

  // Sidebar actions
  if (policyEls.resetBtn) {
    policyEls.resetBtn.on("click", handleReset);
  }
  if (policyEls.applyBtn) {
    policyEls.applyBtn.on("click", handleApply);
  }

  // Field search
  if (policyEls.fieldSearchInput) {
    policyEls.fieldSearchInput.on("input", handleFieldSearch);
  }

  // Click outside to close sidebar
  $(document).on("mousedown", function (e) {
    if (
      policyStore.isSidebarOpen &&
      policyEls.panel &&
      !policyEls.panel[0].contains(e.target) &&
      !policyEls.toggleButton[0].contains(e.target)
    ) {
      closeSidebar();
    }
  });
}

function setActiveTab(tab) {
  policyStore.activeTab = tab;

  // Update tab styles
  $(".policy-tab")
    .removeClass("bg-[#ebeff3] text-[#384551]")
    .addClass("hover:text-[#6689b8] hover:bg-[#f5f7f9]");

  const activeTabBtn = $(`.policy-tab[data-tab="${tab}"]`);
  activeTabBtn
    .removeClass("hover:text-[#6689b8] hover:bg-[#f5f7f9]")
    .addClass("bg-[#ebeff3] text-[#384551]");

  // Remove all counters & close icons
  $(".counter-badge").remove();
  $(".closePolicyTab").remove();

  // Add counter & close icon only for active tab
  activeTabBtn.find("span").append(`
    <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">
      ${policyStore.counts[tab] || 0}
    </span>
    <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closePolicyTab"></i>
  `);

  // Show/hide tab content
  $(".policy-tab-content").addClass("hidden");
  $(`#${tab}Content`).removeClass("hidden");

  // Render tab content
  renderTabContent(tab);
}

function renderTabContent(tab) {
  const contentContainer = $(`#${tab}Content`);
  if (!contentContainer.length) return;

  // Placeholder content - replace with actual component rendering
  const placeholder = `
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-4">${tabNames[tab]}</h3>
      <p class="text-gray-600">Content for ${tabNames[tab]} will be rendered here.</p>
      <p class="text-sm text-gray-500 mt-2">This is a placeholder. Replace with actual component implementation.</p>
    </div>
  `;

  if (contentContainer.children().length === 0) {
    contentContainer.html(placeholder);
  }

  // Register columns if not already registered
  if (policyStore.defaultsByTab[tab].length === 0) {
    // This would be called by child components when they mount
    // For now, we'll initialize with empty arrays
    registerColumns(tab, []);
  }
}

function toggleSidebar() {
  policyStore.isSidebarOpen = !policyStore.isSidebarOpen;

  if (policyStore.isSidebarOpen) {
    // Initialize draft with current applied fields or defaults for the active tab
    const applied = policyStore.fieldsByTab[policyStore.activeTab] || [];
    const fallback = policyStore.defaultsByTab[policyStore.activeTab] || [];
    const source = (applied.length > 0 ? applied : fallback).map((f) => ({ ...f }));
    policyStore.draftFieldsByTab[policyStore.activeTab] = source;

    // Open sidebar
    if (policyEls.sidebar) {
      policyEls.sidebar
        .removeClass("opacity-0 pointer-events-none")
        .addClass("opacity-100 pointer-events-auto");
    }
    if (policyEls.panel) {
      policyEls.panel.removeClass("translate-x-full");
    }

    // Render sidebar content
    renderSidebarContent();
  } else {
    closeSidebar();
  }
}

function closeSidebar() {
  policyStore.isSidebarOpen = false;

  if (policyEls.sidebar) {
    policyEls.sidebar
      .addClass("opacity-0 pointer-events-none")
      .removeClass("opacity-100 pointer-events-auto");
  }
  if (policyEls.panel) {
    policyEls.panel.addClass("translate-x-full");
  }
}

function renderSidebarContent() {
  const activeTab = policyStore.activeTab;
  const fields = policyStore.draftFieldsByTab[activeTab] || [];
  const visibleFields = fields.filter((f) => f.visible);
  const hiddenFields = fields.filter((f) => !f.visible);

  // Update count
  if (policyEls.visibleCount) {
    policyEls.visibleCount.text(`${visibleFields.length}/${fields.length}`);
  }

  // Render visible fields
  if (policyEls.visibleFields) {
    if (visibleFields.length === 0) {
      policyEls.visibleFields.html(
        '<p class="text-sm text-gray-500 py-2">No visible fields</p>'
      );
    } else {
      policyEls.visibleFields.html(
        visibleFields
          .map(
            (field, index) => `
        <div class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-move field-item" data-field-id="${field.id}" data-index="${index}">
          <i class="ri-drag-move-2-line text-gray-400"></i>
          <input type="checkbox" class="field-checkbox accent-[#009333] cursor-pointer" data-field-id="${field.id}" checked>
          <label class="flex-1 text-sm text-gray-700 cursor-pointer">${escapeHtml(field.label)}</label>
        </div>
      `
          )
          .join("")
      );
    }
  }

  // Render hidden fields
  if (policyEls.hiddenFields) {
    if (hiddenFields.length === 0) {
      policyEls.hiddenFields.html(
        '<p class="text-sm text-gray-500 py-2">No hidden fields</p>'
      );
    } else {
      policyEls.hiddenFields.html(
        hiddenFields
          .map(
            (field) => `
        <div class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded field-item" data-field-id="${field.id}">
          <input type="checkbox" class="field-checkbox accent-[#009333] cursor-pointer" data-field-id="${field.id}">
          <label class="flex-1 text-sm text-gray-700 cursor-pointer">${escapeHtml(field.label)}</label>
        </div>
      `
          )
          .join("")
      );
    }
  }

  // Bind field checkbox events
  $(document).off("change", ".field-checkbox").on("change", ".field-checkbox", function () {
    const fieldId = $(this).data("field-id");
    handleFieldChange(fieldId);
  });

  // Make visible fields sortable (using jQuery UI if available, or basic drag)
  if (typeof $.fn.sortable !== "undefined") {
    if (policyEls.visibleFields) {
      policyEls.visibleFields.sortable({
        handle: ".ri-drag-move-2-line",
        update: function (event, ui) {
          const newOrder = [];
          policyEls.visibleFields.find(".field-item").each(function () {
            const fieldId = $(this).data("field-id");
            const field = visibleFields.find((f) => f.id === fieldId);
            if (field) newOrder.push(field);
          });
          handleReorder(newOrder.concat(hiddenFields));
        },
      });
    }
  }
}

function handleFieldChange(fieldId) {
  const activeTab = policyStore.activeTab;
  const fields = policyStore.draftFieldsByTab[activeTab] || [];
  const field = fields.find((f) => f.id === fieldId);
  if (field) {
    field.visible = !field.visible;
    renderSidebarContent();
  }
}

function handleReorder(nextFields) {
  const activeTab = policyStore.activeTab;
  policyStore.draftFieldsByTab[activeTab] = nextFields;
  renderSidebarContent();
}

function handleReset() {
  const activeTab = policyStore.activeTab;
  const defaults = policyStore.defaultsByTab[activeTab] || [];
  policyStore.draftFieldsByTab[activeTab] = defaults.map((f) => ({ ...f }));
  renderSidebarContent();
}

function handleApply() {
  const activeTab = policyStore.activeTab;
  const draft = policyStore.draftFieldsByTab[activeTab] || [];
  policyStore.fieldsByTab[activeTab] = draft.map((f) => ({ ...f }));
  console.log("Applied settings for", activeTab, draft);
  closeSidebar();
  // Re-render tab content with new field settings
  renderTabContent(activeTab);
}

function handleFieldSearch() {
  const searchTerm = policyEls.fieldSearchInput.val().toLowerCase();
  $(".field-item").each(function () {
    const label = $(this).find("label").text().toLowerCase();
    if (label.includes(searchTerm)) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

// Register columns from child components
function registerColumns(tab, cols) {
  // Save defaults if not saved yet
  if (!policyStore.defaultsByTab[tab] || policyStore.defaultsByTab[tab].length === 0) {
    policyStore.defaultsByTab[tab] = cols.map((c) => ({ ...c }));
  }

  // Initialize fields for tab only if empty, so user customizations persist
  if (!policyStore.fieldsByTab[tab] || policyStore.fieldsByTab[tab].length === 0) {
    policyStore.fieldsByTab[tab] = cols.map((c) => ({ ...c }));
  }

  // Also initialize draft if sidebar is not open
  if (!policyStore.isSidebarOpen) {
    const applied = policyStore.fieldsByTab[tab] || [];
    policyStore.draftFieldsByTab[tab] = applied.map((f) => ({ ...f }));
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

// Initialize default fields (placeholder - replace with actual defaults)
function initializeDefaultFields() {
  // Example default fields - replace with actual defaults from child components
  const defaultFields = {
    AuthorizationGroup: [
      { id: "name", label: "Name", visible: true },
      { id: "role", label: "Role", visible: true },
      { id: "status", label: "Status", visible: true },
    ],
    LeavePolicy: [
      { id: "policyName", label: "Policy Name", visible: true },
      { id: "leaveType", label: "Leave Type", visible: true },
      { id: "days", label: "Days", visible: true },
    ],
    RotationShift: [
      { id: "shiftName", label: "Shift Name", visible: true },
      { id: "startDate", label: "Start Date", visible: true },
      { id: "endDate", label: "End Date", visible: true },
    ],
    ShiftPolicy: [
      { id: "policyName", label: "Policy Name", visible: true },
      { id: "shiftType", label: "Shift Type", visible: true },
      { id: "duration", label: "Duration", visible: true },
    ],
  };

  tabs.forEach((tab) => {
    if (defaultFields[tab]) {
      registerColumns(tab, defaultFields[tab]);
    }
  });
}

// Export functions for child components to use
window.policyModule = {
  registerColumns,
  getFields: (tab) => policyStore.fieldsByTab[tab] || [],
};

