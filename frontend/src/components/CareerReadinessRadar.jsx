import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ShieldCheck, Sparkles } from 'lucide-react';

const CareerReadinessRadar = ({ readinessData }) => {
  if (!readinessData) return null;

  const score = readinessData.overall_readiness || 74;
  const radarData = readinessData.radar_data || [];
  const explanation = readinessData.explanation || "";

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Career Readiness Score</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Comprehensive 6-dimension evaluation of overall market readiness
          </p>
        </div>
        <div style={{
          background: 'var(--accent-gradient)',
          padding: '0.5rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          color: '#fff',
          fontWeight: '800',
          fontSize: '1.25rem',
          boxShadow: 'var(--accent-glow)'
        }}>
          {score} <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>/ 100</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'center' }}>
        {/* Radar Chart */}
        <div style={{ width: '100%', height: '320px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="var(--border-color)" />
              <PolarAngleAxis dataKey="subject" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12, fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--border-color)" />
              <Radar
                name="Career Readiness"
                dataKey="score"
                stroke="var(--accent-primary)"
                fill="var(--accent-primary)"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Dimension Score List & Action Rationale */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="glass-card" style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Sparkles size={16} color="var(--accent-primary)" />
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--accent-primary)' }}>
                AI Readiness Insight
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
              "{explanation}"
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {radarData.map((item, idx) => (
              <div key={idx} style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.65rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  {item.subject}
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--accent-secondary)' }}>
                  {item.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerReadinessRadar;
