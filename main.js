$(document).ready(function () {
  $("#masterMenu").click(function () {
      $("#masterSubMenu").slideToggle(200);
      $("#masterArrow").toggleClass("ri-arrow-down-s-line ri-arrow-up-s-line");
  });

  $("#othersMenu").click(function () {
      $("#othersSubMenu").slideToggle(200);
      $("#othersArrow").toggleClass("ri-arrow-down-s-line ri-arrow-up-s-line");
  });


  // Highlight sidebar item that matches the current path/query
  const currentUrl = new URL(window.location.href);
  const currentTarget = `${currentUrl.pathname}${currentUrl.search}`;
  const activeItemClasses = "bg-[#191f26] border-l-[#1aed59] text-white";

  const activateMenuItem = ($li) => {
      $li.addClass(activeItemClasses);
      $li.find("a").addClass("text-white");
  };

  $("nav a[href]").each(function () {
      const linkUrl = new URL(this.getAttribute("href"), window.location.origin);
      const linkTarget = `${linkUrl.pathname}${linkUrl.search}`;
      if (linkTarget === currentTarget) {
          const $li = $(this).closest("li");
          activateMenuItem($li);

          // If the match is inside the master submenu, keep it open and style the parent
          if ($li.closest("#masterSubMenu").length) {
              $("#masterSubMenu").removeClass("hidden").show();
              $("#masterArrow").removeClass("ri-arrow-down-s-line").addClass("ri-arrow-up-s-line");
          }
      }
  });

});

// Data (mirrors your React example)
const projectsPie = [
  { name: 'Civil Litigation', completion: 85, color: '#4caf50' },
  { name: 'Corporate Advisory', completion: 70, color: '#2196f3' },
  { name: 'Criminal Defense', completion: 60, color: '#262626' },
  { name: 'Family Law', completion: 90, color: '#9c27b0' },
  { name: 'Intellectual Property', completion: 55, color: '#ff9800' },
  { name: 'Real Estate & Property', completion: 45, color: '#f44336' }
];

const cases = [
  { id: 1, title: "Corporate Merger - Apex & Orion", iconUrl: "images/man-profile.jpg", client: "Apex Industries Ltd.", lawyerAvatars: ["images/man-profile.jpg", "images/man-profile.jpg"], fees: "$25,000", progress: 75, colorGradient: "linear-gradient(195deg,#49a3f1,#1a73e8)" },
  { id: 2, title: "Trademark Dispute - Zenith Textiles", iconUrl: "images/man-profile.jpg", client: "Zenith Textiles Pvt Ltd.", lawyerAvatars: ["images/man-profile.jpg"], fees: "$7,500", progress: 40, colorGradient: "linear-gradient(195deg,#ffa726,#fb8c00)" },
  { id: 3, title: "Land Acquisition - Greenfield Estates", iconUrl: "images/man-profile.jpg", client: "Greenfield Estates", lawyerAvatars: ["images/man-profile.jpg", "images/man-profile.jpg"], fees: "Pending", progress: 20, colorGradient: "linear-gradient(195deg,#ef5350,#e53935)" },
  { id: 4, title: "Fraud Investigation - Metro Finance", iconUrl: "images/man-profile.jpg", client: "Metro Finance Corp.", lawyerAvatars: ["images/man-profile.jpg", "images/man-profile.jpg", "images/man-profile.jpg"], fees: "$18,000", progress: 90, colorGradient: "linear-gradient(195deg,#66bb6a,#43a047)" },
  { id: 5, title: "Employment Contract Review", iconUrl: "images/man-profile.jpg", client: "Luminex Technologies", lawyerAvatars: ["images/man-profile.jpg"], fees: "$3,200", progress: 100, colorGradient: "linear-gradient(195deg,#66bb6a,#43a047)" },
  { id: 6, title: "Property Settlement - Singh vs. Sharma", iconUrl: "images/man-profile.jpg", client: "Mr. Arjun Singh", lawyerAvatars: ["images/man-profile.jpg", "images/man-profile.jpg"], fees: "$5,500", progress: 55, colorGradient: "linear-gradient(195deg,#49a3f1,#1a73e8)" }
];

