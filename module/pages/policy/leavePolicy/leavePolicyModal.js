// Leave Policy Modal Component - Plain JavaScript
const leavePolicyModalStore = {
  activeTab: "general",
  toggleStates: {
    "early-leaving": false,
    "shift-swap": false,
    "weekly-off": false,
    "comp-off": false,
    biometric: false,
    "probation-leave": false,
    "leave-encashment": false,
    "public-holiday-ot": false,
    "alternate-weekly-off": false,
    "unauthorized-absence": false,
    // Casual Leave Toggles
    "half-day-cl-allowed": false,
    "cl-carry-forward": false,
    "cl-encashment": false,
    "club-with-el": false,
    "club-with-ml": false,
    "emergency-cl": false,
    "weekend-sandwich-rule": false,
    "cl-for-vacation": false,
    "probation-cl": false,
    "cl-on-festival-peak-days": false,
    "cl-with-permissions": false,
    "lapse-at-year-end": false,
    "last-minute-cl-penalty": false,
    "cl-approval-required": false,
    // Medical Leave Toggles
    "half-day-ml-allowed": false,
    "ml-carry-forward": false,
    "medical-proof-required": false,
    "ml-encashment": false,
    "combine-with-el": false,
    "combine-with-cl": false,
    "probation-ml": false,
    "hospitalization-proof": false,
    "fit-to-work-certificate": false,
    "salary-deduction-beyond-limit": false,
    "ml-weekend-sandwich-rule": false,
    "emergency-ml-allowed": false,
    "ml-during-audit-approval": false,
    "monitoring-sick-leave-abuse": false,
    "ml-approval-required": false,
    // Overtime (OT) Toggles
    "ot-prior-approval": false,
    "ot-on-holidays": false,
    "ot-records-in-payroll": false,
    "night-shift-ot": false,
    "comp-off-instead-of-ot": false,
    "unauthorized-ot": false,
    "ot-during-probation": false,
    "ot-allowance-meals": false,
    "ot-encashment-limit": false,
    "false-ot-claims": false,
    "public-holiday-ot-mandatory": false,
    "emergency-ot-allowed": false,
    // On-Duty (OD) Toggles
    "od-counted-as-work": false,
    "od-for-personal-work": false,
    "od-report-submission": false,
    "od-travel-allowance": false,
    "od-on-weekly-off": false,
    "od-on-holiday": false,
    "od-deduction-from-leave": false,
    "od-log": false,
    "frequent-od-misuse-penalty": false,
    "od-outside-city": false,
    "od-meal-allowance": false,
    "od-during-shift-peak": false,
    "od-with-client-meetings": false,
    "od-reimbursement": false,
    "od-form-mandatory": false,
    "od-approval-from-hod": false,
    "unauthorized-od": false,
    "ot-register": false,
  },
  formData: {},
};

// DOM Elements
const leavePolicyModalEls = {
  container: null,
};

// Toggle Component HTML Generator
function renderToggle(name, checked, label = "") {
  const toggleId = `toggle-${name}`;
  return `
    <label class="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        class="sr-only peer" 
        data-toggle-name="${name}"
        ${checked ? "checked" : ""}
      />
      <div class="w-8 h-4 bg-white rounded-full border border-gray-300 peer-checked:bg-[#009333] transition-colors"></div>
      <div class="absolute left-0.5 top-0.2 w-2.5 h-2.5 bg-[#bfbfbf] rounded-full shadow transition-transform peer-checked:translate-x-4 peer-checked:bg-white"></div>
      ${label ? `<span class="ml-3 text-sm text-gray-700">${escapeHtml(label)}</span>` : ""}
    </label>
  `;
}

// Input field HTML Generator
function renderInput(name, value = "", placeholder = "", className = " bottom-border-input w-16") {
  return `<input type="text" name="${name}" class="${className}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" />`;
}

