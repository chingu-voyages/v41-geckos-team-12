import React from 'react'
import { useAppContext } from '../../context'
import { Message } from '../Message'
import './styles.scss'

export const MessageList = () => {
  const { messages } = useAppContext()

  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => (
          <Message msg={msg.message} self={msg.self} key={i} />
        ))}
      </div>
    </div>
  )
}
