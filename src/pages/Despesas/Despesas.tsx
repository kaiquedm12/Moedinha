import React from 'react'
import Card from '../../components/Card'
import { useFinance } from '../../context/FinanceContext'
import './Despesas.css'

export default function Despesas() {
  const { transactions, addTransaction, removeTransaction, totalDespesas } = useFinance()
  const despesas = transactions.filter(t => t.type === 'despesa')

  const [amount, setAmount] = React.useState<number>(0)
  const [category, setCategory] = React.useState<string>('')
  const [note, setNote] = React.useState<string>('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !category) return
    addTransaction({ type: 'despesa', amount, category, note: note || undefined })
    setAmount(0); setCategory(''); setNote('')
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Despesas</h1>
        <span className="muted">Total: R$ {totalDespesas.toFixed(2)}</span>
      </div>
      <div className="grid two">
        <Card title="Adicionar despesa">
          <form className="tx-form" onSubmit={onSubmit}>
            <input type="number" step="0.01" placeholder="Valor" value={amount || ''} onChange={e => setAmount(parseFloat(e.target.value) || 0)} />
            <input type="text" placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} />
            <input type="text" placeholder="Nota (opcional)" value={note} onChange={e => setNote(e.target.value)} />
            <button type="submit">Adicionar</button>
          </form>
        </Card>
        <Card title="Lista de despesas">
          <ul className="tx-list">
            {despesas.length === 0 && <li className="muted">Sem despesas</li>}
            {despesas.map(t => (
              <li key={t.id} className="tx-item">
                <div className="tx-meta">
                  <div className="tx-top">
                    <strong>{t.category}</strong>
                    <span className="amount despesa">R$ {t.amount.toFixed(2)}</span>
                  </div>
                  <div className="tx-bottom">
                    <span className="date">{new Date(t.date).toLocaleDateString()}</span>
                    {t.note && <span className="note">{t.note}</span>}
                  </div>
                </div>
                <button className="icon-btn" aria-label="Remover" onClick={() => removeTransaction(t.id)}>×</button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
