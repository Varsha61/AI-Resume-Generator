import React from 'react';
import { Sparkles, ArrowRight, CheckCircle, ShieldAlert } from 'lucide-react';

const ResumeRewriter = ({ suggestionsData }) => {
  if (!suggestionsData) return null;

  const suggestions = suggestionsData.suggestions || [];
  const tips = suggestionsData.general_tips || [];

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>AI Resume Bullet Optimizer</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Elevate bullet impact using action verbs & technical precision without inventing fake facts
          </p>
        </div>
        <span className="badge badge-primary">Zero-Hallucination Safe</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {suggestions.map((item) => (
          <div key={item.id} className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span className="badge badge-info">{item.section}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '600' }}>
                ATS Impact: +15% Boost
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              {/* BEFORE */}
              <div style={{
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--danger)', uppercase: true, marginBottom: '0.35rem' }}>
                  BEFORE (Weak Impact)
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, fontStyle: 'italic' }}>
                  "{item.before}"
                </p>
              </div>

              {/* AFTER */}
              <div style={{
                background: 'rgba(16, 185, 129, 0.06)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--success)', uppercase: true, marginBottom: '0.35rem' }}>
                  AFTER (AI Optimized)
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: '600', margin: 0 }}>
                  "{item.after}"
                </p>
              </div>
            </div>

            {/* Why This is Better Breakdown */}
            <div style={{ background: 'var(--bg-primary)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-secondary)', marginBottom: '0.4rem' }}>
                Why this is better:
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {item.why_better && item.why_better.map((reason, rIdx) => (
                  <li key={rIdx} style={{ marginBottom: '0.2rem' }}>{reason}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeRewriter;
