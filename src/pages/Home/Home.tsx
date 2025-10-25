import React from 'react'
import Card from '../../components/Card'
import { useFinance, TransactionType } from '../../context/FinanceContext'
import './Home.css'

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
    <div className="home">
      <div className="home-grid">
        <Card title="Saldo">
          <div className="stat"><span className="stat-value">R$ {total.toFixed(2)}</span></div>
        </Card>
        <Card title="Receitas">
          <div className="stat positive"><span className="stat-value">R$ {totalReceitas.toFixed(2)}</span></div>
        </Card>
        <Card title="Despesas">
          <div className="stat negative"><span className="stat-value">R$ {totalDespesas.toFixed(2)}</span></div>
        </Card>
      </div>

      <div className="home-grid two">
        <Card title="Nova transação">
          <form className="tx-form" onSubmit={onSubmit}>
            <select value={type} onChange={e => setType(e.target.value as TransactionType)}>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
            <input type="number" step="0.01" placeholder="Valor" value={amount || ''} onChange={e => setAmount(parseFloat(e.target.value) || 0)} />
            <input type="text" placeholder="Categoria" value={category} onChange={e => setCategory(e.target.value)} />
            <input type="text" placeholder="Nota (opcional)" value={note} onChange={e => setNote(e.target.value)} />
            <button type="submit">Adicionar</button>
          </form>
        </Card>

        <Card title="Transações recentes">
          <ul className="tx-list">
            {transactions.length === 0 && <li className="muted">Sem transações</li>}
            {transactions.slice(0, 8).map(t => (
              <li key={t.id} className="tx-item">
                <span className={`badge ${t.type}`}>{t.type === 'receita' ? '+' : '-'}</span>
                <div className="tx-meta">
                  <div className="tx-top">
                    <strong>{t.category}</strong>
                    <span className={`amount ${t.type}`}>R$ {t.amount.toFixed(2)}</span>
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
