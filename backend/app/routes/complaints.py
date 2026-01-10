"""
API Routes for Complaints
Endpoints for creating, retrieving, and managing complaints
"""

from fastapi import APIRouter, Depends, HTTPException
from app.models import Complaint, Location
from app.database import get_database
from app.services.complaint_service import ComplaintService
from app.services.nlp_service import NLPService
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase

router = APIRouter()
nlp_service = NLPService()

@router.post("/submit")
async def submit_complaint(
    text: str,
    latitude: float,
    longitude: float,
    ward: str = None,
    area_name: str = None,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Submit a new complaint
    Story A: Citizen input endpoint
    """
    try:
        # Create location object
        location = Location(
            latitude=latitude,
            longitude=longitude,
            ward=ward,
            area_name=area_name
        )

        # Classify the complaint using NLP
        category, confidence = nlp_service.classify_complaint(text)
        urgency_score = nlp_service.extract_urgency_score(text)

        # Create complaint
        complaint = Complaint(
            text=text,
            category=category,
            location=location,
            urgency_score=urgency_score,
            voice_transcription=False
        )

        # Save to database
        complaint_service = ComplaintService(db)
        complaint_id = await complaint_service.create_complaint(complaint)

        return {
            "complaint_id": complaint_id,
            "status": "submitted",
            "category": category,
            "urgency_score": urgency_score,
            "classification_confidence": confidence
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/")
async def get_recent_complaints(
    hours: int = 24,
    limit: int = 100,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get recent complaints"""
    try:
        complaint_service = ComplaintService(db)
        complaints = await complaint_service.get_recent_complaints(hours, limit)
        return {"complaints": [c.dict() for c in complaints]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{complaint_id}")
async def get_complaint(
    complaint_id: str,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get complaint by ID"""
    try:
        complaint_service = ComplaintService(db)
        complaint = await complaint_service.get_complaint_by_id(complaint_id)
        if not complaint:
            raise HTTPException(status_code=404, detail="Complaint not found")
        return complaint.dict()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/location/nearby")
async def get_nearby_complaints(
    latitude: float,
    longitude: float,
    radius_km: float = 1.0,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get complaints near a location"""
    try:
        complaint_service = ComplaintService(db)
        complaints = await complaint_service.get_complaints_by_location(
            latitude, longitude, radius_km
        )
        return {"complaints": [c.dict() for c in complaints]}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
