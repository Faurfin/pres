import { useMemo, useState } from 'react'
import { CATEGORIES, type GameQuestion } from '../data/game'

type CellKey = `${number}-${number}`

type ActiveQuestion = {
  categoryIndex: number
  questionIndex: number
  data: GameQuestion
}

const TEAM_NAMES = ['Команда «Тепло»', 'Команда «Энергия»']
const TEAM_COLORS = ['#ff7a29', '#6cc7ff']

export default function Game({ onExit }: { onExit: () => void }) {
  const [used, setUsed] = useState<Set<CellKey>>(new Set())
  const [scores, setScores] = useState<[number, number]>([0, 0])
  const [turn, setTurn] = useState<0 | 1>(0)
  const [active, setActive] = useState<ActiveQuestion | null>(null)
  const [picked, setPicked] = useState<number | null>(null)
  const [flashTeam, setFlashTeam] = useState<number | null>(null)

  const totalCells = CATEGORIES.length * CATEGORIES[0].questions.length
  const finished = used.size === totalCells

  const winnerText = useMemo(() => {
    if (!finished) return ''
    if (scores[0] === scores[1]) return 'Ничья! Обе команды молодцы!'
    return scores[0] > scores[1] ? `Победила ${TEAM_NAMES[0]}!` : `Победила ${TEAM_NAMES[1]}!`
  }, [finished, scores])

  const openQuestion = (ci: number, qi: number) => {
    const key: CellKey = `${ci}-${qi}`
    if (used.has(key)) return
    setActive({ categoryIndex: ci, questionIndex: qi, data: CATEGORIES[ci].questions[qi] })
    setPicked(null)
  }

  const answer = (optionIndex: number) => {
    if (!active || picked !== null) return
    setPicked(optionIndex)
    const correct = optionIndex === active.data.correct
    const key: CellKey = `${active.categoryIndex}-${active.questionIndex}`
    setUsed(prev => new Set(prev).add(key))
    if (correct) {
      setScores(prev => {
        const next: [number, number] = [...prev]
        next[turn] += active.data.value
        return next
      })
      setFlashTeam(turn)
      setTimeout(() => setFlashTeam(null), 1300)
    }
  }

  const closeQuestion = () => {
    setActive(null)
    setPicked(null)
    setTurn(t => (t === 0 ? 1 : 0))
  }

  const restart = () => {
    setUsed(new Set())
    setScores([0, 0])
    setTurn(0)
    setActive(null)
    setPicked(null)
  }

  return (
    <div className="h-full flex flex-col px-6 md:px-12 py-6 gap-5">
      {/* Шапка игры */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="font-display text-3xl md:text-4xl uppercase" style={{ color: '#f5d547' }}>
          Своя игра
        </h2>
        <div className="flex items-center gap-3 md:gap-5">
          {[0, 1].map(i => (
            <div
              key={i}
              className={`px-4 py-2 border-[3px] rounded-full transition-all ${flashTeam === i ? 'score-flash' : ''} ${
                turn === i && !finished ? 'scale-105' : 'opacity-70'
              }`}
              style={{
                borderColor: TEAM_COLORS[i],
                background: turn === i && !finished ? TEAM_COLORS[i] : 'transparent',
                color: turn === i && !finished ? '#171009' : TEAM_COLORS[i],
              }}
            >
              <span className="font-display text-sm md:text-base uppercase">{TEAM_NAMES[i]}: </span>
              <span className="font-display text-xl md:text-2xl">{scores[i]}</span>
            </div>
          ))}
          <button className="btn-3d btn-3d--small btn-3d--ghost" onClick={onExit}>
            К теории
          </button>
        </div>
      </div>

      {!finished ? (
        <>
          <p className="text-sm md:text-base" style={{ color: 'rgba(253,243,227,0.65)' }}>
            Ходит: <b style={{ color: TEAM_COLORS[turn] }}>{TEAM_NAMES[turn]}</b> — выберите категорию и стоимость вопроса
          </p>
          {/* Игровое поле */}
          <div
            className="grid gap-3 flex-1 min-h-0"
            style={{ gridTemplateColumns: `repeat(${CATEGORIES.length}, 1fr)` }}
          >
            {CATEGORIES.map((cat, ci) => (
              <div key={cat.title} className="flex flex-col gap-3 min-h-0">
                <div
                  className="font-display uppercase text-center text-sm md:text-lg py-2 md:py-3 border-[3px]"
                  style={{ borderColor: cat.color, color: cat.color }}
                >
                  {cat.title}
                </div>
                {cat.questions.map((q, qi) => {
                  const key: CellKey = `${ci}-${qi}`
                  const isUsed = used.has(key)
                  return (
                    <button
                      key={key}
                      onClick={() => openQuestion(ci, qi)}
                      disabled={isUsed}
                      className="flex-1 min-h-[64px] border-[3px] font-display text-2xl md:text-4xl transition-all"
                      style={
                        isUsed
                          ? { borderColor: '#3d2a14', color: '#3d2a14', background: 'transparent' }
                          : { borderColor: cat.color, color: '#fdf3e3', background: 'var(--panel)', cursor: 'pointer' }
                      }
                      onMouseEnter={e => {
                        if (!isUsed) {
                          e.currentTarget.style.background = cat.color
                          e.currentTarget.style.color = '#171009'
                          e.currentTarget.style.transform = 'translate(-4px,-4px)'
                          e.currentTarget.style.boxShadow = `4px 4px 0 0 ${cat.color}55`
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isUsed) {
                          e.currentTarget.style.background = 'var(--panel)'
                          e.currentTarget.style.color = '#fdf3e3'
                          e.currentTarget.style.transform = ''
                          e.currentTarget.style.boxShadow = ''
                        }
                      }}
                    >
                      {isUsed ? '·' : q.value}
                    </button>
                  )
                })}
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Финал */
        <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center">
          <p className="font-display uppercase text-2xl" style={{ color: '#ff5c8a' }}>Игра окончена!</p>
          <p className="font-display uppercase text-4xl md:text-6xl text-outline">{winnerText}</p>
          <div className="flex gap-6 font-display text-2xl md:text-4xl">
            <span style={{ color: TEAM_COLORS[0] }}>{scores[0]}</span>
            <span style={{ color: 'rgba(253,243,227,0.4)' }}>:</span>
            <span style={{ color: TEAM_COLORS[1] }}>{scores[1]}</span>
          </div>
          <button className="btn-3d" onClick={restart}>Сыграть ещё раз</button>
        </div>
      )}

      {/* Модальное окно вопроса */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          style={{ background: 'rgba(15,9,4,0.82)' }}
          onClick={() => picked !== null && closeQuestion()}
        >
          <div
            className="modal-pop w-full max-w-3xl border-[3px] p-6 md:p-10 flex flex-col gap-6"
            style={{
              background: 'var(--panel)',
              borderColor: CATEGORIES[active.categoryIndex].color,
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <span
                className="font-display uppercase text-sm md:text-base px-4 py-1 border-2 rounded-full"
                style={{ borderColor: CATEGORIES[active.categoryIndex].color, color: CATEGORIES[active.categoryIndex].color }}
              >
                {CATEGORIES[active.categoryIndex].title}
              </span>
              <span className="font-display text-2xl md:text-3xl" style={{ color: CATEGORIES[active.categoryIndex].color }}>
                {active.data.value}
              </span>
            </div>

            <p className="text-lg md:text-2xl font-semibold leading-snug">{active.data.question}</p>

            <div className="grid gap-3">
              {active.data.options.map((opt, i) => {
                let bg = 'var(--panel-2)'
                let border = '#3d2a14'
                let color = '#fdf3e3'
                if (picked !== null) {
                  if (i === active.data.correct) {
                    bg = '#a8e063'; border = '#a8e063'; color = '#171009'
                  } else if (i === picked) {
                    bg = '#ff5c8a'; border = '#ff5c8a'; color = '#171009'
                  } else {
                    color = 'rgba(253,243,227,0.35)'
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => answer(i)}
                    disabled={picked !== null}
                    className="text-left px-5 py-3 border-[3px] font-semibold text-base md:text-lg transition-all"
                    style={{ background: bg, borderColor: border, color, cursor: picked === null ? 'pointer' : 'default' }}
                  >
                    <span className="font-display mr-3" style={{ color: picked === null ? CATEGORIES[active.categoryIndex].color : 'inherit' }}>
                      {String.fromCharCode(1040 + i)}
                    </span>
                    {opt}
                  </button>
                )
              })}
            </div>

            {picked !== null && (
              <>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: 'rgba(253,243,227,0.75)' }}>
                  {picked === active.data.correct
                    ? `Верно! +${active.data.value} баллов. `
                    : `Неверно. Правильный ответ — «${active.data.options[active.data.correct]}». `}
                  {active.data.explanation}
                </p>
                <div className="flex justify-end">
                  <button className="btn-3d btn-3d--small" onClick={closeQuestion} autoFocus>
                    Далее
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
