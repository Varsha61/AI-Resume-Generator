import React from 'react';
import { Code, CheckCircle2, AlertCircle, Lightbulb } from 'lucide-react';

const ProjectAnalyzer = ({ projectData }) => {
  if (!projectData) return null;

  const projects = projectData.projects || [];
  const overallScore = projectData.overall_project_score || 80;

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Project Strength Analyzer</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Evaluating technical depth, technology diversity, description quality & problem clarity
          </p>
        </div>
        <div style={{
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid var(--accent-primary)',
          color: 'var(--accent-primary)',
          fontWeight: '700',
          fontSize: '0.9rem',
          padding: '0.4rem 0.85rem',
          borderRadius: 'var(--radius-md)'
        }}>
          Avg Score: {overallScore}/100
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {projects.map((proj) => (
          <div key={proj.id} className="glass-card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{proj.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>{proj.description}</p>
              </div>
              <div style={{
                background: proj.strength_score >= 80 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                color: proj.strength_score >= 80 ? 'var(--success)' : 'var(--warning)',
                padding: '0.35rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontWeight: '800',
                fontSize: '0.9rem'
              }}>
                {proj.strength_score}/100
              </div>
            </div>

            {/* Evaluation Metrics Pill row */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className="badge badge-info">Complexity: {proj.evaluations?.technical_complexity}</span>
              <span className="badge badge-primary">Stack: {proj.evaluations?.technology_diversity}</span>
              <span className="badge badge-success">Quality: {proj.evaluations?.description_quality}</span>
              <span className="badge badge-warning">Impact: {proj.evaluations?.real_world_impact}</span>
            </div>

            {/* Improvement Suggestions */}
            {proj.suggestions && proj.suggestions.length > 0 && (
              <div style={{ background: 'var(--bg-primary)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                  <Lightbulb size={14} /> Actionable Suggestions:
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  {proj.suggestions.map((sug, sIdx) => (
                    <li key={sIdx} style={{ marginBottom: '0.15rem' }}>{sug}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectAnalyzer;
