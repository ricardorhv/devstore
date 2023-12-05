import { Header } from '@/components/header'
import { ReactNode } from 'react'

interface StoreLayoutProps {
  children: ReactNode
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
