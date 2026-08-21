from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from backend.database import db_instance

router = APIRouter(prefix="/api/history", tags=["History"])

@router.get("")
async def get_history(user_id: Optional[str] = Query("guest")):
    analyses = await db_instance.get_all_analyses(user_id)
    # Map summaries to avoid sending bloated JSON lists
    summaries = []
    for a in analyses:
        summaries.append({
            "id": a.get("id"),
            "timestamp": a.get("timestamp"),
            "target_role": a.get("target_role", "Software Developer"),
            "candidate_name": a.get("resume_data", {}).get("name", "Candidate"),
            "ats_score": a.get("ats_analysis", {}).get("ats_score", 0),
            "job_match": a.get("job_match_analysis", {}).get("overall_match", 0),
            "career_readiness": a.get("career_readiness", {}).get("overall_readiness", 0),
            "is_demo": a.get("is_demo", False)
        })
    return summaries

@router.get("/{analysis_id}")
async def get_analysis_by_id(analysis_id: str):
    item = await db_instance.get_analysis_by_id(analysis_id)
    if not item:
        raise HTTPException(status_code=404, detail="Analysis record not found")
    return item

@router.delete("/{analysis_id}")
async def delete_history_item(analysis_id: str):
    success = await db_instance.delete_analysis(analysis_id)
    if not success:
        raise HTTPException(status_code=404, detail="Analysis record not found or could not be deleted")
    return {"status": "success", "message": "Analysis deleted successfully", "id": analysis_id}
