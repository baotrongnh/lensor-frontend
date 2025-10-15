import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import '@mantine/core/styles.css'
import { Notifications } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl'
import { Poppins, Nunito } from "next/font/google"
import "./globals.css"
import MantineProviderWrapper from './mantine-provider'
import { Geist, Geist_Mono } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Lensor - Portfolio Builder for Designers & Photographers",
  description: "Portfolio builder for designers & photographers with templates, custom domains, digital asset store, and Reddit-like communities.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={geist.className} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <NextIntlClientProvider>
          <MantineProviderWrapper>
            <Notifications />
            {children}
          </MantineProviderWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
