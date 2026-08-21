import React from 'react';
import { Search, Sun, Moon, Bell, Sparkles, User, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { targetRole, setTargetRole, loadDemoAnalysis, loading } = useAnalysis();
  const { user } = useAuth();

  const roleOptions = [
    'Software Developer',
    'Java Developer',
    'Full Stack Developer',
    'Data Analyst',
    'Business Analyst',
    'Data Scientist',
    'AI/ML Engineer',
    'QA Engineer'
  ];

  return (
    <header style={{
      height: '70px',
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      backdropFilter: 'blur(12px)'
    }}>
      {/* Search & Target Role Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flex: 1, maxWidth: '600px' }}>
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '260px'
        }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search skills, analyses..."
            style={{
              width: '100%',
              padding: '0.5rem 1rem 0.5rem 2.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Target Role Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', whiteSpace: 'nowrap' }}>Target Role:</span>
          <select
            value={targetRole}
            onChange={(e) => {
              setTargetRole(e.target.value);
              loadDemoAnalysis(e.target.value, true);
            }}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent-primary)',
              background: 'var(--bg-primary)',
              color: 'var(--accent-primary)',
              fontWeight: '600',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {roleOptions.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Demo Analysis CTA */}
        <button
          onClick={() => loadDemoAnalysis(targetRole, true)}
          disabled={loading}
          className="btn-demo"
          style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
        >
          <Sparkles size={16} />
          <span>{loading ? 'Analyzing...' : 'Try Demo Analysis'}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#7C3AED" />}
        </button>

        {/* Notifications */}
        <button style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          width: '38px',
          height: '38px',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          position: 'relative'
        }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '6px',
            right: '6px',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: 'var(--accent-primary)'
          }}></span>
        </button>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', borderLeft: '1px solid var(--border-color)', paddingLeft: '1rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: '700',
            fontSize: '0.85rem'
          }}>
            AM
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              {user?.name || 'Alex Morgan'}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Pro Candidate</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
