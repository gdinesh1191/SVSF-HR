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
    <div class="absolute bottom-0 w-full border-t border-gray-600 py-2 px-3 flex items-center">
        <img src="/images/man-profile.jpg" class="w-10 h-10 rounded-full mr-3 object-cover bg-gray-200" />

        <div class="text-[#b0b3b7]">
            <div class="font-semibold">Dinesh G</div>
            <div class="text-xs">Admin</div>
        </div>

        <i class="ri-expand-up-down-fill ml-auto text-[#b0b3b7] cursor-pointer"></i>
    </div>

</div>