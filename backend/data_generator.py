import pandas as pd
import numpy as np
import random
import os
import json
from datetime import datetime, timedelta

# Configuration
NUM_SAMPLES = 12500 
OUTPUT_DIR = "backend/data"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "synthetic_talent_data.csv")

# --- Expanded Context Lists ---
DOMAINS_PRIMARY = [
    "Technology", "Data & Research", "Business", 
    "Creative", "Skilled Trades", "Social Impact", 
    "Agriculture", "Healthcare", "Education", "Craft & Artisan"
]

STATES = [
    "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Uttar Pradesh", 
    "Telangana", "Gujarat", "West Bengal", "Rajasthan", "Bihar", 
    "Madhya Pradesh", "Kerala", "Punjab", "Odisha", "Andhra Pradesh",
    "Haryana", "Assam", "Jharkhand", "Chhattisgarh", "Uttarakhand"
]

AREA_TYPES = ["Urban", "Semi-Urban", "Rural"]
OPPORTUNITY_LEVELS = ["High", "Moderate", "Low"]
INFRASTRUCTURE_ACCESS = ["High", "Limited", "Minimal"]
DIGITAL_ACCESS = ["Regular", "Limited", "Occasional"]

def generate_time_series(base_score, trend_type="stable"):
    """
    Generates a 24-month score history string (comma-separated).
    trend_type: 'emerging' (upward), 'stable' (flat), 'declining' (downward)
    """
    history = []
    current = base_score
    
    # Work backwards from current score
    for i in range(24):
        noise = random.uniform(-2, 2)
        if trend_type == "emerging":
            delta = random.uniform(0.5, 1.5) # Grew by ~1 point per month
            current -= delta 
        elif trend_type == "declining":
            delta = random.uniform(0.5, 1.5)
            current += delta
        else: # stable
            delta = random.uniform(-1, 1) # Fluctuates
            current -= delta
            
        history.append(max(0, min(100, current + noise)))
        
    return json.dumps(list(reversed(history))) # Store as JSON list string

