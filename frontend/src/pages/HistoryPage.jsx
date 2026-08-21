import React from 'react';
import { History, Eye, Trash2, GitCompare, Sparkles } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const HistoryPage = ({ setActiveTab }) => {
  const { history, deleteHistoryItem, loadDemoAnalysis } = useAnalysis();

  return (
    <div className="page-body">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
            Analysis History
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Persistent storage of previous resume evaluations, job matches, and readiness scores
          </p>
        </div>

        <button onClick={() => setActiveTab('version')} className="btn-secondary">
          <GitCompare size={16} />
          <span>Compare Resume Versions</span>
        </button>
      </div>

      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        {history && history.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '0.85rem' }}>Date & ID</th>
                <th style={{ padding: '0.85rem' }}>Target Job Role</th>
                <th style={{ padding: '0.85rem' }}>ATS Score</th>
                <th style={{ padding: '0.85rem' }}>Job Match %</th>
                <th style={{ padding: '0.85rem' }}>Readiness Score</th>
                <th style={{ padding: '0.85rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.85rem' }}>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{item.id}</div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'Recent'}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem', fontWeight: '600' }}>
                    {item.target_role}
                    {item.is_demo && <span className="badge badge-info" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>DEMO</span>}
                  </td>
                  <td style={{ padding: '0.85rem', color: 'var(--success)', fontWeight: '800' }}>
                    {item.ats_score}/100
                  </td>
                  <td style={{ padding: '0.85rem', color: 'var(--accent-secondary)', fontWeight: '800' }}>
                    {item.job_match}%
                  </td>
                  <td style={{ padding: '0.85rem', color: 'var(--accent-primary)', fontWeight: '800' }}>
                    {item.career_readiness}/100
                  </td>
                  <td style={{ padding: '0.85rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => {
                          loadDemoAnalysis(item.target_role, false);
                          setActiveTab('dashboard');
                        }}
                        className="btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }}
                        title="View Analysis Details"
                      >
                        <Eye size={14} /> View
                      </button>
                      <button
                        onClick={() => deleteHistoryItem(item.id)}
                        className="btn-secondary"
                        style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem', color: 'var(--danger)' }}
                        title="Delete Record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <History size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>No Analysis History Found</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Run your first resume analysis or click "Try Demo" to generate sample evaluation records.
            </p>
            <button onClick={() => loadDemoAnalysis('Software Developer', true)} className="btn-demo">
              <Sparkles size={16} /> Load Demo Record
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
