// Group Modal Component - Plain JavaScript
const rotationShiftGroupModalStore = {
    groupdata: {
      id: 0,
      groupName: "",
      description: "",
    },
  };
  
  // DOM Elements
  const rotationShiftGroupModalEls = {
    container: null,
    groupNameInput: null,
    descriptionInput: null,
    saveButton: null,
  };
  
  function initRotationShiftGroupModal(containerSelector) {
    if (!containerSelector) {
      containerSelector = "#rotationShiftAddGroupContent";
    }
    rotationShiftGroupModalEls.container = $(containerSelector);
    if (!rotationShiftGroupModalEls.container || !rotationShiftGroupModalEls.container.length) return;
  
    cacheRotationShiftGroupModalElements();
    bindRotationShiftGroupModalEvents();
    renderRotationShiftGroupModal();
  }
  
  function cacheRotationShiftGroupModalElements() {
    rotationShiftGroupModalEls.groupNameInput = rotationShiftGroupModalEls.container.find("#rotationShiftModalGroupName");
    rotationShiftGroupModalEls.descriptionInput = rotationShiftGroupModalEls.container.find("#rotationShiftModalDescription");
    rotationShiftGroupModalEls.saveButton = rotationShiftGroupModalEls.container.find("#rotationShiftModalSaveBtn");
  }
  
  function bindRotationShiftGroupModalEvents() {
    // Input changes
    if (rotationShiftGroupModalEls.groupNameInput && rotationShiftGroupModalEls.groupNameInput.length) {
      rotationShiftGroupModalEls.groupNameInput.on("input", function () {
        rotationShiftGroupModalStore.groupdata.groupName = $(this).val();
      });
    }
  
    if (rotationShiftGroupModalEls.descriptionInput && rotationShiftGroupModalEls.descriptionInput.length) {
      rotationShiftGroupModalEls.descriptionInput.on("input", function () {
        rotationShiftGroupModalStore.groupdata.description = $(this).val();
      });
    }
  
    // Save button
    if (rotationShiftGroupModalEls.saveButton && rotationShiftGroupModalEls.saveButton.length) {
      rotationShiftGroupModalEls.saveButton.on("click", handleSaveRotationShiftGroup);
    }
  
    // Also bind with document for dynamic content
    $(document).on("input", "#rotationShiftModalGroupName", function () {
      rotationShiftGroupModalStore.groupdata.groupName = $(this).val();
    });
  
    $(document).on("input", "#rotationShiftModalDescription", function () {
      rotationShiftGroupModalStore.groupdata.description = $(this).val();
    });
  
    $(document).on("click", "#rotationShiftModalSaveBtn", handleSaveRotationShiftGroup);
  }
  
  async function handleSaveRotationShiftGroup() {
    const payload = {
      data: rotationShiftGroupModalStore.groupdata,
    };
  
    console.log(payload);
  
    try {
      $.ajax({
        url: "/policy/postRotationShiftGroup",
        method: "POST",
        dataType: "json",
        data: payload,
      })
        .done((response) => {
          if (response.status === 1) {
            rotationShiftGroupModalStore.groupdata = { id: 0, groupName: "", description: "" };
            
            // Close modal
            if (window.rotationShiftGroupModule) {
              const store = window.rotationShiftGroupModule.getStore();
              store.isAddGroupOpen = false;
              // Trigger re-render of modals in rotation shift group
              if (window.rotationShiftGroupModule.renderModals) {
                window.rotationShiftGroupModule.renderModals();
              }
            }
            
            // Reset form
            $("#rotationShiftModalGroupName").val("");
            $("#rotationShiftModalDescription").val("");
            
            // Optionally refresh the main list
            if (window.rotationShiftGroupModule && window.rotationShiftGroupModule.fetchRotationShiftGroup) {
              window.rotationShiftGroupModule.fetchRotationShiftGroup(1);
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
  
  function renderRotationShiftGroupModal() {
    if (!rotationShiftGroupModalEls.container || !rotationShiftGroupModalEls.container.length) return;
  
    const html = `
      <div class="p-4 overflow-y-auto flex-1">
        <div class="mb-4">
         <div class="mb-4">
          <label class="block text-sm font-semibold text-[#000000] mb-1.5">Group Name</label>
          <input
            type="text"
            id="rotationShiftModalGroupName"
            placeholder="Enter Group Name"
            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
            value="${escapeHtml(rotationShiftGroupModalStore.groupdata.groupName)}"
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-semibold text-[#000000] mb-1.5">Description</label>
          <input
            type="text"
            id="rotationShiftModalDescription"
            placeholder="Enter Description"
            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
            value="${escapeHtml(rotationShiftGroupModalStore.groupdata.description)}"
          />
        </div>
        <div class="justify-end flex">
          <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="rotationShiftModalSaveBtn">
            Apply
          </button>
        </div>
      </div>
    `;
  
    rotationShiftGroupModalEls.container.html(html);
    cacheRotationShiftGroupModalElements();
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
  window.initRotationShiftGroupModal = initRotationShiftGroupModal;
  window.rotationShiftGroupModalModule = {
    initRotationShiftGroupModal,
    handleSaveRotationShiftGroup,
    getStore: () => rotationShiftGroupModalStore,
  };
  
  