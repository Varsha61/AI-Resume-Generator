import React from 'react';
import { AlertOctagon, AlertTriangle, ShieldCheck } from 'lucide-react';

const RedFlagsDetector = ({ redFlagsData }) => {
  if (!redFlagsData) return null;

  const flags = redFlagsData.red_flags || [];
  const highCount = redFlagsData.high_severity_count || 0;

  return (
    <div className="glass-panel" style={{ padding: '1.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertOctagon size={20} color="var(--danger)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Resume Red Flag Detector</h3>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Automated check for formatting, passive verbs, missing metrics, and screener turn-offs
          </p>
        </div>
        <span className={`badge ${highCount > 0 ? 'badge-danger' : 'badge-success'}`}>
          {highCount > 0 ? `${highCount} High Priority Flag${highCount > 1 ? 's' : ''}` : 'Clean Audit'}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {flags.map((flag, idx) => (
          <div key={idx} style={{
            background: flag.severity === 'HIGH' ? 'rgba(239, 68, 68, 0.08)' : flag.severity === 'MEDIUM' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(16, 185, 129, 0.08)',
            border: `1px solid ${flag.severity === 'HIGH' ? 'rgba(239, 68, 68, 0.3)' : flag.severity === 'MEDIUM' ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <div style={{ marginTop: '2px' }}>
              {flag.severity === 'HIGH' ? (
                <AlertOctagon size={20} color="var(--danger)" />
              ) : flag.severity === 'MEDIUM' ? (
                <AlertTriangle size={20} color="var(--warning)" />
              ) : (
                <ShieldCheck size={20} color="var(--success)" />
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
                  {flag.title}
                </h4>
                <span className={`badge ${flag.severity === 'HIGH' ? 'badge-danger' : flag.severity === 'MEDIUM' ? 'badge-warning' : 'badge-success'}`}>
                  {flag.severity} SEVERITY
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
                  {flag.category}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>
                {flag.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedFlagsDetector;
