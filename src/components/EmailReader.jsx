import { formatDateFull } from '../App.jsx';
import ClientDataBadge from './AIAgent/ClientDataBadge.jsx';

function StarIcon({ filled }) {
  return filled
    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f4b400" width="20" height="20"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default function EmailReader({ email, isOpen, onClose, onArchive, onDelete, onMarkUnread, onToggleStar, onReply, onForward }) {
  if (!email) {
    return (
      <section
        className="email-reader"
        id="email-reader"
        aria-label="Email reader"
        style={{ display: 'flex', flex: 1 }}
      >
        <div className="reader-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <span>Select an email to read</span>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`email-reader${isOpen ? ' open' : ''}`}
      id="email-reader"
      aria-label="Email reader"
      style={{ flex: 1 }}
    >
      <div className="reader-toolbar">
        <button className="icon-btn" id="back-btn" data-tooltip="Back to inbox" aria-label="Back" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
        </button>
        <button className="icon-btn" data-tooltip="Archive" aria-label="Archive" onClick={() => onArchive(email.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
        </button>
        <button className="icon-btn" data-tooltip="Delete" aria-label="Delete" onClick={() => onDelete(email.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
        <button className="icon-btn" data-tooltip="Mark as unread" aria-label="Mark unread" onClick={() => onMarkUnread(email.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        </button>
      </div>

      <div className="reader-content">
        <h1 className="reader-subject">{email.subject}</h1>
        <div className="reader-header">
          <div className="reader-avatar" style={{ background: email.avatarColor }}>{email.avatar}</div>
          <div className="reader-meta" style={{ flex: 1 }}>
            <div className="reader-from-name">
              {email.from}{' '}
              <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>&lt;{email.fromEmail}&gt;</span>
            </div>
            <div className="reader-from-email">to me</div>
            <div className="reader-date-full">{formatDateFull(email.date)}</div>
          </div>
          <div className="reader-client-data" style={{ marginRight: '16px' }}>
            <ClientDataBadge email={email} />
          </div>
          <div className="reader-actions">
            <button
              className="icon-btn"
              data-tooltip={email.starred ? 'Unstar' : 'Star'}
              onClick={() => onToggleStar(email.id)}
              aria-label="Star"
            >
              <StarIcon filled={email.starred} />
            </button>
            <button className="icon-btn" data-tooltip="More" aria-label="More">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
            </button>
          </div>
        </div>
        <div className="reader-divider" />
        <div className="reader-body" dangerouslySetInnerHTML={{ __html: escapeHtml(email.body) }} />
      </div>

      <div className="reply-bar">
        <button className="reply-btn" onClick={() => onReply(email.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
          Reply
        </button>
        <button className="reply-btn" onClick={() => onForward(email.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>
          Forward
        </button>
      </div>
    </section>
  );
}
