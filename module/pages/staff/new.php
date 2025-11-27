<div class="flex-1 overflow-y-auto ">

    <form id="staffForm" autocomplete="off" class="w-full">
        <!-- Contact Information Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 px-4 ">

            <!-- Left Column -->
            <div class="space-y-4 lg:border-r lg:border-gray-300 lg:pr-4 mt-4">


                <div class="flex flex-col sm:flex-row sm:items-start gap-2 ">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Staff Name<span class="text-red-500">*</span>
                    </label>

                    <div class="sm:w-2/3 w-full flex gap-2">
                        <select
                            class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]  w-30 ">
                            <option value="">Select</option>
                        <option value="mr">Mr.</option>
                        <option value="mrs">Mrs.</option>
                        <option value="ms">Ms.</option>
                        </select>
                        <input type="text" placeholder="Enter first Name"
                            class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full " />

                        <input type="text" placeholder="Enter last Name"
                            class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full " />
                    </div>
                </div>

                <!-- Date -->
                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Date of Birth<span class="text-red-500">*</span>
                    </label>

                    <div class="sm:w-2/3 w-full flex gap-2 items-center">
                        <input type="text" id="staffDob" 
                            placeholder="Select date" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529]
                                        text-sm bg-white border border-[#cbcbcb] rounded-md leading-[1.5]
                                        focus:outline-none focus:border-[#009333] flex-1" />
                        <div class="flex items-center gap-2">
                            <span class="text-sm text-[#1D1D1D]">Age:</span>
                            <input type="text" id="staffAge" readonly class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529]
                                            text-sm bg-gray-100 border border-[#cbcbcb] rounded-md leading-[1.5]
                                            w-16 text-center" placeholder="0" />
                        </div>
                    </div>
                </div>


                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Gender<span class="text-red-500">*</span>
                    </label>

                    <div class="sm:w-2/3 w-full flex gap-6">
                        <label class="flex items-center gap-2 text-sm text-[#1D1D1D]">
                            <input type="radio" name="gender" class="accent-green-600 w-3.5 h-3.5 cursor-pointer" />
                            Male
                        </label>

                        <label class="flex items-center gap-2 text-sm text-[#1D1D1D]">
                            <input type="radio" name="gender" class="accent-green-600 w-3.5 h-3.5 cursor-pointer" />
                            Female
                        </label>
                    </div>
                </div>


                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Marital Status<span class="text-red-500">*</span>
                    </label>

                    <div class="sm:w-2/3 w-full flex gap-6">
                        <label class="flex items-center gap-2 text-[#1D1D1D] ">
                            <input type="radio" name="maritalStatus"
                                class="accent-green-600 w-3.5 h-3.5 cursor-pointer text-sm" />
                            Unmarried
                        </label>

                        <label class="flex items-center gap-2 text-[#1D1D1D] text-sm ">
                            <input type="radio" name="maritalStatus"
                                class="accent-green-600 w-3.5 h-3.5 cursor-pointer" />
                            Married
                        </label>
                    </div>
                </div>


                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Designation<span class="text-red-500">*</span>
                    </label>

                    <select
                        class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full">
                        <option value="">Select Designation</option>
                        <option value="junior_advocate">Junior Advocate</option>
                        <option value="associate_advocate">Associate Advocate</option>
                        <option value="senior_advocate">Senior Advocate</option>

                    </select>


                </div>

                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Qualification
                    </label>

                    <input type="text" placeholder="Enter Qualification"
                        class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full " />
                </div>

            </div>

            <!-- Right Column -->
            <div class="space-y-4 mt-4">

                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Employee Code<span class="text-red-500">*</span>
                    </label>

                    <input type="text" placeholder="Enter Employee Code"
                        class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full " />
                </div>


                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Department Master<span class="text-red-500">*</span>
                    </label>

                    <select
                        class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full">
                        <option value="">Select Department</option>
                        <option value="litigation">Litigation</option>
                        <option value="corporate_law">Corporate Law</option>
                        <option value="criminal_law">Criminal Law</option>
                        <option value="civil_law">Civil Law</option>
                        <option value="family_law">Family Law</option>
                    </select>


                </div>


                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Sub-Department Master<span class="text-red-500">*</span>
                    </label>

                    <select
                        class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full">
                        <option value="">Select Sub-Department</option>
                        <option value="drafting">Drafting Team</option>
                        <option value="research">Legal Research</option>
                        <option value="case_followup">Case Follow-Up</option>
                    </select>


                </div>


                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Shift Master
                    </label>

                    <select
                        class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full">
                        <option value="">Select Shift</option>
                        <option value="morning">Morning Shift</option>
                        <option value="afternoon">Afternoon Shift</option>
                        <option value="evening">Evening Shift</option>
                    </select>


                </div>



                <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                    <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                        Attachments
                    </label>

                    <button type="button" id="uploadBtn" class="h-[35px] px-[0.75rem] py-[0.375rem] text-green-600 text-sm sm:w-2/3
                                       bg-white border border-[#cbcbcb] rounded-md w-full
                                      focus:outline-none flex items-center justify-center gap-2">
                        <i class="ri-upload-line"></i>
                        <span>Upload File</span>
                    </button>
                    <input type="file" id="hiddenFileInput" class="hidden" multiple>

                </div>

            </div>
        </div>

        <!-- Tabs -->
        <div class="mx-2 mt-10">
            <ul id="tabs" class="flex whitespace-nowrap w-full border-b border-gray-300 overflow-x-auto [scrollbar-width:none] 
                [&::-webkit-scrollbar]:hidden">
                <li data-tab="details"
                    class="tab-item mr-6 pb-2 flex gap-2  cursor-pointer border-b-2 border-[#009333] text-[#009333]">
                    <i class="ri-phone-line"></i>
                    <span>Contact Details</span>
                </li>

                <li data-tab="address" class="tab-item mr-6 flex gap-2 pb-2 cursor-pointer hover:text-[#009333]">
                    <i class="ri-map-pin-line"></i>
                    <span>Address Details</span>
                </li>
                <li data-tab="bank" class="tab-item mr-6 flex gap-2 pb-2 cursor-pointer hover:text-[#009333]">
                    <i class="ri-bank-line"></i>
                    <span>Bank Details</span>
                </li>
                <li data-tab="proof" class="tab-item mr-6 flex gap-2 pb-2 cursor-pointer hover:text-[#009333]">
                    <i class="ri-id-card-line"></i>
                    <span>Proof Details</span>
                </li>
                <li data-tab="family" class="tab-item mr-6 flex gap-2 pb-2 cursor-pointer hover:text-[#009333]">
                    <i class="ri-user-line"></i>
                    <span>Family Info</span>
                </li>
                <li data-tab="esiPf" class="tab-item mr-6 flex gap-2 pb-2 cursor-pointer hover:text-[#009333]">
                    <i class="ri-shield-line"></i>
                    <span>ESI & PF Details</span>
                </li>
            </ul>
        </div>

        <!-- Tab Contents -->
        <div class="">

            <!-- DETAILS TAB -->
            <div id="tab-details" class="tab-content">

                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 px-4 py-4">

                    <!-- Left Column -->
                    <div class="space-y-4">

                        <!-- E-mail ID -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                E-mail ID
                            </label>

                            <input type="email" placeholder="Enter E-mail ID"
                                class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full" />
                        </div>

                        <!-- Phone Number -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Phone Number<span class="text-red-500">*</span>
                            </label>

                            <input type="tel" maxlength="10" placeholder="Enter 10 Digit Phone Number"
                                class="uppercase h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:normal-case placeholder:text-[#585858]  bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full" />
                        </div>

                        <!-- Company Number -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Company Number
                            </label>

                            <input type="tel" maxlength="10" placeholder="Enter 10 Digit Company Number"
                                class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full" />
                        </div>

                    </div>

                </div>
            </div>


            <!-- ADDRESS TAB -->

            <div id="tab-address" class="tab-content hidden">
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 px-4 pt-4">

                    <!-- Left Column -->
                    <div class="space-y-4 space-y-4 lg:border-r lg:border-gray-300 lg:pr-4 pb-4">

                        <!-- Address Line 1 -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Address Line 1<span class="text-red-500">*</span>
                            </label>

                            <input type="text" placeholder="Enter Address Line 1" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                    sm:w-2/3 w-full" />
                        </div>


                        <!-- Address Line 2 -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Address Line 2
                            </label>

                            <input type="text" placeholder="Enter Address Line 2" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                    sm:w-2/3 w-full" />
                        </div>



                        <!-- Pincode -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Pincode<span class="text-red-500">*</span>
                            </label>

                            <input type="text" placeholder="Enter Pincode" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                    sm:w-2/3 w-full" />
                        </div>



                    </div>

                    <div class="space-y-4 pb-4">


                        <!-- Taluk -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Taluk<span class="text-red-500">*</span>
                            </label>

                            <input type="text" placeholder="Enter Taluk" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                    sm:w-2/3 w-full" />
                        </div>

                        <!-- District -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                District<span class="text-red-500">*</span>
                            </label>

                            <input type="text" placeholder="Enter District" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529]
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb]
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]
                    sm:w-2/3 w-full" />
                        </div>

                        <!-- STATE -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                State<span class="text-red-500">*</span>
                            </label>

                            <select
                                class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full">
                                <option value="">Select State</option>
                                <option value="andhra_pradesh">Andhra Pradesh</option>
                                <option value="karnataka">Karnataka</option>
                                <option value="kerala">Kerala</option>
                                <option value="madhya_pradesh">Madhya Pradesh</option>
                                <option value="maharashtra">Maharashtra</option>
                                <option value="tamil_nadu">Tamil Nadu</option>
                                <option value="telangana">Telangana</option>
                                <option value="tripura">Tripura</option>
                                <option value="uttar_pradesh">Uttar Pradesh</option>
                                <option value="uttarakhand">Uttarakhand</option>
                                <option value="west_bengal">West Bengal</option>
                                <option value="andaman_nicobar">Andaman & Nicobar Islands</option>
                                <option value="chandigarh">Chandigarh</option>
                            </select>


                        </div>






                    </div>

                </div>
            </div>




            <!-- Bank INFO TAB -->
            <div id="tab-bank" class="tab-content hidden">
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 px-4 py-4">

                    <!-- Left Column -->
                    <div class="space-y-4">

                        <!-- Account Number -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Account Number<span class="text-red-500">*</span>
                            </label>

                            <input type="text" placeholder="Enter Bank Account Number" class="uppercase h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:normal-case
                    sm:w-2/3 w-full" />
                        </div>

                        <!-- IFSC Code -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                IFSC Code<span class="text-red-500">*</span>
                            </label>

                            <input type="text" placeholder="Enter IFSC Code" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                    sm:w-2/3 w-full" />
                        </div>


                        <!-- Bank name -->

                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Bank Name<span class="text-red-500">*</span>
                            </label>

                            <select
                                class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] sm:w-2/3 w-full">
                                <option value="">Select Bank Account</option>
                                <option value="">Select Bank Account</option>
                                <option value="SBI">State Bank of India</option>
                                <option value="HDFC">HDFC Bank</option>
                                <option value="ICICI">ICICI Bank</option>
                                <option value="AXIS">Axis Bank</option>
                                <option value="KOTAK">Kotak Mahindra Bank</option>
                            </select>



                        </div>



                        <!-- Branch Name -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Branch Name<span class="text-red-500">*</span>
                            </label>

                            <input type="text" placeholder="Enter Branch Name" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                    sm:w-2/3 w-full" />
                        </div>



                    </div>

                </div>

            </div>





            <!-- PROOF INFO TAB -->
            <div id="tab-proof" class="tab-content hidden">
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 px-4 py-4">

                    <!-- Left Column -->
                    <div class="space-y-4">



                        <!-- Aadhaar Number -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                Aadhaar Number<span class="text-red-500">*</span>
                            </label>

                            <input type="text" maxlength="12" placeholder="Enter Aadhaar Number" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                    sm:w-2/3 w-full" />
                        </div>


                        <!-- PAN Number -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                PAN Number<span class="text-red-500">*</span>
                            </label>

                            <input type="text" maxlength="10" placeholder="Enter PAN Number" class="uppercase h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:normal-case
                    sm:w-2/3 w-full" />
                        </div>





                    </div>

                </div>

            </div>



            <!-- FAMILY INFO TAB -->
            <div id="tab-family" class="tab-content hidden">
                <div class="space-y-4 p-4">

                    <!-- ENTRY FORM TABLE -->
                    <table class="w-full text-sm">
                        <thead
                            class="bg-[#f8f9fa] text-left text-[#12344d] text-[12px] sticky top-0 z-10 border-b border-[#ebeff3]  ">
                            <tr>
                                <th class="p-2 border-r border-[#ebeff3] w-[15%]">Name</th>
                                <th class="p-2 border-r border-[#ebeff3] w-[10%]">Date of Birth</th>
                                <th class="p-2 border-r border-[#ebeff3] w-[8%]">Age</th>
                                <th class="p-2 border-r border-[#ebeff3] w-[18%]">Relationship Type</th>
                                <th class="p-2 border-r border-[#ebeff3] w-[15%]">Phone Number</th>
                                <th class="p-2 border-r border-[#ebeff3] w-[12%]">Occupation</th>
                                <th class="p-2 border-r border-[#ebeff3] w-[15%]">Aadhaar Number</th>
                                <th class="p-2 text-center w-[7%]">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td class="p-2 border-r border-b border-[#ebeff3]">
                                    <input type="text" id="name" placeholder="Enter Name" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                     w-full">
                                    <p id="err-name" class="text-red-500 text-xs hidden"></p>
                                </td>

                                <td class="p-2 border-r border-b border-[#ebeff3]">
                                    <input type="date" id="dob" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                     w-full">
                                    <p id="err-dob" class="text-red-500 text-xs hidden"></p>
                                </td>

                                <td class="p-2 border-r border-b border-[#ebeff3]">
                                    <input type="text" placeholder="Auto fill" id="age" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                     w-full" disabled>
                                </td>

                                <td class="p-2 border-r border-b border-[#ebeff3]">
                                    <select id="relationship" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                     w-full">
                                        <option value="">Select</option>
                                        <option>Father</option>
                                        <option>Mother</option>
                                        <option>Wife</option>
                                        <option>Husband</option>
                                        <option>Son</option>
                                        <option>Daughter</option>
                                    </select>
                                    <p id="err-relationship" class="text-red-500 text-xs hidden"></p>
                                </td>

                                <td class="p-2 border-r border-b border-[#ebeff3]">
                                    <input type="text" id="phone" maxlength="10" placeholder="Enter Phone Number" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                     w-full">
                                    <p id="err-phone" class="text-red-500 text-xs hidden"></p>
                                </td>

                                <td class="p-2 border-r border-b border-[#ebeff3]">
                                    <input type="text" id="occupation" placeholder="Enter Occupation" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                     w-full">
                                </td>

                                <td class="p-2 border-r border-b border-[#ebeff3]">
                                    <input type="text" id="aadhaar" maxlength="12" placeholder="Enter Aadhar Number"
                                        class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                     w-full">
                                    <p id="err-aadhaar" class="text-red-500 text-xs hidden"></p>
                                </td>

                                <td class="p-2 text-center  border-b border-[#ebeff3]">
                                    <button id="saveBtn" type="button"
                                        class="px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700">
                                        Save
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>



                    <!-- SAVED DATA TABLE -->
                    <div class="mt-4 max-h-[350px] overflow-y-auto  rounded">
                        <table class="w-full text-sm" id="familyTable">

                            <thead id="savedHeader" class="bg-[#f8f9fa] text-left text-[#12344d] text-[12px] sticky top-0 z-10 border-b border-[#ebeff3] hidden">
                                <tr>
                                    <th class="p-2 border-r border-[#ebeff3]">S.no</th>
                                    <th class="p-2 border-r border-[#ebeff3]">Name</th>
                                    <th class="p-2 border-r border-[#ebeff3]">Date of Birth</th>
                                    <th class="p-2 border-r border-[#ebeff3]">Age</th>
                                    <th class="p-2 border-r border-[#ebeff3]">Relationship Type</th>
                                    <th class="p-2 border-r border-[#ebeff3]">Phone Number</th>
                                    <th class="p-2 border-r border-[#ebeff3]">Occupation</th>
                                    <th class="p-2 border-r border-[#ebeff3]">Aadhaar Number</th>
                                    <th class="p-2 text-center">Actions</th>
                                </tr>
                            </thead>
                    
                            <tbody id="familyBody">
                            </tbody>

                        </table>
                    </div>
                </div>



            </div>



            <!-- ESIPF INFO TAB -->
            <div id="tab-esiPf" class="tab-content hidden">
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-4 px-4 py-4">

                    <!-- Left Column -->
                    <div class="space-y-4">

                        <!-- ESI Number -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                ESI Number
                            </label>

                            <input type="text" placeholder="Enter ESI Number" class="uppercase h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:normal-case
                    sm:w-2/3 w-full" />
                        </div>

                        <!-- ESI Branch -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                ESI Branch
                            </label>

                            <input type="text" placeholder="Enter ESI Branch" class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                    sm:w-2/3 w-full" />
                        </div>



                        <!-- UAN Number -->
                        <div class="flex flex-col sm:flex-row sm:items-start gap-2">
                            <label class="sm:w-1/3 text-sm font-medium text-[#1D1D1D]">
                                UAN Number
                            </label>

                            <input type="text" placeholder="Enter UAN Number " class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] 
                    text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] 
                    rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] 
                    sm:w-2/3 w-full" />
                        </div>



                    </div>

                </div>

            </div>






        </div>


        <div id="attachmentModal" 
     class="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 hidden">

  <div class="bg-white rounded-lg w-[80%] h-full max-h-[calc(100vh-30px)] flex flex-col">

    <!-- Header -->
    <div class="flex justify-between items-center p-4 border-b">
      <h2 class="text-lg font-semibold">Attachments</h2>

      <button id="closeModalBtn" type="button" class="text-gray-500 hover:text-gray-700">
        <i class="ri-close-line text-xl"></i>
      </button>
    </div>

    <div class="overflow-y-auto flex-1 p-4">

      <!-- Upload Area -->
      <div id="uploadBox"
           class="bg-white rounded-xl p-6 shadow-md border border-dashed border-gray-300
                  text-center mb-6 cursor-pointer hover:border-green-400 hover:bg-gray-50">

        <div class="flex flex-col items-center space-y-3">
          <div class="text-4xl text-green-500">
            <i class="ri-upload-cloud-2-line"></i>
          </div>

          <p class="text-black font-semibold">Click here to upload files</p>
          <p class="text-gray-400 text-sm">
            Supported Format: SVG, JPG, PNG, PDF (10mb each)
          </p>
        </div>
      </div>

      <!-- File List -->
      <div class="bg-white rounded-xl shadow-md p-4">
        <div class="flex justify-between items-center mb-4">
  <div class="text-gray-700 font-semibold">
    Attached Files 
    <span id="fileCount" class="text-xs bg-[#009333] text-white px-2 py-1 rounded-full">0</span>
  </div>

  <div class="flex items-center relative space-x-2">
    <input 
      id="searchInput" 
      class="h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full" 
      type="text" 
      placeholder="Search files..."
    />

    <!-- Filter Button -->
    <button 
      id="filterBtn"
      type="button"
      class="py-1 px-2 text-sm rounded cursor-pointer text-[#384551] hover:bg-[#dce0e5]"
    >
      <i class="ri-filter-3-line"></i>
    </button>
  </div>
