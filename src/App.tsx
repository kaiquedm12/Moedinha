import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'
import './index.css'

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}
