import React, { useState } from 'react'
import { Button } from '../Button'
import './styles.scss'

export const MessageInput = ({
  onSend,
}: {
  onSend: (message: string) => void
}) => {
  const [message, setMessage] = useState('')

  function handleOnClick() {
    if (!message) {
      return
    }
    onSend(message)
    setMessage('')
  }

  return (
    <div className="input-container-msg">
      <input
        className="input-msg"
        type="text"
        placeholder="Type here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        autoFocus
      />
      <Button variant="filled" onClick={handleOnClick}>
        Send
      </Button>
    </div>
  )
}
