import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/lib/effect")({
  component: EffectPage,
})

function EffectPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-600">/</span>
            <span className="text-violet-400 text-sm font-mono">lib</span>
            <span className="text-slate-600">/</span>
            <h1 className="text-lg font-semibold">Effect</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-500/10 border border-violet-500/20 rounded-2xl">
            <span className="text-4xl">⚡</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            Effect
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A powerful TypeScript framework for building robust, type-safe applications
            with comprehensive effect management, concurrency, and error handling
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <a
              href="https://effect.website"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://github.com/Effect-TS/effect"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* What is Effect */}
        <section>
          <h2 className="text-2xl font-bold mb-6">What is Effect?</h2>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
            <p className="text-slate-300 mb-4">
              Effect represents computations as <strong className="text-violet-400">values</strong> that
              describe what to do, not as imperative code that does it. This enables composition,
              testing, and control that's impossible with Promises or async/await.
            </p>
            <div className="grid md:grid-cols-4 gap-4 mt-6">
              <FeatureCard
                icon="🎯"
                title="Effect Management"
                description="Structured handling of side effects with complete type safety"
              />
              <FeatureCard
                icon="⚡"
                title="Concurrency"
                description="Lightweight fiber-based concurrency (not OS threads)"
              />
              <FeatureCard
                icon="🛡️"
                title="Error Handling"
                description="Lossless, typed error capture via Causes"
              />
              <FeatureCard
                icon="💉"
                title="Dependency Injection"
                description="Type-safe service management through Contexts and Layers"
              />
            </div>
          </div>
        </section>

        {/* The Effect Type */}
        <section>
          <h2 className="text-2xl font-bold mb-6">The Effect Type</h2>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-lg mb-6">
              <span className="text-violet-400">Effect</span>
              <span className="text-slate-500">&lt;</span>
              <span className="text-green-400">A</span>
              <span className="text-slate-500">, </span>
              <span className="text-red-400">E</span>
              <span className="text-slate-500"> = never, </span>
              <span className="text-blue-400">R</span>
              <span className="text-slate-500"> = never&gt;</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <TypeCard
                letter="A"
                color="green"
                title="Success Type"
                description="The value returned when the effect succeeds"
              />
              <TypeCard
                letter="E"
                color="red"
                title="Error Type"
                description="Typed, checked errors (not exceptions)"
              />
              <TypeCard
                letter="R"
                color="blue"
                title="Requirements"
                description="Dependencies/environment needed to run"
              />
            </div>
          </div>
        </section>

        {/* Effect vs Promise */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Effect vs Promise</h2>
          <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-4 py-3 text-left">Aspect</th>
                  <th className="px-4 py-3 text-left text-violet-400">Effect</th>
                  <th className="px-4 py-3 text-left text-blue-400">Promise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <ComparisonRow
                  aspect="Execution"
                  effect="Lazy (described, not executed)"
                  promise="Eager (executes immediately)"
                />
                <ComparisonRow
                  aspect="Error Type"
                  effect="Typed (part of signature)"
                  promise="any (untyped exceptions)"
                />
                <ComparisonRow
                  aspect="Cancellation"
                  effect="First-class, resource-safe"
                  promise="Not native, requires AbortSignal"
                />
                <ComparisonRow
                  aspect="Dependencies"
                  effect="Implicit via R type"
                  promise="Must pass manually"
                />
                <ComparisonRow
                  aspect="Testing"
                  effect="Introspectable as values"
                  promise="Must execute"
                />
                <ComparisonRow
                  aspect="Composition"
                  effect="Trivial, typesafe"
                  promise="Complex, runtime errors"
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* Code Example */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Basic Example</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <CodeBlock
              title="Effect (lazy, composable, typed)"
              language="typescript"
              code={`const effect: Effect<number, never, never> =
  Effect.succeed(1).pipe(
    Effect.flatMap(n => Effect.succeed(n + 1))
  )

// Nothing executed yet!
// Run explicitly:
Effect.runPromise(effect) // => 2`}
            />
            <CodeBlock
              title="Promise (eager, less composable)"
              language="typescript"
              code={`const promise: Promise<number> =
  Promise.resolve(1)
    .then(n => Promise.resolve(n + 1))

// Already executing!
// Can't inspect or transform
// without running`}
            />
          </div>
        </section>

        {/* Error Handling */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Error Handling: Causes & Typed Errors</h2>
          <p className="text-slate-400 mb-6">
            Effect captures <strong className="text-white">all</strong> failure information in a lossless <code className="text-violet-400">Cause&lt;E&gt;</code> data type:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
              <h3 className="font-semibold text-red-400 mb-3">Cause Types</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><code className="text-red-300">Fail&lt;E&gt;</code> — Typed application error</li>
                <li><code className="text-orange-300">Die</code> — Unexpected error/defect (exceptions)</li>
                <li><code className="text-yellow-300">Interrupt</code> — Fiber interruption</li>
                <li><code className="text-blue-300">Sequential</code> — Sequential combination of causes</li>
                <li><code className="text-purple-300">Parallel</code> — Parallel combination of causes</li>
              </ul>
            </div>
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
              <h3 className="font-semibold text-green-400 mb-3">Error Handling Operators</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><code className="text-green-300">Effect.catch</code> — Handle specific typed errors</li>
                <li><code className="text-green-300">Effect.catchAll</code> — Handle all errors uniformly</li>
                <li><code className="text-green-300">Effect.catchTags</code> — Handle discriminated union errors</li>
                <li><code className="text-green-300">Effect.mapError</code> — Transform error type</li>
                <li><code className="text-green-300">Effect.either</code> — Convert to Either&lt;E, A&gt;</li>
              </ul>
            </div>
          </div>
          <CodeBlock
            title="Error Handling Pattern"
            language="typescript"
            code={`Effect.gen(function*() {
  const user = yield* getUser(id)
  return user
}).pipe(
  Effect.catchTags({
    NotFoundError: (e) => Effect.succeed(null),
    ValidationError: (e) => Effect.fail(new AppError(e.message))
  })
)`}
          />
        </section>

        {/* Dependency Injection */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Dependency Injection & Context</h2>
          <p className="text-slate-400 mb-6">
            A <code className="text-violet-400">Context</code> is a lightweight, immutable map of service implementations keyed by <code className="text-violet-400">Tag</code>s:
          </p>
          <CodeBlock
            title="Type-Safe Service Management"
            language="typescript"
            code={`// Define a service tag
const Logger = Context.Tag<Logger>()

// Service implementation
const loggerLive = Layer.succeed(Logger, {
  log: (msg: string) => Effect.sync(() => console.log(msg))
})

// Use in an effect
const program = Effect.gen(function*() {
  const logger = yield* Logger
  yield* logger.log("Hello")
})

// Provide the implementation
const runnable = program.pipe(
  Effect.provide(loggerLive)
)`}
          />
        </section>

        {/* Layers */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Layers: Service Recipes</h2>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
            <div className="bg-slate-950 rounded-lg p-4 font-mono mb-4">
              <span className="text-violet-400">Layer</span>
              <span className="text-slate-500">&lt;</span>
              <span className="text-green-400">ROut</span>
              <span className="text-slate-500">, </span>
              <span className="text-red-400">E</span>
              <span className="text-slate-500">, </span>
              <span className="text-blue-400">RIn</span>
              <span className="text-slate-500">&gt;</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-sm">
                <span className="text-green-400 font-mono">ROut</span>
                <p className="text-slate-400 mt-1">Services this layer provides</p>
              </div>
              <div className="text-sm">
                <span className="text-red-400 font-mono">E</span>
                <p className="text-slate-400 mt-1">Errors building services</p>
              </div>
              <div className="text-sm">
                <span className="text-blue-400 font-mono">RIn</span>
                <p className="text-slate-400 mt-1">Dependencies required</p>
              </div>
            </div>
          </div>
          <CodeBlock
            title="Layer Composition"
            language="typescript"
            code={`// Layer defining a database service
const Database = Context.Tag<Database>()

const databaseLive = Layer.scoped(
  Database,
  Effect.gen(function*() {
    const conn = yield* Effect.sync(() => pool.getConnection())
    yield* Effect.addFinalizer(() =>
      Effect.sync(() => conn.close())
    )
    return conn
  })
)

// Layer defining repository that needs database
const UserRepository = Context.Tag<UserRepository>()

const userRepositoryLive = Layer.effect(
  UserRepository,
  Effect.gen(function*() {
    const db = yield* Database
    return new UserRepository(db)
  })
)

// Compose layers - dependencies auto-wired!
const AppLayers = Layer.merge(databaseLive, userRepositoryLive)`}
          />
        </section>

        {/* Fiber */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Fiber: Lightweight Concurrency</h2>
          <p className="text-slate-400 mb-6">
            A <code className="text-violet-400">Fiber&lt;A, E&gt;</code> is a lightweight thread of execution that never consumes a full OS thread.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
              <h3 className="font-semibold text-violet-400 mb-3">Fiber Properties</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Suspendable and resumable</li>
                <li>• Can be interrupted safely with resource cleanup</li>
                <li>• Can be joined to wait for results</li>
                <li>• Each gets a unique FiberId for tracing</li>
              </ul>
            </div>
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
              <h3 className="font-semibold text-violet-400 mb-3">Fiber Operations</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><code className="text-green-300">Effect.fork</code> — Spawn background fiber</li>
                <li><code className="text-green-300">fiber.join</code> — Wait for result</li>
                <li><code className="text-green-300">fiber.interrupt</code> — Cancel fiber</li>
                <li><code className="text-green-300">Effect.race</code> — First to complete wins</li>
              </ul>
            </div>
          </div>
          <CodeBlock
            title="Concurrent Processing"
            language="typescript"
            code={`// Fork: spawn as background fiber
const fiber = yield* Effect.fork(longRunningTask)

// Do other work...

// Join: wait for result
const result = yield* fiber.join

// Race: first to complete wins
const first = yield* Effect.race(effect1, effect2)

// Process with limited parallelism
const results = yield* Effect.all(items.map(processItem), {
  concurrency: 4
})`}
          />
        </section>

        {/* Concurrency Primitives */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Concurrency Primitives</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <PrimitiveCard
              name="Queue<A>"
              description="Bounded/unbounded queue for producer-consumer patterns"
              example={`const queue = yield* Queue.bounded<Msg>(100)
yield* queue.offer(message)
const msg = yield* queue.take`}
            />
            <PrimitiveCard
              name="Ref<A>"
              description="Mutable reference for shared state between fibers"
              example={`const counter = yield* Ref.make(0)
yield* counter.update(n => n + 1)
const value = yield* counter.get`}
            />
            <PrimitiveCard
              name="Deferred<A, E>"
              description="Promise-like synchronization, set once"
              example={`const deferred = yield* Deferred.make<number>()
// In fiber 1:
yield* deferred.await
// In fiber 2:
yield* deferred.succeed(42)`}
            />
          </div>
        </section>

        {/* Scope */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Scope: Resource Management</h2>
          <p className="text-slate-400 mb-6">
            A <code className="text-violet-400">Scope</code> manages resource lifecycles with finalizers that run even on failure.
          </p>
          <CodeBlock
            title="Acquire-Release Pattern"
            language="typescript"
            code={`const withConnection = Effect.scoped(
  Effect.gen(function*() {
    // Acquire resource
    const conn = yield* acquireConnection()

    // Register cleanup (runs on success, failure, or interruption)
    yield* Effect.addFinalizer(() =>
      releaseConnection(conn)
    )

    // Use resource
    return yield* doWorkWith(conn)
  })
)

// Resources automatically cleaned up!
const result = yield* withConnection`}
          />
        </section>

        {/* Stream */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Stream: Pull-Based Async Data</h2>
          <p className="text-slate-400 mb-6">
            A <code className="text-violet-400">Stream&lt;A, E, R&gt;</code> is a description of an asynchronous program
            that emits zero or more values with backpressure support.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
              <h3 className="font-semibold text-cyan-400 mb-3">Stream Characteristics</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• <strong>Pull-Based:</strong> Consumer pulls data (backpressure)</li>
                <li>• <strong>Lazy:</strong> Streaming is lazy and composable</li>
                <li>• <strong>Chunked:</strong> Emits arrays for efficiency</li>
                <li>• <strong>Typed Errors:</strong> Full error handling like Effect</li>
                <li>• <strong>Resource-Safe:</strong> Automatic cleanup</li>
              </ul>
            </div>
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
              <h3 className="font-semibold text-cyan-400 mb-3">Sink: Stream Consumer</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><code className="text-green-300">Sink.fold</code> — fold/reduce</li>
                <li><code className="text-green-300">Sink.collect</code> — collect all</li>
                <li><code className="text-green-300">Sink.drain</code> — discard all</li>
                <li><code className="text-green-300">Sink.head</code> — first element</li>
                <li><code className="text-green-300">Sink.take(n)</code> — first n elements</li>
              </ul>
            </div>
          </div>
          <CodeBlock
            title="Stream Processing"
            language="typescript"
            code={`Stream.range(1, 1000).pipe(
  Stream.map(x => x * 2),
  Stream.filter(x => x % 3 === 0),
  Stream.take(100),
  Stream.grouped(10),  // group into chunks of 10
  Stream.run(Sink.collect()),
  Effect.runPromise
)`}
          />
        </section>

        {/* Schema */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Schema: Validation & Serialization</h2>
          <p className="text-slate-400 mb-6">
            <code className="text-violet-400">Schema&lt;A, I, R&gt;</code> enables type-safe data validation and transformation.
          </p>
          <CodeBlock
            title="Schema Definition & Usage"
            language="typescript"
            code={`import { Schema } from "@effect/schema"

// Define schema
const User = Schema.struct({
  id: Schema.number,
  name: Schema.string,
  email: Schema.string.pipe(
    Schema.filter(email => email.includes('@'), {
      message: () => 'Invalid email'
    })
  ),
  age: Schema.optional(Schema.number)
})

// Derive type from schema
type User = Schema.Type<typeof User>

// Parse (decode/validate)
const decoded = Schema.decode(User)(jsonData)
// Type: Effect<User, ParseError, never>

// Encode (serialize)
const encoded = Schema.encode(User)(userData)
// Type: Effect<unknown, ParseError, never>`}
          />
        </section>

        {/* Schedule */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Schedule: Retry & Repeat Policies</h2>
          <CodeBlock
            title="Retry with Exponential Backoff"
            language="typescript"
            code={`// Define a schedule
const exponentialBackoff = Schedule.exponential(
  Duration.millis(10),  // initial delay
  2.0                    // factor
).pipe(
  Schedule.either(Schedule.upTo(Duration.seconds(10)))  // max duration
)

// Retry on failure
const result = yield* Effect.retry(fetchData, exponentialBackoff)

// Common schedules
Schedule.recurs(5)              // retry 5 times
Schedule.linear(Duration.seconds(1))   // fixed delay
Schedule.fibonacci(Duration.millis(100)) // fibonacci delays
Schedule.forever                 // infinite retries`}
          />
        </section>

        {/* STM */}
        <section>
          <h2 className="text-2xl font-bold mb-6">STM: Software Transactional Memory</h2>
          <p className="text-slate-400 mb-6">
            <code className="text-violet-400">STM&lt;A, E, R&gt;</code> enables atomic, composable transactions without locks.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
              <h3 className="font-semibold text-amber-400 mb-3">STM Components</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><code className="text-amber-300">TRef&lt;A&gt;</code> — Transactional variable</li>
                <li><code className="text-amber-300">TMap&lt;K, V&gt;</code> — Transactional map</li>
                <li><code className="text-amber-300">TQueue&lt;A&gt;</code> — Transactional queue</li>
                <li><code className="text-amber-300">TSemaphore</code> — Transactional semaphore</li>
              </ul>
            </div>
            <CodeBlock
              title="Atomic Transaction"
              language="typescript"
              code={`const transfer = (from: TRef<number>,
                 to: TRef<number>,
                 amount: number) =>
  STM.gen(function*() {
    const balance = yield* from.get
    if (balance < amount) {
      yield* STM.fail("Insufficient funds")
    }
    yield* from.set(balance - amount)
    yield* to.update(n => n + amount)
  }).pipe(STM.commit)`}
            />
          </div>
        </section>

        {/* Key Modules */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Key Modules</h2>
          <div className="grid md:grid-cols-4 gap-3 text-sm">
            <ModuleCard name="Effect" purpose="Core computation and composition" />
            <ModuleCard name="Context" purpose="Type-safe dependency tagging" />
            <ModuleCard name="Layer" purpose="Service composition and lifecycle" />
            <ModuleCard name="Fiber" purpose="Lightweight concurrency primitives" />
            <ModuleCard name="Stream" purpose="Pull-based data streaming" />
            <ModuleCard name="Sink" purpose="Stream consumption and reduction" />
            <ModuleCard name="Queue" purpose="Message passing and buffering" />
            <ModuleCard name="Ref" purpose="Mutable shared state" />
            <ModuleCard name="Deferred" purpose="One-time async completion" />
            <ModuleCard name="Scope" purpose="Resource lifecycle management" />
            <ModuleCard name="Cause" purpose="Comprehensive error information" />
            <ModuleCard name="Schema" purpose="Data validation and serialization" />
            <ModuleCard name="Schedule" purpose="Retry and repeat policies" />
            <ModuleCard name="STM" purpose="Transactional memory (lock-free)" />
            <ModuleCard name="Pool" purpose="Resource pooling and reuse" />
            <ModuleCard name="Request" purpose="Batching and deduplication" />
          </div>
        </section>

        {/* Full Example */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Complete Example: Real-World Pattern</h2>
          <CodeBlock
            title="Production-Ready Service"
            language="typescript"
            code={`// Define services
const Database = Context.Tag<Database>()
const Logger = Context.Tag<Logger>()
const UserRepo = Context.Tag<UserRepo>()

// Define errors
class UserNotFound extends Data.TaggedError("UserNotFound")<{
  id: string
}> {}

class ValidationError extends Data.TaggedError("ValidationError")<{
  message: string
}> {}

// Business logic with typed errors and dependencies
const getUser = (id: string) =>
  Effect.gen(function*() {
    const repo = yield* UserRepo
    const logger = yield* Logger

    yield* logger.info(\`Fetching user \${id}\`)

    const user = yield* repo.findById(id).pipe(
      Effect.flatMap(Option.match({
        onNone: () => Effect.fail(new UserNotFound({ id })),
        onSome: Effect.succeed
      }))
    )

    return user
  })

// Compose layers
const AppLayer = Layer.merge(
  Layer.succeed(Logger, ConsoleLogger),
  Layer.effect(UserRepo, Effect.gen(function*() {
    const db = yield* Database
    return new PgUserRepo(db)
  }))
).pipe(
  Layer.provide(Layer.scoped(Database, acquireDbPool))
)

// Run with all dependencies
const main = getUser("123").pipe(
  Effect.provide(AppLayer),
  Effect.catchTags({
    UserNotFound: (e) => Effect.succeed(null),
    ValidationError: (e) => Effect.die(e)
  }),
  Effect.runPromise
)`}
          />
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30 rounded-xl p-6 border border-violet-800/50">
          <h2 className="text-2xl font-bold mb-4">Core Strengths</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Type Safety:</strong> Full compilation-time error checking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Composability:</strong> Effects naturally compose through monadic operations</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Resource Safety:</strong> Automatic, exception-safe cleanup</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Observability:</strong> Effects are values—inspect before running</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Concurrency:</strong> Fibers without OS thread overhead</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Error Information:</strong> No lost context; complete cause chains</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Testing:</strong> Effects can be inspected without execution</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span className="text-slate-300"><strong>Performance:</strong> Chunked streaming, efficient batching</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  )
}

function TypeCard({ letter, color, title, description }: { letter: string; color: "green" | "red" | "blue"; title: string; description: string }) {
  const colorClasses = {
    green: "text-green-400 bg-green-500/10 border-green-500/30",
    red: "text-red-400 bg-red-500/10 border-red-500/30",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/30",
  }
  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <div className={`text-2xl font-mono font-bold mb-2 ${colorClasses[color].split(' ')[0]}`}>{letter}</div>
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  )
}

function ComparisonRow({ aspect, effect, promise }: { aspect: string; effect: string; promise: string }) {
  return (
    <tr>
      <td className="px-4 py-3 text-slate-300">{aspect}</td>
      <td className="px-4 py-3 text-slate-400">{effect}</td>
      <td className="px-4 py-3 text-slate-400">{promise}</td>
    </tr>
  )
}

function CodeBlock({ title, language, code }: { title: string; language: string; code: string }) {
  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 text-sm text-slate-400">
        {title}
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className="text-slate-300">{code}</code>
      </pre>
    </div>
  )
}

function PrimitiveCard({ name, description, example }: { name: string; description: string; example: string }) {
  return (
    <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
      <h3 className="font-mono text-violet-400 font-semibold mb-2">{name}</h3>
      <p className="text-sm text-slate-400 mb-3">{description}</p>
      <pre className="bg-slate-950 rounded-lg p-3 text-xs overflow-x-auto">
        <code className="text-slate-300">{example}</code>
      </pre>
    </div>
  )
}

function ModuleCard({ name, purpose }: { name: string; purpose: string }) {
  return (
    <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
      <div className="font-mono text-violet-400 font-semibold">{name}</div>
      <div className="text-xs text-slate-500 mt-1">{purpose}</div>
    </div>
  )
}
