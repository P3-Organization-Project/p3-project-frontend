import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Login from './loginPage/login.jsx'
import Dashboard from './dashboardPage/dashboard.jsx'

function routes(){
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}


const Dashboard = () => <h2>Dashboard</h2>;
const Contact = () => <h2>Contact Page</h2>;

export default routes;

