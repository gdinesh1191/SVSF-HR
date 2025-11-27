// smsNotifications.js
window.SMSNotifications = function() {
    return `
      <div class="flex flex-col max-h-[calc(100vh-60px)] bg-white">
        <!-- Header -->
        <div class="bg-white z-10">
          <div class="px-4 py-2.5">
            <h2 class="text-2xl font-bold text-gray-800">SMS Notifications</h2>
          </div>
  
          <!-- Tabs -->
          <div class="flex flex-wrap border-b border-gray-200 px-4 mt-1">
            <button class="tab-btn py-2 px-4 text-sm font-medium border-b-2 border-transparent text-gray-600" data-tab="overview">Overview</button>
            <button class="tab-btn py-2 px-4 text-sm font-medium border-b-2 border-transparent text-gray-600" data-tab="smsTemplates">SMS Templates</button>
          </div>
        </div>
  
        <!-- Tab Content -->
        <div id="smsTabContent" class="flex-grow overflow-y-auto"></div>
      </div>
    `;
  };
  
  window.SMSNotificationsLogic = function() {
    // --- Data ---
    let activeTab = "smsTemplates";
    const smsTemplates = [
      {
        id: "customerBalance",
        notificationType: "Customer Balance",
        module: "Contact",
        smsContent: "Dear customer, You have a total outstanding balance of %CustomerBalance%. Please make the payment as soon as possible. Best regards, %CompanyName%",
        description: "Send an SMS to notify customers about their current outstanding balance and to make the payment.",
        status: false
      },
      {
        id: "quoteDetails",
        notificationType: "Quote Details",
        module: "Quote",
        smsContent: "Dear customer, We've created an quote - %EstimateNumber% for you. View the quote at %EstimateURL% to proceed further. Looking forward to hearing from you.",
        description: "Allow customers to view and approve quotes by sending SMS notifications manually.",
        status: false
      },
      {
        id: "invoiceDetails",
        notificationType: "Invoice Details",
        module: "Invoice",
        smsContent: "Dear customer, Your outstanding balance for invoice %InvoiceNumber% is %InvoiceBalance%. Please visit %InvoiceURL% to pay for your invoice. Thank you.",
        description: "An SMS notification will be sent to your customer when recurring invoices are automatically sent or when you notify via SMS about the invoice manually.",
        status: false
      },
      {
        id: "paymentReminder",
        notificationType: "Payment Reminder",
        module: "Invoice",
        smsContent: "Dear customer, This is a friendly reminder that a payment of %InvoiceBalance% is pending. View your invoice at %InvoiceURL% and ensure that you pay before the due date. Thank you for your business.",
        description: "A Payment Reminder SMS will be sent to your customer based on the reminder preferences that you've set in the Reminders tab.",
        status: false,
        specialLinkText: "Configure Reminders",
        specialLinkUrl: "#"
      },
      {
        id: "paymentThankYou",
        notificationType: "Payment Thank-you",
        module: "Invoice",
        smsContent: "Dear customer, Thank you for your recent payment of %PaymentReceived% towards your invoice. - %CompanyName%",
        description: "A Payment Thank You SMS will be sent to your customer when your customer pays you online or if you choose to send it while recording the payment manually.",
        status: true
      },
      {
        id: "paymentRetry",
        notificationType: "Payment Retry",
        module: "Invoice",
        smsContent: "Your payment method could not be charged automatically. We'll try to process the payment again on %DueRenewalDate%. If required,you can update your payment method at %InvoiceURL% for a hassle-free experience - %CompanyName%",
        description: "A Payment Retry Reminder SMS will be sent to your customer based on the retry preferences that you've set.",
        status: false
      }
    ];
  
    const contentContainer = document.getElementById("smsTabContent");
    const tabButtons = document.querySelectorAll(".tab-btn");
  
    // --- Helpers ---
    const toggleStatus = (templateId) => {
      const template = smsTemplates.find(t => t.id === templateId);
      if(template) template.status = !template.status;
      renderContent();
    };
  
    const renderContent = () => {
      if(activeTab === "overview") {
        contentContainer.innerHTML = `
          <div class="p-4 pt-0 mt-7">
            <h2 class="text-[16px] font-medium ms-1 mb-3">Overview Content Here</h2>
            <p class="text-gray-600">This section would display a general overview of SMS notifications, such as summary statistics or recent activity.</p>
          </div>
        `;
        return;
      }
  
      if(activeTab === "smsTemplates") {
        let html = `
          <div class="pt-0 bg-[#fafafa]">
            <div class="overflow-x-auto rounded-lg mb-8">
              <table class="w-full text-sm text-left">
                <thead class="text-gray-500 font-semibold border-b border-t border-gray-200 sticky top-0 bg-[#f9f9fb] z-10">
                  <tr>
                    <th class="align-bottom ps-4 pr-[6.5px] py-[6.5px] text-[11px] text-[#6c718a] w-[31.08%]">NOTIFICATION TYPE</th>
                    <th class="align-bottom p-[6.5px] text-[11px] text-[#6c718a] w-[8.11%]">MODULE</th>
                    <th class="align-bottom p-[6.5px] text-[11px] text-[#6c718a] w-[47.3%]">SMS CONTENT</th>
                    <th class="p-[6.5px] text-[11px] text-[#6c718a] w-[13.51%] text-center">NOTIFICATION<br />STATUS</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white text-[13px]">
        `;
  
        smsTemplates.forEach(template => {
          html += `
            <tr class="hover:bg-[#f6f6fa] cursor-pointer">
              <td class="py-[30px] ps-[20px] pr-[6.5px] font-medium text-gray-800">
                <div>
                  <div class="flex items-center font-semibold mb-3">${template.notificationType}</div>
                  <p class="text-[13px] text-[#6c718a] mb-3">${template.description}</p>
                  ${template.specialLinkText ? `<a href="${template.specialLinkUrl}" class="text-[#009333] hover:text-green-800 text-xs mt-1 inline-block">${template.specialLinkText}</a>` : ""}
                </div>
              </td>
              <td class="py-[30px] px-[6.5px] text-[13px]">${template.module}</td>
              <td class="py-[30px] px-[6.5px]">
                <div class="sms-preview-layout">
                  <div class="mb-3 flex justify-between items-center text-[13px]">
                    <span class="font-medium">SMS Template 1</span>
                    <button class="cursor-pointer text-[#009333]">Change Template</button>
                  </div>
                  <div class="relative inline-block w-full p-3 cursor-pointer whitespace-pre-wrap text-[13px] bg-[#f9f9fb] border border-dashed border-[#dcdcdc] rounded text-start">
                    <button class="absolute top-2 right-2 text-[#009333] hover:text-green-800"><i class="ri-eye-line text-[16px]"></i></button>
                    <span class="block pr-6">${template.smsContent}</span>
                  </div>
                </div>
              </td>
              <td class="py-[30px] ps-[6.5px] pr-[30px] text-center">
                <input type="checkbox" ${template.status ? "checked" : ""} onclick="window.SMSNotificationsLogic.toggleStatus('${template.id}')">
              </td>
            </tr>
          `;
        });
  
        html += `</tbody></table></div></div>`;
        contentContainer.innerHTML = html;
      }
    };
  
    const renderTabs = () => {
      tabButtons.forEach(b => b.classList.remove("border-[#009333]", "text-[#009333]"));
      tabButtons.forEach(b => b.classList.add("border-transparent", "text-gray-600"));
      const currentBtn = Array.from(tabButtons).find(b => b.dataset.tab === activeTab);
      if(currentBtn){
        currentBtn.classList.add("border-[#009333]", "text-[#009333]");
        currentBtn.classList.remove("border-transparent", "text-gray-600");
      }
    };
  
    // --- Event Listeners ---
    tabButtons.forEach(btn => btn.addEventListener("click", () => {
      activeTab = btn.dataset.tab;
      renderTabs();
      renderContent();
    }));
  
    window.SMSNotificationsLogic.toggleStatus = toggleStatus;
  
    // --- Initial render ---
    renderTabs();
    renderContent();
  };
  