const API_BASE = 'http://localhost:3000';
const DEFAULT_HOURLY_RATE = 50;

let charts = {};
let refreshInterval = null;

function initDashboard() {
    loadDashboardData();
    setInterval(loadDashboardData, 30000);
}

async function loadDashboardData() {
    try {
        const [projects, timeSheets, employees] = await Promise.all([
            fetch(`${API_BASE}/projects`).then(r => r.json()),
            fetch(`${API_BASE}/timeSheets`).then(r => r.json()),
            fetch(`${API_BASE}/employees`).then(r => r.json())
        ]);

        const dashboardData = calculateDashboardMetrics(projects, timeSheets, employees);
        updateMetrics(dashboardData);
        updateCharts(dashboardData);
        updateProjectTable(dashboardData.projects, dashboardData.projectCostMap);
        updateTopPerformers(dashboardData.topPerformers);
        updateLastUpdateTime();
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}

function calculateDashboardMetrics(projects, timeSheets, employees) {
    const activeProjects = projects.filter(p => p.status && p.status !== 'Completed').length;
    const completedProjects = projects.filter(p => p.status === 'Completed').length;
    const totalProjects = projects.length;
    const totalCustomers = [...new Set(projects.map(p => p.customerName))].length;

    const projectTimeMap = {};
    const projectCostMap = {};
    const employeeTimeMap = {};
    const projectStatusMap = {};

    projects.forEach(p => {
        projectTimeMap[p.projectName] = 0;
        projectCostMap[p.projectName] = 0;
        projectStatusMap[p.projectName] = p.status || 'Pending';
    });

    timeSheets.forEach(ts => {
        const timeMinutes = parseInt(ts.timeTaken) || 0;
        const timeHours = timeMinutes / 60;
        const cost = timeHours * DEFAULT_HOURLY_RATE;

        if (projectTimeMap.hasOwnProperty(ts.projectName)) {
            projectTimeMap[ts.projectName] += timeMinutes;
            projectCostMap[ts.projectName] += cost;
        }
    });

    const totalTimeMinutes = Object.values(projectTimeMap).reduce((a, b) => a + b, 0);
    const totalCost = Object.values(projectCostMap).reduce((a, b) => a + b, 0);
    const totalHours = totalTimeMinutes / 60;

    const projectCompletion = totalProjects > 0 
        ? Math.round((completedProjects / totalProjects) * 100) 
        : 0;

    const projectCosts = projects.map(p => ({
        name: p.projectName,
        cost: projectCostMap[p.projectName] || 0,
        time: projectTimeMap[p.projectName] || 0,
        status: projectStatusMap[p.projectName],
        customer: p.customerName,
        completion: projectStatusMap[p.projectName] === 'Completed' ? 100 : 
                    projectStatusMap[p.projectName] === 'In Progress' ? 50 : 0
    }));


    const topPerformers = calculateTopPerformers(projects, timeSheets, employees);

    const monthlyData = calculateMonthlyData(timeSheets);

    return {
        activeProjects,
        completedProjects,
        totalProjects,
        totalCustomers,
        totalTimeMinutes,
        totalHours,
        totalCost,
        projectCompletion,
        projectCosts,
        projectCostMap,
        topPerformers,
        monthlyData,
        projects: projects.slice(0, 6)
    };
}

function calculateTopPerformers(projects, timeSheets, employees) {
    const projectTimeMap = {};
    
    timeSheets.forEach(ts => {
        const timeMinutes = parseInt(ts.timeTaken) || 0;
        if (!projectTimeMap[ts.projectName]) {
            projectTimeMap[ts.projectName] = 0;
        }
        projectTimeMap[ts.projectName] += timeMinutes;
    });

    const projectStats = projects.map(p => ({
        name: p.projectName,
        time: projectTimeMap[p.projectName] || 0,
        tasks: timeSheets.filter(ts => ts.projectName === p.projectName).length,
        customer: p.customerName
    })).sort((a, b) => b.time - a.time).slice(0, 6);

    return projectStats.map((p, index) => ({
        id: index + 1,
        name: p.name,
        detail: `${p.tasks} Tasks • ${Math.round(p.time / 60)} Hours`,
        icon: ['ri-briefcase-line', 'ri-file-text-line', 'ri-time-line', 'ri-checkbox-circle-line', 'ri-projector-line', 'ri-folder-line'][index],
        colorClass: ['bg-[linear-gradient(195deg,#ffa726,#fb8c00)]', 'bg-[linear-gradient(195deg,#ec407a,#d81b60)]', 'bg-[linear-gradient(195deg,#49a3f1,#1a73e8)]', 'bg-[linear-gradient(195deg,#66bb6a,#43a047)]', 'bg-[linear-gradient(195deg,#ab47bc,#8e24aa)]', 'bg-[linear-gradient(195deg,#42424a,#191919)]'][index]
    }));
}

function calculateMonthlyData(timeSheets) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyCosts = months.map(() => 0);
    
    timeSheets.forEach(ts => {
        const timeMinutes = parseInt(ts.timeTaken) || 0;
        const timeHours = timeMinutes / 60;
        const cost = timeHours * DEFAULT_HOURLY_RATE;
        const month = new Date().getMonth();
        monthlyCosts[month] += cost;
    });

    return monthlyCosts;
}

