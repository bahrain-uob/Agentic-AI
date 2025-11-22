import React from 'react';
import { useEffect, useState } from 'react';
import './ProgramAnalytics.css';
import ExecutiveOverview from './ExecutiveOverview';
//import { LineChart, BarChart } from 'pychart_service';

// ProgramAnalytics Component - Displays program performance charts and AI analysis
// This component is accessible via /team-a/analytics route
function ProgramAnalytics() {
  // State management for data, loading, and errors
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Tracks which tab is currently active: 'admin' or 'executive'
  const [activeTab, setActiveTab] = useState('admin');


  // Fetch analytics data from backend API
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        setError(null);

      // TODO: Remove this temporary fix when backend is ready
      // Temporary: Simulate successful empty data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
      setAnalyticsData({
        metrics: [],
        narrative: "AI analysis will appear here when backend is connected"
      });
      
      // TODO: Uncomment this when backend is ready

        /*
        // TODO: Replace with actual backend endpoint
        const response = await fetch('/api/analytics/team-a');
        
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        
        const data = await response.json();
        setAnalyticsData(data);
        */
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="program-analytics">
        <p className="back-link">
          <a href="../">← Back to Home</a>
        </p>
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading program analytics...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="program-analytics">
        <p className="back-link">
          <a href="../">← Back to Home</a>
        </p>
        <div className="error-state">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

    // Success state - display charts and AI narrative
  return (
  <div className="program-analytics">
    <p className="back-link">
      <a href="../">← Back to Home</a>
    </p>

    <h1>Analytics Dashboard - Team A</h1>
    
    {/* Tab Navigation - Switch between Admin and Executive views */}
    <div className="analytics-tabs">
      <button 
        className={activeTab === 'admin' ? 'tab-active' : ''}
        onClick={() => setActiveTab('admin')}
      >
        Admin View
      </button>
      <button 
        className={activeTab === 'executive' ? 'tab-active' : ''}
        onClick={() => setActiveTab('executive')}
      >
        Executive Overview
      </button>
    </div>

{/* Admin View - Detailed analytics with real data */}
{activeTab === 'admin' && (
  <div className="tab-content">
    <h1>Admin View</h1>
    <p>Detailed program performance charts and analysis.</p>
    <div className="content-grid">
      <div className="charts-section">
        <h2>Program Performance Metrics</h2>
        <div className="chart-container">
          {/* TODO: Use real charts with analyticsData */}
          <p className="chart-placeholder">
            📊 Charts will show real data from: {analyticsData ? 'Data loaded' : 'Loading...'}
          </p>
        </div>
      </div>

      <div className="narrative-section">
        <h2>AI Analysis</h2>
        <div className="narrative-content">
          {/* TODO: Use real AI narrative */}
          <p>{analyticsData?.narrative || 'AI analysis will appear here'}</p>
        </div>
      </div>
    </div>
  </div>
)}

{/* Executive Overview - Strategic view with same real data */}
{activeTab === 'executive' && (
  <div className="tab-content">
    <ExecutiveOverview analyticsData={analyticsData} />
  </div>
)}
  </div>
);
}

export default ProgramAnalytics;