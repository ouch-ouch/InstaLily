import { useState, useRef, useEffect } from 'react';
import './AIAgent.css';
import lilyLogoDark from '../../data/Lily_light_logo.png';
import lilyLogo from '../../data/Lily_dark_logo.png';

export default function AIAgentWidget({ composeState, emails = [], darkMode = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! I'm Lily, your AI sales assistant. How can I help you manage your inbox today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMsg = { id: Date.now(), text: inputValue.trim(), sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, text: "I'm a mockup for your product design showcase! I can help draft emails or summarize leads.", sender: 'ai' }
      ]);
    }, 1000);
  };

  const isComposing = composeState?.open;
  const currentEmail = composeState?.replyToId ? emails.find(e => e.id === composeState.replyToId) : null;

  return (
    <div className={`ai-agent-overlay-container ${isOpen ? 'open' : ''} ${isComposing ? 'composing' : ''}`}>
      {/* Floating Action Button Trigger */}
      {!isOpen && (
        <button 
          className={`ai-floating-trigger ${isComposing ? 'active' : ''}`}
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          style={!darkMode ? { backgroundColor: '#fff', boxShadow: '0px 0px 0px 4px rgba(180, 160, 255, 0.253), 0px 4px 12px rgba(0,0,0,0.1)' } : {}}
        >
          <img 
            src={darkMode ? lilyLogo : lilyLogoDark} 
            alt="Lily AI Assistant" 
            className="trigger-logo" 
            style={{ 
              width: !darkMode ? '38px' : '32px', 
              height: !darkMode ? '38px' : '32px', 
              transform: !darkMode ? 'scale(1.1)' : 'scale(1.5)' 
            }}
          />
          <div className="ai-trigger-content">
            {isComposing && currentEmail ? (
              <div className="ai-client-data">
                <div className="priority-row" title={`Priority: ${currentEmail.priority}/5`}>
                  <div className="priority-label" style={!darkMode ? { color: 'rgba(0,0,0,0.6)' } : {}}>Priority</div>
                  <div className="priority-track" style={!darkMode ? { background: 'rgba(0,0,0,0.1)' } : {}}>
                    <div 
                      className={`priority-fill priority-${currentEmail.priority}`} 
                      style={{ width: `${(currentEmail.priority / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ai-client-tags">
                  <span className="ai-revenue-tag" style={!darkMode ? { color: '#000', backgroundColor: 'rgba(0,0,0,0.05)' } : {}}>{currentEmail.likelyRevenue}</span>
                  {currentEmail.justDemoed && <span className="ai-status-tag demo" style={!darkMode ? { color: '#008556', backgroundColor: 'rgba(51, 217, 178, 0.2)' } : {}}>Demoed</span>}
                  {currentEmail.initialContact && <span className="ai-status-tag new" style={!darkMode ? { color: '#855b00', backgroundColor: 'rgba(255, 177, 66, 0.2)' } : {}}>New</span>}
                </div>
              </div>
            ) : (
              <span className="ai-trigger-text" style={!darkMode ? { color: '#000' } : {}}>Ask Lily</span>
            )}
          </div>
        </button>
      )}

      {/* Overlay Chat Panel */}
      <div className="ai-agent-panel">
        <div className="ai-panel-header">
          <div className="ai-avatar" style={!darkMode ? { backgroundColor: '#fff', border: 'none', boxShadow: 'none', overflow: 'hidden' } : {}}>
            <img 
              src={darkMode ? lilyLogo : lilyLogoDark} 
              alt="InstaLily Logo" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', 
                borderRadius: '50%',
                transform: !darkMode ? 'scale(0.9 )' : 'scale(1.3)'
              }}
            />
          </div>
          <div className="ai-header-text">
            <h3>Lily Assistant</h3>
            <span>Online</span>
          </div>
          <button className="ai-close-btn" onClick={() => setIsOpen(false)} aria-label="Close AI">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="ai-chat-area">
          {messages.map(msg => (
            <div key={msg.id} className={`ai-message-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="ai-input-area" onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Ask Lily..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="ai-send-btn" disabled={!inputValue.trim()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
