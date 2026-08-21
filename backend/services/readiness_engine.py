from typing import Dict, List, Any

def calculate_career_readiness(ats_result: Dict[str, Any], job_match_result: Dict[str, Any], resume_data: Dict[str, Any], target_role: str) -> Dict[str, Any]:
    """
    Computes overall Career Readiness Score (0-100) and radar chart metrics:
    - Resume Strength
    - Technical Skills
    - Job Match
    - Project Strength
    - Experience Quality
    - Interview Readiness
    """
    ats_score = ats_result.get("ats_score", 70)
    job_match = job_match_result.get("overall_match", 75)
    skills = resume_data.get("skills", [])
    projects = resume_data.get("projects", [])
    experience = resume_data.get("experience", [])

    resume_strength = int(round(ats_score * 0.95))
    tech_skills_score = min(95, max(40, len(skills) * 7))
    job_match_score = job_match if job_match > 0 else 72
    project_strength = min(92, max(45, len(projects) * 22))
    exp_score = min(90, max(50, len(experience) * 20))
    interview_readiness = int(round((tech_skills_score * 0.4) + (project_strength * 0.3) + (ats_score * 0.3)))

    overall_readiness = int(round((resume_strength * 0.2) + (tech_skills_score * 0.2) + (job_match_score * 0.2) + (project_strength * 0.15) + (exp_score * 0.1) + (interview_readiness * 0.15)))

    radar_data = [
        {"subject": "Resume Strength", "score": resume_strength, "fullMark": 100},
        {"subject": "Technical Skills", "score": tech_skills_score, "fullMark": 100},
        {"subject": "Job Match", "score": job_match_score, "fullMark": 100},
        {"subject": "Project Strength", "score": project_strength, "fullMark": 100},
        {"subject": "Experience", "score": exp_score, "fullMark": 100},
        {"subject": "Interview Readiness", "score": interview_readiness, "fullMark": 100}
    ]

    # Generate tailored summary rationale
    top_skills = ", ".join(skills[:3]) if skills else "Core Tech Stack"
    missing_str = ", ".join(job_match_result.get("missing_skills", [])[:2]) if job_match_result.get("missing_skills") else "cloud deployment & data visualization"
    
    explanation = f"You demonstrate strong proficiency in {top_skills}, but bolstering your knowledge in {missing_str} will increase your overall readiness for high-impact {target_role} positions."

    return {
        "overall_readiness": overall_readiness,
        "radar_data": radar_data,
        "explanation": explanation
    }
