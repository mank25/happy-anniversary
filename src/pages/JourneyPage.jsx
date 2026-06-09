import { useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import content from '../data/content.json'

function calculateDays(dateString) {
  let start
  const dmy = dateString.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (dmy) {
    start = new Date(+dmy[3], +dmy[2] - 1, +dmy[1])
  } else {
    const parts = dateString.split('-')
    if (parts.length === 3 && parts[0].length <= 2) {
      start = new Date(+parts[2], +parts[1] - 1, +parts[0])
    } else {
      start = new Date(dateString)
    }
  }
  return Math.floor((new Date() - start) / (1000 * 60 * 60 * 24))
}

function YearNode({ inView, year }) {
  return (
    <div className="flex-shrink-0 relative z-10 flex items-center justify-center" style={{ width: 60 }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.22 }}
        className="rounded-full flex items-center justify-center"
        style={{
          width: 52,
          height: 52,
          backgroundColor: '#C8A76A',
          color: '#F8F5F0',
          fontFamily: "'Playfair Display', serif",
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '0.04em',
          boxShadow: '0 0 0 7px rgba(200,167,106,0.14), 0 4px 22px rgba(200,167,106,0.3)',
          lineHeight: 1.2,
          textAlign: 'center',
        }}
      >
        {year}
      </motion.div>
    </div>
  )
}

function CardContent({ milestone, align }) {
  const isRight = align === 'right'
  return (
    <div className="milestone-card rounded-2xl p-7 h-full" style={{ textAlign: align }}>
      <span className="year-badge mb-4 inline-block">{milestone.year}</span>
      <h3 className="font-serif text-2xl mb-3 leading-snug" style={{ color: '#2E2E2E' }}>
        {milestone.title}
      </h3>
      <div
        style={{
          height: 2,
          width: 44,
          backgroundColor: 'rgba(200,167,106,0.55)',
          borderRadius: 2,
          marginBottom: 14,
          marginLeft: isRight ? 'auto' : 0,
        }}
      />
      <p className="font-sans text-sm leading-relaxed" style={{ color: '#7A6251' }}>
        {milestone.description}
      </p>
    </div>
  )
}

function PhotoFrame({ milestone }) {
  if (!milestone.photo) {
    return (
      <div
        className="w-56 h-56 rounded-2xl flex flex-col items-center justify-center gap-2 mx-auto"
        style={{
          background: 'linear-gradient(135deg, rgba(200,167,106,0.1) 0%, rgba(91,70,54,0.07) 100%)',
          border: '1.5px dashed rgba(200,167,106,0.3)',
        }}
      >
        <span style={{ fontSize: 34, opacity: 0.35 }}>📷</span>
        <span
          className="font-sans text-xs tracking-widest uppercase"
          style={{ color: 'rgba(200,167,106,0.45)' }}
        >
          Memory
        </span>
      </div>
    )
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1.5 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="polaroid mx-auto"
      style={{ width: 224, cursor: 'default' }}
    >
      <div style={{ height: 192, overflow: 'hidden', position: 'relative' }}>
        <img
          src={milestone.photo}
          alt=""
          aria-hidden
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'blur(14px) brightness(0.55)', transform: 'scale(1.15)',
          }}
        />
        <img
          src={milestone.photo}
          alt={milestone.year}
          style={{
            position: 'relative', zIndex: 1,
            width: '100%', height: '100%', objectFit: 'contain',
          }}
        />
      </div>
      <p
        className="font-serif italic text-center text-xs pt-2"
        style={{ color: '#7A6251', opacity: 0.65 }}
      >
        {milestone.year}
      </p>
    </motion.div>
  )
}

