import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send } from 'lucide-react'

const getResponse = (message) => {
  const msg = message.toLowerCase();
  if (msg.includes('register') || msg.includes('registration'))
    return "To register to vote, visit your local election office or register online at your state's official election website. You typically need a valid ID and proof of address. Registration deadlines vary by state, usually 15-30 days before the election.";
  if (msg.includes('election day') || msg.includes('voting day'))
    return "On election day, go to your assigned polling place with a valid ID. You'll check in, receive a ballot, mark your choices privately, and submit it. Polls are usually open from 7 AM to 8 PM. If you're in line before closing time, you have the right to vote.";
  if (msg.includes('count') || msg.includes('counting'))
    return "Votes are counted by election officials using both machines and manual verification. Absentee and mail-in ballots may take longer to count. Results are certified after all votes including provisional ballots are verified.";
  if (msg.includes('candidate') || msg.includes('nomination'))
    return "Candidates must file nomination papers and meet eligibility requirements like age and citizenship. They collect signatures from registered voters and pay a filing fee to get on the ballot.";
  if (msg.includes('campaign'))
    return "The campaign period is when candidates actively promote themselves through rallies, ads, and debates. There are strict rules about campaign finance and spending limits.";
  if (msg.includes('result') || msg.includes('winner'))
    return "After counting, results are announced publicly. The candidate with the most votes (or majority, depending on the election type) wins. Official results are certified within days to weeks after election day.";
  if (msg.includes('mail') || msg.includes('absentee'))
    return "Mail-in or absentee ballots let you vote without going to a polling place. Request one in advance, fill it out carefully, and return it before the deadline — by mail or in-person drop-off.";
  if (msg.includes('id') || msg.includes('identification'))
    return "Most states require a valid photo ID to vote, such as a driver's license or passport. Some states accept non-photo IDs or allow signing an affidavit. Check your state's specific requirements before election day.";
  if (msg.includes('hi') || msg.includes('hello') || msg.includes('hey'))
    return "Hello! I'm ElectIQ Assistant. I can help you understand elections, voting processes, registration, and more. What would you like to know?";
  return "That's a great question about elections! The democratic process involves voter registration, candidate nomination, campaigning, voting day, and result certification. Each step ensures fair and transparent elections. Could you be more specific about what you'd like to know?";
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am ElectIQ Assistant. How can I help you understand the election process today?', time: new Date().toLocaleTimeString() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const suggestedQuestions = [
    "How do I register to vote?",
    "What happens on election day?",
    "How are votes counted?"
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) scrollToBottom()
  }, [messages, isOpen, loading])

  const sendMessage = (text) => {
    const userMsg = { role: 'user', text, time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    setTimeout(() => {
      const reply = getResponse(text);
      setMessages(prev => [...prev, { role: 'bot', text: reply, time: new Date().toLocaleTimeString() }]);
      setLoading(false);
    }, 800);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  }

  return (
    <>
      <button 
        id="chat-toggle-btn"
        aria-label="Toggle ChatBot"
        aria-expanded={isOpen}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: '4rem', height: '4rem', borderRadius: '50%',
          display: isOpen ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center',
          border: 'none', cursor: 'pointer', zIndex: 50,
          background: 'var(--accent-orange)',
          boxShadow: '0 8px 30px rgba(255, 107, 0, 0.4)'
        }}
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare color="white" size={24} aria-hidden="true" />
      </button>

      <div className="glass-card" 
        role="dialog" 
        aria-label="ElectIQ Assistant Chat"
        style={{
          position: 'fixed', bottom: isOpen ? '2rem' : '-100%', right: '2rem',
          width: '380px', height: '600px', maxWidth: 'calc(100vw - 4rem)',
          display: 'flex', flexDirection: 'column', zIndex: 100,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? 'auto' : 'none',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)', background: 'rgba(10, 22, 40, 0.95)'
        }}>
        <div style={{ 
          padding: '1.25rem', borderBottom: '1px solid var(--glass-border)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'rgba(255,255,255,0.05)', borderRadius: '1rem 1rem 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-green))', width: '10px', height: '10px', borderRadius: '50%' }}></div>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>ElectIQ Assistant</h3>
          </div>
          <button aria-label="Close ChatBot" onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}><X size={20} aria-hidden="true" /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} className="hide-scrollbar" aria-live="polite">
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: '0.75rem', alignItems: 'flex-start' }}>
              {msg.role === 'bot' && (
                <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-green))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageSquare size={14} color="white" aria-hidden="true" />
                </div>
              )}
              <div style={{ maxWidth: '80%', padding: '0.75rem 1rem', borderRadius: msg.role === 'user' ? '1rem 0.25rem 1rem 1rem' : '0.25rem 1rem 1rem 1rem', background: msg.role === 'user' ? 'var(--accent-orange)' : 'rgba(255,255,255,0.1)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {msg.text}
                <div style={{ fontSize: '0.7rem', color: msg.role === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)', marginTop: '0.25rem', textAlign: msg.role === 'user' ? 'right' : 'left' }}>{msg.time}</div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, var(--accent-orange), var(--accent-green))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageSquare size={14} color="white" aria-hidden="true" />
              </div>
              <div style={{ padding: '0.75rem 1rem', borderRadius: '0.25rem 1rem 1rem 1rem', background: 'rgba(255,255,255,0.1)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ padding: '0.5rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', background: 'rgba(255,255,255,0.01)' }} aria-label="Suggested Questions">
          {suggestedQuestions.map((sq, i) => (
             <button key={i} aria-label={`Ask: ${sq}`} onClick={() => sendMessage(sq)} style={{
               background: 'rgba(255, 107, 0, 0.1)', border: '1px solid rgba(255, 107, 0, 0.3)',
               color: 'var(--accent-orange)', borderRadius: '1rem', padding: '0.4rem 0.8rem',
               fontSize: '0.8rem', cursor: 'pointer', transition: 'background 0.2s'
             }} onMouseOver={e=>e.currentTarget.style.background='rgba(255, 107, 0, 0.2)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255, 107, 0, 0.1)'}>
               {sq}
             </button>
          ))}
        </div>

        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '0 0 1rem 1rem' }}>
          <input type="text" aria-label="Type a message to the assistant" placeholder="Ask about elections..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '2rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit' }} />
          <button aria-label="Send Message" onClick={handleSend} disabled={!input.trim() || loading}
            style={{ width: '2.8rem', height: '2.8rem', borderRadius: '50%', background: input.trim() && !loading ? 'var(--accent-orange)' : 'rgba(255,255,255,0.1)', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', color: input.trim() && !loading ? 'white' : 'var(--text-secondary)' }}>
            <Send size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </>
  )
}
