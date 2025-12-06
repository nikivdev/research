import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/papers/25/deepseek-v3-2")({
  component: DeepSeekV32Paper,
})

function DeepSeekV32Paper() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-600">/</span>
            <span className="text-blue-400 text-sm font-mono">papers/25</span>
            <span className="text-slate-600">/</span>
            <h1 className="text-lg font-semibold">DeepSeek-V3.2</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        {/* Title Section */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Open Source LLM
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
            DeepSeek-V3.2
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Pushing the Frontier of Open Large Language Models
          </p>
          <p className="text-slate-500">DeepSeek-AI • 2025</p>
        </section>

        {/* TL;DR */}
        <section className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8">
          <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">TL;DR</h2>
          <p className="text-lg text-slate-200 leading-relaxed">
            DeepSeek-V3.2 is an open-source model that matches <span className="text-cyan-400 font-semibold">GPT-5</span> and approaches <span className="text-cyan-400 font-semibold">Gemini-3.0-Pro</span> through three key innovations:
            a new sparse attention mechanism (DSA), massive reinforcement learning compute (10%+ of pre-training cost),
            and synthetic agentic task generation at scale.
          </p>
        </section>

        {/* The Problem */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h2 className="text-2xl font-bold">The Problem</h2>
          </div>

          <p className="text-slate-400 text-lg">
            Open-source models have been falling behind closed-source ones. DeepSeek identified <span className="text-white font-medium">three critical gaps</span>:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <ProblemCard
              number={1}
              title="Attention Bottleneck"
              description="Standard attention is O(L²) - quadratic complexity kills performance on long sequences"
              icon="⚡"
              color="red"
            />
            <ProblemCard
              number={2}
              title="Insufficient Post-Training"
              description="Open models don't invest enough compute in RL/fine-tuning after pre-training"
              icon="💰"
              color="orange"
            />
            <ProblemCard
              number={3}
              title="Weak Agent Capabilities"
              description="Open models struggle with tool use, instruction following, and real-world tasks"
              icon="🤖"
              color="yellow"
            />
          </div>
        </section>

        {/* Solution 1: DSA */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <span className="text-2xl">1</span>
            </div>
            <h2 className="text-2xl font-bold">DeepSeek Sparse Attention (DSA)</h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-red-400">Traditional Attention</h3>
                <div className="bg-slate-800 rounded-xl p-6">
                  <AttentionVisualization type="dense" />
                </div>
                <p className="text-slate-400 text-sm">
                  Every token attends to every other token. <span className="text-red-400 font-mono">O(L²)</span> complexity.
                </p>
              </div>

              {/* After */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-400">DSA (Sparse)</h3>
                <div className="bg-slate-800 rounded-xl p-6">
                  <AttentionVisualization type="sparse" />
                </div>
                <p className="text-slate-400 text-sm">
                  Lightning indexer selects top-k relevant tokens. <span className="text-emerald-400 font-mono">O(Lk)</span> complexity.
                </p>
              </div>
            </div>

            {/* How it works */}
            <div className="mt-8 pt-8 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">How DSA Works</h4>
              <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
                <DSAStep
                  step={1}
                  title="Lightning Indexer"
                  description="Computes relevance scores between query and all keys (cheap, FP8)"
                />
                <Arrow />
                <DSAStep
                  step={2}
                  title="Top-k Selection"
                  description="Selects only the 2048 most relevant tokens"
                />
                <Arrow />
                <DSAStep
                  step={3}
                  title="Sparse Attention"
                  description="Full attention computed only on selected tokens"
                />
              </div>
            </div>
          </div>

          {/* Cost comparison */}
          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <h4 className="text-lg font-semibold mb-6">Inference Cost Savings</h4>
            <CostChart />
            <p className="text-slate-400 text-sm mt-4 text-center">
              DSA dramatically reduces costs at longer context lengths while maintaining quality
            </p>
          </div>
        </section>

        {/* Solution 2: Scaled RL */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <span className="text-2xl">2</span>
            </div>
            <h2 className="text-2xl font-bold">Scaled Reinforcement Learning</h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-purple-400 mb-2">&gt;10%</div>
              <p className="text-slate-400">of pre-training compute spent on RL post-training</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200">GRPO Algorithm Improvements</h4>
                <ul className="space-y-3">
                  <GRPOFeature
                    title="Unbiased KL Estimate"
                    description="Fixes gradient bias when tokens have low probability under current policy"
                  />
                  <GRPOFeature
                    title="Off-Policy Sequence Masking"
                    description="Masks negative samples with high policy divergence to stabilize training"
                  />
                  <GRPOFeature
                    title="Keep Routing"
                    description="Preserves MoE expert routing paths between inference and training"
                  />
                  <GRPOFeature
                    title="Keep Sampling Mask"
                    description="Maintains top-p/top-k truncation masks for consistent action spaces"
                  />
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-200">Training Pipeline</h4>
                <div className="bg-slate-800 rounded-xl p-6 space-y-4">
                  <PipelineStep
                    step={1}
                    title="Specialist Distillation"
                    items={["Math", "Coding", "Reasoning", "Agents", "Search"]}
                  />
                  <div className="flex justify-center">
                    <svg className="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                  <PipelineStep
                    step={2}
                    title="Mixed RL Training"
                    items={["Reasoning + Agent + Alignment in one stage"]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solution 3: Agentic Tasks */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <span className="text-2xl">3</span>
            </div>
            <h2 className="text-2xl font-bold">Large-Scale Agentic Task Synthesis</h2>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <TaskCard title="Code Agent" count="24,667" env="Real" prompt="Extracted" />
              <TaskCard title="Search Agent" count="50,275" env="Real" prompt="Synthesized" />
              <TaskCard title="General Agent" count="4,417" env="Synthesized" prompt="Synthesized" />
              <TaskCard title="Code Interpreter" count="5,908" env="Real" prompt="Extracted" />
            </div>

            <div className="bg-slate-800 rounded-xl p-6">
              <h4 className="font-semibold mb-4">Synthesis Pipeline</h4>
              <div className="space-y-4">
                <SynthesisStep
                  step={1}
                  title="Environment Construction"
                  description="Agent creates databases, retrieves data from web, builds sandbox environments"
                />
                <SynthesisStep
                  step={2}
                  title="Tool Synthesis"
                  description="Generates task-specific tools as Python functions"
                />
                <SynthesisStep
                  step={3}
                  title="Task Generation"
                  description="Creates verifiable tasks with solutions and verification functions"
                />
                <SynthesisStep
                  step={4}
                  title="Difficulty Scaling"
                  description="Iteratively increases complexity while maintaining verifiability"
                />
              </div>
            </div>

            {/* Thinking in Tool-Use */}
            <div className="mt-8 pt-8 border-t border-slate-700">
              <h4 className="font-semibold mb-4">Thinking Context Management</h4>
              <div className="bg-slate-800 rounded-xl p-6">
                <ThinkingDiagram />
              </div>
              <p className="text-slate-400 text-sm mt-4">
                Key insight: Reasoning traces are only discarded when a <span className="text-cyan-400">new user message</span> arrives,
                not on tool outputs. This prevents redundant re-reasoning.
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h2 className="text-2xl font-bold">Results</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Reasoning */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h4 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-4">Reasoning Benchmarks</h4>
              <div className="space-y-3">
                <BenchmarkBar label="AIME 2025" score={93.1} max={96} comparison="GPT-5: 94.6" />
                <BenchmarkBar label="HMMT Feb 2025" score={92.5} max={97.5} comparison="Gemini: 97.5" />
                <BenchmarkBar label="LiveCodeBench" score={83.3} max={90.7} comparison="Gemini: 90.7" />
                <BenchmarkBar label="Codeforces" score={2386} max={2708} isRating comparison="Gemini: 2708" />
              </div>
            </div>

            {/* Agentic */}
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4">Agentic Benchmarks</h4>
              <div className="space-y-3">
                <BenchmarkBar label="SWE-Verified" score={73.1} max={77.2} comparison="Claude: 77.2" color="cyan" />
                <BenchmarkBar label="Terminal Bench" score={46.4} max={54.2} comparison="Gemini: 54.2" color="cyan" />
                <BenchmarkBar label="τ²-Bench" score={80.3} max={85.4} comparison="Gemini: 85.4" color="cyan" />
                <BenchmarkBar label="Tool-Decathlon" score={35.2} max={38.6} comparison="Claude: 38.6" color="cyan" />
              </div>
            </div>
          </div>

          {/* Speciale */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">🏆</span>
              <h3 className="text-xl font-bold">DeepSeek-V3.2-Speciale</h3>
              <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs rounded-full">Extended Thinking</span>
            </div>

            <p className="text-slate-300 mb-6">
              By relaxing length constraints, Speciale achieves <span className="text-amber-400 font-semibold">gold medal performance</span> in:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MedalCard competition="IMO 2025" score="35/42" medal="Gold" />
              <MedalCard competition="CMO 2025" score="102/126" medal="Gold" />
              <MedalCard competition="IOI 2025" score="492/600" medal="Gold" />
              <MedalCard competition="ICPC WF 2025" score="10/12" medal="Gold" />
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <h2 className="text-2xl font-bold">Key Takeaways</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              number={1}
              title="Sparse Attention is Production-Ready"
              description="DSA maintains quality while dramatically reducing costs on long contexts. The lightning indexer + top-k selection pattern is elegant and efficient."
            />
            <TakeawayCard
              number={2}
              title="RL Compute Matters"
              description="Spending 10%+ of pre-training compute on RL post-training unlocks significant capability gains. Most open models underinvest here."
            />
            <TakeawayCard
              number={3}
              title="Synthetic Data Works"
              description="Automatically synthesized agentic tasks generalize to real-world benchmarks. Hard-to-solve, easy-to-verify tasks enable scalable RL."
            />
            <TakeawayCard
              number={4}
              title="Context Management for Agents"
              description="Keeping reasoning traces during tool calls (until new user message) prevents wasteful re-reasoning. Simple but high-impact."
            />
          </div>
        </section>

        {/* Limitations */}
        <section className="space-y-6 pb-12">
          <h3 className="text-lg font-semibold text-slate-400">Limitations</h3>
          <ul className="space-y-2 text-slate-500">
            <li className="flex items-start gap-3">
              <span className="text-red-400">•</span>
              <span>Less world knowledge than Gemini-3.0-Pro due to fewer pre-training FLOPs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400">•</span>
              <span>Token efficiency still lower - requires more tokens to match Gemini output quality</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-400">•</span>
              <span>Complex task performance still below frontier closed-source models</span>
            </li>
          </ul>
        </section>
      </main>
    </div>
  )
}

// Component Definitions

function ProblemCard({ number, title, description, icon, color }: {
  number: number
  title: string
  description: string
  icon: string
  color: "red" | "orange" | "yellow"
}) {
  const colors = {
    red: "from-red-500/10 to-red-500/5 border-red-500/20",
    orange: "from-orange-500/10 to-orange-500/5 border-orange-500/20",
    yellow: "from-yellow-500/10 to-yellow-500/5 border-yellow-500/20",
  }

  return (
    <div className={`bg-gradient-to-b ${colors[color]} border rounded-xl p-6`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs font-mono text-slate-500">#{number}</span>
      </div>
      <h3 className="font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}

function AttentionVisualization({ type }: { type: "dense" | "sparse" }) {
  const size = 8
  const tokens = Array.from({ length: size }, (_, i) => i)

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {tokens.map((row) =>
          tokens.map((col) => {
            const isActive = type === "dense"
              ? col <= row
              : col <= row && (col === row || col === 0 || col === row - 1 || Math.random() > 0.6)
            return (
              <div
                key={`${row}-${col}`}
                className={`w-4 h-4 rounded-sm transition-colors ${
                  isActive
                    ? type === "dense"
                      ? "bg-red-400/60"
                      : "bg-emerald-400/60"
                    : "bg-slate-700/30"
                }`}
              />
            )
          })
        )}
      </div>
      <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
        <span>← Keys</span>
        <span>Queries ↓</span>
      </div>
    </div>
  )
}

function DSAStep({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 text-center max-w-[200px]">
      <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 text-sm font-semibold">
        {step}
      </div>
      <h5 className="font-semibold text-sm text-slate-200 mb-1">{title}</h5>
      <p className="text-xs text-slate-400">{description}</p>
    </div>
  )
}

function Arrow() {
  return (
    <svg className="w-6 h-6 text-slate-600 shrink-0 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  )
}

function CostChart() {
  const positions = [0, 32, 64, 96, 128]
  const v31 = [0.1, 0.25, 0.4, 0.55, 0.7]
  const v32 = [0.1, 0.12, 0.14, 0.16, 0.18]

  return (
    <div className="relative h-48">
      {/* Y axis */}
      <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-slate-500">
        <span>$0.7</span>
        <span>$0.35</span>
        <span>$0</span>
      </div>

      {/* Chart area */}
      <div className="absolute left-14 right-0 top-0 bottom-8 border-l border-b border-slate-700">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          <div className="border-b border-slate-800 border-dashed" />
          <div className="border-b border-slate-800 border-dashed" />
        </div>

        {/* V3.1 Line */}
        <svg className="absolute inset-0 w-full h-full">
          <polyline
            points={v31.map((y, i) => `${(i / 4) * 100}%,${(1 - y) * 100}%`).join(" ")}
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
          />
        </svg>

        {/* V3.2 Line */}
        <svg className="absolute inset-0 w-full h-full">
          <polyline
            points={v32.map((y, i) => `${(i / 4) * 100}%,${(1 - y / 0.7) * 100}%`).join(" ")}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* X axis labels */}
      <div className="absolute left-14 right-0 bottom-0 flex justify-between text-xs text-slate-500">
        {positions.map(p => <span key={p}>{p}K</span>)}
      </div>

      {/* Legend */}
      <div className="absolute top-2 right-2 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-red-500" />
          <span className="text-slate-400">V3.1-Terminus</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-0.5 bg-emerald-500" />
          <span className="text-slate-400">V3.2 (DSA)</span>
        </div>
      </div>
    </div>
  )
}

function GRPOFeature({ title, description }: { title: string; description: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="w-5 h-5 rounded bg-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <span className="font-medium text-slate-200">{title}</span>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </li>
  )
}

function PipelineStep({ step, title, items }: { step: number; title: string; items: string[] }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-semibold shrink-0">
        {step}
      </div>
      <div>
        <h5 className="font-medium text-slate-200 text-sm">{title}</h5>
        <div className="flex flex-wrap gap-2 mt-1">
          {items.map(item => (
            <span key={item} className="px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-400">{item}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function TaskCard({ title, count, env, prompt }: { title: string; count: string; env: string; prompt: string }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <h5 className="font-semibold text-slate-200 mb-2">{title}</h5>
      <div className="text-2xl font-bold text-cyan-400 mb-2">{count}</div>
      <div className="flex gap-2 text-xs">
        <span className={`px-2 py-0.5 rounded ${env === "Real" ? "bg-emerald-500/20 text-emerald-400" : "bg-purple-500/20 text-purple-400"}`}>
          {env}
        </span>
        <span className={`px-2 py-0.5 rounded ${prompt === "Extracted" ? "bg-blue-500/20 text-blue-400" : "bg-orange-500/20 text-orange-400"}`}>
          {prompt}
        </span>
      </div>
    </div>
  )
}

function SynthesisStep({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm font-semibold shrink-0">
        {step}
      </div>
      <div>
        <h5 className="font-medium text-slate-200">{title}</h5>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
    </div>
  )
}

function ThinkingDiagram() {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-stretch">
      {/* Turn 1.1 */}
      <div className="flex-1 bg-slate-700/50 rounded-lg p-3 space-y-2">
        <div className="text-xs font-semibold text-slate-400">Turn 1.1</div>
        <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">User message 1</div>
        <div className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Thinking 1.1</div>
        <div className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">Tool call 1.1</div>
      </div>

      <svg className="w-6 h-6 text-slate-600 shrink-0 self-center hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>

      {/* Turn 1.2 */}
      <div className="flex-1 bg-slate-700/50 rounded-lg p-3 space-y-2">
        <div className="text-xs font-semibold text-slate-400">Turn 1.2</div>
        <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">User message 1</div>
        <div className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/50">Thinking 1.1 ✓</div>
        <div className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">Tool call 1.1</div>
        <div className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Tool result 1.1</div>
        <div className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Thinking 1.2</div>
      </div>

      <svg className="w-6 h-6 text-slate-600 shrink-0 self-center hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>

      {/* Turn 2.1 - New user message */}
      <div className="flex-1 bg-slate-700/50 rounded-lg p-3 space-y-2 border border-amber-500/30">
        <div className="text-xs font-semibold text-amber-400">Turn 2.1 (New User)</div>
        <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">User message 1</div>
        <div className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded">Tool call 1.1</div>
        <div className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded">Tool result 1.1</div>
        <div className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded line-through opacity-50">Thinking discarded</div>
        <div className="text-xs px-2 py-1 bg-amber-500/20 text-amber-400 rounded">User message 2</div>
      </div>
    </div>
  )
}

function BenchmarkBar({ label, score, max, isRating, comparison, color = "amber" }: {
  label: string
  score: number
  max: number
  isRating?: boolean
  comparison: string
  color?: "amber" | "cyan"
}) {
  const percentage = (score / max) * 100
  const colors = {
    amber: "bg-amber-500",
    cyan: "bg-cyan-500",
  }

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-400 text-xs">{comparison}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${colors[color]} rounded-full transition-all`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={`text-sm font-semibold ${color === "amber" ? "text-amber-400" : "text-cyan-400"}`}>
          {isRating ? score : `${score}%`}
        </span>
      </div>
    </div>
  )
}

function MedalCard({ competition, score, medal }: { competition: string; score: string; medal: string }) {
  return (
    <div className="bg-slate-800/50 rounded-xl p-4 text-center">
      <div className="text-2xl mb-2">🥇</div>
      <h5 className="font-semibold text-slate-200 text-sm">{competition}</h5>
      <div className="text-amber-400 font-bold mt-1">{score}</div>
      <div className="text-xs text-amber-500/70 mt-1">{medal}</div>
    </div>
  )
}

function TakeawayCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-semibold">
          {number}
        </div>
        <h4 className="font-semibold text-slate-200">{title}</h4>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
