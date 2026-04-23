import { useState } from 'react'
import { UserPlus, Mail, Box, PenTool, CheckCircle, BarChart, X } from 'lucide-react'

const steps = [
  { id: 1, title: 'Register', desc: 'Ensure you are registered at your address.', detail: 'Registration is the prerequisite for voting. You can often do this online, via mail, or at local DMVs.', icon: UserPlus },
  { id: 2, title: 'Get Ballot', desc: 'Arrive at poll or receive mail ballot.', detail: 'For in-person voting, present ID if required to receive your ballot. For mail voting, it arrives at your registered address.', icon: Mail },
  { id: 3, title: 'Enter Booth', desc: 'Secure privacy for your choices.', detail: 'Voting is private. You take your ballot to a screened booth so no one can see how you vote.', icon: Box },
  { id: 4, title: 'Mark Choice', desc: 'Carefully fill in candidate bubbles.', detail: 'Use the provided pen to completely fill in the bubbles next to your chosen candidates or initiatives.', icon: PenTool },
  { id: 5, title: 'Submit', desc: 'Cast ballot into the secure machine.', detail: 'Once marked, feed your ballot into the scanning machine or place it in the secure ballot box.', icon: CheckCircle },
  { id: 6, title: 'Counting', desc: 'Official tallies commence after polls close.', detail: 'Election officials securely transport and tabulate all valid ballots to determine the winners.', icon: BarChart }
]

export default function HowItWorks() {
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <section id="how-it-works" className="section">
      <div className="text-center mb-12">
        <h2>How <span className="gradient-text">Voting Works</span></h2>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>A simple step-by-step process of casting your vote democratically. Click a card to learn more.</p>
      </div>
      <div className="grid-3">
        {steps.map(step => (
          <div key={step.id} className="glass-card clickable-card" style={{ padding: '2rem', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
            onClick={() => setSelectedStep(step)}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ width: '4rem', height: '4rem', margin: '0 auto 1.5rem', background: 'rgba(255, 107, 0, 0.2)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <step.icon size={28} color="var(--accent-orange)" />
            </div>
            <h3 className="mb-2">Step {step.id}: {step.title}</h3>
            <p style={{ fontSize: '0.9rem' }}>{step.desc}</p>
          </div>
        ))}
      </div>

      {selectedStep && (
        <div className="modal-overlay" onClick={() => setSelectedStep(null)}>
          <div className="glass-card" style={{ maxWidth: '500px', width: '90%', padding: '2rem', position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedStep(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <div style={{ width: '4rem', height: '4rem', margin: '0 0 1.5rem', background: 'rgba(255, 107, 0, 0.2)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <selectedStep.icon size={28} color="var(--accent-orange)" />
            </div>
            <h2 className="mb-4">Step {selectedStep.id}: {selectedStep.title}</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-primary)' }}>{selectedStep.detail}</p>
          </div>
        </div>
      )}
    </section>
  )
}
