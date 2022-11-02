import React, { useState } from 'react'
import { useAppContext } from '../../context'
import { Message } from '../Message'
import { MessageInput } from '../MessageInput'
import './styles.scss'

export const PrivateChat = () => {
  const { privateChat, endPrivateChat, onSendPrivateMessage } = useAppContext()
  const [messages, setMessages] = useState<string[]>([])

  if (!privateChat) return null

  return (
    <div className="backdrop">
      <div className="card">
        <div className="card_header">
          <h3>Send {privateChat.username} a private message</h3>
          <div
            style={{ cursor: 'pointer', fontSize: 30 }}
            onClick={endPrivateChat}
          >
            ✖
          </div>
        </div>
        <div className="card_messages">
          {messages.map((message, i) => (
            <Message msg={message} key={i} />
          ))}
        </div>
        <MessageInput
          onSend={(message: string) => {
            onSendPrivateMessage({ message, id: privateChat.id })
            endPrivateChat()
          }}
        />
      </div>
    </div>
  )
}
