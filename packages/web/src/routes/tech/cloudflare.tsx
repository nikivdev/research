import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/tech/cloudflare")({
  component: CloudflarePage,
})

function CloudflarePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="text-orange-400 text-sm font-mono">tech</span>
            <span className="text-slate-600">/</span>
            <h1 className="text-lg font-semibold">Cloudflare</h1>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
            <svg className="w-10 h-10 text-orange-400" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5088 16.8447C16.6246 16.4476 16.5765 16.0127 16.3594 15.6372C16.1423 15.2617 15.7792 14.9795 15.3527 14.8559L6.68569 12.4188C6.61004 12.3968 6.54485 12.3506 6.49996 12.2873C6.45507 12.224 6.43313 12.1473 6.43778 12.0699C6.44243 11.9925 6.47339 11.9191 6.52533 11.8617C6.57727 11.8044 6.64718 11.7666 6.72369 11.7543L15.5306 10.3418C16.4056 10.1978 17.1717 9.67283 17.6212 8.91283L18.4962 7.43883C18.5281 7.38383 18.5765 7.34033 18.6338 7.31383C18.6912 7.28733 18.7546 7.27883 18.8165 7.28983C18.8785 7.30083 18.9358 7.33033 18.9812 7.37433C19.0265 7.41833 19.0577 7.47483 19.0712 7.53683L19.4915 9.46783C19.8481 11.0438 20.5388 12.5258 21.5212 13.8208L22.0912 14.5678C22.3435 14.8978 22.4688 15.3068 22.4435 15.7208C22.4181 16.1348 22.2442 16.5268 21.9535 16.8258C21.6627 17.1248 21.2758 17.3112 20.8635 17.3508L7.03769 18.7418C6.93169 18.7528 6.82469 18.7388 6.72569 18.7008C6.62669 18.6628 6.53869 18.6018 6.46869 18.5228C6.39869 18.4438 6.34869 18.3488 6.32269 18.2458C6.29669 18.1428 6.29569 18.0348 6.31969 17.9318L6.68569 16.5188C6.76169 16.2228 6.92669 15.9568 7.15969 15.7568C7.39269 15.5568 7.68269 15.4328 7.98869 15.4008L15.8527 14.5678C15.9327 14.5588 16.0067 14.5218 16.0617 14.4628C16.1167 14.4038 16.1487 14.3268 16.1527 14.2468C16.1567 14.1668 16.1317 14.0878 16.0827 14.0238C16.0337 13.9598 15.9637 13.9148 15.8847 13.8978L7.33569 12.1628C6.62769 12.0188 5.99469 11.6378 5.54469 11.0868C5.09469 10.5358 4.85469 9.84883 4.86669 9.14183C4.87869 8.43483 5.14169 7.75583 5.61069 7.21883C6.07969 6.68183 6.72469 6.32083 7.43669 6.19883L17.2217 4.48583C17.3087 4.47083 17.3987 4.48383 17.4787 4.52283C17.5587 4.56183 17.6247 4.62483 17.6677 4.70283L18.1217 5.51483C18.2117 5.67483 18.2377 5.86283 18.1947 6.04083C18.1517 6.21883 18.0427 6.37383 17.8897 6.47383L17.1567 6.94783C16.9327 7.09283 16.7677 7.31183 16.6887 7.56583L16.5088 16.8447Z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Cloudflare
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Global cloud platform for security, performance, and serverless compute
          </p>
        </section>

        {/* Compute */}
        <Section title="Compute" icon="⚡" color="orange">
          <ProductCard
            name="Workers"
            description="Serverless JavaScript/TypeScript execution at the edge. Deploy code to 300+ locations worldwide with sub-millisecond cold starts."
            features={["V8 isolates", "0ms cold starts", "Free tier: 100k requests/day"]}
          />
          <ProductCard
            name="Workers AI"
            description="Run AI models on Cloudflare's global network. Inference for LLMs, image generation, embeddings, and more."
            features={["Llama, Mistral, Stable Diffusion", "Pay per request", "No GPU management"]}
          />
          <ProductCard
            name="Pages"
            description="Full-stack platform for deploying static sites and serverless functions. Git-integrated with preview deployments."
            features={["Git integration", "Preview URLs", "Unlimited sites on free tier"]}
          />
          <ProductCard
            name="Queues"
            description="Message queue for Workers. Guaranteed delivery with automatic retries and dead-letter queues."
            features={["At-least-once delivery", "Batching", "Dead-letter queues"]}
          />
          <ProductCard
            name="Workflows"
            description="Durable execution engine for long-running tasks. Build reliable multi-step processes with automatic retries."
            features={["Durable state", "Automatic retries", "Sleep for days/weeks"]}
          />
          <ProductCard
            name="Browser Rendering"
            description="Headless Chromium in Workers. Screenshot pages, generate PDFs, scrape content at the edge."
            features={["Puppeteer API", "PDF generation", "Screenshots"]}
          />
        </Section>

        {/* Storage */}
        <Section title="Storage" icon="💾" color="blue">
          <ProductCard
            name="KV"
            description="Global, low-latency key-value store. Eventually consistent with reads from nearest edge location."
            features={["Eventually consistent", "100KB max value", "Free tier: 100k reads/day"]}
            color="blue"
          />
          <ProductCard
            name="R2"
            description="S3-compatible object storage with zero egress fees. Store unlimited data without bandwidth costs."
            features={["Zero egress fees", "S3 compatible", "10GB free storage"]}
            color="blue"
          />
          <ProductCard
            name="D1"
            description="Serverless SQLite database. Full SQL with automatic replication and edge caching."
            features={["SQLite compatible", "5GB free storage", "Automatic backups"]}
            color="blue"
          />
          <ProductCard
            name="Durable Objects"
            description="Strongly consistent storage with single-threaded execution. Perfect for real-time collaboration, rate limiting, and coordination."
            features={["Strong consistency", "WebSocket support", "Transactional storage"]}
            color="blue"
          />
          <ProductCard
            name="Hyperdrive"
            description="Connection pooling and caching for PostgreSQL. Make database queries from Workers fast."
            features={["Connection pooling", "Query caching", "PostgreSQL support"]}
            color="blue"
          />
          <ProductCard
            name="Vectorize"
            description="Vector database for AI applications. Store and query embeddings at the edge."
            features={["Vector similarity search", "Metadata filtering", "Workers integration"]}
            color="blue"
          />
        </Section>

        {/* Security */}
        <Section title="Security" icon="🛡️" color="emerald">
          <ProductCard
            name="WAF"
            description="Web Application Firewall with managed rulesets. Block OWASP top 10, bots, and custom threats."
            features={["Managed rules", "Custom rules", "Rate limiting"]}
            color="emerald"
          />
          <ProductCard
            name="DDoS Protection"
            description="Unmetered, always-on DDoS mitigation. Absorbs attacks of any size at the edge."
            features={["Unmetered", "Layer 3/4/7", "Always on"]}
            color="emerald"
          />
          <ProductCard
            name="Bot Management"
            description="Detect and block malicious bots while allowing good ones. ML-based detection with challenge pages."
            features={["ML detection", "Challenge pages", "Bot score API"]}
            color="emerald"
          />
          <ProductCard
            name="Access (Zero Trust)"
            description="Secure access to internal apps without VPN. Identity-aware proxy with SSO integration."
            features={["SSO integration", "Device posture", "50 free users"]}
            color="emerald"
          />
          <ProductCard
            name="Tunnel"
            description="Secure connection from your origin to Cloudflare without opening ports. Replace VPNs and firewalls."
            features={["No open ports", "Encrypted tunnel", "Free"]}
            color="emerald"
          />
          <ProductCard
            name="SSL/TLS"
            description="Free, automatic HTTPS for all sites. Universal SSL with one-click setup."
            features={["Free certificates", "Auto renewal", "Full strict mode"]}
            color="emerald"
          />
        </Section>

        {/* Performance */}
        <Section title="Performance" icon="🚀" color="purple">
          <ProductCard
            name="CDN"
            description="Global content delivery network. Cache and serve content from 300+ edge locations."
            features={["300+ PoPs", "Tiered caching", "Cache rules"]}
            color="purple"
          />
          <ProductCard
            name="Argo Smart Routing"
            description="Optimize routing across the internet. Find the fastest path between users and origins."
            features={["~30% faster", "Automatic failover", "Real-time optimization"]}
            color="purple"
          />
          <ProductCard
            name="Images"
            description="Image optimization and transformation. Resize, compress, and convert on-the-fly."
            features={["WebP/AVIF", "Responsive images", "Polish compression"]}
            color="purple"
          />
          <ProductCard
            name="Stream"
            description="Video streaming platform. Upload, encode, and deliver video at scale."
            features={["Adaptive bitrate", "Live streaming", "Player embed"]}
            color="purple"
          />
          <ProductCard
            name="Zaraz"
            description="Third-party tool manager. Load analytics and marketing tags without slowing your site."
            features={["Server-side loading", "No client JS", "Privacy focused"]}
            color="purple"
          />
          <ProductCard
            name="Waiting Room"
            description="Virtual queue for high-traffic events. Manage traffic spikes without crashing your origin."
            features={["Customizable UI", "Fair queuing", "Real-time analytics"]}
            color="purple"
          />
        </Section>

        {/* Developer Platform */}
        <Section title="Developer Platform" icon="🔧" color="cyan">
          <ProductCard
            name="Wrangler"
            description="CLI for Cloudflare Workers. Develop, test, and deploy from the command line."
            features={["Local dev server", "Tail logs", "Secrets management"]}
            color="cyan"
          />
          <ProductCard
            name="Miniflare"
            description="Local Workers simulator. Test Workers locally with full API compatibility."
            features={["Full API support", "Fast iteration", "Vitest integration"]}
            color="cyan"
          />
          <ProductCard
            name="Workers Analytics Engine"
            description="Write and query analytics data from Workers. SQL-based analytics at massive scale."
            features={["SQL queries", "Time-series data", "Sampling support"]}
            color="cyan"
          />
          <ProductCard
            name="Pub/Sub"
            description="MQTT message broker. Connect IoT devices and build real-time applications."
            features={["MQTT 5.0", "Workers integration", "Scalable"]}
            color="cyan"
          />
          <ProductCard
            name="Calls"
            description="WebRTC infrastructure. Build video/audio calling into your applications."
            features={["SFU infrastructure", "Recording", "WHIP/WHEP"]}
            color="cyan"
          />
        </Section>

        {/* Network Services */}
        <Section title="Network Services" icon="🌐" color="amber">
          <ProductCard
            name="DNS"
            description="Fastest authoritative DNS. Free DNS hosting with instant propagation."
            features={["~11ms average", "DNSSEC", "Unlimited queries"]}
            color="amber"
          />
          <ProductCard
            name="1.1.1.1"
            description="Privacy-focused DNS resolver. Fast, free, and doesn't sell your data."
            features={["Privacy first", "DoH/DoT", "Malware blocking (1.1.1.2)"]}
            color="amber"
          />
          <ProductCard
            name="Load Balancing"
            description="Global load balancing with health checks. Route traffic based on latency, geography, or weights."
            features={["Health checks", "Geo steering", "Session affinity"]}
            color="amber"
          />
          <ProductCard
            name="Spectrum"
            description="DDoS protection for TCP/UDP. Protect any protocol, not just HTTP."
            features={["TCP/UDP protection", "Minecraft, SSH", "Any port"]}
            color="amber"
          />
          <ProductCard
            name="Magic Transit"
            description="Network-layer DDoS protection. Protect entire IP ranges and data centers."
            features={["BGP integration", "Network firewall", "Enterprise grade"]}
            color="amber"
          />
        </Section>

        {/* Email */}
        <Section title="Email" icon="📧" color="rose">
          <ProductCard
            name="Email Routing"
            description="Free email forwarding. Route emails to your domain to any address."
            features={["Free", "Catch-all support", "Worker integration"]}
            color="rose"
          />
          <ProductCard
            name="Email Workers"
            description="Process emails with Workers. Parse, filter, and respond to emails programmatically."
            features={["Parse emails", "Auto-reply", "Forward conditionally"]}
            color="rose"
          />
          <ProductCard
            name="DMARC Management"
            description="Email security and deliverability. Monitor and improve email authentication."
            features={["DMARC reports", "SPF/DKIM", "Threat intelligence"]}
            color="rose"
          />
        </Section>

        {/* Registrar */}
        <Section title="Registrar" icon="📝" color="slate">
          <ProductCard
            name="Registrar"
            description="At-cost domain registration. No markup, no hidden fees, just wholesale prices."
            features={["At-cost pricing", "Free WHOIS privacy", "No renewal markup"]}
            color="slate"
          />
        </Section>
      </main>
    </div>
  )
}

