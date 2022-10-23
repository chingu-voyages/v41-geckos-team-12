import React from 'react'
import { Logo } from '../components/Logo'
import './styles.scss'

export const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="app-layout">
    <div className="app-side-bar">
      <Logo />
      {/* nav goes here */}
    </div>
    <div className="app-content">{children}</div>
  </div>
)
