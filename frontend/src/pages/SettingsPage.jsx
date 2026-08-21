import React from 'react';
import { Settings, Shield, Cpu, Key, Database, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAnalysis } from '../context/AnalysisContext';

const SettingsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const { targetRole, setTargetRole } = useAnalysis();

  return (
    <div className="page-body">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
          Platform Settings & Configuration
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Manage target role benchmarks, visual themes, database persistence, and AI service providers
        </p>
      </div>

      <div className="grid-2">
        {/* Settings Panel 1: Target Role & Theme */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} color="var(--accent-primary)" />
            <span>Target Role & Interface Preferences</span>
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Default Target Industry Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                fontWeight: '600',
                outline: 'none'
              }}
            >
              <option value="Software Developer">Software Developer</option>
              <option value="Java Developer">Java Developer</option>
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="Data Scientist">Data Scientist</option>
              <option value="AI/ML Engineer">AI/ML Engineer</option>
              <option value="QA Engineer">QA Engineer</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Appearance Mode
            </label>
            <button
              onClick={toggleTheme}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'space-between', padding: '0.75rem 1rem' }}
            >
              <span>Current Theme: <strong>{theme === 'dark' ? 'Dark Obsidian Mode' : 'Light Slate Mode'}</strong></span>
              {theme === 'dark' ? <Sun size={18} color="#F59E0B" /> : <Moon size={18} color="#7C3AED" />}
            </button>
          </div>
        </div>

        {/* Settings Panel 2: AI & Database Infrastructure */}
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={18} color="var(--accent-secondary)" />
            <span>AI & Database Architecture</span>
          </h3>

          <div className="glass-card" style={{ padding: '1rem', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              NLP & Extraction Engine
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Deterministic spaCy / Regex NLP parsing layer active. Zero external API dependency required.
            </div>
          </div>

          <div className="glass-card" style={{ padding: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
              Database Connection Status
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--success)', fontWeight: '600' }}>
              ✓ Async Database Store Active (MongoDB Motor + Zero-Config Fallback)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
