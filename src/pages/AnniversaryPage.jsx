import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Heart } from 'lucide-react'
import content from '../data/content.json'

const ROTATIONS = [-3.5, 2.5, -1.8, 3.2, -2.2, 1.5]

function PolaroidCard({ photo, rotation, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: rotation }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{
        y: -10,
        rotate: rotation * 0.3,
        scale: 1.04,
        zIndex: 20,
        transition: { duration: 0.3 },
      }}
      className="polaroid cursor-pointer relative"
      style={{ zIndex: 1 }}
    >
      <div className="w-full overflow-hidden relative" style={{ height: 180 }}>
        <img
          src={photo.src}
          alt=""
          aria-hidden
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'blur(14px) brightness(0.55)', transform: 'scale(1.15)',
          }}
        />
        <img
          src={photo.src}
          alt={photo.alt}
          style={{
            position: 'relative', zIndex: 1,
            width: '100%', height: '100%', objectFit: 'contain',
          }}
        />
      </div>
      <p
        className="text-center mt-3 font-serif text-xs italic"
        style={{ color: '#7A6251' }}
      >
        {photo.alt}
      </p>
    </motion.div>
  )
}

export default function AnniversaryPage() {
  const navigate = useNavigate()
  const lines = content.heroMessage.split('\n')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen vintage-paper"
    >
      {/* Hero section */}
      <section className="relative pt-20 pb-16 px-5 text-center overflow-hidden">
        {/* Subtle top vignette */}
        <div
          className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(200,167,106,0.06), transparent)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-sans text-xs tracking-[0.4em] uppercase mb-5"
          style={{ color: '#C8A76A' }}
        >
          24-06-19
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="font-serif text-5xl md:text-7xl mb-6"
          style={{ color: '#2E2E2E' }}
        >
          {content.anniversaryMessage}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="gold-divider max-w-xs mx-auto mb-12"
        />
      </section>

      {/* Polaroid collage */}
      <section className="px-5 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {content.photos.slice(0, 6).map((photo, i) => (
              <PolaroidCard
                key={photo.id}
                photo={photo}
                rotation={ROTATIONS[i]}
                delay={0.5 + i * 0.12}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Heartfelt message */}
      <section className="px-5 py-16 text-center relative">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <Heart
              size={20}
              className="mx-auto mb-8"
              style={{ color: '#C8A76A' }}
              fill="rgba(200,167,106,0.3)"
            />

            <div className="space-y-2 mb-10">
              {lines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.14, duration: 0.6 }}
                  className="block font-serif text-xl md:text-2xl italic"
                  style={{ color: '#5B4636' }}
                >
                  {line}
                </motion.span>
              ))}
            </div>

            <div className="gold-divider-sm mb-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button
              onClick={() => navigate('/journey')}
              className="vintage-btn-filled rounded"
            >
              Relive Our Journey <ArrowRight size={14} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Bottom vignette */}
      <div
        className="h-16 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(91,70,54,0.04), transparent)',
        }}
      />
    </motion.div>
  )
}
