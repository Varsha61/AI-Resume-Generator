import React from 'react';
import RoadmapTimeline from '../components/RoadmapTimeline';
import { useAnalysis } from '../context/AnalysisContext';

const RoadmapPage = () => {
  const { currentAnalysis } = useAnalysis();

  return (
    <div className="page-body">
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.85rem', fontWeight: '800', margin: 0 }}>
          Personalized 30-Day Skill Roadmap
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
          Actionable weekly milestones to bridge skill gaps, build high-impact projects, and prepare for interviews
        </p>
      </div>

      <RoadmapTimeline roadmapData={currentAnalysis?.learning_roadmap} />
    </div>
  );
};

export default RoadmapPage;
