import React from 'react'
import { useAppContext } from '../context'

export const ConnectionStatus = () => {
  const { socket } = useAppContext()

  return <h1>Connected: {socket?.connected ? '✅' : '❌'}</h1>
}
