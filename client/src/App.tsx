import React from 'react'
import { MessageInput } from './components/MessageInput'
import { MessageList } from './components/MessageList/MessageLIst'
import { PrivateChat } from './components/PrivateChat'
import { SideNav } from './components/SideNav'
import { useAppContext } from './context'
import { AppLayout } from './layouts'
import { Welcome } from './pages/Welcome/Welcome'

function App() {
  const { users, onSendMessage } = useAppContext()

  if (!users.length) return <Welcome />

  return (
    <AppLayout SideNav={<SideNav />}>
      <PrivateChat />
      <MessageList />
      <MessageInput onSend={(message) => onSendMessage({ message })} />
    </AppLayout>
  )
}

export default App
