import { formatDate } from '../App.jsx';

function StarIcon({ filled }) {
  return filled
    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
}

function EmailRow({ email, isSelected, isFullWidth, onOpen, onStar }) {
  const handleRowClick = (e) => {
    if (e.target.closest('.email-star')) return;
    onOpen(email.id);
  };

  const subjectLine = isFullWidth
    ? <>{email.subject} <span className="email-snippet-text">— {email.snippet}</span></>
    : email.subject;

  return (
    <div
      className={`email-row${email.read ? '' : ' unread'}${isSelected ? ' selected' : ''}`}
      onClick={handleRowClick}
      role="row"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') onOpen(email.id); }}
    >
      <div className="email-avatar" style={{ background: email.avatarColor }}>{email.avatar}</div>
      <button
        className={`email-star${email.starred ? ' starred' : ''}`}
        onClick={e => { e.stopPropagation(); onStar(email.id); }}
        aria-label={email.starred ? 'Unstar email' : 'Star email'}
      >
        <StarIcon filled={email.starred} />
      </button>
      <div className="email-info">
        <div className="email-info-top">
          <span className="email-sender">{email.from}</span>
          <span className="email-date">{formatDate(email.date)}</span>
        </div>
        <div className="email-subject-line">{subjectLine}</div>
        <div className="email-subject-snippet">
          <span className="email-snippet-text">{email.snippet}</span>
        </div>
      </div>
    </div>
  );
}

const LABEL_TITLES = {
  inbox: 'Inbox', starred: 'Starred', sent: 'Sent',
  drafts: 'Drafts', spam: 'Spam', trash: 'Trash'
};

export default function EmailList({ emails, currentLabel, selectedEmailId, isFullWidth, onOpenEmail, onToggleStar }) {
  return (
    <section
      className={`email-list-panel${isFullWidth ? ' fullwidth' : ''}`}
      id="email-list-panel"
      aria-label="Email list"
    >
      <div className="list-toolbar">
        <span className="list-toolbar-title">{LABEL_TITLES[currentLabel] || currentLabel}</span>
      </div>
      <div className="email-list" id="email-list" role="list" aria-label="Emails">
        {emails.length === 0 ? (
          <div className="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <p>No emails found</p>
          </div>
        ) : (
          emails.map(email => (
            <EmailRow
              key={email.id}
              email={email}
              isSelected={selectedEmailId === email.id}
              isFullWidth={isFullWidth}
              onOpen={onOpenEmail}
              onStar={onToggleStar}
            />
          ))
        )}
      </div>
    </section>
  );
}
