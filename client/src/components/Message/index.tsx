import React from 'react'
import './styles.scss'

export const Message = ({ msg }: { msg: string }) => (
  <div className="message p-m">{msg}</div>
)
