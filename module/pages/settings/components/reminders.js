// reminders.js
window.Reminders = function() {
    return `
      <div class="bg-white p-6 rounded shadow flex flex-col min-h-[calc(100vh-103px)]">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Reminders</h2>
  
        <!-- Tabs -->
        <div class="flex border-b border-gray-200 mb-4">
          <button class="tab-btn py-2 px-4 text-sm font-medium border-b-2 border-transparent" data-tab="invoices">Invoices</button>
          <button class="tab-btn py-2 px-4 text-sm font-medium border-b-2 border-transparent" data-tab="bills">Bills</button>
        </div>
  
        <!-- Table container -->
        <div id="remindersContent" class="flex-1 overflow-y-auto max-h-[calc(100vh-120px)]"></div>
      </div>
  
      <!-- Modal -->
      <div id="reminderModal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.5); justify-content:center; align-items:center;">
        <div style="background:white; padding:20px; width:400px; border-radius:8px;">
          <h3>Edit Reminder</h3>
          <input id="modalName" placeholder="Name" class="w-full mb-2">
          <input id="modalDays" type="number" placeholder="Days" class="w-full mb-2">
          <select id="modalTime" class="w-full mb-2">
            <option value="Before">Before</option>
            <option value="After">After</option>
          </select>
          <input id="modalBasis" placeholder="Basis" class="w-full mb-2">
          <input id="modalTo" placeholder="To Email" class="w-full mb-2">
          <input id="modalCc" placeholder="Cc Email" class="w-full mb-2">
          <input id="modalBcc" placeholder="Bcc Email" class="w-full mb-2">
          <label><input type="checkbox" id="modalEnabled"> Enabled</label>
          <div class="mt-3 flex justify-end gap-2">
            <button id="modalSave" class="px-3 py-1 bg-green-600 text-white rounded">Save</button>
            <button id="modalCancel" class="px-3 py-1 bg-gray-400 text-white rounded">Cancel</button>
          </div>
        </div>
      </div>
    `;
  };
  
  window.RemindersLogic = function() {
    const invoiceReminders = {
      paymentExpected: { name:"Payment Expected", scheduleDays:0, scheduleTime:"After", scheduleBasis:"expected payment date", toEmail:"", ccEmail:"", bccEmail:"", enabled:false },
      reminder1: { name:"Reminder - 1", scheduleDays:0, scheduleTime:"After", scheduleBasis:"due date", toEmail:"", ccEmail:"", bccEmail:"", enabled:false },
      reminder2: { name:"Reminder - 2", scheduleDays:0, scheduleTime:"After", scheduleBasis:"due date", toEmail:"", ccEmail:"", bccEmail:"", enabled:false },
      reminder3: { name:"Reminder - 3", scheduleDays:0, scheduleTime:"After", scheduleBasis:"due date", toEmail:"", ccEmail:"", bccEmail:"", enabled:false },
    };
    const billReminders = {
      paymentExpected: { name:"Payment Expected", scheduleDays:0, scheduleTime:"Before", scheduleBasis:"expected payment date", toEmail:"", ccEmail:"", bccEmail:"", enabled:false },
      defaultReminder: { name:"Default", scheduleDays:0, scheduleTime:"Before", scheduleBasis:"bill due date", toEmail:"", ccEmail:"", bccEmail:"", enabled:false },
    };
  
    let activeTab = "invoices";
    let currentReminder = null;
  
    const contentContainer = document.getElementById("remindersContent");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const modal = document.getElementById("reminderModal");
  
    // --- Helpers ---
    const toggleModal = (reminder) => {
      if(reminder) currentReminder = {...reminder};
      modal.style.display = modal.style.display==="flex"?"none":"flex";
      if(reminder) populateModal(currentReminder);
    };
  
    const populateModal = (reminder) => {
      document.getElementById("modalName").value = reminder.name;
      document.getElementById("modalDays").value = reminder.scheduleDays;
      document.getElementById("modalTime").value = reminder.scheduleTime;
      document.getElementById("modalBasis").value = reminder.scheduleBasis;
      document.getElementById("modalTo").value = reminder.toEmail;
      document.getElementById("modalCc").value = reminder.ccEmail;
      document.getElementById("modalBcc").value = reminder.bccEmail;
      document.getElementById("modalEnabled").checked = reminder.enabled;
    };
  
    const saveModal = () => {
      if(!currentReminder) return;
      currentReminder.name = document.getElementById("modalName").value;
      currentReminder.scheduleDays = parseInt(document.getElementById("modalDays").value)||0;
      currentReminder.scheduleTime = document.getElementById("modalTime").value;
      currentReminder.scheduleBasis = document.getElementById("modalBasis").value;
      currentReminder.toEmail = document.getElementById("modalTo").value;
      currentReminder.ccEmail = document.getElementById("modalCc").value;
      currentReminder.bccEmail = document.getElementById("modalBcc").value;
      currentReminder.enabled = document.getElementById("modalEnabled").checked;
  
      // Save back
      const key = Object.keys(invoiceReminders).find(k=>invoiceReminders[k].name===currentReminder.name) ||
                  Object.keys(billReminders).find(k=>billReminders[k].name===currentReminder.name);
      if(activeTab==="invoices") invoiceReminders[key] = {...currentReminder};
      else billReminders[key] = {...currentReminder};
      renderContent();
      toggleModal();
    };
  
    // --- Render ---
    const renderTabs = () => {
      tabButtons.forEach(b=>b.classList.remove("border-b-2","border-green-600","text-green-600"));
      const currentBtn = Array.from(tabButtons).find(b=>b.dataset.tab===activeTab);
      currentBtn?.classList.add("border-b-2","border-green-600","text-green-600");
    };
  
    const renderContent = () => {
      const data = activeTab==="invoices"?invoiceReminders:billReminders;
      let html = `<table class="w-full text-sm border border-gray-300">
        <thead><tr class="bg-gray-100 text-left">
        <th class="px-3 py-2 w-40">NAME</th>
        <th class="px-3 py-2 w-60">SCHEDULE</th>
        <th class="px-3 py-2 w-20 text-center">STATUS</th>
        <th class="px-3 py-2 w-20 text-center">ACTIONS</th>
        </tr></thead><tbody>`;
  
      Object.keys(data).forEach(key=>{
        const r = data[key];
        html+=`<tr class="border-b border-gray-200">
          <td class="px-3 py-2 text-green-700 cursor-pointer">${r.name}</td>
          <td class="px-3 py-2">Remind me ${r.scheduleDays} day(s) ${r.scheduleTime} ${r.scheduleBasis}</td>
          <td class="px-3 py-2 text-center"><input type="checkbox" ${r.enabled?"checked":""} onclick="window.RemindersLogic.toggleModal(invoiceReminders['${key}']||billReminders['${key}'])"></td>
          <td class="px-3 py-2 text-center"><button onclick="window.RemindersLogic.toggleModal(invoiceReminders['${key}']||billReminders['${key}'])">Edit</button></td>
        </tr>`;
      });
  
      html+=`<tr><td colspan="4" class="px-3 py-2 cursor-pointer text-green-600 font-medium" onclick="alert('New Reminder')">+ New Reminder</td></tr>`;
      html+=`</tbody></table>`;
      contentContainer.innerHTML = html;
    };
  
    // --- Event Listeners ---
    tabButtons.forEach(btn=>btn.addEventListener("click",()=>{activeTab=btn.dataset.tab; renderTabs(); renderContent();}));
    document.getElementById("modalSave").onclick = saveModal;
    document.getElementById("modalCancel").onclick = () => toggleModal();
  
    // Expose toggleModal for inline onclick
    window.RemindersLogic.toggleModal = toggleModal;
  
    // Initial render
    renderTabs();
    renderContent();
  };
  