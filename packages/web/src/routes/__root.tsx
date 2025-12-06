import * as React from "react"
import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRoute,
  Link,
  useLocation,
} from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { CommandPalette } from "../components/command-palette"
import { ThemeToggle } from "../components/theme-toggle"

import appCss from "../styles.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Research" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
})

function RootComponent() {
  const [showDevtools, setShowDevtools] = React.useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.shiftKey && e.key === "d") {
        e.preventDefault()
        setShowDevtools((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <ThemeToggle />
      <Outlet />
      <CommandPalette />
      {showDevtools && <TanStackRouterDevtools />}
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;var k='theme';var m=window.matchMedia('(prefers-color-scheme: dark)');var s=localStorage.getItem(k);var set=function(isDark){d.classList.toggle('dark',isDark);d.style.colorScheme=isDark?'dark':'light'};var isDark=s==='dark'||(s!=='light'&&m.matches);set(isDark);if(!s){m.addEventListener('change',function(e){set(e.matches)})}})()`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
