import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { MotionConfig } from 'framer-motion'
import App from './App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <Router>
    <AuthProvider>
      <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
        <App />
      </MotionConfig>
    </AuthProvider>
  </Router>
)
