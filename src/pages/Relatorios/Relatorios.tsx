import React from 'react'
import { useFinance } from '../../context/FinanceContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts'
import { BarChart3 } from 'lucide-react'

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
    <div className="container mx-auto max-w-7xl px-4 md:px-6 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Relatórios</h1>
            <p className="text-muted-foreground">Análise detalhada das suas finanças</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Por Categoria (Barras)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[280px]">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Receitas vs Despesas (Pizza)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[280px] flex items-center justify-center">
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
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Categoria</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Receitas</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Despesas</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {porCategoria.length === 0 && (
                    <tr>
                      <td colSpan={4} className="h-24 text-center text-muted-foreground">
                        Sem dados disponíveis
                      </td>
                    </tr>
                  )}
                  {porCategoria.map(r => (
                    <tr key={r.categoria} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle font-medium">{r.categoria}</td>
                      <td className="p-4 align-middle text-right font-semibold text-green-600 dark:text-green-400">
                        R$ {r.receitas.toFixed(2)}
                      </td>
                      <td className="p-4 align-middle text-right font-semibold text-amber-600 dark:text-amber-400">
                        R$ {r.despesas.toFixed(2)}
                      </td>
                      <td className={`p-4 align-middle text-right font-semibold ${r.saldo >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        R$ {r.saldo.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 bg-muted/50 font-bold">
                    <td className="p-4 align-middle">Total</td>
                    <td className="p-4 align-middle text-right text-green-600 dark:text-green-400">
                      R$ {total.receitas.toFixed(2)}
                    </td>
                    <td className="p-4 align-middle text-right text-amber-600 dark:text-amber-400">
                      R$ {total.despesas.toFixed(2)}
                    </td>
                    <td className={`p-4 align-middle text-right ${total.saldo >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      R$ {total.saldo.toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
