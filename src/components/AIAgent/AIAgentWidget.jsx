import { useState, useRef, useEffect } from 'react';
import './AIAgent.css';
import lilyLogo from '../../data/image.png';

export default function AIAgentWidget({ composeState, emails = [] }) {
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
        >
          <img src={lilyLogo} alt="Lily AI Assistant" className="trigger-logo" />
          <div className="ai-trigger-content">
            {isComposing && currentEmail ? (
              <div className="ai-client-data">
                <div className="priority-row" title={`Priority: ${currentEmail.priority}/5`}>
                  <div className="priority-label">Priority</div>
                  <div className="priority-track">
                    <div 
                      className={`priority-fill priority-${currentEmail.priority}`} 
                      style={{ width: `${(currentEmail.priority / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ai-client-tags">
                  <span className="ai-revenue-tag">{currentEmail.likelyRevenue}</span>
                  {currentEmail.justDemoed && <span className="ai-status-tag demo">Demoed</span>}
                  {currentEmail.initialContact && <span className="ai-status-tag new">New</span>}
                </div>
              </div>
            ) : (
              <span className="ai-trigger-text">Ask Lily</span>
            )}
          </div>
        </button>
      )}

      {/* Overlay Chat Panel */}
      <div className="ai-agent-panel">
        <div className="ai-panel-header">
          <div className="ai-avatar">
            <img 
              src={lilyLogo} 
              alt="InstaLily Logo" 
              style={{ width: '35px', height: '35px', objectFit: 'contain', borderRadius: '50%' }} 
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
