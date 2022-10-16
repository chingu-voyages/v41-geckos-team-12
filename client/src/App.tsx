import React, { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const establishConnection = (cb: (socket: Socket) => void) => {
  const socket = io('http://localhost:1234', { path: '/api' })
  socket.on('connect', () => cb(socket))
}

function App() {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    establishConnection(setSocket)
  }, [])

  return <h1>Connected: {socket?.connected ? '✅' : '❌'}</h1>
}

export default App
