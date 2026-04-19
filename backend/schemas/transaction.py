from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class TransactionPayload(BaseModel):
    amount: float = Field(..., gt=0, example=75000.0)
    timestamp: datetime = Field(..., example="2026-02-10T03:30:00")
    location: str = Field(..., example="Mumbai")
    device_type: str = Field(..., example="mobile")
    merchant_category: str = Field(..., example="Gambling")
    transaction_type: str = Field(default="Merchant-Payment", example="Merchant-Payment")
    previous_transaction_gap: int = Field(default=10, description="Minutes since last transaction", example=5)
    is_new_device: bool = Field(..., example=True)

class PredictionResponse(BaseModel):
    prediction: str = Field(..., example="fraud")
    probability: float = Field(..., example=0.9978)
    confidence_score: float = Field(..., example=99.78)
    risk_level: str = Field(..., example="high")
    message: Optional[str] = Field(None, example="Transaction flagged as suspicious")

class HealthResponse(BaseModel):
    status: str = Field(..., example="healthy")
    service: str = Field(..., example="Nigrani AI Backend")
