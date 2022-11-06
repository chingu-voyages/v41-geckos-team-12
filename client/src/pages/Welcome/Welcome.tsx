import React, { useState } from 'react'
import { Button } from '../../components/Button'
import { useAppContext } from '../../context'
import './styles.scss'

const Title = ({ title }: { title: string }) => {
  return (
    <div className="title-container">
      <h1 className="title">{title}</h1>
      <h3 className="description"></h3>
    </div>
  )
}

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
        onKeyDown={({ key }) => {
          if (key.toUpperCase() === 'ENTER') onStart(username)
        }}
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
  const { isLoading } = useAppContext()
  return (
    <div className="welcome">
      <Title title={isLoading ? 'Loading ..' : 'Chatterbox'} />
      {!isLoading && <Input />}
    </div>
  )
}
