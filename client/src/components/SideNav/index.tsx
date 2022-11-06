import React from 'react'
import { useAppContext } from '../../context'
import { Button } from '../Button'
import { Logo } from '../Logo'
import { Users } from '../Users'
import './styles.scss'

export const SideNav = () => {
  const { onLogout, onHideUsers } = useAppContext()
  return (
    <div className="side-nav">
      <div className="header">
        <h1 className="title-name">Chatterbox</h1>
        <Logo size="small" />
      </div>

      <Users />
      <div className="side-nav-actions">
        <Button variant="outlined" onClick={onLogout} fullWidth>
          Leave chat
        </Button>
        <div className="close-side-nav">
          <Button onClick={onHideUsers} fullWidth>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
