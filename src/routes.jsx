import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './loginPage/login.jsx'
import Dashboard from './dashboardPage/dashboard.jsx'
import Case from './casePage/case.jsx'
import Client from './clientPage/client.jsx'
import Materialer from './materialerPage/materialer.jsx'
import Opretcase from './opretcasePage/opretcase.jsx'
import Door from './doorPage/door.jsx'
import Team from './teamPage/team.jsx'

function routes(){
    return (
        <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/case" element={<Case />} />
                    <Route path="/client" element={<Client />} />
                    <Route path="/materialer" element={<Materialer />} />
                    <Route path="/opretcase" element={<Opretcase />} />
                    <Route path="/door" element={<Door />} />
                    <Route path="/team" element={<Team />} />

                </Routes>
        </Router>
    );
}




export default routes;

