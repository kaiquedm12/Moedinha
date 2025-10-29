import React from 'react'

interface User {
  username: string
  password: string
  email?: string
}

interface AuthContextValue {
  isAuthenticated: boolean
  login: (username: string, password: string) => { success: boolean; error?: string }
  register: (username: string, password: string, email?: string) => { success: boolean; error?: string }
  logout: () => void
  user: string | null
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'moedinha:auth'
const USERS_KEY = 'moedinha:users'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  React.useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {}
  }, [user])

  const getUsers = (): User[] => {
    try {
      const stored = localStorage.getItem(USERS_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  const saveUsers = (users: User[]) => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
    } catch {}
  }

  const register = (username: string, password: string, email?: string): { success: boolean; error?: string } => {
    if (!username.trim()) return { success: false, error: 'Usuário é obrigatório' }
    if (!password.trim()) return { success: false, error: 'Senha é obrigatória' }
    if (password.length < 6) return { success: false, error: 'Senha deve ter no mínimo 6 caracteres' }

    const users = getUsers()
    
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
      return { success: false, error: 'Usuário já existe' }
    }

    users.push({ username, password, email })
    saveUsers(users)
    return { success: true }
  }

  const login = (username: string, password: string): { success: boolean; error?: string } => {
    if (!username.trim() || !password.trim()) {
      return { success: false, error: 'Usuário e senha são obrigatórios' }
    }

    const users = getUsers()
    const foundUser = users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    )

    if (foundUser) {
      setUser(foundUser.username)
      return { success: true }
    }

    return { success: false, error: 'Usuário ou senha inválidos' }
  }

  const logout = () => setUser(null)

  const value: AuthContextValue = {
    isAuthenticated: !!user,
    login,
    register,
    logout,
    user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
