import re
from typing import Dict, List, Any

def calculate_ats_score(resume_data: Dict[str, Any], target_role: str = "Software Developer") -> Dict[str, Any]:
    """
    Computes an ATS score (0-100) with detailed 8-parameter breakdown 
    and actionable feedback on what is hurting the score.
    """
    raw_text = resume_data.get("raw_text", "")
    skills = resume_data.get("skills", [])
    projects = resume_data.get("projects", [])
    experience = resume_data.get("experience", [])
    education = resume_data.get("education", [])
    
    # 1. Contact Information completeness (Max 10)
    contact_score = 0
    if resume_data.get("name"): contact_score += 2
    if resume_data.get("email"): contact_score += 3
    if resume_data.get("phone"): contact_score += 2
    if resume_data.get("linkedin"): contact_score += 1.5
    if resume_data.get("github"): contact_score += 1.5

    # 2. Section Completeness (Max 15)
    section_score = 0
    if skills: section_score += 4
    if projects: section_score += 4
    if experience: section_score += 4
    if education: section_score += 3

    # 3. Formatting & Text Structure (Max 10)
    formatting_score = 10
    formatting_issues = []
    if len(raw_text) < 300:
        formatting_score -= 4
        formatting_issues.append("Resume content is too short (under 300 characters).")
    if len(raw_text) > 6000:
        formatting_score -= 3
        formatting_issues.append("Resume length exceeds recommended 2 pages (over 6000 characters).")
    if not re.search(r'\b(skills|technical skills|technologies)\b', raw_text, re.I):
        formatting_score -= 2
        formatting_issues.append("Missing explicit 'Skills' section heading.")

    # 4. Skills Relevance (Max 15)
    skills_score = min(15, len(skills) * 1.5)

    # 5. Experience Relevance (Max 15)
    exp_score = 10 if experience else 4
    if any(kw in raw_text.lower() for kw in ['developed', 'engineered', 'managed', 'implemented', 'designed', 'built', 'led']):
        exp_score += 5

    # 6. Project Relevance & Strength (Max 15)
    project_score = 10 if projects else 4
    if any(kw in raw_text.lower() for kw in ['api', 'database', 'frontend', 'backend', 'full-stack', 'dashboard', 'analytics', 'model']):
        project_score += 5

    # 7. Keyword Relevance (Max 10)
    # Role-specific core keywords lookup
    role_keywords = {
        "Software Developer": ["git", "rest api", "unit testing", "agile", "data structures", "system design", "ci/cd"],
        "Java Developer": ["java", "spring boot", "hibernate", "maven", "microservices", "sql", "junit"],
        "Full Stack Developer": ["react", "node.js", "javascript", "typescript", "html", "css", "mongodb", "rest api"],
        "Data Analyst": ["python", "sql", "excel", "power bi", "tableau", "pandas", "statistics", "data visualization"],
        "Business Analyst": ["sql", "business analysis", "jira", "agile", "requirement gathering", "tableau", "flowcharts"],
        "Data Scientist": ["python", "machine learning", "pandas", "scikit-learn", "tensorflow", "statistics", "deep learning"],
        "AI/ML Engineer": ["python", "pytorch", "tensorflow", "nlp", "computer vision", "docker", "model deployment"],
        "QA Engineer": ["selenium", "automation", "testing", "jira", "postman", "cypress", "unit testing"]
    }
    target_kws = role_keywords.get(target_role, role_keywords["Software Developer"])
    matched_kws = [kw for kw in target_kws if kw in raw_text.lower()]
    keyword_score = round((len(matched_kws) / len(target_kws)) * 10, 1)

    # 8. Resume Structure & Action Verbs (Max 10)
    structure_score = 5
    action_verbs = ['developed', 'architected', 'optimized', 'spearheaded', 'implemented', 'automated', 'transformed', 'created', 'built', 'integrated']
    found_verbs = [v for v in action_verbs if v in raw_text.lower()]
    structure_score += min(5, len(found_verbs) * 1)

    # Total Score
    total_ats_score = int(round(contact_score + section_score + formatting_score + skills_score + exp_score + project_score + keyword_score + structure_score))
    total_ats_score = max(10, min(98, total_ats_score))

    # What is hurting your ATS score?
    hurting_factors = []
    if len(matched_kws) < len(target_kws):
        missing_kws = [kw for kw in target_kws if kw not in matched_kws]
        hurting_factors.append({
            "title": f"Missing Target Keywords for {target_role}",
            "description": f"Your resume is missing essential keywords: {', '.join(missing_kws[:4])}.",
            "impact": "-8 to -15 ATS points",
            "severity": "HIGH"
        })

    if not resume_data.get("github") and target_role in ["Software Developer", "Full Stack Developer", "Data Scientist", "AI/ML Engineer"]:
        hurting_factors.append({
            "title": "Missing GitHub Profile Link",
            "description": "Recruiters and automated screeners check for portfolio/repository proof of technical projects.",
            "impact": "-5 ATS points",
            "severity": "MEDIUM"
        })

    # Check for metrics (% increase, $ saved, X users, speedup)
    has_metrics = bool(re.search(r'\b\d+(%|k|x|ms|sec|hrs|users|\$)\b', raw_text, re.I))
    if not has_metrics:
        hurting_factors.append({
            "title": "Lack of Quantifiable Achievements",
            "description": "Bullet points use generic descriptions without measurable impact (e.g. 'Improved speed by 35%').",
            "impact": "-10 ATS points",
            "severity": "HIGH"
        })

    if len(skills) < 6:
        hurting_factors.append({
            "title": "Sparse Skill Coverage",
            "description": f"Only {len(skills)} tech skills detected. Aim for 8-12 core frameworks, languages, and tools.",
            "impact": "-6 ATS points",
            "severity": "MEDIUM"
        })

    if len(hurting_factors) == 0:
        hurting_factors.append({
            "title": "Minor Formatting Refinements",
            "description": "Consider adding bullet point action verbs and expanding on backend/cloud technical architecture.",
            "impact": "-2 ATS points",
            "severity": "LOW"
        })

    breakdown = [
        {"category": "Keyword Relevance", "score": int(keyword_score * 10), "weight": "15%", "status": "Strong" if keyword_score > 7 else "Needs Improvement"},
        {"category": "Section Completeness", "score": int((section_score / 15) * 100), "weight": "15%", "status": "Good"},
        {"category": "Formatting Integrity", "score": int((formatting_score / 10) * 100), "weight": "10%", "status": "Optimal"},
        {"category": "Skills Relevance", "score": int((skills_score / 15) * 100), "weight": "15%", "status": "Good"},
        {"category": "Experience Relevance", "score": int((exp_score / 15) * 100), "weight": "15%", "status": "Good"},
        {"category": "Project Strength", "score": int((project_score / 15) * 100), "weight": "10%", "status": "Moderate"},
        {"category": "Contact Information", "score": int((contact_score / 10) * 100), "weight": "10%", "status": "Complete" if contact_score > 7 else "Incomplete"},
        {"category": "Resume Structure", "score": int((structure_score / 10) * 100), "weight": "10%", "status": "Strong"}
    ]

    return {
        "ats_score": total_ats_score,
        "target_role": target_role,
        "breakdown": breakdown,
        "hurting_factors": hurting_factors
    }
