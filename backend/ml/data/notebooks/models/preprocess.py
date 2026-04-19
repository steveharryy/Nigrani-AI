import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from imblearn.over_sampling import SMOTE
import joblib
import os

class UPIPreprocessor:
    """
    Preprocessing pipeline for UPI Fraud Detection.
    """
    def __init__(self):
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.categorical_cols = ['location', 'device_type', 'merchant_category', 'transaction_type']
        self.numerical_cols = ['amount', 'previous_transaction_gap', 'is_new_device', 'is_night', 'hour', 'transaction_velocity', 'frequency_last_5min']

    def engineer_features(self, df):
        """
        Creates new features from raw UPI transaction data.
        """
        df = df.copy()
        
        # 1. Convert timestamp to datetime
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        
        # 2. Extract hour and is_night (if not already present)
        df['hour'] = df['timestamp'].dt.hour
        df['is_night'] = ((df['hour'] >= 23) | (df['hour'] <= 5)).astype(int)
        
        # 3. high_amount (relative to mean/std)
        # Assuming a threshold or percentile
        df['high_amount'] = (df['amount'] > df['amount'].quantile(0.95)).astype(int)
        
        # 4. transaction_velocity (Amount per unit time)
        # previous_transaction_gap is in minutes
        df['transaction_velocity'] = df['amount'] / (df['previous_transaction_gap'] + 1)
        
        # 5. frequency_last_5min (Count of transactions in proximity)
        # Since this is a synthetic dataset, we'll simulate this if it's missing
        # In a real app, this would be computed from a user's transaction window
        if 'frequency_last_5min' not in df.columns:
             # Simulation logic: lower gap -> higher frequency
             df['frequency_last_5min'] = np.where(df['previous_transaction_gap'] < 5, 
                                                 np.random.randint(2, 6, size=len(df)), 
                                                 1)
        
        return df

    def fit_transform(self, df, target='fraud_label'):
        """
        Final preprocessing step for training data.
        """
        df = self.engineer_features(df)
        
        # Categorical Encoding
        for col in self.categorical_cols:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            self.label_encoders[col] = le
            
        # Select features
        X = df[self.numerical_cols + self.categorical_cols]
        y = df[target] if target in df.columns else None
        
        # Scaling
        X_scaled = self.scaler.fit_transform(X)
        X_scaled = pd.DataFrame(X_scaled, columns=X.columns)
        
        if y is not None:
            # Handle Imbalance
            smote = SMOTE(random_state=42)
            X_resampled, y_resampled = smote.fit_resample(X_scaled, y)
            return X_resampled, y_resampled
            
        return X_scaled

    def transform_single(self, transaction_data):
        """
        Preprocesses a single transaction for real-time inference.
        transaction_data: dict with fields:
        amount, timestamp, location, device_type, merchant_category, 
        transaction_type, previous_transaction_gap, is_new_device
        """
        df = pd.DataFrame([transaction_data])
        df = self.engineer_features(df)
        
        # Categorical Encoding
        for col in self.categorical_cols:
            if col in self.label_encoders:
                # Handle unseen labels by defaulting to 0 or first seen
                try:
                    df[col] = self.label_encoders[col].transform(df[col].astype(str))
                except ValueError:
                    df[col] = 0 
                    
        # Select features
        X = df[self.numerical_cols + self.categorical_cols]
        
        # Scaling
        X_scaled = self.scaler.transform(X)
        return X_scaled

    def save_state(self, path="models_state"):
        """
        Saves scaler and encoders for later use in prediction.
        """
        if not os.path.exists(path):
            os.makedirs(path)
        joblib.dump(self.scaler, os.path.join(path, "scaler.pkl"))
        joblib.dump(self.label_encoders, os.path.join(path, "label_encoders.pkl"))
        print(f"Preprocessor state saved to {path}")

    def load_state(self, path="models_state"):
        """
        Loads pre-fitted scaler and encoders.
        """
        self.scaler = joblib.load(os.path.join(path, "scaler.pkl"))
        self.label_encoders = joblib.load(os.path.join(path, "label_encoders.pkl"))
        print(f"Preprocessor state loaded from {path}")

if __name__ == "__main__":
    # Test script
    preprocessor = UPIPreprocessor()
    # Dummy data test
    data = {
        'amount': [1000, 50000, 200],
        'timestamp': ['2026-03-31 12:00:00', '2026-03-31 02:00:00', '2026-03-31 14:00:00'],
        'location': ['Mumbai', 'Delhi', 'Mumbai'],
        'device_type': ['Android', 'iOS', 'Android'],
        'merchant_category': ['Groceries', 'Jewelry', 'Entertainment'],
        'transaction_type': ['P2P', 'Merchant', 'P2P'],
        'previous_transaction_gap': [100, 2, 500],
        'is_new_device': [0, 1, 0],
        'fraud_label': [0, 1, 0]
    }
    df_test = pd.DataFrame(data)
    X, y = preprocessor.fit_transform(df_test)
    print("Preprocessed Shape:", X.shape)
    print("X head:\n", X.head())
