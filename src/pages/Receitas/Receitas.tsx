import React from 'react'
import Card from '../../components/Card'
import { useFinance } from '../../context/FinanceContext'
import './Receitas.css'

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
    <div className="page">
      <div className="page-header">
        <h1>Receitas</h1>
        <span className="muted">Total: R$ {totalReceitas.toFixed(2)}</span>
      </div>
      <div className="grid two">
        <Card title="Adicionar receita">
          <form className="tx-form" onSubmit={onSubmit}>
            <input type="number" step="0.01" placeholder="Valor" value={amount || ''} onChange={e => setAmount(parseFloat(e.target.value) || 0)} />
            <input type="text" placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} />
            <input type="text" placeholder="Nota (opcional)" value={note} onChange={e => setNote(e.target.value)} />
            <button type="submit">Adicionar</button>
          </form>
        </Card>
        <Card title="Lista de receitas">
          <ul className="tx-list">
            {receitas.length === 0 && <li className="muted">Sem receitas</li>}
            {receitas.map(t => (
              <li key={t.id} className="tx-item">
                <div className="tx-meta">
                  <div className="tx-top">
                    <strong>{t.category}</strong>
                    <span className="amount receita">R$ {t.amount.toFixed(2)}</span>
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
