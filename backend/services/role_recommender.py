from typing import Dict, List, Any

TARGET_ROLES_TAXONOMY = {
    "Full Stack Developer": {
        "core": ["React", "Node.js", "JavaScript", "TypeScript", "HTML", "CSS", "MongoDB", "SQL", "REST API", "Git"],
        "description": "Builds both client-facing web UIs and backend microservice APIs."
    },
    "Software Developer": {
        "core": ["Python", "Java", "C++", "SQL", "Git", "REST API", "Data Structures", "Docker", "Unit Testing"],
        "description": "Designs and writes reliable backend, desktop, or cloud software systems."
    },
    "Data Analyst": {
        "core": ["Python", "SQL", "Excel", "Power BI", "Tableau", "Pandas", "Statistics", "Data Visualization"],
        "description": "Transforms raw datasets into business dashboards and strategic insights."
    },
    "Business Analyst": {
        "core": ["SQL", "Business Analysis", "Jira", "Agile", "Tableau", "Power BI", "Flowcharts", "Requirement Gathering"],
        "description": "Bridges corporate strategy with engineering execution through data metrics."
    },
    "Java Developer": {
        "core": ["Java", "Spring Boot", "Hibernate", "Maven", "SQL", "Microservices", "REST API", "Git"],
        "description": "Specializes in enterprise-grade Java backends and cloud microservices."
    },
    "Data Scientist": {
        "core": ["Python", "Machine Learning", "Pandas", "Scikit-Learn", "TensorFlow", "Statistics", "R", "SQL"],
        "description": "Applies statistical modeling and predictive machine learning to data."
    },
    "AI/ML Engineer": {
        "core": ["Python", "PyTorch", "TensorFlow", "NLP", "Computer Vision", "Docker", "Model Deployment", "Scikit-Learn"],
        "description": "Deploys production neural network models and intelligent AI systems."
    },
    "QA Engineer": {
        "core": ["Selenium", "Automation", "Testing", "Jira", "Postman", "Cypress", "Python", "SQL"],
        "description": "Ensures application quality via automated testing frameworks."
    }
}

def recommend_roles(resume_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Ranks standard target role fits for the candidate based on detected skills & experience.
    """
    skills = [s.lower() for s in resume_data.get("skills", [])]
    raw_text = resume_data.get("raw_text", "").lower()

    recommendations = []

    for role_name, info in TARGET_ROLES_TAXONOMY.items():
        core_skills = info["core"]
        matched_skills = []
        missing_skills = []

        for cs in core_skills:
            cs_low = cs.lower()
            if cs_low in skills or cs_low in raw_text:
                matched_skills.append(cs)
            else:
                missing_skills.append(cs)

        match_pct = int(round((len(matched_skills) / len(core_skills)) * 100))
        match_pct = max(35, min(96, match_pct))

        recommendations.append({
            "role": role_name,
            "match_percentage": match_pct,
            "description": info["description"],
            "strong_skills": matched_skills,
            "missing_skills": missing_skills,
            "recommendation": f"Add {', '.join(missing_skills[:2])} to increase match to {min(99, match_pct + 12)}%."
        })

    # Sort descending by match percentage
    recommendations.sort(key=lambda x: x["match_percentage"], reverse=True)

    return {
        "best_matches": recommendations[:4],
        "all_recommendations": recommendations
    }