// Tab Content Renderers
function renderGeneralTab() {
  const { toggleStates, formData } = leavePolicyModalStore;
  return `
    <div class="flex flex-col max-h-[calc(100vh-180px)]">
      <div class="overflow-auto flex-1 px-4 pt-4">
        <ul class="space-y-2 text-[14px]">
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Grace period for late coming:</span>
            ${renderInput("grace-period", formData["grace-period"] || "")}
            <span class="ml-1">mins</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max late arrivals allowed per month:</span>
            ${renderInput("max-late-arrivals", formData["max-late-arrivals"] || "")}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Early leaving allowed:</span>
            ${renderToggle("early-leaving", toggleStates["early-leaving"])}
            <span class="ml-1">(max 30 mins)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Permissions allowed per month:</span>
            ${renderInput("permissions-per-month", formData["permissions-per-month"] || "")}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Permission duration:</span>
            ${renderInput("permission-duration", formData["permission-duration"] || "")}
            <span class="ml-1">hrs</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Half-day if absent for more than:</span>
            ${renderInput("half-day-absence", formData["half-day-absence"] || "")}
            <span class="ml-1">hrs</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Shift swap allowed:</span>
            ${renderToggle("shift-swap", toggleStates["shift-swap"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Weekly off fixed:</span>
            ${renderToggle("weekly-off", toggleStates["weekly-off"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Compensatory off allowed:</span>
            ${renderToggle("comp-off", toggleStates["comp-off"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max comp-off validity:</span>
            ${renderInput("comp-off-validity", formData["comp-off-validity"] || "")}
            <span class="ml-1">days</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Leave request notice:</span>
            ${renderInput("leave-notice", formData["leave-notice"] || "")}
            <span class="ml-1">days</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Emergency leave intimation:</span>
            ${renderInput("emergency-leave", formData["emergency-leave"] || "")}
            <span class="ml-1">hrs before shift</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Attendance via biometric:</span>
            ${renderToggle("biometric", toggleStates["biometric"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Late penalties:</span>
            ${renderInput("late-penalty", formData["late-penalty"] || "")}
            <span class="ml-1">(e.g., 3 late = ½ day)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Probation leave entitlement:</span>
            ${renderToggle("probation-leave", toggleStates["probation-leave"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Leave encashment:</span>
            ${renderToggle("leave-encashment", toggleStates["leave-encashment"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Minimum shift hours:</span>
            ${renderInput("shift-hours", formData["shift-hours"] || "")}
            <span class="ml-1">hrs</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Public holiday OT:</span>
            ${renderToggle("public-holiday-ot", toggleStates["public-holiday-ot"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Alternate weekly off:</span>
            ${renderToggle("alternate-weekly-off", toggleStates["alternate-weekly-off"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Unauthorized absence:</span>
            ${renderToggle("unauthorized-absence", toggleStates["unauthorized-absence"])}
          </li>
        </ul>
      </div>
      <div class="px-4 py-3 border-t border-[#dee2e6] flex justify-end gap-2">
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" data-action="apply">Apply</button>
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" data-action="cancel">Cancel</button>
      </div>
    </div>
  `;
}

function renderCasualTab() {
  const { toggleStates, formData } = leavePolicyModalStore;
  return `
    <div class="flex flex-col max-h-[calc(100vh-180px)]">
      <div class="overflow-auto flex-1 px-4 pt-4">
        <ul class="space-y-2 text-[14px]">
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Annual entitlement:</span>
            ${renderInput("cl-annual-entitlement", formData["cl-annual-entitlement"] || "", "e.g., 6-12")}
            <span class="ml-1">days</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Half-day CL allowed:</span>
            ${renderToggle("half-day-cl-allowed", toggleStates["half-day-cl-allowed"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max consecutive CL:</span>
            ${renderInput("max-consecutive-cl", formData["max-consecutive-cl"] || "")}
            <span class="ml-1">days</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Carry forward:</span>
            ${renderToggle("cl-carry-forward", toggleStates["cl-carry-forward"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Encashment:</span>
            ${renderToggle("cl-encashment", toggleStates["cl-encashment"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Prior notice:</span>
            ${renderInput("cl-prior-notice", formData["cl-prior-notice"] || "")}
            <span class="ml-1">day(s)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Club with EL:</span>
            ${renderToggle("club-with-el", toggleStates["club-with-el"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Club with ML:</span>
            ${renderToggle("club-with-ml", toggleStates["club-with-ml"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Emergency CL:</span>
            ${renderToggle("emergency-cl", toggleStates["emergency-cl"])}
            <span class="ml-1">(inform before shift)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max CL/month:</span>
            ${renderInput("max-cl-month", formData["max-cl-month"] || "")}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Weekend sandwich rule:</span>
            ${renderToggle("weekend-sandwich-rule", toggleStates["weekend-sandwich-rule"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">CL for vacation:</span>
            ${renderToggle("cl-for-vacation", toggleStates["cl-for-vacation"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Probation CL:</span>
            ${renderToggle("probation-cl", toggleStates["probation-cl"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">CL beyond entitlement:</span>
            ${renderInput("cl-beyond-entitlement", formData["cl-beyond-entitlement"] || "", "e.g., LOP")}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">CL on festival peak days:</span>
            ${renderToggle("cl-on-festival-peak-days", toggleStates["cl-on-festival-peak-days"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">CL with permissions:</span>
            ${renderToggle("cl-with-permissions", toggleStates["cl-with-permissions"])}
            <span class="ml-1">(adjustable)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Lapse at year end:</span>
            ${renderToggle("lapse-at-year-end", toggleStates["lapse-at-year-end"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Last-minute CL penalty:</span>
            ${renderToggle("last-minute-cl-penalty", toggleStates["last-minute-cl-penalty"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max short-notice CL:</span>
            ${renderInput("max-short-notice-cl", formData["max-short-notice-cl"] || "")}
            <span class="ml-1">per year</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Approval required:</span>
            ${renderToggle("cl-approval-required", toggleStates["cl-approval-required"])}
          </li>
        </ul>
      </div>
      <div class="px-4 py-3 border-t border-[#dee2e6] flex justify-end gap-2">
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" data-action="apply">Apply</button>
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" data-action="cancel">Cancel</button>
      </div>
    </div>
  `;
}

