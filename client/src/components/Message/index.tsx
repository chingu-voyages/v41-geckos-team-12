import React from 'react'
import './styles.scss'

export const Message = ({ msg, self }: { msg: string; self?: boolean }) => (
  <div className={`message p-m ${self ? 'self' : ''}`}>{msg}</div>
)
