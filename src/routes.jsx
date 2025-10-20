import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './loginPage/login.jsx'
import Dashboard from './dashboardPage/dashboard.jsx'
import Case from './casePage/case.jsx'

function routes(){
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/case" element={<Case />} />

                </Routes>
        </Router>
    );
}




export default routes;

