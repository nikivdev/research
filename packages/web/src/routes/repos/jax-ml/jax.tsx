import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/jax-ml/jax")({
  component: JaxPage,
})

function JaxPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-amber-600 dark:text-amber-400 text-sm font-mono">repos/jax-ml</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">jax</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <span className="text-4xl">🔢</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            JAX
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Composable transformations of NumPy programs
          </p>
          <p className="text-slate-600 dark:text-slate-500 max-w-3xl mx-auto">
            Autodiff, JIT compilation, vectorization, and parallelization. Write NumPy code,
            run on GPU/TPU with transformations that compose freely.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">grad</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">jit</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">vmap</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">pmap</span>
          </div>
        </section>

        {/* Core Transformations */}
        <section className="space-y-8">
          <SectionHeader icon="🔄" title="Core Transformations" subtitle="Composable function transformations" />

          <div className="grid md:grid-cols-2 gap-6">
            <TransformCard
              name="jax.grad"
              desc="Automatic differentiation (reverse-mode). Computes gradients for backprop."
              example={`def loss(params, x, y):
  pred = model(params, x)
  return jnp.mean((pred - y) ** 2)

# Get gradient function
grad_fn = jax.grad(loss)
grads = grad_fn(params, x, y)`}
            />
            <TransformCard
              name="jax.jit"
              desc="JIT compilation via XLA. Fuses ops, runs on GPU/TPU."
              example={`@jax.jit
def train_step(params, batch):
  grads = jax.grad(loss)(params, batch)
  return update_params(params, grads)

# First call compiles, subsequent calls are fast`}
            />
            <TransformCard
              name="jax.vmap"
              desc="Auto-vectorization. Map over batch dimension without loops."
              example={`def single_loss(param, x, y):
  return (model(param, x) - y) ** 2

# Vectorize over batch
batch_loss = jax.vmap(single_loss, in_axes=(None, 0, 0))
losses = batch_loss(params, xs, ys)`}
            />
            <TransformCard
              name="jax.pmap"
              desc="Parallel map across devices. SPMD parallelism for multi-GPU."
              example={`@jax.pmap
def parallel_step(params, batch):
  return train_step(params, batch)

# Runs on all available GPUs/TPUs`}
            />
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6">
            <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Composition is Key</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Transformations compose freely: <code className="text-amber-600 dark:text-amber-400">jax.jit(jax.grad(jax.vmap(f)))</code> - vectorize, differentiate, compile.
            </p>
          </div>
        </section>

        {/* Neural Network Building Blocks */}
        <section className="space-y-8">
          <SectionHeader icon="🧠" title="Neural Network Primitives" subtitle="jax.nn module" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Activation Functions</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-sm">
              {["relu", "gelu", "silu", "swish", "sigmoid", "tanh", "softmax", "log_softmax", "softplus", "elu", "selu", "leaky_relu"].map((fn) => (
                <code key={fn} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-amber-600 dark:text-amber-400 text-center">{fn}</code>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Attention (jax.nn.dot_product_attention)</h3>
            <CodeBlock code={`import jax.nn

# Scaled dot-product attention
# Q: (batch, seq, heads, head_dim)
# K, V: (batch, seq, kv_heads, head_dim)
output = jax.nn.dot_product_attention(
    query,                    # Q
    key,                      # K
    value,                    # V
    scale=1.0/jnp.sqrt(d_k), # Scaling factor
    is_causal=True,          # Causal mask for autoregressive
    # implementation='cudnn'  # FlashAttention on GPU
)

# Supports:
# - Multi-Head Attention (MHA): heads == kv_heads
# - Grouped Query Attention (GQA): heads % kv_heads == 0
# - Multi-Query Attention (MQA): kv_heads == 1`} />
          </div>
        </section>

        {/* Building a Transformer */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Building a Transformer" subtitle="From scratch in JAX" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Layer Implementations</h3>
            <CodeBlock code={`import jax
import jax.numpy as jnp

def layer_norm(x, gamma, beta, eps=1e-6):
    """Layer normalization."""
    mean = jnp.mean(x, axis=-1, keepdims=True)
    var = jnp.var(x, axis=-1, keepdims=True)
    return gamma * (x - mean) / jnp.sqrt(var + eps) + beta

def linear(x, W, b=None):
    """Linear projection."""
    out = jnp.einsum("...d,dh->...h", x, W)
    return out + b if b is not None else out

def mlp(x, W1, b1, W2, b2):
    """MLP with GELU activation."""
    h = jax.nn.gelu(linear(x, W1, b1))
    return linear(h, W2, b2)

def attention(q, k, v, mask=None):
    """Multi-head attention."""
    d_k = q.shape[-1]
    scores = jnp.einsum("bthd,bshd->bhts", q, k) / jnp.sqrt(d_k)
    if mask is not None:
        scores = jnp.where(mask, scores, -1e9)
    attn = jax.nn.softmax(scores, axis=-1)
    return jnp.einsum("bhts,bshd->bthd", attn, v)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Transformer Block</h3>
            <CodeBlock code={`def transformer_block(x, params, mask=None):
    """Single transformer block with pre-norm."""
    # Self-attention
    residual = x
    x = layer_norm(x, params['ln1_g'], params['ln1_b'])

    # Project to Q, K, V
    q = linear(x, params['Wq']).reshape(*x.shape[:-1], n_heads, head_dim)
    k = linear(x, params['Wk']).reshape(*x.shape[:-1], n_heads, head_dim)
    v = linear(x, params['Wv']).reshape(*x.shape[:-1], n_heads, head_dim)

    # Attention + project out
    attn_out = attention(q, k, v, mask)
    attn_out = attn_out.reshape(*x.shape[:-1], d_model)
    attn_out = linear(attn_out, params['Wo'])
    x = residual + attn_out

    # MLP
    residual = x
    x = layer_norm(x, params['ln2_g'], params['ln2_b'])
    x = mlp(x, params['W1'], params['b1'], params['W2'], params['b2'])
    x = residual + x

    return x`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Full Transformer</h3>
            <CodeBlock code={`def transformer(tokens, params, is_training=False):
    """Decoder-only transformer."""
    batch_size, seq_len = tokens.shape

    # Token + position embeddings
    x = params['token_emb'][tokens]  # (batch, seq, d_model)
    pos = jnp.arange(seq_len)
    x = x + params['pos_emb'][pos]

    # Causal mask
    mask = jnp.tril(jnp.ones((seq_len, seq_len)))

    # Transformer blocks
    for i in range(n_layers):
        x = transformer_block(x, params[f'block_{i}'], mask)

    # Final layer norm + output projection
    x = layer_norm(x, params['ln_f_g'], params['ln_f_b'])
    logits = linear(x, params['out_proj'])  # (batch, seq, vocab_size)

    return logits`} />
          </div>
        </section>

        {/* Action Prediction Transformer */}
        <section className="space-y-8">
          <SectionHeader icon="🖱️" title="Action Prediction Transformer" subtitle="For computer use tasks" />

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">Next-Action vs Next-Token</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Instead of predicting the next token, we predict the next action (click, type, scroll, etc.) given screen state and history.
              The model outputs action type + parameters, not text.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Action Space Definition</h3>
            <CodeBlock code={`from dataclasses import dataclass
from enum import IntEnum
import jax.numpy as jnp

class ActionType(IntEnum):
    CLICK = 0
    DOUBLE_CLICK = 1
    RIGHT_CLICK = 2
    TYPE = 3
    KEY = 4           # keyboard shortcut
    SCROLL = 5
    DRAG = 6
    WAIT = 7
    DONE = 8          # task complete

@dataclass
class Action:
    action_type: int       # ActionType enum
    x: float              # normalized [0, 1]
    y: float              # normalized [0, 1]
    text: str | None      # for TYPE action
    key: str | None       # for KEY action (e.g., "ctrl+c")
    scroll_delta: float   # for SCROLL action

# Model outputs:
# - action_type: (batch, num_action_types) logits
# - coordinates: (batch, 2) for x, y
# - text_tokens: (batch, max_text_len, vocab_size) for typing
# - key_tokens: (batch, max_key_len, vocab_size) for shortcuts`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Screen Encoder (Vision)</h3>
            <CodeBlock code={`def patch_embed(image, params):
    """Convert image to patch embeddings (ViT-style)."""
    # image: (batch, height, width, channels)
    batch, h, w, c = image.shape
    patch_size = 16

    # Extract patches: (batch, n_patches, patch_dim)
    patches = image.reshape(
        batch, h // patch_size, patch_size, w // patch_size, patch_size, c
    )
    patches = patches.transpose(0, 1, 3, 2, 4, 5)
    patches = patches.reshape(batch, -1, patch_size * patch_size * c)

    # Linear projection to d_model
    x = linear(patches, params['patch_proj'])

    # Add position embeddings
    n_patches = x.shape[1]
    x = x + params['patch_pos_emb'][:n_patches]

    return x  # (batch, n_patches, d_model)

def encode_screen(screenshot, params):
    """Encode screenshot to embeddings."""
    # Patch embedding
    x = patch_embed(screenshot, params['vision'])

    # Vision transformer blocks
    for i in range(n_vision_layers):
        x = transformer_block(x, params['vision'][f'block_{i}'])

    return x  # (batch, n_patches, d_model)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Action History Encoder</h3>
            <CodeBlock code={`def encode_action(action, params):
    """Encode a single action to embedding."""
    # Action type embedding
    type_emb = params['action_type_emb'][action.action_type]

    # Coordinate embedding (if applicable)
    coord_emb = jnp.zeros(d_model)
    if action.action_type in [ActionType.CLICK, ActionType.DOUBLE_CLICK,
                               ActionType.RIGHT_CLICK, ActionType.DRAG]:
        # Fourier features for coordinates
        coord = jnp.array([action.x, action.y])
        coord_emb = linear(fourier_features(coord), params['coord_proj'])

    # Text embedding (if TYPE action)
    text_emb = jnp.zeros(d_model)
    if action.action_type == ActionType.TYPE and action.text:
        text_tokens = tokenize(action.text)
        text_emb = jnp.mean(params['text_emb'][text_tokens], axis=0)

    return type_emb + coord_emb + text_emb

def encode_history(actions, params):
    """Encode action history sequence."""
    # (batch, history_len, d_model)
    action_embs = jax.vmap(encode_action, in_axes=(0, None))(actions, params)

    # Add position embeddings
    action_embs = action_embs + params['history_pos_emb'][:len(actions)]

    return action_embs`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Full Action Prediction Model</h3>
            <CodeBlock code={`def action_transformer(screenshot, action_history, task_prompt, params):
    """
    Predict next action given current screen, history, and task.

    Args:
        screenshot: (batch, H, W, C) current screen
        action_history: list of past actions
        task_prompt: tokenized task description

    Returns:
        action_type_logits: (batch, num_action_types)
        coord_pred: (batch, 2) normalized x, y
        text_logits: (batch, max_len, vocab_size) for TYPE
    """
    # Encode inputs
    screen_emb = encode_screen(screenshot, params)      # (batch, n_patches, d)
    history_emb = encode_history(action_history, params) # (batch, hist_len, d)
    task_emb = encode_text(task_prompt, params)         # (batch, task_len, d)

    # Concatenate: [CLS, screen, history, task, SEP]
    cls_token = params['cls_token'].reshape(1, 1, -1).repeat(batch, axis=0)
    sep_token = params['sep_token'].reshape(1, 1, -1).repeat(batch, axis=0)

    x = jnp.concatenate([
        cls_token,
        screen_emb,
        sep_token,
        history_emb,
        sep_token,
        task_emb,
    ], axis=1)

    # Transformer (cross-attention between modalities)
    for i in range(n_layers):
        x = transformer_block(x, params[f'block_{i}'])

    # Output heads from CLS token
    cls_out = x[:, 0]  # (batch, d_model)

    # Action type prediction
    action_logits = linear(cls_out, params['action_head'])

    # Coordinate prediction (for click/drag)
    coord_pred = jax.nn.sigmoid(linear(cls_out, params['coord_head']))

    # Text generation (for TYPE action)
    text_logits = linear(x, params['text_head'])  # (batch, seq, vocab)

    return {
        'action_type': action_logits,
        'coords': coord_pred,
        'text': text_logits,
    }`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Loss Function</h3>
            <CodeBlock code={`def action_loss(params, batch):
    """
    Compute loss for action prediction.

    batch contains:
        screenshot, action_history, task_prompt,
        target_action_type, target_coords, target_text
    """
    preds = action_transformer(
        batch['screenshot'],
        batch['action_history'],
        batch['task_prompt'],
        params
    )

    # Action type loss (cross-entropy)
    action_type_loss = -jnp.sum(
        jax.nn.log_softmax(preds['action_type']) *
        jax.nn.one_hot(batch['target_action_type'], num_action_types),
        axis=-1
    ).mean()

    # Coordinate loss (L2 for click/drag actions)
    coord_mask = jnp.isin(
        batch['target_action_type'],
        jnp.array([ActionType.CLICK, ActionType.DOUBLE_CLICK,
                   ActionType.RIGHT_CLICK, ActionType.DRAG])
    )
    coord_loss = jnp.where(
        coord_mask,
        jnp.sum((preds['coords'] - batch['target_coords']) ** 2, axis=-1),
        0.0
    ).mean()

    # Text loss (cross-entropy for TYPE actions)
    text_mask = batch['target_action_type'] == ActionType.TYPE
    text_loss = jnp.where(
        text_mask[:, None],
        -jnp.sum(
            jax.nn.log_softmax(preds['text']) *
            jax.nn.one_hot(batch['target_text'], vocab_size),
            axis=-1
        ),
        0.0
    ).mean()

    return action_type_loss + coord_loss + text_loss`} />
          </div>
        </section>

        {/* Training Loop */}
        <section className="space-y-8">
          <SectionHeader icon="🏋️" title="Training Loop" subtitle="Optimizing the model" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Parameter Initialization</h3>
            <CodeBlock code={`def init_params(key, config):
    """Initialize transformer parameters."""
    keys = jax.random.split(key, 20)

    d_model = config.d_model
    n_heads = config.n_heads
    head_dim = d_model // n_heads
    ff_dim = config.ff_dim

    he_init = jax.nn.initializers.he_normal()

    params = {
        # Embeddings
        'token_emb': he_init(keys[0], (config.vocab_size, d_model)),
        'pos_emb': he_init(keys[1], (config.max_seq_len, d_model)),
        'action_type_emb': he_init(keys[2], (len(ActionType), d_model)),
        'patch_pos_emb': he_init(keys[3], (config.n_patches, d_model)),

        # Special tokens
        'cls_token': he_init(keys[4], (d_model,)),
        'sep_token': he_init(keys[5], (d_model,)),
    }

    # Transformer blocks
    for i in range(config.n_layers):
        params[f'block_{i}'] = init_transformer_block(keys[6 + i], config)

    # Output heads
    params['action_head'] = he_init(keys[-3], (d_model, len(ActionType)))
    params['coord_head'] = he_init(keys[-2], (d_model, 2))
    params['text_head'] = he_init(keys[-1], (d_model, config.vocab_size))

    return params`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Adam Optimizer</h3>
            <CodeBlock code={`def adam_init(params):
    """Initialize Adam optimizer state."""
    return {
        'm': jax.tree.map(jnp.zeros_like, params),  # First moment
        'v': jax.tree.map(jnp.zeros_like, params),  # Second moment
        't': 0
    }

def adam_update(params, grads, opt_state, lr=1e-4, beta1=0.9, beta2=0.999, eps=1e-8):
    """Adam optimizer step."""
    t = opt_state['t'] + 1

    # Update moments
    m = jax.tree.map(
        lambda m, g: beta1 * m + (1 - beta1) * g,
        opt_state['m'], grads
    )
    v = jax.tree.map(
        lambda v, g: beta2 * v + (1 - beta2) * g ** 2,
        opt_state['v'], grads
    )

    # Bias correction
    m_hat = jax.tree.map(lambda m: m / (1 - beta1 ** t), m)
    v_hat = jax.tree.map(lambda v: v / (1 - beta2 ** t), v)

    # Update params
    params = jax.tree.map(
        lambda p, m, v: p - lr * m / (jnp.sqrt(v) + eps),
        params, m_hat, v_hat
    )

    return params, {'m': m, 'v': v, 't': t}`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Training Step</h3>
            <CodeBlock code={`@jax.jit
def train_step(params, opt_state, batch):
    """Single training step."""
    loss, grads = jax.value_and_grad(action_loss)(params, batch)
    params, opt_state = adam_update(params, grads, opt_state)
    return params, opt_state, {'loss': loss}

def train(config, dataset):
    """Full training loop."""
    key = jax.random.key(config.seed)
    key, init_key = jax.random.split(key)

    # Initialize
    params = init_params(init_key, config)
    opt_state = adam_init(params)

    for epoch in range(config.epochs):
        for batch in dataset:
            params, opt_state, metrics = train_step(params, opt_state, batch)

            if step % config.log_every == 0:
                print(f"Step {step}: loss={metrics['loss']:.4f}")

        # Validation
        val_loss = evaluate(params, val_dataset)
        print(f"Epoch {epoch}: val_loss={val_loss:.4f}")

        # Checkpoint
        save_checkpoint(params, opt_state, epoch)

    return params`} />
          </div>
        </section>

        {/* Inference */}
        <section className="space-y-8">
          <SectionHeader icon="🎯" title="Inference" subtitle="Predicting actions" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Action Prediction Loop</h3>
            <CodeBlock code={`def predict_action(params, screenshot, history, task):
    """Predict next action."""
    preds = action_transformer(
        screenshot[None],  # Add batch dim
        history,
        tokenize(task)[None],
        params
    )

    # Sample or argmax action type
    action_type = jnp.argmax(preds['action_type'][0])

    # Get coordinates
    x, y = preds['coords'][0]

    # Generate text if TYPE action
    text = None
    if action_type == ActionType.TYPE:
        text = decode_text(preds['text'][0])

    return Action(
        action_type=int(action_type),
        x=float(x),
        y=float(y),
        text=text,
        key=None,
        scroll_delta=0.0
    )

def execute_task(params, task, env):
    """Execute task in environment."""
    history = []

    for step in range(max_steps):
        screenshot = env.screenshot()
        action = predict_action(params, screenshot, history, task)

        if action.action_type == ActionType.DONE:
            return True, history

        env.execute(action)
        history.append(action)

    return False, history`} />
          </div>
        </section>

        {/* Data Collection */}
        <section className="space-y-8">
          <SectionHeader icon="📊" title="Data Collection" subtitle="Building training data" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Trajectory Format</h3>
            <CodeBlock code={`@dataclass
class Trajectory:
    task: str                    # "Open Chrome and search for JAX"
    screenshots: list[np.array] # Screen at each step
    actions: list[Action]       # Action taken at each step
    success: bool               # Task completed successfully

def trajectory_to_examples(traj: Trajectory):
    """Convert trajectory to training examples."""
    examples = []

    for t in range(len(traj.actions)):
        examples.append({
            'screenshot': traj.screenshots[t],
            'action_history': traj.actions[:t],
            'task_prompt': traj.task,
            'target_action_type': traj.actions[t].action_type,
            'target_coords': jnp.array([traj.actions[t].x, traj.actions[t].y]),
            'target_text': tokenize(traj.actions[t].text or ""),
        })

    return examples

# Collect demonstrations
trajectories = collect_human_demos()  # Or from existing datasets
dataset = [ex for traj in trajectories for ex in trajectory_to_examples(traj)]`} />
          </div>
        </section>

        {/* Random Numbers */}
        <section className="space-y-8">
          <SectionHeader icon="🎲" title="Random Numbers" subtitle="Functional PRNG design" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`import jax.random as jr

# Keys are explicit states (not stateful like NumPy)
key = jr.key(42)

# Split key for different uses
key, subkey1, subkey2 = jr.split(key, 3)

# Generate random arrays
x = jr.normal(subkey1, (10, 10))
dropout_mask = jr.bernoulli(subkey2, 0.1, x.shape)

# In training loop
for step in range(num_steps):
    key, subkey = jr.split(key)
    # Use subkey for dropout, data augmentation, etc.`} />
          </div>
        </section>

        {/* PyTrees */}
        <section className="space-y-8">
          <SectionHeader icon="🌳" title="PyTrees" subtitle="Nested structure handling" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`# PyTrees are nested structures (dicts, lists, tuples, namedtuples)
params = {
    'encoder': {
        'layer_0': {'W': jnp.ones((10, 10)), 'b': jnp.zeros(10)},
        'layer_1': {'W': jnp.ones((10, 10)), 'b': jnp.zeros(10)},
    },
    'decoder': {...}
}

# Apply function to all leaves
zeros = jax.tree.map(jnp.zeros_like, params)
scaled = jax.tree.map(lambda x: x * 0.1, params)

# Combine trees
updated = jax.tree.map(lambda p, g: p - 0.01 * g, params, grads)

# Flatten/unflatten
leaves, treedef = jax.tree.flatten(params)
params = jax.tree.unflatten(treedef, leaves)`} />
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💎" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Composable Transforms"
              description="grad, jit, vmap, pmap compose freely. Write simple code, transform it for performance."
            />
            <TakeawayCard
              title="Functional Paradigm"
              description="Pure functions, explicit state (params, PRNG keys). No hidden mutation. Predictable behavior."
            />
            <TakeawayCard
              title="NumPy + Accelerators"
              description="Write NumPy-like code, run on GPU/TPU via XLA. Same code works everywhere."
            />
            <TakeawayCard
              title="Action Prediction"
              description="Replace next-token with next-action. Same transformer architecture, different output heads."
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

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 overflow-x-auto text-sm">
      <code className="text-slate-700 dark:text-slate-300">{code}</code>
    </pre>
  )
}

function TransformCard({ name, desc, example }: { name: string; desc: string; example: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold text-lg text-amber-600 dark:text-amber-400 mb-2">{name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{desc}</p>
      <CodeBlock code={example} />
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
