import sys
import os
from datetime import datetime

# Add the ML models directory to sys.path to allow imports
ML_DIR = os.path.join(os.path.dirname(__file__), "..", "ml", "data", "notebooks", "models")
sys.path.append(ML_DIR)

try:
    from predict import FraudDetector
except ImportError as e:
    print(f"Error importing FraudDetector: {e}")
    FraudDetector = None

class FraudService:
    def __init__(self):
        if FraudDetector:
            self.detector = FraudDetector(model_path="models_state")
        else:
            self.detector = None

    def analyze_transaction(self, payload):
        """
        Connects API payload to ML FraudDetector.
        """
        if not self.detector:
            return {
                "prediction": "error",
                "probability": 0.0,
                "confidence_score": 0.0,
                "risk_level": "unknown",
                "message": "Fraud detection engine not initialized."
            }

        # Convert Pydantic model to dict if needed
        data = payload.dict() if hasattr(payload, 'dict') else payload
        
        # Ensure timestamp is formatted as string for the preprocessor
        if isinstance(data['timestamp'], datetime):
            data['timestamp'] = data['timestamp'].strftime('%Y-%m-%d %H:%M:%S')

        # Convert bool to int for ML consistency
        data['is_new_device'] = 1 if data['is_new_device'] else 0

        # Perform prediction
        result = self.detector.predict_transaction(data)

        # Enhance response with additional context
        message = "Transaction appears safe."
        if result['risk_level'] == 'high':
            message = "Transaction flagged as suspicious - High Risk"
        elif result['risk_level'] == 'medium':
            message = "Proceed with caution - Medium Risk flagged"

        # Log to Database (if configured)
        from services.db_service import db_service
        
        db_data = {
            "amount": data['amount'],
            "timestamp": data['timestamp'],
            "location": data['location'],
            "device_type": data['device_type'],
            "merchant_category": data['merchant_category'],
            "prediction": result['prediction'],
            "probability": float(result['probability']),
            "confidence_score": float(result['confidence_score'] * 100),
            "risk_level": result['risk_level'],
            "message": message
        }
        db_service.log_transaction(db_data)

        # Log to Database (if configured)
        from services.db_service import db_service
        
        db_data = {
            "amount": data['amount'],
            # Convert to ISO string if needed
            "timestamp": data['timestamp'],
            "location": data['location'],
            "device_type": data['device_type'],
            "merchant_category": data['merchant_category'],
            "prediction": result['prediction'],
            "probability": float(result['probability']),
            "confidence_score": float(result['confidence_score'] * 100),
            "risk_level": result['risk_level'],
            "message": message
        }
        db_service.log_transaction(db_data)

        return {
            "prediction": result['prediction'],
            "probability": result['probability'],
            "confidence_score": result['confidence_score'] * 100, # Convert to percentage
            "risk_level": result['risk_level'],
            "message": message
        }

# Singleton instance
fraud_service = FraudService()
