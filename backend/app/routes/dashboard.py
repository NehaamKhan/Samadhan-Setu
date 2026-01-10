"""
API Routes for Dashboard and Analytics
Endpoints for heat map data, trends, and authority insights
"""

from fastapi import APIRouter, Depends, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.database import get_database
from app.services.complaint_service import ComplaintService
from app.services.clustering_service import ClusteringService
from typing import List

router = APIRouter()

def clean_category_name(category) -> str:
    """Convert enum category to clean string name"""
    if not category:
        return "Unknown"
    cat_str = str(category)
    if "CategoryEnum." in cat_str:
        # Extract name after 'CategoryEnum.'
        return cat_str.split("CategoryEnum.")[1].replace("_", " ").title()
    return cat_str.replace("_", " ").title()

@router.get("/heatmap")
async def get_heatmap_data(
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get heat map data: clusters with priority scores and colors
    Story C: Authority insight - heat map endpoint
    """
    try:
        complaint_service = ComplaintService(db)
        clustering_service = ClusteringService()

        # Get recent complaints
        complaints = await complaint_service.get_recent_complaints(hours=72, limit=1000)

        if not complaints:
            return {
                "heatmap_points": [],
                "summary": "No complaints in the last 72 hours"
            }

        # Cluster by location
        clusters = clustering_service.cluster_complaints(complaints)

        # Build heat map response
        heatmap_points = []
        for cluster_id, cluster_complaints in clusters.items():
            if cluster_id == -1:  # Skip noise points from DBSCAN
                continue

            avg_lat = sum(c.location.latitude for c in cluster_complaints) / len(cluster_complaints)
            avg_long = sum(c.location.longitude for c in cluster_complaints) / len(cluster_complaints)
            frequency = len(cluster_complaints)
            avg_urgency = sum(c.urgency_score or 0 for c in cluster_complaints) / frequency

            # Calculate priority score
            duration_hours = 24  # Placeholder
            priority_score = clustering_service.calculate_priority_score(
                frequency=frequency,
                sentiment=avg_urgency,
                duration_hours=duration_hours
            )

            # Determine intensity (1-10)
            if priority_score >= 8:
                intensity = "critical"
                color = "red"
            elif priority_score >= 5:
                intensity = "warning"
                color = "yellow"
            else:
                intensity = "low"
                color = "green"

            # Get categories
            categories = set(clean_category_name(c.category) for c in cluster_complaints if c.category)

            heatmap_points.append({
                "id": str(cluster_id),
                "latitude": avg_lat,
                "longitude": avg_long,
                "complaint_count": frequency,
                "priority_score": round(priority_score, 1),
                "intensity": intensity,
                "color": color,
                "categories": sorted(list(categories)),
                "summary": clustering_service.generate_cluster_summary(cluster_complaints)
            })

        # Sort by priority score
        heatmap_points.sort(key=lambda x: x["priority_score"], reverse=True)

        return {
            "heatmap_points": heatmap_points,
            "total_clusters": len(heatmap_points),
            "total_complaints": len(complaints)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/top-issues")
async def get_top_issues(
    limit: int = 3,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Get top 3 critical issues for authority
    """
    try:
        complaint_service = ComplaintService(db)
        clustering_service = ClusteringService()

        # Get recent complaints
        complaints = await complaint_service.get_recent_complaints(hours=72, limit=1000)

        if not complaints:
            return {"top_issues": []}

        # Cluster
        clusters = clustering_service.cluster_complaints(complaints)

        # Calculate priorities
        issues = []
        for cluster_id, cluster_complaints in clusters.items():
            if cluster_id == -1:
                continue

            frequency = len(cluster_complaints)
            avg_urgency = sum(c.urgency_score or 0 for c in cluster_complaints) / frequency
            priority_score = clustering_service.calculate_priority_score(
                frequency=frequency,
                sentiment=avg_urgency,
                duration_hours=24
            )

            avg_lat = sum(c.location.latitude for c in cluster_complaints) / frequency
            avg_long = sum(c.location.longitude for c in cluster_complaints) / frequency

            issues.append({
                "rank": None,  # Will be set after sorting
                "category": clean_category_name(cluster_complaints[0].category),
                "location": f"{cluster_complaints[0].location.area_name or 'Area'}",
                "complaint_count": frequency,
                "priority_score": round(priority_score, 1),
                "urgency": "Critical" if priority_score >= 8 else "High" if priority_score >= 5 else "Medium"
            })

        # Sort and rank
        issues.sort(key=lambda x: x["priority_score"], reverse=True)
        for idx, issue in enumerate(issues[:limit]):
            issue["rank"] = idx + 1

        return {
            "top_issues": issues[:limit],
            "timestamp": "2026-01-10"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/statistics")
async def get_statistics(
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """Get dashboard statistics"""
    try:
        complaint_service = ComplaintService(db)
        complaints = await complaint_service.get_recent_complaints(hours=72, limit=10000)

        total = len(complaints)
        by_category = {}
        for complaint in complaints:
            cat = clean_category_name(complaint.category)
            by_category[cat] = by_category.get(cat, 0) + 1

        return {
            "total_complaints": total,
            "by_category": by_category,
            "time_range": "72_hours"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
