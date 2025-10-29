import React from 'react'
import { useFinance } from '../../context/FinanceContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings2, Trash2 } from 'lucide-react'

export default function Configuracoes() {
  const { clear, transactions } = useFinance()

  const limpar = () => {
    if (confirm('Tem certeza que deseja limpar todas as transações?')) clear()
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-lg bg-primary/10">
          <Settings2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-muted-foreground">Gerencie os dados do aplicativo</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Dados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="space-y-1">
              <h3 className="font-semibold">Total de Transações</h3>
              <p className="text-2xl font-bold text-primary">{transactions.length}</p>
              <p className="text-sm text-muted-foreground">
                {transactions.length === 0 
                  ? 'Nenhuma transação cadastrada' 
                  : transactions.length === 1 
                  ? '1 transação cadastrada'
                  : `${transactions.length} transações cadastradas`}
              </p>
            </div>
            <Button 
              variant="destructive" 
              onClick={limpar}
              disabled={transactions.length === 0}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Limpar Transações
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sobre o Aplicativo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Nome</span>
            <span className="font-semibold">💰 Moedinha</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-muted-foreground">Versão</span>
            <span className="font-semibold">1.0.0</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Armazenamento</span>
            <span className="font-semibold">LocalStorage</span>
          </div>
        </CardContent>
        </Card>
    </div>
  )
}
