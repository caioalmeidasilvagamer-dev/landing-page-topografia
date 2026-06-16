'use client'

import { useMemo } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
 *  Gerador de curva de nível — caminho orgânico fechado
 *  Inspirado em cartas topográficas do IBGE / ArcGIS / QGIS
 *
 *  cx, cy  — centro do morro/maciço
 *  r       — raio base (distância ao pico)
 *  seed    — "impressão digital" do relevo (mesmo seed = mesmo formato)
 *  sx, sy  — escala horizontal / vertical (permite criar cristas alongadas)
 *  steps   — resolução (≥72 para suavidade)
 * ═══════════════════════════════════════════════════════════════════════════ */
function mkContour(
  cx: number,
  cy: number,
  r: number,
  seed: number,
  sx = 1.0,
  sy = 1.0,
  steps = 90,
): string {
  const pts: string[] = []
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2
    /* Perturbação multi-harmônica → curvas naturais, não elipses */
    const dr =
      r *
      (1 +
        0.22 * Math.sin(seed * 2.1  + a * 2) +
        0.15 * Math.cos(seed * 1.7  + a * 3) +
        0.10 * Math.sin(seed * 3.3  + a * 5) +
        0.07 * Math.cos(seed * 0.9  + a * 7) +
        0.04 * Math.sin(seed * 4.7  + a * 4) +
        0.03 * Math.cos(seed * 2.3  + a * 9) +
        0.02 * Math.sin(seed * 5.9  + a * 6))
    const x = (cx + dr * sx * Math.cos(a)).toFixed(1)
    const y = (cy + dr * sy * Math.sin(a)).toFixed(1)
    pts.push(`${i === 0 ? 'M' : 'L'} ${x},${y}`)
  }
  return pts.join(' ') + ' Z'
}

/* ─── Paleta — tons terrosos em baixíssima opacidade ────────────────────── */
const S = {
  regular : 'rgba(175,162,132,0.042)',   /* ~4 %  curva normal            */
  index   : 'rgba(175,162,132,0.080)',   /* ~8 %  curva-índice (a cada 5ª)*/
  label   : 'rgba(175,162,132,0.20)',    /* rótulos de cota               */
  river   : 'rgba(90,138,192,0.075)',    /* drenagem / rios               */
  meta    : 'rgba(175,162,132,0.16)',    /* metadados cartográficos       */
}

/* ─── Definição dos relevos ──────────────────────────────────────────────── */
interface Feat {
  cx: number; cy: number
  /** raios do pico (menor) para a base (maior) */
  radii: number[]
  seed: number
  sx?: number; sy?: number
  /** altitude do pico e intervalo por curva (negativo = desce) */
  altTop: number; dAlt: number
}

/*
 *  Layout do terreno num viewport 1400×900:
 *
 *   NW morro     N colina      NE maciço (grande)
 *   (108, 88)    (512, 46)     (1086, 86)
 *
 *   W morro                                SE crista (alongada)
 *   (50, 458)        VALE CENTRAL          (1216, 572)
 *
 *   SW morro     Planalto sul  S colina
 *   (236, 710)   (672, 643)    (655, 870)
 *
 *  Rios fluem dos planaltos pelo vale central em direção S.
 */
const FEATS: Feat[] = [
  /* ① Grande Maciço NE */
  {
    cx: 1086, cy: 86,
    radii: [26, 56, 92, 132, 174, 218, 264, 312],
    seed: 1.73, sx: 1.28, sy: 0.80,
    altTop: 1840, dAlt: -80,
  },
  /* ② Colina NW */
  {
    cx: 108, cy: 90,
    radii: [18, 42, 72, 106, 144],
    seed: 0.91, sx: 1.12, sy: 0.92,
    altTop: 1180, dAlt: -58,
  },
  /* ③ Morro Norte-Central */
  {
    cx: 512, cy: 46,
    radii: [20, 48, 82, 120, 162],
    seed: 3.44, sx: 0.86, sy: 1.20,
    altTop: 1360, dAlt: -66,
  },
  /* ④ Morro Oeste-Central */
  {
    cx: 50, cy: 458,
    radii: [18, 44, 76, 112, 150],
    seed: 2.17, sx: 0.80, sy: 1.25,
    altTop: 960,  dAlt: -52,
  },
  /* ⑤ Planalto Centro-Sul  (espaçamento uniforme = cume plano) */
  {
    cx: 672, cy: 643,
    radii: [40, 72, 106, 142, 180, 220],
    seed: 2.84, sx: 1.58, sy: 0.70,
    altTop: 1080, dAlt: -58,
  },
  /* ⑥ Crista Sudeste  (muito alongada N-S = crista montanhosa) */
  {
    cx: 1216, cy: 572,
    radii: [16, 38, 64, 92, 122, 154],
    seed: 4.23, sx: 0.46, sy: 1.85,
    altTop: 1280, dAlt: -62,
  },
  /* ⑦ Morro Sudoeste */
  {
    cx: 236, cy: 710,
    radii: [20, 46, 78, 114, 152],
    seed: 1.32, sx: 1.06, sy: 0.90,
    altTop: 860,  dAlt: -50,
  },
  /* ⑧ Colina Sul-Central */
  {
    cx: 655, cy: 870,
    radii: [24, 52, 86, 124],
    seed: 3.73, sx: 1.20, sy: 0.76,
    altTop: 940,  dAlt: -54,
  },
]

