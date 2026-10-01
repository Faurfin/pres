// Анимированные SVG-диаграммы трёх способов передачи тепла

function Flame({ x, y, scale = 1, slow = false }: { x: number; y: number; scale?: number; slow?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <g className={slow ? 'flame flame--slow' : 'flame'}>
        <path d="M0,-26 C8,-14 12,-8 12,2 C12,13 6,20 0,20 C-6,20 -12,13 -12,2 C-12,-8 -8,-14 0,-26 Z" fill="#ff7a29" />
        <path d="M0,-12 C4,-5 7,-2 7,5 C7,12 3,16 0,16 C-3,16 -7,12 -7,5 C-7,-2 -4,-5 0,-12 Z" fill="#f5d547" />
      </g>
    </g>
  )
}

export function ConductionDiagram() {
  // Металлический стержень над пламенем: частицы слева колеблются сильнее, фронт нагрева ползёт вправо
  const particles = Array.from({ length: 14 }, (_, i) => 60 + i * 30)
  return (
    <svg viewBox="0 0 520 260" className="w-full h-full" role="img" aria-label="Теплопроводность">
      <Flame x={70} y={215} />
      <Flame x={100} y={218} scale={0.8} slow />
      <Flame x={45} y={220} scale={0.7} slow />
      {/* стержень */}
      <rect x={40} y={120} width={440} height={44} fill="#3d2a14" stroke="#fdf3e3" strokeWidth={3} />
      <defs>
        <linearGradient id="heatGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff7a29" />
          <stop offset="60%" stopColor="#f5d547" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#3d2a14" stopOpacity="0" />
        </linearGradient>
        <clipPath id="rodClip"><rect x={40} y={120} width={440} height={44} /></clipPath>
      </defs>
      <g clipPath="url(#rodClip)">
        <rect className="heat-front" x={40} y={120} height={44} fill="url(#heatGrad)" />
      </g>
      {/* частицы */}
      {particles.map((cx, i) => (
        <circle
          key={cx}
          className="particle"
          style={{ animationDuration: `${Math.max(0.18, 0.62 - i * 0.032)}s` }}
          cx={cx}
          cy={142}
          r={7}
          fill={i < 4 ? '#f5d547' : '#fdf3e3'}
          opacity={i < 4 ? 1 : 0.55}
        />
      ))}
      {/* стрелка направления передачи */}
      <g stroke="#ff7a29" strokeWidth={5} fill="none" strokeLinecap="round">
        <line x1={150} y1={88} x2={420} y2={88} />
        <path d="M420,88 l-16,-10 M420,88 l-16,10" />
      </g>
      <text x={285} y={72} textAnchor="middle" fill="#ff7a29" fontSize={20} fontFamily="'Russo One', sans-serif">
        энергия → к холодному концу
      </text>
      <text x={85} y={250} textAnchor="middle" fill="#f5d547" fontSize={16} fontFamily="'Manrope', sans-serif">
        нагрев
      </text>
    </svg>
  )
}

