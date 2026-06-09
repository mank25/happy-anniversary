import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function CountdownFrame({ number }) {
  return (
    <motion.div
      key={number}
      initial={{ opacity: 0, scale: 1.15 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.12 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-44 h-44 md:w-52 md:h-52">
        <div
          className="absolute inset-0 rounded-full border-[3px]"
          style={{ borderColor: 'rgba(200,167,106,0.5)' }}
        />
        <div
          className="absolute inset-5 rounded-full border"
          style={{ borderColor: 'rgba(200,167,106,0.3)' }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: 'rgba(200,167,106,0.25)' }}
        >
          <div className="w-full h-px" style={{ backgroundColor: 'rgba(200,167,106,0.25)' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-px" style={{ backgroundColor: 'rgba(200,167,106,0.25)' }} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-serif text-8xl font-bold leading-none"
            style={{ color: '#C8A76A' }}
          >
            {number}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default function LoadingScreen() {
  const [frame, setFrame] = useState(3)

  useEffect(() => {
    const timers = [
      setTimeout(() => setFrame(2), 750),
      setTimeout(() => setFrame(1), 1500),
      setTimeout(() => setFrame(0), 2250),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center dark-paper">
      {/* Film sprocket holes */}
      <div className="absolute left-3 top-0 bottom-0 flex flex-col justify-around py-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-5 rounded-sm"
            style={{ backgroundColor: 'rgba(200,167,106,0.2)' }}
          />
        ))}
      </div>
      <div className="absolute right-3 top-0 bottom-0 flex flex-col justify-around py-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-5 rounded-sm"
            style={{ backgroundColor: 'rgba(200,167,106,0.2)' }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative h-52 w-52 md:h-60 md:w-60 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {frame > 0 && <CountdownFrame key={frame} number={frame} />}
        </AnimatePresence>
      </div>

      {/* Flicker scanline effect */}
      <motion.div
        animate={{ opacity: [0, 0.04, 0, 0.02, 0] }}
        transition={{ duration: 0.3, repeat: Infinity }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />
    </div>
  )
}
