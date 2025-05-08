// main.js
import { fetchSensorData } from './api.js';
import { sendCommand } from './control.js';

// Mulai loop ambil data sensor
setInterval(fetchSensorData, 5000);

// Fungsi global agar bisa dipanggil dari HTML
window.sendCommand = sendCommand;

// Fungsi ekspor laporan mingguan
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

window.exportDaily = function(format) {
  const url = `/export/daily.${format}`;
  fetch(url)
    .then(res => {
      if (res.ok) return res.blob();
      throw new Error('Gagal ekspor laporan harian');
    })
    .then(blob => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `laporan_harian.${format}`;
      a.click();
    })
    .catch(err => console.error(err.message));
};
