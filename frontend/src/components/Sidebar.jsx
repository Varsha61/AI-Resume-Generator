import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Target, 
  BrainCircuit, 
  Map, 
  HelpCircle, 
  History, 
  GitCompare, 
  Settings, 
  Sparkles,
  Zap
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'analyze', label: 'Analyze Resume', icon: FileText },
    { id: 'matcher', label: 'Job Matcher', icon: Target },
    { id: 'skillgap', label: 'Skill Gap & Radar', icon: BrainCircuit },
    { id: 'roadmap', label: 'Career Roadmap', icon: Map },
    { id: 'interview', label: 'Interview Prep', icon: HelpCircle },
    { id: 'version', label: 'Version Compare', icon: GitCompare },
    { id: 'history', label: 'Resume History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside className="sidebar-container" style={{
      width: '260px',
      background: 'var(--bg-secondary)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 40
    }}>
      {/* Brand Header */}
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: 'var(--accent-glow)'
        }}>
          <Sparkles size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, lineHeight: 1 }} className="text-gradient">
            ResumeIQ
          </h2>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.05em' }}>
            CAREER INTELLIGENCE
          </span>
        </div>
      </div>

      {/* Nav Menu */}
      <nav style={{ padding: '1rem 0.75rem', flex: 1, overflowY: 'auto' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '700', padding: '0 0.75rem 0.5rem', textTransform: 'uppercase' }}>
          Platform Navigation
        </div>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1rem',
                margin: '0.2rem 0',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: isActive ? 'var(--accent-gradient)' : 'transparent',
                color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                fontWeight: isActive ? '600' : '500',
                fontSize: '0.9rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? 'var(--accent-glow)' : 'none'
              }}
            >
              <Icon size={18} style={{ color: isActive ? '#FFFFFF' : 'var(--accent-primary)' }} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer Banner */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <div className="glass-card" style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Zap size={16} color="var(--accent-primary)" />
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-primary)' }}>AI Pro Intelligence</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
            Powered by spaCy NLP & Real-time ATS Rule Engine.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
