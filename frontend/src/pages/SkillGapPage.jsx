import React from 'react';
import CareerReadinessRadar from '../components/CareerReadinessRadar';
import SkillGapChart from '../components/SkillGapChart';
import { useAnalysis } from '../context/AnalysisContext';

const SkillGapPage = () => {
  const { currentAnalysis } = useAnalysis();

  return (
    <div className="page-body">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
          Skill Gap Radar & Career Readiness
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Evaluate skill depth across technical domains & 6-point market readiness dimensions
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <CareerReadinessRadar readinessData={currentAnalysis?.career_readiness} />
        <SkillGapChart skillGapData={currentAnalysis?.skill_gap_analysis} />
      </div>
    </div>
  );
};

export default SkillGapPage;
