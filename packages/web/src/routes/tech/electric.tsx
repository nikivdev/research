import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/tech/electric")({
  component: ElectricPage,
})

function ElectricPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-yellow-400 text-sm font-mono">tech</span>
            <span className="text-slate-600">/</span>
            <h1 className="text-lg font-semibold">Electric SQL</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
            <span className="text-4xl">⚡</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            Electric SQL
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Real-time sync for Postgres
          </p>
          <p className="text-slate-500 max-w-3xl mx-auto">
            Sync subsets of your Postgres data to local apps, services, and environments.
            Electric handles the hard problems: partial replication, fan-out, and data delivery.
          </p>
        </section>

        {/* Architecture Overview */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Architecture" />

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="flex flex-col items-center gap-6">
              {/* Postgres */}
              <div className="w-full max-w-md">
                <ArchBlock
                  title="Postgres"
                  subtitle="Source of Truth"
                  color="blue"
                  description="Your database with logical replication enabled"
                />
              </div>

              <Arrow />

              {/* Electric */}
              <div className="w-full max-w-md">
                <ArchBlock
                  title="Electric Sync Service"
                  subtitle="Elixir Web Service"
                  color="yellow"
                  description="Consumes WAL, maintains Shape Logs, serves HTTP API"
                />
              </div>

              <Arrow />

              {/* Clients */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <ClientBlock icon="🌐" label="Web Apps" />
                <ClientBlock icon="📱" label="Mobile" />
                <ClientBlock icon="🤖" label="AI/Agents" />
                <ClientBlock icon="💾" label="PGlite" />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-700 grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-400">HTTP</div>
                <div className="text-sm text-slate-500">Protocol</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">Long-Poll / SSE</div>
                <div className="text-sm text-slate-500">Live Updates</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-400">CDN-Ready</div>
                <div className="text-sm text-slate-500">Request Collapsing</div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Concept: Shapes */}
        <section className="space-y-8">
          <SectionHeader icon="🔷" title="Shapes" subtitle="The fundamental sync primitive" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-semibold text-lg">What is a Shape?</h3>
              <p className="text-slate-400">
                A Shape defines a subset of your Postgres data to sync. It's the unit of sync in Electric.
              </p>
              <div className="space-y-3">
                <ShapeParam name="table" description="Root table to sync (required)" example="todos" />
                <ShapeParam name="where" description="SQL filter for rows" example="user_id = $1" />
                <ShapeParam name="columns" description="Columns to include" example="id,title,status" />
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
              <h3 className="font-semibold text-lg">Shape Examples</h3>
              <CodeBlock code={`// All todos
GET /v1/shape?table=todos

// User's todos only
GET /v1/shape?table=todos&where=user_id=$1&params[1]=123

// Selected columns
GET /v1/shape?table=todos&columns=id,title,status`} />
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚠️</span>
              <div>
                <h4 className="font-semibold text-amber-400">Limitations</h4>
                <ul className="text-slate-400 text-sm mt-2 space-y-1">
                  <li>• Single-table only (no JOINs) - subscribe to multiple shapes and join in client</li>
                  <li>• Shape definitions are immutable once subscribed</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Shape Log */}
        <section className="space-y-8">
          <SectionHeader icon="📜" title="Shape Log" subtitle="The sync mechanism" />

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <p className="text-slate-400 mb-6">
              A Shape Log is a sequence of database operations filtered for a specific shape.
              Clients consume the log to build and maintain their local replica.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold mb-4 text-slate-300">Operations</h4>
                <div className="space-y-3">
                  <LogOperation op="insert" color="emerald" description="New row added to shape" />
                  <LogOperation op="update" color="blue" description="Row modified" />
                  <LogOperation op="delete" color="red" description="Row removed" />
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-slate-300">Control Messages</h4>
                <div className="space-y-3">
                  <LogOperation op="up-to-date" color="yellow" description="Caught up with Postgres" />
                  <LogOperation op="must-refetch" color="orange" description="Need to resync shape" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <h4 className="font-semibold mb-4 text-slate-300">Example Log Entry</h4>
              <CodeBlock code={`{
  "headers": { "operation": "insert" },
  "key": "todo-1",
  "value": {
    "id": "todo-1",
    "title": "Learn Electric",
    "completed": false
  }
}`} />
            </div>
          </div>
        </section>

        {/* Sync Protocol */}
        <section className="space-y-8">
          <SectionHeader icon="🔄" title="Sync Protocol" subtitle="How data flows" />

          <div className="space-y-6">
            {/* Initial Sync */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">1</span>
                Initial Sync
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <SyncStep
                  step="Request"
                  description="Client requests shape with offset=-1"
                  code="GET /v1/shape?table=todos&offset=-1"
                />
                <SyncStep
                  step="Response"
                  description="Electric returns paginated Shape Log entries"
                  code="[{insert...}, {insert...}, ...]"
                />
                <SyncStep
                  step="Complete"
                  description="Client receives up-to-date message"
                  code='{"headers":{"control":"up-to-date"}}'
                />
              </div>
            </div>

            {/* Live Mode */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">2</span>
                Live Mode (Real-time Updates)
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <SyncStep
                  step="Subscribe"
                  description="Client enables live mode with handle"
                  code="GET ...&live=true&handle=abc123"
                />
                <SyncStep
                  step="Wait"
                  description="Server holds connection (long-poll)"
                  code="Connection open..."
                />
                <SyncStep
                  step="Push"
                  description="Changes pushed when available"
                  code="[{update...}, {delete...}]"
                />
              </div>
              <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-400">
                  <span className="text-emerald-400 font-semibold">SSE Alternative:</span> Use <code className="text-yellow-400">live_sse=true</code> for
                  Server-Sent Events instead of long-polling. More efficient for persistent connections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Replication Flow */}
        <section className="space-y-8">
          <SectionHeader icon="📡" title="Replication Pipeline" subtitle="From Postgres to clients" />

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <PipelineStep icon="🐘" title="Postgres WAL" subtitle="Logical replication stream" />
              <PipelineArrow />
              <PipelineStep icon="📥" title="Electric Consumes" subtitle="Replication slot" />
              <PipelineArrow />
              <PipelineStep icon="🔍" title="Filter & Match" subtitle="Where clause eval" />
              <PipelineArrow />
              <PipelineStep icon="💾" title="Shape Cache" subtitle="Disk-based storage" />
              <PipelineArrow />
              <PipelineStep icon="📤" title="HTTP Response" subtitle="To clients" />
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-4">
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Postgres Requirements</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Postgres 14+ with logical replication</li>
                  <li>• User with REPLICATION attribute</li>
                  <li>• Direct connection (no pgBouncer &lt;1.23)</li>
                </ul>
              </div>
              <div className="bg-slate-800 rounded-xl p-4">
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Electric Creates</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Publication: <code className="text-yellow-400">electric_publication_default</code></li>
                  <li>• Slot: <code className="text-yellow-400">electric_slot_default</code></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Performance */}
        <section className="space-y-8">
          <SectionHeader icon="🚀" title="Performance" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <PerfCard
              metric="Millions"
              label="Concurrent Users"
              detail="Via CDN request collapsing"
            />
            <PerfCard
              metric="5,000/s"
              label="Row Changes"
              detail="With optimized where clauses"
            />
            <PerfCard
              metric="~6ms"
              label="Update Latency"
              detail="Postgres → Client"
            />
            <PerfCard
              metric="Low"
              label="Memory Usage"
              detail="Disk-based shape cache"
            />
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h4 className="font-semibold mb-4">Where Clause Optimization</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <div className="text-emerald-400 font-semibold mb-2">✓ Optimized (Fast)</div>
                <CodeBlock code={`where=user_id=$1
where=status='active'
where=id=$1 AND visible=true`} />
                <p className="text-sm text-slate-400 mt-2">~5,000 changes/sec regardless of shape count</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
                <div className="text-orange-400 font-semibold mb-2">⚠ Non-optimized (Slower)</div>
                <CodeBlock code={`where=title LIKE '%search%'
where=created_at > now()`} />
                <p className="text-sm text-slate-400 mt-2">~140 changes/sec for 100 shapes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Usage */}
        <section className="space-y-8">
          <SectionHeader icon="💻" title="Client Usage" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="text-blue-400">React</span>
                <code className="text-xs bg-slate-800 px-2 py-1 rounded">@electric-sql/react</code>
              </h3>
              <CodeBlock code={`import { useShape } from '@electric-sql/react'

function Todos() {
  const { data, isLoading } = useShape({
    url: 'http://localhost:3000/v1/shape',
    params: { table: 'todos' }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <ul>
      {data?.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  )
}`} />
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="text-yellow-400">TypeScript</span>
                <code className="text-xs bg-slate-800 px-2 py-1 rounded">@electric-sql/client</code>
              </h3>
              <CodeBlock code={`import { ShapeStream, Shape } from '@electric-sql/client'

const stream = new ShapeStream({
  url: 'http://localhost:3000/v1/shape',
  params: { table: 'todos' }
})

const shape = new Shape(stream)

// Wait for initial sync
await shape.rows

// Subscribe to changes
shape.subscribe(({ rows }) => {
  console.log('Todos:', rows)
})`} />
            </div>
          </div>
        </section>

        {/* Write Patterns */}
        <section className="space-y-8">
          <SectionHeader icon="✍️" title="Write Patterns" subtitle="Electric is read-path only" />

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-6">
            <p className="text-slate-300">
              Electric syncs data <strong>from</strong> Postgres to clients. For writes, you compose your own pattern:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <WritePattern
              title="Online Writes"
              description="Direct API calls to server"
              pros={["Simple", "Consistent"]}
              cons={["Requires online"]}
            />
            <WritePattern
              title="Optimistic State"
              description="Local optimistic updates + server sync"
              pros={["Feels instant", "Works offline briefly"]}
              cons={["More complex"]}
            />
            <WritePattern
              title="Persistent Optimistic"
              description="Persistent local store for optimistic writes"
              pros={["True offline", "Multi-device"]}
              cons={["Conflict resolution needed"]}
            />
            <WritePattern
              title="Through-the-DB"
              description="PGlite embedded + sync in/out"
              pros={["Pure local-first", "Full SQL locally"]}
              cons={["Most complex"]}
            />
          </div>
        </section>

        {/* Deployment */}
        <section className="space-y-8">
          <SectionHeader icon="🚢" title="Deployment" />

          <div className="grid md:grid-cols-3 gap-6">
            <DeployOption
              title="Electric Cloud"
              description="Managed hosting"
              features={["Zero config", "Auto-scaling", "Monitoring"]}
              color="yellow"
            />
            <DeployOption
              title="Docker"
              description="Self-hosted container"
              features={["Full control", "Any cloud", "Persistent volume needed"]}
              color="blue"
            />
            <DeployOption
              title="Platform Integrations"
              description="One-click deploys"
              features={["Supabase", "Neon", "Fly.io", "Render"]}
              color="purple"
            />
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h4 className="font-semibold mb-4">Key Environment Variables</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <EnvVar name="DATABASE_URL" description="Postgres connection string" />
              <EnvVar name="ELECTRIC_PORT" description="HTTP port (default: 3000)" />
              <EnvVar name="ELECTRIC_STORAGE_DIR" description="Persistent storage path" />
              <EnvVar name="ELECTRIC_POOLED_DATABASE_URL" description="Optional pooled connection" />
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💡" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Shapes are the primitive"
              description="Define what data to sync with table + where + columns. Single-table only, but you can join multiple shapes client-side."
            />
            <TakeawayCard
              title="HTTP-first design"
              description="Works with any language, behind CDNs, through firewalls. Long-polling or SSE for live updates."
            />
            <TakeawayCard
              title="Read-path only"
              description="Electric doesn't handle writes. Compose your own write pattern (API calls, optimistic state, PGlite)."
            />
            <TakeawayCard
              title="CDN-native scaling"
              description="Request collapsing at the CDN layer means millions of concurrent users without linear cost."
            />
          </div>
        </section>
      </main>
    </div>
  )
}

