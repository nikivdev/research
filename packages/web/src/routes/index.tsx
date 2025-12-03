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
          <button
            onClick={openCommandPalette}
            className="text-5xl font-bold text-slate-100 hover:text-slate-300 transition-colors cursor-pointer"
          >
            Research
          </button>
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
