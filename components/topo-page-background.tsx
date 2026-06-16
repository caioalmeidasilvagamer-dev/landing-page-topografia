'use client'

/* ─── Paleta — tons terrosos/azuis em baixíssima opacidade para os metadados vetoriais ─── */
const S = {
  meta    : 'rgba(175,162,132,0.16)',    /* metadados cartográficos */
}

export function TopoPageBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Textura Cartográfica Principal (imagem de curvas de nível) */}
      <div 
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/mapa-topo-bg.jpg')",
          opacity: 0.045, // Sutil (entre 3% e 8% para preservar a leitura)
          filter: 'grayscale(100%) blur(1.2px) contrast(1.15) brightness(0.98)',
        }}
      />

      {/* Overlay de gradiente radial para suavizar as bordas e integrar com a cor clara do site (#F8FAFC) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, transparent 20%, var(--background) 95%)',
          opacity: 0.85,
        }}
      />

      {/* Elementos técnicos da carta topográfica (marcações vetoriais nítidas) */}
      <svg
        className="w-full h-full absolute inset-0 opacity-40"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Cruzetas da grade cartográfica */}
        <g stroke={S.meta} strokeWidth="0.55" opacity="0.45">
          {[350, 700, 1050].flatMap((gx) =>
            [225, 450, 675].map((gy) => (
              <g key={`g${gx}-${gy}`}>
                <line x1={gx - 7} y1={gy} x2={gx + 7} y2={gy} />
                <line x1={gx} y1={gy - 7} x2={gx} y2={gy + 7} />
              </g>
            )),
          )}
        </g>

        {/* Coordenadas nos quatro cantos */}
        <g
          fill={S.meta}
          fontSize="8"
          fontFamily="'IBM Plex Mono',monospace"
          letterSpacing="0.05em"
          opacity="0.8"
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

        {/* Barra de escala gráfica */}
        <g stroke={S.meta} fill={S.meta} strokeWidth="0.8" opacity="0.7">
          <line x1="1252" y1="858" x2="1384" y2="858" />
          <line x1="1252" y1="853" x2="1252" y2="863" />
          <line x1="1318" y1="854" x2="1318" y2="862" />
          <line x1="1384" y1="853" x2="1384" y2="863" />
          <rect x="1252" y="856" width="66" height="4" opacity="0.35" />
          <text x="1250" y="873" fontSize="7.5" fontFamily="'IBM Plex Mono',monospace">0</text>
          <text x="1306" y="873" fontSize="7.5" fontFamily="'IBM Plex Mono',monospace">500m</text>
          <text x="1362" y="873" fontSize="7.5" fontFamily="'IBM Plex Mono',monospace">1km</text>
        </g>

        {/* Marcas de registro (cantos) */}
        <g stroke={S.meta} strokeWidth="0.55" opacity="0.35">
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
