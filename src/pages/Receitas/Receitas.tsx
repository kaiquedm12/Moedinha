import React from 'react'
import { useFinance } from '../../context/FinanceContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, TrendingUp } from 'lucide-react'

export default function Receitas() {
  const { transactions, addTransaction, removeTransaction, totalReceitas } = useFinance()
  const receitas = transactions.filter(t => t.type === 'receita')

  const [amount, setAmount] = React.useState<number>(0)
  const [category, setCategory] = React.useState<string>('')
  const [note, setNote] = React.useState<string>('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !category) return
    addTransaction({ type: 'receita', amount, category, note: note || undefined })
    setAmount(0); setCategory(''); setNote('')
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Receitas</h1>
            <p className="text-muted-foreground">Total: <span className="font-semibold text-green-600 dark:text-green-400">R$ {totalReceitas.toFixed(2)}</span></p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor</Label>
                <Input 
                  id="amount"
                  type="number" 
                  step="0.01" 
                  placeholder="0.00" 
                  value={amount || ''} 
                  onChange={e => setAmount(parseFloat(e.target.value) || 0)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Input 
                  id="category"
                  type="text" 
                  placeholder="Ex: Salário, Freelance..." 
                  value={category} 
                  onChange={e => setCategory(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="note">Nota (opcional)</Label>
                <Input 
                  id="note"
                  type="text" 
                  placeholder="Adicione uma observação" 
                  value={note} 
                  onChange={e => setNote(e.target.value)} 
                />
              </div>
              
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Adicionar Receita
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Receitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {receitas.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Sem receitas cadastradas</p>
              )}
              {receitas.map(t => (
                <div key={t.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    +
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <strong className="font-semibold text-sm">{t.category}</strong>
                      <span className="font-semibold text-sm flex-shrink-0 text-green-600 dark:text-green-400">
                        R$ {t.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span>{new Date(t.date).toLocaleDateString()}</span>
                      {t.note && (
                        <>
                          <span>•</span>
                          <span className="truncate">{t.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeTransaction(t.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
