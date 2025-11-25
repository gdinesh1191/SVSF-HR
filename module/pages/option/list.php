<div class="flex flex-1 overflow-hidden">
    <aside class="w-[240px] h-[100vh] bg-[#f8f9fa] border-[#ebeff3] px-3 flex flex-col">

        <div class="py-2">
            <h1 class="text-[18px] sm:text-[20px] font-medium text-[#009333]">
                Options
            </h1>
        </div>
        <div class="relative mb-1 mt-1">
            <div class="flex items-center overflow-hidden ">
                <i class="ri-search-line absolute left-2 text-sm text-gray-400"></i>
                <input type="text" id="reportSidebarSearch" placeholder="Search here..."
                    class="w-full h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] pl-7" />
            </div>
        </div>

        <div class="flex flex-col gap-4 text-sm bg-[#f8f9fa] overflow-y-auto pr-2 max-h-[calc(100vh-100px)] ">
            <div>
                <p class="font-semibold text-gray-700 py-1 cursor-pointer mb-1">

                </p>
                <ul id="reportSidebarList" class="space-y-1 ">
                </ul>
            </div>
        </div>


    </aside>
    <div class="flex-1 flex flex-col ">
        <div class="px-4 py-2 border-b border-gray-200 bg-white w-full">
            <h1 id="reportHeaderTitle" class="text-[18px] sm:text-[20px] font-medium text-[#009333]">
                Option name
            </h1>
        </div>
        <div class="w-full flex justify-center pt-6 flex-col space-y-6">

            <div class="flex justify-center">
                <div class="bg-white shadow-[0_0_3px_rgba(0,0,0,0.2)] rounded-lg px-6 py-4 w-full max-w-2xl">
                    <div class="mb-4">
                        <h2 id="optionFormTitle" class="text-lg text-[#12375d]">Add Department</h2>
                        <p id="optionFormSubtitle" class="text-sm text-gray-600">
                            Give it a name and you're all set.
                        </p>
                    </div>

                    <form id="departmentForm" autoComplete="off">
                        <div class="space-y-3">
                            <div class="flex flex-col gap-2 md:flex-row md:items-end">
                                <div class="flex-1">
                                    <label id="optionNameLabel"
                                        class="hidden text-xs font-semibold text-[#475867] mb-1">Shift Name</label>
                                    <div class="relative">
                                        <span class="absolute inset-y-0 left-0 flex pl-2 pt-1.5 text-gray-500 pointer-events-none z-10">
                                            <i class="ri-search-line"></i>
                                        </span>
                                        <input id="departmentNameInput" name="name" placeholder="Enter Department Name"
                                            class="block w-full text-sm h-[38px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] pl-8 capitalize" />
                                    </div>
                                </div>
                                <div id="optionShiftCodeField" class="relative flex-1 hidden">
                                    <label for="optionCodeInput"
                                        class="block text-xs font-semibold text-[#475867] mb-1">
                                        Shift Code
                                    </label>
                                    <input id="optionCodeInput" placeholder="Enter Shift Code"
                                        class="block w-full text-sm h-[38px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
                                </div>
                                <div id="optionButtonInline"
                                    class="flex justify-end md:justify-start">
                                    <button id="optionSubmitButton" type="submit"
                                        class="py-2 px-4 text-sm rounded border cursor-pointer bg-[#009333] text-white border-[#009333] hover:bg-[#007a2a] transition disabled:opacity-50 flex items-center gap-1">
                                        <i class="ri-add-line"></i>
                                        <span>Save Department</span>
                                    </button>
                                </div>
                            </div>
                            <div class="flex flex-col gap-2 md:flex-row">
                                <div class="flex-1 min-h-[20px]">
                                    <p id="departmentNameError" class="text-xs text-red-500  hidden"></p>
                                </div>
                                <div id="optionShiftCodeErrorContainer" class="flex-1 hidden min-h-[20px]">
                                    <p id="optionCodeError" class="text-xs text-red-500  hidden"></p>
                                </div>
                                <div id="optionButtonInlineSpacer" class="hidden md:block min-w-[120px]">
                                </div>
                            </div>

                            <div id="optionShiftTimeFields" class="grid gap-2 md:grid-cols-3 hidden">
                                <div class="relative w-full">
                                    <label for="optionInTimeInput"
                                        class="block text-xs font-semibold text-[#475867] mb-1">In
                                        Time</label>
                                    <input id="optionInTimeInput" type="time" placeholder="hh:mm"
                                        class="block w-full text-sm h-[38px] px-3 text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
                                    <p id="optionInTimeError" class="text-xs text-red-500 mt-1 hidden"></p>
                                </div>
                                <div class="relative w-full">
                                    <label for="optionOutTimeInput"
                                        class="block text-xs font-semibold text-[#475867] mb-1">Out Time</label>
                                    <input id="optionOutTimeInput" type="time" placeholder="hh:mm"
                                        class="block w-full text-sm h-[38px] px-3 text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" />
                                    <p id="optionOutTimeError" class="text-xs text-red-500 mt-1 hidden"></p>
                                </div>
                                <div class="relative w-full">
                                    <label for="optionTotalTimeInput"
                                        class="block text-xs font-semibold text-[#475867] mb-1">Total Time</label>
                                    <input id="optionTotalTimeInput" placeholder="0h 0m" readonly
                                        class="block w-full text-sm h-[38px] px-3 text-[#212529] bg-gray-100 border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none" />
                                    <p id="optionTotalTimeError" class="text-xs text-red-500 mt-1 hidden"></p>
                                </div>
                            </div>

                            <div id="optionButtonBlock" class="hidden flex justify-end">
                                <!-- button moved here dynamically for Shift -->
                            </div>
                        </div>
                    </form>


                </div>


            </div>
            <div class="mx-2 flex justify-center">
                <div
                    class="w-full max-h-[calc(100vh-320px)] max-w-2xl overflow-hidden border border-gray-200 rounded-md">
                    <div id="optionTableScroll" class="h-full overflow-y-auto">
                        <table class="w-full text-sm">
                            <thead id="optionTableHead"
                                class="text-[12px] text-[#475867] text-left  sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3] bg-gray-50">

                            </thead>
                            <tbody id="optionTableBody" class="bg-white divide-y divide-[#ebeff3]">

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="departmentToast"
    class="fixed top-14 right-3 z-[2000] w-[280px] hidden opacity-0 translate-y-4 transition-all duration-200 pointer-events-none">
