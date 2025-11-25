<div class="flex justify-between items-center bg-white px-1.5 mt-[8px] ml-2 whitespace-nowrap">

<!-- STATIC TABS (HTML Only) -->
<ul id="tabsContainer" class="flex flex-nowrap text-sm font-medium text-center">

    <li>
        <button
            class="tab active-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer "
            data-tab="all">
            <span class="flex items-center gap-1">
                All Clients
                <span
                    class="ml-2 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">12</span>
                <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closeTab"></i>
            </span>
        </button>
    </li>

    <li>
        <button class="tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer"
            data-tab="pending">
            <span class="flex items-center gap-1">Pending</span>
        </button>
    </li>

    <li>
        <button class="tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer"
            data-tab="completed">
            <span class="flex items-center gap-1">Completed</span>
        </button>
    </li>

    <li>
        <button class="tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer"
            data-tab="inprogress">
            <span class="flex items-center gap-1">In Progress</span>
        </button>
    </li>

</ul>

<!-- RIGHT BUTTONS -->
<div class="flex items-center flex-shrink-0 ml-auto">

    <button
        class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#eceff1] hover:border-[#eceff1]">
        <i class="ri-equalizer-line mr-1"></i> Customize Table
    </button>

    <div
        class="inline-flex border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm ml-2">
        <button class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer">
            <i class="ri-download-line mr-1"></i>
            Import Clients
        </button>
        <button class="px-2 border-l border-[#cfd7df] hover:bg-[#ebeff3] cursor-pointer">
            <i class="ri-arrow-down-s-line"></i>
        </button>
    </div>


    <a  href="/app/client/new"
        class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border-[#009333] hover:bg-[#007a2a] ml-2">
        <i class="ri-add-fill mr-1"></i> Add Client
</a>
</div>
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
    <input type="text" placeholder="Search here..." class="block w-full h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]
         placeholder:text-sm placeholder:text-[#585858]" />
    <button id="openFilterBtn"
        class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]"><i
            class="ri-filter-3-fill"></i></button>
</div>
</div>

<!-- TABLE WRAPPER -->
<div class="bg-[#ebeff3]">
<div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
    <div class="h-full overflow-y-auto overflow-x-auto w-full">
        <table class="w-full min-w-max">
            <thead
                class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                <tr class="text-left divide-x divide-[#ebeff3]">
                    <th class="p-2"><input type="checkbox" id="selectAll"
                            class="accent-green-600 cursor-pointer" /></th>
                    <th class="p-2">S.no</th>
                    <th class="p-2">Client Name</th>
                    <th class="p-2">Phone Number</th>
                    <th class="p-2">Address Line 1</th>
                    <th class="p-2">Address Line 2</th>
                    <th class="p-2">District</th>
                    <th class="p-2">State</th>
                    <th class="p-2">Pincode</th>
                    <th class="p-2">Email</th>

                </tr>
            </thead>

            <tbody id="ClientTableBody">
                <!-- Filled by JS -->
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

<script src="/module/pages/client/list.js"></script>   