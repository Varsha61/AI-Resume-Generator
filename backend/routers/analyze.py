import uuid
import datetime
from fastapi import APIRouter, HTTPException, Body
from typing import Dict, Any, Optional
from pydantic import BaseModel

from backend.services.extractor import extract_resume_information
from backend.services.ats_engine import calculate_ats_score
from backend.services.job_matcher import calculate_job_match
from backend.services.readiness_engine import calculate_career_readiness
from backend.services.skill_gap_engine import calculate_skill_gap
from backend.services.roadmap_engine import generate_personalized_roadmap
from backend.services.enhancement_engine import generate_resume_suggestions
from backend.services.project_analyzer import analyze_projects
from backend.services.red_flags_detector import detect_red_flags
from backend.services.role_recommender import recommend_roles
from backend.services.interview_generator import generate_interview_questions
from backend.services.sample_data import get_demo_analysis_payload
from backend.database import db_instance

router = APIRouter(prefix="/api", tags=["Analysis"])

class FullAnalysisRequest(BaseModel):
    resume_data: Optional[Dict[str, Any]] = None
    resume_text: Optional[str] = ""
    job_description: Optional[str] = ""
    target_role: Optional[str] = "Software Developer"
    user_id: Optional[str] = "guest"

@router.post("/analyze/full")
async def analyze_full(req: FullAnalysisRequest):
    target_role = req.target_role or "Software Developer"

    if req.resume_data and req.resume_data.get("raw_text"):
        resume_info = req.resume_data
    elif req.resume_text and len(req.resume_text.strip()) > 30:
        resume_info = extract_resume_information(req.resume_text)
    else:
        # Default fallback to demo data if request payload is sparse
        demo_payload = get_demo_analysis_payload(target_role)
        return demo_payload

    jd_text = req.job_description or ""

    # Execute all core NLP & AI evaluation engines
    ats_res = calculate_ats_score(resume_info, target_role)
    job_match_res = calculate_job_match(resume_info.get("skills", []), resume_info.get("raw_text", ""), jd_text)
    readiness_res = calculate_career_readiness(ats_res, job_match_res, resume_info, target_role)
    skill_gap_res = calculate_skill_gap(resume_info.get("skills", []), target_role, job_match_res.get("missing_skills"))
    roadmap_res = generate_personalized_roadmap(job_match_res.get("missing_skills"), target_role)
    suggestions_res = generate_resume_suggestions(resume_info, target_role)
    project_res = analyze_projects(resume_info)
    red_flags_res = detect_red_flags(resume_info, target_role)
    roles_res = recommend_roles(resume_info)
    interview_res = generate_interview_questions(resume_info, jd_text, target_role)

    analysis_id = f"analysis-{uuid.uuid4().hex[:8]}"

    result_payload = {
        "id": analysis_id,
        "user_id": req.user_id or "guest",
        "timestamp": datetime.datetime.utcnow().isoformat(),
        "target_role": target_role,
        "resume_data": resume_info,
        "job_description_text": jd_text,
        "ats_analysis": ats_res,
        "job_match_analysis": job_match_res,
        "career_readiness": readiness_res,
        "skill_gap_analysis": skill_gap_res,
        "learning_roadmap": roadmap_res,
        "resume_suggestions": suggestions_res,
        "project_strength_analysis": project_res,
        "red_flags": red_flags_res,
        "role_recommendations": roles_res,
        "interview_prep": interview_res
    }

    # Save to persistent database history
    await db_instance.save_analysis(result_payload)

    return result_payload

@router.get("/demo")
async def get_demo_analysis(target_role: Optional[str] = "Software Developer"):
    """Returns populated demo analysis results instantly for 1-click Demo Mode."""
    demo_payload = get_demo_analysis_payload(target_role)
    await db_instance.save_analysis(demo_payload)
    return demo_payload

@router.post("/analyze/resume")
async def analyze_resume_only(payload: Dict[str, Any] = Body(...)):
    raw_text = payload.get("resume_text", "")
    target_role = payload.get("target_role", "Software Developer")
    info = extract_resume_information(raw_text)
    ats = calculate_ats_score(info, target_role)
    return {"resume_data": info, "ats_analysis": ats}

@router.post("/match/job")
async def match_job_only(payload: Dict[str, Any] = Body(...)):
    skills = payload.get("skills", [])
    raw_text = payload.get("resume_text", "")
    jd_text = payload.get("job_description", "")
    res = calculate_job_match(skills, raw_text, jd_text)
    return res

@router.post("/roadmap/generate")
async def generate_roadmap_api(payload: Dict[str, Any] = Body(...)):
    missing = payload.get("missing_skills", [])
    role = payload.get("target_role", "Software Developer")
    return generate_personalized_roadmap(missing, role)

@router.post("/interview/generate")
async def generate_interview_api(payload: Dict[str, Any] = Body(...)):
    resume_data = payload.get("resume_data", {})
    jd_text = payload.get("job_description", "")
    role = payload.get("target_role", "Software Developer")
    return generate_interview_questions(resume_data, jd_text, role)
