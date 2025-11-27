/* SLIDES */
const slides = [
  {
    text: "Empower teams with customizable access and insights.",
    description: "Tailored roles, smart data, and control at your fingertips.",
    bg: "/images/image-1.gif"
  },
  {
    text: "Optimize workflows with real-time punch data and reporting.",
    description: "Track, manage, and grow your workforce with confidence.",
    bg: "/images/image-2.gif"
  },
  {
    text: "Streamline attendance, leave, and permission management.",
    description: "Simplify staff operations with a centralized, intelligent system.",
    bg: "/images/image-3.gif"
  }
];

let currentIndex = 0;
let interval;

/* Create slider dots */
slides.forEach((_, i) => {
  $("#slideDots").append(`
      <button class="h-2 w-2 rounded-full bg-emerald-900 bg-opacity-30" data-index="${i}"></button>
  `);
});

/* Auto slide */
function startSlide() {
  interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  }, 3000);
}
startSlide();

/* Update slide content */
function updateSlide() {
  $("#slideImage").attr("src", slides[currentIndex].bg);
  $("#slideTitle").text(slides[currentIndex].text);
  $("#slideDesc").text(slides[currentIndex].description);

  $("#slideDots button").removeClass("w-6 bg-opacity-100").addClass("w-2 bg-opacity-30");
  $(`#slideDots button[data-index=${currentIndex}]`)
    .removeClass("bg-opacity-30 w-2")
    .addClass("w-6 bg-opacity-100");
}

/* Dot Click */
$(document).on("click", "#slideDots button", function () {
  clearInterval(interval);
  currentIndex = $(this).data("index");
  updateSlide();
  startSlide();
});

/* Login Submit */
$("#loginForm").submit(function (e) {
  e.preventDefault();

  $("#loginBtn").text("Logging in...").prop("disabled", true);


});
