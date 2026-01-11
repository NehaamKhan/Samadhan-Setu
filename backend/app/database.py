"""
Database Connection and Configuration
MongoDB connection handler using motor (async driver)
"""

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os

class MongoDatabase:
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

mongodb = MongoDatabase()

async def connect_to_mongo():
    """Establish MongoDB connection"""
    mongodb.client = AsyncIOMotorClient(os.getenv("MONGODB_URL", "mongodb://localhost:27017"))
    mongodb.db = mongodb.client[os.getenv("DATABASE_NAME", "samadhansetu")]
    print("[+] Connected to MongoDB")

async def close_mongo_connection():
    """Close MongoDB connection"""
    mongodb.client.close()
    print("[+] Disconnected from MongoDB")

async def get_database() -> AsyncIOMotorDatabase:
    """Get database instance"""
    return mongodb.db
