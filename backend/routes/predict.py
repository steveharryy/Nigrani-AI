from fastapi import APIRouter, HTTPException
from schemas.transaction import TransactionPayload, PredictionResponse
from services.fraud_service import fraud_service

router = APIRouter(prefix="/api")

@router.post("/predict", response_model=PredictionResponse)
async def predict_fraud(payload: TransactionPayload):
    """
    Predicts if a UPI transaction is fraudulent based on features.
    """
    try:
        # Call the fraud service
        result = fraud_service.analyze_transaction(payload)
        
        # Handle error if fraud detector is not initialized
        if result["prediction"] == "error":
            raise HTTPException(status_code=503, detail=result["message"])
            
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
