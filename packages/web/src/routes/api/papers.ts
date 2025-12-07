import { createFileRoute } from "@tanstack/react-router"
import { getEvent } from "@tanstack/react-start/server"

export const Route = createFileRoute("/api/papers")({
  server: {
    handlers: {
      GET: async () => {
        // Get token from Cloudflare env (via event context) or process.env
        let token: string | undefined
        try {
          const event = getEvent()
          token = (event?.context?.cloudflare?.env as Record<string, string>)?.LA_API_TOKEN
        } catch {
          // Not in event context
        }
        token = token || process.env.LA_API_TOKEN

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
