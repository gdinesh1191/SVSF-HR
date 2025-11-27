const optionSidebarItems = [
  { id: "department", label: "Department", supportsSubItems: true },
  { id: "shift", label: "Shift" },
  { id: "staffGroup", label: "Staff Group" },
  { id: "staffCategory", label: "Staff Category" },
  { id: "designation", label: "Designation" },
  { id: "bank", label: "Bank" },
  { id: "deductionAmount", label: "Deduction Amount" },
  { id: "relationshipType", label: "Relationship Type" },
  { id: "leaveType", label: "Leave Type" },
];

const optionFallbackData = {
  department: [
    { id: "department-1", name: "Litigation", status: 1 },
    { id: "department-2", name: "Corporate Advisory", status: 1 },
    { id: "department-3", name: "Intellectual Property", status: 0 },
    { id: "department-4", name: "Real Estate", status: 1 },
    { id: "department-5", name: "Banking & Finance", status: 1 },
    { id: "department-6", name: "Taxation", status: 1 },
    { id: "department-7", name: "Family Law", status: 1 },
    { id: "department-8", name: "Criminal Law", status: 1 },
    { id: "department-9", name: "Constitutional Law", status: 1 },
    { id: "department-10", name: "Environmental Law", status: 1 },
    { id: "department-11", name: "Labor Law", status: 1 },
    { id: "department-12", name: "Intellectual Property Law", status: 1 },
    { id: "department-13", name: "International Law", status: 1 },
    { id: "department-14", name: "Taxation Law", status: 1 },
    { id: "department-15", name: "Tort Law", status: 1 },
    { id: "department-16", name: "Welfare Law", status: 1 },
    { id: "department-17", name: "Cyber Law", status: 1 },
    { id: "department-18", name: "Property Law", status: 1 },
    { id: "department-19", name: "Taxation Law", status: 1 },
    { id: "department-20", name: "Tort Law", status: 1 },
    { id: "department-21", name: "Welfare Law", status: 1 },
    { id: "department-22", name: "Cyber Law", status: 1 },
    { id: "department-23", name: "Property Law", status: 1 },
    { id: "department-24", name: "Taxation Law", status: 1 },
    { id: "department-25", name: "Tort Law", status: 1 },
    { id: "department-26", name: "Welfare Law", status: 1 },
    { id: "department-27", name: "Cyber Law", status: 1 },
    { id: "department-28", name: "Property Law", status: 1 },
    { id: "department-29", name: "Taxation Law", status: 1 },
    { id: "department-30", name: "Tort Law", status: 1 },
  ],
  shift: [
    {
      id: "shift-1",
      name: "Morning Shift",
      code: "MOR",
      in_time: "09:00 AM",
      out_time: "05:00 PM",
      total_time: "8h 0m",
      status: 1,
    },
    {
      id: "shift-2",
      name: "Evening Shift",
      code: "EVE",
      in_time: "01:00 PM",
      out_time: "09:00 PM",
      total_time: "8h 0m",
      status: 1,
    },
    {
      id: "shift-3",
      name: "Night Shift",
      code: "NIG",
      in_time: "09:00 PM",
      out_time: "05:00 AM",
      total_time: "8h 0m",
      status: 0,
    },
  ],
  staffGroup: [
    { id: "sg-1", name: "Legal Team", status: 1 },
    { id: "sg-2", name: "Finance Team", status: 1 },
  ],
  staffCategory: [
    { id: "sc-1", name: "Full Time", status: 1 },
    { id: "sc-2", name: "Contract", status: 1 },
  ],
  designation: [
    { id: "des-1", name: "Associate", status: 1 },
    { id: "des-2", name: "Senior Associate", status: 1 },
  ],
  bank: [
    { id: "bank-1", name: "State Bank of India", status: 1 },
    { id: "bank-2", name: "HDFC Bank", status: 1 },
  ],
  deductionAmount: [
    { id: "ded-1", name: "Professional Tax", status: 1 },
    { id: "ded-2", name: "Health Insurance", status: 1 },
  ],
  relationshipType: [
    { id: "rel-1", name: "Father", status: 1 },
    { id: "rel-2", name: "Mother", status: 1 },
  ],
  leaveType: [
    { id: "leave-1", name: "Casual Leave", status: 1 },
    { id: "leave-2", name: "Sick Leave", status: 1 },
  ],
};

const optionFallbackSubItems = {
  "department-1": ["Civil", "Criminal"],
  "department-2": ["Mergers", "Contracts"],
  "department-3": ["Patents", "Trademarks"],
};

function getTypeMeta(type) {
  return optionSidebarItems.find((item) => item.id === type);
}

function getCurrentTypeLabel() {
  const meta = getTypeMeta(departmentStore.currentType);
  return meta ? meta.label : "Option";
}

function currentTypeSupportsSubItems(type = departmentStore.currentType) {
  const meta = getTypeMeta(type);
  return !!(meta && meta.supportsSubItems);
}

$(document).ready(function () {
  initDepartmentModule();
  initializeReportSidebar();

  $(document).on("click", "[data-report-type]", function () {
    const reportType = $(this).data("report-type");
    setActiveReportTab(reportType);
  });

  $("#reportSidebarSearch").on("input", function () {
    const searchTerm = $(this).val().toLowerCase().trim();
    filterReportSidebarItems(searchTerm);
  });
});

function initializeReportSidebar() {
  buildReportSidebar();
  if (optionSidebarItems.length > 0) {
    setActiveReportTab(optionSidebarItems[0].id);
  } else {
    $("#reportHeaderTitle").text("Options");
  }
}

