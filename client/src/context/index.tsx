import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

type User = {
  username: string
  userId: string
}

interface AppContext {
  user?: User
  socket: Socket | undefined
  onStart: (username: string) => void
  onLogout: () => void
}
const AppContext = createContext({} as AppContext)

export const useAppContext = () => useContext(AppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket>()
  const [user, setUser] = useState<User>()

  const onStart = (username: string) => {
    const socket = establishConnection()
    setSocket(socket)
    socket?.emit('new user', { username })
    socket?.on('user created', (res) => {
      setUser({ username: res.username, userId: res.userId })
    })
    socket.on('disconnect', () => {
      socket.emit('user disconnected')
    })
  }

  const onLogout = () => setUser(undefined)

  const establishConnection = () => io({ path: '/api' })

  return (
    <AppContext.Provider value={{ user, socket, onStart, onLogout }}>
      {children}
    </AppContext.Provider>
  )
}
