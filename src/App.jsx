import { useState, useEffect, useCallback } from 'react';
import { emails as initialEmails } from './data/emails.js';
import TopBar from './components/TopBar.jsx';
import Sidebar from './components/Sidebar.jsx';
import EmailList from './components/EmailList.jsx';
import EmailReader from './components/EmailReader.jsx';
import ComposeModal from './components/ComposeModal.jsx';
import Toast from './components/Toast.jsx';
import AIAgentWidget from './components/AIAgent/AIAgentWidget.jsx';

// ---- Helpers ----
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const diffDays = Math.floor((now - date) / 86400000);
  if (diffDays < 7) return date.toLocaleDateString('en-US', { weekday: 'short' });
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDateFull(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });
}

export default function App() {
  const [emails, setEmails] = useState(() => initialEmails.map(e => ({ ...e })));
  const [currentLabel, setCurrentLabel] = useState('inbox');
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [composeState, setComposeState] = useState({ open: false, mode: 'new', replyToId: null });
  const [toastMsg, setToastMsg] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile only

  // Apply dark mode
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Update page title
  useEffect(() => {
    const unread = emails.filter(e => e.label === 'inbox' && !e.read).length;
    document.title = unread > 0 ? `(${unread}) InstaLily Mail` : 'InstaLily Mail';
  }, [emails]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (composeState.open) setComposeState(s => ({ ...s, open: false }));
        else if (selectedEmailId) setSelectedEmailId(null);
      }
      if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        setComposeState({ open: true, mode: 'new', replyToId: null });
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [composeState.open, selectedEmailId]);

  // ---- Filtered emails ----
  const filteredEmails = emails.filter(e => {
    const matchLabel =
      currentLabel === 'inbox' ? e.label === 'inbox' :
      currentLabel === 'starred' ? e.starred :
      currentLabel === 'sent' ? e.label === 'sent' :
      currentLabel === 'drafts' ? e.label === 'draft' :
      currentLabel === 'spam' ? e.label === 'spam' :
      currentLabel === 'trash' ? e.label === 'trash' : true;
    if (!matchLabel) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.from.toLowerCase().includes(q) ||
      e.subject.toLowerCase().includes(q) ||
      e.snippet.toLowerCase().includes(q) ||
      e.body.toLowerCase().includes(q)
    );
  });

  const unreadCount = emails.filter(e => e.label === 'inbox' && !e.read).length;

  const showToast = useCallback((msg) => setToastMsg(msg), []);

  // ---- Actions ----
  const openEmail = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, read: true } : e));
    setSelectedEmailId(id);
  };

  const closeReader = () => setSelectedEmailId(null);

  const toggleStar = (id) => {
    setEmails(prev => prev.map(e => {
      if (e.id !== id) return e;
      const starred = !e.starred;
      showToast(starred ? 'Conversation starred' : 'Conversation unstarred');
      return { ...e, starred };
    }));
  };

  const archiveEmail = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, label: 'archived' } : e));
    showToast('Conversation archived');
    closeReader();
  };

  const deleteEmail = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, label: 'trash' } : e));
    showToast('Conversation moved to Trash');
    closeReader();
  };

  const markUnread = (id) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, read: false } : e));
    showToast('Marked as unread');
    closeReader();
  };

  const handleSetLabel = (label) => {
    setCurrentLabel(label);
    setSelectedEmailId(null);
    setSearchQuery('');
    setSidebarOpen(false);
  };

  const openCompose = (mode = 'new', replyToId = null) => {
    setComposeState({ open: true, mode, replyToId });
  };

  const sendEmail = (to) => {
    if (!to) { showToast('Please specify a recipient'); return false; }
    setComposeState(s => ({ ...s, open: false }));
    showToast('Message sent');
    return true;
  };

  const selectedEmail = emails.find(e => e.id === selectedEmailId) || null;
  const hasReader = selectedEmail !== null;

  return (
    <div className="app-container">
      <TopBar
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        onMenuToggle={() => setSidebarOpen(o => !o)}
      />

      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <Sidebar
        currentLabel={currentLabel}
        onSetLabel={handleSetLabel}
        onCompose={() => openCompose('new')}
        unreadCount={unreadCount}
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-area">
        <EmailList
          emails={filteredEmails}
          currentLabel={currentLabel}
          selectedEmailId={selectedEmailId}
          isFullWidth={!hasReader}
          onOpenEmail={openEmail}
          onToggleStar={toggleStar}
        />

        <EmailReader
          email={selectedEmail}
          isOpen={hasReader}
          onClose={closeReader}
          onArchive={archiveEmail}
          onDelete={deleteEmail}
          onMarkUnread={markUnread}
          onToggleStar={toggleStar}
          onReply={(id) => openCompose('reply', id)}
          onForward={(id) => openCompose('forward', id)}
        />
      </div>

      <ComposeModal
        state={composeState}
        emails={emails}
        onClose={() => setComposeState(s => ({ ...s, open: false }))}
        onSend={sendEmail}
      />

      <AIAgentWidget />

      <Toast message={toastMsg} onDone={() => setToastMsg('')} />
    </div>
  );
}
