import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from './loginPage/login.jsx'
import Dashboard from './dashboardPage/dashboard.jsx'
import Case from './casePage/case.jsx'
import Client from './clientPage/client.jsx'
import Materiel from './materielPage/materialer.jsx'
import CreateCase from './createCasePage/opretcase.jsx'
import Door from './doorPage/door.jsx'
import Team from './teamPage/team.jsx'


const router = createBrowserRouter([{
    path: '/', element: <Login />,},
    {path: '/dashboard', element: <Dashboard />,},
    {path: '/case', element: <Case />,},
    {path: '/client', element: <Client />,},
    {path: '/materiel', element: <Materiel />,},
    {path: '/createCase', element: <CreateCase />,},
    {path: '/door', element: <Door />,},
    {path: '/team', element: <Team />,},
]);


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
       <RouterProvider router={router} />
    </StrictMode>,
)
