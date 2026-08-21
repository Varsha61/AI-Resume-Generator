import React from 'react';
import { AlertTriangle, CheckCircle2, Info, ArrowUpRight } from 'lucide-react';

const ATSScoreCard = ({ atsData }) => {
  if (!atsData) return null;

  const score = atsData.ats_score || 0;
  const breakdown = atsData.breakdown || [];
  const hurtingFactors = atsData.hurting_factors || [];

  // SVG Gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getScoreColor = (val) => {
    if (val >= 80) return '#10B981';
    if (val >= 65) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>ATS Compatibility Score</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Screening suitability for {atsData.target_role || 'Target Role'}
          </p>
        </div>
        <span className="badge badge-primary">AI Evaluation</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2rem', alignItems: 'center' }}>
        {/* Circular Gauge Visual */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '170px', height: '170px' }}>
            <svg width="170" height="170" viewBox="0 0 170 170">
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="transparent"
                stroke="var(--border-color)"
                strokeWidth="14"
              />
              <circle
                cx="85"
                cy="85"
                r={radius}
                fill="transparent"
                stroke={getScoreColor(score)}
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 85 85)"
                style={{ transition: 'stroke-dashoffset 1.5s ease' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%', height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: 1, color: getScoreColor(score) }}>
                {score}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>
                OUT OF 100
              </span>
            </div>
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', fontWeight: '600', color: getScoreColor(score) }}>
            {score >= 80 ? '✓ High ATS Compatibility' : score >= 65 ? '⚡ Moderate Compatibility' : '⚠ Action Needed'}
          </div>
        </div>

        {/* 8-Parameter Breakdown Bars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {breakdown.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '0.75rem 1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{item.category}</span>
                <span style={{ fontWeight: '700', color: getScoreColor(item.score) }}>{item.score}%</span>
              </div>
              <div style={{ height: '6px', width: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${item.score}%`,
                  background: getScoreColor(item.score),
                  borderRadius: '3px',
                  transition: 'width 1s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* "What is hurting your ATS score?" Section */}
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning)' }}>
          <AlertTriangle size={18} />
          <span>What is hurting your ATS score?</span>
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {hurtingFactors.map((factor, idx) => (
            <div key={idx} style={{
              background: 'rgba(245, 158, 11, 0.06)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    {factor.title}
                  </span>
                  <span className={`badge ${factor.severity === 'HIGH' ? 'badge-danger' : factor.severity === 'MEDIUM' ? 'badge-warning' : 'badge-info'}`}>
                    {factor.severity}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                  {factor.description}
                </p>
              </div>
              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--danger)' }}>
                  {factor.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ATSScoreCard;
