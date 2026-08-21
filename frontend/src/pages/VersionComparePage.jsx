import React, { useState } from 'react';
import { GitCompare, TrendingUp, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const VersionComparePage = () => {
  const { currentAnalysis } = useAnalysis();

  const [v1Score, setV1Score] = useState(64);
  const [v2Score, setV2Score] = useState(82);

  const delta = v2Score - v1Score;

  const changesList = [
    { title: 'Keywords Added', desc: 'Integrated 4 missing target role keywords (FastAPI, Docker, SQL Indexing, Microservices).', icon: '+ Keywords' },
    { title: 'Project Descriptions Optimized', desc: 'Replaced passive bullet verbs with technical action verbs and quantifiable impact.', icon: '+ Better Bullet Verbs' },
    { title: 'Formatting & Links', desc: 'Added active GitHub and portfolio links to resume contact header.', icon: '+ Added GitHub Link' },
    { title: 'Skills Section Restructured', desc: 'Categorized languages, frameworks, and databases into explicit subheadings.', icon: '+ Skills Grouping' }
  ];

  return (
    <div className="page-body">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
          Resume Version Comparison
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Compare V1 vs V2 resume iterations to measure ATS score growth & content optimization
        </p>
      </div>

      {/* Delta Banner */}
      <div className="glass-panel" style={{
        padding: '2rem',
        marginBottom: '2rem',
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)',
        textAlign: 'center'
      }}>
        <span className="badge badge-success" style={{ marginBottom: '0.5rem' }}>Optimization Result</span>
        <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--success)', margin: '0.2rem 0' }}>
          +{delta} ATS Points Improvement
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Your resume V2 achieves higher keyword density, stronger bullet action verbs, and complete contact link coverage.
        </p>
      </div>

      {/* Side by Side Scores */}
      <div className="grid-2" style={{ marginBottom: '2rem' }}>
        {/* Version 1 */}
        <div className="glass-panel" style={{ padding: '1.75rem', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Resume V1 (Draft)</h3>
            <span className="badge badge-danger">Baseline</span>
          </div>

          <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--danger)', lineHeight: 1 }}>
              {v1Score}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ATS COMPATIBILITY SCORE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <div>• Passive verbs used ('worked on', 'helped with')</div>
            <div>• Missing explicit GitHub profile link</div>
            <div>• Generic project descriptions without metrics</div>
          </div>
        </div>

        {/* Version 2 */}
        <div className="glass-panel" style={{ padding: '1.75rem', borderColor: 'rgba(16, 185, 129, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>Resume V2 (Optimized)</h3>
            <span className="badge badge-success">Active Version</span>
          </div>

          <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
            <div style={{ fontSize: '3.5rem', fontWeight: '800', color: 'var(--success)', lineHeight: 1 }}>
              {v2Score}
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ATS COMPATIBILITY SCORE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: '600' }}>
            <div>✓ Strong active verbs ('Engineered', 'Architected')</div>
            <div>✓ Verified GitHub & Portfolio links included</div>
            <div>✓ Quantifiable technical impact metrics (% speedup, requests/sec)</div>
          </div>
        </div>
      </div>

      {/* Change Audit Trail */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem' }}>
          Key Optimization Audit
        </h3>

        <div className="grid-2">
          {changesList.map((item, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <CheckCircle2 size={18} color="var(--success)" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>{item.title}</h4>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VersionComparePage;
