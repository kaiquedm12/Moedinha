import React from 'react'
import Card from '../../components/Card'
import { useFinance } from '../../context/FinanceContext'
import './Configuracoes.css'

export default function Configuracoes() {
  const { clear, transactions } = useFinance()

  const limpar = () => {
    if (confirm('Tem certeza que deseja limpar todas as transações?')) clear()
  }

  return (
    <div className="page">
      <div className="page-header"><h1>Configurações</h1></div>
      <div className="grid one">
        <Card title="Dados">
          <div className="cfg-row">
            <div>
              <div>Total de transações</div>
              <div className="muted">{transactions.length}</div>
            </div>
            <button className="danger" onClick={limpar}>Limpar transações</button>
          </div>
        </Card>
      </div>
    </div>
  )
}
