export default function TopBar({ searchQuery, onSearch, darkMode, onToggleDark, onMenuToggle }) {
  return (
    <header className="topbar">
      <button className="hamburger-btn" onClick={onMenuToggle} aria-label="Open menu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>

      <a className="topbar-logo" href="#" aria-label="InstaLily Mail">
        <div className="logo-icon">
          <svg className="logo-svg" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="14" r="5" fill="#1a73e8"/>
            <ellipse cx="20" cy="5" rx="3.5" ry="5" fill="#34a853" transform="rotate(-15 20 5)"/>
            <ellipse cx="28" cy="9" rx="3.5" ry="5" fill="#fbbc04" transform="rotate(45 28 9)"/>
            <ellipse cx="28" cy="19" rx="3.5" ry="5" fill="#ea4335" transform="rotate(105 28 19)"/>
            <ellipse cx="20" cy="23" rx="3.5" ry="5" fill="#1a73e8" transform="rotate(165 20 23)"/>
            <ellipse cx="12" cy="19" rx="3.5" ry="5" fill="#34a853" transform="rotate(-105 12 19)"/>
            <ellipse cx="12" cy="9" rx="3.5" ry="5" fill="#fbbc04" transform="rotate(-45 12 9)"/>
          </svg>
        </div>
        <span className="logo-text">Insta<span>Lily</span></span>
      </a>

      <div className="search-bar">
        <span className="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          type="search"
          id="search-input"
          placeholder="Search mail"
          autoComplete="off"
          aria-label="Search mail"
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
        />
      </div>

      <div className="topbar-actions">
        <button className="icon-btn" id="dark-toggle" onClick={onToggleDark} data-tooltip="Toggle dark mode" aria-label="Toggle dark mode">
          {darkMode
            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          }
        </button>
        <button className="icon-btn" data-tooltip="Settings" aria-label="Settings">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </button>
        <button className="icon-btn" data-tooltip="Google apps" aria-label="Google apps">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="4" height="4" rx="0.5"/><rect x="10" y="3" width="4" height="4" rx="0.5"/><rect x="17" y="3" width="4" height="4" rx="0.5"/><rect x="3" y="10" width="4" height="4" rx="0.5"/><rect x="10" y="10" width="4" height="4" rx="0.5"/><rect x="17" y="10" width="4" height="4" rx="0.5"/><rect x="3" y="17" width="4" height="4" rx="0.5"/><rect x="10" y="17" width="4" height="4" rx="0.5"/><rect x="17" y="17" width="4" height="4" rx="0.5"/></svg>
        </button>
        <button className="avatar-btn" aria-label="Account" title="sales@instalily.com">SL</button>
      </div>
    </header>
  );
}
