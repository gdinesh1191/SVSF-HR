$(document).ready(function () {

    // Load default tab data on page load
    loadTasksTable();

    // Tab switch
    $(".tab").click(function () {

        // Reset styles for all tabs
        $(".tab")
            .removeClass("active-tab bg-[#ebeff3] text-[#384551]")
            .addClass("bg-white text-[#384551] hover:text-[#6689b8] hover:bg-[#f5f7f9]");

        // Apply active styles
        $(this)
            .addClass("active-tab bg-[#ebeff3] text-[#384551]")
            .removeClass("bg-white hover:text-[#6689b8] hover:bg-[#f5f7f9]");

        // Show close icon only on active tab
        $(".closeTab").addClass("hidden");
        $(this).find(".closeTab").removeClass("hidden");

        // Show count only on active tab
        $(".counter-badge").addClass("hidden");
        $(this).find(".counter-badge").removeClass("hidden");

        // Load content based on tab
        let tabName = $(this).data("tab");

        if (tabName === "tasks") loadTasksTable();
        else if (tabName === "completed") loadCompletedTable();
    });

 // Insert dynamic assignee rows
  assignees.forEach((user) => {
    const row = `
      <div class="assign-item flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
           data-name="${user.name}">
        <div class="w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white font-medium">
          ${user.name.charAt(0)}
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-medium">${user.name}</span>
          <span class="text-xs font-medium text-gray-500">${user.email}</span>
        </div>
      </div>
    `;
    $("#assignOptions").append(row);
  });

  // Toggle dropdown
  $("#assignBtn").click(function () {
    $("#assignDrop").toggleClass("hidden");
  });

  // Search filter
  $("#assignSearch").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    $(".assign-item").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  $(document).on("click", function (e) {
  if (!$(e.target).closest("#assignBtn, #assignDrop").length) {
    $("#assignDrop").addClass("hidden");
  }
});

  // Select assignee
  $(document).on("click", ".assign-item", function () {
    const selected = $(this).data("name");
    $("#assignLabel").text(selected);
    $("#assignDrop").addClass("hidden");
  });
   
});


// ---------------------------------------------------------
// DATA ARRAYS
// ---------------------------------------------------------


const assignees = [
  {
    name: "Aishwarya Narayanaswamy",
    email: "aishwarya.n@company.com",
    color: "bg-blue-500"
  },
  {
    name: "Raghavendran Subramanian Iyer",
    email: "raghavendran.iyer@company.com",
    color: "bg-red-500"
  },
  {
    name: "Srinivasan Krishnamurthy",
    email: "srinivasan.km@company.com",
    color: "bg-green-600"
  },
  {
    name: "Haripriya Chidambaram",
    email: "haripriya.cs@company.com",
    color: "bg-purple-500"
  },
  {
    name: "Karthikeyan Balasubramanian",
    email: "karthikeyan.br@company.com",
    color: "bg-amber-600"
  },
  {
    name: "Nivedita Parameswaran",
    email: "nivedita.pk@company.com",
    color: "bg-teal-600"
  },
  {
    name: "Vigneshwaran Chandrasekaran",
    email: "vigneshwaran.cr@company.com",
    color: "bg-orange-500"
  },
  {
    name: "Meenakshi Jagannathan",
    email: "meenakshi.jv@company.com",
    color: "bg-pink-600"
  },
  {
    name: "Pavithra Ramaswamy",
    email: "pavithra.rs@company.com",
    color: "bg-yellow-600"
  },
  {
    name: "Arunkumar Palanisamy",
    email: "arunkumar.tp@company.com",
    color: "bg-indigo-600"
  }
];



