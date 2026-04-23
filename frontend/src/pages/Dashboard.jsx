import Hero from '../components/Hero'
import ElectionTimeline from '../components/ElectionTimeline'
import HowItWorks from '../components/HowItWorks'
import FAQ from '../components/FAQ'
import Quiz from '../components/Quiz'

export default function Dashboard() {
  return (
    <>
      <Hero />
      <div className="container">
        <ElectionTimeline />
        <HowItWorks />
        <FAQ />
        <Quiz />
      </div>
    </>
  )
}
