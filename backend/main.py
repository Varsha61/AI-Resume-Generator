import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import auth, resume, analyze, history

app = FastAPI(
    title="ResumeIQ — AI Career & Resume Intelligence Platform API",
    description="Full-Stack FastAPI backend for ATS analysis, Job Matching, Skill Gap detection, 30-Day Roadmaps, and Interview Preparation.",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite default port 5173 / 3000 / wildcard)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(auth.router)
app.include_router(resume.router)
app.include_router(analyze.router)
app.include_router(history.router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "app": "ResumeIQ — AI Career & Resume Intelligence Platform API",
        "docs": "/docs",
        "version": "1.0.0"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
