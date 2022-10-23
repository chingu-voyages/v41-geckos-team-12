import React from 'react'
import logo from '../assets/logo-chat.png'

type LogoSize = 'small' | 'large'
const mapSize = (size?: LogoSize) => {
  if (size === 'small') return 35

  if (size === 'large') return 100

  return 50
}

export const Logo = ({ size }: { size?: LogoSize }) => (
  <img src={logo} style={{ width: mapSize(size) }} />
)