// Components

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-2xl">{icon}</span>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-slate-500">{subtitle}</p>}
      </div>
    </div>
  )
}

function ArchBlock({ title, subtitle, color, description }: { title: string; subtitle: string; color: string; description: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/30",
    yellow: "bg-yellow-500/10 border-yellow-500/30",
  }
  return (
    <div className={`${colors[color]} border rounded-xl p-6 text-center`}>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-slate-400">{subtitle}</p>
      <p className="text-xs text-slate-500 mt-2">{description}</p>
    </div>
  )
}

function Arrow() {
  return (
    <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )
}

function ClientBlock({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 text-center">
      <span className="text-2xl">{icon}</span>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  )
}

function ShapeParam({ name, description, example }: { name: string; description: string; example: string }) {
  return (
    <div className="bg-slate-800 rounded-lg p-3">
      <div className="flex items-center justify-between mb-1">
        <code className="text-yellow-400 text-sm">{name}</code>
        <code className="text-xs text-slate-500">{example}</code>
      </div>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-slate-800 rounded-lg p-4 overflow-x-auto text-sm">
      <code className="text-slate-300">{code}</code>
    </pre>
  )
}

function LogOperation({ op, color, description }: { op: string; color: string; description: string }) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-500/20 text-emerald-400",
    blue: "bg-blue-500/20 text-blue-400",
    red: "bg-red-500/20 text-red-400",
    yellow: "bg-yellow-500/20 text-yellow-400",
    orange: "bg-orange-500/20 text-orange-400",
  }
  return (
    <div className="flex items-center gap-3">
      <code className={`px-2 py-1 rounded text-xs ${colors[color]}`}>{op}</code>
      <span className="text-sm text-slate-400">{description}</span>
    </div>
  )
}

