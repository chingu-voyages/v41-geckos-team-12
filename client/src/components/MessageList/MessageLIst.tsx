import React from 'react'
import { useAppContext } from '../../context'
import { Message } from '../Message'
import './styles.scss'

export const MessageList = () => {
  const { messages } = useAppContext()

  return (
    <div className="msg-list-container">
      <div className="messages">
        {messages.map((msg, i) => (
          <Message message={msg} key={i} />
        ))}
      </div>
    </div>
  )
}
