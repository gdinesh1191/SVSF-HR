<div class="flex justify-between items-center bg-white px-1.5 mt-[8px] ml-2 whitespace-nowrap">

    <!-- STATIC TABS (HTML Only) -->
    <ul id="tabsContainer" class="flex flex-nowrap text-sm font-medium text-center">

        <li>
            <button
                class="tab active-tab bg-[#ebeff3] text-[#384551] inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer "
                data-tab="InsuranceList">
                <span class="flex items-center ">
                    
                    <i class="ri-secure-payment-line mr-1"></i>
                    Insurance List
                    <span
                        class="ml-2 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">12</span>
                    <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closeTab"></i>
                </span>
            </button>
           
        </li>
        <li>
        <button class="tab inline-block p-[8px] rounded-t-[0.375rem] text-[#576c7d] cursor-pointer"
            data-tab="ClaimHistory">
            <span class="flex items-center gap-1">Claim History</span>
        </button>
    </li>



    </ul>

    <!-- RIGHT BUTTONS -->
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



<!-- SUB HEADER -->
<div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
    <div className="bulk-actions flex items-center space-x-2">
        <button
            class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 "
            disabled id="printBtn">
            <i class="ri-printer-line mr-1"></i>
            Print
        </button>
        <button
            class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 "
            disabled id="summaryBtn">
            <i class="ri-sticky-note-line mr-1"></i>
            Summary
        </button>
        <button id="downloadBtn"
            class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 "
            disabled>
            <i class="ri-arrow-down-line mr-1"></i>
            Download
        </button>

        <button id="deleteBtn"
            class="py-1 px-2 text-sm rounded border border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] cursor-pointer ">
            <i class="ri-delete-bin-6-line mr-1"></i>
            Delete
        </button>


    </div>



    <div class="flex items-center relative space-x-2">
        <input type="text" placeholder="Enter Policy Holder Name" class="block w-full h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]
         placeholder:text-[13px] placeholder:text-[#585858]" />
        <button id="openFilterBtn"
            class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]"><i
                class="ri-filter-3-fill"></i></button>
    </div>
</div>
<div id="selectedBadge"
    class="hidden fixed top-[176px] left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
    0 items selected
</div>


<!-- TABLE WRAPPER -->
<div class="bg-[#ebeff3]">
    <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
        <div class="h-full overflow-y-auto overflow-x-auto w-full">
            <table class="w-full min-w-max">
                <thead
                    class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                    <tr class="text-left divide-x divide-[#ebeff3]">
                        <th class="p-2"><input type="checkbox" id="selectAll" class="accent-green-600 cursor-pointer" />
                        </th>
                        <th class="p-2">S.no</th>
                        <th class="p-2">Policy Holder Details</th>
                        <th class="p-2">Policy Number</th>
                        <th class="p-2">Policy Type</th>
                        <th class="p-2">Premium Amount</th>
                        <th class="p-2">Coverage Amount</th>
                         <th class="p-2">Status</th>
     </tr>
                </thead>


                <tbody id="InsuranceTableBody">
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

<!-- Filter Sidebar -->
<div id="filterSidebar"
    class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">

    <!-- Backdrop -->
    <div id="filterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>

    <!-- Sidebar Content -->
    <div id="filterPanel"
        class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col h-[calc(100vh-5.55rem)]">

        <!-- Header -->
        <div
            class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Filters</h5>
            <button id="filterCloseBtn" class="cursor-pointer text-sm">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <!-- Scrollable Content -->
        <div class="p-4 overflow-y-auto flex-1">

            <!-- Policy Number -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Policy Number</label>
                <input type="text" id="PolicyNumber" class="block w-full  h-[35px] px-[0.75rem] py-[0.375rem] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] 
               focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]"
                    placeholder="Enter Policy Number">
            </div>
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Policy Type</label>
                <input type="text" id="PolicyType" class="block w-full  h-[35px] px-[0.75rem] py-[0.375rem] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] 
               focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]"
                    placeholder="Enter Policy Type">
            </div>


            <!-- Status -->
            <div class="mb-4">
                <label class="block text-sm font-semibold text-[#000000] mb-1.5">Status</label>

                <div class="flex space-x-6">
                    <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="status" value="active" class="accent-[#009333] cursor-pointer">
                        Active
                    </label>

                    <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="status" value="expired" class="accent-[#009333] cursor-pointer">
                        Expired
                    </label>
                    <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                        <input type="radio" name="status" value="pending" class="accent-[#009333] cursor-pointer">
                        Pending
                    </label>
                </div>

            </div>

        </div>

        <!-- Footer -->
        <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button id="resetBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">
                Reset All
            </button>
            <button id="applyBtn"
                class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                Apply
            </button>
        </div>
    </div>
