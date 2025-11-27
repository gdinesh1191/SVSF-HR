// users.js
window.Users = function() {
    return `
      <div class="min-h-screen bg-[#ebeff3] flex flex-col h-full">
        <!-- Header -->
        <div class="px-4 mb-2 flex justify-between items-center">
          <h5 class="text-xl font-bold text-gray-800">Users</h5>
          <div class="flex items-center gap-3 mt-2">
            <div class="relative">
              <i class="ri-search-line absolute left-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"></i>
              <input type="text" id="usersSearchInput" placeholder="Search Users..." class="form-control pl-7 !h-[31px] min-w-[200px]" />
            </div>
            <button id="usersAddBtn" class="btn-sm btn-primary flex items-center">
              <i class="ri-add-line mr-1"></i> Add New User
            </button>
          </div>
        </div>
  
        <!-- Table -->
        <div class="mx-2 h-[calc(100vh-140px)] overflow-y-auto rounded-lg bg-white" id="usersTableContainer"></div>
  
        <!-- Footer -->
        <div class="bg-[#ebeff3] px-4 py-3 text-sm text-gray-700 flex items-center justify-start mt-auto">
          Displaying <span id="usersDisplayCount" class="text-red-600 mx-1">0</span> of <span id="usersTotalCount" class="text-blue-600 mx-1">0</span> users
        </div>
  
        <!-- Add/Edit User Offcanvas -->
        <div class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300" id="usersOffcanvas">
          <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)]" id="usersOffcanvasOverlay"></div>
          <div class="flex flex-col w-[750px] bg-white transform translate-x-full transition-transform duration-300 ease-in-out" id="usersOffcanvasContent">
            <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
              <h5 id="usersOffcanvasTitle">Add New User</h5>
              <button id="usersCloseOffcanvas" class="cursor-pointer"><i class="ri-close-line text-xl"></i></button>
            </div>
            <div class="flex-1 overflow-y-auto bg-gray-50 p-4" id="usersOffcanvasFormContainer"></div>
          </div>
        </div>
  
        <!-- Customize Modules Modal -->
        <div class="fixed inset-0 z-50 hidden justify-center items-center bg-[rgba(0,0,0,0.5)]" id="usersCustomizeModal">
          <div class="bg-white w-[500px] rounded-lg p-4">
            <div class="flex justify-between items-center mb-4">
              <h5 class="text-lg">Customize User Modules</h5>
              <button id="usersCloseCustomizeModal" class="cursor-pointer"><i class="ri-close-line text-xl"></i></button>
            </div>
            <div id="usersCustomizeModalBody" class="space-y-2"></div>
            <div class="flex justify-end mt-4 gap-2">
              <button id="usersSaveModulesBtn" class="py-1 px-2 text-sm rounded bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer">Save</button>
              <button id="usersCancelModulesBtn" class="py-1 px-2 text-sm rounded bg-[#6c757d] text-white border border-[#6c757d] hover:bg-[#5a6268] cursor-pointer">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };
  
  window.UsersModuleLogic = function() {
    let users = [
      { id: "usr101", name: "Alice Johnson", email: "alice.j@example.com", role: "Admin", status: "Active", lastLogin: "2024-07-25 09:15", modules: ["Master","Report","Profile Settings"], employeeCode:"EMP001" },
      { id: "usr103", name: "Charlie Brown", email: "charlie.b@example.com", role: "Viewer", status: "Inactive", lastLogin: "2024-07-20 11:00", modules: ["Report"], employeeCode:"EMP002" },
      { id: "usr104", name: "Diana Prince", email: "diana.p@example.com", role: "Admin", status: "Active", lastLogin: "2024-07-27 16:00", modules: ["Master","Salary","Leave"], employeeCode:"EMP003" }
    ];
    let filteredUsers = [...users];
    let selectedUser = null;
  
    const searchInput = document.getElementById("usersSearchInput");
    const usersTableContainer = document.getElementById("usersTableContainer");
    const displayCount = document.getElementById("usersDisplayCount");
    const totalCount = document.getElementById("usersTotalCount");
  
    const offcanvas = document.getElementById("usersOffcanvas");
    const offcanvasOverlay = document.getElementById("usersOffcanvasOverlay");
    const offcanvasContent = document.getElementById("usersOffcanvasContent");
    const offcanvasFormContainer = document.getElementById("usersOffcanvasFormContainer");
    const offcanvasTitle = document.getElementById("usersOffcanvasTitle");
    const addUserBtn = document.getElementById("usersAddBtn");
    const closeOffcanvas = document.getElementById("usersCloseOffcanvas");
  
    const customizeModal = document.getElementById("usersCustomizeModal");
    const customizeModalBody = document.getElementById("usersCustomizeModalBody");
    const closeCustomizeModal = document.getElementById("usersCloseCustomizeModal");
    const saveModulesBtn = document.getElementById("usersSaveModulesBtn");
    const cancelModulesBtn = document.getElementById("usersCancelModulesBtn");
  
    const allModules = ["Master","Shift Change","Manual Punch","Reminders","Salary","Approval","Report","Profile Settings","Leave","Shift Approval","Punch Data"];
  
    const renderTable = () => {
      let html = '';
      if(filteredUsers.length>0){
        html += `<table class="w-full"><thead class="sticky top-0 bg-gray-100">
          <tr>
            <th class="th-cell text-[12px] text-[#475867] text-center">S.No</th>
            <th class="th-cell text-[12px] text-[#475867] text-left">Name</th>
            <th class="th-cell text-[12px] text-[#475867] text-left">Email</th>
            <th class="th-cell text-[12px] text-[#475867] text-left">Role</th>
            <th class="th-cell text-[12px] text-[#475867] text-left">Status</th>
            <th class="th-cell text-[12px] text-[#475867] text-left">Last Login</th>
            <th class="th-cell text-[12px] text-[#475867] text-left">Actions</th>
          </tr>
        </thead><tbody>`;
        filteredUsers.forEach((user,index)=>{
          html+=`<tr class="hover:bg-gray-50">
            <td class="td-cell text-center">${index+1}</td>
            <td class="td-cell">${user.name}</td>
            <td class="td-cell">${user.email}</td>
            <td class="td-cell">${user.role}</td>
            <td class="td-cell">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status==="Active"?"bg-green-100 text-green-800":user.status==="Inactive"?"bg-red-100 text-red-800":"bg-yellow-100 text-yellow-800"}">
                ${user.status}
              </span>
            </td>
            <td class="td-cell">${user.lastLogin}</td>
            <td class="td-cell">
              <button class="editBtn text-blue-600 mr-2" data-id="${user.id}"><i class="ri-pencil-line"></i></button>
              <button class="deleteBtn text-red-500 mr-2" data-id="${user.id}"><i class="ri-delete-bin-line"></i></button>
              <button class="customizeBtn text-gray-500" data-id="${user.id}"><i class="ri-settings-3-line"></i></button>
            </td>
          </tr>`;
        });
        html += '</tbody></table>';
      } else {
        html = `<div class="p-6 text-center text-gray-500">No users found.</div>`;
      }
      usersTableContainer.innerHTML = html;
      displayCount.textContent = filteredUsers.length;
      totalCount.textContent = users.length;
  
      document.querySelectorAll(".editBtn").forEach(btn=>{
        btn.addEventListener("click",()=>openOffcanvas(users.find(u=>u.id===btn.dataset.id)));
      });
      document.querySelectorAll(".deleteBtn").forEach(btn=>{
        btn.addEventListener("click",()=>{
          if(confirm("Are you sure?")){
            users = users.filter(u=>u.id!==btn.dataset.id);
            filteredUsers = [...users];
            renderTable();
          }
        });
      });
      document.querySelectorAll(".customizeBtn").forEach(btn=>{
        btn.addEventListener("click",()=>openCustomizeModal(users.find(u=>u.id===btn.dataset.id)));
      });
    };
  
    searchInput.addEventListener("input",()=>{
      const term = searchInput.value.toLowerCase();
      filteredUsers = users.filter(u=>u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term) || u.role.toLowerCase().includes(term) || (u.employeeCode && u.employeeCode.toLowerCase().includes(term)));
      renderTable();
    });
  
    const openOffcanvas = (user=null)=>{
      selectedUser = user;
      offcanvasTitle.textContent = user?"Edit User":"Add New User";
      renderOffcanvasForm();
      offcanvas.classList.remove("opacity-0","pointer-events-none");
      offcanvasContent.classList.remove("translate-x-full");
    };
    const closeOffcanvasFn = ()=>{
      offcanvas.classList.add("opacity-0","pointer-events-none");
      offcanvasContent.classList.add("translate-x-full");
    };
    addUserBtn.addEventListener("click",()=>openOffcanvas());
    closeOffcanvas.addEventListener("click",closeOffcanvasFn);
    offcanvasOverlay.addEventListener("click",closeOffcanvasFn);
  
    const renderOffcanvasForm = ()=>{
      const data = selectedUser || { name:"", email:"", role:"", status:"Active", modules:[] };
      offcanvasFormContainer.innerHTML=`
        <div class="space-y-3">
          <label class="block text-sm">Name</label>
          <input type="text" id="usersFormName" class="block w-full border rounded px-2 py-1" value="${data.name}" />
          <label class="block text-sm">Email</label>
          <input type="email" id="usersFormEmail" class="block w-full border rounded px-2 py-1" value="${data.email}" />
          <label class="block text-sm">Role</label>
          <select id="usersFormRole" class="block w-full border rounded px-2 py-1">
            <option ${data.role==="Admin"?"selected":""}>Admin</option>
            <option ${data.role==="Editor"?"selected":""}>Editor</option>
            <option ${data.role==="Viewer"?"selected":""}>Viewer</option>
          </select>
          <label class="block text-sm">Status</label>
          <select id="usersFormStatus" class="block w-full border rounded px-2 py-1">
            <option ${data.status==="Active"?"selected":""}>Active</option>
            <option ${data.status==="Inactive"?"selected":""}>Inactive</option>
            <option ${data.status==="Pending"?"selected":""}>Pending</option>
          </select>
          <div class="flex justify-end gap-2 mt-4">
            <button id="usersSaveFormBtn" class="py-1 px-2 bg-[#009333] text-white rounded">Save</button>
            <button id="usersCancelFormBtn" class="py-1 px-2 bg-gray-500 text-white rounded">Cancel</button>
          </div>
        </div>
      `;
      document.getElementById("usersSaveFormBtn").addEventListener("click",()=>{
        const newUser = {
          id: selectedUser?selectedUser.id:`usr${users.length+1}`,
          name: document.getElementById("usersFormName").value,
          email: document.getElementById("usersFormEmail").value,
          role: document.getElementById("usersFormRole").value,
          status: document.getElementById("usersFormStatus").value,
          lastLogin: selectedUser?selectedUser.lastLogin:"N/A",
          modules: selectedUser?selectedUser.modules:[]
        };
        if(selectedUser){
          users = users.map(u=>u.id===selectedUser.id?newUser:u);
        } else {
          users.push(newUser);
        }
        filteredUsers = [...users];
        renderTable();
        closeOffcanvasFn();
      });
      document.getElementById("usersCancelFormBtn").addEventListener("click",closeOffcanvasFn);
    };
  
    const openCustomizeModal = (user)=>{
      selectedUser = user;
      customizeModal.classList.remove("hidden");
      customizeModalBody.innerHTML = allModules.map(m=>`
        <label class="flex items-center gap-2">
          <input type="checkbox" value="${m}" ${user.modules.includes(m)?"checked":""}/> ${m}
        </label>
      `).join("");
    };
    const closeCustomizeModalFn = ()=> customizeModal.classList.add("hidden");
    closeCustomizeModal.addEventListener("click",closeCustomizeModalFn);
    cancelModulesBtn.addEventListener("click",closeCustomizeModalFn);
    saveModulesBtn.addEventListener("click",()=>{
      const selectedModules = Array.from(customizeModalBody.querySelectorAll("input:checked")).map(i=>i.value);
      users = users.map(u=>u.id===selectedUser.id?{...u,modules:selectedModules}:u);
      filteredUsers = [...users];
      renderTable();
      closeCustomizeModalFn();
    });
  
    renderTable();
  };
  