function buildReportSidebar() {
  const $list = $("#reportSidebarList");
  if (!$list.length) return;
  $list.empty();

  optionSidebarItems.forEach((item) => {
    $list.append(`
      <li class="cursor-pointer report-list-item p-1 rounded transition-colors duration-200 hover:bg-gray-100 flex items-center gap-2" data-report-type="${item.id}">
        <i class="ri-file-text-line text-lg"></i>
        <span>${item.label}</span>
      </li>
    `);
  });
}

function setActiveReportTab(reportType) {
  $("[data-report-type]")
    .removeClass("bg-[#f0f0f0] text-[#009333] rounded-[5px]")
    .addClass("hover:bg-gray-100");

  const activeItem = $(`[data-report-type="${reportType}"]`);
  activeItem
    .removeClass("hover:bg-gray-100")
    .addClass("bg-[#f0f0f0] text-[#009333] rounded-[5px]");

  const selected = optionSidebarItems.find((item) => item.id === reportType);
  const headerTitle = selected ? selected.label : "Options";

  $("#reportHeaderTitle").text(headerTitle);
  loadOptionsForType(reportType);
}

function filterReportSidebarItems(searchTerm) {
  $("[data-report-type]").each(function () {
    const itemText = $(this).text().toLowerCase().trim();
    const $item = $(this);
    if (searchTerm === "" || itemText.includes(searchTerm)) {
      $item.show();
    } else {
      $item.hide();
    }
  });
}

function loadOptionsForType(type) {
  departmentStore.currentType = type;
  departmentStore.searchTerm = "";
  departmentStore.editingDeptId = null;
  hideDepartmentError();

  if (departmentEls.nameInput) {
    departmentEls.nameInput.val("");
  }

  setFormCopyForType();
  closeSubDepartmentCard();
  fetchOptions(type);
}

function setFormCopyForType() {
  const label = getCurrentTypeLabel();
  if (departmentEls.nameInput) {
    departmentEls.nameInput.attr("placeholder", `Enter ${label} Name`);
  }
  if (departmentEls.nameLabel) {
    if (departmentStore.currentType === "shift") {
      departmentEls.nameLabel.text("Shift Name").removeClass("hidden");
    } else {
      departmentEls.nameLabel.addClass("hidden");
    }
  }
  const $title = $("#optionFormTitle");
  if ($title.length) {
    $title.text(`Add ${label}`);
  }
  const $subtitle = $("#optionFormSubtitle");
  if ($subtitle.length) {
    $subtitle.text("Give it a name and you're all set.");
  }
  toggleShiftFields(departmentStore.currentType === "shift");
  updateSubmitButtonLabel();
}

function toggleShiftFields(show) {
  if (!departmentEls.form) return;
  if (departmentEls.codeSection) {
    departmentEls.codeSection.toggleClass("hidden", !show);
  }
  if (departmentEls.codeErrorContainer) {
    departmentEls.codeErrorContainer.toggleClass("hidden", !show);
  }
  if (departmentEls.shiftTimeSection) {
    departmentEls.shiftTimeSection.toggleClass("hidden", !show);
  }
  placeSubmitButton(show);
  if (!show) {
    clearShiftInputs();
    hideFieldError(departmentEls.codeError);
    hideFieldError(departmentEls.inTimeError);
    hideFieldError(departmentEls.outTimeError);
    hideFieldError(departmentEls.totalTimeError);
  }
}

function clearShiftInputs() {
  if (departmentEls.codeInput) {
    departmentEls.codeInput.val("");
  }
  if (departmentEls.inTimeInput) {
    departmentEls.inTimeInput.val("");
  }
  if (departmentEls.outTimeInput) {
    departmentEls.outTimeInput.val("");
  }
  if (departmentEls.totalTimeInput) {
    departmentEls.totalTimeInput.val("");
  }
}

function placeSubmitButton(showShift) {
  if (
    !departmentEls.submitButton ||
    !departmentEls.buttonInline ||
    !departmentEls.buttonBlock
  ) {
    return;
  }
  if (showShift) {
    departmentEls.buttonInline.addClass("hidden");
    departmentEls.buttonBlock
      .removeClass("hidden")
      .append(departmentEls.submitButton);
  } else {
    departmentEls.buttonBlock.addClass("hidden");
    departmentEls.buttonInline
      .removeClass("hidden")
      .append(departmentEls.submitButton);
  }
}

function getShiftInputValues() {
  return {
    code: departmentEls.codeInput
      ? (departmentEls.codeInput.val() || "").trim()
      : "",
    inTime: departmentEls.inTimeInput ? departmentEls.inTimeInput.val() : "",
    outTime: departmentEls.outTimeInput ? departmentEls.outTimeInput.val() : "",
    totalTime: departmentEls.totalTimeInput
      ? departmentEls.totalTimeInput.val()
      : "",
  };
}

function setShiftInputValues(record) {
  if (!record) return;
  if (departmentEls.codeInput) {
    departmentEls.codeInput.val(record.code || "");
  }
  if (departmentEls.inTimeInput) {
    departmentEls.inTimeInput.val(formatDisplayTimeToInput(record.in_time));
  }
  if (departmentEls.outTimeInput) {
    departmentEls.outTimeInput.val(formatDisplayTimeToInput(record.out_time));
  }
  if (departmentEls.totalTimeInput) {
    departmentEls.totalTimeInput.val(record.total_time || "");
  }
}

function updateShiftTotalTime() {
  const { inTime, outTime } = getShiftInputValues();
  if (!inTime || !outTime) {
    if (departmentEls.totalTimeInput) {
      departmentEls.totalTimeInput.val("");
    }
    return;
  }
  const total = calculateDurationLabel(inTime, outTime);
  if (departmentEls.totalTimeInput) {
    departmentEls.totalTimeInput.val(total);
  }
}

