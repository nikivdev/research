import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/earendil-works/absurd")({
  component: AbsurdPage,
})

function AbsurdPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-violet-600 dark:text-violet-400 text-sm font-mono">repos/earendil-works</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">absurd</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-500/10 border border-violet-500/20 rounded-2xl">
            <span className="text-4xl">🐘</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Absurd
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            PostgreSQL-native durable execution workflows
          </p>
          <p className="text-slate-600 dark:text-slate-500 max-w-3xl mx-auto">
            It's entirely based on Postgres and nothing else... because it's absurd how much you can over-design such a simple thing.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">PostgreSQL</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">TypeScript</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Python</span>
          </div>
        </section>

        {/* Why Absurd */}
        <section className="space-y-8">
          <SectionHeader icon="💡" title="Why Absurd?" subtitle="Push complexity to the database" />

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="One Dependency"
              description="Only PostgreSQL. No Redis, no Kafka, no external coordinator. Deploy with your existing database."
              color="violet"
            />
            <FeatureCard
              title="Crash Resilient"
              description="Every step checkpointed. Workers can die and restart without losing progress or duplicating work."
              color="purple"
            />
            <FeatureCard
              title="Language Agnostic"
              description="TypeScript and Python SDKs. Any language with a Postgres driver can implement a worker."
              color="fuchsia"
            />
          </div>
        </section>

        {/* Core Concepts */}
        <section className="space-y-8">
          <SectionHeader icon="🧠" title="Core Concepts" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Tasks & Steps</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong>Task</strong> - Logical unit of work (survives retries)</li>
                  <li><strong>Run</strong> - Single execution attempt of a task</li>
                  <li><strong>Step</strong> - Checkpointed operation within a task</li>
                  <li><strong>Checkpoint</strong> - Cached step result (never re-executed)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Events & Suspension</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><strong>sleepFor/sleepUntil</strong> - Suspend until time passes</li>
                  <li><strong>awaitEvent</strong> - Suspend until named event fires</li>
                  <li><strong>emitEvent</strong> - Wake sleeping tasks atomically</li>
                  <li><strong>Queue</strong> - Isolated namespace for tasks</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Execution Flow</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <FlowBox text="Task Spawned" status="pending" />
              <FlowArrow />
              <FlowBox text="Worker Claims" status="claimed" />
              <FlowArrow />
              <FlowBox text="Steps Execute" status="running" />
              <FlowArrow />
              <FlowBox text="Complete/Retry" status="done" />
            </div>
          </div>
        </section>

        {/* Database Schema */}
        <section className="space-y-8">
          <SectionHeader icon="🗄️" title="Database Schema" subtitle="Per-queue table structure" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Tables per Queue</h3>
            <div className="grid md:grid-cols-5 gap-4">
              <TableCard name="t_{queue}" desc="Tasks" fields={["id", "state", "params", "result"]} />
              <TableCard name="r_{queue}" desc="Runs" fields={["task_id", "worker_id", "claim_expires_at"]} />
              <TableCard name="c_{queue}" desc="Checkpoints" fields={["task_id", "step_name", "value"]} />
              <TableCard name="e_{queue}" desc="Events" fields={["name", "payload", "emitted_at"]} />
              <TableCard name="w_{queue}" desc="Wait Regs" fields={["task_id", "event_name", "timeout_at"]} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Key Stored Procedures</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <ProcRow name="spawn_task" desc="Create task + initial run" />
              <ProcRow name="claim_task" desc="Reserve tasks with lease" />
              <ProcRow name="complete_run" desc="Mark successful completion" />
              <ProcRow name="fail_run" desc="Handle failure + schedule retry" />
              <ProcRow name="set_task_checkpoint_state" desc="Persist step result" />
              <ProcRow name="get_task_checkpoint_states" desc="Retrieve cached results" />
              <ProcRow name="await_event" desc="Register event wait" />
              <ProcRow name="emit_event" desc="Wake sleeping tasks" />
              <ProcRow name="extend_claim" desc="Heartbeat to keep lease" />
              <ProcRow name="cancel_task" desc="Graceful cancellation" />
            </div>
          </div>
        </section>

        {/* TypeScript SDK */}
        <section className="space-y-8">
          <SectionHeader icon="📦" title="TypeScript SDK" subtitle="Define and run durable tasks" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Basic Task Definition</h3>
            <CodeBlock code={`import { Absurd } from 'absurd-sdk'

const app = new Absurd()

app.registerTask({ name: 'order-fulfillment' }, async (params, ctx) => {
  // Checkpointed step - won't re-execute on retry
  const payment = await ctx.step('process-payment', async () => {
    return await stripe.charges.create({ amount: params.amount })
  })

  // Task suspends until event fires
  const shipment = await ctx.awaitEvent(\`shipment.packed:\${params.orderId}\`)

  // Another checkpointed step
  await ctx.step('send-notification', async () => {
    return await sendEmail(params.email, shipment)
  })

  return { payment, shipment }
})`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Spawning & Running</h3>
            <CodeBlock code={`// Spawn a new task
const taskId = await app.spawn('order-fulfillment', {
  orderId: '42',
  amount: 9999,
  email: 'customer@example.com'
})

// Start worker (claims and executes tasks)
await app.startWorker({
  concurrency: 4,      // Parallel task execution
  claimTimeout: 120,   // Lease duration in seconds
  pollInterval: 1000   // How often to poll for tasks
})`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Event Emission</h3>
            <CodeBlock code={`// In webhook handler after warehouse packs order
app.emitEvent(\`shipment.packed:\${orderId}\`, {
  trackingNumber: 'TRACK123',
  carrier: 'USPS'
})

// The task waiting on this event will resume automatically
// Event payload is delivered to ctx.awaitEvent() caller`} />
          </div>
        </section>

        {/* TaskContext API */}
        <section className="space-y-8">
          <SectionHeader icon="🔧" title="TaskContext API" subtitle="Available within task handlers" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Methods</h3>
                <div className="space-y-3">
                  <MethodCard
                    name="ctx.step(name, fn)"
                    desc="Execute checkpointed step. Cached on retry."
                  />
                  <MethodCard
                    name="ctx.sleepFor(name, seconds)"
                    desc="Suspend task for duration."
                  />
                  <MethodCard
                    name="ctx.sleepUntil(name, date)"
                    desc="Suspend until specific time."
                  />
                  <MethodCard
                    name="ctx.awaitEvent(name, timeout?)"
                    desc="Suspend until event fires."
                  />
                  <MethodCard
                    name="ctx.heartbeat()"
                    desc="Extend lease for long operations."
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Properties</h3>
                <div className="space-y-3">
                  <MethodCard
                    name="ctx.taskId"
                    desc="Current task's unique ID."
                  />
                  <MethodCard
                    name="ctx.runId"
                    desc="Current run attempt ID."
                  />
                  <MethodCard
                    name="ctx.idempotencyKey(suffix)"
                    desc="Derive key for external calls."
                  />
                </div>

                <h3 className="font-semibold text-lg mt-6 mb-4">Step Name Handling</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Duplicate step names auto-increment: <code className="text-violet-600 dark:text-violet-400">step</code> → <code className="text-violet-600 dark:text-violet-400">step#2</code> → <code className="text-violet-600 dark:text-violet-400">step#3</code>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sleep & Events */}
        <section className="space-y-8">
          <SectionHeader icon="⏰" title="Sleep & Events" subtitle="Task suspension patterns" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Sleep Example</h3>
            <CodeBlock code={`app.registerTask({ name: 'delayed-followup' }, async (params, ctx) => {
  // Do initial work
  const result = await ctx.step('send-welcome', async () => {
    return await sendWelcomeEmail(params.email)
  })

  // Task suspends for 24 hours (no worker resources used)
  await ctx.sleepFor('wait-24h', 60 * 60 * 24)

  // Automatically resumes after sleep
  await ctx.step('send-followup', async () => {
    return await sendFollowupEmail(params.email)
  })
})`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Event with Timeout</h3>
            <CodeBlock code={`app.registerTask({ name: 'payment-confirmation' }, async (params, ctx) => {
  // Wait up to 1 hour for payment webhook
  const payment = await ctx.awaitEvent(
    \`payment.confirmed:\${params.invoiceId}\`,
    60 * 60 // timeout in seconds
  )

  if (payment === null) {
    // Timeout expired - no event received
    await ctx.step('cancel-order', async () => {
      return await cancelOrder(params.orderId)
    })
    return { status: 'cancelled' }
  }

  // Event received with payload
  await ctx.step('fulfill-order', async () => {
    return await fulfillOrder(params.orderId, payment)
  })
  return { status: 'fulfilled', payment }
})`} />
          </div>
        </section>

        {/* Retry & Cancellation */}
        <section className="space-y-8">
          <SectionHeader icon="🔄" title="Retry & Cancellation" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Retry Strategies</h3>
              <CodeBlock code={`app.registerTask({
  name: 'flaky-api-call',
  retry: {
    strategy: 'exponential', // or 'fixed', 'none'
    maxAttempts: 5,
    initialDelay: 1000,      // ms
    maxDelay: 60000          // ms
  }
}, async (params, ctx) => {
  // Task will retry on failure with backoff
  return await unreliableApiCall(params)
})`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Cancellation Policy</h3>
              <CodeBlock code={`app.registerTask({
  name: 'time-sensitive',
  cancellation: {
    maxDelay: 300,      // Cancel if pending > 5 min
    maxDuration: 3600   // Cancel if running > 1 hour
  }
}, async (params, ctx) => {
  // Task auto-cancelled if exceeds limits
  // Checked at claim time
})`} />
            </div>
          </div>
        </section>

        {/* Agent Loop Example */}
        <section className="space-y-8">
          <SectionHeader icon="🤖" title="AI Agent Example" subtitle="Durable agent loops with tool calls" />

          <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-violet-700 dark:text-violet-400 mb-2">Perfect for AI Agents</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Each reasoning step checkpointed. Tool call results cached. Long conversations survive crashes.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Agent Loop Pattern</h3>
            <CodeBlock code={`import { generateText, tool } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'

app.registerTask({ name: 'ai-agent' }, async (params, ctx) => {
  const messages = [{ role: 'user', content: params.prompt }]
  let stepCount = 0

  while (true) {
    // Each LLM call is checkpointed
    const response = await ctx.step(\`llm-call-\${stepCount++}\`, async () => {
      return await generateText({
        model: anthropic('claude-sonnet-4-20250514'),
        messages,
        tools: {
          search: tool({
            description: 'Search the web',
            parameters: z.object({ query: z.string() }),
            execute: async ({ query }) => searchWeb(query)
          }),
          calculate: tool({
            description: 'Do math',
            parameters: z.object({ expression: z.string() }),
            execute: async ({ expression }) => eval(expression)
          })
        }
      })
    })

    messages.push({ role: 'assistant', content: response.text })

    // If no tool calls, agent is done
    if (!response.toolCalls?.length) {
      return { result: response.text, steps: stepCount }
    }

    // Tool results also checkpointed
    for (const call of response.toolCalls) {
      messages.push({
        role: 'tool',
        content: JSON.stringify(call.result),
        toolCallId: call.id
      })
    }
  }
})`} />
          </div>
        </section>

        {/* Python SDK */}
        <section className="space-y-8">
          <SectionHeader icon="🐍" title="Python SDK" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`from absurd_sdk import Absurd

app = Absurd("postgresql://localhost/absurd")

@app.register_task(name="order-fulfillment")
def process_order(params, ctx):
    # Checkpointed step
    payment = ctx.step("process-payment", lambda: stripe_charge(params["amount"]))

    # Wait for external event
    shipment = ctx.await_event(f"shipment.packed:{params['order_id']}")

    # Another step
    ctx.step("send-notification", lambda: send_email(params["email"], shipment))

    return {"payment": payment, "shipment": shipment}

# Emit event from external system
app.emit_event(f"shipment.packed:{order_id}", {"tracking": "TRACK123"})

# Start worker
app.start_worker()`} />
          </div>
        </section>

        {/* CLI & Operations */}
        <section className="space-y-8">
          <SectionHeader icon="🖥️" title="CLI & Operations" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">absurdctl Commands</h3>
            <CodeBlock code={`# Initialize schema in database
./absurdctl init -d mydb

# Create a queue
./absurdctl create-queue -d mydb default

# List queues
./absurdctl list-queues -d mydb

# Cleanup old runs (keep last 7 days)
./absurdctl cleanup default 7

# Drop a queue
./absurdctl drop-queue -d mydb default

# Generate agent-friendly help
./absurdctl agent-help >> AGENTS.md`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Habitat UI</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Web dashboard for monitoring tasks, built with Go + SolidJS.
            </p>
            <CodeBlock code={`# Start Habitat UI
./bin/habitat run -db-name mydb

# Opens http://localhost:7890
# View tasks, runs, checkpoints, events`} />
          </div>
        </section>

        {/* Architecture */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Architecture" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Project Structure</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Core</h4>
                <div className="space-y-1 text-sm">
                  <FileRow path="sql/absurd.sql" desc="1,337 lines - Schema & procedures" />
                  <FileRow path="absurdctl" desc="CLI tool (Python)" />
                  <FileRow path="tests/" desc="Core system tests" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">SDKs & UI</h4>
                <div className="space-y-1 text-sm">
                  <FileRow path="sdks/typescript/" desc="954 lines - Main SDK" />
                  <FileRow path="sdks/python/" desc="1,272 lines - Alternative" />
                  <FileRow path="habitat/" desc="Go + SolidJS dashboard" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Pull-Based Worker Model</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-sm text-violet-600 dark:text-violet-400">No Coordinator</h4>
                <p className="text-xs text-slate-500 mt-1">Workers poll claim_task independently. No central process needed.</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-sm text-violet-600 dark:text-violet-400">Lease-Based Claims</h4>
                <p className="text-xs text-slate-500 mt-1">Tasks locked with expiry. Crashed workers auto-release.</p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-sm text-violet-600 dark:text-violet-400">Natural Load Control</h4>
                <p className="text-xs text-slate-500 mt-1">Workers claim only what they can process. Self-regulating.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Details */}
        <section className="space-y-8">
          <SectionHeader icon="🔬" title="Notable Implementation Details" />

          <div className="grid md:grid-cols-2 gap-6">
            <DetailCard
              title="UUIDv7 Generation"
              description="Tasks and runs use UUIDv7 for time-ordered IDs. Custom portable_uuidv7() for Postgres <18."
            />
            <DetailCard
              title="Dynamic SQL"
              description="Queue tables created via format() + execute. No static schema per queue."
            />
            <DetailCard
              title="Fake Time for Testing"
              description="Session variable absurd.fake_now enables deterministic time control in tests."
            />
            <DetailCard
              title="Implicit Heartbeats"
              description="Every checkpoint write extends the claim lease. No separate heartbeat needed."
            />
            <DetailCard
              title="Claim-Time Cancellation"
              description="Cancellation policy checked in claim_task. No separate cancellation loop."
            />
            <DetailCard
              title="Race-Free Events"
              description="Events emitted + tasks woken atomically. Payload stored in run record."
            />
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💎" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Complexity in DB, simplicity in SDK"
              description="SQL handles all distributed coordination. SDKs are thin wrappers (~950 lines). Language-agnostic by design."
            />
            <TakeawayCard
              title="Checkpoints as idempotency"
              description="Different from retry-only systems. Each step cached independently. Code outside steps can be non-deterministic."
            />
            <TakeawayCard
              title="No external dependencies"
              description="Only Postgres + language runtime. Deploy with your app or existing database. Self-hostable, no SaaS."
            />
            <TakeawayCard
              title="AI-friendly design"
              description="Perfect for agent loops. Persists reasoning traces naturally. Tool call results cached automatically."
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

function FeatureCard({ title, description, color }: { title: string; description: string; color: string }) {
  const colors: Record<string, string> = {
    violet: "bg-violet-500/10 border-violet-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
    fuchsia: "bg-fuchsia-500/10 border-fuchsia-500/20",
  }
  return (
    <div className={`${colors[color]} border rounded-2xl p-6`}>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto text-sm">
      <code className="text-slate-700 dark:text-slate-300">{code}</code>
    </pre>
  )
}

function FlowBox({ text, status }: { text: string; status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400",
    claimed: "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400",
    running: "bg-violet-500/10 border-violet-500/20 text-violet-700 dark:text-violet-400",
    done: "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
  }
  return (
    <div className={`${colors[status]} border rounded-lg px-4 py-2 text-sm font-medium text-center`}>
      {text}
    </div>
  )
}

function FlowArrow() {
  return (
    <svg className="w-6 h-6 text-slate-400 dark:text-slate-600 shrink-0 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function TableCard({ name, desc, fields }: { name: string; desc: string; fields: string[] }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
      <code className="text-violet-600 dark:text-violet-400 text-sm font-semibold">{name}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
      <div className="mt-2 space-y-0.5">
        {fields.map((f) => (
          <div key={f} className="text-xs text-slate-600 dark:text-slate-400">• {f}</div>
        ))}
      </div>
    </div>
  )
}

function ProcRow({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="flex justify-between items-center bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-2">
      <code className="text-violet-600 dark:text-violet-400 text-xs">{name}</code>
      <span className="text-slate-500 text-xs">{desc}</span>
    </div>
  )
}

function MethodCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3">
      <code className="text-violet-600 dark:text-violet-400 text-sm">{name}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  )
}

function FileRow({ path, desc }: { path: string; desc: string }) {
  return (
    <div className="flex justify-between">
      <code className="text-violet-600 dark:text-violet-400 text-xs">{path}</code>
      <span className="text-slate-500 text-xs">{desc}</span>
    </div>
  )
}

function DetailCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
      <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">{title}</h4>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </div>
  )
}

function TakeawayCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}