def generate_signals(domain, area):
    """
    Generates realistic signals based on the target domain.
    """
    base = {}
    
    # 1. Creation / Output
    if domain in ["Technology", "Data & Research"]:
        base['creation_output'] = np.random.normal(70, 15)
        base['github_repos'] = int(np.random.poisson(10))
        base['projects'] = int(np.random.poisson(8))
    elif domain in ["Creative", "Craft & Artisan"]:
        base['creation_output'] = np.random.normal(85, 10)
        base['github_repos'] = 0
        base['projects'] = int(np.random.poisson(20))
    elif domain in ["Skilled Trades", "Agriculture"]:
        base['creation_output'] = np.random.normal(75, 15)
        base['github_repos'] = 0
        base['projects'] = int(np.random.poisson(15))
    else:
        base['creation_output'] = np.random.normal(50, 20)
        base['github_repos'] = int(np.random.poisson(1))
        base['projects'] = int(np.random.poisson(4))

    # 2. Learning Behavior
    if domain in ["Technology", "Healthcare", "Education"]:
        base['learning_behavior'] = np.random.normal(75, 15)
        base['learning_hours'] = abs(np.random.normal(20, 5))
    elif domain == "Agriculture":
         base['learning_behavior'] = np.random.normal(40, 20)
         base['learning_hours'] = abs(np.random.normal(30, 10))
    else:
        base['learning_behavior'] = np.random.normal(60, 20)
        base['learning_hours'] = abs(np.random.normal(10, 5))

    # 3. Experience (Years)
    if domain in ["Agriculture", "Skilled Trades"]:
        base['experience_consistency'] = np.random.normal(80, 15)
        base['experience_years'] = abs(np.random.normal(8, 4))
    else:
        base['experience_consistency'] = np.random.normal(60, 20)
        base['experience_years'] = abs(np.random.normal(4, 3))
        
    # 4. Economic Activity
    if domain in ["Business", "Technology"]:
        base['economic_activity'] = np.random.normal(70, 20)
    elif domain in ["Agriculture", "Social Impact"]:
        base['economic_activity'] = np.random.normal(40, 20) 
    else:
        base['economic_activity'] = np.random.normal(55, 20)

    # 5. Innovation / Problem Solving
    if domain in ["Technology", "Data & Research"]:
        base['innovation_problem_solving'] = np.random.normal(65, 20)
        base['hackathons'] = int(np.random.poisson(3))
    elif domain in ["Agriculture", "Skilled Trades"]:
        base['innovation_problem_solving'] = np.random.normal(70, 15) # Practical problem solving
        base['hackathons'] = 0
    else:
        base['innovation_problem_solving'] = np.random.normal(40, 20)
        base['hackathons'] = 0

    # 6. Collaboration
    base['collaboration_community'] = np.random.normal(50, 20)
    
    # 7. Offline Capability
    if domain in ["Skilled Trades", "Social Impact", "Creative", "Agriculture"]:
        base['offline_capability'] = np.random.normal(85, 10)
    else: 
        base['offline_capability'] = np.random.normal(40, 25)

    # 8. Digital Ecosystem
    if domain in ["Technology", "Business", "Creative"]:
        base['digital_presence'] = np.random.normal(85, 10)
    elif domain in ["Agriculture", "Skilled Trades"]:
        base['digital_presence'] = np.random.normal(30, 20)
    else:
        base['digital_presence'] = np.random.normal(50, 25)

    # 9. Skill Score Calculation (Simplified Simulation for Data Gen)
    # The backend will re-calculate this, but we need a baseline for history generation
    skill_score = (
        base['creation_output'] * 0.2 + 
        base['learning_behavior'] * 0.2 + 
        base['innovation_problem_solving'] * 0.2 +
        base['experience_consistency'] * 0.2 +
        base['digital_presence'] * 0.1 +
        base['offline_capability'] * 0.1
    )
    base['skill_score'] = min(100, max(0, skill_score))
    
    # 10. Time Series History
    # Assign trend based on domain
    if domain in ["Technology", "Data & Research", "Healthcare"]:
        trend = "emerging"
    elif domain in ["Skilled Trades", "Craft & Artisan"]:
        trend = "stable"
    else:
        trend = "stable" # default
    
    base['skill_history'] = generate_time_series(base['skill_score'], trend)

    # Normalize
    for k in ['github_repos', 'projects', 'hackathons', 'learning_hours']:
        base[k] = max(0, base[k])

    return base

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    data = []
    print(f"Generating {NUM_SAMPLES} synthetic profiles with Time-Series & Anomalies...")
    
    for _ in range(NUM_SAMPLES):
        state = random.choice(STATES)
        
        # State Specialization Logic
        if state == "Karnataka": domain_weights = {"Technology": 0.4, "Business": 0.2}
        elif state == "Punjab": domain_weights = {"Agriculture": 0.5, "Skilled Trades": 0.2}
        elif state == "Gujarat": domain_weights = {"Business": 0.4, "Skilled Trades": 0.2}
        elif state == "Kerala": domain_weights = {"Healthcare": 0.3, "Education": 0.3}
        else: domain_weights = {} # Uniform-ish
        
        # Select Domain
        if random.random() < 0.6 and domain_weights: # 60% chance to follow specialization
            domain = random.choices(list(domain_weights.keys()), weights=list(domain_weights.values()))[0]
        else:
            domain = random.choice(DOMAINS_PRIMARY)

        # 65% Rural Split
        area_probs = [0.2, 0.15, 0.65] # Urban, Semi, Rural
        area = np.random.choice(AREA_TYPES, p=area_probs)
        
        # Infrastructure linked to Area
        if area == "Urban":
            infra_score = int(np.random.normal(85, 10))
            digital = np.random.choice(DIGITAL_ACCESS, p=[0.9, 0.08, 0.02])
            opp = "High"
        elif area == "Semi-Urban":
            infra_score = int(np.random.normal(60, 15))
            digital = np.random.choice(DIGITAL_ACCESS, p=[0.5, 0.4, 0.1])
            opp = "Moderate"
        else: # Rural
            infra_score = int(np.random.normal(35, 15))
            digital = np.random.choice(DIGITAL_ACCESS, p=[0.2, 0.4, 0.4])
            opp = "Low"

        signals = generate_signals(domain, area)
        
        # Hidden Talent Injection
        if area == "Rural" and signals['skill_score'] > 65 and digital == "Limited":
            signals['is_hidden_talent'] = True
        else:
            signals['is_hidden_talent'] = False

        row = {
            "domain": domain,
            "state": state,
            "area_type": area,
            "opportunity_level": opp,
            "infrastructure_score": max(0, min(100, infra_score)),
            "digital_access": digital,
            **signals
        }
        data.append(row)
        
    df = pd.DataFrame(data)
    
    # Inject Anomalies (Adversarial Signals for Isolation Forest)
    # e.g., "Bot Farms" - Perfect scores, inhuman learning hours
    num_anomalies = int(NUM_SAMPLES * 0.02) # 2% anomalies
    for i in range(num_anomalies):
        idx = random.randint(0, NUM_SAMPLES - 1)
        df.at[idx, 'learning_hours'] = 160 # Impossible (160 hours/week)
        df.at[idx, 'creation_output'] = 100
        df.at[idx, 'innovation_problem_solving'] = 100
        df.at[idx, 'skill_score'] = 100
        df.at[idx, 'skill_history'] = json.dumps([100]*24) # Flatline perfect
        
    df.to_csv(OUTPUT_FILE, index=False)
    print(f"Successfully generated {len(df)} samples at {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