const dummyTasks = [
    { title: "Prepare Monthly Report", desc: "Compile financial and HR data for the month.", date: "2025-11-30", assigned: "Tharani Natarajan", color: "bg-blue-100 text-blue-600" },

    { title: "Update Employee Records", desc: "Verify newly added employee information.", date: "2025-12-02", assigned: "Aishwarya Srinivasan", color: "bg-green-100 text-green-600" },

    { title: "Schedule Team Meeting", desc: "Plan agenda and notify all team members.", date: "2025-11-28", assigned: "Kavya Narayanan", color: "bg-purple-100 text-purple-600" },

    { title: "Review Leave Requests", desc: "Approve or reject pending leave applications.", date: "2025-12-01", assigned: "Arjun Krishnan", color: "bg-pink-100 text-pink-600" },

    { title: "Upload Salary Slips", desc: "Generate and upload salary slips to the portal.", date: "2025-12-03", assigned: "Pranav Deshmukh", color: "bg-yellow-100 text-yellow-600" },

    { title: "Vendor Payment Follow-up", desc: "Check pending payments with finance.", date: "2025-12-05", assigned: "Harish Balaji", color: "bg-red-100 text-red-600" },

    { title: "Backup HR Database", desc: "Perform monthly data backup tasks.", date: "2025-11-29", assigned: "Sneha Sharma", color: "bg-indigo-100 text-indigo-600" },

    { title: "Conduct Training Session", desc: "Arrange training for new hires.", date: "2025-12-07", assigned: "Nandhini Subramanian", color: "bg-teal-100 text-teal-600" },

    { title: "Verify Attendance Logs", desc: "Cross-check biometric entries.", date: "2025-11-27", assigned: "Vikram Patil", color: "bg-orange-100 text-orange-600" },

    { title: "Prepare Audit Files", desc: "Organize compliance-related documents.", date: "2025-12-08", assigned: "Gayathri Raman", color: "bg-sky-100 text-sky-600" },

    { title: "Policy Document Update", desc: "Revise HR policies for 2026.", date: "2025-12-10", assigned: "Kiran Gopal", color: "bg-emerald-100 text-emerald-600" },

    { title: "New Joining Formalities", desc: "Prepare onboarding kits.", date: "2025-11-26", assigned: "Harini Selvan", color: "bg-fuchsia-100 text-fuchsia-600" },

    { title: "Exit Interview Setup", desc: "Schedule interviews for resigned employees.", date: "2025-12-11", assigned: "Divya Srinivasan", color: "bg-lime-100 text-lime-600" },

    { title: "Asset Inventory Check", desc: "Check laptops and office equipment stock.", date: "2025-12-04", assigned: "Priya Raghavan", color: "bg-rose-100 text-rose-600" },

    { title: "Client Meeting Notes", desc: "Summarize discussion points.", date: "2025-11-30", assigned: "Shreya Kulkarni", color: "bg-cyan-100 text-cyan-600" },

    { title: "Prepare ID Cards", desc: "Generate and print employee ID cards.", date: "2025-12-06", assigned: "Monica Lawrence", color: "bg-violet-100 text-violet-600" },

    { title: "Organize Workspace", desc: "Rearrange HR files and resources.", date: "2025-12-09", assigned: "Ananya Menon", color: "bg-amber-100 text-amber-600" },

    { title: "New Year Event Planning", desc: "Plan games and rewards for event.", date: "2025-12-12", assigned: "Anjali Pradeep", color: "bg-purple-200 text-purple-700" },

    { title: "Performance Review Prep", desc: "Collect quarterly review data.", date: "2025-12-13", assigned: "Naveen Baskar", color: "bg-gray-200 text-gray-700" },

    { title: "System Access Audit", desc: "Review access levels for all employees.", date: "2025-12-14", assigned: "Deepa Balu", color: "bg-green-200 text-green-700" }
];


let activeTasks = [...dummyTasks];
let completedTasks = [];


// ---------------------------------------------------------
// COMPLETE TASK → MOVE TO COMPLETED
// ---------------------------------------------------------

$(document).on("click", ".check-circle", function () {
    let index = $(this).data("index");

    // Make circle checked
    $(this).addClass("bg-green-600 border-green-600");
    $(this).find("i").removeClass("hidden");

    // Strike only the text, NOT the circle
    let row = $(`tr[data-index='${index}']`);
    row.find(".task-text").addClass("opacity-60 line-through");

    // Move task to completed
    let task = activeTasks[index];
    completedTasks.push(task);
    activeTasks.splice(index, 1);

    // Refresh table
    row.fadeOut(200, function () {
        loadTasksTable();
    });
});

$(document).on("click", "#addTaskBtnRow", function () {
    $("#addTaskRow").removeClass("hidden");   // show form row
    $(this).addClass("hidden");               // hide the Add button row
});


$(document).on("click", "#cancelAddTask", function () {
    $("#addTaskRow").addClass("hidden");   // hide form row
    $("#addTaskBtnRow").removeClass("hidden");  // show Add Space Task row again
});


// ---------------------------------------------------------
// LOAD ACTIVE TASKS TABLE
// ---------------------------------------------------------

