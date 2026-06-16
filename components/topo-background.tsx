'use client'

import { motion } from 'framer-motion'

interface TopoBackgroundProps {
  className?: string
  density?: 'low' | 'medium' | 'high'
  showGrid?: boolean
  showCoords?: boolean
  /** 'light' para seções com fundo branco/claro, 'dark' para seção hero escura */
  variant?: 'light' | 'dark'
}

export function TopoBackground({
  className = '',
  density = 'medium',
  showGrid = true,
  showCoords = false,
  variant = 'dark',
}: TopoBackgroundProps) {
  /* Cores das curvas adaptadas ao variant */
  const strokeColor = variant === 'dark' ? 'rgba(49,93,138,0.55)' : 'rgba(31,58,95,0.12)'
  const strokeColorB = variant === 'dark' ? 'rgba(49,93,138,0.35)' : 'rgba(31,58,95,0.08)'
  const strokeColorC = variant === 'dark' ? 'rgba(49,93,138,0.25)' : 'rgba(31,58,95,0.06)'
  const textColor   = variant === 'dark' ? 'rgba(49,93,138,0.5)' : 'rgba(31,58,95,0.3)'
  const accentColor = variant === 'dark' ? 'rgba(49,93,138,0.45)' : 'rgba(31,58,95,0.18)'
  const scaleColor  = variant === 'dark' ? 'rgba(49,93,138,0.4)' : 'rgba(31,58,95,0.22)'
  const gridClass   = variant === 'dark' ? 'technical-grid-dark' : 'technical-grid'

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Grid de engenharia */}
      {showGrid && (
        <div className={`absolute inset-0 ${gridClass}`} />
      )}

      {/* Curvas de nível SVG */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <filter id="topo-blur-v2">
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>

        {/* Grupo A — região superior */}
        <g stroke={strokeColor} fill="none" strokeWidth="1" filter="url(#topo-blur-v2)">
          <path d="M-80,180 C60,140 200,200 340,160 C480,120 560,180 680,150 C800,120 880,170 1000,140 C1100,115 1200,155 1300,130 C1380,112 1450,140 1500,125" />
          <path d="M-80,222 C70,178 210,242 360,198 C510,154 590,218 720,182 C850,146 930,202 1060,168 C1160,140 1260,180 1360,157 C1430,140 1480,170 1500,162" />
          <path d="M-80,268 C80,218 230,282 390,232 C550,182 630,250 770,212 C910,174 990,234 1120,197 C1220,167 1310,207 1410,182" />
          <path d="M-80,318 C90,260 250,328 420,270 C590,212 670,284 820,244 C970,204 1050,267 1180,230 C1280,200 1370,242 1460,217" />
          <path d="M-80,372 C100,306 270,374 450,310 C630,246 710,320 870,278 C1030,236 1110,302 1240,264 C1340,234 1430,280 1500,257" />
          <path d="M-80,430 C112,356 285,424 480,352 C675,280 755,357 920,314 C1085,271 1165,339 1295,300 C1395,270 1455,318 1500,297" />
        </g>

        {/* Grupo B — centro/direito */}
        <g stroke={strokeColorB} fill="none" strokeWidth="0.8">
          <path d="M600,500 C700,462 820,512 940,477 C1060,442 1140,492 1260,460 C1360,432 1440,467 1520,447" />
          <path d="M580,547 C690,502 820,557 950,520 C1080,483 1162,536 1285,502 C1385,474 1460,512 1520,494" />
          <path d="M560,597 C680,547 825,604 960,564 C1095,524 1178,580 1305,544 C1405,516 1465,557 1520,540" />
          <path d="M540,650 C670,594 832,654 972,610 C1112,566 1195,626 1326,588 C1426,558 1468,603 1520,586" />
          <path d="M520,707 C660,644 840,707 985,658 C1130,609 1212,674 1346,633 C1446,600 1470,650 1520,634" />
        </g>

        {/* Grupo C — inferior esquerdo */}
        <g stroke={strokeColorC} fill="none" strokeWidth="0.7">
          <path d="M-80,622 C80,577 220,632 380,592 C540,552 620,612 760,574 C900,536 980,594 1100,560" />
          <path d="M-80,672 C90,622 240,680 410,637 C580,594 660,657 805,616 C950,575 1030,637 1155,600" />
          <path d="M-80,726 C100,670 258,730 442,684 C626,638 706,704 856,660 C1006,616 1086,682 1214,642" />
          <path d="M-80,784 C112,722 278,784 474,734 C670,684 750,754 906,707 C1062,660 1142,730 1274,686" />
        </g>

        {/* Coordenadas decorativas */}
        {showCoords && (
          <g fill={textColor} fontSize="9" fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.04em">
            <text x="40" y="30">23°32&apos;14&quot;S</text>
            <text x="40" y="44">46°38&apos;09&quot;W</text>
            <text x="1280" y="30">23°28&apos;51&quot;S</text>
            <text x="1280" y="44">46°31&apos;44&quot;W</text>
            <text x="40" y="870">DATUM: SIRGAS2000</text>
            <text x="1200" y="870">ESCALA 1:25.000</text>
          </g>
        )}

        {/* Marcadores de vértice topográfico */}
        <g stroke={accentColor} fill="none">
          <circle cx="1100" cy="200" r="4" strokeWidth="1.2" />
          <circle cx="1100" cy="200" r="13" strokeWidth="0.6" strokeDasharray="2 3" />
          <line x1="1086" y1="200" x2="1114" y2="200" strokeWidth="0.6" />
          <line x1="1100" y1="186" x2="1100" y2="214" strokeWidth="0.6" />
          <circle cx="240" cy="680" r="4" strokeWidth="1.2" />
          <circle cx="240" cy="680" r="13" strokeWidth="0.6" strokeDasharray="2 3" />
          <line x1="226" y1="680" x2="254" y2="680" strokeWidth="0.6" />
          <line x1="240" y1="666" x2="240" y2="694" strokeWidth="0.6" />
        </g>

        {/* Linhas de cota tracejadas */}
        <g stroke={strokeColorC} fill="none" strokeWidth="0.5" strokeDasharray="5 8">
          <line x1="0" y1="450" x2="1400" y2="450" />
          <line x1="700" y1="0" x2="700" y2="900" />
        </g>

        {/* Escala gráfica */}
        <g stroke={scaleColor} fill={scaleColor} strokeWidth="1">
          <line x1="1240" y1="855" x2="1360" y2="855" />
          <line x1="1240" y1="850" x2="1240" y2="860" />
          <line x1="1300" y1="851" x2="1300" y2="859" />
          <line x1="1360" y1="850" x2="1360" y2="860" />
          <text x="1262" y="872" fontSize="8" fontFamily="'IBM Plex Mono', monospace" opacity="0.9">0</text>
          <text x="1285" y="872" fontSize="8" fontFamily="'IBM Plex Mono', monospace" opacity="0.9">500m</text>
          <text x="1337" y="872" fontSize="8" fontFamily="'IBM Plex Mono', monospace" opacity="0.9">1km</text>
        </g>
      </motion.svg>

      {/* Coordenadas fixas nos cantos */}
      <div className="absolute top-3 left-4 font-mono text-[10px] leading-tight select-none" style={{ color: textColor }}>
        <div>LAT 23°32&apos;14&quot;S</div>
        <div>LON 46°38&apos;09&quot;W</div>
      </div>
      <div className="absolute top-3 right-4 font-mono text-[10px] leading-tight text-right select-none" style={{ color: textColor }}>
        <div>DATUM SIRGAS2000</div>
        <div>UTM 23S</div>
      </div>
    </div>
  )
}
