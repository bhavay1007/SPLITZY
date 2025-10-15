import type React from "react"
import type { Metadata } from "next"
import { Inter, Work_Sans } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "./providers"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

export const metadata: Metadata = {
  title: "Splitzy - Split Digital Subscriptions",
  description: "Join groups to get family plan pricing on Spotify, Netflix, YouTube Premium and more",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${workSans.variable}`}>
      <head>
        <style>{`
          html {
            font-family: ${inter.style.fontFamily};
            --font-sans: ${inter.variable};
            --font-serif: ${workSans.variable};
          }
        `}</style>
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
