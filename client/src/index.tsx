import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppProvider } from './context'
import App from './App'
import './styles/global.scss'

const container = document.getElementById('root')

if (container) {
  const root = createRoot(container) // createRoot(container!) if you use TypeScript
  root.render(
    <AppProvider>
      <App />
    </AppProvider>
  )
}
