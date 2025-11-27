const manualPunchList = [
    {
        id: 1,
        employeeCode: "EMP001",
        date: "26/11/2025",
        employeeName: "Aishwarya Suresh",
        department: "HR",
        subDepartment: "Recruitment",
        inTime: "09:30 AM",
        outTime: "06:20 PM",
        remarks: "On Time"
    },
    {
        id: 2,
        employeeCode: "EMP002",
        date: "26/11/2025",
        employeeName: "Karthik Raman",
        department: "Finance",
        subDepartment: "Payroll",
        inTime: "10:00 AM",
        outTime: "07:05 PM",
        remarks: "Late In"
    },
    {
        id: 3,
        employeeCode: "EMP003",
        date: "26/11/2025",
        employeeName: "Ananya Prakash",
        department: "IT",
        subDepartment: "Software Development",
        inTime: "09:15 AM",
        outTime: "06:40 PM",
        remarks: "On Time"
    },
    {
        id: 4,
        employeeCode: "EMP004",
        date: "26/11/2025",
        employeeName: "Sanjay Kumar",
        department: "Operations",
        subDepartment: "Logistics",
        inTime: "09:50 AM",
        outTime: "06:55 PM",
        remarks: "Late In"
    },
    {
        id: 5,
        employeeCode: "EMP005",
        date: "26/11/2025",
        employeeName: "Pooja Nair",
        department: "Marketing",
        subDepartment: "Digital Marketing",
        inTime: "09:25 AM",
        outTime: "06:15 PM",
        remarks: "On Time"
    },
    {
        id: 6,
        employeeCode: "EMP006",
        date: "26/11/2025",
        employeeName: "Rohan Mehta",
        department: "Sales",
        subDepartment: "Corporate Sales",
        inTime: "10:10 AM",
        outTime: "07:20 PM",
        remarks: "Late In"
    },
    {
        id: 7,
        employeeCode: "EMP007",
        date: "26/11/2025",
        employeeName: "Divya Rajendran",
        department: "HR",
        subDepartment: "Employee Relations",
        inTime: "09:05 AM",
        outTime: "06:00 PM",
        remarks: "On Time"
    },
    {
        id: 8,
        employeeCode: "EMP008",
        date: "26/11/2025",
        employeeName: "Vignesh Iyer",
        department: "IT",
        subDepartment: "Infrastructure",
        inTime: "09:40 AM",
        outTime: "06:45 PM",
        remarks: "Late In"
    },
    {
        id: 9,
        employeeCode: "EMP009",
        date: "26/11/2025",
        employeeName: "Meera Chatterjee",
        department: "Support",
        subDepartment: "Customer Support",
        inTime: "09:20 AM",
        outTime: "06:30 PM",
        remarks: "On Time"
    },
    {
        id: 10,
        employeeCode: "EMP010",
        date: "26/11/2025",
        employeeName: "Arjun Singh",
        department: "Admin",
        subDepartment: "Facilities",
        inTime: "09:55 AM",
        outTime: "07:00 PM",
        remarks: "Late In"
    },
    {
        id: 11,
        employeeCode: "EMP011",
        date: "26/11/2025",
        employeeName: "Sneha Vishwanath",
        department: "Finance",
        subDepartment: "Accounts",
        inTime: "09:10 AM",
        outTime: "06:05 PM",
        remarks: "On Time"
    },
    {
        id: 12,
        employeeCode: "EMP012",
        date: "26/11/2025",
        employeeName: "Harish Krishnan",
        department: "IT",
        subDepartment: "Testing",
        inTime: "10:05 AM",
        outTime: "07:15 PM",
        remarks: "Late In"
    },
    {
        id: 13,
        employeeCode: "EMP013",
        date: "26/11/2025",
        employeeName: "Nithya Manoharan",
        department: "Marketing",
        subDepartment: "Branding",
        inTime: "09:30 AM",
        outTime: "06:10 PM",
        remarks: "On Time"
    },
    {
        id: 14,
        employeeCode: "EMP014",
        date: "26/11/2025",
        employeeName: "Vijay Patil",
        department: "Operations",
        subDepartment: "Inventory",
        inTime: "09:50 AM",
        outTime: "06:50 PM",
        remarks: "Late In"
    },
    {
        id: 15,
        employeeCode: "EMP015",
        date: "26/11/2025",
        employeeName: "Lakshmi Narayanan",
        department: "Support",
        subDepartment: "Technical Support",
        inTime: "09:15 AM",
        outTime: "06:25 PM",
        remarks: "On Time"
    },
    {
        id: 16,
        employeeCode: "EMP016",
        date: "26/11/2025",
        employeeName: "Rahul Dev",
        department: "Sales",
        subDepartment: "Retail Sales",
        inTime: "10:20 AM",
        outTime: "07:10 PM",
        remarks: "Late In"
    },
    {
        id: 17,
        employeeCode: "EMP017",
        date: "26/11/2025",
        employeeName: "Gayathri Pillai",
        department: "Admin",
        subDepartment: "Security",
        inTime: "09:05 AM",
        outTime: "06:00 PM",
        remarks: "On Time"
    },
    {
        id: 18,
        employeeCode: "EMP018",
        date: "26/11/2025",
        employeeName: "Surya Narayan",
        department: "IT",
        subDepartment: "Network",
        inTime: "10:00 AM",
        outTime: "07:00 PM",
        remarks: "Late In"
    },
    {
        id: 19,
        employeeCode: "EMP019",
        date: "26/11/2025",
        employeeName: "Priya Balasubramanian",
        department: "HR",
        subDepartment: "Training",
        inTime: "09:10 AM",
        outTime: "06:05 PM",
        remarks: "On Time"
    },
    {
        id: 20,
        employeeCode: "EMP020",
        date: "26/11/2025",
        employeeName: "Sandeep Reddy",
        department: "Operations",
        subDepartment: "Transport",
        inTime: "09:45 AM",
        outTime: "06:55 PM",
        remarks: "Late In"
    }
];




