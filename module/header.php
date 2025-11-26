<header class="bg-[#f8f9fa] shadow-sm flex items-center justify-between p-2 mb-0.5">
  <!-- Left side (empty or you can add content if needed) -->
  <div></div>

  <!-- Right side -->
  <div class="flex items-center gap-3 ml-auto">

    <!-- Trigger Button -->
    <div
      id="openDropdownBtn"
      class="relative border border-[#cfd7df] rounded-md px-4 py-1 bg-[#FDFEFE] text-[#12375D] text-sm flex items-center cursor-pointer transition-all duration-200"
    >
      <i class="ri-search-line absolute left-2 top-[5px] text-sm"></i>
      <span class="pl-3 text-[#12375d]">Click here... or Use /</span>
    </div>

    <!-- BACKDROP -->
    <div
      id="dropdownBackdrop"
      class="fixed inset-0 bg-black/50 z-30 hidden"
    ></div>

    <!-- DROPDOWN MENU -->
    <div
      id="dropdownMenu"
      class="fixed left-[220px] right-[20px] top-[10px] bg-white border border-gray-300 rounded-md shadow-lg z-30 hidden"
    >
      <div class="">

        <!-- SEARCH INPUT -->
        <div class="relative p-2 rounded-md">
          <div
            class="absolute top-1/2 left-5 -translate-y-1/2 flex items-center pointer-events-none"
          >
            <i class="ri-search-line text-[#59636e] text-base"></i>
          </div>

          <input
  id="searchInput"
  class="w-full h-10 pl-9 pr-8 text-sm text-gray-900 border-2 rounded-md border-[#009333] focus:outline-none"
  placeholder="Search here..."
  autocomplete="off"
/>


          <!-- CLEAR SEARCH -->
          <button
            id="clearSearchBtn"
            class="hidden absolute top-1/2 right-3 -translate-y-1/2 flex items-center text-gray-500 hover:text-gray-700"
          >
            <i class="ri-close-circle-fill text-lg mr-2"></i>
          </button>
        </div>

        <div class="pl-0 border-b border-[#DEE2E6] max-h-[300px] overflow-y-scroll">

          <!-- PAGES -->
          <h2 class="text-[12px] font-semibold text-[#59636E] ml-[8px] p-[8px]">
            Pages
          </h2>

          <ul id="pagesList" class="ml-[6px] mb-1"></ul>


          <div class="border-b border-[#DEE2E6] p-0"></div>

          <!-- MODALS -->
          <h2 class="text-[12px] font-semibold text-[#59636E] ml-[8px] p-[8px]">
            Modals
          </h2>

          <ul id="modalList" class="ml-[6px] mb-1"></ul>
         
        </div>

        <!-- RECENT SEARCHES -->
        <div class="mb-2 border-b border-b-[#DEE2E6]">
          <h2 class="text-[12px] text-[#59636E] font-semibold ml-[8px] p-[8px]">
            Recent Searches
          </h2>

          <ul class="mb-1 mr-3 ml-2">
            <li
              class="py-1.5 px-2 cursor-pointer text-[14px] text-[#1f2328] rounded-md hover:bg-gray-100"
            >
              Search term 1
            </li>
            <li
              class="py-1.5 px-2 cursor-pointer text-[14px] text-[#1f2328] rounded-md hover:bg-gray-100"
            >
              Search term 2
            </li>
             <li
              class="py-1.5 px-2 cursor-pointer text-[14px] text-[#1f2328] rounded-md hover:bg-gray-100"
            >
              Search term 3
            </li>
          </ul>
        </div>

        <div class="flex justify-between items-center px-4 mb-2">
          <button class="text-[13px] text-green-600 cursor-pointer">
            Search by fields
          </button>
          <button class="text-[13px] text-green-600 cursor-pointer">
            Give Feedback
          </button>
        </div>

      </div>
    </div>

    <div
      class="bg-[#16364D] text-white rounded-md py-0.5 px-1.5 flex items-center justify-center cursor-pointer text-md hover:bg-[#1a3d56] transition-colors duration-200"
      title="Add New"
    >
      <i class="ri-add-line"></i>
    </div>

   <i id="notificationTrigger" class="ri-notification-line text-xl text-[#12375D] cursor-pointer"></i>

   <!-- Notification Dropdown -->
<div
  id="notificationDropdown"
  class="absolute right-0 top-12 w-96 bg-white border border-gray-200 rounded-md shadow-2xl z-[100] overflow-hidden transform scale-95 opacity-0 pointer-events-none transition-all duration-300 ease-out"
