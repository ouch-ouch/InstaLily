import { useState, useRef, useEffect } from 'react';
import './AIAgent.css';
import lilyLogo from '../../data/image.png';

export default function AIAgentWidget({ composeState }) {
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
        </button>
      )}

      {/* Overlay Chat Panel */}
      <div className="ai-agent-panel">
        <div className="ai-panel-header">
          <div className="ai-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"/>
              <path d="M12 18v4M9 22h6"/>
              <rect x="5" y="8" width="14" height="10" rx="2"/>
              <circle cx="9" cy="13" r="1" fill="currentColor"/>
              <circle cx="15" cy="13" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div className="ai-header-text">
            <h3>InstaLily AI</h3>
            <span>Sales assistant</span>
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
