'use client'

import { Suspense, useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ---------------------------------------------------------------------------
// Brazil silhouette – simplified polygon path (lat/lon → flat XZ plane)
// Coordenadas GeoJSON simplificadas do contorno do Brasil (subconjunto)
// ---------------------------------------------------------------------------
const BRAZIL_OUTLINE_COORDS: [number, number][] = [
  [-34.8, -7.5],[-35.4,-9.2],[-37.0,-11.0],[-38.5,-12.9],[-39.1,-15.3],
  [-39.5,-17.0],[-40.1,-19.0],[-40.9,-20.7],[-41.5,-22.0],[-43.2,-23.0],
  [-44.7,-23.2],[-46.4,-24.0],[-48.5,-25.5],[-48.7,-27.0],[-49.7,-28.7],
  [-51.2,-30.0],[-52.5,-33.0],[-53.5,-33.7],[-53.4,-32.0],[-53.0,-30.5],
  [-51.5,-29.0],[-50.0,-28.0],[-49.0,-26.5],[-48.0,-25.0],[-46.6,-23.5],
  [-44.0,-23.0],[-41.8,-21.0],[-41.0,-20.0],[-40.5,-18.0],[-39.8,-16.0],
  [-38.8,-13.0],[-37.5,-11.5],[-35.8,-9.5],[-35.0,-8.0],[-34.9,-7.9],
  // North coast
  [-34.8,-7.5],[-33.0,-5.0],[-31.5,-2.5],[-29.0,-1.5],[-27.0,-0.5],
  [-25.0,0.5],[-22.5,1.5],[-20.0,2.0],[-17.0,3.5],[-15.0,4.5],
  [-12.5,5.0],[-10.0,5.5],[-8.0,5.8],[-5.0,5.5],[-2.5,4.5],
  [-0.5,3.5],[1.0,2.5],[2.0,1.5],[2.5,0.5],[2.0,-1.0],
  // West Amazon
  [0.5,-2.5],[-1.0,-4.0],[-3.0,-6.5],[-5.0,-8.0],[-7.2,-9.5],
  [-9.0,-10.5],[-10.5,-11.8],[-12.0,-13.0],[-13.5,-14.5],
  [-15.0,-15.5],[-16.5,-16.5],[-18.0,-17.5],[-19.5,-18.5],
  [-20.0,-20.0],[-21.0,-21.5],[-22.0,-23.5],
  // South
  [-24.0,-24.5],[-25.0,-26.0],[-26.5,-27.5],[-28.5,-29.5],
  [-30.0,-31.0],[-31.5,-32.0],[-33.0,-33.5],[-34.0,-34.5],
  [-35.0,-35.5],
]

// Normalise to 0–1 range
function normaliseCoords(coords: [number, number][]): [number, number][] {
  const xs = coords.map(c => c[0])
  const ys = coords.map(c => c[1])
  const minX = Math.min(...xs), maxX = Math.max(...xs)
  const minY = Math.min(...ys), maxY = Math.max(...ys)
  const rangeX = maxX - minX
  const rangeY = maxY - minY
  const scale = Math.max(rangeX, rangeY)
  return coords.map(([x, y]) => [
    (x - minX) / scale - rangeX / scale / 2,
    (y - minY) / scale - rangeY / scale / 2,
  ])
}

// ---------------------------------------------------------------------------
// Elevation / colour helpers
// ---------------------------------------------------------------------------
function elevation(nx: number, ny: number): number {
  // Faux terrain: multiple sine waves + noise-like variation
  const s1 = Math.sin(nx * 6.2 + 1.1) * Math.cos(ny * 5.8 + 0.4) * 0.35
  const s2 = Math.sin(nx * 14.0 - 0.9) * Math.sin(ny * 12.3 + 0.7) * 0.20
  const s3 = Math.cos(nx * 22.0 + 0.3) * Math.sin(ny * 18.5 - 1.2) * 0.10
  // Chapada dos Veadeiros / Planalto Central bump
  const dist1 = Math.hypot(nx - 0.48, ny - 0.38)
  const planalto = Math.exp(-dist1 * dist1 * 22) * 0.55
  // Serra do Mar / Sudeste bump
  const dist2 = Math.hypot(nx - 0.68, ny - 0.72)
  const serra = Math.exp(-dist2 * dist2 * 30) * 0.45
  // Norte Amazônia – baixo relevo
  const dist3 = Math.hypot(nx - 0.28, ny - 0.18)
  const amazon = -Math.exp(-dist3 * dist3 * 8) * 0.15
  return Math.max(0, s1 + s2 + s3 + planalto + serra + amazon)
}

function topoColor(elev: number): THREE.Color {
  // Natural topographic palette
  if (elev < 0.05) return new THREE.Color('#5c8a6e')   // lowland green
  if (elev < 0.15) return new THREE.Color('#6b9b63')   // forest green
  if (elev < 0.30) return new THREE.Color('#8fad6e')   // savanna
  if (elev < 0.45) return new THREE.Color('#a8996a')   // cerrado / dry
  if (elev < 0.60) return new THREE.Color('#b8a07a')   // rocky hillside
  if (elev < 0.75) return new THREE.Color('#c4b08a')   // rock / stone
  return new THREE.Color('#d4c4a0')                     // peak / quartzite
}

// ---------------------------------------------------------------------------
// BrazilTerrain mesh – procedural heightmap on a plane subdivided grid
// ---------------------------------------------------------------------------
function BrazilTerrain() {
  const meshRef = useRef<THREE.Mesh>(null)
  const segsX = 160
  const segsY = 160

  const [geometry, colors] = useMemo(() => {
    const geo = new THREE.PlaneGeometry(4, 4, segsX, segsY)
    geo.rotateX(-Math.PI / 2)

    const pos = geo.attributes.position
    const colorArr = new Float32Array(pos.count * 3)

    for (let i = 0; i < pos.count; i++) {
      const px = pos.getX(i)
      const pz = pos.getZ(i)
      // Normalise to 0-1
      const nx = (px + 2) / 4
      const ny = (pz + 2) / 4
      const h = elevation(nx, ny)
      pos.setY(i, h * 1.4)
      const c = topoColor(h)
      colorArr[i * 3] = c.r
      colorArr[i * 3 + 1] = c.g
      colorArr[i * 3 + 2] = c.b
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colorArr, 3))
    geo.computeVertexNormals()
    return [geo, colorArr]
  }, [])

  // Extruded base / border slab
  const baseMesh = useMemo(() => {
    const geo = new THREE.BoxGeometry(4.05, 0.12, 4.05)
    return geo
  }, [])

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial
          vertexColors
          roughness={0.82}
          metalness={0.04}
          side={THREE.FrontSide}
        />
      </mesh>
      {/* Base slab – dark stone border */}
      <mesh geometry={baseMesh} position={[0, -0.08, 0]}>
        <meshStandardMaterial color="#2a2a28" roughness={0.95} metalness={0.02} />
      </mesh>
    </group>
  )
}