function SyncStep({ step, description, code }: { step: string; description: string; code: string }) {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h4 className="font-semibold text-sm text-slate-300 mb-1">{step}</h4>
      <p className="text-xs text-slate-500 mb-2">{description}</p>
      <code className="text-xs text-yellow-400 break-all">{code}</code>
    </div>
  )
}

function PipelineStep({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <span className="text-2xl">{icon}</span>
      <p className="font-semibold text-sm mt-1">{title}</p>
      <p className="text-xs text-slate-500">{subtitle}</p>
    </div>
  )
}

function PipelineArrow() {
  return (
    <svg className="w-6 h-6 text-slate-600 shrink-0 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function PerfCard({ metric, label, detail }: { metric: string; label: string; detail: string }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 text-center">
      <div className="text-3xl font-bold text-yellow-400">{metric}</div>
      <div className="font-semibold text-slate-200 mt-1">{label}</div>
      <div className="text-xs text-slate-500 mt-1">{detail}</div>
    </div>
  )
}

function WritePattern({ title, description, pros, cons }: { title: string; description: string; pros: string[]; cons: string[] }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h4 className="font-semibold text-slate-200 mb-1">{title}</h4>
      <p className="text-sm text-slate-400 mb-4">{description}</p>
      <div className="flex gap-4 text-xs">
        <div>
          <span className="text-emerald-400">+</span>
          {pros.map(p => <span key={p} className="text-slate-500 ml-1">{p}</span>)}
        </div>
        <div>
          <span className="text-red-400">-</span>
          {cons.map(c => <span key={c} className="text-slate-500 ml-1">{c}</span>)}
        </div>
      </div>
    </div>
  )
}

function DeployOption({ title, description, features, color }: { title: string; description: string; features: string[]; color: string }) {
  const colors: Record<string, string> = {
    yellow: "border-yellow-500/20 bg-yellow-500/5",
    blue: "border-blue-500/20 bg-blue-500/5",
    purple: "border-purple-500/20 bg-purple-500/5",
  }
  return (
    <div className={`${colors[color]} border rounded-xl p-6`}>
      <h4 className="font-semibold text-slate-200">{title}</h4>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      <ul className="text-xs text-slate-500 space-y-1">
        {features.map(f => <li key={f}>• {f}</li>)}
      </ul>
    </div>
  )
}

function EnvVar({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-slate-800 rounded-lg p-3">
      <code className="text-yellow-400 text-sm">{name}</code>
      <p className="text-xs text-slate-400 mt-1">{description}</p>
    </div>
  )
}

function TakeawayCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <h4 className="font-semibold text-slate-200 mb-2">{title}</h4>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}