const topPerformers = [
  {
    id: 1,
    name: 'Adv. Priya Menon',
    detail: '12 Cases Closed • Civil Law',
    icon: 'ri-medal-line',
    colorClass: 'bg-[linear-gradient(195deg,#ffa726,#fb8c00)] bg-clip-text text-transparent'
  },
  {
    id: 2,
    name: 'Adv. Rajesh Kumar',
    detail: '8 High Court Hearings • Corporate Law',
    icon: 'ri-user-star-line',
    colorClass: 'bg-[linear-gradient(195deg,#ec407a,#d81b60)] bg-clip-text text-transparent'
  },
  {
    id: 3,
    name: 'Adv. Neha Thomas',
    detail: 'Won 4 Major Appeals • Family Law',
    icon: 'ri-briefcase-line',
    colorClass: 'bg-[linear-gradient(195deg,#49a3f1,#1a73e8)] bg-clip-text text-transparent'
  },
  {
    id: 4,
    name: 'Adv. Arjun Mehta',
    detail: 'Settled 6 Arbitration Cases',
    icon: 'ri-hand-coin-line',
    colorClass: 'bg-[linear-gradient(195deg,#66bb6a,#43a047)] bg-clip-text text-transparent'
  },
  {
    id: 5,
    name: 'Adv. Sneha Rao',
    detail: '5 Legal Drafts Completed',
    icon: 'ri-file-text-line',
    colorClass: 'bg-[linear-gradient(195deg,#ab47bc,#8e24aa)] bg-clip-text text-transparent'
  },
  {
    id: 6,
    name: 'Team Litigation A',
    detail: 'Handled 15 Active Matters',
    icon: 'ri-group-line',
    colorClass: 'bg-[linear-gradient(195deg,#42424a,#191919)] bg-clip-text text-transparent'
  }
];


