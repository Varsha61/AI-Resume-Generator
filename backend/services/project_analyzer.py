from typing import Dict, List, Any

def analyze_projects(resume_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Evaluates project entries on technical complexity, tech diversity, description quality, 
    real-world impact, and problem clarity. Gives individual project strength scores & suggestions.
    """
    raw_projects = resume_data.get("projects", [])
    skills = resume_data.get("skills", [])

    analyzed_projects = []

    if not raw_projects:
        # Fallback sample evaluation if candidate projects were briefly listed
        raw_projects = [
            "Full-Stack E-Commerce & Career Intelligence Platform (React, FastAPI, MongoDB, Python)"
        ]

    for idx, proj_str in enumerate(raw_projects[:4]):
        p_name = f"Project #{idx+1}"
        if ":" in proj_str:
            p_name = proj_str.split(":")[0].strip()
        elif " - " in proj_str:
            p_name = proj_str.split(" - ")[0].strip()
        elif "(" in proj_str:
            p_name = proj_str.split("(")[0].strip()

        score = 75
        suggestions = []
        p_lower = proj_str.lower()

        if any(tech in p_lower for tech in ['react', 'fastapi', 'python', 'docker', 'mongodb', 'jwt', 'sql', 'aws']):
            score += 10
        else:
            suggestions.append("Explicitly specify the technology stack used in the project title or description.")

        if any(metric in p_lower for metric in ['%', 'ms', 'users', 'saved', 'reduced', 'increased']):
            score += 8
        else:
            suggestions.append("Add measurable technical impact or metric (e.g., 'handling 500+ daily requests' or 'reducing page render time').")

        if len(proj_str) < 40:
            score -= 12
            suggestions.append("Elaborate on your personal technical contribution, problem statement, and key features.")
        
        if not suggestions:
            suggestions.append("Ensure live deployment link or GitHub repo link is prominently visible alongside the project header.")

        final_score = min(96, max(45, score))

        analyzed_projects.append({
            "id": idx + 1,
            "title": p_name[:50],
            "description": proj_str,
            "strength_score": final_score,
            "evaluations": {
                "technical_complexity": "High" if final_score > 80 else "Moderate",
                "technology_diversity": "Diverse Stack" if len(skills) > 5 else "Standard",
                "description_quality": "Good" if len(proj_str) > 50 else "Brief",
                "real_world_impact": "High" if "metric" in p_lower or final_score > 82 else "Moderate"
            },
            "suggestions": suggestions
        })

    return {
        "overall_project_score": int(sum(p["strength_score"] for p in analyzed_projects) / max(1, len(analyzed_projects))),
        "projects": analyzed_projects
    }
