import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/ryanssenn/torchless")({
  component: TorchlessPage,
})

function TorchlessPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-600">/</span>
            <span className="text-orange-400 text-sm font-mono">repos/ryanssenn</span>
            <span className="text-slate-600">/</span>
            <h1 className="text-lg font-semibold">torchless</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
            <span className="text-4xl">🔥</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
            Torchless
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            LLM inference engine built from scratch in C++
          </p>
          <p className="text-slate-500 max-w-3xl mx-auto">
            A custom-built inference engine that runs Mistral 7B on CPU without PyTorch or any ML frameworks.
            Hand-coded transformer implementation with full tokenizer, quantization, and inference pipeline.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-400">~1200 lines C++</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-400">CPU-only</span>
            <span className="px-3 py-1 bg-slate-800 rounded-full text-slate-400">INT8 quantization</span>
          </div>
        </section>

        {/* What Makes It Special */}
        <section className="space-y-8">
          <SectionHeader icon="✨" title="Why Torchless?" subtitle="Understanding LLMs from first principles" />

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              title="Zero Dependencies"
              description="No PyTorch, TensorFlow, or ONNX. Every operation hand-coded in C++ with OpenMP for parallelization."
              color="orange"
            />
            <FeatureCard
              title="Educational Focus"
              description="Clear, readable implementation of every transformer component. Perfect for understanding how LLMs actually work."
              color="red"
            />
            <FeatureCard
              title="Full Pipeline"
              description="Complete from model export to text generation. Includes tokenizer, quantization, and inference."
              color="yellow"
            />
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Architecture" subtitle="End-to-end inference pipeline" />

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <PipelineStep icon="📦" title="Model Export" subtitle="HF → Binary" />
              <PipelineArrow />
              <PipelineStep icon="📝" title="Tokenizer" subtitle="BPE encoding" />
              <PipelineArrow />
              <PipelineStep icon="🧠" title="Transformer" subtitle="32 layers" />
              <PipelineArrow />
              <PipelineStep icon="🎲" title="Sampling" subtitle="Token generation" />
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700 grid md:grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="text-orange-400 font-semibold">Mistral 7B</div>
                <div className="text-slate-500">Target model</div>
              </div>
              <div>
                <div className="text-orange-400 font-semibold">32 layers</div>
                <div className="text-slate-500">Transformer depth</div>
              </div>
              <div>
                <div className="text-orange-400 font-semibold">4096 dim</div>
                <div className="text-slate-500">Hidden size</div>
              </div>
              <div>
                <div className="text-orange-400 font-semibold">8 KV heads</div>
                <div className="text-slate-500">GQA groups</div>
              </div>
            </div>
          </div>
        </section>

        {/* Model Export */}
        <section className="space-y-8">
          <SectionHeader icon="📦" title="Model Export Pipeline" subtitle="Converting Hugging Face models to binary" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Export Process</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Load model from Hugging Face safetensors</li>
                <li>• Extract config, vocabulary, and BPE merges</li>
                <li>• Apply optional INT8 quantization</li>
                <li>• Package into single binary file</li>
                <li>• Memory-mapped loading for efficiency</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Binary Format</h3>
              <CodeBlock code={`[8-byte header size]
[JSON header]
  - config (dims, layers, heads)
  - vocab (token → id mapping)
  - merges (BPE merge rules)
  - tensor offsets
[Padded tensor payload]
  - weights (f32 or int8)
  - quantization scales`} />
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Quantization Strategy</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Per-Group Symmetric Quantization</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Group size: 64 values</li>
                  <li>• Scale computed per group</li>
                  <li>• Maps to INT8 range [-127, 127]</li>
                  <li>• On-the-fly dequantization during matmul</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Memory Savings</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Float32: 4 bytes/param</li>
                  <li>• INT8: ~1 byte/param + scales</li>
                  <li>• ~4x reduction in model size</li>
                  <li>• Faster memory bandwidth</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tokenizer */}
        <section className="space-y-8">
          <SectionHeader icon="📝" title="Tokenization" subtitle="Byte-Pair Encoding from scratch" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">BPE Implementation</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Full BPE encoder/decoder</li>
                <li>• Loads vocab and merge rules from tokenizer.json</li>
                <li>• Mistral-specific pre-tokenization (Metaspace)</li>
                <li>• Byte fallback for unknown characters</li>
                <li>• ~209 lines of implementation</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Tokenization Flow</h3>
              <div className="space-y-3">
                <FlowStep step={1} text="Split text by whitespace/punctuation" />
                <FlowStep step={2} text="Convert each word to bytes" />
                <FlowStep step={3} text="Apply BPE merges iteratively" />
                <FlowStep step={4} text="Map tokens to vocabulary IDs" />
              </div>
            </div>
          </div>
        </section>

        {/* Transformer Components */}
        <section className="space-y-8">
          <SectionHeader icon="🧠" title="Transformer Implementation" subtitle="Every layer hand-coded in C++" />

          <div className="grid md:grid-cols-2 gap-6">
            <ComponentCard
              name="Embedding"
              description="Token ID lookup in embedding table. Maps 32K vocab to 4096-dim vectors."
              lines={15}
            />
            <ComponentCard
              name="RMSNorm"
              description="Root Mean Square normalization. Simpler and faster than LayerNorm."
              lines={20}
            />
            <ComponentCard
              name="RoPE"
              description="Rotary Position Embeddings. Encodes position through rotation in complex plane."
              lines={35}
            />
            <ComponentCard
              name="Attention"
              description="Multi-head Grouped-Query Attention with KV cache. 32 query heads, 8 KV heads."
              lines={60}
            />
            <ComponentCard
              name="MLP"
              description="SwiGLU feedforward: gate * silu(up) projection with 14336 intermediate dim."
              lines={25}
            />
            <ComponentCard
              name="LM Head"
              description="Project final hidden state to vocabulary logits for next token prediction."
              lines={10}
            />
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Grouped-Query Attention (GQA)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">How GQA Works</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• 32 query heads with 128-dim each</li>
                  <li>• 8 key-value head pairs (shared)</li>
                  <li>• Reuse factor: 4 query heads per KV pair</li>
                  <li>• Reduces KV cache memory by 4x</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">KV Cache Optimization</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  <li>• Stores K/V across sequence positions</li>
                  <li>• Avoids recalculating for past tokens</li>
                  <li>• Critical for efficient generation</li>
                  <li>• Managed in InferenceState struct</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Computational Kernels */}
        <section className="space-y-8">
          <SectionHeader icon="⚡" title="CPU Kernels" subtitle="Optimized math operations" />

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <div className="grid md:grid-cols-3 gap-4">
              <KernelCard name="matmul" description="Matrix multiplication with quantization support" />
              <KernelCard name="row_matmul" description="Row-wise matmul for attention scores" />
              <KernelCard name="softmax" description="Temperature-aware with numerical stability" />
              <KernelCard name="rope" description="Rotary embeddings application" />
              <KernelCard name="silu" description="SiLU activation: x * sigmoid(x)" />
              <KernelCard name="element_ops" description="Add, multiply, power, sqrt" />
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Optimization Features</h4>
              <div className="flex flex-wrap gap-2">
                <Tag text="OpenMP parallelization" />
                <Tag text="Loop unrolling" />
                <Tag text="Cache-friendly access patterns" />
                <Tag text="On-the-fly dequantization" />
              </div>
            </div>
          </div>
        </section>

        {/* Inference State */}
        <section className="space-y-8">
          <SectionHeader icon="🗂️" title="Inference State Management" subtitle="Pre-allocated memory for zero-copy inference" />

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">InferenceState Structure</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Hidden states and residuals</li>
                  <li>• Query/Key/Value projections</li>
                  <li>• Attention scores and context</li>
                  <li>• MLP intermediate activations</li>
                  <li>• Output logits and probabilities</li>
                  <li>• KV cache per layer</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Memory Management</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li>• Arena allocator (256 MB)</li>
                  <li>• Zero-copy tensor views</li>
                  <li>• Memory-mapped model file</li>
                  <li>• Single token processing (batch=1)</li>
                  <li>• Reused buffers across tokens</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Inference Loop */}
        <section className="space-y-8">
          <SectionHeader icon="🔄" title="Inference Lifecycle" subtitle="How text generation works" />

          <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800">
            <div className="space-y-6">
              <InferenceStep
                step={1}
                title="Loading"
                description="Memory-map binary file, parse JSON header, create tensor views"
              />
              <InferenceStep
                step={2}
                title="Tokenization"
                description="Convert input text to token IDs using BPE encoding"
              />
              <InferenceStep
                step={3}
                title="Transformer Forward"
                description="Process through 32 layers: Embed → (RMSNorm → Attention → MLP) × 32 → Final Norm → LM Head"
              />
              <InferenceStep
                step={4}
                title="Sampling"
                description="Apply softmax to logits, sample next token (greedy or multinomial)"
              />
              <InferenceStep
                step={5}
                title="Auto-regressive"
                description="Append token, update KV cache, repeat from step 3"
              />
            </div>
          </div>
        </section>

        {/* Single Layer Detail */}
        <section className="space-y-8">
          <SectionHeader icon="🔬" title="Single Transformer Layer" subtitle="Inside one of 32 layers" />

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <div className="flex flex-col gap-4">
              <LayerBlock name="Input Hidden State" type="input" />
              <Arrow />
              <LayerBlock name="RMSNorm (pre-attention)" type="norm" />
              <Arrow />
              <LayerBlock name="Q/K/V Projection → RoPE → Attention → Output Proj" type="attention" />
              <Arrow />
              <LayerBlock name="Residual Add" type="residual" />
              <Arrow />
              <LayerBlock name="RMSNorm (pre-MLP)" type="norm" />
              <Arrow />
              <LayerBlock name="Gate↑ × SiLU(Up↑) → Down↓ (SwiGLU MLP)" type="mlp" />
              <Arrow />
              <LayerBlock name="Residual Add → Output Hidden State" type="residual" />
            </div>
          </div>
        </section>

        {/* Usage */}
        <section className="space-y-8">
          <SectionHeader icon="💻" title="Usage" subtitle="Building and running" />

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Export Model</h3>
            <CodeBlock code={`python3 export_mistral.py \\
  --model_dir ../Mistral-7B-v0.1 \\
  --out ./mistral.bin \\
  --quant f32  # or int8`} />
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Build & Run</h3>
            <CodeBlock code={`# Compile
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
cmake --build .

# Run inference
./torchless ../mistral.bin "Paris is the capital of"`} />
          </div>
        </section>

        {/* Code Organization */}
        <section className="space-y-8">
          <SectionHeader icon="📁" title="Code Structure" />

          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-4">Source Files</h3>
                <div className="space-y-2 text-sm">
                  <FileRow path="src/tokenizer/" desc="BPE tokenizer (209 lines)" />
                  <FileRow path="src/model/mistral/" desc="Transformer modules (181 lines)" />
                  <FileRow path="src/backend/cpu/" desc="Math kernels (154 lines)" />
                  <FileRow path="src/loader/" desc="Model loading (157 lines)" />
                  <FileRow path="src/common/" desc="Tensor infrastructure (107 lines)" />
                  <FileRow path="main.cpp" desc="Inference entry point" />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-4">Python Scripts</h3>
                <div className="space-y-2 text-sm">
                  <FileRow path="export_mistral.py" desc="HF to binary converter" />
                  <FileRow path="parity/" desc="Component validation tests" />
                </div>

                <h3 className="font-semibold text-lg mt-6 mb-4">Build</h3>
                <div className="space-y-2 text-sm">
                  <FileRow path="CMakeLists.txt" desc="CMake configuration" />
                  <FileRow path="requirements.txt" desc="Python dependencies" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Roadmap */}
        <section className="space-y-8">
          <SectionHeader icon="🚀" title="Development Focus" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Current Work</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Performance optimization</li>
                <li>• CPU SIMD vectorization</li>
                <li>• Custom CUDA kernels</li>
                <li>• Mistral 3 architecture support</li>
              </ul>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Planned Features</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li>• Temperature scaling for sampling</li>
                <li>• CPU multithreading optimization</li>
                <li>• Chat/conversation interface</li>
                <li>• Ministral 3 3B support</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💡" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Framework-free inference"
              description="Demonstrates that ML frameworks are conveniences, not requirements. Every operation can be implemented directly."
            />
            <TakeawayCard
              title="Zero-copy architecture"
              description="Memory-mapped files and tensor views eliminate data copying. Model weights accessed directly from disk."
            />
            <TakeawayCard
              title="Quantization from scratch"
              description="Per-group INT8 quantization with on-the-fly dequantization. Understand exactly how model compression works."
            />
            <TakeawayCard
              title="Educational codebase"
              description="~1200 lines of readable C++ covering the complete inference pipeline. Great for learning transformer internals."
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

