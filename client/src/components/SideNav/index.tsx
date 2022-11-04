import React from 'react'
import { useAppContext } from '../../context'
import { Button } from '../Button'
import { Users } from '../Users'

export const SideNav = () => {
  const { onLogout } = useAppContext()
  return (
    <div className="side-nav">
      <h1 className="title-name">Chatterbox</h1>
      <Users />
      <div className="leavechat-container">
        <Button variant="outlined" onClick={onLogout} fullWidth>
          Leave chat
        </Button>
      </div>
    </div>
  )
}
