import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music2, Volume2, VolumeX } from 'lucide-react'

export default function MusicPlayer({ src }) {
  const [playing, setPlaying] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }, [playing])

  if (!src) return null

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
      className="fixed bottom-6 left-5 z-[9990]"
    >
      <audio ref={audioRef} src={src} loop preload="auto" />
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setPlaying((p) => !p)}
        className="flex items-center gap-2.5 px-4 py-2.5 paper-card rounded-full"
        style={{ color: '#C8A76A' }}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <motion.div
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={
            playing
              ? { duration: 4, repeat: Infinity, ease: 'linear' }
              : { duration: 0.3 }
          }
        >
          <Music2 size={15} />
        </motion.div>
        <span
          className="font-sans text-xs tracking-widest uppercase hidden sm:block"
          style={{ color: '#7A6251' }}
        >
          {playing ? 'Playing' : 'Music'}
        </span>
        {playing ? (
          <Volume2 size={13} />
        ) : (
          <VolumeX size={13} style={{ opacity: 0.5 }} />
        )}
      </motion.button>
    </motion.div>
  )
}