function loadTasksTable() {
    let rows = `
        <tr id="addTaskBtnRow" class="cursor-pointer sticky top-[35px] z-[10] bg-white shadow-[0_1px_0_0_#ebeff3]">
            <td  class="px-2 py-3 text-green-600 font-medium flex items-center gap-2">
                <i class="ri-add-line text-lg"></i> Add Space Task
            </td>
            <td class=""></td>
            <td calss=""></td>
        </tr>

        <tr id="addTaskRow" class="hidden sticky top-[35px] z-[10] bg-white shadow-[0_1px_0_0_#ebeff3]">

    <!-- TITLE + DESCRIPTION + BUTTONS -->
    <td  class=" px-2 py-3 align-top ">
      <div class="flex flex-col gap-2">

        <!-- Title -->
        <input
          type="text"
          placeholder="Title"
          class="w-full text-sm font-medium text-[#1f1f1f] placeholder-[#585858] outline-none border-b"
        />

        <!-- Description -->
        <input
          type="text"
          placeholder="Description"
          class="w-full text-sm font-medium text-[#1f1f1f] placeholder-[#585858] outline-none border-b mt-1"
        />

        <!-- Buttons -->
        <div class="flex gap-3 mt-2">
          <button
            class="py-1 px-2 text-sm rounded  cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a]"
          >
            Add
          </button>

          <button id="cancelAddTask" class="py-1 px-2 text-sm rounded bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer">
            Cancel
          </button>
        </div>

      </div>
    </td>

    <!-- DATE PICKER -->
    <td  class="px-2 py-3 align-top">
  <div class="relative">

    <div
      class="bg-gray-100 hover:bg-gray-200 pl-9 pr-3 w-30 py-[6px] border-0 rounded-full cursor-pointer text-sm text-gray-700 w-fit"
    >
      25/11/2025
    </div>

    <i class="ri-calendar-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-base pointer-events-none"></i>

  </div>
</td>


    <!-- ASSIGN DROPDOWN -->
   <td  class="px-2 py-3 align-top">
  <div class="relative">

    <!-- Dropdown Button -->
    <button
      id="assignBtn"
      class="bg-gray-100 hover:bg-gray-200 px-3 py-[6px] rounded-full flex items-center gap-2 cursor-pointer text-sm text-gray-700 w-fit"
    >
      <i class="ri-user-line"></i>
      <span id="assignLabel">Assign to</span>
    </button>

    <!-- Dropdown -->
    <div
      id="assignDrop"
      class="absolute z-20 mt-2 w-72 bg-white border border-gray-200 rounded-md overflow-hidden shadow-lg hidden"
    >
      <!-- Search -->
      <div class="sticky top-0 bg-white z-10 border-b flex items-center px-3 py-2 gap-2">
        <i class="ri-search-line text-gray-500 text-lg"></i>
        <input
          id="assignSearch"
          type="text"
          placeholder="Search"
          class="w-full text-sm outline-none placeholder-[#585858]"
        />
      </div>

      <!-- Options Container -->
      <div id="assignOptions" class="max-h-64 overflow-y-auto">

      </div>
    </div>

  </div>
</td>



  </tr>
    `;

    activeTasks.forEach((task, index) => {
        let formattedDate = new Date(task.date).toLocaleDateString("en-GB");
        let initial = task.assigned.charAt(0).toUpperCase();

        rows += `
            <tr class="task-row border-b border-[#ebeff3]" data-index="${index}">
                <td class="p-2">
                    <div class="flex items-start gap-3">

                        <!-- Click to Complete -->
                       <div class="check-circle w-[18px] h-[18px] mt-[2px] 
            rounded-full border border-gray-400 
            flex items-center justify-center cursor-pointer"
     data-index="${index}">
    <i class="ri-check-line hidden text-white text-[12px] leading-none"></i>
</div>


                        <div class="task-text space-y-1">
                            <div class="task-title font-medium text-[#12344d]">${task.title}</div>
                            <div class="task-desc text-gray-500 text-sm">${task.desc}</div>
                        </div>
                    </div>
                </td>

                <td class="p-2 text-[#384551] task-text">${formattedDate}</td>

                <td class="p-2 ">
                   <div class=" items-center inline-flex bg-white border border-gray-200 pl-1 pr-2 py-1 text-sm font-medium rounded-full">

    <div class="w-7 h-7 rounded-full flex items-center justify-center text-[15px] font-medium mr-2 ${task.color}">
        ${initial}
    </div>

    <span class="task-text">
        ${task.assigned}
    </span>

</div>
                </td>
                

            </tr>
        `;
    });

    $("#ReminderTableBody").html(rows);
}


// ---------------------------------------------------------
// LOAD COMPLETED TASKS TABLE
// ---------------------------------------------------------

