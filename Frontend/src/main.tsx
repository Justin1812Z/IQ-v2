import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Navbar from './components/Navbar/Navbar.tsx'
import Welcome from './components/Welcome/Welcome.tsx'
import Browse from './components/Browse/Browse.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    
   
  </StrictMode>,
)
