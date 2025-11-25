$(document).ready(function () {
// Initialize: Render the table

  renderSalaryTable();

  
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
            setActiveTab("all");
            return;
        }
  
        setActiveTab(tab);
    });
  
   
  
  });
    // COUNTS for each tab
    const counts = {
      salaryList: 12,
      pending: 45,
      completed: 18,
      inprogress: 59
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
    }
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

    // Attach click event to dynamically created rows
    attachRowClickEvents();
}

// Function to attach click events to employee rows
function attachRowClickEvents() {
    $(document).on('click', '.employee-row', function(e) {
        // Prevent opening sidebar when clicking on checkbox or edit icon
        if ($(e.target).closest('.rowCheck, a').length > 0) {
            return;
        }

        const name = $(this).data('name');
        const code = $(this).data('code');
        const designation = $(this).data('designation');
        const department = $(this).data('department');
        
        // Update sidebar title
        $('#payrollSidebarTitle').text(`Payroll Calculation Rules for ${name} - ${code}`);
        
        // Open sidebar
        openSidebar();
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
  $('#salaryTab, #incrementTab, #newIncrementTab').addClass('hidden');
  
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
    

  document.addEventListener("DOMContentLoaded", function () {
      const openBtn = document.querySelector('button:has(i.ri-equalizer-line)'); // Customize Table button
      const sidebar = document.getElementById('customizedTableSidebar');
      const panel = document.getElementById('customizedTablePanel');
      const backdrop = document.getElementById('customizedTableBackdrop');
      const closeBtn = document.getElementById('customizedTableCloseBtn');
      const resetBtn = document.getElementById('customizedTableResetBtn');
      const applyBtn = document.getElementById('customizedTableApplyBtn');
  
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
  
      // Open sidebar when button clicked
      openBtn.addEventListener('click', openSidebar);
  
      // Close sidebar when backdrop or close button clicked
      backdrop.addEventListener('click', closeSidebar);
      closeBtn.addEventListener('click', closeSidebar);
  
      // Optional: Reset button logic
      resetBtn.addEventListener('click', () => {
          sidebar.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
          sidebar.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
      });
  
      // Optional: Apply button logic
      applyBtn.addEventListener('click', () => {
          // Add your logic to apply selected table columns/settings
          closeSidebar();
          alert("Table customization applied!");
      });
  
      // Initialize sidebar position
      panel.classList.add('translate-x-full'); // Start hidden off-canvas
  });
  

  const fields = [
    { id: 'baseSalary', label: 'Base Salary', visible: true },
    { id: 'deductionAmount', label: 'Deduction Amount', visible: true },
    { id: 'status', label: 'Status', visible: true },
    { id: 'salaryDetails', label: 'Salary Details', visible: true },
    { id: 'designation', label: 'Designation', visible: true },
    { id: 'department', label: 'Department', visible: true },
  ];

  let dragIndex = null;

  function renderFields() {
    const searchQuery = document.getElementById('fieldSearchInput').value.toLowerCase();
    const visibleContainer = document.getElementById('visibleFields');
    const hiddenContainer = document.getElementById('hiddenFields');

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
        checkbox.className = "accent-green-600";
        checkbox.addEventListener('change', () => toggleField(field.id));

        const span = document.createElement('span');
        span.textContent = field.label;

        label.append(icon, checkbox, span);

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
      p.textContent = "No visible fields found matching your search.";
      p.className = "text-sm text-gray-500";
      visibleContainer.appendChild(p);
    }

    // Render hidden fields
    if (hiddenFields.length > 0) {
      hiddenFields.forEach(field => {
        const label = document.createElement('label');
        label.className = "flex items-center gap-2 text-sm hover:bg-gray-50 p-2 rounded";

        const icon = document.createElement('i');
        icon.className = "ri-draggable text-gray-400";

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = field.visible;
        checkbox.className = "accent-green-600";
        checkbox.addEventListener('change', () => toggleField(field.id));

        const span = document.createElement('span');
        span.textContent = field.label;

        label.append(icon, checkbox, span);

        hiddenContainer.appendChild(label);
      });
    } else {
      const p = document.createElement('p');
      p.textContent = "No hidden fields found matching your search.";
      p.className = "text-sm text-gray-500";
      hiddenContainer.appendChild(p);
    }

    document.getElementById('visibleCount').textContent = `${fields.filter(f=>f.visible).length}/${fields.length}`;
  }

  function toggleField(id) {
    const field = fields.find(f=>f.id===id);
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
    fields.forEach((f,i)=>{
      if(f.visible) fields[i] = visibleFields[vIndex++];
    });

    renderFields();
  }

  document.getElementById('fieldSearchInput').addEventListener('input', renderFields);

  

  document.getElementById('customizedTableApplyBtn').addEventListener('click', () => {
    alert('Applied fields: ' + fields.filter(f=>f.visible).map(f=>f.label).join(', '));
  });

  document.getElementById('customizedTableCloseBtn').addEventListener('click', () => {
    document.getElementById('customizedTableSidebar').classList.add('opacity-0','pointer-events-none');
  });

  renderFields();
  
  