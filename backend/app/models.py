"""
Data Models for CivicMind
Using Pydantic for validation
"""

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional, List
from datetime import datetime
from enum import Enum

class CategoryEnum(str, Enum):
    WATER_SUPPLY = "Water Supply"
    SANITATION = "Sanitation"
    ROADS_POTHOLES = "Roads/Potholes"
    STREETLIGHTS = "Streetlights"
    ELECTRICITY = "Electricity"

class UrgencyLevel(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"

class Location(BaseModel):
    """Location data with geospatial info"""
    latitude: float
    longitude: float
    ward: Optional[str] = None
    area_name: Optional[str] = None

class Complaint(BaseModel):
    """Single complaint from a citizen"""
    id: Optional[str] = Field(None, alias="_id")
    text: str
    original_language: Optional[str] = "en"
    category: Optional[CategoryEnum] = None
    location: Location
    sentiment_score: Optional[float] = None
    urgency_score: Optional[int] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    citizen_id: Optional[str] = None
    voice_transcription: bool = False

    model_config = ConfigDict(populate_by_name=True)

class IncidentCluster(BaseModel):
    """Grouped complaints (cluster of related issues)"""
    id: Optional[str] = Field(None, alias="_id")
    category: CategoryEnum
    location: Location
    complaint_ids: List[str]
    frequency_count: int
    average_urgency_score: float
    priority_score: float
    cluster_summary: str
    first_report_time: datetime
    last_report_time: datetime
    status: str = "active"  # active, resolved, pending
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = ConfigDict(populate_by_name=True)

class DashboardStats(BaseModel):
    """Statistics for authority dashboard"""
    total_complaints: int
    active_clusters: int
    resolved_issues: int
    pending_issues: int
    top_3_issues: List[dict]
    highest_urgency_cluster: Optional[dict] = None
    trend_direction: str  # "up", "down", "stable"
