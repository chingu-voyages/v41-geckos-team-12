import React from 'react'
import { ConnectionStatus } from './components/ConnectionStatus/ConntectionStatus'
import MessageInput from './components/MessageInput/MessageInput'
import { MessageList } from './components/MessageList/MessageLIst'
import { SideNav } from './components/SideNav'
import { useAppContext } from './context'
import { AppLayout } from './layouts'
import { Welcome } from './pages/Welcome/Welcome'

function App() {
  const { users } = useAppContext()

  if (!users.length) return <Welcome />

  return (
    <AppLayout SideNav={<SideNav />}>
      <ConnectionStatus />
      <MessageList />
      <MessageInput />
    </AppLayout>
  )
}

export default App