// Initialize charts after DOM ready
$(function () {
  // Skip if dashboard script is loaded (it handles its own charts)
  if (typeof initDashboard === 'function') {
      return;
  }
  
  // Bar chart (weekly)
  const barCtx = document.getElementById('chart-bars');
  if (!barCtx) return;
  
  const barCtx2d = barCtx.getContext('2d');
  new Chart(barCtx2d, {
      type: 'bar',
      data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          datasets: [{ data: [50, 45, 22, 48, 50, 60, 76], backgroundColor: '#43a047', borderRadius: 6, barThickness: 18 }]
      },
      options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { x: { grid: { display: false }, ticks: { color: '#64748b' } }, y: { beginAtZero: true, grid: { display: true, color: '#f1f1f5' } } }
      }
  });

  // Line chart (monthly)
  const lineCtx = document.getElementById('chart-line');
  if (!lineCtx) return;
  const lineCtx2d = lineCtx.getContext('2d');
  new Chart(lineCtx2d, {
      type: 'line',
      data: {
          labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
          datasets: [{ data: [100, 250, 150, 400, 250, 320, 200, 350, 100, 300, 280, 250], borderColor: '#43a047', borderWidth: 2, fill: false, tension: 0.3, pointRadius: 2 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { display: false, grid: { display: false } } } }
  });

  // Line tasks chart
  const tasksCtx = document.getElementById('chart-line-tasks');
  if (!tasksCtx) return;
  const tasksCtx2d = tasksCtx.getContext('2d');
  new Chart(tasksCtx2d, {
      type: 'line',
      data: {
          labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{ data: [100, 50, 250, 200, 400, 250, 350, 200, 450], borderColor: '#43a047', borderWidth: 2, fill: false, tension: 0.3, pointRadius: 2 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { display: false } } }
  });

  // Large multi-line chart (expenditureData)
  const lineLargeCtx = document.getElementById('lineChartLarge');
  if (!lineLargeCtx) return;
  const lineLargeCtx2d = lineLargeCtx.getContext('2d');
  new Chart(lineLargeCtx2d, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
              { label: 'Civil Cases', data: [45, 60, 72, 68, 80, 75, 90, 85, 78, 82, 88, 95], borderColor: '#4caf50', tension: 0.4, fill: false },
              { label: 'Criminal Cases', data: [30, 45, 55, 50, 52, 48, 60, 58, 65, 62, 64, 70], borderColor: '#2196f3', tension: 0.4, fill: false },
              { label: 'Corporate Cases', data: [20, 28, 34, 40, 42, 45, 50, 52, 56, 54, 58, 60], borderColor: '#9c27b0', tension: 0.4, fill: false },
              { label: 'Family Cases', data: [15, 20, 18, 25, 28, 30, 26, 22, 24, 20, 18, 15], borderColor: '#ff9800', tension: 0.4, fill: false }
          ]
      },
      options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 12 } } },
          scales: { y: { beginAtZero: true, ticks: { callback: (v) => '$' + v } }, x: { grid: { display: false } } }
      }
  });

  // Pie chart large
  const pieCtx = document.getElementById('pieChartLarge');
  if (!pieCtx) return;
  const pieCtx2d = pieCtx.getContext('2d');
  new Chart(pieCtx2d, {
      type: 'pie',
      data: {
          labels: projectsPie.map(p => p.name),
          datasets: [{ data: projectsPie.map(p => p.completion), backgroundColor: projectsPie.map(p => p.color), borderColor: '#fff', borderWidth: 2 }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, padding: 12 } } } }
  });

  // Gauge (semi-doughnut)
  const gaugeCtx = document.getElementById('gaugeChart');
  if (!gaugeCtx) return;
  const gaugeCtx2d = gaugeCtx.getContext('2d');
  const completion = 78;

  new Chart(gaugeCtx2d, {
      type: 'doughnut',
      data: {
          datasets: [{
              data: [completion, 100 - completion],
              backgroundColor: ['#4caf50', '#e5e7eb'],
              borderWidth: 0
          }]
      },
      options: {
          responsive: true,
          maintainAspectRatio: false,

          // IMPORTANT — use degrees, not radians
          rotation: -90,          // start from bottom
          circumference: 180,     // half circle
          cutout: '80%',          // inner radius

          plugins: {
              legend: { display: false },
              tooltip: { enabled: false }
          }
      }
  });

  $('#gaugeValue').text(completion + '%');
  $('#gaugeCompleted').text(completion + '%');
  $('#gaugeRemaining').text((100 - completion) + '%');


  // Populate table
  const $tbody = $('#casesTbody');
  cases.forEach(c => {
      const row = `
        <tr>
          <td class="p-[0.5rem]">
            <div class="py-0.5 px-[1.5rem] flex items-center">
              <img src="${c.iconUrl}" class="w-[36px] h-[36px] mr-4 object-contain" />
              <span class="text-[.875rem] font-semibold text-[#262626]">${c.title}</span>
            </div>
          </td>
          <td class="p-[0.5rem]"><div class="py-0.5 px-[1.5rem] text-[.875rem] font-medium text-[#262626]">${c.client}</div></td>
          <td class="p-[0.5rem]">
            <div class="flex -space-x-2 py-0.5 px-[1.5rem]">
              ${c.lawyerAvatars.map(a => `<img src="${a}" class="w-[24px] h-[24px] rounded-full border-2 border-white object-cover" />`).join('')}
            </div>
          </td>
          <td class="text-[#737373] font-semibold text-[.875rem] p-[0.5rem]"><div class="py-0.5 px-[1.5rem]">${c.fees}</div></td>
          <td class="p-[0.5rem]">
            <div class="items-center py-0.5 px-[1.5rem]">
              <div><span class="text-xs font-semibold text-[#737373]">${c.progress}%</span></div>
              <div class="w-full bg-[#e5e5e5] rounded-[0.125rem] h-[3px]">
                <div style="width:${c.progress}%; height:3px; border-radius:2px; background:${c.colorGradient};"></div>
              </div>
            </div>
          </td>
        </tr>`;
      $tbody.append(row);
  });

  // Populate top performers
 const $tp = $('#topPerformersList');
topPerformers.forEach(p => {
  const item = `
    <div class="relative mb-6">
      <span class="absolute inline-flex items-center justify-center text-[18px] w-[26px] h-[26px] bg-white">
        <i class="${p.icon} ${p.colorClass}"></i>
      </span>

      <div class="pl-[38px] pt-[3px]">
        <p class="text-sm font-semibold text-[#262626]">${p.name}</p>
        <p class="text-xs font-semibold mt-1 text-[#737373]">${p.detail}</p>
      </div>
    </div>`
  $tp.append(item);
});

});
