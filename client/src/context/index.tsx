import React, { createContext, useContext, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { makeDate } from '../utils'

type Date = {
  hour: string
  minute: string
  day: string
  month: string
  year: string
}

type User = {
  id: string
  username: string
  self?: boolean
}

export type Message = {
  message: string
  self?: boolean
  date: Date
}

interface AppContext {
  users: User[]
  socket: Socket | undefined
  messages: Message[]
  privateChat?: User
  onSendMessage: ({ message }: { message: string }) => void
  isLoading: boolean
  showSideNav: boolean
  onSendPrivateMessage: (args: { message: string; id: string }) => void
  onStart: (username: string) => void
  onLogout: () => void
  startPrivateChat: (user: User) => void
  endPrivateChat: () => void
  onShowUsers: () => void
  onHideUsers: () => void
}
const isDevelop = process.env.NODE_ENV === 'development'
const url = isDevelop ? 'localhost:1234' : 'https://chatterbox.onrender.com'
const path = isDevelop ? '/api' : '/socket.io'

const AppContext = createContext({} as AppContext)

export const useAppContext = () => useContext(AppContext)
const establishConnection = () =>
  io(url, {
    path,
    autoConnect: false,
  })

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket] = useState<Socket>(establishConnection())
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [privateChat, setPrivateChat] = useState<User>()
  const [isLoading, setIsLoading] = useState(false)
  const [showSideNav, setShowSideNav] = useState(false)

  const onStart = async (username: string) => {
    socket.auth = { username }

    setIsLoading(true)
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
      setIsLoading(false)
      setUsers(sorted)
    })

    socket.on('user connected', (user: User) => {
      setUsers((currentUsers) => [...currentUsers, user])
      setMessages((current) => [
        ...current,
        { message: `User ${user.username} joined`, date: makeDate() },
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
        { message: newMessage, self: isSelf, date: makeDate() },
      ])
    })

    socket.on('user disconnected', (user: User) => {
      setUsers((currentUsers) =>
        currentUsers.filter((currentUser) => currentUser.id !== user.id)
      )
      setMessages((current) => [
        ...current,
        { message: user.username + ' left the chat', date: makeDate() },
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
        date: makeDate(),
      },
    ])
    socket.emit('privateMessage', { message, id })
    onHideUsers()
  }

  const onShowUsers = () => setShowSideNav(true)
  const onHideUsers = () => setShowSideNav(false)

  return (
    <AppContext.Provider
      value={{
        users,
        socket,
        messages,
        privateChat,
        isLoading,
        showSideNav,
        onStart,
        onLogout,
        onSendMessage,
        onSendPrivateMessage,
        startPrivateChat,
        endPrivateChat,
        onShowUsers,
        onHideUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
