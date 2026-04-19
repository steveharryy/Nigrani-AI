from fastapi import APIRouter
from services.db_service import db_service

router = APIRouter(prefix="/api")

@router.get("/stats")
async def get_stats():
    """
    Returns dashboard KPI statistics.
    """
    data = db_service.get_stats()
    return data

@router.get("/analytics")
async def get_analytics():
    """
    Returns chart-ready data for dashboard trends.
    """
    data = db_service.get_analytics()
    return data
