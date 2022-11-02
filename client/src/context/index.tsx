import React, { createContext, useContext, useState } from 'react'
import { io, Socket } from 'socket.io-client'

type User = {
  id: string
  username: string
  self?: boolean
}

interface AppContext {
  users: User[]
  socket: Socket | undefined
  messages: Array<{ message: string; self?: boolean }>
  privateChat?: User
  onSendMessage: ({ message }: { message: string }) => void
  onSendPrivateMessage: (args: { message: string; id: string }) => void
  onStart: (username: string) => void
  onLogout: () => void
  startPrivateChat: (user: User) => void
  endPrivateChat: () => void
}
const AppContext = createContext({} as AppContext)

export const useAppContext = () => useContext(AppContext)

const establishConnection = () =>
  io('https://chatterbox.onrender.com', { path: '/', autoConnect: false })

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket] = useState<Socket>(establishConnection())
  const [messages, setMessages] = useState<
    { message: string; self?: boolean }[]
  >([])
  const [users, setUsers] = useState<User[]>([])
  const [privateChat, setPrivateChat] = useState<User>()

  const onStart = (username: string) => {
    socket.auth = { username }
    socket.connect()

    socket.onAny((event, ...args) => {
      console.log(event, args)
    })

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
      setMessages((current) => [
        ...current,
        { message: `User ${user.username} joined` },
      ])
    })

    socket.on('new message', ({ message, from, users, isPrivate }) => {
      const fromUser = users.find((user: User) => user.id === from)
      const isSelf = fromUser.id === socket.id
      let newMessage = message

      if (!isSelf) {
        newMessage = `${fromUser?.username} says: ${message}`
      }

      if (isPrivate) {
        newMessage = `Private message from ${newMessage}`
      }

      setMessages((current) => [
        ...current,
        { message: newMessage, self: isSelf },
      ])
    })

    socket.on('user disconnected', (user: User) => {
      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser.id !== user.id)
      )
      setMessages((current) => [
        ...current,
        { message: user.username + ' left the chat' },
      ])
    })
  }

  const onSendMessage = ({ message }: { message: string }) => {
    socket.emit('sendMessage', { message })
  }

  const onLogout = () => {
    setUsers([])
    setMessages([])
    socket?.disconnect()
  }

  const startPrivateChat = (user: User) => {
    setPrivateChat(user)
  }
  const endPrivateChat = () => {
    setPrivateChat(undefined)
  }
  const onSendPrivateMessage = ({
    message,
    id,
  }: {
    message: string
    id: string
  }) => {
    const to = users.find((user) => user.id === id)
    setMessages((current) => [
      ...current,
      {
        message: `Private message to ${to?.username} >> ${message}`,
        self: true,
      },
    ])
    socket.emit('privateMessage', { message, id })
  }

  return (
    <AppContext.Provider
      value={{
        users,
        socket,
        messages,
        privateChat,
        onStart,
        onLogout,
        onSendMessage,
        onSendPrivateMessage,
        startPrivateChat,
        endPrivateChat,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
