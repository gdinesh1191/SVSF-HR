window.insuranceListModule = (function () {
  const state = {
    initialized: false,
    selectedPolicy: null,
  };

  const insuranceData = [
    {
      policyHolder: "Priya Sharma",
      email: "priya.sharma@example.com",
      policyNumber: "HP-2024-001",
      policyType: "Health Plus",
      premiumAmount: 15000,
      coverageAmount: 500000,
      status: "Active",
    },
    {
      policyHolder: "Amit Singh",
      email: "amit.singh@example.com",
      policyNumber: "MC-2024-002",
      policyType: "Motor Comprehensive",
      premiumAmount: 10500,
      coverageAmount: 300000,
      status: "Expired",
    },
    {
      policyHolder: "Neha Gupta",
      email: "neha.gupta@example.com",
      policyNumber: "TL-2024-003",
      policyType: "Term Life",
      premiumAmount: 22000,
      coverageAmount: 1000000,
      status: "Active",
    },
    {
      policyHolder: "Rahul Kumar",
      email: "rahul.kumar@example.com",
      policyNumber: "HI-2024-004",
      policyType: "Home Insurance",
      premiumAmount: 7800,
      coverageAmount: 250000,
      status: "Pending",
    },
    {
      policyHolder: "Sonia Devi",
      email: "sonia.devi@example.com",
      policyNumber: "WP-2024-005",
      policyType: "Women's Protector",
      premiumAmount: 18000,
      coverageAmount: 750000,
      status: "Active",
    },
    {
      policyHolder: "Vijay Yadav",
      email: "vijay.yadav@example.com",
      policyNumber: "EC-2024-006",
      policyType: "Education Care",
      premiumAmount: 12000,
      coverageAmount: 400000,
      status: "Active",
    },
    {
      policyHolder: "Ritu Verma",
      email: "ritu.verma@example.com",
      policyNumber: "PI-2024-007",
      policyType: "Property Secure",
      premiumAmount: 9200,
      coverageAmount: 350000,
      status: "Active",
    },
    {
      policyHolder: "Manish Shah",
      email: "manish.shah@example.com",
      policyNumber: "TP-2024-008",
      policyType: "Travel Protect",
      premiumAmount: 4500,
      coverageAmount: 100000,
      status: "Active",
    },
    {
      policyHolder: "Pooja Das",
      email: "pooja.das@example.com",
      policyNumber: "CC-2024-009",
      policyType: "Critical Care",
      premiumAmount: 19500,
      coverageAmount: 800000,
      status: "Pending",
    },
    {
      policyHolder: "Sanjay Kumar",
      email: "sanjay.kumar@example.com",
      policyNumber: "RS-2024-010",
      policyType: "Retirement Secure",
      premiumAmount: 30000,
      coverageAmount: 1500000,
      status: "Active",
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
        <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
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
          Showing <span class="text-red-600">10</span> of <span class="text-blue-600">20</span>
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
        ${getSidebarPlaceholder("policyenrollment")}
        ${getSidebarPlaceholder("claimhistory")}
        ${getSidebarPlaceholder("newclaimform")}
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

  function getSidebarPlaceholder(id) {
    return `
      <div id="${id}" class="hidden flex-1 overflow-y-auto p-4 bg-gray-50">
        <div class="mb-6 bg-white p-4 rounded-lg shadow-sm text-sm text-gray-600">
          <p>Content for ${id} will be added here.</p>
        </div>
      </div>
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
            data-policy="${policy.policyNumber}"
            data-type="${policy.policyType}"
            data-email="${policy.email}"
            data-premium="${policy.premiumAmount}"
            data-coverage="${policy.coverageAmount}"
            data-status="${policy.status}">
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
                <div class="text-sm font-medium text-gray-900">${policy.policyHolder}</div>
                <div class="text-sm text-gray-500">${policy.email}</div>
              </div>
            </div>
          </td>
          <td class="p-2 border-b">${policy.policyNumber}</td>
          <td class="p-2 border-b">${policy.policyType}</td>
          <td class="p-2 border-b">₹${policy.premiumAmount.toLocaleString()}</td>
          <td class="p-2 border-b">₹${policy.coverageAmount.toLocaleString()}</td>
          <td class="p-2 border-b">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">${policy.status}</span>
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

    $("#selectAll").off("change").on("change", function () {
      $(".rowCheck").prop("checked", $(this).is(":checked")).trigger("change");
    });

    $("#closeSidebar").off("click").on("click", closeSidebar);
    $("#payrollSidebarOverlay").off("click").on("click", closeSidebar);

    $(".sidebar-tab").off("click").on("click", function () {
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
    };

    $("#payrollSidebarTitle").text(
      `Policy Insights for ${state.selectedPolicy.policyHolder} - ${state.selectedPolicy.policyNumber}`
    );
    updatePolicyDetailsUI();
    setSidebarTab("policyinformation");
    openSidebar();
  }

  function updatePolicyDetailsUI() {
    if (!state.selectedPolicy) return;

    $("#detailPolicyHolder").text(state.selectedPolicy.policyHolder || "N/A");
    $("#detailEmail").text(state.selectedPolicy.email || "N/A");
    $("#detailPolicyNumber").text(state.selectedPolicy.policyNumber || "N/A");
    $("#detailPolicyType").text(state.selectedPolicy.policyType || "N/A");
    $("#detailPremiumAmount").text("₹" + state.selectedPolicy.premiumAmount.toLocaleString());
    $("#detailCoverageAmount").text("₹" + state.selectedPolicy.coverageAmount.toLocaleString());
    $("#detailPolicyStartDate").text(state.selectedPolicy.start_date || "N/A");
    $("#detailPolicyEndDate").text(state.selectedPolicy.end_date || "N/A");
    $("#detailPolicyTerm").text(state.selectedPolicy.policy_term || "N/A");
    $("#detailPreviousInsuranceCoverage").text(state.selectedPolicy.previous_insurance_coverage || "N/A");
    $("#detailNoClaimBonus").text(state.selectedPolicy.no_claim_bonus || "N/A");
    $("#detailPortingRequest").text(state.selectedPolicy.porting_request || "N/A");
    $("#detailPaymentMode").text(state.selectedPolicy.payment_mode || "N/A");
    $("#detailAccountHolderName").text(state.selectedPolicy.account_holder_name || "N/A");
    $("#detailBankAccountNumber").text(state.selectedPolicy.bank_account_number || "N/A");
    $("#detailIFSCCode").text(state.selectedPolicy.ifsc_code || "N/A");

    const nomineesContainer = $("#detailNominees");
    nomineesContainer.empty().append("<li>No nominees added.</li>");
  }

  function attachCheckboxEvents() {
    const selectAll = $("#selectAll");
    const badge = $("#selectedBadge");

    function updateBadge() {
      const count = $(".rowCheck:checked").length;
      if (count > 0) {
        badge.text(`${count} item${count > 1 ? "s" : ""} selected`).removeClass("hidden");
      } else {
        badge.addClass("hidden");
      }
    }

    $(".rowCheck")
      .off("change")
      .on("change", function () {
        const allChecked = $(".rowCheck").length === $(".rowCheck:checked").length;
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

    $("#policyinformation, #policyenrollment, #claimhistory, #newclaimform").addClass("hidden");
    $(`#${targetTab}`).removeClass("hidden");
  }

  return {
    renderInsuranceList,
    getInsuranceCount,
  };
})();

