from fastapi import APIRouter, Query
from services.db_service import db_service
from typing import List, Optional

router = APIRouter(prefix="/api")

@router.get("/history")
async def get_history(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """
    Returns latest transactions with pagination.
    """
    data = db_service.get_history(page, limit)
    return data

@router.get("/alerts")
async def get_alerts(
    limit: int = Query(50, ge=1, le=100)
):
    """
    Returns high-risk transactions for the alerts UI.
    """
    data = db_service.get_alerts(limit)
    return data
