const NAV_ITEMS = [
  {
    label: 'inbox', text: 'Inbox',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
  },
  {
    label: 'starred', text: 'Starred',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  },
  {
    label: 'sent', text: 'Sent',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
  },
  {
    label: 'drafts', text: 'Drafts',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
  },
];

const BOTTOM_ITEMS = [
  {
    label: 'spam', text: 'Spam',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
  },
  {
    label: 'trash', text: 'Trash',
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
  },
];

export default function Sidebar({ currentLabel, onSetLabel, onCompose, unreadCount, mobileOpen }) {
  return (
    <nav className={`sidebar${mobileOpen ? ' mobile-open' : ''}`} role="navigation" aria-label="Mailbox folders">
      <button className="compose-btn" onClick={onCompose} aria-label="Compose new email">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        <span>Compose</span>
      </button>

      <div className="nav-section">
        {NAV_ITEMS.map(item => (
          <button
            key={item.label}
            className={`nav-item${currentLabel === item.label ? ' active' : ''}`}
            data-label={item.label}
            onClick={() => onSetLabel(item.label)}
            aria-label={item.text}
          >
            {item.icon}
            <span className="nav-label">{item.text}</span>
            {item.label === 'inbox' && unreadCount > 0 && (
              <span className="nav-badge" id="inbox-badge">{unreadCount}</span>
            )}
          </button>
        ))}

        <div className="nav-divider" />

        {BOTTOM_ITEMS.map(item => (
          <button
            key={item.label}
            className={`nav-item${currentLabel === item.label ? ' active' : ''}`}
            data-label={item.label}
            onClick={() => onSetLabel(item.label)}
            aria-label={item.text}
          >
            {item.icon}
            <span className="nav-label">{item.text}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