function loadCompletedTable() {
    let rows = `
    <!-- ROW 1 -->
<tr class="border-b border-[#ebeff3]">
    <td class="p-2">
        <div class="flex items-start gap-3">
            <!-- Completed Icon -->
            <div class="w-[18px] h-[18px] mt-[2px] rounded-full bg-green-600 border border-green-600 
                        flex items-center justify-center cursor-pointer">
                <i class="ri-check-line text-white text-[12px] leading-none"></i>
            </div>

            <div class="opacity-60 line-through space-y-1">
                <div class="font-medium text-[#12344d]">Prepare Monthly Sales Report</div>
                <div class="text-gray-500 text-sm">Collected all regional numbers and merged sheets.</div>
            </div>
        </div>
    </td>

    <td class="p-2 text-[#384551] opacity-60 line-through">20/11/2025</td>

    <td class="p-2 opacity-60">
        <div class="items-center inline-flex bg-white border border-gray-200 pl-1 pr-2 py-1 text-sm font-medium rounded-full">
            <div class="w-7 h-7 rounded-full flex items-center justify-center text-[15px] font-medium mr-2 bg-purple-100 text-purple-600">
                A
            </div>
            <span class="opacity-60 line-through">Aiswarya Ramanathan</span>
        </div>
    </td>
</tr>


<!-- ROW 2 -->
<tr class="border-b border-[#ebeff3]">
    <td class="p-2">
        <div class="flex items-start gap-3">
            <!-- Completed Icon -->
            <div class="w-[18px] h-[18px] mt-[2px] rounded-full bg-green-600 border border-green-600 
                        flex items-center justify-center cursor-pointer">
                <i class="ri-check-line text-white text-[12px] leading-none"></i>
            </div>

            <div class="opacity-60 line-through space-y-1">
                <div class="font-medium text-[#12344d]">Employee Record Update</div>
                <div class="text-gray-500 text-sm">Verified and corrected 12 employee details.</div>
            </div>
        </div>
    </td>

    <td class="p-2 text-[#384551] opacity-60 line-through">22/11/2025</td>

    <td class="p-2 opacity-60">
        <div class="items-center inline-flex bg-white border border-gray-200 pl-1 pr-2 py-1 text-sm font-medium rounded-full">
            <div class="w-7 h-7 rounded-full flex items-center justify-center text-[15px] font-medium mr-2 bg-amber-100 text-amber-600">
                K
            </div>
            <span class="opacity-60 line-through">Karthikeyan Subramani</span>
        </div>
    </td>
</tr>


<!-- ROW 3 -->
<tr class="border-b border-[#ebeff3]">
    <td class="p-2">
        <div class="flex items-start gap-3">
            <!-- Completed Icon -->
            <div class="w-[18px] h-[18px] mt-[2px] rounded-full bg-green-600 border border-green-600 
                        flex items-center justify-center cursor-pointer">
                <i class="ri-check-line text-white text-[12px] leading-none"></i>
            </div>

            <div class="opacity-60 line-through space-y-1">
                <div class="font-medium text-[#12344d]">System Backup Completed</div>
                <div class="text-gray-500 text-sm">Full backup created and verified.</div>
            </div>
        </div>
    </td>

    <td class="p-2 text-[#384551] opacity-60 line-through">18/11/2025</td>

    <td class="p-2 opacity-60">
        <div class="items-center inline-flex bg-white border border-gray-200 pl-1 pr-2 py-1 text-sm font-medium rounded-full">
            <div class="w-7 h-7 rounded-full flex items-center justify-center text-[15px] font-medium mr-2 bg-red-100 text-red-600">
                S
            </div>
            <span class="opacity-60 line-through">Srinivasan Rajendran</span>
        </div>
    </td>
</tr>
`;

    completedTasks.forEach(task => {
        let formattedDate = new Date(task.date).toLocaleDateString("en-GB");
        let initial = task.assigned.charAt(0).toUpperCase();

        rows += `
            <tr class="border-b border-[#ebeff3] ">

                <td class="p-2">
                    <div class="flex items-start gap-3">

                        <!-- Click to Complete -->
                       <div class="w-[18px] h-[18px] mt-[2px] 
            rounded-full bg-green-600 border border-green-600 
            flex items-center justify-center cursor-pointer">
    <i class="ri-check-line  text-white text-[12px] leading-none"></i>
</div>


                        <div class="opacity-60 line-through space-y-1">
                            <div class=" font-medium text-[#12344d]">${task.title}</div>
                            <div class=" text-gray-500 text-sm">${task.desc}</div>
                        </div>
                    </div>
                </td>
                

                <td class="p-2 text-[#384551] opacity-60 line-through">${formattedDate}</td>


                

                <td class="p-2 opacity-60 ">
                   <div class=" items-center inline-flex bg-white border border-gray-200 pl-1 pr-2 py-1 text-sm font-medium rounded-full">

    <div class="w-7 h-7 rounded-full flex items-center justify-center text-[15px] font-medium mr-2  ${task.color}">
        ${initial}
    </div>

    <span class="opacity-60 line-through">
        ${task.assigned}
    </span>

</div>
                </td>
                
            </tr>
        `;
    });

    $("#ReminderTableBody").html(rows);
}
