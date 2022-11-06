import React from 'react'
import { useAppContext } from '../context'
import './styles.scss'

export const AppLayout = ({
  children,
  SideNav,
}: {
  children: React.ReactNode
  SideNav: React.ReactElement
}) => {
  const { showSideNav } = useAppContext()
  return (
    <div className="app-layout">
      <div className={`app-side-bar ${showSideNav ? 'show' : ''}`}>
        {SideNav}
      </div>
      <div className="app-content">{children}</div>
    </div>
  )
}
