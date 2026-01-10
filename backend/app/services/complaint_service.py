"""
Database Operations for Complaints
CRUD operations and geospatial queries
"""

from motor.motor_asyncio import AsyncIOMotorDatabase
from app.models import Complaint, CategoryEnum
from typing import List, Optional
from bson import ObjectId

class ComplaintService:
    def __init__(self, db: AsyncIOMotorDatabase):
        self.db = db
        self.collection = db.complaints

    async def create_complaint(self, complaint: Complaint) -> str:
        """Create new complaint"""
        # Persist full document including generated timestamp
        complaint_dict = complaint.model_dump(by_alias=True, exclude_none=True)
        result = await self.collection.insert_one(complaint_dict)
        return str(result.inserted_id)

    async def get_complaint_by_id(self, complaint_id: str) -> Optional[Complaint]:
        """Get complaint by ID"""
        complaint = await self.collection.find_one({"_id": ObjectId(complaint_id)})
        if complaint:
            complaint["_id"] = str(complaint["_id"])
            return Complaint(**complaint)
        return None

    async def get_complaints_by_location(
        self,
        latitude: float,
        longitude: float,
        radius_km: float = 1.0
    ) -> List[Complaint]:
        """
        Get complaints within radius of location (in km)
        Uses geospatial query
        """
        # Convert km to radians (Earth radius = 6371 km)
        radius_radians = radius_km / 6371.0

        complaints = await self.collection.find({
            "location": {
                "$near": {
                    "$geometry": {
                        "type": "Point",
                        "coordinates": [longitude, latitude]
                    },
                    "$maxDistance": radius_radians
                }
            }
        }).to_list(length=100)

        return [
            Complaint(**{**c, "_id": str(c.get("_id"))})
            for c in complaints
        ]

    async def get_complaints_by_category(
        self,
        category: CategoryEnum,
        limit: int = 50
    ) -> List[Complaint]:
        """Get complaints by category"""
        complaints = await self.collection.find({
            "category": category
        }).limit(limit).to_list(length=limit)

        return [
            Complaint(**{**c, "_id": str(c.get("_id"))})
            for c in complaints
        ]

    async def get_recent_complaints(self, hours: int = 24, limit: int = 100) -> List[Complaint]:
        """Get recent complaints"""
        from datetime import datetime, timedelta

        cutoff_time = datetime.utcnow() - timedelta(hours=hours)
        complaints = await self.collection.find({
            "timestamp": {"$gte": cutoff_time}
        }).sort("timestamp", -1).limit(limit).to_list(length=limit)

        return [
            Complaint(**{**c, "_id": str(c.get("_id"))})
            for c in complaints
        ]

    async def update_complaint(self, complaint_id: str, update_data: dict) -> bool:
        """Update complaint"""
        result = await self.collection.update_one(
            {"_id": ObjectId(complaint_id)},
            {"$set": update_data}
        )
        return result.modified_count > 0

    async def create_geospatial_index(self):
        """Create geospatial index for location queries"""
        await self.collection.create_index([("location", "2dsphere")])
