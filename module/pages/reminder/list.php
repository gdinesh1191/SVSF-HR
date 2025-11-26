<div class="flex justify-between items-center bg-white px-1.5 mt-[8px] ml-2 whitespace-nowrap">
   <ul id="tabsContainer" class="flex flex-nowrap text-sm font-medium text-center">

    <!-- TASKS TAB (Default Active) -->
    <li>
        <button class="tab active-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer "
            data-tab="tasks">
            <span class="flex items-center gap-1">
               <i class="ri-task-line mr-1"></i>
                Tasks
                <span
                    class="ml-2 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full bg-[#009333] text-white">
                    8
                </span>

                <!-- CLOSE ICON (visible ONLY when active) -->
                <i class="ri-close-fill closeTab font-bold px-1 rounded hover:bg-[#dce0e5]"></i>
            </span>
        </button>
    </li>

    <!-- COMPLETED TAB -->
    <li>
        <button class="tab bg-white text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]"
            data-tab="completed">
            <span class="flex items-center gap-1">
                <i class="ri-check-double-line mr-1"></i>
                Completed
                <span
                    class="ml-2 counter-badge hidden inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full bg-[#009333] text-white">
                    3
                </span>

                <!-- Hide close icon on inactive tabs -->
                <i class="ri-close-fill closeTab hidden font-bold px-1 rounded hover:bg-[#dce0e5]"></i>
            </span>
        </button>
    </li>

</ul>

</div>




<!-- SUB HEADER -->
<div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
    <div class="flex items-center space-x-2 ml-2">
    <button
        class="py-1 px-2 text-sm rounded border cursor-pointer border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] ">
        <i class="ri-table-fill mr-1"></i>
        <span class="text-sm">Table</span>
        <i class="ri-arrow-down-s-line ml-1"></i>
    </button>

    <button
        class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]">
        <i class="ri-line-height "></i>
    </button>

    <button
        class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]">
        <i class="ri-stack-fill mr-1"></i>
        Bulk Actions
    </button>

</div>



    <div class="flex items-center relative space-x-2">
        <input type="text" placeholder="Enter Task Name" class="block w-full h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]
         placeholder:text-sm placeholder:text-[#585858]" />
        <button id="openFilterBtn"
            class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]"><i
                class="ri-filter-3-fill"></i></button>
    </div>
</div>

<!-- TABLE WRAPPER -->
<div class="bg-[#ebeff3]">
    <div class="mx-2 h-[calc(100vh-189px)] overflow-hidden rounded-lg bg-white">
        <div class="h-full overflow-y-auto overflow-x-auto w-full">
            <table class="w-full min-w-max">
                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
    <tr class="text-left ">
        <th class="p-2 w-[55%]">Title</th>
        <th class="p-2 w-[20%]">Date</th>
        <th class="p-2 w-[25%]">Assignee</th>
    </tr>
</thead>



                <tbody id="ReminderTableBody">
                    <!-- Rows will be inserted here dynamically -->
                </tbody>
            </table>

        </div>
    </div>
</div>

<!-- FOOTER -->
<footer class="bg-[#ebeff3] h-[54px] px-4 flex items-center justify-start">
    <span class="text-sm">
        Showing <span class="text-red-600">10</span> of <span class="text-blue-600">20</span>
    </span>
</footer>




</div>


<script src="/module/pages/reminder/list.js"></script>