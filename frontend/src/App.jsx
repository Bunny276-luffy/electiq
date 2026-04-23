import Navbar from './components/Navbar'
import Ticker from './components/Ticker'
import Hero from './components/Hero'
import ElectionTimeline from './components/ElectionTimeline'
import HowItWorks from './components/HowItWorks'
import FAQ from './components/FAQ'
import Quiz from './components/Quiz'
import ChatBot from './components/ChatBot'

function App() {
  return (
    <div className="app-container">
      <Ticker />
      <Navbar />
      <Hero />
      <div className="container">
        <ElectionTimeline />
        <HowItWorks />
        <FAQ />
        <Quiz />
      </div>
      <ChatBot />
      <footer className="text-center p-6 mt-4" style={{borderTop: '1px solid var(--glass-border)'}}>
        <p>© 2026 ElectIQ. Understand Elections. Make Your Vote Count.</p>
      </footer>
    </div>
  )
}

export default App
