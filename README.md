# ResumeIQ — AI Career & Resume Intelligence Platform 🚀

**ResumeIQ** is a commercial-grade, full-stack AI career intelligence platform designed to help job seekers, developers, data analysts, and fresh graduates analyze their resumes, determine job readiness, optimize ATS compatibility, discover skill gaps, compare resume versions, generate 30-day learning roadmaps, and practice tailored interview questions.

---

## 🌟 Key Features

1. **AI Resume Parsing (PDF & DOCX)**
   - Extracts structured contact details (Name, Email, Phone, Location, LinkedIn, GitHub, Portfolio), technical skills, work history, projects, education, certifications, and achievements.

2. **ATS Compatibility Evaluation (0–100)**
   - Multi-factor evaluation across 8 dimensions: Keyword Relevance, Section Completeness, Formatting Integrity, Skills Relevance, Experience Relevance, Project Strength, Contact Completeness, and Resume Structure.
   - Highlights explicit issues in a *"What is hurting your ATS score?"* breakdown with impact point estimates.

3. **Job Description Matching Engine**
   - Compares candidate resume against user-pasted Job Descriptions.
   - Computes Overall Match %, Required Skills Match (e.g., 8/10), Preferred Skills Match (e.g., 5/8), and Keyword Density Match %.
   - Categorizes skills into `MATCHED SKILLS (✓)`, `MISSING SKILLS (✗)`, and `PARTIAL MATCH (⚡)`.

4. **Career Readiness Score & Radar Visualization**
   - Evaluates candidate market readiness across 6 core dimensions: Resume Strength, Technical Skills, Job Match, Project Strength, Experience, and Interview Readiness.
   - Renders a 6-point radar chart alongside tailored AI feedback.

5. **Skill Gap Radar & Analysis**
   - Groups technical skills across 7 categories (Programming, Databases, Cloud, Data Analytics, Frameworks, Tools, Soft Skills).
   - Quantifies Current Level %, Required Level %, and Gap %.

6. **Personalized 30-Day Learning Roadmap**
   - Generates a customized 4-week action plan with priority tags (`HIGH`, `MEDIUM`, `LOW`), estimated learning hours, why it matters rationale, and practical exercises.

7. **AI Resume Bullet Optimizer**
   - Side-by-side `BEFORE` vs `AFTER` bullet point rewriter that strengthens action verbs, highlights technical keywords, and clarifies achievements without inventing fake metrics or experiences.

8. **Project Strength Analyzer**
   - Rates projects on technical complexity, tech stack diversity, description quality, and real-world impact, providing actionable suggestions.

9. **Resume Red Flag Detector**
   - Scans resume for passive verbs, missing metrics, missing GitHub/LinkedIn links, long text formatting flaws, and missing keywords with severity tags (`HIGH`, `MEDIUM`, `LOW`).

10. **Target Role Recommender**
    - Ranks candidate fit across 8 target roles (*Software Developer, Java Developer, Full Stack Developer, Data Analyst, Business Analyst, Data Scientist, AI/ML Engineer, QA Engineer*).

11. **Context-Aware Interview Preparation**
    - Generates technical, behavioral, project-based, HR, and scenario questions tailored specifically to the user's uploaded resume and target job description, complete with answer key guidance.

12. **Resume Version Comparison (V1 vs V2)**
    - Side-by-side comparison displaying ATS score delta (+18 ATS improvement) and change audit log.

13. **Demo Mode**
    - Instant 1-click *"Try Demo Analysis"* populated with sample FAANG job description and pre-parsed senior full stack resume.

---

## 🏗️ System Architecture

```
[ User Resume PDF/DOCX ]  --->  [ FastAPI Backend (Port 8000) ]  --->  [ MongoDB / Local DB ]
         +                                |
[ Job Description Text ]  --->  [ spaCy & NLP Rule Engines ]
                                          |
                                          v
                               [ React + Vite Dashboard ]
                                (Recharts, Radar, Dark Mode)
```

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), JavaScript, CSS Custom Properties (Variables), Recharts, Lucide Icons, Canvas Confetti.
- **Backend**: Python 3.10+, FastAPI, Uvicorn, PyPDF, Python-DOCX, spaCy NLP, Scikit-Learn, Pydantic.
- **Database**: MongoDB (via Motor async driver) with zero-config local storage fallback.
- **Authentication**: JWT Token Authentication, Passlib bcrypt hashing.

---

## 🚀 Quickstart & Local Installation

### 1. Backend Setup

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
python main.py
```
*Backend API server will run at `http://127.0.0.1:8000` with Swagger docs at `http://127.0.0.1:8000/docs`.*

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
*Frontend application will run at `http://localhost:5173`.*

---

## 📡 REST API Documentation

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | User registration & JWT generation |
| `/api/auth/login` | `POST` | User authentication |
| `/api/resume/upload` | `POST` | PDF/DOCX upload & text entity extraction |
| `/api/analyze/full` | `POST` | Run full analysis suite (ATS, Match, Radar, Roadmap, Interview) |
| `/api/demo` | `GET` | Instant demo payload generator |
| `/api/history` | `GET` | Fetch previous analysis history |
| `/api/history/:id` | `DELETE` | Delete history record by ID |

---

## 💼 Resume Description Snippet (For Portfolio / Interviews)

> **ResumeIQ — AI Career & Resume Intelligence Platform**
> *Full-Stack Developer & AI Engineer*
> - Architected a production-ready AI career platform using React, FastAPI, Python spaCy NLP, and Recharts.
> - Engineered an ATS evaluation & Job Description matching engine analyzing 8 core screening parameters with zero external API latency.
> - Implemented a 6-point Career Readiness Radar, 30-day personalized learning roadmap generator, and tailored interview question engine with zero-config database fallbacks.