function calculateDurationLabel(start, end) {
  if (!start || !end) return "";
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  if ([sh, sm, eh, em].some((v) => Number.isNaN(v))) {
    return "";
  }
  let startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;
  let diff = endMinutes - startMinutes;
  if (diff < 0) {
    diff += 24 * 60;
  }
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return `${hours}h ${minutes}m`;
}

function formatTimeForDisplay(value) {
  if (!value) return "";
  const [hourStr, minuteStr] = value.split(":");
  let hour = Number(hourStr);
  const minute = Number(minuteStr);
  if (Number.isNaN(hour) || Number.isNaN(minute)) return value;
  const meridiem = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  const displayHour = hour.toString().padStart(2, "0");
  const displayMinute = minute.toString().padStart(2, "0");
  return `${displayHour}:${displayMinute} ${meridiem}`;
}

function formatDisplayTimeToInput(value) {
  if (!value) return "";
  const match = value
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return value;
  let hour = Number(match[1]);
  const minute = match[2];
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour < 12) {
    hour += 12;
  }
  if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }
  return `${hour.toString().padStart(2, "0")}:${minute}`;
}


const departmentStore = {
  departments: [],
  isLoading: true,
  searchTerm: "",
  editingDeptId: null,
  subDepartments: {},
  subDeptInputs: {},
  subDeptErrors: {},
  editingSub: null,
  activeRowId: null,
  dropdownEl: null,
  dropdownAnchor: null,
  currentType: optionSidebarItems[0]?.id || "",
};

const departmentEls = {
  form: null,
  nameInput: null,
  nameError: null,
  submitButton: null,
  tbody: null,
  tableHead: null,
  codeSection: null,
  codeInput: null,
  codeError: null,
  codeErrorContainer: null,
  codeSearchInput: null,
  shiftTimeSection: null,
  inTimeInput: null,
  inTimeError: null,
  outTimeInput: null,
  outTimeError: null,
  totalTimeInput: null,
  totalTimeError: null,
};

function initDepartmentModule() {
  cacheDepartmentElements();
  bindDepartmentEvents();
  updateSubmitButtonLabel();
  setFormCopyForType();
}

function cacheDepartmentElements() {
  departmentEls.form = $("#departmentForm");
  departmentEls.nameInput = $("#departmentNameInput");
  departmentEls.nameError = $("#departmentNameError");
  departmentEls.nameLabel = $("#optionNameLabel");
  departmentEls.submitButton = departmentEls.form
    ? departmentEls.form.find('button[type="submit"]')
    : null;
  departmentEls.buttonInline = $("#optionButtonInline");
  departmentEls.buttonBlock = $("#optionButtonBlock");
  departmentEls.tbody = $("#optionTableBody");
  departmentEls.tableHead = $("#optionTableHead");
  departmentEls.tableScroll = $("#optionTableScroll");
  departmentEls.codeSection = $("#optionShiftCodeField");
  departmentEls.codeInput = $("#optionCodeInput");
  departmentEls.codeError = $("#optionCodeError");
  departmentEls.codeErrorContainer = $("#optionShiftCodeErrorContainer");
  departmentEls.shiftTimeSection = $("#optionShiftTimeFields");
  departmentEls.inTimeInput = $("#optionInTimeInput");
  departmentEls.inTimeError = $("#optionInTimeError");
  departmentEls.outTimeInput = $("#optionOutTimeInput");
  departmentEls.outTimeError = $("#optionOutTimeError");
  departmentEls.totalTimeInput = $("#optionTotalTimeInput");
  departmentEls.totalTimeError = $("#optionTotalTimeError");
}

function bindDepartmentEvents() {
  if (departmentEls.form && departmentEls.form.length) {
    departmentEls.form.on("submit", handleDepartmentSubmit);
  }

  if (departmentEls.nameInput && departmentEls.nameInput.length) {
    departmentEls.nameInput.on("input", handleDepartmentInput);
  }

  if (departmentEls.codeInput && departmentEls.codeInput.length) {
    departmentEls.codeInput.on("input", () => hideFieldError(departmentEls.codeError));
  }
  if (departmentEls.inTimeInput && departmentEls.inTimeInput.length) {
    departmentEls.inTimeInput.on("change", () => {
      hideFieldError(departmentEls.inTimeError);
      updateShiftTotalTime();
    });
  }
  if (departmentEls.outTimeInput && departmentEls.outTimeInput.length) {
    departmentEls.outTimeInput.on("change", () => {
      hideFieldError(departmentEls.outTimeError);
      updateShiftTotalTime();
    });
  }

  $(document).on("click", ".dept-row-toggle", handleRowToggle);
  $(document).on("click", ".edit-department", handleEditDepartment);
  $(document).on("click", ".delete-department", handleDeleteDepartment);
  $(document).on("change", ".status-toggle", handleStatusToggle);
  $(document).on(
    "input",
    "#subDepartmentCard input[name='subDepartmentName']",
    handleSubDeptInputChange
  );
  $(document).on("click", "[data-action='save-sub']", handleSaveSubDepartment);
  $(document).on("click", "[data-action='edit-sub']", handleEditSub);
  $(document).on("click", "[data-action='delete-sub']", handleDeleteSub);
  $(document).on("change", "[data-action='toggle-sub']", handleSubToggle);
  $(document).on("mousedown", handleOutsideClick);
  $(window).on("resize", () => {
    if (departmentStore.dropdownEl) {
      closeSubDepartmentCard(true);
    }
  });
  $(window).on("scroll", () => {
    if (departmentStore.dropdownEl) {
      closeSubDepartmentCard(true);
    }
  });
  if (departmentEls.tableScroll && departmentEls.tableScroll.length) {
    departmentEls.tableScroll.on("scroll", () => {
      if (departmentStore.dropdownEl) {
        closeSubDepartmentCard(true);
      }
    });
  }
}

