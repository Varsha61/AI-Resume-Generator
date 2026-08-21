import React, { useState } from 'react';
import { Target, CheckCircle2, XCircle, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const JobMatcherPage = ({ setActiveTab }) => {
  const { jobDescription, setJobDescription, runFullAnalysis, currentAnalysis, loading } = useAnalysis();
  const [localJD, setLocalJD] = useState(jobDescription || '');

  const matchData = currentAnalysis?.job_match_analysis || {};

  const handleMatchSubmit = () => {
    setJobDescription(localJD);
    runFullAnalysis(null, localJD);
  };

  const matchedSkills = matchData.matched_skills || ['Java', 'SQL', 'Python', 'React', 'FastAPI', 'Git', 'REST API', 'Docker'];
  const missingSkills = matchData.missing_skills || ['Power BI', 'Tableau', 'Kubernetes', 'AWS Lambda'];
  const partialSkills = matchData.partial_skills || ['CI/CD Pipelines', 'System Architecture'];

  return (
    <div className="page-body">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
          Job Description Matcher
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Compare your resume against exact job postings to evaluate qualification alignment & missing keywords
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* Input JD Box */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '0.75rem' }}>
            Paste Job Description (JD)
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Paste raw text from LinkedIn, Indeed, or company job boards.
          </p>

          <textarea
            rows={12}
            value={localJD}
            onChange={(e) => setLocalJD(e.target.value)}
            placeholder="Paste complete job description requirements here (e.g. 'Looking for a Senior Developer with 2+ years experience in React, Python, SQL, Power BI...')..."
            style={{
              width: '100%',
              flex: 1,
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none',
              resize: 'none',
              marginBottom: '1rem'
            }}
          />

          <button
            onClick={handleMatchSubmit}
            disabled={loading}
            className="btn-primary"
            style={{ justifyContent: 'center', width: '100%' }}
          >
            <Sparkles size={16} />
            <span>{loading ? 'Matching Job Description...' : 'Run Job Match Analysis'}</span>
          </button>
        </div>

        {/* Match Overview Score Cards */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem' }}>
              Match Summary Metrics
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>OVERALL MATCH</span>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-secondary)', lineHeight: 1.1 }}>
                  {matchData.overall_match || 78}%
                </div>
                <span className="badge badge-info" style={{ marginTop: '0.35rem' }}>Match Rating</span>
              </div>

              <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>KEYWORD MATCH</span>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-primary)', lineHeight: 1.1 }}>
                  {matchData.keyword_match_pct || 82}%
                </div>
                <span className="badge badge-primary" style={{ marginTop: '0.35rem' }}>Keyword Density</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Required Skills</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--success)' }}>
                  {matchData.required_match_count || '8/10'}
                </div>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Preferred Skills</div>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--warning)' }}>
                  {matchData.preferred_match_count || '5/8'}
                </div>
              </div>
            </div>
          </div>

          <button onClick={() => setActiveTab('skillgap')} className="btn-secondary" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem' }}>
            <span>View Skill Gap & Roadmap</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 3 Skill Status Columns: MATCHED SKILLS (✓), MISSING SKILLS (✗), PARTIAL MATCH */}
      <div className="grid-3">
        {/* Column 1: Matched Skills */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <CheckCircle2 size={18} />
            <span>MATCHED SKILLS ({matchedSkills.length})</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {matchedSkills.map((skill, idx) => (
              <div key={idx} style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                <span>{skill}</span>
                <span style={{ color: 'var(--success)' }}>✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Missing Skills */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <XCircle size={18} />
            <span>MISSING SKILLS ({missingSkills.length})</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {missingSkills.map((skill, idx) => (
              <div key={idx} style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                <span>{skill}</span>
                <span style={{ color: 'var(--danger)' }}>✗</span>
              </div>
            ))}
          </div>
        </div>

        {/* Column 3: Partial Match */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <AlertTriangle size={18} />
            <span>PARTIAL MATCH ({partialSkills.length})</span>
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {partialSkills.map((skill, idx) => (
              <div key={idx} style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem 0.85rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: 'var(--text-primary)'
              }}>
                <span>{skill}</span>
                <span style={{ color: 'var(--warning)' }}>⚡</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobMatcherPage;
