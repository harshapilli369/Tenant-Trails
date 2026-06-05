import './AISummary.css';

function AISummary({ summary, issues = [] }) {
  return (
    <div className="ai-summary">
      <div className="ai-summary-header">
        <span className="ai-icon">✦</span>
        <span className="ai-label">AI-GENERATED SUMMARY</span>
      </div>
      <p className="ai-summary-text">{summary}</p>
      {issues.length > 0 && (
        <div className="ai-issues">
          <span className="ai-issues-label">Key Issues</span>
          <div className="ai-issue-tags">
            {issues.map((issue) => (
              <span key={issue} className="ai-issue-tag">{issue}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AISummary;
