'use client'

import '@styles/globals.css'
import '@styles/reset.css'
import { Layout } from 'antd'

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <Layout style={{ padding: 16, minHeight: '100%' }}>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  )
}
