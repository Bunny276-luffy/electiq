import { useState, useEffect } from 'react'
import { Vote } from 'lucide-react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="section" aria-label="Hero Section" style={{ 
      minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, rgba(255, 107, 0, 0.15), rgba(10, 22, 40, 0.8), rgba(19, 136, 8, 0.15))',
      position: 'relative', overflow: 'hidden'
    }}>
      <div className="container text-center" style={{ 
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative', zIndex: 2
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '2rem', background: 'rgba(255, 107, 0, 0.15)', border: '1px solid rgba(255, 107, 0, 0.3)', marginBottom: '1.5rem' }}>
          <Vote size={18} color="var(--accent-orange)" aria-hidden="true" />
          <span className="gradient-text" style={{ fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Empowering Democracy
          </span>
        </div>
        <h1 className="mb-4" style={{ 
          fontSize: 'clamp(2.5rem, 5vw + 1rem, 5rem)', 
          fontWeight: 800,
        }}>
          Understand Elections. <br/>
          <span className="gradient-text">Make Your Vote Count.</span>
        </h1>
        <p className="mb-8" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          ElectIQ is your intelligent guide to the voting process. Explore timelines, test your knowledge, and ask questions to our AI assistant.
        </p>
        <button className="btn btn-primary" aria-label="Explore the Election Timeline" style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
          onClick={() => document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' })}
        >
          Explore Timeline
        </button>
      </div>
    </section>
  )
}
