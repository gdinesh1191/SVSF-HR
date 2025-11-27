<div class="flex h-screen">
    <!-- Sidebar -->
    <aside class="w-60 bg-[#f8f9fa]  flex flex-col p-3">
      <div class="relative mb-4">
        <i class="ri-search-line absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input type="text" placeholder="Search here..." id="searchInput" class="w-full pl-7 py-2 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
      </div>
      <div id="sidebarList" class="flex-1 overflow-y-auto space-y-2"></div>
    </aside>

    <!-- Main content -->
    <main class="flex-1" id="mainContent">
      <!-- JS will inject the selected setting component here -->
    </main>
  </div>

  <!-- Components -->
  <script src="/module/pages/settings/components/profile.js"></script>
  <script src="/module/pages/settings/components/reminders.js"></script>
  <script src="/module/pages/settings/components/sms-notifications.js"></script>
  <script src="/module/pages/settings/components/users.js"></script>
  <script src="/module/pages/settings/components/roles.js"></script>
  <script src="/module/pages/settings/components/subscription.js"></script>

  <!-- Main Logic -->
  <script src="/module/pages/settings/settings.js"></script>