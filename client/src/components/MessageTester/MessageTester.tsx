import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context'
import './styles.scss'

export const MessageTester = () => {
  const [messages, setMessages] = useState<string[]>([])

  const { socket, user } = useAppContext()

  const handleOnClick = () => {
    socket?.emit('user message', user?.username)
  }

  useEffect(() => {
    if (socket?.active) {
      socket?.on('new message', (res) => {
        setMessages((current) => [...current, res.msg])
      })
      socket.on('user disconnected', () => {
        setMessages((current) => [...current, 'Someone left the chat'])
      })
      socket.on('new user', (msg) => {
        setMessages((current) => [...current, msg])
      })
    }
  }, [socket])

  return (
    <div>
      <button className="button" onClick={handleOnClick}>
        Send a test message
      </button>
      <div className="messages">
        {messages.map((msg, i) => (
          <div className="message p-m" key={i}>
            {msg}
          </div>
        ))}
      </div>
    </div>
  )
}
