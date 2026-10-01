import type { ReactNode } from 'react'
import { ConductionDiagram, ConvectionDiagram, RadiationDiagram } from '../components/diagrams'

const FLAME = '#ff7a29'
const SUN = '#f5d547'
const HOT = '#ff5c8a'
const SKY = '#6cc7ff'
const LIME = '#a8e063'
const CREAM = '#fdf3e3'
const MUTED = 'rgba(253,243,227,0.7)'

function Tag({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span
      className="font-display uppercase text-xs md:text-sm px-4 py-1.5 border-2 rounded-full inline-block"
      style={{ borderColor: color, color }}
    >
      {children}
    </span>
  )
}

function BigWord({ children, color = CREAM }: { children: ReactNode; color?: string }) {
  return (
    <h2 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)', color }}>
      {children}
    </h2>
  )
}

function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg md:text-2xl font-semibold leading-snug max-w-4xl" style={{ color: CREAM }}>
      {children}
    </p>
  )
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="text-base md:text-xl leading-relaxed max-w-3xl" style={{ color: MUTED }}>
      {children}
    </p>
  )
}

function DiagramPanel({ children, caption }: { children: ReactNode; caption: string }) {
  return (
    <div className="w-full max-w-4xl border-[3px] p-4 md:p-6" style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}>
      <div className="w-full" style={{ aspectRatio: '2 / 1' }}>{children}</div>
      <p className="text-center text-xs md:text-sm mt-2 uppercase tracking-widest" style={{ color: MUTED }}>{caption}</p>
    </div>
  )
}

function Chip({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span
      className="px-4 py-2 border-2 font-semibold text-sm md:text-lg inline-block"
      style={{ borderColor: color, color }}
    >
      {children}
    </span>
  )
}

export type Slide = { id: string; node: ReactNode }