function hydrateFallbackData(type) {
  const fallbackList = optionFallbackData[type] || [];
  departmentStore.departments = fallbackList.map((item) => ({ ...item }));

  if (currentTypeSupportsSubItems(type)) {
    departmentStore.subDepartments = JSON.parse(
      JSON.stringify(optionFallbackSubItems)
    );
  } else {
    departmentStore.subDepartments = {};
  }

  departmentStore.subDeptInputs = {};
  departmentStore.subDeptErrors = {};
  departmentStore.editingSub = null;
  renderTableHeader();
  renderDepartmentTable();
}

function fetchOptions(type) {
  const token = type || departmentStore.currentType || optionSidebarItems[0]?.id;
  if (!token) return;

  departmentStore.isLoading = true;
  renderTableHeader();
  renderDepartmentTable();

  $.ajax({
    url: "/options/get",
    method: "POST",
    dataType: "json",
    data: { token },
  })
    .done((response) => {
      if (response?.status === 1 && Array.isArray(response.data)) {
        departmentStore.departments = response.data.map((item, index) => ({
          id: String(
            item.id ??
              item.option_id ??
              `${token}-${index + 1}`
          ),
          name:
            item.name ??
            item.title ??
            item.departmentName ??
            `${getTypeMeta(token)?.label || "Option"} ${index + 1}`,
          code: item.code ?? item.shift_code ?? "",
          in_time: item.in_time ?? item.inTime ?? "",
          out_time: item.out_time ?? item.outTime ?? "",
          total_time: item.total_time ?? item.totalTime ?? "",
          status: Number(item.status ?? 1),
        }));

        if (currentTypeSupportsSubItems(token)) {
          departmentStore.subDepartments = {};
          departmentStore.departments.forEach((record) => {
            departmentStore.subDepartments[record.id] = [
              ...(optionFallbackSubItems[record.id] || []),
            ];
          });
        } else {
          departmentStore.subDepartments = {};
        }
      } else {
        hydrateFallbackData(token);
      }
    })
    .fail(() => {
      hydrateFallbackData(token);
    })
    .always(() => {
      departmentStore.isLoading = false;
      renderDepartmentTable();
    });
}

function handleDepartmentInput(e) {
  const value = $(e.currentTarget).val() || "";
  departmentStore.searchTerm = value.toLowerCase().trim();
  hideDepartmentError();
  renderDepartmentTable();
}

function handleDepartmentSubmit(e) {
  e.preventDefault();
  if (!departmentEls.nameInput) return;

  const name = departmentEls.nameInput.val().trim();
  const label = getCurrentTypeLabel();
  if (!name) {
    showDepartmentError(`${label} name is required.`);
    return;
  }

  const isShift = departmentStore.currentType === "shift";
  const shiftValues = getShiftInputValues();

  if (isShift) {
    if (!shiftValues.code) {
      showFieldError(departmentEls.codeError, "Shift code is required.");
      return;
    }
    hideFieldError(departmentEls.codeError);
    if (!shiftValues.inTime) {
      showFieldError(departmentEls.inTimeError, "In time is required.");
      return;
    }
    hideFieldError(departmentEls.inTimeError);
    if (!shiftValues.outTime) {
      showFieldError(departmentEls.outTimeError, "Out time is required.");
      return;
    }
    hideFieldError(departmentEls.outTimeError);
  }

  const duplicate = departmentStore.departments.some(
    (dept) =>
      dept.name.toLowerCase() === name.toLowerCase() &&
      dept.id !== departmentStore.editingDeptId
  );

  if (duplicate) {
    showDepartmentError("This department name already exists.");
    return;
  }

  if (isShift) {
    const codeDuplicate = departmentStore.departments.some(
      (dept) =>
        (dept.code || "").toLowerCase() === shiftValues.code.toLowerCase() &&
        dept.id !== departmentStore.editingDeptId
    );
    if (codeDuplicate) {
      showFieldError(departmentEls.codeError, "This shift code already exists.");
      return;
    }
    hideFieldError(departmentEls.codeError);
  }

  if (departmentStore.editingDeptId) {
    const dept = departmentStore.departments.find(
      (item) => item.id === departmentStore.editingDeptId
    );
    if (dept) {
      dept.name = name;
      if (isShift) {
        const totalDuration =
          shiftValues.totalTime || calculateDurationLabel(shiftValues.inTime, shiftValues.outTime);
        if (!totalDuration) {
          showFieldError(
            departmentEls.totalTimeError,
            "Unable to calculate total duration."
          );
          return;
        }
        hideFieldError(departmentEls.totalTimeError);
        dept.code = shiftValues.code;
        dept.in_time = formatTimeForDisplay(shiftValues.inTime);
        dept.out_time = formatTimeForDisplay(shiftValues.outTime);
        dept.total_time = totalDuration;
      }
      showToast(`${label} updated successfully!`, "success");
    }
  } else {
    let totalDuration = "";
    if (isShift) {
      totalDuration =
        shiftValues.totalTime || calculateDurationLabel(shiftValues.inTime, shiftValues.outTime);
      if (!totalDuration) {
        showFieldError(
          departmentEls.totalTimeError,
          "Unable to calculate total duration."
        );
        return;
      }
      hideFieldError(departmentEls.totalTimeError);
    }
    const newDept = {
      id: generateDepartmentId(),
      name,
      status: 1,
    };
    if (isShift) {
      newDept.code = shiftValues.code;
      newDept.in_time = formatTimeForDisplay(shiftValues.inTime);
      newDept.out_time = formatTimeForDisplay(shiftValues.outTime);
      newDept.total_time = totalDuration;
    }
    departmentStore.departments.unshift(newDept);
    if (currentTypeSupportsSubItems()) {
      departmentStore.subDepartments[newDept.id] = [];
    }
    showToast(`${label} added successfully!`, "success");
  }

  resetDepartmentForm();
  renderDepartmentTable();
}

