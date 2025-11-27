(function() {
    'use strict';

    // State management
    const state = {
        activePage: 'Items',
        searchTerm: '',
        selectedIds: [],
        selectAll: false,
        filters: {},
        localFilters: {},
        isFilterOpen: false,
        isAddItemOpen: false,
        isIssuedDetailsOpen: false,
        isStaffDetailsModalOpen: false,
        isStockReportModalOpen: false,
        itemIdCounter: 6,
        staffIdCounter: 104,
        nextIssueId: 4,
        activeTab: 'currentIssues',
        selectedStaff: null,
        selectedItemNameForIssued: '',
        newIssueItems: []
    };

    // Page categories for sidebar
    const pageCategories = [
        {
            title: "Items",
            items: [{ name: "Items", icon: "ri-user-line" }],
        },
        {
            title: "Stock Issue",
            items: [{ name: "Stock Issue", icon: "ri-lock-password-line" }],
        },
        {
            title: "Stock Report",
            items: [{ name: "Stock Report", icon: "ri-lock-password-line" }],
        }
    ];

    // Dummy Items Data
    const DUMMY_ITEMS = [
        {
            id: 1,
            itemName: "Laptop",
            stock: 150,
            issued: 25,
            description: "High-performance laptop for professional use.",
        },
        {
            id: 2,
            itemName: "Mouse",
            stock: 500,
            issued: 100,
            description: "Wireless optical mouse with ergonomic design.",
        },
        {
            id: 3,
            itemName: "Keyboard",
            stock: 300,
            issued: 50,
            description: "Mechanical keyboard with RGB lighting.",
        },
        {
            id: 4,
            itemName: "Monitor",
            stock: 75,
            issued: 10,
            description: "27-inch 4K monitor for crisp visuals.",
        },
        {
            id: 5,
            itemName: "Webcam",
            stock: 200,
            issued: 30,
            description: "Full HD webcam with built-in microphone.",
        },
    ];

    // Dummy Staff Issued Items Data
    const DUMMY_ISSUED_STAFF_DATA = {
        1: [
            { staffId: 101, staffName: "Alice Smith", department: "IT", quantity: 10 },
            { staffId: 102, staffName: "Bob Johnson", department: "Marketing", quantity: 15 },
        ],
        2: [
            { staffId: 103, staffName: "Charlie Brown", department: "HR", quantity: 50 },
            { staffId: 104, staffName: "Diana Prince", department: "IT", quantity: 50 },
        ],
        3: [
            { staffId: 105, staffName: "Eve Adams", department: "Finance", quantity: 20 },
            { staffId: 106, staffName: "Frank Green", department: "Operations", quantity: 30 },
        ],
        4: [
            { staffId: 107, staffName: "Grace Lee", department: "IT", quantity: 5 },
            { staffId: 108, staffName: "Henry King", department: "Marketing", quantity: 5 },
        ],
        5: [
            { staffId: 109, staffName: "Ivy White", department: "HR", quantity: 15 },
            { staffId: 110, staffName: "Jack Black", department: "Finance", quantity: 15 },
        ],
    };

    // Dummy Staff Data for Stock Issue
    const DUMMY_STAFF = [
        { id: 101, staffName: "Alice Smith", totalStockReceived: 0 },
        { id: 102, staffName: "Bob Johnson", totalStockReceived: 0 },
        { id: 103, staffName: "Charlie Brown", totalStockReceived: 0 },
    ];

    // Dummy Stock Issue Details
    const DUMMY_STOCK_ISSUE_DETAILS = [
        {
            staffId: 101,
            issues: [
                {
                    issueId: 1,
                    itemId: 1,
                    itemName: "Laptop",
                    quantity: 1,
                    serialNumber: "SN-LAP-001",
                    issueDate: "2024-06-15",
                    returnDate: null,
                    status: "issued",
                },
                {
                    issueId: 2,
                    itemId: 2,
                    itemName: "Mouse",
                    quantity: 1,
                    serialNumber: "SN-MOU-005",
                    issueDate: "2024-06-20",
                    returnDate: "2024-07-01",
                    status: "returned",
                },
            ],
        },
        {
            staffId: 102,
            issues: [
                {
                    issueId: 3,
                    itemId: 3,
                    itemName: "Keyboard",
                    quantity: 1,
                    serialNumber: "SN-KEY-010",
                    issueDate: "2024-07-01",
                    returnDate: null,
                    status: "issued",
                },
            ],
        },
    ];

    // Initialize totalStockReceived for staff
    DUMMY_STAFF.forEach((staff) => {
        const staffIssues = DUMMY_STOCK_ISSUE_DETAILS.find(
            (details) => details.staffId === staff.id
        );
        if (staffIssues) {
            staff.totalStockReceived = staffIssues.issues.reduce(
                (sum, issue) => sum + (issue.status === "issued" ? issue.quantity : 0),
                0
            );
        }
    });

    // Dummy Stock Report Data
    const DUMMY_STOCK_REPORT_DETAILS = [
        {
            staffId: 101,
            issues: [
                {
                    issueId: 1,
                    itemId: 1,
                    itemName: "Laptop",
                    quantity: 1,
                    serialNumber: "SN-LAP-001",
                    transactionDate: "2024-06-15",
                    returnDate: null,
                    status: "issued",
                    type: "debit",
                    description: "Issued Laptop",
                    staffId: 101,
                },
                {
                    issueId: 2,
                    itemId: 2,
                    itemName: "Mouse",
                    quantity: 1,
                    serialNumber: "SN-MOU-005",
                    transactionDate: "2024-06-20",
                    returnDate: "2024-07-01",
                    status: "returned",
                    type: "credit",
                    description: "Returned Mouse",
                    staffId: 101,
                },
            ],
        },
        {
            staffId: 102,
            issues: [
                {
                    issueId: 3,
                    itemId: 3,
                    itemName: "Keyboard",
                    quantity: 1,
                    serialNumber: "SN-KEY-010",
                    transactionDate: "2024-07-01",
                    returnDate: null,
                    status: "issued",
                    type: "debit",
                    description: "Issued Keyboard",
                    staffId: 102,
                },
            ],
        },
    ];

    // Data storage (simulating state)
    let itemDetails = [...DUMMY_ITEMS];
    let staffDetails = [...DUMMY_STAFF];
    let allStaffIssueDetails = [...DUMMY_STOCK_ISSUE_DETAILS];
    let allStockReportDetails = [...DUMMY_STOCK_REPORT_DETAILS];

    // Initialize
    function init() {
        renderSidebar();
        renderActivePage();
        attachEventListeners();
    }

    // Render Sidebar
    function renderSidebar() {
        const sidebarMenu = document.getElementById('sidebarMenu');
        const filteredCategories = pageCategories
            .map((page) => ({
                ...page,
                items: page.items.filter((item) =>
                    item.name.toLowerCase().includes(state.searchTerm.toLowerCase())
                ),
            }))
            .filter((page) => page.items.length > 0);

        let html = '';
        filteredCategories.forEach((category) => {
            category.items.forEach((item) => {
                const isActive = state.activePage === item.name;
                // NOTE: keep 'page-list-item' class so JS can bind click handlers
                const baseClasses = 'page-list-item p-1 rounded transition-colors duration-200 cursor-pointer flex items-center gap-1';
                const activeClasses = 'bg-[#f0f0f0] text-[#009333] rounded-[5px]';
                const inactiveClasses = 'hover:bg-gray-100 text-[#12344d]';

                html += `
                    <li class="${baseClasses} ${isActive ? activeClasses : inactiveClasses}" data-page="${item.name}">
                        <i class="${item.icon} text-lg me-2"></i>
                        <span>${item.name}</span>
                    </li>
                `;
            });
        });

        if (filteredCategories.length === 0 && state.searchTerm) {
            html = `<div class="text-center text-gray-500 py-4">No Pages found matching "${state.searchTerm}"</div>`;
        }

        sidebarMenu.innerHTML = html;

        // Attach click handlers
        sidebarMenu.querySelectorAll('.page-list-item').forEach((item) => {
            item.addEventListener('click', () => {
                const pageName = item.getAttribute('data-page');
                handlePageClick(pageName);
            });
        });
    }

    // Handle page click
    function handlePageClick(pageName) {
        state.activePage = pageName;
        state.selectedIds = [];
        state.selectAll = false;
        state.filters = {};
        state.localFilters = {};
        renderSidebar();
        renderActivePage();
    }

    // Render active page content
    function renderActivePage() {
        const mainContent = document.getElementById('mainContent');
        
        switch (state.activePage) {
            case 'Items':
                renderItemsPage(mainContent);
                break;
            case 'Stock Issue':
                renderStockIssuePage(mainContent);
                break;
            case 'Stock Report':
                renderStockReportPage(mainContent);
                break;
            default:
                mainContent.innerHTML = `
                    <div class="flex-1 flex items-center justify-center text-gray-500 text-lg">
                        Component not found for "${state.activePage}"
                    </div>
                `;
        }
    }

    // Render Items Page
    function renderItemsPage(container) {
        const filteredItems = itemDetails.filter((item) => {
            if (state.filters.itemName && !item.itemName.toLowerCase().includes(state.filters.itemName.toLowerCase())) {
                return false;
            }
            if (state.filters.description && !item.description.toLowerCase().includes(state.filters.description.toLowerCase())) {
                return false;
            }
            return true;
        });

        container.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
                    <div class="flex items-center space-x-2 ml-2">
                        <div class="bulk-actions flex items-center space-x-2">
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="printBtn">
                                <i class="ri-printer-line mr-1"></i> Print
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="summaryBtn">
                                <i class="ri-sticky-note-line mr-1"></i> Summary
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="downloadBtn">
                                <i class="ri-arrow-down-line mr-1"></i> Download
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn">
                                <i class="ri-delete-bin-6-line mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center relative space-x-2">
                        <input
                            class="block  text-sm  px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]"
                            type="text"
                            id="itemsSearchInput"
                            placeholder="Search Item Name"
                            value="${state.localFilters.itemName || ''}"
                        />
                        <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition ml-2 w-1/2 text-sm" id="addItemBtn">
                            <i class="ri-add-fill mr-1"></i>
                            <span class="text-sm">Add Item</span>
                        </button>
                        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="itemsFilterBtn">
                            <i class="ri-sort-desc"></i>
                        </button>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-[#ebeff3]">
                    ${state.selectedIds.length > 1 ? `
                        <div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
                            ${state.selectedIds.length} items selected
                        </div>
                    ` : ''}
                    <div class="mx-2 h-[calc(100vh-147px)] overflow-hidden rounded-lg bg-white">
                        <div class="h-full overflow-y-auto">
                            <table class="w-full">
                                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                                    <tr>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">
                                            <input
                                                type="checkbox"
                                                id="itemsSelectAll"
                                                class="form-check accent-[#009333]"
                                                ${state.selectAll ? 'checked' : ''}
                                            />
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">
                                            <div class="flex justify-center items-center gap-1">
                                                <span>S.No.</span>
                                            </div>
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Item Name</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Stock</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Issued</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Description</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filteredItems.map((item, index) => `
                                        <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer group ${state.selectedIds.includes(item.id) ? 'bg-[#e5f2fd] hover:bg-[#f5f7f9]' : ''}">
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] text-center">
                                                <input
                                                    type="checkbox"
                                                    class="form-check accent-[#009333] item-checkbox"
                                                    data-id="${item.id}"
                                                    ${state.selectedIds.includes(item.id) ? 'checked' : ''}
                                                />
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] text-center">
                                                <div class="flex justify-between items-center">
                                                    <span></span>
                                                    <span class="text-center">${index + 1}</span>
                                                    <span class="cursor-pointer">
                                                        <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                                                <div class="text-sm text-gray-900">${item.itemName}</div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                                                <div class="text-sm text-gray-900">${item.stock}</div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                                                <div class="text-sm text-[#009333] cursor-pointer issued-click" data-id="${item.id}" data-name="${item.itemName}">
                                                    ${item.issued}
                                                </div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                                                <div class="text-sm text-gray-900">${item.description}</div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"></td>
                                        </tr>
                                    `).join('')}
                                    ${filteredItems.length === 0 ? `
                                        <tr>
                                            <td colspan="7" class="text-center py-10">
                                                <div class="text-lg text-gray-500">No Items available</div>
                                            </td>
                                        </tr>
                                    ` : ''}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
                    <span class="text-sm">
                        Showing <span class="text-red-600">${filteredItems.length}</span> of
                        <span class="text-[#009333]">${itemDetails.length}</span>
                    </span>
                </div>
            </div>
        `;

        attachItemsEventListeners();
    }

    // Attach Items event listeners
    function attachItemsEventListeners() {
        // Select all checkbox
        const selectAll = document.getElementById('itemsSelectAll');
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                state.selectAll = e.target.checked;
                state.selectedIds = e.target.checked ? itemDetails.map(item => item.id) : [];
                renderActivePage();
            });
        }

        // Individual checkboxes
        document.querySelectorAll('.item-checkbox').forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                if (e.target.checked) {
                    state.selectedIds.push(id);
                } else {
                    state.selectedIds = state.selectedIds.filter(i => i !== id);
                }
                state.selectAll = state.selectedIds.length === itemDetails.length;
                renderActivePage();
            });
        });

        // Issued click
        document.querySelectorAll('.issued-click').forEach((el) => {
            el.addEventListener('click', () => {
                const itemId = parseInt(el.getAttribute('data-id'));
                const itemName = el.getAttribute('data-name');
                handleIssuedClick(itemId, itemName);
            });
        });

        // Search input
        const searchInput = document.getElementById('itemsSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                state.localFilters.itemName = e.target.value;
                state.filters.itemName = e.target.value;
                renderActivePage();
            });
        }

        // Add item button
        const addItemBtn = document.getElementById('addItemBtn');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => {
                openAddItemModal();
            });
        }

        // Filter button
        const filterBtn = document.getElementById('itemsFilterBtn');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => {
                openFilterModal('items');
            });
        }
    }

    // Handle issued click
    function handleIssuedClick(itemId, itemName) {
        const staffData = DUMMY_ISSUED_STAFF_DATA[itemId] || [];
        state.selectedItemNameForIssued = itemName;
        openItemsModal(staffData);
    }

    // Open Items Modal
    function openItemsModal(issuedItemDetails) {
        const modal = document.getElementById('itemsModal');
        const modalTitle = document.getElementById('itemsModalTitle');
        const modalBody = document.getElementById('itemsModalBody');

        modalTitle.textContent = `Issued Details for "${state.selectedItemNameForIssued}"`;
        
        if (issuedItemDetails.length > 0) {
            modalBody.innerHTML = `
                <table class="w-full text-[14px]">
                    <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                        <tr class="bg-gray-200">
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Staff Name</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Department</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Quantity Issued</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${issuedItemDetails.map((staff) => `
                            <tr class="border-b border-gray-200">
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${staff.staffName}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${staff.department}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${staff.quantity}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        } else {
            modalBody.innerHTML = `
                <div class="text-center py-10 text-gray-500">
                    No staff found with this item.
                </div>
            `;
        }

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('#itemsModalContent').classList.remove('translate-x-full');
        state.isIssuedDetailsOpen = true;
    }

    // Close Items Modal
    function closeItemsModal() {
        const modal = document.getElementById('itemsModal');
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('#itemsModalContent').classList.add('translate-x-full');
        state.isIssuedDetailsOpen = false;
    }

    // Open Add Item Modal
    function openAddItemModal() {
        const modal = document.getElementById('addItemModal');
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('#addItemModalContent').classList.remove('translate-x-full');
        state.isAddItemOpen = true;

        // Clear inputs
        document.getElementById('addItemName').value = '';
        document.getElementById('addItemStock').value = '';
        document.getElementById('addItemDescription').value = '';
    }

    // Close Add Item Modal
    function closeAddItemModal() {
        const modal = document.getElementById('addItemModal');
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('#addItemModalContent').classList.add('translate-x-full');
        state.isAddItemOpen = false;
    }

    // Save Item
    function saveItem() {
        const itemName = document.getElementById('addItemName').value.trim();
        const stock = parseInt(document.getElementById('addItemStock').value) || 0;
        const description = document.getElementById('addItemDescription').value.trim();

        if (!itemName || stock <= 0) {
            alert('Please fill in all required fields.');
            return;
        }

        const newItem = {
            id: state.itemIdCounter++,
            itemName: itemName,
            stock: stock,
            issued: 0,
            description: description,
        };

        itemDetails.push(newItem);
        closeAddItemModal();
        renderActivePage();
    }

    // Render Stock Issue Page
    function renderStockIssuePage(container) {
        const filteredStaff = staffDetails.filter((staff) => {
            if (state.filters.staffName && !staff.staffName.toLowerCase().includes(state.filters.staffName.toLowerCase())) {
                return false;
            }
            return true;
        });

        container.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
                    <div class="flex items-center space-x-2 ml-2">
                        <div class="bulk-actions flex items-center space-x-2">
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="printBtn">
                                <i class="ri-printer-line mr-1"></i> Print
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="summaryBtn">
                                <i class="ri-sticky-note-line mr-1"></i> Summary
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="downloadBtn">
                                <i class="ri-arrow-down-line mr-1"></i> Download
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn">
                                <i class="ri-delete-bin-6-line mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center relative space-x-2">
                        <input
                            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]"
                            type="text"
                            id="stockIssueSearchInput"
                            placeholder="Search Staff Name"
                            value="${state.localFilters.staffName || ''}"
                        />
                        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="stockIssueFilterBtn">
                            <i class="ri-sort-desc"></i>
                        </button>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-[#ebeff3]">
                    ${state.selectedIds.length > 1 ? `
                        <div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
                            ${state.selectedIds.length} staff selected
                        </div>
                    ` : ''}
                    <div class="mx-2 h-[calc(100vh-147px)] overflow-hidden rounded-lg bg-white">
                        <div class="h-full overflow-y-auto">
                            <table class="w-full">
                                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                                    <tr>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">
                                            <input
                                                type="checkbox"
                                                id="stockIssueSelectAll"
                                                class="form-check accent-[#009333]"
                                                ${state.selectAll ? 'checked' : ''}
                                            />
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">
                                            <div class="flex justify-center items-center gap-1">
                                                <span>S.No.</span>
                                            </div>
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Staff Name</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Stock Received So Far</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${filteredStaff.map((staff, index) => `
                                        <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer group ${state.selectedIds.includes(staff.id) ? 'bg-[#e5f2fd] hover:bg-[#f5f7f9]' : ''}">
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] text-center">
                                                <input
                                                    type="checkbox"
                                                    class="form-check accent-[#009333] staff-checkbox"
                                                    data-id="${staff.id}"
                                                    ${state.selectedIds.includes(staff.id) ? 'checked' : ''}
                                                />
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] text-center">
                                                <div class="flex justify-between items-center">
                                                    <span></span>
                                                    <span class="text-center">${index + 1}</span>
                                                    <span class="cursor-pointer">
                                                        <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                                                <div class="text-sm text-gray-900 cursor-pointer text-blue-600  staff-name-click" data-id="${staff.id}">
                                                    ${staff.staffName}
                                                </div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                                                <div class="text-sm text-gray-900">${staff.totalStockReceived}</div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]"></td>
                                        </tr>
                                    `).join('')}
                                    ${filteredStaff.length === 0 ? `
                                        <tr>
                                            <td colspan="5" class="text-center py-10">
                                                <div class="text-lg text-gray-500">No Staff available</div>
                                            </td>
                                        </tr>
                                    ` : ''}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
                    <span class="text-sm">
                        Showing <span class="text-red-600">${filteredStaff.length}</span> of
                        <span class="text-blue-600">${staffDetails.length}</span>
                    </span>
                </div>
            </div>
        `;

        attachStockIssueEventListeners();
    }

    // Attach Stock Issue event listeners
    function attachStockIssueEventListeners() {
        // Select all checkbox
        const selectAll = document.getElementById('stockIssueSelectAll');
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                state.selectAll = e.target.checked;
                state.selectedIds = e.target.checked ? staffDetails.map(staff => staff.id) : [];
                renderActivePage();
            });
        }

        // Individual checkboxes
        document.querySelectorAll('.staff-checkbox').forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                if (e.target.checked) {
                    state.selectedIds.push(id);
                } else {
                    state.selectedIds = state.selectedIds.filter(i => i !== id);
                }
                state.selectAll = state.selectedIds.length === staffDetails.length;
                renderActivePage();
            });
        });

        // Staff name click
        document.querySelectorAll('.staff-name-click').forEach((el) => {
            el.addEventListener('click', () => {
                const staffId = parseInt(el.getAttribute('data-id'));
                const staff = staffDetails.find(s => s.id === staffId);
                if (staff) {
                    openStockIssueModal(staff);
                }
            });
        });

        // Search input
        const searchInput = document.getElementById('stockIssueSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                state.localFilters.staffName = e.target.value;
                state.filters.staffName = e.target.value;
                renderActivePage();
            });
        }

        // Filter button
        const filterBtn = document.getElementById('stockIssueFilterBtn');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => {
                openFilterModal('stockIssue');
            });
        }
    }

    // Open Stock Issue Modal
    function openStockIssueModal(staff) {
        state.selectedStaff = staff;
        const modal = document.getElementById('stockIssueModal');
        const modalTitle = document.getElementById('stockIssueModalTitle');
        
        modalTitle.textContent = `Stock Details for ${staff.staffName}`;
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('#stockIssueModalContent').classList.remove('translate-x-full');
        state.isStaffDetailsModalOpen = true;
        state.activeTab = 'currentIssues';
        state.newIssueItems = [{
            itemId: 0,
            itemName: "",
            quantity: 0,
            serialNumber: "",
            issueDate: new Date().toISOString().split('T')[0],
        }];
        
        renderStockIssueModalContent();
    }

    // Render Stock Issue Modal Content
    function renderStockIssueModalContent() {
        const modalBody = document.getElementById('stockIssueModalBody');
        const staffIssueDetails = allStaffIssueDetails.find(d => d.staffId === state.selectedStaff.id) || { staffId: state.selectedStaff.id, issues: [] };
        
        const currentIssues = staffIssueDetails.issues.filter(issue => issue.status === 'issued');
        const returnedList = staffIssueDetails.issues.filter(issue => issue.status === 'returned');

        // Update tab active states and attach handlers (Stock Issue modal)
        document.querySelectorAll('.stock-issue-tab').forEach(tab => {
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);

            // Reset to base visual state
            newTab.classList.remove(
                'border-[#44745c]',
                'text-green-900',
                'bg-white',
                'text-[#666c6a]'
            );

            if (newTab.getAttribute('data-tab') === state.activeTab) {
                // Active tab look
                newTab.classList.add('border-[#44745c]', 'text-green-900', 'bg-white');
            } else {
                // Inactive tab look
                newTab.classList.add('text-[#666c6a]');
            }

            // Attach click handler
            newTab.addEventListener('click', () => {
                state.activeTab = newTab.getAttribute('data-tab');
                renderStockIssueModalContent();
            });
        });

        if (state.activeTab === 'stockIssueNew') {
            modalBody.innerHTML = `
                ${state.newIssueItems.map((item, index) => `
                    <div class="bg-white p-4 mb-4 rounded shadow-sm relative">
                        <h6 class="font-semibold mb-3">Item ${index + 1}</h6>
                        ${state.newIssueItems.length > 1 ? `
                            <button type="button" class="absolute top-2 right-2 text-red-500 hover:text-red-700 remove-issue-item" data-index="${index}">
                                <i class="ri-close-circle-line text-xl"></i>
                            </button>
                        ` : ''}
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#000000] mb-1.5">Issue Date <span class="text-red-500">*</span></label>
                            <input type="date" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] issue-date-input" data-index="${index}" value="${item.issueDate}" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#000000] mb-1.5">Item Name <span class="text-red-500">*</span></label>
                            <input type="text" placeholder="Enter Item Name" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] issue-item-name" data-index="${index}" value="${item.itemName}" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#000000] mb-1.5">Quantity <span class="text-red-500">*</span></label>
                            <input type="number" placeholder="Enter Quantity" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] issue-quantity" data-index="${index}" value="${item.quantity || ''}" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#000000] mb-1.5">Serial Number <span class="text-red-500">*</span></label>
                            <input type="text" placeholder="Enter Serial Number" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] issue-serial" data-index="${index}" value="${item.serialNumber}" />
                        </div>
                    </div>
                `).join('')}
                <div class="flex justify-between items-center mt-4">
                    <button type="button" class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" id="addAnotherItemBtn">
                        <i class="ri-add-line mr-1"></i> Add Another Item
                    </button>
                    <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="saveIssueBtn">Issue Stock</button>
                </div>
            `;

            // Attach event listeners for new issue form
            document.querySelectorAll('.issue-date-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    state.newIssueItems[index].issueDate = e.target.value;
                });
            });

            document.querySelectorAll('.issue-item-name').forEach(input => {
                input.addEventListener('input', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    state.newIssueItems[index].itemName = e.target.value;
                });
            });

            document.querySelectorAll('.issue-quantity').forEach(input => {
                input.addEventListener('input', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    state.newIssueItems[index].quantity = parseInt(e.target.value) || 0;
                });
            });

            document.querySelectorAll('.issue-serial').forEach(input => {
                input.addEventListener('input', (e) => {
                    const index = parseInt(e.target.getAttribute('data-index'));
                    state.newIssueItems[index].serialNumber = e.target.value;
                });
            });

            document.querySelectorAll('.remove-issue-item').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const index = parseInt(e.target.closest('button').getAttribute('data-index'));
                    state.newIssueItems.splice(index, 1);
                    renderStockIssueModalContent();
                });
            });

            const addAnotherBtn = document.getElementById('addAnotherItemBtn');
            if (addAnotherBtn) {
                addAnotherBtn.addEventListener('click', () => {
                    state.newIssueItems.push({
                        itemId: 0,
                        itemName: "",
                        quantity: 0,
                        serialNumber: "",
                        issueDate: new Date().toISOString().split('T')[0],
                    });
                    renderStockIssueModalContent();
                });
            }

            const saveIssueBtn = document.getElementById('saveIssueBtn');
            if (saveIssueBtn) {
                saveIssueBtn.addEventListener('click', () => {
                    handleSaveIssue();
                });
            }
        } else if (state.activeTab === 'currentIssues') {
            modalBody.innerHTML = currentIssues.length > 0 ? `
                <table class="w-full text-[14px]">
                    <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                        <tr class="bg-gray-200">
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Item Name</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Quantity</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Serial Number</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Issue Date</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${currentIssues.map((issue) => `
                            <tr class="border-b border-gray-200">
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.itemName}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.quantity}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.serialNumber}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.issueDate}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                                    <button class="py-1 px-2 text-sm rounded border cursor-pointer btn-secondary mark-returned-btn" data-issue-id="${issue.issueId}">
                                        Mark Returned
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : `
                <div class="text-center py-10 text-gray-500">
                    No current issues for this staff member.
                </div>
            `;

            document.querySelectorAll('.mark-returned-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const issueId = parseInt(btn.getAttribute('data-issue-id'));
                    handleMarkReturned(state.selectedStaff.id, issueId);
                });
            });
        } else if (state.activeTab === 'returnedList') {
            modalBody.innerHTML = returnedList.length > 0 ? `
                <table class="w-full text-[14px]">
                    <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                        <tr class="bg-gray-200">
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Item Name</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Quantity</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Serial Number</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Issue Date</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${returnedList.map((issue) => `
                            <tr class="border-b border-gray-200">
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.itemName}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.quantity}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.serialNumber}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.issueDate}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.returnDate || 'N/A'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : `
                <div class="text-center py-10 text-gray-500">
                    No returned items for this staff member.
                </div>
            `;
        }
    }

    // Handle Save Issue
    function handleSaveIssue() {
        if (!state.selectedStaff) return;

        const isValid = state.newIssueItems.every(item => 
            item.itemName && item.quantity > 0 && item.serialNumber
        );

        if (!isValid) {
            alert('Please fill in all required fields for each item.');
            return;
        }

        const newRecords = state.newIssueItems.map(item => ({
            ...item,
            issueId: state.nextIssueId++,
            status: 'issued',
            returnDate: null,
        }));

        let staffDetail = allStaffIssueDetails.find(d => d.staffId === state.selectedStaff.id);
        if (staffDetail) {
            staffDetail.issues.push(...newRecords);
        } else {
            allStaffIssueDetails.push({
                staffId: state.selectedStaff.id,
                issues: newRecords
            });
        }

        // Update totalStockReceived
        const updatedStaffDetail = allStaffIssueDetails.find(d => d.staffId === state.selectedStaff.id);
        const totalIssued = updatedStaffDetail.issues.reduce(
            (sum, issue) => sum + (issue.status === 'issued' ? issue.quantity : 0),
            0
        );
        state.selectedStaff.totalStockReceived = totalIssued;
        const staffIndex = staffDetails.findIndex(s => s.id === state.selectedStaff.id);
        if (staffIndex !== -1) {
            staffDetails[staffIndex].totalStockReceived = totalIssued;
        }

        state.newIssueItems = [{
            itemId: 0,
            itemName: "",
            quantity: 0,
            serialNumber: "",
            issueDate: new Date().toISOString().split('T')[0],
        }];
        state.activeTab = 'currentIssues';
        renderStockIssueModalContent();
        renderActivePage();
    }

    // Handle Mark Returned
    function handleMarkReturned(staffId, issueId) {
        const staffDetail = allStaffIssueDetails.find(d => d.staffId === staffId);
        if (staffDetail) {
            const issue = staffDetail.issues.find(i => i.issueId === issueId);
            if (issue) {
                issue.status = 'returned';
                issue.returnDate = new Date().toISOString().split('T')[0];
            }
        }

        // Update totalStockReceived
        const updatedStaffDetail = allStaffIssueDetails.find(d => d.staffId === staffId);
        const totalIssued = updatedStaffDetail.issues.reduce(
            (sum, issue) => sum + (issue.status === 'issued' ? issue.quantity : 0),
            0
        );
        const staff = staffDetails.find(s => s.id === staffId);
        if (staff) {
            staff.totalStockReceived = totalIssued;
        }
        if (state.selectedStaff && state.selectedStaff.id === staffId) {
            state.selectedStaff.totalStockReceived = totalIssued;
        }

        renderStockIssueModalContent();
        renderActivePage();
    }

    // Close Stock Issue Modal
    function closeStockIssueModal() {
        const modal = document.getElementById('stockIssueModal');
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('#stockIssueModalContent').classList.add('translate-x-full');
        state.isStaffDetailsModalOpen = false;
        state.selectedStaff = null;
        state.activeTab = 'currentIssues';
        state.newIssueItems = [];
    }

    // Render Stock Report Page
    function renderStockReportPage(container) {
        const flattenedRecords = getFlattenedStockRecords();

        container.innerHTML = `
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="flex justify-between items-center px-1.5 py-1.5 bg-[#ebeff3]">
                    <div class="flex items-center space-x-2 ml-2">
                        <div class="bulk-actions flex items-center space-x-2">
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="printBtn">
                                <i class="ri-printer-line mr-1"></i> Print
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="summaryBtn">
                                <i class="ri-sticky-note-line mr-1"></i> Summary
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#e9ecef] text-[#6c757d] bg-[#f8f9fa] cursor-not-allowed opacity-60 text-sm" id="downloadBtn">
                                <i class="ri-arrow-down-line mr-1"></i> Download
                            </button>
                            <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-[#cfd7df] text-[#12375d] bg-white hover:bg-[#ebeff3] text-sm" id="deleteBtn">
                                <i class="ri-delete-bin-6-line mr-1"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center relative space-x-2">
                        <input
                            class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] !h-[31px]"
                            type="text"
                            id="stockReportSearchInput"
                            placeholder="Search Staff Name"
                            value="${state.localFilters.staffName || ''}"
                        />
                        <button class="py-1 px-2 text-sm rounded border cursor-pointer !border-transparent !text-[#384551] hover:bg-[#dce0e5] hover:border-[#ebeff3] text-sm" id="stockReportFilterBtn">
                            <i class="ri-sort-desc"></i>
                        </button>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-[#ebeff3]">
                    ${state.selectedIds.length > 1 ? `
                        <div class="fixed top-42 left-1/2 transform -translate-x-1/2 z-50 py-[10px] px-[15px] text-sm rounded-full shadow-[0_2px_10px_#27313a66] bg-[#fef1e1] text-[#12344d]">
                            ${state.selectedIds.length} records selected
                        </div>
                    ` : ''}
                    <div class="mx-2 h-[calc(100vh-147px)] overflow-hidden rounded-lg bg-white">
                        <div class="h-full overflow-y-auto">
                            <table class="w-full">
                                <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                                    <tr>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">
                                            <input
                                                type="checkbox"
                                                id="stockReportSelectAll"
                                                class="form-check accent-[#009333]"
                                                ${state.selectAll ? 'checked' : ''}
                                            />
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem] text-center">
                                            <div class="flex justify-center items-center gap-1">
                                                <span>S.No.</span>
                                            </div>
                                        </th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Date</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Employee Name</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Description</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Credit</th>
                                        <th class="border-r border-[#ebeff3] p-[0.3rem]">Debit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${flattenedRecords.map((record, index) => `
                                        <tr class="hover:bg-[#f5f7f9] text-sm cursor-pointer group ${state.selectedIds.includes(record.issueId) ? 'bg-[#e5f2fd] hover:bg-[#f5f7f9]' : ''}">
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] text-center">
                                                <input
                                                    type="checkbox"
                                                    class="form-check accent-[#009333] report-checkbox"
                                                    data-id="${record.issueId}"
                                                    ${state.selectedIds.includes(record.issueId) ? 'checked' : ''}
                                                />
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem] text-center">
                                                <div class="flex justify-between items-center">
                                                    <span></span>
                                                    <span class="text-center">${index + 1}</span>
                                                    <span class="cursor-pointer">
                                                        <i class="ri-pencil-fill p-1 rounded border border-[#cfd7df] text-[#4d5e6c] opacity-0 group-hover:opacity-100"></i>
                                                    </span>
                                                </div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${record.transactionDate}</td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">
                                                <div class="text-sm text-gray-900 cursor-pointer text-blue-600  report-staff-name-click" data-id="${record.staffId}">
                                                    ${record.staffName}
                                                </div>
                                            </td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${record.description}</td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${record.type === 'credit' ? record.quantity : '-'}</td>
                                            <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${record.type === 'debit' ? record.quantity : '-'}</td>
                                        </tr>
                                    `).join('')}
                                    ${flattenedRecords.length === 0 ? `
                                        <tr>
                                            <td colspan="7" class="text-center py-10">
                                                <div class="text-lg text-gray-500">No Stock Records available</div>
                                            </td>
                                        </tr>
                                    ` : ''}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="bg-[#ebeff3] py-3 h-[56.9px] px-4 flex items-center justify-start">
                    <span class="text-sm">
                        Showing <span class="text-red-600">${flattenedRecords.length}</span> of
                        <span class="text-blue-600">${flattenedRecords.length}</span> records
                    </span>
                </div>
            </div>
        `;

        attachStockReportEventListeners();
    }

    // Get Flattened Stock Records
    function getFlattenedStockRecords() {
        let allRecords = allStockReportDetails.flatMap(staffDetail => staffDetail.issues);
        const staffMap = new Map(DUMMY_STAFF.map(staff => [staff.id, staff.staffName]));

        return allRecords
            .map(record => ({
                ...record,
                staffName: staffMap.get(record.staffId) || 'Unknown Staff',
            }))
            .filter(record => {
                if (state.filters.staffName && !record.staffName.toLowerCase().includes(state.filters.staffName.toLowerCase())) {
                    return false;
                }
                if (state.filters.startDate) {
                    const transactionDate = new Date(record.transactionDate);
                    if (transactionDate < state.filters.startDate) {
                        return false;
                    }
                }
                if (state.filters.endDate) {
                    const transactionDate = new Date(record.transactionDate);
                    const adjustedEndDate = new Date(
                        state.filters.endDate.getFullYear(),
                        state.filters.endDate.getMonth(),
                        state.filters.endDate.getDate(),
                        23, 59, 59
                    );
                    if (transactionDate > adjustedEndDate) {
                        return false;
                    }
                }
                return true;
            })
            .sort((a, b) => new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime());
    }

    // Attach Stock Report event listeners
    function attachStockReportEventListeners() {
        const flattenedRecords = getFlattenedStockRecords();

        // Select all checkbox
        const selectAll = document.getElementById('stockReportSelectAll');
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                state.selectAll = e.target.checked;
                state.selectedIds = e.target.checked ? flattenedRecords.map(r => r.issueId) : [];
                renderActivePage();
            });
        }

        // Individual checkboxes
        document.querySelectorAll('.report-checkbox').forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                if (e.target.checked) {
                    state.selectedIds.push(id);
                } else {
                    state.selectedIds = state.selectedIds.filter(i => i !== id);
                }
                state.selectAll = state.selectedIds.length === flattenedRecords.length;
                renderActivePage();
            });
        });

        // Staff name click
        document.querySelectorAll('.report-staff-name-click').forEach((el) => {
            el.addEventListener('click', () => {
                const staffId = parseInt(el.getAttribute('data-id'));
                const staff = DUMMY_STAFF.find(s => s.id === staffId);
                if (staff) {
                    openStockReportModal(staff);
                }
            });
        });

        // Search input
        const searchInput = document.getElementById('stockReportSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                state.localFilters.staffName = e.target.value;
                state.filters.staffName = e.target.value;
                renderActivePage();
            });
        }

        // Filter button
        const filterBtn = document.getElementById('stockReportFilterBtn');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => {
                openFilterModal('stockReport');
            });
        }
    }

    // Open Stock Report Modal
    function openStockReportModal(staff) {
        state.selectedStaff = staff;
        const modal = document.getElementById('stockReportModal');
        const modalTitle = document.getElementById('stockReportModalTitle');
        
        modalTitle.textContent = `Stock Details for ${staff.staffName}`;
        
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('#stockReportModalContent').classList.remove('translate-x-full');
        state.isStockReportModalOpen = true;
        state.activeTab = 'currentIssues';
        state.newIssueItems = [{
            itemId: 0,
            itemName: "",
            quantity: 0,
            serialNumber: "",
            transactionDate: new Date().toISOString().split('T')[0],
            description: "",
        }];
        
        renderStockReportModalContent();
    }

    // Render Stock Report Modal Content
    function renderStockReportModalContent() {
        const modalBody = document.getElementById('stockReportModalBody');
        const staffIssueDetails = allStockReportDetails.find(d => d.staffId === state.selectedStaff.id) || { staffId: state.selectedStaff.id, issues: [] };
        
        const currentIssues = staffIssueDetails.issues.filter(issue => issue.status === 'issued');
        const returnedList = staffIssueDetails.issues.filter(issue => issue.status === 'returned');

        // Update tab active states and attach handlers (Stock Report modal)
        document.querySelectorAll('.stock-report-tab').forEach(tab => {
            const newTab = tab.cloneNode(true);
            tab.parentNode.replaceChild(newTab, tab);

            // Reset to base visual state
            newTab.classList.remove(
                'border-[#44745c]',
                'text-green-900',
                'bg-white',
                'text-[#666c6a]'
            );

            if (newTab.getAttribute('data-tab') === state.activeTab) {
                // Active tab look
                newTab.classList.add('border-[#44745c]', 'text-green-900', 'bg-white');
            } else {
                // Inactive tab look
                newTab.classList.add('text-[#666c6a]');
            }

            // Attach click handler
            newTab.addEventListener('click', () => {
                state.activeTab = newTab.getAttribute('data-tab');
                renderStockReportModalContent();
            });
        });

        if (state.activeTab === 'StockReportNew') {
            modalBody.innerHTML = `
                ${state.newIssueItems.map((item, index) => `
                    <div class="bg-white p-4 mb-4 rounded shadow-sm relative">
                        <h6 class="font-semibold mb-3">Item ${index + 1}</h6>
                        ${state.newIssueItems.length > 1 ? `
                            <button type="button" class="absolute top-2 right-2 text-red-500 hover:text-red-700 remove-report-item" data-index="${index}">
                                <i class="ri-close-circle-line text-xl"></i>
                            </button>
                        ` : ''}
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#000000] mb-1.5">Issue Date <span class="text-red-500">*</span></label>
                            <input type="date" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] report-date-input" data-index="${index}" value="${item.transactionDate}" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#000000] mb-1.5">Item Name <span class="text-red-500">*</span></label>
                            <input type="text" placeholder="Enter Item Name" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] report-item-name" data-index="${index}" value="${item.itemName}" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#000000] mb-1.5">Quantity <span class="text-red-500">*</span></label>
                            <input type="number" placeholder="Enter Quantity" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] report-quantity" data-index="${index}" value="${item.quantity || ''}" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#000000] mb-1.5">Serial Number <span class="text-red-500">*</span></label>
                            <input type="text" placeholder="Enter Serial Number" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] report-serial" data-index="${index}" value="${item.serialNumber}" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#000000] mb-1.5">Description</label>
                            <input type="text" placeholder="e.g., Laptop for new project" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333] report-description" data-index="${index}" value="${item.description || ''}" />
                        </div>
                    </div>
                `).join('')}
                <div class="flex justify-between items-center mt-4">
                    <button type="button" class="py-1 px-2 text-sm rounded border cursor-pointer bg-gradient-to-b from-white to-[#f5f7f9] text-[#212529] border border-[#cfd7df] hover:from-gray-50 hover:to-[#e9ecef] cursor-pointer transition" id="addAnotherReportItemBtn">
                        <i class="ri-add-line mr-1"></i> Add Another Item
                    </button>
                    <button class="py-1 px-2 text-sm rounded border cursor-pointer bg-[#009333] text-white border border-[#009333] hover:bg-[#007a2a] cursor-pointer transition" id="saveReportIssueBtn">Issue Stock</button>
                </div>
            `;

            // Attach event listeners
            attachStockReportFormListeners();
        } else if (state.activeTab === 'currentIssues') {
            modalBody.innerHTML = currentIssues.length > 0 ? `
                <table class="w-full text-[14px]">
                    <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                        <tr class="bg-gray-200">
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Item Name</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Quantity</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Serial Number</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Issue Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${currentIssues.map((issue) => `
                            <tr class="border-b border-gray-200">
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.itemName}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.quantity}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.serialNumber}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.transactionDate}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : `
                <div class="text-center py-10 text-gray-500">
                    No current issues for this staff member.
                </div>
            `;
        } else if (state.activeTab === 'returnedList') {
            modalBody.innerHTML = returnedList.length > 0 ? `
                <table class="w-full text-[14px]">
                    <thead class="text-[12px] text-[#475867] text-left bg-white sticky top-0 z-10 shadow-[0_1px_0_0_#ebeff3]">
                        <tr class="bg-gray-200">
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Item Name</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Quantity</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Serial Number</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Issue Date</th>
                            <th class="border-r border-[#ebeff3] p-[0.3rem]">Return Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${returnedList.map((issue) => `
                            <tr class="border-b border-gray-200">
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.itemName}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.quantity}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.serialNumber}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.transactionDate}</td>
                                <td class="border-r border-b border-[#ebeff3] p-[0.3rem]">${issue.returnDate || 'N/A'}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            ` : `
                <div class="text-center py-10 text-gray-500">
                    No returned items for this staff member.
                </div>
            `;
        }
    }

    // Attach Stock Report Form Listeners
    function attachStockReportFormListeners() {
        document.querySelectorAll('.report-date-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                state.newIssueItems[index].transactionDate = e.target.value;
            });
        });

        document.querySelectorAll('.report-item-name').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                state.newIssueItems[index].itemName = e.target.value;
            });
        });

        document.querySelectorAll('.report-quantity').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                state.newIssueItems[index].quantity = parseInt(e.target.value) || 0;
            });
        });

        document.querySelectorAll('.report-serial').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                state.newIssueItems[index].serialNumber = e.target.value;
            });
        });

        document.querySelectorAll('.report-description').forEach(input => {
            input.addEventListener('input', (e) => {
                const index = parseInt(e.target.getAttribute('data-index'));
                state.newIssueItems[index].description = e.target.value;
            });
        });

        document.querySelectorAll('.remove-report-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.closest('button').getAttribute('data-index'));
                state.newIssueItems.splice(index, 1);
                renderStockReportModalContent();
            });
        });

        const addAnotherBtn = document.getElementById('addAnotherReportItemBtn');
        if (addAnotherBtn) {
            addAnotherBtn.addEventListener('click', () => {
                state.newIssueItems.push({
                    itemId: 0,
                    itemName: "",
                    quantity: 0,
                    serialNumber: "",
                    transactionDate: new Date().toISOString().split('T')[0],
                    description: "",
                });
                renderStockReportModalContent();
            });
        }

        const saveIssueBtn = document.getElementById('saveReportIssueBtn');
        if (saveIssueBtn) {
            saveIssueBtn.addEventListener('click', () => {
                handleSaveReportIssue();
            });
        }
    }

    // Handle Save Report Issue
    function handleSaveReportIssue() {
        if (!state.selectedStaff) return;

        const isValid = state.newIssueItems.every(item => 
            item.itemName && item.quantity > 0 && item.serialNumber
        );

        if (!isValid) {
            alert('Please fill in all required fields for each item.');
            return;
        }

        const newRecords = state.newIssueItems.map(item => ({
            ...item,
            issueId: state.nextIssueId++,
            status: 'issued',
            type: 'debit',
            returnDate: null,
            staffId: state.selectedStaff.id,
        }));

        let staffDetail = allStockReportDetails.find(d => d.staffId === state.selectedStaff.id);
        if (staffDetail) {
            staffDetail.issues.push(...newRecords);
        } else {
            allStockReportDetails.push({
                staffId: state.selectedStaff.id,
                issues: newRecords
            });
        }

        state.newIssueItems = [{
            itemId: 0,
            itemName: "",
            quantity: 0,
            serialNumber: "",
            transactionDate: new Date().toISOString().split('T')[0],
            description: "",
        }];
        state.activeTab = 'currentIssues';
        renderStockReportModalContent();
        renderActivePage();
    }

    // Close Stock Report Modal
    function closeStockReportModal() {
        const modal = document.getElementById('stockReportModal');
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('#stockReportModalContent').classList.add('translate-x-full');
        state.isStockReportModalOpen = false;
        state.selectedStaff = null;
        state.activeTab = 'currentIssues';
        state.newIssueItems = [];
    }

    // Open Filter Modal
    function openFilterModal(pageType) {
        const modal = document.getElementById('filterModal');
        const filterContent = document.getElementById('filterContent');
        state.localFilters = { ...state.filters };
        state.isFilterOpen = true;

        let html = '';
        if (pageType === 'items') {
            html = `
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Item Name</label>
                    <input type="text" id="filterItemName" placeholder="Enter Item Name" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${state.localFilters.itemName || ''}" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Item Description</label>
                    <input type="text" id="filterDescription" placeholder="Enter Item Description" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${state.localFilters.description || ''}" />
                </div>
            `;
        } else if (pageType === 'stockIssue') {
            html = `
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Staff Name</label>
                    <input type="text" id="filterStaffName" placeholder="Enter Staff Name" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${state.localFilters.staffName || ''}" />
                </div>
            `;
        } else if (pageType === 'stockReport') {
            html = `
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Staff Name</label>
                    <input type="text" id="filterReportStaffName" placeholder="Enter Staff Name" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${state.localFilters.staffName || ''}" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">Start Date</label>
                    <input type="date" id="filterStartDate" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${state.localFilters.startDate ? new Date(state.localFilters.startDate).toISOString().split('T')[0] : ''}" />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-semibold text-[#000000] mb-1.5">End Date</label>
                    <input type="date" id="filterEndDate" class="block w-full text-sm h-[35px] px-[0.75rem] py-[0.375rem] text-[#212529] bg-white border border-[#cbcbcb] rounded-md leading-[1.5] focus:outline-none focus:border-[#009333]" value="${state.localFilters.endDate ? new Date(state.localFilters.endDate).toISOString().split('T')[0] : ''}" />
                </div>
            `;
        }

        filterContent.innerHTML = html;
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.querySelector('#filterSidebar').classList.remove('translate-x-full');
    }

    // Close Filter Modal
    function closeFilterModal() {
        const modal = document.getElementById('filterModal');
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.querySelector('#filterSidebar').classList.add('translate-x-full');
        state.isFilterOpen = false;
    }

    // Apply Filters
    function applyFilters() {
        state.filters = { ...state.localFilters };
        closeFilterModal();
        renderActivePage();
    }

    // Clear Filters
    function clearFilters() {
        state.localFilters = {};
        state.filters = {};
        closeFilterModal();
        renderActivePage();
    }

    // Attach Event Listeners
    function attachEventListeners() {
        // Sidebar search
        const sidebarSearch = document.getElementById('sidebarSearch');
        if (sidebarSearch) {
            sidebarSearch.addEventListener('input', (e) => {
                state.searchTerm = e.target.value;
                renderSidebar();
            });
        }

        // Filter Modal
        const filterBackdrop = document.getElementById('filterBackdrop');
        const filterCloseBtn = document.getElementById('filterCloseBtn');
        const filterApplyBtn = document.getElementById('filterApplyBtn');
        const filterResetBtn = document.getElementById('filterResetBtn');

        if (filterBackdrop) {
            filterBackdrop.addEventListener('click', closeFilterModal);
        }
        if (filterCloseBtn) {
            filterCloseBtn.addEventListener('click', closeFilterModal);
        }
        if (filterApplyBtn) {
            filterApplyBtn.addEventListener('click', applyFilters);
        }
        if (filterResetBtn) {
            filterResetBtn.addEventListener('click', clearFilters);
        }

        // Items Modal
        const itemsModalBackdrop = document.getElementById('itemsModalBackdrop');
        const itemsModalCloseBtn = document.getElementById('itemsModalCloseBtn');
        if (itemsModalBackdrop) {
            itemsModalBackdrop.addEventListener('click', closeItemsModal);
        }
        if (itemsModalCloseBtn) {
            itemsModalCloseBtn.addEventListener('click', closeItemsModal);
        }

        // Add Item Modal
        const addItemModalBackdrop = document.getElementById('addItemModalBackdrop');
        const addItemModalCloseBtn = document.getElementById('addItemModalCloseBtn');
        const addItemCancelBtn = document.getElementById('addItemCancelBtn');
        const addItemSaveBtn = document.getElementById('addItemSaveBtn');

        if (addItemModalBackdrop) {
            addItemModalBackdrop.addEventListener('click', closeAddItemModal);
        }
        if (addItemModalCloseBtn) {
            addItemModalCloseBtn.addEventListener('click', closeAddItemModal);
        }
        if (addItemCancelBtn) {
            addItemCancelBtn.addEventListener('click', closeAddItemModal);
        }
        if (addItemSaveBtn) {
            addItemSaveBtn.addEventListener('click', saveItem);
        }

        // Stock Issue Modal
        const stockIssueModalBackdrop = document.getElementById('stockIssueModalBackdrop');
        const stockIssueModalCloseBtn = document.getElementById('stockIssueModalCloseBtn');

        if (stockIssueModalBackdrop) {
            stockIssueModalBackdrop.addEventListener('click', closeStockIssueModal);
        }
        if (stockIssueModalCloseBtn) {
            stockIssueModalCloseBtn.addEventListener('click', closeStockIssueModal);
        }

        // Stock Issue Tabs - attach dynamically when modal opens
        // This will be handled in renderStockIssueModalContent

        // Stock Report Modal
        const stockReportModalBackdrop = document.getElementById('stockReportModalBackdrop');
        const stockReportModalCloseBtn = document.getElementById('stockReportModalCloseBtn');

        if (stockReportModalBackdrop) {
            stockReportModalBackdrop.addEventListener('click', closeStockReportModal);
        }
        if (stockReportModalCloseBtn) {
            stockReportModalCloseBtn.addEventListener('click', closeStockReportModal);
        }

        // Stock Report Tabs - attach dynamically when modal opens
        // This will be handled in renderStockReportModalContent

        // Escape key handler
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (state.isFilterOpen) closeFilterModal();
                if (state.isAddItemOpen) closeAddItemModal();
                if (state.isIssuedDetailsOpen) closeItemsModal();
                if (state.isStaffDetailsModalOpen) closeStockIssueModal();
                if (state.isStockReportModalOpen) closeStockReportModal();
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

