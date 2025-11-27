// profile-settings.js
window.ProfileSettings = function() {
    return `
    <div class="bg-white p-6 rounded shadow flex flex-col min-h-[calc(100vh-103px)]">
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Profile Settings</h2>

      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mb-4">
        <button class="tab-btn py-2 px-4 text-sm font-medium border-b-2 border-transparent" data-tab="basicData">Basic Data</button>
        <button class="tab-btn py-2 px-4 text-sm font-medium border-b-2 border-transparent" data-tab="addressDetails">Address Details</button>
        <button class="tab-btn py-2 px-4 text-sm font-medium border-b-2 border-transparent" data-tab="bankDetails">Bank Details</button>
        <button class="tab-btn py-2 px-4 text-sm font-medium border-b-2 border-transparent" data-tab="proofDetails">Proof Details</button>
      </div>

      <!-- Form container -->
      <div id="formContainer" class="flex-1 overflow-y-auto max-h-[calc(100vh-120px)]"></div>
    </div>

    <!-- Fixed footer -->
    <footer class="bg-[#ebeff3] py-3 h-[53.9px] px-4 flex justify-start gap-2  bottom-0 left-0 right-0 shadow-t">
      <button id="saveBtn" type="button" class="py-1 px-2 text-sm rounded  bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition">Save</button>
      <button id="cancelBtn" type="button" class="py-1 px-2 text-sm rounded  bg-[#6c757d] text-white border border-[#6c757d] hover:bg-[#5a6268] cursor-pointer transition">Cancel</button>
    </footer>
    `;
  };
  
  window.ProfileSettingsLogic = function() {
    const formData = {
      basicData: { proprietorSalutation: "Mr.", proprietorName: "", companyName: "", phoneNumber: "", alternateNumber: "", emailId: "", financialMonth: "" },
      addressDetails: { address: "", city: "", state: "Tamil Nadu", zipCode: "", country: "India", landmark: "" },
      bankDetails: { bankName: "", ifscCode: "", accountNo: "", upi: "", branchName: "" },
      proofDetails: { gstNumber: "", panNumber: "", aadharNumber: "", fssaiNumber: "", billPrefix: "", logo: "" }
    };
  
    let activeTab = "basicData"; // default tab
    const formContainer = document.getElementById("formContainer");
    const tabButtons = document.querySelectorAll(".tab-btn");
  
    const renderTabContent = () => {
      if (!formContainer) return;
  
      // Remove active styles and add to current
      tabButtons.forEach(b => b.classList.remove("border-b-2", "border-green-600", "text-green-600"));
      const currentBtn = Array.from(tabButtons).find(b => b.dataset.tab === activeTab);
      currentBtn?.classList.add("border-b-2", "border-green-600", "text-green-600");
  
      let html = "";
  
      if (activeTab === "basicData") {
        html = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <label>Proprietor Salutation</label>
    <div class="flex gap-2 mt-1">
      ${["Mr.","Mrs.","Ms.","Miss.","Dr."].map(val => `
        <label class="flex items-center gap-1">
          <input type="radio" name="proprietorSalutation" value="${val}" ${formData.basicData.proprietorSalutation===val?"checked":""}>
          ${val}
        </label>`).join("")}
    </div>

    <label class="mt-2 block">Proprietor Name</label>
    <input type="text" name="proprietorName" placeholder="Enter proprietor name" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${formData.basicData.proprietorName}" />

    <label class="mt-2 block">Company Name</label>
    <input type="text" name="companyName" placeholder="Enter company name" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${formData.basicData.companyName}" />

    <label class="mt-2 block">Phone Number</label>
    <input type="text" name="phoneNumber" placeholder="Enter phone number" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${formData.basicData.phoneNumber}" />
  </div>

  <div>
    <label class="block">Alternate Number</label>
    <input type="text" name="alternateNumber" placeholder="Enter alternate number" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${formData.basicData.alternateNumber}" />

    <label class="mt-2 block">Email Id</label>
    <input type="email" name="emailId" placeholder="Enter email address" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${formData.basicData.emailId}" />

    <label class="mt-2 block">Financial Month</label>
    <input type="text" name="financialMonth" placeholder="Enter financial month" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${formData.basicData.financialMonth}" />
  </div>
</div>

        `;
      } else if (activeTab === "addressDetails") {
        html = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Address</label>
              <input type="text" name="address" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"  placeholder="Enter Address"/>
              <label class="mt-2 block">City</label>
              <input type="text" name="city" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"  placeholder="Enter City" />
              <label class="mt-2 block">State</label>
              <select name="state" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]">
                ${["Andaman and Nicobar Islands","Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chandigarh","Chattisgarh","Dadra and Nagar Haveli","Daman and Diu","Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jammu and Kashmir","Jharkhand","Karnataka","Kerala","Lakshadweep Islands","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Pondicherry","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"].map(s => `<option value="${s}" ${formData.addressDetails.state===s?"selected":""}>${s}</option>`).join("")}
              </select>
            </div>
            <div>
              <label class="block">Zip Code</label>
              <input type="text" name="zipCode" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter Zipcode" />
              <label class="mt-2 block">Country</label>
              <input type="text" name="country" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Select a state" />
              <label class="mt-2 block">Landmark</label>
              <input type="text" name="landmark" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter Landmark" />
            </div>
          </div>
        `;
      } else if (activeTab === "bankDetails") {
        html = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Bank Name</label>
              <input type="text" name="bankName" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter Bank Name" />
              <label class="mt-2 block">IFSC Code</label>
              <input type="text" name="ifscCode" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter IFSC Code" />
            </div>
            <div>
              <label class="block">Account No</label>
              <input type="text" name="accountNo" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter Account Number" />
              <label class="mt-2 block">UPI</label>
              <input type="text" name="upi" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter UPI ID" />
              <label class="mt-2 block">Branch Name</label>
              <input type="text" name="branchName" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"  placeholder="Enter Branch Name" />
            </div>
          </div>
        `;
      } else if (activeTab === "proofDetails") {
        html = `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>GST Number</label>
              <input type="text" name="gstNumber" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"  placeholder="Enter GST Number" />
              <label class="mt-2 block">PAN Number</label>
              <input type="text" name="panNumber" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter Pan Number" />
              <label class="mt-2 block">Aadhar Number</label>
              <input type="text" name="aadharNumber" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter Aadhar Number" />
            </div>
            <div>
              <label class="block">FSSAI Number</label>
              <input type="text" name="fssaiNumber" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter FSSAI Number" />
              <label class="mt-2 block">Bill Prefix</label>
              <input type="text" name="billPrefix" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"  placeholder="Enter Bill Prefix" />
              <label class="mt-2 block">Logo URL</label>
              <input type="text" name="logo" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]"  placeholder="Enter Logo URL" />
            </div>
          </div>
        `;
      }
  
      formContainer.innerHTML = html;
  
      // Input change handler
      formContainer.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("change", e => {
          const name = e.target.name;
          const value = e.target.value;
          if(activeTab==="basicData"){
            if(name==="proprietorSalutation") formData.basicData.proprietorSalutation=value;
            else formData.basicData[name]=value;
          } else if(activeTab==="addressDetails") formData.addressDetails[name]=value;
          else if(activeTab==="bankDetails") formData.bankDetails[name]=value;
          else if(activeTab==="proofDetails") formData.proofDetails[name]=value;
        });
      });
    };
  
    // Tab click handling
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        activeTab = btn.dataset.tab;
        renderTabContent();
      });
    });
  
    // Initial render: first tab active
    renderTabContent();
  
    // Save button
    document.getElementById("saveBtn")?.addEventListener("click", () => {
      console.log("Form Data:", formData);
      alert("Form data saved! Check console.");
    });
  };
  