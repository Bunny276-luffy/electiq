import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqData = [
    {"q": "How do I register to vote?", "a": "You can register online, by mail, or in person at your local election office, DMV, or other designated locations."},
    {"q": "What happens if I miss the registration deadline?", "a": "Some states offer Same-Day Registration, allowing you to register and vote on Election Day. Check your local laws."},
    {"q": "Do I need an ID to vote?", "a": "Voter ID laws vary by state. Common acceptable forms include a driver's license, passport, or state-issued ID."},
    {"q": "What if I make a mistake on my ballot?", "a": "If voting in person, you can usually ask a poll worker for a replacement ballot. Do not erase or scribble."},
    {"q": "Can I vote by mail?", "a": "Yes, many states allow mail-in or absentee voting. You must request a ballot by a specific deadline."},
    {"q": "How are electoral votes distributed?", "a": "In most U.S. states, the winner of the popular vote receives all of the state's electoral votes. It's based on congressional representation."},
    {"q": "Is my vote really secret?", "a": "Yes, the secret ballot is a fundamental right. Your name is marked off a voter list, but no one can trace your specific ballot back to you."},
    {"q": "Who operates the polling places?", "a": "Polling places are run by trained poll workers, who are often volunteers from your community supervised by local election officials."}
];

export default function FAQ() {
  const [faqs] = useState(faqData)
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section id="faq" className="section" aria-label="Frequently Asked Questions" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 className="text-center mb-12">Common <span className="gradient-text">Questions</span></h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, i) => (
          <div key={i} className="glass-card" 
            role="button"
            aria-expanded={openIndex === i}
            aria-label={`Toggle answer for ${faq.q}`}
            tabIndex={0}
            onKeyDown={(e) => { if(e.key === 'Enter') toggle(i) }}
            style={{ 
              padding: '1.5rem', cursor: 'pointer',
              borderLeft: openIndex === i ? '4px solid var(--accent-orange)' : '1px solid var(--glass-border)',
              transition: 'all 0.3s'
            }}
            onClick={() => toggle(i)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 500 }}>{faq.q}</h4>
              {openIndex === i ? <ChevronUp size={20} color="var(--accent-orange)" aria-hidden="true"/> : <ChevronDown size={20} color="var(--text-secondary)" aria-hidden="true"/>}
            </div>
            <div style={{ 
              maxHeight: openIndex === i ? '200px' : '0', 
              overflow: 'hidden', 
              transition: 'all 0.3s ease',
              opacity: openIndex === i ? 1 : 0,
              marginTop: openIndex === i ? '1rem' : '0'
            }}>
              <p style={{ margin: 0 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
