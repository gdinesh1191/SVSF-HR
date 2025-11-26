$(document).ready(function () {
    // Initialize: Render the table
    
      renderInsuranceTable();
    
      
        // Select all checkboxes
        $("#selectAll").on("change", function () {
            $(".rowCheck").prop("checked", $(this).is(":checked"));
        });
      
      
      
        // Add hover styles to non-active tabs on load
        $(".tab").not(".active-tab").addClass("hover:bg-[#f5f7f9] hover:text-[#6689b8]");
      
        // When a tab is clicked
        $(document).on("click", ".tab", function (e) {
            const tab = $(this).data("tab");
      
            // If close icon clicked → reset to all
            if ($(e.target).hasClass("closeTab")) {
                setActiveTab("insurance list");
                return;
            }
      
            setActiveTab(tab);
        });
      
       
      
      });
        // COUNTS for each tab
        const counts = {
          InsuranceList: 12,
          ClaimHistory: 45,
          
      };
      
     function setActiveTab(tab) {
          $(".tab").removeClass("bg-[#ebeff3] text-[#384551] active-tab")
              .addClass("hover:bg-[#f5f7f9] hover:text-[#6689b8] ");
      
          // Apply active styles
          let btn = $(`.tab[data-tab='${tab}']`);
          btn.addClass("bg-[#ebeff3] text-[#384551] active-tab")
              .removeClass("hover:bg-[#f5f7f9] hover:text-[#6689b8]");
      
          // Remove all counters & close icons
          $("#tabsContainer .counter-badge").remove();
          $("#tabsContainer .closeTab").remove();
      
          // Add counter & close icon only for active tab
          btn.find("span").append(`
          <span class="ml-2 counter-badge inline-block min-w-[20px] h-[20px] px-[6px] text-xs leading-[20px] rounded-full text-center bg-[#009333] text-white">
              ${counts[tab]}
          </span>
          <i class="ri-close-fill font-bold px-1 rounded hover:bg-[#dce0e5] closeTab"></i>
      `);
      }
      
      const InsuranceData = [
        {
          policyHolder: "Priya Sharma",
          email: "priya.sharma@example.com",
          policyNumber: "HP-2024-001",
          policyType: "Health Plus",
          premiumAmount: 15000,
          coverageAmount: 500000,
          status: "Active"
        },
        {
          policyHolder: "Amit Singh",
          email: "amit.singh@example.com",
          policyNumber: "MC-2024-002",
          policyType: "Motor Comprehensive",
          premiumAmount: 10500,
          coverageAmount: 300000,
          status: "Expired"
        },
        {
          policyHolder: "Neha Gupta",
          email: "neha.gupta@example.com",
          policyNumber: "TL-2024-003",
          policyType: "Term Life",
          premiumAmount: 22000,
          coverageAmount: 1000000,
          status: "Active"
        },
        {
          policyHolder: "Rahul Kumar",
          email: "rahul.kumar@example.com",
          policyNumber: "HI-2024-004",
          policyType: "Home Insurance",
          premiumAmount: 7800,
          coverageAmount: 250000,
          status: "Pending"
        },
        {
          policyHolder: "Sonia Devi",
          email: "sonia.devi@example.com",
          policyNumber: "WP-2024-005",
          policyType: "Women's Protector",
          premiumAmount: 18000,
          coverageAmount: 750000,
          status: "Active"
        },
        {
          policyHolder: "Vijay Yadav",
          email: "vijay.yadav@example.com",
          policyNumber: "EC-2024-006",
          policyType: "Education Care",
          premiumAmount: 12000,
          coverageAmount: 400000,
          status: "Active"
        },
        {
          policyHolder: "Ritu Verma",
          email: "ritu.verma@example.com",
          policyNumber: "PI-2024-007",
          policyType: "Property Secure",
          premiumAmount: 9200,
          coverageAmount: 350000,
          status: "Active"
        },
        {
          policyHolder: "Manish Shah",
          email: "manish.shah@example.com",
          policyNumber: "TP-2024-008",
          policyType: "Travel Protect",
          premiumAmount: 4500,
          coverageAmount: 100000,
          status: "Active"
        },
        {
          policyHolder: "Pooja Das",
          email: "pooja.das@example.com",
          policyNumber: "CC-2024-009",
          policyType: "Critical Care",
          premiumAmount: 19500,
          coverageAmount: 800000,
          status: "Pending"
        },
        {
          policyHolder: "Sanjay Kumar",
          email: "sanjay.kumar@example.com",
          policyNumber: "RS-2024-010",
          policyType: "Retirement Secure",
          premiumAmount: 30000,
          coverageAmount: 1500000,
          status: "Active"
        }
      ];
      
    
    // Function to render table rows
    function renderInsuranceTable() {
        InsuranceData.forEach((s, index) => {
            $("#InsuranceTableBody").append(`
                <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer divide-x divide-[#ebeff3] group employee-row"
                    data-name="${s.policyHolder}"
                    data-policy="${s.policyNumber}"
                    data-type="${s.policyType}"
                    data-premium="${s.premiumAmount}"
                    data-coverage="${s.coverageAmount}"
                    data-status="${s.status}">
                    
                    <!-- Checkbox -->
                    <td class="p-2 border-b">
                        <input type="checkbox" class="rowCheck cursor-pointer accent-green-600">
                    </td>
                    
                    <!-- Serial No + Edit -->
                    <td class="p-2 border-b">
                        <span class="float-left">${index + 1}</span>
                        <a class="float-right" href="/app/insurance/edit">
                            <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] 
                            text-[#4d5e6c] opacity-0 group-hover:opacity-100 cursor-pointer"></i>
                        </a>
                    </td>
                    
                    <!-- Policy Holder Details -->
                    <td class="p-2 border-b">
                        <div class="flex items-center gap-2">
                            <img src="/images/user.png" class="w-8 h-8 rounded-full" />
                            
                            <div>
                                <div class="text-sm font-medium text-gray-900">
                                    ${s.policyHolder}
                                </div>
                                <div class="text-sm text-gray-500">
                                    ${s.email}
                                </div>
                            </div>
                        </div>
                    </td>
                    
                    <!-- Policy Number -->
                    <td class="p-2 border-b">${s.policyNumber}</td>
                    
                    <!-- Policy Type -->
                    <td class="p-2 border-b">${s.policyType}</td>
                    
                    <!-- Premium Amount -->
                    <td class="p-2 border-b">₹${s.premiumAmount.toLocaleString()}</td>
                    
                    <!-- Coverage Amount -->
                    <td class="p-2 border-b">₹${s.coverageAmount.toLocaleString()}</td>
                    
                    <!-- Status Badge -->
                    <td class="p-2 border-b">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800
                          ">
                            ${s.status}
                        </span>
                    </td>
                </tr>
            `);
        });
    
        attachRowClickEvents();
        attachCheckboxEvents();
    }
    
    let selectedPolicy = null;
    // Function to attach click events to employee rows
    function attachRowClickEvents() {
      $(document).on('click', '.employee-row', function(e) {
        // Prevent opening sidebar when clicking on checkbox or edit icon
        if ($(e.target).closest('.rowCheck, a, i').length > 0) return;
    
        const row = $(this).closest('tr'); // ensure we get the TR
        const name = row.data('name');
        const policy = row.data('policy');
    
        console.log('Clicked row:', name, policy); // debug
    
        $('#payrollSidebarTitle').text(`Payroll Calculation Rules for ${name} - ${policy}`);

        selectedPolicy = {
            policyHolder: $(this).data("name"),
            policyNumber: $(this).data("policy"),
            policyType: $(this).data("type"),
            premiumAmount: $(this).data("premium"),
            coverageAmount: $(this).data("coverage"),
            status: $(this).data("status")
          };
      
          // Load into detail pane
          updatePolicyDetailsUI();
      
          // Activate the detail tab
          setActiveTab("policyinformation");

        openSidebar();
    });
    
    }

    function updatePolicyDetailsUI() {
        if (!selectedPolicy) return;
    
        $("#detailPolicyHolder").text(selectedPolicy.policyHolder);
        $("#detailEmail").text(selectedPolicy.email || "N/A");
        $("#detailPolicyNumber").text(selectedPolicy.policyNumber);
        $("#detailPolicyType").text(selectedPolicy.policyType);
        $("#detailPremiumAmount").text("₹" + selectedPolicy.premiumAmount.toLocaleString());
        $("#detailCoverageAmount").text("₹" + selectedPolicy.coverageAmount.toLocaleString());
        $("#detailPolicyStartDate").text(selectedPolicy.start_date || "N/A");
        $("#detailPolicyEndDate").text(selectedPolicy.end_date || "N/A");
        $("#detailPolicyTerm").text(selectedPolicy.policy_term || "N/A");
        $("#detailPreviousInsuranceCoverage").text(selectedPolicy.previous_insurance_coverage || "N/A");
        $("#detailPreviousInsurerName").text(selectedPolicy.previous_insurer_name || "N/A");
        $("#detailNoClaimBonus").text(selectedPolicy.no_claim_bonus || "N/A");
        $("#detailPortingRequest").text(selectedPolicy.porting_request || "N/A");
        $("#detailPaymentMode").text(selectedPolicy.payment_mode || "N/A");
        $("#detailAccountHolderName").text(selectedPolicy.account_holder_name || "N/A");
        $("#detailBankAccountNumber").text(selectedPolicy.bank_account_number || "N/A");
        $("#detailIFSCCode").text(selectedPolicy.ifsc_code || "N/A");
        // For nominees, render as a list
        const nomineesContainer = $("#detailNominees");
        nomineesContainer.empty();
        if(selectedPolicy.nominees && selectedPolicy.nominees.length > 0){
            selectedPolicy.nominees.forEach(n=>{
                nomineesContainer.append(`<li>${n.name} (${n.relation}) ${n.is_primary?"(Primary)":""}</li>`);
            });
        } else {
            nomineesContainer.text("No nominees added.");
        }
    }
    
      
    function attachCheckboxEvents() {
      const selectAll = $("#selectAll");
      const badge = $("#selectedBadge");
    
      function updateBadge() {
          const selectedCount = $(".rowCheck:checked").length;
          if (selectedCount > 0) {
              badge.text(`${selectedCount} item${selectedCount > 1 ? "s" : ""} selected`);
              badge.removeClass("hidden");
          } else {
              badge.addClass("hidden");
          }
      }
    
      function updateRowBackground(row, isChecked) {
          if (isChecked) {
              row.css("background-color", "#e5f2fd");
          } else {
              row.css("background-color", ""); // revert to default hover
          }
      }
    
      // Hover effect for all rows
      $(document).on("mouseenter", ".employee-row", function() {
          $(this).css("background-color", "#f5f7f9");
      });
      $(document).on("mouseleave", ".employee-row", function() {
          const isChecked = $(this).find(".rowCheck").is(":checked");
          if (isChecked) {
              $(this).css("background-color", "#e5f2fd"); // keep checked color
          } else {
              $(this).css("background-color", ""); // default
          }
      });
    
      // Select/Deselect All
      selectAll.off("change").on("change", function () {
          const checked = $(this).is(":checked");
          $(".rowCheck").prop("checked", checked).each(function () {
              updateRowBackground($(this).closest("tr"), checked);
          });
          updateBadge();
      });
    
      // Individual checkboxes
      $(".rowCheck").off("change").on("change", function () {
          const allChecked = $(".rowCheck").length === $(".rowCheck:checked").length;
          selectAll.prop("checked", allChecked);
    
          // Update row bg
          updateRowBackground($(this).closest("tr"), $(this).is(":checked"));
    
          updateBadge();
      });
    }
    
    
    
    // Open sidebar function
    function openSidebar() {
        $('#payrollSidebarOverlay').removeClass('hidden');
        $('#payrollSidebar').css('right', '0');
    }
    
    // Close sidebar function
    function closeSidebar() {
        $('#payrollSidebar').css('right', '-750px');
        setTimeout(() => {
            $('#payrollSidebarOverlay').addClass('hidden');
        }, 300);
    }
    
    // Close sidebar on button click
    $('#closeSidebar').on('click', closeSidebar);
    
    // Close sidebar on overlay click
    $('#payrollSidebarOverlay').on('click', closeSidebar);
    
    // Tab switching
    $('.sidebar-tab').on('click', function() {
      const targetTab = $(this).data('tab');
      
      // Remove active state from all tabs
      $('.sidebar-tab')
          .removeClass('border-[#009333] text-[#009333] bg-white')
          .addClass('border-transparent text-gray-600');
      
      // Add active state to clicked tab
      $(this)
          .removeClass('border-transparent text-gray-600')
          .addClass('border-[#009333] text-[#009333] bg-white');
      
      // Hide all tab contents
      $('#policyinformation, #policyenrollment, #claimhistory,#newclaimform').addClass('hidden');
      
      // Show target tab content
      $('#' + targetTab).removeClass('hidden');
    });
    
    
    // Select all checkbox functionality
    $('#selectAll').on('change', function() {
        $('.rowCheck').prop('checked', $(this).prop('checked'));
    });
    
    
    
     
      const filterSidebar = document.getElementById("filterSidebar");
      const filterPanel = document.getElementById("filterPanel");
      const filterBackdrop = document.getElementById("filterBackdrop");
      const filterCloseBtn = document.getElementById("filterCloseBtn");
      
      // OPEN SIDEBAR
      function openFilter() {
        filterSidebar.classList.remove("opacity-0", "pointer-events-none");
        filterPanel.classList.remove("translate-x-full");
      }
      
      // CLOSE SIDEBAR
      function closeFilter() {
        filterSidebar.classList.add("opacity-0", "pointer-events-none");
        filterPanel.classList.add("translate-x-full");
      }
      
      // CLICK OUTSIDE TO CLOSE
      filterBackdrop.addEventListener("click", closeFilter);
      filterCloseBtn.addEventListener("click", closeFilter);
      
      // 👉 OPEN WHEN CLICKING THE FILTER BUTTON
      document.getElementById("openFilterBtn").addEventListener("click", openFilter);
        
  
      
      