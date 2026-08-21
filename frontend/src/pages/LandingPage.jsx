import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Target, 
  BrainCircuit, 
  ShieldCheck, 
  HelpCircle, 
  UploadCloud,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const LandingPage = ({ setActiveTab }) => {
  const { loadDemoAnalysis, targetRole } = useAnalysis();

  const handleAnalyzeClick = () => {
    setActiveTab('analyze');
  };

  const handleDemoClick = () => {
    loadDemoAnalysis(targetRole, true);
    setActiveTab('dashboard');
  };

  const benefits = [
    { title: 'AI Resume Analysis', desc: 'Instant multi-factor evaluation of section completeness, formatting & verb strength.', icon: FileText },
    { title: 'ATS Optimization', desc: 'Identify keywords and structural red flags hurting your screener compatibility score.', icon: Target },
    { title: 'Job Matching', desc: 'Compare your exact skill set against job description requirements & missing skills.', icon: TrendingUp },
    { title: 'Skill Gap Detection', desc: 'Uncover category gaps in programming, cloud, databases, and frameworks.', icon: BrainCircuit },
    { title: 'Interview Preparation', desc: 'Generate customized technical, behavioral, and project questions tailored to your resume.', icon: HelpCircle }
  ];

  const steps = [
    { num: '1', title: 'Upload Resume', desc: 'Drop your PDF or DOCX file for structured parsing.' },
    { num: '2', title: 'Add Job Description', desc: 'Paste your target job description requirements.' },
    { num: '3', title: 'Analyze', desc: 'Get ATS score, skill gap radar, and job match metrics.' },
    { num: '4', title: 'Improve', desc: 'Optimize bullets with AI suggestions and 30-day roadmap.' },
    { num: '5', title: 'Prepare', desc: 'Practice customized technical & project interview questions.' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Top Header */}
      <nav style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff'
          }}>
            <Sparkles size={24} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '800' }} className="text-gradient">
            ResumeIQ
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleDemoClick} className="btn-demo">
            <Sparkles size={16} />
            <span>Try Demo</span>
          </button>
          <button onClick={handleAnalyzeClick} className="btn-primary">
            <span>Analyze My Resume</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '4rem 2rem 5rem',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '4rem',
        alignItems: 'center'
      }}>
        <div>
          <span className="badge badge-primary" style={{ marginBottom: '1.5rem', padding: '0.5rem 1rem' }}>
            <Zap size={14} /> AI Career & Resume Intelligence Platform
          </span>
          
          <h1 style={{ fontSize: '3.5rem', lineHeight: '1.15', fontWeight: '800', marginBottom: '1.5rem' }}>
            Turn Your Resume Into Your <span className="text-gradient">Career Strategy.</span>
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Analyze your resume, discover your skill gaps, match yourself with job descriptions, and prepare for your next interview — all in one place.
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button onClick={handleAnalyzeClick} className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              <span>Analyze My Resume</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={handleDemoClick} className="btn-demo" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
              <Sparkles size={18} />
              <span>Try Demo Analysis</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>88%+</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ATS Accuracy</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-secondary)' }}>6-Point</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Readiness Radar</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--success)' }}>30-Day</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Skill Roadmaps</div>
            </div>
          </div>
        </div>

        {/* Animated Resume Graphic */}
        <div style={{ position: 'relative' }}>
          <div className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            <div className="scanner-line"></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-gradient)' }}></div>
                <div>
                  <h4 style={{ fontSize: '1rem', margin: 0 }}>Alex Morgan</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Software Developer</span>
                </div>
              </div>
              <span className="badge badge-success">ATS 82/100</span>
            </div>

            <div className="glass-card" style={{ marginBottom: '1rem', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Key Skills Extracted:</div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span className="badge badge-primary">React</span>
                <span className="badge badge-primary">Python</span>
                <span className="badge badge-primary">FastAPI</span>
                <span className="badge badge-primary">SQL</span>
                <span className="badge badge-primary">Docker</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="glass-card" style={{ padding: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Job Match</span>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--accent-secondary)' }}>78%</div>
              </div>
              <div className="glass-card" style={{ padding: '0.75rem' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Career Readiness</span>
                <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--success)' }}>74/100</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Benefits Section */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.75rem' }}>
            Built For Serious Career Growth
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Everything entry-level developers, data analysts, and engineers need to land top interviews.
          </p>
        </div>

        <div className="grid-3">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div key={idx} className="glass-card" style={{ padding: '1.75rem' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(139, 92, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)',
                  marginBottom: '1.25rem'
                }}>
                  <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.5rem' }}>{b.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{b.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section style={{ background: 'var(--bg-secondary)', padding: '5rem 2rem', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="badge badge-info" style={{ marginBottom: '0.75rem' }}>Simple 5-Step Process</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '800' }}>How ResumeIQ Works</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
            {steps.map((s, idx) => (
              <div key={idx} className="glass-card" style={{ textAlign: 'center', padding: '1.5rem 1rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'var(--accent-gradient)',
                  color: '#fff',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  {s.num}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.35rem' }}>{s.title}</h4>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
        <div className="glass-panel" style={{ padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
            Know Your Resume. Know Your Gap. Know Your Next Step.
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
            Join thousands of college grads and developers optimizing their resumes and acing their job interviews.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button onClick={handleAnalyzeClick} className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              <span>Analyze My Resume Now</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
