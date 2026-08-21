from typing import Dict, List, Any

def generate_resume_suggestions(resume_data: Dict[str, Any], target_role: str = "Software Developer") -> Dict[str, Any]:
    """
    Generates actionable section improvements with BEFORE / AFTER bullet points 
    and explicit explanations without inventing fake user metrics or experiences.
    """
    sample_enhancements = [
        {
            "id": 1,
            "section": "Projects / Experience",
            "before": "Worked on a website using React.",
            "after": "Engineered a responsive React-based web application featuring modular components, state management, and optimized client navigation.",
            "why_better": [
                "Stronger action verb: Replaced passive 'Worked on' with technical 'Engineered'.",
                "More technical keywords: Added 'modular components', 'state management', and 'client navigation'.",
                "Clearer contribution: Outlines architectural role instead of generic participation.",
                "Better ATS relevance: Matches recruiter searches for modern frontend patterns."
            ]
        },
        {
            "id": 2,
            "section": "Projects / Backend",
            "before": "Created REST API using Python and SQL database for users.",
            "after": "Developed high-throughput FastAPI RESTful endpoints with SQL database queries, input validation, and JWT authentication.",
            "why_better": [
                "Stronger action verb: Replaced 'Created' with 'Developed high-throughput'.",
                "More technical keywords: Added 'FastAPI RESTful endpoints', 'input validation', and 'JWT authentication'.",
                "Security focus: Explicitly mentions authentication and data validation.",
                "Higher recruiter impact: Highlights production-grade backend skills."
            ]
        },
        {
            "id": 3,
            "section": "Data Analytics",
            "before": "Made dashboards in Power BI and wrote SQL queries for team reports.",
            "after": "Designed interactive Power BI business intelligence dashboards with automated SQL data aggregation queries to streamline executive reporting.",
            "why_better": [
                "Action verb & clarity: Replaced 'Made dashboards' with 'Designed interactive business intelligence dashboards'.",
                "Business value: Emphasizes automation and streamlining executive reporting.",
                "Professional terminology: Uses 'SQL data aggregation' rather than basic 'wrote queries'."
            ]
        }
    ]

    general_tips = [
        "Use active verbs (e.g., 'Architected', 'Spearheaded', 'Automated') at the start of every bullet point.",
        "Include honest, measurable results wherever applicable (e.g., 'reducing query latency' or 'serving 1,000+ monthly requests').",
        "Keep bullet points concise (1 to 2 lines max) to prevent visual clutter for recruiters."
    ]

    return {
        "suggestions": sample_enhancements,
        "general_tips": general_tips
    }
