// Profile Modal Component - Plain JavaScript
// Full implementation with all tabs and content
(function () {
  "use strict";

  const profileModalStore = {
    isOpen: false,
    selectedStaff: null,
    activeTab: "profile",
    shiftFromDate: "",
    shiftToDate: "",
    showNewShift: false,
    shiftRequestForm: {
      fromDate: "",
      toDate: "",
      shiftName: "",
      shiftInTime: "",
      shiftOutTime: "",
      remarks: "",
    },
    shiftFormErrors: {},
    showShiftValidationModal: false,
    showDropdown: false,
    date: undefined,
  };

  // Dummy data for users in remarks section
  const dummyUsers = [
    { id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Jane Smith", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: 3, name: "Alice Johnson", avatar: "https://i.pravatar.cc/40?img=3" },
  ];

  function show(staffMember) {
    profileModalStore.selectedStaff = staffMember;
    profileModalStore.isOpen = true;
    profileModalStore.activeTab = "profile";
    profileModalStore.showNewShift = false;
    profileModalStore.shiftRequestForm = {
      fromDate: "",
      toDate: "",
      shiftName: "",
      shiftInTime: "",
      shiftOutTime: "",
      remarks: "",
    };
    profileModalStore.shiftFormErrors = {};
    renderProfileModal();
  }

  function hide() {
    profileModalStore.isOpen = false;
    renderProfileModal();
  }

  function renderProfileModal() {
    if (!profileModalStore.isOpen || !profileModalStore.selectedStaff) {
      $("#profileModal").remove();
      return;
    }

    const selectedStaff = profileModalStore.selectedStaff;
    const modalHtml = `
      <div id="profileModal" class="fixed inset-0 z-50 flex justify-end transition-opacity duration-300 opacity-100">
        <div class="fixed inset-0 bg-[rgba(0,0,0,0.5)] profile-backdrop"></div>
        <div class="flex flex-col w-[750px] bg-white transform transition-transform duration-300 ease-in-out translate-x-0 h-full overflow-hidden">
          <div class="flex justify-between items-center px-4 py-3 border-b text-[#12344d] border-gray-200">
            <h5 class="text-lg">
              Staff Details for ${escapeHtml(selectedStaff?.staff_name || "")} - ${escapeHtml(selectedStaff?.userID || "")}
            </h5>
            <button class="cursor-pointer close-profile-modal">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>
          <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
            <button data-tab="profile" class="profile-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${profileModalStore.activeTab === "profile" ? "border-[#44745c] text-green-900 bg-white" : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"}">
              Profile
            </button>
            <button data-tab="documents" class="profile-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${profileModalStore.activeTab === "documents" ? "border-[#44745c] text-green-900 bg-white" : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"}">
              Documents
            </button>
            <button data-tab="approval" class="profile-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${profileModalStore.activeTab === "approval" ? "border-[#44745c] text-green-900 bg-white" : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"}">
              Approval
            </button>
            <button data-tab="salaryInfo" class="profile-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${profileModalStore.activeTab === "salaryInfo" ? "border-[#44745c] text-green-900 bg-white" : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"}">
              Salary Information
            </button>
            <button data-tab="shiftInfo" class="profile-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${profileModalStore.activeTab === "shiftInfo" ? "border-[#44745c] text-green-900 bg-white" : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"}">
              Shift Information
            </button>
            <button data-tab="Remarks" class="profile-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${profileModalStore.activeTab === "Remarks" ? "border-[#44745c] text-green-900 bg-white" : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"}">
              Remarks
            </button>
          </div>
          <div class="overflow-y-auto flex-1">
            ${renderTabContent(selectedStaff)}
          </div>
        </div>
      </div>
    `;

    $("#profileModal").remove();
    $("body").append(modalHtml);
    bindProfileModalEvents();
  }

  function renderTabContent(selectedStaff) {
    switch (profileModalStore.activeTab) {
      case "profile":
        return renderProfileTab(selectedStaff);
      case "documents":
        return renderDocumentsTab();
      case "approval":
        return renderApprovalTab();
      case "salaryInfo":
        return renderSalaryInfoTab();
      case "shiftInfo":
        return renderShiftInfoTab();
      case "Remarks":
        return renderRemarksTab(selectedStaff);
      default:
        return "";
    }
  }

  function renderProfileTab(selectedStaff) {
    return `
      <div class="w-full border-b border-gray-200 px-4 py-4 flex items-center">
        <div class="mr-2">
          <div class="bg-gray-200 rounded-full w-18 h-18 flex items-center justify-center">
            <img src="/images/user.png" alt="User Image" class="w-10 h-10 object-cover" />
          </div>
        </div>
        <div class="text-gray-500 ml-2 space-y-1">
          <div class="text-gray-900">${escapeHtml(selectedStaff?.staff_name || "")}</div>
          <div class="text-xs">
            <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition">
              <i class="ri-upload-2-line me-1"></i> Upload Image
            </button>
            <button class="py-1 px-2 text-sm rounded border cursor-pointer ms-2 bg-white text-gray-700 border-gray-200">
              <i class="ri-delete-bin-6-line me-1"></i> Remove
            </button>
          </div>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto h-[calc(100vh-207px)]">
        <div class="px-4 py-4 mb-4">
          <div class="text-lg pb-4 text-green-800 flex items-center">
            <i class="ri-user-follow-line mr-1"></i>
            <span>Basic Details</span>
          </div>
          <div class="overflow-x-auto">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Name</label>
                <input value="${escapeHtml(selectedStaff?.staff_name || "")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Employee Code</label>
                <input value="${escapeHtml(selectedStaff?.userID || "12345678920")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">DOB</label>
                <input value="${escapeHtml(selectedStaff?.dob || "12/05/2000")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Gender</label>
                <input value="${escapeHtml(selectedStaff?.gender || "Male")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Group Name</label>
                <input value="Test Group" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Designation</label>
                <input value="${escapeHtml(selectedStaff?.DESIGNATION || "")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Department</label>
                <input value="${escapeHtml(selectedStaff?.DEPARTMENT || "")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Sub-Department</label>
                <input value="Test Group" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Marital Status</label>
                <input value="unmarried" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Shift Master</label>
                <input value="Test shift" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg border border-gray-300 mx-4 mb-8">
          <div class="text-lg px-2 py-2 flex items-center border-b border-gray-300 text-green-800">
            <i class="ri-contacts-book-line mr-1"></i>
            <span>Contact Information</span>
          </div>
          <div class="overflow-y-auto p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Email</label>
                <input value="test@example.com" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Phone Number</label>
                <input value="${escapeHtml(selectedStaff?.phone_number || "")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Company Number</label>
                <input value="9874561230" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white mx-4 rounded-lg border border-gray-300 mb-6">
          <div class="text-lg px-2 flex items-center py-2 border-b border-gray-300 text-green-800">
            <i class="ri-home-3-line mr-1"></i>
            <span>Address</span>
          </div>
          <div class="overflow-y-auto p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Address Line 1</label>
                <input value="${escapeHtml(selectedStaff?.address_line_1 || "")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Taluk</label>
                <input value="Test Taluk" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Address Line 2</label>
                <input value="address line 2" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">District</label>
                <input value="test district" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">State</label>
                <input value="tamil nadu" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Pincode</label>
                <input value="637410" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white mx-4 rounded-lg border border-gray-300 mb-8">
          <div class="text-lg px-2 py-2 flex items-center border-b border-gray-300 text-green-800">
            <i class="ri-bank-line mr-1"></i>
            <span>Bank Details</span>
          </div>
          <div class="overflow-y-auto p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Bank Name</label>
                <input value="Bank Of India" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Branch Name</label>
                <input value="Salem" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Account Number</label>
                <input value="9874561230" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">IFSC Code</label>
                <input value="9874561230" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white mx-4 rounded-lg border border-gray-300 mb-8">
          <div class="text-lg px-2 py-2 flex items-center border-b border-gray-300 text-green-800">
            <i class="ri-briefcase-line mr-1"></i>
            <span>ESI & PF Details</span>
          </div>
          <div class="overflow-y-auto p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">ESI Number</label>
                <input value="9874563210" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">UAN Number</label>
                <input value="12345678920" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">ESI Branch</label>
                <input value="Test Branch" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white mx-4 rounded-lg border border-gray-300 mb-8">
          <div class="text-lg px-2 py-2 flex items-center border-b border-gray-300 text-green-800">
            <i class="ri-file-text-line mr-1"></i>
            <span>Proof Details</span>
          </div>
          <div class="overflow-y-auto p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">PAN Number</label>
                <input value="9874561230" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Aadhar Number</label>
                <input value="9874561230" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white mx-4 rounded-lg border border-gray-300 mb-8">
          <div class="text-lg px-2 py-2 flex items-center border-b border-gray-300 text-green-800">
            <i class="ri-information-line mr-1"></i>
            <span>Other Information</span>
          </div>
          <div class="overflow-y-auto p-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Father Name</label>
                <input value="${escapeHtml(selectedStaff?.father_name || "")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Spouse Name</label>
                <input value="Test Spouse" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Referred By</label>
                <input value="Test Referrer" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Referrer Phone Number</label>
                <input value="9874561230" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Nominee Name</label>
                <input value="Test Nominee" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Nominee Phone Number</label>
                <input value="9874561230" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Qualification</label>
                <input value="BE" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">Date of Joining</label>
                <input value="${escapeHtml(selectedStaff?.joining_date || "")}" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-[#000000] mb-1.5 text-gray-800 px-2">No.Of.Children</label>
                <input value="2" readOnly class="border-none focus:outline-none text-md text-gray-900 h-8 px-2 py-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderDocumentsTab() {
    return `
      <div class="p-4">
        <div class="bg-white rounded-xl p-6 shadow-md border border-dashed border-gray-300 text-center mb-6">
          <div class="flex flex-col items-center space-y-3">
            <div class="text-4xl text-green-500">
              <i class="ri-upload-cloud-2-line"></i>
            </div>
            <p class="text-black font-semibold cursor-pointer">Click here</p>
            <p class="text-gray-400 text-sm">Supported Format: SVG, JPG, PNG (10mb each)</p>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-md p-4">
          <div class="flex justify-between items-center mb-4">
            <div class="text-gray-700 font-semibold">
              Attached Files
              <span class="text-xs bg-[#009333] text-white px-2 py-1 rounded-full">81</span>
            </div>
            <div class="flex items-center relative space-x-2">
              <input class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]" type="text" placeholder="Enter File Name" />
              <button class="py-1 px-2 text-sm rounded border cursor-pointer btn-visible-hover">
                <i class="ri-sort-desc"></i>
              </button>
            </div>
          </div>
          <div class="max-h-[calc(100vh-390px)] overflow-y-auto">
            <table class="w-full text-sm text-left border-collapse table-fixed">
              <thead class="text-gray-500 border-b bg-gray-50 sticky top-0 z-10 block w-full">
                <tr class="table w-full table-fixed">
                  <th class="px-2 py-2 text-xs font-medium text-gray-500">File Name</th>
                  <th class="px-2 py-2 text-xs font-medium text-gray-500">File Size</th>
                  <th class="px-2 py-2 text-xs font-medium text-gray-500">Last Modified</th>
                  <th class="px-2 py-2 text-xs font-medium text-gray-500">Uploaded By</th>
                  <th class="px-2 py-2 text-xs font-medium text-gray-500 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${Array.from({ length: 20 }).map((_, i) => `
                  <tr class="table w-full table-fixed border-b hover:bg-gray-50">
                    <td class="px-2 py-3 flex items-center gap-2">
                      <i class="ri-file-pdf-2-line text-red-500"></i>
                      <span class="font-medium text-sm text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">File ${i + 1}.pdf</span>
                    </td>
                    <td class="px-2 py-3 text-sm text-gray-900">3.8 GB</td>
                    <td class="px-2 py-3 text-sm text-gray-900">18/08/2023</td>
                    <td class="px-2 py-3">
                      <div class="flex items-center gap-2">
                        <img src="https://i.pravatar.cc/150?img=${i + 1}" alt="avatar" class="w-6 h-6 rounded-full" />
                        <span class="text-sm text-gray-900">User ${i + 1}</span>
                      </div>
                    </td>
                    <td class="px-2 py-3 text-sm text-center">
                      <div class="flex justify-center items-center gap-2">
                        <button class="text-red-500"><i class="ri-delete-bin-line"></i></button>
                        <button class="text-blue-500"><i class="ri-pencil-line"></i></button>
                      </div>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function renderApprovalTab() {
    return `
      <div class="p-4">
        <div class="max-h-[calc(100vh-128px)] bg-white rounded-xl shadow-md overflow-y-auto">
          <table class="w-full text-sm text-left border-collapse table-fixed">
            <thead class="text-gray-500 border-b bg-gray-50 sticky top-0 z-10 block w-full">
              <tr class="table w-full table-fixed">
                <th class="w-20 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Approved</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: 30 }).map((_, i) => `
                <tr class="table w-full table-fixed border-b hover:bg-gray-50">
                  <td class="w-20 px-4 py-2 whitespace-nowrap text-sm text-gray-900">${i + 1}</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">TEST Name</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">LEVEL 1</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">OT, OD</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderSalaryInfoTab() {
    return `
      <div class="p-4">
        <div class="text-lg font-semibold border-b border-b-[#b0b3b7] text-gray-800">
          <span>Monthly Entries</span>
        </div>
        <div class="max-h-[calc(100vh-550px)] bg-white rounded-xl shadow-md overflow-y-auto mt-2">
          <table class="w-full text-sm text-left border-collapse table-fixed">
            <thead class="text-gray-500 border-b bg-gray-50 sticky top-0 z-10 block w-full">
              <tr class="table w-full table-fixed">
                <th class="w-12 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: 20 }).map((_, i) => `
                <tr class="table w-full table-fixed border-b hover:bg-gray-50">
                  <td class="w-12 px-4 py-2 whitespace-nowrap text-sm text-gray-900">${i + 1}</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">10000</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="p-4">
        <div class="text-lg font-semibold border-b border-b-[#b0b3b7] text-gray-800">
          <span>Deduction</span>
        </div>
        <div class="max-h-[calc(100vh-550px)] bg-white rounded-xl shadow-md overflow-y-auto mt-2">
          <table class="w-full text-sm text-left border-collapse table-fixed">
            <thead class="text-gray-500 border-b bg-gray-50 sticky top-0 z-10 block w-full">
              <tr class="table w-full table-fixed">
                <th class="w-12 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: 20 }).map((_, i) => `
                <tr class="table w-full table-fixed border-b hover:bg-gray-50">
                  <td class="w-12 px-4 py-2 whitespace-nowrap text-sm text-gray-900">${i + 1}</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">HR</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">10000</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Working Skill</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="p-4">
        <div class="text-lg font-semibold border-b border-b-[#b0b3b7] text-gray-800">
          <span>Increment</span>
        </div>
        <div class="max-h-[calc(100vh-550px)] bg-white rounded-xl shadow-md overflow-y-auto mt-2">
          <table class="w-full text-sm text-left border-collapse table-fixed">
            <thead class="text-gray-500 border-b bg-gray-50 sticky top-0 z-10 block w-full">
              <tr class="table w-full table-fixed">
                <th class="w-12 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Entered By</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Approved By</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: 20 }).map((_, i) => `
                <tr class="table w-full table-fixed border-b hover:bg-gray-50">
                  <td class="w-12 px-4 py-2 whitespace-nowrap text-sm text-gray-900">${i + 1}</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">29/05/2025</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">1000</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Good Skill</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">-</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderShiftInfoTab() {
    if (profileModalStore.showNewShift) {
      return renderNewShiftForm();
    }
    
    return `
      <div class="p-4">
        <div class="flex justify-between text-lg font-semibold border-b border-b-[#b0b3b7] text-gray-800">
          <div><span>Shift Allocation</span></div>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition mb-2 show-new-shift-form">
            <i class="ri-add-line"></i> New Shift
          </button>
        </div>
        <div class="max-h-[calc(100vh-595px)] bg-white rounded-xl shadow-md overflow-y-auto mt-2">
          <table class="w-full text-sm text-left border-collapse table-fixed">
            <thead class="text-gray-500 border-b bg-gray-50 sticky top-0 z-10 block w-full">
              <tr class="table w-full table-fixed">
                <th class="w-12 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Week Name</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Name</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">IN Time</th>
                <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">OUT Time</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: 20 }).map((_, i) => `
                <tr class="table w-full table-fixed border-b hover:bg-gray-50">
                  <td class="w-12 px-4 py-2 whitespace-nowrap text-sm text-gray-900">${i + 1}</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Test Week</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Morning Shift</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">09.00AM</td>
                  <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">05.00PM</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="p-4">
        <div class="text-lg font-semibold border-b border-b-[#b0b3b7] text-gray-800">
          <span>Shift Request</span>
        </div>
        <div class="max-h-[calc(100vh-595px)] bg-white rounded-xl shadow-md overflow-y-auto mt-2">
          <table class="w-full text-sm text-left border-collapse table-fixed">
            <thead class="text-gray-500 border-b bg-gray-50 sticky top-0 z-10 block w-full">
              <tr class="table w-full table-fixed">
                <th class="w-12 px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">From date</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">To Date</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Shift</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Applied By</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                <th class="px-2 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              ${Array.from({ length: 20 }).map((_, i) => `
                <tr class="table w-full table-fixed border-b hover:bg-gray-50">
                  <td class="w-12 px-2 py-2 whitespace-nowrap text-sm text-gray-900">${i + 1}</td>
                  <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900">12/05/2025</td>
                  <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900">19/05/2025</td>
                  <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900">Night Shift</td>
                  <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900">John Doe</td>
                  <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900">10/05/2025</td>
                  <td class="px-2 py-2 whitespace-nowrap text-sm text-gray-900">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function renderNewShiftForm() {
    const form = profileModalStore.shiftRequestForm;
    const errors = profileModalStore.shiftFormErrors;
    
    return `
      <div class="p-4">
        <div class="flex justify-between text-lg font-semibold border-b border-b-[#b0b3b7] text-gray-800 mb-4">
          <div><span>New Shift</span></div>
          <button class="cursor-pointer close-new-shift-form">
            <i class="ri-close-line text-xl text-red-500"></i>
          </button>
        </div>
        <form id="shiftRequestForm" class="bg-white p-4 rounded-lg shadow-sm">
          <div class="flex items-center mb-4">
            <label class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
              From Date<span class="text-red-500">*</span>
            </label>
            <div class="flex-1">
              <input
                type="date"
                id="shiftFromDate"
                name="fromDate"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${form.fromDate || ""}"
              />
              ${errors.fromDate ? `<div class="text-red-500 text-xs mt-1">${escapeHtml(errors.fromDate)}</div>` : ""}
            </div>
          </div>
          <div class="flex items-center mb-4">
            <label class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
              To Date<span class="text-red-500">*</span>
            </label>
            <div class="flex-1">
              <input
                type="date"
                id="shiftToDate"
                name="toDate"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${form.toDate || ""}"
              />
              ${errors.toDate ? `<div class="text-red-500 text-xs mt-1">${escapeHtml(errors.toDate)}</div>` : ""}
            </div>
          </div>
          <div class="flex items-center mb-4">
            <label class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
              Shift Name<span class="text-red-500">*</span>
            </label>
            <div class="flex-1">
              <input
                type="text"
                name="shiftName"
                placeholder="Enter Shift Name"
                maxlength="50"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${escapeHtml(form.shiftName || "")}"
              />
              ${errors.shiftName ? `<div class="text-red-500 text-xs mt-1">${escapeHtml(errors.shiftName)}</div>` : ""}
            </div>
          </div>
          <div class="flex items-center mb-4">
            <label class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
              Shift In Time<span class="text-red-500">*</span>
            </label>
            <div class="flex-1">
              <input
                type="time"
                id="shiftInTime"
                name="shiftInTime"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${form.shiftInTime || ""}"
              />
              ${errors.shiftInTime ? `<div class="text-red-500 text-xs mt-1">${escapeHtml(errors.shiftInTime)}</div>` : ""}
            </div>
          </div>
          <div class="flex items-center mb-4">
            <label class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
              Shift Out Time<span class="text-red-500">*</span>
            </label>
            <div class="flex-1">
              <input
                type="time"
                id="shiftOutTime"
                name="shiftOutTime"
                class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
                value="${form.shiftOutTime || ""}"
              />
              ${errors.shiftOutTime ? `<div class="text-red-500 text-xs mt-1">${escapeHtml(errors.shiftOutTime)}</div>` : ""}
            </div>
          </div>
          <div class="flex items-start mb-4">
            <label class="block text-sm font-medium text-gray-700 w-32 min-w-[8rem]">
              Remarks
            </label>
            <div class="flex-1">
              <textarea
                id="shiftRemarks"
                name="remarks"
                rows="3"
                placeholder="Add any remarks here..."
                class="block w-full text-sm px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"
              >${escapeHtml(form.remarks || "")}</textarea>
            </div>
          </div>
        </form>
        <div class="flex justify-end gap-2 mt-4">
          <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] transition close-new-shift-form">
            Cancel
          </button>
          <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition save-shift-request">
            Save Request
          </button>
        </div>
      </div>
    `;
  }

  function renderRemarksTab(selectedStaff) {
    return `
      <div class="bg-white min-h-[calc(100vh-128px)] m-4 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-md flex flex-col">
        <div class="flex items-center space-x-3 border-b pb-3 p-4">
          <img src="/images/user.png" alt="User" class="w-10 h-10 rounded-full border" />
          <div>
            <div class="font-semibold">${escapeHtml(selectedStaff.staff_name || "")}</div>
            <div class="text-sm text-gray-500">
              ${escapeHtml(selectedStaff.userID || "")} · 
              <span class="font-medium text-black">${escapeHtml(selectedStaff.DEPARTMENT || "")}</span>
            </div>
          </div>
        </div>
        <div class="flex-1 overflow-y-auto space-y-3 max-h-[calc(100vh-270px)] p-4">
          <div class="flex items-end justify-end space-x-2">
            <div class="bg-green-100 px-4 py-2 rounded-xl text-sm text-gray-800 max-w-[80%]">
              <div>Great! I'm assigning Jane to assist you during check-in.</div>
              <div class="mt-3 flex items-start bg-white border-l-4 border-blue-500 px-3 py-2 rounded-md shadow-sm text-[11px]">
                <i class="ri-user-line text-blue-500 mr-2 text-sm"></i>
                <div>
                  <div class="text-blue-600 text-[10px] font-semibold">ASSIGNED TO</div>
                  <div class="text-black font-medium text-[12px]">Jane Smith</div>
                </div>
              </div>
              <div class="mt-2 flex items-start bg-white border-l-4 border-red-500 px-3 py-2 rounded-md shadow-sm text-[11px]">
                <i class="ri-calendar-line text-red-500 mr-2 text-sm"></i>
                <div>
                  <div class="text-red-600 text-[10px] font-semibold">DEADLINE</div>
                  <div class="text-black font-medium text-[12px]">27 Jul 2025, 12:00 PM</div>
                </div>
              </div>
              <div class="text-[10px] text-gray-400 text-right mt-2">24 Jul 2025, 10:17 AM</div>
            </div>
            <img src="/images/user.png" alt="Host" class="w-8 h-8 rounded-full self-end" />
          </div>
          <div class="flex items-end space-x-2">
            <img src="/images/user.png" alt="User" class="w-8 h-8 rounded-full self-end" />
            <div class="bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-800 max-w-[80%]">
              <div>Hi! I'm interested in the apartment listing I saw online. Is it still available for next weekend?</div>
              <div class="text-[10px] text-gray-400 text-right mt-1">24 Jul 2025, 10:15 AM</div>
            </div>
          </div>
        </div>
        <div class="border-t pt-3 flex items-center bg-white px-4">
          ${profileModalStore.showDropdown ? `
            <div class="absolute bottom-20 left-6 bg-white border border-gray-300 rounded-xl shadow-lg w-64 z-50">
              ${dummyUsers.map(user => `
                <div class="flex items-center space-x-3 hover:bg-gray-100 p-2 hover:rounded-md cursor-pointer border-b border-gray-200">
                  <img src="${user.avatar}" alt="${user.name}" class="w-8 h-8 rounded-full" />
                  <span class="text-sm text-gray-800 font-medium">${escapeHtml(user.name)}</span>
                </div>
              `).join("")}
            </div>
          ` : ""}
          <div class="flex items-center flex-1 bg-[#f0f2f5] rounded-full px-4 py-2">
            <i class="ri-user-line text-xl text-black mr-3 cursor-pointer toggle-dropdown"></i>
            <input type="text" placeholder="Type message..." class="flex-1 bg-transparent text-sm focus:outline-none" />
          </div>
          <button class="ml-3 w-8 h-8 rounded-full bg-[#009333] flex items-center justify-center hover:bg-[#18ad4c] transition send-message">
            <i class="ri-send-plane-fill text-white text-sm"></i>
          </button>
        </div>
      </div>
    `;
  }

  function bindProfileModalEvents() {
    $(".profile-backdrop, .close-profile-modal")
      .off("click")
      .on("click", hide);

    $(".profile-tab")
      .off("click")
      .on("click", function () {
        profileModalStore.activeTab = $(this).data("tab");
        renderProfileModal();
      });

    // Shift Info tab specific events
    $(document)
      .off("click", ".show-new-shift-form")
      .on("click", ".show-new-shift-form", function () {
        profileModalStore.showNewShift = true;
        profileModalStore.shiftRequestForm = {
          fromDate: "",
          toDate: "",
          shiftName: "",
          shiftInTime: "",
          shiftOutTime: "",
          remarks: "",
        };
        profileModalStore.shiftFormErrors = {};
        renderProfileModal();
      });

    // Close new shift form
    $(document)
      .off("click", ".close-new-shift-form")
      .on("click", ".close-new-shift-form", function () {
        profileModalStore.showNewShift = false;
        profileModalStore.shiftRequestForm = {
          fromDate: "",
          toDate: "",
          shiftName: "",
          shiftInTime: "",
          shiftOutTime: "",
          remarks: "",
        };
        profileModalStore.shiftFormErrors = {};
        renderProfileModal();
      });

    // Save shift request
    $(document)
      .off("click", ".save-shift-request")
      .on("click", ".save-shift-request", function () {
        const errors = {};

        // Get form values directly from the DOM
        const fromDate = $("#shiftFromDate").val() || "";
        const toDate = $("#shiftToDate").val() || "";
        const shiftName = $('input[name="shiftName"]').val() || "";
        const shiftInTime = $("#shiftInTime").val() || "";
        const shiftOutTime = $("#shiftOutTime").val() || "";
        const remarks = $("#shiftRemarks").val() || "";

        // Validation
        if (!fromDate) {
          errors.fromDate = "From Date is required";
        }
        if (!toDate) {
          errors.toDate = "To Date is required";
        }
        if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
          errors.toDate = "To Date must be after From Date";
        }
        if (!shiftName.trim()) {
          errors.shiftName = "Shift Name is required";
        }
        if (!shiftInTime) {
          errors.shiftInTime = "Shift In Time is required";
        }
        if (!shiftOutTime) {
          errors.shiftOutTime = "Shift Out Time is required";
        }

        // Update form data
        profileModalStore.shiftRequestForm = {
          fromDate,
          toDate,
          shiftName: shiftName.trim(),
          shiftInTime,
          shiftOutTime,
          remarks: remarks.trim(),
        };

        if (Object.keys(errors).length > 0) {
          profileModalStore.shiftFormErrors = errors;
          renderProfileModal();
          return;
        }

        // Clear errors and save
        profileModalStore.shiftFormErrors = {};
        
        // Here you would typically make an API call to save the shift request
        // For now, we'll just show a success message and close the form
        if (typeof showToast === "function") {
          showToast("Shift request saved successfully!", "success");
        } else {
          alert("Shift request saved successfully!");
        }
        
        profileModalStore.showNewShift = false;
        profileModalStore.shiftRequestForm = {
          fromDate: "",
          toDate: "",
          shiftName: "",
          shiftInTime: "",
          shiftOutTime: "",
          remarks: "",
        };
        renderProfileModal();
      });

    // Update form values on input
    $(document)
      .off("input change", "#shiftFromDate, #shiftToDate, input[name='shiftName'], #shiftInTime, #shiftOutTime, #shiftRemarks")
      .on("input change", "#shiftFromDate, #shiftToDate, input[name='shiftName'], #shiftInTime, #shiftOutTime, #shiftRemarks", function () {
        const $field = $(this);
        const id = $field.attr("id");
        const name = $field.attr("name");
        const value = $field.val() || "";

        // Map field IDs/names to form properties
        const fieldMap = {
          "shiftFromDate": "fromDate",
          "shiftToDate": "toDate",
          "shiftName": "shiftName",
          "shiftInTime": "shiftInTime",
          "shiftOutTime": "shiftOutTime",
          "shiftRemarks": "remarks"
        };

        const formKey = fieldMap[id] || fieldMap[name] || name;
        
        if (formKey && profileModalStore.shiftRequestForm.hasOwnProperty(formKey)) {
          profileModalStore.shiftRequestForm[formKey] = value;
          // Clear error for this field if it exists
          if (profileModalStore.shiftFormErrors[formKey]) {
            delete profileModalStore.shiftFormErrors[formKey];
            // Re-render to clear the error display
            renderProfileModal();
          }
        }
      });

    // Remarks tab specific events
    $(document)
      .off("click", ".toggle-dropdown")
      .on("click", ".toggle-dropdown", function () {
        profileModalStore.showDropdown = !profileModalStore.showDropdown;
        renderProfileModal();
      });

    $(document)
      .off("click", ".send-message")
      .on("click", ".send-message", function () {
        if (typeof showToast === "function") {
          showToast("Message sent!", "success");
        }
      });

    // Close on Escape key
    $(document).off("keydown.profileModal").on("keydown.profileModal", function (e) {
      if (e.key === "Escape" && profileModalStore.isOpen) {
        hide();
      }
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
  window.profileModalModule = {
    show,
    hide,
    getStore: () => profileModalStore,
  };
})();
