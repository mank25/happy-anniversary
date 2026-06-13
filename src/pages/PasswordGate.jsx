import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import content from '../data/content.json'

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 5.3) % 90}%`,
  delay: (i * 0.41) % 6,
  duration: 6 + (i * 0.7) % 5,
  size: 10 + (i * 3) % 14,
  rotate: (i * 37) % 360,
}))

function Petal({ left, delay, duration, size, rotate, burst, burstAngle }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top: -20, zIndex: 1 }}
      initial={{ y: -20, opacity: 0, rotate }}
      animate={
        burst
          ? {
              x: Math.cos(burstAngle) * 260,
              y: Math.sin(burstAngle) * 260,
              opacity: [1, 1, 0],
              rotate: rotate + 540,
              scale: [1, 1.4, 0],
            }
          : {
              y: ['0vh', '110vh'],
              opacity: [0, 0.7, 0.7, 0],
              rotate: [rotate, rotate + 180],
            }
      }
      transition={
        burst
          ? { duration: 1.2, ease: 'easeOut' }
          : {
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
              times: [0, 0.1, 0.85, 1],
            }
      }
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21C12 21 3 14 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14 14 21 12 21Z"
          fill="#C8A76A"
          fillOpacity="0.55"
        />
      </svg>
    </motion.div>
  )
}

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [burstAngles] = useState(() =>
    PETALS.map((_, i) => (i / PETALS.length) * Math.PI * 2)
  )
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value === content.password) {
      setError('')
      setPhase('opening')
      setTimeout(() => {
        onUnlock()
        navigate('/anniversary')
      }, 2000)
    } else {
      setPhase('shaking')
      setError('Hmm... memory mismatch detected ❤️')
      setTimeout(() => setPhase('idle'), 600)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen vintage-paper flex items-center justify-center relative overflow-hidden"
    >
      {/* Corner ornaments */}
      <Ornament position="top-6 left-6" />
      <Ornament position="top-6 right-6" flip />
      <Ornament position="bottom-6 left-6" flipY />
      <Ornament position="bottom-6 right-6" flip flipY />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(91,70,54,0.12) 100%)',
        }}
      />

      {/* Floating petals */}
      {PETALS.map((p, i) => (
        <Petal
          key={p.id}
          {...p}
          burst={phase === 'opening'}
          burstAngle={burstAngles[i]}
        />
      ))}

      {/* Card */}
      <motion.div
        animate={
          phase === 'shaking'
            ? {
                x: [-10, 10, -8, 8, -5, 5, -2, 2, 0],
                transition: { duration: 0.5, ease: 'easeInOut' },
              }
            : {}
        }
        className="relative z-10 w-full max-w-sm mx-5"
      >
        <motion.div
          className="paper-card rounded-2xl px-8 py-10"
          animate={
            phase === 'opening'
              ? { boxShadow: '0 0 80px 30px rgba(200,167,106,0.45)' }
              : { boxShadow: '0 8px 32px rgba(91,70,54,0.08)' }
          }
          transition={{ duration: 0.6 }}
        >
          {/* Animated heart icon */}
          <div className="flex justify-center mb-6">
            <motion.div
              animate={
                phase === 'opening'
                  ? { scale: [1, 1.6, 0], opacity: [1, 1, 0] }
                  : {
                      scale: [1, 1.08, 1],
                      filter: [
                        'drop-shadow(0 0 0px #C8A76A)',
                        'drop-shadow(0 0 8px #C8A76A)',
                        'drop-shadow(0 0 0px #C8A76A)',
                      ],
                    }
              }
              transition={
                phase === 'opening'
                  ? { duration: 0.9, ease: 'easeInOut' }
                  : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <svg width="52" height="52" viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M12 21C12 21 2 14 2 8C2 5.24 4.24 3 7 3C8.82 3 10.4 4 11.28 5.46C11.63 6.07 12.37 6.07 12.72 5.46C13.6 4 15.18 3 17 3C19.76 3 22 5.24 22 8C22 14 12 21 12 21Z"
                  fill="#C8A76A"
                  animate={
                    phase === 'opening'
                      ? { fill: ['#C8A76A', '#e74c3c', '#C8A76A'] }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                />
                {/* Inner shimmer lines */}
                <path
                  d="M9 9 C9 9 10 8 12 9"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          </div>

          <div className="text-center mb-5">
            <h1 className="font-serif text-2xl mb-3" style={{ color: '#2E2E2E' }}>
              Enter the Love Password
            </h1>
            <div className="gold-divider-sm mb-3" />
            <p className="font-sans text-xs" style={{ color: '#A08060' }}>
              If this takes more than 3 attempts, I'm a little concerned…
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center -mb-1">
              <button
                type="button"
                onClick={() => setShowHint((h) => !h)}
                className="font-sans text-xs underline underline-offset-2 decoration-dotted transition-opacity hover:opacity-80"
                style={{ color: '#A08060' }}
              >
                {showHint ? 'hide hint' : 'need a hint?'}
              </button>
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="font-serif text-xs italic mt-1.5"
                    style={{ color: '#7A6251' }}
                  >
                    You had 7 years to remember the digits&nbsp;✨
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <input
                type={showPw ? 'text' : 'password'}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value)
                  if (error) setError('')
                }}
                placeholder="Your secret password"
                disabled={phase === 'opening'}
                className="w-full px-4 py-3 pr-11 font-sans text-sm bg-ivory border focus:outline-none transition-all duration-300 rounded"
                style={{
                  borderColor: error ? '#c0392b' : 'rgba(200,167,106,0.4)',
                  color: '#2E2E2E',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#C8A76A')}
                onBlur={(e) =>
                  (e.target.style.borderColor = error
                    ? '#c0392b'
                    : 'rgba(200,167,106,0.4)')
                }
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                style={{ color: '#7A6251' }}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="font-sans text-xs text-center"
                  style={{ color: '#c0392b' }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={phase === 'opening'}
              className="vintage-btn w-full justify-center rounded"
            >
              {phase === 'opening' ? 'Unlocking...' : 'Unlock Memories'}
            </button>

          </form>
        </motion.div>
      </motion.div>

      {/* Golden iris transition */}
      <AnimatePresence>
        {phase === 'opening' && (
          <motion.div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: '#C8A76A' }}
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(150% at 50% 50%)' }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.85 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Ornament({ position, flip, flipY }) {
  return (
    <div
      className={`absolute ${position} w-12 h-12 pointer-events-none`}
      style={{
        transform: `${flip ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}`,
      }}
    >
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full opacity-25">
        <path
          d="M4 4 L4 18 M4 4 L18 4"
          stroke="#C8A76A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="4" cy="4" r="2" fill="#C8A76A" />
      </svg>
    </div>
  )
}
