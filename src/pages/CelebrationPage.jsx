import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Check } from 'lucide-react'
import content from '../data/content.json'

const DATE_OPTIONS = [
  { num: 1, label: 'A short trip to Amritsar', emoji: '🛕' },
  { num: 2, label: 'A staycation in Ranthambore', emoji: '🐯' },
]

const CONFETTI_COLORS = [
  '#C8A76A', '#E8C87A', '#FFD700', '#A8864A',
  '#F4A261', '#E76F51', '#74C0FC', '#B5EAD7', '#FFDAC1',
]

function Confetti({ active }) {
  const particles = useRef(
    Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      w: Math.random() * 9 + 4,
      h: Math.random() * 5 + 3,
      delay: Math.random() * 1.0,
      duration: Math.random() * 1.8 + 1.8,
      rotate: Math.random() * 720 - 360,
      wobble: Math.random() * 60 - 30,
    }))
  ).current

  if (!active) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 9999 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `calc(${p.x}vw + 0px)`, y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: '108vh',
            x: `calc(${p.x}vw + ${p.wobble}px)`,
            rotate: p.rotate,
            opacity: [1, 1, 1, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  )
}

export default function CelebrationPage() {
  const [answered, setAnswered] = useState(null)   // null | 'yes' | 'no'
  const [selected, setSelected] = useState(null)   // null | 0 | 1
  const [showConfetti, setShowConfetti] = useState(false)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [noAttempts, setNoAttempts] = useState(0)
  const noBtnRef = useRef(null)

  const propLines = content.proposalQuestion.split('\n')

  const handleNoBtnHover = () => {
    if (answered === 'no') return
    const attempts = noAttempts + 1
    setNoAttempts(attempts)
    if (attempts >= 4) { setAnswered('no'); return }
    const range = Math.min(130 + attempts * 30, 220)
    const angle = Math.random() * Math.PI * 2
    setNoPos({ x: Math.cos(angle) * range, y: Math.sin(angle) * (range * 0.6) })
  }

  const handleNoTouch = (e) => { e.preventDefault(); handleNoBtnHover() }

  const handleSelectOption = (index) => {
    if (selected === index) return
    setSelected(index)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3600)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen vintage-paper"
    >
      <Confetti active={showConfetti} />

      {/* Header */}
      <section className="pt-20 pb-10 px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-sans text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: '#C8A76A' }}
        >
          Mission Briefing
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-serif text-4xl md:text-6xl mb-4"
          style={{ color: '#2E2E2E' }}
        >
          To celebrate click
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="gold-divider max-w-xs mx-auto"
        />
      </section>

      {/* Main section */}
      <section className="px-5 pb-16 flex flex-col items-center text-center">
        <AnimatePresence mode="wait">

          {/* ── Proposal ── */}
          {answered === null && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-xl w-full"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="paper-card rounded-2xl px-8 py-10 mb-12"
              >
                <Heart
                  size={20}
                  className="mx-auto mb-6"
                  style={{ color: '#C8A76A' }}
                  fill="rgba(200,167,106,0.25)"
                />
                {propLines.map((line, i) => (
                  <p key={i} className="font-serif text-xl md:text-2xl italic mb-1" style={{ color: '#5B4636' }}>
                    {line}
                  </p>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center gap-8 relative"
              >
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setAnswered('yes')}
                  className="vintage-btn-filled rounded px-12 py-4 text-base"
                >
                  YES
                </motion.button>

                <motion.button
                  ref={noBtnRef}
                  animate={{ x: noPos.x, y: noPos.y }}
                  transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                  onMouseEnter={handleNoBtnHover}
                  onTouchStart={handleNoTouch}
                  onClick={handleNoBtnHover}
                  className="vintage-btn rounded px-12 py-4 text-base select-none"
                  style={{ position: 'relative', zIndex: 10 }}
                  aria-label="No (try to click me)"
                >
                  NO
                </motion.button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="font-sans text-xs mt-8"
                style={{ color: 'rgba(122,98,81,0.5)' }}
              >
                Choose wisely.
              </motion.p>
            </motion.div>
          )}

          {/* ── Yes response + options ── */}
          {answered === 'yes' && (
            <motion.div
              key="yes-response"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-lg w-full"
            >
              {/* Celebration header */}
              <motion.div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  className="text-5xl mb-5"
                >
                  🎉
                </motion.div>
                <h2 className="font-serif text-4xl md:text-5xl mb-3" style={{ color: '#2E2E2E' }}>
                  {content.yesResponse}
                </h2>
                <div className="gold-divider-sm mt-4" />
                <p className="font-serif italic text-lg mt-6" style={{ color: '#7A6251' }}>
                  You have got 2 date options to choose from :
                </p>
              </motion.div>

              {/* Selectable options */}
              <div className="space-y-4">
                {DATE_OPTIONS.map((opt, i) => {
                  const isSelected = selected === i
                  const isOther = selected !== null && selected !== i

                  return (
                    <motion.button
                      key={opt.num}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{
                        opacity: isOther ? 0.45 : 1,
                        y: 0,
                        scale: isSelected ? 1.02 : 1,
                      }}
                      transition={{ delay: 0.35 + i * 0.15, duration: 0.45 }}
                      whileHover={selected === null ? { y: -3, scale: 1.01 } : {}}
                      whileTap={selected === null ? { scale: 0.98 } : {}}
                      onClick={() => handleSelectOption(i)}
                      className="w-full text-left rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
                      style={{
                        background: isSelected
                          ? 'linear-gradient(135deg, rgba(200,167,106,0.18), rgba(200,167,106,0.08))'
                          : '#FAF7F2',
                        border: isSelected
                          ? '2px solid rgba(200,167,106,0.85)'
                          : '1.5px solid rgba(200,167,106,0.2)',
                        boxShadow: isSelected
                          ? '0 8px 32px rgba(200,167,106,0.22)'
                          : '0 4px 16px rgba(91,70,54,0.06)',
                        cursor: selected !== null ? 'default' : 'pointer',
                      }}
                    >
                      {/* Number / check circle */}
                      <motion.div
                        animate={isSelected ? { scale: [1, 1.25, 1], backgroundColor: '#C8A76A' } : {}}
                        transition={{ duration: 0.35 }}
                        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 font-serif text-lg font-bold transition-colors duration-300"
                        style={{
                          backgroundColor: isSelected ? '#C8A76A' : 'rgba(200,167,106,0.15)',
                          color: isSelected ? '#F8F5F0' : '#C8A76A',
                        }}
                      >
                        {isSelected ? <Check size={18} strokeWidth={3} /> : opt.num}
                      </motion.div>

                      {/* Label */}
                      <div className="flex-1">
                        <span className="font-serif text-xl" style={{ color: '#2E2E2E' }}>
                          {opt.emoji} {opt.label}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Confirmation message after selection */}
              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-10 paper-card rounded-2xl px-8 py-7 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 220, delay: 0.3 }}
                      className="text-4xl mb-4"
                    >
                      🎊
                    </motion.div>
                    <p className="font-serif text-2xl italic mb-2" style={{ color: '#2E2E2E' }}>
                      Perfect choice!
                    </p>
                    <p className="font-sans text-sm mt-2" style={{ color: '#7A6251' }}>
                      {DATE_OPTIONS[selected].emoji} <span className="font-medium">{DATE_OPTIONS[selected].label}</span> it is.
                    </p>
                    <p className="font-serif italic text-sm mt-3" style={{ color: 'rgba(200,167,106,0.8)' }}>
                      Can't wait. ❤️
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── No response ── */}
          {answered === 'no' && (
            <motion.div
              key="no-response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full text-center"
            >
              <motion.div
                animate={{ rotate: [0, -5, 5, -3, 3, 0] }}
                transition={{ duration: 0.5 }}
                className="text-5xl mb-6"
              >
                🤖
              </motion.div>
              <h2 className="font-serif text-2xl md:text-3xl mb-6" style={{ color: '#2E2E2E' }}>
                {content.noResponse}
              </h2>
              <button
                onClick={() => { setAnswered(null); setNoPos({ x: 0, y: 0 }); setNoAttempts(0) }}
                className="vintage-btn rounded"
              >
                Try Again
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </section>
    </motion.div>
  )
}
