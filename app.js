/* ===== app.js — InstaLily Gmail Clone ===== */

// ---- State ----
let currentLabel = 'inbox';
let selectedEmailId = null;
let searchQuery = '';

// ---- Panel refs ----
const emailListPanel = () => document.getElementById('email-list-panel');
const emailReaderPanel = () => document.getElementById('email-reader');

// ---- DOM References ----
const emailListEl = document.getElementById('email-list');
const emailReaderEl = document.getElementById('email-reader');
const searchInput = document.getElementById('search-input');
const composeOverlay = document.getElementById('compose-overlay');
const toastEl = document.getElementById('toast');
let toastTimer = null;

// ---- Helpers ----
function formatDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  }
  const diffDays = Math.floor((now - date) / 86400000);
  if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateFull(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: 'numeric', minute: '2-digit'
  });
}

function getFilteredEmails() {
  return emails.filter(e => {
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
}

function getUnreadCount(label) {
  return emails.filter(e => {
    if (label === 'inbox') return e.label === 'inbox' && !e.read;
    if (label === 'starred') return e.starred && !e.read;
    return false;
  }).length;
}

// ---- Render Email List ----
function renderEmailList() {
  const filtered = getFilteredEmails();
  emailListEl.innerHTML = '';

  if (filtered.length === 0) {
    emailListEl.innerHTML = `
      <div style="padding:48px;text-align:center;color:var(--text-secondary)">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.3;margin-bottom:12px"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        <p style="font-size:16px;margin-top:8px">No emails found</p>
      </div>`;
    return;
  }

  filtered.forEach(email => {
    const row = document.createElement('div');
    row.className = `email-row${email.read ? '' : ' unread'}${selectedEmailId === email.id ? ' selected' : ''}`;
    row.dataset.id = email.id;

    const isFullWidth = emailListPanel() && emailListPanel().classList.contains('fullwidth');

    row.innerHTML = `
      <div class="email-avatar" style="background:${email.avatarColor}">${email.avatar}</div>
      <button class="email-star${email.starred ? ' starred' : ''}" data-id="${email.id}" aria-label="Star email">
        ${email.starred
          ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
          : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
        }
      </button>
      <div class="email-info">
        <div class="email-info-top">
          <span class="email-sender">${email.from}</span>
          <span class="email-date">${formatDate(email.date)}</span>
        </div>
        <div class="email-subject-line">${
          isFullWidth
            ? `${email.subject} <span class="email-snippet-text">— ${email.snippet}</span>`
            : email.subject
        }</div>
        <div class="email-subject-snippet">
          <span class="email-snippet-text">${email.snippet}</span>
        </div>
      </div>`;

    row.addEventListener('click', (e) => {
      if (e.target.closest('.email-star')) return;
      openEmail(email.id);
    });

    const starBtn = row.querySelector('.email-star');
    starBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleStar(email.id);
    });

    emailListEl.appendChild(row);
  });

  updateBadges();
}

// ---- Open Email ----
function openEmail(id) {
  const email = emails.find(e => e.id === id);
  if (!email) return;

  // Mark as read
  email.read = true;
  selectedEmailId = id;

  // Switch from full-width list to split-panel view
  const panel = emailListPanel();
  const reader = emailReaderPanel();
  if (panel) {
    panel.classList.remove('fullwidth');
    panel.style.width = '420px';
    panel.style.minWidth = '280px';
    panel.style.flexShrink = '0';
  }
  if (reader) reader.style.display = '';

  renderEmailList();
  renderEmailReader(email);
  updateBadges();
}

function renderEmailReader(email) {
  emailReaderEl.className = 'email-reader has-email';
  emailReaderEl.innerHTML = `
    <div class="reader-toolbar">
      <button class="icon-btn" id="back-btn" data-tooltip="Back to inbox" aria-label="Back">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
      </button>
      <button class="icon-btn" data-tooltip="Archive" aria-label="Archive" onclick="archiveEmail(${email.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
      </button>
      <button class="icon-btn" data-tooltip="Delete" aria-label="Delete" onclick="deleteEmail(${email.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
      </button>
      <button class="icon-btn" data-tooltip="Mark as unread" aria-label="Mark unread" onclick="markUnread(${email.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
      </button>
    </div>
    <div class="reader-content">
      <h1 class="reader-subject">${email.subject}</h1>
      <div class="reader-header">
        <div class="reader-avatar" style="background:${email.avatarColor}">${email.avatar}</div>
        <div class="reader-meta">
          <div class="reader-from-name">${email.from} <span style="font-weight:400;color:var(--text-secondary)">&lt;${email.fromEmail}&gt;</span></div>
          <div class="reader-from-email">to me</div>
          <div class="reader-date-full">${formatDateFull(email.date)}</div>
        </div>
        <div class="reader-actions">
          <button class="icon-btn" data-tooltip="${email.starred ? 'Unstar' : 'Star'}" onclick="toggleStar(${email.id})" aria-label="Star">
            ${email.starred
              ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#f4b400" width="20" height="20"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
              : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
            }
          </button>
          <button class="icon-btn" data-tooltip="More" aria-label="More">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
          </button>
        </div>
      </div>
      <div class="reader-divider"></div>
      <div class="reader-body">${escapeHtml(email.body)}</div>
    </div>
    <div class="reply-bar">
      <button class="reply-btn" onclick="openCompose('reply', ${email.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
        Reply
      </button>
      <button class="reply-btn" onclick="openCompose('forward', ${email.id})">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>
        Forward
      </button>
    </div>`;

  document.getElementById('back-btn').addEventListener('click', closeReader);
}