function FeatureCard({ title, description, color }: { title: string; description: string; color: string }) {
  const colors: Record<string, string> = {
    orange: "bg-orange-500/10 border-orange-500/20",
    red: "bg-red-500/10 border-red-500/20",
    yellow: "bg-yellow-500/10 border-yellow-500/20",
  }
  return (
    <div className={`${colors[color]} border rounded-2xl p-6`}>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-slate-400">{description}</p>
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

function FlowStep({ step, text }: { step: number; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-xs font-semibold">
        {step}
      </span>
      <span className="text-sm text-slate-400">{text}</span>
    </div>
  )
}

function ComponentCard({ name, description, lines }: { name: string; description: string; lines: number }) {
  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-orange-400">{name}</h4>
        <span className="text-xs text-slate-500">~{lines} lines</span>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}

function KernelCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <code className="text-orange-400 text-sm">{name}</code>
      <p className="text-xs text-slate-500 mt-1">{description}</p>
    </div>
  )
}

function Tag({ text }: { text: string }) {
  return (
    <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400">{text}</span>
  )
}

function InferenceStep({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center text-sm font-semibold shrink-0">
        {step}
      </span>
      <div>
        <div className="font-semibold text-slate-200">{title}</div>
        <div className="text-sm text-slate-400">{description}</div>
      </div>
    </div>
  )
}

function LayerBlock({ name, type }: { name: string; type: string }) {
  const colors: Record<string, string> = {
    input: "bg-slate-800 border-slate-700",
    norm: "bg-blue-500/10 border-blue-500/20",
    attention: "bg-orange-500/10 border-orange-500/20",
    mlp: "bg-purple-500/10 border-purple-500/20",
    residual: "bg-green-500/10 border-green-500/20",
  }
  return (
    <div className={`${colors[type]} border rounded-lg p-3 text-center text-sm`}>
      {name}
    </div>
  )
}

function Arrow() {
  return (
    <div className="flex justify-center">
      <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
  )
}

function FileRow({ path, desc }: { path: string; desc: string }) {
  return (
    <div className="flex justify-between">
      <code className="text-orange-400 text-xs">{path}</code>
      <span className="text-slate-500 text-xs">{desc}</span>
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
