import React from 'react'
import './styles.scss'

export const Button = ({
  children,
  onClick,
  fullWidth = false,
  variant = 'filled',
}: {
  children: string
  fullWidth?: boolean
  variant?: 'outlined' | 'filled'
  onClick: () => void
}) => (
  <button
    className={`button ${variant} ${fullWidth ? 'fullWidth' : ''}`}
    onClick={onClick}
  >
    {children}
  </button>
)
