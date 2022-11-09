import React, { useRef, useState } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'
import { Button } from '../Button'
import './styles.scss'

// eslint-disable-next-line react/display-name
const EmojiSelector = ({
  show,
  onSelect,
}: {
  show: boolean
  onSelect: (emojiData: EmojiClickData) => void
}) => (
  <div className={`emoji-picker ${show ? 'show' : ''}`}>
    <EmojiPicker onEmojiClick={onSelect} />
  </div>
)

export const MessageInput = ({
  onSend,
}: {
  onSend: (message: string) => void
}) => {
  const [message, setMessage] = useState('')
  const [showEmojis, setShowEmojis] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSend() {
    if (!message) {
      return
    }
    onSend(message)
    setMessage('')
    inputRef.current?.focus()
  }

  return (
    <div className="input-container-msg">
      <div className="input-container">
        {showEmojis && (
          <EmojiSelector
            show={showEmojis}
            onSelect={(emojiData) => {
              setMessage((currentMessage) =>
                currentMessage.concat(' ' + emojiData.emoji + ' ')
              )
              setShowEmojis(false)
            }}
          />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder="Type here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={({ key }) => {
            if (key.toUpperCase() === 'ENTER') handleSend()
          }}
          autoFocus
        />
        <button onClick={() => setShowEmojis((show) => !show)}>😊</button>
      </div>
      <Button variant="filled-purple" onClick={handleSend}>
        Send
      </Button>
    </div>
  )
}
