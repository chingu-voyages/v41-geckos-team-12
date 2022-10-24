import React from 'react'
import { Logo } from '../components/Logo'
import './styles.scss'

export const AppLayout = ({
  children,
  SideNav,
}: {
  children: React.ReactNode
  SideNav: React.ReactElement
}) => (
  <div className="app-layout">
    <div className="app-side-bar">
      <Logo />
      {/* nav goes here */}
      {SideNav}
    </div>
    <div className="app-content">{children}</div>
  </div>
)
