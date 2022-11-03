import React from 'react'
import { useAppContext } from '../../context'
import { MessageInput } from '../MessageInput'
import './styles.scss'

export const PrivateChat = () => {
  const { privateChat, endPrivateChat, onSendPrivateMessage } = useAppContext()

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
