import React from 'react';
import './ClientDataBadge.css';

export default function ClientDataBadge({ email }) {
  if (!email || !email.priority) return null;

  return (
    <div className="client-data-badge">
      <div className="cdb-client-data">
        <div className="cdb-priority-row" title={`Priority: ${email.priority}/5`}>
          <div className="cdb-priority-label">Priority</div>
          <div className="cdb-priority-track">
            <div 
              className={`cdb-priority-fill priority-${email.priority}`} 
              style={{ width: `${(email.priority / 5) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="cdb-tags">
          <span className="cdb-tag cdb-revenue">{email.likelyRevenue}</span>
          {email.justDemoed && <span className="cdb-tag cdb-demo">Demoed</span>}
          {email.initialContact && <span className="cdb-tag cdb-new">New</span>}
        </div>
      </div>
    </div>
  );
}
