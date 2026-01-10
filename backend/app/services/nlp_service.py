"""
NLP Classification Service (lightweight)
Rule-based classification and sentiment for hackathon demo
"""

from app.models import CategoryEnum
from typing import Tuple
import re

class NLPService:
    def __init__(self):
        """Initialize keyword maps for categories and sentiment"""
        self.category_keywords = {
            CategoryEnum.WATER_SUPPLY: [
                "water", "pipe", "supply", "tank", "tanker", "low pressure", "contaminated"
            ],
            CategoryEnum.SANITATION: [
                "garbage", "waste", "trash", "overflowing", "smell", "foul", "drain", "sweeping"
            ],
            CategoryEnum.ROADS_POTHOLES: [
                "pothole", "road", "broken", "accident", "uneven", "repair", "pavement"
            ],
            CategoryEnum.STREETLIGHTS: [
                "streetlight", "light", "dark", "flicker", "lamp", "bulb", "illumination"
            ],
            CategoryEnum.ELECTRICITY: [
                "electric", "power", "cut", "transformer", "wire", "sparking", "line"
            ],
        }

    def classify_complaint(self, text: str) -> Tuple[CategoryEnum, float]:
        """Classify text into a category using keyword matching"""
        text_lower = text.lower()
        scores = {}
        for category, keywords in self.category_keywords.items():
            scores[category] = sum(1 for kw in keywords if kw in text_lower)

        # Choose category with highest score; fallback to Sanitation
        best_category = max(scores, key=scores.get)
        confidence = min(1.0, scores[best_category] / 3.0) if scores[best_category] > 0 else 0.5
        return best_category, confidence

    def analyze_sentiment(self, text: str) -> Tuple[str, float]:
        """Simple sentiment: detect severity keywords to estimate negativity"""
        negative_markers = [
            "critical", "danger", "urgent", "emergency", "accident", "dark", "overflowing", "foul",
            "no water", "power cut", "not working"
        ]
        text_lower = text.lower()
        hits = sum(1 for kw in negative_markers if kw in text_lower)
        score = 0.5 + min(hits, 3) * 0.15  # 0.5 to ~0.95
        label = "NEGATIVE" if hits > 0 else "NEUTRAL"
        return label, score

    def extract_urgency_score(self, text: str) -> int:
        """Extract urgency score (1-10) based on keywords and sentiment"""
        urgency_keywords = {
            "critical": 10,
            "dangerous": 9,
            "emergency": 9,
            "urgent": 8,
            "broken": 7,
            "flooding": 9,
            "fire": 10,
            "leak": 8,
            "overflowing": 8,
            "not working": 6,
            "blocked": 7,
            "days": 5,
            "weeks": 4,
        }

        text_lower = text.lower()
        max_score = 1
        for keyword, score in urgency_keywords.items():
            if keyword in text_lower:
                max_score = max(max_score, score)

        # Boost based on sentiment
        _, sentiment_score = self.analyze_sentiment(text)
        if sentiment_score > 0.8:
            max_score = min(max_score + 2, 10)
        return max_score

    def clean_text(self, text: str) -> str:
        """Clean and normalize text"""
        text = re.sub(r"\s+", " ", text).strip()
        return text
