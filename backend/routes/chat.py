from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.llm_service import llm_service
from services.db_service import db_service

router = APIRouter(prefix="/api")

class ChatRequest(BaseModel):
    query: str

class ChatResponse(BaseModel):
    response: str

@router.post("/chat", response_model=ChatResponse)
async def chat_assistant(payload: ChatRequest):
    """
    Interactive security assistant providing data-driven insights.
    """
    try:
        # 1. Fetch Context from DB
        stats = db_service.get_stats()
        history = db_service.get_history(page=1, limit=10)
        
        # 2. Get AI reasoning based on current context
        response = await llm_service.get_chat_response(payload.query, history, stats)
        
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
