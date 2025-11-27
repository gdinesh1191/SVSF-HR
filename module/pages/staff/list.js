// Staff Management State
const staffStore = {
  activeTab: "activeStaff",
  isSidebarOpen: false,
  fieldsByTab: {
    activeStaff: [],
    authorizationDetails: [],
    staffMismatch: [],
    shiftReport: [],
  },
  draftFieldsByTab: {
    activeStaff: [],
    authorizationDetails: [],
    staffMismatch: [],
    shiftReport: [],
  },
  defaultsByTab: {
    activeStaff: [],
    authorizationDetails: [],
    staffMismatch: [],
    shiftReport: [],
  },
  counts: {
    activeStaff: 0,
    authorizationDetails: 0,
    staffMismatch: 0,
    shiftReport: 0,
  },
};

// Tab configuration
const tabs = [
  "activeStaff",
  "authorizationDetails",
  "staffMismatch",
  "shiftReport",
];

const tabNames = {
  activeStaff: "Active Staff",
  authorizationDetails: "Authorization Details",
  staffMismatch: "Staff Mismatch",
  shiftReport: "Shift Report",
};

// DOM Elements
const staffEls = {
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
  importStaffBtn: null,
};

// Initialize on DOM ready
$(document).ready(function () {
  initStaffModule();
});

function initStaffModule() {
  cacheStaffElements();
  bindStaffEvents();
  initializeDefaultFields();
  setStaffActiveTab("activeStaff");
}

function cacheStaffElements() {
  staffEls.tabsContainer = $("#staffTabsContainer");
  staffEls.tabContent = $("#staffTabContent");
  staffEls.sidebar = $("#customizedTableSidebar");
  staffEls.panel = $("#customizedTablePanel");
  staffEls.backdrop = $("#customizedTableBackdrop");
  staffEls.closeBtn = $("#customizedTableCloseBtn");
  staffEls.resetBtn = $("#customizedTableResetBtn");
  staffEls.applyBtn = $("#customizedTableApplyBtn");
  staffEls.toggleButton = $("#openSidebarCustomize");
  staffEls.visibleFields = $("#visibleFields");
  staffEls.hiddenFields = $("#hiddenFields");
  staffEls.visibleCount = $("#visibleCount");
  staffEls.fieldSearchInput = $("#fieldSearchInput");
  staffEls.importStaffBtn = $("#importStaffBtn");
}

function bindStaffEvents() {
  // Tab switching
  $(document).on("click", ".staff-tab", function (e) {
    if (
      $(e.target).hasClass("closeStaffTab") ||
      $(e.target).closest(".closeStaffTab").length
    ) {
      setStaffActiveTab("activeStaff");
      return;
    }
    const tab = $(this).data("tab");
    if (tab) {
      setStaffActiveTab(tab);
    }
  });

  // Sidebar toggle
  if (staffEls.toggleButton) {
    staffEls.toggleButton.on("click", toggleSidebar);
  }

  // Sidebar close
  if (staffEls.backdrop) {
    staffEls.backdrop.on("click", closeSidebar);
  }
  if (staffEls.closeBtn) {
    staffEls.closeBtn.on("click", closeSidebar);
  }

  // Sidebar actions
  if (staffEls.resetBtn) {
    staffEls.resetBtn.on("click", handleReset);
  }
  if (staffEls.applyBtn) {
    staffEls.applyBtn.on("click", handleApply);
  }

  // Field search
  if (staffEls.fieldSearchInput) {
    staffEls.fieldSearchInput.on("input", handleFieldSearch);
  }

  // Import Staff button
  if (staffEls.importStaffBtn) {
    staffEls.importStaffBtn.on("click", function () {
      if (window.importStaffModal && window.importStaffModal.show) {
        window.importStaffModal.show();
      }
    });
  }

  // Click outside to close sidebar
  $(document).on("mousedown", function (e) {
    if (
      staffStore.isSidebarOpen &&
      staffEls.panel &&
      !staffEls.panel[0].contains(e.target) &&
      !staffEls.toggleButton[0].contains(e.target)
    ) {
      closeSidebar();
    }
  });
}

