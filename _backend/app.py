from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import time
import logging
import os
from dotenv import load_dotenv

# Load environment variables (from .env)
load_dotenv()

from routes.predict import router as predict_router
from routes.history import router as history_router
from routes.stats import router as stats_router
from routes.explain import router as explain_router
from routes.chat import router as chat_router

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Nigrani AI Backend", version="1.0.0")

# --- MIDDLEWARE ---

# CORS - update allow_origins for production domain in the future
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For initial deployment, restrict this later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Timing Middleware
@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    logger.info(f"Method: {request.method} Path: {request.url.path} Duration: {process_time:.4f}s")
    return response

# --- ROUTES ---

@app.get("/")
async def root():
    """
    Root endpoint for service discovery.
    """
    return {
        "message": "Nigrani AI Backend API is operational.",
        "documentation": "/docs",
        "health_check": "/api/health"
    }

@app.get("/api/health")
async def health_check():
    """
    Service health check endpoint.
    """
    return {
        "status": "healthy",
        "service": "Nigrani AI Backend",
        "version": "1.0.0"
    }

# Include all routers
app.include_router(predict_router)
app.include_router(history_router)
app.include_router(stats_router)
app.include_router(explain_router)
app.include_router(chat_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
