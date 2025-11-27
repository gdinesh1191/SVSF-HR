
$(document).ready(function () {

    // Initialize staff date of birth with Flowbite datepicker
    const staffDobInput = document.getElementById('staffDob');
    if (staffDobInput && typeof Datepicker !== 'undefined') {
        const datepicker = new Datepicker(staffDobInput, {
            format: 'dd/mm/yyyy',
            maxDate: new Date(),
            autohide: true,
            orientation: 'bottom'
        });

        // Listen for date change
        staffDobInput.addEventListener('changeDate', function (e) {
            calculateStaffAge();
        });
    }

    // Calculate age when user types date manually
    $("#staffDob").on('change blur', function () {
        calculateStaffAge();
    });

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
    $("#dob").on("change", function () {
        calculateAge();
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


function calculateStaffAge() {
    let dobStr = $("#staffDob").val().trim();
    if (!dobStr) {
        $("#staffAge").val("");
        return;
    }

    // Parse dd/mm/yyyy format
    let parts = dobStr.split('/');
    if (parts.length !== 3) {
        $("#staffAge").val("");
        return;
    }

    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    let year = parseInt(parts[2], 10);

    let birth = new Date(year, month, day);

    // Validate date
    if (isNaN(birth.getTime()) ||
        birth.getDate() !== day ||
        birth.getMonth() !== month ||
        birth.getFullYear() !== year) {
        $("#staffAge").val("");
        return;
    }

    let today = new Date();

    // Check if date is in the future
    if (birth > today) {
        $("#staffAge").val("");
        return;
    }

    let age = today.getFullYear() - birth.getFullYear();
    let monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    $("#staffAge").val(age >= 0 ? age : "");
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
        <td class="p-2 border-r border-b border-[#ebeff3]"></td>
        <td class="p-2 border-r border-b border-[#ebeff3]">${name}</td>
        <td class="p-2 border-r border-b border-[#ebeff3]">${dob}</td>
        <td class="p-2 border-r border-b border-[#ebeff3]">${age}</td>
        <td class="p-2 border-r border-b border-[#ebeff3]">${relation}</td>
        <td class="p-2 border-r border-b border-[#ebeff3]">${phone}</td>
        <td class="p-2 border-r border-b border-[#ebeff3]">${occupation}</td>
        <td class="p-2 border-r border-b border-[#ebeff3]">${aadhaar}</td>
        <td class="p-2 border-b border-[#ebeff3] text-center">
          <button type="button" class="text-blue-600 edit ">
    <i class="ri-edit-2-line text-base"></i>
</button>

<button type="button" class="text-red-500 ml-3 delete ">
    <i class="ri-delete-bin-line text-base"></i>
</button>

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

let uploadedFiles = [];

// Format file size
function formatSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, i)).toFixed(2) + " " + sizes[i];
}

// Render table rows
function renderFiles() {
  const search = $("#searchInput").val().toLowerCase();
  const tbody = $("#fileTableBody");
  tbody.html("");

  const filtered = uploadedFiles.filter(f => f.name.toLowerCase().includes(search));

  $("#fileCount").text(uploadedFiles.length);

  if (filtered.length === 0) {
    tbody.append(`
      <tr class="table w-full">
        <td colspan="5" class="text-center py-6 text-gray-500">
          No files found.
        </td>
      </tr>
    `);
    return;
  }

  filtered.forEach(file => {
    tbody.append(`
      <tr class=" w-full border-b border-[#ebeff3] hover:bg-gray-50" data-id="${file.id}">
        
        <td class="px-2 py-2 border-r border-[#ebeff3]">
            <span class="file-name">${file.name}</span>
            <input type="text" class="rename-input hidden form-control" value="${file.name}">
        </td>

        <td class="px-2 py-2 border-r border-[#ebeff3]">${file.size}</td>
        <td class="px-2 py-2 border-r border-[#ebeff3]">${file.lastModified}</td>

        <td class="px-2 py-2 border-r border-[#ebeff3]">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-semibold">U</div>
            <span>Current User</span>
          </div>
        </td>

        <td class="px-2 py-2 text-center">
          <button class="delete-btn text-red-500 hover:text-red-700">
            <i class="ri-delete-bin-line"></i>
          </button>
        </td>

      </tr>
    `);
  });
}

// Open modal
$("#uploadBtn").click(function () {
  $("#attachmentModal").removeClass("hidden");
});

// Close when clicking the close button
$("#closeModalBtn").click(function (e) {
    e.stopPropagation();
    $("#attachmentModal").addClass("hidden");
});

// Close when clicking outside (backdrop)
$("#attachmentModal").click(function (e) {
    if (e.target === this) {
        $("#attachmentModal").addClass("hidden");
    }
});


// Clicking upload box triggers input
$("#uploadBox").click(() => $("#hiddenFileInput").click());

// Handle upload
$("#hiddenFileInput").on("change", function () {
  const files = this.files;

  Array.from(files).forEach(file => {
    uploadedFiles.push({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: formatSize(file.size),
      lastModified: new Date().toLocaleDateString(),
      file: file
    });
  });

  this.value = "";
  renderFiles();
});

// Search
$("#searchInput").on("keyup", renderFiles);

// Delete
$(document).on("click", ".delete-btn", function () {
  const id = $(this).closest("tr").data("id");
  uploadedFiles = uploadedFiles.filter(f => f.id !== id);
  renderFiles();
});

// Rename toggle
$(document).on("click", ".edit-btn", function () {
  const row = $(this).closest("tr");
  row.find(".file-name").addClass("hidden");
  row.find(".rename-input").removeClass("hidden").focus();
});

// Save rename on blur
$(document).on("blur", ".rename-input", function () {
  const row = $(this).closest("tr");
  const id = row.data("id");
  const newName = $(this).val().trim();

  if (newName) {
    uploadedFiles = uploadedFiles.map(f => f.id === id ? { ...f, name: newName } : f);
  }

  renderFiles();
});


});



