import React from 'react'
import { CheckSquare } from 'lucide-react'

export default function Navbar() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.5rem' }}>
          <CheckSquare color="var(--accent-orange)" size={24} aria-hidden="true" />
          <span className="gradient-text">ElectIQ</span>
        </div>
        <ul className="nav-links">
          <li><button className="nav-link-btn" aria-label="Go to Timeline section" onClick={() => scrollTo('timeline')}>Timeline</button></li>
          <li><button className="nav-link-btn" aria-label="Go to How It Works section" onClick={() => scrollTo('how-it-works')}>How It Works</button></li>
          <li><button className="nav-link-btn" aria-label="Go to FAQ section" onClick={() => scrollTo('faq')}>FAQ</button></li>
          <li><button className="nav-link-btn" aria-label="Go to Quiz section" onClick={() => scrollTo('quiz')}>Quiz</button></li>
          <li><button className="nav-link-btn" aria-label="Open Chat Assistant" onClick={() => {
            const chatBtn = document.getElementById('chat-toggle-btn');
            if(chatBtn) chatBtn.click();
          }}>Chat</button></li>
        </ul>
      </div>
    </nav>
  )
}
