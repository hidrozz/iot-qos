// charts.js
export const timeLabels = [];
export const moistureData = [];
export const phData = [];
export const latencyData = [];

const ctxMoisture = document.getElementById('moistureChart').getContext('2d');
const ctxPH = document.getElementById('phChart').getContext('2d');
const ctxLatency = document.getElementById('latencyChart').getContext('2d');

export const moistureChart = new Chart(ctxMoisture, {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'Soil Moisture (%)',
      data: moistureData,
      borderColor: 'green',
      tension: 0.4
    }]
  },
  options: { responsive: true, animation: false }
});

export const phChart = new Chart(ctxPH, {
  type: 'line',
  data: {
    labels: timeLabels,
    datasets: [{
      label: 'pH Tanah',
      data: phData,
      borderColor: 'blue',
      tension: 0.4
    }]
  },
  options: { responsive: true, animation: false }
});

export const latencyChart = new Chart(ctxLatency, {
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
