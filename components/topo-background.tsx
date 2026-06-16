'use client'

import { motion } from 'framer-motion'

interface TopoBackgroundProps {
  className?: string
  density?: 'low' | 'medium' | 'high'
  showGrid?: boolean
  showCoords?: boolean
}

export function TopoBackground({
  className = '',
  density = 'medium',
  showGrid = true,
  showCoords = false,
}: TopoBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Grid técnico */}
      {showGrid && (
        <div className="absolute inset-0 technical-grid opacity-100" />
      )}

      {/* Curvas de nível SVG */}
      <motion.svg
        className="absolute inset-0 w-full h-full topo-animate"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <filter id="topo-blur">
            <feGaussianBlur stdDeviation="0.5" />
          </filter>
        </defs>

        {/* Grupo de curvas de nível — região A (canto superior esquerdo) */}
        <g opacity="0.12" stroke="oklch(0.62 0.10 210)" fill="none" strokeWidth="1" filter="url(#topo-blur)">
          <path d="M-80,180 C60,140 200,200 340,160 C480,120 560,180 680,150 C800,120 880,170 1000,140 C1100,115 1200,155 1300,130 C1380,112 1450,140 1500,125" />
          <path d="M-80,220 C70,175 210,240 360,195 C510,150 590,215 720,180 C850,145 930,200 1060,165 C1160,138 1260,178 1360,155 C1430,138 1480,168 1500,160" />
          <path d="M-80,265 C80,215 230,280 390,230 C550,180 630,248 770,210 C910,172 990,232 1120,195 C1220,165 1310,205 1410,180" />
          <path d="M-80,315 C90,258 250,325 420,268 C590,211 670,282 820,242 C970,202 1050,265 1180,228 C1280,198 1370,240 1460,215" />
          <path d="M-80,368 C100,304 270,372 450,308 C630,244 710,318 870,276 C1030,234 1110,300 1240,262 C1340,232 1430,278 1500,255" />
          <path d="M-80,425 C112,354 285,422 480,350 C675,278 755,355 920,312 C1085,269 1165,337 1295,298 C1395,268 1455,316 1500,295" />
        </g>

        {/* Grupo B — região central/direita */}
        <g opacity="0.09" stroke="oklch(0.62 0.10 210)" fill="none" strokeWidth="0.8" filter="url(#topo-blur)">
          <path d="M600,500 C700,460 820,510 940,475 C1060,440 1140,490 1260,458 C1360,430 1440,465 1520,445" />
          <path d="M580,545 C690,500 820,555 950,518 C1080,481 1162,534 1285,500 C1385,472 1460,510 1520,492" />
          <path d="M560,595 C680,545 825,602 960,562 C1095,522 1178,578 1305,542 C1405,514 1465,555 1520,538" />
          <path d="M540,648 C670,592 832,652 972,608 C1112,564 1195,624 1326,586 C1426,556 1468,601 1520,584" />
          <path d="M520,705 C660,642 840,705 985,656 C1130,607 1212,672 1346,631 C1446,598 1470,648 1520,632" />
        </g>

        {/* Grupo C — inferior esquerdo */}
        <g opacity="0.08" stroke="oklch(0.68 0.10 210)" fill="none" strokeWidth="0.7">
          <path d="M-80,620 C80,575 220,630 380,590 C540,550 620,610 760,572 C900,534 980,592 1100,558" />
          <path d="M-80,670 C90,620 240,678 410,635 C580,592 660,655 805,614 C950,573 1030,635 1155,598" />
          <path d="M-80,724 C100,668 258,728 442,682 C626,636 706,702 856,658 C1006,614 1086,680 1214,640" />
          <path d="M-80,782 C112,720 278,782 474,732 C670,682 750,752 906,705 C1062,658 1142,728 1274,684" />
        </g>

        {/* Coordenadas geográficas decorativas */}
        {showCoords && (
          <g opacity="0.2" fill="oklch(0.62 0.10 210)" fontSize="9" fontFamily="monospace" letterSpacing="0.05em">
            <text x="40" y="30">23°32&apos;14&quot;S</text>
            <text x="40" y="44">46°38&apos;09&quot;W</text>
            <text x="1280" y="30">23°28&apos;51&quot;S</text>
            <text x="1280" y="44">46°31&apos;44&quot;W</text>
            <text x="40" y="870">DATUM: SIRGAS2000</text>
            <text x="1200" y="870">ESCALA 1:25.000</text>
          </g>
        )}

        {/* Marcador de ponto topográfico */}
        <g opacity="0.18" stroke="oklch(0.62 0.10 210)" fill="none">
          <circle cx="1100" cy="200" r="4" strokeWidth="1" />
          <circle cx="1100" cy="200" r="12" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="1086" y1="200" x2="1114" y2="200" strokeWidth="0.5" />
          <line x1="1100" y1="186" x2="1100" y2="214" strokeWidth="0.5" />

          <circle cx="240" cy="680" r="4" strokeWidth="1" />
          <circle cx="240" cy="680" r="12" strokeWidth="0.5" strokeDasharray="2 3" />
          <line x1="226" y1="680" x2="254" y2="680" strokeWidth="0.5" />
          <line x1="240" y1="666" x2="240" y2="694" strokeWidth="0.5" />
        </g>

        {/* Linhas de cota */}
        <g opacity="0.10" stroke="oklch(0.68 0.10 210)" fill="none" strokeWidth="0.5" strokeDasharray="4 6">
          <line x1="0" y1="450" x2="1400" y2="450" />
          <line x1="700" y1="0" x2="700" y2="900" />
        </g>

        {/* Escala gráfica */}
        <g opacity="0.15" stroke="oklch(0.62 0.10 210)" fill="oklch(0.62 0.10 210)" strokeWidth="1">
          <line x1="1240" y1="855" x2="1360" y2="855" />
          <line x1="1240" y1="850" x2="1240" y2="860" />
          <line x1="1300" y1="850" x2="1300" y2="860" />
          <line x1="1360" y1="850" x2="1360" y2="860" />
          <text x="1262" y="872" fontSize="8" fontFamily="monospace" opacity="0.8">0</text>
          <text x="1288" y="872" fontSize="8" fontFamily="monospace" opacity="0.8">500m</text>
          <text x="1340" y="872" fontSize="8" fontFamily="monospace" opacity="0.8">1km</text>
        </g>
      </motion.svg>

      {/* Coordenadas fixas no canto */}
      <div className="absolute top-3 left-4 font-mono text-[10px] text-primary/20 leading-tight select-none">
        <div>LAT 23°32&apos;14&quot;S</div>
        <div>LON 46°38&apos;09&quot;W</div>
      </div>
      <div className="absolute top-3 right-4 font-mono text-[10px] text-primary/20 leading-tight text-right select-none">
        <div>DATUM SIRGAS2000</div>
        <div>UTM 23S</div>
      </div>
    </div>
  )
}
