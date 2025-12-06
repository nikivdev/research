import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/karpathy/nanochat")({
  component: NanoChatPage,
})

function NanoChatPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-600">/</span>
            <span className="text-pink-400 text-sm font-mono">repos/karpathy</span>
            <span className="text-slate-600">/</span>
            <h1 className="text-lg font-semibold">nanochat</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-500/10 border border-pink-500/20 rounded-2xl">
            <span className="text-4xl">🤖</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            NanoChat
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Full-stack LLM training in a minimal, hackable codebase
          </p>
          <p className="text-slate-500 max-w-3xl mx-auto">
            Train and deploy a ChatGPT-like model end-to-end on a single 8×H100 node for ~$100-$800.
            Includes tokenization, pretraining, midtraining, SFT, optional RL, evaluation, and web serving.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-400">~8000 lines</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-400">~4 hours training</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-400">561M params</span>
          </div>
        </section>

        {/* Training Pipeline */}
        <section className="space-y-8">
          <SectionHeader icon="🔄" title="Training Pipeline" />

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <PipelineStep icon="📝" title="Tokenizer" subtitle="RustBPE, 65K vocab" />
              <PipelineArrow />
              <PipelineStep icon="📚" title="Base Pretrain" subtitle="FineWeb-Edu 11B tokens" />
              <PipelineArrow />
              <PipelineStep icon="💬" title="Midtrain" subtitle="Conversation structure" />
              <PipelineArrow />
              <PipelineStep icon="🎯" title="SFT" subtitle="Task finetuning" />
              <PipelineArrow />
              <PipelineStep icon="🌐" title="Serve" subtitle="FastAPI + Web UI" />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700 grid md:grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="text-pink-400 font-semibold">~1 hour</div>
                <div className="text-slate-500">Base training</div>
              </div>
              <div>
                <div className="text-pink-400 font-semibold">~30 min</div>
                <div className="text-slate-500">Midtraining</div>
              </div>
              <div>
                <div className="text-pink-400 font-semibold">~30 min</div>
                <div className="text-slate-500">SFT</div>
              </div>
              <div>
                <div className="text-pink-400 font-semibold">~$100</div>
                <div className="text-slate-500">8×H100 cost</div>
              </div>
            </div>
          </div>
        </section>

        {/* Model Architecture */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Model Architecture" subtitle="Modern, minimal Transformer" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Architecture Choices</h3>
              <div className="space-y-3">
                <ArchFeature
                  name="Rotary Embeddings"
                  description="Relative positional encoding, no absolute position embeddings"
                />
                <ArchFeature
                  name="RMSNorm (no params)"
                  description="Purely functional normalization, no learnable scale/bias"
                />
                <ArchFeature
                  name="QK Norm"
                  description="Query and key normalization in attention"
                />
                <ArchFeature
                  name="ReLU² MLP"
                  description="Uses relu(x).square() instead of GELU"
                />
                <ArchFeature
                  name="Untied Embeddings"
                  description="Separate wte (token) and lm_head (output)"
                />
                <ArchFeature
                  name="Logits Softcap"
                  description="tanh-based capping at 15 for stability"
                />
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Model Sizing</h3>
              <CodeBlock code={`# Sizing formula (depth d20 = 561M params)
num_layers = depth        # 20
model_dim = depth × 64    # 1280
num_heads = ceil(dim/128) # 10

# Sequence length
seq_len = 2048 tokens

# Vocab size
vocab = 65536 (2^16)`} />

              <div className="mt-4 pt-4 border-t border-slate-700">
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Optimizers</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Linear layers</span>
                    <span className="text-pink-400">Muon (LR=0.02)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Embeddings</span>
                    <span className="text-pink-400">AdamW (LR=0.2)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">LM Head</span>
                    <span className="text-pink-400">AdamW (LR=0.004)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenization */}
        <section className="space-y-8">
          <SectionHeader icon="📝" title="Tokenization" subtitle="RustBPE + Special Tokens" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">RustBPE Tokenizer</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Implemented in Rust for speed</li>
                <li>• GPT-4 style pre-tokenization</li>
                <li>• Numbers: 1-2 digits max (modified from GPT-4's 1-3)</li>
                <li>• Vocab size: 65,536 tokens</li>
                <li>• Tiktoken wrapper for inference</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Special Tokens</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Token name="<|bos|>" desc="Document start" />
                <Token name="<|user_start|>" desc="User message" />
                <Token name="<|user_end|>" desc="User end" />
                <Token name="<|assistant_start|>" desc="Assistant" />
                <Token name="<|assistant_end|>" desc="Assistant end" />
                <Token name="<|python_start|>" desc="Tool call" />
                <Token name="<|python_end|>" desc="Tool end" />
                <Token name="<|output_start|>" desc="Tool output" />
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Conversation Rendering</h3>
            <p className="text-sm text-slate-400 mb-4">
              Conversations are tokenized with attention masks that control which tokens the model learns on.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <MaskCard role="User" mask={0} color="blue" />
              <MaskCard role="Assistant" mask={1} color="pink" />
              <MaskCard role="Tool Output" mask={0} color="amber" />
            </div>
          </div>
        </section>

        {/* Training Phases */}
        <section className="space-y-8">
          <SectionHeader icon="📚" title="Training Phases" />

          {/* Base Pretraining */}
          <PhaseCard
            phase={1}
            title="Base Pretraining"
            script="scripts/base_train.py"
            color="blue"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Data</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• FineWeb-Edu 100B dataset</li>
                  <li>• ~240 parquet shards (~24GB)</li>
                  <li>• 11.2B tokens for d20 model</li>
                  <li>• Chinchilla ratio: 20× params</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Config</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Batch: 524,288 tokens</li>
                  <li>• Seq length: 2048</li>
                  <li>• Gradient accumulation: auto</li>
                  <li>• Mixed precision: bfloat16</li>
                </ul>
              </div>
            </div>
          </PhaseCard>

          {/* Midtraining */}
          <PhaseCard
            phase={2}
            title="Midtraining"
            script="scripts/mid_train.py"
            color="purple"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Purpose</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Learn conversation structure</li>
                  <li>• Special token usage</li>
                  <li>• Tool scaffolding</li>
                  <li>• Multiple-choice format</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Data Mix</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• SmolTalk (460K conversations)</li>
                  <li>• MMLU auxiliary (100K MC)</li>
                  <li>• GSM8K (math with tool tags)</li>
                  <li>• Identity conversations</li>
                </ul>
              </div>
            </div>
          </PhaseCard>

          {/* SFT */}
          <PhaseCard
            phase={3}
            title="Supervised Finetuning"
            script="scripts/chat_sft.py"
            color="pink"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Purpose</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Domain/behavior adaptation</li>
                  <li>• Task-specific supervision</li>
                  <li>• Lower learning rate (2% of base)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Data (~23K rows)</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• ARC-Easy/Challenge</li>
                  <li>• GSM8K train</li>
                  <li>• SmolTalk subset (10K)</li>
                  <li>• Spelling drills</li>
                </ul>
              </div>
            </div>
          </PhaseCard>

          {/* RL (Optional) */}
          <PhaseCard
            phase={4}
            title="Reinforcement Learning (Optional)"
            script="scripts/chat_rl.py"
            color="amber"
            optional
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Algorithm</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• GRPO-like REINFORCE</li>
                  <li>• Token-level advantages</li>
                  <li>• Mean baseline</li>
                  <li>• No KL penalty</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-slate-300 mb-2">Scope</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• GSM8K math problems only</li>
                  <li>• Samples k completions</li>
                  <li>• Optimizes for correct answers</li>
                </ul>
              </div>
            </div>
          </PhaseCard>
        </section>

        {/* Inference Engine */}
        <section className="space-y-8">
          <SectionHeader icon="⚡" title="Inference Engine" subtitle="Streaming generation with KV cache" />

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">KV Cache</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Maintains keys/values per layer</li>
                  <li>• Dynamic growth (1024-token chunks)</li>
                  <li>• Batch prefill → replicate for N samples</li>
                  <li>• Position tracking for RoPE offset</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Sampling</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Temperature-based softmax</li>
                  <li>• Top-k filtering</li>
                  <li>• Greedy when temperature=0</li>
                  <li>• Streaming token generation</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <h3 className="font-semibold text-lg mb-4">Tool Use: Python Calculator</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">How it works</h4>
                  <ol className="text-sm text-slate-400 space-y-1 list-decimal list-inside">
                    <li>Detect <code className="text-pink-400">{`<|python_start|>`}</code></li>
                    <li>Extract expression until <code className="text-pink-400">{`<|python_end|>`}</code></li>
                    <li>Evaluate safely with timeout</li>
                    <li>Inject <code className="text-pink-400">{`<|output_*|>`}</code> tokens</li>
                  </ol>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 mb-2">Safety</h4>
                  <ul className="text-sm text-slate-400 space-y-1">
                    <li>• Allowed: +, -, *, /, (), .count()</li>
                    <li>• Blocked: __, import, exec, eval</li>
                    <li>• 3 second timeout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Web Serving */}
        <section className="space-y-8">
          <SectionHeader icon="🌐" title="Web Serving" subtitle="FastAPI + ChatGPT-like UI" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Backend (FastAPI)</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Worker pool across GPUs</li>
                <li>• Async request handling</li>
                <li>• Queue-based distribution</li>
                <li>• OpenAI-compatible API</li>
              </ul>

              <div className="mt-4 pt-4 border-t border-slate-700">
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Endpoints</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <code className="text-slate-400">GET /</code>
                    <span className="text-slate-500">Chat UI</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-slate-400">POST /chat/completions</code>
                    <span className="text-slate-500">Streaming API</span>
                  </div>
                  <div className="flex justify-between">
                    <code className="text-slate-400">GET /health</code>
                    <span className="text-slate-500">Status</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Abuse Prevention</h3>
              <div className="space-y-2 text-sm">
                <LimitRow label="Max messages" value="500" />
                <LimitRow label="Max chars/message" value="8,000" />
                <LimitRow label="Max total chars" value="32,000" />
                <LimitRow label="Temperature" value="0.0 - 2.0" />
                <LimitRow label="Top-k" value="1 - 200" />
                <LimitRow label="Max tokens" value="1 - 4,096" />
              </div>
            </div>
          </div>
        </section>

        {/* Evaluation */}
        <section className="space-y-8">
          <SectionHeader icon="📊" title="Evaluation" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Base Model Eval</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• CORE metric (Chinchilla benchmark)</li>
                <li>• Bits per byte on validation</li>
                <li>• Sampling/generation tests</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Chat Model Eval</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• ARC-Easy/Challenge (MC accuracy)</li>
                <li>• MMLU (multi-domain MC)</li>
                <li>• GSM8K (math problems)</li>
                <li>• HumanEval (Python code)</li>
                <li>• SpellingBee (letter counting)</li>
                <li>• ChatCORE (mean-centered accuracy)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Management */}
        <section className="space-y-8">
          <SectionHeader icon="📦" title="Data & Tasks" />

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Task Framework</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <TaskType
                name="Task"
                description="Base class with indexing, slicing, evaluation"
              />
              <TaskType
                name="TaskMixture"
                description="Combines tasks with deterministic shuffling"
              />
              <TaskType
                name="TaskSequence"
                description="Sequential curriculum learning"
              />
            </div>

            <h4 className="font-semibold text-sm text-slate-300 mb-3">Available Tasks</h4>
            <div className="flex flex-wrap gap-2">
              {["MMLU", "ARC", "GSM8K", "HumanEval", "SmolTalk", "CustomJSON", "SpellingBee", "SimpleSpelling"].map(t => (
                <span key={t} className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Distributed Training */}
        <section className="space-y-8">
          <SectionHeader icon="🔧" title="Distributed Training" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">PyTorch DDP</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Multi-GPU training</li>
                <li>• Rank-based work distribution</li>
                <li>• Barrier synchronization</li>
                <li>• Master rank handles checkpointing</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Compilation</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• <code className="text-pink-400">torch.compile()</code></li>
                <li>• dynamic=False for base (static shapes)</li>
                <li>• dynamic=True for SFT (variable lengths)</li>
                <li>• ~2-3x speedup</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Speedrun */}
        <section className="space-y-8">
          <SectionHeader icon="🏃" title="speedrun.sh" subtitle="End-to-end in ~4 hours" />

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <div className="space-y-4">
              <SpeedrunStep step={1} title="Setup" description="Create venv, install dependencies" />
              <SpeedrunStep step={2} title="Tokenizer" description="Build RustBPE, download 8 shards, train vocab=65536" />
              <SpeedrunStep step={3} title="Base Training" description="Download 240 shards, pretrain d20 (561M params, 11.2B tokens)" />
              <SpeedrunStep step={4} title="Midtraining" description="Download identity data, train on task mixture" />
              <SpeedrunStep step={5} title="SFT" description="Train on chat-style tasks" />
              <SpeedrunStep step={6} title="Report" description="Generate markdown report card" />
              <SpeedrunStep step={7} title="Serve" description="python -m scripts.chat_web" optional />
            </div>
          </div>

          <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6">
            <h4 className="font-semibold text-pink-400 mb-2">Artifacts Location</h4>
            <code className="text-sm text-slate-400">~/.cache/nanochat/</code>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-slate-500">
              <span>tokenizer/</span>
              <span>base_data/</span>
              <span>base_checkpoints/</span>
              <span>mid_checkpoints/</span>
              <span>chatsft_checkpoints/</span>
              <span>report/</span>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💡" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Minimal but complete"
              description="~8000 lines covering tokenization, pretraining, SFT, RL, inference, and web serving. Easy to fork and customize."
            />
            <TakeawayCard
              title="Type-specific optimizers"
              description="Muon for linear layers, AdamW for embeddings. Different learning rates per parameter type."
            />
            <TakeawayCard
              title="Selective loss masking"
              description="Only train on assistant/tool tokens. User input and tool outputs are masked (loss=0)."
            />
            <TakeawayCard
              title="Tool use via state machine"
              description="Python calculator integrated into generation. Parses <|python_*|> blocks and injects results."
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

function ArchFeature({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-slate-800 rounded-lg p-3">
      <div className="font-semibold text-sm text-pink-400">{name}</div>
      <div className="text-xs text-slate-400">{description}</div>
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

function Token({ name, desc }: { name: string; desc: string }) {
  return (
    <div className="bg-slate-800 rounded p-2">
      <code className="text-pink-400 text-xs">{name}</code>
      <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
    </div>
  )
}

function MaskCard({ role, mask, color }: { role: string; mask: number; color: string }) {
  const colors: Record<string, string> = {
    blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    pink: "bg-pink-500/10 border-pink-500/20 text-pink-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  }
  return (
    <div className={`${colors[color]} border rounded-lg p-4 text-center`}>
      <div className="font-semibold">{role}</div>
      <div className="text-sm text-slate-400 mt-1">mask = {mask}</div>
      <div className="text-xs text-slate-500 mt-1">
        {mask === 1 ? "Loss applied" : "No loss"}
      </div>
    </div>
  )
}

function PhaseCard({ phase, title, script, color, optional, children }: {
  phase: number
  title: string
  script: string
  color: string
  optional?: boolean
  children: React.ReactNode
}) {
  const colors: Record<string, string> = {
    blue: "border-blue-500/20",
    purple: "border-purple-500/20",
    pink: "border-pink-500/20",
    amber: "border-amber-500/20",
  }
  const badgeColors: Record<string, string> = {
    blue: "bg-blue-500/20 text-blue-400",
    purple: "bg-purple-500/20 text-purple-400",
    pink: "bg-pink-500/20 text-pink-400",
    amber: "bg-amber-500/20 text-amber-400",
  }

  return (
    <div className={`bg-slate-900 rounded-2xl p-6 border ${colors[color]}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`w-8 h-8 rounded-full ${badgeColors[color]} flex items-center justify-center text-sm font-semibold`}>
          {phase}
        </span>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <code className="text-xs text-slate-500">{script}</code>
        </div>
        {optional && (
          <span className="px-2 py-0.5 bg-slate-700 text-slate-400 text-xs rounded-full ml-auto">optional</span>
        )}
      </div>
      {children}
    </div>
  )
}

function LimitRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-400">{label}</span>
      <span className="text-pink-400 font-mono">{value}</span>
    </div>
  )
}

function TaskType({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="font-semibold text-pink-400">{name}</div>
      <div className="text-xs text-slate-400 mt-1">{description}</div>
    </div>
  )
}

function SpeedrunStep({ step, title, description, optional }: { step: number; title: string; description: string; optional?: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm font-semibold shrink-0">
        {step}
      </span>
      <div>
        <div className="font-semibold text-slate-200 flex items-center gap-2">
          {title}
          {optional && <span className="text-xs text-slate-500">(optional)</span>}
        </div>
        <div className="text-sm text-slate-400">{description}</div>
      </div>
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