>
  <!-- Title -->
  <div class="px-4 py-3 text-lg font-semibold text-[#12375D] border-b border-gray-200 flex justify-between items-center">
    Notifications

    <!-- CLOSE ICON -->
    <i id="notifyClose" class="ri-close-line text-xl text-gray-500 font-normal cursor-pointer hover:text-black"></i>
  </div>

  <!-- Tabs -->
  <div class="flex border-b border-gray-200 bg-gray-50">
    <button data-tab="notifications" class="tab-btn active-tab flex-1 py-3 text-sm font-medium text-[#009333] border-b-2 border-[#009333]">
      Notifications <span class="count-badge ml-1 px-2 py-0.5 bg-[#009333] text-white text-xs rounded-full">3</span>
    </button>

    <button data-tab="activity" class="tab-btn flex-1 py-3 text-sm font-medium text-gray-600">
      Activity <span class="count-badge ml-1 px-2 py-0.5 bg-[#009333] text-white text-xs rounded-full hidden">1</span>
    </button>

    <button data-tab="messages" class="tab-btn flex-1 py-3 text-sm font-medium text-gray-600">
      Messages <span class="count-badge ml-1 px-2 py-0.5 bg-[#009333] text-white text-xs rounded-full hidden">2</span>
    </button>
  </div>

  <!-- Content Wrapper -->
  <div class="h-[calc(100vh-186px)] overflow-y-auto">

    <!-- Notifications Tab -->
    <div class="tab-content" id="tab-notifications">
    
      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-mail-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">New Message</p>
          <p class="text-xs text-gray-500">You have 3 unread messages.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">5 min ago</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-file-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Report Ready</p>
          <p class="text-xs text-gray-500">Your monthly report is ready for download.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">1 hour ago</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-bill-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Payment Reminder</p>
          <p class="text-xs text-gray-500">Invoice #1234 is due tomorrow.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">3 hours ago</p>
      </a>

       <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-refresh-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">System Update</p>
          <p class="text-xs text-gray-500">Maintenance tonight at 10 PM.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">Yesterday</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-sparkling-2-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">New Feature!</p>
          <p class="text-xs text-gray-500">Try the new analytics dashboard!</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">2 days ago</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-gift-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Welcome Bonus</p>
          <p class="text-xs text-gray-500">Your bonus has been applied.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">3 days ago</p>
      </a>

    </div>

    <!-- Activity Tab -->
    <div class="tab-content hidden" id="tab-activity">
    
      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-login-box-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Login Detected</p>
          <p class="text-xs text-gray-500">Login from a new device: Chrome on Windows.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">Just now</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-upload-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">File Upload</p>
          <p class="text-xs text-gray-500">Document "Project Plan.pdf" was uploaded.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">10 min ago</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-key-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Password Change</p>
          <p class="text-xs text-gray-500">Your password was successfully changed.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">2 hours ago</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-user-settings-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Profile Updated</p>
          <p class="text-xs text-gray-500">Your profile information was updated.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">Today</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-chat-1-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Comment Added</p>
          <p class="text-xs text-gray-500">John Doe commented on "Task X".</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">Yesterday</p>
      </a>

      
    </div>

    <!-- Messages Tab -->
    <div class="tab-content hidden" id="tab-messages">

    <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-chat-quote-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Support Inquiry</p>
          <p class="text-xs text-gray-500">New support request from Jane Smith.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">15 min ago</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-group-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Team Meeting</p>
          <p class="text-xs text-gray-500">Reminder: Team sync in 30 minutes.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">30 min ago</p>
      </a>

       <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-edit-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Document Review</p>
          <p class="text-xs text-gray-500">Feedback requested on "Marketing Strategy".</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">1 day ago</p>
      </a>

      <a href="#" class="flex items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100">
        <i class="ri-alarm-line text-lg mr-3 text-[#009333]"></i>
        <div>
          <p class="font-semibold">Deadline Approaching</p>
          <p class="text-xs text-gray-500">Task "Implement Feature Y" is due soon.</p>
        </div>
        <p class="ml-auto text-xs text-gray-400 mt-1">2 days ago</p>
      </a>

    </div>
  </div>

  <div class="border-t border-gray-200 bg-gray-50">
    <a href="#" class="block px-4 py-2 text-sm text-[#009333] text-center hover:bg-gray-100">
      View All
    </a>
  </div>
</div>
  </div>
</header>

<script src="/module/header.js"></script>
