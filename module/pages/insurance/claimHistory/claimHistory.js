window.claimHistoryModule = (function () {
  const state = {
    initialized: false,
    selectedClaim: null,
  };

  const claimData = [
    {
      claimNumber: "CLM-1001",
      holder: "Priya Sharma",
      policyNumber: "HP-2024-001",
      type: "Health",
      amount: 50000,
      filedOn: "04 Nov 2024",
      status: "Under Review",
      processor: "Arjun Menon",
      notes: "Awaiting insurer medical approval.",
    },
    {
      claimNumber: "CLM-0992",
      holder: "Amit Singh",
      policyNumber: "MC-2024-002",
      type: "Motor",
      amount: 18500,
      filedOn: "29 Oct 2024",
      status: "Approved",
      processor: "Jaya Iyer",
      notes: "Inspection completed, payout scheduled.",
    },
    {
      claimNumber: "CLM-0974",
      holder: "Neha Gupta",
      policyNumber: "TL-2024-003",
      type: "Life",
      amount: 200000,
      filedOn: "11 Oct 2024",
      status: "Rejected",
      processor: "Rahul Nair",
      notes: "Missing nominee documents.",
    },
  ];

  function getClaimHistoryCount() {
    return claimData.length;
  }

  function renderClaimHistory() {
    const container = $("#ClaimHistoryContent");
    if (!container.length) return;

    if (!state.initialized) {
      container.html(getLayoutTemplate());
      mountClaimEvents();
      state.initialized = true;
    }

    renderClaimTable();
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
          <button id="claimDownloadBtn" class="py-1 px-2 text-sm rounded border border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60" disabled>
            <i class="ri-arrow-down-line mr-1"></i> Download
          </button>
          <button id="claimDeleteBtn" class="py-1 px-2 text-sm rounded border border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] cursor-pointer">
            <i class="ri-delete-bin-6-line mr-1"></i> Delete
          </button>
        </div>
        <div class="flex items-center relative space-x-2">
          <input type="text" placeholder="Enter Claim Number" class="block w-full h-[31px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]" />
          <button id="openClaimFilterBtn" class="py-1 px-2 text-sm rounded border cursor-pointer border-transparent text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3]">
            <i class="ri-filter-3-fill"></i>
          </button>
        </div>
      </div>
      <div id="claimSelectedBadge" class="hidden fixed top-[176px] left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
        0 claims selected
      </div>
      <div class="bg-[#ebeff3]">
        <div class="mx-2 h-[calc(100vh-187px)] overflow-hidden rounded-lg bg-white">
          <div class="h-full overflow-y-auto overflow-x-auto w-full">
            <table class="w-full min-w-max">
              <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                <tr class="text-left divide-x divide-[#ebeff3]">
                  <th class="p-2"><input type="checkbox" id="claimSelectAll" class="accent-green-600 cursor-pointer" /></th>
                  <th class="p-2">Claim #</th>
                  <th class="p-2">Policy Holder</th>
                  <th class="p-2">Policy #</th>
                  <th class="p-2">Type</th>
                  <th class="p-2">Claim Amount</th>
                  <th class="p-2">Filed On</th>
                  <th class="p-2">Status</th>
                </tr>
              </thead>
              <tbody id="ClaimHistoryTableBody"></tbody>
            </table>
          </div>
        </div>
      </div>
      <footer class="bg-[#ebeff3] h-[54px] px-4 flex items-center justify-start">
        <span class="text-sm">
          Showing <span class="text-red-600">${Math.min(claimData.length, 10)}</span> of <span class="text-blue-600">${claimData.length}</span>
        </span>
      </footer>
      ${getClaimFilterSidebar()}
      ${getClaimDetailsSidebar()}
    `;
  }

  function getClaimFilterSidebar() {
    return `
      <div id="claimFilterSidebar" class="fixed inset-0 z-50 flex justify-end opacity-0 pointer-events-none transition-opacity duration-300">
        <div id="claimFilterBackdrop" class="fixed inset-0 bg-[rgba(0,0,0,0.5)]"></div>
        <div id="claimFilterPanel" class="relative w-80 mt-[5.4rem] mb-[0.15rem] rounded-tl-[0.375rem] rounded-bl-[0.375rem] bg-white shadow-[0_4px_16px_#27313a66] transform transition-transform duration-300 flex flex-col h-[calc(100vh-5.55rem)] translate-x-full">
          <div class="py-[0.5rem] px-[0.75rem] border-b border-[#dee2e6] flex justify-between items-center text-sm text-[#12344d]">
            <h5>Filter Claims</h5>
            <button id="claimFilterCloseBtn" class="cursor-pointer text-sm">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="p-4 overflow-y-auto flex-1">
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Claim Number</label>
              <input type="text" class="block w-full h-[35px] px-[0.75rem] py-[0.375rem] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]" placeholder="Enter Claim Number">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Policy Number</label>
              <input type="text" class="block w-full h-[35px] px-[0.75rem] py-[0.375rem] text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] placeholder:text-[13px] placeholder:text-[#585858]" placeholder="Enter Policy Number">
            </div>
            <div class="mb-4">
              <label class="block text-sm font-semibold text-[#000000] mb-1.5">Status</label>
              <div class="flex space-x-6">
                <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="claimStatus" value="approved" class="accent-[#009333] cursor-pointer">
                  Approved
                </label>
                <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="claimStatus" value="pending" class="accent-[#009333] cursor-pointer">
                  Pending
                </label>
                <label class="inline-flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="claimStatus" value="rejected" class="accent-[#009333] cursor-pointer">
                  Rejected
                </label>
              </div>
            </div>
          </div>
          <div class="p-2 border-t border-[#dee2e6] flex justify-end gap-2">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition">Reset All</button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition">Apply</button>
          </div>
        </div>
      </div>
    `;
  }

  function getClaimDetailsSidebar() {
    return `
      <div id="claimSidebarOverlay" class="fixed inset-0 bg-black bg-opacity-40 hidden z-40"></div>
      <div id="claimSidebar" class="fixed top-0 right-[-750px] w-[750px] h-full bg-white shadow-xl z-50 transition-all duration-300 flex flex-col">
        <div class="flex justify-between items-center px-4 py-3 text-[#12344d] border-b border-gray-200">
          <h2 class="text-lg" id="claimSidebarTitle">Claim Details</h2>
          <button id="claimCloseSidebar" class="text-gray-500 hover:text-black">
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>
        <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
          <button class="claim-sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-[#009333] text-[#009333]"
            data-tab="claimInformation">Claim Information</button>
          <button class="claim-sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black"
            data-tab="claimTimeline">Timeline</button>
          <button class="claim-sidebar-tab px-4 py-2 text-base font-medium border-b-2 border-transparent text-gray-600 hover:text-black"
            data-tab="claimDocuments">Documents</button>
        </div>
        <div id="claimInformation" class="p-4 overflow-y-auto flex-1 bg-gray-50">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div><p class="font-medium">Claim Number:</p><p id="detailClaimNumber">-</p></div>
              <div><p class="font-medium">Policy Holder:</p><p id="detailClaimHolder">-</p></div>
              <div><p class="font-medium">Policy Number:</p><p id="detailClaimPolicyNumber">-</p></div>
              <div><p class="font-medium">Policy Type:</p><p id="detailClaimType">-</p></div>
              <div><p class="font-medium">Claim Amount:</p><p id="detailClaimAmount">-</p></div>
              <div><p class="font-medium">Filed On:</p><p id="detailClaimFiledOn">-</p></div>
              <div><p class="font-medium">Status:</p><p id="detailClaimStatus">-</p></div>
              <div><p class="font-medium">Processing Owner:</p><p id="detailClaimProcessor">-</p></div>
              <div class="col-span-2 mt-4">
                <h4 class="font-semibold text-md mb-2">Notes</h4>
                <p id="detailClaimNotes">No additional notes.</p>
              </div>
            </div>
          </div>
        </div>
        <div id="claimTimeline" class="hidden p-4 overflow-y-auto flex-1 bg-gray-50">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <h4 class="font-semibold text-md mb-2">Claim Timeline</h4>
            <ul class="space-y-3 text-sm text-gray-700" id="detailClaimTimeline">
              <li class="flex items-start gap-2">
                <span class="mt-1 h-2 w-2 rounded-full bg-[#009333]"></span>
                <div>
                  <p class="font-medium">No timeline events</p>
                  <p class="text-xs text-gray-500">Events will appear here once available.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div id="claimDocuments" class="hidden p-4 overflow-y-auto flex-1 bg-gray-50">
          <div class="bg-white p-4 rounded-lg shadow-sm">
            <h4 class="font-semibold text-md mb-2">Supporting Documents</h4>
            <div class="text-sm text-gray-700" id="detailClaimDocuments">
              <p>No documents uploaded.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderClaimTable() {
    const tbody = $("#ClaimHistoryTableBody");
    if (!tbody.length) return;
    tbody.empty();

    claimData.forEach((claim) => {
      const badgeClasses = getClaimStatusClasses(claim.status);
      tbody.append(`
        <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer divide-x divide-[#ebeff3] group claim-row"
            data-claim='${JSON.stringify(claim)}'>
          <td class="p-2 border-b">
            <input type="checkbox" class="claimRowCheck cursor-pointer accent-green-600">
          </td>
          <td class="p-2 border-b">${claim.claimNumber}</td>
          <td class="p-2 border-b">${claim.holder}</td>
          <td class="p-2 border-b">${claim.policyNumber}</td>
          <td class="p-2 border-b">${claim.type}</td>
          <td class="p-2 border-b">₹${claim.amount.toLocaleString()}</td>
          <td class="p-2 border-b">${claim.filedOn}</td>
          <td class="p-2 border-b">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badgeClasses.bg} ${badgeClasses.text}">
              ${claim.status}
            </span>
          </td>
        </tr>
      `);
    });
  }

  function mountClaimEvents() {
    $(document)
      .off("click.claimRow", ".claim-row")
      .on("click.claimRow", ".claim-row", handleClaimRowClick);

    $("#claimSelectAll").off("change").on("change", function () {
      $(".claimRowCheck").prop("checked", $(this).is(":checked")).trigger("change");
    });

    $("#claimCloseSidebar").off("click").on("click", closeClaimSidebar);
    $("#claimSidebarOverlay").off("click").on("click", closeClaimSidebar);

    $(document)
      .off("click.claimSidebarTab", ".claim-sidebar-tab")
      .on("click.claimSidebarTab", ".claim-sidebar-tab", function () {
        setClaimSidebarTab($(this).data("tab"));
      });

    const filterSidebar = document.getElementById("claimFilterSidebar");
    const filterPanel = document.getElementById("claimFilterPanel");
    const filterBackdrop = document.getElementById("claimFilterBackdrop");
    const filterCloseBtn = document.getElementById("claimFilterCloseBtn");
    const openBtn = document.getElementById("openClaimFilterBtn");

    if (filterSidebar && filterPanel && filterBackdrop && filterCloseBtn && openBtn) {
      const openFilter = () => {
        filterSidebar.classList.remove("opacity-0", "pointer-events-none");
        filterPanel.classList.remove("translate-x-full");
      };
      const closeFilter = () => {
        filterSidebar.classList.add("opacity-0", "pointer-events-none");
        filterPanel.classList.add("translate-x-full");
      };

      openBtn.addEventListener("click", openFilter);
      filterBackdrop.addEventListener("click", closeFilter);
      filterCloseBtn.addEventListener("click", closeFilter);
    }

    attachClaimCheckboxEvents();
  }

  function handleClaimRowClick(e) {
    if ($(e.target).closest(".claimRowCheck").length > 0) return;

    const claim = $(this).data("claim");
    if (!claim) return;

    state.selectedClaim = claim;
    updateClaimDetailsUI();
    setClaimSidebarTab("claimInformation");
    openClaimSidebar();
  }

  function updateClaimDetailsUI() {
    if (!state.selectedClaim) return;

    $("#claimSidebarTitle").text(
      `Claim Details • ${state.selectedClaim.claimNumber}`
    );
    $("#detailClaimNumber").text(state.selectedClaim.claimNumber || "N/A");
    $("#detailClaimHolder").text(state.selectedClaim.holder || "N/A");
    $("#detailClaimPolicyNumber").text(state.selectedClaim.policyNumber || "N/A");
    $("#detailClaimType").text(state.selectedClaim.type || "N/A");
    $("#detailClaimAmount").text(
      state.selectedClaim.amount
        ? "₹" + state.selectedClaim.amount.toLocaleString()
        : "N/A"
    );
    $("#detailClaimFiledOn").text(state.selectedClaim.filedOn || "N/A");
    $("#detailClaimStatus").text(state.selectedClaim.status || "N/A");
    $("#detailClaimProcessor").text(state.selectedClaim.processor || "Unassigned");
    $("#detailClaimNotes").text(state.selectedClaim.notes || "No additional notes.");

    $("#detailClaimTimeline").html(`
      <li class="flex items-start gap-2">
        <span class="mt-1 h-2 w-2 rounded-full bg-[#009333]"></span>
        <div>
          <p class="font-medium">${state.selectedClaim.filedOn || "N/A"} • Claim filed</p>
          <p class="text-xs text-gray-500">Latest status: ${state.selectedClaim.status}</p>
        </div>
      </li>
    `);

    $("#detailClaimDocuments").html(`
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span>ID Proof.pdf</span>
          <button class="text-xs text-[#009333] hover:underline">View</button>
        </div>
        <div class="flex items-center justify-between">
          <span>Hospital Bills.zip</span>
          <button class="text-xs text-[#009333] hover:underline">View</button>
        </div>
      </div>
    `);
  }

  function attachClaimCheckboxEvents() {
    const badge = $("#claimSelectedBadge");

    $(document)
      .off("change.claimCheckbox", ".claimRowCheck")
      .on("change.claimCheckbox", ".claimRowCheck", function () {
        const allChecked =
          $(".claimRowCheck").length === $(".claimRowCheck:checked").length;
        $("#claimSelectAll").prop("checked", allChecked);

        $(this)
          .closest("tr")
          .css("background-color", $(this).is(":checked") ? "#e5f2fd" : "");

        const selected = $(".claimRowCheck:checked").length;
        if (selected > 0) {
          badge
            .text(`${selected} claim${selected > 1 ? "s" : ""} selected`)
            .removeClass("hidden");
        } else {
          badge.addClass("hidden");
        }
      });
  }

  function openClaimSidebar() {
    $("#claimSidebarOverlay").removeClass("hidden");
    $("#claimSidebar").css("right", "0");
  }

  function closeClaimSidebar() {
    $("#claimSidebar").css("right", "-750px");
    setTimeout(() => {
      $("#claimSidebarOverlay").addClass("hidden");
    }, 300);
  }

  function setClaimSidebarTab(tab) {
    $(".claim-sidebar-tab")
      .removeClass("border-[#009333] text-[#009333] bg-white")
      .addClass("border-transparent text-gray-600");

    $(`.claim-sidebar-tab[data-tab='${tab}']`)
      .removeClass("border-transparent text-gray-600")
      .addClass("border-[#009333] text-[#009333] bg-white");

    $("#claimInformation, #claimTimeline, #claimDocuments").addClass("hidden");
    $(`#${tab}`).removeClass("hidden");
  }

  function getClaimStatusClasses(status) {
    switch ((status || "").toLowerCase()) {
      case "approved":
        return { bg: "bg-green-100", text: "text-green-700" };
      case "rejected":
        return { bg: "bg-red-100", text: "text-red-700" };
      case "under review":
        return { bg: "bg-yellow-100", text: "text-yellow-700" };
      case "pending":
      default:
        return { bg: "bg-blue-100", text: "text-blue-700" };
    }
  }

  return {
    renderClaimHistory,
    getClaimHistoryCount,
  };
})();


