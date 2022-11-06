import React, { useEffect, useRef } from 'react'
import { useAppContext } from '../../context'
import { Button } from '../Button'
import { Message } from '../Message'
import './styles.scss'

export const MessageList = () => {
  const { messages, onShowUsers } = useAppContext()
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView()
  }, [messages])

  return (
    <div className="msg-page">
      <div className="show-users-btn">
        <Button onClick={onShowUsers}>Show users</Button>
      </div>
      <div className="msg-list-container">
        <div className="messages">
          {messages.map((msg, i) => (
            <Message message={msg} key={i} />
          ))}
          <div ref={ref} />
        </div>
      </div>
    </div>
  )
}
