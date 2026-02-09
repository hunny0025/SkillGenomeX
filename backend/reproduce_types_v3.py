import sys
import os
import json
import pandas as pd
import numpy as np

sys.path.append(os.path.join(os.getcwd(), 'backend'))
from app import (
    calculate_regional_analysis, 
    calculate_risk_analysis, 
    calculate_market_intel, 
    calculate_policy_engine, 
    calculate_alerts_system, 
    df
)

def check_json(name, data):
    try:
        json.dumps(data)
        print(f"✅ {name}: Serialization OK")
    except TypeError as e:
        print(f"❌ {name}: Serialization FAILED - {e}")

def run_checks():
    print("--- DECOUPLED LOGIC CHECK ---")
    check_json("Regional", calculate_regional_analysis())
    check_json("Risk", calculate_risk_analysis())
    check_json("Market", calculate_market_intel())
    check_json("Policy", calculate_policy_engine())
    check_json("Alerts", calculate_alerts_system())

if __name__ == "__main__":
    run_checks()
