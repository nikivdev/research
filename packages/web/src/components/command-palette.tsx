import * as React from "react"
import { useNavigate } from "@tanstack/react-router"
import { z } from "zod"

export const PageSchema = z.object({
  name: z.string().min(1),
  path: z.string().startsWith("/"),
  description: z.string().optional(),
  addedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
})

export type Page = z.infer<typeof PageSchema>

const pagesData = [
  { name: "Home", path: "/", description: "Landing page", addedAt: "2025-12-03" },
  { name: "DeepSeek-V3.2", path: "/papers/25/deepseek-v3-2", description: "Paper explanation", addedAt: "2025-12-03" },
  { name: "Cloudflare", path: "/tech/cloudflare", description: "Cloudflare products overview", addedAt: "2025-12-03" },
  { name: "Electric SQL", path: "/tech/electric", description: "Real-time Postgres sync", addedAt: "2025-12-03" },
  { name: "NanoChat", path: "/repos/karpathy/nanochat", description: "Karpathy's full-stack LLM training", addedAt: "2025-12-03" },
  { name: "Karabiner-Elements", path: "/repos/pqrs-org/Karabiner-Elements", description: "macOS keyboard remapping deep dive", addedAt: "2025-12-03" },
  { name: "Next-Action Prediction", path: "/research/how-to-train-model-to-recognize-next-action", description: "Train model to predict user's next action", addedAt: "2025-12-03" },
  { name: "Effect", path: "/lib/effect", description: "TypeScript effect system deep dive", addedAt: "2025-12-03" },
  { name: "Torchless", path: "/repos/ryanssenn/torchless", description: "LLM inference engine in C++ from scratch", addedAt: "2025-12-04" },
  { name: "Samui Wallet", path: "/repos/samui-build/samui-wallet", description: "Solana wallet & toolbox for builders", addedAt: "2025-12-04" },
  { name: "Absurd", path: "/repos/earendil-works/absurd", description: "PostgreSQL-native durable execution workflows", addedAt: "2025-12-04" },
  { name: "Jazz", path: "/repos/garden-co/jazz", description: "Distributed sync-first database for local-first apps", addedAt: "2025-12-04" },
  { name: "JAX", path: "/repos/jax-ml/jax", description: "Composable transformations for ML on accelerators", addedAt: "2025-12-04" },
  { name: "Claude Agent SDK", path: "/repos/anthropics/claude-agent-sdk-python", description: "Official Python SDK for building AI agents", addedAt: "2025-12-04" },
  { name: "CUA", path: "/repos/trycua/cua", description: "Computer Use Agent - AI agents that control computers via vision", addedAt: "2025-12-04" },
  { name: "MLX", path: "/repos/ml-explore/mlx", description: "Apple's array framework for ML on Apple Silicon", addedAt: "2025-12-06" },
  { name: "JAX Generative Models", path: "/repos/MizuhoAOKI/jax-generative-models", description: "DDPM and Flow Matching in JAX from scratch", addedAt: "2025-12-06" },
  { name: "NeurIPS 2025", path: "/visual/neurips-2025", description: "6,000+ papers visualized by research area", addedAt: "2025-12-07" },
  { name: "SHA-RNN", path: "/repos/Smerity/sha-rnn", description: "Single-head attention RNN that rivals Transformers on 1 GPU", addedAt: "2025-12-08" },
  { name: "Transformer Architecture", path: "/explain/ml/transformer", description: "Deep dive into Attention Is All You Need - all 6 components", addedAt: "2025-12-15" },
] satisfies Page[]

// Validate all pages at build time - will throw if any page is invalid
export const pages: Page[] = pagesData.map((page) => PageSchema.parse(page))

// Global function to open palette
let openPaletteFn: (() => void) | null = null

export function openCommandPalette() {
  openPaletteFn?.()
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)

  // Register the open function
  React.useEffect(() => {
    openPaletteFn = () => {
      setOpen(true)
      setQuery("")
      setSelectedIndex(0)
    }
    return () => {
      openPaletteFn = null
    }
  }, [])
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const filtered = React.useMemo(() => {
    if (!query) return pages
    const lower = query.toLowerCase()
    return pages.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.path.toLowerCase().includes(lower) ||
        p.description?.toLowerCase().includes(lower)
    )
  }, [query])

  React.useEffect(() => {
    setSelectedIndex(0)
  }, [filtered])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
        setQuery("")
        setSelectedIndex(0)
      }
      if (e.key === "Escape" && open) {
        e.preventDefault()
        setOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

  React.useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  const handleSelect = (page: Page) => {
    setOpen(false)
    navigate({ to: page.path })
  }

  const handleKeyDownInput = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault()
      handleSelect(filtered[selectedIndex])
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700">
          <svg
            className="w-5 h-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDownInput}
            placeholder="Search pages..."
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 outline-none"
          />
          <kbd className="px-2 py-1 text-xs text-slate-500 bg-slate-800 rounded">esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-slate-500">No results found</div>
          ) : (
            filtered.map((page, index) => (
              <button
                key={page.path}
                onClick={() => handleSelect(page)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  index === selectedIndex
                    ? "bg-slate-800 text-slate-100"
                    : "text-slate-400 hover:bg-slate-800/50"
                }`}
              >
                <svg
                  className="w-4 h-4 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{page.name}</div>
                  {page.description && (
                    <div className="text-sm text-slate-500 truncate">{page.description}</div>
                  )}
                </div>
                <span className="text-xs text-slate-600 font-mono">{page.path}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