function renderMedicalTab() {
  const { toggleStates, formData } = leavePolicyModalStore;
  return `
    <div class="flex flex-col max-h-[calc(100vh-180px)]">
      <div class="overflow-auto flex-1 px-4 pt-4">
        <ul class="space-y-2 text-[14px]">
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Annual entitlement:</span>
            ${renderInput("ml-annual-entitlement", formData["ml-annual-entitlement"] || "", "e.g., 6-12")}
            <span class="ml-1">days</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Half-day ML:</span>
            ${renderToggle("half-day-ml-allowed", toggleStates["half-day-ml-allowed"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Carry forward:</span>
            ${renderToggle("ml-carry-forward", toggleStates["ml-carry-forward"])}
            <span class="ml-1">(if unused)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Medical proof required:</span>
            ${renderToggle("medical-proof-required", toggleStates["medical-proof-required"])}
            <span class="ml-1">(2 days)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Encashment:</span>
            ${renderToggle("ml-encashment", toggleStates["ml-encashment"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Combine with EL:</span>
            ${renderToggle("combine-with-el", toggleStates["combine-with-el"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Combine with CL:</span>
            ${renderToggle("combine-with-cl", toggleStates["combine-with-cl"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Probation ML:</span>
            ${renderToggle("probation-ml", toggleStates["probation-ml"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max consecutive ML:</span>
            ${renderInput("max-consecutive-ml", formData["max-consecutive-ml"] || "")}
            <span class="ml-1">days</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Sick leave notification:</span>
            ${renderInput("sick-leave-notification", formData["sick-leave-notification"] || "")}
            <span class="ml-1">hr before shift</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Hospitalization proof:</span>
            ${renderToggle("hospitalization-proof", toggleStates["hospitalization-proof"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Fit-to-work certificate:</span>
            ${renderToggle("fit-to-work-certificate", toggleStates["fit-to-work-certificate"])}
            <span class="ml-1">(post illness)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">ML for &gt;5 days:</span>
            ${renderInput("ml-greater-than-5-days", formData["ml-greater-than-5-days"] || "", "HR verification", "bottom-border-input w-24")}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Salary deduction beyond limit:</span>
            ${renderToggle("salary-deduction-beyond-limit", toggleStates["salary-deduction-beyond-limit"])}
            <span class="ml-1">(LOP)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Weekend sandwich rule:</span>
            ${renderToggle("ml-weekend-sandwich-rule", toggleStates["ml-weekend-sandwich-rule"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Emergency ML allowed:</span>
            ${renderToggle("emergency-ml-allowed", toggleStates["emergency-ml-allowed"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">ML during audit:</span>
            ${renderInput("ml-during-audit", formData["ml-during-audit"] || "", "Needs approval", "bottom-border-input w-24")}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Monthly ML limit:</span>
            ${renderInput("monthly-ml-limit", formData["monthly-ml-limit"] || "")}
            <span class="ml-1">days</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Monitoring sick leave abuse:</span>
            ${renderToggle("monitoring-sick-leave-abuse", toggleStates["monitoring-sick-leave-abuse"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Approval required:</span>
            ${renderToggle("ml-approval-required", toggleStates["ml-approval-required"])}
          </li>
        </ul>
      </div>
      <div class="px-4 py-3 border-t border-[#dee2e6] flex justify-end gap-2">
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" data-action="apply">Apply</button>
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" data-action="cancel">Cancel</button>
      </div>
    </div>
  `;
}

