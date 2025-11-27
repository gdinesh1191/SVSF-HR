<!-- Sidebar -->
<div class="w-[200px] bg-[#212934] shadow-md relative">

    <div class="px-0 pt-3 pb-2 flex justify-center">
        <img src="/images/logo.png" class="h-10" />
    </div>

    <nav class="max-h-[calc(100vh-117px)] overflow-y-auto custom-scrollbar">
        <ul id="sidebar-menu" class="text-base">


            <li id="masterMenu" class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] cursor-pointer 
               hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-dashboard-line mr-3"></i>
                    <span>Master</span>
                </div>

                <!-- Dynamic dropdown icon -->
                <i id="masterArrow" class="ri-arrow-down-s-line text-lg"></i>
            </li>

            <!-- SUB MENUS -->
            <ul id="masterSubMenu" class="hidden">

                <!-- Clients -->
                <li class="submenu-item pr-4 pl-12 py-2.5 flex items-center justify-between 
           text-[#b0b3b7] border-l-4 border-l-transparent hover:bg-[#191f26] hover:border-l-[#1aed59]">


                    <a href="/app/staff/list" class="flex-1 block">
                        Staff
                    </a>


                    <a href="/app/staff/new" class="pl-3">
                        <i class="ri-add-line"></i>
                    </a>

                </li>





                <!-- Projects -->
                <li class="submenu-item pr-4 pl-12 py-2.5 flex items-center justify-between 
                   text-[#b0b3b7] border-l-4 border-l-transparent
                   hover:bg-[#191f26] hover:border-l-[#1aed59]">

                    <a href="/app/option" class="flex-1 block">
                        Options
                    </a>
                </li>

                <!-- Employees -->
                <li class="submenu-item pr-4 pl-12 py-2.5 flex items-center justify-between 
                   text-[#b0b3b7] border-l-4 border-l-transparent
                   hover:bg-[#191f26] hover:border-l-[#1aed59]">
                    <a href="/app/policy" class="flex-1 block">
                        Policy
                    </a>
                </li>

            </ul>

            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-fingerprint-line mr-3"></i>
                    <a href="/app/manualPunch" class="flex-1 block">
                        Manual Punch
                    </a>
                </div>
            </li>

            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-article-line mr-3"></i>
                    <a href="/app/reminder" class="flex-1 block">
                        Reminders
                    </a>
                </div>
            </li>
            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-money-rupee-circle-line mr-3"></i>
                    <a href="/app/salary" class="flex-1 block">Salary</a>
                </div>

            </li>
            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-stethoscope-line mr-3"></i>
                    <a href="/app/insurance" class="flex-1 block">Insurance</a>
                </div>
            </li>

            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-check-double-line mr-3"></i>
                    <a href="/app/approval" class="flex-1 block">Approval</a>
                </div>

            </li>

            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-user-follow-line mr-3"></i>
                    <a href="/app/attendance" class="flex-1 block">Attendance</a>
                </div>

            </li>

            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-file-chart-line mr-3"></i>
                    <a href="/app/report" class="flex-1 block">Report</a>
                </div>

            </li>

            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-box-3-line mr-3"></i>
                    <a href="/app/asset" class="flex-1 block">Assets</a>
                </div>

            </li>

             <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-calendar-check-line mr-3"></i>
                    <a href="/app/shiftApproval" class="flex-1 block">Shift Approval</a>
                </div>

            </li>
            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-history-line mr-3"></i>
                    <a href="/app/punchData" class="flex-1 block">Punch Data</a>
                </div>

            </li>
            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-calendar-event-line mr-3"></i>
                    <a href="/app/leave" class="flex-1 block">Leave</a>
                </div>

            </li>
            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-repeat-line mr-3"></i>
                    <a href="/app/shiftChange" class="flex-1 block">Shift Change</a>
                </div>

            </li>
            <li class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] 
                        hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-group-line mr-3"></i>
                    <a href="/app/myTeam" class="flex-1 block">My Team</a>
                </div>

            </li>


             <li id="othersMenu" class="px-4 py-2.5 flex items-center justify-between text-[#b0b3b7] cursor-pointer 
               hover:bg-[#191f26] border-l-4 border-l-transparent hover:border-l-[#1aed59]">

                <div class="flex items-center">
                    <i class="ri-dashboard-line mr-3"></i>
                    <span>Others</span>
                </div>

                <!-- Dynamic dropdown icon -->
                <i id="othersArrow" class="ri-arrow-down-s-line text-lg"></i>
            </li>

            <!-- SUB MENUS -->
            <ul id="othersSubMenu" class="hidden">

                <li class="submenu-item pr-4 pl-12 py-2.5 flex items-center justify-between 
           text-[#b0b3b7] border-l-4 border-l-transparent hover:bg-[#191f26] hover:border-l-[#1aed59]">


                    <a href="/app/notification" class="flex-1 block">
                        Notifications
                    </a>

                </li>

                <li class="submenu-item pr-4 pl-12 py-2.5 flex items-center justify-between 
                   text-[#b0b3b7] border-l-4 border-l-transparent
                   hover:bg-[#191f26] hover:border-l-[#1aed59]">

                    <a href="/app/event" class="flex-1 block">
                        Events
                    </a>
                </li>



            </ul>

        </ul>
    </nav>

    <!-- Bottom User -->
    <div id="profileBar" class="absolute bottom-0 w-full border-t border-gray-600 py-2 px-3 flex items-center cursor-pointer">
        <img src="/images/man-profile.jpg" class="w-10 h-10 rounded-full mr-3 object-cover bg-gray-200" />

        <div class="text-[#b0b3b7]">
            <div class="font-semibold">Dinesh G</div>
            <div class="text-xs">Admin</div>
        </div>

        <i class="ri-expand-up-down-fill ml-auto text-[#b0b3b7] cursor-pointer"></i>
    </div>

<div id="profileDropdown" 
     class="absolute left-[200px] bottom-2  ml-2 w-[300px] p-2 bg-white rounded-xl shadow-[0_4px_16px_#27313a66] z-50 hidden">

  <!-- User Info -->
<div class="px-2 py-1.5 flex items-center">
  <div class="mr-3">
    <div class="bg-gray-200 rounded-full w-11 h-11 flex items-center justify-center overflow-hidden">
      <img src="/images/man-profile.jpg" alt="User Profile" class="w-full h-full object-cover">
    </div>
  </div>

  <div class="flex-1">
    <div class="flex flex-col w-full">

      <!-- Name + Role -->
      <div class="flex items-center w-full">
        <div class="font-semibold text-gray-900 text-[15px]">Dinesh G</div>
        <div class="ml-auto px-2 py-0.5 text-[11px] font-medium text-green-700 bg-green-100 rounded-full">
          Admin
        </div>
      </div>

      <!-- Email -->
      <div class="text-[13px] text-gray-500 mt-0.5">
        dinesh@example.com
      </div>

    </div>
  </div>
</div>


  <!-- Dropdown Items -->
  <ul class="py-2">
    <hr class="border-t border-gray-200">

    <li class="flex items-center px-2 py-1.5 mt-1 hover:bg-gray-100 rounded-md cursor-pointer">
      <i class="ri-line-chart-line mr-3 text-gray-600"></i>
      <span class="text-[14px] text-gray-800">Activity</span>
    </li>

    <li class="flex items-center px-2 py-1.5 mb-1 hover:bg-gray-100 rounded-md cursor-pointer">
      <i class="ri-admin-line mr-3 text-gray-600"></i>
      <span class="text-[14px] text-gray-800">Admin Console</span>
    </li>

    <li class="flex items-center px-2 py-1.5 mb-1 hover:bg-gray-100 rounded-md cursor-pointer">
      <i class="ri-settings-3-line mr-3 text-gray-600"></i>
      <a href="/app/profile" class="text-[14px] text-gray-800">Profile Settings</a>
    </li>

    <hr class="border-t border-gray-200">

    <li class="flex items-center px-2 py-1.5 mt-1 hover:bg-gray-100 rounded-md cursor-pointer">
      <i class="ri-add-circle-line mr-3 text-gray-600"></i>
      <span class="text-[14px] text-gray-800">Add Account</span>
    </li>

    <li class="flex items-center px-2 py-1.5 hover:bg-gray-100 rounded-md cursor-pointer">
      <i class="ri-logout-box-line mr-3 text-gray-600"></i>
      <span class="text-[14px] text-gray-800">Logout</span>
    </li>
  </ul>

  <!-- Footer -->
  <div class="px-2 py-1 text-xs text-gray-500 flex items-center">
    <span>v.1.5.69</span>
    <span class="text-[10px] ml-1">•</span>
    <a href="#" class="ml-1 text-gray-500">Terms & Conditions</a>
  </div>
</div>


</div>


<script src="/module/sidebar.js"></script>