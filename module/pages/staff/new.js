
$(document).ready(function () {

    

    $(".tab-item").click(function () {
       // remove active state from all tabs
       $(".tab-item").removeClass("text-[#009333] border-[#009333] border-b-2");
       
       // add active styles to clicked tab
       $(this).addClass("text-[#009333] border-[#009333] border-b-2");

       // hide all tab contents
       $(".tab-content").addClass("hidden");

       // show relevant tab
       const tab = $(this).data("tab");
       $("#tab-" + tab).removeClass("hidden");
   });
});


$(function () {
    $("#dob").datepicker({
      changeMonth: true,
      changeYear: true,
      yearRange: "1900:+0",
      maxDate: new Date(),
      dateFormat: "yy-mm-dd",
      onSelect: function () {
        calculateAge();
      }
    });
  });

  function calculateAge() {
    let dob = $("#dob").val();
    if (!dob) return $("#age").val("");

    let today = new Date();
    let birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();

    let m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    $("#age").val(age);
  }


  function toggleSavedHeader() {
  let count = $("#familyBody tr").length;

  if (count > 0) {
    $("#savedHeader").show();
  } else {
    $("#savedHeader").hide();
  }
}


  let editIndex = -1;

  $("#saveBtn").on("click", function () {
    let name = $("#name").val().trim();
    let dob = $("#dob").val();
    let age = $("#age").val();
    let relation = $("#relationship").val();
    let phone = $("#phone").val();
    let occupation = $("#occupation").val();
    let aadhaar = $("#aadhaar").val();

    // Validation
    let error = false;
    $(".text-red-500").addClass("hidden");

    if (!name) { $("#err-name").text("Name required").removeClass("hidden"); error = true; }
    if (!dob) { $("#err-dob").text("DOB required").removeClass("hidden"); error = true; }
    if (!relation) { $("#err-relationship").text("Select relationship").removeClass("hidden"); error = true; }
    if (phone && phone.length !== 10) { $("#err-phone").text("Invalid phone").removeClass("hidden"); error = true; }
    if (aadhaar && aadhaar.length !== 12) { $("#err-aadhaar").text("Invalid Aadhaar").removeClass("hidden"); error = true; }

    if (error) return;

    let rowData = `
      <tr>
        <td class="p-2"></td>
        <td class="p-2">${name}</td>
        <td class="p-2">${dob}</td>
        <td class="p-2">${age}</td>
        <td class="p-2">${relation}</td>
        <td class="p-2">${phone}</td>
        <td class="p-2">${occupation}</td>
        <td class="p-2">${aadhaar}</td>
        <td class="p-2 text-center">
          <button type="button" class="text-blue-600 edit">Edit</button>
          <button type="button" class="text-red-600 ml-3 delete">Delete</button>
        </td>
      </tr>
    `;

    if (editIndex === -1) {
      $("#familyBody").append(rowData);
    } else {
      $("#familyBody tr").eq(editIndex).replaceWith(rowData);
      editIndex = -1;
    }

    updateSno();
    toggleSavedHeader();
    clearFields();
  });

  function updateSno() {
    $("#familyBody tr").each(function (i) {
      $(this).find("td").first().text(i + 1);
    });
  }

  function clearFields() {
    $("input, select").val("");
    $("#age").val("");
  }

  $("#familyBody").on("click", ".delete", function () {
    $(this).closest("tr").remove();
    updateSno();
    toggleSavedHeader();
  });

  $("#familyBody").on("click", ".edit", function () {
    let tr = $(this).closest("tr");
    editIndex = tr.index();

    $("#name").val(tr.find("td").eq(1).text());
    $("#dob").val(tr.find("td").eq(2).text());
    $("#age").val(tr.find("td").eq(3).text());
    $("#relationship").val(tr.find("td").eq(4).text());
    $("#phone").val(tr.find("td").eq(5).text());
    $("#occupation").val(tr.find("td").eq(6).text());
    $("#aadhaar").val(tr.find("td").eq(7).text());
  });