function resetDepartmentForm() {
  if (departmentEls.nameInput) {
    departmentEls.nameInput.val("");
  }
  hideDepartmentError();
  departmentStore.editingDeptId = null;
  clearShiftInputs();
  hideFieldError(departmentEls.codeError);
  hideFieldError(departmentEls.inTimeError);
  hideFieldError(departmentEls.outTimeError);
  hideFieldError(departmentEls.totalTimeError);
  updateSubmitButtonLabel();
}

function showDepartmentError(message) {
  if (departmentEls.nameError) {
    departmentEls.nameError.text(message).removeClass("hidden");
  }
  if (departmentEls.nameInput) {
    departmentEls.nameInput.addClass("border-red-500");
  }
}

function hideDepartmentError() {
  if (departmentEls.nameError) {
    departmentEls.nameError.addClass("hidden").text("");
  }
  if (departmentEls.nameInput) {
    departmentEls.nameInput.removeClass("border-red-500");
  }
}

function showFieldError($el, message) {
  if (!$el || !$el.length) return;
  if (message) {
    $el.text(message).removeClass("hidden");
  } else {
    $el.addClass("hidden").text("");
  }
}

function hideFieldError($el) {
  if (!$el || !$el.length) return;
  $el.addClass("hidden").text("");
}

function generateDepartmentId() {
  const type = departmentStore.currentType || "option";
  return `${type}-${Date.now()}`;
}

function renderDepartmentTable() {
  const $tbody = departmentEls.tbody;
  if (!$tbody || !$tbody.length) return;

  $tbody.empty();
  renderTableHeader();

  if (departmentStore.isLoading) {
    renderSkeletonRows($tbody);
    return;
  }

  const filtered = departmentStore.departments.filter((dept) =>
    dept.name
      .toLowerCase()
      .includes((departmentStore.searchTerm || "").toLowerCase())
  );

  const supportsSubItems = currentTypeSupportsSubItems();
  const isShift = departmentStore.currentType === "shift";

  if (filtered.length === 0) {
    renderEmptyState($tbody);
    closeSubDepartmentCard();
    return;
  }

  filtered.forEach((dept, index) => {
    const arrowDirection =
      departmentStore.activeRowId === dept.id ? "down" : "right";
    const statusChecked = Number(dept.status) === 1 ? "checked" : "";
    if (isShift) {
      const actionButtons = `
        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <span class="edit-department cursor-pointer" data-dept-id="${dept.id}">
            <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c]"></i>
          </span>
          <span class="delete-department cursor-pointer" data-dept-id="${dept.id}">
            <i class="ri-delete-bin-line text-red-600 p-1 rounded border border-[#cfd7df] text-[#4d5e6c]"></i>
          </span>
        </div>`;
      const rowHtml = `
        <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer group relative" data-dept-id="${dept.id}">
          <td class="border-r border-[#ebeff3] p-[0.3rem] text-center">${index + 1}</td>
          <td class="border-r border-[#ebeff3] p-[0.3rem]">
            <div class="flex items-center justify-between text-[#475867] font-medium">
              <span>${escapeHtml(dept.name)}</span>
              ${actionButtons}
            </div>
          </td>
          <td class="border-r border-[#ebeff3] p-[0.3rem]">${escapeHtml(dept.code || "--")}</td>
          <td class="border-r border-[#ebeff3] p-[0.3rem]">${escapeHtml(dept.in_time || "--")}</td>
          <td class="border-r border-[#ebeff3] p-[0.3rem]">${escapeHtml(dept.out_time || "--")}</td>
          <td class="border-r border-[#ebeff3] p-[0.3rem] align-middle text-center">
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer status-toggle" data-dept-id="${dept.id}" ${statusChecked}>
              <span class="block w-[38px] h-[20px] rounded-full bg-gray-300 peer-checked:bg-[#009333] transition-colors duration-200"></span>
              <span class="absolute left-0.5 top-0.5 w-[16px] h-[16px] bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-[18px]"></span>
            </label>
          </td>
        </tr>
      `;
      $tbody.append(rowHtml);
      return;
    }

    const nameCellContent = supportsSubItems
      ? `
          <div class="flex items-center relative dept-row-toggle cursor-pointer select-none" data-dept-id="${dept.id}">
            <i class="dropdown-arrow ri-arrow-${arrowDirection}-s-fill text-gray-700 mr-1 transition-transform duration-200"></i>
            <span>${escapeHtml(dept.name)}</span>
            <div class="flex items-center gap-2 absolute right-0 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-150">
              <span class="edit-department cursor-pointer" data-dept-id="${dept.id}">
                <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c]"></i>
              </span>
              <span class="delete-department cursor-pointer" data-dept-id="${dept.id}">
                <i class="ri-delete-bin-line text-red-600 p-1 rounded border border-[#cfd7df] text-[#4d5e6c]"></i>
              </span>
            </div>
          </div>`
      : `
          <div class="flex items-center justify-between">
            <span class="text-[#475867] font-medium">${escapeHtml(dept.name)}</span>
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <span class="edit-department cursor-pointer" data-dept-id="${dept.id}">
                <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c]"></i>
              </span>
              <span class="delete-department cursor-pointer" data-dept-id="${dept.id}">
                <i class="ri-delete-bin-line text-red-600 p-1 rounded border border-[#cfd7df] text-[#4d5e6c]"></i>
              </span>
            </div>
          </div>`;
    const rowHtml = `
      <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer group relative" data-dept-id="${dept.id}">
        <td class="border-r border-[#ebeff3] p-[0.3rem] text-center">${
          index + 1
        }</td>
        <td class="border-r border-[#ebeff3] p-[0.3rem] relative">
          ${nameCellContent}
        </td>
        <td class="border-r border-[#ebeff3] p-[0.3rem] align-middle text-center">
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer status-toggle" data-dept-id="${
              dept.id
            }" ${statusChecked}>
            <span class="block w-[38px] h-[20px] rounded-full bg-gray-300 peer-checked:bg-[#009333] transition-colors duration-200"></span>
            <span class="absolute left-0.5 top-0.5 w-[16px] h-[16px] bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-[18px]"></span>
          </label>
        </td>
      </tr>
    `;
    $tbody.append(rowHtml);
  });

  if (supportsSubItems && departmentStore.activeRowId) {
    const anchor = document.querySelector(
      `.dept-row-toggle[data-dept-id="${departmentStore.activeRowId}"]`
    );
    if (anchor) {
      renderSubDepartmentCard(departmentStore.activeRowId, anchor);
    } else {
      closeSubDepartmentCard();
    }
  } else if (!supportsSubItems) {
    closeSubDepartmentCard();
  }
}

