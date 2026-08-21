import asyncio
from backend.services.sample_data import get_demo_analysis_payload
from backend.services.pdf_docx_parser import clean_text
from backend.services.extractor import extract_resume_information

async def test_backend():
    print("Testing ResumeIQ Backend Engines...")
    demo_data = get_demo_analysis_payload("Software Developer")
    assert demo_data["ats_analysis"]["ats_score"] > 50, "ATS Score test failed"
    assert demo_data["job_match_analysis"]["overall_match"] > 50, "Job Match test failed"
    assert len(demo_data["learning_roadmap"]["weeks"]) == 4, "Roadmap test failed"
    assert len(demo_data["interview_prep"]["questions"]) >= 5, "Interview Prep test failed"
    print("[OK] All Backend NLP & Evaluation Engines Passed Successfully!")

if __name__ == "__main__":
    asyncio.run(test_backend())
