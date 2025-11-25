// Group Modal Component - Plain JavaScript
const leavegroupModalStore = {
  groupdata: {
    id: 0,
    groupName: "",
    description: "",
  },
};

// DOM Elements
const leavegroupModalEls = {
  container: null,
  groupNameInput: null,
  descriptionInput: null,
  saveButton: null,
};

function initGroupModal(containerSelector) {
  if (!containerSelector) {
    containerSelector = "#leaveGroupAddGroupContent";
  }
  leavegroupModalEls.container = $(containerSelector);
  if (!leavegroupModalEls.container || !leavegroupModalEls.container.length) return;

  cacheGroupModalElements();
  bindGroupModalEvents();
  renderGroupModal();
}

function cacheGroupModalElements() {
  leavegroupModalEls.groupNameInput = leavegroupModalEls.container.find("#leaveGroupModalGroupName");
  leavegroupModalEls.descriptionInput = leavegroupModalEls.container.find("#leaveGroupModalDescription");
  leavegroupModalEls.saveButton = leavegroupModalEls.container.find("#leaveGroupModalSaveBtn");
}

function bindGroupModalEvents() {
  // Input changes
  if (leavegroupModalEls.groupNameInput && leavegroupModalEls.groupNameInput.length) {
    leavegroupModalEls.groupNameInput.on("input", function () {
      leavegroupModalStore.groupdata.groupName = $(this).val();
    });
  }

  if (leavegroupModalEls.descriptionInput && leavegroupModalEls.descriptionInput.length) {
    leavegroupModalEls.descriptionInput.on("input", function () {
      leavegroupModalStore.groupdata.description = $(this).val();
    });
  }

  // Save button
  if (leavegroupModalEls.saveButton && leavegroupModalEls.saveButton.length) {
    leavegroupModalEls.saveButton.on("click", handleSaveGroup);
  }

  // Also bind with document for dynamic content
  $(document).on("input", "#leaveGroupModalGroupName", function () {
    leavegroupModalStore.groupdata.groupName = $(this).val();
  });

  $(document).on("input", "#leaveGroupModalDescription", function () {
    leavegroupModalStore.groupdata.description = $(this).val();
  });

  $(document).on("click", "#leaveGroupModalSaveBtn", handleSaveGroup);
}

async function handleSaveGroup() {
  const payload = {
    data: leavegroupModalStore.groupdata,
  };

  console.log(payload);

  try {
    $.ajax({
      url: "/policy/postAuthorizationGroup",
      method: "POST",
      dataType: "json",
      data: payload,
    })
      .done((response) => {
        if (response.status === 1) {
          leavegroupModalStore.groupdata = { id: 0, groupName: "", description: "" };
          
          // Close modal
          if (window.authorizationGroupModule) {
            const store = window.authorizationGroupModule.getStore();
            store.isAddGroupOpen = false;
            // Trigger re-render of modals in authorization group
            if (window.authorizationGroupModule.renderModals) {
              window.authorizationGroupModule.renderModals();
            }
          }
          
          // Reset form
          $("#leaveGroupModalGroupName").val("");
          $("#leaveGroupModalDescription").val("");
          
          // Optionally refresh the main list
          if (window.authorizationGroupModule && window.authorizationGroupModule.fetchAuthorizationGroup) {
            window.authorizationGroupModule.fetchAuthorizationGroup(1);
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

function renderGroupModal() {
  if (!leavegroupModalEls.container || !leavegroupModalEls.container.length) return;

  const html = `
    <div class="p-4 overflow-y-auto flex-1">
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">Group Name</label>
        <input
          type="text"
          id="leaveGroupModalGroupName"
          placeholder="Enter Group Name"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
          value="${escapeHtml(leavegroupModalStore.groupdata.groupName)}"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">Description</label>
        <input
          type="text"
          id="leaveGroupModalDescription"
          placeholder="Enter Description"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
          value="${escapeHtml(leavegroupModalStore.groupdata.description)}"
        />
      </div>
      <div class="justify-end flex">
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="leaveGroupModalSaveBtn">
          Apply
        </button>
      </div>
    </div>
  `;

  leavegroupModalEls.container.html(html);
  cacheGroupModalElements();
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
window.initGroupModal = initGroupModal;
window.groupModalModule = {
  initGroupModal,
  handleSaveGroup,
  getStore: () => leavegroupModalStore,
};

