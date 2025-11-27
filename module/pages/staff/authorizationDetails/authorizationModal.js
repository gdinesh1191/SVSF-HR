// Authorization Modal Component - Plain JavaScript
// Full implementation with all tabs and content
(function () {
  "use strict";

  const authorizationModalStore = {
    isOpen: false,
    selectedStaff: null,
    staffSuggestions: [],
    authorizationList: [],
    activeTab: "Authorization_list",
    formData: {
      name: "",
      levelType: "",
      authorization: [],
    },
    hasFetched: false,
    isSaving: false,
    isLoading: false,
  };

  const authorizationModalDummyData = [
    {
      id: 1,
      staff_name: "John Carter",
      userID: "EMP001",
      levelType: "1",
      authorization: ["OT", "Shift"],
    },
    {
      id: 2,
      staff_name: "Emma Watson",
      userID: "EMP002",
      levelType: "2",
      authorization: ["Leave", "Permission"],
    },
    {
      id: 3,
      staff_name: "Michael Brown",
      userID: "EMP003",
      levelType: "3",
      authorization: ["OD", "ShiftChange"],
    },
    {
      id: 4,
      staff_name: "Sophia Lee",
      userID: "EMP004",
      levelType: "1",
      authorization: ["OT", "Leave"],
    },
    {
      id: 5,
      staff_name: "David Miller",
      userID: "EMP005",
      levelType: "2",
      authorization: ["Permission"],
    },
    {
      id: 6,
      staff_name: "Olivia Green",
      userID: "EMP006",
      levelType: "3",
      authorization: ["Shift", "ShiftChange"],
    },
  ];

  function show(staff, staffSuggestions = [], authorizationList = []) {
    authorizationModalStore.selectedStaff = staff;
    authorizationModalStore.staffSuggestions = staffSuggestions || [];
    authorizationModalStore.isOpen = true;
    authorizationModalStore.activeTab = "Authorization_list";
    authorizationModalStore.formData = {
      name: staff?.staff_name || "",
      levelType: "",
      authorization: [],
    };
    authorizationModalStore.hasFetched = false;
    authorizationModalStore.isLoading = false;
    
    // Use passed data if available, otherwise will fetch
    if (authorizationList && Array.isArray(authorizationList) && authorizationList.length > 0) {
      authorizationModalStore.authorizationList = authorizationList;
      authorizationModalStore.hasFetched = true;
    } else {
      authorizationModalStore.authorizationList = [];
      authorizationModalStore.hasFetched = false;
    }
    
    renderAuthorizationModal();
    
    // Always fetch data to ensure we have content
    fetchAuthorizationList();
  }

  function hide() {
    authorizationModalStore.isOpen = false;
    renderAuthorizationModal();
  }

  function renderAuthorizationModal() {
    if (!authorizationModalStore.isOpen || !authorizationModalStore.selectedStaff) {
      $("#authorizationModal").remove();
      return;
    }

    const selectedStaff = authorizationModalStore.selectedStaff;
    const tabContent = renderTabContent();
    
    const modalHtml = `
      <div id="authorizationModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-100">
        <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)] auth-backdrop"></div>
        <div class="flex flex-col w-[750px] bg-white transform transition-transform duration-300 ease-in-out translate-x-0 h-full overflow-hidden">
          <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
            <h5 class="text-lg">
              Authorization Level for ${escapeHtml(selectedStaff?.staff_name || "")} - ${escapeHtml(selectedStaff?.userID || "")}
            </h5>
            <button class="cursor-pointer close-authorization-modal">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>
          <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
            <button data-tab="Authorization_list" class="auth-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${authorizationModalStore.activeTab === "Authorization_list" ? "border-[#44745c] text-green-900 bg-white" : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"}">
              Authorization list
            </button>
            <button data-tab="New_Authorization" class="auth-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${authorizationModalStore.activeTab === "New_Authorization" ? "border-[#44745c] text-green-900 bg-white" : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"}">
              New Authorization
            </button>
          </div>
          <div class="overflow-y-auto flex-1" id="authorizationModalContent">
            ${tabContent}
          </div>
        </div>
      </div>
    `;

    $("#authorizationModal").remove();
    $("body").append(modalHtml);
    bindAuthorizationModalEvents();
  }

  function renderTabContent() {
    switch (authorizationModalStore.activeTab) {
      case "Authorization_list":
        return renderAuthorizationListTab();
      case "New_Authorization":
        return renderNewAuthorizationTab();
      default:
        return "";
    }
  }

  function renderAuthorizationListTab() {
    const list = authorizationModalStore.authorizationList;
    
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
                  Name
                </th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  approved
                </th>
              </tr>
            </thead>
            <tbody>
              ${authorizationModalStore.isLoading ? renderAuthorizationListLoading() : renderAuthorizationListRows(list)}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderAuthorizationListLoading() {
    let html = "";
    for (let i = 0; i < 10; i++) {
      html += `
        <tr class="table w-full table-fixed border-b animate-pulse">
          <td class="px-4 py-2"><div class="h-4 bg-gray-200 rounded"></div></td>
          <td class="px-4 py-2"><div class="h-4 bg-gray-200 rounded"></div></td>
          <td class="px-4 py-2"><div class="h-4 bg-gray-200 rounded"></div></td>
          <td class="px-4 py-2"><div class="h-4 bg-gray-200 rounded"></div></td>
        </tr>
      `;
    }
    return html;
  }

  function renderAuthorizationListRows(list) {
    if (list.length === 0) {
      return `
        <tr class="table w-full table-fixed">
          <td colspan="4" class="px-4 py-6 text-center text-sm text-gray-500">
            No authorization records available.
          </td>
        </tr>
      `;
    }

    return list.map((item, index) => `
      <tr class="table w-full table-fixed border-b hover:bg-gray-50">
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
          ${index + 1}
        </td>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
          ${escapeHtml(item.staff_name || "")}
        </td>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
          Level ${escapeHtml(item.levelType || "")}
        </td>
        <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
          ${escapeHtml(item.authorization?.join(", ") || "N/A")}
        </td>
      </tr>
    `).join("");
  }

  function renderNewAuthorizationTab() {
    const form = authorizationModalStore.formData;
    
    return `
      <div class="p-4">
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="space-y-4">
            <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="text-sm text-[#1D1D1D] w-1/3">
                Name
                <span class="text-red-500">*</span>
              </label>
              <div class="flex flex-col w-3/4 flex-grow">
                <input
                  type="text"
                  id="authModalNameInput"
                  placeholder="Search Name To Select"
                  class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                  value="${escapeHtml(form.name || "")}"
                />
              </div>
            </div>

            <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="text-sm text-[#1D1D1D] w-1/3">
                Level Type
                <span class="text-red-500">*</span>
              </label>
              <div class="flex flex-col w-3/4 flex-grow">
                <select id="authModalLevelSelect" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                  <option value="">Select Level</option>
                  <option value="1" ${form.levelType === "1" ? "selected" : ""}>Level 1</option>
                  <option value="2" ${form.levelType === "2" ? "selected" : ""}>Level 2</option>
                  <option value="3" ${form.levelType === "3" ? "selected" : ""}>Level 3</option>
                  <option value="4" ${form.levelType === "4" ? "selected" : ""}>Level 4</option>
                  <option value="5" ${form.levelType === "5" ? "selected" : ""}>Level 5</option>
                </select>
              </div>
            </div>

            <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="text-sm text-[#1D1D1D] w-1/3">Authorization</label>
              <div class="flex flex-col w-3/4 flex-grow">
                <div class="flex flex-wrap gap-3">
                  <div>
                    <input
                      type="checkbox"
                      class="auth-modal-checkbox accent-[#009333]"
                      id="authModalCheckOT"
                      value="OT"
                      ${form.authorization.includes("OT") ? "checked" : ""}
                    />
                    <label for="authModalCheckOT" class="ms-2">OT</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      class="auth-modal-checkbox accent-[#009333]"
                      id="authModalCheckOD"
                      value="OD"
                      ${form.authorization.includes("OD") ? "checked" : ""}
                    />
                    <label for="authModalCheckOD" class="ms-2">OD</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      class="auth-modal-checkbox accent-[#009333]"
                      id="authModalCheckShiftChange"
                      value="ShiftChange"
                      ${form.authorization.includes("ShiftChange") ? "checked" : ""}
                    />
                    <label for="authModalCheckShiftChange" class="ms-2">Shift Change</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      class="auth-modal-checkbox accent-[#009333]"
                      id="authModalCheckShift"
                      value="Shift"
                      ${form.authorization.includes("Shift") ? "checked" : ""}
                    />
                    <label for="authModalCheckShift" class="ms-2">Shift</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      class="auth-modal-checkbox accent-[#009333]"
                      id="authModalCheckLeave"
                      value="Leave"
                      ${form.authorization.includes("Leave") ? "checked" : ""}
                    />
                    <label for="authModalCheckLeave" class="ms-2">Leave</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      class="auth-modal-checkbox accent-[#009333]"
                      id="authModalCheckPermission"
                      value="Permission"
                      ${form.authorization.includes("Permission") ? "checked" : ""}
                    />
                    <label for="authModalCheckPermission" class="ms-2">Permission</label>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="text-sm text-[#1D1D1D] w-1/3"></label>
              <div class="flex flex-col w-3/4 flex-grow">
                <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition py-2" id="authModalSaveBtn">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function fetchAuthorizationList() {
    // If already fetched and has data, don't refetch
    if (authorizationModalStore.hasFetched && authorizationModalStore.authorizationList.length > 0) {
      return;
    }
    
    // If already loading, don't start another load
    if (authorizationModalStore.isLoading) {
      return;
    }
    
    authorizationModalStore.isLoading = true;
    renderAuthorizationModal();

    setTimeout(() => {
      // Use dummy data for now - in real implementation, this would be an API call
      // Merge with existing data if any, but prefer dummy data
      if (authorizationModalStore.authorizationList.length === 0) {
        authorizationModalStore.authorizationList = [...authorizationModalDummyData];
      }
      authorizationModalStore.isLoading = false;
      authorizationModalStore.hasFetched = true;
      renderAuthorizationModal();
    }, 300);
  }

  function handleNewAuthorization() {
    if (authorizationModalStore.isSaving) return;

    const { name, levelType, authorization } = authorizationModalStore.formData;
    if (!name || !levelType || authorization.length === 0) {
      if (typeof showToast === "function") {
        showToast("Please fill all required fields before saving.", "error");
      } else {
        alert("Please fill all required fields before saving.");
      }
      return;
    }

    authorizationModalStore.isSaving = true;

    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        staff_name: name,
        userID: authorizationModalStore.selectedStaff?.userID || `USR-${Math.floor(Math.random() * 900 + 100)}`,
        levelType,
        authorization: [...authorization],
      };

      authorizationModalDummyData.unshift(newEntry);
      authorizationModalStore.authorizationList.unshift(newEntry);

      authorizationModalStore.formData = {
        name: "",
        levelType: "",
        authorization: [],
      };

      authorizationModalStore.isSaving = false;
      authorizationModalStore.activeTab = "Authorization_list";
      
      if (typeof showToast === "function") {
        showToast("Authorization saved successfully!", "success");
      }
      
      renderAuthorizationModal();
    }, 300);
  }

  function bindAuthorizationModalEvents() {
    $(".auth-backdrop, .close-authorization-modal")
      .off("click")
      .on("click", hide);

    $(".auth-tab")
      .off("click")
      .on("click", function () {
        const tab = $(this).data("tab");
        authorizationModalStore.activeTab = tab;
        
        // Update tab styles
        $(".auth-tab")
          .removeClass("border-[#44745c] text-green-900 bg-white")
          .addClass("border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]");
        $(this)
          .removeClass("border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]")
          .addClass("border-[#44745c] text-green-900 bg-white");
        
        // Fetch data if needed
        if (tab === "Authorization_list" && !authorizationModalStore.hasFetched) {
          fetchAuthorizationList();
        }
        
        renderAuthorizationModal();
      });

    // Form inputs
    $(document)
      .off("input", "#authModalNameInput")
      .on("input", "#authModalNameInput", function () {
        authorizationModalStore.formData.name = $(this).val();
      });

    $(document)
      .off("change", "#authModalLevelSelect")
      .on("change", "#authModalLevelSelect", function () {
        authorizationModalStore.formData.levelType = $(this).val();
      });

    // Checkbox changes
    $(document)
      .off("change", ".auth-modal-checkbox")
      .on("change", ".auth-modal-checkbox", function () {
        const value = $(this).val();
        const isChecked = $(this).is(":checked");
        const auth = authorizationModalStore.formData.authorization;

        if (isChecked) {
          if (!auth.includes(value)) {
            authorizationModalStore.formData.authorization = [...auth, value];
          }
        } else {
          authorizationModalStore.formData.authorization = auth.filter(
            (item) => item !== value
          );
        }
      });

    // Save button
    $(document)
      .off("click", "#authModalSaveBtn")
      .on("click", "#authModalSaveBtn", handleNewAuthorization);

    // Close on Escape key
    $(document).off("keydown.authorizationModal").on("keydown.authorizationModal", function (e) {
      if (e.key === "Escape" && authorizationModalStore.isOpen) {
        hide();
      }
    });
  }

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

  // Export module
  window.authorizationModalModule = {
    show,
    hide,
    getStore: () => authorizationModalStore,
  };
})();