function closeReader() {
  selectedEmailId = null;

  // Restore full-width list
  const panel = emailListPanel();
  const reader = emailReaderPanel();
  if (panel) {
    panel.classList.add('fullwidth');
    panel.style.width = '';
    panel.style.minWidth = '';
    panel.style.flexShrink = '';
  }
  if (reader) {
    reader.style.display = 'none';
    reader.className = 'email-reader';
    reader.innerHTML = '';
  }

  renderEmailList();
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ---- Actions ----
function toggleStar(id) {
  const email = emails.find(e => e.id === id);
  if (!email) return;
  email.starred = !email.starred;
  showToast(email.starred ? 'Conversation starred' : 'Conversation unstarred');
  renderEmailList();
  if (selectedEmailId === id) renderEmailReader(email);
  updateBadges();
}

function archiveEmail(id) {
  const email = emails.find(e => e.id === id);
  if (email) {
    email.label = 'archived';
    showToast('Conversation archived');
    closeReader();
  }
}

function deleteEmail(id) {
  const email = emails.find(e => e.id === id);
  if (email) {
    email.label = 'trash';
    showToast('Conversation moved to Trash');
    closeReader();
  }
}

function markUnread(id) {
  const email = emails.find(e => e.id === id);
  if (email) {
    email.read = false;
    showToast('Marked as unread');
    closeReader();
    updateBadges();
  }
}

// ---- Sidebar Navigation ----
function setLabel(label) {
  currentLabel = label;
  selectedEmailId = null;
  searchQuery = '';
  searchInput.value = '';

  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.label === label);
  });

  const titleEl = document.querySelector('.list-toolbar-title');
  const titles = {
    inbox: 'Inbox', starred: 'Starred', sent: 'Sent', drafts: 'Drafts',
    spam: 'Spam', trash: 'Trash'
  };
  if (titleEl) titleEl.textContent = titles[label] || label;

  closeReader();
  renderEmailList();
}

document.querySelectorAll('.nav-item[data-label]').forEach(btn => {
  btn.addEventListener('click', () => setLabel(btn.dataset.label));
});

// ---- Search ----
searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderEmailList();
});

// ---- Compose Modal ----
function openCompose(mode, replyToId) {
  const overlay = document.getElementById('compose-overlay');
  overlay.classList.add('open');

  if (mode === 'reply' && replyToId) {
    const email = emails.find(e => e.id === replyToId);
    if (email) {
      document.getElementById('compose-to').value = email.fromEmail;
      document.getElementById('compose-subject').value = `Re: ${email.subject}`;
      document.getElementById('compose-body').value = `\n\n--- Original Message ---\nFrom: ${email.from} <${email.fromEmail}>\n\n${email.body}`;
      document.getElementById('compose-body').setSelectionRange(0, 0);
      document.getElementById('compose-body').focus();
    }
  } else if (mode === 'forward' && replyToId) {
    const email = emails.find(e => e.id === replyToId);
    if (email) {
      document.getElementById('compose-to').value = '';
      document.getElementById('compose-subject').value = `Fwd: ${email.subject}`;
      document.getElementById('compose-body').value = `\n\n--- Forwarded Message ---\nFrom: ${email.from} <${email.fromEmail}>\nDate: ${formatDateFull(email.date)}\nSubject: ${email.subject}\n\n${email.body}`;
    }
  } else {
    document.getElementById('compose-to').value = '';
    document.getElementById('compose-subject').value = '';
    document.getElementById('compose-body').value = '';
  }
}

document.getElementById('compose-btn').addEventListener('click', () => openCompose('new'));
document.querySelector('.compose-close').addEventListener('click', () => {
  document.getElementById('compose-overlay').classList.remove('open');
});
composeOverlay.addEventListener('click', (e) => {
  if (e.target === composeOverlay) composeOverlay.classList.remove('open');
});

document.getElementById('send-btn').addEventListener('click', () => {
  const to = document.getElementById('compose-to').value.trim();
  if (!to) { showToast('Please specify a recipient'); return; }
  composeOverlay.classList.remove('open');
  showToast('Message sent');
});

// ---- Dark Mode ----
const darkToggle = document.getElementById('dark-toggle');

function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  darkToggle.innerHTML = dark
    ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

darkToggle.addEventListener('click', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const next = !isDark;
  localStorage.setItem('theme', next ? 'dark' : 'light');
  applyTheme(next);
});

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme === 'dark');

// ---- Toast ----
function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
}

// ---- Keyboard Shortcuts ----
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (composeOverlay.classList.contains('open')) {
      composeOverlay.classList.remove('open');
    } else if (selectedEmailId) {
      closeReader();
    }
  }
  // c = compose
  if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !['INPUT','TEXTAREA'].includes(e.target.tagName)) {
    openCompose('new');
  }
});

// ---- Badges ----
function updateBadges() {
  const inboxCount = getUnreadCount('inbox');
  const badge = document.getElementById('inbox-badge');
  if (badge) badge.textContent = inboxCount > 0 ? inboxCount : '';

  // Update page title
  document.title = inboxCount > 0 ? `(${inboxCount}) InstaLily Mail` : 'InstaLily Mail';
}

// ---- Init ----
closeReader();
renderEmailList();
updateBadges();
