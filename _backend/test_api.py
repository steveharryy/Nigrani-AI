import httpx
import asyncio
from datetime import datetime

async def test_api():
    async with httpx.AsyncClient() as client:
        # 1. Test Health Check
        print("Testing Health Check...")
        health_resp = await client.get("http://127.0.0.1:8000/api/health")
        print(f"Status: {health_resp.status_code}")
        print(f"Response: {health_resp.json()}\n")

        # 2. Test Prediction (Suspicious Case)
        print("Testing Prediction (Suspicious)...")
        sus_payload = {
            "amount": 75000,
            "timestamp": "2026-03-31T03:30:00",
            "location": "International",
            "device_type": "Old Android",
            "merchant_category": "Gambling",
            "is_new_device": True
        }
        pred_resp = await client.post("http://127.0.0.1:8000/api/predict", json=sus_payload)
        print(f"Status: {pred_resp.status_code}")
        print(f"Response: {pred_resp.json()}\n")
        
        # 3. Test Prediction (Safe Case)
        print("Testing Prediction (Safe)...")
        safe_payload = {
            "amount": 1200,
            "timestamp": "2026-03-31T14:30:00",
            "location": "Mumbai",
            "device_type": "Android",
            "merchant_category": "Groceries",
            "is_new_device": False
        }
        pred_resp = await client.post("http://127.0.0.1:8000/api/predict", json=safe_payload)
        print(f"Status: {pred_resp.status_code}")
        print(f"Response: {pred_resp.json()}\n")

if __name__ == "__main__":
    asyncio.run(test_api())
