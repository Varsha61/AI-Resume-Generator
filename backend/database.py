import os
import json
import uuid
import datetime
from typing import Dict, List, Any, Optional

# File-based persistent fallback DB file path
FALLBACK_DB_PATH = os.path.join(os.path.dirname(__file__), "storage_fallback.json")

def init_fallback_db():
    if not os.path.exists(FALLBACK_DB_PATH):
        data = {
            "users": [],
            "analyses": [],
            "resumes": []
        }
        with open(FALLBACK_DB_PATH, "w") as f:
            json.dump(data, f, indent=2)

init_fallback_db()

def read_db() -> Dict[str, Any]:
    try:
        with open(FALLBACK_DB_PATH, "r") as f:
            return json.load(f)
    except Exception:
        return {"users": [], "analyses": [], "resumes": []}

def write_db(data: Dict[str, Any]):
    try:
        with open(FALLBACK_DB_PATH, "w") as f:
            json.dump(data, f, indent=2)
    except Exception as e:
        print("Fallback DB write error:", e)

class LocalDatabase:
    """Async database abstraction supporting both MongoDB and zero-config Fallback store."""
    def __init__(self):
        self.use_mongo = False
        self.client = None
        self.db = None
        mongo_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017/resumeiq")
        try:
            from motor.motor_asyncio import AsyncIOMotorClient
            self.client = AsyncIOMotorClient(mongo_uri, serverSelectionTimeoutMS=1000)
            self.db = self.client.get_default_database("resumeiq")
        except Exception:
            self.use_mongo = False

    async def save_user(self, user_dict: Dict[str, Any]) -> Dict[str, Any]:
        data = read_db()
        data["users"].append(user_dict)
        write_db(data)
        return user_dict

    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        data = read_db()
        for u in data.get("users", []):
            if u.get("email") == email:
                return u
        return None

    async def save_analysis(self, analysis_dict: Dict[str, Any]) -> Dict[str, Any]:
        data = read_db()
        # Remove old duplicate if exists
        data["analyses"] = [a for a in data.get("analyses", []) if a.get("id") != analysis_dict.get("id")]
        data["analyses"].insert(0, analysis_dict)
        write_db(data)
        return analysis_dict

    async def get_all_analyses(self, user_id: str = "guest") -> List[Dict[str, Any]]:
        data = read_db()
        analyses = data.get("analyses", [])
        if user_id and user_id != "all":
            return [a for a in analyses if a.get("user_id", "guest") == user_id or a.get("user_id") is None]
        return analyses

    async def get_analysis_by_id(self, analysis_id: str) -> Optional[Dict[str, Any]]:
        data = read_db()
        for a in data.get("analyses", []):
            if a.get("id") == analysis_id:
                return a
        return None

    async def delete_analysis(self, analysis_id: str) -> bool:
        data = read_db()
        initial_len = len(data.get("analyses", []))
        data["analyses"] = [a for a in data.get("analyses", []) if a.get("id") != analysis_id]
        write_db(data)
        return len(data.get("analyses", [])) < initial_len

db_instance = LocalDatabase()
