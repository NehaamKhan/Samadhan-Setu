"""
Clustering and Deduplication Logic
Groups similar complaints using DBSCAN on geographic coordinates
"""

from sklearn.cluster import DBSCAN
import numpy as np
from typing import List, Dict
from app.models import Complaint, IncidentCluster, CategoryEnum
from datetime import datetime

class ClusteringService:
    def __init__(self, eps_km: float = 1.0, min_samples: int = 2):
        """
        Initialize DBSCAN clustering
        eps_km: epsilon distance in kilometers
        min_samples: minimum complaints to form a cluster
        """
        # Convert km to degrees (approx: 1 km ≈ 0.009 degrees)
        self.eps = eps_km * 0.009
        self.min_samples = min_samples

    def cluster_complaints(
        self,
        complaints: List[Complaint],
        category: CategoryEnum = None
    ) -> Dict[int, List[Complaint]]:
        """
        Cluster complaints by geographic proximity
        Returns dict: {cluster_id: [complaints]}
        """
        if len(complaints) < self.min_samples:
            return {0: complaints}

        # Extract coordinates
        coordinates = np.array([
            [c.location.latitude, c.location.longitude]
            for c in complaints
        ])

        # Apply DBSCAN
        clustering = DBSCAN(eps=self.eps, min_samples=self.min_samples)
        labels = clustering.fit_predict(coordinates)

        # Group complaints by cluster
        clusters = {}
        for idx, label in enumerate(labels):
            if label not in clusters:
                clusters[label] = []
            clusters[label].append(complaints[idx])

        return clusters

    def generate_cluster_summary(self, complaints: List[Complaint]) -> str:
        """Generate text summary of cluster"""
        if not complaints:
            return "Empty cluster"

        category = complaints[0].category or "Unknown"
        # Clean category name if it's an enum
        if "CategoryEnum." in str(category):
            category = str(category).split("CategoryEnum.")[1].replace("_", " ").title()
        else:
            category = str(category).replace("_", " ").title()
        
        count = len(complaints)
        avg_urgency = sum(c.urgency_score or 0 for c in complaints) / count

        return f"{count} reports of {category} in this area (Avg urgency: {avg_urgency:.1f}/10)"

    def calculate_priority_score(
        self,
        frequency: int,
        sentiment: float,
        duration_hours: int,
        wf: float = 0.5,
        ws: float = 0.3,
        wd: float = 0.2
    ) -> float:
        """
        Calculate priority score using weighted formula
        Priority Score = (Frequency × Wf) + (Sentiment × Ws) + (Duration × Wd)
        """
        # Normalize values to 0-10 scale
        normalized_frequency = min(frequency / 10, 10)
        normalized_sentiment = sentiment  # Already 0-10
        normalized_duration = min(duration_hours / 24, 10)  # Hours to days

        priority = (
            (normalized_frequency * wf) +
            (normalized_sentiment * ws) +
            (normalized_duration * wd)
        )

        return min(priority, 10)  # Cap at 10
