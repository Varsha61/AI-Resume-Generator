import re
from typing import Dict, List, Any
from backend.services.extractor import SKILL_TAXONOMY

def extract_jd_requirements(jd_text: str) -> Dict[str, Any]:
    """Extract required skills, preferred skills, tools, and keywords from Job Description text."""
    jd_lower = jd_text.lower()
    
    all_extracted_skills = []
    for cat, skills in SKILL_TAXONOMY.items():
        for skill in skills:
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            if re.search(pattern, jd_lower):
                all_extracted_skills.append(skill)
    
    # Extra common keywords
    extra_kws = ["REST API", "Microservices", "CI/CD", "Agile", "Scrum", "Git", "Unit Testing", "System Design", "ETL", "Data Pipelines", "Power BI", "Tableau", "Cloud", "Kubernetes"]
    for kw in extra_kws:
        if re.search(r'\b' + re.escape(kw.lower()) + r'\b', jd_lower) and kw not in all_extracted_skills:
            all_extracted_skills.append(kw)

    # Split into Required vs Preferred based on context cues
    required_skills = []
    preferred_skills = []

    lines = jd_text.split('\n')
    is_preferred_section = False

    for line in lines:
        l_lower = line.lower()
        if any(term in l_lower for term in ['preferred', 'nice to have', 'plus', 'bonus', 'desirable']):
            is_preferred_section = True
        elif any(term in l_lower for term in ['requirements', 'must have', 'qualifications', 'responsibilities']):
            is_preferred_section = False

        for skill in all_extracted_skills:
            if re.search(r'\b' + re.escape(skill.lower()) + r'\b', l_lower):
                if is_preferred_section:
                    if skill not in preferred_skills: preferred_skills.append(skill)
                else:
                    if skill not in required_skills: required_skills.append(skill)

    # Default split if parsing section headers wasn't explicit
    if not required_skills and not preferred_skills:
        required_skills = all_extracted_skills[:max(1, int(len(all_extracted_skills) * 0.65))]
        preferred_skills = all_extracted_skills[len(required_skills):]
    elif not required_skills:
        required_skills = preferred_skills
        preferred_skills = []

    # Clean duplicates
    preferred_skills = [s for s in preferred_skills if s not in required_skills]

    return {
        "required_skills": required_skills if required_skills else ["Problem Solving", "Communication", "Git"],
        "preferred_skills": preferred_skills if preferred_skills else ["Docker", "CI/CD"],
        "all_jd_skills": all_extracted_skills
    }

def calculate_job_match(resume_skills: List[str], raw_resume_text: str, jd_text: str) -> Dict[str, Any]:
    """Compare candidate skills & text against job description."""
    if not jd_text or len(jd_text.strip()) < 20:
        return {
            "overall_match": 0,
            "required_match_count": "0/0",
            "preferred_match_count": "0/0",
            "keyword_match_pct": 0,
            "matched_skills": [],
            "missing_skills": [],
            "partial_skills": []
        }

    jd_reqs = extract_jd_requirements(jd_text)
    req_skills = jd_reqs["required_skills"]
    pref_skills = jd_reqs["preferred_skills"]
    all_jd_skills = jd_reqs["all_jd_skills"]

    resume_skills_lower = [s.lower() for s in resume_skills]
    resume_text_lower = raw_resume_text.lower()

    matched = []
    missing = []
    partial = []

    for skill in all_jd_skills:
        s_low = skill.lower()
        if s_low in resume_skills_lower or re.search(r'\b' + re.escape(s_low) + r'\b', resume_text_lower):
            matched.append(skill)
        else:
            # Check for partial match (e.g., candidate has SQL, JD asks for PostgreSQL)
            if any(s_low in r or r in s_low for r in resume_skills_lower):
                partial.append(skill)
            else:
                missing.append(skill)

    # Match metrics calculation
    matched_req = [s for s in req_skills if s in matched or s in partial]
    matched_pref = [s for s in pref_skills if s in matched or s in partial]

    req_score = (len(matched_req) / len(req_skills)) * 100 if req_skills else 100
    pref_score = (len(matched_pref) / len(pref_skills)) * 100 if pref_skills else 100

    overall_match = int(round((req_score * 0.7) + (pref_score * 0.3)))
    overall_match = max(15, min(98, overall_match))

    keyword_match_pct = int(round((len(matched) / max(1, len(all_jd_skills))) * 100))

    return {
        "overall_match": overall_match,
        "required_match_count": f"{len(matched_req)}/{len(req_skills)}",
        "preferred_match_count": f"{len(matched_pref)}/{len(pref_skills)}",
        "keyword_match_pct": min(100, keyword_match_pct),
        "matched_skills": matched,
        "missing_skills": missing,
        "partial_skills": partial,
        "required_skills_list": req_skills,
        "preferred_skills_list": pref_skills
    }
