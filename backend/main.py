"""
CivicMind Backend - Main Application Entry Point
FastAPI server for complaint aggregation, NLP classification, and geospatial analysis
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="CivicMind API",
    description="AI-powered civic complaint intelligence platform",
    version="1.0.0"
)

# CORS Configuration
CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "*"  # Allow all origins for development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "CivicMind API is running",
        "status": "operational",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

# Import and include routers
from app.routes import complaints, dashboard
app.include_router(complaints.router, prefix="/api/complaints", tags=["complaints"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["dashboard"])

# Database lifecycle events
@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    from app.database import connect_to_mongo
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    from app.database import close_mongo_connection
    await close_mongo_connection()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host=os.getenv("API_HOST", "0.0.0.0"),
        port=int(os.getenv("API_PORT", 8000)),
        reload=True
    )
