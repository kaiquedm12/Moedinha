import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Login() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const from = (location.state as any)?.from?.pathname || '/'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const result = login(username, password)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error || 'Erro ao fazer login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-yellow-50 p-4">
      <Card className="w-full max-w-md border-2 border-primary">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-primary">💰 Moedinha</CardTitle>
          <CardDescription>Controle financeiro pessoal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-md p-3 text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Digite seu usuário"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <p className="text-sm text-muted-foreground text-center">
            Não tem uma conta? <Link to="/register" className="text-primary font-semibold hover:underline">Cadastre-se</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
