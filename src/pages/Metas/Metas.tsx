import React from 'react'
import Card from '../../components/Card'
import './Metas.css'

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
    <div className="page metas">
      <div className="page-header"><h1>Metas</h1></div>
      <div className="grid two">
        <Card title="Nova meta">
          <form className="tx-form" onSubmit={add}>
            <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
            <input type="number" step="0.01" placeholder="Valor alvo" value={alvo || ''} onChange={e => setAlvo(parseFloat(e.target.value) || 0)} />
            <button type="submit">Adicionar</button>
          </form>
        </Card>
        <Card title="Acompanhar metas">
          <ul className="meta-list">
            {metas.length === 0 && <li className="muted">Sem metas</li>}
            {metas.map(m => {
              const pct = m.alvo ? Math.round((m.atual / m.alvo) * 100) : 0
              return (
                <li key={m.id} className="meta-item">
                  <div className="meta-top">
                    <strong>{m.nome}</strong>
                    <span className="muted">R$ {m.atual.toFixed(2)} / R$ {m.alvo.toFixed(2)} • {pct}%</span>
                  </div>
                  <div className="bar"><div className="fill" style={{ width: `${pct}%` }} /></div>
                  <div className="meta-actions">
                    <button onClick={() => atualizar(m.id, 50)}>+50</button>
                    <button onClick={() => atualizar(m.id, -50)}>-50</button>
                    <button className="danger" onClick={() => remover(m.id)}>Remover</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </Card>
      </div>
    </div>
  )
}