function setStaffActiveTab(tab) {
  staffStore.activeTab = tab;
  console.log("setStaffActiveTab", tab);
  // Update tab styles
  $(".staff-tab")
    .removeClass("bg-[#ebeff3] text-[#384551]")
    .addClass("hover:text-[#6689b8] hover:bg-[#f5f7f9]");

  const activeTabBtn = $(`.staff-tab[data-tab="${tab}"]`);
  activeTabBtn
    .removeClass("hover:text-[#6689b8] hover:bg-[#f5f7f9]")
    .addClass("bg-[#ebeff3] text-[#384551]");

  // Remove all counters & close icons
  $(".counter-badge").remove();
  $(".closeStaffTab").remove();

  // Add counter & close icon only for active tab
  activeTabBtn.find("span").append(`
    <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">
      ${staffStore.counts[tab] || 0}
    </span>
    <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closeStaffTab"></i>
  `);

  // Show/hide tab content
  $(".staff-tab-content").addClass("hidden");
  $(`#${tab}Content`).removeClass("hidden");

  // Render tab content
  renderTabContent(tab);
}

function renderTabContent(tab) {
  console.log("renderTabContent", tab);
  const contentContainer = $(`#${tab}Content`);
  if (!contentContainer.length) return;

  // Render specific tab content
  if (tab === "activeStaff") {
    if (
      window.activeStaffModule &&
      window.activeStaffModule.renderActiveStaff
    ) {
      window.activeStaffModule.renderActiveStaff();
    }
    return;
  }
  if (tab === "authorizationDetails") {
    if (
      window.authorizationDetailsModule &&
      window.authorizationDetailsModule.renderAuthorizationDetails
    ) {
      window.authorizationDetailsModule.renderAuthorizationDetails();
    }
    return;
  }
  if (tab === "staffMismatch") {
    if (
      window.staffMismatchModule &&
      window.staffMismatchModule.renderStaffMismatch
    ) {
      window.staffMismatchModule.renderStaffMismatch();
    }
    return;
  }
  if (tab === "shiftReport") {
    if (
      window.shiftReportModule &&
      window.shiftReportModule.renderShiftReport
    ) {
      window.shiftReportModule.renderShiftReport();
    }
    return;
  }
}

function toggleSidebar() {
  staffStore.isSidebarOpen = !staffStore.isSidebarOpen;

  if (staffStore.isSidebarOpen) {
    // Initialize draft with current applied fields or defaults for the active tab
    const applied = staffStore.fieldsByTab[staffStore.activeTab] || [];
    const fallback = staffStore.defaultsByTab[staffStore.activeTab] || [];
    const source = (applied.length > 0 ? applied : fallback).map((f) => ({
      ...f,
    }));
    staffStore.draftFieldsByTab[staffStore.activeTab] = source;

    // Open sidebar
    if (staffEls.sidebar) {
      staffEls.sidebar
        .removeClass("opacity-0 pointer-events-none")
        .addClass("opacity-100 pointer-events-auto");
    }
    if (staffEls.panel) {
      staffEls.panel.removeClass("translate-x-full");
    }

    // Render sidebar content
    renderSidebarContent();
  } else {
    closeSidebar();
  }
}

function closeSidebar() {
  staffStore.isSidebarOpen = false;

  if (staffEls.sidebar) {
    staffEls.sidebar
      .addClass("opacity-0 pointer-events-none")
      .removeClass("opacity-100 pointer-events-auto");
  }
  if (staffEls.panel) {
    staffEls.panel.addClass("translate-x-full");
  }
}

