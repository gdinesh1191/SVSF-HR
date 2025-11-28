// roles.js
window.Roles = function() {
    return `
      <div class="bg-white p-6 rounded shadow flex flex-col min-h-[calc(100vh-103px)]">
      
        <div class="flex items-center justify-between px-6 pb-3 pt-2 border-b border-gray-200">
  <h2 class="text-xl font-semibold text-gray-900">Roles</h2>
  <button id="newRoleBtn" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
    New Role
  </button>
</div>

  
        <!-- Roles List Container -->
        <div id="rolesContent" class="flex-1 overflow-y-auto max-h-[calc(100vh-120px)]"></div>
  
        <!-- New Role Modal -->
        <div id="roleModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); justify-content:center; align-items:center;">
          <div style="background:white; padding:20px; width:700px; border-radius:8px; max-height:90vh; overflow-y:auto;">
            <h3 class="text-lg font-semibold mb-2">New Role</h3>
            <input id="roleName" placeholder="Role Name" class="w-full block mb-4 w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
            <textarea id="roleDesc" placeholder="Description" class="w-full block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"></textarea>
            
            <h4 class="font-semibold mt-3 mb-1">Permissions</h4>
            <div id="permissionsContainer" class="space-y-2 max-h-[300px] overflow-y-auto border p-2 rounded"></div>
  
            <div class="mt-3 flex justify-end gap-2">
              <button id="saveRoleBtn" class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">Save</button>
              <button id="cancelRoleBtn" class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  window.RolesLogic = function() {
    const roles = [
      { name: "Admin", description: "Unrestricted access to all modules." },
      { name: "Staff", description: "Access to all modules except reports, settings and accountant." },
      { name: "Staff (Assigned Customers Only)", description: "Access to assigned customers/vendors except banking, reports, settings, accountant." },
      { name: "TimesheetStaff", description: "TimesheetStaff Role" },
    ];
  
    const permissionsTemplate = {
      customers: { fullAccess:false, view:false, create:false, edit:false, delete:false, assignOwner:false },
      vendors: { fullAccess:false, view:false, create:false, edit:false, delete:false },
      items: { fullAccess:false, view:false, create:false, edit:false, delete:false },
      inventoryAdjustments: { fullAccess:false, view:false, create:false, edit:false, delete:false, approve:false },
      priceList: { fullAccess:false, view:false, create:false, edit:false, delete:false },
      banking: { fullAccess:false, view:false, create:false, edit:false, delete:false },
    };
  
    let activeRole = null;
  
    const contentContainer = document.getElementById("rolesContent");
    const roleModal = document.getElementById("roleModal");
    const permissionsContainer = document.getElementById("permissionsContainer");
  
    // Render roles list
    const renderRoles = () => {
      let html = `<table class="w-full text-sm border border-gray-300">
        <thead>
          <tr class="bg-gray-100 text-left">
            <th class="px-3 py-2 w-40">Role Name</th>
            <th class="px-3 py-2">Description</th>
            <th class="px-3 py-2 w-36 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>`;
      roles.forEach((r, i) => {
        html += `<tr class="border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
          <td class="px-3 py-2 text-green-700">${r.name}</td>
          <td class="px-3 py-2">${r.description}</td>
          <td class="px-3 py-2 text-center">
            <button onclick="window.RolesLogic.editRole(${i})" class="px-4 py-3 text-center text-sm font-medium text-gray-900 ">Edit</button>
          </td>
        </tr>`;
      });
      html += `</tbody></table>`;
      contentContainer.innerHTML = html;
    };
  
    // Render permissions checkboxes
    const renderPermissions = (permObj) => {
        let html = "";
        Object.keys(permObj).forEach(section => {
          html += `<div class="border-b pb-2 mb-2">
            <strong class="text-gray-800">${section.charAt(0).toUpperCase() + section.slice(1)}</strong><br/>`;
      
          Object.keys(permObj[section]).forEach(p => {
            html += `
              <label class="inline-flex items-center cursor-pointer mr-4 mb-1">
                <input
                  type="checkbox"
                  class="form-checkbox h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-2 focus:ring-green-500"
                  data-section="${section}"
                  data-permission="${p}"
                  ${permObj[section][p] ? 'checked' : ''}
                >
                <span class="ml-2 text-sm text-gray-700">${p}</span>
              </label>
            `;
          });
      
          html += `</div>`;
        });
      
        permissionsContainer.innerHTML = html;
        attachPermissionListeners();
      };
      
  
    // Show/hide modal
    const toggleModal = (role=null) => {
      activeRole = role;
      roleModal.style.display = roleModal.style.display==="flex"?"none":"flex";
      if(role){
        document.getElementById("roleName").value = role.name;
        document.getElementById("roleDesc").value = role.description;
        renderPermissions(role.permissions);
      } else {
        document.getElementById("roleName").value = "";
        document.getElementById("roleDesc").value = "";
        renderPermissions(JSON.parse(JSON.stringify(permissionsTemplate)));
      }
    };
  
    // Save role
    const saveRole = () => {
      const name = document.getElementById("roleName").value;
      const desc = document.getElementById("roleDesc").value;
      const permInputs = permissionsContainer.querySelectorAll("input[type=checkbox]");
      const newPerms = JSON.parse(JSON.stringify(permissionsTemplate));
      permInputs.forEach(inp => {
        const section = inp.dataset.section;
        const permission = inp.dataset.permission;
        newPerms[section][permission] = inp.checked;
      });
  
      if(activeRole){
        activeRole.name = name;
        activeRole.description = desc;
        activeRole.permissions = newPerms;
      } else {
        roles.push({ name, description: desc, permissions: newPerms });
      }
      renderRoles();
      toggleModal();
    };
  
    // Edit role
    window.RolesLogic.editRole = (index) => {
      toggleModal(roles[index]);
    };
  
    // FullAccess handling
    const attachPermissionListeners = () => {
      const permInputs = permissionsContainer.querySelectorAll("input[type=checkbox]");
      permInputs.forEach(inp => {
        inp.onchange = () => {
          const section = inp.dataset.section;
          const permission = inp.dataset.permission;
          if(permission==="fullAccess"){
            permInputs.forEach(i => {
              if(i.dataset.section===section){
                i.checked = inp.checked;
              }
            });
          }
        };
      });
    };
  
    // Event listeners
    document.getElementById("newRoleBtn").onclick = () => toggleModal();
    document.getElementById("saveRoleBtn").onclick = saveRole;
    document.getElementById("cancelRoleBtn").onclick = () => toggleModal();
  
    renderRoles();
  };
  