// api.js
import { timeLabels, moistureData, phData, latencyData, moistureChart, phChart, latencyChart } from './charts.js';

export function fetchSensorData() {
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