export const SLIDES: Slide[] = [
  {
    id: 'title',
    node: (
      <div className="h-full flex flex-col">
        <FlameStrip />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center px-6 stagger">
          <Tag color={SUN}>Физика · 8 класс</Tag>
          <h1 className="font-display uppercase leading-[0.95]" style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}>
            <span style={{ color: CREAM }}>Способы</span>
            <br />
            <span className="text-outline">передачи</span>
            <br />
            <span style={{ color: FLAME }}>теплоты</span>
          </h1>
          <Note>Теплопроводность · конвекция · излучение — и игра «Своя игра» в конце урока</Note>
        </div>
        <FlameStrip reverse />
      </div>
    ),
  },
  {
    id: 'intro',
    node: (
      <div className="h-full flex flex-col justify-center gap-8 px-6 md:px-16 stagger">
        <Tag color={SUN}>Вступление</Tag>
        <BigWord>Куда уходит тепло?</BigWord>
        <Lead>
          Энергия сама переходит <span style={{ color: FLAME }}>от более нагретых тел к менее нагретым</span> — пока температуры не сравняются.
        </Lead>
        <Note>
          Передать энергию можно, не совершая работы. В природе для этого есть три способа — и сегодня мы разберём каждый.
        </Note>
        <div className="flex gap-4 md:gap-8 flex-wrap">
          {[
            ['01', 'Теплопроводность', FLAME],
            ['02', 'Конвекция', SKY],
            ['03', 'Излучение', HOT],
          ].map(([n, t, c]) => (
            <div key={n} className="border-[3px] p-5 md:p-7 min-w-[200px] flex-1" style={{ borderColor: c as string, background: 'var(--panel)' }}>
              <div className="font-display text-3xl md:text-4xl mb-2" style={{ color: c as string }}>{n}</div>
              <div className="font-display uppercase text-lg md:text-2xl" style={{ color: CREAM }}>{t}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'conduction',
    node: (
      <div className="h-full flex flex-col justify-center items-center gap-6 px-6 md:px-16 stagger">
        <div className="w-full max-w-4xl flex items-start"><Tag color={FLAME}>Способ 01</Tag></div>
        <div className="w-full max-w-4xl"><BigWord color={FLAME}>Теплопроводность</BigWord></div>
        <Lead>
          Перенос энергии от нагретого участка тела к холодному <span style={{ color: SUN }}>за счёт движения и столкновений частиц</span>. Вещество при этом никуда не перемещается!
        </Lead>
        <DiagramPanel caption="Частицы у огня колеблются быстрее и «толкают» соседей — тепло ползёт по стержню">
          <ConductionDiagram />
        </DiagramPanel>
        <Note>Пример: металлическая ложка в горячем чае быстро нагревается целиком.</Note>
      </div>
    ),
  },
  {
    id: 'conductors',
    node: (
      <div className="h-full flex flex-col justify-center gap-7 px-6 md:px-16 stagger">
        <Tag color={FLAME}>Теплопроводность</Tag>
        <BigWord>Кто проводит, а кто бережёт</BigWord>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full">
          <div className="border-[3px] p-6 md:p-8 flex flex-col gap-4" style={{ borderColor: FLAME, background: 'var(--panel)' }}>
            <h3 className="font-display uppercase text-xl md:text-2xl" style={{ color: FLAME }}>Хорошие проводники</h3>
            <div className="flex flex-wrap gap-3">
              {['Серебро', 'Медь', 'Алюминий', 'Сталь'].map(x => <Chip key={x} color={FLAME}>{x}</Chip>)}
            </div>
            <Note>Металлы отдают и забирают тепло быстро — поэтому кастрюли делают из металла.</Note>
          </div>
          <div className="border-[3px] p-6 md:p-8 flex flex-col gap-4" style={{ borderColor: LIME, background: 'var(--panel)' }}>
            <h3 className="font-display uppercase text-xl md:text-2xl" style={{ color: LIME }}>Плохие проводники</h3>
            <div className="flex flex-wrap gap-3">
              {['Воздух', 'Дерево', 'Пух и шерсть', 'Пластик', 'Стекло'].map(x => <Chip key={x} color={LIME}>{x}</Chip>)}
            </div>
            <Note>Они сохраняют тепло: пуховая куртка, двойные рамы окон, пластиковая ручка сковороды.</Note>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'convection',
    node: (
      <div className="h-full flex flex-col justify-center items-center gap-6 px-6 md:px-16 stagger">
        <div className="w-full max-w-4xl flex items-start"><Tag color={SKY}>Способ 02</Tag></div>
        <div className="w-full max-w-4xl"><BigWord color={SKY}>Конвекция</BigWord></div>
        <Lead>
          Перенос энергии <span style={{ color: SUN }}>потоками жидкости или газа</span>: тёплые слои поднимаются вверх, холодные опускаются вниз.
        </Lead>
        <DiagramPanel caption="Тёплая вода у дна поднимается, холодная опускается — возникает круговой поток">
          <ConvectionDiagram />
        </DiagramPanel>
        <Note>Бывает естественной (сама, из-за нагрева) и вынужденной — с помощью вентилятора или насоса.</Note>
      </div>
    ),
  },
  {
    id: 'convection-life',
    node: (
      <div className="h-full flex flex-col justify-center gap-7 px-6 md:px-16 stagger">
        <Tag color={SKY}>Конвекция</Tag>
        <BigWord>Конвекция вокруг нас</BigWord>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 max-w-5xl">
          {[
            ['Отопление', 'Батарею ставят внизу: тёплый воздух поднимается и прогревает всю комнату.'],
            ['Морской бриз', 'Днём суша нагревается быстрее воды — прохладный ветер дует с моря.'],
            ['Дым из трубы', 'Нагретый воздух легче холодного, поэтому дым устремляется вверх.'],
            ['Вентиляция', 'Форточку открывают наверху: тёплый «отработанный» воздух уходит сам.'],
          ].map(([t, d]) => (
            <div key={t} className="border-l-4 pl-5 py-1" style={{ borderColor: SKY }}>
              <h3 className="font-display uppercase text-lg md:text-xl mb-1" style={{ color: SKY }}>{t}</h3>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: MUTED }}>{d}</p>
            </div>
          ))}
        </div>
        <Lead>Важно: в твёрдых телах конвекция <span style={{ color: HOT }}>невозможна</span> — вещество не может течь.</Lead>
      </div>
    ),
  },
  {
    id: 'radiation',
    node: (
      <div className="h-full flex flex-col justify-center items-center gap-6 px-6 md:px-16 stagger">
        <div className="w-full max-w-4xl flex items-start"><Tag color={HOT}>Способ 03</Tag></div>
        <div className="w-full max-w-4xl"><BigWord color={HOT}>Излучение</BigWord></div>
        <Lead>
          Передача энергии <span style={{ color: SUN }}>электромагнитными лучами</span>. Единственный способ, которому не нужно вещество — он работает даже в вакууме!
        </Lead>
        <DiagramPanel caption="Энергия Солнца долетает до Земли через пустой космос — лучами">
          <RadiationDiagram />
        </DiagramPanel>
        <Note>Излучают все нагретые тела: костёр, батарея, плита и даже мы с вами.</Note>
      </div>
    ),
  },
  {
    id: 'radiation-absorb',
    node: (
      <div className="h-full flex flex-col justify-center gap-7 px-6 md:px-16 stagger">
        <Tag color={HOT}>Излучение</Tag>
        <BigWord>Поглощать или отражать?</BigWord>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full">
          <div className="border-[3px] p-6 md:p-8 flex flex-col gap-4" style={{ borderColor: HOT, background: 'var(--panel)' }}>
            <h3 className="font-display uppercase text-xl md:text-2xl" style={{ color: HOT }}>Поглощают лучше</h3>
            <div className="flex flex-wrap gap-3">
              {['Тёмные', 'Шероховатые', 'Матовые'].map(x => <Chip key={x} color={HOT}>{x}</Chip>)}
            </div>
            <Note>Чёрная поверхность на солнце нагревается быстрее всех.</Note>
          </div>
          <div className="border-[3px] p-6 md:p-8 flex flex-col gap-4" style={{ borderColor: SUN, background: 'var(--panel)' }}>
            <h3 className="font-display uppercase text-xl md:text-2xl" style={{ color: SUN }}>Отражают лучше</h3>
            <div className="flex flex-wrap gap-3">
              {['Светлые', 'Гладкие', 'Блестящие'].map(x => <Chip key={x} color={SUN}>{x}</Chip>)}
            </div>
            <Note>Поэтому летом носят светлую одежду, а стенки термоса делают зеркальными.</Note>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'compare',
    node: (
      <div className="h-full flex flex-col justify-center gap-7 px-6 md:px-16 stagger">
        <Tag color={SUN}>Итог</Tag>
        <BigWord>Три способа — одна таблица</BigWord>
        <div className="w-full max-w-5xl border-[3px]" style={{ borderColor: 'var(--line)' }}>
          {[
            ['', 'Теплопроводность', 'Конвекция', 'Излучение'],
            ['Где происходит', 'В твёрдых телах', 'В жидкостях и газах', 'Везде, даже в вакууме'],
            ['Что переносит энергию', 'Колеблющиеся частицы', 'Потоки вещества', 'Электромагнитные лучи'],
            ['Пример', 'Ложка в горячем чае', 'Тёплый воздух от батареи', 'Тепло от костра и Солнца'],
          ].map((row, ri) => (
            <div
              key={ri}
              className="grid"
              style={{
                gridTemplateColumns: '1.1fr 1fr 1fr 1fr',
                background: ri === 0 ? 'var(--panel-2)' : 'transparent',
                borderTop: ri === 0 ? 'none' : '2px solid var(--line)',
              }}
            >
              {row.map((cell, ci) => (
                <div
                  key={ci}
                  className={`p-3 md:p-5 text-sm md:text-lg ${ri === 0 || ci === 0 ? 'font-display uppercase' : ''}`}
                  style={{
                    color:
                      ri === 0
                        ? [CREAM, FLAME, SKY, HOT][ci]
                        : ci === 0
                          ? SUN
                          : MUTED,
                  }}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
        <Note>В жизни все три способа обычно действуют одновременно — например, когда греемся у костра.</Note>
      </div>
    ),
  },
]

export function GameIntroSlide({ onStart }: { onStart: () => void }) {
  return (
    <div className="h-full flex flex-col">
      <FlameStrip />
      <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center px-6 stagger">
        <Tag color={HOT}>Финал урока</Tag>
        <h2 className="font-display uppercase leading-[0.95]" style={{ fontSize: 'clamp(2.8rem, 8vw, 6.5rem)' }}>
          <span style={{ color: CREAM }}>А теперь —</span>
          <br />
          <span style={{ color: SUN }}>Своя игра!</span>
        </h2>
        <Note>
          Две команды по очереди выбирают категорию и стоимость вопроса — 300, 400 или 500 баллов.
          Ответили верно — баллы ваши. Чем дороже вопрос, тем он хитрее!
        </Note>
        <button className="btn-3d text-xl" onClick={onStart}>Начать игру</button>
      </div>
      <FlameStrip reverse />
    </div>
  )
}

function FlameStrip({ reverse = false }: { reverse?: boolean }) {
  const items = Array.from({ length: 24 }, (_, i) => i)
  return (
    <div className="overflow-hidden py-3 select-none" style={{ borderTop: reverse ? '3px solid var(--line)' : 'none', borderBottom: reverse ? 'none' : '3px solid var(--line)' }}>
      <div className="marquee-track" style={reverse ? { animationDirection: 'reverse' } : undefined}>
        {[0, 1].map(half => (
          <div key={half} className="flex shrink-0">
            {items.map(i => (
              <svg key={i} width="34" height="40" viewBox="0 0 34 40" className="mx-3 shrink-0">
                <path
                  d="M17,2 C24,12 29,17 29,26 C29,34 23,39 17,39 C11,39 5,34 5,26 C5,17 10,12 17,2 Z"
                  fill={i % 3 === 0 ? '#f5d547' : '#ff7a29'}
                  opacity={i % 2 === 0 ? 1 : 0.55}
                />
              </svg>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
