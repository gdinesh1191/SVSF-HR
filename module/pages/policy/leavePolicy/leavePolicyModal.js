// Authorization Modal Component - Plain JavaScript
const leavePolicyModalStore = {
  activeTab: "LeavePolicy_list",
  authorizationList: [],
  formData: {
    name: "",
    levelType: "",
    authorization: [],
  },
  staffSuggestions: [],
  hasFetched: false,
  isSaving: false,
  isLoading: false,
};

const leavePolicyModalDummyData = [
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

// DOM Elements
const leavePolicyModalEls = {
  container: null,
  tabs: null,
  listContent: null,
  formContent: null,
};

function initAuthorizationModal(containerSelector) {
  if (!containerSelector) {
    containerSelector = "#leavePolicyContent";
  }
  leavePolicyModalEls.container = $(containerSelector);
  if (!leavePolicyModalEls.container || !leavePolicyModalEls.container.length) return;

  cacheAuthModalElements();
  bindAuthModalEvents();
  renderLeavePolicyModal();
  fetchLeavePolicyList();
}

function cacheAuthModalElements() {
  leavePolicyModalEls.tabs = leavePolicyModalEls.container.find(".leave-modal-tab");
  leavePolicyModalEls.listContent = leavePolicyModalEls.container.find(
    "#leaveModalListContent"
  );
  leavePolicyModalEls.formContent = leavePolicyModalEls.container.find(
    "#leaveModalFormContent"
  );
}

function bindAuthModalEvents() {
  // Tab switching
  $(document).on("click", ".leave-modal-tab", function () {
    const tab = $(this).data("tab");
    if (tab) {
      setActiveTab(tab);
    }
  });

  // Form inputs
  $(document).on("input", "#leaveModalNameInput", function () {
    leavePolicyModalStore.formData.name = $(this).val();
  });

  $(document).on("change", "#leaveModalLevelSelect", function () {
    leavePolicyModalStore.formData.levelType = $(this).val();
  });

  // Checkbox changes
  $(document).on("change", ".leave-modal-checkbox", function () {
    const value = $(this).val();
    const isChecked = $(this).is(":checked");
    const auth = leavePolicyModalStore.formData.authorization;

    if (isChecked) {
      if (!auth.includes(value)) {
        leavePolicyModalStore.formData.authorization = [...auth, value];
      }
    } else {
      leavePolicyModalStore.formData.authorization = auth.filter(
        (item) => item !== value
      );
    }
  });

  // Save button
  $(document).on("click", "#leaveModalSaveBtn", handleNewLeavePolicy);
}

function setActiveTab(tab) {
  leavePolicyModalStore.activeTab = tab;

  // Update tab styles
  $(".leave-modal-tab")
    .removeClass("border-[#44745c] text-green-900 bg-white")
    .addClass(
      "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
    );

  $(`.leave-modal-tab[data-tab="${tab}"]`)
    .removeClass(
      "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
    )
    .addClass("border-[#44745c] text-green-900 bg-white");

  // Show/hide content
  $("#leaveModalListContent").toggle(tab === "LeavePolicy_list");
  $("#leaveModalFormContent").toggle(tab === "New_LeavePolicy");

  if (tab === "LeavePolicy_list" && !leavePolicyModalStore.hasFetched) {
    leavePolicyModalStore.hasFetched = true;
    fetchLeavePolicyList();
  }
}

function handleNameSelect(item) {
  if (item) {
    leavePolicyModalStore.formData.name = item.name;
    $("#leaveModalNameInput").val(item.name);
  }
}

function handleNewLeavePolicy() {
  if (leavePolicyModalStore.isSaving) return;

  const { name, levelType, authorization } = leavePolicyModalStore.formData;
  if (!name || !levelType || authorization.length === 0) {
    alert("Please fill all required fields before saving.");
    return;
  }

  leavePolicyModalStore.isSaving = true;

  setTimeout(() => {
    const newEntry = {
      id: Date.now(),
      staff_name: name,
      userID: `USR-${Math.floor(Math.random() * 900 + 100)}`,
      levelType,
      authorization: [...authorization],
    };

    leavePolicyModalDummyData.unshift(newEntry);
    leavePolicyModalStore.authorizationList.unshift(newEntry);

    leavePolicyModalStore.formData = {
      name: "",
      levelType: "",
      authorization: [],
    };

    $("#leaveModalNameInput").val("");
    $("#leaveModalLevelSelect").val("");
    $(".leave-modal-checkbox").prop("checked", false);

    leavePolicyModalStore.isSaving = false;
    setActiveTab("LeavePolicy_list");
    renderAuthorizationList();
  }, 300);
}

function fetchLeavePolicyList() {
  leavePolicyModalStore.isLoading = true;
  renderAuthorizationList();

  setTimeout(() => {
    leavePolicyModalStore.authorizationList = [
      ...leavePolicyModalDummyData,
    ];
    leavePolicyModalStore.isLoading = false;
    renderAuthorizationList();
  }, 100);
}

function renderLeavePolicyModal() {
  if (!leavePolicyModalEls.container || !leavePolicyModalEls.container.length) return;

  const html = `
    <!-- Tabs -->
    <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
      <button
        class="leave-modal-tab px-3 py-2 border-b-2 font-medium cursor-pointer border-[#44745c] text-green-900 bg-white"
        data-tab="LeavePolicy_list"
      >
        Authorization list
      </button>
      <button
        class="leave-modal-tab px-3 py-2 border-b-2 font-medium cursor-pointer border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
        data-tab="New_LeavePolicy"
      >
        New Authorization
      </button>
    </div>

    <!-- Scrollable Content -->
    <div class="overflow-y-auto flex-1">
      <!-- List Content -->
      <div id="leaveModalListContent" class="p-4">
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
            <tbody id="authModalListBody">
            </tbody>
          </table>
        </div>
      </div>

      <!-- Form Content -->
      <div id="leaveModalFormContent" class="mb-6 bg-white p-4 rounded-lg shadow-sm hidden">
        <div class="space-y-4">
          <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label class="text-sm text-[#1D1D1D] w-1/3">
              Name
              <span class=" text-red-500">*</span>
            </label>
            <div class="flex flex-col w-3/4 flex-grow">
              <input
                type="text"
                id="leaveModalNameInput"
                placeholder="Search Name To Select"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${escapeHtml(leavePolicyModalStore.formData.name)}"
              />
            </div>
          </div>

          <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label class="text-sm text-[#1D1D1D] w-1/3">
              Level Type
              <span class=" text-red-500">*</span>
            </label>
            <div class="flex flex-col w-3/4 flex-grow">
              <select id="leaveModalLevelSelect" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                <option value="">Select Level</option>
                <option value="1" ${
                  leavePolicyModalStore.formData.levelType === "1"
                    ? "selected"
                    : ""
                }>Level 1</option>
                <option value="2" ${
                  leavePolicyModalStore.formData.levelType === "2"
                    ? "selected"
                    : ""
                }>Level 2</option>
                <option value="3" ${
                  leavePolicyModalStore.formData.levelType === "3"
                    ? "selected"
                    : ""
                }>Level 3</option>
                <option value="4" ${
                  leavePolicyModalStore.formData.levelType === "4"
                    ? "selected"
                    : ""
                }>Level 4</option>
                <option value="5" ${
                  leavePolicyModalStore.formData.levelType === "5"
                    ? "selected"
                    : ""
                }>Level 5</option>
              </select>
            </div>
          </div>

          <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label class="text-sm text-[#1D1D1D] w-1/3">Authorization</label>
            <div class="flex flex-col w-3/4 flex-grow">
              <div class="flex grid-col grid-col-3 gap-3">
                <div>
                  <input
                    type="checkbox"
                    class="leave-modal-checkbox accent-[#009333] "
                    id="authModalCheckOT"
                    value="OT"
                    ${
                      leavePolicyModalStore.formData.authorization.includes(
                        "OT"
                      )
                        ? "checked"
                        : ""
                    }
                  />
                  <label for="authModalCheckOT" class="ms-2">OT</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="leave-modal-checkbox accent-[#009333] "
                    id="authModalCheckOD"
                    value="OD"
                    ${
                      leavePolicyModalStore.formData.authorization.includes(
                        "OD"
                      )
                        ? "checked"
                        : ""
                    }
                  />
                  <label for="authModalCheckOD" class="ms-2">OD</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="leave-modal-checkbox accent-[#009333] "
                    id="authModalCheckShiftChange"
                    value="ShiftChange"
                    ${
                      leavePolicyModalStore.formData.authorization.includes(
                        "ShiftChange"
                      )
                        ? "checked"
                        : ""
                    }
                  />
                  <label for="authModalCheckShiftChange" class="ms-2">Shift Change</label>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label class="text-sm text-[#1D1D1D] w-1/3"></label>
            <div class="flex flex-col w-3/4 flex-grow">
              <div class="flex grid-col grid-col-3 gap-3">
                <div>
                  <input
                    type="checkbox"
                    class="leave-modal-checkbox accent-[#009333] "
                    id="authModalCheckShift"
                    value="Shift"
                    ${
                      leavePolicyModalStore.formData.authorization.includes(
                        "Shift"
                      )
                        ? "checked"
                        : ""
                    }
                  />
                  <label for="authModalCheckShift" class="ms-2">Shift</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="leave-modal-checkbox accent-[#009333] "
                    id="authModalCheckLeave"
                    value="Leave"
                    ${
                      leavePolicyModalStore.formData.authorization.includes(
                        "Leave"
                      )
                        ? "checked"
                        : ""
                    }
                  />
                  <label for="authModalCheckLeave" class="ms-2">Leave</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="leave-modal-checkbox accent-[#009333] "
                    id="authModalCheckPermission"
                    value="Permission"
                    ${
                      leavePolicyModalStore.formData.authorization.includes(
                        "Permission"
                      )
                        ? "checked"
                        : ""
                    }
                  />
                  <label for="authModalCheckPermission" class="ms-2">Permission</label>
                </div>
              </div>
            </div>
          </div>

          <div class="mb-[15px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <label class="text-sm text-[#1D1D1D] w-1/3"></label>
            <div class="flex flex-col w-3/4 flex-grow">
              <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition py-2" id="leaveModalSaveBtn">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  leavePolicyModalEls.container.html(html);
  cacheAuthModalElements();
  renderAuthorizationList();
}

function renderAuthorizationList() {
  const tbody = $("#authModalListBody");
  if (!tbody || !tbody.length) return;

  let html = "";

  if (leavePolicyModalStore.isLoading) {
    // Show shimmer loading
    for (let i = 0; i < 29; i++) {
      html += `
        <tr class="animate-pulse table w-full">
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded animate-pulse"></div></td>
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded animate-pulse"></div></td>
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded animate-pulse"></div></td>
          <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"><div class="h-4 bg-gray-200 rounded animate-pulse"></div></td>
        </tr>
      `;
    }
  } else if (leavePolicyModalStore.authorizationList.length > 0) {
    leavePolicyModalStore.authorizationList.forEach((item, index) => {
      html += `
        <tr class="table w-full table-fixed border-b hover:bg-gray-50">
          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
            ${index + 1}
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
            ${escapeHtml(item.staff_name || "")}
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
            ${escapeHtml(item.levelType || "")}
          </td>
          <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
            ${escapeHtml(item.authorization?.join(", ") || "N/A")}
          </td>
        </tr>
      `;
    });
  } else {
    html = `
      <tr class="table w-full table-fixed">
        <td colspan="4" class="px-4 py-6 text-center text-sm text-gray-500">
          No authorization records available.
        </td>
      </tr>
    `;
  }

  tbody.html(html);
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
window.initAuthorizationModal = initAuthorizationModal;
window.authorizationModalModule = {
  initAuthorizationModal,
  fetchLeavePolicyList,
  getStore: () => leavePolicyModalStore,
};
