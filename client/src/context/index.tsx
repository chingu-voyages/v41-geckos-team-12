import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

type User = {
  id: string
  username: string
  self?: boolean
}

interface AppContext {
  users: User[]
  socket: Socket | undefined
  messages: string[]
  onStart: (username: string) => void
  onLogout: () => void
  onSendMessage: ({ message }: { message: string }) => void
}
const AppContext = createContext({} as AppContext)

export const useAppContext = () => useContext(AppContext)

const establishConnection = () => io({ path: '/api', autoConnect: false })

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket] = useState<Socket>(establishConnection())
  const [messages, setMessages] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])

  const onStart = (username: string) => {
    socket.auth = { username }
    socket.connect()

    socket.on('users', (users: User[]) => {
      users.forEach((user) => {
        user.self = user.id === socket.id
      })
      // put the current user first, and then sort by username
      const sorted = (users = users.sort((a, b) => {
        if (a.self) return -1
        if (b.self) return 1
        if (a.username < b.username) return -1
        return a.username > b.username ? 1 : 0
      }))

      setUsers(sorted)
    })

    socket.on('user connected', (user: User) => {
      setUsers((currentUsers) => [...currentUsers, user])
      setMessages((current) => [...current, `User ${user.username} joined`])
    })

    socket.onAny((event, ...args) => {
      console.log(event, args)
    })

    socket.on('new message', ({ message }) => {
      setMessages((current) => [...current, message])
    })

    socket.on('user disconnected', (user: User) => {
      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser.id !== user.id)
      )
      setMessages((current) => [...current, user.username + ' left the chat'])
    })
  }

  const onSendMessage = ({ message }: { message: string }) => {
    const me = users.find((user) => user.id === socket.id)
    socket.emit('sendMessage', { message, username: me?.username })
  }

  const onLogout = () => {
    setUsers([])
    setMessages([])
    socket?.disconnect()
  }

  return (
    <AppContext.Provider
      value={{ users, socket, messages, onStart, onLogout, onSendMessage }}
    >
      {children}
    </AppContext.Provider>
  )
}
