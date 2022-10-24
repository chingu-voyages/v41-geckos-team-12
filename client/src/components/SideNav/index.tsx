import React from 'react'
import { useAppContext } from '../../context'
import { Button } from '../Button'

export const SideNav = () => {
  const { onLogout } = useAppContext()
  return (
    <>
      <h1 className="title-name">Chatterbox</h1>
      <div className="leavechat-container">
        <Button variant="outlined" onClick={onLogout}>
          Leave chat
        </Button>
      </div>
    </>
  )
}
