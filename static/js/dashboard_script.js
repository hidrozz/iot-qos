// dashboard_script.js
import { Chart } from 'chart.js';

// Data chart realtime
const timeLabels = [], moistureData = [], phData = [], latencyData = [];

const moistureChart = new Chart(document.getElementById('moistureChart'), {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'Soil Moisture (%)',
      data: moistureData,
      borderColor: 'green',
      tension: 0.3,
      fill: false
    }]
  },
  options: { responsive: true, animation: false }
});

const phChart = new Chart(document.getElementById('phChart'), {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'pH Tanah',
      data: phData,
      borderColor: 'blue',
      tension: 0.3,
      fill: false
    }]
  },
  options: { responsive: true, animation: false }
});

const latencyChart = new Chart(document.getElementById('latencyChart'), {
  type: 'bar',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'Latency (ms)',
      data: latencyData,
      backgroundColor: 'orange'
    }]
  },
  options: { responsive: true, animation: false }
});

function fetchSensorData() {
  fetch('/api/latest')
    .then(res => res.json())
    .then(data => {
      const t = new Date(data.timestamp * 1000).toLocaleTimeString();
      timeLabels.push(t);
      moistureData.push(data.soil_moisture);
      phData.push(data.ph);
      latencyData.push(data.latency);

      if (timeLabels.length > 10) {
        timeLabels.shift(); moistureData.shift(); phData.shift(); latencyData.shift();
      }

      moistureChart.update();
      phChart.update();
      latencyChart.update();
    })
    .catch(err => console.error('Gagal ambil data sensor:', err));
}

setInterval(fetchSensorData, 5000);

// Fungsi kontrol pompa (terhubung ke Flask backend)
window.sendCommand = function(state) {
  fetch(`/api/control?state=${state}`)
    .then(res => res.json())
    .then(response => console.log('Respon:', response))
    .catch(error => console.error('Gagal kirim perintah:', error));
};

// Fungsi ekspor laporan mingguan (template endpoint)
window.exportReport = function(format) {
  const url = `/export/${format}`;
  fetch(url)
    .then(res => {
      if (res.ok) return res.blob();
      throw new Error('Gagal ekspor laporan');
    })
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `laporan_mingguan.${format}`;
      a.click();
    })
    .catch(err => console.error(err.message));
};
