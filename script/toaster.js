class Toaster {
  constructor(toastSelector = "#departmentToast") {
    this.toast = $(toastSelector);
    this.timer = null;
    this.init();
  }
  
  init() {
    if (!this.toast.length) return;
  }
  
  escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
  
  show(message, type = "info", duration = 3000) {
    if (!this.toast.length) return;
    
    const styles = {
      info: {
        bar: "bg-[#0066CC]",
        titleColor: "text-[#0066CC]",
        title: "Info",
      },
      success: {
        bar: "bg-[#009333]",
        titleColor: "text-[#009333]",
        title: "Success",
      },
      error: {
        bar: "bg-[#CC0000]",
        titleColor: "text-[#CC0000]",
        title: "Error",
      },
      warning: {
        bar: "bg-[#E6A100]",
        titleColor: "text-[#E6A100]",
        title: "Warning",
      },
    };
    
    const currentStyle = styles[type] || styles.info;
    
    const toastContent = `
      <div class="p-3 rounded-md shadow-lg bg-white relative overflow-hidden">
        <div class="flex items-start relative">
          <div class="w-2 h-full ${currentStyle.bar} absolute left-0 top-0 bottom-0 rounded-md"></div>
          <div class="ml-7 flex-1">
            <div class="flex justify-between items-start">
              <h4 class="${currentStyle.titleColor} font-semibold text-[17px]">${currentStyle.title} !</h4>
              <button type="button" class="text-gray-700 hover:text-black text-lg leading-none" data-action="toast-close">
                <i class="ri-close-line"></i>
              </button>
            </div>
            <p class="text-gray-600 text-sm leading-snug pr-7">${this.escapeHtml(message)}</p>
          </div>
        </div>
      </div>
    `;
    
    this.toast
      .html(toastContent)
      .removeClass("hidden opacity-0 translate-y-4 pointer-events-none")
      .addClass("opacity-100 translate-y-0 pointer-events-auto");
    
    this.toast.find("[data-action='toast-close']").on("click", () => {
      this.hide();
    });
    
    if (this.timer) {
      clearTimeout(this.timer);
    }
    
    if (duration > 0) {
      this.timer = setTimeout(() => {
        this.hide();
      }, duration);
    }
  }
  
  hide() {
    if (!this.toast.length) return;
    this.toast
      .addClass("opacity-0 translate-y-4 pointer-events-none")
      .removeClass("opacity-100 translate-y-0 pointer-events-auto");
    
    setTimeout(() => {
      this.toast.addClass("hidden").empty();
    }, 200);
    
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}

const toaster = new Toaster();

function showToast(message, type = "info", duration = 3000) {
  toaster.show(message, type, duration);
}

function hideToast() {
  toaster.hide();
}

