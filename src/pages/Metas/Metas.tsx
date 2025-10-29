import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Target, Plus, Minus, Trash2 } from 'lucide-react'

type Meta = { id: string; nome: string; alvo: number; atual: number }
const STORAGE_KEY = 'moedinha:metas'

export default function Metas() {
  const [metas, setMetas] = React.useState<Meta[]>(() => {
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as Meta[] : [] } catch { return [] }
  })
  const [nome, setNome] = React.useState('')
  const [alvo, setAlvo] = React.useState<number>(0)

  React.useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(metas)) } catch {}
  }, [metas])

  const add = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome || !alvo) return
    setMetas(prev => [{ id: crypto.randomUUID?.() ?? String(Date.now()), nome, alvo: Math.abs(alvo), atual: 0 }, ...prev])
    setNome(''); setAlvo(0)
  }

  const atualizar = (id: string, delta: number) => {
    setMetas(prev => prev.map(m => m.id === id ? { ...m, atual: Math.max(0, Math.min(m.alvo, m.atual + delta)) } : m))
  }

  const remover = (id: string) => setMetas(prev => prev.filter(m => m.id !== id))

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10">
          <Target className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Metas</h1>
          <p className="text-muted-foreground">Defina e acompanhe suas metas financeiras</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nova Meta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={add} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Meta</Label>
                <Input 
                  id="nome"
                  placeholder="Ex: Férias, Carro..." 
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="alvo">Valor Alvo</Label>
                <Input 
                  id="alvo"
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  value={alvo || ''} 
                  onChange={e => setAlvo(parseFloat(e.target.value) || 0)} 
                />
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Meta
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acompanhar Metas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metas.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Sem metas cadastradas</p>
              )}
              {metas.map(m => {
                const pct = m.alvo ? Math.round((m.atual / m.alvo) * 100) : 0
                return (
                  <div key={m.id} className="p-4 rounded-lg border bg-card space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-base">{m.nome}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          R$ {m.atual.toFixed(2)} / R$ {m.alvo.toFixed(2)} • {pct}%
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => remover(m.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-primary h-full transition-all duration-300 rounded-full" 
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        onClick={() => atualizar(m.id, 50)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        R$ 50
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => atualizar(m.id, -50)}
                      >
                        <Minus className="h-4 w-4 mr-1" />
                        R$ 50
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
