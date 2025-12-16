import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/explain/ml/transformer")({
  component: TransformerExplainPage,
})

function TransformerExplainPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">
              <span role="img" aria-label="home">🏡</span>
            </Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-emerald-600 dark:text-emerald-400 text-sm font-mono">explain/ml</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">transformer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        {/* Title Section */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-600 dark:text-emerald-400 text-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            "Attention Is All You Need" (2017)
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
            The Transformer Architecture
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
            A deep dive into every component: from positional encoding to multi-head attention to the full encoder block
          </p>
          <p className="text-slate-500 dark:text-slate-500">Vaswani et al. • Google Brain • 2017</p>
        </section>

        {/* Overview */}
        <section className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-8">
          <h2 className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-4">Overview</h2>
          <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
            The Transformer revolutionized NLP by replacing recurrence with <span className="text-emerald-600 dark:text-emerald-400 font-semibold">self-attention</span>.
            Every token can attend to every other token in parallel, enabling massive speedups on GPUs/TPUs.
            This page breaks down all 6 core components that build up to a complete encoder block.
          </p>
        </section>

        {/* Architecture Overview */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Architecture Overview" subtitle="The 6 building blocks" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col items-center space-y-4 font-mono text-sm">
              <ArchBlock label="6. Transformer Forward Pass" color="purple" description="Complete encoder block" />
              <Arrow />
              <div className="flex gap-4">
                <ArchBlock label="5. Layer Normalization" color="cyan" description="Stabilize activations" />
                <ArchBlock label="FFN" color="orange" description="Position-wise MLP" />
              </div>
              <Arrow />
              <ArchBlock label="4. Multi-Head Attention" color="blue" description="h parallel attention heads" />
              <Arrow />
              <ArchBlock label="3. Single Attention Head" color="emerald" description="Q, K, V projections" />
              <Arrow />
              <ArchBlock label="2. Scaled Dot-Product Attention" color="amber" description="softmax(QK^T/√d_k)V" />
              <Arrow />
              <ArchBlock label="1. Positional Encoding" color="red" description="sin/cos position info" />
            </div>
          </div>
        </section>

        {/* Task 1: Positional Encoding */}
        <section className="space-y-8">
          <SectionHeader icon="1" title="Positional Encoding" subtitle="Injecting sequence order" />

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">The Problem</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Transformers process all tokens in parallel with no recurrence or convolution.
              "The cat sat on the mat" and "mat the on sat cat the" would look identical without position information.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">The Formula</h3>
            <CodeBlock code={`PE(pos, 2i)   = sin(pos / 10000^(2i/d_model))
PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))

- Even dimensions: sine
- Odd dimensions: cosine
- Low dimensions: high frequency (short wavelengths)
- High dimensions: low frequency (long wavelengths)`} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              title="Bounded [-1, 1]"
              description="No exploding values - sine and cosine are always bounded"
              icon="📏"
            />
            <FeatureCard
              title="Unique per Position"
              description="Each position gets a distinct encoding fingerprint"
              icon="🔑"
            />
            <FeatureCard
              title="Relative Positions Learnable"
              description="PE(pos+k) is a linear function of PE(pos)"
              icon="↔️"
            />
            <FeatureCard
              title="Extrapolation"
              description="Works for sequences longer than training data"
              icon="📈"
            />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Implementation</h3>
            <CodeBlock code={`def positional_encoding(seq_len: int, d_model: int) -> np.ndarray:
    # Position indices: (seq_len, 1)
    pos = np.arange(seq_len, dtype=np.float32)[:, np.newaxis]

    # Dimension indices for even positions: 0, 2, 4, ...
    i = np.arange(0, d_model, 2, dtype=np.float32)

    # Division term: 1/10000^(2i/d_model)
    # Using exp/log for numerical stability
    div_term = np.exp(-i * np.log(10000.0) / d_model)

    pe = np.zeros((seq_len, d_model), dtype=np.float32)
    pe[:, 0::2] = np.sin(pos * div_term)  # even indices
    pe[:, 1::2] = np.cos(pos * div_term)  # odd indices
    return pe`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Example Output</h3>
            <CodeBlock code={`pe = positional_encoding(seq_len=4, d_model=4)

# Position 0: [sin(0), cos(0), sin(0), cos(0)] = [0, 1, 0, 1]
# Position 1: [0.84, 0.54, 0.01, 1.0]
#              ↑ high freq changes fast   ↑ low freq changes slowly`} />
          </div>
        </section>

        {/* Task 2: Scaled Dot-Product Attention */}
        <section className="space-y-8">
          <SectionHeader icon="2" title="Scaled Dot-Product Attention" subtitle="The heart of the Transformer" />

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Core Intuition</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              This is where tokens "talk" to each other. Each query asks "what should I pay attention to?",
              keys answer "here's what I contain", and values provide "here's the information I'll give you".
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4 text-center">The Formula</h3>
            <div className="text-center text-2xl font-mono text-amber-600 dark:text-amber-400 mb-4">
              Attention(Q, K, V) = softmax(QK<sup>T</sup> / √d<sub>k</sub>) · V
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Step-by-Step Data Flow</h3>
            <div className="space-y-4">
              <StepCard
                step={1}
                title="Compute Similarity Scores"
                description="QK^T: (batch, seq_q, d_k) @ (batch, d_k, seq_k) → (batch, seq_q, seq_k)"
                detail="scores[i][j] = how much query_i should attend to key_j"
                color="amber"
              />
              <StepCard
                step={2}
                title="Scale by √d_k"
                description="Large d_k → large dot products → softmax becomes peaked (near one-hot)"
                detail="Scaling prevents gradient vanishing in softmax's flat regions"
                color="amber"
              />
              <StepCard
                step={3}
                title="Apply Mask (optional)"
                description="Add -1e9 to positions that shouldn't attend"
                detail="After softmax, these become ~0"
                color="amber"
              />
              <StepCard
                step={4}
                title="Softmax over Keys"
                description="Convert scores to probabilities (sum to 1 per query)"
                detail="Each query's attention weights form a probability distribution"
                color="amber"
              />
              <StepCard
                step={5}
                title="Weighted Sum of Values"
                description="weights @ V: (batch, seq_q, seq_k) @ (batch, seq_k, d_v) → (batch, seq_q, d_v)"
                detail="Output[i] = Σⱼ (attention_weight[i,j] × V[j])"
                color="amber"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Why Scale by √d_k?</h3>
            <CodeBlock code={`# Without scaling:
d_k = 512
dot_product = q · k  # Can be very large (~hundreds)

# Softmax of large values → extremely peaked distribution
softmax([100, 101, 102]) ≈ [0.0, 0.27, 0.73]  # Still okay
softmax([1000, 1001, 1002]) ≈ [0.0, 0.0, 1.0]  # Near one-hot!

# Gradients in the flat regions of softmax are tiny → learning stops

# With scaling:
scaled = dot_product / sqrt(512) ≈ dot_product / 22.6
# Now values stay in a reasonable range where softmax has good gradients`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Masking Types</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Padding Mask</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Ignore &lt;PAD&gt; tokens in variable-length batches
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Causal Mask</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Prevent attending to future tokens (autoregressive decoding)
                </p>
              </div>
            </div>
            <CodeBlock code={`# Causal mask for seq_len=4
mask = np.triu(np.ones((4, 4)) * -1e9, k=1)
# [[   0, -1e9, -1e9, -1e9],
#  [   0,    0, -1e9, -1e9],
#  [   0,    0,    0, -1e9],
#  [   0,    0,    0,    0]]`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Implementation (Stable Softmax)</h3>
            <CodeBlock code={`def scaled_dot_product_attention(q, k, v, mask=None):
    d_k = q.shape[-1]

    # QK^T / sqrt(d_k)
    scores = np.matmul(q, k.transpose(0, 2, 1)) / np.sqrt(d_k)

    # Apply mask (add large negative values)
    if mask is not None:
        scores = scores + mask

    # Stable softmax: subtract max to prevent overflow
    scores_max = np.max(scores, axis=-1, keepdims=True)
    exp_scores = np.exp(scores - scores_max)
    weights = exp_scores / np.sum(exp_scores, axis=-1, keepdims=True)

    # Weighted sum of values
    output = np.matmul(weights, v)
    return output, weights`} />
          </div>
        </section>

        {/* Task 3: Single Attention Head */}
        <section className="space-y-8">
          <SectionHeader icon="3" title="Single Attention Head" subtitle="Learning what to attend to" />

          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Why Projections?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Raw attention operates directly on input embeddings. Projections allow the model to <strong>learn</strong>:
              what to look for (Q), what to be matched against (K), and what information to extract (V).
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">The Three Projections</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <ProjectionCard
                name="W_Q"
                question="What am I looking for?"
                description="Learns to extract the query - the question being asked"
                color="emerald"
              />
              <ProjectionCard
                name="W_K"
                question="What do I contain?"
                description="Learns to extract the key - what can be matched against"
                color="blue"
              />
              <ProjectionCard
                name="W_V"
                question="What info do I give?"
                description="Learns to extract the value - the actual content to retrieve"
                color="purple"
              />
            </div>
            <CodeBlock code={`Q = X @ W_Q    # (batch, seq, d_model) @ (d_model, d_k) → (batch, seq, d_k)
K = X @ W_K    # Same transformation, different learned weights
V = X @ W_V    # Same transformation, different learned weights

Head = Attention(Q, K, V)  # → (batch, seq, d_v)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Self-Attention vs Cross-Attention</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">Self-Attention</h4>
                <code className="text-sm">x_q = x_k = x_v</code>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Used in encoder, decoder masked self-attention.
                  Each token attends to all tokens in the same sequence.
                </p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">Cross-Attention</h4>
                <code className="text-sm">x_q from decoder, x_k = x_v from encoder</code>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Decoder attends to encoder outputs.
                  "What in the input is relevant to what I'm generating?"
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Implementation</h3>
            <CodeBlock code={`def single_attention_head(x_q, x_k, x_v, W_q, W_k, W_v):
    """
    Args:
        x_q: Query input (batch, seq_q, d_model)
        x_k: Key input (batch, seq_k, d_model)
        x_v: Value input (batch, seq_k, d_model)
        W_q, W_k: (d_model, d_k)
        W_v: (d_model, d_v)

    Returns:
        Output (batch, seq_q, d_v)
    """
    # Project inputs
    Q = np.matmul(x_q, W_q)  # (batch, seq_q, d_k)
    K = np.matmul(x_k, W_k)  # (batch, seq_k, d_k)
    V = np.matmul(x_v, W_v)  # (batch, seq_k, d_v)

    # Apply scaled dot-product attention
    return scaled_dot_product_attention(Q, K, V)`} />
          </div>
        </section>

        {/* Task 4: Multi-Head Attention */}
        <section className="space-y-8">
          <SectionHeader icon="4" title="Multi-Head Attention" subtitle="Learning multiple relationships" />

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">The Key Innovation</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              A single attention head can only focus on one type of relationship. Multiple heads can simultaneously learn:
              syntax (subject-verb), semantics (word meanings), positional patterns, long-range dependencies (coreference).
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4 text-center">The Formula</h3>
            <div className="text-center text-xl font-mono text-blue-600 dark:text-blue-400 mb-4">
              MultiHead(Q, K, V) = Concat(head<sub>1</sub>, ..., head<sub>h</sub>) W<sub>O</sub>
            </div>
            <p className="text-center text-sm text-slate-600 dark:text-slate-400">
              where head<sub>i</sub> = Attention(Q W<sub>i</sub><sup>Q</sup>, K W<sub>i</sub><sup>K</sup>, V W<sub>i</sub><sup>V</sup>)
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">The Efficient Implementation Trick</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-red-700 dark:text-red-400 text-sm mb-2">Naive (Slow)</h4>
                <CodeBlock code={`heads = [attention(Q @ W_Q[i],
                  K @ W_K[i],
                  V @ W_V[i])
         for i in range(h)]
output = concat(heads) @ W_O`} />
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm mb-2">Efficient (Used)</h4>
                <CodeBlock code={`# ONE large projection
Q = x @ W_q  # (d_model, d_model)
# Reshape to split heads
Q = Q.reshape(B,S,h,d_k).transpose
# Run attention ONCE
# Heads broadcast as batch dim`} />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Detailed Shape Transformations</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Example: batch=32, seq=100, d_model=512, num_heads=8, d_k=64
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3">Step</th>
                    <th className="text-left py-2 px-3">Operation</th>
                    <th className="text-left py-2 px-3">Shape</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">1</td>
                    <td className="py-2 px-3">Input</td>
                    <td className="py-2 px-3">(32, 100, 512)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">2</td>
                    <td className="py-2 px-3">Q = x @ W_q</td>
                    <td className="py-2 px-3">(32, 100, 512)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">3</td>
                    <td className="py-2 px-3">reshape(B, S, h, d_k)</td>
                    <td className="py-2 px-3">(32, 100, 8, 64)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">4</td>
                    <td className="py-2 px-3">transpose(0, 2, 1, 3)</td>
                    <td className="py-2 px-3 text-blue-400">(32, 8, 100, 64)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">5</td>
                    <td className="py-2 px-3">scores = Q @ K^T</td>
                    <td className="py-2 px-3">(32, 8, 100, 100)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">6</td>
                    <td className="py-2 px-3">attn = softmax @ V</td>
                    <td className="py-2 px-3">(32, 8, 100, 64)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3">7</td>
                    <td className="py-2 px-3">transpose + reshape</td>
                    <td className="py-2 px-3">(32, 100, 512)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">8</td>
                    <td className="py-2 px-3">@ W_o</td>
                    <td className="py-2 px-3">(32, 100, 512)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Why the Output Projection W_O?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              The concatenated heads have learned different things. W<sub>O</sub>:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Allows heads to <strong>interact</strong> and share information
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Projects back to expected d_model dimension
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Adds another layer of learned transformation
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Implementation</h3>
            <CodeBlock code={`def multi_head_attention(x, num_heads, W_q, W_k, W_v, W_o):
    batch, seq, d_model = x.shape
    d_k = d_model // num_heads

    # Step 1: Project to Q, K, V
    Q = np.matmul(x, W_q)  # (batch, seq, d_model)
    K = np.matmul(x, W_k)
    V = np.matmul(x, W_v)

    # Step 2-3: Split and transpose
    # (batch, seq, d_model) → (batch, num_heads, seq, d_k)
    Q = Q.reshape(batch, seq, num_heads, d_k).transpose(0, 2, 1, 3)
    K = K.reshape(batch, seq, num_heads, d_k).transpose(0, 2, 1, 3)
    V = V.reshape(batch, seq, num_heads, d_k).transpose(0, 2, 1, 3)

    # Step 4: Attention (batch & heads are both batch dimensions)
    attn_output = scaled_dot_product_attention(Q, K, V)

    # Step 5: Concat heads
    # (batch, heads, seq, d_k) → (batch, seq, d_model)
    concat = attn_output.transpose(0, 2, 1, 3).reshape(batch, seq, d_model)

    # Step 6: Output projection
    return np.matmul(concat, W_o)`} />
          </div>
        </section>

        {/* Task 5: Layer Normalization */}
        <section className="space-y-8">
          <SectionHeader icon="5" title="Layer Normalization" subtitle="Stabilizing activations" />

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-cyan-700 dark:text-cyan-400 mb-2">Why Layer Norm, not Batch Norm?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Batch Norm normalizes across the batch dimension - needs large batches, problematic for variable-length sequences.
              Layer Norm normalizes across the feature dimension - works with any batch size, each sample independent.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">The Formula</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-cyan-600 dark:text-cyan-400">Step 1:</span>
                <span>μ = (1/d) Σᵢ xᵢ</span>
                <span className="text-slate-500">— Mean over features</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-cyan-600 dark:text-cyan-400">Step 2:</span>
                <span>σ² = (1/d) Σᵢ (xᵢ - μ)²</span>
                <span className="text-slate-500">— Variance</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-cyan-600 dark:text-cyan-400">Step 3:</span>
                <span>x̂ = (x - μ) / √(σ² + ε)</span>
                <span className="text-slate-500">— Normalize</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Visual Intuition</h3>
            <CodeBlock code={`Input tensor: (batch=2, seq=3, d_model=4)

Batch Norm normalizes ↓ (across batch for each feature)
Layer Norm normalizes → (across features for each position)

         d_model=4
        ┌─────────┐
batch=2 │ → → → → │  Layer Norm normalizes each row
seq=3   │ → → → → │  independently to mean=0, var=1
        │ → → → → │
        │ → → → → │
        │ → → → → │
        │ → → → → │
        └─────────┘`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Why keepdims=True?</h3>
            <CodeBlock code={`x.shape = (2, 3, 4)

# Without keepdims:
mean = np.mean(x, axis=-1)  # shape: (2, 3) - can't broadcast!

# With keepdims:
mean = np.mean(x, axis=-1, keepdims=True)  # shape: (2, 3, 1)

(x - mean)  # (2, 3, 4) - (2, 3, 1) = (2, 3, 4) ✓ broadcasts!`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Implementation</h3>
            <CodeBlock code={`def layer_norm(x: np.ndarray, eps: float = 1e-5) -> np.ndarray:
    """
    Layer normalization over the last dimension.

    Args:
        x: Input (..., d_model). Typically (batch, seq, d_model)
        eps: Small constant to prevent division by zero

    Returns:
        Normalized array with mean≈0, var≈1 over last axis
    """
    mean = np.mean(x, axis=-1, keepdims=True)
    variance = np.var(x, axis=-1, keepdims=True)
    return (x - mean) / np.sqrt(variance + eps)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Example Walkthrough</h3>
            <CodeBlock code={`x = [1.0, 2.0, 3.0]

# Step 1: Mean
mean = (1 + 2 + 3) / 3 = 2.0

# Step 2: Variance
var = ((1-2)² + (2-2)² + (3-2)²) / 3 = (1 + 0 + 1) / 3 = 0.6667

# Step 3: Standard deviation
std = sqrt(0.6667 + 1e-5) ≈ 0.8165

# Step 4: Normalize
x_norm = (x - 2.0) / 0.8165 = [-1.2247, 0.0, 1.2247]

# Verify:
mean(x_norm) = 0 ✓
var(x_norm) = 1.0 ✓`} />
          </div>
        </section>

        {/* Task 6: Transformer Forward Pass */}
        <section className="space-y-8">
          <SectionHeader icon="6" title="Transformer Forward Pass" subtitle="Complete encoder block" />

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Bringing It All Together</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              The encoder block combines all previous components: positional encoding, multi-head attention,
              layer normalization, feed-forward network, and residual connections.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-6 text-center">Architecture Diagram</h3>
            <TransformerDiagram />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Step 1: Add Positional Encoding</h3>
            <CodeBlock code={`x = x + pos_encoding
# Input x: (batch, seq, d_model) - token embeddings
# pos_encoding: (seq, d_model) - broadcasts to each batch item
# Injects position information into embeddings`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Step 2: Self-Attention Sub-layer</h3>
            <CodeBlock code={`# 2a. Multi-head attention
attn_output = multi_head_attention(x, num_heads, W_q, W_k, W_v, W_o)

# 2b. Residual connection - allows gradients to flow directly
x = x + attn_output

# 2c. Layer normalization - stabilizes activations
x = layer_norm(x)`} />
            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm text-purple-700 dark:text-purple-400 mb-2">Residual Connection</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Allows gradients to flow directly through the network.
                  Makes it easier to learn identity mappings.
                  Enables training very deep networks.
                </p>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm text-cyan-700 dark:text-cyan-400 mb-2">Layer Norm</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Normalizes activations to prevent exploding/vanishing values.
                  Applied after each sub-layer (Post-LN) or before (Pre-LN).
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Step 3: Feed-Forward Sub-layer</h3>
            <CodeBlock code={`# 3a. Position-wise FFN with ReLU
# First layer expands: d_model (512) → d_ff (2048)
hidden = np.maximum(0, np.matmul(x, W_ff1))  # ReLU activation

# Second layer contracts: d_ff (2048) → d_model (512)
ff_output = np.matmul(hidden, W_ff2)

# 3b. Residual connection
x = x + ff_output

# 3c. Layer normalization
x = layer_norm(x)`} />
            <div className="mt-4 bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
              <h4 className="font-semibold text-sm text-orange-700 dark:text-orange-400 mb-2">Why Expand then Contract?</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                The larger intermediate dimension (d_ff = 4 × d_model = 2048) allows learning more complex
                transformations before compressing back. ReLU introduces non-linearity.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Post-LN vs Pre-LN</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">Post-LN (Original Paper)</h4>
                <code className="text-xs">x → Attention → Add(x) → LayerNorm</code>
                <p className="text-xs text-slate-500 mt-2">What we implement here</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                <h4 className="font-semibold text-sm text-emerald-700 dark:text-emerald-400 mb-2">Pre-LN (Modern)</h4>
                <code className="text-xs">x → LayerNorm → Attention → Add(x)</code>
                <p className="text-xs text-slate-500 mt-2">GPT-2, modern transformers. More stable for deep networks.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Complete Implementation</h3>
            <CodeBlock code={`def transformer_forward(x, pos_encoding, W_q, W_k, W_v, W_o,
                        W_ff1, W_ff2, num_heads):
    """
    Forward pass through a single Transformer encoder block.

    Args:
        x: Input embeddings (batch, seq, d_model)
        pos_encoding: Positional encoding (seq, d_model)
        W_q, W_k, W_v, W_o: Attention weights (d_model, d_model)
        W_ff1: FFN first layer (d_model, d_ff)
        W_ff2: FFN second layer (d_ff, d_model)
        num_heads: Number of attention heads

    Returns:
        Output (batch, seq, d_model)
    """
    # Step 1: Add positional encoding
    x = x + pos_encoding

    # Step 2: Multi-head self-attention sub-layer
    attn_output = multi_head_attention(x, num_heads, W_q, W_k, W_v, W_o)
    x = x + attn_output  # Residual
    x = layer_norm(x)

    # Step 3: Feed-forward sub-layer
    ff_output = np.matmul(np.maximum(0, np.matmul(x, W_ff1)), W_ff2)
    x = x + ff_output  # Residual
    x = layer_norm(x)

    return x`} />
          </div>
        </section>

        {/* Parameter Counts */}
        <section className="space-y-8">
          <SectionHeader icon="📊" title="Parameter Counts" subtitle="Original paper settings" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3">Parameter</th>
                    <th className="text-left py-2 px-3">Value</th>
                    <th className="text-left py-2 px-3">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-mono">d_model</td>
                    <td className="py-2 px-3">512</td>
                    <td className="py-2 px-3 text-slate-500">Model/embedding dimension</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-mono">d_ff</td>
                    <td className="py-2 px-3">2048</td>
                    <td className="py-2 px-3 text-slate-500">FFN inner dimension (4 × d_model)</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-mono">num_heads</td>
                    <td className="py-2 px-3">8</td>
                    <td className="py-2 px-3 text-slate-500">Attention heads</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-2 px-3 font-mono">d_k = d_v</td>
                    <td className="py-2 px-3">64</td>
                    <td className="py-2 px-3 text-slate-500">Per-head dimension (d_model / num_heads)</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono">num_layers</td>
                    <td className="py-2 px-3">6</td>
                    <td className="py-2 px-3 text-slate-500">Encoder/decoder layers (stacked)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <ParamCard title="W_q, W_k, W_v, W_o" shape="(512, 512) × 4" params="~1M" />
              <ParamCard title="W_ff1" shape="(512, 2048)" params="~1M" />
              <ParamCard title="W_ff2" shape="(2048, 512)" params="~1M" />
            </div>
            <p className="text-center text-slate-500 mt-4 text-sm">
              Total per layer: ~3M parameters (excluding biases)
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💎" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              number={1}
              title="Self-Attention Enables Parallelism"
              description="Every token can attend to every other token simultaneously. O(n²) complexity but fully parallelizable on GPU/TPU."
            />
            <TakeawayCard
              number={2}
              title="Multi-Head = Multiple Perspectives"
              description="Each head learns different relationships (syntax, semantics, coreference). Concatenation combines these views."
            />
            <TakeawayCard
              number={3}
              title="Residual Connections Enable Depth"
              description="Skip connections allow gradients to flow directly through very deep networks. Essential for training 6+ layers."
            />
            <TakeawayCard
              number={4}
              title="Layer Norm Stabilizes Training"
              description="Normalizing across features (not batch) works with any batch size and variable-length sequences."
            />
            <TakeawayCard
              number={5}
              title="Positional Encoding is Crucial"
              description="Without it, the model has no sense of order. Sinusoidal encoding is elegant, bounded, and extrapolates."
            />
            <TakeawayCard
              number={6}
              title="Scale Factor √d_k Matters"
              description="Prevents softmax from becoming too peaked. Keeps gradients flowing through attention weights."
            />
          </div>
        </section>

        {/* Footer */}
        <section className="text-center py-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 text-sm">
            Based on implementations from{" "}
            <a
              href="https://arxiv.org/abs/1706.03762"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              "Attention Is All You Need"
            </a>{" "}
            (Vaswani et al., 2017)
          </p>
        </section>
      </main>
    </div>
  )
}

// Component Definitions

function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
        <span className="text-2xl">{icon}</span>
      </div>
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

function Arrow() {
  return (
    <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  )
}

function ArchBlock({ label, color, description }: { label: string; color: string; description: string }) {
  const colors: Record<string, string> = {
    red: "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-400",
    amber: "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400",
    emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400",
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-400",
    cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-700 dark:text-cyan-400",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400",
    orange: "bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-400",
  }

  return (
    <div className={`${colors[color]} border rounded-lg px-4 py-2 text-center`}>
      <div className="font-semibold text-sm">{label}</div>
      <div className="text-xs opacity-70">{description}</div>
    </div>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}

function StepCard({ step, title, description, detail, color }: {
  step: number
  title: string
  description: string
  detail: string
  color: string
}) {
  const colors: Record<string, string> = {
    amber: "bg-amber-500/20 text-amber-600 dark:text-amber-400",
    blue: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
  }

  return (
    <div className="flex items-start gap-4">
      <div className={`w-8 h-8 rounded-full ${colors[color]} flex items-center justify-center text-sm font-semibold shrink-0`}>
        {step}
      </div>
      <div>
        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
        <p className="text-xs text-slate-500 mt-1">{detail}</p>
      </div>
    </div>
  )
}

function ProjectionCard({ name, question, description, color }: {
  name: string
  question: string
  description: string
  color: string
}) {
  const colors: Record<string, string> = {
    emerald: "border-emerald-500/30",
    blue: "border-blue-500/30",
    purple: "border-purple-500/30",
  }

  return (
    <div className={`bg-slate-100 dark:bg-slate-800 rounded-lg p-4 border-l-4 ${colors[color]}`}>
      <h4 className="font-mono font-semibold text-sm mb-1">{name}</h4>
      <p className="text-sm italic text-slate-600 dark:text-slate-400 mb-2">"{question}"</p>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  )
}

function TakeawayCard({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-sm font-semibold">
          {number}
        </div>
        <h4 className="font-semibold text-slate-800 dark:text-slate-200">{title}</h4>
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function ParamCard({ title, shape, params }: { title: string; shape: string; params: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
      <h4 className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</h4>
      <p className="text-xs text-slate-500 mt-1">{shape}</p>
      <p className="text-emerald-600 dark:text-emerald-400 font-semibold mt-2">{params}</p>
    </div>
  )
}

function TransformerDiagram() {
  return (
    <div className="flex flex-col items-center space-y-3 text-xs font-mono">
      <div className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg">
        Input (batch, seq, d_model)
      </div>
      <Arrow />
      <div className="px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-700 dark:text-red-400">
        + Positional Encoding
      </div>
      <Arrow />

      {/* Self-Attention Block */}
      <div className="border-2 border-blue-500/30 rounded-xl p-4 space-y-2 w-full max-w-md">
        <div className="text-center text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2">Self-Attention Sub-layer</div>
        <div className="px-4 py-2 bg-blue-500/20 rounded-lg text-center text-blue-700 dark:text-blue-400">
          Multi-Head Attention
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="px-3 py-1 bg-purple-500/20 rounded text-purple-700 dark:text-purple-400">+ Residual</div>
          <Arrow />
          <div className="px-3 py-1 bg-cyan-500/20 rounded text-cyan-700 dark:text-cyan-400">LayerNorm</div>
        </div>
      </div>

      <Arrow />

      {/* FFN Block */}
      <div className="border-2 border-orange-500/30 rounded-xl p-4 space-y-2 w-full max-w-md">
        <div className="text-center text-orange-600 dark:text-orange-400 font-semibold text-sm mb-2">Feed-Forward Sub-layer</div>
        <div className="px-4 py-2 bg-orange-500/20 rounded-lg text-center text-orange-700 dark:text-orange-400">
          FFN: ReLU(xW₁)W₂
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="px-3 py-1 bg-purple-500/20 rounded text-purple-700 dark:text-purple-400">+ Residual</div>
          <Arrow />
          <div className="px-3 py-1 bg-cyan-500/20 rounded text-cyan-700 dark:text-cyan-400">LayerNorm</div>
        </div>
      </div>

      <Arrow />
      <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-emerald-700 dark:text-emerald-400">
        Output (batch, seq, d_model)
      </div>
    </div>
  )
}
