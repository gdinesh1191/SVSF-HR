$(document).ready(function () {
  // Initialize: Render the table
  renderSalaryTable();

  // Add hover styles to non-active tabs on load
  $(".tab").not(".active-tab").addClass("hover:bg-[#f5f7f9] hover:text-[#6689b8]");

  // When a tab is clicked
  $(document).on("click", ".tab", function (e) {
      const tab = $(this).data("tab");

      // If close icon clicked → reset to all
      if ($(e.target).hasClass("closeTab")) {
          setActiveTab("salaryList");
          return;
      }

      setActiveTab(tab);
  });
});

// COUNTS for each tab
const counts = {
  salaryList: 12,
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

const salaryData = [
  {
      salaryDetails: "John Doe",
      designation: "HR Manager",
      department: "Human Resources",
      baseSalary: 45000,
      deduction: 500
  },
  {
      salaryDetails: "Jane Smith",
      designation: "Senior Developer",
      department: "IT",
      baseSalary: 65000,
      deduction: 800
  },
  {
      salaryDetails: "Mike Johnson",
      designation: "Marketing Lead",
      department: "Marketing",
      baseSalary: 50000,
      deduction: 600
  },
  {
      salaryDetails: "Sarah Williams",
      designation: "Finance Manager",
      department: "Finance",
      baseSalary: 55000,
      deduction: 700
  },
];

// Function to render table rows
function renderSalaryTable() {
  salaryData.forEach((s, index) => {
      $("#SalaryTableBody").append(`
          <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer divide-x divide-[#ebeff3] group employee-row" 
              data-name="${s.salaryDetails}"
              data-code="EMP00${index + 1}"
              data-designation="${s.designation}"
              data-department="${s.department}"
              data-salary="${s.baseSalary}"
              data-deduction="${s.deduction}">
              <td class="p-2 border-b">
                  <input type="checkbox" class="rowCheck cursor-pointer accent-green-600">
              </td>
              <td class="p-2 border-b">
                  <span class="float-left">${index + 1}</span>
                  <a class="float-right" href="/app/salary/edit">
                      <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] 
                      text-[#4d5e6c] opacity-0 group-hover:opacity-100 cursor-pointer"></i>
                  </a>
              </td>
              <td class="p-2 border-b">
                  <div class="flex items-center gap-2">
                      <img
                          src="/images/user.png"
                          alt="avatar"
                          class="w-8 h-8 rounded-full"
                      />
                      <div>
                          <div class="text-sm font-medium text-gray-900">
                              ${s.salaryDetails}
                          </div>
                          <div class="text-sm text-gray-500">
                              EMP00${index + 1}
                          </div>
                      </div>
                  </div>
              </td>
              <td class="p-2 border-b">${s.designation}</td>
              <td class="p-2 border-b">${s.department}</td>
              <td class="p-2 border-b">${s.baseSalary.toLocaleString()}</td>
              <td class="p-2 border-b">${s.deduction.toLocaleString()}</td>
              <td class="p-2 border-b">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Update
                  </span>
              </td>
          </tr>
      `);
  });

  attachCheckboxEvents();
}

$('#SalaryTableBody').on('click', '.employee-row', function(e) {
  // Prevent opening sidebar when clicking on checkbox, edit icon, or link
  if ($(e.target).closest('.rowCheck, a, i').length > 0) return;

  const row = $(this);
  const name = row.data('name');
  const code = row.data('code');

  $('#payrollSidebarTitle').text(`Payroll Calculation Rules for ${name} - ${code}`);
  openPayrollSidebar();
});

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
          row.css("background-color", "");
      }
  }

  // Hover effect for all rows
  $(document).on("mouseenter", ".employee-row", function() {
      $(this).css("background-color", "#f5f7f9");
  });
  $(document).on("mouseleave", ".employee-row", function() {
      const isChecked = $(this).find(".rowCheck").is(":checked");
      if (isChecked) {
          $(this).css("background-color", "#e5f2fd");
      } else {
          $(this).css("background-color", "");
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
      updateRowBackground($(this).closest("tr"), $(this).is(":checked"));
      updateBadge();
  });
}

