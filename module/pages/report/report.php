
<div class="flex overflow-hidden max-h-[calc(100vh-48px)]" id="reports-page">
  <!-- Sidebar -->
  <aside class="w-[240px] h-[100vh] bg-[#f8f9fa] border-r border-[#ebeff3] px-3 flex flex-col space-y-4">
    <div class="mt-2">
      <h1 class="text-[18px] sm:text-[20px] font-medium text-[#009333]">
        Reports
      </h1>
    </div>

    <!-- Search -->
    <div class="relative">
      <div class="flex items-center overflow-hidden">
        <i class="ri-search-line absolute left-2 text-sm"></i>
        <input
          id="report-search"
          type="text"
          placeholder="Search here..."
          class="form-control pl-7 w-full border border-gray-300 rounded-md py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#009333] focus:border-[#009333]"
        />
      </div>
    </div>

    <!-- Report list -->
    <div class="flex flex-col gap-4 text-sm bg-[#f8f9fa] overflow-y-auto pr-2 max-h-[calc(100vh-110px)]">
      <ul id="report-list" class="space-y-1">
        <!-- Filled by report.js -->
      </ul>

      <div
        id="report-list-empty"
        class="text-center text-gray-500 py-4 hidden text-xs"
      >
        No reports found.
      </div>
    </div>
  </aside>

  <!-- Main content -->
  <div class="flex-1 flex flex-col bg-white" id="report-main">
    <!-- Active report title -->
    <div class="border-b border-gray-200">
      <h1
        id="active-report-title"
        class="text-[18px] sm:text-[20px] font-medium text-[#009333] p-2"
      >
        <!-- Filled by report.js -->
      </h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-6 px-4 py-6 h-full">
      <!-- Left: Generate Report form -->
      <form
        id="report-form"
        class="space-y-4 lg:border-r lg:border-gray-300 lg:pr-4 overflow-y-auto"
        autocomplete="off"
      >
        <h2 class="text-lg font-semibold text-start mb-4">
          Generate Report
        </h2>

        <!-- Dynamic form content -->
        <div id="report-form-content" class="space-y-4">
          <!-- Filled by report.js depending on active report -->
        </div>

        <div class="pt-2">
          <button
            type="button"
            id="get-report-btn"
            class="btn-sm btn-primary inline-flex items-center justify-center px-4 py-1.5 text-sm font-medium rounded bg-[#009333] text-white hover:bg-[#007a2a] transition"
          >
            Get Report
          </button>
        </div>
      </form>

      <!-- Right: Tutorial video -->
      <div class="space-y-4 flex flex-col items-start overflow-y-auto">
        <h2 class="text-lg font-semibold mb-2">
          Tutorial Video (<span id="tutorial-title">Monthly Report</span>)
        </h2>

        <div class="w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-md">
          <iframe
            id="tutorial-iframe"
            class="w-full h-full"
            src=""
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Suggested videos -->
        <div class="w-full max-w-6xl mt-6">
          <h3 class="text-md font-semibold mb-3">Suggested Videos</h3>
          <div
            id="suggested-videos"
            class="w-full overflow-x-auto pb-2"
          >
            <!-- Filled by report.js -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal -->
<div
  id="report-modal"
  class="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 hidden"
>
  <div
    class="bg-white rounded-md w-full max-w-[80%] h-[90vh] flex flex-col"
  >
    <div
      class="relative border-b border-[#dee2e6] px-4 py-2 bg-[#f8f8f8] rounded-tl-md flex items-center justify-between"
    >
      <span
        id="report-modal-title"
        class="text-[16px] text-[#212529]"
      ></span>

      <div class="flex gap-2 mr-5">
        <button
          id="printBtn"
          type="button"
          class="btn-sm btn-hover text-[#009333] hover:bg-green-100 inline-flex items-center px-3 py-1 text-sm rounded"
        >
          <i class="ri-printer-line mr-1"></i>
          Print
        </button>
        <button
          id="downloadBtn"
          type="button"
          class="btn-sm btn-hover text-[#009333] hover:bg-green-100 inline-flex items-center px-3 py-1 text-sm rounded"
        >
          <i class="ri-arrow-down-line mr-1"></i>
          Download
        </button>
      </div>

      <button
        id="report-modal-close"
        type="button"
        class="absolute -top-[10px] -right-[10px] text-gray-500 hover:text-gray-700 bg-[#909090] hover:bg-[#cc0000] rounded-full w-[30px] h-[30px] border-2 border-white cursor-pointer flex items-center justify-center"
      >
        <i class="ri-close-line text-white"></i>
      </button>
    </div>

    <div class="flex flex-1 overflow-hidden">
      <main
        id="report-modal-body"
        class="flex-1 p-6 overflow-y-auto text-sm text-gray-700"
      >
        <!-- Filled by report.js with a summary of the selected filters / payload -->
      </main>
    </div>
  </div>
</div>

<!-- Attach JS for this page (absolute path to match other modules) -->
<script src="/module/pages/report/report.js"></script>


