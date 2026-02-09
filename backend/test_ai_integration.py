import requests
import time
import json

BASE_URL = "http://localhost:5000"

def test_endpoint(name, path, method="GET", payload=None):
    print(f"\n--- Testing {name} ({path}) ---")
    try:
        url = f"{BASE_URL}{path}"
        start = time.time()
        
        if method == "GET":
            response = requests.get(url)
        else:
            response = requests.post(url, json=payload)
            
        duration = round(time.time() - start, 3)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success ({duration}s)")
            return data
        else:
            print(f"❌ Failed: {response.status_code}")
            print(response.text)
            return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def main():
    # 1. Check AI Status (Model Training)
    status = test_endpoint("AI Status", "/api/ai-status")
    if status:
        print(f"   Models Active: {status.get('active')}")
        print(f"   Training Accuracy: {status.get('training_accuracy')}")
    
    # 2. Check Data Foundation
    foundation = test_endpoint("Data Foundation", "/api/data-foundation")
    if foundation:
        print(f"   Profiles: {foundation.get('profiles')}")
        print(f"   Time History: {foundation.get('time_history')}")

    # 3. Predict (ML Inference)
    payload = {
        "signals": {
            "creation_output": 85,
            "learning_behavior": 80,
            "digital_presence": 90,
            "experience_consistency": 70,
            "projects": 12,
            "learning_hours": 25
        },
        "context": {
            "domain": "Technology",
            "state": "Karnataka",
            "area_type": "Urban",
            "opportunity_level": "High"
        }
    }
    prediction = test_endpoint("Prediction Engine", "/api/predict", "POST", payload)
    if prediction:
        print(f"   Score: {prediction['core']['score']}")
        print(f"   Model: {prediction['intelligence'].get('model_used')}")
        print(f"   Anomaly: {prediction['intelligence'].get('is_anomaly')}")

    # 4. Policy Simulation
    policy_payload = {
        "state": "Bihar",
        "policy_type": "Broadband"
    }
    sim = test_endpoint("Policy Simulation", "/api/policy-simulate", "POST", policy_payload)
    if sim:
        print(f"   Original Risk: {sim['original_risk']}")
        print(f"   Simulated Risk: {sim['simulated_risk']}")
        print(f"   Reduction: {sim['reduction']}")
        
    # 5. Skill Trends (Time-Series)
    trends = test_endpoint("Skill Trends", "/api/skill-trends")
    if trends:
        domains = list(trends.keys())[:3]
        for d in domains:
            print(f"   {d}: {trends[d]['status']} (Growth: {trends[d]['growth_rate']})")

if __name__ == "__main__":
    main()
