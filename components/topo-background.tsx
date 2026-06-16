'use client'

/* TopoBackground — overlay de seção (apenas grid cartográfico e metadados)
 * As curvas de nível são renderizadas pelo TopoPageBackground (fixed, global).
 * Este componente existe apenas para seções que precisam do grid técnico local. */

interface TopoBackgroundProps {
  className?: string
  showGrid?: boolean
  showCoords?: boolean
  variant?: 'light' | 'dark'
  backgroundImageUrl?: string
  backgroundImageUrlMobile?: string
}

export function TopoBackground({
  className = '',
  showGrid = true,
  showCoords = false,
  variant = 'dark',
  backgroundImageUrl,
  backgroundImageUrlMobile,
}: TopoBackgroundProps) {
  const gridClass   = variant === 'dark' ? 'technical-grid-dark' : 'technical-grid'
  const metaColor   = variant === 'dark' ? 'rgba(175,162,132,0.16)' : 'rgba(80,70,50,0.14)'

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {/* Imagem de background - Desktop */}
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-no-repeat bg-contain bg-center hidden md:block"
          style={{
            backgroundImage: `url('${backgroundImageUrl}')`,
            opacity: 0.35,
            filter: 'sepia(12%) saturate(0.65) contrast(1.18) brightness(0.96)',
          }}
        />
      )}

      {/* Imagem de background - Mobile */}
      {backgroundImageUrlMobile && (
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center block md:hidden"
          style={{
            backgroundImage: `url('${backgroundImageUrlMobile}')`,
            opacity: 0.35,
            filter: 'sepia(12%) saturate(0.65) contrast(1.18) brightness(0.96)',
          }}
        />
      )}

      {/* Grid de engenharia */}
      {showGrid && <div className={`absolute inset-0 ${gridClass}`} />}

      {/* Metadados cartográficos de seção (quando showCoords=true) */}
      {showCoords && (
        <div
          className="absolute top-3 left-4 font-mono text-[10px] leading-tight"
          style={{ color: metaColor }}
        >
          <div>LAT 23°32′14″S</div>
          <div>LON 46°38′09″W</div>
        </div>
      )}
      {showCoords && (
        <div
          className="absolute top-3 right-4 font-mono text-[10px] leading-tight text-right"
          style={{ color: metaColor }}
        >
          <div>DATUM SIRGAS2000</div>
          <div>UTM 23S</div>
        </div>
      )}
    </div>
  )
}
