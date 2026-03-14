import { useEffect, useRef } from 'react';
import { formatDateFull } from '../App.jsx';

export default function ComposeModal({ state, emails, onClose, onSend }) {
  const { open, mode, replyToId } = state;
  const toRef = useRef(null);
  const subjectRef = useRef(null);
  const bodyRef = useRef(null);

  // Pre-fill fields when mode/replyToId changes
  useEffect(() => {
    if (!open) return;
    const email = replyToId ? emails.find(e => e.id === replyToId) : null;

    if (mode === 'reply' && email) {
      toRef.current.value = email.fromEmail;
      subjectRef.current.value = `Re: ${email.subject}`;
      bodyRef.current.value = `\n\n--- Original Message ---\nFrom: ${email.from} <${email.fromEmail}>\n\n${email.body}`;
      bodyRef.current.setSelectionRange(0, 0);
      bodyRef.current.focus();
    } else if (mode === 'forward' && email) {
      toRef.current.value = '';
      subjectRef.current.value = `Fwd: ${email.subject}`;
      bodyRef.current.value = `\n\n--- Forwarded Message ---\nFrom: ${email.from} <${email.fromEmail}>\nDate: ${formatDateFull(email.date)}\nSubject: ${email.subject}\n\n${email.body}`;
    } else {
      if (toRef.current) toRef.current.value = '';
      if (subjectRef.current) subjectRef.current.value = '';
      if (bodyRef.current) bodyRef.current.value = '';
    }
  }, [open, mode, replyToId, emails]);

  const handleSend = () => {
    const to = toRef.current?.value.trim() || '';
    onSend(to);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`compose-overlay${open ? ' open' : ''}`}
      id="compose-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Compose new message"
      onClick={handleOverlayClick}
    >
      <div className="compose-modal">
        <div className="compose-header">
          <span>New Message</span>
          <button className="compose-close" aria-label="Close compose" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="compose-field">
          <label htmlFor="compose-to">To</label>
          <input type="email" id="compose-to" ref={toRef} autoComplete="email" />
        </div>
        <div className="compose-field">
          <label htmlFor="compose-subject">Sub</label>
          <input type="text" id="compose-subject" ref={subjectRef} />
        </div>
        <textarea
          className="compose-body"
          id="compose-body"
          ref={bodyRef}
          placeholder="Write your message..."
        />

        <div className="compose-footer">
          <button className="send-btn" id="send-btn" onClick={handleSend}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Send
          </button>
          <div style={{ flex: 1 }} />
          <button className="icon-btn" aria-label="Formatting">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
          </button>
          <button className="icon-btn" aria-label="Attach file">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
          </button>
          <button className="icon-btn" aria-label="Delete draft" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
