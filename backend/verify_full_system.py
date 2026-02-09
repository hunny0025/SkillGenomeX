import requests
import json
import random

BASE_URL = "http://127.0.0.1:5000/api"

def test_endpoint(name, url, method='GET', payload=None):
    print(f"\n--- Testing {name} ({url}) ---")
    try:
        if method == 'GET':
            resp = requests.get(url)
        else:
            resp = requests.post(url, json=payload)
            
        if resp.status_code == 200:
            data = resp.json()
            print(f"Success! Status: 200")
            if isinstance(data, list):
                print(f"Received list of {len(data)} items.")
                if data: print(f"Sample: {data[0]}")
            elif isinstance(data, dict):
                print(f"Received dict with keys: {list(data.keys())}")
                if 'intelligence' in data:
                    print(f"Intelligence Model Used: {data['intelligence'].get('models_used')}")
        else:
            print(f"Failed! Status: {resp.status_code}")
            print(resp.text)
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    # 1. Test National Stats (Data Foundation)
    test_endpoint("National Stats", f"{BASE_URL}/national-distribution")
    
    # 2. Test Skill Trends (New)
    test_endpoint("Skill Trends", f"{BASE_URL}/skill-trends")
    
    # 3. Test State Specialization (New)
    test_endpoint("State Specialization", f"{BASE_URL}/state-specialization")
    
    # 4. Test Market Intel (Refined)
    test_endpoint("Market Intelligence", f"{BASE_URL}/market-intelligence")
    
    # 5. Test Prediction (Multi-Layer Genome)
    payload = {
        "signals": {
            "creation_output": 85,
            "learning_behavior": 80,
            "digital_presence": 90,
            "innovation_problem_solving": 75,
            "offline_capability": 40
        },
        "context": {
            "domain": "Technology",
            "state": "Karnataka",
            "area_type": "Urban",
            "opportunity_level": "High"
        }
    }
    test_endpoint("Prediction Engine", f"{BASE_URL}/predict", 'POST', payload)
