import requests

print("Testing /api/forecast...")
try:
    resp = requests.get('http://127.0.0.1:5000/api/forecast')
    if resp.status_code == 200:
        data = resp.json()
        print(f"Success! Received {len(data)} domains.")
        print(f"Sample: {list(data.items())[0]}")
    else:
        print(f"Error: {resp.status_code}")
except Exception as e:
    print(f"Exception: {e}")
