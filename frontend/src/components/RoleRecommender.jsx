import React from 'react';
import { Briefcase, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const RoleRecommender = ({ roleData }) => {
  const { loadDemoAnalysis } = useAnalysis();
  if (!roleData) return null;

  const matches = roleData.best_matches || [];

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Briefcase size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Job Role Recommender</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Best fitting industry roles based on candidate skill set & experience
          </p>
        </div>
        <span className="badge badge-primary">Market Fit Engine</span>
      </div>

      <div className="grid-2">
        {matches.map((item, idx) => (
          <div key={idx} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {idx + 1}. {item.role}
                </h4>
                <div style={{
                  background: 'var(--accent-gradient)',
                  color: '#fff',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-md)'
                }}>
                  {item.match_percentage}% Match
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                {item.description}
              </p>

              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--success)', marginBottom: '0.25rem' }}>
                  ✓ Strong Skills Matched:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {item.strong_skills && item.strong_skills.map((s, sIdx) => (
                    <span key={sIdx} className="badge badge-success" style={{ textTransform: 'none' }}>{s}</span>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--warning)', marginBottom: '0.25rem' }}>
                  ⚠ Missing Skills:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {item.missing_skills && item.missing_skills.map((s, sIdx) => (
                    <span key={sIdx} className="badge badge-warning" style={{ textTransform: 'none' }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => loadDemoAnalysis(item.role, true)}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '0.5rem' }}
            >
              <span>Analyze for {item.role}</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleRecommender;
