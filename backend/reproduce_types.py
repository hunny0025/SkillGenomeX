import sys
import os
import json
import pandas as pd
import numpy as np
from flask import Flask, jsonify

sys.path.append(os.path.join(os.getcwd(), 'backend'))
# Mock Flask app context isn't needed if we just call the logic, 
# but we want to test json serialization which fails on numpy types sometimes.

from app import calculate_regional_analysis, calculate_risk_analysis, df

def reproduction():
    print("Testing Regional Analysis Serialization...")
    try:
        data = calculate_regional_analysis()
        # Try to dump to json
        json_str = json.dumps(data)
        print("✅ Regional Analysis JSON dump successful")
    except TypeError as e:
        print(f"❌ Regional Analysis JSON Failed: {e}")
        # Inspect types
        if data:
            print("Sample types:", {k: type(v) for k, v in data[0].items()})

    print("\nTesting Risk Analysis Serialization...")
    try:
        data = calculate_risk_analysis()
        json_str = json.dumps(data)
        print("✅ Risk Analysis JSON dump successful")
    except TypeError as e:
        print(f"❌ Risk Analysis JSON Failed: {e}")
        if data:
             print("Sample types:", {k: type(v) for k, v in data[0].items()})

if __name__ == "__main__":
    reproduction()
