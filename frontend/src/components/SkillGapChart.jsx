import React from 'react';
import { Layers, AlertCircle, CheckCircle } from 'lucide-react';

const SkillGapChart = ({ skillGapData }) => {
  if (!skillGapData) return null;

  const categories = skillGapData.categories || [];
  const skillGaps = skillGapData.skill_gaps || [];

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={20} color="var(--accent-secondary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Skill Gap Analysis</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Comparing candidate proficiency against target role benchmarks
          </p>
        </div>
        <span className="badge badge-info">Real-Time Depth Check</span>
      </div>

      {/* Key Individual Skill Gaps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Key Technical Skill Benchmarks
        </h4>

        {skillGaps.map((item, idx) => (
          <div key={idx} className="glass-card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                {item.skill}
              </span>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current: <strong style={{ color: 'var(--accent-primary)' }}>{item.current}%</strong></span>
                <span style={{ color: 'var(--text-muted)' }}>Required: <strong style={{ color: 'var(--text-primary)' }}>{item.required}%</strong></span>
                <span style={{ color: 'var(--danger)', fontWeight: '700' }}>Gap: {item.gap}%</span>
              </div>
            </div>

            {/* Stacked Progress Bar */}
            <div style={{ height: '10px', width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '5px', overflow: 'hidden', position: 'relative' }}>
              {/* Current Level Fill */}
              <div style={{
                height: '100%',
                width: `${item.current}%`,
                background: 'var(--accent-primary)',
                borderRadius: '5px',
                transition: 'width 1s ease'
              }} />
              {/* Gap Marker overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: `${item.current}%`,
                width: `${item.gap}%`,
                height: '100%',
                background: 'rgba(239, 68, 68, 0.4)',
                borderLeft: '1px dashed var(--danger)'
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Category Depth Grid */}
      <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
        Skill Category Breakdown
      </h4>
      <div className="grid-3">
        {categories.map((cat, idx) => (
          <div key={idx} style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-primary)' }}>{cat.category}</span>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: cat.gap > 20 ? 'var(--warning)' : 'var(--success)' }}>
                {cat.gap > 20 ? `${cat.gap}% Gap` : 'Matched'}
              </span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minHeight: '32px' }}>
              {cat.detected_skills && cat.detected_skills.length > 0 ? (
                <span>Detected: <strong style={{ color: 'var(--text-secondary)' }}>{cat.detected_skills.join(', ')}</strong></span>
              ) : (
                <span style={{ color: 'var(--danger)' }}>No direct skills detected</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillGapChart;
