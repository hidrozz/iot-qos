// weekly.js
let weeklyChart;

function fetchWeeklyData() {
  fetch('/api/weekly')
    .then(res => res.json())
    .then(data => {
      const labels = data.map(d => d.hari);
      const moisture = data.map(d => d.moisture);
      const ph = data.map(d => d.ph);
      const latency = data.map(d => d.latency);

      // Render Tabel
      const tbody = document.getElementById('weeklyTableBody');
      tbody.innerHTML = '';
      data.forEach(d => {
        tbody.innerHTML += `
          <tr>
            <td>${d.hari}</td>
            <td>${d.moisture}</td>
            <td>${d.ph}</td>
            <td>${d.latency}</td>
          </tr>
        `;
      });

      // Render Chart
      if (weeklyChart) weeklyChart.destroy();
      const ctx = document.getElementById('weeklyChart').getContext('2d');
      weeklyChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Soil Moisture (%)',
              data: moisture,
              borderColor: 'green',
              tension: 0.3
            },
            {
              label: 'pH Tanah',
              data: ph,
              borderColor: 'blue',
              tension: 0.3
            },
            {
              label: 'Latency (ms)',
              data: latency,
              borderColor: 'orange',
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          animation: false
        }
      });
    })
    .catch(err => console.error('Gagal ambil data mingguan:', err));
}

// Refresh setiap 10 menit
fetchWeeklyData();
setInterval(fetchWeeklyData, 10 * 60 * 1000);

function exportWeekly(format) {
  const url = format === 'csv' 
    ? '/export/weekly.csv' 
    : '/export/docx';
  window.location.href = url;
}

