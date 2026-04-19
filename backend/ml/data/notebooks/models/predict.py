import pandas as pd
import numpy as np
import joblib
import os
from preprocess import UPIPreprocessor

class FraudDetector:
    """
    Service for real-time UPI fraud detection.
    """
    def __init__(self, model_path="models_state"):
        self.model_path = model_path
        self.preprocessor = UPIPreprocessor()
        self.model = None
        self._load_resources()

    def _load_resources(self):
        """
        Loads the trained model and preprocessor state.
        """
        try:
            model_file = os.path.join(os.path.dirname(__file__), self.model_path, "fraud_model.pkl")
            state_dir = os.path.join(os.path.dirname(__file__), self.model_path)
            
            if not os.path.exists(model_file):
                raise FileNotFoundError(f"Model not found at {model_file}. Run train.py first.")
                
            self.model = joblib.load(model_file)
            self.preprocessor.load_state(state_dir)
            print("Fraud Detection Service: Resources loaded successfully.")
        except Exception as e:
            print(f"Error loading resources: {e}")

    def predict_transaction(self, transaction_data):
        """
        Analyzes a transaction and returns risk metrics.
        transaction_data: dict
        """
        if self.model is None:
            return {"error": "Model not loaded"}

        # 1. Preprocess
        X_processed = self.preprocessor.transform_single(transaction_data)
        
        # 2. Predict
        prediction = self.model.predict(X_processed)[0]
        probability = self.model.predict_proba(X_processed)[0, 1]
        
        # 3. Determine Risk Level
        risk_level = "low"
        if probability > 0.8:
            risk_level = "high"
        elif probability > 0.4:
            risk_level = "medium"
            
        # 4. Confidence Score
        # For fraud (1), confidence is the probability. 
        # For safe (0), confidence is (1 - probability).
        confidence = probability if prediction == 1 else (1 - probability)
        
        return {
            "prediction": "fraud" if prediction == 1 else "safe",
            "probability": round(float(probability), 4),
            "risk_level": risk_level,
            "confidence_score": round(float(confidence), 4)
        }

if __name__ == "__main__":
    # Test individual transaction
    detector = FraudDetector()
    
    test_txn = {
        'amount': 75000,
        'timestamp': '2026-03-31 03:30:00',
        'location': 'International',
        'device_type': 'Old Android',
        'merchant_category': 'Gambling',
        'transaction_type': 'QR-Scan',
        'previous_transaction_gap': 2,
        'is_new_device': 1
    }
    
    result = detector.predict_transaction(test_txn)
    print("\nTest Transaction Result:")
    print(result)
