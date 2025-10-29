import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { Button } from '@/components/ui/button'
import { Home, DollarSign, CreditCard, Target, BarChart3, Settings, LogOut, Moon, Sun } from 'lucide-react'

const links = [
  { to: '/', label: 'Início', end: true, icon: Home },
  { to: '/receitas', label: 'Receitas', icon: DollarSign },
  { to: '/despesas', label: 'Despesas', icon: CreditCard },
  { to: '/metas', label: 'Metas', icon: Target },
  { to: '/relatorios', label: 'Relatórios', icon: BarChart3 },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className="w-60 bg-card border-r border-border flex flex-col h-screen sticky top-0 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary mb-1">💰 Moedinha</h1>
        {user && (
          <div className="text-sm text-muted-foreground bg-primary/5 rounded-md p-2">
            Olá, <span className="font-semibold">{user}</span>
          </div>
        )}
      </div>
      
      <nav className="flex-1 space-y-1">
        {links.map(link => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={(link as any).end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? (
            <>
              <Sun className="h-4 w-4" />
              Modo Claro
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              Modo Escuro
            </>
          )}
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-secondary text-secondary-foreground hover:bg-secondary"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </aside>
  )
}
