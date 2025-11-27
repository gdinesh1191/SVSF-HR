<!-- module/pages/profile/profile.php -->
<div class="flex h-screen bg-gray-100">

  <!-- Sidebar -->
  <aside class="w-[240px] bg-[#f8f9fa] p-3 flex flex-col">
    <h1 class="text-[18px] font-medium text-[#009333] mb-2">Profile Settings</h1>

    <!-- Search -->
    <div class="relative mb-3">
      <i class="ri-search-line text-[#59636e] absolute left-2 top-1.5"></i>
      <input
        id="searchInput"
        type="text"
        placeholder="Search here..."
        class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] pl-7"
      />
    </div>

    <div id="sidebarList" class="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-120px)]"></div>
  </aside>

  <!-- Main Content -->
  <div id="mainContent" class="flex-1 p-4"></div>

</div>

<!-- Load Components First -->
<script src="/module/pages/profile/components/profile-info.js"></script>
<script src="/module/pages/profile/components/change-password.js"></script>

<!-- Load Main Logic -->
<script src="/module/pages/profile/profile.js"></script>
