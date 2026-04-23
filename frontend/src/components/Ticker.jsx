import { useState, useEffect } from 'react'

const facts = [
  "Did You Know? The youngest eligible voters in the US are 18 years old.",
  "Did You Know? Election Day is always the Tuesday following the first Monday in November.",
  "Did You Know? George Washington was the only president elected unanimously by the Electoral College.",
  "Did You Know? Women gained the right to vote nationwide in 1920 with the 19th Amendment.",
  "Did You Know? The first voting machines were introduced in the 1890s."
];

export default function Ticker() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % facts.length);
        setFade(true);
      }, 500); // Wait for fade out
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ticker-container">
      <div className="container text-center">
        <p style={{ 
          margin: 0, 
          fontSize: '0.9rem', 
          color: 'var(--accent-blue)', 
          fontWeight: 600,
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}>
          ✨ {facts[index]}
        </p>
      </div>
    </div>
  )
}
