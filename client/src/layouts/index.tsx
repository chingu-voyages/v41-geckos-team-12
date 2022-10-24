import React from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import './styles.scss'

export const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="app-layout">
    <div className="app-side-bar">
      <Logo />
      {/* nav goes here */}
      <h1 className="title-name">Chatterbox</h1>
      <Button variant="outlined">Leave chat</Button>
    </div>
    <div className="app-content">{children}</div>
  </div>
)