// ---------------------
// CLIENT FORM LOGIC
// ---------------------
// ---------------------
$(document).ready(function () {
   const staffForm = document.getElementById("staffForm");
   const saveBtn = document.getElementById("saveBtn");
   const cancelBtn = document.getElementById("cancelBtn");

   // Check if elements exist
   if (!staffForm || !saveBtn || !cancelBtn) {
       console.error("Form elements not found");
       return;
   }

   // Updated fields configuration
   const fields = [
       { id: "clientName", label: "Client Name", type: "text" },
       { id: "phoneNumber", label: "Phone Number", type: "phone", digits: 10 },
       { id: "addressLine1", label: "Address Line 1", type: "text" },
       { id: "addressLine2", label: "Address Line 2", type: "text", required: false },
       { id: "district", label: "District", type: "text" },
       { id: "state", label: "State", type: "select" },
       { id: "pincode", label: "Pincode", type: "phone", digits: 6 },
       { id: "email", label: "Email", type: "email" }
   ];

   // Helper functions
   function showError(input, errorEl, msg) {
       if (!errorEl) return;
       errorEl.textContent = msg;
       errorEl.classList.remove("hidden");
       if (input) {
           input.classList.add("border-red-500");
       }
   }

   function hideError(input, errorEl) {
       if (!errorEl) return;
       errorEl.classList.add("hidden");
       if (input) {
           input.classList.remove("border-red-500");
       }
   }

   // Validation function
   function validateField(field) {
       const input = document.getElementById(field.id);
       const errorEl = document.getElementById("error-" + field.id);
       
       if (!input || !errorEl) {
           console.warn(`Field ${field.id} or error element not found`);
           return true; // Skip validation if element doesn't exist
       }

       const val = input.value.trim();

       if (val === "" && field.required !== false) {
           showError(input, errorEl, `${field.label} is required`);
           return false;
       }

       if (field.type === "email" && val !== "") {
           const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
           if (!emailPattern.test(val)) {
               showError(input, errorEl, `${field.label} is not valid`);
               return false;
           }
       }

       if (field.type === "phone" && val !== "") {
           if (!/^\d+$/.test(val)) {
               showError(input, errorEl, `${field.label} must contain only digits`);
               return false;
           }
           if (val.length !== field.digits) {
               showError(input, errorEl, `${field.label} must be ${field.digits} digits`);
               return false;
           }
       }

       if (field.type === "select" && val === "" && field.required !== false) {
           showError(input, errorEl, `${field.label} is required`);
           return false;
       }

       hideError(input, errorEl);
       return true;
   }

   // Real-time input handling
   fields.forEach(field => {
       const input = document.getElementById(field.id);
       const errorEl = document.getElementById("error-" + field.id);

       if (!input || !errorEl) return;

       // Remove error while typing/selecting
       if (field.type === "select") {
           input.addEventListener("change", () => hideError(input, errorEl));
       } else {
           input.addEventListener("input", () => hideError(input, errorEl));
       }

       // Restrict phone input
       if (field.type === "phone") {
           input.addEventListener("input", () => {
               input.value = input.value.replace(/\D/g, '').slice(0, field.digits);
           });
       }
   });

   // Save button handler
   saveBtn.addEventListener("click", (e) => {
       e.preventDefault(); // Prevent form submission if any
       let isValid = true;

       // Validate all fields
       fields.forEach(field => {
           if (!validateField(field)) {
               isValid = false;
           }
       });

       if (!isValid) {
           console.log("Validation failed");
           return;
       }

       // Collect form data
       const formData = {};
       fields.forEach(field => {
           const input = document.getElementById(field.id);
           if (input) {
               formData[field.id] = input.value.trim();
           }
       });
       console.log("Form Data:", formData);
   });






   // Cancel button
   cancelBtn.addEventListener("click", () => {
       if (confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
           staffForm.reset();
           fields.forEach(field => {
               const input = document.getElementById(field.id);
               const errorEl = document.getElementById("error-" + field.id);
               if (input && errorEl) {
                   hideError(input, errorEl);
               }
           });
       }
   });
});



 