import sys
import os
import json

# Add backend to path
sys.path.append(os.path.join(os.path.dirname(__file__), '.'))

from app import intelligence_engine

def test_national_platform():
    print("Testing National Talent Intelligence Platform...")
    
    # 1. Agriculture Hidden Talent Test
    # Rural Farmer, High Offline/Yield, Low Digital
    agri_context = {
        "domain": "Agriculture",
        "area_type": "Rural",
        "opportunity_level": "Low",
        "digital_access": "Limited"
    }
    agri_signals = {
        "land_size_acres": 5,       
        "crop_diversity": 4,         
        "annual_yield_score": 92,    
        "agri_training_programs": 3, 
        "equipment_level": 2,
        "offline_capability": 90, # Explicitly high
        "digital_presence": 10
    }
    
    print("\n--- Test Case 1: Rural Hidden Talent (Agri) ---")
    agri_result = intelligence_engine(agri_signals, agri_context, "Agriculture")
    print(json.dumps(agri_result, indent=2))
    
    # Assertions
    try:
        assert agri_result['intelligence']['hidden_talent_flag'] == True
        print("✅ Hidden Talent Detected")
        assert agri_result['core']['score'] > 80
        print(f"✅ High Score Verified: {agri_result['core']['score']}")
        assert agri_result['intelligence']['migration_risk'] == "Critical"
        print("✅ Critical Migration Risk Verified (High Skill + Low Opp)")
    except AssertionError as e:
        print(f"❌ Agri Test Failed: {e}")

    # 2. Tech Urban Test (Expert)
    tech_context = {"domain": "Technology", "opportunity_level": "High", "digital_access": "Regular"}
    tech_signals = {
        "projects": 10, "github_repos": 20, "learning_hours": 30,
        "hackathons": 5, # Adds to innovation
        "creation_output": 95, 
        "digital_presence": 95,
        "learning_behavior": 90,
        "innovation_problem_solving": 92,
        "growth_potential": 88,
        "offline_capability": 40
    }
    
    print("\n--- Test Case 2: Urban Tech Expert ---")
    tech_result = intelligence_engine(tech_signals, tech_context, "Technology")
    print(f"Tech Score: {tech_result['core']['score']}")
    
    try:
        assert tech_result['intelligence']['hidden_talent_flag'] == False
        print("✅ No Hidden Talent Flag (Expected)")
        assert tech_result['core']['score'] > 85
        print(f"✅ Expert Score Verified: {tech_result['core']['score']}")
    except AssertionError as e:
        print(f"❌ Tech Test Failed: {e}")

if __name__ == "__main__":
    test_national_platform()