function renderOvertimeTab() {
  const { toggleStates, formData } = leavePolicyModalStore;
  return `
    <div class="flex flex-col max-h-[calc(100vh-180px)]">
      <div class="overflow-auto flex-1 px-4 pt-4">
        <ul class="space-y-2 text-[14px]">
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OT starts after:</span>
            ${renderInput("ot-starts-after", formData["ot-starts-after"] || "")}
            <span class="ml-1">mins</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OT pay rate:</span>
            ${renderInput("ot-pay-rate", formData["ot-pay-rate"] || "")}
            <span class="ml-1">x</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max OT per day:</span>
            ${renderInput("max-ot-per-day", formData["max-ot-per-day"] || "")}
            <span class="ml-1">hrs</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max OT per month:</span>
            ${renderInput("max-ot-per-month", formData["max-ot-per-month"] || "")}
            <span class="ml-1">hrs</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Prior approval:</span>
            ${renderToggle("ot-prior-approval", toggleStates["ot-prior-approval"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OT on holidays:</span>
            ${renderToggle("ot-on-holidays", toggleStates["ot-on-holidays"])}
            <span class="ml-1">(double pay)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OT records in payroll:</span>
            ${renderToggle("ot-records-in-payroll", toggleStates["ot-records-in-payroll"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Minimum shift hours for OT:</span>
            ${renderInput("min-shift-hours-ot", formData["min-shift-hours-ot"] || "")}
            <span class="ml-1">hrs</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Night shift OT:</span>
            ${renderToggle("night-shift-ot", toggleStates["night-shift-ot"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Comp-off instead of OT:</span>
            ${renderToggle("comp-off-instead-of-ot", toggleStates["comp-off-instead-of-ot"])}
            <span class="ml-1">(on request)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Unauthorized OT:</span>
            ${renderToggle("unauthorized-ot", toggleStates["unauthorized-ot"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OT during probation:</span>
            ${renderToggle("ot-during-probation", toggleStates["ot-during-probation"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OT allowance (meals):</span>
            ${renderToggle("ot-allowance-meals", toggleStates["ot-allowance-meals"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OT encashment limit:</span>
            ${renderToggle("ot-encashment-limit", toggleStates["ot-encashment-limit"])}
            <span class="ml-1">(monthly)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">False OT claims:</span>
            ${renderToggle("false-ot-claims", toggleStates["false-ot-claims"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max OT sessions/week:</span>
            ${renderInput("max-ot-sessions-week", formData["max-ot-sessions-week"] || "")}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Pre-schedule OT:</span>
            ${renderInput("pre-schedule-ot", formData["pre-schedule-ot"] || "")}
            <span class="ml-1">hrs before shift end</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OT register:</span>
            ${renderToggle("ot-register", toggleStates["ot-register"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Public holiday OT:</span>
            ${renderToggle("public-holiday-ot-mandatory", toggleStates["public-holiday-ot-mandatory"])}
            <span class="ml-1">(mandatory)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Emergency OT:</span>
            ${renderToggle("emergency-ot-allowed", toggleStates["emergency-ot-allowed"])}
            <span class="ml-1">(management call)</span>
          </li>
        </ul>
      </div>
      <div class="px-4 py-3 border-t border-[#dee2e6] flex justify-end gap-2">
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" data-action="apply">Apply</button>
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" data-action="cancel">Cancel</button>
      </div>
    </div>
  `;
}

