import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-100">Research</h1>
      </div>
    </div>
  )
}
