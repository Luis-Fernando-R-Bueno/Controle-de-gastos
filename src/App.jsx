import { useState } from 'react'
import {
  clearLoginSession,
  loadLoginSession,
  validateLogin,
} from './servicos/authService'
import Inicial from './telas/inicial'
import Login from './telas/login'

function App() {
  const [session, setSession] = useState(loadLoginSession)

  function handleLogin(credentials) {
    const nextSession = validateLogin(credentials)

    if (!nextSession) {
      return false
    }

    setSession(nextSession)
    return true
  }

  function handleLogout() {
    clearLoginSession()
    setSession(null)
  }

  if (!session) {
    return <Login onLogin={handleLogin} />
  }

  return <Inicial session={session} onLogout={handleLogout} />
}

export default App
