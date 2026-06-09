import { useState, useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import FilmGrainOverlay from './components/FilmGrainOverlay'
import MusicPlayer from './components/MusicPlayer'
import ScrollProgress from './components/ScrollProgress'
import PasswordGate from './pages/PasswordGate'
import AnniversaryPage from './pages/AnniversaryPage'
import JourneyPage from './pages/JourneyPage'
import CelebrationPage from './pages/CelebrationPage'
import content from './data/content.json'

function ProtectedRoute({ children }) {
  const unlocked = sessionStorage.getItem('unlocked') === 'true'
  return unlocked ? children : <Navigate to="/" replace />
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [isUnlocked, setIsUnlocked] = useState(
    sessionStorage.getItem('unlocked') === 'true'
  )
  const location = useLocation()

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2400)
    return () => clearTimeout(t)
  }, [])

  const handleUnlock = () => {
    sessionStorage.setItem('unlocked', 'true')
    setIsUnlocked(true)
  }

  if (loading) return <LoadingScreen />

  const showSharedUI = isUnlocked && location.pathname !== '/'

  return (
    <>
      <FilmGrainOverlay />
      {showSharedUI && <ScrollProgress />}
      {showSharedUI && <MusicPlayer src={content.music} />}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PasswordGate onUnlock={handleUnlock} />} />
          <Route
            path="/anniversary"
            element={
              <ProtectedRoute>
                <AnniversaryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/journey"
            element={
              <ProtectedRoute>
                <JourneyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/celebration"
            element={
              <ProtectedRoute>
                <CelebrationPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
