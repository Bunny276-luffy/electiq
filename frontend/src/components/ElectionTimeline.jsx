import { useState } from 'react'

const timelineData = [
  { id: 1, title: 'Voter Registration', duration: '30 days before election', description: 'Ensure your name is on the electoral roll.', key_rules: ['Provide valid ID', 'Meet age requirement'] },
  { id: 2, title: 'Candidate Nomination', duration: '45 days before', description: 'Candidates file their nomination papers.', key_rules: ['Submit forms', 'Pay deposit'] },
  { id: 3, title: 'Campaign Period', duration: '30 days', description: 'Political parties campaign and hold rallies.', key_rules: ['Model code of conduct applies', 'No campaigning 48 hrs before poll'] },
  { id: 4, title: 'Voting Day', duration: 'Single day', description: 'Voters cast their votes at polling stations.', key_rules: ['Secret ballot', 'No phones inside booth'] },
  { id: 5, title: 'Vote Counting', duration: '1-3 days', description: 'EVMs are opened and votes are tallied.', key_rules: ['Done under strict security', 'Candidates agents present'] },
  { id: 6, title: 'Results Declaration', duration: 'After counting', description: 'Returning officer declares the winner.', key_rules: ['Official certificate issued'] },
  { id: 7, title: 'Oath Taking', duration: '2 weeks after results', description: 'Elected representatives take their oath.', key_rules: ['Swear allegiance to Constitution'] }
];

export default function ElectionTimeline() {
  const [stages] = useState(timelineData)
  const [activeStage, setActiveStage] = useState(null)

  return (
    <section id="timeline" className="section" aria-label="Election Timeline">
      <h2 className="text-center mb-12">Election <span className="gradient-text">Timeline</span></h2>
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', padding: '1rem 0.5rem 2rem' }}>
        {stages.map((stage, index) => (
          <div key={stage.id} 
            role="button"
            aria-expanded={activeStage === index}
            aria-label={`View details for ${stage.title}`}
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === 'Enter') setActiveStage(activeStage === index ? null : index) }}
            className="glass-card" style={{ 
              minWidth: '320px', padding: '1.5rem', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: activeStage === index ? 'translateY(-10px)' : 'none',
              borderColor: activeStage === index ? 'var(--accent-orange)' : 'var(--glass-border)',
              boxShadow: activeStage === index ? '0 10px 40px rgba(255,107,0,0.3)' : 'var(--glass-glow)'
            }}
            onClick={() => setActiveStage(activeStage === index ? null : index)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(255, 107, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-orange)', fontWeight: 700 }}>
                {index + 1}
              </div>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{stage.title}</h3>
            </div>
            <p className="mb-4" style={{ fontSize: '0.9rem' }}>{stage.description}</p>
            <div style={{ 
              maxHeight: activeStage === index ? '300px' : '0', 
              overflow: 'hidden', 
              transition: 'all 0.5s ease',
              opacity: activeStage === index ? 1 : 0
            }}>
              <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', marginTop: '1rem' }}>
                <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--accent-green)' }}><strong>Duration:</strong> {stage.duration}</p>
                <div style={{ fontSize: '0.85rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>What Happens:</strong>
                  <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem' }}>
                    {stage.key_rules?.map((rule, i) => <li key={i}>{rule}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
