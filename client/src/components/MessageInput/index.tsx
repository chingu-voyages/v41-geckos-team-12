import React, { useRef, useState } from 'react'
import { Button } from '../Button'
import './styles.scss'

export const MessageInput = ({
  onSend,
}: {
  onSend: (message: string) => void
}) => {
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleOnClick() {
    if (!message) {
      return
    }
    onSend(message)
    setMessage('')
    inputRef.current?.focus()
  }

  return (
    <div className="input-container-msg">
      <input
        ref={inputRef}
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
