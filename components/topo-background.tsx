'use client'

import { motion } from 'framer-motion'

interface TopoBackgroundProps {
  className?: string
  showGrid?: boolean
  showCoords?: boolean
  variant?: 'light' | 'dark'
}

// ---------------------------------------------------------------------------
// Paleta por altitude — inspirada em maquetes topográficas físicas
// ---------------------------------------------------------------------------
const PALETTE = {
  // lowland / planície
  fill0: 'rgba(210,205,185,0.18)',
  // colinas baixas
  fill1: 'rgba(185,195,165,0.20)',
  // encosta média
  fill2: 'rgba(160,175,140,0.22)',
  // encosta alta
  fill3: 'rgba(135,148,118,0.20)',
  // pico / cume
  fill4: 'rgba(105,112,95,0.22)',

  // curvas de nível por altitude (traço)
  stroke0: 'rgba(140,130,100,0.18)',
  stroke1: 'rgba(120,115,90,0.28)',
  stroke2: 'rgba(100,100,75,0.35)',
  stroke3: 'rgba(80,85,60,0.40)',
  stroke4: 'rgba(60,65,48,0.45)',
  strokeIndex: 'rgba(80,75,55,0.55)', // curva-índice (mais grossa)
  strokeRiver: 'rgba(90,130,170,0.55)', // rios
}

