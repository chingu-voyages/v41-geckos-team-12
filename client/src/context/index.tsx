import React, { createContext, useContext, useState } from 'react'
import { io, Socket } from 'socket.io-client'

type User = {
  username: string
  userId: string
}

interface AppContext {
  user?: User
  socket: Socket | undefined
  messages: string[]
  onStart: (username: string) => void
  onLogout: () => void
  onSendMessage: ({
    message,
    username,
  }: {
    message: string
    username: string
  }) => void
}
const AppContext = createContext({} as AppContext)

export const useAppContext = () => useContext(AppContext)

const establishConnection = () => io({ path: '/api' })

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket>()
  const [messages, setMessages] = useState<string[]>([])
  const [user, setUser] = useState<User>()

  const onStart = (username: string) => {
    const newSocket = establishConnection()

    newSocket.on('connect', () => {
      setSocket(newSocket)

      const newUser = { username, userId: newSocket.id }
      setUser(newUser)
      setMessages((current) => [...current, `Welcome to the chat ${username}`])

      newSocket?.emit('new user', newUser);
   

      newSocket?.on('new message', ({ message }) => {
        setMessages((current) => [...current, message])
      });

      newSocket.emit('which user', "jeremy");

      newSocket?.on('user disconnected', (user) => {
        setMessages((current) => [...current, user + ' left the chat'])
      });

      newSocket.on('new user', (msg) => {
        setMessages((current) => [...current, msg]);
      });

    })
  }

  const onSendMessage = ({
    message,
    username,
  }: {
    message: string
    username: string
  }) => {
    socket?.emit('sendMessage', { message, username })
  }

  const onLogout = () => {
    setUser(undefined)
    setMessages([])
    socket?.disconnect()
  }

  return (
    <AppContext.Provider
      value={{ user, socket, messages, onStart, onLogout, onSendMessage }}
    >
      {children}
    </AppContext.Provider>
  )
}