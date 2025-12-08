import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/Smerity/sha-rnn")({
  component: ShaRnnPage,
})

function ShaRnnPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-purple-600 dark:text-purple-400 text-sm font-mono">repos/Smerity</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">sha-rnn</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
            <span className="text-4xl">🧠</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            SHA-RNN
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Single Headed Attention RNN: Stop Thinking With Your Head
          </p>
          <p className="text-slate-600 dark:text-slate-500 max-w-3xl mx-auto">
            A language model architecture proving that a single attention head combined with LSTMs
            can match Transformer performance at a fraction of the cost. Train on a single GPU in 24 hours
            instead of TPU clusters for weeks.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">1.07 BPC</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">63M params</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">1 GPU</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">24 hours</span>
          </div>
        </section>

        {/* The Provocation */}
        <section className="space-y-8">
          <SectionHeader icon="🎯" title="The Provocation" subtitle="Why transformers might not be needed" />

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
            <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-3">The Core Thesis</h4>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              The paper title is deliberately provocative: "Stop Thinking With Your Head" is a critique of the ML community's
              obsession with multi-headed attention in Transformers. Stephen Merity demonstrates that a <strong>single attention head</strong> integrated
              into an LSTM backbone achieves nearly identical performance to Transformer-XL.
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4">
                <div className="font-semibold text-purple-600 dark:text-purple-400 mb-1">Transformer-XL (12 layers)</div>
                <div className="text-slate-500">1.06 BPC, 41M params, requires TPU infrastructure</div>
              </div>
              <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-4">
                <div className="font-semibold text-purple-600 dark:text-purple-400 mb-1">SHA-LSTM (4 layers)</div>
                <div className="text-slate-500">1.07 BPC, 63M params, single Titan V GPU</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <InsightCard
              title="Computational Accessibility"
              description="Transformers require massive GPU infrastructure and long training times. SHA-RNN achieves competitive results on consumer hardware in ~24 hours."
            />
            <InsightCard
              title="Overengineering Critique"
              description="The field became obsessed with Transformer architecture without exploring whether simpler approaches could achieve similar results. Multi-head attention may be overkill."
            />
            <InsightCard
              title="Premature RNN Death"
              description="The research community declared RNNs 'dead' when properly designed hybrid approaches could be competitive with much less complexity."
            />
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Architecture" subtitle="Hybrid LSTM + Single-Head Attention" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">High-Level Structure</h3>
            <CodeBlock code={`Input Embedding (1024 dim)
    ↓
Block 0: LSTM → Feed-Forward (Boom)
    ↓
Block 1: LSTM → Feed-Forward (Boom)
    ↓
Block 2: LSTM → Single-Head Attention → Feed-Forward (Boom)  ← Attention only here!
    ↓
Block 3: LSTM → Feed-Forward (Boom)
    ↓
Output Linear (to vocabulary)`} />
            <p className="text-sm text-slate-500 mt-4">
              Notice: Attention is only added to <strong>one layer</strong> (the second-to-last).
              This minimizes overhead while capturing long-range dependencies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ArchCard
              title="Why This Works"
              points={[
                "LSTM provides inherent sequential ordering (no positional embeddings needed)",
                "Single attention head captures long-range dependencies up to 5000 tokens",
                "Recurrent nature gives strong local inductive bias",
                "Feed-forward (Boom) modules add capacity similar to Transformer FFN"
              ]}
            />
            <ArchCard
              title="Key Differences from Transformers"
              points={[
                "1 attention head vs 8-16 in Transformers",
                "LSTM backbone vs pure attention",
                "Attention in 1 layer vs all layers",
                "No positional encoding required",
                "Memory caching for long context (5000 tokens)"
              ]}
            />
          </div>
        </section>

        {/* Key Innovations */}
        <section className="space-y-8">
          <SectionHeader icon="💡" title="Key Innovations" subtitle="What makes SHA-RNN special" />

          <div className="space-y-6">
            <InnovationCard
              number="1"
              title="Learnable Scaling from Zero"
              description="Instead of initializing attention weights normally, SHA-RNN starts scaling parameters near zero and uses sigmoid gating to gradually learn attention. This allows the model to 'discover' attention rather than rely on it from the start."
              code={`# Query, Key, Value scaling parameters start at zero
self.qs = nn.Parameter(torch.zeros(...))
self.ks = nn.Parameter(torch.zeros(...))

# Sigmoid gates scale the projections
qs = torch.sigmoid(self.qs)  # Starts near 0.5, learns to scale
ks = torch.sigmoid(self.ks)

q, k, v = qs * query, ks * key, vs * value`}
            />

            <InnovationCard
              number="2"
              title="Overparam Module for Value Scaling"
              description="The value scaling uses an overparameterized transformation similar to LSTM gating, projecting to 2x dimensions and using sigmoid-tanh gating."
              code={`class Overparam(nn.Module):
    def __init__(self, nhid):
        self.linear = nn.Linear(nhid, 2 * nhid)

    def forward(self, x):
        x = self.linear(x)
        c, f = x.chunk(2, dim=-1)  # Split into content and forget
        return torch.sigmoid(f) * torch.tanh(c)  # LSTM-like gating`}
            />

            <InnovationCard
              number="3"
              title="Memory Caching for Long Context"
              description="SHA-RNN caches hidden states from previous sequences, allowing attention to look back up to 5000 tokens. This enables efficient long-context modeling without reprocessing entire history."
              code={`def forward(self, x, hidden, mems=None):
    # Concatenate memory with current hidden states
    if mems is not None:
        bigh = torch.cat([mem, mh], dim=0)  # Past + current

    # Attention over extended context
    attn_out = self.attention(query, key=bigh, value=bigh)

    # Keep only recent tokens in memory
    new_mem = bigh[-self.num_max_positions:]  # Sliding window

    return output, hidden, new_mem`}
            />

            <InnovationCard
              number="4"
              title="Boom: Efficient Feed-Forward"
              description="The 'Boom' module is a shortcut-based feed-forward that's faster than standard Transformer FFN by using reshape and sum reduction instead of a second linear layer."
              code={`class Boom(nn.Module):
    """Feed-forward with shortcut for efficiency."""
    def __init__(self, nhid, nout=None, shortcut=True):
        nout = nout or nhid
        self.linear = nn.Linear(nhid, nout * 4)  # Expand 4x
        self.shortcut = shortcut

    def forward(self, x):
        x = self.linear(x)
        x = gelu(x)
        if self.shortcut:
            # Reshape and sum instead of second linear
            x = x.view(*x.shape[:-1], 4, -1).sum(dim=-2)
        return x`}
            />
          </div>
        </section>

        {/* The Attention Module */}
        <section className="space-y-8">
          <SectionHeader icon="👁️" title="Single-Head Attention" subtitle="The core mechanism" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Attention Implementation</h3>
            <CodeBlock code={`class Attention(nn.Module):
    def __init__(self, nhid):
        self.num_heads = 1  # Single head!

        # Projections
        self.q_proj = nn.Linear(nhid, nhid)
        self.k_proj = nn.Linear(nhid, nhid)
        self.v_proj = nn.Linear(nhid, nhid)
        self.out_proj = nn.Linear(nhid, nhid)

        # Learnable scaling (initialized near zero)
        self.qs = nn.Parameter(torch.zeros(1, 1, nhid))
        self.ks = nn.Parameter(torch.zeros(1, 1, nhid))
        self.vs = Overparam(nhid)  # Overparameterized scaling

    def forward(self, query, key, value, mask=None):
        # Apply learned scaling
        qs = torch.sigmoid(self.qs)
        ks = torch.sigmoid(self.ks)

        q = qs * self.q_proj(query)
        k = ks * self.k_proj(key)
        v = self.vs(self.v_proj(value))

        # Scaled dot-product attention
        d_k = q.size(-1)
        scores = torch.matmul(q, k.transpose(-2, -1)) / math.sqrt(d_k)

        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)

        attn = F.softmax(scores, dim=-1)
        output = torch.matmul(attn, v)

        return self.out_proj(output)`} />
          </div>

          <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6">
            <h4 className="font-semibold text-pink-700 dark:text-pink-400 mb-2">Why Single Head Works</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Multi-head attention in Transformers theoretically allows attending to different representation subspaces.
              However, SHA-RNN shows that with an LSTM backbone providing strong sequential modeling, a single attention head
              is sufficient to capture the long-range dependencies that LSTMs miss. The LSTM already provides "multiple heads"
              of local context processing.
            </p>
          </div>
        </section>

        {/* LSTM + Attention Synergy */}
        <section className="space-y-8">
          <SectionHeader icon="🔄" title="LSTM + Attention Synergy" subtitle="Why the combination works" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-blue-600 dark:text-blue-400">What LSTMs Provide</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Inherent positional information</strong> - No need for positional embeddings, the recurrent structure encodes sequence order</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Strong local modeling</strong> - Excellent at capturing local patterns and n-gram-like features</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Gated memory</strong> - Selective retention of important information through forget/input gates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span><strong>Efficient sequential processing</strong> - O(n) complexity for sequence length</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4 text-purple-600 dark:text-purple-400">What Attention Adds</h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Direct long-range access</strong> - Can attend to any position in the 5000-token context window</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Content-based retrieval</strong> - Find relevant context based on semantic similarity, not just position</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Parallel context access</strong> - All positions in the context are equally accessible in one step</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span><strong>Gradient highways</strong> - Direct paths for gradients to flow to distant positions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">The Block Structure</h3>
            <CodeBlock code={`class Block(nn.Module):
    def __init__(self, embed_dim, hidden_dim, use_attn=False):
        self.lstm = nn.LSTM(embed_dim, embed_dim)
        self.attn = Attention(embed_dim) if use_attn else None
        self.boom = Boom(embed_dim, hidden_dim)  # Feed-forward

        # Layer norms
        self.ln_start = nn.LayerNorm(embed_dim)
        self.ln_mid = nn.LayerNorm(embed_dim)
        self.ln_mem = nn.LayerNorm(embed_dim)
        self.ln_ff = nn.LayerNorm(embed_dim)

    def forward(self, x, hidden, mem=None):
        # LSTM processing
        x = self.ln_start(x)
        lstm_out, new_hidden = self.lstm(x, hidden)

        # Optional attention (only in layer 2)
        if self.attn is not None:
            x = self.ln_mid(lstm_out)
            if mem is not None:
                context = torch.cat([mem, x], dim=0)
            else:
                context = x
            attn_out = self.attn(x, self.ln_mem(context), context)
            lstm_out = lstm_out + attn_out  # Residual

        # Feed-forward
        x = self.ln_ff(lstm_out)
        x = lstm_out + self.boom(x)  # Residual

        return x, new_hidden`} />
          </div>
        </section>

        {/* Training Details */}
        <section className="space-y-8">
          <SectionHeader icon="🏋️" title="Training" subtitle="How to reproduce" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Training Configuration</h3>
            <CodeBlock code={`python -u main.py \\
    --epochs 32 \\
    --dropouth 0.1 --dropouti 0.1 --dropout 0.1 \\
    --data data/enwik8/ \\
    --save ENWIK8.pt \\
    --log-interval 10 \\
    --seed 5512 \\
    --optimizer lamb \\           # LAMB optimizer (critical!)
    --bptt 1024 \\                # Sequence length
    --warmup 800 \\               # LR warmup steps
    --lr 2e-3 \\
    --emsize 1024 \\              # Embedding dimension
    --nhid 4096 \\                # Hidden dimension
    --nlayers 4 \\                # 4 LSTM layers
    --batch_size 16`} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Key Training Choices</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><strong>LAMB optimizer</strong> - Layer-wise Adaptive Moments for batch training, crucial for stability</li>
                <li><strong>800 step warmup</strong> - Gradual LR increase prevents early instability</li>
                <li><strong>Mixed precision (AMP)</strong> - Faster training with minimal quality loss</li>
                <li><strong>Gradient clipping at 0.3</strong> - Prevents exploding gradients in LSTMs</li>
                <li><strong>Two-stage training</strong> - First 32 epochs at 2e-3, then fine-tune at 1e-3</li>
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Hardware Requirements</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li><strong>GPU</strong> - Single Titan V (12GB) or similar</li>
                <li><strong>Training time</strong> - ~24 hours for full training</li>
                <li><strong>Epoch time</strong> - 30-60 minutes per epoch</li>
                <li><strong>Memory</strong> - Fits in 12GB with batch_size 16</li>
                <li><strong>Can reduce</strong> - Lower batch size or BPTT if memory constrained</li>
              </ul>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
            <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Reproducibility Advantage</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Unlike Transformers which often require careful hyperparameter tuning, complex learning rate schedules,
              and fragile warmup procedures, SHA-RNN training is remarkably stable. If memory becomes an issue,
              you can simply reduce parameters and the model gracefully degrades to a standard LSTM.
            </p>
          </div>
        </section>

        {/* Benchmark Comparison */}
        <section className="space-y-8">
          <SectionHeader icon="📊" title="Benchmarks" subtitle="enwik8 byte-level language modeling" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-3 px-4 font-semibold">Model</th>
                  <th className="text-center py-3 px-4 font-semibold">Test BPC</th>
                  <th className="text-center py-3 px-4 font-semibold">Parameters</th>
                  <th className="text-center py-3 px-4 font-semibold">LSTM?</th>
                  <th className="text-center py-3 px-4 font-semibold">Training</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-4">Krause mLSTM</td>
                  <td className="py-3 px-4 text-center">1.24</td>
                  <td className="py-3 px-4 text-center">46M</td>
                  <td className="py-3 px-4 text-center text-green-500">✓</td>
                  <td className="py-3 px-4 text-center">-</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-4">AWD-LSTM</td>
                  <td className="py-3 px-4 text-center">1.23</td>
                  <td className="py-3 px-4 text-center">44M</td>
                  <td className="py-3 px-4 text-center text-green-500">✓</td>
                  <td className="py-3 px-4 text-center">-</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800 bg-purple-50 dark:bg-purple-900/20">
                  <td className="py-3 px-4 font-semibold text-purple-700 dark:text-purple-400">SHA-LSTM (this work)</td>
                  <td className="py-3 px-4 text-center font-semibold text-purple-700 dark:text-purple-400">1.07</td>
                  <td className="py-3 px-4 text-center">63M</td>
                  <td className="py-3 px-4 text-center text-green-500">✓</td>
                  <td className="py-3 px-4 text-center">~24h, 1 GPU</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-4">Transformer-XL (12L)</td>
                  <td className="py-3 px-4 text-center">1.06</td>
                  <td className="py-3 px-4 text-center">41M</td>
                  <td className="py-3 px-4 text-center text-red-500">✗</td>
                  <td className="py-3 px-4 text-center">Much longer, multi-GPU</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-3 px-4">Transformer-XL (18L)</td>
                  <td className="py-3 px-4 text-center">1.03</td>
                  <td className="py-3 px-4 text-center">88M</td>
                  <td className="py-3 px-4 text-center text-red-500">✗</td>
                  <td className="py-3 px-4 text-center">Much longer, multi-GPU</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Adaptive Span Transformer</td>
                  <td className="py-3 px-4 text-center">1.02</td>
                  <td className="py-3 px-4 text-center">38M</td>
                  <td className="py-3 px-4 text-center text-red-500">✗</td>
                  <td className="py-3 px-4 text-center">~24h, multi-GPU</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
            <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">Key Takeaway</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              SHA-LSTM achieves <strong>within 1% of Transformer-XL</strong> performance using only a single consumer GPU
              and ~24 hours of training. The only models that significantly beat it require either more layers (18L Transformer-XL)
              or specialized attention mechanisms (Adaptive Span). For researchers and practitioners without access to
              large compute clusters, SHA-RNN represents a practical path to competitive language modeling.
            </p>
          </div>
        </section>

        {/* Productionization */}
        <section className="space-y-8">
          <SectionHeader icon="🚀" title="Production Benefits" subtitle="Why this matters for deployment" />

          <div className="grid md:grid-cols-3 gap-6">
            <BenefitCard
              title="Standard Components"
              description="Only uses LSTM, single-head attention, and feed-forward layers. No exotic ops, easy to export to ONNX and deploy with existing optimized frameworks."
            />
            <BenefitCard
              title="Smaller Memory"
              description="Single attention head and LSTM backbone require less memory than multi-head Transformers, especially for long sequences."
            />
            <BenefitCard
              title="Graceful Degradation"
              description="If resources are constrained, can fall back to pure LSTM by removing attention. The model still works, just with reduced long-range capability."
            />
          </div>
        </section>

        {/* Philosophical Points */}
        <section className="space-y-8">
          <SectionHeader icon="🤔" title="The Bigger Picture" subtitle="Lessons for ML research" />

          <div className="space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Architectural Fashion vs. Practical Efficiency</h3>
              <p className="text-slate-600 dark:text-slate-400">
                The ML community has a tendency to declare previous architectures "dead" when new ones emerge.
                RNNs were declared obsolete after "Attention Is All You Need" (2017), but SHA-RNN shows this was premature.
                The question isn't "RNNs vs Transformers" but rather "what's the right tool for the job?"
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">Compute Accessibility</h3>
              <p className="text-slate-600 dark:text-slate-400">
                The trend toward ever-larger models trained on massive GPU clusters excludes most researchers and institutions
                from participating in cutting-edge work. SHA-RNN demonstrates that careful architectural design can achieve
                competitive results without requiring TPU pods, democratizing access to language modeling research.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg mb-4">The "Found Bug That Works" Phenomenon</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                The codebase contains this delightful comment:
              </p>
              <CodeBlock code={`# BUG: This does _nothing_ as mix isn't set to r ...
# But ... I got good results with this ... so ...
# Let's leave it as is for right now ...`} />
              <p className="text-slate-600 dark:text-slate-400 mt-4">
                This illustrates a broader point: empirical validation often trumps theoretical purity.
                Sometimes the "wrong" implementation works well, and understanding why can lead to new insights.
              </p>
            </div>
          </div>
        </section>

        {/* Key Files */}
        <section className="space-y-8">
          <SectionHeader icon="📁" title="Key Files" subtitle="Repository structure" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="text-left py-2 px-3 font-semibold">File</th>
                  <th className="text-left py-2 px-3 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 dark:text-slate-400">
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 px-3 font-mono text-purple-600 dark:text-purple-400">model.py</td>
                  <td className="py-2 px-3">Core architecture: SHARNN, Block, Attention, Boom classes</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 px-3 font-mono text-purple-600 dark:text-purple-400">main.py</td>
                  <td className="py-2 px-3">Training script with LAMB optimizer and mixed precision</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 px-3 font-mono text-purple-600 dark:text-purple-400">generate.py</td>
                  <td className="py-2 px-3">Inference and text generation utilities</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <td className="py-2 px-3 font-mono text-purple-600 dark:text-purple-400">splitcross.py</td>
                  <td className="py-2 px-3">Adaptive softmax for large vocabularies</td>
                </tr>
                <tr>
                  <td className="py-2 px-3 font-mono text-purple-600 dark:text-purple-400">lookahead.py</td>
                  <td className="py-2 px-3">Lookahead optimizer wrapper</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Links */}
        <section className="space-y-8">
          <SectionHeader icon="🔗" title="Resources" />

          <div className="flex flex-wrap gap-4">
            <a
              href="https://arxiv.org/abs/1911.11423"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-700 dark:text-purple-400 hover:bg-purple-500/20 transition-colors"
            >
              arXiv Paper
            </a>
            <a
              href="https://github.com/Smerity/sha-rnn"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              GitHub Repository
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

function InsightCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}

function ArchCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function InnovationCard({ number, title, description, code }: { number: string; title: string; description: string; code: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-semibold text-sm">
          {number}
        </span>
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{description}</p>
      <CodeBlock code={code} />
    </div>
  )
}

function BenefitCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">{title}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
    </div>
  )
}
