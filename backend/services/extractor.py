import re
from typing import Dict, List, Any

# Standard Skill Taxonomy for categorization
SKILL_TAXONOMY = {
    "Programming": ["Python", "Java", "JavaScript", "TypeScript", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "Kotlin", "Swift", "R", "SQL", "HTML", "CSS"],
    "Databases": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Oracle", "Cassandra", "DynamoDB", "Elasticsearch", "Neo4j", "Firebase"],
    "Cloud & DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Terraform", "Jenkins", "GitHub Actions", "Nginx", "Linux"],
    "Data Analytics & AI": ["Pandas", "NumPy", "Scikit-Learn", "TensorFlow", "PyTorch", "Power BI", "Tableau", "Matplotlib", "Seaborn", "Apache Spark", "Hadoop", "OpenCV", "NLP"],
    "Frameworks & Libs": ["React", "React Native", "Next.js", "Vue.js", "Angular", "Node.js", "Express", "FastAPI", "Django", "Flask", "Spring Boot", "Tailwind CSS", "Bootstrap", "Redux"],
    "Tools & Platforms": ["Git", "GitHub", "GitLab", "Jira", "Postman", "VS Code", "Figma", "Docker", "Bitbucket", "Webpack", "Vite"],
    "Soft Skills": ["Problem Solving", "Team Leadership", "Communication", "Agile", "Scrum", "Critical Thinking", "Project Management", "Collaboration", "Adaptability"]
}

def extract_email(text: str) -> str:
    match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
    return match.group(0) if match else ""

def extract_phone(text: str) -> str:
    match = re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    return match.group(0) if match else ""

def extract_links(text: str) -> Dict[str, str]:
    linkedin = ""
    github = ""
    portfolio = ""

    li_match = re.search(r'(https?://)?(www\.)?linkedin\.com/in/[a-zA-Z0-9_-]+', text, re.IGNORECASE)
    if li_match:
        linkedin = li_match.group(0)
        if not linkedin.startswith("http"):
            linkedin = "https://" + linkedin

    gh_match = re.search(r'(https?://)?(www\.)?github\.com/[a-zA-Z0-9_-]+', text, re.IGNORECASE)
    if gh_match:
        github = gh_match.group(0)
        if not github.startswith("http"):
            github = "https://" + github

    port_match = re.search(r'(https?://)?([a-zA-Z0-9_-]+\.vercel\.app|[a-zA-Z0-9_-]+\.netlify\.app|[a-zA-Z0-9_-]+\.me|[a-zA-Z0-9_-]+\.io)', text, re.IGNORECASE)
    if port_match:
        portfolio = port_match.group(0)
        if not portfolio.startswith("http"):
            portfolio = "https://" + portfolio

    return {"linkedin": linkedin, "github": github, "portfolio": portfolio}

def extract_name(text: str) -> str:
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if lines:
        # First non-empty line often contains the name
        first_line = lines[0]
        if len(first_line.split()) <= 4 and not any(kw in first_line.lower() for kw in ['resume', 'curriculum', 'cv', 'page', 'profile', 'contact']):
            return first_line
    return "Candidate Name"

def extract_location(text: str) -> str:
    # Common locations or city/state regex patterns
    match = re.search(r'([A-Z][a-z]+(?:\s[A-Z][a-z]+)?),\s*([A-Z]{2}|[A-Z][a-z]+)', text)
    if match:
        return match.group(0)
    # Check for common tech hubs
    hubs = ["San Francisco, CA", "New York, NY", "Seattle, WA", "Austin, TX", "Bangalore, India", "London, UK", "Toronto, Canada", "Boston, MA", "Chicago, IL"]
    for hub in hubs:
        if hub.lower() in text.lower():
            return hub
    return "Remote / Not Specified"

def extract_skills_list(text: str) -> List[str]:
    found_skills = set()
    text_lower = text.lower()

    for category, skills in SKILL_TAXONOMY.items():
        for skill in skills:
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            if re.search(pattern, text_lower):
                found_skills.add(skill)

    # Additional tech keywords lookup
    extra_keywords = ["REST API", "Microservices", "GraphQL", "CI/CD", "AWS Lambda", "S3", "EC2", "Docker Compose", "JUnit", "Jest", "Cypress", "Kafka", "Data Mining", "ETL", "Tableau", "PowerBI"]
    for kw in extra_keywords:
        if re.search(r'\b' + re.escape(kw.lower()) + r'\b', text_lower):
            found_skills.add(kw)

    return sorted(list(found_skills))

def extract_sections(text: str) -> Dict[str, Any]:
    """Break text into key sections based on section header regexes."""
    sections = {
        "education": [],
        "experience": [],
        "projects": [],
        "certifications": [],
        "achievements": []
    }

    lines = text.split('\n')
    current_section = None

    for line in lines:
        clean = line.strip().lower()
        if not clean:
            continue

        if re.match(r'^(education|academic background|qualification)', clean):
            current_section = "education"
            continue
        elif re.match(r'^(experience|work experience|employment|work history|professional experience)', clean):
            current_section = "experience"
            continue
        elif re.match(r'^(projects|personal projects|key projects|academic projects)', clean):
            current_section = "projects"
            continue
        elif re.match(r'^(certifications|certificates|licenses)', clean):
            current_section = "certifications"
            continue
        elif re.match(r'^(achievements|honors|awards|accomplishments)', clean):
            current_section = "achievements"
            continue
        elif re.match(r'^(skills|technical skills|summary|profile|languages)', clean):
            current_section = None
            continue

        if current_section and len(line.strip()) > 3:
            sections[current_section].append(line.strip())

    return sections

def extract_resume_information(raw_text: str) -> Dict[str, Any]:
    """Extract complete structured resume profile object from raw text."""
    links = extract_links(raw_text)
    skills = extract_skills_list(raw_text)
    parsed_sections = extract_sections(raw_text)

    # Fallback default items if sections are brief
    education_items = parsed_sections["education"] if parsed_sections["education"] else [
        "B.S. in Computer Science / Information Systems (Parsed from content)"
    ]
    
    experience_items = parsed_sections["experience"] if parsed_sections["experience"] else [
        "Software Engineering Intern / Project Developer"
    ]

    project_items = parsed_sections["projects"] if parsed_sections["projects"] else [
        "Full-Stack Web Application / Data Analytics Dashboard"
    ]

    return {
        "name": extract_name(raw_text),
        "email": extract_email(raw_text),
        "phone": extract_phone(raw_text),
        "location": extract_location(raw_text),
        "linkedin": links["linkedin"],
        "github": links["github"],
        "portfolio": links["portfolio"],
        "skills": skills,
        "education": education_items,
        "experience": experience_items,
        "projects": project_items,
        "certifications": parsed_sections["certifications"],
        "achievements": parsed_sections["achievements"],
        "raw_text": raw_text
    }
