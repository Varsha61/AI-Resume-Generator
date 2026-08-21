import re
from typing import Dict, List, Any

def detect_red_flags(resume_data: Dict[str, Any], target_role: str = "Software Developer") -> Dict[str, Any]:
    """
    Scans resume content for resume red flags with severity ratings (HIGH, MEDIUM, LOW).
    """
    raw_text = resume_data.get("raw_text", "")
    links = {
        "github": resume_data.get("github"),
        "linkedin": resume_data.get("linkedin"),
        "portfolio": resume_data.get("portfolio")
    }
    skills = resume_data.get("skills", [])
    red_flags = []

    # 1. Action Verbs check
    weak_verbs = ['helped', 'worked', 'assisted', 'handled', 'responsible for', 'did', 'tried']
    found_weak = [v for v in weak_verbs if re.search(r'\b' + re.escape(v) + r'\b', raw_text.lower())]
    if found_weak:
        red_flags.append({
            "id": "weak_verbs",
            "title": "Weak Action Verbs Detected",
            "description": f"Found passive or non-technical phrases: {', '.join(found_weak[:3])}. Replace with strong verbs like 'Engineered', 'Architected', 'Automated'.",
            "severity": "HIGH",
            "category": "Content Quality"
        })

    # 2. Measurable Impact check
    has_metrics = bool(re.search(r'\b\d+(%|k|ms|sec|hrs|users|\$)\b', raw_text, re.I))
    if not has_metrics:
        red_flags.append({
            "id": "missing_metrics",
            "title": "Missing Measurable Impact / Metrics",
            "description": "None of your bullet points contain quantifiable numbers (% improvement, latency reduction, user count). Quantified bullets stand out 3x more.",
            "severity": "HIGH",
            "category": "Impact & Depth"
        })

    # 3. Links check
    if not links["github"] and target_role in ["Software Developer", "Full Stack Developer", "Data Scientist", "AI/ML Engineer"]:
        red_flags.append({
            "id": "missing_github",
            "title": "Missing GitHub Profile Link",
            "description": "Technical candidates are expected to share public code repositories to verify hands-on coding quality.",
            "severity": "MEDIUM",
            "category": "Online Presence"
        })

    if not links["linkedin"]:
        red_flags.append({
            "id": "missing_linkedin",
            "title": "Missing LinkedIn Profile URL",
            "description": "Adding a customized LinkedIn link improves screener trust and recruiter contact rates.",
            "severity": "LOW",
            "category": "Online Presence"
        })

    # 4. Length / Formatting check
    if len(raw_text) > 6000:
        red_flags.append({
            "id": "too_long",
            "title": "Excessive Page Length",
            "description": "Resume text appears longer than 2 pages. Entry to mid-level candidates should keep resumes concise (1–2 pages max).",
            "severity": "MEDIUM",
            "category": "Formatting"
        })

    # 5. Missing Role Keywords
    if len(skills) < 5:
        red_flags.append({
            "id": "low_skill_count",
            "title": "Insufficient Technical Skills Listed",
            "description": "Fewer than 5 distinct tech skills were identified. Be sure to list your complete tech stack (languages, frameworks, databases, tools).",
            "severity": "HIGH",
            "category": "Keywords"
        })

    # If no major flags found
    if not red_flags:
        red_flags.append({
            "id": "all_clear",
            "title": "Clean Resume Format",
            "description": "No major red flags detected! Ensure all link URLs are active and bullet points remain tight.",
            "severity": "LOW",
            "category": "Formatting"
        })

    return {
        "total_flags": len(red_flags),
        "high_severity_count": len([f for f in red_flags if f["severity"] == "HIGH"]),
        "red_flags": red_flags
    }
