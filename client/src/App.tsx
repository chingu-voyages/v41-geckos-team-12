import React from 'react'
import { ConnectionStatus } from './components/ConntectionStatus'
import { MessageTester } from './components/MessageTester'

function App() {
  return (
    <div>
      <ConnectionStatus />
      <MessageTester />
    </div>
  )
}

export default App
