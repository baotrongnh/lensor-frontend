import type { Metadata } from "next"
import "./globals.css"
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core'
import '@mantine/core/styles.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const metadata: Metadata = {
  title: "Lensor - Portfolio Builder for Designers & Photographers",
  description: "Portfolio builder for designers & photographers with templates, custom domains, digital asset store, and Reddit-like communities.",
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            {children}
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