$(document).ready(function () {

    // Inject content area
    const contentBox = $(".dynamic-content");

    // Load MSP List Table
    function loadListTable() {

        let rows = "";

        manualPunchList.forEach((e, index) => {
            rows += `
        <tr class="mspRow hover:bg-[#f5f7f9] text-sm cursor-pointer divide-x divide-[#ebeff3] group"
    data-id="${index}">


            <td class="p-2 border-b border-[#ebeff3]">
                <input type="checkbox" class="rowCheck cursor-pointer accent-green-600">
            </td>

            <td class="p-2 border-b border-[#ebeff3]">
                <span class="float-left">${index + 1}</span>
                <span class="float-right" >
                    <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] 
                    text-[#4d5e6c] opacity-0 group-hover:opacity-100 cursor-pointer"></i>
                </span>
            </td>

            <td class="p-2 border-b border-[#ebeff3]">${e.date}</td>
            <td class="p-2 border-b border-[#ebeff3]">
    <div class="flex items-center gap-2 cursor-pointer">
        <img
            src="/images/user.png"
            alt="avatar"
            class="w-8 h-8 rounded-full"
        />
        <div>
            <div class="text-sm font-medium text-gray-900">
                ${e.employeeName}
            </div>
            <div class="text-sm text-gray-500">
                ${e.employeeCode}
            </div>
        </div>
    </div>
</td>

            <td class="p-2 border-b border-[#ebeff3]">${e.department}</td>
            <td class="p-2 border-b border-[#ebeff3]">${e.subDepartment}</td>
            <td class="p-2 border-b border-[#ebeff3]">${e.inTime}</td>
            <td class="p-2 border-b border-[#ebeff3]">${e.outTime}</td>
            <td class="p-2 border-b border-[#ebeff3]">${e.remarks}</td>

        </tr>
        `;
        });

        contentBox.html(`
        <table class="w-full min-w-max">
            <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                <tr class="text-left divide-x divide-[#ebeff3]">

                    <th class="p-2 w-[3%]">
                        <input type="checkbox" id="selectAll" class="accent-green-600 cursor-pointer" />
                    </th>

                    <th class="p-2 w-[5%]">S.no</th>
                    <th class="p-2 w-[10%]">Date</th>
                    <th class="p-2 w-[22%]">Employee Name</th>
                    <th class="p-2 w-[15%]">Department</th>
                    <th class="p-2 w-[15%]">Sub Department</th>
                    <th class="p-2 w-[10%]">In Time</th>
                    <th class="p-2 w-[10%]">Out Time</th>
                    <th class="p-2 w-[10%]">Remarks</th>

                </tr>
            </thead>

            <tbody id="ManualPunchBody">
                ${rows}
            </tbody>
        </table>
    `);

        // Show list footer, hide form footer
        $("#listFooter").removeClass("hidden");
        $("#formFooter").addClass("hidden");
    }


    // Load Apply MSP Form
    function loadNewForm() {
        contentBox.html(`
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
  <form autocomplete="off">

    <!-- Date -->
    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="text-sm font-medium text-[#1D1D1D] w-1/2">
        Date<span class="text-red-500">*</span>
      </label>
      <div class="flex flex-col w-3/4">
        <input 
          type="date"
          class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full"
          required
        />
      </div>
    </div>

    <!-- Staff Name -->
    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="text-sm font-medium text-[#1D1D1D] w-1/2">
        Staff Name<span class="text-red-500">*</span>
      </label>
      <div class="flex flex-col w-3/4">
        <input
          type="text"
          placeholder="Enter Staff Name"
          class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full"
          required
        />
      </div>
    </div>

    <!-- In Time -->
    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="text-sm font-medium text-[#1D1D1D] w-1/2">
        In Time<span class="text-red-500">*</span>
      </label>
      <div class="flex flex-col w-3/4">
        <input
          type="time"
          class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full"
          required
        />
      </div>
    </div>

    <!-- Out Time -->
    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="text-sm font-medium text-[#1D1D1D] w-1/2">
        Out Time<span class="text-red-500">*</span>
      </label>
      <div class="flex flex-col w-3/4">
        <input
          type="time"
          class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full"
          required
        />
      </div>
    </div>

    <!-- Total Time -->
    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="text-sm font-medium text-[#1D1D1D] w-1/2">Total Time</label>
      <div class="flex flex-col w-3/4 text-sm font-medium flex items-start gap-2">
        <span id="totalTime" class="text-green-600">0.00 hours</span>
        <span id="exceedNote" class="text-red-600 text-xs hidden">
          (cannot exceed 18 hours)
        </span>
      </div>
    </div>

    <!-- Remarks -->
    <div class="mb-[10px] flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
      <label class="text-sm font-medium text-[#1D1D1D] w-1/2">Remarks</label>
      <div class="flex flex-col w-3/4">
        <input
          type="text"
          placeholder="Enter Remarks"
          class="h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full"
        />
      </div>
    </div>

  </form>
</div>

        `);

        // Show form footer buttons
        $("#listFooter").addClass("hidden");
        $("#formFooter").removeClass("hidden");
    }

    // THEAD Select All checkbox → Check/Uncheck all rows
    $(document).on("change", "#selectAll", function () {
        const state = $(this).is(":checked");
        $(".rowCheck").prop("checked", state);
    });


    // TBODY row checkbox → Control thead checkbox
    $(document).on("change", ".rowCheck", function () {

        // If ANY row is unchecked → thead should uncheck
        if (!$(this).is(":checked")) {
            $("#selectAll").prop("checked", false);
            return;
        }

        // If ALL rows are checked → thead becomes checked
        const total = $(".rowCheck").length;
        const checked = $(".rowCheck:checked").length;

        if (total === checked) {
            $("#selectAll").prop("checked", true);
        }
    });



$(document).on("click", ".mspRow", function () {
     $("#customizeSidebar").removeClass("translate-x-0").addClass("translate-x-full");
    const rowIndex = $(this).data("id");
    const rowData = manualPunchList[rowIndex];
    openSidebarWithData(rowData);
});

$(document).on("click", ".ri-pencil-fill", function (e) {
    e.stopPropagation();
});

$(document).on("click", ".rowCheck", function (e) {
    e.stopPropagation();
});



function openSidebarWithData(data) {

    // Fill values
    $("#sidebarEmployeeName").val(data.employeeName);
    $("#sidebarEmployeeCode").val(data.employeeCode);
    $("#sidebarDepartment").val(data.department);
    $("#sidebarSubDepartment").val(data.subDepartment);
    $("#sidebarDate").val(data.date);
    $("#sidebarRemarks").val(data.remarks);

    // Time fields (editable)
    $("#sidebarInTime").val(data.inTime);
    $("#sidebarOutTime").val(data.outTime);

    // Open sidebar
    $("#rowSidebarWrapper").removeClass("opacity-0 pointer-events-none");
    $("#rowSidebar").removeClass("translate-x-full");
}


function closeSidebar() {
    $("#rowSidebarWrapper").addClass("opacity-0 pointer-events-none");
    $("#rowSidebar").addClass("translate-x-full");
}

$("#closeSidebarBtn, #cancelSidebarBtn, #overlayBg").on("click", closeSidebar);



// OPEN sidebar
$("#openCustomizeSidebar").on("click", function () {
    $("#customizeSidebar").removeClass("translate-x-full")
                          .addClass("translate-x-0");
    

});

// CLOSE sidebar
function closeSidebarCustomTable () {
    $("#customizeSidebar").removeClass("translate-x-0")
                          .addClass("translate-x-full");
    
};

$("#closeCustomizeTableSidebarBtn, #cancelSidebarBtnCustomTable").on("click", closeSidebarCustomTable);



 // Open sidebar
        $("#openFilterBtn").on("click", function() {
            $("#filterSidebarWrapper").removeClass("opacity-0 pointer-events-none").addClass("opacity-100 pointer-events-auto");
            $("#filterSidebar").removeClass("translate-x-full").addClass("translate-x-0");
        });

        // Close sidebar
        function closeFilterSidebar() {
            $("#filterSidebarWrapper").removeClass("opacity-100 pointer-events-auto").addClass("opacity-0 pointer-events-none");
            $("#filterSidebar").removeClass("translate-x-0").addClass("translate-x-full");
        }

        $("#closeFilterBtn, #filterBackdrop").on("click", closeFilterSidebar);


    // ▟ Tab switch logic
    $(".tab").click(function () {

        // Reset styles for all tabs
        $(".tab")
            .removeClass("active-tab bg-[#ebeff3] text-[#384551] ")
            .addClass("bg-white text-[#384551] hover:text-[#6689b8] hover:bg-[#f5f7f9]");

        // Apply active styles
        $(this)
            .addClass("active-tab bg-[#ebeff3] text-[#384551]")
            .removeClass("bg-white hover:text-[#6689b8] hover:bg-[#f5f7f9]");

        // Toggle close icons
        $(".closeTab").addClass("hidden");
        $(this).find(".closeTab").removeClass("hidden");

        // Toggle counters
        $(".counter-badge").addClass("hidden");
        $(this).find(".counter-badge").removeClass("hidden");

        // Decide which content to load
        let tabName = $(this).data("tab");

        if (tabName === "list") {
            $("#listTopBar")
                .removeClass("hidden")
                .addClass("flex");

            $("#contentBox")
                .removeClass("mt-2 h-[calc(100vh-154px)]")
                .addClass("h-[calc(100vh-189px)]");


            loadListTable();
        } else {
            $("#listTopBar")
                .addClass("hidden")
                .removeClass("flex");

            $("#contentBox")
                .removeClass("h-[calc(100vh-189px)]")
                .addClass("mt-2 h-[calc(100vh-154px)]");


            loadNewForm();
        }
    });


    if ($(".tab.active-tab").data("tab") === "list") {
        $("#listTopBar")
            .removeClass("hidden")
            .addClass("flex");
    }

    // Default active tab on load
    loadListTable();
});
