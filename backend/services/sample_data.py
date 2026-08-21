"""
Sample Resume and Job Description data for Demo Mode.
"""
from typing import Dict, Any


SAMPLE_RESUME_TEXT = """
Alex Morgan
San Francisco, CA | (555) 234-5678 | alex.morgan@email.com
linkedin.com/in/alexmorgan-dev | github.com/alexmorgan-dev | alexmorgan.dev

PROFESSIONAL SUMMARY
Proactive Software Engineer and Full Stack Developer with 2+ years of experience building high-performance web applications, scalable backend microservices, and automated data pipelines using React, Python, FastAPI, and SQL. Proven track record of optimizing API performance by 35% and delivering production-ready applications.

SKILLS
• Languages: Python, JavaScript, TypeScript, SQL, HTML, CSS
• Frameworks & Libraries: React, Node.js, FastAPI, Express.js, Django, Tailwind CSS, Redux
• Databases: PostgreSQL, MongoDB, Redis, SQLite
• Tools & Cloud: Git, GitHub, Docker, AWS (S3, EC2), Postman, Jest, CI/CD, Linux
• Methodologies: Agile, Scrum, RESTful API Design, System Architecture, Unit Testing

WORK EXPERIENCE
Full Stack Engineering Intern | TechNova Systems, San Francisco, CA
June 2024 – Present
• Engineered responsive frontend web components using React and TypeScript, reducing page render latency by 35%.
• Architected scalable RESTful API microservices in Python (FastAPI) handling 15,000+ daily requests with JWT authentication.
• Optimized PostgreSQL database queries and indexing, cutting median response time from 420ms to 110ms.
• Collaborated in a 6-person Agile Scrum engineering team, participating in daily standups and sprint planning.

Software Developer Intern | DataSphere Solutions, Austin, TX
June 2023 – August 2023
• Developed automated Python data processing scripts using Pandas and NumPy to ingest and clean 50GB+ raw logs.
• Built interactive analytics dashboards using SQL and Power BI to display real-time user retention metrics for executive stakeholders.
• Integrated unit tests using PyTest achieving 88% code coverage across core business logic services.

PROJECTS
ResumeIQ — AI Career & Resume Intelligence Platform
• Designed a full-stack platform providing ATS score evaluation, skill gap detection, and customized interview preparation.
• Implemented async FastAPI REST APIs integrated with spaCy NLP for structured skill extraction and match scoring.
• Built an interactive dashboard featuring Recharts data visualizations and CSS dark/light theme persistence.

ShopPulse — E-Commerce Microservices Platform
• Built a microservices e-commerce application utilizing React, Node.js, Express, and MongoDB.
• Implemented Stripe payment gateway integration and JWT authentication with session refresh tokens.
• Containerized frontend and backend services using Docker Compose for seamless deployment on AWS EC2.

EDUCATION
B.S. in Computer Science | University of California, Berkeley
Graduated: May 2024 | GPA: 3.8 / 4.0

CERTIFICATIONS & ACHIEVEMENTS
• AWS Certified Developer – Associate (2024)
• 1st Place Winner – UC Berkeley Annual Hackathon (2023)
"""

SAMPLE_JOB_DESCRIPTION = """
Senior Full Stack / Software Developer — TechCorp Innovations
San Francisco, CA (Hybrid)

About the Role:
We are looking for a talented Software Developer / Full Stack Engineer to join our core product team. You will be responsible for building intuitive frontend user interfaces and scalable backend REST APIs.

Key Responsibilities:
• Design, build, and maintain production web applications using React, TypeScript, and modern CSS.
• Develop robust backend microservices using Python (FastAPI/Django) or Node.js.
• Write complex, performant SQL queries and manage relational databases (PostgreSQL/MySQL).
• Containerize microservices using Docker and manage CI/CD deployment pipelines on AWS or GCP.
• Collaborate with cross-functional teams in an Agile/Scrum environment.

Required Skills & Qualifications:
• B.S. or M.S. in Computer Science, Software Engineering, or related technical field.
• 1+ years of experience developing web applications with React, JavaScript/TypeScript, and Python.
• Strong command of SQL relational databases, indexing, and query optimization.
• Hands-on experience with RESTful APIs, Git, and Docker containerization.
• Solid understanding of data structures, algorithms, and object-oriented design.

Preferred / Nice to Have:
• Experience with Power BI, Tableau, or data visualization frameworks.
• Knowledge of Kubernetes, Redis caching, or AWS cloud infrastructure (S3, EC2, Lambda).
• Automated testing experience with PyTest, Jest, or Cypress.
"""

def get_demo_analysis_payload(target_role: str = "Software Developer") -> Dict[str, Any]:
    from backend.services.extractor import extract_resume_information
    from backend.services.ats_engine import calculate_ats_score
    from backend.services.job_matcher import calculate_job_match
    from backend.services.readiness_engine import calculate_career_readiness
    from backend.services.skill_gap_engine import calculate_skill_gap
    from backend.services.roadmap_engine import generate_personalized_roadmap
    from backend.services.enhancement_engine import generate_resume_suggestions
    from backend.services.project_analyzer import analyze_projects
    from backend.services.red_flags_detector import detect_red_flags
    from backend.services.role_recommender import recommend_roles
    from backend.services.interview_generator import generate_interview_questions

    resume_info = extract_resume_information(SAMPLE_RESUME_TEXT)
    ats_res = calculate_ats_score(resume_info, target_role)
    job_match_res = calculate_job_match(resume_info["skills"], SAMPLE_RESUME_TEXT, SAMPLE_JOB_DESCRIPTION)
    readiness_res = calculate_career_readiness(ats_res, job_match_res, resume_info, target_role)
    skill_gap_res = calculate_skill_gap(resume_info["skills"], target_role, job_match_res["missing_skills"])
    roadmap_res = generate_personalized_roadmap(job_match_res["missing_skills"], target_role)
    suggestions_res = generate_resume_suggestions(resume_info, target_role)
    project_res = analyze_projects(resume_info)
    red_flags_res = detect_red_flags(resume_info, target_role)
    roles_res = recommend_roles(resume_info)
    interview_res = generate_interview_questions(resume_info, SAMPLE_JOB_DESCRIPTION, target_role)

    return {
        "id": "demo-analysis-9999",
        "is_demo": True,
        "timestamp": "2026-08-21T12:00:00Z",
        "target_role": target_role,
        "resume_data": resume_info,
        "job_description_text": SAMPLE_JOB_DESCRIPTION,
        "ats_analysis": ats_res,
        "job_match_analysis": job_match_res,
        "career_readiness": readiness_res,
        "skill_gap_analysis": skill_gap_res,
        "learning_roadmap": roadmap_res,
        "resume_suggestions": suggestions_res,
        "project_strength_analysis": project_res,
        "red_flags": red_flags_res,
        "role_recommendations": roles_res,
        "interview_prep": interview_res
    }
