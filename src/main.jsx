import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './loginPage/login.jsx'
import Dashboard from './dashboardPage/dashboard.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Login />
        <Dashboard />
    </StrictMode>,
)
