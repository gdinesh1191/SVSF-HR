// users.js
window.Users = function () {
  // HTML template for Users page
  return `
  
  <div class="h-[calc(100vh-80px)] bg-[#ebeff3]">
  <div class="px-4 pb-2 flex justify-between  items-center">
    <h5 class="text-xl font-bold text-gray-800 ">Users</h5>
    <div class="flex items-center gap-3 mt-2">
      <div class="relative">
        <i class="ri-search-line absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"></i>
        <input id="searchInput" type="text" placeholder="Search Users..." class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] pl-8 !h-[31px] min-w-[220px]" />
      </div>
      <button id="addUserBtn" class="w-full px-2 py-1 text-sm  rounded bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition flex items-center">
        <i class="ri-add-line"></i> Add New User
      </button>
    </div>
  </div>

  <div class="mx-2 h-[calc(100vh-140px)] overflow-y-auto rounded-lg bg-white shadow">
    <table class="w-full">
      <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
        <tr>
          <th class="border-r border-[#ebeff3] p-[0.3rem] text-[12px] text-[#475867] text-center">S.No</th>
          <th class="border-r border-[#ebeff3] p-[0.3rem] text-[12px] text-[#475867] text-left">Name</th>
          <th class="border-r border-[#ebeff3] p-[0.3rem] text-[12px] text-[#475867] text-left">Email</th>
          <th class="border-r border-[#ebeff3] p-[0.3rem] text-[12px] text-[#475867] text-left">Role</th>
          <th class="border-r border-[#ebeff3] p-[0.3rem] text-[12px] text-[#475867] text-left">Status</th>
          <th class="border-r border-[#ebeff3] p-[0.3rem] text-[12px] text-[#475867] text-left">Last Login</th>
          <th class="p-[0.3rem] text-[12px] text-[#475867] text-left">Actions</th>
        </tr>
      </thead>
      <tbody id="usersTbody"></tbody>
    </table>

    <div id="noUsersMsg" class="p-6 text-center text-gray-500 hidden"></div>
  </div>
  <div class="bg-[#ebeff3] px-4 py-3 text-sm text-gray-700 flex items-center justify-start mt-auto">
          Displaying <span id="displayCount" class="text-red-600 mx-1">0</span> of <span id="totalCount" class="text-blue-600 mx-1">0</span> users
        </div>

  
  </div>
  
<div id="filterSidebar"
    class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">

    <!-- Backdrop -->
    <div id="filterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <!-- Sidebar Content -->
    <div id="filterPanel"
        class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col h-[calc(100vh-5.55rem)]">

        <!-- Header -->
        <div
            class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add New User</h5>
            <button id="filterCloseBtn" class="cursor-pointer text-sm">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-4 overflow-y-auto flex-1">

           <form id="userFormUser" class="space-y-4 pb-24 sm:pb-28" autocomplete="off">
        <input type="hidden" id="editingUserIdUser" />

        <!-- Name -->
        <div>
          <label for="nameUser" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input type="text" id="nameUser" class="block w-full text-sm h-[35px] px-3 py-2 text-[#212529] bg-white border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter user name" />
        </div>

        <!-- Email -->
        <div>
          <label for="emailUser" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id="emailUser" class="block w-full text-sm h-[35px] px-3 py-2 text-[#212529] bg-white border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter user email" />
        </div>

       <!-- Role -->
<div>
  <label for="roleSelectUser" class="block text-sm font-medium text-gray-700 mb-1">Role</label>
  <select id="roleSelectUser"
          class="block w-full text-sm h-[35px] px-3 py-2 text-[#212529] bg-white border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]">
    <option value="" selected disabled>Select a role</option>
    <option value="Admin">Admin</option>
    <option value="Editor">Editor</option>
    <option value="Viewer">Viewer</option>
  </select>
</div>

<!-- Status -->
<div>
  <label for="statusSelectUser" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
  <select id="statusSelectUser"
          class="block w-full text-sm h-[35px] px-3 py-2 text-[#212529] bg-white border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]">
    <option value="" selected disabled>Select a status</option>
    <option value="Active">Active</option>
    <option value="Inactive">Inactive</option>
    <option value="Pending">Pending</option>
  </select>
</div>

      </form>
           

        </div>

        <!-- Footer -->
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button id="resetBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">
                Cancel 
            </button>
            <button id="applyBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
              Add User
            </button>
        </div>
    </div>
</div>


  <!-- Customize Menu Modal -->
  <div id="customizeModal" class="fixed inset-0 z-60 hidden items-center justify-center">
    <div class="absolute inset-0 bg-[rgba(0,0,0,0.5)]"></div>
    <div class="relative bg-white rounded-lg w-[640px] max-w-[95%] p-4 shadow-lg z-10">
      <div class="flex items-center justify-between border-b pb-2">
        <h4 id="customizeTitle" class="text-lg font-semibold">Customize Modules</h4>
        <button id="customizeClose" class="p-2"><i class="ri-close-line text-xl"></i></button>
      </div>

      <div class="mt-4">
        <p class="text-sm text-gray-600">Toggle modules the user should have access to.</p>
        <div id="modulesList" class="grid grid-cols-2 gap-3 mt-4"></div>

        <div class="flex justify-end gap-3 mt-6">
          <button id="customizeCancel" class="btn-sm btn-secondary">Cancel</button>
          <button id="customizeSave" class="btn-sm btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>
  `;
};

