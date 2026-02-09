import sys
import os
import json

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), '.'))

from app import app

def test_endpoints():
    print("Testing API Endpoints...")
    client = app.test_client()
    
    # 1. Test /api/health
    resp = client.get('/api/health')
    print(f"\n/api/health: {resp.status_code}")
    assert resp.status_code == 200
    
    # 2. Test /api/alerts (Was 404/500)
    resp = client.get('/api/alerts')
    print(f"/api/alerts: {resp.status_code}")
    if resp.status_code == 200:
        print(f"Response: {resp.json}")
    assert resp.status_code == 200
    
    # 3. Test /api/predict (Was 500)
    payload = {
        "context": {"domain": "Technology", "opportunity_level": "High"},
        "signals": {"creation_output": 80, "digital_presence": 80, "projects": 5}
    }
    resp = client.post('/api/predict', json=payload)
    print(f"/api/predict: {resp.status_code}")
    if resp.status_code != 200:
        print(f"Error: {resp.data}")
    else:
        data = resp.json
        pathways = data['genome'].get('transition_pathways')
        ret_risk = data['opportunity'].get('retention_risk')
        print(f"Pathways: {pathways}, Retention Risk: {ret_risk}")
        assert pathways is not None and len(pathways) > 0
        assert ret_risk is not None
    assert resp.status_code == 200
    
    print("\n✅ All Endpoints Verified Successfully")

if __name__ == "__main__":
    test_endpoints()
