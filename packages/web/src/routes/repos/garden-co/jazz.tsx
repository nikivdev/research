import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/garden-co/jazz")({
  component: JazzPage,
})

function JazzPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-blue-600 dark:text-blue-400 text-sm font-mono">repos/garden-co</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">jazz</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
            <span className="text-4xl">🎷</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Jazz
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Distributed sync-first database for local-first apps
          </p>
          <p className="text-slate-600 dark:text-slate-500 max-w-3xl mx-auto">
            Reactive local JSON state that syncs instantly. Built-in collaboration, encryption,
            offline support, and permissions. Works across browsers, servers, and serverless.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">TypeScript</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">React</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Local-First</span>
          </div>
        </section>

        {/* Core Philosophy */}
        <section className="space-y-8">
          <SectionHeader icon="💡" title="Core Philosophy" />

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Local-First"
              description="Data feels like local state. Changes apply instantly, sync in background. Full offline support."
              color="blue"
            />
            <FeatureCard
              title="Collaboration Built-In"
              description="Real-time multiplayer, edit history, and fine-grained permissions from day one."
              color="indigo"
            />
            <FeatureCard
              title="Privacy by Default"
              description="End-to-end encryption, secure key distribution. Only authorized users can decrypt."
              color="purple"
            />
          </div>
        </section>

        {/* Architecture */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Architecture" subtitle="Layered design for flexibility" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="space-y-4">
              <ArchLayer
                name="jazz-tools"
                desc="High-level API with Zod schemas, React hooks, auth providers"
                color="blue"
              />
              <ArchLayer
                name="cojson"
                desc="Core collaborative JSON engine - LocalNode, SyncManager, Permissions"
                color="indigo"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <ArchLayer
                  name="Storage Adapters"
                  desc="IndexedDB, SQLite, Durable Objects"
                  color="purple"
                  small
                />
                <ArchLayer
                  name="Transport Adapters"
                  desc="WebSocket, custom channels"
                  color="purple"
                  small
                />
              </div>
            </div>
          </div>
        </section>

        {/* CoValue Types */}
        <section className="space-y-8">
          <SectionHeader icon="📦" title="CoValue Types" subtitle="Collaborative data structures" />

          <div className="grid md:grid-cols-2 gap-6">
            <CoValueCard
              name="CoMap"
              desc="Collaborative object/record. Like a typed JSON object that syncs."
              example={`class Person extends CoMap {
  name = coField.string
  age = coField.number
  avatar = coField.ref(Image)
}`}
            />
            <CoValueCard
              name="CoList"
              desc="Collaborative array. Ordered collection with CRDT semantics."
              example={`class TodoList extends CoList.Of(coField.ref(Task)) {}

const list = TodoList.create([task1, task2])
list.$jazz.push(newTask)
list.$jazz.remove(t => t.done)`}
            />
            <CoValueCard
              name="CoPlainText"
              desc="CRDT text field for collaborative editing without conflicts."
              example={`class Note extends CoMap {
  title = coField.string
  body = co.plainText()  // Collaborative text
}`}
            />
            <CoValueCard
              name="CoRichText"
              desc="Rich text with formatting. Integrates with ProseMirror."
              example={`class Document extends CoMap {
  content = co.richText()
}

// Use with prose editor
const editor = useJazzProseEditor(doc.content)`}
            />
            <CoValueCard
              name="Group"
              desc="Access control container. Members have roles (admin, writer, reader)."
              example={`const group = Group.create()
group.addMember(user, "writer")
group.makePublic("reader")

const project = Project.create(data, { owner: group })`}
            />
            <CoValueCard
              name="Account"
              desc="User identity with profile and app-specific root data."
              example={`class MyAccount extends Account {
  profile = co.profile()  // name, avatar
  root = co.map({
    projects: co.list(Project)
  })
}`}
            />
            <CoValueCard
              name="FileStream"
              desc="Efficient streaming file uploads/downloads."
              example={`class Post extends CoMap {
  image = co.file()
}

post.image = await FileStream.create(
  () => fetch(url).then(r => r.blob()),
  { owner: group }
)`}
            />
            <CoValueCard
              name="CoFeed / CoStream"
              desc="Append-only event logs for activity feeds, chat, etc."
              example={`class ChatMessages extends CoStream.Of({
  text: coField.string,
  timestamp: coField.encoded(Encoders.Date),
}) {}

chat.$jazz.push({ text: "Hello", timestamp: new Date() })`}
            />
          </div>
        </section>

        {/* Schema Definition */}
        <section className="space-y-8">
          <SectionHeader icon="📝" title="Schema Definition" subtitle="Type-safe with Zod integration" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Defining Schemas</h3>
            <CodeBlock code={`import { co, z, coField } from "jazz-tools"

// Task schema
export const Task = co.map({
  done: z.boolean(),
  text: co.plainText(),
  priority: z.literal("low", "medium", "high"),
  dueDate: coField.optional.Date,
  assignee: coField.optional.ref(Account),
})

// Project schema with nested tasks
export const Project = co.map({
  title: z.string(),
  tasks: co.list(Task),
  owner: coField.ref(Account),
})

// Account schema with migrations
export const MyAccount = co
  .account({
    profile: co.profile(),
    root: co.map({
      projects: co.list(Project),
    }),
  })
  .withMigration(async (account) => {
    // Initialize on first login
    if (!account.$jazz.has("root")) {
      account.$jazz.set("root", { projects: [] })
    }
  })

// Type inference
type Project = co.loaded<typeof Project>`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Resolved Queries (Deep Loading)</h3>
            <CodeBlock code={`// Define what to load upfront
export const ProjectWithTasks = Project.resolved({
  tasks: {
    $each: {        // Load each task in the list
      text: true,   // Load text field
      assignee: {   // Load assignee reference
        profile: true
      }
    },
  },
  owner: {
    profile: true
  }
})

// Type knows everything is loaded
type ProjectWithTasks = co.loaded<typeof ProjectWithTasks>
// project.tasks[0].assignee.profile.name is string, not undefined`} />
          </div>
        </section>

        {/* Data Loading */}
        <section className="space-y-8">
          <SectionHeader icon="📥" title="Data Loading" subtitle="Reactive subscriptions and queries" />

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Primary Pattern: useCoState</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Subscribe to CoValues reactively. Components re-render when data changes locally or from sync.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">useCoState - Reactive Hook</h3>
            <CodeBlock code={`import { useCoState } from "jazz-tools/react"

function ProjectView({ projectId }: { projectId: string }) {
  // Subscribe and load with resolve query
  const project = useCoState(ProjectWithTasks, projectId)

  // Loading state
  if (project.$isLoaded === false) {
    return <div>Loading...</div>
  }

  // Error state
  if (project.$isLoaded === "error") {
    return <div>Error loading project</div>
  }

  // Data is loaded - TypeScript knows all fields exist
  return (
    <div>
      <h1>{project.title}</h1>
      <p>Owner: {project.owner.profile.name}</p>
      {project.tasks.map((task) => (
        <TaskRow key={task.$jazz.id} task={task} />
      ))}
    </div>
  )
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">useAccount - Current User</h3>
            <CodeBlock code={`import { useAccount } from "jazz-tools/react"

function Dashboard() {
  const me = useAccount(MyAccount.resolved({
    root: {
      projects: { $each: {} }
    }
  }))

  if (me.$isLoaded === false) return <Loading />

  return (
    <div>
      <h1>Welcome, {me.profile?.name}</h1>
      <h2>Your Projects</h2>
      {me.root.projects.map((project) => (
        <ProjectCard key={project.$jazz.id} project={project} />
      ))}
    </div>
  )
}`} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">subscribeToCoValue</h3>
              <CodeBlock code={`import { subscribeToCoValue } from "jazz-tools"

const unsubscribe = subscribeToCoValue(
  ProjectWithTasks,
  projectId,
  { resolve: ProjectWithTasks.resolveQuery },
  (project) => {
    console.log("Updated:", project.title)
  }
)

// Cleanup
unsubscribe()`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">loadCoValue (One-time)</h3>
              <CodeBlock code={`import { loadCoValue } from "jazz-tools"

const project = await loadCoValue(
  ProjectWithTasks,
  projectId,
  localNode,
  { resolve: ProjectWithTasks.resolveQuery }
)

// Use in server functions, scripts, etc.`} />
            </div>
          </div>
        </section>

        {/* CRUD Operations */}
        <section className="space-y-8">
          <SectionHeader icon="✏️" title="CRUD Operations" subtitle="Create, Read, Update, Delete" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Create</h3>
            <CodeBlock code={`import { Group } from "jazz-tools"

// Create with access control group
const group = Group.create()
group.addMember(collaborator, "writer")

const project = Project.create(
  {
    title: "New Project",
    tasks: [],
    owner: me,
  },
  { owner: group }  // Access controlled by group
)

// ID is auto-generated
console.log(project.$jazz.id)  // "co_z..."

// Add to account
me.root.projects.$jazz.push(project)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Update</h3>
            <CodeBlock code={`// Direct assignment (primitives)
project.title = "Updated Title"  // Syncs instantly

// Via $jazz.set (all fields)
project.$jazz.set("title", "New Title")

// List operations
project.tasks.$jazz.push(newTask)
project.tasks.$jazz.set(0, updatedTask)
project.tasks.$jazz.remove((t) => t.$jazz.id === taskId)

// Text operations (CoPlainText)
task.text.$jazz.insert(0, "Prepended: ")
task.text.$jazz.delete(0, 5)
task.text.$jazz.splice(startIndex, deleteCount, ...insertItems)

// Optional fields
project.$jazz.set("dueDate", new Date())
project.$jazz.set("dueDate", null)  // Clear`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Delete</h3>
            <CodeBlock code={`// Remove from list
project.tasks.$jazz.remove((task) => task.$jazz.id === taskId)

// Remove by index
project.tasks.$jazz.splice(index, 1)

// Clear all
project.tasks.$jazz.splice(0, project.tasks.length)

// Remove project from account
me.root.projects.$jazz.remove((p) => p.$jazz.id === projectId)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Edit History</h3>
            <CodeBlock code={`// Get all edits for a field
const edits = project.$jazz.edits.title
// Array of: { value, by: Account | null, madeAt: Date }

// Latest edit
const lastEdit = edits[edits.length - 1]
console.log(\`Changed by \${lastEdit.by?.profile?.name} at \${lastEdit.madeAt}\`)

// Full history with refs
const allEdits = project.$jazz.allEdits.title`} />
          </div>
        </section>

        {/* React Integration */}
        <section className="space-y-8">
          <SectionHeader icon="⚛️" title="React Integration" subtitle="Provider setup and hooks" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Provider Setup</h3>
            <CodeBlock code={`import { JazzReactProvider, PassphraseAuthBasicUI } from "jazz-tools/react"
import { wordlist } from "@scure/bip39/wordlists/english"

function App() {
  return (
    <JazzReactProvider
      sync={{
        peer: "wss://cloud.jazz.tools/?key=YOUR_API_KEY",
      }}
      AccountSchema={MyAccount}
    >
      <PassphraseAuthBasicUI appName="My App" wordlist={wordlist}>
        <YourApp />
      </PassphraseAuthBasicUI>
    </JazzReactProvider>
  )
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Available Hooks</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <HookCard
                name="useCoState(Schema, id)"
                desc="Subscribe to and load a CoValue by ID"
              />
              <HookCard
                name="useAccount(Schema)"
                desc="Access current authenticated user"
              />
              <HookCard
                name="useLogOut()"
                desc="Returns logout function"
              />
              <HookCard
                name="useIsAuthenticated()"
                desc="Check if user is logged in"
              />
              <HookCard
                name="useAcceptInvite(options)"
                desc="Handle invite links automatically"
              />
              <HookCard
                name="useJazzContext()"
                desc="Access raw LocalNode, SyncManager"
              />
            </div>
          </div>
        </section>

        {/* Permissions */}
        <section className="space-y-8">
          <SectionHeader icon="🔐" title="Permissions & Groups" subtitle="Fine-grained access control" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Role Hierarchy</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <RoleCard role="admin" desc="Full control + manage members" />
              <RoleCard role="manager" desc="Manage non-admin members" />
              <RoleCard role="writer" desc="Read and write" />
              <RoleCard role="reader" desc="Read only" />
              <RoleCard role="writeOnly" desc="Write, can't read others" />
            </div>
            <CodeBlock code={`const group = Group.create()

// Add members
group.addMember(alice, "admin")
group.addMember(bob, "writer")
group.addMember(charlie, "reader")

// Check permissions
group.myRole()           // "admin" | "writer" | ...
group.canWrite(bob)      // true

// Change role
group.$jazz.set(bob.id, "admin")

// Revoke access
group.$jazz.set(charlie.id, "revoked")

// Public access
group.makePublic("reader")   // Anyone can read
group.makePublic("writer")   // Anyone can write`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Invite System</h3>
            <CodeBlock code={`import { createInviteLink, useAcceptInvite } from "jazz-tools"

// Create invite link
const inviteSecret = group.createInvite("writer")
const link = createInviteLink({
  inviteSecret,
  valueId: project.$jazz.id,
})
// => "https://myapp.com/#/accept/INVITE_SECRET/co_..."

// Accept invite in app
useAcceptInvite({
  invitedObjectSchema: Project,
  forValueHint: "project",
  onAccept: (projectId) => {
    router.navigate(\`/project/\${projectId}\`)
  },
})`} />
          </div>
        </section>

        {/* Authentication */}
        <section className="space-y-8">
          <SectionHeader icon="🔑" title="Authentication" subtitle="Multiple auth providers" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">PassphraseAuth</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                12-word mnemonic for account recovery. No server-side storage needed.
              </p>
              <CodeBlock code={`import { PassphraseAuth } from "jazz-tools"

const auth = new PassphraseAuth(...)

// Register - returns passphrase
const passphrase = await auth.registerNewAccount("John")
// "word1 word2 ... word12"

// Login with passphrase
await auth.logIn("word1 word2 ... word12")`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">DemoAuth</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Temporary accounts for testing. No persistence.
              </p>
              <CodeBlock code={`import { DemoAuth } from "jazz-tools"

// Auto-creates temporary account
const auth = new DemoAuth()`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Clerk Integration</h3>
              <CodeBlock code={`import { BrowserClerkAuth } from "jazz-tools"

const auth = new BrowserClerkAuth(clerkClient)`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">BetterAuth Integration</h3>
              <CodeBlock code={`import { JazzBetterAuthServerAdapter } from "jazz-tools/better-auth"

const auth = new JazzBetterAuthServerAdapter()`} />
            </div>
          </div>
        </section>

        {/* Sync Protocol */}
        <section className="space-y-8">
          <SectionHeader icon="🔄" title="Sync Protocol" subtitle="How real-time sync works" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Message Types</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <MessageCard
                name="LoadMessage"
                desc="Request data for a CoValue"
                fields={["action: 'load'", "id: coValueId", "sessionID: txCount"]}
              />
              <MessageCard
                name="KnownStateMessage"
                desc="Acknowledge received state"
                fields={["action: 'known'", "id: coValueId", "sessionID: txCount"]}
              />
              <MessageCard
                name="NewContentMessage"
                desc="Send new transactions"
                fields={["action: 'content'", "header: CoValueHeader", "new: { transactions }"]}
              />
              <MessageCard
                name="DoneMessage"
                desc="Sync handshake complete"
                fields={["action: 'done'", "id: coValueId"]}
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Transaction Structure</h3>
            <CodeBlock code={`// Private (encrypted by default)
type PrivateTransaction = {
  privacy: "private"
  madeAt: number
  keyUsed: KeyID
  encryptedChanges: Encrypted<JsonValue[]>
}

// Trusting (visible to all group members)
type TrustingTransaction = {
  privacy: "trusting"
  madeAt: number
  changes: JsonValue[]
}`} />
          </div>
        </section>

        {/* Complete Example */}
        <section className="space-y-8">
          <SectionHeader icon="📋" title="Complete Example" subtitle="Todo app with collaboration" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">1. Schema (schema.ts)</h3>
            <CodeBlock code={`import { co, z, coField, Account } from "jazz-tools"

export const Task = co.map({
  done: z.boolean(),
  text: co.plainText(),
})

export const Project = co.map({
  title: z.string(),
  tasks: co.list(Task),
})

export const TodoAccount = co
  .account({
    profile: co.profile(),
    root: co.map({
      projects: co.list(Project),
    }),
  })
  .withMigration(async (account) => {
    if (!account.$jazz.has("root")) {
      account.$jazz.set("root", { projects: [] })
    }
  })

// Resolved queries
export const ProjectWithTasks = Project.resolved({
  tasks: { $each: { text: true } }
})`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">2. App Setup (main.tsx)</h3>
            <CodeBlock code={`import { JazzReactProvider, PassphraseAuthBasicUI } from "jazz-tools/react"
import { TodoAccount } from "./schema"

function App() {
  return (
    <JazzReactProvider
      sync={{ peer: "wss://cloud.jazz.tools/?key=API_KEY" }}
      AccountSchema={TodoAccount}
    >
      <PassphraseAuthBasicUI appName="Todo" wordlist={wordlist}>
        <Router />
      </PassphraseAuthBasicUI>
    </JazzReactProvider>
  )
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">3. Project List (ProjectList.tsx)</h3>
            <CodeBlock code={`import { useAccount } from "jazz-tools/react"
import { Group } from "jazz-tools"
import { TodoAccount, Project } from "./schema"

function ProjectList() {
  const me = useAccount(TodoAccount.resolved({
    root: { projects: { $each: {} } }
  }))

  if (me.$isLoaded === false) return <Loading />

  const createProject = () => {
    const group = Group.create()
    const project = Project.create(
      { title: "New Project", tasks: [] },
      { owner: group }
    )
    me.root.projects.$jazz.push(project)
  }

  return (
    <div>
      <button onClick={createProject}>New Project</button>
      {me.root.projects.map((project) => (
        <Link key={project.$jazz.id} to={\`/project/\${project.$jazz.id}\`}>
          {project.title}
        </Link>
      ))}
    </div>
  )
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">4. Project View (ProjectView.tsx)</h3>
            <CodeBlock code={`import { useCoState } from "jazz-tools/react"
import { ProjectWithTasks, Task } from "./schema"

function ProjectView({ projectId }: { projectId: string }) {
  const project = useCoState(ProjectWithTasks, projectId)

  if (project.$isLoaded === false) return <Loading />

  const addTask = (text: string) => {
    const task = Task.create(
      { done: false, text },
      { owner: project.$jazz.owner }
    )
    project.tasks.$jazz.push(task)
  }

  return (
    <div>
      <input
        value={project.title}
        onChange={(e) => project.title = e.target.value}
      />

      {project.tasks.map((task) => (
        <div key={task.$jazz.id}>
          <input
            type="checkbox"
            checked={task.done}
            onChange={(e) => task.$jazz.set("done", e.target.checked)}
          />
          <span>{task.text}</span>
          <button onClick={() =>
            project.tasks.$jazz.remove(t => t.$jazz.id === task.$jazz.id)
          }>
            Delete
          </button>
        </div>
      ))}

      <NewTaskForm onSubmit={addTask} />
    </div>
  )
}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">5. Share & Collaborate</h3>
            <CodeBlock code={`import { createInviteLink, useAcceptInvite } from "jazz-tools"

// Share button
function ShareButton({ project }) {
  const share = () => {
    const invite = project.$jazz.owner.createInvite("writer")
    const link = createInviteLink({
      inviteSecret: invite,
      valueId: project.$jazz.id,
    })
    navigator.clipboard.writeText(link)
  }

  return <button onClick={share}>Copy Share Link</button>
}

// Accept invites (in app root)
function App() {
  useAcceptInvite({
    invitedObjectSchema: Project,
    onAccept: (id) => router.navigate(\`/project/\${id}\`),
  })

  return <Router />
}`} />
          </div>
        </section>

        {/* Storage & Deployment */}
        <section className="space-y-8">
          <SectionHeader icon="💾" title="Storage & Deployment" />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Browser</h3>
              <CodeBlock code={`import { IndexedDBStorageAdapter }
  from "cojson-storage-indexeddb"

const storage = await IndexedDBStorageAdapter
  .create("myapp")`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Server (SQLite)</h3>
              <CodeBlock code={`import { SQLiteStorageAdapter }
  from "cojson-storage-sqlite"

const storage = new SQLiteStorageAdapter(
  "./data.db"
)`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Cloudflare DO</h3>
              <CodeBlock code={`import { DurableObjectStorageAdapter }
  from "cojson-storage-do-sqlite"

const storage = new DurableObjectStorageAdapter(
  env.STORAGE
)`} />
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="space-y-8">
          <SectionHeader icon="🚀" title="Advanced Features" />

          <div className="grid md:grid-cols-2 gap-6">
            <AdvancedCard
              title="Schema Migrations"
              description="Handle evolving schemas with .withMigration()"
              code={`const Task = co.map({
  text: co.plainText(),
  version: z.literal(2),
}).withMigration((task) => {
  if (task.version < 2) {
    task.$jazz.set("version", 2)
  }
})`}
            />
            <AdvancedCard
              title="Vector Search"
              description="Store embeddings for similarity search"
              code={`class Document extends CoMap {
  content = coField.string
  embedding = co.vector(1536)
}

doc.embedding = [0.1, 0.2, ...]`}
            />
            <AdvancedCard
              title="Branching / Time Travel"
              description="Create variant branches at specific times"
              code={`const branch = await loadCoValue(
  Project, projectId, node, {
    unstable_branch: {
      owner: newGroup,
      at: pastTimestamp,
    },
  }
)`}
            />
            <AdvancedCard
              title="SSR Support"
              description="Server-side rendering with Jazz"
              code={`import { getServerJazzContext } from "jazz-tools/react/ssr"

export async function getServerSideProps() {
  const jazz = await getServerJazzContext()
  const data = await jazz.loadCoValue(...)
  return { props: { data } }
}`}
            />
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💎" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Local-first by design"
              description="Data lives locally, syncs in background. Instant UI updates, full offline support, no loading spinners for local data."
            />
            <TakeawayCard
              title="Type-safe end-to-end"
              description="Zod schemas provide compile-time safety. Resolved queries ensure deep data is loaded. No runtime surprises."
            />
            <TakeawayCard
              title="Permissions are data"
              description="Groups are CoValues themselves. Access control syncs like any other data. Encryption keys distributed automatically."
            />
            <TakeawayCard
              title="Transactions are immutable"
              description="All changes are signed transactions. Full audit trail. CRDT-like conflict resolution. History is always available."
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
    blue: "bg-blue-500/10 border-blue-500/20",
    indigo: "bg-indigo-500/10 border-indigo-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
  }
  return (
    <div className={`${colors[color]} border rounded-2xl p-6`}>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}

function ArchLayer({ name, desc, color, small }: { name: string; desc: string; color: string; small?: boolean }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/20",
    indigo: "bg-indigo-500/10 border-indigo-500/20",
    purple: "bg-purple-500/10 border-purple-500/20",
  }
  return (
    <div className={`${colors[color]} border rounded-lg ${small ? 'p-3' : 'p-4'}`}>
      <div className={`font-semibold ${small ? 'text-sm' : ''}`}>{name}</div>
      <div className={`text-slate-600 dark:text-slate-400 ${small ? 'text-xs' : 'text-sm'}`}>{desc}</div>
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

function CoValueCard({ name, desc, example }: { name: string; desc: string; example: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold text-lg text-blue-600 dark:text-blue-400 mb-2">{name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{desc}</p>
      <CodeBlock code={example} />
    </div>
  )
}

function HookCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
      <code className="text-blue-600 dark:text-blue-400 text-sm">{name}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  )
}

function RoleCard({ role, desc }: { role: string; desc: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-3 text-center">
      <code className="text-blue-600 dark:text-blue-400 text-sm">{role}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  )
}

function MessageCard({ name, desc, fields }: { name: string; desc: string; fields: string[] }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
      <div className="font-semibold text-sm text-blue-600 dark:text-blue-400">{name}</div>
      <p className="text-xs text-slate-500 mt-1 mb-2">{desc}</p>
      <div className="space-y-0.5">
        {fields.map((f) => (
          <code key={f} className="block text-xs text-slate-600 dark:text-slate-400">{f}</code>
        ))}
      </div>
    </div>
  )
}

function AdvancedCard({ title, description, code }: { title: string; description: string; code: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{description}</p>
      <CodeBlock code={code} />
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
