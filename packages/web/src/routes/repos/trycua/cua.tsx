import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/trycua/cua")({
  component: CUAPage,
})

function CUAPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-cyan-600 dark:text-cyan-400 text-sm font-mono">repos/trycua</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">cua</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
            <span className="text-4xl">🖥️</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            CUA - Computer Use Agent
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Open-source framework for AI agents that autonomously interact with computers through visual understanding
          </p>
          <p className="text-slate-600 dark:text-slate-500 max-w-3xl mx-auto">
            Sandbox macOS, Linux, and Windows VMs. AI perceives screens, reasons about interfaces, and executes actions.
            Supports Claude, GPT-4o, Gemini, UI-TARS, and many other models.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Python 3.12+</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Apple Silicon</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Vision + Action</span>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Architecture" subtitle="How CUA works under the hood" />

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6">
            <pre className="text-sm text-slate-600 dark:text-slate-400 overflow-x-auto">
{`┌─────────────────────────────────────────────────┐
│          Agent SDK (agent package)              │
├─────────────────────────────────────────────────┤
│  ComputerAgent                                  │
│  ├─ Agent Loops (anthropic, openai, gemini)    │
│  ├─ Callbacks (trajectory, budget, logging)    │
│  ├─ Adapters (HuggingFace, MLX, CUA cloud)     │
│  └─ Tools (computers, functions)               │
├─────────────────────────────────────────────────┤
│        Computer SDK (computer package)          │
├─────────────────────────────────────────────────┤
│  Computer Class                                 │
│  ├─ VM Providers (lume, docker, cloud)         │
│  ├─ Interfaces (macOS, linux, windows)         │
│  └─ Actions (click, type, scroll, screenshot)  │
├─────────────────────────────────────────────────┤
│     Infrastructure (Lume, Core, SOM)            │
├─────────────────────────────────────────────────┤
│  Lume (macOS VM manager - Swift)               │
│  Computer Server (runs inside VM)              │
│  Set-of-Mark grounding                         │
└─────────────────────────────────────────────────┘`}
            </pre>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <ArchCard
              title="Agent Layer"
              desc="ComputerAgent orchestrates the reasoning loop. Takes screenshots, sends to LLM, parses actions, executes on computer."
            />
            <ArchCard
              title="Computer Layer"
              desc="Computer class manages VM lifecycle. Connects via WebSocket to computer-server running inside the VM."
            />
            <ArchCard
              title="Infrastructure Layer"
              desc="Lume provides near-native macOS VMs on Apple Silicon. Docker/Cloud for Linux. Windows Sandbox for Windows."
            />
          </div>
        </section>

        {/* macOS Setup */}
        <section className="space-y-8">
          <SectionHeader icon="🍎" title="Running on macOS" subtitle="Complete setup guide for Apple Silicon" />

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Requirements</h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li>• Apple Silicon Mac (M1, M2, M3, M4)</li>
              <li>• macOS 13.0 (Ventura) or later</li>
              <li>• Python 3.12 or 3.13 (NOT 3.14 - dependency issues)</li>
              <li>• 16GB RAM recommended (8GB minimum)</li>
              <li>• 50GB free disk space for VM images</li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Step 1: Install Lume (macOS VM Manager)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Lume uses Apple's Virtualization.framework for near-native performance. It manages macOS VM lifecycle and provides an HTTP API.
              </p>
              <CodeBlock code={`# Install Lume CLI and daemon
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/trycua/cua/main/libs/lume/scripts/install.sh)"

# Verify installation
lume --version

# Test by listing available images
lume images`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Step 2: Clone Repository & Setup Python</h3>
              <CodeBlock code={`# Clone the repository
git clone https://github.com/trycua/cua.git
cd cua

# Install uv (fast Python package manager)
pip install uv

# Sync all Python dependencies (uses pyproject.toml workspace)
uv sync

# Set up pre-commit hooks (optional but recommended)
uv run pre-commit install`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Step 3: Configure API Keys</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Create a .env.local file in the root directory with your API keys:
              </p>
              <CodeBlock code={`# .env.local
ANTHROPIC_API_KEY=sk-ant-your-key-here
OPENAI_API_KEY=sk-your-key-here

# Optional: For CUA cloud provider
CUA_API_KEY=cua_your-key-here

# Optional: Disable telemetry
CUA_TELEMETRY_DISABLED=1`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Step 4: Pull a macOS VM Image</h3>
              <CodeBlock code={`# Pull the CUA-optimized macOS Sequoia image (has computer-server pre-installed)
lume pull macos-sequoia-cua:latest

# Or for a vanilla macOS install
lume pull macos-sequoia-vanilla:latest

# List pulled images
lume images`} />
              <div className="mt-4 text-xs text-slate-500">
                Default credentials: username "lume", password "lume" (change immediately!)
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Step 5: Run Your First Agent</h3>
              <CodeBlock code={`# Run the example script
uv run python examples/agent_ui_examples.py

# Or create your own script
cat << 'EOF' > my_agent.py
import asyncio
from agent import ComputerAgent
from computer import Computer

async def main():
    # Create a macOS VM
    computer = Computer(
        os_type="macos",
        display="1024x768",
        memory="8GB",
        cpu="4",
        provider_type="lume"
    )

    try:
        await computer.run()  # Start VM

        agent = ComputerAgent(
            model="anthropic/claude-sonnet-4-5-20250929",
            tools=[computer],
            verbosity=20  # logging.INFO
        )

        async for result in agent.run([{
            "role": "user",
            "content": "Open Safari and search for 'hello world'"
        }]):
            print(result)
    finally:
        await computer.stop()

asyncio.run(main())
EOF

uv run python my_agent.py`} />
            </div>
          </div>
        </section>

        {/* Agent Execution Flow */}
        <section className="space-y-8">
          <SectionHeader icon="🔄" title="Agent Execution Flow" subtitle="How actions are performed step by step" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="space-y-4 text-sm">
              <FlowStep num={1} title="User sends instruction" desc="e.g., 'Open Safari and search for Python tutorials'" />
              <FlowStep num={2} title="Agent takes screenshot" desc="Captures current VM screen state" />
              <FlowStep num={3} title="Screenshot + instruction sent to LLM" desc="Claude/GPT-4o/etc. receives image and reasons about what to do" />
              <FlowStep num={4} title="LLM returns action" desc="e.g., {type: 'left_click', x: 100, y: 50} or {type: 'type_text', text: 'hello'}" />
              <FlowStep num={5} title="Action executed on VM" desc="Computer interface sends command via WebSocket to computer-server in VM" />
              <FlowStep num={6} title="Loop continues" desc="Take new screenshot, send to LLM, repeat until task complete or budget exhausted" />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Callback Lifecycle</h3>
            <CodeBlock code={`on_run_start()           # Agent run begins
  │
  ├─► on_llm_start()       # Before API call (preprocess messages)
  │     └─► on_api_start() # API request begins
  │         └─► on_api_end() # API response received
  │     └─► on_llm_end()   # After API call (postprocess)
  │
  ├─► on_computer_call_start()  # Before executing action
  │     └─► Execute action (click, type, etc.)
  │     └─► on_screenshot()     # Screenshot captured
  │     └─► on_computer_call_end()
  │
  ├─► on_usage()           # Token usage tracked
  ├─► on_run_continue()    # Check if should continue
  │
  └─► Loop until done
      │
on_run_end()             # Agent run complete`} />
          </div>
        </section>

        {/* Model Support */}
        <section className="space-y-8">
          <SectionHeader icon="🤖" title="Supported Models" subtitle="Switch between different AI providers and local models" />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-3 px-4">Model</th>
                  <th className="text-center py-3 px-4">Computer-Use</th>
                  <th className="text-center py-3 px-4">Grounding</th>
                  <th className="text-center py-3 px-4">Tools</th>
                  <th className="text-center py-3 px-4">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <ModelRow name="Claude Sonnet/Haiku 4" cu="✓" ground="✓" tools="✓" type="Full Agent" />
                <ModelRow name="OpenAI computer-use-preview" cu="✓" ground="✓" tools="" type="Full Agent" />
                <ModelRow name="Gemini computer-use-preview" cu="✓" ground="✓" tools="" type="Full Agent" />
                <ModelRow name="Qwen3 VL" cu="✓" ground="✓" tools="✓" type="Full Agent" />
                <ModelRow name="GLM-4.5V" cu="✓" ground="✓" tools="✓" type="Full Agent" />
                <ModelRow name="UI-TARS / UI-TARS-2" cu="✓" ground="✓" tools="✓" type="Full Agent" />
                <ModelRow name="InternVL" cu="✓" ground="✓" tools="✓" type="Full Agent" />
                <ModelRow name="Moondream3" cu="" ground="✓" tools="" type="Grounding" />
                <ModelRow name="OmniParser" cu="" ground="✓" tools="" type="Grounding" />
                <ModelRow name="OpenCUA / GTA / Holo" cu="" ground="✓" tools="" type="Grounding" />
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Switching Models</h3>
            <CodeBlock code={`# Full computer-use models (API-based)
agent = ComputerAgent(model="anthropic/claude-sonnet-4-5-20250929")
agent = ComputerAgent(model="openai/computer-use-preview")
agent = ComputerAgent(model="gemini-2.5-computer-use-preview")

# Via OpenRouter (access many models)
agent = ComputerAgent(model="openrouter/qwen/qwen3-vl-235b-a22b-instruct")

# Local inference with HuggingFace Transformers
agent = ComputerAgent(model="huggingface-local/ByteDance-Seed/UI-TARS-1.5-7B")

# Local inference with Ollama
agent = ComputerAgent(model="ollama/llava")

# MLX (Apple Silicon optimized)
agent = ComputerAgent(model="mlx/llava-v1.6-mistral-7b")`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Model Composition (Grounding + Planning)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Combine a specialized grounding model with a general LLM for planning:
            </p>
            <CodeBlock code={`# Format: {grounding-model}+{planning-llm}

# UI-TARS for clicking + Claude for reasoning
agent = ComputerAgent(
    model="huggingface-local/ByteDance-Seed/UI-TARS-1.5-7B+anthropic/claude-sonnet-4-5"
)

# Moondream3 grounding + GPT-4o planning
agent = ComputerAgent(model="moondream3+openai/gpt-4o")

# OmniParser grounding + any LLM
agent = ComputerAgent(model="omniparser+openai/gpt-4o")

# Human-in-the-loop for click verification
agent = ComputerAgent(model="openai/computer-use-preview+human/human")`} />
          </div>
        </section>

        {/* Computer Configuration */}
        <section className="space-y-8">
          <SectionHeader icon="⚙️" title="Computer Configuration" subtitle="All VM and interface options" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`from computer import Computer

computer = Computer(
    # Display & Resources
    display="1024x768",       # Screen resolution (WIDTHxHEIGHT)
    memory="8GB",             # RAM allocation
    cpu="4",                  # CPU cores

    # OS Selection
    os_type="macos",          # "macos", "linux", or "windows"
    image=None,               # VM image (auto-selected if None)
    name="my-vm",             # VM identifier

    # Provider
    provider_type="lume",     # lume, docker, cloud, winsandbox
    host="localhost",         # Provider host
    port=7777,                # Provider API port
    noVNC_port=8006,          # Web VNC interface port

    # Storage
    storage="/path/to/storage",  # Persistent storage path
    ephemeral=False,             # True = destroy on stop
    shared_directories=[         # Mount host directories
        "/Users/me/shared"
    ],

    # Cloud/Remote
    api_key=None,             # CUA_API_KEY (from env if not set)
    use_host_computer_server=False,  # Use localhost instead of VM

    # Logging
    verbosity=20,             # logging.INFO
    telemetry_enabled=True,   # Anonymous usage tracking

    # Experiments
    experiments=["app-use"]   # macOS app-specific automation
)`} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ProviderCard
              name="lume"
              os="macOS"
              desc="Apple Virtualization.framework. Near-native performance on Apple Silicon. Best for macOS VMs."
            />
            <ProviderCard
              name="docker"
              os="Linux"
              desc="Docker containers with desktop environment. Fast startup, good for Linux automation."
            />
            <ProviderCard
              name="cloud"
              os="Linux/macOS"
              desc="CUA Cloud service. No local VM needed. Requires CUA_API_KEY."
            />
            <ProviderCard
              name="winsandbox"
              os="Windows"
              desc="Windows Sandbox. Always ephemeral. Requires Windows host."
            />
          </div>
        </section>

        {/* Agent Configuration */}
        <section className="space-y-8">
          <SectionHeader icon="🎛️" title="Agent Configuration" subtitle="All ComputerAgent options" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`from agent import ComputerAgent

agent = ComputerAgent(
    # Core
    model="anthropic/claude-sonnet-4-5-20250929",
    tools=[computer],                    # Computer + function tools

    # Control
    custom_loop=None,                    # Override default agent loop
    max_retries=3,                       # API retry attempts
    screenshot_delay=0.5,                # Delay before screenshots (seconds)

    # Memory Optimization
    only_n_most_recent_images=3,         # Keep only N screenshots in context
    use_prompt_caching=False,            # Anthropic prompt caching

    # Callbacks
    callbacks=[                          # Built-in and custom callbacks
        TrajectorySaverCallback(path="./trajectories"),
        BudgetManagerCallback(max_usd=5.0),
        LoggingCallback(level=logging.DEBUG),
    ],
    instructions="Custom system prompt here",

    # Tracking
    trajectory_dir="./trajectories",     # Save actions to disk
    max_trajectory_budget=5.0,           # Cost budget in USD
    telemetry_enabled=True,

    # Logging
    verbosity=10,                        # logging.DEBUG

    # Model Provider Overrides
    api_key=None,                        # Override provider API key
    api_base=None,                       # Override provider URL
    trust_remote_code=False,             # For HuggingFace models

    # Additional LLM kwargs
    temperature=0.7,
    max_tokens=4096,
)`} />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <ConfigCard name="only_n_most_recent_images" desc="Prevents context overflow. Keeps last N screenshots." />
            <ConfigCard name="max_trajectory_budget" desc="Stop when cost exceeds this USD amount." />
            <ConfigCard name="trajectory_dir" desc="Save screenshots + actions for replay/debugging." />
          </div>
        </section>

        {/* Interface Methods */}
        <section className="space-y-8">
          <SectionHeader icon="🖱️" title="Interface Methods" subtitle="All available computer actions" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Mouse Actions</h3>
              <CodeBlock code={`# Clicks
await computer.interface.left_click(x, y)
await computer.interface.right_click(x, y)
await computer.interface.double_click(x, y)
await computer.interface.middle_click(x, y)

# Movement
await computer.interface.move_cursor(x, y)

# Drag
await computer.interface.drag_to(x, y)
await computer.interface.drag([(x1, y1), (x2, y2)])

# Scroll
await computer.interface.scroll(x, y, dx, dy)`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Keyboard Actions</h3>
              <CodeBlock code={`# Type text
await computer.interface.type_text("hello world")

# Press key
await computer.interface.press_key("enter")
await computer.interface.press_key("escape")

# Hotkeys (modifier combos)
await computer.interface.hotkey("command", "space")
await computer.interface.hotkey("command", "shift", "4")
await computer.interface.hotkey("control", "c")`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Clipboard & Screenshot</h3>
              <CodeBlock code={`# Screenshot
screenshot_bytes = await computer.interface.screenshot()

# Clipboard
await computer.interface.set_clipboard("text to paste")
content = await computer.interface.copy_to_clipboard()

# Get screen dimensions
width, height = await computer.interface.get_dimensions()

# Get environment info
env = await computer.interface.get_environment()`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">macOS-Specific</h3>
              <CodeBlock code={`# Accessibility tree (UI element hierarchy)
tree = await computer.interface.get_accessibility_tree()

# Diorama commands (app-specific automation)
result = await computer.interface.diorama_cmd(
    "open_app",
    {"app_name": "Safari"}
)

# Run shell command
output = await computer.interface.run_command("ls -la")`} />
            </div>
          </div>
        </section>

        {/* Callbacks */}
        <section className="space-y-8">
          <SectionHeader icon="📞" title="Built-in Callbacks" subtitle="Extend agent behavior" />

          <div className="grid md:grid-cols-2 gap-6">
            <CallbackCard
              name="TrajectorySaverCallback"
              desc="Saves screenshots and actions to disk for replay and debugging"
              code={`from agent.callbacks import TrajectorySaverCallback

callback = TrajectorySaverCallback(
    path="./trajectories",
    save_screenshots=True
)`}
            />
            <CallbackCard
              name="BudgetManagerCallback"
              desc="Stops agent when cost budget is exceeded"
              code={`from agent.callbacks import BudgetManagerCallback

callback = BudgetManagerCallback(
    max_usd=5.0,
    warn_at=0.8  # Warn at 80%
)`}
            />
            <CallbackCard
              name="ImageRetentionCallback"
              desc="Keeps only N most recent images in context"
              code={`from agent.callbacks import ImageRetentionCallback

callback = ImageRetentionCallback(
    keep_last=3
)`}
            />
            <CallbackCard
              name="LoggingCallback"
              desc="Detailed execution logging"
              code={`from agent.callbacks import LoggingCallback
import logging

callback = LoggingCallback(
    level=logging.DEBUG
)`}
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Custom Callback</h3>
            <CodeBlock code={`from agent.callbacks import AsyncCallbackHandler

class MyCallback(AsyncCallbackHandler):
    async def on_run_start(self, messages):
        print("Agent starting...")

    async def on_computer_call_start(self, action, call_id):
        print(f"Executing: {action}")

    async def on_computer_call_end(self, action, call_id, result):
        print(f"Completed: {action}")

    async def on_screenshot(self, screenshot_bytes):
        # Save or process screenshot
        pass

    async def on_usage(self, usage):
        print(f"Tokens: {usage['total_tokens']}")

    async def on_run_end(self, result):
        print(f"Agent finished. Cost: \${result.get('cost', 0):.4f}")

agent = ComputerAgent(
    model="anthropic/claude-sonnet-4-5-20250929",
    tools=[computer],
    callbacks=[MyCallback()]
)`} />
          </div>
        </section>

        {/* Complete Examples */}
        <section className="space-y-8">
          <SectionHeader icon="📝" title="Complete Examples" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Basic macOS Automation</h3>
            <CodeBlock code={`import asyncio
from agent import ComputerAgent
from computer import Computer

async def main():
    computer = Computer(
        os_type="macos",
        display="1024x768",
        memory="8GB",
        provider_type="lume"
    )

    try:
        await computer.run()

        agent = ComputerAgent(
            model="anthropic/claude-sonnet-4-5-20250929",
            tools=[computer],
            only_n_most_recent_images=3,
            trajectory_dir="./trajectories"
        )

        messages = [{
            "role": "user",
            "content": "Open Safari, go to github.com, and take a screenshot"
        }]

        async for result in agent.run(messages):
            for item in result.get("output", []):
                if item.get("type") == "message":
                    print(f"Agent: {item['content'][0]['text']}")
                elif item.get("type") == "computer_call":
                    print(f"Action: {item['action']}")

    finally:
        await computer.stop()

asyncio.run(main())`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Using Local Model (UI-TARS)</h3>
            <CodeBlock code={`import asyncio
from agent import ComputerAgent
from computer import Computer

async def main():
    computer = Computer(
        os_type="macos",
        provider_type="lume"
    )

    await computer.run()

    # Use UI-TARS locally (requires GPU with enough VRAM)
    agent = ComputerAgent(
        model="huggingface-local/ByteDance-Seed/UI-TARS-1.5-7B",
        tools=[computer],
        trust_remote_code=True  # Required for HuggingFace models
    )

    async for result in agent.run([{
        "role": "user",
        "content": "Click on the Safari icon in the dock"
    }]):
        print(result)

    await computer.stop()

asyncio.run(main())`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">With Budget & Trajectory Saving</h3>
            <CodeBlock code={`import asyncio
import logging
from agent import ComputerAgent
from agent.callbacks import TrajectorySaverCallback, BudgetManagerCallback
from computer import Computer

async def main():
    computer = Computer(
        os_type="macos",
        provider_type="lume",
        storage="./vm-storage"  # Persistent storage
    )

    await computer.run()

    agent = ComputerAgent(
        model="anthropic/claude-sonnet-4-5-20250929",
        tools=[computer],
        callbacks=[
            TrajectorySaverCallback(path="./trajectories"),
            BudgetManagerCallback(max_usd=2.0),
        ],
        only_n_most_recent_images=5,
        verbosity=logging.INFO,
        instructions="Be concise. Take direct actions."
    )

    async for result in agent.run([{
        "role": "user",
        "content": """
        1. Open System Settings
        2. Navigate to General
        3. Check the About section
        """
    }]):
        usage = result.get("usage", {})
        if usage:
            print(f"Tokens used: {usage.get('total_tokens', 0)}")

    await computer.stop()

asyncio.run(main())`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Composed Grounding + Planning</h3>
            <CodeBlock code={`import asyncio
from agent import ComputerAgent
from computer import Computer

async def main():
    computer = Computer(
        os_type="macos",
        provider_type="lume"
    )

    await computer.run()

    # Moondream3 for click prediction + Claude for reasoning
    agent = ComputerAgent(
        model="moondream3+anthropic/claude-sonnet-4-5-20250929",
        tools=[computer]
    )

    async for result in agent.run([{
        "role": "user",
        "content": "Find and click on the Finder icon"
    }]):
        print(result)

    await computer.stop()

asyncio.run(main())`} />
          </div>
        </section>

        {/* Lume Commands */}
        <section className="space-y-8">
          <SectionHeader icon="🔧" title="Lume CLI Reference" subtitle="Manage macOS VMs" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`# List available images
lume images

# Pull an image
lume pull macos-sequoia-cua:latest

# Run a VM (interactive)
lume run macos-sequoia-cua:latest

# List running VMs
lume list

# Stop a VM
lume stop <vm-name>

# Delete a VM
lume delete <vm-name>

# Get VM info
lume info <vm-name>

# Clone a VM (for snapshots)
lume clone <source> <destination>`} />
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="space-y-8">
          <SectionHeader icon="🔍" title="Troubleshooting" />

          <div className="space-y-4">
            <TroubleshootCard
              problem="Lume install fails"
              solution="Ensure you're on Apple Silicon Mac with macOS 13+. Check Xcode Command Line Tools are installed: xcode-select --install"
            />
            <TroubleshootCard
              problem="VM won't start / hangs"
              solution="Check available disk space (need ~50GB). Try: lume delete <vm-name> && lume pull <image> to reset."
            />
            <TroubleshootCard
              problem="Python dependency errors"
              solution="Use Python 3.12 or 3.13 (NOT 3.14). Run: uv python install 3.13 && uv sync"
            />
            <TroubleshootCard
              problem="API rate limits"
              solution="Add delays between actions with screenshot_delay parameter. Use budget callbacks to limit costs."
            />
            <TroubleshootCard
              problem="Screenshots are black/wrong"
              solution="VM may not be fully booted. Add initial delay or check VM is responsive via VNC (localhost:8006)."
            />
            <TroubleshootCard
              problem="Actions not executing"
              solution="Check computer-server is running in VM. For custom images, ensure computer-server is installed."
            />
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💎" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Sandboxed by design"
              description="All actions happen in VMs, not on your host. Safe for experimentation and production automation."
            />
            <TakeawayCard
              title="Model-agnostic"
              description="Switch between Claude, GPT-4o, Gemini, or local models like UI-TARS. Compose grounding + planning."
            />
            <TakeawayCard
              title="Callback extensibility"
              description="Built-in callbacks for budgets, trajectories, logging. Create custom callbacks for any behavior."
            />
            <TakeawayCard
              title="Near-native macOS"
              description="Lume uses Apple Virtualization.framework for near-native performance on Apple Silicon."
            />
          </div>
        </section>

        {/* Links */}
        <section className="space-y-6">
          <SectionHeader icon="🔗" title="Resources" />
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/trycua/cua"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              GitHub Repository
            </a>
            <a
              href="https://docs.trycua.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://discord.gg/trycua"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Discord Community
            </a>
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

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto text-sm">
      <code className="text-slate-700 dark:text-slate-300">{code}</code>
    </pre>
  )
}

function ArchCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  )
}

function FlowStep({ num, title, desc }: { num: number; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center font-semibold">
        {num}
      </span>
      <div>
        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
        <p className="text-slate-600 dark:text-slate-400">{desc}</p>
      </div>
    </div>
  )
}

function ModelRow({ name, cu, ground, tools, type }: { name: string; cu: string; ground: string; tools: string; type: string }) {
  return (
    <tr>
      <td className="py-3 px-4 font-medium">{name}</td>
      <td className="py-3 px-4 text-center text-green-500">{cu}</td>
      <td className="py-3 px-4 text-center text-green-500">{ground}</td>
      <td className="py-3 px-4 text-center text-green-500">{tools}</td>
      <td className="py-3 px-4 text-center text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">{type}</td>
    </tr>
  )
}

function ProviderCard({ name, os, desc }: { name: string; os: string; desc: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <code className="text-cyan-600 dark:text-cyan-400 font-semibold">{name}</code>
        <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">{os}</span>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
    </div>
  )
}

function ConfigCard({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
      <code className="text-cyan-600 dark:text-cyan-400 text-sm font-semibold">{name}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  )
}

function CallbackCard({ name, desc, code }: { name: string; desc: string; code: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold text-lg text-cyan-600 dark:text-cyan-400 mb-2">{name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{desc}</p>
      <CodeBlock code={code} />
    </div>
  )
}

function TroubleshootCard({ problem, solution }: { problem: string; solution: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">{problem}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{solution}</p>
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
