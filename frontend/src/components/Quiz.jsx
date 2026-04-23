import { useState } from 'react'
import { Award, Share2 } from 'lucide-react'

const quizData = [
    {
        "id": 1,
        "question": "Which of these is typically the FIRST step in participating as a voter?",
        "options": ["Going to the polling place", "Registering to vote", "Watching a debate", "Requesting a mail ballot"],
        "answer": "Registering to vote"
    },
    {
        "id": 2,
        "question": "What is 'Early Voting'?",
        "options": ["Voting before you turn 18", "Casting a ballot in person before Election Day", "Guessing the results before polls close", "Voting by mail only"],
        "answer": "Casting a ballot in person before Election Day"
    },
    {
        "id": 3,
        "question": "If you are in line when the polls close on Election Day, what should you do?",
        "options": ["Go home immediately", "Stay in line, you have the right to vote", "Come back the next day", "Ask a poll worker to mail it instead"],
        "answer": "Stay in line, you have the right to vote"
    },
    {
        "id": 4,
        "question": "To win the US Presidency, a candidate needs how many Electoral College votes?",
        "options": ["100", "538", "270", "435"],
        "answer": "270"
    },
    {
        "id": 5,
        "question": "What is an 'Absentee Ballot'?",
        "options": ["A blank voting slip", "A ballot cast by someone unable to attend the official polling station", "A ballot for people who are sleeping", "A vote for a disqualified candidate"],
        "answer": "A ballot cast by someone unable to attend the official polling station"
    }
];

export default function Quiz() {
  const [questions] = useState(quizData)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleAnswer = (option) => {
    if (selectedAnswer) return; // Prevent multiple clicks
    setSelectedAnswer(option);
    if (option === questions[currentIndex].answer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    setSelectedAnswer(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setShowResult(true)
    }
  }

  const restart = () => {
    setCurrentIndex(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  if (!questions.length) return null

  return (
    <section id="quiz" className="section" aria-label="Knowledge Quiz" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="text-center mb-8">
        <h2>Knowledge <span className="gradient-text">Quiz</span></h2>
        <p>Test your understanding of the election process.</p>
      </div>

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        {showResult ? (
          <div className="text-center" style={{ animation: 'fadeIn 0.5s ease-in' }} aria-live="polite">
            <Award size={64} className="mb-4" style={{ color: 'var(--accent-orange)', margin: '0 auto' }} aria-hidden="true" />
            <h3 className="mb-2">Quiz Complete!</h3>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
              You scored <strong className="gradient-text" style={{ fontSize: '1.5rem' }}>{score}</strong> out of {questions.length}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" aria-label="Restart Quiz" onClick={restart}>Try Again</button>
              <button className="btn btn-primary" aria-label="Share Quiz Score" onClick={() => alert(`I scored ${score}/${questions.length} on ElectIQ!`)}>
                <Share2 size={18} aria-hidden="true" /> Share Score
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', color: 'var(--text-secondary)' }} aria-live="polite">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            
            <h3 className="mb-6" style={{ minHeight: '3rem' }}>{questions[currentIndex].question}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} role="radiogroup" aria-label="Quiz Options">
              {questions[currentIndex].options.map((option, i) => {
                const isCorrect = option === questions[currentIndex].answer;
                const isSelected = selectedAnswer === option;
                
                let bgColor = 'rgba(255,255,255,0.05)';
                let borderColor = 'var(--glass-border)';
                
                if (selectedAnswer) {
                  if (isCorrect) {
                    bgColor = 'rgba(16, 185, 129, 0.2)'; // Green
                    borderColor = '#10b981';
                  } else if (isSelected) {
                    bgColor = 'rgba(239, 68, 68, 0.2)'; // Red
                    borderColor = '#ef4444';
                  }
                }

                return (
                  <button
                    key={i}
                    className="btn"
                    role="radio"
                    aria-checked={isSelected}
                    aria-label={`Select option: ${option}`}
                    disabled={!!selectedAnswer}
                    style={{
                      background: bgColor,
                      border: `1px solid ${borderColor}`,
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      padding: '1rem 1.5rem',
                      transition: 'all 0.2s',
                      cursor: selectedAnswer ? 'default' : 'pointer',
                      color: 'var(--text-primary)'
                    }}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
            
            {selectedAnswer && (
              <div style={{ marginTop: '2rem', textAlign: 'right', animation: 'fadeIn 0.3s ease' }}>
                <button className="btn btn-primary" aria-label={currentIndex + 1 < questions.length ? 'Go to Next Question' : 'See Quiz Results'} onClick={handleNext}>
                  {currentIndex + 1 < questions.length ? 'Next Question' : 'See Results'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
