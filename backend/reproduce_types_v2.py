import sys
import os
import json
import pandas as pd
import numpy as np

sys.path.append(os.path.join(os.getcwd(), 'backend'))
from app import calculate_regional_analysis, calculate_risk_analysis, market_intel, policy_engine, alerts_system, df

def reproduction():
    print("--- START TYPE CHECK ---")
    
    # 1. Regional
    try:
        data = calculate_regional_analysis()
        json.dumps(data)
        print("✅ Regional Analysis: OK")
    except TypeError as e:
        print(f"❌ Regional Analysis FAILED: {e}")

    # 2. Risk
    try:
        data = calculate_risk_analysis()
        json.dumps(data)
        print("✅ Risk Analysis: OK")
    except TypeError as e:
        print(f"❌ Risk Analysis FAILED: {e}")

    # 3. Market Intel (Note: market_intel returns a flask Response object in app.py currently? 
    # INTERNAL NOTE: In my previous edit I changed `market_intel` to return jsonify(data).
    # I need to separate the logic helper if I want to test it easily, or mock jsonify.
    # But wait, I didn't separate `market_intel` logic into a helper in step 291?
    # I verified step 291 diff...
    # `def market_intel(): ... return jsonify(data)`
    # So I cannot just call `market_intel()` here because it needs Flask app context for jsonify.
    # I should have separated it.
    pass 

    # We will manually extract the logic for test or just rely on the fact that I'll fix it now.

if __name__ == "__main__":
    reproduction()
