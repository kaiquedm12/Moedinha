import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const links = [
  { to: '/', label: 'Início', end: true },
  { to: '/receitas', label: 'Receitas' },
  { to: '/despesas', label: 'Despesas' },
  { to: '/metas', label: 'Metas' },
  { to: '/relatorios', label: 'Relatórios' },
  { to: '/configuracoes', label: 'Configurações' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Moedinha</div>
      <nav className="nav">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            end={(l as any).end}
            className={({ isActive }) => `link${isActive ? ' active' : ''}`}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
