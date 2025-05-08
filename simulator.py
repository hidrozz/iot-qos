import requests
import time

while True:
    try:
        r = requests.get("http://localhost:5000/api/simulate")
        print("Status code:", r.status_code)
        print("Response text:", r.text)
        print("Simulasi data terkirim:", r.json())
    except Exception as e:
        print("Gagal konek ke server:", e)
    time.sleep(5)
