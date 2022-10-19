import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context'

export const MessageTester = () => {
  const [messages, setMessages] = useState<string[]>([])

  const { socket } = useAppContext()

  const handleOnClick = () => {
    socket?.emit('frontend-test')
  }

  useEffect(() => {
    if (socket?.active) {
      socket?.on('backend-response', (res) => {
        setMessages((current) => [...current, res.msg])
      })
    }
  }, [socket])

  return (
    <div>
      <button onClick={handleOnClick}>Send a test message</button>
      {messages.map((msg, i) => (
        <pre key={i}>{msg}</pre>
      ))}
    </div>
  )
}
