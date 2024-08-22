import { MainLayout } from '@components/Layouts/Main'
import { Providers } from '@components/Providers'
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
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  )
}
