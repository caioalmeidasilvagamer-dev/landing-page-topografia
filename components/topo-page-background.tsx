"use client";
import { useEffect, useRef } from "react";

/* ─── PALETA HIPSOMÉTRICA ────────────────────────────────────────────── */
const HYPS = [
  { t: 0.00, color: "rgba(34,  85,  34,  OPACITY)" },  // verde-escuro (base)
  { t: 0.20, color: "rgba(80,  140,  60,  OPACITY)" },  // verde-médio
  { t: 0.40, color: "rgba(160, 190,  80,  OPACITY)" },  // verde-claro/amarelado
  { t: 0.60, color: "rgba(210, 180,  80,  OPACITY)" },  // amarelo
  { t: 0.75, color: "rgba(190, 120,  50,  OPACITY)" },  // laranja
  { t: 0.90, color: "rgba(150,  80,  40,  OPACITY)" },  // marrom
  { t: 1.00, color: "rgba(240, 230, 210,  OPACITY)" },  // quase branco (pico)
];

const FILL_OPACITY  = 0.16;   // opacidade dos anéis preenchidos
const STROKE_OPACITY_MAX = 0.30; // linha mais interna (pico)
const STROKE_OPACITY_MIN = 0.04; // linha mais externa (base)

function lerpColor(t: number, opacity: number): string {
  // encontra o intervalo correto na paleta
  let lo = HYPS[0], hi = HYPS[HYPS.length - 1];
  for (let i = 0; i < HYPS.length - 1; i++) {
    if (t >= HYPS[i].t && t <= HYPS[i + 1].t) { lo = HYPS[i]; hi = HYPS[i + 1]; break; }
  }
  const f = lo.t === hi.t ? 0 : (t - lo.t) / (hi.t - lo.t);
  // substitui OPACITY pelo valor real
  const c1 = lo.color.replace("OPACITY", String(opacity));
  const c2 = hi.color.replace("OPACITY", String(opacity));
  // parse rgba
  const p = (s: string) => s.match(/[\d.]+/g)!.map(Number);
  const [r1,g1,b1] = p(c1); const [r2,g2,b2] = p(c2);
  const r = Math.round(r1 + (r2-r1)*f);
  const g = Math.round(g1 + (g2-g1)*f);
  const b = Math.round(b1 + (b2-b1)*f);
  return `rgba(${r},${g},${b},${opacity})`;
}

/* ─── GEOMETRIA DOS MORROS ───────────────────────────────────────────── */
// cx, cy em %, radii em px (viewport ~1440px de referência)
// Apenas 4 morros, raios contidos para não "vazar" no vazio entre eles
const FEATS = [
  { cx: 18, cy: 30, rx: 1.0, ry: 0.75, rot: -25, radii: [30, 55, 85, 118, 152] },
  { cx: 72, cy: 22, rx: 1.0, ry: 0.80, rot:  15, radii: [28, 52, 80, 112, 148, 186] },
  { cx: 45, cy: 68, rx: 1.0, ry: 0.70, rot: -10, radii: [35, 64, 98, 135, 172] },
  { cx: 85, cy: 72, rx: 1.0, ry: 0.85, rot:  30, radii: [22, 42, 65,  90, 118] },
];