function renderSidebarContent() {
  const activeTab = staffStore.activeTab;
  const fields = staffStore.draftFieldsByTab[activeTab] || [];
  const visibleFields = fields.filter((f) => f.visible);
  const hiddenFields = fields.filter((f) => !f.visible);

  // Update count
  if (staffEls.visibleCount) {
    staffEls.visibleCount.text(`${visibleFields.length}/${fields.length}`);
  }

  // Render visible fields
  if (staffEls.visibleFields) {
    if (visibleFields.length === 0) {
      staffEls.visibleFields.html(
        '<p class="text-sm text-gray-500 py-2">No visible fields</p>'
      );
    } else {
      staffEls.visibleFields.html(
        visibleFields
          .map(
            (field, index) => `
        <div class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-move field-item" data-field-id="${
          field.id
        }" data-index="${index}">
          <i class="ri-draggable text-gray-400"></i>
          <input type="checkbox" class="field-checkbox accent-[#009333] cursor-pointer" data-field-id="${
            field.id
          }" checked>
          <label class="flex-1 text-sm text-gray-700 cursor-pointer">${escapeHtml(
            field.label
          )}</label>
        </div>
      `
          )
          .join("")
      );
    }
  }

  // Render hidden fields
  if (staffEls.hiddenFields) {
    if (hiddenFields.length === 0) {
      staffEls.hiddenFields.html(
        '<p class="text-sm text-gray-500 py-2">No hidden fields</p>'
      );
    } else {
      staffEls.hiddenFields.html(
        hiddenFields
          .map(
            (field) => `
        <div class="flex items-center gap-2 p-2 hover:bg-gray-50 rounded field-item" data-field-id="${
          field.id
        }">
          <i class="ri-draggable text-gray-400"></i>
          <input type="checkbox" class="field-checkbox accent-[#009333] cursor-pointer" data-field-id="${
            field.id
          }">
          <label class="flex-1 text-sm text-gray-700 cursor-pointer">${escapeHtml(
            field.label
          )}</label>
        </div>
      `
          )
          .join("")
      );
    }
  }

  // Bind field checkbox events
  $(document)
    .off("change", ".field-checkbox")
    .on("change", ".field-checkbox", function () {
      const fieldId = $(this).data("field-id");
      handleFieldChange(fieldId);
    });

  // Make visible fields sortable (using jQuery UI if available)
  if (typeof $.fn.sortable !== "undefined") {
    if (staffEls.visibleFields) {
      staffEls.visibleFields.sortable({
        handle: ".ri-draggable",
        update: function (event, ui) {
          const newOrder = [];
          staffEls.visibleFields.find(".field-item").each(function () {
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
  const activeTab = staffStore.activeTab;
  const fields = staffStore.draftFieldsByTab[activeTab] || [];
  const field = fields.find((f) => f.id === fieldId);
  if (field) {
    field.visible = !field.visible;
    renderSidebarContent();
  }
}

function handleReorder(nextFields) {
  const activeTab = staffStore.activeTab;
  staffStore.draftFieldsByTab[activeTab] = nextFields;
  renderSidebarContent();
}

function handleReset() {
  const activeTab = staffStore.activeTab;
  const defaults = staffStore.defaultsByTab[activeTab] || [];
  staffStore.draftFieldsByTab[activeTab] = defaults.map((f) => ({ ...f }));
  renderSidebarContent();
}

function handleApply() {
  const activeTab = staffStore.activeTab;
  const draft = staffStore.draftFieldsByTab[activeTab] || [];
  staffStore.fieldsByTab[activeTab] = draft.map((f) => ({ ...f }));
  console.log("Applied settings for", activeTab, draft);
  closeSidebar();
  // Re-render tab content with new field settings
  renderTabContent(activeTab);
}

function handleFieldSearch() {
  const searchTerm = staffEls.fieldSearchInput.val().toLowerCase();
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
  if (
    !staffStore.defaultsByTab[tab] ||
    staffStore.defaultsByTab[tab].length === 0
  ) {
    staffStore.defaultsByTab[tab] = cols.map((c) => ({ ...c }));
  }

  // Initialize fields for tab only if empty, so user customizations persist
  if (
    !staffStore.fieldsByTab[tab] ||
    staffStore.fieldsByTab[tab].length === 0
  ) {
    staffStore.fieldsByTab[tab] = cols.map((c) => ({ ...c }));
  }

  // Also initialize draft if sidebar is not open
  if (!staffStore.isSidebarOpen) {
    const applied = staffStore.fieldsByTab[tab] || [];
    staffStore.draftFieldsByTab[tab] = applied.map((f) => ({ ...f }));
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

// Initialize default fields (placeholder - will be replaced by child components)
function initializeDefaultFields() {
  // Defaults will be registered by child components
}

// Update count for a tab
function updateCount(tab, count) {
  staffStore.counts[tab] = count;
  const activeTabBtn = $(`.staff-tab[data-tab="${tab}"]`);
  if (activeTabBtn.length && staffStore.activeTab === tab) {
    activeTabBtn.find(".counter-badge").text(count);
  }
}

// Export functions for child components to use
window.staffModule = {
  registerColumns,
  getFields: (tab) => staffStore.fieldsByTab[tab] || [],
  updateCount,
};
