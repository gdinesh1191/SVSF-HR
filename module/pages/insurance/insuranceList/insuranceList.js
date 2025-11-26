window.insuranceListModule = (function () {
  const state = {
    initialized: false,
    selectedPolicy: null,
  };
  const insuranceData = [
    {
      id: 1,
      policyHolder: "Priya Sharma",
      email: "priya.sharma@example.com",
      policyNumber: "HP-2024-001",
      policyType: "Health Plus",
      premiumAmount: 15000,
      coverageAmount: 500000,
      sumInsured: "500000",
      status: "Active",
      startDate: "15/01/2024",
      endDate: "14/01/2024",
      policyTerm: "1 Year",
      previousInsuranceCoverage: "Yes",
      previousInsurerName: "Star Health Insurance",
      noClaimBonus: "20%",
      portingRequest: "No",
      paymentMode: "UPI",
      accountHolderName: "Priya Sharma",
      bankAccountNumber: "1234567890",
      ifscCode: "SBIN0001234",
      nominees: [
        { id: 1, name: "Raj Sharma", relation: "Husband", isPrimary: true },
        {
          id: 2,
          name: "Ananya Sharma",
          relation: "Daughter",
          isPrimary: false,
        },
      ],
      previousClaims: [
        {
          claimId: "CLM-2023-001",
          claimDate: "2023-06-15",
          hospitalName: "Apollo Hospital",
          totalClaimedAmount: "45000",
          status: "Approved",
          insuranceCompanyName: "Star Health Insurance",
          nameOfClaimant: "Priya Sharma",
          dateOfAdmission: "2023-06-10",
          dateOfDischarge: "2023-06-14",
          typeOfAdmission: "Emergency",
          reasonForHospitalization: "Acute Appendicitis",
          natureOfTreatment: "Surgical",
          doctorsName: "Dr. Ramesh Kumar",
          doctorsContact: "+91-9876543210",
          roomType: "Private",
          preAuthorizationObtained: "Yes",
          preAuthorizationNumber: "PA-2023-001",
          billBreakup: {
            hospitalCharges: "20000",
            medicines: "8000",
            diagnostics: "7000",
            surgeonDoctorFee: "10000",
          },
        },
      ],
    },
    {
      id: 2,
      policyHolder: "Amit Singh",
      email: "amit.singh@example.com",
      policyNumber: "MC-2024-002",
      policyType: "Motor Comprehensive",
      premiumAmount: 10500,
      coverageAmount: 300000,
      sumInsured: "300000",
      status: "Expired",
      startDate: "20/03/2023",
      endDate: "19/03/2024",
      policyTerm: "1 Year",
      previousInsuranceCoverage: "No",
      previousInsurerName: "",
      noClaimBonus: "15%",
      portingRequest: "No",
      paymentMode: "Credit Card",
      accountHolderName: "Amit Singh",
      bankAccountNumber: "9876543210",
      ifscCode: "HDFC0002345",
      nominees: [
        { id: 3, name: "Neha Singh", relation: "Wife", isPrimary: true },
      ],
      previousClaims: [],
    },
    {
      id: 3,
      policyHolder: "Neha Gupta",
      email: "neha.gupta@example.com",
      policyNumber: "TL-2024-003",
      policyType: "Term Life",
      premiumAmount: 22000,
      coverageAmount: 1000000,
      sumInsured: "1000000",
      status: "Active",
      startDate: "01/02/2024",
      endDate: "31/01/2025",
      policyTerm: "1 Year",
      previousInsuranceCoverage: "Yes",
      previousInsurerName: "LIC",
      noClaimBonus: "N/A",
      portingRequest: "Yes",
      paymentMode: "Bank Transfer",
      accountHolderName: "Neha Gupta",
      bankAccountNumber: "5678901234",
      ifscCode: "ICIC0003456",
      nominees: [
        { id: 4, name: "Arun Gupta", relation: "Father", isPrimary: true },
        { id: 5, name: "Sunita Gupta", relation: "Mother", isPrimary: false },
      ],
      previousClaims: [],
    },
    {
      id: 4,
      policyHolder: "Rahul Kumar",
      email: "rahul.kumar@example.com",
      policyNumber: "HI-2024-004",
      policyType: "Home Insurance",
      premiumAmount: 7800,
      coverageAmount: 250000,
      sumInsured: "250000",
      status: "Pending",
      startDate: "10/04/2024",
      endDate: "09/04/2025",
      policyTerm: "1 Year",
      previousInsuranceCoverage: "No",
      previousInsurerName: "",
      noClaimBonus: "N/A",
      portingRequest: "No",
      paymentMode: "Debit Card",
      accountHolderName: "Rahul Kumar",
      bankAccountNumber: "4567890123",
      ifscCode: "AXIS0004567",
      nominees: [
        { id: 6, name: "Priya Kumar", relation: "Wife", isPrimary: true },
      ],
      previousClaims: [],
    },
  ];

  function getInsuranceCount() {
    return insuranceData.length;
  }

  function renderInsuranceList() {
    const container = $("#InsuranceListContent");
    if (!container.length) return;

    if (!state.initialized) {
      container.html(getLayoutTemplate());
      mountEvents();
      state.initialized = true;
    }

    renderInsuranceTable();
  }

  function getLayoutTemplate() {
    return `
      <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
        <div class="bulk-actions flex items-center space-x-2">
          <button class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" disabled>
            <i class="ri-printer-line mr-1"></i> Print
          </button>
          <button class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" disabled>
            <i class="ri-sticky-note-line mr-1"></i> Summary
          </button>
          <button id="downloadBtn" class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" disabled>
            <i class="ri-arrow-down-line mr-1"></i> Download
          </button>
          <button id="deleteBtn" class="py-1 px-2 text-sm rounded border border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] cursor-pointer">
            <i class="ri-delete-bin-6-line mr-1"></i> Delete
          </button>
        </div>
        <div class="flex items-center relative space-x-2">
          <input type="text" placeholder="Enter Policy Holder Name" class="block w-full h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]" />
          <button id="openFilterBtn" class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]">
            <i class="ri-filter-3-fill"></i>
          </button>
        </div>
      </div>
      <div id="selectedBadge" class="hidden fixed top-[176px] left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
        0 items selected
      </div>
      <div class="bg-[#ebeff3]">
        <div class="mx-2 h-[calc(100vh-189px)] overflow-hidden rounded-lg bg-white">
          <div class="h-full overflow-y-auto overflow-x-auto w-full">
            <table class="w-full min-w-max">
              <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                <tr class="text-left divide-x divide-[#ebeff3]">
                  <th class="p-2"><input type="checkbox" id="selectAll" class="accent-green-600 cursor-pointer" /></th>
                  <th class="p-2">S.no</th>
                  <th class="p-2">Policy Holder Details</th>
                  <th class="p-2">Policy Number</th>
                  <th class="p-2">Policy Type</th>
                  <th class="p-2">Premium Amount</th>
                  <th class="p-2">Coverage Amount</th>
                  <th class="p-2">Status</th>
                </tr>
              </thead>
              <tbody id="InsuranceTableBody"></tbody>
            </table>
          </div>
        </div>
      </div>
      <footer class="bg-[#ebeff3] h-[54px] px-4 flex items-center justify-start">
        <span class="text-sm">
          Showing <span class="text-red-600">${
            insuranceData.length
          }</span> of <span class="text-blue-600">${insuranceData.length}</span>
        </span>
      </footer>
      ${getFilterSidebarTemplate()}
      ${getDetailsSidebarTemplate()}
    `;
  }

  function getFilterSidebarTemplate() {
    return `
      <div id="filterSidebar" class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">
        <div id="filterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div id="filterPanel" class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col h-[calc(100vh-5.55rem)] translate-x-full">
          <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Add Filters</h5>
            <button id="filterCloseBtn" class="cursor-pointer text-sm">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="p-4 overflow-y-auto flex-1">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Policy Number</label>
              <input type="text" id="PolicyNumber" class="block w-full h-[35px] px-[0.75rem] py-[0.375rem] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]" placeholder="Enter Policy Number">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Policy Type</label>
              <input type="text" id="PolicyType" class="block w-full h-[35px] px-[0.75rem] py-[0.375rem] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]" placeholder="Enter Policy Type">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Status</label>
              <div class="flex space-x-6">
                <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="status" value="active" class="accent-[#009333] cursor-pointer"> Active
                </label>
                <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="status" value="expired" class="accent-[#009333] cursor-pointer"> Expired
                </label>
                <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="status" value="pending" class="accent-[#009333] cursor-pointer"> Pending
                </label>
              </div>
            </div>
          </div>
          <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button id="resetBtn" class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">Reset All</button>
            <button id="applyBtn" class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">Apply</button>
          </div>
        </div>
      </div>
    `;
  }

  function getDetailsSidebarTemplate() {
    return `
      <div id="payrollSidebarOverlay" class="fixed inset-0 bg-black bg-opacity-40 hidden z-40"></div>
      <div id="payrollSidebar" class="fixed top-0 right-[-750px] w-[750px] h-full bg-white shadow-xl z-50 transition-all duration-300 flex flex-col">
        <div class="flex justify-between items-center px-4 py-3 text-[#12344d] border-b border-gray-200">
          <h2 class="text-lg" id="payrollSidebarTitle">Policy Insights</h2>
          <button id="closeSidebar" class="text-gray-500 hover:text-black">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
        <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
          <button class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-[#009333] text-[#009333]" data-tab="policyinformation">Policy Information</button>
          <button class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black" data-tab="policyenrollment">Policy Enrollment Form</button>
          <button class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black" data-tab="claimhistory">Claim History</button>
          <button class="sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black" data-tab="newclaimform">New Claim Form</button>
        </div>
        <div id="policyinformation" class="p-4 overflow-y-auto flex-1 bg-gray-50">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              ${getDetailRowsTemplate()}
            </div>
          </div>
        </div>
        <div id="policyenrollment" class="p-4 overflow-y-auto flex-1 bg-gray-50">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm text-gray-700">
              ${getDetailpolicyenvironment()}
            </div>
          </div>
        </div>
        <div id="claimhistory" class="p-4 overflow-y-auto flex-1 bg-gray-50 hidden">
         <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm text-gray-700">
              ${getDetailclaimhistory()}
            </div>
          </div>
</div>

         <div id="newclaimform" class="p-4 overflow-y-auto flex-1 bg-gray-50">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="grid grid-cols-1 md:grid-cols-1 gap-4 text-sm text-gray-700">
              ${getNewClaimFormTemplate()}
            </div>
          </div>
        </div>
       
         
        
      
       
      </div>
    `;
  }

  function getDetailRowsTemplate() {
    return `
      <div><p class="font-medium">Policy Holder Name:</p><p id="detailPolicyHolder">-</p></div>
      <div><p class="font-medium">Email:</p><p id="detailEmail">-</p></div>
      <div><p class="font-medium">Policy Number:</p><p id="detailPolicyNumber">-</p></div>
      <div><p class="font-medium">Policy Type:</p><p id="detailPolicyType">-</p></div>
      <div><p class="font-medium">Premium Amount:</p><p id="detailPremiumAmount">-</p></div>
      <div><p class="font-medium">Coverage Amount:</p><p id="detailCoverageAmount">-</p></div>
      <div><p class="font-medium">Policy Start Date:</p><p id="detailPolicyStartDate">-</p></div>
      <div><p class="font-medium">Policy End Date:</p><p id="detailPolicyEndDate">-</p></div>
      <div><p class="font-medium">Policy Term:</p><p id="detailPolicyTerm">-</p></div>
      <div><p class="font-medium">Previous Insurance Coverage:</p><p id="detailPreviousInsuranceCoverage">-</p></div>
      <div><p class="font-medium">No Claim Bonus:</p><p id="detailNoClaimBonus">-</p></div>
      <div><p class="font-medium">Porting Request:</p><p id="detailPortingRequest">-</p></div>
      <div class="col-span-2 mt-4">
        <h4 class="font-semibold text-md mb-2">Payment & Banking Information</h4>
        <p><span class="font-medium">Payment Mode:</span> <span id="detailPaymentMode">-</span></p>
        <p><span class="font-medium">Account Holder Name:</span> <span id="detailAccountHolderName">-</span></p>
        <p><span class="font-medium">Bank Account Number:</span> <span id="detailBankAccountNumber">-</span></p>
        <p><span class="font-medium">IFSC Code:</span> <span id="detailIFSCCode">-</span></p>
      </div>
      <div class="col-span-2 mt-4">
        <h4 class="font-semibold text-md mb-2">Nominee Details</h4>
        <ul id="detailNominees" class="list-disc pl-5 text-sm text-gray-700">
          <li>No nominees added.</li>
        </ul>
      </div>
      <div class="col-span-2 mt-4">
        <h4 class="font-semibold text-md mb-2">Documents</h4>
        <p>ID Proof: <span class="text-blue-600 cursor-pointer">View</span></p>
        <p>Address Proof: <span class="text-blue-600 cursor-pointer">View</span></p>
      </div>
    `;
  }
  function getDetailpolicyenvironment() {
    return `
 <!-- Policy Details -->
    <h4 class="font-semibold text-md mb-3 border-b pb-2">Policy Details</h4>

    <!-- Type of Policy -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Type of Policy <span class="text-red-500">*</span></label>
      <select class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529]  bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
        <option>Select Type</option>
        <!-- Add options here -->
      </select>
    </div>

    <!-- Sum Insured -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Sum Insured (Coverage Amount) <span class="text-red-500">*</span></label>
      <input type="text" class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] only_number" placeholder="Enter Sum Insured">
    </div>

    <!-- Policy Start Date -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class=" w-1/4 text-sm text-[#1D1D1D]">Policy Start Date <span class="text-red-500">*</span></label>
      <input type="date" class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
    </div>

    <!-- Policy Term -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Policy Term <span class="text-red-500">*</span></label>
      <input type="text" class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="e.g., 1 year, 2 years">
    </div>

    <!-- Previous Insurance Coverage -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Previous Insurance Coverage <span class="text-red-500">*</span></label>
      <div class="flex gap-4 w-3/4">
        <label><input type="radio" name="previousInsuranceCoverage"> Yes</label>
        <label><input type="radio" name="previousInsuranceCoverage"> No</label>
      </div>
    </div>

    <!-- Previous Insurer Name (conditionally shown) -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Previous Insurer Name</label>
      <input type="text" class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter Previous Insurer Name">
    </div>

    <!-- Policy Number -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Policy Number</label>
      <input type="text" class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter Policy Number">
    </div>

    <!-- No Claim Bonus -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">No Claim Bonus (if applicable)</label>
      <input type="text" class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter No Claim Bonus">
    </div>

    <!-- Porting Request -->
    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Porting Request (if switching insurer) <span class="text-red-500">*</span></label>
      <div class="flex gap-4 w-3/4">
        <label><input type="radio" name="portingRequest"> Yes</label>
        <label><input type="radio" name="portingRequest"> No</label>
      </div>
    </div>

    <!-- Payment & Banking Information -->
    <h4 class="font-semibold text-md mb-3 mt-6 border-b pb-2">Payment & Banking Information</h4>

    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Payment Mode <span class="text-red-500">*</span></label>
      <select class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
        <option>Select Mode</option>
      </select>
    </div>

    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Account Holder Name <span class="text-red-500">*</span></label>
      <input type="text" class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter Account Holder Name">
    </div>

    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Bank Account Number <span class="text-red-500">*</span></label>
      <input type="text" class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] only_number" placeholder="Enter Bank Account Number">
    </div>

    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">IFSC Code <span class="text-red-500">*</span></label>
      <input type="text" class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter IFSC Code">
    </div>

    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Upload Cancelled Cheque (optional)</label>
      <input  class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
      placeholder="Choose file no file choosen">
    </div>

    <!-- Documents & Nominee Selection -->
    <h4 class="font-semibold text-md mb-3 mt-6 border-b pb-2">Documents & Nominee Selection</h4>

    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">ID Proof <span class="text-red-500">*</span></label>
      <input  class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
       placeholder="Choose file no file choosen">
    </div>

    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Address Proof <span class="text-red-500">*</span></label>
      <input  class="w-3/4 block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
       placeholder="Choose file no file choosen">
    </div>

    <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="w-1/4 text-sm text-[#1D1D1D]">Nominee Selection <span class="text-red-500">*</span></label>
      <div class="flex gap-4 w-3/4">
        <label><input type="radio" name="selectedNominee"> Nominee 1</label>
        <label><input type="radio" name="selectedNominee"> Nominee 2</label>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex items-center space-x-4">
                            <label class="w-1/4 text-sm text-[#1D1D1D]">

                            </label>
                            <button type="submit"
                                class="w-3/4 w-full px-2 py-2 text-sm  rounded-lg bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition" />
                            Save
                            </button>
                        </div>




  `;
  }
  function getDetailclaimhistory() {
    const container = $("#claimhistory");
    if (!container.length) return;

    if (
      !state.selectedPolicy ||
      state.selectedPolicy.previousClaims.length === 0
    ) {
      container.html(
        `<p class="text-center text-gray-500">No claims found</p>`
      );
    } else {
      let html = `
       <div class="bg-white p-4 rounded-lg shadow-sm">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="bg-gray-100 text-left">
              <th class="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim ID</th>
              <th class="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claim Date</th>
              <th class="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital Name</th>
              <th class="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Claimed</th>
              <th class="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="p-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
      `;

      state.selectedPolicy.previousClaims.forEach((claim) => {
        html += `
          <tr class="">
            <td class="p-2 whitespace-nowrap text-sm text-gray-900">${claim.claimId}</td>
            <td class="p-2 whitespace-nowrap text-sm text-gray-900">${claim.claimDate}</td>
            <td class="p-2 whitespace-nowrap text-sm text-gray-900">${claim.hospitalName}</td>
            <td class="p-2 whitespace-nowrap text-sm text-gray-900">₹${parseInt(
              claim.totalClaimedAmount
            ).toLocaleString()}</td>
            <td class="p-2 whitespace-nowrap text-sm text-gray-900">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                claim.status === "Approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }">${claim.status}</span>
            </td>
            <td class="p-2 whitespace-nowrap text-sm text-gray-900 text-blue-600 cursor-pointer">View</td>
          </tr>
        `;
      });

      html += `</tbody></table>`;
      container.html(html);
    }
  }

  function getNewClaimFormTemplate() {
    return `
      <form>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <div class="overflow-y-auto px-2 py-2">
  
            <!-- Policy Details -->
            <h4 class="font-semibold text-md mb-3 border-b pb-2">Policy Details</h4>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Policy Number</label>
              <input type="text" name="policyNumber" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md bg-gray-100" placeholder="Auto-filled / Read Only" readonly>
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Insurance Company Name</label>
              <input type="text" name="insuranceCompanyName" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md bg-gray-100" placeholder="Auto-filled / Read Only" readonly>
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Name of Policyholder</label>
              <input type="text" name="nameOfClaimant" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md bg-gray-100" placeholder="Auto-filled / Read Only" readonly>
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Type of Policy</label>
              <input type="text" name="policyType" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md bg-gray-100" placeholder="Auto-filled / Read Only" readonly>
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Sum Insured</label>
              <input type="text" name="sumInsured" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md bg-gray-100" placeholder="Auto-filled / Read Only" readonly>
            </div>
  
            <!-- Hospitalization Details -->
            <h4 class="font-semibold text-md mb-3 mt-6 border-b pb-2">Hospitalization Details</h4>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Hospital Name <span class="text-red-500">*</span></label>
              <input type="text" name="hospitalName" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter Hospital Name">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Hospital Address <span class="text-red-500">*</span></label>
              <input type="text" name="hospitalAddress" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter Hospital Address">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Hospital Registration Number</label>
              <input type="text" name="hospitalRegistrationNumber" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md" placeholder="Enter Hospital Registration Number">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Date of Admission <span class="text-red-500">*</span></label>
              <input type="date" name="dateOfAdmission" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Date of Discharge <span class="text-red-500">*</span></label>
              <input type="date" name="dateOfDischarge" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Type of Admission <span class="text-red-500">*</span></label>
              <select name="typeOfAdmission" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]">
                <option value="">Select Type</option>
                <option value="Planned">Planned</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Reason for Hospitalization / Diagnosis <span class="text-red-500">*</span></label>
              <textarea name="reasonForHospitalization" class="w-3/4 text-sm h-[80px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter Reason / Diagnosis"></textarea>
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Nature of Treatment <span class="text-red-500">*</span></label>
              <select name="natureOfTreatment" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]">
                <option value="">Select Type</option>
                <option value="Medical">Medical</option>
                <option value="Surgical">Surgical</option>
                <option value="Maternity">Maternity</option>
                <option value="Other">Other</option>
              </select>
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Doctor's Name <span class="text-red-500">*</span></label>
              <input type="text" name="doctorsName" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md" placeholder="Enter Doctor's Name">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Doctor's Contact <span class="text-red-500">*</span></label>
              <input type="text" name="doctorsContact" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md" placeholder="Enter Doctor's Contact">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Room Type <span class="text-red-500">*</span></label>
              <select name="roomType" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]">
                <option value="">Select Room Type</option>
                <option value="General">General</option>
                <option value="Semi-private">Semi-private</option>
                <option value="Private">Private</option>
                <option value="ICU">ICU</option>
              </select>
            </div>
  
            <!-- Claim Details -->
            <h4 class="font-semibold text-md mb-3 mt-6 border-b pb-2">Claim Details</h4>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Total Amount Claimed <span class="text-red-500">*</span></label>
              <input type="number" name="totalAmountClaimed" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter Total Claimed Amount">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Pre-authorization Obtained? <span class="text-red-500">*</span></label>
              <select name="preAuthorizationObtained" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md">
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Pre-authorization Number</label>
              <input type="text" name="preAuthorizationNumber" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md" placeholder="Enter Pre-authorization Number">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Hospital Charges <span class="text-red-500">*</span></label>
              <input type="number" name="hospitalCharges" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter Hospital Charges">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Medicines <span class="text-red-500">*</span></label>
              <input type="number" name="medicines" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter Medicines Cost">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Diagnostics <span class="text-red-500">*</span></label>
              <input type="number" name="diagnostics" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter Diagnostics Cost">
            </div>
  
            <div class="mb-4 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
              <label class="w-1/4 text-sm text-[#1D1D1D]">Surgeon/Doctor Fee <span class="text-red-500">*</span></label>
              <input type="number" name="surgeonDoctorFee" class="w-3/4 text-sm h-[35px] px-[0.75rem] py-[0.375rem] border border-[#cbcbcb] rounded-md focus:outline-none focus:border-[#009333]" placeholder="Enter Surgeon/Doctor Fee">
            </div>
  
            <!-- Submit Button -->
            <div class="flex items-center space-x-4 mt-4">
              <label class="w-1/4"></label>
              <button type="submit" class="w-3/4 px-4 py-2 text-sm rounded-lg bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">
                Submit Claim
              </button>
            </div>
  
          </div>
        </div>
      </form>
    `;
  }
  

  function renderInsuranceTable() {
    const tbody = $("#InsuranceTableBody");
    if (!tbody.length) return;
    tbody.empty();

    insuranceData.forEach((policy, index) => {
      tbody.append(`
        <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer divide-x divide-[#ebeff3] group employee-row"
             data-name="${policy.policyHolder}"
           data-email="${policy.email}"
           data-policy="${policy.policyNumber}"
           data-type="${policy.policyType}"
           data-premium="${policy.premiumAmount}"
           data-coverage="${policy.coverageAmount}"
           data-status="${policy.status}"

           data-start-date="${policy.startDate}"
           data-end-date="${policy.endDate}"
           data-policy-term="${policy.policyTerm}"
           data-previous-insurance-coverage="${
             policy.previousInsuranceCoverage
           }"
           data-no-claim-bonus="${policy.noClaimBonus}"
           data-porting-request="${policy.portingRequest}"
           data-payment-mode="${policy.paymentMode}"
           data-account-holder-name="${policy.accountHolderName}"
           data-bank-account-number="${policy.bankAccountNumber}"
           data-ifsc-code="${policy.ifscCode}"

           data-nominees='${JSON.stringify(policy.nominees)}'
           data-previous-claims='${JSON.stringify(policy.previousClaims)}'
    >
          <td class="p-2 border-b">
            <input type="checkbox" class="rowCheck cursor-pointer accent-green-600">
          </td>
          <td class="p-2 border-b">
            <span class="float-left">${index + 1}</span>
            <a class="float-right" href="/app/insurance/edit">
              <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100 cursor-pointer"></i>
            </a>
          </td>
          <td class="p-2 border-b">
            <div class="flex items-center gap-2">
              <img src="/images/user.png" class="w-8 h-8 rounded-full" />
              <div>
                <div class="text-sm font-medium text-gray-900">${
                  policy.policyHolder
                }</div>
                <div class="text-sm text-gray-500">${policy.email}</div>
              </div>
            </div>
          </td>
          <td class="p-2 border-b">${policy.policyNumber}</td>
          <td class="p-2 border-b">${policy.policyType}</td>
          <td class="p-2 border-b">₹${policy.premiumAmount.toLocaleString()}</td>
          <td class="p-2 border-b">₹${policy.coverageAmount.toLocaleString()}</td>
          <td class="p-2 border-b">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">${
              policy.status
            }</span>
          </td>
        </tr>
      `);
    });

    attachCheckboxEvents();
  }

  function mountEvents() {
    $(document)
      .off("click.insuranceRow", ".employee-row")
      .on("click.insuranceRow", ".employee-row", handleRowClick);

    $("#selectAll")
      .off("change")
      .on("change", function () {
        $(".rowCheck")
          .prop("checked", $(this).is(":checked"))
          .trigger("change");
      });

    $("#closeSidebar").off("click").on("click", closeSidebar);
    $("#payrollSidebarOverlay").off("click").on("click", closeSidebar);

    $(".sidebar-tab")
      .off("click")
      .on("click", function () {
        const targetTab = $(this).data("tab");
        setSidebarTab(targetTab);
      });

    const filterSidebar = document.getElementById("filterSidebar");
    const filterPanel = document.getElementById("filterPanel");
    const filterBackdrop = document.getElementById("filterBackdrop");
    const filterCloseBtn = document.getElementById("filterCloseBtn");

    if (filterSidebar && filterPanel && filterBackdrop && filterCloseBtn) {
      document.getElementById("openFilterBtn").addEventListener("click", () => {
        filterSidebar.classList.remove("opacity-0", "pointer-events-none");
        filterPanel.classList.remove("translate-x-full");
      });
      filterBackdrop.addEventListener("click", closeFilterSidebar);
      filterCloseBtn.addEventListener("click", closeFilterSidebar);
    }
  }

  function closeFilterSidebar() {
    const filterSidebar = document.getElementById("filterSidebar");
    const filterPanel = document.getElementById("filterPanel");
    if (filterSidebar && filterPanel) {
      filterSidebar.classList.add("opacity-0", "pointer-events-none");
      filterPanel.classList.add("translate-x-full");
    }
  }

  function handleRowClick(e) {
    if ($(e.target).closest(".rowCheck, a, i").length > 0) return;

    const row = $(this).closest("tr");

    state.selectedPolicy = {
      policyHolder: row.data("name"),
      email: row.data("email"),
      policyNumber: row.data("policy"),
      policyType: row.data("type"),
      premiumAmount: row.data("premium"),
      coverageAmount: row.data("coverage"),
      status: row.data("status"),

      start_date: row.data("start-date"),
      end_date: row.data("end-date"),
      policy_term: row.data("policy-term"),
      previous_insurance_coverage: row.data("previous-insurance-coverage"),
      no_claim_bonus: row.data("no-claim-bonus"),
      porting_request: row.data("porting-request"),
      payment_mode: row.data("payment-mode"),
      account_holder_name: row.data("account-holder-name"),
      bank_account_number: row.data("bank-account-number"),
      ifsc_code: row.data("ifsc-code"),

      nominees: JSON.parse(row.attr("data-nominees") || "[]"),
      previousClaims: JSON.parse(row.attr("data-previous-claims") || "[]"),
    };

    $("#payrollSidebarTitle").text(
      `Policy Insights for ${state.selectedPolicy.policyHolder} - ${state.selectedPolicy.policyNumber}`
    );

    updatePolicyDetailsUI();
    getDetailclaimhistory();
    setSidebarTab("policyinformation");

    openSidebar();
  }

  function updatePolicyDetailsUI() {
    if (!state.selectedPolicy) return;

    $("#detailPolicyHolder").text(state.selectedPolicy.policyHolder || "N/A");
    $("#detailEmail").text(state.selectedPolicy.email || "N/A");
    $("#detailPolicyNumber").text(state.selectedPolicy.policyNumber || "N/A");
    $("#detailPolicyType").text(state.selectedPolicy.policyType || "N/A");
    $("#detailPremiumAmount").text(
      "₹" + state.selectedPolicy.premiumAmount.toLocaleString()
    );
    $("#detailCoverageAmount").text(
      "₹" + state.selectedPolicy.coverageAmount.toLocaleString()
    );
    $("#detailPolicyStartDate").text(state.selectedPolicy.start_date || "N/A");
    $("#detailPolicyEndDate").text(state.selectedPolicy.end_date || "N/A");
    $("#detailPolicyTerm").text(state.selectedPolicy.policy_term || "N/A");
    $("#detailPreviousInsuranceCoverage").text(
      state.selectedPolicy.previous_insurance_coverage || "N/A"
    );
    $("#detailNoClaimBonus").text(state.selectedPolicy.no_claim_bonus || "N/A");
    $("#detailPortingRequest").text(
      state.selectedPolicy.porting_request || "N/A"
    );
    $("#detailPaymentMode").text(state.selectedPolicy.payment_mode || "N/A");
    $("#detailAccountHolderName").text(
      state.selectedPolicy.account_holder_name || "N/A"
    );
    $("#detailBankAccountNumber").text(
      state.selectedPolicy.bank_account_number || "N/A"
    );
    $("#detailIFSCCode").text(state.selectedPolicy.ifsc_code || "N/A");

    const nomineesContainer = $("#detailNominees");
    nomineesContainer.empty();

    if (state.selectedPolicy.nominees.length === 0) {
      nomineesContainer.append("<li>No nominees added.</li>");
    } else {
      state.selectedPolicy.nominees.forEach((n) => {
        nomineesContainer.append(
          `<li>${n.name} (${n.relation}) ${n.isPrimary ? "(Primary)" : ""}</li>`
        );
      });
    }
  }

  function attachCheckboxEvents() {
    const selectAll = $("#selectAll");
    const badge = $("#selectedBadge");

    function updateBadge() {
      const count = $(".rowCheck:checked").length;
      if (count > 0) {
        badge
          .text(`${count} item${count > 1 ? "s" : ""} selected`)
          .removeClass("hidden");
      } else {
        badge.addClass("hidden");
      }
    }

    $(".rowCheck")
      .off("change")
      .on("change", function () {
        const allChecked =
          $(".rowCheck").length === $(".rowCheck:checked").length;
        selectAll.prop("checked", allChecked);
        $(this)
          .closest("tr")
          .css("background-color", $(this).is(":checked") ? "#e5f2fd" : "");
        updateBadge();
      });
  }

  function openSidebar() {
    $("#payrollSidebarOverlay").removeClass("hidden");
    $("#payrollSidebar").css("right", "0");
  }

  function closeSidebar() {
    $("#payrollSidebar").css("right", "-750px");
    setTimeout(() => {
      $("#payrollSidebarOverlay").addClass("hidden");
    }, 300);
  }

  function setSidebarTab(targetTab) {
    $(".sidebar-tab")
      .removeClass("border-[#009333] text-[#009333] bg-white")
      .addClass("border-transparent text-gray-600");

    $(`.sidebar-tab[data-tab='${targetTab}']`)
      .removeClass("border-transparent text-gray-600")
      .addClass("border-[#009333] text-[#009333] bg-white");

    $(
      "#policyinformation, #policyenrollment, #claimhistory, #newclaimform"
    ).addClass("hidden");
    $(`#${targetTab}`).removeClass("hidden");

    if (targetTab === "claimhistory") {
      getDetailclaimhistory();
    }
  }

  return {
    renderInsuranceList,
    getInsuranceCount,
  };
})();
