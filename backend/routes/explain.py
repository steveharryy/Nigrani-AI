from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.llm_service import llm_service

router = APIRouter(prefix="/api")

class ExplainRequest(BaseModel):
    amount: float
    risk_level: str
    merchant_category: str
    location: str = "Unknown"
    device_type: str = "Unknown"
    confidence_score: float

class ExplainResponse(BaseModel):
    explanation: str

@router.post("/explain", response_model=ExplainResponse)
async def explain_transaction(payload: ExplainRequest):
    """
    Returns a human-readable explanation for a fraud detection result using Gemini.
    """
    try:
        explanation = await llm_service.get_fraud_explanation(payload.dict())
        return {"explanation": explanation}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
