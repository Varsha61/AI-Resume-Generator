from typing import Dict, List, Any
from backend.services.extractor import SKILL_TAXONOMY

def calculate_skill_gap(resume_skills: List[str], target_role: str, jd_missing_skills: List[str] = None) -> Dict[str, Any]:
    """
    Evaluates skill depth across 7 categories:
    Programming, Databases, Cloud, Data Analytics, Frameworks, Tools, Soft Skills.
    Returns Current Level %, Required Level %, and Gap %.
    """
    resume_skills_lower = [s.lower() for s in (resume_skills or [])]

    # Benchmark requirements per category by role
    role_category_benchmarks = {
        "Software Developer": {"Programming": 85, "Databases": 75, "Cloud": 70, "Data Analytics": 40, "Frameworks": 80, "Tools": 85, "Soft Skills": 80},
        "Java Developer": {"Programming": 90, "Databases": 80, "Cloud": 70, "Data Analytics": 35, "Frameworks": 85, "Tools": 80, "Soft Skills": 75},
        "Full Stack Developer": {"Programming": 90, "Databases": 80, "Cloud": 75, "Data Analytics": 45, "Frameworks": 90, "Tools": 85, "Soft Skills": 80},
        "Data Analyst": {"Programming": 75, "Databases": 90, "Cloud": 60, "Data Analytics": 95, "Frameworks": 60, "Tools": 85, "Soft Skills": 85},
        "Business Analyst": {"Programming": 50, "Databases": 85, "Cloud": 55, "Data Analytics": 90, "Frameworks": 50, "Tools": 80, "Soft Skills": 95},
        "Data Scientist": {"Programming": 90, "Databases": 80, "Cloud": 75, "Data Analytics": 95, "Frameworks": 80, "Tools": 80, "Soft Skills": 80},
        "AI/ML Engineer": {"Programming": 90, "Databases": 75, "Cloud": 80, "Data Analytics": 90, "Frameworks": 85, "Tools": 85, "Soft Skills": 75},
        "QA Engineer": {"Programming": 70, "Databases": 70, "Cloud": 60, "Data Analytics": 40, "Frameworks": 75, "Tools": 85, "Soft Skills": 80}
    }

    benchmarks = role_category_benchmarks.get(target_role, role_category_benchmarks["Software Developer"])

    category_results = []
    skill_breakdowns = []

    for cat, skills_in_cat in SKILL_TAXONOMY.items():
        found = [s for s in skills_in_cat if s.lower() in resume_skills_lower]
        required_level = benchmarks.get(cat, 75)
        
        # Calculate current level percentage based on detected category count
        current_level = min(100, int((len(found) / max(2, len(skills_in_cat) * 0.4)) * 85))
        if len(found) > 0 and current_level < 35:
            current_level = 45

        gap = max(0, required_level - current_level)

        category_results.append({
            "category": cat,
            "current_level": current_level,
            "required_level": required_level,
            "gap": gap,
            "detected_skills": found
        })

    # Individual key skill gaps (e.g. SQL Current: 80%, Required: 90%, Gap: 10%)
    sample_skills = [
        {"skill": "SQL", "current": 80, "required": 90, "gap": 10},
        {"skill": "Power BI / Tableau", "current": 25, "required": 80, "gap": 55},
        {"skill": "Docker & Containerization", "current": 40, "required": 75, "gap": 35},
        {"skill": "REST API Architecture", "current": 85, "required": 90, "gap": 5},
        {"skill": "CI/CD Pipelines", "current": 30, "required": 70, "gap": 40}
    ]

    # If missing JD skills exist, insert them cleanly
    if jd_missing_skills:
        for idx, ms in enumerate(jd_missing_skills[:3]):
            sample_skills.insert(idx, {
                "skill": ms,
                "current": 15,
                "required": 85,
                "gap": 70
            })

    return {
        "categories": category_results,
        "skill_gaps": sample_skills[:5]
    }
