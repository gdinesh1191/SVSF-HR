// Group Modal Component - Plain JavaScript
const shiftGroupModalStore = {
  groupdata: {
    id: 0,
    policyName: "",
  },
};

// DOM Elements
const shiftGroupModalEls = {
  container: null,
  policyNameInput: null,
  saveButton: null,
};

function initShiftGroupModal(containerSelector) {
  if (!containerSelector) {
    containerSelector = "#shiftAddGroupContent";
  }
  shiftGroupModalEls.container = $(containerSelector);
  if (!shiftGroupModalEls.container || !shiftGroupModalEls.container.length)
    return;

  cacheShiftGroupModalElements();
  bindShiftGroupModalEvents();
  renderShiftGroupModal();
}

function cacheShiftGroupModalElements() {
  shiftGroupModalEls.policyNameInput = shiftGroupModalEls.container.find(
    "#shiftModalPolicyName"
  );
  shiftGroupModalEls.saveButton =
    shiftGroupModalEls.container.find("#shiftModalSaveBtn");
}

function bindShiftGroupModalEvents() {
  // Input changes
  if (
    shiftGroupModalEls.policyNameInput &&
    shiftGroupModalEls.policyNameInput.length
  ) {
    shiftGroupModalEls.policyNameInput.on("input", function () {
      shiftGroupModalStore.groupdata.policyName = $(this).val();
    });
  }

  // Save button
  if (shiftGroupModalEls.saveButton && shiftGroupModalEls.saveButton.length) {
    shiftGroupModalEls.saveButton.on("click", handleSaveShiftGroup);
  }

  // Also bind with document for dynamic content
  $(document).on("input", "#shiftModalPolicyName", function () {
    shiftGroupModalStore.groupdata.policyName = $(this).val();
  });

  $(document).on("click", "#shiftModalSaveBtn", handleSaveShiftPolicy);
}

async function handleSaveShiftPolicy() {
  const payload = {
    data: shiftGroupModalStore.groupdata,
  };

  console.log(payload);

  try {
    $.ajax({
      url: "/policy/postShiftGroup",
      method: "POST",
      dataType: "json",
      data: payload,
    })
      .done((response) => {
        if (response.status === 1) {
          shiftGroupModalStore.groupdata = { id: 0, policyName: "" };

          // Close modal
          if (window.shiftGroupModule) {
            const store = window.shiftGroupModule.getStore();
            store.isAddGroupOpen = false;
            // Trigger re-render of modals in rotation shift group
            if (window.shiftGroupModule.renderModals) {
              window.shiftGroupModule.renderModals();
            }
          }

          // Reset form
          $("#shiftModalPolicyName").val("");

          // Optionally refresh the main list
          if (
            window.shiftGroupModule &&
            window.shiftGroupModule.fetchShiftGroup
          ) {
            window.shiftGroupModule.fetchShiftGroup(1);
          }
        }
      })
      .fail((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

function renderShiftGroupModal() {
  if (!shiftGroupModalEls.container || !shiftGroupModalEls.container.length)
    return;

  const html = `
      <div class="p-4 overflow-y-auto flex-1">
        <div class="mb-4">
         <div class="mb-4">
          <label class="block text-sm font-semibold text-[#000000] mb-1.5">Policy Name</label>
          <input
            type="text"
                id="shiftModalPolicyName"
            placeholder="Enter Policy Name"
            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
            value="${escapeHtml(shiftGroupModalStore.groupdata.policyName)}"
          />
        </div>
       
        <div class="justify-end flex">
          <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="shiftModalSaveBtn">
            Apply
          </button>
        </div>
      </div>
    `;

  shiftGroupModalEls.container.html(html);
  cacheShiftGroupModalElements();
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

// Export for external use
window.initShiftGroupModal = initShiftGroupModal;
window.shiftGroupModalModule = {
  initShiftGroupModal,
  handleSaveShiftGroup,
  getStore: () => shiftGroupModalStore,
};
