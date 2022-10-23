import React from 'react'
import './styles.scss'

export const Button = ({
  children,
  onClick,
  variant = 'filled',
}: {
  children: string
  variant?: 'outlined' | 'filled'
  onClick: () => void
}) => (
  <button className={`button ${variant}`} onClick={onClick}>
    {children}
  </button>
)
