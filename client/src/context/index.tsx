import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface AppContext {
  socket: Socket | undefined
}
const AppContext = createContext({} as AppContext)

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    establishConnection(setSocket)
  }, [])

  const establishConnection = (cb: (socket: Socket) => void) => {
    const socket = io({ path: '/api' })
    socket.on('connect', () => cb(socket))
  }

  return (
    <AppContext.Provider value={{ socket }}>{children}</AppContext.Provider>
  )
}