function MilestoneCard({ milestone, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative mb-16 md:mb-24">

      {/* ── Desktop ── */}
      <div className="hidden md:flex w-full items-center">
        {isLeft ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -65 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-1 pr-4"
            >
              <CardContent milestone={milestone} align="right" />
            </motion.div>

            <YearNode inView={inView} year={milestone.year} />

            <motion.div
              initial={{ opacity: 0, x: 65 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }}
              className="flex-1 pl-4 flex justify-start"
            >
              <PhotoFrame milestone={milestone} />
            </motion.div>
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, x: -65 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-1 pr-4 flex justify-end"
            >
              <PhotoFrame milestone={milestone} />
            </motion.div>

            <YearNode inView={inView} year={milestone.year} />

            <motion.div
              initial={{ opacity: 0, x: 65 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.12 }}
              className="flex-1 pl-4"
            >
              <CardContent milestone={milestone} align="left" />
            </motion.div>
          </>
        )}
      </div>

      {/* ── Mobile ── */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="md:hidden flex gap-4"
      >
        <div className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: 3 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 230, damping: 16, delay: 0.15 }}
            className="rounded-full flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              fontSize: '10px',
              fontFamily: "'Playfair Display', serif",
              fontWeight: '700',
              backgroundColor: '#C8A76A',
              color: '#F8F5F0',
              boxShadow: '0 0 0 4px rgba(200,167,106,0.18)',
              flexShrink: 0,
            }}
          >
            {milestone.year.slice(2)}
          </motion.div>
        </div>

        <div className="flex-1 min-w-0 pb-4">
          {milestone.photo && (
            <div
              className="w-full rounded-xl mb-4 overflow-hidden relative"
              style={{ height: 180 }}
            >
              <img
                src={milestone.photo}
                alt=""
                aria-hidden
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', filter: 'blur(14px) brightness(0.55)', transform: 'scale(1.15)',
                }}
              />
              <img
                src={milestone.photo}
                alt={milestone.year}
                style={{
                  position: 'relative', zIndex: 1,
                  width: '100%', height: '100%', objectFit: 'contain',
                }}
              />
            </div>
          )}
          <div className="milestone-card rounded-xl p-5">
            <span className="year-badge mb-3 inline-block">{milestone.year}</span>
            <h3 className="font-serif text-xl mb-2 leading-snug" style={{ color: '#2E2E2E' }}>
              {milestone.title}
            </h3>
            <div
              style={{
                height: 2,
                width: 36,
                backgroundColor: 'rgba(200,167,106,0.55)',
                borderRadius: 2,
                marginBottom: 10,
              }}
            />
            <p className="font-sans text-sm leading-relaxed" style={{ color: '#7A6251' }}>
              {milestone.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Timeline() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.15'],
  })

  return (
    <div ref={containerRef} className="relative">
      {/* Desktop — scroll-linked spine */}
      <motion.div
        className="hidden md:block absolute top-0 bottom-0 w-px pointer-events-none"
        style={{
          left: 'calc(50% - 0.5px)',
          scaleY: scrollYProgress,
          originY: 0,
          backgroundColor: 'rgba(200,167,106,0.38)',
        }}
      />

      {/* Mobile — static spine */}
      <div
        className="md:hidden absolute top-0 bottom-0 w-px pointer-events-none"
        style={{ left: 17, backgroundColor: 'rgba(200,167,106,0.25)' }}
      />

      {content.milestones.map((milestone, i) => (
        <MilestoneCard key={milestone.year} milestone={milestone} index={i} />
      ))}
    </div>
  )
}

export default function JourneyPage() {
  const navigate = useNavigate()
  const days = calculateDays(content.anniversaryDate)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen vintage-paper"
    >
      {/* Header */}
      <section className="pt-20 pb-12 px-5 text-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-sans text-xs tracking-[0.4em] uppercase mb-4"
          style={{ color: '#C8A76A' }}
        >
          Our Story
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="font-serif text-4xl md:text-6xl mb-4"
          style={{ color: '#2E2E2E' }}
        >
          The Journey
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="gold-divider max-w-xs mx-auto"
        />
      </section>

      {/* Timeline */}
      <section className="px-5 md:px-10 lg:px-20 pb-20 max-w-5xl mx-auto">
        <Timeline />
      </section>

      {/* Days counter footer */}
      <section className="px-5 pb-20 text-center">
        <div className="gold-divider max-w-sm mx-auto mb-12" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto"
        >
          <p className="font-serif text-lg italic mb-2" style={{ color: '#7A6251' }}>
            No starting point.
          </p>
          <p className="font-serif text-lg italic mb-2" style={{ color: '#7A6251' }}>
            No ending point.
          </p>
          <p className="font-serif text-lg italic mb-8" style={{ color: '#7A6251' }}>
            Just{' '}
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="font-bold not-italic text-2xl"
              style={{ color: '#C8A76A' }}
            >
              {days.toLocaleString()}
            </motion.span>{' '}
            days of choosing each other.
          </p>
          <button
            onClick={() => navigate('/celebration')}
            className="vintage-btn-filled rounded inline-flex items-center gap-2"
          >
            Continue <ArrowRight size={14} />
          </button>
        </motion.div>
      </section>
    </motion.div>
  )
}
