import React from 'react'
import { Logo } from '../components/Logo'
import MessageInput from '../components/MessageInput/MessageInput'
import { useAppContext } from '../context'
import './styles.scss'

export const AppLayout = ({
  children,
  SideNav,
}: {
  children: React.ReactNode
  SideNav: React.ReactElement
}) => {
  const { onSendMessage } = useAppContext()

  return (
    <div className="app-layout">
      <div className="app-side-bar">
        <Logo />
        {/* nav goes here */}
        {SideNav}
      </div>
      <div className="app-content">
        {children}
        <MessageInput onClick={onSendMessage} />
      </div>
    </div>
  )
}
