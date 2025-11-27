// roles.js
window.Roles = function() {
    return `
      <div class="bg-white p-6 rounded shadow flex flex-col min-h-[calc(100vh-103px)]">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Roles</h2>

        <!-- Roles Tabs / Buttons -->
        <div class="flex mb-4">
          <button id="newRoleBtn" class="px-4 py-2 bg-green-600 text-white rounded">New Role</button>
        </div>

        <!-- Roles List Container -->
        <div id="rolesContent" class="flex-1 overflow-y-auto max-h-[calc(100vh-120px)]"></div>

        <!-- New Role Modal -->
        <div id="roleModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); justify-content:center; align-items:center;">
          <div style="background:white; padding:20px; width:600px; border-radius:8px;">
            <h3>New Role</h3>
            <input id="roleName" placeholder="Role Name" class="w-full mb-2">
            <textarea id="roleDesc" placeholder="Description" class="w-full mb-2"></textarea>
            
            <h4 class="font-semibold mt-3 mb-1">Permissions</h4>
            <div id="permissionsContainer" class="space-y-2 max-h-[300px] overflow-y-auto border p-2 rounded"></div>

            <div class="mt-3 flex justify-end gap-2">
              <button id="saveRoleBtn" class="px-3 py-1 bg-green-600 text-white rounded">Save</button>
              <button id="cancelRoleBtn" class="px-3 py-1 bg-gray-400 text-white rounded">Cancel</button>
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
        { name: "Staff (Assigned Customers Only)", description: "Access to all modules, transactions and data of assigned customers and all vendors except banking, reports, settings and accountant." },
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

    // --- Render Roles List ---
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
                    <button onclick="window.RolesLogic.editRole(${i})" class="px-2 py-1 bg-blue-600 text-white rounded text-xs">Edit</button>
                </td>
            </tr>`;
        });
        html += `</tbody></table>`;
        contentContainer.innerHTML = html;
    };

    // --- Render Permissions in Modal ---
    const renderPermissions = (permObj) => {
        let html = "";
        Object.keys(permObj).forEach(section => {
            html += `<div class="border-b pb-1 mb-1">
                <strong>${section.charAt(0).toUpperCase()+section.slice(1)}</strong><br/>`;
            Object.keys(permObj[section]).forEach(p => {
                html += `<label class="inline-flex items-center mr-2">
                    <input type="checkbox" data-section="${section}" data-permission="${p}" ${permObj[section][p]?'checked':''}>
                    <span class="ml-1 text-sm">${p}</span>
                </label>`;
            });
            html += `</div>`;
        });
        permissionsContainer.innerHTML = html;
    };

    // --- Show / Hide Modal ---
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
        attachPermissionListeners();
    };

    // --- Save Role ---
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
        if(activeRole) {
            activeRole.name = name;
            activeRole.description = desc;
            activeRole.permissions = newPerms;
        } else {
            roles.push({ name, description: desc, permissions: newPerms });
        }
        renderRoles();
        toggleModal();
    };

    // --- Edit Role ---
    window.RolesLogic.editRole = (index) => {
        toggleModal(roles[index]);
    };

    // --- Attach permission checkbox listeners ---
    const attachPermissionListeners = () => {
        const permInputs = permissionsContainer.querySelectorAll("input[type=checkbox]");
        permInputs.forEach(inp => {
            inp.onchange = () => {
                const section = inp.dataset.section;
                const permission = inp.dataset.permission;
                if(permission==="fullAccess") {
                    Object.keys(activeRole ? activeRole.permissions[section] : permissionsTemplate[section]).forEach(p => {
                        permissionsContainer.querySelector(`input[data-section="${section}"][data-permission="${p}"]`).checked = inp.checked;
                    });
                }
            };
        });
    };

    // --- Event Listeners ---
    document.getElementById("newRoleBtn").onclick = () => toggleModal();
    document.getElementById("saveRoleBtn").onclick = saveRole;
    document.getElementById("cancelRoleBtn").onclick = () => toggleModal();

    // Initial render
    renderRoles();
};
