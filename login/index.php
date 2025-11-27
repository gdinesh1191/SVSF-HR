<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HR Management</title>
  <script src="https://cdn.tailwindcss.com"></script>
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

<body class="bg-gray-100 ">

<div class="min-h-screen flex p-5">

  <!-- LEFT SIDE -->
  <div class="w-1/2 bg-white rounded-l-md p-6 flex flex-col justify-between">

    <!-- Logo -->
    <div class="">
      <img src="/images/logo.png" class="w-40 h-auto" />
    </div>

    <!-- Form Section -->
    <div class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-md text-center">

        <h1 class="text-3xl font-bold text-gray-900 mb-2 ">Welcome Back!</h1>
        <p class="text-gray-600 mb-4">
          Enter your email and password to access your account.
        </p>

        <!-- Error -->
        <div id="errorBox" class="hidden bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4"></div>

        <!-- Login Form -->
        <form id="loginForm" class="space-y-4 text-left">

          <div>
            <label class="text-sm font-medium text-gray-700 mb-2 block">
              Username<span class="text-red-500">*</span>
            </label>
            <input type="text" id="username"
              class="px-3.5 py-2.5 text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full"
              placeholder="Enter your username" required />
          </div>

          <div>
            <label class="text-sm font-medium text-gray-700 mb-2 block">
              Password<span class="text-red-500">*</span>
            </label>
            <input type="password" id="password"
              class="px-3.5 py-2.5 text-[#212529] text-sm placeholder:text-[#585858] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] w-full"
              placeholder="Enter your password" required />
          </div>

          <div class="flex items-center justify-between pb-2">
            <label class="flex items-center">
              <input type="checkbox" id="rememberMe" class="w-4 h-4 accent-[#009333] cursor-pointer" />
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>

           <button
  type="button"
  class="text-sm text-[#009333]"
  id="forgotBtn"
  onclick="window.location.href='/login/forgotPassword.php'"
>
  Forgot password?
</button>

          </div>

          <button id="loginBtn" type="submit"
            class="w-full text-white py-2.5 px-3.5 rounded-md bg-[#009333] font-medium transition disabled:opacity-50">
            Log In
          </button>

        </form>

        <!-- Divider -->
        <div class="flex items-center my-6">
          <div class="flex-grow border-t border-[#cbcbcb]"></div>
          <span class="px-4 text-gray-500 text-sm">or Login with</span>
          <div class="flex-grow border-t border-[#cbcbcb]"></div>
        </div>

        <!-- Social Buttons -->
        <div class="flex gap-4 mb-6">
          <button class="w-1/2 flex items-center justify-center gap-3 border border-[#cbcbcb] rounded-md py-2.5 px-3.5 hover:bg-gray-50 transition-colors cursor-pointer">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
            <span class="text-gray-700 font-medium text-sm">Google</span>
          </button>
          <button class="w-1/2 flex items-center justify-center gap-3 border border-[#cbcbcb] rounded-md py-2.5 px-3.5 hover:bg-gray-50 transition-colors cursor-pointer">
            <svg class="w-5 h-5 fill-current text-black" viewBox="0 0 24 24">
                  <path d="M16.365 1.43c0 1.14-.474 2.186-1.3 2.978-.82.787-1.955 1.314-3.092 1.236a2.92 2.92 0 0 1-.018-.34c0-1.09.478-2.19 1.285-2.955C13.068 1.566 14.22 1 15.365 1c.018.14.018.28.018.43h.982zM12.82 6.788c1.55 0 2.742.793 3.484.793.742 0 1.942-.77 3.365-.77.257 0 1.843.03 2.73 1.484-.08.04-1.626.948-1.61 2.815.02 2.228 1.97 2.97 1.99 2.977-.016.05-.31 1.077-1.026 2.13-.644.96-1.312 1.913-2.37 1.932-.97.017-1.25-.63-2.52-.63s-1.6.62-2.56.64c-.95.02-1.678-.95-2.338-1.91-1.272-1.89-2.25-5.346-.93-7.702.64-1.12 1.77-1.78 3.072-1.78z" />
                </svg>
            <span class="text-gray-700 font-medium text-sm">Apple</span>
          </button>
        </div>

        <div class="text-center">
          <span class="text-gray-600">Don't have an account?</span>
          <button id="registerBtn" class="font-medium text-[#009333] cursor-pointer">Register Now.</button>
        </div>

      </div>
    </div>

    <!-- Footer -->
    <div class="flex justify-between items-center text-xs text-gray-500 mt-8">
      <span>Copyright © 2025 InfoGreen Cloud Solutions.</span>
      <span>Privacy Policy</span>
    </div>

  </div>

  <!-- RIGHT SIDE -->
  <div class="relative w-1/2 bg-green-100 overflow-hidden rounded-r-md flex flex-col">

    <div class="flex flex-col justify-center items-center text-center flex-1 p-6">

      <div class="w-full flex justify-center">
        <img id="slideImage" class="max-h-[50vh] object-contain" src="/images/image-1.gif">
      </div>

      <h2 id="slideTitle" class="text-2xl max-w-2xl font-bold mt-12 text-emerald-900">
        Empower teams with customizable access and insights.
      </h2>

      <p id="slideDesc" class="text-lg max-w-2xl text-lime-900 mt-1">
        Tailored roles, smart data, and control at your fingertips.
      </p>

      <!-- Indicator -->
      <div class="flex gap-2 mt-6" id="slideDots"></div>

    </div>

  </div>

</div>

<script src="/login/login.js"></script>

</body>
</html>
