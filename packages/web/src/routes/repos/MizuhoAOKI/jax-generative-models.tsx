import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/MizuhoAOKI/jax-generative-models")({
  component: JaxGenerativeModelsPage,
})

function JaxGenerativeModelsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-purple-600 dark:text-purple-400 text-sm font-mono">repos/MizuhoAOKI</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">jax_generative_models</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-2xl">
            <span className="text-4xl">🎨</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
            JAX Generative Models
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Minimal, unified JAX implementation of DDPM and Flow Matching
          </p>
          <p className="text-slate-600 dark:text-slate-500 max-w-3xl mx-auto">
            Learn generative models from scratch. 2D point cloud datasets, Equinox neural networks,
            JIT-compiled training, Rerun visualization. Unified interface for both diffusion and flow.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">JAX + Equinox</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">DDPM</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Flow Matching</span>
          </div>
        </section>

        {/* Architecture Overview */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Architecture" subtitle="Unified interface for generative models" />

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
            <pre className="text-sm text-slate-600 dark:text-slate-400 overflow-x-auto">
{`┌─────────────────────────────────────────────────────────┐
│                      CLI (Tyro)                          │
│  train | generate | animate                              │
├─────────────────────────────────────────────────────────┤
│                   Strategy Interface                     │
│  forward() | reverse() | loss_fn() | sample()           │
├──────────────────────┬──────────────────────────────────┤
│        DDPM          │         Flow Matching            │
│  Noise prediction    │       Velocity field             │
│  Stochastic reverse  │      Deterministic ODE           │
├──────────────────────┴──────────────────────────────────┤
│                   Neural Networks                        │
│  MLP | ResNet  +  Sinusoidal Time Embedding             │
├─────────────────────────────────────────────────────────┤
│                      Datasets                            │
│  Cat | Moon | Swiss-Roll | Gaussian Mixture             │
├─────────────────────────────────────────────────────────┤
│                   JAX Primitives                         │
│  jit | vmap | grad | lax.scan | random.split            │
└─────────────────────────────────────────────────────────┘`}
            </pre>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
            <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Unified Time Convention</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Both strategies use: <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">t=0</code> (source/noise) → <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">t=1</code> (target/data).
              This allows swapping strategies without changing training code.
            </p>
          </div>
        </section>

        {/* Strategy Interface */}
        <section className="space-y-8">
          <SectionHeader icon="📐" title="Strategy Interface" subtitle="Common protocol for all generative models" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">base.py - Strategy Protocol</h3>
            <CodeBlock code={`from typing import Protocol
import jax
import jax.numpy as jnp
import equinox as eqx

class Strategy(Protocol):
    """Unified interface for generative models."""

    def loss_fn(
        self,
        model: eqx.Module,
        x: jax.Array,      # Single data point
        key: jax.Array,    # PRNG key
    ) -> jax.Array:
        """Compute loss for training. Returns scalar."""
        ...

    def forward(
        self,
        t: float,          # Time in [0, 1]
        x: jax.Array,      # Target data point
        key: jax.Array,
    ) -> tuple[jax.Array, jax.Array]:
        """Perturb data for training. Returns (x_t, target)."""
        ...

    def reverse(
        self,
        model: eqx.Module,
        t: float,          # Current time
        x_t: jax.Array,    # Current state
        key: jax.Array,
    ) -> jax.Array:
        """One reverse step. Returns x_{t+dt} (closer to data)."""
        ...

    def sample_from_source_distribution(
        self,
        key: jax.Array,
        num_samples: int,
        data_dim: int,
    ) -> jax.Array:
        """Sample from source (noise). Returns shape (num_samples, data_dim)."""
        ...

    def sample_from_target_distribution(
        self,
        model: eqx.Module,
        key: jax.Array,
        num_samples: int,
        data_dim: int,
    ) -> tuple[jax.Array, jax.Array]:
        """Generate samples. Returns (x_final, trajectory)."""
        ...`} />
          </div>
        </section>

        {/* DDPM */}
        <section className="space-y-8">
          <SectionHeader icon="🌫️" title="DDPM (Denoising Diffusion)" subtitle="Learn to predict and remove noise" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Mathematical Foundation</h3>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <p><strong>Forward Process:</strong> Progressively add Gaussian noise over T steps</p>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-xs">
                {"q(x_t | x_0) = N(x_t; √ᾱ_t · x_0, (1 - ᾱ_t) · I)"}
                <br /><br />
                {"where ᾱ_t = ∏(s=1 to t) (1 - β_s) is cumulative product of (1 - variance schedule)"}
              </div>
              <p><strong>Reverse Process:</strong> Learn to denoise, predicting added noise</p>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-xs">
                {"p_θ(x_(t-1) | x_t) = N(x_(t-1); μ_θ(x_t, t), σ_t² · I)"}
                <br /><br />
                {"μ_θ(x_t, t) = (1/√α_t) · (x_t - (β_t/√(1-ᾱ_t)) · ε_θ(x_t, t))"}
              </div>
              <p><strong>Training Objective:</strong> Predict the noise that was added</p>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-xs">
                {"L = E_(x,t,ε)[ ||ε_θ(√ᾱ_t · x + √(1-ᾱ_t) · ε, t) - ε||² ]"}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">DDPM Implementation</h3>
            <CodeBlock code={`# ddpm.py - Key implementation details

@dataclass
class DDPMStrategyConfig:
    name: Literal["ddpm"] = "ddpm"
    num_transport_steps: int = 50    # Number of diffusion steps
    beta_min: float = 1e-4           # Min noise variance
    beta_max: float = 0.02           # Max noise variance


class DDPMStrategy:
    def __init__(self, config: DDPMStrategyConfig):
        self.num_steps = config.num_transport_steps

        # Linear beta schedule
        self.betas = jnp.linspace(config.beta_min, config.beta_max, self.num_steps)
        self.alphas = 1.0 - self.betas
        self.alphas_cumprod = jnp.cumprod(self.alphas)  # ᾱ_t

    def forward(self, t: float, x: jax.Array, key: jax.Array):
        """Add noise to data point at time t."""
        # Map t ∈ [0,1] to step index
        # t=0 → step T-1 (most noise), t=1 → step 0 (data)
        idx = jnp.clip(
            jnp.floor((1.0 - t) * self.num_steps).astype(jnp.int32),
            0, self.num_steps - 1
        )

        alpha_bar = self.alphas_cumprod[idx]
        noise = jax.random.normal(key, shape=x.shape)

        # x_t = √ᾱ_t · x + √(1-ᾱ_t) · ε
        x_t = jnp.sqrt(alpha_bar) * x + jnp.sqrt(1 - alpha_bar) * noise

        return x_t, noise  # Return perturbed state and target (noise)

    def loss_fn(self, model: eqx.Module, x: jax.Array, key: jax.Array):
        """MSE between predicted and true noise."""
        t_key, noise_key = jax.random.split(key)
        t = jax.random.uniform(t_key)  # Random time

        x_t, true_noise = self.forward(t, x, noise_key)
        pred_noise = model(t, x_t)

        return jnp.mean((pred_noise - true_noise) ** 2)

    def reverse(self, model, t, x_t, key):
        """One denoising step."""
        idx = jnp.clip(
            jnp.floor((1.0 - t) * self.num_steps).astype(jnp.int32),
            0, self.num_steps - 1
        )

        alpha = self.alphas[idx]
        alpha_bar = self.alphas_cumprod[idx]
        beta = self.betas[idx]

        # Predict noise
        eps_pred = model(t, x_t)

        # Compute mean: μ = (1/√α) · (x_t - β/√(1-ᾱ) · ε_pred)
        mean = (1.0 / jnp.sqrt(alpha)) * (
            x_t - (beta / jnp.sqrt(1.0 - alpha_bar)) * eps_pred
        )

        # Compute variance (simplified)
        alpha_bar_prev = jnp.where(idx > 0, self.alphas_cumprod[idx - 1], 1.0)
        variance = ((1.0 - alpha_bar_prev) / (1.0 - alpha_bar)) * beta
        sigma = jnp.sqrt(variance)

        # Sample: x_{t-1} = μ + σ · z (no noise at final step)
        def add_noise(k):
            return mean + sigma * jax.random.normal(k, x_t.shape)

        def no_noise(_):
            return mean

        return jax.lax.cond(idx == 0, no_noise, add_noise, key)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">DDPM Sampling (Generation)</h3>
            <CodeBlock code={`def sample_from_target_distribution(self, model, key, num_samples, data_dim):
    """Generate samples by iterative denoising."""
    src_key, loop_key = jax.random.split(key)

    # Start from pure noise at t=0
    x_t = self.sample_from_source_distribution(src_key, num_samples, data_dim)

    # Time steps: 0 → 1 (noise → data)
    ts = jnp.linspace(0.0, 1.0 - 1.0/self.num_steps, self.num_steps)
    keys = jax.random.split(loop_key, self.num_steps)

    def scan_body(x_t, inputs):
        t, step_key = inputs
        batch_keys = jax.random.split(step_key, num_samples)

        # Apply reverse step to each sample
        x_next = jax.vmap(
            self.reverse, in_axes=(None, None, 0, 0)
        )(model, t, x_t, batch_keys)

        return x_next, x_next  # (carry, output)

    # Efficient loop via lax.scan
    x_final, trajectory = jax.lax.scan(scan_body, x_t, (ts, keys))

    return x_final, trajectory`} />
          </div>
        </section>

        {/* Flow Matching */}
        <section className="space-y-8">
          <SectionHeader icon="🌊" title="Flow Matching" subtitle="Learn velocity field for direct transport" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Mathematical Foundation</h3>
            <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <p><strong>Key Insight:</strong> Instead of learning noise, learn velocity field that transports noise to data</p>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-xs">
                {"Interpolation: x_t = (1 - t) · x_0 + t · x_1"}
                <br />
                {"where x_0 ~ N(0, σ²I) (source), x_1 = data (target)"}
                <br /><br />
                {"Target velocity: v = x_1 - x_0 (straight line direction)"}
              </div>
              <p><strong>Training Objective:</strong> Predict velocity at each point</p>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-xs">
                {"L = E_(x_0,x_1,t)[ ||v_θ(x_t, t) - (x_1 - x_0)||² ]"}
              </div>
              <p><strong>Generation:</strong> Integrate ODE from t=0 to t=1</p>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 font-mono text-xs">
                {"dx/dt = v_θ(x, t)"}
                <br />
                {"x(0) = noise, x(1) = generated sample"}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Flow Matching Implementation</h3>
            <CodeBlock code={`# flow_matching.py

@dataclass
class FlowMatchingStrategyConfig:
    name: Literal["flow_matching"] = "flow_matching"
    num_transport_steps: int = 50   # ODE integration steps
    base_std: float = 1.0           # Source distribution std


class FlowMatchingStrategy:
    def __init__(self, config: FlowMatchingStrategyConfig):
        self.num_steps = config.num_transport_steps
        self.base_std = config.base_std

    def forward(self, t: float, x_target: jax.Array, key: jax.Array):
        """Linear interpolation between source and target."""
        # Sample source noise
        x_source = jax.random.normal(key, x_target.shape) * self.base_std

        # Interpolate: x_t = (1-t) · x_source + t · x_target
        x_t = (1.0 - t) * x_source + t * x_target

        # Target velocity: direction from source to target
        target_velocity = x_target - x_source

        return x_t, target_velocity

    def loss_fn(self, model: eqx.Module, x: jax.Array, key: jax.Array):
        """MSE between predicted and target velocity."""
        t_key, noise_key = jax.random.split(key)
        t = jax.random.uniform(t_key)  # Random time

        x_t, target_v = self.forward(t, x, noise_key)
        pred_v = model(t, x_t)

        return jnp.mean((pred_v - target_v) ** 2)

    def reverse(self, model, t, x_t, key):
        """One ODE integration step (Forward Euler)."""
        # Deterministic! No noise needed
        dt = 1.0 / self.num_steps
        v_pred = model(t, x_t)

        # x_{t+dt} = x_t + dt · v_pred
        return x_t + dt * v_pred

    def sample_from_target_distribution(self, model, key, num_samples, data_dim):
        """Generate by integrating ODE."""
        x_t = self.sample_from_source_distribution(key, num_samples, data_dim)

        # Integrate from t=0 to t=1
        ts = jnp.linspace(0.0, 1.0 - 1.0/self.num_steps, self.num_steps)
        keys = jax.random.split(key, self.num_steps)  # Not used (deterministic)

        def scan_body(x_t, inputs):
            t, _ = inputs
            # No vmap over keys needed - deterministic
            x_next = jax.vmap(
                self.reverse, in_axes=(None, None, 0, None)
            )(model, t, x_t, None)
            return x_next, x_next

        x_final, trajectory = jax.lax.scan(scan_body, x_t, (ts, keys))
        return x_final, trajectory`} />
          </div>
        </section>

        {/* Comparison */}
        <section className="space-y-8">
          <SectionHeader icon="⚖️" title="DDPM vs Flow Matching" subtitle="Key differences" />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-3 px-4">Aspect</th>
                  <th className="text-left py-3 px-4">DDPM</th>
                  <th className="text-left py-3 px-4">Flow Matching</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <ComparisonRow aspect="Learning Target" ddpm="Noise ε added at step t" flow="Velocity v = x₁ - x₀" />
                <ComparisonRow aspect="Forward Process" ddpm="Iterative noise addition" flow="Linear interpolation" />
                <ComparisonRow aspect="Reverse Process" ddpm="Stochastic (adds noise)" flow="Deterministic ODE" />
                <ComparisonRow aspect="Typical Steps" ddpm="50-1000 steps" flow="20-50 steps" />
                <ComparisonRow aspect="Loss Function" ddpm="MSE(ε_pred, ε_true)" flow="MSE(v_pred, v_true)" />
                <ComparisonRow aspect="Math Complexity" ddpm="Variance schedule, cumprod" flow="Simple interpolation" />
                <ComparisonRow aspect="Generation Speed" ddpm="Slower (many stochastic steps)" flow="Faster (fewer deterministic)" />
              </tbody>
            </table>
          </div>
        </section>

        {/* Neural Networks */}
        <section className="space-y-8">
          <SectionHeader icon="🧠" title="Neural Network Architectures" subtitle="Time-conditioned networks" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Sinusoidal Time Embedding</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Encodes continuous time t into high-dimensional representation. Allows network to distinguish nearby time steps.
            </p>
            <CodeBlock code={`class SinusoidalTimeEmbed(eqx.Module):
    """Transformer-style positional encoding for time."""
    freqs: jax.Array  # Precomputed frequencies

    def __init__(self, dim: int):
        half_dim = dim // 2
        # Frequencies: 1, 1/10000^(2/d), 1/10000^(4/d), ...
        self.freqs = jnp.exp(
            -jnp.log(10000.0) * jnp.arange(half_dim) / half_dim
        )

    def __call__(self, t: float) -> jax.Array:
        # t * frequencies
        args = t * self.freqs

        # Concatenate sin and cos
        # Shape: (dim,) = (half_dim,) + (half_dim,)
        return jnp.concatenate([jnp.cos(args), jnp.sin(args)])


# Example: t=0.5, dim=8
# freqs = [1.0, 0.1, 0.01, 0.001]
# args = [0.5, 0.05, 0.005, 0.0005]
# output = [cos(0.5), cos(0.05), ..., sin(0.5), sin(0.05), ...]`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">MLP Architecture</h3>
            <CodeBlock code={`@dataclass
class MLPConfig:
    type: Literal["mlp"] = "mlp"
    hidden_dim: int = 512     # Width of hidden layers
    depth: int = 10           # Number of layers
    activation: str = "gelu"  # gelu / relu / swish


class MLP(eqx.Module):
    """Simple MLP with time concatenation."""
    time_embed: SinusoidalTimeEmbed
    layers: list
    activation: Callable

    def __init__(self, config: MLPConfig, key: jax.Array, data_dim: int):
        time_dim = config.hidden_dim // 4
        self.time_embed = SinusoidalTimeEmbed(time_dim)

        # Activation function
        self.activation = {"gelu": jax.nn.gelu, "relu": jax.nn.relu}[config.activation]

        keys = jax.random.split(key, config.depth + 1)
        self.layers = []

        # First layer: data + time_embed → hidden
        in_dim = data_dim + time_dim
        self.layers.append(eqx.nn.Linear(in_dim, config.hidden_dim, key=keys[0]))

        # Hidden layers
        for i in range(1, config.depth):
            self.layers.append(
                eqx.nn.Linear(config.hidden_dim, config.hidden_dim, key=keys[i])
            )

        # Output layer: hidden → data_dim
        self.layers.append(
            eqx.nn.Linear(config.hidden_dim, data_dim, key=keys[-1])
        )

    def __call__(self, t: float, x: jax.Array) -> jax.Array:
        # Embed time and concatenate
        t_emb = self.time_embed(t)
        h = jnp.concatenate([x, t_emb])

        # Forward through layers
        for layer in self.layers[:-1]:
            h = self.activation(layer(h))

        return self.layers[-1](h)  # No activation on output`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">ResNet Architecture</h3>
            <CodeBlock code={`@dataclass
class ResNetConfig:
    type: Literal["resnet"] = "resnet"
    hidden_dim: int = 512
    num_blocks: int = 4
    use_layer_norm: bool = True


class ResNetBlock(eqx.Module):
    """Residual block with optional LayerNorm."""
    linear1: eqx.nn.Linear
    linear2: eqx.nn.Linear
    norm: eqx.nn.LayerNorm | None

    def __init__(self, dim: int, use_norm: bool, key: jax.Array):
        k1, k2 = jax.random.split(key)
        self.linear1 = eqx.nn.Linear(dim, dim, key=k1)
        self.linear2 = eqx.nn.Linear(dim, dim, key=k2)
        self.norm = eqx.nn.LayerNorm(dim) if use_norm else None

    def __call__(self, x: jax.Array) -> jax.Array:
        h = x
        if self.norm:
            h = self.norm(h)
        h = jax.nn.gelu(self.linear1(h))
        h = self.linear2(h)
        return x + h  # Residual connection


class ResNet(eqx.Module):
    """ResNet with time embedding added globally."""
    time_embed: SinusoidalTimeEmbed
    time_proj: eqx.nn.Linear   # Project time to hidden_dim
    input_proj: eqx.nn.Linear  # Project data to hidden_dim
    blocks: list[ResNetBlock]
    output_proj: eqx.nn.Linear

    def __call__(self, t: float, x: jax.Array) -> jax.Array:
        # Time embedding (added to all blocks)
        t_emb = self.time_proj(self.time_embed(t))

        # Project input
        h = self.input_proj(x)

        # Residual blocks with time
        for block in self.blocks:
            h = block(h + t_emb)  # Add time at each block

        return self.output_proj(h)`} />
          </div>
        </section>

        {/* Training Pipeline */}
        <section className="space-y-8">
          <SectionHeader icon="🏋️" title="Training Pipeline" subtitle="JIT-compiled training with JAX" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Training Loop</h3>
            <CodeBlock code={`# train.py

def train(cfg: TrainConfig, key: jax.Array) -> None:
    # 1. Initialize model
    init_key, data_key, train_key = jax.random.split(key, 3)
    model = create_model(cfg.model, init_key, data_dim=2)

    # 2. Create strategy (DDPM or Flow Matching)
    strategy = create_strategy(cfg.strategy)

    # 3. Partition model for JIT
    params, static = eqx.partition(model, eqx.is_inexact_array)

    # 4. Setup optimizer (Optax)
    optimizer = create_optimizer(cfg.optimizer)
    opt_state = optimizer.init(params)

    # 5. JIT-compile training step
    @eqx.filter_jit
    def train_step(params, static, opt_state, batch, key):
        def batch_loss(params, static, batch, keys):
            model = eqx.combine(params, static)

            # Vectorize loss over batch
            losses = jax.vmap(
                strategy.loss_fn,
                in_axes=(None, 0, 0)  # Model, data, keys
            )(model, batch, keys)

            return jnp.mean(losses)

        # Compute gradients
        loss, grads = eqx.filter_value_and_grad(batch_loss)(
            params, static, batch, jax.random.split(key, cfg.batch_size)
        )

        # Update parameters
        updates, opt_state = optimizer.update(grads, opt_state, params)
        params = eqx.apply_updates(params, updates)

        return params, opt_state, loss

    # 6. Main loop
    for step in range(cfg.train_steps):
        # Get batch
        data_key, batch_key = jax.random.split(data_key)
        batch = get_batch(batch_key, cfg.dataset, cfg.batch_size)

        # Train step
        train_key, step_key = jax.random.split(train_key)
        params, opt_state, loss = train_step(
            params, static, opt_state, batch, step_key
        )

        if (step + 1) % cfg.log_interval == 0:
            print(f"Step {step+1}: loss = {loss:.6f}")

    # 7. Save model
    model = eqx.combine(params, static)
    eqx.tree_serialise_leaves(cfg.model_path, model)`} />
          </div>
        </section>

        {/* JAX Patterns */}
        <section className="space-y-8">
          <SectionHeader icon="⚡" title="JAX Patterns" subtitle="Key techniques used throughout" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400 mb-4">jax.vmap</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Vectorize single-sample functions over batches automatically.
              </p>
              <CodeBlock code={`# Apply loss to batch
batch_losses = jax.vmap(
    strategy.loss_fn,
    in_axes=(None, 0, 0)  # Model, data[batch], keys[batch]
)(model, batch_data, batch_keys)

# Apply reverse step to batch
x_next = jax.vmap(
    strategy.reverse,
    in_axes=(None, None, 0, 0)  # Model, time, states, keys
)(model, t, x_batch, keys_batch)`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400 mb-4">jax.lax.scan</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Efficient loop that compiles to single XLA operation.
              </p>
              <CodeBlock code={`def scan_body(carry, inputs):
    x_t = carry
    t, key = inputs
    x_next = reverse_step(x_t, t, key)
    return x_next, x_next  # (new_carry, output)

# Loop: num_steps iterations
x_final, trajectory = jax.lax.scan(
    scan_body,
    x_initial,        # Initial carry
    (times, keys)     # Inputs per step
)
# trajectory shape: (num_steps, batch, dim)`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400 mb-4">jax.random.split</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Explicit PRNG key management for reproducibility.
              </p>
              <CodeBlock code={`# Split key into multiple independent keys
key, init_key, train_key = jax.random.split(key, 3)

# One key per sample in batch
batch_keys = jax.random.split(key, batch_size)

# Each split produces completely independent streams
# Deterministic: same key → same sequence`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400 mb-4">eqx.partition / combine</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Separate parameters from model structure for JIT.
              </p>
              <CodeBlock code={`# Partition: separate differentiable arrays
params, static = eqx.partition(
    model,
    eqx.is_inexact_array  # Filter for float arrays
)

# JIT only operates on params (static is constant)
@eqx.filter_jit
def step(params, static, ...):
    model = eqx.combine(params, static)
    ...

# Reconstruct model after training
final_model = eqx.combine(params, static)`} />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">jax.lax.cond</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              JIT-compatible conditional branching. Both branches are traced.
            </p>
            <CodeBlock code={`# DDPM: Don't add noise at final step
def add_noise(key):
    noise = jax.random.normal(key, shape=mean.shape)
    return mean + sigma * noise

def no_noise(_):
    return mean

# Select branch based on condition
x_next = jax.lax.cond(
    step_idx == 0,  # Predicate
    no_noise,       # True branch
    add_noise,      # False branch
    key             # Argument passed to selected branch
)

# Note: Both branches are compiled, selection happens at runtime`} />
          </div>
        </section>

        {/* Datasets */}
        <section className="space-y-8">
          <SectionHeader icon="📊" title="Datasets" subtitle="2D point cloud distributions" />

          <div className="grid md:grid-cols-2 gap-6">
            <DatasetCard
              name="Cat"
              desc="Points sampled from cat silhouette image"
              code={`@dataclass
class CatConfig:
    name: Literal["cat"] = "cat"
    data_dim: int = 2

# Loads assets/cat.png
# Extracts dark pixels (< 128)
# Normalizes to [-1, 1]
# Adds small jitter noise`}
            />
            <DatasetCard
              name="Gaussian Mixture"
              desc="4 clusters at corners"
              code={`@dataclass
class GaussianMixtureConfig:
    name: Literal["gaussian_mixture"]
    scale: float = 3.0
    noise_std: float = 0.3

# Centers: [±scale, ±scale]
# Each point: center + N(0, noise_std²)`}
            />
            <DatasetCard
              name="Two Moons"
              desc="Non-convex crescent shapes"
              code={`@dataclass
class MoonConfig:
    name: Literal["moon"] = "moon"
    noise: float = 0.05
    scale: float = 3.0

# Uses sklearn.datasets.make_moons
# Centered and scaled`}
            />
            <DatasetCard
              name="Swiss Roll"
              desc="Spiral manifold (2D projection)"
              code={`@dataclass
class SwissRollConfig:
    name: Literal["swiss_roll"]
    noise: float = 0.3
    scale: float = 3.0

# sklearn.datasets.make_swiss_roll
# First 2 dimensions only`}
            />
          </div>
        </section>

        {/* CLI Usage */}
        <section className="space-y-8">
          <SectionHeader icon="💻" title="CLI Usage" subtitle="Training, generation, and animation" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Train a Model</h3>
            <CodeBlock code={`# Train DDPM on cat dataset
uv run scripts/main.py train \\
  strategy:ddpm \\
  model:mlp \\
  dataset:cat \\
  --batch-size 1024 \\
  --train-steps 3000 \\
  --model-path outputs/cat_ddpm.eqx

# Train Flow Matching on moon dataset with ResNet
uv run scripts/main.py train \\
  strategy:flow-matching \\
  model:resnet \\
  dataset:moon \\
  --batch-size 512 \\
  --train-steps 5000 \\
  --model-path outputs/moon_flow.eqx`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Generate Samples</h3>
            <CodeBlock code={`# Generate from trained model
uv run scripts/main.py generate \\
  strategy:ddpm \\
  model:mlp \\
  dataset:cat \\
  --model-path outputs/cat_ddpm.eqx \\
  --num-samples 2000 \\
  --output-image-path outputs/cat_samples.png`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Create Animation</h3>
            <CodeBlock code={`# Visualize generation trajectory
uv run scripts/main.py animate \\
  strategy:flow-matching \\
  model:resnet \\
  dataset:moon \\
  --model-path outputs/moon_flow.eqx \\
  --num-samples 1500 \\
  --output-video-path outputs/moon.gif \\
  --fps 30`} />
          </div>
        </section>

        {/* Full Example */}
        <section className="space-y-8">
          <SectionHeader icon="📝" title="Complete Example" subtitle="Train and generate step by step" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`import jax
import jax.numpy as jnp
import equinox as eqx
import optax

from jax_gen.strategies import create_strategy
from jax_gen.models import create_model
from jax_gen.data import get_batch
from jax_gen.config import DDPMStrategyConfig, MLPConfig, CatConfig

# 1. Configuration
strategy_cfg = DDPMStrategyConfig(num_transport_steps=50)
model_cfg = MLPConfig(hidden_dim=256, depth=6)
data_cfg = CatConfig()

# 2. Initialize
key = jax.random.PRNGKey(42)
key, init_key, train_key = jax.random.split(key, 3)

model = create_model(model_cfg, init_key, data_dim=2)
strategy = create_strategy(strategy_cfg)
optimizer = optax.adam(1e-3)

params, static = eqx.partition(model, eqx.is_inexact_array)
opt_state = optimizer.init(params)

# 3. Training step
@eqx.filter_jit
def train_step(params, static, opt_state, batch, key):
    def loss_fn(params):
        model = eqx.combine(params, static)
        keys = jax.random.split(key, len(batch))
        losses = jax.vmap(strategy.loss_fn, in_axes=(None, 0, 0))(model, batch, keys)
        return jnp.mean(losses)

    loss, grads = eqx.filter_value_and_grad(loss_fn)(params)
    updates, opt_state = optimizer.update(grads, opt_state, params)
    params = eqx.apply_updates(params, updates)
    return params, opt_state, loss

# 4. Training loop
for step in range(1000):
    train_key, batch_key, step_key = jax.random.split(train_key, 3)
    batch = get_batch(batch_key, data_cfg, batch_size=512)
    params, opt_state, loss = train_step(params, static, opt_state, batch, step_key)

    if (step + 1) % 100 == 0:
        print(f"Step {step+1}: loss = {loss:.6f}")

# 5. Generation
model = eqx.combine(params, static)
gen_key = jax.random.PRNGKey(0)
samples, trajectory = strategy.sample_from_target_distribution(
    model, gen_key, num_samples=1000, data_dim=2
)

print(f"Generated {samples.shape[0]} samples!")
# samples.shape: (1000, 2)`} />
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💎" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Unified Interface"
              description="Strategy protocol allows swapping DDPM ↔ Flow Matching without changing training code. Same forward/reverse/loss_fn signature."
            />
            <TakeawayCard
              title="DDPM: Noise Prediction"
              description="Add noise progressively, learn to predict it. Stochastic reverse process needs many steps (50-1000)."
            />
            <TakeawayCard
              title="Flow Matching: Velocity Field"
              description="Linear interpolation, learn velocity direction. Deterministic ODE needs fewer steps (20-50)."
            />
            <TakeawayCard
              title="JAX Patterns"
              description="vmap for batching, lax.scan for loops, random.split for PRNG, partition/combine for JIT. All explicit, no hidden state."
            />
            <TakeawayCard
              title="Time Embedding"
              description="Sinusoidal encoding lets network distinguish nearby time steps. Critical for learning continuous dynamics."
            />
            <TakeawayCard
              title="2D Visualization"
              description="Low-dimensional datasets (Cat, Moon, Swiss-Roll) make it easy to visualize training progress and generation quality."
            />
          </div>
        </section>

        {/* Links */}
        <section className="space-y-6">
          <SectionHeader icon="🔗" title="Resources" />
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/MizuhoAOKI/jax_generative_models"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              GitHub Repository
            </a>
            <a
              href="https://arxiv.org/abs/2006.11239"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              DDPM Paper
            </a>
            <a
              href="https://arxiv.org/abs/2210.02747"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Flow Matching Paper
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

function ComparisonRow({ aspect, ddpm, flow }: { aspect: string; ddpm: string; flow: string }) {
  return (
    <tr>
      <td className="py-3 px-4 font-medium">{aspect}</td>
      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{ddpm}</td>
      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{flow}</td>
    </tr>
  )
}

function DatasetCard({ name, desc, code }: { name: string; desc: string; code: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold text-lg text-purple-600 dark:text-purple-400 mb-2">{name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{desc}</p>
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
