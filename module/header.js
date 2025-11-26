
const pagesData = [
  {
    title: "Staff",
    icon: "ri-file-line",
    link: "/app/staff/list"
  },
  {
    title: "New Staff",
    icon: "ri-file-line",
    link: "/app/staff/new"
  },
  {
    title: "Options",
    icon: "ri-file-line",
    link: "/app/option"
  },
  {
    title: "Policy",
    icon: "ri-file-line",
    link: "/app/policy"
  },
  {
    title: "Manual Punch",
    icon: "ri-file-line",
    link: "/app/manualPunch"
  },
  {
    title: "Reminders",
    icon: "ri-file-line",
    link: "/app/reminder"
  },
  {
    title: "Salary",
    icon: "ri-file-line",
    link: "/app/salary"
  },
  {
    title: "Insurance",
    icon: "ri-file-line",
    link: "/app/insurance"
  },
  {
    title: "Approval",
    icon: "ri-file-line",
    link: "/app/approval"
  },
  {
    title: "Attendance",
    icon: "ri-file-line",
    link: "/app/attendance"
  },
  {
    title: "Report",
    icon: "ri-file-line",
    link: "/app/report"
  },
  {
    title: "Assets",
    icon: "ri-file-line",
    link: "/app/asset"
  },
  {
    title: "Shift Approval",
    icon: "ri-file-line",
    link: "/app/shiftApproval"
  },
  {
    title: "Notifications",
    icon: "ri-file-line",
    link: "/app/notification"
  },
  {
    title: "Events",
    icon: "ri-file-line",
    link: "/app/event"
  }
];


const modalData = [
  {
    title: "Customer ledger",
    icon: "ri-file-line",
    link: ""
  },
  {
    title: "Product ledger",
    icon: "ri-file-line",
    link: ""
  },
  {
    title: "Expense ledger",
    icon: "ri-file-line",
    link: ""
  },
  {
    title: "Unit ledger",
    icon: "ri-file-line",
    link: ""
  },
  {
    title: "Bank Accounts",
    icon: "ri-file-line",
    link: ""
  },
  {
    title: "Mandatory Fields",
    icon: "ri-file-line",
    link: ""
  }
];



$(document).ready(function () {

    function openDropdown() {
    $("#dropdownMenu").removeClass("hidden");
    $("#dropdownBackdrop").removeClass("hidden");

    // Focus input
    setTimeout(() => {
      $("#searchInput").focus();
    }, 10);
  }

    function closeDropdown() {
      $("#dropdownMenu").addClass("hidden");
      $("#dropdownBackdrop").addClass("hidden");
    }

    // Open dropdown when button clicked
    $("#openDropdownBtn").click(function () {
      openDropdown();
    });

    // Open dropdown when "/" is pressed
    $(document).keydown(function (e) {
      if (e.key === "/") {
        e.preventDefault(); 
        openDropdown();
      }
    });

    // Close on backdrop click
    $("#dropdownBackdrop").click(function () {
      closeDropdown();
    });

    // Close dropdown on ESC key
    $(document).keydown(function (e) {
      if (e.key === "Escape") {
        closeDropdown();
      }
    });


     // Show/Hide clear button when typing
  $("#searchInput").on("input", function () {
    if ($(this).val().length > 0) {
      $("#clearSearchBtn").removeClass("hidden");
    } else {
      $("#clearSearchBtn").addClass("hidden");
    }
  });

  // Clear text when clicking the clear button
  $("#clearSearchBtn").click(function () {
    $("#searchInput").val("");
    $("#clearSearchBtn").addClass("hidden");
    $("#searchInput").focus(); 
  });


    // Render pages list
  pagesData.forEach(page => {
    $("#pagesList").append(`
      <li class="py-1.5 px-2 text-[14px] text-[#1f2328] 
                 cursor-pointer rounded-md flex justify-between items-center 
                 hover:bg-gray-100"
          data-link="${page.link}">
          
        <div class="flex items-center">
          <i class="${page.icon} text-gray-500 mr-2"></i>
          ${page.title}
        </div>

        <span class="text-[#59636E] text-[14px]">Jump to</span>
      </li>
    `);
  });

  // Navigate on click
  $(document).on("click", "#pagesList li", function () {
    const url = $(this).data("link");
    window.location.href = url;  
  });



  
    // Render modal list
  modalData.forEach(page => {
    $("#modalList").append(`
      <li class="py-1.5 px-2 text-[14px] text-[#1f2328] 
                 cursor-pointer rounded-md flex justify-between items-center 
                 hover:bg-gray-100"
          data-link="${page.link}">
          
        <div class="flex items-center">
          <i class="${page.icon} text-gray-500 mr-2"></i>
          ${page.title}
        </div>

        <span class="text-[#59636E] text-[14px]">Jump to</span>
      </li>
    `);
  });

  // Navigate on click
  $(document).on("click", "#modalList li", function () {
    const url = $(this).data("link");
    window.location.href = url;  
  });




  

  });


  $(document).ready(function () {

  // OPEN/CLOSE DROPDOWN ON ICON CLICK
  $("#notificationTrigger").on("click", function (e) {
    e.stopPropagation();
    $("#notificationDropdown")
      .toggleClass("opacity-100 scale-100 pointer-events-auto")
      .toggleClass("opacity-0 scale-95 pointer-events-none");
  });

  // CLOSE WHEN CLICK OUTSIDE
  $(document).on("click", function (e) {
    if (
      !$(e.target).closest("#notificationDropdown").length &&
      !$(e.target).closest("#notificationTrigger").length
    ) {
      closeDropdown();
    }
  });

  // CLOSE WHEN PRESSING ESC
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") {
      closeDropdown();
    }
  });


   $('#notifyClose').click(function () {
       closeDropdown();
    });

  function closeDropdown() {
    $("#notificationDropdown")
      .removeClass("opacity-100 scale-100 pointer-events-auto")
      .addClass("opacity-0 scale-95 pointer-events-none");
  }

    // TAB SWITCHING
  $(".tab-btn").on("click", function () {
    let tab = $(this).data("tab");

    // Remove active from all
    $(".tab-btn").removeClass("text-[#009333] border-b-2 border-[#009333] active-tab")
                 .addClass("text-gray-600");

    $(".count-badge").addClass("hidden");

    // Activate clicked one
    $(this)
      .addClass("text-[#009333] border-b-2 border-[#009333] active-tab")
      .removeClass("text-gray-600");

    $(this).find(".count-badge").removeClass("hidden");

    // Switch content
    $(".tab-content").addClass("hidden");
    $("#tab-" + tab).removeClass("hidden");
  });

});