function updateMetrics(data) {
    $('#metricActiveProjects').text(data.activeProjects);
    $('#metricCompletedProjects').text(data.completedProjects);
    $('#metricTotalCustomers').text(data.totalCustomers);
    $('#metricTotalCost').text(formatCurrency(data.totalCost));

    const activeChange = data.activeProjects > 0 ? '+8%' : '0%';
    const completedChange = data.completedProjects > 0 ? '+2%' : '0%';
    const customerChange = data.totalCustomers > 0 ? '+18%' : '0%';
    const costChange = data.totalCost > 0 ? '+12%' : '0%';

    $('#metricActiveChange').text(activeChange);
    $('#metricCompletedChange').text(completedChange);
    $('#metricCustomerChange').text(customerChange);
    $('#metricCostChange').text(costChange);
}

function updateCharts(data) {
    updateBarChart(data.monthlyData);
    updateLineChart(data.projectCosts);
    updatePieChart(data.projectCosts);
    updateGaugeChart(data.projectCompletion);
    updateLineChartLarge(data.projectCosts);
    updateCompletionRate(data.projectCompletion);
}

function updateBarChart(monthlyData) {
    const ctx = document.getElementById('chart-bars');
    if (!ctx) return;

    if (charts.bar) {
        charts.bar.destroy();
    }

    charts.bar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [{
                data: monthlyData.slice(0, 7).map(c => Math.round(c / 100)),
                backgroundColor: '#43a047',
                borderRadius: 6,
                barThickness: 18
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#64748b' } },
                y: { beginAtZero: true, grid: { display: true, color: '#f1f1f5' } }
            }
        }
    });
}

function updateLineChart(projectCosts) {
    const ctx = document.getElementById('chart-line');
    if (!ctx) return;

    if (charts.line) {
        charts.line.destroy();
    }

    const topProjects = projectCosts.slice(0, 12).map(p => p.name.substring(0, 1));
    const projectData = projectCosts.slice(0, 12).map(p => Math.round(p.cost / 10));

    charts.line = new Chart(ctx, {
        type: 'line',
        data: {
            labels: topProjects.length > 0 ? topProjects : ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
            datasets: [{
                data: projectData.length > 0 ? projectData : [100, 250, 150, 400, 250, 320, 200, 350, 100, 300, 280, 250],
                borderColor: '#43a047',
                borderWidth: 2,
                fill: false,
                tension: 0.3,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false } },
                y: { display: false, grid: { display: false } }
            }
        }
    });
}

function updatePieChart(projectCosts) {
    const ctx = document.getElementById('pieChartLarge');
    if (!ctx) return;

    if (charts.pie) {
        charts.pie.destroy();
    }

    const statusCounts = {
        'Completed': projectCosts.filter(p => p.status === 'Completed').length,
        'In Progress': projectCosts.filter(p => p.status === 'In Progress').length,
        'Pending': projectCosts.filter(p => p.status === 'Pending' || !p.status).length
    };

    const colors = ['#4caf50', '#2196f3', '#ff9800'];
    const labels = Object.keys(statusCounts).filter(k => statusCounts[k] > 0);
    const data = labels.map(k => statusCounts[k]);

    if (data.length === 0) {
        labels.push('No Projects');
        data.push(1);
    }

    charts.pie = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors.slice(0, labels.length),
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 12 } }
            }
        }
    });
}

