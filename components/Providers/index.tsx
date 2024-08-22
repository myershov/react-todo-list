'use client'

import { StoreProvider } from '@components/Providers/StoreProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>
}