// Open Payroll Sidebar
function openPayrollSidebar() {
  $('#payrollSidebarOverlay').removeClass('hidden');
  $('#payrollSidebar').css('right', '0');
}

// Close Payroll Sidebar
function closePayrollSidebar() {
  $('#payrollSidebar').css('right', '-750px');
  setTimeout(() => {
      $('#payrollSidebarOverlay').addClass('hidden');
  }, 300);
}

// Bind close events
$('#closePayrollSidebar').on('click', closePayrollSidebar);
$('#payrollSidebarOverlay').on('click', closePayrollSidebar);

// Tab switching
$('.sidebar-tab').on('click', function() {
  const targetTab = $(this).data('tab');
  
  $('.sidebar-tab')
      .removeClass('border-[#009333] text-[#009333] bg-white')
      .addClass('border-transparent text-gray-600');
  
  $(this)
      .removeClass('border-transparent text-gray-600')
      .addClass('border-[#009333] text-[#009333] bg-white');
  
  $('#salaryTab, #incrementTab, #newIncrementTab').addClass('hidden');
  $('#' + targetTab).removeClass('hidden');
});

// ==============================================================
// FILTER SIDEBAR
// ==============================================================
const filterSidebar = document.getElementById("filterSidebar");
const filterPanel = document.getElementById("filterPanel");
const filterBackdrop = document.getElementById("filterBackdrop");
const filterCloseBtn = document.getElementById("filterCloseBtn");

function openFilter() {
  filterSidebar.classList.remove("opacity-0", "pointer-events-none");
  filterPanel.classList.remove("translate-x-full");
}

function closeFilter() {
  filterSidebar.classList.add("opacity-0", "pointer-events-none");
  filterPanel.classList.add("translate-x-full");
}

filterBackdrop.addEventListener("click", closeFilter);
filterCloseBtn.addEventListener("click", closeFilter);
document.getElementById("openFilterBtn").addEventListener("click", openFilter);

// ==============================================================
// CUSTOMIZE TABLE MODAL - MATCHING YOUR HTML STRUCTURE
// ==============================================================