function renderSkeletonRows($tbody) {
  const columnCount = departmentStore.currentType === "shift" ? 6 : 3;
  for (let i = 0; i < 5; i++) {
    $tbody.append(`
      <tr class="animate-pulse">
        ${Array.from({ length: columnCount })
          .map(
            () => `
          <td class="border-r border-[#ebeff3] p-[0.3rem]">
            <div class="h-4 bg-gray-200 rounded"></div>
          </td>`
          )
          .join("")}
      </tr>
    `);
  }
}

function renderEmptyState($tbody) {
  const label = getCurrentTypeLabel();
  const columnCount = departmentStore.currentType === "shift" ? 6 : 3;
  $tbody.append(`
    <tr>
      <td colspan="${columnCount}" class="py-10 text-center text-gray-500">
        <div class="flex flex-col items-center gap-2">
          <div class="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-500 rounded-full">
            <i class="ri-bar-chart-line text-3xl"></i>
          </div>
          <h2 class="text-base font-semibold text-gray-800">No ${label.toLowerCase()}s added yet</h2>
          <p class="text-sm text-gray-500">Add ${label.toLowerCase()}s to manage them here.</p>
        </div>
      </td>
    </tr>
  `);
}

function renderTableHeader() {
  if (!departmentEls.tableHead || !departmentEls.tableHead.length) return;
  const isShift = departmentStore.currentType === "shift";
  const label = getCurrentTypeLabel();
  if (isShift) {
    departmentEls.tableHead.html(`
      <tr>
        <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">S.no</th>
        <th class="border-r border-[#ebeff3] p-[0.3rem]">Shift Name</th>
        <th class="border-r border-[#ebeff3] p-[0.3rem]">Shift Code</th>
        <th class="border-r border-[#ebeff3] p-[0.3rem]">In Time</th>
        <th class="border-r border-[#ebeff3] p-[0.3rem]">Out Time</th>
        <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">Status</th>
      </tr>
    `);
    return;
  }

  departmentEls.tableHead.html(`
    <tr>
      <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">S.no</th>
      <th class="border-r border-[#ebeff3] p-[0.3rem]">${label} Name</th>
      <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">Status</th>
    </tr>
  `);
}

function handleRowToggle(e) {
  if (!currentTypeSupportsSubItems()) return;
  e.preventDefault();
  const deptId = $(this).data("dept-id");
  if (!deptId) return;

  if (departmentStore.activeRowId === deptId) {
    departmentStore.activeRowId = null;
    closeSubDepartmentCard();
    renderDepartmentTable();
    return;
  }

  departmentStore.activeRowId = deptId;
  ensureSubDepartmentState(deptId);
  renderDepartmentTable();
}

function ensureSubDepartmentState(deptId) {
  if (!currentTypeSupportsSubItems()) return;
  if (!departmentStore.subDepartments[deptId]) {
    departmentStore.subDepartments[deptId] = [];
  }
  if (typeof departmentStore.subDeptInputs[deptId] === "undefined") {
    departmentStore.subDeptInputs[deptId] = "";
  }
  if (typeof departmentStore.subDeptErrors[deptId] === "undefined") {
    departmentStore.subDeptErrors[deptId] = "";
  }
}

function handleEditDepartment(e) {
  e.preventDefault();
  e.stopPropagation();
  const deptId = $(this).data("dept-id");
  const dept = departmentStore.departments.find((item) => item.id === deptId);
  if (!dept || !departmentEls.nameInput) return;

  departmentStore.editingDeptId = deptId;
  departmentEls.nameInput.val(dept.name).focus();
  if (departmentStore.currentType === "shift") {
    setShiftInputValues(dept);
  }
  updateSubmitButtonLabel();
  hideDepartmentError();
}

