import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useParams, Outlet } from 'react-router-dom'
import './index.css'
import Login from './loginPage/login.jsx'
import Dashboard from './dashboardPage/dashboard.jsx'
import Case from './casePage/case.jsx'
import Client from './clientPage/client.jsx'
import Materiel from './materielPage/materiel.jsx'
import Catalogue from './createCasePage/catalogue.jsx'
import Practical from './createCasePage/practical.jsx'
import Orderoverview from './createCasePage/orderoverview.jsx'
import Door from './doorPage/door.jsx'
import Team from './teamPage/team.jsx'
import { CaseFormProvider } from './context/CaseFormContext';

// Wrapper component for case creation routes
function CaseFormWrapper() {
    const { caseId } = useParams();
    return (
        <CaseFormProvider caseId={caseId}>
            <Outlet />
        </CaseFormProvider>
    );
}

const router = createBrowserRouter([
    { path: '/', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/case', element: <Case /> },
    { path: '/client', element: <Client /> },
    { path: '/materiel', element: <Materiel /> },
    {
        element: <CaseFormWrapper />,
        children: [
            { path: '/catalogue', element: <Catalogue /> },
            { path: '/catalogue/:caseId', element: <Catalogue /> },
            { path: '/practical', element: <Practical /> },
            { path: '/practical/:caseId', element: <Practical /> },
            { path: '/orderoverview', element: <Orderoverview /> },
            { path: '/orderoverview/:caseId', element: <Orderoverview /> },
        ]
    },
    { path: '/door', element: <Door /> },
    { path: '/team', element: <Team /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
