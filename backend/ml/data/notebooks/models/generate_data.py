import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random
import os

def generate_upi_dataset(n_samples=10000, output_path="upi_transactions.csv"):
    """
    Generates a synthetic UPI transaction dataset for fraud detection.
    """
    np.random.seed(42)
    random.seed(42)

    data = {
        'transaction_id': [f'TXN{100000 + i}' for i in range(n_samples)],
        'amount': np.round(np.random.exponential(scale=5000, size=n_samples), 2),
        'timestamp': [(datetime.now() - timedelta(minutes=random.randint(0, 10000))).strftime('%Y-%m-%d %H:%M:%S') for i in range(n_samples)],
        'location': random.choices(['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Unknown', 'International'], k=n_samples),
        'device_type': random.choices(['Android', 'iOS', 'Web', 'Old Android'], weights=[0.6, 0.3, 0.05, 0.05], k=n_samples),
        'merchant_category': random.choices(['Groceries', 'Electronics', 'Jewelry', 'Entertainment', 'Transfer', 'Gambling'], k=n_samples),
        'transaction_type': random.choices(['Peer-to-Peer', 'Merchant-Payment', 'QR-Scan'], k=n_samples),
        'previous_transaction_gap': np.random.randint(1, 10000, size=n_samples), # in minutes
        'is_new_device': np.random.choice([0, 1], size=n_samples, p=[0.9, 0.1])
    }

    df = pd.DataFrame(data)

    # Convert timestamp to datetime for logic
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['hour'] = df['timestamp'].dt.hour
    df['is_night'] = ((df['hour'] >= 23) | (df['hour'] <= 5)).astype(int)

    # Logic for synthetic fraud labels
    # High fraud chance if:
    # 1. Amount > 50000 and is_night
    # 2. Gambling/Jewelry at night
    # 3. Previous gap < 5 mins and high amount
    # 4. New device + international/unknown location
    
    df['fraud_label'] = 0
    
    # Condition 1: High amount at night
    df.loc[(df['amount'] > 50000) & (df['is_night'] == 1), 'fraud_label'] = 1
    
    # Condition 2: High risk category at night
    df.loc[(df['merchant_category'].isin(['Gambling', 'Jewelry'])) & (df['is_night'] == 1), 'fraud_label'] = 1
    
    # Condition 3: Fast consecutive high amounts
    df.loc[(df['previous_transaction_gap'] < 10) & (df['amount'] > 20000), 'fraud_label'] = 1
    
    # Condition 4: New device + suspicious location
    df.loc[(df['is_new_device'] == 1) & (df['location'].isin(['Unknown', 'International'])), 'fraud_label'] = 1

    # Add some random noise to fraud labels
    noise = np.random.choice([0, 1], size=n_samples, p=[0.98, 0.02])
    df['fraud_label'] = np.where(noise == 1, 1 - df['fraud_label'], df['fraud_label'])

    # Save to CSV
    df.to_csv(output_path, index=False)
    print(f"Dataset generated successfully with {n_samples} samples at {output_path}")
    print(f"Fraud ratio: {df['fraud_label'].mean():.2%}")
    return df

if __name__ == "__main__":
    # Ensure current directory for output
    output_file = os.path.join(os.path.dirname(__file__), "upi_transactions.csv")
    generate_upi_dataset(n_samples=20000, output_path=output_file)