/* harmônicas para deformar a elipse em curva orgânica */
function mkContour(
  cx: number, cy: number,
  rx: number, ry: number,
  rot: number, r: number,
  seed: number
): string {
  const pts = 72;
  const RAD = Math.PI / 180;
  const s = Math.sin(rot * RAD), c = Math.cos(rot * RAD);
  const harm = [
    { a: 0.18 + seed * 0.07, f: 2, ph: seed * 1.3 },
    { a: 0.10 + seed * 0.04, f: 3, ph: seed * 2.1 },
    { a: 0.06,               f: 5, ph: seed * 0.9 },
  ];
  const coords: [number, number][] = [];
  for (let i = 0; i < pts; i++) {
    const θ = (i / pts) * 2 * Math.PI;
    let noise = 0;
    harm.forEach(h => { noise += h.a * Math.sin(h.f * θ + h.ph); });
    const rr = r * (1 + noise);
    const lx = rr * rx * Math.cos(θ);
    const ly = rr * ry * Math.sin(θ);
    coords.push([cx + lx * c - ly * s, cy + lx * s + ly * c]);
  }
  return coords
    .map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(2)},${p[1].toFixed(2)}`)
    .join(" ") + " Z";
}

/* ─── COMPONENTE ─────────────────────────────────────────────────────── */
export function TopoPageBackground() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // nada dinâmico por enquanto — layout fixo gerado no render
  }, []);

  const W = 1440, H = 900; // viewBox de referência

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        backgroundColor: "#F8FAFC", // fallback caso a imagem não carregue
      }}
    >
      {/* ── IMAGEM DE FUNDO (repetida para manter qualidade) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/bg-site-desktop.png')",
          backgroundSize: "auto",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── OVERLAY DE CONTROLE DE VISIBILIDADE ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(248, 250, 252, 0.30)", // ajuste a opacidade aqui (0 = imagem totalmente visível, 1 = oculta)
          backdropFilter: "blur(0px)",
        }}
      />

      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        style={{ width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── ANÉIS HIPSOMÉTRICOS (do externo para o interno) ── */}
        {FEATS.map((f, fi) => {
          const cx = (f.cx / 100) * W;
          const cy = (f.cy / 100) * H;
          const seed = fi * 1.618;
          const n = f.radii.length;

          return (
            <g key={fi}>
              {/* Anéis preenchidos: externo → interno */}
              {f.radii.map((r, ri) => {
                const t = ri / (n - 1);           // 0 = base, 1 = pico
                const fill = lerpColor(t, FILL_OPACITY);
                const path = mkContour(cx, cy, f.rx, f.ry, f.rot, r, seed + ri * 0.3);
                return <path key={ri} d={path} fill={fill} stroke="none" />;
              })}

              {/* Linhas de contorno por cima: opacity proporcional à altitude */}
              {f.radii.map((r, ri) => {
                const t = ri / (n - 1);
                const strokeOpacity =
                  STROKE_OPACITY_MIN + (STROKE_OPACITY_MAX - STROKE_OPACITY_MIN) * t;
                const path = mkContour(cx, cy, f.rx, f.ry, f.rot, r, seed + ri * 0.3);
                return (
                  <path
                    key={`l${ri}`}
                    d={path}
                    fill="none"
                    stroke={`rgba(60,40,20,${strokeOpacity})`}
                    strokeWidth={t > 0.8 ? 0.8 : 0.5}
                  />
                );
              })}
            </g>
          );
        })}

        {/* ── COORDENADAS DISCRETAS NOS CANTOS ── */}
        {[
          { x: 12,  y: 14,  label: "23°08′S  44°15′W" },
          { x: W-12, y: 14,  label: "23°08′S  43°52′W", anchor: "end" },
          { x: 12,  y: H-8, label: "23°22′S  44°15′W" },
          { x: W-12, y: H-8, label: "23°22′S  43°52′W", anchor: "end" },
        ].map((c, i) => (
          <text
            key={i}
            x={c.x} y={c.y}
            textAnchor={(c as { anchor?: string }).anchor ?? "start"}
            fontSize="8"
            fill="rgba(60,80,60,0.25)"
            fontFamily="monospace"
          >
            {c.label}
          </text>
        ))}

        {/* ── ESCALA GRÁFICA ── */}
        <g transform={`translate(${W / 2 - 60}, ${H - 18})`}>
          <line x1="0" y1="0" x2="120" y2="0" stroke="rgba(60,80,60,0.25)" strokeWidth="1" />
          <line x1="0" y1="-4" x2="0" y2="4"  stroke="rgba(60,80,60,0.25)" strokeWidth="1" />
          <line x1="60" y1="-3" x2="60" y2="3" stroke="rgba(60,80,60,0.25)" strokeWidth="0.8" />
          <line x1="120" y1="-4" x2="120" y2="4" stroke="rgba(60,80,60,0.25)" strokeWidth="1" />
          <text x="0"   y="-7" textAnchor="middle" fontSize="7" fill="rgba(60,80,60,0.30)" fontFamily="monospace">0</text>
          <text x="60"  y="-7" textAnchor="middle" fontSize="7" fill="rgba(60,80,60,0.30)" fontFamily="monospace">1 km</text>
          <text x="120" y="-7" textAnchor="middle" fontSize="7" fill="rgba(60,80,60,0.30)" fontFamily="monospace">2 km</text>
        </g>

        {/* ── LEGENDA HIPSOMÉTRICA ── */}
        <g transform="translate(16, 420)">
          <text fontSize="7" fill="rgba(60,80,60,0.40)" fontFamily="monospace" y="-4">
            HIPSOMETRIA (m)
          </text>
          {HYPS.slice(0, -1).map((h, i) => {
            const next = HYPS[i + 1];
            const midT = (h.t + next.t) / 2;
            const fill = lerpColor(midT, 0.6);
            const altLo = Math.round(h.t * 800);
            const altHi = Math.round(next.t * 800);
            return (
              <g key={i} transform={`translate(0, ${i * 14})`}>
                <rect width="18" height="11" rx="1" fill={fill} />
                <text x="22" y="9" fontSize="7" fill="rgba(60,80,60,0.50)" fontFamily="monospace">
                  {altLo}–{altHi} m
                </text>
              </g>
            );
          })}
          <text fontSize="6" fill="rgba(60,80,60,0.25)" fontFamily="monospace" y={HYPS.length * 14 + 4}>
            Datum SIRGAS2000
          </text>
        </g>
      </svg>
    </div>
  );
}

export default TopoPageBackground;
