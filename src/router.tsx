import { createBrowserRouter, Navigate } from 'react-router-dom'
import React, { Suspense, lazy } from 'react'
import App from './App'
import ProtectedRoute from './components/ProtectedRoute'

const Login = lazy(() => import('./pages/Login/Login'))
const Register = lazy(() => import('./pages/Register/Register'))
const Home = lazy(() => import('./pages/Home/Home'))
const Receitas = lazy(() => import('./pages/Receitas/Receitas'))
const Despesas = lazy(() => import('./pages/Despesas/Despesas'))
const Metas = lazy(() => import('./pages/Metas/Metas'))
const Relatorios = lazy(() => import('./pages/Relatorios/Relatorios'))
const Configuracoes = lazy(() => import('./pages/Configuracoes/Configuracoes'))

const Loading = <div style={{ padding: '1rem' }}>Carregando...</div>

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Suspense fallback={Loading}><Login /></Suspense>,
  },
  {
    path: '/register',
    element: <Suspense fallback={Loading}><Register /></Suspense>,
  },
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      { index: true, element: <Suspense fallback={Loading}><Home /></Suspense> },
      { path: 'receitas', element: <Suspense fallback={Loading}><Receitas /></Suspense> },
      { path: 'despesas', element: <Suspense fallback={Loading}><Despesas /></Suspense> },
      { path: 'metas', element: <Suspense fallback={Loading}><Metas /></Suspense> },
      { path: 'relatorios', element: <Suspense fallback={Loading}><Relatorios /></Suspense> },
      { path: 'configuracoes', element: <Suspense fallback={Loading}><Configuracoes /></Suspense> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
])