function renderOndutyTab() {
  const { toggleStates, formData } = leavePolicyModalStore;
  return `
    <div class="flex flex-col max-h-[calc(100vh-180px)]">
      <div class="overflow-auto flex-1 px-4 pt-4">
        <ul class="space-y-2 text-[14px]">
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD approval:</span>
            ${renderInput("od-approval", formData["od-approval"] || "")}
            <span class="ml-1">day prior</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD counted as work:</span>
            ${renderToggle("od-counted-as-work", toggleStates["od-counted-as-work"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max OD days/month:</span>
            ${renderInput("max-od-days-month", formData["max-od-days-month"] || "")}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD for personal work:</span>
            ${renderToggle("od-for-personal-work", toggleStates["od-for-personal-work"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD report submission:</span>
            ${renderToggle("od-report-submission", toggleStates["od-report-submission"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD travel allowance:</span>
            ${renderToggle("od-travel-allowance", toggleStates["od-travel-allowance"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD on weekly off:</span>
            ${renderToggle("od-on-weekly-off", toggleStates["od-on-weekly-off"])}
            <span class="ml-1">(approval needed)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD on holiday:</span>
            ${renderToggle("od-on-holiday", toggleStates["od-on-holiday"])}
            <span class="ml-1">(comp-off)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD deduction from leave:</span>
            ${renderToggle("od-deduction-from-leave", toggleStates["od-deduction-from-leave"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD log:</span>
            ${renderToggle("od-log", toggleStates["od-log"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Frequent OD misuse penalty:</span>
            ${renderToggle("frequent-od-misuse-penalty", toggleStates["frequent-od-misuse-penalty"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Max OD hours/day:</span>
            ${renderInput("max-od-hours-day", formData["max-od-hours-day"] || "")}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD outside city:</span>
            ${renderToggle("od-outside-city", toggleStates["od-outside-city"])}
            <span class="ml-1">(travel proof)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD meal allowance:</span>
            ${renderToggle("od-meal-allowance", toggleStates["od-meal-allowance"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD during shift peak:</span>
            ${renderToggle("od-during-shift-peak", toggleStates["od-during-shift-peak"])}
            <span class="ml-1">(unless urgent)</span>
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD with client meetings:</span>
            ${renderToggle("od-with-client-meetings", toggleStates["od-with-client-meetings"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD reimbursement:</span>
            ${renderToggle("od-reimbursement", toggleStates["od-reimbursement"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD form mandatory:</span>
            ${renderToggle("od-form-mandatory", toggleStates["od-form-mandatory"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">OD approval from HOD:</span>
            ${renderToggle("od-approval-from-hod", toggleStates["od-approval-from-hod"])}
          </li>
          <li class="flex items-center">
            <i class="ri-asterisk text-[#009333] mr-2"></i>
            <span class="w-60">Unauthorized OD:</span>
            ${renderToggle("unauthorized-od", toggleStates["unauthorized-od"])}
          </li>
        </ul>
      </div>
      <div class="px-4 py-3 border-t border-[#dee2e6] flex justify-end gap-2">
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" data-action="apply">Apply</button>
        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" data-action="cancel">Cancel</button>
      </div>
    </div>
  `;
}

function renderTabContent() {
  const { activeTab } = leavePolicyModalStore;
  const contentContainer = $("#leaveModalTabContent");
  if (!contentContainer || !contentContainer.length) return;

  let content = "";
  switch (activeTab) {
    case "general":
      content = renderGeneralTab();
      break;
    case "casual":
      content = renderCasualTab();
      break;
    case "medical":
      content = renderMedicalTab();
      break;
    case "overtime":
      content = renderOvertimeTab();
      break;
    case "onduty":
      content = renderOndutyTab();
      break;
    default:
      content = renderGeneralTab();
  }

  contentContainer.html(content);
  bindTabContentEvents();
}

function setActiveTab(tab) {
  leavePolicyModalStore.activeTab = tab;

  // Update tab styles
  $(".leave-modal-tab")
    .removeClass("border-[#44745c] text-green-900 bg-white")
    .addClass(
      "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
    );

  $(`.leave-modal-tab[data-tab="${tab}"]`)
    .removeClass(
      "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
    )
    .addClass("border-[#44745c] text-green-900 bg-white");

  // Render tab content
  renderTabContent();
}

