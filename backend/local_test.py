import sys
import os
import json

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app import app

def run_tests():
    print("Starting Stability Verification...")
    app.testing = True
    client = app.test_client()
    
    # 1. Test Health
    print("\n--- Test 1: Health Check ---")
    res = client.get('/api/health')
    print(f"Status: {res.status_code}")
    print(f"Data: {res.get_json()}")
    if res.status_code == 200:
        print("✅ PASS: Health Check")
    else:
        print("❌ FAIL: Health Check")

    # 2. Test Predict with /api prefix
    print("\n--- Test 2: Predict Endpoint ---")
    payload = {
        "signals": { 
            "creation_output": 70, "learning_behavior": 85, "offline_capability": 80,
            "digital_presence": 30, "projects": 5
        },
        "context": { "state": "Bihar", "area_type": "Rural", "opportunity_level": "Low" }
    }
    
    res = client.post('/api/predict', json=payload)
    if res.status_code == 200:
        print("✅ PASS: Predict Endpoint (200 OK)")
    else:
        print(f"❌ FAIL: Predict Endpoint ({res.status_code})")

    # 3. Test Alerts (Internal Logic Fix)
    print("\n--- Test 3: Alerts System ---")
    res = client.get('/api/alerts')
    if res.status_code == 200:
        alerts = res.get_json()
        print(f"Active Alerts: {len(alerts)}")
        print("✅ PASS: Alerts Endpoint (Internal Logic Fixed)")
    else:
        print(f"❌ FAIL: Alerts Endpoint ({res.status_code})")
        
    # 4. Test Market Intel (Division by Zero check)
    print("\n--- Test 4: Market Intelligence ---")
    res = client.get('/api/market-intelligence')
    if res.status_code == 200:
        data = res.get_json()
        print(f"Market Data Keys: {list(data.keys())}")
        print("✅ PASS: Market Intelligence (Stability Check)")
    else:
        print(f"❌ FAIL: Market Intelligence ({res.status_code})")

if __name__ == "__main__":
    try:
        run_tests()
    except Exception as e:
        print(f"❌ TEST ERROR: {e}")
        sys.exit(1)