</div>


        <div class="max-h-[calc(100vh-385px)] overflow-y-auto">
  <table class="w-full text-sm text-left border-collapse">

    <thead class="text-gray-500 shadow-[0_1px_0_0_#ebeff3] bg-gray-50 sticky top-0 z-10">
      <tr>
        <th class="px-2 py-2 text-xs font-medium border-r border-[#ebeff3]">File Name</th>
        <th class="px-2 py-2 text-xs font-medium border-r border-[#ebeff3]">File Size</th>
        <th class="px-2 py-2 text-xs font-medium border-r border-[#ebeff3]">Last Modified</th>
        <th class="px-2 py-2 text-xs font-medium border-r border-[#ebeff3]">Uploaded By</th>
        <th class="px-2 py-2 text-xs font-medium text-center ">Action</th>
      </tr>
    </thead>

    <tbody id="fileTableBody">
      <!-- Rows added here -->
    </tbody>
  </table>
</div>


      </div>

    </div>
  </div>

</div>

    </form>






</div>
<footer class="px-4 h-[56px] bg-[#ebeff3] flex items-center justify-start gap-2">
    <button id="formsaveBtn"
        class="py-1.5 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border-[#009333] hover:bg-[#007a2a] transition">
        Save
    </button>
    <button type="button" id="cancelBtn"
        class="py-1.5 px-2 text-sm rounded border cursor-pointer bg-[#6c757d] text-white border-[#6c757d] hover:bg-[#5a6268] transition">
        Cancel
    </button>
</footer>


<script src="/module/pages/staff/new.js"></script>