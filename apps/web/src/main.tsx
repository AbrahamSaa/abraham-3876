import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SnailApp from './app/SnailApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnailApp />
  </StrictMode>,
)