export function ConvectionDiagram() {
  // Кастрюля на плите: тёплые потоки вверх по центру, холодные вниз по краям
  const ups = [210, 260, 310]
  const downs = [95, 425]
  return (
    <svg viewBox="0 0 520 260" className="w-full h-full" role="img" aria-label="Конвекция">
      <Flame x={235} y={235} />
      <Flame x={285} y={238} scale={0.85} slow />
      <Flame x={260} y={228} scale={1.1} slow />
      {/* кастрюля */}
      <path d="M60,60 h400 v110 a20,20 0 0 1 -20,20 h-360 a20,20 0 0 1 -20,-20 Z" fill="#221709" stroke="#fdf3e3" strokeWidth={3} />
      {/* вода */}
      <path d="M64,84 h392 v84 a18,18 0 0 1 -18,18 h-356 a18,18 0 0 1 -18,-18 Z" fill="#12314a" opacity={0.85} />
      {/* тёплые потоки вверх */}
      {ups.map((x, i) => (
        <g key={x} className="flow-up" style={{ animationDelay: `${i * 0.7}s` }}>
          <path d={`M${x},150 q10,-18 0,-36 q-10,-18 0,-36`} fill="none" stroke="#ff7a29" strokeWidth={5} strokeLinecap="round" />
          <path d={`M${x},72 l-9,14 h18 Z`} fill="#ff7a29" />
        </g>
      ))}
      {/* холодные потоки вниз */}
      {downs.map((x, i) => (
        <g key={x} className="flow-down" style={{ animationDelay: `${i * 0.9}s` }}>
          <path d={`M${x},70 q10,18 0,36 q-10,18 0,36`} fill="none" stroke="#6cc7ff" strokeWidth={5} strokeLinecap="round" />
          <path d={`M${x},150 l-9,-14 h18 Z`} fill="#6cc7ff" />
        </g>
      ))}
      <text x={260} y={40} textAnchor="middle" fill="#ff7a29" fontSize={18} fontFamily="'Russo One', sans-serif">
        тёплая вода ↑
      </text>
      <text x={95} y={40} textAnchor="middle" fill="#6cc7ff" fontSize={18} fontFamily="'Russo One', sans-serif">
        холодная ↓
      </text>
      <text x={425} y={40} textAnchor="middle" fill="#6cc7ff" fontSize={18} fontFamily="'Russo One', sans-serif">
        холодная ↓
      </text>
    </svg>
  )
}

export function RadiationDiagram() {
  // Солнце и рука/Земля: волнистые лучи через пустоту
  const rays = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
  return (
    <svg viewBox="0 0 520 260" className="w-full h-full" role="img" aria-label="Излучение">
      {/* звёзды — напоминание о вакууме */}
      {[
        [180, 30], [250, 55], [330, 25], [410, 60], [300, 90], [200, 110], [380, 110], [460, 30],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.2} fill="#fdf3e3" opacity={0.6} />
      ))}
      {/* солнце */}
      <circle cx={90} cy={130} r={46} fill="#f5d547" stroke="#fdf3e3" strokeWidth={3} />
      <circle cx={90} cy={130} r={30} fill="#ff7a29" opacity={0.55} />
      {rays.map((a, i) => {
        const rad = (a * Math.PI) / 180
        const x1 = 90 + Math.cos(rad) * 54
        const y1 = 130 + Math.sin(rad) * 54
        const x2 = 90 + Math.cos(rad) * 70
        const y2 = 130 + Math.sin(rad) * 70
        return (
          <line
            key={a}
            className="ray"
            style={{ animationDelay: `${i * 0.15}s` }}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#f5d547" strokeLinecap="round"
          />
        )
      })}
      {/* лучи к Земле — волнистые */}
      {[95, 130, 165].map((y, i) => (
        <path
          key={y}
          className="ray"
          style={{ animationDelay: `${0.4 + i * 0.3}s` }}
          d={`M150,${y} q15,-12 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0`}
          fill="none"
          stroke="#ff5c8a"
          strokeLinecap="round"
        />
      ))}
      <path d="M452,130 l-14,-9 v18 Z" fill="#ff5c8a" />
      {/* земной шар */}
      <circle cx={468} cy={130} r={40} fill="#12314a" stroke="#fdf3e3" strokeWidth={3} />
      <path d="M444,108 q14,10 30,4 q14,-5 18,10" fill="none" stroke="#a8e063" strokeWidth={5} strokeLinecap="round" />
      <path d="M440,138 q16,6 26,16 q10,8 22,2" fill="none" stroke="#a8e063" strokeWidth={5} strokeLinecap="round" />
      <text x={90} y={225} textAnchor="middle" fill="#f5d547" fontSize={18} fontFamily="'Russo One', sans-serif">Солнце</text>
      <text x={300} y={225} textAnchor="middle" fill="#ff5c8a" fontSize={18} fontFamily="'Russo One', sans-serif">вакуум — без вещества!</text>
      <text x={468} y={225} textAnchor="middle" fill="#6cc7ff" fontSize={18} fontFamily="'Russo One', sans-serif">Земля</text>
    </svg>
  )
}
