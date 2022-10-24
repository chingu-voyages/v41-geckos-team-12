import React from 'react'
import { ConnectionStatus } from './components/ConnectionStatus/ConntectionStatus'
import { MessageTester } from './components/MessageTester/MessageTester'
import { SideNav } from './components/SideNav'
import { useAppContext } from './context'
import { AppLayout } from './layouts'
import { Welcome } from './pages/Welcome/Welcome'

function App() {
  const { user } = useAppContext()

  if (!user) return <Welcome />

  return (
    <AppLayout SideNav={<SideNav />}>
      <ConnectionStatus />
      <MessageTester />
    </AppLayout>
  )
}

export default App
