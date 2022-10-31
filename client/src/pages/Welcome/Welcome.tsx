import React, { useState } from 'react'
import { Button } from '../../components/Button'
import { useAppContext } from '../../context'
import './styles.scss'

const Title = () => (
  <div className="title-container">
    <h1 className="title">Chatterbox</h1>
    <h3 className="description"></h3>
  </div>
)

const Input = () => {
  const [username, setUsername] = useState('')
  const { onStart } = useAppContext()
  return (
    <div className="input-container">
      <input
        className="input p-l"
        autoFocus
        placeholder="Chat name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Button
        variant="outlined"
        onClick={() => {
          if (username.length) {
            onStart(username)
          }
        }}
      >
        Start
      </Button>
    </div>
  )
}

export const Welcome = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Title />
      <Input />
    </div>
  )
}