function handleDeleteDepartment(e) {
  e.preventDefault();
  e.stopPropagation();
  const deptId = $(this).data("dept-id");
  const dept = departmentStore.departments.find((item) => item.id === deptId);
  if (!dept) return;
  const label = getCurrentTypeLabel();
 
  showConfirmationModal({
    title: `Delete ${label}`,
    message: `Are you sure you want to delete the ${label.toLowerCase()} "${dept.name}"? This action cannot be undone.`,
    confirmText: `Delete ${label}`,
    cancelText: "Cancel",
    iconName: "delete",
    onConfirm: () => {
      departmentStore.departments = departmentStore.departments.filter(
        (item) => item.id !== deptId
      );
      delete departmentStore.subDepartments[deptId];
      if (departmentStore.activeRowId === deptId) {
        departmentStore.activeRowId = null;
        closeSubDepartmentCard();
      }
      showToast(`${label} deleted successfully!`, "success");
      renderDepartmentTable();
    },
  });
  
}

function handleStatusToggle() {
  const deptId = $(this).data("dept-id");
  const dept = departmentStore.departments.find((item) => item.id === deptId);
  if (!dept) return;
  const isChecked = $(this).is(":checked");
  const action = isChecked ? "activate" : "deactivate";
  const label = getCurrentTypeLabel();
  showConfirmationModal({
    title: `${isChecked ? "Activate" : "Deactivate"} ${label}`,
    message: `Are you sure you want to ${action} the ${label.toLowerCase()} "${dept.name}"?`,
    confirmText: isChecked ? `Activate ${label}` : `Deactivate ${label}`,
    cancelText: "Cancel",
    iconName: isChecked ? "leave" : "delete",
    onConfirm: () => {
      dept.status = isChecked ? 1 : 0;
      showToast(`${label} ${action}d successfully!`, "success");
      renderDepartmentTable();
    },
    onCancel: () => {
      $(this).prop("checked", !isChecked);
    },
  });
}

function handleSubDeptInputChange(e) {
  if (!currentTypeSupportsSubItems()) return;
  const deptId = $(e.currentTarget).data("dept-id");
  if (!deptId) return;
  ensureSubDepartmentState(deptId);
  departmentStore.subDeptInputs[deptId] = $(e.currentTarget).val();
}

function handleSaveSubDepartment(e) {
  if (!currentTypeSupportsSubItems()) return;
  e.preventDefault();
  const deptId = $(e.currentTarget).data("dept-id");
  if (!deptId) return;
  ensureSubDepartmentState(deptId);

  const newSub = (departmentStore.subDeptInputs[deptId] || "").trim();
  departmentStore.subDeptErrors[deptId] = "";

  if (!newSub) {
    departmentStore.subDeptErrors[deptId] = "Sub-department name is required.";
    renderSubDepartmentCard(deptId);
    return;
  }

  const list = departmentStore.subDepartments[deptId];
  const isDuplicate = list.some(
    (sub, index) =>
      sub.toLowerCase() === newSub.toLowerCase() &&
      (!departmentStore.editingSub ||
        departmentStore.editingSub.index !== index ||
        departmentStore.editingSub.deptId !== deptId)
  );

  if (isDuplicate) {
    departmentStore.subDeptErrors[deptId] =
      "This sub-department name already exists.";
    renderSubDepartmentCard(deptId);
    return;
  }

  if (
    departmentStore.editingSub &&
    departmentStore.editingSub.deptId === deptId
  ) {
    list[departmentStore.editingSub.index] = newSub;
    departmentStore.editingSub = null;
    showToast("Sub-department updated successfully!", "success");
  } else {
    list.push(newSub);
    showToast("Sub-department added successfully!", "success");
  }

  departmentStore.subDeptInputs[deptId] = "";
  renderSubDepartmentCard(deptId);
}

function handleEditSub(e) {
  if (!currentTypeSupportsSubItems()) return;
  e.preventDefault();
  const deptId = $(e.currentTarget).data("dept-id");
  const index = Number($(e.currentTarget).data("sub-index"));
  if (!deptId || Number.isNaN(index)) return;
  ensureSubDepartmentState(deptId);
  const currentValue = departmentStore.subDepartments[deptId][index];
  departmentStore.editingSub = { deptId, index };
  departmentStore.subDeptInputs[deptId] = currentValue;
  renderSubDepartmentCard(deptId);
}

function handleDeleteSub(e) {
  if (!currentTypeSupportsSubItems()) return;
  e.preventDefault();
  const deptId = $(e.currentTarget).data("dept-id");
  const index = Number($(e.currentTarget).data("sub-index"));
  if (!deptId || Number.isNaN(index)) return;
  ensureSubDepartmentState(deptId);
  departmentStore.subDepartments[deptId].splice(index, 1);
  if (
    departmentStore.editingSub &&
    departmentStore.editingSub.deptId === deptId &&
    departmentStore.editingSub.index === index
  ) {
    departmentStore.editingSub = null;
    departmentStore.subDeptInputs[deptId] = "";
  }
  showToast("Sub-department deleted successfully!", "success");
  renderSubDepartmentCard(deptId);
}

function handleSubToggle(e) {
  if (!currentTypeSupportsSubItems()) return;
  const deptId = $(e.currentTarget).data("dept-id");
  const index = Number($(e.currentTarget).data("sub-index"));
  const isChecked = $(e.currentTarget).is(":checked");
  const subName =
    departmentStore.subDepartments[deptId] &&
    departmentStore.subDepartments[deptId][index];
  if (subName) {
    console.log(
      `Sub-department "${subName}" in department ${deptId} is now ${
        isChecked ? "Active" : "Inactive"
      }`
    );
  }
}

