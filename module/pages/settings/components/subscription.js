window.Subscription = function() {
  
    return `
    <div class="flex flex-col bg-gray-100 ">
       <div class="flex justify-between items-center p-6">
  <h5 class="text-[16px] font-bold text-gray-800">Subscriptions</h5>
  <button class="btn-sm btn-primary">
    Manage Subscriptions
  </button>
</div>
      <div class="p-2 bg-gray-100 flex-grow overflow-y-auto max-h-[calc(100vh-125px)] h-[calc(100vh-125px)]">
        
        <div class="bg-white p-4 rounded-lg shadow-md mb-4 mx-2">
          <h3 class="text-[14px]  mb-3 text-[#009333]"><i class="ri-map-line mr-2"></i> PLAN DETAILS</h3>
          <div class="flex justify-between items-center mb-2">
            <span class="text-[14px] font-medium">Plan Name</span>
            <span class="text-[#BD7400] font-semibold text-lg">Monthly Plan ( ₹799 ) </span>
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-md mb-4 mx-2">
      <h3 class="text-[14px] mb-3 text-[#009333] flex items-center">
        <i class="ri ri-line-chart-line mr-2"></i> USAGE STATS
      </h3>
      <div class="grid grid-cols-3 gap-4">
      
        <div class="flex flex-col items-center p-2 border border-gray-200 rounded-lg">
          <div class="text-2xl text-[#009333] mb-1">
            <i class="ri ri-shopping-cart-line"></i>
          </div>
          <p class="text-[14px] text-center font-medium">Sales</p>
          <span class="text-gray-600 text-[12px]"><span class='text-[#009333]'>320</span> / 1000 used</span>
        </div>
      
        <div class="flex flex-col items-center p-2 border border-gray-200 rounded-lg">
          <div class="text-2xl text-[#009333] mb-1">
            <i class="ri ri-exchange-dollar-line"></i>
          </div>
          <p class="text-[14px] text-center font-medium">Purchases</p>
          <span class="text-gray-600 text-[12px]"><span class='text-[#009333]'>20</span>  / 1000 used</span>
        </div>
       
        <div class="flex flex-col items-center p-2 border border-gray-200 rounded-lg">
          <div class="text-2xl text-[#009333] mb-1">
            <i class="ri ri-user-3-line"></i>
          </div>
          <p class="text-[14px] text-center font-medium">Users</p>
          <span class="text-gray-600 text-[12px]"><span class='text-[#009333]'>1</span>  / 2 used</span>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
       
        <div class="flex flex-col items-center p-2 border border-gray-200 rounded-lg">
          <div class="text-2xl text-[#009333] mb-1">
            <i class="ri ri-file-chart-line"></i>
          </div>
          <p class="text-[14px] text-center font-medium">Custom Reports</p>
          <span class="text-gray-600 text-[12px]">0 / 0 used</span>
        </div>
       
        <div class="flex flex-col items-center p-2 border border-gray-200 rounded-lg">
          <div class="text-2xl text-[#009333] mb-1">
            <i class="ri ri-code-s-slash-line"></i>
          </div>
          <p class="text-[14px] text-center font-medium">API Limit (per day)</p>
          <span class="text-gray-600 text-[12px]">0 / 1000 used</span>
        </div>
      </div>
    </div>
       
        <div class="bg-white p-4 rounded-lg shadow-md mb-4 mx-2">
          <h3 class="text-[14px]   mb-3 text-[#009333]"><i class="ri-shape-fill  mr-2"></i> OTHER MODULES</h3>
          <div class="flex flex-col space-y-2">
            <div class="flex justify-between items-center">
              <span class="text-[14px]">WorkFlow</span>
              <span class="text-gray-800 font-medium">0</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[14px]">Web Tab</span>
              <span class="text-gray-800 font-medium">0</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[14px]">SMS Credits</span>
              <span class="text-gray-800 font-medium">0</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[14px]">Snail Mail Credits</span>
              <span class="text-gray-800 font-medium">0</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-[14px]">Document Scans</span>
              <span class="text-gray-800 font-medium">0</span>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded-lg shadow-md mb-4 mx-2">
          <h3 class="text-[14px]   mb-3 text-[#009333]"><i class="ri-list-check mr-2"></i> FEATURES</h3>
          <div class="mb-8">
            <h5 class=" font-semibold  text-md   mb-1 text-[15px] text-[#009333]">SALES</h5>
            <div class="grid grid-cols-2 gap-y-1 gap-x-4 text-gray-800 text-[14px]">
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Manage Invoices</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Manage Clients</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Sales Orders</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Quotes</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Recurring Invoices</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Credit Notes</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Delivery Challans</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> e-Way Bills</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Bill Of Supply</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Invoice Customization</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Multi-lingual Invoicing</span>
            </div>
          </div>
          
          <div class="mb-8">
            <h5 class=" font-semibold  text-md   mb-1 text-[15px] text-[#009333]">PURCHASES</h5>
            <div class="grid grid-cols-2 gap-y-1 gap-x-4 text-gray-800 text-[14px]">
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Bills</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Purchase Orders</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Debit Notes</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Vendor Credit Notes</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Expenses & Mileage Tracking</span>
            </div>
          </div>
          
          <div class="mb-8">
            <h5 class=" font-semibold  text-md   mb-1 text-[15px] text-[#009333]">BANKING</h5>
            <div class="grid grid-cols-2 gap-y-1 gap-x-4 text-gray-800 text-[14px]">
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Import Bank and Credit Card Statements</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Add Multiple Bank and Credit Card Accounts</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Bank Rules & Reconciliation</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Direct Bank Feeds via Partner Banks</span>
            </div>
          </div>
          
          <div class="mb-8">
            <h5 class=" font-semibold  text-md   mb-1 text-[15px] text-[#009333]">REPORTS</h5>
            <div class="grid grid-cols-2 gap-y-1 gap-x-4 text-gray-800 text-[14px]">
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Schedule Reports</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Stock Tracking</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Reports</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Custom Financial Report Generator</span>
            </div>
          </div>
          
          <div class="mb-8">
            <h5 class=" font-semibold  text-md   mb-1 text-[15px] text-[#009333]">GST RETURNS</h5>
            <div class="grid grid-cols-2 gap-y-1 gap-x-4 text-gray-800 text-[14px]">
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> GST</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Track GST</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> GST Returns</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> GST Filing</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> GST Payments</span>
            </div>
          </div>
         
          <div class="mb-8">
            <h5 class=" font-semibold  text-md   mb-1 text-[15px] text-[#009333]">ACCOUNTANT</h5>
            <div class="grid grid-cols-2 gap-y-1 gap-x-4 text-gray-800 text-[14px]">
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Manual Journals</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Chart of Accounts & Sub-accounts</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Journal Templates</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Recurring journals</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Online/Offline Payments</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Transaction Locking</span>
            </div>
          </div>
          
          <div class="mb-8">
            <h5 class=" font-semibold  text-md   mb-1 text-[15px] text-[#009333]">GENERAL</h5>
            <div class="grid grid-cols-2 gap-y-1 gap-x-4 text-gray-800 text-[14px]">
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Audit Trail</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Manage Items</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Predefined User Roles</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Bulk Updates</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Customer Portal</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Generate Payment Links</span>
            </div>
          </div>
         
          <div class="mb-8">
            <h5 class=" font-semibold  text-md   mb-1   text-[15px] text-[#009333]">CUSTOM AUTOMATION</h5>
            <div class="grid grid-cols-2 gap-y-1 gap-x-4 text-gray-800 text-[14px]">
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Custom View</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Automate Payment Reminders</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Automatic Exchange Rates</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Timesheet Approvals</span>
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Timesheet - Customer Approvals</span>
            </div>
          </div>
         
          <div class="mb-8">
            <h5 class=" font-semibold  text-md   mb-1 text-[15px] text-[#009333]">SUPPORT</h5>
            <div class="grid grid-cols-2 gap-y-1 gap-x-4 text-gray-800 text-[14px]">
              <span class="p-1"><i class="ri-check-double-fill text-[#009333]"></i> Email</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};