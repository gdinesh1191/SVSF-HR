// module/pages/profile/components/change-password.js
window.ChangePasswordComponent = function () {
    return `
     <div class="p-4 bg-white rounded shadow">
  <div class="border-b border-gray-200 px-4 py-2">
    <h1 class="text-[18px] sm:text-[20px] font-medium text-[#009333]">
      Change Password
    </h1>
  </div>

  <div class="flex-1 h-[calc(100vh-103px)] px-4 py-6">
    <div class="w-[90%] mx-auto h-[calc(100vh-260px)]">

      <div class="bg-white rounded-lg border border-gray-200 max-h-[calc(100vh-140px)] overflow-y-auto">

        <!-- Header -->
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Update Security</h2>
          <p class="text-md text-gray-600 mt-1">
            Keep your account secure by using a strong password.
          </p>
        </div>

        <div class="grid grid-cols-2 px-6 py-6 gap-6">

          <!-- LEFT: FORM -->
          <div>
            <form id="changePassForm" class="space-y-6">

              <!-- OLD PASSWORD -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  Old Password <span class="text-red-500">*</span>
                </label>

                <div class="relative">
                  <input id="oldPassword" type="password" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter old password">

                  <button type="button"
                    onclick="togglePassword('oldPassword')"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i class="ri-eye-off-line"></i>
                  </button>
                </div>

                <p class="text-red-500 text-xs hidden" id="errorOld">Required</p>
              </div>

              <!-- NEW PASSWORD -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  New Password <span class="text-red-500">*</span>
                </label>

                <div class="relative">
                  <input id="newPassword" type="password" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Enter new password">

                  <button type="button"
                    onclick="togglePassword('newPassword')"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i class="ri-eye-off-line"></i>
                  </button>
                </div>

                <p class="text-red-500 text-xs hidden" id="errorNew">Required</p>
              </div>

              <!-- CONFIRM PASSWORD -->
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">
                  Confirm Password <span class="text-red-500">*</span>
                </label>

                <div class="relative">
                  <input id="confirmPassword" type="password" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" placeholder="Confirm password">

                  <button type="button"
                    onclick="togglePassword('confirmPassword')"
                    class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i class="ri-eye-off-line"></i>
                  </button>
                </div>

                <p class="text-red-500 text-xs hidden" id="errorConfirm">Passwords do not match</p>
              </div>

              <button type="submit" class="px-2 py-2 text-sm  rounded-lg bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] transition w-full py-2 mt-3">
                Change Password
              </button>

            </form>
          </div>

          <!-- RIGHT: Password Requirements -->
          <div class="bg-white border border-gray-200 rounded-lg p-4">

            <h3 class="text-sm font-semibold text-gray-900 mb-3">
              Your Password Must Be
            </h3>

            <ul class="space-y-2 text-sm">
              <li class="flex items-center"><i class="ri-checkbox-circle-line mr-3"></i>Minimum 8 characters</li>
              <li class="flex items-center"><i class="ri-checkbox-circle-line mr-3"></i>1 Uppercase</li>
              <li class="flex items-center"><i class="ri-checkbox-circle-line mr-3"></i>1 Lowercase</li>
              <li class="flex items-center"><i class="ri-checkbox-circle-line mr-3"></i>1 Number</li>
              <li class="flex items-center"><i class="ri-checkbox-circle-line mr-3"></i>1 Special character</li>
            </ul>

          </div>

        </div>

      </div>

    </div>
  </div>

</div>

    `;
  };
  window.ChangePasswordLogic = function () {
    function togglePassword(id) {
        const input = document.getElementById(id);
        const button = input.nextElementSibling; // the button element
        const icon = button.querySelector("i");
      
        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("ri-eye-off-line");
          icon.classList.add("ri-eye-line"); // show eye icon
        } else {
          input.type = "password";
          icon.classList.remove("ri-eye-line");
          icon.classList.add("ri-eye-off-line"); // show eye-off icon
        }
      }
      
      window.togglePassword = togglePassword;
      
  
    window.togglePassword = togglePassword; // expose globally
  
    // form event
    const form = document.getElementById("changePassForm");
    if (!form) return;
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const oldPass = document.getElementById("oldPassword").value.trim();
      const newPass = document.getElementById("newPassword").value.trim();
      const confirmPass = document.getElementById("confirmPassword").value.trim();
  
      document.getElementById("errorOld").classList.toggle("hidden", oldPass !== "");
      document.getElementById("errorNew").classList.toggle("hidden", newPass !== "");
  
      if (newPass !== confirmPass) {
        document.getElementById("errorConfirm").classList.remove("hidden");
        return;
      } else {
        document.getElementById("errorConfirm").classList.add("hidden");
      }
  
      
    });
  };