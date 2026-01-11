"""
Demo Data Generator
Generates 50+ realistic complaints to populate the heat map for hackathon demo
"""

import asyncio
import random
from datetime import datetime, timedelta
from motor.motor_asyncio import AsyncIOMotorClient
import os

# Sample locations (lat, long) representing different wards in a city
DEMO_LOCATIONS = [
    {"name": "MG Road", "lat": 28.4595, "lng": 77.0968},
    {"name": "Connaught Place", "lat": 28.6328, "lng": 77.2197},
    {"name": "Rajpath", "lat": 28.6136, "lng": 77.2065},
    {"name": "Lodhi Garden", "lat": 28.5933, "lng": 77.2197},
    {"name": "Indira Gandhi Road", "lat": 28.5577, "lng": 77.1995},
    {"name": "Vasant Kunj", "lat": 28.5244, "lng": 77.1866},
    {"name": "Saket", "lat": 28.5244, "lng": 77.1866},
    {"name": "Mehrauli", "lat": 28.5244, "lng": 77.2511},
]

COMPLAINT_TEMPLATES = {
    "Water Supply": [
        "No water supply in the area for 3 days",
        "Water pipe burst on Main Street",
        "Contaminated water - brownish color",
        "Low water pressure throughout the area",
        "Water tanker not arrived for a week",
        "Irregular water supply schedule",
    ],
    "Sanitation": [
        "Garbage not collected for 4 days",
        "Garbage overflowing at dump site",
        "Stray animals scattering garbage everywhere",
        "Foul smell from waste management area",
        "Sweeping not done on this road",
        "Drainage system clogged with waste",
    ],
    "Roads/Potholes": [
        "Large pothole on main road - dangerous for vehicles",
        "Road is completely broken and flooded",
        "Multiple potholes causing accidents",
        "Pavement breaking apart",
        "Uneven road surface - risk of accidents",
        "Entire road needs repair urgently",
    ],
    "Streetlights": [
        "Streetlight not working for days",
        "All lights on this street are broken",
        "Very dark at night - security concern",
        "Streetlight flickering dangerously",
        "Several lights in the area are non-functional",
        "No lighting on this road after sunset",
    ],
    "Electricity": [
        "Power cut for entire locality",
        "Electrical lines touching tree branches - dangerous",
        "Frequent power cuts in the evening",
        "Transformer making strange noise",
        "Exposed electrical wires - safety hazard",
        "No electricity for 6 hours straight",
    ],
}

async def generate_demo_data():
    """Generate and insert demo complaints"""
    mongodb_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    database_name = os.getenv("DATABASE_NAME", "samadhansetu")

    client = AsyncIOMotorClient(mongodb_url)
    db = client[database_name]
    complaints_collection = db.complaints

    # Clear existing complaints
    await complaints_collection.delete_many({})

    demo_complaints = []

    # Generate 50+ complaints
    for i in range(60):
        location = random.choice(DEMO_LOCATIONS)
        category = random.choice(list(COMPLAINT_TEMPLATES.keys()))
        template = random.choice(COMPLAINT_TEMPLATES[category])

        # Vary urgency based on template keywords
        urgency_score = random.randint(3, 10)
        if any(word in template.lower() for word in ["dangerous", "sparking", "critical", "immediately"]):
            urgency_score = random.randint(8, 10)
        elif any(word in template.lower() for word in ["not", "no", "issue"]):
            urgency_score = random.randint(5, 8)

        # Add slight variation to location (cluster around the main location)
        lat_variation = random.uniform(-0.005, 0.005)
        lng_variation = random.uniform(-0.005, 0.005)

        complaint = {
            "text": template,
            "original_language": "en",
            "category": category,
            "location": {
                "latitude": location["lat"] + lat_variation,
                "longitude": location["lng"] + lng_variation,
                "ward": f"Ward {i % 12 + 1}",
                "area_name": location["name"],
            },
            "sentiment_score": random.uniform(0.6, 0.95),  # Negative sentiment
            "urgency_score": urgency_score,
            "timestamp": datetime.utcnow() - timedelta(hours=random.randint(0, 72)),
            "citizen_id": f"citizen_{i}",
            "voice_transcription": random.choice([True, False]),
        }
        demo_complaints.append(complaint)

    # Insert complaints
    result = await complaints_collection.insert_many(demo_complaints)
    print(f"✓ Inserted {len(result.inserted_ids)} demo complaints")

    # Create geospatial index
    await complaints_collection.create_index([("location", "2dsphere")])
    print("✓ Created geospatial index")

    client.close()

if __name__ == "__main__":
    asyncio.run(generate_demo_data())
