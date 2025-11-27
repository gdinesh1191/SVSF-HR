// module/pages/profile/profile.js

// Category definitions
const pageCategories = [
    {
      title: "Profile",
      items: [{ name: "Profile Info", icon: "ri-user-line" }],
    },
    {
      title: "Security",
      items: [{ name: "Change Password", icon: "ri-lock-password-line" }],
    },
  ];
  
  // Component mapping
  const pageComponents = {
    "Profile Info": ProfileInfoComponent, // your other component
    "Change Password": ChangePasswordComponent,
  };
  
  function renderContent() {
    const component = pageComponents[activePage];
  
    if (!component) {
      mainContent.innerHTML = `<p class="text-center text-gray-500">Component not found</p>`;
      return;
    }
  
    mainContent.innerHTML = component();
  
    // Run associated logic after rendering
    const logicFn = window[activePage.replace(/\s+/g, "") + "Logic"];
    if (logicFn) logicFn();
  }
  
  
  // State
  let activePage = "Profile Info";
  let searchTerm = "";
  
  // DOM
  const sidebarList = document.getElementById("sidebarList");
  const searchInput = document.getElementById("searchInput");
  const mainContent = document.getElementById("mainContent");
  
  // Render Sidebar
  function renderSidebar() {
    const filtered = pageCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((c) => c.items.length > 0);
  
    sidebarList.innerHTML = "";
  
    if (filtered.length === 0) {
      sidebarList.innerHTML = `<div class="text-center text-gray-500">No Pages found</div>`;
      return;
    }
  
    filtered.forEach((category) => {
      const catDiv = document.createElement("div");
  
      catDiv.innerHTML = `
        <p class="py-1 cursor-pointer">${category.title}</p>
        <ul class="space-y-1"></ul>
      `;
  
      const ul = catDiv.querySelector("ul");
  
      category.items.forEach((item) => {
        const li = document.createElement("li");
  
        li.className =
          "cursor-pointer p-1 rounded-sm transition " +
          (activePage === item.name
            ? "bg-[#f0f0f0] text-green-600"
            : "hover:bg-gray-100");
  
        li.innerHTML = `
          <i class="${item.icon} text-lg mr-2"></i>
          ${item.name}
        `;
  
        li.onclick = () => {
          activePage = item.name;
          renderSidebar();
          renderContent();
        };
  
        ul.appendChild(li);
      });
  
      sidebarList.appendChild(catDiv);
    });
  }
  
  
  
  // Search Handler
  searchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderSidebar();
  });
  
  // Initial Load
  renderSidebar();
  renderContent();
  