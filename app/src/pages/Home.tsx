import { useCallback, useEffect, useState } from 'react'
import { SLIDES, GameIntroSlide } from '../sections/slides'
import Game from '../components/Game'

type Mode = 'slides' | 'game-intro' | 'game'

export default function Home() {
  const [mode, setMode] = useState<Mode>('slides')
  const [index, setIndex] = useState(0)

  const total = SLIDES.length
  const isLast = index === total - 1

  const next = useCallback(() => {
    if (mode !== 'slides') return
    if (isLast) setMode('game-intro')
    else setIndex(i => i + 1)
  }, [mode, isLast])

  const prev = useCallback(() => {
    if (mode === 'game') return
    if (mode === 'game-intro') { setMode('slides'); return }
    setIndex(i => Math.max(0, i - 1))
  }, [mode])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        next()
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  return (
    <div className="h-screen flex flex-col" style={{ background: 'var(--ink)' }}>
      <main className="flex-1 min-h-0 relative">
        {mode === 'slides' && (
          <div key={SLIDES[index].id} className="slide-enter h-full">
            {SLIDES[index].node}
          </div>
        )}
        {mode === 'game-intro' && (
          <div className="slide-enter h-full">
            <GameIntroSlide onStart={() => setMode('game')} />
          </div>
        )}
        {mode === 'game' && <Game onExit={() => setMode('slides')} />}
      </main>

      {mode !== 'game' && (
        <footer
          className="flex items-center justify-between px-6 md:px-10 py-3"
          style={{ borderTop: '3px solid var(--line)' }}
        >
          <button className="btn-3d btn-3d--small btn-3d--ghost" onClick={prev} disabled={mode === 'slides' && index === 0}>
            ← Назад
          </button>
          <div className="flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setMode('slides'); setIndex(i) }}
                aria-label={`Слайд ${i + 1}`}
                className="w-2.5 h-2.5 rounded-full transition-all"
                style={{
                  background: mode === 'slides' && i === index ? '#ff7a29' : 'rgba(253,243,227,0.25)',
                  transform: mode === 'slides' && i === index ? 'scale(1.5)' : 'none',
                }}
              />
            ))}
            <button
              onClick={() => setMode('game')}
              className="ml-3 font-display uppercase text-xs md:text-sm px-3 py-1 border-2 rounded-full"
              style={{ borderColor: '#f5d547', color: '#f5d547' }}
            >
              Игра
            </button>
          </div>
          <button className="btn-3d btn-3d--small" onClick={() => (mode === 'game-intro' ? setMode('game') : next())}>
            {mode === 'game-intro' ? 'К игре →' : isLast ? 'К игре →' : 'Далее →'}
          </button>
        </footer>
      )}
    </div>
  )
}
