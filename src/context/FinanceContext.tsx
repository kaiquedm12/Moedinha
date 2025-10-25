import React from 'react'

export type TransactionType = 'receita' | 'despesa'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: string
  date: string
  note?: string
}

interface FinanceContextValue {
  transactions: Transaction[]
  total: number
  totalReceitas: number
  totalDespesas: number
  addTransaction: (t: { type: TransactionType; amount: number; category: string; note?: string; date?: string }) => void
  removeTransaction: (id: string) => void
  clear: () => void
}

const FinanceContext = React.createContext<FinanceContextValue | undefined>(undefined)

const STORAGE_KEY = 'moedinha:transactions'

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = React.useState<Transaction[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as Transaction[]) : []
    } catch {
      return []
    }
  })

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
    } catch {}
  }, [transactions])

  const addTransaction: FinanceContextValue['addTransaction'] = (t) => {
    const tx: Transaction = {
      id: (globalThis.crypto && 'randomUUID' in globalThis.crypto) ? crypto.randomUUID() : String(Date.now()),
      type: t.type,
      amount: Math.abs(t.amount),
      category: t.category,
      note: t.note,
      date: t.date ?? new Date().toISOString(),
    }
    setTransactions((prev) => [tx, ...prev])
  }

  const removeTransaction = (id: string) => setTransactions((prev) => prev.filter((t) => t.id !== id))
  const clear = () => setTransactions([])

  const { totalReceitas, totalDespesas, total } = React.useMemo(() => {
    const receitas = transactions.filter((t) => t.type === 'receita').reduce((acc, t) => acc + t.amount, 0)
    const despesas = transactions.filter((t) => t.type === 'despesa').reduce((acc, t) => acc + t.amount, 0)
    return { totalReceitas: receitas, totalDespesas: despesas, total: receitas - despesas }
  }, [transactions])

  const value: FinanceContextValue = { transactions, total, totalReceitas, totalDespesas, addTransaction, removeTransaction, clear }

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}

export function useFinance() {
  const ctx = React.useContext(FinanceContext)
  if (!ctx) throw new Error('useFinance deve ser usado dentro de FinanceProvider')
  return ctx
}
