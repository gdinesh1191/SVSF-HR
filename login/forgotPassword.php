<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>HR Management</title>

  <!-- Tailwind CDN -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- jQuery 3.7.1 -->
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

</head>

<style>
    * {
        font-family: Helvetica, Arial, sans-serif;
    }

    ::-webkit-scrollbar {
        width: 11px;
        height: 11px;
    }

    ::-webkit-scrollbar-track {
        background: #fff;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #8b8b8b;
        border-radius: 10px;
        border: 2px solid #fff;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }
</style>

<body class="bg-gray-100">

<div class="min-h-screen flex p-5 flex">

  <!-- LEFT PANEL -->
  <div class="w-1/2 bg-white rounded-l-md p-6 flex flex-col justify-between">

    <!-- Logo -->
    <div class="">
      <img src="/images/logo.png" class="w-40 h-auto object-contain" />
    </div>

    <!-- FORM CARD -->
    <div class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-md text-center">

        <h1 class="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h1>
        <p class="text-gray-600 mb-8">We will help you recover access to your account.</p>

        <!-- Error Box -->
        <div id="errorBox"
             class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
        </div>

        <!-- STEP 1: USERNAME -->
        <div id="step-username" class="">
          <label class="text-sm font-medium text-left mb-2 text-gray-700 block">
              Username<span class="text-red-500">*</span>
            </label>
          <input id="usernameInput" type="text"
                 placeholder="Enter your username"
                 class="px-3.5 py-2.5 text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full" />

          <button id="sendOtpBtn"
                  class="w-full text-white py-2.5 px-3.5 rounded-md bg-[#009333] font-medium hover:opacity-90 transition-opacity mt-6">
            Send OTP
          </button>
        </div>


        <!-- STEP 2: OTP -->
        <div id="step-otp" class="space-y-6 hidden">
          <div class="text-sm text-gray-700">Enter the 5-digit OTP sent to your contact</div>

          <div class="flex gap-2 justify-between">
            <input class="otp-input w-12 h-12 text-center text-lg border border-[#cbcbcb] rounded focus:outline-none focus:border-[#009333]"
                   maxlength="1" inputmode="numeric" />
            <input class="otp-input w-12 h-12 text-center text-lg border border-[#cbcbcb] rounded focus:outline-none focus:border-[#009333]"
                   maxlength="1" inputmode="numeric" />
            <input class="otp-input w-12 h-12 text-center text-lg border border-[#cbcbcb] rounded focus:outline-none focus:border-[#009333]"
                   maxlength="1" inputmode="numeric" />
            <input class="otp-input w-12 h-12 text-center text-lg border border-[#cbcbcb] rounded focus:outline-none focus:border-[#009333]"
                   maxlength="1" inputmode="numeric" />
            <input class="otp-input w-12 h-12 text-center text-lg border border-[#cbcbcb] rounded focus:outline-none focus:border-[#009333]"
                   maxlength="1" inputmode="numeric" />
          </div>

          <button id="verifyOtpBtn"
                  class="w-full text-white py-2.5 px-3.5 rounded-md bg-[#009333] font-medium hover:opacity-90 transition-opacity">
            Verify OTP
          </button>
        </div>

        <!-- STEP 3: RESET PASSWORD -->
        <div id="step-reset" class=" hidden">

          <label class="text-sm font-medium text-left mb-2 text-gray-700 block">
              New Password<span class="text-red-500">*</span>
            </label>
          <input id="newPassword" type="password"
                 placeholder="Enter new password"
                 class="px-3.5 py-2.5 text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full" />

          <label class="text-sm font-medium text-left mb-2 mt-6 text-gray-700 block">
              Retype New Password<span class="text-red-500">*</span>
            </label>
          <input id="confirmPassword" type="password"
                 placeholder="Retype new password"
                 class="px-3.5 py-2.5 text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full" />

          <button id="resetPasswordBtn"
                  class="w-full text-white py-2.5 px-3.5 rounded-md bg-[#009333] font-medium hover:opacity-90 transition-opacity mt-6">
            Reset Password
          </button>
        </div>

        <!-- STEP 4: DONE -->
        <div id="step-done" class="text-center hidden">
          <div class="text-emerald-700 font-medium">Password reset successful!</div>

          <a href="/login"
             class="inline-block w-full text-white py-2.5 px-3.5 rounded-md bg-[#009333] font-medium hover:opacity-90 transition-opacity mt-6">
            Go to Login
          </a>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center text-xs text-gray-500 mt-8 w-full">
      <span>Copyright © 2025 InfoGreen Cloud Solutions.</span>
      <span>Privacy Policy</span>
    </div>

  </div>

  <!-- RIGHT PANEL -->
  <div class="relative w-1/2 bg-green-100 overflow-hidden rounded-r-md flex flex-col">
    <div class="flex flex-col justify-center items-center text-center flex-1 p-8">
      <img src="/images/image-2.gif" class="max-h-[50vh] object-contain" />

      <h2 class="text-2xl max-w-2xl font-bold mt-12 text-emerald-900">Secure Account Recovery</h2>
      <p class="text-lg max-w-2xl text-lime-900 mt-1">
         Recover your account safely with our guided verification process.  
  Confirm your identity and reset your password in just a few steps.
      </p>
    </div>
  </div>

</div>

<!-- jQuery Logic -->
<script src="/login/forgotPassword.js"></script>

</body>
</html>
