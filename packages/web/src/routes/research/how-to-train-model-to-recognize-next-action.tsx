import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/research/how-to-train-model-to-recognize-next-action")({
  component: NextActionPredictionPage,
})

function NextActionPredictionPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-10 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 text-sm font-mono">research</span>
            <span className="text-slate-600">/</span>
            <h1 className="text-lg font-semibold">Next-Action Prediction</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        {/* Problem Statement */}
        <section>
          <h2 className="text-2xl font-bold mb-4">The Problem</h2>
          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <p className="text-slate-300 mb-4">
              Given the current state of macOS (active application, window positions, recent actions, time of day, etc.),
              predict the next action the user will take. This enables:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <GoalCard
                title="Proactive Suggestions"
                description="Pre-load apps, pre-fetch content, suggest next steps before user thinks of them"
              />
              <GoalCard
                title="Automated Workflows"
                description="Detect patterns and offer to automate repetitive action sequences"
              />
              <GoalCard
                title="Intelligent Shortcuts"
                description="Context-aware hotkeys that adapt to your current workflow state"
              />
            </div>
          </div>
        </section>

        {/* Architecture Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Model Architecture: Decision Transformer</h2>
          <p className="text-slate-400 mb-6">
            We use a <strong>Decision Transformer</strong> architecture - treating action prediction as sequence modeling.
            Instead of traditional RL value functions, we leverage a GPT-style autoregressive transformer
            that conditions on past states and actions to predict the next action.
          </p>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
            <h3 className="text-lg font-semibold mb-4">Why Decision Transformer?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-emerald-400 mb-2">Advantages</h4>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>• <strong>Sequence modeling:</strong> Naturally handles temporal dependencies in user behavior</li>
                  <li>• <strong>Offline learning:</strong> Trains on logged data without environment interaction</li>
                  <li>• <strong>Goal-conditioned:</strong> Can condition on "desired outcome" (e.g., "complete task X")</li>
                  <li>• <strong>Long-range patterns:</strong> Attention captures complex workflow dependencies</li>
                  <li>• <strong>Transfer learning:</strong> Pre-trained transformer weights accelerate training</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">Architecture</h4>
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs">
                  <pre>{`Input Sequence:
[s₁, a₁, s₂, a₂, ..., sₜ] → Transformer → aₜ

Where:
  sᵢ = state embedding at time i
  aᵢ = action embedding at time i

Predict: P(aₜ | s₁, a₁, ..., sₜ)`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-4">Model Architecture Diagram</h3>
            <div className="font-mono text-sm text-slate-300 bg-slate-950 rounded-lg p-4 overflow-x-auto">
              <pre>{`┌─────────────────────────────────────────────────────────────────────┐
│                        Input Embeddings                              │
├──────────────┬──────────────┬──────────────┬──────────────┬─────────┤
│  State Enc   │  Action Enc  │  State Enc   │  Action Enc  │State Enc│
│     s₁       │     a₁       │     s₂       │     a₂       │   sₜ    │
└──────┬───────┴──────┬───────┴──────┬───────┴──────┬───────┴────┬────┘
       │              │              │              │            │
       └──────────────┴──────────────┴──────────────┴────────────┘
                                    │
                      ┌─────────────▼─────────────┐
                      │   + Positional Encoding   │
                      │   + Time Embedding        │
                      └─────────────┬─────────────┘
                                    │
              ┌─────────────────────▼─────────────────────┐
              │          Transformer Blocks × N           │
              │  ┌─────────────────────────────────────┐  │
              │  │   Multi-Head Causal Self-Attention │  │
              │  └─────────────────┬───────────────────┘  │
              │                    │                      │
              │  ┌─────────────────▼───────────────────┐  │
              │  │         Feed-Forward Network        │  │
              │  └─────────────────┬───────────────────┘  │
              │                    │                      │
              │  ┌─────────────────▼───────────────────┐  │
              │  │           Layer Norm + Residual     │  │
              │  └─────────────────────────────────────┘  │
              └─────────────────────┬─────────────────────┘
                                    │
                      ┌─────────────▼─────────────┐
                      │     Action Prediction     │
                      │     Head (Linear → Vocab) │
                      └─────────────┬─────────────┘
                                    │
                      ┌─────────────▼─────────────┐
                      │   P(next_action | context) │
                      └───────────────────────────┘`}</pre>
            </div>
          </div>
        </section>

        {/* Data Collection */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Step 1: Data Collection</h2>
          <p className="text-slate-400 mb-6">
            The model needs rich telemetry about user actions on macOS. We need to capture a comprehensive
            event stream of everything the user does.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <DataSourceCard
              title="System Events (macOS APIs)"
              icon="🖥️"
              items={[
                "NSEvent global monitor for keyboard/mouse",
                "CGEventTap for low-level events",
                "AXObserver for accessibility events",
                "NSWorkspace notifications for app switches",
                "NSRunningApplication for process monitoring",
              ]}
              code={`// Swift - Global event monitoring
let mask: NSEvent.EventTypeMask = [
  .keyDown, .keyUp,
  .leftMouseDown, .leftMouseUp,
  .rightMouseDown, .scrollWheel,
  .flagsChanged
]

NSEvent.addGlobalMonitorForEvents(
  matching: mask
) { event in
  logEvent(event)
}`}
            />

            <DataSourceCard
              title="Application Context"
              icon="📱"
              items={[
                "Active application bundle ID",
                "Window title and position",
                "Menu bar state",
                "Document name / URL",
                "Tab count (browsers)",
              ]}
              code={`// Swift - Active app monitoring
NSWorkspace.shared.notificationCenter
  .addObserver(
    forName: NSWorkspace
      .didActivateApplicationNotification,
    object: nil, queue: .main
  ) { notification in
    let app = notification.userInfo?[
      NSWorkspace.applicationUserInfoKey
    ] as? NSRunningApplication
    logAppSwitch(app)
  }`}
            />

            <DataSourceCard
              title="Screen State"
              icon="🖼️"
              items={[
                "Screenshot embeddings (periodic)",
                "OCR of visible text",
                "UI element hierarchy via AX API",
                "Mouse cursor position",
                "Visible notification count",
              ]}
              code={`// Periodic screen capture
let display = CGMainDisplayID()
if let image = CGDisplayCreateImage(display) {
  let embedding = visionEncoder.encode(image)
  logScreenState(embedding)
}`}
            />

            <DataSourceCard
              title="Temporal Context"
              icon="⏰"
              items={[
                "Time of day (hour, minute)",
                "Day of week",
                "Time since last action",
                "Session duration",
                "Calendar events (optional)",
              ]}
              code={`struct TemporalContext {
  hour: int          // 0-23
  day_of_week: int   // 0-6
  time_since_last: float  // seconds
  session_duration: float // minutes
}`}
            />
          </div>
        </section>

        {/* State Representation */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Step 2: State & Action Representation</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-emerald-400">State Encoding</h3>
              <p className="text-sm text-slate-400 mb-4">
                Each state is a multi-modal embedding combining:
              </p>
              <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300">
                <pre>{`@dataclass
class State:
  # Application context (categorical → embedding)
  app_id: str           # "com.apple.Safari"
  window_title: str     # Encoded via sentence transformer

  # Screen embedding (from vision encoder)
  screen_embedding: Array  # [768] from ViT/CLIP

  # Temporal features (normalized)
  hour: float           # 0.0 - 1.0
  day_of_week: float    # 0.0 - 1.0
  time_since_last: float

  # UI state
  cursor_position: Tuple[float, float]
  active_ui_element: str  # "button", "text_field", etc.

def encode_state(state: State) -> Array:
  """Combine all features into single embedding"""
  app_emb = app_encoder(state.app_id)      # [64]
  title_emb = text_encoder(state.window_title)  # [256]
  screen_emb = state.screen_embedding      # [768]
  temporal = jnp.array([
    state.hour, state.day_of_week,
    state.time_since_last
  ])  # [3]

  combined = jnp.concatenate([
    app_emb, title_emb, screen_emb, temporal
  ])
  return state_projection(combined)  # [512]`}</pre>
              </div>
            </div>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
              <h3 className="text-lg font-semibold mb-4 text-cyan-400">Action Space</h3>
              <p className="text-sm text-slate-400 mb-4">
                Discrete action vocabulary covering all user interactions:
              </p>
              <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300">
                <pre>{`class ActionType(Enum):
  # Application actions
  SWITCH_APP = 0          # + app_id
  LAUNCH_APP = 1          # + app_id
  CLOSE_APP = 2

  # Window actions
  NEW_WINDOW = 10
  CLOSE_WINDOW = 11
  SWITCH_TAB = 12         # + tab_index
  NEW_TAB = 13

  # Input actions
  CLICK = 20              # + position
  RIGHT_CLICK = 21
  DOUBLE_CLICK = 22
  SCROLL = 23             # + direction

  # Keyboard shortcuts
  HOTKEY = 30             # + key_combo
  TYPE_TEXT = 31          # + text_hash

  # File operations
  OPEN_FILE = 40          # + file_type
  SAVE_FILE = 41

  # System
  SPOTLIGHT = 50
  NOTIFICATION_CLICK = 51
  IDLE = 99               # No action

# Total vocabulary: ~100-500 discrete actions
# Each action optionally has parameters
ACTION_VOCAB_SIZE = 512`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* JAX Implementation */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Step 3: JAX Model Implementation</h2>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
            <h3 className="text-lg font-semibold mb-4">Dependencies</h3>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm text-slate-300">
              <pre>{`# requirements.txt
jax[cuda12]==0.4.35
flax==0.10.0
optax==0.2.4
orbax-checkpoint==0.6.0
grain==0.2.0
tensorflow==2.17.0  # For tf.data pipelines
einops==0.8.0
wandb==0.18.0`}</pre>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
            <h3 className="text-lg font-semibold mb-4">Decision Transformer in JAX/Flax</h3>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`import jax
import jax.numpy as jnp
from flax import nnx
import optax
from einops import rearrange

class CausalSelfAttention(nnx.Module):
  """Multi-head causal self-attention."""

  def __init__(self, d_model: int, n_heads: int, rngs: nnx.Rngs):
    self.n_heads = n_heads
    self.head_dim = d_model // n_heads

    self.q_proj = nnx.Linear(d_model, d_model, rngs=rngs)
    self.k_proj = nnx.Linear(d_model, d_model, rngs=rngs)
    self.v_proj = nnx.Linear(d_model, d_model, rngs=rngs)
    self.out_proj = nnx.Linear(d_model, d_model, rngs=rngs)

  def __call__(self, x: jax.Array, mask: jax.Array | None = None):
    B, T, C = x.shape

    q = self.q_proj(x)
    k = self.k_proj(x)
    v = self.v_proj(x)

    # Split heads
    q = rearrange(q, 'b t (h d) -> b h t d', h=self.n_heads)
    k = rearrange(k, 'b t (h d) -> b h t d', h=self.n_heads)
    v = rearrange(v, 'b t (h d) -> b h t d', h=self.n_heads)

    # Scaled dot-product attention
    scale = 1.0 / jnp.sqrt(self.head_dim)
    attn = jnp.einsum('bhqd,bhkd->bhqk', q, k) * scale

    # Causal mask
    causal_mask = jnp.tril(jnp.ones((T, T)))
    attn = jnp.where(causal_mask == 0, -1e9, attn)

    if mask is not None:
      attn = jnp.where(mask == 0, -1e9, attn)

    attn = jax.nn.softmax(attn, axis=-1)
    out = jnp.einsum('bhqk,bhkd->bhqd', attn, v)
    out = rearrange(out, 'b h t d -> b t (h d)')

    return self.out_proj(out)


class TransformerBlock(nnx.Module):
  """Single transformer block with pre-norm."""

  def __init__(self, d_model: int, n_heads: int, mlp_ratio: int, rngs: nnx.Rngs):
    self.ln1 = nnx.LayerNorm(d_model, rngs=rngs)
    self.attn = CausalSelfAttention(d_model, n_heads, rngs=rngs)
    self.ln2 = nnx.LayerNorm(d_model, rngs=rngs)
    self.mlp = nnx.Sequential(
      nnx.Linear(d_model, d_model * mlp_ratio, rngs=rngs),
      nnx.gelu,
      nnx.Linear(d_model * mlp_ratio, d_model, rngs=rngs),
    )

  def __call__(self, x: jax.Array):
    x = x + self.attn(self.ln1(x))
    x = x + self.mlp(self.ln2(x))
    return x


class DecisionTransformer(nnx.Module):
  """Decision Transformer for next-action prediction."""

  def __init__(
    self,
    state_dim: int,
    action_vocab_size: int,
    d_model: int = 512,
    n_heads: int = 8,
    n_layers: int = 6,
    max_seq_len: int = 256,
    mlp_ratio: int = 4,
    rngs: nnx.Rngs = None,
  ):
    self.d_model = d_model
    self.max_seq_len = max_seq_len

    # Embeddings
    self.state_encoder = nnx.Linear(state_dim, d_model, rngs=rngs)
    self.action_embedding = nnx.Embed(
      num_embeddings=action_vocab_size,
      features=d_model,
      rngs=rngs
    )
    self.pos_embedding = nnx.Embed(
      num_embeddings=max_seq_len,
      features=d_model,
      rngs=rngs
    )

    # Transformer blocks
    self.blocks = [
      TransformerBlock(d_model, n_heads, mlp_ratio, rngs=rngs)
      for _ in range(n_layers)
    ]

    # Output head
    self.ln_out = nnx.LayerNorm(d_model, rngs=rngs)
    self.action_head = nnx.Linear(d_model, action_vocab_size, rngs=rngs)

  def __call__(
    self,
    states: jax.Array,      # [B, T, state_dim]
    actions: jax.Array,     # [B, T] (previous actions)
  ) -> jax.Array:
    """
    Forward pass for action prediction.

    Returns logits for next action at each position.
    """
    B, T, _ = states.shape

    # Encode states and actions
    state_emb = self.state_encoder(states)  # [B, T, d_model]
    action_emb = self.action_embedding(actions)  # [B, T, d_model]

    # Interleave: [s1, a1, s2, a2, ...]
    # Shape becomes [B, 2*T, d_model]
    seq = jnp.zeros((B, 2 * T, self.d_model))
    seq = seq.at[:, 0::2, :].set(state_emb)
    seq = seq.at[:, 1::2, :].set(action_emb)

    # Add positional encoding
    positions = jnp.arange(2 * T)
    pos_emb = self.pos_embedding(positions)
    seq = seq + pos_emb

    # Apply transformer blocks
    for block in self.blocks:
      seq = block(seq)

    # Output: predict action at state positions
    seq = self.ln_out(seq)
    state_outputs = seq[:, 0::2, :]  # [B, T, d_model]
    logits = self.action_head(state_outputs)  # [B, T, vocab]

    return logits


def create_model(config: dict) -> DecisionTransformer:
  """Initialize model with config."""
  rngs = nnx.Rngs(0)
  return DecisionTransformer(
    state_dim=config['state_dim'],
    action_vocab_size=config['action_vocab_size'],
    d_model=config['d_model'],
    n_heads=config['n_heads'],
    n_layers=config['n_layers'],
    max_seq_len=config['max_seq_len'],
    rngs=rngs,
  )`}</pre>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-4">Training Loop</h3>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`import orbax.checkpoint as ocp

def compute_loss(model, states, actions, targets):
  """Cross-entropy loss for action prediction."""
  logits = model(states, actions)

  # Flatten for cross-entropy
  logits_flat = logits.reshape(-1, logits.shape[-1])
  targets_flat = targets.reshape(-1)

  loss = optax.softmax_cross_entropy_with_integer_labels(
    logits_flat, targets_flat
  ).mean()

  return loss


@nnx.jit
def train_step(model, optimizer, states, actions, targets):
  """Single training step with gradient update."""

  def loss_fn(model):
    return compute_loss(model, states, actions, targets)

  loss, grads = nnx.value_and_grad(loss_fn)(model)
  optimizer.update(grads)

  return loss


def train(
  model: DecisionTransformer,
  train_dataset,
  config: dict,
):
  """Main training loop."""

  # Optimizer with warmup + cosine decay
  schedule = optax.warmup_cosine_decay_schedule(
    init_value=0.0,
    peak_value=config['lr'],
    warmup_steps=config['warmup_steps'],
    decay_steps=config['total_steps'],
  )
  optimizer = nnx.Optimizer(model, optax.adamw(schedule))

  # Checkpointing
  ckpt_mgr = ocp.CheckpointManager(
    config['checkpoint_dir'],
    options=ocp.CheckpointManagerOptions(max_to_keep=3)
  )

  step = 0
  for epoch in range(config['epochs']):
    for batch in train_dataset:
      states = batch['states']       # [B, T, state_dim]
      actions = batch['actions']     # [B, T]
      targets = batch['next_actions']  # [B, T] (shifted by 1)

      loss = train_step(model, optimizer, states, actions, targets)

      if step % 100 == 0:
        print(f"Step {step}, Loss: {loss:.4f}")
        wandb.log({"loss": loss, "step": step})

      if step % 1000 == 0:
        ckpt_mgr.save(step, args=ocp.args.StandardSave(model))

      step += 1

  return model


# === Run Training ===
config = {
  'state_dim': 512,
  'action_vocab_size': 512,
  'd_model': 512,
  'n_heads': 8,
  'n_layers': 6,
  'max_seq_len': 256,
  'lr': 1e-4,
  'warmup_steps': 1000,
  'total_steps': 100000,
  'epochs': 10,
  'batch_size': 32,
  'checkpoint_dir': './checkpoints',
}

model = create_model(config)
trained_model = train(model, train_dataset, config)`}</pre>
            </div>
          </div>
        </section>

        {/* Data Pipeline */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Step 4: Data Pipeline</h2>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
            <h3 className="text-lg font-semibold mb-4">Event Logger (Swift)</h3>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`// MacEventLogger/Sources/EventLogger.swift
import Cocoa
import ApplicationServices

struct ActionEvent: Codable {
  let timestamp: Double
  let actionType: String
  let appBundleId: String
  let windowTitle: String
  let cursorPosition: [Double]
  let keyCode: Int?
  let modifiers: [String]
  let metadata: [String: String]
}

class EventLogger {
  private var events: [ActionEvent] = []
  private let outputPath: URL

  init(outputPath: URL) {
    self.outputPath = outputPath
    setupMonitors()
  }

  func setupMonitors() {
    // Keyboard events
    NSEvent.addGlobalMonitorForEvents(
      matching: [.keyDown, .keyUp]
    ) { [weak self] event in
      self?.logKeyEvent(event)
    }

    // Mouse events
    NSEvent.addGlobalMonitorForEvents(
      matching: [.leftMouseDown, .rightMouseDown, .scrollWheel]
    ) { [weak self] event in
      self?.logMouseEvent(event)
    }

    // App switching
    NSWorkspace.shared.notificationCenter.addObserver(
      self,
      selector: #selector(appDidActivate),
      name: NSWorkspace.didActivateApplicationNotification,
      object: nil
    )
  }

  @objc func appDidActivate(_ notification: Notification) {
    guard let app = notification.userInfo?[
      NSWorkspace.applicationUserInfoKey
    ] as? NSRunningApplication else { return }

    let event = ActionEvent(
      timestamp: Date().timeIntervalSince1970,
      actionType: "SWITCH_APP",
      appBundleId: app.bundleIdentifier ?? "unknown",
      windowTitle: getActiveWindowTitle() ?? "",
      cursorPosition: getCurrentCursorPosition(),
      keyCode: nil,
      modifiers: [],
      metadata: [:]
    )
    events.append(event)
    flushIfNeeded()
  }

  func flushIfNeeded() {
    if events.count >= 100 {
      saveEvents()
    }
  }

  func saveEvents() {
    let encoder = JSONEncoder()
    encoder.outputFormatting = .prettyPrinted
    if let data = try? encoder.encode(events) {
      try? data.append(to: outputPath)
    }
    events.removeAll()
  }
}`}</pre>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-4">Dataset Preprocessing (Python)</h3>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`import json
import numpy as np
from pathlib import Path
from sentence_transformers import SentenceTransformer
from dataclasses import dataclass
from typing import List, Tuple

@dataclass
class ProcessedSequence:
  states: np.ndarray      # [T, state_dim]
  actions: np.ndarray     # [T]
  next_actions: np.ndarray  # [T]

class DatasetBuilder:
  def __init__(self, raw_data_dir: str, output_dir: str):
    self.raw_data_dir = Path(raw_data_dir)
    self.output_dir = Path(output_dir)
    self.output_dir.mkdir(exist_ok=True)

    # Encoders
    self.text_encoder = SentenceTransformer('all-MiniLM-L6-v2')
    self.app_vocab = {}  # app_id -> int
    self.action_vocab = self._build_action_vocab()

  def _build_action_vocab(self) -> dict:
    """Build action vocabulary."""
    actions = [
      'SWITCH_APP', 'LAUNCH_APP', 'CLOSE_APP',
      'CLICK', 'RIGHT_CLICK', 'DOUBLE_CLICK', 'SCROLL',
      'HOTKEY', 'TYPE_TEXT',
      'NEW_TAB', 'CLOSE_TAB', 'SWITCH_TAB',
      'OPEN_FILE', 'SAVE_FILE',
      'SPOTLIGHT', 'IDLE',
    ]
    return {a: i for i, a in enumerate(actions)}

  def encode_state(self, event: dict) -> np.ndarray:
    """Encode single event to state vector."""
    # App embedding (one-hot or learned)
    app_id = event['appBundleId']
    if app_id not in self.app_vocab:
      self.app_vocab[app_id] = len(self.app_vocab)
    app_idx = self.app_vocab[app_id]
    app_onehot = np.zeros(100)  # Max 100 apps
    app_onehot[min(app_idx, 99)] = 1.0

    # Window title embedding
    title = event.get('windowTitle', '')
    title_emb = self.text_encoder.encode(title)  # [384]

    # Temporal features
    timestamp = event['timestamp']
    hour = (timestamp % 86400) / 86400  # Normalized hour

    # Cursor position (normalized)
    cursor = event.get('cursorPosition', [0, 0])
    cursor_norm = [c / 2000 for c in cursor]  # Assume 2000px max

    # Combine all features
    state = np.concatenate([
      app_onehot,        # [100]
      title_emb,         # [384]
      [hour],            # [1]
      cursor_norm,       # [2]
    ])  # Total: 487 -> pad to 512

    return np.pad(state, (0, 512 - len(state)))

  def encode_action(self, event: dict) -> int:
    """Map event to action vocabulary index."""
    action_type = event['actionType']
    return self.action_vocab.get(action_type, self.action_vocab['IDLE'])

  def build_sequences(
    self,
    events: List[dict],
    seq_len: int = 64
  ) -> List[ProcessedSequence]:
    """Convert raw events to training sequences."""
    sequences = []

    for i in range(0, len(events) - seq_len - 1, seq_len // 2):
      window = events[i:i + seq_len + 1]

      states = np.array([self.encode_state(e) for e in window[:-1]])
      actions = np.array([self.encode_action(e) for e in window[:-1]])
      next_actions = np.array([self.encode_action(e) for e in window[1:]])

      sequences.append(ProcessedSequence(
        states=states,
        actions=actions,
        next_actions=next_actions
      ))

    return sequences

  def process_all(self):
    """Process all raw data files."""
    all_events = []

    for f in self.raw_data_dir.glob('*.json'):
      with open(f) as fp:
        all_events.extend(json.load(fp))

    # Sort by timestamp
    all_events.sort(key=lambda x: x['timestamp'])

    # Build sequences
    sequences = self.build_sequences(all_events)

    # Save as numpy arrays
    np.savez(
      self.output_dir / 'train.npz',
      states=np.array([s.states for s in sequences]),
      actions=np.array([s.actions for s in sequences]),
      next_actions=np.array([s.next_actions for s in sequences]),
    )

    print(f"Saved {len(sequences)} sequences")


# Usage
builder = DatasetBuilder('./raw_events', './processed')
builder.process_all()`}</pre>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Step 5: Quick Start - See First Results</h2>

          <div className="bg-emerald-900/30 rounded-xl p-6 border border-emerald-800/50 mb-6">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Minimum Viable Experiment</h3>
            <p className="text-slate-300 mb-4">
              To see initial results quickly, start with a simplified setup:
            </p>
            <ol className="list-decimal list-inside text-slate-400 space-y-2">
              <li><strong>Record 2-4 hours</strong> of your regular work on macOS</li>
              <li><strong>Focus on app switching only</strong> - simplest action to predict</li>
              <li><strong>Train small model</strong> - 4 layers, 256 dim, ~1M params</li>
              <li><strong>Evaluate top-3 accuracy</strong> - "Is correct action in top 3 predictions?"</li>
            </ol>
          </div>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-4">Full Pipeline Script</h3>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`#!/usr/bin/env python3
"""
next_action_quickstart.py

Minimal end-to-end pipeline:
1. Load preprocessed data
2. Train Decision Transformer
3. Evaluate predictions
"""

import jax
import jax.numpy as jnp
from flax import nnx
import optax
import numpy as np
from pathlib import Path

# === Config ===
CONFIG = {
  'state_dim': 512,
  'action_vocab_size': 64,  # Start small
  'd_model': 256,
  'n_heads': 4,
  'n_layers': 4,
  'max_seq_len': 64,
  'lr': 3e-4,
  'batch_size': 16,
  'epochs': 5,
  'data_path': './processed/train.npz',
}

# === Load Data ===
def load_data(path: str):
  data = np.load(path)
  return {
    'states': jnp.array(data['states']),
    'actions': jnp.array(data['actions']),
    'next_actions': jnp.array(data['next_actions']),
  }

# === Simple Dataloader ===
def batch_iterator(data, batch_size):
  n = len(data['states'])
  indices = np.random.permutation(n)

  for i in range(0, n - batch_size, batch_size):
    idx = indices[i:i + batch_size]
    yield {
      'states': data['states'][idx],
      'actions': data['actions'][idx],
      'next_actions': data['next_actions'][idx],
    }

# === Training ===
def main():
  print("Loading data...")
  data = load_data(CONFIG['data_path'])
  print(f"Loaded {len(data['states'])} sequences")

  print("Creating model...")
  model = create_model(CONFIG)

  # Count parameters
  param_count = sum(
    x.size for x in jax.tree.leaves(nnx.state(model))
  )
  print(f"Model parameters: {param_count:,}")

  # Optimizer
  optimizer = nnx.Optimizer(model, optax.adam(CONFIG['lr']))

  print("Training...")
  for epoch in range(CONFIG['epochs']):
    total_loss = 0
    n_batches = 0

    for batch in batch_iterator(data, CONFIG['batch_size']):
      loss = train_step(
        model, optimizer,
        batch['states'],
        batch['actions'],
        batch['next_actions']
      )
      total_loss += loss
      n_batches += 1

    avg_loss = total_loss / n_batches
    print(f"Epoch {epoch + 1}/{CONFIG['epochs']}, Loss: {avg_loss:.4f}")

  # === Evaluation ===
  print("\\nEvaluating...")
  evaluate(model, data)


def evaluate(model, data, n_samples=100):
  """Compute top-k accuracy."""
  correct_top1 = 0
  correct_top3 = 0

  for i in range(min(n_samples, len(data['states']))):
    states = data['states'][i:i+1]
    actions = data['actions'][i:i+1]
    targets = data['next_actions'][i]

    logits = model(states, actions)
    preds = jnp.argsort(logits[0, -1])[::-1]  # Last position

    target = targets[-1]
    if preds[0] == target:
      correct_top1 += 1
    if target in preds[:3]:
      correct_top3 += 1

  print(f"Top-1 Accuracy: {correct_top1 / n_samples:.2%}")
  print(f"Top-3 Accuracy: {correct_top3 / n_samples:.2%}")


if __name__ == '__main__':
  main()`}</pre>
            </div>
          </div>
        </section>

        {/* Inference */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Step 6: Real-Time Inference</h2>

          <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
            <h3 className="text-lg font-semibold mb-4">Prediction Service</h3>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`import zmq
import json
import jax.numpy as jnp
from collections import deque

class ActionPredictor:
  """Real-time next-action prediction service."""

  def __init__(self, model, max_context: int = 64):
    self.model = model
    self.max_context = max_context
    self.state_buffer = deque(maxlen=max_context)
    self.action_buffer = deque(maxlen=max_context)

    # ZMQ for receiving events from Swift logger
    self.context = zmq.Context()
    self.socket = self.context.socket(zmq.SUB)
    self.socket.connect("tcp://localhost:5555")
    self.socket.setsockopt_string(zmq.SUBSCRIBE, "")

  def encode_event(self, event: dict) -> tuple:
    """Convert raw event to (state, action) pair."""
    # Reuse encoding logic from dataset builder
    state = encode_state(event)
    action = encode_action(event)
    return state, action

  def predict_next(self) -> list:
    """Get top-k predictions for next action."""
    if len(self.state_buffer) < 2:
      return []

    # Prepare input tensors
    states = jnp.array([list(self.state_buffer)])
    actions = jnp.array([list(self.action_buffer)])

    # Forward pass
    logits = self.model(states, actions)
    probs = jax.nn.softmax(logits[0, -1])

    # Top 5 predictions
    top_k = 5
    top_indices = jnp.argsort(probs)[::-1][:top_k]

    predictions = [
      {
        'action': ACTION_NAMES[int(idx)],
        'probability': float(probs[idx])
      }
      for idx in top_indices
    ]

    return predictions

  def run(self):
    """Main event loop."""
    print("Action Predictor running...")

    while True:
      # Receive event from logger
      message = self.socket.recv_string()
      event = json.loads(message)

      # Encode and buffer
      state, action = self.encode_event(event)
      self.state_buffer.append(state)
      self.action_buffer.append(action)

      # Predict
      predictions = self.predict_next()

      if predictions:
        print(f"\\nPredicted next actions:")
        for p in predictions[:3]:
          print(f"  {p['action']}: {p['probability']:.1%}")


# Usage
if __name__ == '__main__':
  model = load_trained_model('./checkpoints/best')
  predictor = ActionPredictor(model)
  predictor.run()`}</pre>
            </div>
          </div>
        </section>

        {/* Repos & Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Relevant Repos & Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ResourceCard
              name="decision-transformer-jax"
              url="https://github.com/yun-kwak/decision-transformer-jax"
              description="JAX/Haiku implementation of Decision Transformer. 2x faster training than PyTorch reference."
            />
            <ResourceCard
              name="JAX AI Stack - miniGPT"
              url="https://docs.jaxstack.ai/en/latest/JAX_for_LLM_pretraining.html"
              description="Official JAX tutorial for training GPT-style models with next-token prediction."
            />
            <ResourceCard
              name="OmniACT Dataset"
              url="https://arxiv.org/abs/2402.17553"
              description="9.8K task pairs of UI screenshots + instructions. Benchmark for GUI autonomous agents."
            />
            <ResourceCard
              name="ScreenAgent"
              url="https://github.com/niuzaisheng/ScreenAgent"
              description="VLM-powered computer control agent with annotated dataset of daily computer tasks."
            />
            <ResourceCard
              name="sniffMK"
              url="https://github.com/objective-see/sniffMK"
              description="macOS mouse and keyboard event sniffer. Good starting point for event logging."
            />
            <ResourceCard
              name="KeyCastr"
              url="https://github.com/keycastr/keycastr"
              description="Open-source keystroke visualizer for macOS. Shows how to capture key events."
            />
            <ResourceCard
              name="UvA DL - JAX Transformers"
              url="https://uvadlc-notebooks.readthedocs.io/en/latest/tutorial_notebooks/JAX/tutorial6/Transformers_and_MHAttention.html"
              description="Comprehensive JAX/Flax transformer tutorial with clean implementations."
            />
            <ResourceCard
              name="Flax Examples"
              url="https://github.com/google/flax"
              description="Official Flax repo with transformer LM examples and best practices."
            />
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Advanced Extensions</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <ExtensionCard
              title="Vision Encoder"
              description="Add screen understanding via ViT/CLIP embeddings for richer state representation"
              difficulty="Medium"
            />
            <ExtensionCard
              title="Multi-Modal Fusion"
              description="Combine text (window titles), vision (screenshots), and actions in unified architecture"
              difficulty="Hard"
            />
            <ExtensionCard
              title="Reward Modeling"
              description="Add goal-conditioning: 'complete task X' → predict actions that achieve it"
              difficulty="Hard"
            />
            <ExtensionCard
              title="Online Learning"
              description="Continuously fine-tune on new user data as patterns change"
              difficulty="Medium"
            />
            <ExtensionCard
              title="Federated Training"
              description="Train across multiple users while keeping data private"
              difficulty="Hard"
            />
            <ExtensionCard
              title="Action Execution"
              description="Close the loop: execute predicted actions with CGEvent or Accessibility API"
              difficulty="Medium"
            />
          </div>
        </section>

        {/* Summary */}
        <section className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 rounded-xl p-6 border border-emerald-800/50">
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-emerald-400 mb-3">What You Need</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• <strong>Data:</strong> 10-100 hours of logged macOS events</li>
                <li>• <strong>Compute:</strong> Single GPU (RTX 3080+) or TPU v4</li>
                <li>• <strong>Time:</strong> 2-4 hours training for initial results</li>
                <li>• <strong>Code:</strong> ~500 lines of JAX/Flax</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-cyan-400 mb-3">Expected Performance</h3>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• <strong>App switching:</strong> 60-80% top-3 accuracy</li>
                <li>• <strong>General actions:</strong> 30-50% top-3 accuracy</li>
                <li>• <strong>Inference:</strong> &lt;10ms per prediction</li>
                <li>• <strong>Model size:</strong> 5-50M parameters</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function GoalCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-slate-800/50 rounded-lg p-4">
      <h4 className="font-semibold text-emerald-400 mb-2">{title}</h4>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}

function DataSourceCard({
  title,
  icon,
  items,
  code,
}: {
  title: string
  icon: string
  items: string[]
  code: string
}) {
  return (
    <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-xl">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="text-sm text-slate-400 space-y-1 mb-4">
        {items.map((item, i) => (
          <li key={i}>• {item}</li>
        ))}
      </ul>
      <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-slate-300 overflow-x-auto">
        <pre>{code}</pre>
      </div>
    </div>
  )
}

function ResourceCard({
  name,
  url,
  description,
}: {
  name: string
  url: string
  description: string
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-slate-900 rounded-xl p-4 border border-slate-800 hover:border-slate-700 transition-colors block"
    >
      <h3 className="font-semibold text-blue-400 mb-2">{name}</h3>
      <p className="text-sm text-slate-400">{description}</p>
      <div className="text-xs text-slate-600 mt-2 truncate">{url}</div>
    </a>
  )
}

function ExtensionCard({
  title,
  description,
  difficulty,
}: {
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
}) {
  const difficultyColors = {
    Easy: "text-green-400 bg-green-900/30",
    Medium: "text-yellow-400 bg-yellow-900/30",
    Hard: "text-red-400 bg-red-900/30",
  }

  return (
    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
      <p className="text-sm text-slate-400">{description}</p>
    </div>
  )
}
