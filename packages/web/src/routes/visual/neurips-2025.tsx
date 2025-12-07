import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import normalizeWheel from "normalize-wheel"

export const Route = createFileRoute("/visual/neurips-2025")({
  component: NeurIPS2025Page,
})

interface Paper {
  id: number
  externalId: string
  title: string
  abstract: string | null
  authors: string | null
  keywords: string | null
  primaryArea: string | null
  track: string | null
  status: string | null
  venue: string
  year: number
  siteUrl: string | null
  githubUrl: string | null
  ratingAvg: string | null
  affiliations: string | null
  countries: string | null
}

const areaColors: Record<string, number> = {
  reinforcement_learning: 0xff6b6b,
  computer_vision: 0x4ecdc4,
  natural_language_processing: 0x45b7d1,
  optimization: 0xf9ca24,
  deep_learning: 0xa55eea,
  probabilistic_methods: 0x26de81,
  machine_learning_for_sciences: 0xfd79a8,
  unsupervised_and_self_supervised_learning: 0x00cec9,
  general_machine_learning: 0x636e72,
  learning_theory: 0xfdcb6e,
  neuroscience_and_cognitive_science: 0xe17055,
  social_and_economic_aspects_of_machine_learning: 0xd63031,
  data_centric_machine_learning: 0x0984e3,
  generative_models: 0x6c5ce7,
  metric_learning_kernels_and_sparse_methods: 0x00b894,
  applications: 0xe84393,
  infrastructure: 0x2d3436,
}

function getAreaColor(area: string | null): number {
  if (!area) return 0x888888
  return areaColors[area] ?? 0x888888
}

function parseRating(ratingAvg: string | null): { mean: number; std: number } {
  if (!ratingAvg) return { mean: 0, std: 0 }
  const [mean, std] = ratingAvg.split(",").map(Number)
  return { mean: mean || 0, std: std || 0 }
}

function parseAuthors(authors: string | null): string[] {
  return authors?.split(";").filter(Boolean) ?? []
}

