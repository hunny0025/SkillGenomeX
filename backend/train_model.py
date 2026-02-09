import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier, IsolationForest
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import classification_report

# Configuration
DATA_FILE = "backend/data/synthetic_talent_data.csv"
MODEL_DIR = "backend/models"

def train():
    if not os.path.exists(MODEL_DIR):
        os.makedirs(MODEL_DIR)

    print("Loading expanded dataset...")
    df = pd.read_csv(DATA_FILE)
    
    # Expanded Feature Selection for Skill Model
    # Now includes new dimensions + original signals
    feature_cols = [
        'creation_output', 'learning_behavior', 'experience_consistency',
        'economic_activity', 'innovation_problem_solving', 
        'collaboration_community', 'offline_capability', 'digital_presence',
        'github_repos', 'projects', 'learning_hours', 'hackathons'
    ]
    
    # Check if columns exist (safety)
    for col in feature_cols:
        if col not in df.columns:
            print(f"Warning: Column {col} missing in dataset. Filling with 0.")
            df[col] = 0

    X = df[feature_cols]
    y = df['domain']
    
    # Encode Target
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    
    # Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)
    
    # 1. Skill Domain Classifier
    print("Training Skill Domain Classifier (GradientBoosting)...")
    skill_model = GradientBoostingClassifier(n_estimators=150, learning_rate=0.1, max_depth=4, random_state=42)
    skill_model.fit(X_train, y_train)
    
    print("Skill Model Performance:")
    print(classification_report(y_test, skill_model.predict(X_test), target_names=le.classes_))
    
    # Calculate Feature Importance for later use
    feature_importance = dict(zip(feature_cols, skill_model.feature_importances_))
    print("Top Feature Importances:", sorted(feature_importance.items(), key=lambda x: x[1], reverse=True)[:3])
    
    # 2. Anomaly Detection Model
    print("Training Anomaly Detection Model (IsolationForest)...")
    anomaly_model = IsolationForest(n_estimators=100, contamination=0.03, random_state=42)
    anomaly_model.fit(X)
    
    # Save Models & Metadata
    print("Saving models...")
    with open(os.path.join(MODEL_DIR, "skill_model.pkl"), 'wb') as f:
        pickle.dump(skill_model, f)
        
    with open(os.path.join(MODEL_DIR, "anomaly_model.pkl"), 'wb') as f:
        pickle.dump(anomaly_model, f)
        
    with open(os.path.join(MODEL_DIR, "label_encoder.pkl"), 'wb') as f:
        pickle.dump(le, f)

    # Save extra metadata for the backend to use
    metadata = {
        "feature_cols": feature_cols,
        "feature_importance": feature_importance
    }
    with open(os.path.join(MODEL_DIR, "model_metadata.pkl"), 'wb') as f:
        pickle.dump(metadata, f)
        
    print("Training Complete. Models and metadata saved to backend/models/")

if __name__ == "__main__":
    train()
