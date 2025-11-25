class ConfirmationModal {
  constructor(modalSelector = "#departmentConfirmModal") {
    this.modal = $(modalSelector);
    this.title = $("#confirmModalTitle");
    this.message = $("#confirmModalMessage");
    this.confirmBtn = $("#confirmModalConfirm");
    this.cancelBtn = $("#confirmModalCancel");
    this.closeBtn = $("#confirmModalCloseBtn");
    this.outerCircle = $("#confirmModalOuterCircle");
    this.middleCircle = $("#confirmModalMiddleCircle");
    this.innerCircle = $("#confirmModalInnerCircle");
    this.icon = $("#confirmModalIcon");
    
    this.onConfirmCallback = null;
    this.onCancelCallback = null;
    
    this.init();
  }
  
  init() {
    if (!this.modal.length) return;
    
    this.confirmBtn.on("click", () => this.handleConfirm());
    this.cancelBtn.on("click", () => this.handleCancel());
    this.closeBtn.on("click", () => this.handleCancel());
    this.modal.on("click", (e) => {
      if ($(e.target).is(this.modal)) {
        this.handleCancel();
      }
    });
  }
  
  show({
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    iconName = "delete",
    onConfirm,
    onCancel,
  }) {
    if (!this.modal.length) return;
    
    const styles = {
      delete: {
        icon: "ri-delete-bin-line",
        outer: "bg-[#f9ecec]",
        middle: "bg-[#f9d6d7]",
        inner: "bg-[#d4333a]",
        button: "bg-[#d53635]",
      },
      leave: {
        icon: "ri-logout-box-line",
        outer: "bg-[#e9f7ec]",
        middle: "bg-[#c8edd2]",
        inner: "bg-[#1c8d4b]",
        button: "bg-green-600",
      },
      info: {
        icon: "ri-information-line",
        outer: "bg-blue-100",
        middle: "bg-blue-200",
        inner: "bg-blue-600",
        button: "bg-blue-600",
      },
    };
    
    const style = styles[iconName] || styles.delete;
    
    this.title.text(title);
    this.message.text(message);
    this.confirmBtn
      .text(confirmText)
      .attr("class", `px-6 py-2 w-full cursor-pointer text-sm font-medium text-white rounded-lg ${style.button}`);
    this.cancelBtn.text(cancelText);
    
    this.outerCircle.attr("class", `absolute w-[66px] h-[66px] rounded-full opacity-70 ${style.outer}`);
    this.middleCircle.attr("class", `absolute w-[46px] h-[46px] rounded-full opacity-90 ${style.middle}`);
    this.innerCircle.attr("class", `z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center ${style.inner}`);
    this.icon.attr("class", `${style.icon} text-white`);
    
    this.onConfirmCallback = typeof onConfirm === "function" ? onConfirm : null;
    this.onCancelCallback = typeof onCancel === "function" ? onCancel : null;
    
    this.modal.removeClass("hidden").addClass("flex");
  }
  
  hide() {
    if (!this.modal.length) return;
    this.modal.addClass("hidden").removeClass("flex");
    this.onConfirmCallback = null;
    this.onCancelCallback = null;
  }
  
  handleConfirm() {
    const callback = this.onConfirmCallback;
    this.hide();
    if (typeof callback === "function") {
      callback();
    }
  }
  
  handleCancel() {
    const callback = this.onCancelCallback;
    this.hide();
    if (typeof callback === "function") {
      callback();
    }
  }
}

const confirmationModal = new ConfirmationModal();

function showConfirmationModal(options) {
  confirmationModal.show(options);
}

function hideConfirmationModal() {
  confirmationModal.hide();
}

