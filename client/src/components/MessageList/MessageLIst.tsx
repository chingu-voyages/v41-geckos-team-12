import React from 'react'
import { useAppContext } from '../../context'
import { Button } from '../Button'
import { Message } from '../Message'
import './styles.scss'

export const MessageList = () => {
  const { messages, onShowUsers } = useAppContext()

  return (
    <div className="msg-list-container">
      <div className="show-users-btn">
        <Button onClick={onShowUsers}>Show users</Button>
      </div>
      <div className="messages">
        {messages.map((msg, i) => (
          <Message message={msg} key={i} />
        ))}
      </div>
    </div>
  )
}
