// Group Modal Component - Plain JavaScript
const groupModalStore = {
  groupdata: {
    id: 0,
    groupName: "",
    description: "",
  },
};

// DOM Elements
const groupModalEls = {
  container: null,
  groupNameInput: null,
  descriptionInput: null,
  saveButton: null,
};

function initGroupModal(containerSelector) {
  if (!containerSelector) {
    containerSelector = "#authGroupAddGroupContent";
  }
  groupModalEls.container = $(containerSelector);
  if (!groupModalEls.container || !groupModalEls.container.length) return;

  cacheGroupModalElements();
  bindGroupModalEvents();
  renderGroupModal();
}

function cacheGroupModalElements() {
  groupModalEls.groupNameInput = groupModalEls.container.find("#groupModalGroupName");
  groupModalEls.descriptionInput = groupModalEls.container.find("#groupModalDescription");
  groupModalEls.saveButton = groupModalEls.container.find("#groupModalSaveBtn");
}

function bindGroupModalEvents() {
  // Input changes
  if (groupModalEls.groupNameInput && groupModalEls.groupNameInput.length) {
    groupModalEls.groupNameInput.on("input", function () {
      groupModalStore.groupdata.groupName = $(this).val();
    });
  }

  if (groupModalEls.descriptionInput && groupModalEls.descriptionInput.length) {
    groupModalEls.descriptionInput.on("input", function () {
      groupModalStore.groupdata.description = $(this).val();
    });
  }

  // Save button
  if (groupModalEls.saveButton && groupModalEls.saveButton.length) {
    groupModalEls.saveButton.on("click", handleSaveGroup);
  }

  // Also bind with document for dynamic content
  $(document).on("input", "#groupModalGroupName", function () {
    groupModalStore.groupdata.groupName = $(this).val();
  });

  $(document).on("input", "#groupModalDescription", function () {
    groupModalStore.groupdata.description = $(this).val();
  });

  $(document).on("click", "#groupModalSaveBtn", handleSaveGroup);
}

async function handleSaveGroup() {
  const payload = {
    data: groupModalStore.groupdata,
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
          groupModalStore.groupdata = { id: 0, groupName: "", description: "" };
          
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
          $("#groupModalGroupName").val("");
          $("#groupModalDescription").val("");
          
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
  if (!groupModalEls.container || !groupModalEls.container.length) return;

  const html = `
    <div class="p-4 overflow-y-auto flex-1">
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">Group Name</label>
        <input
          type="text"
          id="groupModalGroupName"
          placeholder="Enter Group Name"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
          value="${escapeHtml(groupModalStore.groupdata.groupName)}"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold text-[#000000] mb-1.5">Description</label>
        <input
          type="text"
          id="groupModalDescription"
          placeholder="Enter Description"
          class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
          value="${escapeHtml(groupModalStore.groupdata.description)}"
        />
      </div>
      <div class="justify-end flex">
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="groupModalSaveBtn">
          Apply
        </button>
      </div>
    </div>
  `;

  groupModalEls.container.html(html);
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
  getStore: () => groupModalStore,
};

