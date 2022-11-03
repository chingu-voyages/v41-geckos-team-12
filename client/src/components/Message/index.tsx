import React from 'react'
import { Message as MessageType } from '../../context'
import { MessageDate } from '../MessageDate'
import './styles.scss'

export const Message = ({ message }: { message: MessageType }) => (
  <div className="msg-container">
    <div className={`message p-m ${message.self ? 'self' : ''}`}>
      {message.message}
<<<<<<< HEAD
      <div className="msg-date">
        <MessageDate date={message.date} />
      </div>
=======
    </div>
    <div className={`msg-date ${message.self ? 'self' : ''}`}>
      <MessageDate date={message.date} />
>>>>>>> e7173d5 (fixed hour to sent messages)
    </div>
  </div>
)
