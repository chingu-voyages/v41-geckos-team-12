import React from 'react'
import { useAppContext } from '../../context'
import './styles.scss'

export const Users = () => {
  const { users, startPrivateChat } = useAppContext()

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {users.map((user) => (
        <button
          onClick={() => {
            if (!user.self) {
              startPrivateChat(user)
            }
          }}
          key={user.id}
          className="user_button"
        >
          {user.self ? 'Me' : user.username}
        </button>
      ))}
    </div>
  )
}