function handleOutsideClick(e) {
  if (!departmentStore.dropdownEl) return;
  const isCardClick = departmentStore.dropdownEl.contains(e.target);
  const isToggle =
    $(e.target).closest(".dept-row-toggle").length > 0 ||
    $(e.target).closest("#subDepartmentCard").length > 0;
  if (!isCardClick && !isToggle) {
    closeSubDepartmentCard(true);
  }
}

function closeSubDepartmentCard(shouldRerender = false) {
  if (departmentStore.dropdownEl) {
    $(departmentStore.dropdownEl).remove();
  }
  departmentStore.dropdownEl = null;
  departmentStore.dropdownAnchor = null;
  departmentStore.activeRowId = null;
  if (shouldRerender) {
    renderDepartmentTable();
  }
}

function renderSubDepartmentCard(deptId, anchorEl) {
  if (!currentTypeSupportsSubItems()) return;
  ensureSubDepartmentState(deptId);
  const list = departmentStore.subDepartments[deptId] || [];
  const inputValue = departmentStore.subDeptInputs[deptId] || "";
  const errorMessage = departmentStore.subDeptErrors[deptId] || "";
  const editingSub = departmentStore.editingSub;

  let $card = $("#subDepartmentCard");
  if (!$card.length) {
    $card = $(
      '<div id="subDepartmentCard" class="fixed z-[1000] bg-white p-4 rounded-lg shadow-xl border border-gray-200 flex flex-col gap-3"></div>'
    );
    $("body").append($card);
  }

  const listItems =
    list.length === 0
      ? '<li class="text-sm text-gray-500">No sub-departments added yet.</li>'
      : list
          .map(
            (sub, index) => `
        <li class="flex items-center border p-2 rounded-md bg-white relative hover:bg-gray-50 group/sub" data-sub-index="${index}">
          <div class="flex items-center gap-2 w-full">
            <input type="checkbox" class="cursor-pointer accent-[#009333]" data-action="toggle-sub" data-dept-id="${deptId}" data-sub-index="${index}">
            <span class="flex items-center gap-2">
              <span class="font-semibold text-gray-600">${toRoman(
                index + 1
              )}</span>
              ${escapeHtml(sub)}
            </span>
          </div>
          <div class="flex items-center gap-2 absolute right-2 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200">
            <span class="cursor-pointer" data-action="edit-sub" data-dept-id="${deptId}" data-sub-index="${index}">
              <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c]"></i>
            </span>
            <span class="cursor-pointer" data-action="delete-sub" data-dept-id="${deptId}" data-sub-index="${index}">
              <i class="ri-delete-bin-line text-red-600 p-1 rounded border border-[#cfd7df] text-[#4d5e6c]"></i>
            </span>
          </div>
        </li>
      `
          )
          .join("");

  const cardHtml = `
    <div class="flex items-start gap-2">
      <div class="relative flex-1">
        <input type="text" name="subDepartmentName" data-dept-id="${deptId}" value="${escapeHtml(
    inputValue
  )}" class="capitalize w-full border ${
    errorMessage ? "border-red-500" : "border-gray-300"
  } rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#009333]" placeholder="Enter sub-department name" />
        ${
          errorMessage
            ? `<p class="text-xs text-red-500 mt-1">${escapeHtml(
                errorMessage
              )}</p>`
            : ""
        }
        ${
          editingSub && editingSub.deptId === deptId
            ? `<p class="text-[11px] text-[#475867] mt-1">Editing sub-department #${
                editingSub.index + 1
              }</p>`
            : ""
        }
      </div>
      <button type="button" class="py-2 px-3 text-sm rounded bg-[#009333] text-white hover:bg-[#007a2a]" data-action="save-sub" data-dept-id="${deptId}">
        Save
      </button>
    </div>
    <ul class="mt-3 space-y-2 ${
      list.length > 4 ? "max-h-48 overflow-y-auto" : ""
    }">
      ${listItems}
    </ul>
  `;

  $card.attr("data-dept-id", deptId).html(cardHtml);
  departmentStore.dropdownEl = $card[0];
  if (anchorEl) {
    departmentStore.dropdownAnchor = anchorEl;
  }

  requestAnimationFrame(() => {
    if (departmentStore.dropdownEl && departmentStore.dropdownAnchor) {
      positionSubDepartmentCard(
        departmentStore.dropdownAnchor,
        departmentStore.dropdownEl
      );
    }
  });
}

function positionSubDepartmentCard(anchorEl, cardEl) {
  if (!anchorEl || !cardEl) return;
  const rect = anchorEl.getBoundingClientRect();
  const margin = 8;
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  const viewportBottom = scrollY + window.innerHeight;

  let top = rect.bottom + scrollY + margin;
  if (top + cardEl.offsetHeight > viewportBottom) {
    top = rect.top + scrollY - cardEl.offsetHeight - margin;
    if (top < scrollY + 16) {
      top = scrollY + 16;
    }
  }

  cardEl.style.top = `${top}px`;
  cardEl.style.left = `${rect.left + scrollX}px`;
  cardEl.style.width = `${rect.width}px`;
}

function updateSubmitButtonLabel() {
  if (!departmentEls.submitButton) return;
  const label = getCurrentTypeLabel();
  if (departmentStore.editingDeptId) {
    departmentEls.submitButton
      .html(`<i class="ri-edit-line mr-1"></i>Update ${label}`);
  } else {
    departmentEls.submitButton
      .html(`<i class="ri-add-line mr-1"></i>Save ${label}`);
  }
}



function toRoman(num) {
  const romans = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let result = "";
  romans.forEach(([symbol, value]) => {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  });
  return result;
}

function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

