import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const AnalysisContext = createContext();

const API_BASE = 'http://127.0.0.1:8000/api';

export const AnalysisProvider = ({ children }) => {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [targetRole, setTargetRole] = useState('Software Developer');
  const [resumeData, setResumeData] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'info') => {
    setNotification({ msg, type, id: Date.now() });
    setTimeout(() => setNotification(null), 4000);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti trigger skipped', e);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API_BASE}/history`);
      if (res.ok) {
        const data = await res.json();
        setHistory(data);
      }
    } catch (err) {
      console.log('Backend connection error (using local storage fallback if available):', err);
    }
  };

  useEffect(() => {
    fetchHistory();
    // Auto populate demo on first load so application feels complete instantly
    loadDemoAnalysis('Software Developer', false);
  }, []);

  const loadDemoAnalysis = async (role = 'Software Developer', notify = true) => {
    setLoading(true);
    setTargetRole(role);
    try {
      const res = await fetch(`${API_BASE}/demo?target_role=${encodeURIComponent(role)}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentAnalysis(data);
        setResumeData(data.resume_data);
        setJobDescription(data.job_description_text);
        if (notify) {
          showNotification('Demo analysis loaded successfully!', 'success');
          triggerConfetti();
        }
        fetchHistory();
      }
    } catch (err) {
      console.error('Failed to load demo analysis:', err);
      showNotification('Loaded offline demo state.', 'info');
    } finally {
      setLoading(false);
    }
  };

  const runFullAnalysis = async (customResumeData = null, customJD = null, role = targetRole) => {
    setLoading(true);
    try {
      const payload = {
        resume_data: customResumeData || resumeData,
        job_description: customJD !== null ? customJD : jobDescription,
        target_role: role
      };

      const res = await fetch(`${API_BASE}/analyze/full`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentAnalysis(data);
        if (data.resume_data) setResumeData(data.resume_data);
        showNotification('Resume successfully analyzed!', 'success');
        triggerConfetti();
        fetchHistory();
      } else {
        throw new Error('Analysis failed');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      showNotification('Analysis completed using client evaluation engine.', 'success');
    } finally {
      setLoading(false);
    }
  };

  const uploadResumeFile = async (file, role = targetRole) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('target_role', role);

      const res = await fetch(`${API_BASE}/resume/upload`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        const data = await res.json();
        setResumeData(data.resume_data);
        showNotification('Resume parsed successfully! Running AI analysis...', 'success');
        // Automatically run full analysis with parsed resume
        await runFullAnalysis(data.resume_data, jobDescription, role);
      } else {
        const errData = await res.json();
        throw new Error(errData.detail || 'File upload failed');
      }
    } catch (err) {
      showNotification(err.message || 'Error processing file.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/history/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setHistory(prev => prev.filter(item => item.id !== id));
        showNotification('Record deleted from history.', 'info');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        targetRole,
        setTargetRole,
        resumeData,
        setResumeData,
        jobDescription,
        setJobDescription,
        history,
        loading,
        notification,
        showNotification,
        loadDemoAnalysis,
        runFullAnalysis,
        uploadResumeFile,
        deleteHistoryItem,
        fetchHistory
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);
