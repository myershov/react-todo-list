import { Providers } from '@components/Providers'
import '@styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TODO',
  description: 'simple todo & andvanced technologies'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
