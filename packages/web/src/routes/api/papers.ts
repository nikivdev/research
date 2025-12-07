import { createFileRoute } from "@tanstack/react-router"

function getToken(): string | undefined {
  // Try Cloudflare Workers context first (production)
  try {
    const { getServerContext } = require("@tanstack/react-start/server")
    const ctx = getServerContext()
    if (ctx?.cloudflare?.env?.LA_API_TOKEN) {
      return ctx.cloudflare.env.LA_API_TOKEN
    }
  } catch {
    // Not in Cloudflare context
  }
  // Fall back to process.env (local dev)
  return process.env.LA_API_TOKEN
}

export const Route = createFileRoute("/api/papers")({
  server: {
    handlers: {
      GET: async () => {
        const token = getToken()

        if (!token) {
          return new Response(JSON.stringify({ error: "API token not configured" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          })
        }

        try {
          const response = await fetch(
            "https://server-production-b929.up.railway.app/api/papers",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )

          if (!response.ok) {
            return new Response(
              JSON.stringify({ error: `Upstream error: ${response.status}` }),
              {
                status: response.status,
                headers: { "content-type": "application/json" },
              }
            )
          }

          const data = await response.json()
          return new Response(JSON.stringify(data), {
            headers: { "content-type": "application/json" },
          })
        } catch (err) {
          return new Response(
            JSON.stringify({ error: err instanceof Error ? err.message : "Failed to fetch papers" }),
            {
              status: 500,
              headers: { "content-type": "application/json" },
            }
          )
        }
      },
    },
  },
})