window.UsersLogic = function () {
  const filterSidebar = document.getElementById("filterSidebar");
  const filterPanel = document.getElementById("filterPanel");
  const filterBackdrop = document.getElementById("filterBackdrop");
  const filterCloseBtn = document.getElementById("filterCloseBtn");

  function openFilter() {
    filterSidebar.classList.remove("opacity-0", "pointer-events-none");
    filterPanel.classList.remove("translate-x-full");
  }

  function closeFilter() {
    filterSidebar.classList.add("opacity-0", "pointer-events-none");
    filterPanel.classList.add("translate-x-full");
  }

  filterBackdrop.addEventListener("click", closeFilter);
  filterCloseBtn.addEventListener("click", closeFilter);
  document.getElementById("addUserBtn").addEventListener("click", openFilter);

  // ------------------ Users Data & Storage ------------------
  const STORAGE_KEY = "users_management_data_v1";
  const DEFAULT_USERS = [
    {
      id: "usr101",
      name: "Alice Johnson",
      email: "alice.j@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-07-25 09:15",
      modules: [],
      photo: "/images/user.png",
    },
    {
      id: "usr103",
      name: "Charlie Brown",
      email: "charlie.b@example.com",
      role: "Viewer",
      status: "Inactive",
      lastLogin: "2024-07-20 11:00",
      modules: [],
      photo: "/images/user.png",
    },
    {
      id: "usr104",
      name: "Diana Prince",
      email: "diana.p@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-07-27 16:00",
      modules: [],
      photo: "/images/user.png",
    },
  ];

  function loadUsers() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      } catch (e) {}
    }
    return DEFAULT_USERS.slice();
  }

  function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }

  let users = loadUsers();
  let filteredUsers = users.slice();

  // ------------------ Utility Functions ------------------
  function escapeHtml(str) {
    if (!str) return "";
    return String(str).replace(
      /[&<"'>]/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#039;",
        }[m])
    );
  }

  function filterUsers(term) {
    term = term.trim().toLowerCase();
    if (!term) return users.slice();
    return users.filter(
      (u) =>
        (u.name && u.name.toLowerCase().includes(term)) ||
        (u.email && u.email.toLowerCase().includes(term)) ||
        (u.role && u.role.toLowerCase().includes(term))
    );
  }

  function renderUsersTable(list) {
    const tbody = document.getElementById("usersTbody");
    tbody.innerHTML = "";
    if (!list.length) {
      document.getElementById("noUsersMsg").classList.remove("hidden");
      document.getElementById("noUsersMsg").innerText = "No users found.";
    } else {
      document.getElementById("noUsersMsg").classList.add("hidden");
    }

    list.forEach((user, idx) => {
      const tr = document.createElement("tr");
      tr.className = "hover:bg-gray-50";
      tr.innerHTML = `
        <td class="text-[14px] border-r border-b border-[#ebeff3] p-[0.3rem] text-gray-900 text-center">${
          idx + 1
        }</td>
        <td class="text-[14px] border-r border-b border-[#ebeff3] p-[0.3rem] text-gray-900 text-left flex items-center gap-2">
          <img src="${user.photo}" class="w-8 h-8 rounded-full" />
          <span class="font-medium">${escapeHtml(user.name)}</span>
        </td>
        <td class="text-[14px] border-r border-b border-[#ebeff3] p-[0.3rem] text-gray-900 text-left">${escapeHtml(
          user.email
        )}</td>
        <td class="text-[14px] border-r border-b border-[#ebeff3] p-[0.3rem] text-gray-900 text-left">${escapeHtml(
          user.role
        )}</td>
        <td class="text-[14px] border-r border-b border-[#ebeff3] p-[0.3rem] text-gray-900 text-left">${escapeHtml(
          user.status
        )}</td>
        <td class="text-[14px] border-r border-b border-[#ebeff3] p-[0.3rem] text-gray-900 text-left">${escapeHtml(
          user.lastLogin
        )}</td>
        <td class="text-[14px] border-b border-[#ebeff3] p-[0.3rem] text-gray-900 text-left">
          <button class="editBtn mr-2 text-blue-600 hover:text-blue-800" data-id="${
            user.id
          }"><i class="ri-pencil-line"></i></button>
          <button class="deleteBtn text-red-500 hover:text-red-700" data-id="${
            user.id
          }"><i class="ri-delete-bin-line"></i></button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById("displayCount").innerText = list.length;
    document.getElementById("totalCount").innerText = users.length;
  }

  // ------------------ Event Listeners ------------------
  setTimeout(() => {
    // ensure DOM injected
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
      filteredUsers = filterUsers(searchInput.value);
      renderUsersTable(filteredUsers);
    });

    renderUsersTable(filteredUsers);

    // edit/delete handlers (delegated)
    document.getElementById("usersTbody").addEventListener("click", (e) => {
      const btn = e.target.closest(".editBtn, .deleteBtn");
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.classList.contains("editBtn"))
        alert(`Edit user ${id} logic here`);
      if (btn.classList.contains("deleteBtn")) {
        if (confirm(`Delete user ${id}?`)) {
          users = users.filter((u) => u.id !== id);
          saveUsers(users);
          filteredUsers = filterUsers(searchInput.value);
          renderUsersTable(filteredUsers);
        }
      }
    });
  }, 0);
};
