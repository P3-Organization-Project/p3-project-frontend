import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from './loginPage/login.jsx'
import Dashboard from './dashboardPage/dashboard.jsx'
import Case from './casePage/case.jsx'


const router = createBrowserRouter([{
    path: '/', element: <Login />,},
    {path: '/dashboard', element: <Dashboard />,},
    {path: '/case', element: <Case />,},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
       <RouterProvider router={router} />
    </StrictMode>,
)
//hey this is a test comment