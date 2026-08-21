from typing import Dict, List, Any

def generate_personalized_roadmap(missing_skills: List[str] = None, target_role: str = "Software Developer") -> Dict[str, Any]:
    """
    Generates a tailored 30-Day Learning Roadmap with 4 weekly milestones, 
    priority badges, estimated hours, and rationale.
    """
    default_skills = missing_skills if missing_skills and len(missing_skills) >= 2 else ["Advanced SQL & ETL", "Power BI / Tableau", "Docker Containers", "System Architecture"]

    skill_w1 = default_skills[0] if len(default_skills) > 0 else "Advanced SQL Queries"
    skill_w2 = default_skills[1] if len(default_skills) > 1 else "Power BI Fundamentals"
    skill_w3 = default_skills[2] if len(default_skills) > 2 else "Docker & Cloud Deployment"
    skill_w4 = default_skills[3] if len(default_skills) > 3 else "System Design & Case Studies"

    roadmap_weeks = [
        {
            "week": "Week 1",
            "title": f"Master {skill_w1}",
            "skill": skill_w1,
            "priority": "HIGH",
            "est_hours": "10-12 hrs",
            "why_it_matters": f"Essential core requirement for {target_role} screenings and technical code interviews.",
            "practice_tasks": [
                f"Solve 15 intermediate to hard query problems on {skill_w1}.",
                "Build a standalone repository demonstrating performance query optimization.",
                "Review window functions, indexing strategies, and relational join patterns."
            ]
        },
        {
            "week": "Week 2",
            "title": f"Hands-on {skill_w2}",
            "skill": skill_w2,
            "priority": "HIGH",
            "est_hours": "8-10 hrs",
            "why_it_matters": "Connects data querying with visual business storytelling for high managerial impact.",
            "practice_tasks": [
                f"Build an end-to-end interactive analytics report using {skill_w2}.",
                "Incorporate interactive drill-down filters and key metric cards.",
                "Publish preview screenshots to your project GitHub readmes."
            ]
        },
        {
            "week": "Week 3",
            "title": f"Containerization & {skill_w3}",
            "skill": skill_w3,
            "priority": "MEDIUM",
            "est_hours": "6-8 hrs",
            "why_it_matters": "Proves production readiness and devops capability to engineering recruiters.",
            "practice_tasks": [
                f"Write a Dockerfile and docker-compose setup for {skill_w3}.",
                "Deploy a live service onto Vercel / Render / AWS free tier.",
                "Add live deployment link to your resume headers."
            ]
        },
        {
            "week": "Week 4",
            "title": f"Real-World {skill_w4}",
            "skill": skill_w4,
            "priority": "MEDIUM",
            "est_hours": "8 hrs",
            "why_it_matters": "Prepares you to answer scenario-based architectural questions in final rounds.",
            "practice_tasks": [
                "Draft bullet points incorporating STAR method metrics.",
                "Prepare 2-minute elevator pitches for top 3 resume projects.",
                "Conduct mock interviews covering system design fundamentals."
            ]
        }
    ]

    return {
        "title": "YOUR 30-DAY CAREER ROADMAP",
        "target_role": target_role,
        "weeks": roadmap_weeks
    }
