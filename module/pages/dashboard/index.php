
<div class="flex-1 w-full  overflow-y-auto ">
                <!-- paste content below -->
                <!-- Dashboard (HTML + Tailwind + jQuery + Chart.js) -->
                <div id="dashboard" class="overflow-y-auto">
                    <!-- Header -->
                    <div class=" pb-5 pt-4">
                        <div class=" px-6 flex items-center justify-between border-b border-gray-200 pb-3">
                            <div class="flex items-center gap-3">
                                <img src="/images/profile.png" alt="Profile"
                                    class="w-12 h-12 rounded-full object-cover border border-gray-300">
                                <div class="leading-tight">
                                    <h3 class="text-[1.25rem] font-semibold text-[#262626]">Hello, Good Morning <span
                                            class="text-green-600">Emily!</span></h3>
                                    <p class="text-sm text-[#737373]">Here’s what’s happening with today’s practice.</p>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <div class="relative">
                                    <i
                                        class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg"></i>
                                    <input type="text" placeholder="Search..."
                                        class="pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                                </div>

                                <div class="h-6 w-px bg-gray-300"></div>

                                <button
                                    class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition">
                                    <i class="ri-add-line text-base"></i> Create New
                                </button>

                                <div class="h-6 w-px bg-gray-300"></div>
                                <i
                                    class="ri-settings-3-line text-2xl text-gray-600 hover:text-green-600 cursor-pointer"></i>
                                <div class="h-6 w-px bg-gray-300"></div>

                                <div class="relative">
                                    <i
                                        class="ri-notification-3-line text-2xl text-gray-600 hover:text-green-600 cursor-pointer"></i>
                                    <span
                                        class="absolute top-0 right-0 block w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="px-6 pb-6">
                        <!-- Metric Cards -->
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <div class="bg-white rounded-[0.5rem] shadow border border-[#e5e5e5] p-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-[0.875rem] font-medium text-[#737373]">Active Cases</p>
                                        <h4 class="text-[1.5rem] font-bold text-[#262626]">148</h4>
                                    </div>
                                    <div
                                        class="w-[48px] h-[48px] rounded-[0.5rem] bg-[linear-gradient(195deg,_#42424a,_#191919)] shadow flex items-center justify-center">
                                        <i class="ri-briefcase-line text-white text-[1.125rem]"></i>
                                    </div>
                                </div>
                                <hr class="my-3 opacity-25">
                                <div class="flex items-center">
                                    <p class="text-[14px] font-bold text-[#4caf50]">+8%</p>
                                    <p class="text-[14px] text-[#737373] ml-1">than last week</p>
                                </div>
                            </div>

                            <div class="bg-white rounded-[0.5rem] shadow border border-[#e5e5e5] p-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-[0.875rem] font-medium text-[#737373]">Hearings Today</p>
                                        <h4 class="text-[1.5rem] font-bold text-[#262626]">12</h4>
                                    </div>
                                    <div
                                        class="w-[48px] h-[48px] rounded-[0.5rem] bg-[linear-gradient(195deg,_#49a3f1,_#1a73e8)] shadow flex items-center justify-center">
                                        <i class="ri-auction-line text-white text-[1.125rem]"></i>
                                    </div>
                                </div>
                                <hr class="my-3 opacity-25">
                                <div class="flex items-center">
                                    <p class="text-[14px] font-bold text-[#4caf50]">+2%</p>
                                    <p class="text-[14px] text-[#737373] ml-1">than last week</p>
                                </div>
                            </div>

                            <div class="bg-white rounded-[0.5rem] shadow border border-[#e5e5e5] p-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-[0.875rem] font-medium text-[#737373]">New Clients</p>
                                        <h4 class="text-[1.5rem] font-bold text-[#262626]">9</h4>
                                    </div>
                                    <div
                                        class="w-[48px] h-[48px] rounded-[0.5rem] bg-[linear-gradient(195deg,_#ab47bc,_#8e24aa)] shadow flex items-center justify-center">
                                        <i class="ri-user-add-line text-white text-[1.125rem]"></i>
                                    </div>
                                </div>
                                <hr class="my-3 opacity-25">
                                <div class="flex items-center">
                                    <p class="text-[14px] font-bold text-[#4caf50]">+18%</p>
                                    <p class="text-[14px] text-[#737373] ml-1">than last week</p>
                                </div>
                            </div>

                            <div class="bg-white rounded-[0.5rem] shadow border border-[#e5e5e5] p-4">
                                <div class="flex items-center justify-between">
                                    <div>
                                        <p class="text-[0.875rem] font-medium text-[#737373]">Pending Invoices</p>
                                        <h4 class="text-[1.5rem] font-bold text-[#262626]">$24,750</h4>
                                    </div>
                                    <div
                                        class="w-[48px] h-[48px] rounded-[0.5rem] bg-[linear-gradient(195deg,_#ffa726,_#fb8c00)] shadow flex items-center justify-center">
                                        <i class="ri-file-list-3-line text-white text-[1.125rem]"></i>
                                    </div>
                                </div>
                                <hr class="my-3 opacity-25">
                                <div class="flex items-center">
                                    <p class="text-[14px] font-bold text-[#f44335]">-4%</p>
                                    <p class="text-[14px] text-[#737373] ml-1">than yesterday</p>
                                </div>
                            </div>
                        </div>

                        <!-- Charts Row -->
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                            <div class="bg-white rounded-[0.5rem] shadow border border-[#e5e5e5] p-4">
                                <h6 class="text-[1rem] font-semibold text-[#262626]">Monthly Expenditure</h6>
                                <p class="text-[0.875rem] text-[#737373] mb-3">Expenses tracked across departments.</p>
                                <div class="h-48 relative">
                                    <canvas id="chart-bars" class="w-full h-full"></canvas>
                                </div>
                                <hr class="my-3 opacity-25">
                                <div class="text-[.875rem] text-[#737373]"><i class="ri-time-line mr-1"></i> updated
                                    yesterday</div>
                            </div>

                            <div class="bg-white rounded-[0.5rem] shadow border border-[#e5e5e5] p-4">
                                <h6 class="text-[1rem] font-semibold text-[#262626]">Employee Productivity</h6>
                                <p class="text-[0.875rem] text-[#737373] mb-3">Average performance by associates this
                                    week.</p>
                                <div class="h-48 relative">
                                    <canvas id="chart-line" class="w-full h-full"></canvas>
                                </div>
                                <hr class="my-3 opacity-25">
                                <div class="text-[.875rem] text-[#737373]"><i class="ri-time-line mr-1"></i> updated 2
                                    hrs ago</div>
                            </div>

                            <div class="bg-white rounded-[0.5rem] shadow border border-[#e5e5e5] p-4">
                                <h6 class="text-[1rem] font-semibold text-[#262626]">Client Conversion Rate</h6>
                                <p class="text-[0.875rem] text-[#737373] mb-3">(<span class="font-semibold">+12%</span>)
                                    rise in new client signups.</p>
                                <div class="h-48 relative">
                                    <canvas id="chart-line-tasks" class="w-full h-full"></canvas>
                                </div>
                                <hr class="my-3 opacity-25">
                                <div class="text-[.875rem] text-[#737373]"><i class="ri-time-line mr-1"></i> just
                                    updated</div>
                            </div>
                        </div>

                        <!-- Project charts -->
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
                            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div class="p-4 pb-0">
                                    <h6 class="text-base font-semibold text-gray-800 mb-2">Project-wise Expenditure</h6>
                                    <p class="text-sm text-gray-500 mb-4"><i
                                            class="ri-arrow-up-line text-green-500 mr-1"></i><span
                                            class="font-semibold">Monthly spending trends</span></p>
                                </div>
                                <div class="p-4 pt-2">
                                    <div class="relative" style="height:350px">
                                        <canvas id="lineChartLarge"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                                <div class="p-4 pb-0">
                                    <h6 class="text-base font-semibold text-gray-800 mb-2">Project Completion Status
                                    </h6>
                                    <p class="text-sm text-gray-500 mb-4"><i
                                            class="ri-pie-chart-line text-blue-500 mr-1"></i><span
                                            class="font-semibold">Overall progress distribution</span></p>
                                </div>
                                <div class="p-4 pt-2">
                                    <div class="relative" style="height:350px">
                                        <canvas id="pieChartLarge"></canvas>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center justify-center p-6 relative">
                                <h6 class="text-base font-semibold text-gray-800 mb-1">Overall Project Completion</h6>
                                <p class="text-sm text-gray-500 mb-2 flex items-center gap-1"><i
                                        class="ri-trophy-line text-green-500"></i> Concepts completed vs overall
                                    projects</p>

                                <div class="relative w-full" style="height:220px">
                                    <canvas id="gaugeChart"></canvas>
                                    <div
                                        class="absolute inset-0 flex flex-col items-center justify-center translate-y-[30px]">
                                        <div id="gaugeValue" class="text-5xl font-bold text-gray-800 drop-shadow-sm">78%
                                        </div>
                                        <div class="text-sm text-gray-500 mt-1">Projects Completed</div>
                                    </div>
                                </div>

                                <div class="mt-4 flex justify-between w-3/4 text-sm text-gray-600">
                                    <div class="flex flex-col items-center">
                                        <span class="text-green-600 font-semibold">Completed</span>
                                        <span class="text-gray-800 font-medium" id="gaugeCompleted">78%</span>
                                    </div>
                                    <div class="w-px h-6 bg-gray-300"></div>
                                    <div class="flex flex-col items-center">
                                        <span class="text-gray-500 font-semibold">Remaining</span>
                                        <span class="text-gray-800 font-medium" id="gaugeRemaining">22%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Active Cases table + Top performers -->
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div class="lg:col-span-2 bg-white rounded-[0.5rem] shadow border border-[#e5e5e5]">
                                <div class="p-[1rem] pb-0">
                                    <h6 class="text-[1rem] font-semibold text-[#262626] mb-[0.5rem]">Active Cases</h6>
                                    <p class="text-sm text-[#737373] mb-[0.5rem]"><i
                                            class="ri-arrow-up-line text-[#4caf50] mr-1"></i><span
                                            class="font-semibold">12 cases closed</span> this month</p>
                                </div>

                                <div class="px-0">
                                    <div class="overflow-x-auto">
                                        <table class="w-full min-w-[600px] md:min-w-full">
                                            <thead>
                                                <tr class="border-b border-[#e5e5e5]">
                                                    <th
                                                        class="py-[1.25rem] px-[2rem] text-left text-xs font-semibold text-[#737373] uppercase">
                                                        Case Title</th>
                                                    <th
                                                        class="py-[1.25rem] px-[2rem] text-left text-xs font-semibold text-[#737373] uppercase">
                                                        Client</th>
                                                    <th
                                                        class="py-[1.25rem] px-[2rem] text-left text-xs font-semibold text-[#737373] uppercase">
                                                        Assigned Lawyers</th>
                                                    <th
                                                        class="py-[1.25rem] px-[2rem] text-left text-xs font-semibold text-[#737373] uppercase">
                                                        Fees</th>
                                                    <th
                                                        class="py-[1.25rem] px-[2rem] text-left text-xs font-semibold text-[#737373] uppercase">
                                                        Progress</th>
                                                </tr>
                                            </thead>
                                            <tbody class="divide-y divide-[#e5e5e5]" id="casesTbody">
                                                <!-- rows injected by script -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div class="bg-white rounded-[0.5rem] shadow border border-[#e5e5e5]">
                                <div class="p-[1rem] pb-0">
                                    <h6 class="text-[1rem] font-semibold text-[#262626] mb-[0.5rem]">Top Performers
                                        Overview</h6>
                                    <p class="text-sm text-[#737373] mb-[0.5rem]"><i
                                            class="ri-arrow-up-line text-[#4caf50] mr-1"></i><span
                                            class="font-semibold">18%</span> better performance this month</p>
                                </div>

                                <div class="p-[1rem]">
                                    <div class="relative ml-2">
                                        <div class="absolute left-[12px] h-full border-r-2 border-[#e5e5e5]"></div>
                                        <div id="topPerformersList"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>




                <!-- end dashboard content -->
            </div>  

            <script src="/dashboard.js"></script>

