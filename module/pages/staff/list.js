$(document).ready(function () {

    loadClientTable();
  
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
      all: 12,
      pending: 45,
      completed: 18,
      inprogress: 59
  };
  let clients = [
    {
      id: 1,
      clientName: "Client 1",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 1",
      state: "State 1",
      pincode: "123456",
      email: "client1@example.com",
    },
    {
      id: 2,
      clientName: "Client 2",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 2",
      state: "State 2",
      pincode: "123456",
      email: "client2@example.com",
    },
    {
      id: 3,
      clientName: "Client 3",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 3",
      state: "State 3",
      pincode: "123456",
      email: "client3@example.com",
    },
    {
      id: 4,
      clientName: "Client 4",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 4",
      state: "State 4",
      pincode: "123456",
      email: "client4@example.com",
    },
    {
      id: 5,
      clientName: "Client 5",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 5",
      state: "State 5",
      pincode: "123456",
      email: "client5@example.com",
    },
    {
      id: 6,
      clientName: "Client 6",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 6",
      state: "State 6",
      pincode: "123456",
      email: "client6@example.com",
    },
    {
      id: 7,
      clientName: "Client 7",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 7",
      state: "State 7",
      pincode: "123456",
      email: "client7@example.com",
    },
    {
      id: 8,
      clientName: "Client 8",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 8",
      state: "State 8",
      pincode: "123456",
      email: "client8@example.com",
    },
    {
      id: 9,
      clientName: "Client 9",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 9",
      state: "State 9",
      pincode: "123456",
      email: "client9@example.com",
    },
    {
      id: 10,
      clientName: "Client 10",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 10",
      state: "State 10",
      pincode: "123456",
      email: "client10@example.com",
    },
    {
      id: 11,
      clientName: "Client 11",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 11",
      state: "State 11",
      pincode: "123456",
      email: "client11@example.com",
    },
    {
      id: 12,
      clientName: "Client 12",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 12",
      state: "State 12",
      pincode: "123456",
      email: "client12@example.com",
    },
    {
      id: 13,
      clientName: "Client 13",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 13",
      state: "State 13",
      pincode: "123456",
      email: "client13@example.com",
    },
    {
      id: 14,
      clientName: "Client 14",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 14",
      state: "State 14",
      pincode: "123456",
      email: "client14@example.com",
    },
    {
      id: 15,
      clientName: "Client 15",
      phoneNumber: "1234567890",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      district: "District 15",
      state: "State 15",
      pincode: "123456",
      email: "client15@example.com",
    },
  ];
   // Function to change active tab
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
  
  
    // Render table rows
    function loadClientTable() {
      $("#ClientTableBody").empty();
  
      if (clients.length === 0) {
        $("#ClientTableBody").append(`
          <tr>
            <td colspan="6" class="h-24 text-sm text-center">
              No Clients found
            </td>
          </tr>
        `);
        return;
      }
  
      clients.forEach((c, index) => {
          $("#ClientTableBody").append(`
              <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer divide-x divide-[#ebeff3] group">
  
                  <td class="p-2 border-b">
                      <input type="checkbox" class="rowCheck cursor-pointer accent-green-600">
                  </td>
  
                  <td class="p-2 border-b">
                      <span class="float-left">${index + 1}</span>
                      <a class="float-right" href="/app/client/new">
                          <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] 
                          text-[#4d5e6c] opacity-0 group-hover:opacity-100 cursor-pointer"></i>
                      </a>
                  </td>
  
                  <td class="p-2 border-b">${c.clientName}</td>
              <td class="p-2 border-b">${c.phoneNumber}</td>
              <td class="p-2 border-b">${c.addressLine1}</td>
              <td class="p-2 border-b">${c.addressLine2 || '-'}</td>
              <td class="p-2 border-b">${c.district}</td>
              <td class="p-2 border-b">${c.state}</td>
              <td class="p-2 border-b">${c.pincode}</td>
              <td class="p-2 border-b">${c.email}</td>
              </tr>
          `);
      });
  }
  
  
  
  
  