document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.getElementById('openCustomizeBtn');
    const sidebar = document.getElementById('customizedTableSidebar');
    const panel = document.getElementById('customizedTablePanel');
    const backdrop = document.getElementById('customizedTableBackdrop');
    const closeBtn = document.getElementById('customizedTableCloseBtn');
    const resetBtn = document.getElementById('customizedTableResetBtn');
    const applyBtn = document.getElementById('customizedTableApplyBtn');

    // Field Configuration
    const fields = [
        { id: 'baseSalary', label: 'Base Salary', visible: true },
        { id: 'deductionAmount', label: 'Deduction Amount', visible: true },
        { id: 'status', label: 'Status', visible: true },
        { id: 'salaryDetails', label: 'Salary Details', visible: true },
        { id: 'designation', label: 'Designation', visible: true },
        { id: 'department', label: 'Department', visible: true },
    ];

    let dragIndex = null;

    // Function to open sidebar
    const openSidebar = () => {
        sidebar.classList.remove('opacity-0', 'pointer-events-none');
        panel.classList.remove('translate-x-full');
    };

    // Function to close sidebar
    const closeSidebar = () => {
        sidebar.classList.add('opacity-0', 'pointer-events-none');
        panel.classList.add('translate-x-full');
    };

    // Render fields function
    function renderFields() {
        const searchQuery = document.getElementById('fieldSearchInput')?.value.toLowerCase() || '';
        const visibleContainer = document.getElementById('visibleFields');
        const hiddenContainer = document.getElementById('hiddenFields');

        if (!visibleContainer || !hiddenContainer) return;

        visibleContainer.innerHTML = '';
        hiddenContainer.innerHTML = '';

        const visibleFields = fields.filter(f => f.visible && f.label.toLowerCase().includes(searchQuery));
        const hiddenFields = fields.filter(f => !f.visible && f.label.toLowerCase().includes(searchQuery));

        // Render visible fields
        if (visibleFields.length > 0) {
            visibleFields.forEach((field, index) => {
                const label = document.createElement('label');
                label.className = "flex items-center gap-2 text-sm cursor-move hover:bg-gray-50 p-2 rounded";
                label.draggable = true;

                const icon = document.createElement('i');
                icon.className = "ri-draggable text-gray-400";

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = field.visible;
                checkbox.className = "accent-green-600 cursor-pointer";
                checkbox.addEventListener('change', () => toggleField(field.id));

                const span = document.createElement('span');
                span.textContent = field.label;

                label.append(icon, checkbox, span);

                // Drag and drop
                label.addEventListener('dragstart', () => dragIndex = index);
                label.addEventListener('dragover', (e) => e.preventDefault());
                label.addEventListener('drop', (e) => {
                    e.preventDefault();
                    if(dragIndex === null || dragIndex === index) return;
                    reorderVisible(dragIndex, index);
                    dragIndex = null;
                });

                visibleContainer.appendChild(label);
            });
        } else {
            const p = document.createElement('p');
            p.textContent = "No visible fields found.";
            p.className = "text-sm text-gray-500";
            visibleContainer.appendChild(p);
        }

        // Render hidden fields
        if (hiddenFields.length > 0) {
            hiddenFields.forEach(field => {
                const label = document.createElement('label');
                label.className = "flex items-center gap-2 text-sm hover:bg-gray-50 p-2 rounded cursor-pointer";

                const icon = document.createElement('i');
                icon.className = "ri-draggable text-gray-400";

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = field.visible;
                checkbox.className = "accent-green-600 cursor-pointer";
                checkbox.addEventListener('change', () => toggleField(field.id));

                const span = document.createElement('span');
                span.textContent = field.label;

                label.append(icon, checkbox, span);
                hiddenContainer.appendChild(label);
            });
        } else {
            const p = document.createElement('p');
            p.textContent = "No hidden fields found.";
            p.className = "text-sm text-gray-500";
            hiddenContainer.appendChild(p);
        }

        // Update count
        const visibleCount = fields.filter(f => f.visible).length;
        const countElement = document.getElementById('visibleCount');
        if (countElement) {
            countElement.textContent = `${visibleCount}/${fields.length}`;
        }
    }

    function toggleField(id) {
        const field = fields.find(f => f.id === id);
        if(field) {
            field.visible = !field.visible;
            renderFields();
        }
    }

    function reorderVisible(from, to) {
        const visibleFields = fields.filter(f => f.visible);
        const moved = visibleFields.splice(from, 1)[0];
        visibleFields.splice(to, 0, moved);

        let vIndex = 0;
        fields.forEach((f, i) => {
            if(f.visible) fields[i] = visibleFields[vIndex++];
        });

        renderFields();
    }

    // Open sidebar when button clicked
    if (openBtn) {
        openBtn.addEventListener('click', openSidebar);
    }

    // Close sidebar when backdrop or close button clicked
    if (backdrop) {
        backdrop.addEventListener('click', closeSidebar);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    // Reset button logic
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            fields.forEach(field => field.visible = false);
            renderFields();
        });
    }

    // Apply button logic
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            closeSidebar();
            const selectedFields = fields.filter(f => f.visible).map(f => f.label).join(', ');
            alert("Table customization applied!\n\nVisible fields: " + (selectedFields || 'None'));
        });
    }

    // Search functionality
    const searchInput = document.getElementById('fieldSearchInput');
    if (searchInput) {
        searchInput.addEventListener('input', renderFields);
    }

    // Initialize sidebar position
    if (panel) {
        panel.classList.add('translate-x-full');
    }

    // Initial render
    renderFields();
});