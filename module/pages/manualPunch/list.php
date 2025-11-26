<div class="flex justify-between items-center bg-white px-1.5 mt-[8px] ml-2 whitespace-nowrap">
   <ul id="tabsContainer" class="flex flex-nowrap text-sm font-medium text-center">

    <!-- MSP List TAB (Default Active) -->
    <li>
        <button class="tab active-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer "
            data-tab="list">
            <span class="flex items-center gap-1">
               <i class="ri-todo-line mr-1"></i>
                MSP List
                <span
                    class="ml-2 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full bg-[#009333] text-white">
                    8
                </span>

                <!-- CLOSE ICON (visible ONLY when active) -->
                <i class="ri-close-fill closeTab font-bold px-1 rounded hover:bg-[#dce0e5]"></i>
            </span>
        </button>
    </li>

    <!-- MSP New TAB -->
    <li>
        <button class="tab bg-white text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] cursor-pointer hover:text-[#6689b8] hover:bg-[#f5f7f9]"
            data-tab="new">
            <span class="flex items-center gap-1">
                <i class="ri-task-line mr-1"></i>
                Apply MSP

                <!-- Hide close icon on inactive tabs -->
                <i class="ri-close-fill closeTab hidden font-bold px-1 rounded hover:bg-[#dce0e5]"></i>
            </span>
        </button>
    </li>

</ul>

   <div class="flex items-center flex-shrink-0 ml-auto">

                    <button
                        class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#eceff1] hover:border-[#eceff1]">
                        <i class="ri-equalizer-line mr-1"></i> Customize Table
                    </button>

                    <div
                        class="inline-flex border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm ml-2">
                        <button class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer">
                            <i class="ri-download-line mr-1"></i>
                            Import Leaves
                        </button>
                        <button class="px-2 border-l border-[#cfd7df] hover:bg-[#ebeff3] cursor-pointer">
                            <i class="ri-arrow-down-s-line"></i>
                        </button>
                    </div>
                </div>
     


</div>




<!-- SUB HEADER -->
<div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
   <div class="flex items-center space-x-2 ml-2">
        <div class="bulk-actions flex items-center space-x-2">
          <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" id="printBtn">
            <i class="ri-printer-line mr-1"></i>
            Print
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" id="summaryBtn">
            <i class="ri-sticky-note-line mr-1"></i>
            Summary
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" id="downloadBtn">
            <i class="ri-arrow-down-line mr-1"></i>
            Download
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3]" id="deleteBtn">
            <i class="ri-delete-bin-6-line mr-1"></i>
            Delete
          </button>
        </div>
      </div>



    <div class="flex items-center relative space-x-2">
        <input type="text" placeholder="Search Staff Name..." class="block w-full h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]
         placeholder:text-sm placeholder:text-[#585858]" />
        <button id="openFilterBtn"
            class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]"><i
                class="ri-filter-3-fill"></i></button>
    </div>
</div>

<!-- TABLE WRAPPER -->
<div class="bg-[#ebeff3]">
    <div class="mx-2 h-[calc(100vh-189px)] overflow-hidden rounded-lg bg-white">
        <div class="h-full overflow-y-auto overflow-x-auto w-full dynamic-content">
   

        </div>
    </div>
</div>

<!-- FOOTER -->
<footer id="footerSection" class="bg-[#ebeff3] h-[54px] px-4 flex items-center justify-start">
    <!-- Default footer (MSP List) -->
    <span class="text-sm" id="listFooter">
        Showing <span class="text-red-600">10</span> of <span class="text-blue-600">20</span>
    </span>

    <!-- Apply MSP Footer Buttons -->
    <div id="formFooter" class="hidden flex items-center gap-2">
        <button id="saveBtn"
        class="py-1.5 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border-[#009333] hover:bg-[#007a2a] transition">
        Save
    </button>
    <button type="button" id="cancelBtn"
        class="py-1.5 px-2 text-sm rounded border cursor-pointer bg-[#6c757d] text-white border-[#6c757d] hover:bg-[#5a6268] transition">
        Cancel
    </button>
    </div>
</footer>





</div>


<script src="/module/pages/manualPunch/list.js"></script>