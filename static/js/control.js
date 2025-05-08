// control.js
export function sendCommand(state) {
    fetch(`/api/control?state=${state}`)
      .then(res => res.json())
      .then(msg => console.log('[RESPON API]:', msg))
      .catch(err => console.error('Gagal kirim perintah:', err));
  }
  