/* ─── Componente ─────────────────────────────────────────────────────────── */
export function TopoPageBackground() {
  /* Pré-computa todos os paths uma única vez */
  const contours = useMemo(
    () =>
      FEATS.map((f) =>
        f.radii.map((r, ri) => ({
          d      : mkContour(f.cx, f.cy, r, f.seed, f.sx ?? 1, f.sy ?? 1),
          isIndex: ri === 0 || (ri + 1) % 5 === 0,
        })),
      ),
    [],
  )

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ══ CURVAS DE NÍVEL ══════════════════════════════════════════════ */}
        {contours.map((feat, fi) =>
          feat.map(({ d, isIndex }, ri) => (
            <path
              key={`f${fi}r${ri}`}
              d={d}
              fill="none"
              stroke={isIndex ? S.index : S.regular}
              strokeWidth={isIndex ? 0.9 : 0.5}
              strokeLinejoin="round"
            />
          )),
        )}

        {/* ══ RÓTULOS DE COTA ALTIMÉTRICA ═════════════════════════════════ */}
        <g
          fill={S.label}
          fontSize="7.5"
          fontFamily="'IBM Plex Mono','Courier New',monospace"
          letterSpacing="0.06em"
        >
          {/* Maciço NE — flanco leste */}
          <text x="1194" y="176">— 1.280m</text>
          <text x="1208" y="230">— 1.120m</text>
          <text x="1226" y="290">— 960m</text>
          {/* Planalto central */}
          <text x="786"  y="636">— 830m</text>
          <text x="804"  y="692">— 720m</text>
          {/* Crista SE */}
          <text x="1244" y="472">— 1.034m</text>
          {/* Colina Norte */}
          <text x="574"  y="100">— 1.096m</text>
          {/* Colinas W e SW */}
          <text x="134"  y="406">— 752m</text>
          <text x="288"  y="658">— 710m</text>
        </g>

        {/* ══ MARCADORES DE PICO (VÉRTICE GEODÉSICO) ══════════════════════ */}
        {/* Pico do Maciço NE */}
        <g stroke={S.meta} fill="none" strokeWidth="0.7">
          <circle cx="1086" cy="86" r="3.5" />
          <circle cx="1086" cy="86" r="9" strokeDasharray="1.5 2.5" opacity="0.65" />
          <line x1="1075" y1="86" x2="1097" y2="86" strokeWidth="0.55" />
          <line x1="1086" y1="75" x2="1086" y2="97" strokeWidth="0.55" />
        </g>
        {/* Rótulos de pico */}
        <g
          fill={S.meta}
          fontSize="7"
          fontFamily="'IBM Plex Mono',monospace"
          fontWeight="600"
          letterSpacing="0.04em"
        >
          <text x="1093" y="81">▲ 1.840m</text>
          <text x="518"  y="40">▲ 1.360m</text>
          <text x="114"  y="84">▲ 1.180m</text>
          <text x="242"  y="704">▲ 860m</text>
          <text x="660"  y="864">▲ 940m</text>
        </g>

        {/* ══ RIOS E DRENAGEM ══════════════════════════════════════════════ */}
        <g stroke={S.river} fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* Rio principal — vale central, flui de N para S */}
          <path
            strokeWidth="1.8"
            d="M 506,0
               C 528,72  556,155  582,246
               C 610,340  632,424  648,510
               C 664,596  672,670  678,746
               C 684,818  688,866  692,900"
          />
          {/* Afluente NE — drena maciço */}
          <path
            strokeWidth="1.1"
            d="M 996,172
               C 954,206  914,234  874,251
               C 838,267  804,273  770,269
               C 738,266  711,256  686,249"
          />
          {/* Afluente NW — drena colina noroeste */}
          <path
            strokeWidth="0.95"
            d="M 166,194
               C 224,246  284,282  340,308
               C 394,332  448,344  502,348
               C 536,350  566,349  590,347"
          />
          {/* Afluente W central */}
          <path
            strokeWidth="0.85"
            d="M 106,516
               C 176,506  243,494  306,486
               C 366,478  426,474  482,474
               C 528,474  564,476  594,481"
          />
          {/* Drenagem SE — crista para o vale */}
          <path
            strokeWidth="1.3"
            d="M 1400,472
               C 1346,496  1296,514  1250,527
               C 1206,540  1162,548  1116,556
               C 1072,563  1028,568  988,574
               C 946,580  906,584  866,590
               C 824,596  786,602  754,612"
          />
          {/* Micro-afluente do planalto sul */}
          <path
            strokeWidth="0.8"
            d="M 802,776
               C 780,756  762,738  748,720
               C 734,702  722,684  714,666
               C 706,648  702,630  698,614
               C 695,602  693,592  691,583"
          />
        </g>

        {/* ══ CRUZETAS DA GRADE CARTOGRÁFICA ══════════════════════════════ */}
        <g stroke={S.meta} strokeWidth="0.55" opacity="0.55">
          {[350, 700, 1050].flatMap((gx) =>
            [225, 450, 675].map((gy) => (
              <g key={`g${gx}-${gy}`}>
                <line x1={gx - 7} y1={gy} x2={gx + 7} y2={gy} />
                <line x1={gx} y1={gy - 7} x2={gx} y2={gy + 7} />
              </g>
            )),
          )}
        </g>

        {/* ══ COORDENADAS E METADADOS ══════════════════════════════════════ */}
        <g
          fill={S.meta}
          fontSize="8"
          fontFamily="'IBM Plex Mono',monospace"
          letterSpacing="0.05em"
          opacity="0.9"
        >
          {/* Canto NW */}
          <text x="18"   y="19">23°32′14″S</text>
          <text x="18"   y="31">46°38′09″W</text>
          {/* Canto NE */}
          <text x="1268" y="19">23°28′51″S</text>
          <text x="1268" y="31">46°31′44″W</text>
          {/* Rodapé esquerdo */}
          <text x="18"   y="889">UTM 23S  ·  DATUM SIRGAS2000  ·  FUSO 23</text>
          {/* Rodapé direito */}
          <text x="1142" y="889">ESCALA 1:25.000</text>
        </g>

        {/* ══ BARRA DE ESCALA GRÁFICA ══════════════════════════════════════ */}
        <g stroke={S.meta} fill={S.meta} strokeWidth="0.8" opacity="0.8">
          <line x1="1252" y1="858" x2="1384" y2="858" />
          <line x1="1252" y1="853" x2="1252" y2="863" />
          <line x1="1318" y1="854" x2="1318" y2="862" />
          <line x1="1384" y1="853" x2="1384" y2="863" />
          <rect x="1252" y="856" width="66" height="4" opacity="0.35" />
          <text x="1250" y="873" fontSize="7.5" fontFamily="'IBM Plex Mono',monospace">0</text>
          <text x="1306" y="873" fontSize="7.5" fontFamily="'IBM Plex Mono',monospace">500m</text>
          <text x="1362" y="873" fontSize="7.5" fontFamily="'IBM Plex Mono',monospace">1km</text>
        </g>

        {/* ══ MARCAS DE REGISTRO (CANTOS) ══════════════════════════════════ */}
        <g stroke={S.meta} strokeWidth="0.55" opacity="0.38">
          {/* NW */}
          <line x1="0"    y1="12"  x2="26"   y2="12"  />
          <line x1="12"   y1="0"   x2="12"   y2="26"  />
          {/* NE */}
          <line x1="1374" y1="12"  x2="1400" y2="12"  />
          <line x1="1388" y1="0"   x2="1388" y2="26"  />
          {/* SW */}
          <line x1="0"    y1="888" x2="26"   y2="888" />
          <line x1="12"   y1="874" x2="12"   y2="900" />
          {/* SE */}
          <line x1="1374" y1="888" x2="1400" y2="888" />
          <line x1="1388" y1="874" x2="1388" y2="900" />
        </g>
      </svg>
    </div>
  )
}
