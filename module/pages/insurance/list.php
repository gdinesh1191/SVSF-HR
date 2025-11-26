<div class="flex justify-between items-center bg-white px-1.5 mt-[5px] ml-2 whitespace-nowrap">
    <ul id="insuranceTabsContainer" class="flex flex-nowrap text-sm font-medium text-center">
        <li>
            <button class="insurance-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer"
                data-tab="InsuranceList">
                <span class="flex items-center gap-1">
                    <i class="ri-secure-payment-line mr-1"></i>
                    Insurance List
                    <span
                        class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">0</span>
                    <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closeInsuranceTab"></i>
                </span>
            </button>
        </li>
        <li>
            <button class="insurance-tab hover:text-[#6689b8] hover:bg-[#f5f7f9] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer"
            data-tab="ClaimHistory">
                <span class="flex items-center gap-1">
                    <i class="ri-history-line mr-1"></i>
                    Claim History
                </span>
        </button>
    </li>
    </ul>
    <div class="flex items-center flex-shrink-0 ml-auto">
        <div class="inline-flex border border-[#cfd7df] text-[#12375d] rounded overflow-hidden bg-white text-sm ml-2">
            <button class="flex items-center py-1 px-2 hover:bg-[#ebeff3] cursor-pointer">
                <i class="ri-download-line mr-1"></i>
                Import Insurance
            </button>
            <button class="px-2 border-l border-[#cfd7df] hover:bg-[#ebeff3] cursor-pointer">
                <i class="ri-arrow-down-s-line"></i>
            </button>
        </div>
    </div>
</div>

<!-- Tab Content Container -->
<div id="insuranceTabContent" class="overflow-y-hidden h-[calc(100vh-43px)]">
    <div id="InsuranceListContent" class="insurance-tab-content"></div>
    <div id="ClaimHistoryContent" class="insurance-tab-content hidden"></div>
    </div>

<script src="/module/pages/insurance/insuranceList/insuranceList.js"></script>
<script src="/module/pages/insurance/claimHistory/claimHistory.js"></script>
<script src="/module/pages/insurance/list.js"></script>

