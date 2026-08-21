import React from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const ToastNotification = () => {
  const { notification } = useAnalysis();

  if (!notification) return null;

  const { msg, type } = notification;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 100,
      background: type === 'success' ? '#065F46' : type === 'error' ? '#991B1B' : '#1E293B',
      color: '#FFFFFF',
      padding: '0.85rem 1.25rem',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      border: '1px solid rgba(255,255,255,0.2)',
      animation: 'slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      {type === 'success' ? <CheckCircle2 size={18} /> : <Info size={18} />}
      <span style={{ fontSize: '0.88rem', fontWeight: '600' }}>{msg}</span>
    </div>
  );
};

export default ToastNotification;