</div>
<div id="departmentConfirmModal" class="fixed inset-0 z-[2100] hidden items-center justify-center bg-black/50 p-4">
    <div class="relative max-w-[470px] w-full text-center">
        <div class="bg-white rounded-[20px] p-8 relative w-full text-center">
            <button id="confirmModalCloseBtn"
                class="absolute top-4 right-4 text-[#0f0f0f] cursor-pointer text-2xl leading-none">
                <i class="ri-close-line"></i>
            </button>
            <div class="relative mx-auto flex items-center justify-center w-[67px] h-[67px] mb-4">
                <div id="confirmModalOuterCircle" class="absolute w-[66px] h-[66px] rounded-full opacity-70"></div>
                <div id="confirmModalMiddleCircle" class="absolute w-[46px] h-[46px] rounded-full opacity-90"></div>
                <div id="confirmModalInnerCircle"
                    class="z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center">
                    <i id="confirmModalIcon" class="ri-information-line text-white"></i>
                </div>
            </div>
            <h3 id="confirmModalTitle" class="text-xl font-semibold text-gray-900 mb-2.5">Confirm action</h3>
            <p id="confirmModalMessage" class="text-sm text-gray-500 mb-6 px-4">Are you sure you want to proceed?</p>
            <div class="flex justify-center space-x-2">
                <button id="confirmModalCancel"
                    class="px-6 py-2 w-full text-black cursor-pointer text-sm font-medium bg-white border border-[#d5d5d5] rounded-lg">
                    Cancel
                </button>
                <button id="confirmModalConfirm"
                    class="px-6 py-2 w-full cursor-pointer text-sm font-medium text-white rounded-lg bg-[#d53635]">
                    Confirm
                </button>
            </div>
        </div>
    </div>
</div>
<script src="/module/pages/option/option.js"></script>