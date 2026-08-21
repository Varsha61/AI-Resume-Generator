import React from 'react';
import { 
  FileText, 
  Target, 
  ShieldCheck, 
  BrainCircuit, 
  ArrowUpRight, 
  Sparkles, 
  Calendar, 
  Briefcase 
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import ATSScoreCard from '../components/ATSScoreCard';
import CareerReadinessRadar from '../components/CareerReadinessRadar';
import RoleRecommender from '../components/RoleRecommender';

const Dashboard = ({ setActiveTab }) => {
  const { currentAnalysis, targetRole, loadDemoAnalysis, history } = useAnalysis();

  const atsScore = currentAnalysis?.ats_analysis?.ats_score || 82;
  const jobMatch = currentAnalysis?.job_match_analysis?.overall_match || 78;
  const readiness = currentAnalysis?.career_readiness?.overall_readiness || 74;
  const skillGapsCount = currentAnalysis?.skill_gap_analysis?.skill_gaps?.length || 4;

  return (
    <div className="page-body">
      {/* Top Banner Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
            Career Intelligence Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Target Role: <strong style={{ color: 'var(--accent-primary)' }}>{targetRole}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={() => setActiveTab('analyze')} className="btn-primary">
            <FileText size={16} />
            <span>Upload New Resume</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Metric Cards */}
      <div className="grid-4" style={{ marginBottom: '2rem' }}>
        {/* Metric 1: ATS Score */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--success)'
          }}>
            <FileText size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>ATS SCORE</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--success)', lineHeight: 1.1 }}>
              {atsScore} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: '600' }}>✓ Screen-Ready</span>
          </div>
        </div>

        {/* Metric 2: Job Match */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(6, 182, 212, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-secondary)'
          }}>
            <Target size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>JOB MATCH</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-secondary)', lineHeight: 1.1 }}>
              {jobMatch}%
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600' }}>Vs Target Description</span>
          </div>
        </div>

        {/* Metric 3: Career Readiness */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(139, 92, 246, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>CAREER READINESS</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--accent-primary)', lineHeight: 1.1 }}>
              {readiness} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-primary)', fontWeight: '600' }}>6-Point Radar Evaluated</span>
          </div>
        </div>

        {/* Metric 4: Skill Gaps */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(245, 158, 11, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--warning)'
          }}>
            <BrainCircuit size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>SKILL GAPS</span>
            <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--warning)', lineHeight: 1.1 }}>
              {skillGapsCount} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Detected</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: 'var(--warning)', fontWeight: '600' }}>30-Day Plan Ready</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Radar & ATS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <CareerReadinessRadar readinessData={currentAnalysis?.career_readiness} />
        <ATSScoreCard atsData={currentAnalysis?.ats_analysis} />
      </div>

      {/* Role Recommendations */}
      <div style={{ marginBottom: '2rem' }}>
        <RoleRecommender roleData={currentAnalysis?.role_recommendations} />
      </div>

      {/* Recent Analyses Activity Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Recent Analysis Activity</h3>
          <button onClick={() => setActiveTab('history')} className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}>
            View Full History
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>Target Role</th>
              <th style={{ padding: '0.75rem' }}>ATS Score</th>
              <th style={{ padding: '0.75rem' }}>Job Match</th>
              <th style={{ padding: '0.75rem' }}>Readiness</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {history.slice(0, 3).map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem', fontWeight: '600' }}>{item.target_role}</td>
                <td style={{ padding: '0.75rem', color: 'var(--success)', fontWeight: '700' }}>{item.ats_score}/100</td>
                <td style={{ padding: '0.75rem', color: 'var(--accent-secondary)', fontWeight: '700' }}>{item.job_match}%</td>
                <td style={{ padding: '0.75rem', color: 'var(--accent-primary)', fontWeight: '700' }}>{item.career_readiness}/100</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button onClick={() => setActiveTab('dashboard')} className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
                    View Results
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
