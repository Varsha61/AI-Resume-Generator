import uuid
import datetime
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from backend.services.pdf_docx_parser import extract_text_from_pdf, extract_text_from_docx, clean_text
from backend.services.extractor import extract_resume_information

router = APIRouter(prefix="/api/resume", tags=["Resume"])

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    target_role: Optional[str] = Form("Software Developer")
):
    filename = file.filename or ""
    content_bytes = await file.read()
    
    if len(content_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    if len(content_bytes) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds maximum allowed limit of 10MB.")

    extracted_raw = ""
    if filename.lower().endswith(".pdf"):
        extracted_raw = extract_text_from_pdf(content_bytes)
    elif filename.lower().endswith(".docx") or filename.lower().endswith(".doc"):
        extracted_raw = extract_text_from_docx(content_bytes)
    else:
        # Attempt text read fallback if uploaded as txt
        try:
            extracted_raw = content_bytes.decode('utf-8', errors='ignore')
        except Exception:
            raise HTTPException(status_code=400, detail="Unsupported file format. Please upload a PDF or DOCX file.")

    cleaned_raw = clean_text(extracted_raw)
    if not cleaned_raw or len(cleaned_raw) < 50:
        raise HTTPException(status_code=400, detail="Could not extract readable text from document. Ensure file is not scanned/password-protected.")

    resume_info = extract_resume_information(cleaned_raw)

    return {
        "status": "success",
        "message": "Resume successfully analyzed.",
        "filename": filename,
        "target_role": target_role,
        "resume_data": resume_info
    }
