const insuranceTabs = ["InsuranceList", "ClaimHistory"];

const insuranceState = {
  activeTab: "InsuranceList",
  counts: {
    InsuranceList: 0,
    ClaimHistory: 0,
  },
};

$(document).ready(function () {
  refreshTabCounts();
  bindInsuranceTabs();
  setInsuranceActiveTab(insuranceState.activeTab);
});

function refreshTabCounts() {
  insuranceState.counts.InsuranceList =
    window.insuranceListModule?.getInsuranceCount?.() ?? 0;
  insuranceState.counts.ClaimHistory =
    window.claimHistoryModule?.getClaimHistoryCount?.() ?? 0;
}

function bindInsuranceTabs() {
  $(document).on("click", ".insurance-tab", function (e) {
    const tab = $(this).data("tab");
    if (!tab) return;

    if (
      $(e.target).hasClass("closeInsuranceTab") ||
      $(e.target).closest(".closeInsuranceTab").length
    ) {
      setInsuranceActiveTab("InsuranceList");
      return;
    }

    setInsuranceActiveTab(tab);
  });
}

function setInsuranceActiveTab(tab) {
  if (!insuranceTabs.includes(tab)) {
    tab = "InsuranceList";
  }

  insuranceState.activeTab = tab;
  refreshTabCounts();

  $(".insurance-tab")
    .removeClass("bg-[#ebeff3] text-[#384551]")
    .addClass("hover:text-[#6689b8] hover:bg-[#f5f7f9]");

  const activeBtn = $(`.insurance-tab[data-tab='${tab}']`);
  activeBtn
    .addClass("bg-[#ebeff3] text-[#384551]")
    .removeClass("hover:text-[#6689b8] hover:bg-[#f5f7f9]");

  $("#insuranceTabsContainer .counter-badge").remove();
  $("#insuranceTabsContainer .closeInsuranceTab").remove();

  activeBtn.find("span").append(`
    <span class="ml-1 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">
      ${insuranceState.counts[tab] ?? 0}
    </span>
    <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closeInsuranceTab"></i>
  `);

  $(".insurance-tab-content").addClass("hidden");
  $(`#${tab}Content`).removeClass("hidden");

  renderInsuranceTab(tab);
}

function renderInsuranceTab(tab) {
  if (tab === "InsuranceList") {
    window.insuranceListModule?.renderInsuranceList?.();
    insuranceState.counts.InsuranceList =
      window.insuranceListModule?.getInsuranceCount?.() ??
      insuranceState.counts.InsuranceList;
  } else if (tab === "ClaimHistory") {
    window.claimHistoryModule?.renderClaimHistory?.();
    insuranceState.counts.ClaimHistory =
      window.claimHistoryModule?.getClaimHistoryCount?.() ??
      insuranceState.counts.ClaimHistory;
  }
}

