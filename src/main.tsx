import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { FinanceProvider } from './context/FinanceContext'
import { ThemeProvider } from './context/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <FinanceProvider>
          <RouterProvider router={router} />
        </FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
