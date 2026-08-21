from typing import Dict, List, Any

def generate_interview_questions(resume_data: Dict[str, Any], jd_text: str = "", target_role: str = "Software Developer") -> Dict[str, Any]:
    """
    Generates targeted interview questions categorized by Technical, Behavioral, 
    Project-based, HR, and Scenario-based with difficulty ratings.
    """
    skills = resume_data.get("skills", ["Java", "SQL", "React", "Python"])
    projects = resume_data.get("projects", [])

    top_skill_1 = skills[0] if len(skills) > 0 else "SQL"
    top_skill_2 = skills[1] if len(skills) > 1 else "React"
    proj_title = projects[0] if projects else "Full-Stack Web Project"
    if ":" in proj_title: proj_title = proj_title.split(":")[0]

    questions = [
        # PROJECT QUESTIONS
        {
            "id": 1,
            "category": "Project-based",
            "question": f"You mentioned working on '{proj_title[:45]}'. Explain your technical architecture and how you handled state management or database interaction.",
            "difficulty": "Medium",
            "suggested_answer_hints": "Detail your personal contribution, chosen frameworks, state management solution, and how you verified data consistency."
        },
        {
            "id": 2,
            "category": "Project-based",
            "question": f"What was the most challenging technical bug or performance bottleneck you encountered in your {proj_title[:35]} project, and how did you resolve it?",
            "difficulty": "Hard",
            "suggested_answer_hints": "Use the STAR method (Situation, Task, Action, Result) with specific debugging tools or profiling metrics."
        },

        # TECHNICAL QUESTIONS
        {
            "id": 3,
            "category": "Technical",
            "question": f"What are the core differences between various JOIN types in {top_skill_1}, and how do indexes optimize query response times?",
            "difficulty": "Easy",
            "suggested_answer_hints": "Explain INNER vs LEFT vs RIGHT vs FULL OUTER JOINs, B-Tree index structures, and avoiding table scans."
        },
        {
            "id": 4,
            "category": "Technical",
            "question": f"How do you implement secure client-server authentication using REST APIs and {top_skill_2}?",
            "difficulty": "Medium",
            "suggested_answer_hints": "Discuss JWT tokens, HTTP-only cookies, auth headers, CSRF protection, and token expiration refreshing."
        },

        # BEHAVIORAL QUESTIONS
        {
            "id": 5,
            "category": "Behavioral",
            "question": "Describe a scenario where project requirements changed midway through sprint development. How did you adapt your timeline?",
            "difficulty": "Medium",
            "suggested_answer_hints": "Emphasize clear communication with stakeholders, re-prioritizing backlog tasks, and agile adaptability."
        },

        # SCENARIO QUESTIONS
        {
            "id": 6,
            "category": "Scenario-based",
            "question": f"If an API endpoint in your {target_role} application suddenly spikes to 3-second latency under high traffic, what step-by-step diagnostic process would you follow?",
            "difficulty": "Hard",
            "suggested_answer_hints": "Check database query profiling, network latency, CPU/Memory spikes, cache miss rates (Redis), and server logs."
        },

        # HR QUESTIONS
        {
            "id": 7,
            "category": "HR",
            "question": f"Why are you interested in pursuing a {target_role} position at our company, and how does your skill set align with our engineering goals?",
            "difficulty": "Easy",
            "suggested_answer_hints": "Highlight alignment with their technical stack, product vision, and your active drive for continuous learning."
        }
    ]

    return {
        "target_role": target_role,
        "total_questions": len(questions),
        "questions": questions
    }