function updateGaugeChart(completion) {
    const ctx = document.getElementById('gaugeChart');
    if (!ctx) return;

    if (charts.gauge) {
        charts.gauge.destroy();
    }

    charts.gauge = new Chart(ctx, {
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
            rotation: -90,
            circumference: 180,
            cutout: '80%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });

    $('#gaugeValue').text(completion + '%');
    $('#gaugeCompleted').text(completion + '%');
    $('#gaugeRemaining').text((100 - completion) + '%');
}

function updateProjectTable(projects, projectCostsMap) {
    const $tbody = $('#casesTbody');
    $tbody.empty();

    if (projects.length === 0) {
        $tbody.append('<tr><td colspan="5" class="p-[0.5rem] text-center text-[.875rem] text-[#737373]">No projects found</td></tr>');
        return;
    }

    projects.forEach(p => {
        const status = p.status || 'Pending';
        const progress = status === 'Completed' ? 100 : status === 'In Progress' ? 50 : 0;
        const colorGradient = status === 'Completed' 
            ? 'linear-gradient(195deg,#66bb6a,#43a047)'
            : status === 'In Progress'
            ? 'linear-gradient(195deg,#49a3f1,#1a73e8)'
            : 'linear-gradient(195deg,#ffa726,#fb8c00)';

        const projectCost = projectCostsMap && projectCostsMap[p.projectName] ? projectCostsMap[p.projectName] : 0;
        const costDisplay = projectCost > 0 ? formatCurrency(projectCost) : '-';

        const row = `
          <tr>
            <td class="p-[0.5rem]">
              <div class="py-0.5 px-[1.5rem] flex items-center">
                <div class="w-[36px] h-[36px] mr-4 rounded-full bg-gradient-to-br ${colorGradient.includes('66bb6a') ? 'from-green-400 to-green-600' : colorGradient.includes('49a3f1') ? 'from-blue-400 to-blue-600' : 'from-orange-400 to-orange-600'} flex items-center justify-center text-white font-bold">${p.projectName.charAt(0)}</div>
                <span class="text-[.875rem] font-semibold text-[#262626]">${p.projectName}</span>
              </div>
            </td>
            <td class="p-[0.5rem]"><div class="py-0.5 px-[1.5rem] text-[.875rem] font-medium text-[#262626]">${p.customerName || 'N/A'}</div></td>
            <td class="p-[0.5rem]">
              <div class="py-0.5 px-[1.5rem] text-[.875rem] text-[#737373]">${status}</div>
            </td>
            <td class="text-[#737373] font-semibold text-[.875rem] p-[0.5rem]"><div class="py-0.5 px-[1.5rem]">${costDisplay}</div></td>
            <td class="p-[0.5rem]">
              <div class="items-center py-0.5 px-[1.5rem]">
                <div><span class="text-xs font-semibold text-[#737373]">${progress}%</span></div>
                <div class="w-full bg-[#e5e5e5] rounded-[0.125rem] h-[3px]">
                  <div style="width:${progress}%; height:3px; border-radius:2px; background:${colorGradient};"></div>
                </div>
              </div>
            </td>
          </tr>`;
        $tbody.append(row);
    });
}

function updateTopPerformers(performers) {
    const $tp = $('#topPerformersList');
    $tp.empty();

    if (performers.length === 0) {
        $tp.append('<div class="text-sm text-[#737373] text-center py-4">No data available</div>');
        return;
    }

    performers.forEach(p => {
        const item = `
      <div class="relative mb-6">
        <span class="absolute inline-flex items-center justify-center text-[18px] w-[26px] h-[26px] bg-white">
          <i class="${p.icon} ${p.colorClass}"></i>
        </span>
        <div class="pl-[38px] pt-[3px]">
          <p class="text-sm font-semibold text-[#262626]">${p.name}</p>
          <p class="text-xs font-semibold mt-1 text-[#737373]">${p.detail}</p>
        </div>
      </div>`;
        $tp.append(item);
    });
}

function updateLineChartLarge(projectCosts) {
    const ctx = document.getElementById('lineChartLarge');
    if (!ctx) return;

    if (charts.lineLarge) {
        charts.lineLarge.destroy();
    }

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const topProjects = projectCosts.slice(0, 4);
    
    if (topProjects.length === 0) {
        return;
    }

    const datasets = topProjects.map((p, index) => {
        const colors = ['#4caf50', '#2196f3', '#9c27b0', '#ff9800'];
        const monthlyData = Array(12).fill(0).map(() => Math.random() * p.cost * 0.3 + p.cost * 0.1);
        return {
            label: p.name,
            data: monthlyData,
            borderColor: colors[index % colors.length],
            tension: 0.4,
            fill: false
        };
    });

    charts.lineLarge = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { usePointStyle: true, padding: 12 } }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (v) => '$' + Math.round(v)
                    }
                },
                x: { grid: { display: false } }
            }
        }
    });
}

function updateCompletionRate(completion) {
    $('#completionRate').text(completion + '%');
    $('#projectsClosedCount').text(`${completion}% projects completed`);
}

function updateLastUpdateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    $('.update-time').text(`updated ${timeStr}`);
}

function formatCurrency(amount) {
    return '$' + Math.round(amount).toLocaleString();
}

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

$(document).ready(function() {
    initDashboard();
});

