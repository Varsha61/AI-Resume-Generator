import React from 'react';
import { Calendar, Clock, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

const RoadmapTimeline = ({ roadmapData }) => {
  if (!roadmapData) return null;

  const weeks = roadmapData.weeks || [];

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>
              YOUR 30-DAY PERSONALIZED LEARNING ROADMAP
            </h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Step-by-step action strategy to close skill gaps for {roadmapData.target_role || 'Target Role'}
          </p>
        </div>
        <span className="badge badge-success">High ROI Plan</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {weeks.map((w, idx) => (
          <div key={idx} className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: `4px solid ${w.priority === 'HIGH' ? 'var(--accent-primary)' : w.priority === 'MEDIUM' ? 'var(--accent-secondary)' : 'var(--success)'}`
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent-primary)', textTransform: 'uppercase' }}>
                  {w.week}
                </span>
                <span className={`badge ${w.priority === 'HIGH' ? 'badge-danger' : 'badge-warning'}`}>
                  {w.priority}
                </span>
              </div>

              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                {w.title}
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                <Clock size={14} />
                <span>Est: {w.est_hours}</span>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '1rem', fontStyle: 'italic', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '4px' }}>
                "{w.why_it_matters}"
              </p>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Key Action Tasks:
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {w.practice_tasks && w.practice_tasks.map((task, tIdx) => (
                  <li key={tIdx} style={{ fontSize: '0.75rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                    <CheckCircle2 size={13} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
