import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/repos/ml-explore/mlx")({
  component: MLXPage,
})

function MLXPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="hover:scale-110 transition-transform">🏡</Link>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <span className="text-orange-600 dark:text-orange-400 text-sm font-mono">repos/ml-explore</span>
            <span className="text-slate-400 dark:text-slate-600">/</span>
            <h1 className="text-lg font-semibold">mlx</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
            <span className="text-4xl">🧠</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
            MLX
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Array framework for machine learning on Apple Silicon
          </p>
          <p className="text-slate-600 dark:text-slate-500 max-w-3xl mx-auto">
            Created by Apple's ML research team. Unified memory model, lazy evaluation, NumPy-like API,
            PyTorch-style neural networks. Optimized for M1/M2/M3/M4.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Python + C++</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Metal GPU</span>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-400">Unified Memory</span>
          </div>
        </section>

        {/* Why MLX */}
        <section className="space-y-8">
          <SectionHeader icon="💡" title="Why MLX?" subtitle="What makes it different from PyTorch/JAX" />

          <div className="grid md:grid-cols-2 gap-6">
            <DiffCard
              title="Unified Memory"
              mlx="Arrays live in shared memory. GPU and CPU access same data without copying."
              others="PyTorch/JAX require explicit .to('cuda') transfers over PCIe bus."
            />
            <DiffCard
              title="Lazy Evaluation"
              mlx="Operations build a computation graph. Execute only when you call mx.eval()."
              others="PyTorch is eager by default. JAX requires explicit jit compilation."
            />
            <DiffCard
              title="Dynamic Shapes"
              mlx="Graph structure changes with input shapes. No recompilation needed."
              others="JAX requires consistent shapes for compiled functions."
            />
            <DiffCard
              title="Hardware Target"
              mlx="Designed specifically for Apple Silicon's Metal GPU and unified architecture."
              others="PyTorch/JAX target NVIDIA CUDA primarily."
            />
          </div>
        </section>

        {/* Core Architecture */}
        <section className="space-y-8">
          <SectionHeader icon="🏗️" title="Core Architecture" subtitle="How MLX works under the hood" />

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
            <pre className="text-sm text-slate-600 dark:text-slate-400 overflow-x-auto">
{`┌─────────────────────────────────────────────────────┐
│                    Python API                        │
│  mx.array, mx.nn.Module, mx.optimizers              │
├─────────────────────────────────────────────────────┤
│                  Computation Graph                   │
│  array → Primitive → array → Primitive → ...        │
├─────────────────────────────────────────────────────┤
│                    Transforms                        │
│  grad (VJP), jvp, vmap, compile (JIT)              │
├─────────────────────────────────────────────────────┤
│                     Scheduler                        │
│  Streams (CPU threads / Metal command queues)       │
├─────────────────────────────────────────────────────┤
│                     Backends                         │
│  Metal (GPU)  │  CPU (Accelerate)  │  CUDA (Linux) │
├─────────────────────────────────────────────────────┤
│              Unified Memory (Apple Silicon)          │
│  No data transfer between CPU ↔ GPU                 │
└─────────────────────────────────────────────────────┘`}
            </pre>
          </div>
        </section>

        {/* Array System */}
        <section className="space-y-8">
          <SectionHeader icon="📊" title="Array System" subtitle="The foundation of MLX" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Array as Graph Node</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Every array holds a reference to the operation (Primitive) that created it and its input arrays.
              This forms a directed acyclic graph (DAG) representing the computation.
            </p>
            <CodeBlock code={`// C++ Array Structure (mlx/array.h)
class array {
  struct ArrayDesc {
    Shape shape;              // Dimensions
    Strides strides;          // Memory layout
    Dtype dtype;              // float32, int32, etc.

    std::shared_ptr<Primitive> primitive;  // Op that produced this
    std::vector<array> inputs;             // Input arrays

    Status status;  // unscheduled → evaluated → available
    std::shared_ptr<Data> data;  // The actual buffer
  };
};`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Array States & Lazy Evaluation</h3>
            <CodeBlock code={`import mlx.core as mx

# 1. Create arrays - no computation yet
x = mx.random.normal((1000, 1000))  # status: unscheduled
y = mx.random.normal((1000, 1000))  # status: unscheduled

# 2. Build computation graph - still no computation
z = x @ y           # Matrix multiply - status: unscheduled
w = mx.relu(z)      # ReLU activation - status: unscheduled
loss = mx.mean(w)   # Mean reduction - status: unscheduled

# 3. Trigger evaluation - NOW computation happens
mx.eval(loss)  # All dependencies computed, loss.status → available

# Async evaluation (non-blocking)
mx.async_eval(loss)  # Returns immediately
# ... do other work ...
# Access loss.item() blocks until ready`} />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <StateCard state="unscheduled" desc="Array created but computation not yet scheduled" />
            <StateCard state="evaluated" desc="Scheduled for execution, may be in progress" />
            <StateCard state="available" desc="Computation complete, data ready to read" />
          </div>
        </section>

        {/* Primitives */}
        <section className="space-y-8">
          <SectionHeader icon="⚙️" title="Primitives" subtitle="Operations as graph nodes" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Primitive Interface</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Every operation (add, matmul, conv, etc.) is a Primitive class implementing forward, backward, and vectorization.
            </p>
            <CodeBlock code={`// mlx/primitives.h
class Primitive {
  // Forward pass implementations
  virtual void eval_cpu(const std::vector<array>& inputs,
                        std::vector<array>& outputs) = 0;
  virtual void eval_gpu(const std::vector<array>& inputs,
                        std::vector<array>& outputs) = 0;

  // Automatic differentiation
  virtual std::vector<array> vjp(  // Reverse-mode (backprop)
      const std::vector<array>& primals,
      const std::vector<array>& cotangents,
      const std::vector<int>& argnums,
      const std::vector<array>& outputs);

  virtual std::vector<array> jvp(  // Forward-mode
      const std::vector<array>& primals,
      const std::vector<array>& tangents,
      const std::vector<int>& argnums);

  // Vectorization (batching)
  virtual std::pair<std::vector<array>, std::vector<int>> vmap(
      const std::vector<array>& inputs,
      const std::vector<int>& axes);
};`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Key Primitives</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Arithmetic</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Add, Subtract, Multiply, Divide</li>
                  <li>Power, Exp, Log</li>
                  <li>MatMul, Addmm</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Activation</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>ReLU, Sigmoid, Tanh</li>
                  <li>GELU, SiLU, Softmax</li>
                  <li>LayerNorm, RMSNorm</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Reduction</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>Sum, Mean, Prod</li>
                  <li>Max, Min, ArgMax</li>
                  <li>All, Any</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Automatic Differentiation */}
        <section className="space-y-8">
          <SectionHeader icon="∇" title="Automatic Differentiation" subtitle="Computing gradients" />

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-amber-700 dark:text-amber-400 mb-2">Two Modes</h4>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              <li><strong>VJP (Reverse-mode)</strong>: Backpropagation. Efficient when outputs &lt; inputs. Used for training.</li>
              <li><strong>JVP (Forward-mode)</strong>: Computes Jacobian-vector products. Efficient when inputs &lt; outputs.</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Basic Gradient Computation</h3>
            <CodeBlock code={`import mlx.core as mx

# Define a function
def loss_fn(w, x, y):
    pred = x @ w
    return mx.mean((pred - y) ** 2)

# Create gradient function (VJP)
grad_fn = mx.grad(loss_fn)  # Differentiates w.r.t. first argument

# Or get both value and gradient
value_and_grad_fn = mx.value_and_grad(loss_fn)

# Compute
w = mx.random.normal((10, 1))
x = mx.random.normal((100, 10))
y = mx.random.normal((100, 1))

loss, grad_w = value_and_grad_fn(w, x, y)
mx.eval(loss, grad_w)

print(f"Loss: {loss.item()}")
print(f"Gradient shape: {grad_w.shape}")`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Gradient w.r.t. Multiple Arguments</h3>
            <CodeBlock code={`# Differentiate w.r.t. multiple arguments
grad_fn = mx.grad(loss_fn, argnums=[0, 1])  # Grad w.r.t. w and x
grad_w, grad_x = grad_fn(w, x, y)

# Higher-order derivatives
def f(x):
    return mx.sum(x ** 3)

df = mx.grad(f)      # First derivative: 3x^2
ddf = mx.grad(df)    # Second derivative: 6x

x = mx.array([1.0, 2.0, 3.0])
print(f"f(x)  = {f(x).item()}")      # 1 + 8 + 27 = 36
print(f"f'(x) = {df(x)}")            # [3, 12, 27]
print(f"f''(x) = {ddf(x)}")          # [6, 12, 18]`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">How Each Primitive Implements VJP</h3>
            <CodeBlock code={`// Example: Multiply primitive VJP (mlx/primitives.cpp)
std::vector<array> Multiply::vjp(
    const std::vector<array>& primals,      // [a, b]
    const std::vector<array>& cotangents,   // [∂L/∂(a*b)]
    const std::vector<int>& argnums,
    const std::vector<array>& outputs) {

  // Chain rule: ∂L/∂a = ∂L/∂(a*b) * b
  //             ∂L/∂b = ∂L/∂(a*b) * a
  std::vector<array> grads;
  for (int argnum : argnums) {
    if (argnum == 0) {
      grads.push_back(cotangents[0] * primals[1]);  // ∂L/∂a
    } else {
      grads.push_back(cotangents[0] * primals[0]);  // ∂L/∂b
    }
  }
  return grads;
}`} />
          </div>
        </section>

        {/* Transforms */}
        <section className="space-y-8">
          <SectionHeader icon="🔄" title="Transforms" subtitle="Function transformations" />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-orange-600 dark:text-orange-400 mb-4">mx.grad</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Transform function to compute gradients via reverse-mode autodiff.
              </p>
              <CodeBlock code={`def f(x):
    return mx.sum(x ** 2)

grad_f = mx.grad(f)
x = mx.array([1., 2., 3.])
print(grad_f(x))  # [2., 4., 6.]`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-orange-600 dark:text-orange-400 mb-4">mx.vmap</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Vectorize a function over a batch dimension automatically.
              </p>
              <CodeBlock code={`def single_example(x, w):
    return x @ w

# Vectorize over batch dimension
batched_fn = mx.vmap(single_example, in_axes=(0, None))

x_batch = mx.random.normal((32, 10))  # 32 examples
w = mx.random.normal((10, 5))
out = batched_fn(x_batch, w)  # (32, 5)`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-orange-600 dark:text-orange-400 mb-4">mx.compile</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                JIT compile for kernel fusion and optimization.
              </p>
              <CodeBlock code={`@mx.compile
def fused_ops(x):
    # These ops get fused into one kernel
    x = mx.relu(x)
    x = x * 2
    x = x + 1
    return x

# First call compiles, subsequent calls reuse
out = fused_ops(mx.random.normal((1000,)))`} />
            </div>

            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="font-semibold text-lg text-orange-600 dark:text-orange-400 mb-4">mx.vjp / mx.jvp</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Low-level access to vector-Jacobian and Jacobian-vector products.
              </p>
              <CodeBlock code={`def f(x):
    return mx.stack([mx.sum(x**2), mx.sum(x**3)])

x = mx.array([1., 2., 3.])
v = mx.array([1., 0.])  # Select first output

# VJP: compute ∂f/∂x weighted by v
outputs, vjp_fn = mx.vjp(f, [x])
grads = vjp_fn([v])

# JVP: directional derivative
primals, tangents = mx.jvp(f, [x], [mx.ones_like(x)])`} />
            </div>
          </div>
        </section>

        {/* Memory Management */}
        <section className="space-y-8">
          <SectionHeader icon="💾" title="Memory Management" subtitle="Unified memory on Apple Silicon" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Why Unified Memory Matters</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-red-500 mb-2">Traditional (CUDA)</h4>
                <CodeBlock code={`# PyTorch on NVIDIA
x_cpu = torch.randn(1000, 1000)
x_gpu = x_cpu.to('cuda')  # PCIe transfer!
y_gpu = model(x_gpu)
y_cpu = y_gpu.to('cpu')   # PCIe transfer!

# Each transfer: ~12 GB/s over PCIe
# Latency + bandwidth bottleneck`} />
              </div>
              <div>
                <h4 className="font-semibold text-green-500 mb-2">MLX (Apple Silicon)</h4>
                <CodeBlock code={`# MLX on M1/M2/M3/M4
x = mx.random.normal((1000, 1000))
y = model(x)

# No transfer needed!
# CPU and GPU access same memory
# ~200+ GB/s memory bandwidth`} />
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Memory Tracking & Limits</h3>
            <CodeBlock code={`import mlx.core as mx

# Check memory usage
print(f"Active: {mx.metal.get_active_memory() / 1e9:.2f} GB")
print(f"Peak: {mx.metal.get_peak_memory() / 1e9:.2f} GB")
print(f"Cache: {mx.metal.get_cache_memory() / 1e9:.2f} GB")

# Set limits
mx.metal.set_memory_limit(8 * 1024**3)  # 8 GB max
mx.metal.set_cache_limit(2 * 1024**3)   # 2 GB cache

# Clear cache
mx.metal.clear_cache()

# Reset peak tracking
mx.metal.reset_peak_memory()`} />
          </div>
        </section>

        {/* Neural Network Module */}
        <section className="space-y-8">
          <SectionHeader icon="🧩" title="Neural Networks (mlx.nn)" subtitle="PyTorch-style module system" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Module Base Class</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Modules are dictionaries containing parameters (arrays) and submodules. This enables easy parameter extraction and updates.
            </p>
            <CodeBlock code={`import mlx.nn as nn
import mlx.core as mx

class Module(dict):
    """Base class - a dict of params and submodules"""

    def parameters(self):
        """Get all trainable parameters recursively"""

    def trainable_parameters(self):
        """Get non-frozen parameters"""

    def freeze(self, keys=None, recurse=True):
        """Freeze parameters (no gradient computation)"""

    def unfreeze(self, keys=None, recurse=True):
        """Unfreeze parameters"""

    def update(self, parameters):
        """Replace parameters (used by optimizer)"""

    def train(self, mode=True):
        """Set training mode (affects Dropout, BatchNorm)"""

    def eval(self):
        """Set evaluation mode"""`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Defining a Model</h3>
            <CodeBlock code={`import mlx.nn as nn
import mlx.core as mx

class MLP(nn.Module):
    def __init__(self, in_dim, hidden_dim, out_dim):
        super().__init__()
        self.fc1 = nn.Linear(in_dim, hidden_dim)
        self.fc2 = nn.Linear(hidden_dim, hidden_dim)
        self.fc3 = nn.Linear(hidden_dim, out_dim)
        self.dropout = nn.Dropout(p=0.1)

    def __call__(self, x):
        x = nn.relu(self.fc1(x))
        x = self.dropout(x)
        x = nn.relu(self.fc2(x))
        x = self.dropout(x)
        return self.fc3(x)

model = MLP(784, 256, 10)

# Inspect parameters
for name, param in model.parameters().items():
    print(f"{name}: {param.shape}")`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Available Layers</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Linear</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>nn.Linear</li>
                  <li>nn.Bilinear</li>
                  <li>nn.Embedding</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Convolution</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>nn.Conv1d, Conv2d, Conv3d</li>
                  <li>nn.ConvTranspose1d/2d/3d</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Normalization</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>nn.LayerNorm</li>
                  <li>nn.BatchNorm</li>
                  <li>nn.GroupNorm</li>
                  <li>nn.RMSNorm</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Recurrent</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>nn.RNN</li>
                  <li>nn.LSTM</li>
                  <li>nn.GRU</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Attention</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>nn.MultiHeadAttention</li>
                  <li>nn.Transformer</li>
                  <li>nn.TransformerEncoder</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Regularization</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1">
                  <li>nn.Dropout</li>
                  <li>nn.Dropout2d</li>
                  <li>nn.Dropout3d</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Attention & Transformers */}
        <section className="space-y-8">
          <SectionHeader icon="🔍" title="Attention & Transformers" subtitle="Efficient implementations" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">MultiHeadAttention</h3>
            <CodeBlock code={`import mlx.nn as nn
import mlx.core as mx

# Create attention layer
attn = nn.MultiHeadAttention(
    dims=512,           # Model dimension
    num_heads=8,        # Number of attention heads
    query_input_dims=512,
    key_input_dims=512,
    value_input_dims=512,
    value_dims=512,
    value_output_dims=512,
    bias=False
)

# Forward pass
queries = mx.random.normal((2, 10, 512))  # (batch, seq_len, dim)
keys = mx.random.normal((2, 20, 512))
values = mx.random.normal((2, 20, 512))

# Optional: causal mask for autoregressive
mask = nn.MultiHeadAttention.create_additive_causal_mask(10)

output = attn(queries, keys, values, mask=mask)
print(output.shape)  # (2, 10, 512)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Fused Attention (mx.fast)</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              MLX provides optimized fused kernels for common patterns:
            </p>
            <CodeBlock code={`import mlx.core as mx

# Scaled dot-product attention - single fused kernel
output = mx.fast.scaled_dot_product_attention(
    queries,    # (batch, heads, seq_q, head_dim)
    keys,       # (batch, heads, seq_k, head_dim)
    values,     # (batch, heads, seq_k, head_dim)
    scale=1.0 / math.sqrt(head_dim),
    mask=None   # Optional attention mask
)

# RoPE (Rotary Position Embedding)
output = mx.fast.rope(
    x,              # Input tensor
    dims=64,        # Dimensions to rotate
    traditional=False,
    base=10000.0,
    scale=1.0,
    offset=0
)

# RMS Normalization
output = mx.fast.rms_norm(x, weight, eps=1e-5)

# Layer Normalization
output = mx.fast.layer_norm(x, weight, bias, eps=1e-5)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Full Transformer Block</h3>
            <CodeBlock code={`class TransformerBlock(nn.Module):
    def __init__(self, dims, num_heads, mlp_dims, dropout=0.0):
        super().__init__()
        self.attention = nn.MultiHeadAttention(dims, num_heads)
        self.norm1 = nn.LayerNorm(dims)
        self.norm2 = nn.LayerNorm(dims)
        self.mlp = nn.Sequential(
            nn.Linear(dims, mlp_dims),
            nn.GELU(),
            nn.Linear(mlp_dims, dims),
        )
        self.dropout = nn.Dropout(dropout)

    def __call__(self, x, mask=None):
        # Self-attention with residual
        h = self.norm1(x)
        h = self.attention(h, h, h, mask=mask)
        x = x + self.dropout(h)

        # FFN with residual
        h = self.norm2(x)
        h = self.mlp(h)
        x = x + self.dropout(h)

        return x`} />
          </div>
        </section>

        {/* Training */}
        <section className="space-y-8">
          <SectionHeader icon="🏋️" title="Training" subtitle="Optimizers and training loops" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Available Optimizers</h3>
            <CodeBlock code={`import mlx.optimizers as optim

# SGD with momentum
optimizer = optim.SGD(learning_rate=0.01, momentum=0.9, nesterov=True)

# Adam
optimizer = optim.Adam(learning_rate=0.001, betas=(0.9, 0.999), eps=1e-8)

# AdamW (Adam with decoupled weight decay)
optimizer = optim.AdamW(learning_rate=0.001, weight_decay=0.01)

# Others: RMSprop, Adagrad, AdaDelta, Lion, Adafactor`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Learning Rate Schedulers</h3>
            <CodeBlock code={`import mlx.optimizers as optim

# Exponential decay
lr_schedule = optim.exponential_decay(init=1e-3, decay_rate=0.99)

# Step decay
lr_schedule = optim.step_decay(init=1e-3, decay_rate=0.5, step_size=1000)

# Cosine annealing
lr_schedule = optim.cosine_decay(init=1e-3, decay_steps=10000, end=1e-5)

# Linear warmup + cosine decay
lr_schedule = optim.join_schedules(
    schedules=[
        optim.linear_schedule(init=0, end=1e-3, steps=100),
        optim.cosine_decay(init=1e-3, decay_steps=9900),
    ],
    boundaries=[100]
)

# Use with optimizer
optimizer = optim.Adam(learning_rate=lr_schedule)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Complete Training Loop</h3>
            <CodeBlock code={`import mlx.core as mx
import mlx.nn as nn
import mlx.optimizers as optim

# Model
model = MLP(784, 256, 10)

# Optimizer
optimizer = optim.AdamW(learning_rate=1e-3, weight_decay=0.01)

# Loss function
def loss_fn(model, x, y):
    logits = model(x)
    return nn.losses.cross_entropy(logits, y).mean()

# Training step - use nn.value_and_grad for models
@mx.compile
def train_step(model, x, y):
    loss, grads = nn.value_and_grad(model, loss_fn)(model, x, y)
    return loss, grads

# Training loop
for epoch in range(num_epochs):
    model.train()  # Enable dropout

    for batch_x, batch_y in data_loader:
        # Forward + backward
        loss, grads = train_step(model, batch_x, batch_y)

        # Update parameters
        optimizer.update(model, grads)

        # Evaluate to release memory
        mx.eval(model.parameters())

    # Validation
    model.eval()  # Disable dropout
    val_loss = evaluate(model, val_data)

    print(f"Epoch {epoch}: train_loss={loss.item():.4f}, val_loss={val_loss:.4f}")`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Gradient Checkpointing (Memory Optimization)</h3>
            <CodeBlock code={`# Trade compute for memory by recomputing activations during backward
checkpointed_model = nn.checkpoint(model)

def loss_fn(model, x, y):
    # Intermediate activations not stored, recomputed during backward
    logits = checkpointed_model(x)
    return nn.losses.cross_entropy(logits, y).mean()

# Useful for large models that don't fit in memory`} />
          </div>
        </section>

        {/* Inference */}
        <section className="space-y-8">
          <SectionHeader icon="⚡" title="Inference" subtitle="Loading and running models" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Save & Load Weights</h3>
            <CodeBlock code={`# Save weights
model.save_weights("model.safetensors")  # Preferred format
model.save_weights("model.npz")          # NumPy format

# Load weights
model = MLP(784, 256, 10)
model.load_weights("model.safetensors")

# Or load from Hugging Face format
weights = mx.load("pytorch_model.bin")  # Auto-converts
model.load_weights(list(weights.items()))`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Efficient Inference</h3>
            <CodeBlock code={`# Set to eval mode (disables dropout)
model.eval()

# Compile for faster inference
@mx.compile
def predict(model, x):
    return model(x)

# Run inference
x = mx.random.normal((1, 784))
logits = predict(model, x)
mx.eval(logits)

# Get predictions
probs = mx.softmax(logits, axis=-1)
pred_class = mx.argmax(probs, axis=-1).item()`} />
          </div>
        </section>

        {/* Quantization */}
        <section className="space-y-8">
          <SectionHeader icon="📉" title="Quantization" subtitle="Reduce model size and speed up inference" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Quantized Layers</h3>
            <CodeBlock code={`import mlx.nn as nn

# Quantized linear layer
quantized_linear = nn.QuantizedLinear(
    input_dims=1024,
    output_dims=1024,
    bias=True,
    group_size=64,  # Quantization group size
    bits=4          # 4-bit quantization
)

# Convert existing model
def quantize_model(model, group_size=64, bits=4):
    """Replace Linear layers with QuantizedLinear"""
    for name, module in model.items():
        if isinstance(module, nn.Linear):
            model[name] = nn.QuantizedLinear.from_linear(
                module, group_size=group_size, bits=bits
            )
        elif isinstance(module, nn.Module):
            quantize_model(module, group_size, bits)
    return model

# Quantize
quantized_model = quantize_model(model)`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Quantization Primitives</h3>
            <CodeBlock code={`import mlx.core as mx

# Quantize tensor
quantized, scales, biases = mx.quantize(
    w,                    # Weights to quantize
    group_size=64,        # Elements per quantization group
    bits=4                # Bits per element (2, 4, or 8)
)

# Dequantize
dequantized = mx.dequantize(quantized, scales, biases, group_size, bits)

# Quantized matrix multiply (fused kernel)
output = mx.quantized_matmul(
    x,          # Input (not quantized)
    w_quant,    # Quantized weights
    scales,
    biases,
    transpose=True,
    group_size=64,
    bits=4
)`} />
          </div>
        </section>

        {/* Fine-tuning */}
        <section className="space-y-8">
          <SectionHeader icon="🔧" title="Fine-tuning" subtitle="LoRA and parameter-efficient training" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">LoRA (Low-Rank Adaptation)</h3>
            <CodeBlock code={`import mlx.nn as nn

class LoRALinear(nn.Module):
    """Linear layer with LoRA adaptation"""

    def __init__(self, linear, rank=8, alpha=16):
        super().__init__()
        in_dim = linear.weight.shape[1]
        out_dim = linear.weight.shape[0]

        # Freeze original weights
        self.linear = linear
        self.linear.freeze()

        # Low-rank matrices (trainable)
        scale = alpha / rank
        self.lora_a = mx.random.normal((in_dim, rank)) * 0.01
        self.lora_b = mx.zeros((rank, out_dim))
        self.scale = scale

    def __call__(self, x):
        # Original forward + LoRA
        y = self.linear(x)
        lora_out = (x @ self.lora_a @ self.lora_b) * self.scale
        return y + lora_out

# Apply LoRA to model
def apply_lora(model, rank=8, target_modules=["query_proj", "value_proj"]):
    for name, module in model.items():
        if any(t in name for t in target_modules) and isinstance(module, nn.Linear):
            model[name] = LoRALinear(module, rank=rank)
        elif isinstance(module, nn.Module):
            apply_lora(module, rank, target_modules)

# Freeze base model, only train LoRA
model.freeze()
apply_lora(model)

# Now only LoRA parameters are trainable
trainable = model.trainable_parameters()
print(f"Trainable params: {sum(p.size for p in trainable.values())}")`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Selective Freezing</h3>
            <CodeBlock code={`# Freeze entire model
model.freeze()

# Unfreeze specific layers
model.classifier.unfreeze()

# Freeze by key pattern
model.freeze(keys="bias")  # Freeze all biases
model.unfreeze(keys="weight")  # Unfreeze all weights

# Check what's trainable
for name, param in model.trainable_parameters().items():
    print(f"Training: {name} {param.shape}")`} />
          </div>
        </section>

        {/* Example: Linear Regression */}
        <section className="space-y-8">
          <SectionHeader icon="📈" title="Example: Linear Regression from Scratch" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`import mlx.core as mx

# Generate data
N = 100
D = 10
X = mx.random.normal((N, D))
true_w = mx.random.normal((D, 1))
y = X @ true_w + mx.random.normal((N, 1)) * 0.1

# Initialize weights
w = mx.random.normal((D, 1))

# Loss function
def loss_fn(w):
    pred = X @ w
    return mx.mean((pred - y) ** 2)

# Get gradient function
grad_fn = mx.grad(loss_fn)

# Training
lr = 0.1
for i in range(100):
    # Compute gradient
    grad = grad_fn(w)

    # Update weights
    w = w - lr * grad

    # Evaluate (trigger computation)
    mx.eval(w)

    if i % 10 == 0:
        loss = loss_fn(w)
        mx.eval(loss)
        print(f"Step {i}: loss = {loss.item():.6f}")

print(f"\\nLearned vs True correlation: {mx.corrcoef(w.flatten(), true_w.flatten())[0,1].item():.4f}")`} />
          </div>
        </section>

        {/* Example: Full Neural Network */}
        <section className="space-y-8">
          <SectionHeader icon="🧠" title="Example: MNIST Classifier" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <CodeBlock code={`import mlx.core as mx
import mlx.nn as nn
import mlx.optimizers as optim
import numpy as np

# Load MNIST (using numpy, then convert)
# In practice, use mlx-data or similar
train_images = mx.array(np.load("mnist_train_images.npy") / 255.0)
train_labels = mx.array(np.load("mnist_train_labels.npy"))

# Model
class MNISTClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, stride=1, padding=1)
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2)
        self.fc1 = nn.Linear(64 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, 10)
        self.dropout = nn.Dropout(0.5)

    def __call__(self, x):
        # x: (batch, 28, 28) -> (batch, 1, 28, 28)
        x = x[:, None, :, :]

        x = self.pool(nn.relu(self.conv1(x)))  # -> (batch, 32, 14, 14)
        x = self.pool(nn.relu(self.conv2(x)))  # -> (batch, 64, 7, 7)
        x = x.reshape(x.shape[0], -1)          # -> (batch, 64*7*7)
        x = self.dropout(nn.relu(self.fc1(x)))
        return self.fc2(x)

model = MNISTClassifier()
optimizer = optim.Adam(learning_rate=1e-3)

def loss_fn(model, images, labels):
    logits = model(images)
    return nn.losses.cross_entropy(logits, labels).mean()

# Compiled training step
@mx.compile
def train_step(model, images, labels):
    loss, grads = nn.value_and_grad(model, loss_fn)(model, images, labels)
    return loss, grads

# Training
batch_size = 64
num_epochs = 10

for epoch in range(num_epochs):
    model.train()
    total_loss = 0
    num_batches = 0

    # Shuffle
    indices = mx.random.permutation(len(train_images))

    for i in range(0, len(train_images), batch_size):
        batch_idx = indices[i:i+batch_size]
        batch_images = train_images[batch_idx]
        batch_labels = train_labels[batch_idx]

        loss, grads = train_step(model, batch_images, batch_labels)
        optimizer.update(model, grads)
        mx.eval(model.parameters())

        total_loss += loss.item()
        num_batches += 1

    avg_loss = total_loss / num_batches
    print(f"Epoch {epoch+1}: loss = {avg_loss:.4f}")

# Evaluation
model.eval()
test_logits = model(test_images)
test_preds = mx.argmax(test_logits, axis=-1)
accuracy = mx.mean(test_preds == test_labels).item()
print(f"Test accuracy: {accuracy:.2%}")`} />
          </div>
        </section>

        {/* Debugging & Profiling */}
        <section className="space-y-8">
          <SectionHeader icon="🔬" title="Debugging & Profiling" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Memory Debugging</h3>
            <CodeBlock code={`import mlx.core as mx

# Track memory through training
for step in range(100):
    loss, grads = train_step(model, batch_x, batch_y)
    optimizer.update(model, grads)
    mx.eval(model.parameters())

    # Print memory stats
    active = mx.metal.get_active_memory() / 1e9
    peak = mx.metal.get_peak_memory() / 1e9
    print(f"Step {step}: active={active:.2f}GB, peak={peak:.2f}GB")

    # Reset peak to track per-step
    mx.metal.reset_peak_memory()`} />
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <h3 className="font-semibold text-lg mb-4">Timing</h3>
            <CodeBlock code={`import time

# Synchronous timing
mx.eval(x)  # Ensure previous ops complete
start = time.perf_counter()

y = model(x)
mx.eval(y)  # Wait for completion

end = time.perf_counter()
print(f"Forward pass: {(end - start) * 1000:.2f}ms")

# Or use mx.synchronize()
mx.synchronize()
start = time.perf_counter()
# ... operations ...
mx.synchronize()
end = time.perf_counter()`} />
          </div>
        </section>

        {/* Key Files Reference */}
        <section className="space-y-8">
          <SectionHeader icon="📁" title="Key Files Reference" />

          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">C++ Core</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                  <li>mlx/array.h - Array class</li>
                  <li>mlx/primitives.h - Operations</li>
                  <li>mlx/transforms.h - grad, vjp, jvp</li>
                  <li>mlx/compile.h - JIT compilation</li>
                  <li>mlx/scheduler.h - Execution</li>
                  <li>mlx/backend/metal/ - GPU kernels</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Python API</h4>
                <ul className="text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                  <li>python/mlx/nn/layers/ - NN layers</li>
                  <li>python/mlx/nn/losses.py - Loss funcs</li>
                  <li>python/mlx/optimizers/ - Optimizers</li>
                  <li>python/src/transforms.cpp - Bindings</li>
                  <li>examples/python/ - Examples</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="space-y-8">
          <SectionHeader icon="💎" title="Key Takeaways" />

          <div className="grid md:grid-cols-2 gap-6">
            <TakeawayCard
              title="Unified Memory Advantage"
              description="No CPU↔GPU transfers on Apple Silicon. Arrays accessible by both without copying. ~200+ GB/s memory bandwidth."
            />
            <TakeawayCard
              title="Lazy by Default"
              description="Build computation graphs declaratively. Execute with mx.eval(). Enables automatic optimization and fusion."
            />
            <TakeawayCard
              title="Composable Transforms"
              description="grad, vmap, compile transform functions. Chain them: compile(vmap(grad(f))). JAX-style functional transforms."
            />
            <TakeawayCard
              title="PyTorch-like nn.Module"
              description="Familiar Module API for neural networks. Parameters are dict entries. freeze/unfreeze for fine-tuning."
            />
            <TakeawayCard
              title="Every Primitive has VJP"
              description="Each operation implements its own backward pass. Enables automatic differentiation through any computation."
            />
            <TakeawayCard
              title="Quantization Built-in"
              description="4-bit, 8-bit quantization with fused kernels. QuantizedLinear for memory-efficient inference."
            />
          </div>
        </section>

        {/* Links */}
        <section className="space-y-6">
          <SectionHeader icon="🔗" title="Resources" />
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com/ml-explore/mlx"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              GitHub Repository
            </a>
            <a
              href="https://ml-explore.github.io/mlx/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Documentation
            </a>
            <a
              href="https://github.com/ml-explore/mlx-examples"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              MLX Examples
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

function DiffCard({ title, mlx, others }: { title: string; mlx: string; others: string }) {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
      <h3 className="font-semibold text-lg text-orange-600 dark:text-orange-400 mb-4">{title}</h3>
      <div className="space-y-3 text-sm">
        <div>
          <span className="text-green-600 dark:text-green-400 font-semibold">MLX: </span>
          <span className="text-slate-600 dark:text-slate-400">{mlx}</span>
        </div>
        <div>
          <span className="text-slate-500 font-semibold">Others: </span>
          <span className="text-slate-500">{others}</span>
        </div>
      </div>
    </div>
  )
}

function StateCard({ state, desc }: { state: string; desc: string }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
      <code className="text-orange-600 dark:text-orange-400 font-semibold">{state}</code>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
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
