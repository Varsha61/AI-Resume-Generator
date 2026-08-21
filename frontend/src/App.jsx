import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AnalysisProvider, useAnalysis } from './context/AnalysisContext';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ToastNotification from './components/ToastNotification';

import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AnalyzePage from './pages/AnalyzePage';
import JobMatcherPage from './pages/JobMatcherPage';
import SkillGapPage from './pages/SkillGapPage';
import RoadmapPage from './pages/RoadmapPage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import VersionComparePage from './pages/VersionComparePage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';

function AppContent() {
  const [activeTab, setActiveTab] = useState('landing');
  const { currentAnalysis } = useAnalysis();

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'analyze':
        return <AnalyzePage setActiveTab={setActiveTab} />;
      case 'matcher':
        return <JobMatcherPage setActiveTab={setActiveTab} />;
      case 'skillgap':
        return <SkillGapPage setActiveTab={setActiveTab} />;
      case 'roadmap':
        return <RoadmapPage setActiveTab={setActiveTab} />;
      case 'interview':
        return <InterviewPrepPage setActiveTab={setActiveTab} />;
      case 'version':
        return <VersionComparePage setActiveTab={setActiveTab} />;
      case 'history':
        return <HistoryPage setActiveTab={setActiveTab} />;
      case 'settings':
        return <SettingsPage setActiveTab={setActiveTab} />;
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  if (activeTab === 'landing') {
    return (
      <div>
        <LandingPage setActiveTab={setActiveTab} />
        <ToastNotification />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <Header />
        {renderActiveTab()}
      </div>
      <ToastNotification />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AnalysisProvider>
          <AppContent />
        </AnalysisProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