function Section({ title, icon, color, children }: {
  title: string
  icon: string
  color: string
  children: React.ReactNode
}) {
  const colors: Record<string, string> = {
    orange: "from-orange-500/10 to-orange-500/5 border-orange-500/20",
    blue: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
    emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
    purple: "from-purple-500/10 to-purple-500/5 border-purple-500/20",
    cyan: "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20",
    amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20",
    rose: "from-rose-500/10 to-rose-500/5 border-rose-500/20",
    slate: "from-slate-500/10 to-slate-500/5 border-slate-500/20",
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4`}>
        {children}
      </div>
    </section>
  )
}

function ProductCard({ name, description, features, color = "orange" }: {
  name: string
  description: string
  features: string[]
  color?: string
}) {
  const colors: Record<string, { bg: string; text: string; badge: string }> = {
    orange: { bg: "bg-orange-500/5 border-orange-500/20 hover:border-orange-500/40", text: "text-orange-400", badge: "bg-orange-500/10 text-orange-400" },
    blue: { bg: "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40", text: "text-blue-400", badge: "bg-blue-500/10 text-blue-400" },
    emerald: { bg: "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40", text: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400" },
    purple: { bg: "bg-purple-500/5 border-purple-500/20 hover:border-purple-500/40", text: "text-purple-400", badge: "bg-purple-500/10 text-purple-400" },
    cyan: { bg: "bg-cyan-500/5 border-cyan-500/20 hover:border-cyan-500/40", text: "text-cyan-400", badge: "bg-cyan-500/10 text-cyan-400" },
    amber: { bg: "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40", text: "text-amber-400", badge: "bg-amber-500/10 text-amber-400" },
    rose: { bg: "bg-rose-500/5 border-rose-500/20 hover:border-rose-500/40", text: "text-rose-400", badge: "bg-rose-500/10 text-rose-400" },
    slate: { bg: "bg-slate-500/5 border-slate-500/20 hover:border-slate-500/40", text: "text-slate-400", badge: "bg-slate-500/10 text-slate-400" },
  }

  const c = colors[color]

  return (
    <div className={`${c.bg} border rounded-xl p-5 transition-colors`}>
      <h3 className={`font-semibold ${c.text} mb-2`}>{name}</h3>
      <p className="text-sm text-slate-400 mb-4 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {features.map((feature) => (
          <span key={feature} className={`px-2 py-1 text-xs rounded-full ${c.badge}`}>
            {feature}
          </span>
        ))}
      </div>
    </div>
  )
}
