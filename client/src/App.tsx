import React from 'react'
import { ConnectionStatus } from './components/ConnectionStatus/ConntectionStatus'
import { MessageTester } from './components/MessageTester/MessageTester'
import { useAppContext } from './context'
import { Welcome } from './pages/Welcome/Welcome'

function App() {
  const { user } = useAppContext()

  if (!user) return <Welcome />

  return (
    <div>
      <ConnectionStatus />
      <MessageTester />
    </div>
  )
}

export default App
