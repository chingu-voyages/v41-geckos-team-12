import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AppProvider } from './context'
const container = document.getElementById('app')

if (container) {
  const root = createRoot(container) // createRoot(container!) if you use TypeScript
  root.render(
    <AppProvider>
      <App />
    </AppProvider>
  )
}