function bindTabContentEvents() {
  // Toggle switches
  $(document).off("change", 'input[type="checkbox"][data-toggle-name]');
  $(document).on("change", 'input[type="checkbox"][data-toggle-name]', function () {
    const toggleName = $(this).data("toggle-name");
    if (toggleName && leavePolicyModalStore.toggleStates.hasOwnProperty(toggleName)) {
      leavePolicyModalStore.toggleStates[toggleName] = $(this).is(":checked");
    }
  });

  // Input fields
  $(document).off("input", "#leaveModalTabContent input[type='text']");
  $(document).on("input", "#leaveModalTabContent input[type='text']", function () {
    const name = $(this).attr("name");
    if (name) {
      leavePolicyModalStore.formData[name] = $(this).val();
    }
  });

  // Apply button
  $(document).off("click", '#leaveModalTabContent button[data-action="apply"]');
  $(document).on("click", '#leaveModalTabContent button[data-action="apply"]', function () {
    handleApply();
  });

  // Cancel button
  $(document).off("click", '#leaveModalTabContent button[data-action="cancel"]');
  $(document).on("click", '#leaveModalTabContent button[data-action="cancel"]', function () {
    handleCancel();
  });
}

function handleApply() {
  // Collect all form data
  const formData = { ...leavePolicyModalStore.formData };
  const toggleStates = { ...leavePolicyModalStore.toggleStates };
  
  // Here you can add your save logic
  console.log("Applying changes:", { formData, toggleStates });
  
  // You can add an API call here to save the data
  // Example:
  // $.ajax({
  //   url: '/api/leave-policy',
  //   method: 'POST',
  //   data: { formData, toggleStates },
  //   success: function(response) {
  //     alert('Settings saved successfully!');
  //   }
  // });
  
  alert("Settings applied successfully!");
}

function handleCancel() {
  // Reset form data and toggle states
  leavePolicyModalStore.formData = {};
  Object.keys(leavePolicyModalStore.toggleStates).forEach(key => {
    leavePolicyModalStore.toggleStates[key] = false;
  });
  
  // Re-render the current tab to reset UI
  renderTabContent();
}

function initLeavePolicyModal(containerSelector) {
  if (!containerSelector) {
    containerSelector = "#leavePolicyContent";
  }
  leavePolicyModalEls.container = $(containerSelector);
  if (!leavePolicyModalEls.container || !leavePolicyModalEls.container.length) return;

  bindLeavePolicyModalEvents();
  renderLeavePolicyModal();
}

function bindLeavePolicyModalEvents() {
  // Tab switching
  $(document).off("click", ".leave-modal-tab");
  $(document).on("click", ".leave-modal-tab", function () {
    const tab = $(this).data("tab");
    if (tab) {
      setActiveTab(tab);
    }
  });
}

function renderLeavePolicyModal() {
  if (!leavePolicyModalEls.container || !leavePolicyModalEls.container.length) return;

  const { activeTab } = leavePolicyModalStore;
  const tabs = ["general", "casual", "medical", "overtime", "onduty"];
  const tabLabels = {
    general: "General Conditions",
    casual: "Casual Leave",
    medical: "Medical Leave",
    overtime: "Over-Time",
    onduty: "On-Duty",
  };

  let tabsHtml = "";
  tabs.forEach((tab) => {
    const isActive = tab === activeTab;
    tabsHtml += `
      <button
        class="leave-modal-tab px-3 py-2 border-b-2 font-medium cursor-pointer ${
          isActive
            ? "border-[#44745c] text-green-900 bg-white"
            : "border-transparent text-[#666c6a] hover:text-green-900 hover:border-[#44745c]"
        }"
        data-tab="${tab}"
      >
        ${tabLabels[tab]}
      </button>
    `;
  });

  const html = `
    <!-- Tabs -->
    <div class="flex border-b border-gray-200 bg-[#f0f5f3]">
      ${tabsHtml}
    </div>

    <!-- Content -->
    <div class="overflow-y-auto flex-1 bg-gray-50">
      <div id="leaveModalTabContent"></div>
    </div>
  `;

  leavePolicyModalEls.container.html(html);
  renderTabContent();
}

// Utility function
function escapeHtml(str) {
  if (typeof str !== "string") return str;
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (m) => map[m]);
}

// Export for external use
window.initLeavePolicyModal = initLeavePolicyModal;
window.leavePolicyModalModule = {
  initLeavePolicyModal,
  getStore: () => leavePolicyModalStore,
  setActiveTab,
  handleApply,
  handleCancel,
};
