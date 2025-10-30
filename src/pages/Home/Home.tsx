import React from 'react'
import { useFinance, TransactionType } from '../../context/FinanceContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2, TrendingUp, TrendingDown, Wallet } from 'lucide-react'

export default function Home() {
  const { total, totalDespesas, totalReceitas, transactions, addTransaction, removeTransaction } = useFinance()

  const [type, setType] = React.useState<TransactionType>('receita')
  const [amount, setAmount] = React.useState<number>(0)
  const [category, setCategory] = React.useState<string>('')
  const [note, setNote] = React.useState<string>('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !category) return
    addTransaction({ type, amount, category, note: note || undefined })
    setAmount(0)
    setCategory('')
    setNote('')
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 md:px-6 py-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Saldo Total</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">R$ {total.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalReceitas.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">R$ {totalDespesas.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Nova Transação</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo</Label>
                <select 
                  id="type"
                  value={type} 
                  onChange={e => setType(e.target.value as TransactionType)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="receita">Receita</option>
                  <option value="despesa">Despesa</option>
                </select>
              </div>
              
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
                  placeholder="Ex: Salário, Aluguel..." 
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
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Adicionar Transação
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {transactions.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">Sem transações</p>
              )}
              {transactions.slice(0, 8).map(t => (
                <div key={t.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    t.type === 'receita' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  }`}>
                    {t.type === 'receita' ? '+' : '-'}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <strong className="font-semibold text-sm">{t.category}</strong>
                      <span className={`font-semibold text-sm flex-shrink-0 ${
                        t.type === 'receita' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'
                      }`}>
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