export function TopoBackground({
  className = '',
  showGrid = true,
  showCoords = false,
  variant = 'dark',
}: TopoBackgroundProps) {
  const gridClass = variant === 'dark' ? 'technical-grid-dark' : 'technical-grid'

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Grid de engenharia suave */}
      {showGrid && <div className={`absolute inset-0 ${gridClass}`} />}

      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <filter id="topo-soften">
            <feGaussianBlur stdDeviation="0.3" />
          </filter>
          <filter id="topo-soften-light">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
        </defs>

        {/* ── MACIÇO NORTE-LESTE (canto superior direito) ─────────────────── */}
        {/* Preenchimentos de altitude — camada por camada do baixo para cima */}
        <g filter="url(#topo-soften)">
          {/* Altitude 0 – planície */}
          <path fill={PALETTE.fill0} d="
            M 900,0 C 1000,40 1100,30 1200,10 L 1400,0 L 1400,300
            C 1320,280 1200,320 1100,290 C 1000,260 950,200 870,180
            C 820,165 780,140 800,100 C 820,60 870,20 900,0 Z
          "/>
          {/* Altitude 1 */}
          <path fill={PALETTE.fill1} d="
            M 950,20 C 1020,50 1110,40 1200,30 L 1400,10 L 1400,240
            C 1330,220 1230,255 1150,230 C 1060,204 1010,155 960,138
            C 930,128 910,100 925,70 Z
          "/>
          {/* Altitude 2 */}
          <path fill={PALETTE.fill2} d="
            M 1000,35 C 1060,60 1140,55 1220,50 L 1400,30 L 1400,180
            C 1340,165 1260,193 1190,172 C 1110,148 1070,108 1030,96
            C 1010,90 998,68 1000,45 Z
          "/>
          {/* Altitude 3 */}
          <path fill={PALETTE.fill3} d="
            M 1060,50 C 1110,72 1170,70 1240,68 L 1400,55 L 1400,130
            C 1350,118 1290,140 1230,122 C 1165,102 1130,68 1095,58 Z
          "/>
          {/* Cume */}
          <path fill={PALETTE.fill4} d="
            M 1130,60 C 1165,78 1210,80 1265,82 L 1400,78 L 1400,100
            C 1360,94 1310,108 1255,96 C 1200,84 1165,68 1130,60 Z
          "/>
        </g>

        {/* ── MACIÇO CENTRAL ──────────────────────────────────────────────── */}
        <g filter="url(#topo-soften)">
          <path fill={PALETTE.fill0} d="
            M 380,100 C 480,60 590,80 680,110 C 770,140 820,200 800,270
            C 780,340 720,380 650,390 C 580,400 510,370 460,330
            C 410,290 370,240 360,190 C 350,140 350,120 380,100 Z
          "/>
          <path fill={PALETTE.fill1} d="
            M 410,120 C 500,82 600,100 680,128 C 755,155 796,210 776,272
            C 758,330 704,365 640,374 C 576,383 512,355 466,316
            C 424,280 390,232 382,186 C 374,145 386,132 410,120 Z
          "/>
          <path fill={PALETTE.fill2} d="
            M 445,140 C 524,108 618,126 690,150 C 758,172 796,222 776,278
            C 756,330 707,360 648,368 C 590,376 530,350 488,314
            C 448,280 418,234 414,192 C 410,158 426,148 445,140 Z
          "/>
          <path fill={PALETTE.fill3} d="
            M 484,162 C 552,136 638,152 702,172 C 762,192 796,238 776,286
            C 758,330 714,354 660,360 C 606,366 552,344 514,312
            C 476,280 450,238 448,202 Z
          "/>
          <path fill={PALETTE.fill4} d="
            M 530,188 C 584,166 654,178 708,196 C 760,214 790,254 772,294
            C 756,330 718,348 668,352 C 620,356 574,336 540,308
            C 508,282 488,248 490,216 Z
          "/>
          {/* Pico */}
          <path fill={PALETTE.fill4} opacity="0.5" d="
            M 590,218 C 618,202 654,210 680,224 C 706,238 716,262 702,284
            C 688,304 662,312 636,308 C 610,304 590,286 586,264 Z
          "/>
        </g>

        {/* ── MACIÇO SUL-OESTE ────────────────────────────────────────────── */}
        <g filter="url(#topo-soften)">
          <path fill={PALETTE.fill0} d="
            M 0,550 C 60,510 160,520 240,560 C 320,600 360,660 340,720
            C 320,780 260,810 190,810 C 120,810 60,774 28,720
            C -4,666 -10,600 0,550 Z
          "/>
          <path fill={PALETTE.fill1} d="
            M 20,570 C 76,534 166,542 240,580 C 310,616 346,672 326,726
            C 308,778 252,806 186,806 C 122,806 66,772 36,722
            C 8,674 4,618 20,570 Z
          "/>
          <path fill={PALETTE.fill2} d="
            M 46,594 C 98,560 178,566 248,600 C 314,632 346,684 326,732
            C 308,778 256,804 194,804 C 134,804 82,772 54,728
            C 28,686 24,634 46,594 Z
          "/>
          <path fill={PALETTE.fill3} d="
            M 78,622 C 122,594 192,598 256,628 C 316,656 342,700 322,740
            C 304,778 258,798 200,796 C 144,794 100,764 74,728
            C 50,694 48,648 78,622 Z
          "/>
          <path fill={PALETTE.fill4} d="
            M 118,656 C 154,634 210,636 264,660 C 316,682 334,718 316,750
            C 300,780 260,794 208,790 C 158,786 120,760 100,730
            C 82,702 84,668 118,656 Z
          "/>
        </g>

        {/* ── CURVAS DE NÍVEL — MACIÇO NORTE-LESTE ────────────────────────── */}
        {/* nível 0 */}
        <g stroke={PALETTE.stroke0} fill="none" strokeWidth="0.7" filter="url(#topo-soften)">
          <path d="M 870,180 C 920,165 980,155 1060,160 C 1140,165 1200,200 1260,195 C 1320,190 1380,175 1400,170"/>
          <path d="M 840,220 C 900,205 970,192 1060,198 C 1150,204 1210,238 1280,232 C 1340,226 1390,212 1400,208"/>
          <path d="M 820,260 C 890,244 965,228 1065,235 C 1165,242 1225,278 1300,271 C 1360,264 1395,250 1400,247"/>
        </g>
        {/* nível 1 */}
        <g stroke={PALETTE.stroke1} fill="none" strokeWidth="0.85">
          <path d="M 925,70 C 975,55 1045,50 1120,60 C 1190,70 1240,100 1290,96 C 1340,92 1385,78 1400,74"/>
          <path d="M 900,110 C 955,94 1030,88 1110,98 C 1185,108 1240,138 1295,133 C 1350,128 1390,114 1400,110"/>
          <path d="M 880,150 C 940,133 1020,126 1105,136 C 1188,146 1245,176 1302,170 C 1356,164 1392,151 1400,148"/>
        </g>
        {/* nível 2 — índice */}
        <g stroke={PALETTE.strokeIndex} fill="none" strokeWidth="1.3">
          <path d="M 1000,35 C 1060,20 1140,18 1220,30 C 1295,42 1345,70 1395,66"/>
          <path d="M 960,60 C 1030,44 1120,40 1210,52 C 1294,64 1345,92 1400,88"/>
        </g>
        {/* altitude labels */}
        <g fill={PALETTE.stroke2} fontSize="7.5" fontFamily="'IBM Plex Mono', monospace" opacity="0.75">
          <text x="1062" y="158">— 640m</text>
          <text x="1062" y="100">— 820m</text>
          <text x="1062" y="54">— 1040m</text>
        </g>

        {/* ── CURVAS DE NÍVEL — MACIÇO CENTRAL ────────────────────────────── */}
        <g fill="none" strokeWidth="0.7" stroke={PALETTE.stroke1} filter="url(#topo-soften)">
          {/* curvas concêntricas em torno do pico central */}
          <ellipse cx="638" cy="270" rx="175" ry="145" opacity="0.9"/>
          <ellipse cx="638" cy="268" rx="148" ry="120" opacity="0.9"/>
          <ellipse cx="638" cy="266" rx="120" ry="96" opacity="0.9"/>
          <ellipse cx="638" cy="264" rx="92" ry="72" opacity="0.9"/>
          <ellipse cx="638" cy="262" rx="62" ry="48" opacity="0.9"/>
        </g>
        {/* índice central */}
        <g fill="none" strokeWidth="1.3" stroke={PALETTE.strokeIndex}>
          <ellipse cx="638" cy="270" rx="175" ry="145" opacity="0.7"/>
          <ellipse cx="638" cy="264" rx="62" ry="48" opacity="0.85"/>
        </g>
        {/* labels altitude central */}
        <g fill={PALETTE.stroke3} fontSize="7" fontFamily="'IBM Plex Mono', monospace" opacity="0.8">
          <text x="698" y="254">1.240m</text>
          <text x="708" y="302">980m</text>
          <text x="724" y="348">720m</text>
          <text x="744" y="392">480m</text>
        </g>

        {/* ── CURVAS DE NÍVEL — MACIÇO SUL-OESTE ──────────────────────────── */}
        <g fill="none" strokeWidth="0.7" stroke={PALETTE.stroke1} filter="url(#topo-soften)">
          <ellipse cx="192" cy="690" rx="165" ry="130" opacity="0.9"/>
          <ellipse cx="192" cy="688" rx="135" ry="106" opacity="0.9"/>
          <ellipse cx="192" cy="686" rx="105" ry="82" opacity="0.9"/>
          <ellipse cx="192" cy="684" rx="76" ry="58" opacity="0.9"/>
          <ellipse cx="192" cy="682" rx="46" ry="36" opacity="0.9"/>
        </g>
        <g fill="none" strokeWidth="1.3" stroke={PALETTE.strokeIndex}>
          <ellipse cx="192" cy="690" rx="165" ry="130" opacity="0.65"/>
          <ellipse cx="192" cy="682" rx="46" ry="36" opacity="0.8"/>
        </g>
        <g fill={PALETTE.stroke3} fontSize="7" fontFamily="'IBM Plex Mono', monospace" opacity="0.8">
          <text x="246" y="668">1.080m</text>
          <text x="256" y="714">820m</text>
          <text x="268" y="760">560m</text>
        </g>

        {/* ── LINHAS DE NÍVEL GERAIS — PLANÍCIE / VALES ────────────────────── */}
        <g stroke={PALETTE.stroke0} fill="none" strokeWidth="0.55" opacity="0.75">
          {/* vale entre maciços */}
          <path d="M 440,420 C 500,400 560,395 620,390 C 680,385 750,398 810,415 C 870,430 920,440 980,432"/>
          <path d="M 440,460 C 510,436 575,430 640,425 C 705,420 775,434 840,452 C 900,468 955,475 1010,466"/>
          <path d="M 430,500 C 505,474 575,465 645,460 C 715,455 790,468 855,487 C 915,505 965,508 1020,500"/>
          <path d="M 320,500 C 360,488 400,482 440,478 C 480,474 510,480 530,494"/>
          <path d="M 310,540 C 355,526 400,518 445,514 C 490,510 524,517 544,530"/>
          <path d="M 300,582 C 348,566 398,558 448,553 C 498,548 535,555 556,568"/>

          {/* região leste */}
          <path d="M 1050,400 C 1120,388 1200,380 1280,388 C 1360,396 1400,420 1400,440"/>
          <path d="M 1040,445 C 1112,430 1195,422 1280,430 C 1360,438 1400,462 1400,480"/>
          <path d="M 1035,490 C 1108,474 1192,465 1278,474 C 1358,482 1400,505 1400,522"/>
          <path d="M 1030,540 C 1105,522 1190,514 1276,523 C 1356,532 1400,555 1400,570"/>
          <path d="M 1025,590 C 1102,570 1188,562 1275,572 C 1354,582 1400,605 1400,620"/>

          {/* sul */}
          <path d="M 400,780 C 480,762 580,755 680,764 C 780,773 860,798 940,800"/>
          <path d="M 420,820 C 500,800 600,793 700,802 C 800,811 880,836 960,840"/>
          <path d="M 380,860 C 465,840 570,832 675,842 C 778,852 858,876 940,880"/>
        </g>

        {/* ── CURVAS-ÍNDICE GERAIS (mais grossas, a cada 5ª curva) ─────────── */}
        <g stroke={PALETTE.stroke2} fill="none" strokeWidth="1.0" opacity="0.6">
          <path d="M 440,420 C 500,400 620,390 750,410 C 870,428 980,432 1070,420"/>
          <path d="M 430,500 C 500,475 640,460 780,476 C 900,492 1010,500 1080,490"/>
          <path d="M 1040,445 C 1120,428 1220,422 1320,432 C 1380,438 1400,455 1400,462"/>
        </g>

        {/* ── RIOS ─────────────────────────────────────────────────────────── */}
        <g stroke={PALETTE.strokeRiver} fill="none" strokeLinecap="round">
          {/* Rio principal — vale central */}
          <path strokeWidth="1.8" d="
            M 820,412 C 800,418 778,430 752,448 C 726,466 712,490 700,520
            C 688,550 685,580 678,610 C 671,640 660,665 642,688
            C 624,710 600,726 575,738
          "/>
          {/* Afluente 1 */}
          <path strokeWidth="1.0" d="
            M 960,432 C 930,445 900,452 870,455 C 845,458 822,452 800,448
          "/>
          {/* Afluente 2 */}
          <path strokeWidth="0.9" d="
            M 700,520 C 665,512 635,508 610,515 C 585,522 565,535 545,545
          "/>
          {/* Rio sul-leste */}
          <path strokeWidth="1.4" d="
            M 1100,580 C 1075,592 1048,608 1020,628 C 994,648 978,672 970,700
            C 962,728 968,756 980,780 C 990,800 1005,815 1020,828
          "/>
          {/* Afluente sul */}
          <path strokeWidth="0.85" d="
            M 970,700 C 945,695 920,688 894,688 C 870,688 848,698 828,710
          "/>
          {/* Rio norte */}
          <path strokeWidth="1.2" d="
            M 280,0 C 296,40 308,80 312,120 C 316,160 305,195 295,230
            C 285,265 275,295 280,330 C 285,365 302,392 315,420
          "/>
        </g>

        {/* ── MARCADORES DE VÉRTICE / PICO ────────────────────────────────── */}
        <g stroke={PALETTE.stroke4} fill="none" strokeWidth="0.9">
          {/* Pico central */}
          <circle cx="638" cy="264" r="3.5"/>
          <circle cx="638" cy="264" r="10" strokeDasharray="2 3" opacity="0.7"/>
          <line x1="625" y1="264" x2="651" y2="264" strokeWidth="0.7"/>
          <line x1="638" y1="251" x2="638" y2="277" strokeWidth="0.7"/>

          {/* Pico NE */}
          <circle cx="1195" cy="62" r="3"/>
          <circle cx="1195" cy="62" r="9" strokeDasharray="2 3" opacity="0.6"/>
          <line x1="1183" y1="62" x2="1207" y2="62" strokeWidth="0.7"/>
          <line x1="1195" y1="50" x2="1195" y2="74" strokeWidth="0.7"/>

          {/* Pico SW */}
          <circle cx="192" cy="680" r="3"/>
          <circle cx="192" cy="680" r="9" strokeDasharray="2 3" opacity="0.6"/>
          <line x1="180" y1="680" x2="204" y2="680" strokeWidth="0.7"/>
          <line x1="192" y1="668" x2="192" y2="692" strokeWidth="0.7"/>
        </g>

        {/* Texto de altitude dos picos */}
        <g fill={PALETTE.stroke4} fontSize="8" fontFamily="'IBM Plex Mono', monospace" fontWeight="600">
          <text x="644" y="258">▲ 1.284m</text>
          <text x="1200" y="57">▲ 1.142m</text>
          <text x="198" y="675">▲ 1.096m</text>
        </g>

        {/* ── COORDENADAS / METADADOS ──────────────────────────────────────── */}
        {showCoords && (
          <g fill={PALETTE.stroke1} fontSize="9" fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.04em" opacity="0.7">
            <text x="40" y="30">23°32′14″S</text>
            <text x="40" y="44">46°38′09″W</text>
            <text x="1280" y="30">23°28′51″S</text>
            <text x="1280" y="44">46°31′44″W</text>
            <text x="40" y="870">DATUM: SIRGAS2000</text>
            <text x="1200" y="870">ESCALA 1:25.000</text>
          </g>
        )}

        {/* Escala gráfica */}
        <g stroke={PALETTE.stroke1} fill={PALETTE.stroke1} strokeWidth="1" opacity="0.55">
          <line x1="1240" y1="855" x2="1360" y2="855"/>
          <line x1="1240" y1="850" x2="1240" y2="860"/>
          <line x1="1300" y1="851" x2="1300" y2="859"/>
          <line x1="1360" y1="850" x2="1360" y2="860"/>
          <text x="1262" y="872" fontSize="8" fontFamily="'IBM Plex Mono', monospace" opacity="0.9">0</text>
          <text x="1285" y="872" fontSize="8" fontFamily="'IBM Plex Mono', monospace" opacity="0.9">500m</text>
          <text x="1337" y="872" fontSize="8" fontFamily="'IBM Plex Mono', monospace" opacity="0.9">1km</text>
        </g>
      </motion.svg>

      {/* Coordenadas fixas */}
      <div className="absolute top-3 left-4 font-mono text-[10px] leading-tight select-none" style={{ color: PALETTE.stroke1 }}>
        <div>LAT 23°32′14″S</div>
        <div>LON 46°38′09″W</div>
      </div>
      <div className="absolute top-3 right-4 font-mono text-[10px] leading-tight text-right select-none" style={{ color: PALETTE.stroke1 }}>
        <div>DATUM SIRGAS2000</div>
        <div>UTM 23S</div>
      </div>
    </div>
  )
}
