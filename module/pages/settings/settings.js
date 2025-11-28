// Setting categories and items
const settingCategories = [
    { title: "Organization", items: [{ name: "Profile", icon: "ri-user-settings-line" }] },
    { title: "Management", items: [{ name: "Users", icon: "ri-group-line" }, { name: "Roles", icon: "ri-shield-user-line" }] },
    { title: "Alerts", items: [{ name: "Reminders", icon: "ri-alarm-line" }, { name: "SMS Notifications", icon: "ri-message-2-line" }] },
  ];
  
  const componentMap = {
    "Profile": "ProfileSettings",
    "Reminders": "Reminders",
    "SMS Notifications": "SMSNotifications",
    "Users": "Users",
    "Roles": "Roles",
    "Subscription": "Subscription"
  };
  
  let activeSetting = settingCategories[0].items[0].name;
  let activeCategory = settingCategories[0].title;
  let searchTerm = "";
  
  const sidebarList = document.getElementById("sidebarList");
  const searchInput = document.getElementById("searchInput");
  const mainContent = document.getElementById("mainContent");
  
  // Render sidebar
  function renderSidebar() {
    const filteredCategories = settingCategories
      .map(cat => ({ ...cat, items: cat.items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) }))
      .filter(cat => cat.items.length > 0);
  
    sidebarList.innerHTML = "";
    filteredCategories.forEach(cat => {
      const catDiv = document.createElement("div");
      catDiv.innerHTML = `<p class="font-semibold text-gray-700 py-1 cursor-pointer">${cat.title}</p><ul class="space-y-1"></ul>`;
      const ul = catDiv.querySelector("ul");
  
      cat.items.forEach(item => {
        const li = document.createElement("li");
        li.className = `cursor-pointer p-1 rounded transition-colors duration-200 ${
          activeSetting === item.name && activeCategory === cat.title ? "bg-[#f0f0f0] text-[#009333]" : "hover:bg-gray-100"
        }`;
        li.innerHTML = `<i class="${item.icon} text-lg me-2"></i>${item.name}`;
        li.onclick = () => {
          activeSetting = item.name;
          activeCategory = cat.title;
          renderSidebar();
          renderContent();
        };
        ul.appendChild(li);
      });
  
      sidebarList.appendChild(catDiv);
    });
  }
  
  function renderContent() {
    const fnName = componentMap[activeSetting];
    const componentFn = fnName && window[fnName] ? window[fnName] : () => `<p>Component not found</p>`;
    mainContent.innerHTML = componentFn();
  
    const logicFn = fnName && window[fnName+"Logic"] ? window[fnName+"Logic"] : null;
    if (logicFn) requestAnimationFrame(() => logicFn());
  }
  
  
  // Search handler
  searchInput.addEventListener("input", e => {
    searchTerm = e.target.value;
    renderSidebar();
  });
  
  // Initial render
  renderSidebar();
  renderContent();
  