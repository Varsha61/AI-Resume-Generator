import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2, RefreshCw, ArrowRight, Sparkles } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import ATSScoreCard from '../components/ATSScoreCard';
import ResumeRewriter from '../components/ResumeRewriter';
import RedFlagsDetector from '../components/RedFlagsDetector';

const AnalyzePage = ({ setActiveTab }) => {
  const { uploadResumeFile, resumeData, currentAnalysis, targetRole, setTargetRole, loading } = useAnalysis();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndUpload = (file) => {
    setErrorMsg('');
    if (!file) return;

    const validExtensions = ['pdf', 'docx', 'doc', 'txt'];
    const ext = file.name.split('.').pop().toLowerCase();
    
    if (!validExtensions.includes(ext)) {
      setErrorMsg('Invalid file format. Please upload a PDF or DOCX file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds maximum allowed limit of 10MB.');
      return;
    }

    setSelectedFile(file);
    uploadResumeFile(file, targetRole);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndUpload(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setErrorMsg('');
  };

  return (
    <div className="page-body">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
          Dedicated Resume Analyzer
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Upload PDF or DOCX format to parse structured entities & evaluate screening compatibility
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Upload Box */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
            Upload Resume Document
          </h3>

          {!selectedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '3rem 2rem',
                textAlign: 'center',
                background: dragActive ? 'rgba(139, 92, 246, 0.05)' : 'var(--bg-primary)',
                transition: 'all 0.25s ease',
                cursor: 'pointer'
              }}
              onClick={() => document.getElementById('resumeFileInput').click()}
            >
              <input
                id="resumeFileInput"
                type="file"
                accept=".pdf,.docx,.doc"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(139, 92, 246, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'var(--accent-primary)'
              }}>
                <UploadCloud size={32} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.35rem' }}>
                Drag and drop your resume here
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Supports PDF or DOCX formats (Up to 10MB)
              </p>
              <button className="btn-secondary" style={{ pointerEvents: 'none' }}>
                Browse Files
              </button>
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={28} color="var(--success)" />
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>{selectedFile.name}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {(selectedFile.size / 1024).toFixed(1)} KB • {loading ? 'Parsing PDF/DOCX...' : 'Successfully Analyzed'}
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => document.getElementById('resumeFileInput').click()} className="btn-secondary" title="Replace File" style={{ padding: '0.4rem' }}>
                    <RefreshCw size={16} />
                  </button>
                  <button onClick={removeFile} className="btn-secondary" title="Remove File" style={{ padding: '0.4rem', color: 'var(--danger)' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {loading && (
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Extracting text entities & running ATS checks...</div>
                  <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div className="scanner-line" style={{ height: '100%', position: 'relative' }}></div>
                  </div>
                </div>
              )}
            </div>
          )}

          {errorMsg && (
            <div style={{ marginTop: '1rem', color: 'var(--danger)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} />
              <span>{errorMsg}</span>
            </div>
          )}

          {!loading && resumeData && (
            <div style={{ marginTop: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>Resume successfully analyzed.</span>
            </div>
          )}
        </div>

        {/* Extracted Information Preview */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1rem' }}>
            Parsed Entity Profile
          </h3>

          {resumeData ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="glass-card" style={{ padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', uppercase: true }}>Candidate Name</span>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{resumeData.name}</div>
                </div>
                <div className="glass-card" style={{ padding: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', uppercase: true }}>Email Address</span>
                  <div style={{ fontWeight: '700', fontSize: '0.85rem' }}>{resumeData.email || 'N/A'}</div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '0.85rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', uppercase: true }}>Extracted Tech Skills</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                  {resumeData.skills && resumeData.skills.map((s, idx) => (
                    <span key={idx} className="badge badge-primary">{s}</span>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ padding: '0.85rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', uppercase: true }}>Projects Extracted ({resumeData.projects?.length || 0})</span>
                <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  {resumeData.projects && resumeData.projects.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <button onClick={() => setActiveTab('matcher')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}>
                <span>Match With Job Description</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Upload a resume document or click "Try Demo" to preview extracted entity attributes.
            </p>
          )}
        </div>
      </div>

      {/* ATS & Red Flags Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <ATSScoreCard atsData={currentAnalysis?.ats_analysis} />
        <RedFlagsDetector redFlagsData={currentAnalysis?.red_flags} />
        <ResumeRewriter suggestionsData={currentAnalysis?.resume_suggestions} />
      </div>
    </div>
  );
};

export default AnalyzePage;
