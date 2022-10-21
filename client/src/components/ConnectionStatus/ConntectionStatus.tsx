import React, { useEffect, useState } from 'react'
import './styles.scss'

export const ConnectionStatus = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true)
    }, 0)
  }, [])

  return (
    <div className={`status-toast p-m ${!isMounted ? '' : 'transition'}`}>
      <div className="label">Connected</div>
    </div>
  )
}
