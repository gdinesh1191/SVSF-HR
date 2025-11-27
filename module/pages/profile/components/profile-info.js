// module/pages/profile/components/profile-info.js
window.ProfileInfoComponent = function () {
    return `
      <div class="p-4 bg-white rounded shadow">
<div class="border-b border-gray-200 px-4 py-2">
    <h1 class="text-[18px] sm:text-[20px] font-medium text-[#009333]">
      Profile Info
    </h1>
  </div>

  <div class="flex-1 h-[calc(100vh-103px)] px-4 py-6">
    <div class="w-[90%] mx-auto h-[calc(100vh-260px)]">

      <!-- Profile Header -->
      <div class="bg-white rounded-lg border border-gray-200 mb-10">
        <div class="p-4 flex items-start justify-between">

          <div class="flex items-center flex-1 space-x-4">
            <div class="w-20 h-20 rounded-full shadow-lg overflow-hidden bg-white">
              <img
                src="https://static3.depositphotos.com/1000951/138/i/450/depositphotos_1380772-stock-photo-profile-of-beautiful-smiling-girl.jpg"
                class="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 class="text-xl font-semibold text-gray-800">
                Alexa Rawles
              </h2>
              <p class="text-gray-500">Manager</p>
              <p class="text-gray-500">alexarawles@gmail.com</p>
            </div>
          </div>

          <div class="text-gray-400 cursor-pointer">
            <span><i class="ri-pencil-line me-1"></i>Edit</span>
          </div>

        </div>
      </div>

      <!-- Scrollable Detail Section -->
      <div class="max-h-[calc(100vh-300px)] overflow-y-auto">

        <!-- PERSONAL INFO CARD -->
        <div class="bg-white rounded-lg border flex items-start justify-between border-gray-200 p-4 mb-10">

          <div class="w-full">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">
              Personal Information
            </h2>

            <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <label class="block font-medium text-gray-500 mb-1">Full Name</label>
                <div class="text-gray-800">John Doe</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">Employee ID</label>
                <div class="text-gray-800">EMP123456</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">Date of Birth</label>
                <div class="text-gray-800">01-Jan-1990</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">Gender</label>
                <div class="text-gray-800">Male</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">Phone Number</label>
                <div class="text-gray-800">9876543210</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">Email Address</label>
                <div class="text-gray-800">john@example.com</div>
              </div>
            </div>
          </div>

          <div class="text-gray-400 cursor-pointer ms-4 mt-1 whitespace-nowrap">
            <span><i class="ri-pencil-line me-1"></i>Edit</span>
          </div>

        </div>

        <!-- ADDRESS DETAILS -->
        <div class="bg-white rounded-lg flex items-start justify-between border border-gray-200 p-4 mb-4">

          <div class="w-full">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Address Details</h2>

            <div class="grid grid-cols-2 gap-4 text-sm text-gray-700">

              <div>
                <label class="block font-medium text-gray-500 mb-1">Address Line 1</label>
                <div class="text-gray-800">123, Main Street</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">Address Line 2</label>
                <div class="text-gray-800">Apt 4B, Near Park Avenue</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">District</label>
                <div class="text-gray-800">Springfield</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">State</label>
                <div class="text-gray-800">Illinois</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">Pincode</label>
                <div class="text-gray-800">62704</div>
              </div>

              <div>
                <label class="block font-medium text-gray-500 mb-1">Country</label>
                <div class="text-gray-800">United States</div>
              </div>

            </div>

          </div>

          <div class="text-gray-400 cursor-pointer ms-4 mt-1 whitespace-nowrap">
            <span><i class="ri-pencil-line me-1"></i>Edit</span>
          </div>

        </div>

      </div>

    </div>
  </div>
</div>
    `;
  };
  