</div>




    <!-- Overlay -->
    <div id="payrollSidebarOverlay" class="fixed inset-0 bg-black bg-opacity-40 hidden z-40"></div>


    <!-- Sidebar -->
    <div id="payrollSidebar"
        class="fixed top-0 right-[-750px] w-[750px] h-full bg-white shadow-xl z-50 transition-all duration-300 flex flex-col">

        <!-- Header -->
        <div class="flex justify-between items-center px-4 py-3 text-[#12344d] border-b border-gray-200">
            <h2 class="text-lg" id="payrollSidebarTitle">Payroll Calculation Rules</h2>
            <button id="closeSidebar" class="text-gray-500 hover:text-black">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>

        <!-- Tabs -->
        <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
            <button class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-[#009333] text-[#009333] "
                data-tab="policyinformation">
                Policy Information
            </button>
            <button
                class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black"
                data-tab="policyenrollment">
                Policy Enrollment Form
            </button>
            <button
                class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black"
                data-tab="claimhistory">
                Claim History
            </button>
            <button
                class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black"
                data-tab="newclaimform">
                New Claim Form
            </button>
        </div>

        <!-- Insurance Details TAB Content -->
        <div id="policyinformation" class="p-4 overflow-y-auto flex-1 bg-gray-50">

        <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium">Policy Holder Name:</p>
                  <p id="detailPolicyHolder"></p></div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p id="detailEmail"></p>
                </div>
                <div>
                  <p className="font-medium">Policy Number:</p>
                  <p id="detailPolicyNumber"></p>
                </div>
                <div>
                  <p className="font-medium">Policy Type:</p>
                  <p id="detailPolicyType"></p>
                </div>
                <div>
                  <p className="font-medium">Premium Amount:</p>
                  <p id="detailPremiumAmount"></p>
                </div>
                <div>
                  <p className="font-medium">Coverage Amount:</p>
                  <p id="detailCoverageAmount"></p>
                </div>
                <div>
                  <p className="font-medium">Policy Start Date:</p>
                  <p id="detailPolicyStartDate"></p>
                </div>
                <div>
                  <p className="font-medium">Policy End Date:</p>
                  <p id="detailPolicyEndDate"></p>
                </div>
                <div>
                  <p className="font-medium">Policy Term:</p>
                  <ul id="detailNominees"></ul>
                </div>
                <div>
                  <p className="font-medium">Previous Insurance Coverage:</p>
                  <p>{selectedPolicy.previous_insurance_coverage}</p>
                </div>
                {selectedPolicy.previous_insurance_coverage === "Yes" && (
                  <div>
                    <p className="font-medium">Previous Insurer Name:</p>
                    <p>{selectedPolicy.previous_insurer_name}</p>
                  </div>
                )}
                <div>
                  <p className="font-medium">No Claim Bonus:</p>
                  <p>{selectedPolicy.no_claim_bonus || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium">Porting Request:</p>
                  <p>{selectedPolicy.porting_request}</p>
                </div>

                <div className="col-span-2 mt-4">
                  <h4 className="font-semibold text-md mb-2">
                    Payment & Banking Information
                  </h4>
                  <p>
                    <span className="font-medium">Payment Mode:</span>{" "}
                    {selectedPolicy.payment_mode || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Account Holder Name:</span>{" "}
                    {selectedPolicy.account_holder_name || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Bank Account Number:</span>{" "}
                    {selectedPolicy.bank_account_number || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">IFSC Code:</span>{" "}
                    {selectedPolicy.ifsc_code || "N/A"}
                  </p>
                </div>

                <div className="col-span-2 mt-4">
                  <h4 className="font-semibold text-md mb-2">Nominee Details</h4>
                  {selectedPolicy.nominees && selectedPolicy.nominees.length > 0 ? (
                    <ul>
                      {selectedPolicy.nominees.map((nominee) => (
                        <li key={nominee.id}>
                          {nominee.name} ({nominee.relation}){" "}
                          {nominee.is_primary && "(Primary)"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No nominees added.</p>
                  )}
                </div>
                <div className="col-span-2 mt-4">
                  <h4 className="font-semibold text-md mb-2">Documents</h4>
                  <p>
                    ID Proof:{" "}
                    <span className="text-blue-600 cursor-pointer">View</span>
                  </p>
                  <p>
                    Address Proof:{" "}
                    <span className="text-blue-600 cursor-pointer">View</span>
                  </p>
                </div>
              </div>
            </div>

            
        </div>

        <!-- Increment TAB Content -->
        <div id="policyenrollment" class="hidden flex-1 overflow-y-auto p-6 bg-gray-50">
        <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="overflow-y-auto px-2 py-2">
                <h4 className="font-semibold text-md mb-3 border-b pb-2">
                  Policy Details
                </h4>
                <FormField label="Type of Policy" required>
                  <SearchableSelect
                    name="policyType"
                    options={policyTypeOptions}
                    Value=policyType
                    placeholder="Select Type"
                    className="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                  />
                </FormField>
                <FormField label="Sum Insured (Coverage Amount)" required>
                  <input
                    type="text"
                    name="sumInsured"
                    value=sumInsured
                    placeholder="Enter Sum Insured"
                    className="only_number"
                    
                  />
                </FormField>
                <FormField label="Policy Start Date" required>
                  <DatePicker
                    id="policyStartDate"
                    name="policyStartDate"
                    placeholder="Select start date"
                   
                   
                    className="w-full block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                  />
                </FormField>
                <FormField label="Policy Term" required>
                  <input
                    type="text"
                    name="policyTerm"
                    value={enrollmentForm.policyTerm}
                    placeholder="e.g., 1 year, 2 years"
                    
                  />
                </FormField>
                <FormField label="Previous Insurance Coverage" required>
                  <RadioGroup
                    name="previousInsuranceCoverage"
                    value={enrollmentForm.previousInsuranceCoverage}
                    options={[
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" },
                    ]}
                   
                  />
                </FormField>
                {enrollmentForm.previousInsuranceCoverage === "Yes" && (
                  <FormField label="Previous Insurer Name">
                    <input
                      type="text"
                      name="previousInsurerName"
                      value={enrollmentForm.previousInsurerName}
                      placeholder="Enter Previous Insurer Name"
                      
                    />
                  </FormField>
                )}
                <FormField label="Policy Number">
                  <input
                    type="text"
                    name="policyNumber"
                    value={enrollmentForm.policyNumber}
                    placeholder="Enter Policy Number"
                    
                  />
                </FormField>
                <FormField label="No Claim Bonus (if applicable)">
                  <input
                    type="text"
                    name="noClaimBonus"
                    value={enrollmentForm.noClaimBonus}
                    placeholder="Enter No Claim Bonus"
                    
                  />
                </FormField>

                <FormField
                  label="Porting Request (if switching insurer)"
                  required
                >
                  <RadioGroup
                    name="portingRequest"
                    value={enrollmentForm.portingRequest}
                    options={[
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" },
                    ]}
                    
                  />
                </FormField>

                <h4 className="font-semibold text-md mb-3 mt-6 border-b pb-2">
                  Payment & Banking Information
                </h4>
                <FormField label="Payment Mode" required>
                  <SearchableSelect
                    name="paymentMode"
                    options={paymentModeOptions}
                    initialValue={enrollmentForm.paymentMode}
                    placeholder="Select Mode"
                    
                    className="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                  />
                </FormField>
                <FormField label="Account Holder Name" required>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={enrollmentForm.accountHolderName}
                    placeholder="Enter Account Holder Name"
                    
                  />
                </FormField>
                <FormField label="Bank Account Number" required>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    value={enrollmentForm.bankAccountNumber}
                    placeholder="Enter Bank Account Number"
                    className="only_number"
                    
                  />
                </FormField>
                <FormField label="IFSC Code" required>
                  <input
                    type="text"
                    name="ifscCode"
                    value={enrollmentForm.ifscCode}
                    placeholder="Enter IFSC Code"
                    
                  />
                </FormField>
                <FormField label="Upload Cancelled Cheque (optional)">
                  <input
                    type="file"
                    className="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                    
                  />
                </FormField>

                <h4 className="font-semibold text-md mb-3 mt-6 border-b pb-2">
                  Documents & Nominee Selection
                </h4>
                <FormField label="ID Proof" required>
                  <input
                    type="file"
                    className="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                  
                  />
                </FormField>
                <FormField label="Address Proof" required>
                  <input
                    type="file"
                    className="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                   
                  />
                </FormField>

                <FormField label="Nominee Selection" required>
                  <RadioGroup
                    name="selectedNominee"
                    value={enrollmentForm.selectedNominee}
                   
                   
                  />
                </FormField>

                <FormField label="">
                  <button
                    type="button"
                    className="btn-sm btn-primary py-2 mt-4"
                   
                  >
                    Save Policy Enrollment
                  </button>
                </FormField>

              </div>
            </div>
        </div>

        <div id="claimhistory" class="hidden flex-1 overflow-y-auto p-4 bg-gray-50">
            <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div>
                    <h2 class="text-lg font-semibold mb-3 text-gray-800">New Increment</h2>

                    <form class="space-y-4">
                        <!-- Start Date -->
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">
                                Start Date<span class="text-red-500">*</span>
                            </label>
                            <input type="date" value="2025-11-24"
                                class="w-2/3 w-full px-2  py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#009333]" />
                        </div>

                        <!-- Amount -->
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">
                                Amount<span class="text-red-500">*</span>
                            </label>
                            <input type="text" placeholder="Enter Amount"
                                class="w-2/3 w-full px-2  py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#009333]" />
                        </div>

                        <!-- Description -->
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">
                                Description<span class="text-red-500">*</span>
                            </label>
                            <input type="text" placeholder="Enter Description"
                                class="w-2/3 w-full px-2  py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#009333]" />
                        </div>
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">

                            </label>
                            <button type="submit"
                                class="w-2/3 w-full px-2 py-2 text-sm  rounded-lg bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition" />
                            Save
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
        <div id="newclaimform" class="hidden flex-1 overflow-y-auto p-4 bg-gray-50">
            <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
                <div>
                    <h2 class="text-lg font-semibold mb-3 text-gray-800">New Increment</h2>

                    <form class="space-y-4">
                        <!-- Start Date -->
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">
                                Start Date<span class="text-red-500">*</span>
                            </label>
                            <input type="date" value="2025-11-24"
                                class="w-2/3 w-full px-2  py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#009333]" />
                        </div>

                        <!-- Amount -->
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">
                                Amount<span class="text-red-500">*</span>
                            </label>
                            <input type="text" placeholder="Enter Amount"
                                class="w-2/3 w-full px-2  py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#009333]" />
                        </div>

                        <!-- Description -->
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">
                                Description<span class="text-red-500">*</span>
                            </label>
                            <input type="text" placeholder="Enter Description"
                                class="w-2/3 w-full px-2  py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#009333]" />
                        </div>
                        <div class="flex items-center space-x-4">
                            <label class="w-1/3 text-sm text-[#1D1D1D]">

                            </label>
                            <button type="submit"
                                class="w-2/3 w-full px-2 py-2 text-sm  rounded-lg bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition" />
                            Save
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>


    </div>


    <script src="/module/pages/insurance/list.js"></script>