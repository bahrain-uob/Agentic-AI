import React from 'react';
import './ExecutiveOverview.css';

// ExecutiveOverview Component - Strategic view using real backend data
function ExecutiveOverview({ analyticsData }) {
  // Will use real data when backend is ready
  // For now, structure is ready but data is empty
  
  return (
    <div className="executive-overview">
      <h1>Executive Overview</h1>
      <p>High-level metrics and strategic insights for leadership.</p>
      
      {/* Key Metrics Section */}
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Enrollments</h3>
          <div className="metric-value">
            {analyticsData?.totalEnrollments ? analyticsData.totalEnrollments.toLocaleString() : '--'}
          </div>
          <div className="metric-trend">
            {analyticsData?.enrollmentTrend || '--'}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Top Program</h3>
          <div className="metric-value">
            {analyticsData?.topProgram || '--'}
          </div>
          <div className="metric-trend">
            {analyticsData?.topProgramEnrollment ? `${analyticsData.topProgramEnrollment} students` : '--'}
          </div>
        </div>
        
        <div className="metric-card">
          <h3>Completion Rate</h3>
          <div className="metric-value">
            {analyticsData?.completionRate || '--'}
          </div>
          <div className="metric-trend">
            {analyticsData?.completionTrend || '--'}
          </div>
        </div>
      </div>

      {/* Strategic AI Narrative */}
      <div className="executive-narrative">
        <h2>Strategic Summary</h2>
        <div className="narrative-content">
          <p>
            {analyticsData?.executiveSummary || 
             'Executive summary will appear here when backend data is available.'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveOverview;