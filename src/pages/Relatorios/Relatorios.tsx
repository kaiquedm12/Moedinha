import React from 'react'
import Card from '../../components/Card'
import { useFinance } from '../../context/FinanceContext'
import './Relatorios.css'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'

type Row = { categoria: string; receitas: number; despesas: number; saldo: number }

export default function Relatorios() {
  const { transactions } = useFinance()

  const porCategoria = React.useMemo<Row[]>(() => {
    const map = new Map<string, { receitas: number; despesas: number }>()
    for (const t of transactions) {
      const cur = map.get(t.category) || { receitas: 0, despesas: 0 }
      if (t.type === 'receita') cur.receitas += t.amount
      else cur.despesas += t.amount
      map.set(t.category, cur)
    }
    return Array.from(map.entries()).map(([categoria, v]) => ({ categoria, receitas: v.receitas, despesas: v.despesas, saldo: v.receitas - v.despesas }))
  }, [transactions])

  const total = porCategoria.reduce((acc, r) => ({
    receitas: acc.receitas + r.receitas,
    despesas: acc.despesas + r.despesas,
    saldo: acc.saldo + r.saldo,
  }), { receitas: 0, despesas: 0, saldo: 0 })

  const COLORS = { receitas: '#16a34a', despesas: '#f59e0b' }

  return (
    <div className="page">
      <div className="page-header"><h1>Relatórios</h1></div>
      <div className="grid two" style={{ marginBottom: 16 }}>
        <Card title="Por categoria (barras)">
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <BarChart data={porCategoria}>
                <XAxis dataKey="categoria" hide={porCategoria.length < 4} interval={0} angle={0} tick={{ fontSize: 12 }} />
                <YAxis tickFormatter={(v: number) => `R$ ${v}`}/>
                <Tooltip formatter={(value: number) => [`R$ ${value.toFixed(2)}`, '']} />
                <Legend />
                <Bar dataKey="receitas" name="Receitas" fill={COLORS.receitas} radius={[4,4,0,0]} />
                <Bar dataKey="despesas" name="Despesas" fill={COLORS.despesas} radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card title="Receitas vs Despesas (pizza)">
          <div style={{ width: '100%', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={[{ name: 'Receitas', value: total.receitas }, { name: 'Despesas', value: total.despesas }]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={2}
                >
                  <Cell fill={COLORS.receitas} />
                  <Cell fill={COLORS.despesas} />
                </Pie>
                <Tooltip formatter={(value: number, name: string) => [`R$ ${value.toFixed(2)}`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card>
        <div className="table">
          <div className="thead">
            <div>Categoria</div>
            <div>Receitas</div>
            <div>Despesas</div>
            <div>Saldo</div>
          </div>
          <div className="tbody">
            {porCategoria.length === 0 && <div className="row muted">Sem dados</div>}
            {porCategoria.map(r => (
              <div key={r.categoria} className="row">
                <div>{r.categoria}</div>
                <div className="pos">R$ {r.receitas.toFixed(2)}</div>
                <div className="neg">R$ {r.despesas.toFixed(2)}</div>
                <div className={r.saldo >= 0 ? 'pos' : 'neg'}>R$ {r.saldo.toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="tfoot">
            <div>Total</div>
            <div className="pos">R$ {total.receitas.toFixed(2)}</div>
            <div className="neg">R$ {total.despesas.toFixed(2)}</div>
            <div className={total.saldo >= 0 ? 'pos' : 'neg'}>R$ {total.saldo.toFixed(2)}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
