// Import Staff Modal Component - Plain JavaScript
// Full implementation with all 4 steps matching Next.js version
(function () {
  "use strict";

  // Destination fields configuration
  const destinationFieldsConfig = {
    personal: [
      { value: "salutation", label: "salutation" },
      { value: "staff_name", label: "Staff Name" },
      { value: "dob", label: "Date of Birth" },
      { value: "gender", label: "Gender" },
      { value: "marital_status", label: "Marital Status" },
      { value: "staff_designation", label: "Designation" },
      { value: "device_id", label: "Employee Code" },
      { value: "group", label: "Department Master" },
      { value: "section", label: "Sub-Department Master" },
      { value: "shift", label: "Shift Master" },
      { value: "groupName", label: "Group Name" },
    ],
    contact: [
      { value: "email", label: "E-mail ID" },
      { value: "phone_number", label: "Phone Number" },
      { value: "company_number", label: "Company Number" },
    ],
    family: [
      { value: "name", label: "Name" },
      { value: "age", label: "Age" },
      { value: "fdob", label: "Date of Birth" },
      { value: "relationship", label: "Relationship Type" },
      { value: "phone", label: "Phone Number" },
      { value: "occupation", label: "Occupation" },
      { value: "aadhar", label: "Aadhar Number" },
    ],
    address: [
      { value: "address_line_1", label: "Address Line 1" },
      { value: "address_line_2", label: "Address Line 2" },
      { value: "address_pin_code", label: "Pincode" },
      { value: "address_taluk", label: "Taulk" },
      { value: "address_district", label: "District" },
      { value: "address_state", label: "State" },
    ],
    bank: [
      { value: "bank", label: "Bank Name" },
      { value: "bank_account_number", label: "Account Number " },
      { value: "ifsc_code", label: "IFSC Code" },
      { value: "bank_branch_name", label: "Branch Name" },
    ],
    esi_pf: [
      { value: "esi_no", label: "ESI Number" },
      { value: "esi_branch", label: "ESI Branch" },
      { value: "uan_no", label: "UAN Number" },
    ],
    proof_details: [
      { value: "aadhaar_no", label: "Aadhaar Number" },
      { value: "pan_no", label: "PAN Number" },
    ],
    other: [
      { value: "no_of_children", label: "Number of Children" },
      { value: "qualification", label: "Qualification" },
      { value: "date_of_join", label: "Date of Joining" },
    ],
  };

  const categories = [
    {
      id: "personal",
      title: "Personal Details",
      description: "Name, Gender, DOB",
      icon: "ri-user-line",
      color: "text-blue-600",
    },
    {
      id: "contact",
      title: "Contact Details",
      description: "Name, Email, Phone Number",
      icon: "ri-group-line",
      color: "text-purple-600",
    },
    {
      id: "family",
      title: "Family Info",
      description: "Name, Age, Relationship Type",
      icon: "ri-heart-line",
      color: "text-pink-600",
    },
    {
      id: "address",
      title: "Address Details",
      description: "Street, City, Pincode",
      icon: "ri-map-pin-line",
      color: "text-red-600",
    },
    {
      id: "bank",
      title: "Bank Details",
      description: "Account Number, Bank Name",
      icon: "ri-bank-line",
      color: "text-fuchsia-600",
    },
    {
      id: "esi_pf",
      title: "ESI & PF Details",
      description: "ESI number, PF UAN, Nominations",
      icon: "ri-bar-chart-line",
      color: "text-amber-600",
    },
    {
      id: "proof_details",
      title: "Proof Details",
      description: "Aadhaar, PAN, Passport",
      icon: "ri-passport-line",
      color: "text-indigo-600",
    },
    {
      id: "other",
      title: "Other Details",
      description: "Custom or Miscellaneous Data",
      icon: "ri-file-text-line",
      color: "text-teal-600",
    },
  ];

  const importModalStore = {
    isOpen: false,
    currentStep: 1,
    selectedCategory: "",
    uploadedFile: null,
    actualExcelColumns: [],
    columnMappings: {},
    csvData: [],
    mappedCount: 0,
    fileError: null,
    finalJson: null,
  };

  const steps = [
    { number: 1, title: "Select Category", subtitle: "Choose data type" },
    { number: 2, title: "Upload File", subtitle: "Select Excel file" },
    { number: 3, title: "Map Columns", subtitle: "Match your data" },
    { number: 4, title: "Confirm", subtitle: "Review & import" },
  ];

  function getDestinationFields() {
    return destinationFieldsConfig[importModalStore.selectedCategory] || [];
  }

  function calculateMappedCount() {
    importModalStore.mappedCount = Object.keys(importModalStore.columnMappings).filter(
      (key) => importModalStore.columnMappings[key] !== ""
    ).length;
  }

  function resetMappings() {
    importModalStore.columnMappings = {};
    calculateMappedCount();
  }

  function getAvailableFieldsForColumn(currentColumn) {
    const allFields = getDestinationFields();
    const usedValues = Object.entries(importModalStore.columnMappings)
      .filter(([column, value]) => column !== currentColumn && value !== "")
      .map(([column, value]) => value);
    return allFields.filter((field) => !usedValues.includes(field.value));
  }

  function getDestinationFieldLabel(value) {
    const allFields = getDestinationFields();
    const field = allFields.find((f) => f.value === value);
    return field ? field.label : value;
  }

  function canContinue() {
    switch (importModalStore.currentStep) {
      case 1:
        return importModalStore.selectedCategory !== "";
      case 2:
        return importModalStore.uploadedFile !== null && importModalStore.actualExcelColumns.length > 0;
      case 3:
        const hasEmployeeCodeMapping = Object.values(importModalStore.columnMappings).includes("device_id");
        return hasEmployeeCodeMapping;
      case 4:
        return true;
      default:
        return false;
    }
  }

  function generateFinalJson() {
    const mappedDataArray = [];

    if (importModalStore.csvData.length > 0) {
      importModalStore.csvData.forEach((row) => {
        const newRow = {};
        Object.keys(importModalStore.columnMappings).forEach((excelColumn) => {
          const destinationFieldKey = importModalStore.columnMappings[excelColumn];
          if (destinationFieldKey) {
            newRow[destinationFieldKey] = row[excelColumn] || "";
          }
        });
        mappedDataArray.push(newRow);
      });
    }

    importModalStore.finalJson = mappedDataArray;
    return mappedDataArray;
  }

  function show() {
    importModalStore.isOpen = true;
    importModalStore.currentStep = 1;
    importModalStore.selectedCategory = "";
    importModalStore.uploadedFile = null;
    importModalStore.actualExcelColumns = [];
    importModalStore.columnMappings = {};
    importModalStore.csvData = [];
    importModalStore.mappedCount = 0;
    importModalStore.fileError = null;
    importModalStore.finalJson = null;
    renderImportModal();
  }

  function hide() {
    importModalStore.isOpen = false;
    $("#importStaffModal").remove();
  }

  function renderImportModal() {
    if (!importModalStore.isOpen) {
      $("#importStaffModal").remove();
      return;
    }

    const modalHtml = `
      <div id="importStaffModal" class="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
        <div class="bg-white rounded-lg w-full max-w-6xl max-h-[98vh] shadow-xl overflow-hidden flex flex-col">
          <div class="flex justify-between items-center border-b px-6 py-3">
            <h1 class="text-lg text-[#151519] text-center">Import Staff Details</h1>
            <button id="importClose" class="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>
          <div class="p-6 overflow-y-auto flex-1 max-h-[calc(95vh-100px)]">
            ${renderStepIndicator()}
            <div id="importStepContent">
              ${renderCurrentStep()}
            </div>
          </div>
          <div class="px-6 py-4 flex justify-between border-t">
            <div>
              ${importModalStore.currentStep > 1 ? `
                <button id="importPrevBtn" class="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                  <i class="ri-arrow-left-line mr-2"></i> Back
                </button>
              ` : ""}
            </div>
            <div>
              ${importModalStore.currentStep < 4 ? `
                <button id="importNextBtn" class="flex items-center px-6 py-2 text-sm font-medium rounded-md ${
                  canContinue()
                    ? "text-white bg-[#009333] hover:bg-[#007a2a] cursor-pointer"
                    : "text-[#fff] bg-[#9bc6ad] cursor-not-allowed"
                }">
                  Continue <i class="ri-arrow-right-line ml-2"></i>
                </button>
              ` : `
                <button id="importFinalBtn" class="flex items-center px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md cursor-pointer">
                  <i class="ri-download-line mr-2"></i> Import Data
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `;

    $("#importStaffModal").remove();
    $("body").append(modalHtml);
    bindImportModalEvents();
  }

  function renderStepIndicator() {
    return `
      <div class="flex items-center justify-center mb-8">
        ${steps.map((step, index) => `
          <div class="flex flex-col items-center">
            <div class="w-10 h-10 border-2 rounded-full flex items-center justify-center text-gray-400 font-semibold ${
              step.number < importModalStore.currentStep
                ? "bg-[#009333] text-white border-[#009333]"
                : step.number === importModalStore.currentStep
                ? "bg-[#009333] text-white border-[#009333]"
                : "bg-[#F9F9FA] border-[hsl(240_5%_84%)]"
            }">
              ${step.number < importModalStore.currentStep ? '<i class="ri-check-line text-xl"></i>' : step.number}
            </div>
            <div class="text-center mt-2 space-y-1">
              <div class="text-sm font-medium ${
                step.number < importModalStore.currentStep
                  ? "text-[#151519]"
                  : step.number === importModalStore.currentStep
                  ? "text-black"
                  : "text-[#71717A]"
              }">
                ${step.title}
              </div>
              <div class="text-xs text-[#71717A]">${step.subtitle}</div>
            </div>
          </div>
          ${index < steps.length - 1 ? `
            <div class="w-16 h-0.5 mx-4 ${
              step.number < importModalStore.currentStep ? "bg-[#009333]" : "bg-gray-300"
            }"></div>
          ` : ""}
        `).join("")}
      </div>
    `;
  }

  function renderCurrentStep() {
    switch (importModalStore.currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return renderStep1();
    }
  }

  function renderStep1() {
    return `
      <div class="text-center">
        <h2 class="text-xl text-black mb-1.5">Select Data Category</h2>
        <p class="text-[#71717A] mb-8">Choose the type of data you want to import</p>
        <div class="grid grid-cols-4 gap-4 px-10 mx-auto">
          ${categories.map((category) => `
            <div
              class="p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                importModalStore.selectedCategory === category.id
                  ? "border-[#009333]"
                  : "border-gray-200 hover:border-[#66C699]"
              } flex flex-col items-center justify-center h-48 category-option"
              data-category-id="${category.id}"
            >
              <div class="flex justify-center items-center w-12 h-12 rounded-full ${
                importModalStore.selectedCategory === category.id
                  ? "bg-[#e6fcf0]"
                  : "bg-[#F4F4F5]"
              } mb-2">
                <i class="${category.icon} text-[20px] ${
                  importModalStore.selectedCategory === category.id
                    ? "text-[#009333]"
                    : category.color
                }"></i>
              </div>
              <h3 class="text-black mb-1 text-lg">${escapeHtml(category.title)}</h3>
              <p class="text-sm text-gray-600 text-center">${escapeHtml(category.description)}</p>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderStep2() {
    const requiredColumns = getDestinationFields();
    const selectedCategoryData = categories.find((cat) => cat.id === importModalStore.selectedCategory);

    return `
      <div class="px-10 mx-auto max-w-4xl">
        <div class="text-center mb-8">
          <h2 class="text-xl text-black mb-1.5">Upload Excel File</h2>
          <p class="text-[#71717A]">Select or drag and drop your Excel file to continue</p>
        </div>
        ${selectedCategoryData ? `
          <div class="bg-[#e5e7eb4c] border border-[#e5e7eb80] rounded-lg p-4 mb-6">
            <h4 class="text-[16px] font-medium text-[#009333] mb-2">
              For '${escapeHtml(selectedCategoryData.title)}' category, your Excel file should contain columns for:
            </h4>
            <ul class="text-[15px] text-[#22252a] flex flex-wrap gap-x-4 gap-y-2">
              ${requiredColumns.length > 0 ? requiredColumns.map((field, index) => `
                <li class="list-none">${index + 1}) ${escapeHtml(field.label)}</li>
              `).join("") : '<li class="list-none">No specific columns defined for this category.</li>'}
            </ul>
          </div>
        ` : ""}
        ${!importModalStore.uploadedFile ? `
          <div class="border-2 border-dashed border-gray-400 rounded-lg p-10 text-center">
            <div class="flex justify-center mb-4">
              <div class="bg-[#e6fcf0] text-[#009333] flex justify-center items-center w-16 h-16 rounded-full">
                <i class="ri-upload-2-line text-3xl"></i>
              </div>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-1">Upload Excel File</h3>
            <p class="text-gray-600 mb-4">click the below button to select (.csv files only)</p>
            <input type="file" accept=".csv" id="file-upload" class="hidden" />
            <label for="file-upload" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#009333] hover:bg-[#007a2a] cursor-pointer">
              Choose File
            </label>
            ${importModalStore.fileError ? `
              <p class="mt-2 text-sm text-red-600" role="alert">${escapeHtml(importModalStore.fileError)}</p>
            ` : ""}
          </div>
        ` : `
          <div class="border-2 border-dashed border-gray-400 rounded-lg p-10 text-center">
            <div class="flex justify-center mb-4">
              <div class="bg-[#e6fcf0] text-[#009333] flex justify-center items-center w-16 h-16 rounded-full">
                <i class="ri-check-line text-3xl"></i>
              </div>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-1">File Selected</h3>
            <p class="text-gray-600 mb-4">
              ${escapeHtml(importModalStore.uploadedFile.name)} (${(importModalStore.uploadedFile.size / (1024 * 1024)).toFixed(2)} MB)
            </p>
            <button id="chooseDifferentFile" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              Choose Different File
            </button>
          </div>
        `}
      </div>
    `;
  }

  function renderStep3() {
    calculateMappedCount();
    const selectedCategoryData = categories.find((cat) => cat.id === importModalStore.selectedCategory);

    return `
      <div class="px-10 mx-auto">
        <div class="text-center">
          <h2 class="text-xl text-black mb-1.5">Map Your Columns</h2>
          <p class="text-[#71717A] mb-6">Match your Excel columns to the appropriate destination fields</p>
        </div>
        <div class="flex items-center justify-between mb-4">
          <div class="flex space-x-4 text-xs">
            <span class="text-[#157F3c] py-1 px-3 bg-[#157F3C1A] rounded-full font-medium">
              ${importModalStore.mappedCount} Mapped
            </span>
            <span class="text-[#F59F0A] py-1 px-3 rounded-full bg-[#F59F0A1A] font-medium">
              ${importModalStore.actualExcelColumns.length - importModalStore.mappedCount} Unmapped
            </span>
          </div>
          <div class="flex space-x-4">
            <button id="resetMappings" class="flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
              <i class="ri-restart-line mr-2"></i> Reset
            </button>
          </div>
        </div>
        <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div class="px-6 py-3 border-b border-gray-200 flex items-center bg-gray-50 space-x-4">
            <h3 class="text-lg font-medium text-gray-900">Column Mapping</h3>
            <p class="text-sm text-teal-600 py-1 px-3 border border-gray-300 rounded-full font-medium">
              ${selectedCategoryData ? escapeHtml(selectedCategoryData.title) : "Selected Category"} Fields
            </p>
            <p class="text-left align-left">Employee code is mandatory to select</p>
          </div>
          <div class="divide-y divide-gray-200 max-h-[calc(100vh-185px)] overflow-y-auto">
            ${importModalStore.actualExcelColumns.length > 0 ? importModalStore.actualExcelColumns.map((column) => {
              const availableFields = getAvailableFieldsForColumn(column.name);
              const currentMapping = importModalStore.columnMappings[column.name] || "";
              
              return `
                <div class="px-6 py-2 flex items-center w-full">
                  <div class="flex items-center w-[45%]">
                    <div>
                      <div class="font-medium text-[#12375D] mb-0.5">${escapeHtml(column.name)}</div>
                    </div>
                  </div>
                  <div class="w-[10%] flex justify-center">
                    <i class="ri-arrow-right-long-line text-gray-400"></i>
                  </div>
                  <div class="w-[45%] flex justify-end">
                    <select
                      class="block w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#009333] sm:text-sm column-mapping-select"
                      data-column-name="${escapeHtml(column.name)}"
                    >
                      <option value="">Select destination field</option>
                      ${availableFields.map((field) => `
                        <option value="${escapeHtml(field.value)}" ${currentMapping === field.value ? "selected" : ""}>
                          ${escapeHtml(field.label)}
                        </option>
                      `).join("")}
                      ${currentMapping && !availableFields.some((f) => f.value === currentMapping) ? `
                        <option value="${escapeHtml(currentMapping)}" selected>
                          ${escapeHtml(getDestinationFieldLabel(currentMapping))}
                        </option>
                      ` : ""}
                    </select>
                  </div>
                </div>
              `;
            }).join("") : `
              <div class="p-6 text-center text-gray-500">
                Please upload an Excel file in Step 2 to see columns here.
              </div>
            `}
          </div>
        </div>
        ${importModalStore.actualExcelColumns.length - importModalStore.mappedCount > 0 ? `
          <div class="p-4 bg-yellow-50 border border-[#f59f0a] rounded-lg mt-4 border-[#f59f0a0d]">
            <div class="flex items-start">
              <i class="ri-alert-line text-yellow-600 mr-3 text-xl"></i>
              <div>
                <h4 class="text-md font-medium text-black">Unmapped Columns</h4>
                <p class="text-sm text-[#71717A]">
                  ${importModalStore.actualExcelColumns.length - importModalStore.mappedCount} column(s) will be skipped during import. You can continue or map them to destination fields.
                </p>
              </div>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderStep4() {
    const selectedCategoryData = categories.find((cat) => cat.id === importModalStore.selectedCategory);
    
    if (!importModalStore.finalJson) {
      generateFinalJson();
    }

    return `
      <div class="px-10 mx-auto max-h-[calc(95vh-100px)]">
        <div class="text-center">
          <h2 class="text-xl text-black mb-1.5">Confirm Import</h2>
          <p class="text-[#71717A] mb-6">Review your settings before importing the data</p>
        </div>
        <div class="p-4 border border-gray-200 rounded-lg">
          <div class="flex items-center mb-6">
            <h2 class="text-xl text-black">Import Summary</h2>
            <span class="ml-3 px-3 py-1 bg-[#157f3c1a] text-[#157f3c] text-xs font-medium rounded">
              ${selectedCategoryData ? escapeHtml(selectedCategoryData.title) : ""}
            </span>
          </div>
          <div class="bg-[#f9f9fa] rounded-lg py-3 px-4 mb-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-[#157f3c1a] rounded-lg flex items-center justify-center mr-3">
                  <i class="ri-file-excel-2-line text-[#157f3c] text-lg"></i>
                </div>
                <div>
                  <div class="font-medium text-black text-sm">
                    ${importModalStore.uploadedFile ? escapeHtml(importModalStore.uploadedFile.name) : "No file uploaded"}
                  </div>
                  <div class="text-xs text-gray-500">
                    ${importModalStore.uploadedFile ? (importModalStore.uploadedFile.size / (1024 * 1024)).toFixed(2) + " MB" : "0.00 MB"}
                  </div>
                </div>
              </div>
              <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">CSV File</span>
            </div>
          </div>
          <div class="bg-white border border-gray-200 rounded-lg overflow-hidden mb-4">
            <div class="px-6 py-2 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <div>
                <div class="font-medium text-black mb-0.5">Column Mappings</div>
                <div class="text-xs text-gray-500">${importModalStore.mappedCount} column(s) will be imported</div>
              </div>
            </div>
            <div class="divide-y divide-gray-200 max-h-[300px] overflow-y-auto">
              ${getDestinationFields().map((field) => {
                const excelCol = Object.entries(importModalStore.columnMappings).find(
                  ([col, val]) => val === field.value
                )?.[0];
                
                return `
                  <div class="px-6 py-2 flex items-center w-full">
                    <div class="w-[45%] font-medium text-[#12375D]">${escapeHtml(field.label)}</div>
                    <div class="w-[10%] flex justify-center">
                      <i class="ri-arrow-right-long-line text-gray-400"></i>
                    </div>
                    <div class="w-[45%] text-sm text-gray-900 font-medium">
                      ${excelCol ? escapeHtml(excelCol) : '<span class="text-gray-400 italic">Not mapped</span>'}
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
          ${importModalStore.finalJson ? `
            <div class="bg-gray-50 border rounded-lg p-4 mb-4">
              <h3 class="text-sm font-medium text-gray-900 mb-2">JSON Preview</h3>
              <pre class="bg-white p-3 rounded-md text-xs overflow-x-auto border max-h-[300px] overflow-y-auto">${JSON.stringify(importModalStore.finalJson.slice(0, 5), null, 2)}</pre>
            </div>
          ` : ""}
          <div class="bg-[#157f3c0d] border border-[#157f3c33] rounded-lg p-4">
            <div class="flex items-start">
              <i class="ri-file-check-line text-[#009333] text-lg mr-2"></i>
              <div>
                <h4 class="text-sm text-black">Ready to Import</h4>
                <p class="text-sm text-[#71717a]">
                  Your data will be imported to the ${selectedCategoryData ? selectedCategoryData.title.toLowerCase() : "personal details"} section. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function handleFileUpload(file) {
    if (!file) {
      importModalStore.fileError = null;
      importModalStore.uploadedFile = null;
      importModalStore.actualExcelColumns = [];
      importModalStore.csvData = [];
      resetMappings();
      return;
    }

    const allowedExtensions = ["csv"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";

    if (!allowedExtensions.includes(fileExtension)) {
      importModalStore.fileError = "Please upload a valid CSV file.";
      importModalStore.uploadedFile = null;
      importModalStore.actualExcelColumns = [];
      importModalStore.csvData = [];
      resetMappings();
      renderImportModal();
      return;
    }

    importModalStore.fileError = null;
    importModalStore.uploadedFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split(/\r\n|\n|\r/).filter((line) => line.trim() !== "");
      const headersLine = lines[0]?.replace(/^\uFEFF/, "") || "";
      
      let delimiter = ",";
      if (headersLine.includes(";")) {
        delimiter = ";";
      } else if (headersLine.includes("\t")) {
        delimiter = "\t";
      }

      const headers = headersLine.split(delimiter).map((h) => h.trim());
      const parsedColumns = headers.map((header, index) => ({
        id: index,
        name: header,
      }));

      const rows = lines.slice(1).map((line) => {
        const values = line.split(delimiter).map((v) => v.trim());
        const rowObj = {};
        headers.forEach((header, idx) => {
          rowObj[header] = values[idx] || "";
        });
        return rowObj;
      });

      importModalStore.actualExcelColumns = parsedColumns;
      importModalStore.csvData = rows;
      resetMappings();
      renderImportModal();
    };

    reader.readAsText(file);
  }

  function handleColumnMapping(excelColumn, destinationFieldValue) {
    const newMappings = { ...importModalStore.columnMappings };
    
    if (destinationFieldValue === "") {
      delete newMappings[excelColumn];
    } else {
      const existingMappingForValue = Object.entries(newMappings).find(
        ([col, val]) => val === destinationFieldValue && col !== excelColumn
      );
      if (existingMappingForValue) {
        delete newMappings[existingMappingForValue[0]];
      }
      newMappings[excelColumn] = destinationFieldValue;
    }
    
    importModalStore.columnMappings = newMappings;
    calculateMappedCount();
    renderImportModal();
  }

  function bindImportModalEvents() {
    // Close modal
    $(document)
      .off("click", "#importClose")
      .on("click", "#importClose", hide);

    $(document)
      .off("click", "#importStaffModal")
      .on("click", "#importStaffModal", function (e) {
        if (e.target === this) {
          hide();
        }
      });

    // Step 1: Category selection
    $(document)
      .off("click", ".category-option")
      .on("click", ".category-option", function () {
        const categoryId = $(this).data("category-id");
        importModalStore.selectedCategory = categoryId;
        renderImportModal();
      });

    // Step 2: File upload
    $(document)
      .off("change", "#file-upload")
      .on("change", "#file-upload", function (e) {
        const file = e.target.files?.[0];
        handleFileUpload(file);
      });

    $(document)
      .off("click", "#chooseDifferentFile")
      .on("click", "#chooseDifferentFile", function () {
        handleFileUpload(null);
        $("#file-upload").val("");
      });

    // Step 3: Column mapping
    $(document)
      .off("change", ".column-mapping-select")
      .on("change", ".column-mapping-select", function () {
        const columnName = $(this).data("column-name");
        const destinationValue = $(this).val();
        handleColumnMapping(columnName, destinationValue);
      });

    // Reset mappings
    $(document)
      .off("click", "#resetMappings")
      .on("click", "#resetMappings", function () {
        resetMappings();
        renderImportModal();
      });

    // Navigation
    $(document)
      .off("click", "#importPrevBtn")
      .on("click", "#importPrevBtn", function () {
        if (importModalStore.currentStep > 1) {
          importModalStore.currentStep--;
          renderImportModal();
        }
      });

    $(document)
      .off("click", "#importNextBtn")
      .on("click", "#importNextBtn", function () {
        if (canContinue() && importModalStore.currentStep < 4) {
          if (importModalStore.currentStep === 3) {
            generateFinalJson();
          }
          importModalStore.currentStep++;
          renderImportModal();
        }
      });

    $(document)
      .off("click", "#importFinalBtn")
      .on("click", "#importFinalBtn", function () {
        generateFinalJson();
        
        // Here you would typically make an API call to import the data
        if (typeof showToast === "function") {
          showToast(`Successfully imported ${importModalStore.finalJson.length} records!`, "success");
        } else {
          alert(`Successfully imported ${importModalStore.finalJson.length} records!`);
        }
        
        hide();
      });
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return str;
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return str.replace(/[&<>"']/g, (m) => map[m]);
  }

  // Export module
  window.importStaffModal = {
    show,
    hide,
    getStore: () => importModalStore,
  };
})();
