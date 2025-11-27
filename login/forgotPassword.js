$(document).ready(function () {

  // Show error
  function showError(msg) {
    $("#errorBox").text(msg).removeClass("hidden");
  }

  function hideError() {
    $("#errorBox").addClass("hidden");
  }

  // STEP 1: Send OTP
  $("#sendOtpBtn").click(function () {
    hideError();
    const username = $("#usernameInput").val().trim();

    if (!username) {
      showError("Username is required");
      return;
    }

    $("#step-username").hide();
    $("#step-otp").show();

    $(".otp-input").first().focus();
  });

  // OTP auto move
  $(".otp-input").on("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");

    if (this.value.length === 1) {
      $(this).next(".otp-input").focus();
    }
  });

  // Backspace auto-go-back
  $(".otp-input").on("keydown", function (e) {
    if (e.key === "Backspace" && this.value === "") {
      $(this).prev(".otp-input").focus();
    }
  });

  // STEP 2: Verify OTP
  $("#verifyOtpBtn").click(function () {
    hideError();

    let otp = "";
    $(".otp-input").each(function () {
      otp += $(this).val();
    });

    if (otp.length !== 5) {
      showError("Enter the 5-digit OTP");
      return;
    }

    $("#step-otp").hide();
    $("#step-reset").show();
  });

  // STEP 3: Reset Password
  $("#resetPasswordBtn").click(function () {
    hideError();

    const np = $("#newPassword").val().trim();
    const cp = $("#confirmPassword").val().trim();

    if (!np || !cp) {
      showError("Both password fields are required");
      return;
    }
    if (np !== cp) {
      showError("Passwords do not match");
      return;
    }

    $("#step-reset").hide();
    $("#step-done").show();
  });

});