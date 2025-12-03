import { createFileRoute, Link } from "@tanstack/react-router"
import { pages, openCommandPalette } from "../components/command-palette"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  // Filter out the home page from the list
  const contentPages = pages.filter((p) => p.path !== "/")

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={openCommandPalette}
              className="text-5xl font-bold text-slate-100 hover:text-slate-300 transition-colors cursor-pointer"
            >
              Research
            </button>
            <a
              href="https://github.com/nikivdev/research"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
          <p className="text-slate-500 mt-3">
            Press{" "}
            <kbd className="px-2 py-1 text-xs bg-slate-800 rounded border border-slate-700">
              Cmd+K
            </kbd>{" "}
            or click above to search
          </p>
        </div>

        {/* Pages Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {contentPages.map((page) => (
            <Link
              key={page.path}
              to={page.path}
              className="bg-slate-900 rounded-xl p-5 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center transition-colors">
                  <PageIcon path={page.path} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-slate-100 group-hover:text-white transition-colors">
                    {page.name}
                  </h2>
                  {page.description && (
                    <p className="text-sm text-slate-500 mt-1">{page.description}</p>
                  )}
                  <span className="text-xs text-slate-600 font-mono mt-2 block">
                    {page.path}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function PageIcon({ path }: { path: string }) {
  // Return different icons based on path prefix
  if (path.startsWith("/papers")) {
    return <span className="text-lg">📄</span>
  }
  if (path.startsWith("/tech")) {
    return <span className="text-lg">🔧</span>
  }
  if (path.startsWith("/repos")) {
    return <span className="text-lg">📦</span>
  }
  if (path.startsWith("/research")) {
    return <span className="text-lg">🧠</span>
  }
  return <span className="text-lg">📝</span>
}
