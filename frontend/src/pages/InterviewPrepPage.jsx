import React, { useState } from 'react';
import { HelpCircle, Sparkles, Filter, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const InterviewPrepPage = () => {
  const { currentAnalysis, targetRole, loading } = useAnalysis();
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

  const questionsData = currentAnalysis?.interview_prep || {};
  const questionsList = questionsData.questions || [];

  const filteredQuestions = selectedDifficulty === 'All'
    ? questionsList
    : questionsList.filter(q => q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());

  return (
    <div className="page-body">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
            Interview Preparation Generator
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Context-aware interview questions generated strictly from your resume & target JD for {targetRole}
          </p>
        </div>

        {/* Difficulty Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-muted)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontWeight: '600',
              fontSize: '0.85rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;
          return (
            <div key={q.id} className="glass-panel" style={{ padding: '1.5rem', transition: 'all 0.25s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="badge badge-primary">{q.category}</span>
                  <span className={`badge ${q.difficulty === 'Hard' ? 'badge-danger' : q.difficulty === 'Medium' ? 'badge-warning' : 'badge-success'}`}>
                    {q.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.65rem' }}
                >
                  <span>{isExpanded ? 'Hide Answer Key' : 'View Answer Key'}</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.4' }}>
                {q.question}
              </h3>

              {isExpanded && (
                <div style={{
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--border-color)',
                  background: 'rgba(139, 92, 246, 0.05)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>
                    <BookOpen size={16} /> STAR Framework & Technical Answer Guidance:
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                    {q.suggested_answer_hints}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewPrepPage;