function NeurIPS2025Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredPaper, setHoveredPaper] = useState<Paper | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const hoveredPaperRef = useRef<Paper | null>(null)

  // Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const pointsRef = useRef<THREE.Points | null>(null)
  const raycasterRef = useRef<THREE.Raycaster | null>(null)
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2())

  const dragRef = useRef({
    xCurrent: 0,
    xTarget: 0,
    yCurrent: 0,
    yTarget: 0,
    isDown: false,
    lastX: 0,
    lastY: 0,
  })

  const zoomRef = useRef({
    current: 80,
    target: 80,
  })

  // Fetch papers (with IndexedDB cache)
  useEffect(() => {
    const DB_NAME = "neurips-cache"
    const STORE_NAME = "papers"
    const CACHE_KEY = "neurips-2025"

    async function openDb(): Promise<IDBDatabase> {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve(request.result)
        request.onupgradeneeded = () => {
          request.result.createObjectStore(STORE_NAME)
        }
      })
    }

    async function getFromCache(): Promise<Paper[] | null> {
      try {
        const db = await openDb()
        return new Promise((resolve) => {
          const tx = db.transaction(STORE_NAME, "readonly")
          const store = tx.objectStore(STORE_NAME)
          const request = store.get(CACHE_KEY)
          request.onsuccess = () => resolve(request.result || null)
          request.onerror = () => resolve(null)
        })
      } catch {
        return null
      }
    }

    async function saveToCache(data: Paper[]): Promise<void> {
      try {
        const db = await openDb()
        const tx = db.transaction(STORE_NAME, "readwrite")
        const store = tx.objectStore(STORE_NAME)
        store.put(data, CACHE_KEY)
      } catch {
        // Ignore cache errors
      }
    }

    async function fetchPapers() {
      // Try loading from cache first
      const cached = await getFromCache()
      if (cached && cached.length > 0) {
        setPapers(cached)
        setLoading(false)
        return
      }

      try {
        const response = await fetch("/api/papers")
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}: ${response.statusText}`)
        }
        const json = await response.json()
        if (!json.data || !Array.isArray(json.data)) {
          throw new Error("Invalid response format")
        }
        setPapers(json.data)
        // Cache the result
        await saveToCache(json.data)
      } catch (err) {
        console.error("Failed to fetch papers:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch papers")
      } finally {
        setLoading(false)
      }
    }
    fetchPapers()
  }, [])

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current || papers.length === 0) return

    const canvas = canvasRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = zoomRef.current.current
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    rendererRef.current = renderer

    // Raycaster
    raycasterRef.current = new THREE.Raycaster()
    raycasterRef.current.params.Points!.threshold = 1

    // Create visualization
    const areas = [...new Set(papers.map((p) => p.primaryArea).filter(Boolean))]
    const areaPositions = new Map<string, { x: number; y: number }>()

    const gridSize = Math.ceil(Math.sqrt(areas.length))
    const spacing = 60

    areas.forEach((area, i) => {
      const row = Math.floor(i / gridSize)
      const col = i % gridSize
      areaPositions.set(area!, {
        x: (col - gridSize / 2) * spacing,
        y: (row - gridSize / 2) * spacing,
      })
    })

    const positions = new Float32Array(papers.length * 3)
    const colors = new Float32Array(papers.length * 3)
    const sizes = new Float32Array(papers.length)

    papers.forEach((paper, i) => {
      const areaPos = areaPositions.get(paper.primaryArea!) ?? { x: 0, y: 0 }
      const clusterRadius = 25
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * clusterRadius

      positions[i * 3] = areaPos.x + Math.cos(angle) * radius
      positions[i * 3 + 1] = areaPos.y + Math.sin(angle) * radius
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15

      const color = new THREE.Color(getAreaColor(paper.primaryArea))
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b

      const { mean } = parseRating(paper.ratingAvg)
      sizes[i] = 2 + mean * 0.8
    })

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uPixelRatio;

        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;

        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float alpha = 1.0 - smoothstep(0.35, 0.5, dist);
          if (alpha < 0.01) discard;
          float glow = exp(-dist * 4.0) * 0.4;
          vec3 finalColor = vColor + glow;
          gl_FragColor = vec4(finalColor, alpha + glow * 0.3);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      uniforms: {
        uPixelRatio: { value: Math.min(2, window.devicePixelRatio) },
      },
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)
    pointsRef.current = points

    // Animation loop
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Smooth drag
      dragRef.current.xCurrent += (dragRef.current.xTarget - dragRef.current.xCurrent) * 0.1
      dragRef.current.yCurrent += (dragRef.current.yTarget - dragRef.current.yCurrent) * 0.1

      // Smooth zoom
      zoomRef.current.current += (zoomRef.current.target - zoomRef.current.current) * 0.1

      camera.position.x = -dragRef.current.xCurrent
      camera.position.y = -dragRef.current.yCurrent
      camera.position.z = zoomRef.current.current

      renderer.render(scene, camera)
    }
    animate()

    // Event handlers
    const onResize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    const onPointerDown = (e: PointerEvent) => {
      dragRef.current.isDown = true
      dragRef.current.lastX = e.clientX
      dragRef.current.lastY = e.clientY
    }

    const onPointerMove = (e: PointerEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1

      if (dragRef.current.isDown) {
        const dx = e.clientX - dragRef.current.lastX
        const dy = e.clientY - dragRef.current.lastY
        dragRef.current.lastX = e.clientX
        dragRef.current.lastY = e.clientY
        dragRef.current.xTarget += dx * 0.3
        dragRef.current.yTarget -= dy * 0.3
      }

      // Raycasting for hover
      if (raycasterRef.current && cameraRef.current && pointsRef.current) {
        raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current)
        const intersects = raycasterRef.current.intersectObject(pointsRef.current)

        if (intersects.length > 0) {
          const index = intersects[0].index!
          const paper = papers[index]
          setHoveredPaper(paper)
          hoveredPaperRef.current = paper
          setTooltipPos({ x: e.clientX, y: e.clientY })
        } else {
          setHoveredPaper(null)
          hoveredPaperRef.current = null
        }
      }
    }

    const onPointerUp = () => {
      dragRef.current.isDown = false
    }

    const onWheel = (e: WheelEvent) => {
      const normalized = normalizeWheel(e)
      zoomRef.current.target = Math.max(20, Math.min(200, zoomRef.current.target + normalized.pixelY * 0.05))
    }

    const onClick = () => {
      if (hoveredPaperRef.current?.siteUrl) {
        window.open(hoveredPaperRef.current.siteUrl, "_blank")
      }
    }

    window.addEventListener("resize", onResize)
    canvas.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
    canvas.addEventListener("wheel", onWheel)
    canvas.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", onResize)
      canvas.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
      canvas.removeEventListener("wheel", onWheel)
      canvas.removeEventListener("click", onClick)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [papers])

  if (error) {
    return (
      <div className="relative w-full h-screen bg-slate-950 overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">NeurIPS 2025</h1>
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Header */}
      <div className="absolute top-4 left-4 z-10 text-white pointer-events-none">
        <h1 className="text-2xl font-bold">NeurIPS 2025</h1>
        <p className="text-sm text-white/60">
          {loading ? "Loading papers..." : `${papers.length.toLocaleString()} papers`}
        </p>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10 text-white/40 text-xs pointer-events-none">
        <p>Drag to pan • Scroll to zoom • Click paper to open</p>
      </div>

      {/* Tooltip */}
      {hoveredPaper && (
        <div
          className="fixed z-50 max-w-sm p-4 bg-black/90 text-white rounded-lg shadow-xl pointer-events-none text-sm"
          style={{
            left: tooltipPos.x + 20,
            top: tooltipPos.y + 20,
            transform: tooltipPos.x > window.innerWidth - 400 ? "translateX(-100%)" : undefined,
          }}
        >
          <div className="font-bold mb-2 line-clamp-2">{hoveredPaper.title}</div>
          <div className="text-xs text-white/60 mb-2">
            {parseAuthors(hoveredPaper.authors).slice(0, 3).join(", ")}
            {parseAuthors(hoveredPaper.authors).length > 3 && "..."}
          </div>
          <div className="flex gap-2 text-xs flex-wrap">
            <span className="px-2 py-0.5 bg-white/20 rounded">{hoveredPaper.status || "Poster"}</span>
            <span className="px-2 py-0.5 bg-white/20 rounded">
              {hoveredPaper.primaryArea?.replace(/_/g, " ") || "N/A"}
            </span>
            {parseRating(hoveredPaper.ratingAvg).mean > 0 && (
              <span className="px-2 py-0.5 bg-white/20 rounded">
                ★ {parseRating(hoveredPaper.ratingAvg).mean.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
