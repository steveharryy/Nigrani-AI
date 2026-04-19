import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from sklearn.metrics import precision_score, recall_score, f1_score, roc_auc_score, classification_report
import joblib
import os
from preprocess import UPIPreprocessor

def train_and_compare():
    """
    Trains multiple models, compares performance, and saves the best one.
    """
    # 1. Load Dataset
    data_path = os.path.join(os.path.dirname(__file__), "upi_transactions.csv")
    if not os.path.exists(data_path):
        print(f"Dataset not found at {data_path}. Running generate_data... (simulation)")
        from generate_data import generate_upi_dataset
        generate_upi_dataset(n_samples=20000, output_path=data_path)
        
    df = pd.read_csv(data_path)
    
    # 2. Preprocessing
    print("Preprocess starting...")
    preprocessor = UPIPreprocessor()
    X_resampled, y_resampled = preprocessor.fit_transform(df)
    
    # Train-test split on resampled data
    X_train, X_test, y_train, y_test = train_test_split(X_resampled, y_resampled, test_size=0.2, random_state=42)
    
    # 3. Model Comparison
    models = {
        "Logistic Regression": LogisticRegression(max_iter=1000),
        "Random Forest": RandomForestClassifier(n_estimators=100, random_state=42),
        "XGBoost": XGBClassifier(use_label_encoder=False, eval_metric='logloss', random_state=42)
    }
    
    results = {}
    best_model = None
    best_f1 = 0
    
    for name, model in models.items():
        print(f"Training {name}...")
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
        
        # Metrics
        precision = precision_score(y_test, y_pred)
        recall = recall_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        roc_auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
        
        results[name] = {
            "Precision": precision,
            "Recall": recall,
            "F1": f1,
            "ROC-AUC": roc_auc
        }
        
        print(f"{name} Performance:")
        print(f"  Precision: {precision:.4f}")
        print(f"  Recall:    {recall:.4f}")
        print(f"  F1 Score:  {f1:.4f}")
        
        # Select best model based on F1 Score (Balance of Precision and Recall)
        if f1 > best_f1:
            best_f1 = f1
            best_model = model
            best_model_name = name

    # 4. Save Final Model and State
    output_dir = os.path.join(os.path.dirname(__file__), "models_state")
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    preprocessor.save_state(output_dir)
    joblib.dump(best_model, os.path.join(output_dir, "fraud_model.pkl"))
    
    print("\n" + "="*30)
    print(f"BEST MODEL: {best_model_name}")
    print(f"Model saved to {output_dir}/fraud_model.pkl")
    print("="*30)
    
    return results

if __name__ == "__main__":
    train_and_compare()
