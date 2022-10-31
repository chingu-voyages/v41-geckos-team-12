import React from 'react'
import { useAppContext } from '../../context'

export const Users = () => {
  const { users } = useAppContext()

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.username}</div>
      ))}
    </div>
  )
}