// ---------------------------------------------------------------------------
// River lines – simple tube curves
// ---------------------------------------------------------------------------
function Rivers() {
  const rivers = useMemo(() => {
    // Amazon main stem (simplified)
    const amazonPoints = [
      new THREE.Vector3(-1.8, 0.22, -0.3),
      new THREE.Vector3(-1.2, 0.28, -0.25),
      new THREE.Vector3(-0.5, 0.32, -0.1),
      new THREE.Vector3(0.2, 0.30, 0.05),
      new THREE.Vector3(0.8, 0.28, 0.2),
      new THREE.Vector3(1.4, 0.25, 0.4),
    ]
    // São Francisco
    const sfPoints = [
      new THREE.Vector3(0.6, 0.45, -0.1),
      new THREE.Vector3(0.8, 0.38, 0.2),
      new THREE.Vector3(0.9, 0.30, 0.5),
      new THREE.Vector3(0.85, 0.28, 0.85),
    ]
    return [amazonPoints, sfPoints]
  }, [])

  return (
    <>
      {rivers.map((pts, i) => {
        const curve = new THREE.CatmullRomCurve3(pts)
        const geo = new THREE.TubeGeometry(curve, 40, 0.012, 6, false)
        return (
          <mesh key={i} geometry={geo}>
            <meshStandardMaterial
              color="#3a7ab5"
              roughness={0.3}
              metalness={0.1}
              opacity={0.75}
              transparent
            />
          </mesh>
        )
      })}
    </>
  )
}

// ---------------------------------------------------------------------------
// Animated group – slow rotation + float + mouse parallax
// ---------------------------------------------------------------------------
function AnimatedScene() {
  const groupRef = useRef<THREE.Group>(null)
  const { size } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const clock = useRef(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    clock.current += delta
    // Extremely slow rotation
    groupRef.current.rotation.y += 0.0008
    // Gentle float
    groupRef.current.position.y = Math.sin(clock.current * 0.4) * 0.06
    // Subtle parallax tilt
    const targetX = mouseRef.current.y * 0.08
    const targetZ = mouseRef.current.x * 0.06
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.03
  })

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]}>
      <BrazilTerrain />
      <Rivers />
    </group>
  )
}

// ---------------------------------------------------------------------------
// Lights
// ---------------------------------------------------------------------------
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.45} color="#ece8df" />
      {/* Key light – upper right */}
      <directionalLight
        position={[4, 8, 3]}
        intensity={1.6}
        color="#fff8f0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
      />
      {/* Fill light – left */}
      <directionalLight position={[-3, 4, -2]} intensity={0.4} color="#c8d8e8" />
      {/* Rim light – back */}
      <directionalLight position={[0, -2, -5]} intensity={0.2} color="#a0b0a0" />
    </>
  )
}

// ---------------------------------------------------------------------------
// Fallback (WebGL not supported or loading)
// ---------------------------------------------------------------------------
function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 opacity-40">
        <div className="size-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
          Carregando modelo…
        </span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export function Brazil3D() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      setWebglSupported(!!ctx)
    } catch {
      setWebglSupported(false)
    }
  }, [])

  if (webglSupported === false) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-muted-foreground text-sm font-mono">
          Maquete 3D indisponível neste dispositivo
        </div>
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 3.5, 4.5], fov: 42 }}
      shadows
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <StudioLighting />
      <Suspense fallback={null}>
        <AnimatedScene />
      </Suspense>
    </Canvas>
  )
}
