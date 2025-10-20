import "./dash.css"
import {useNavigate} from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate()
    const GoToCase = () => {
        navigate("/case");
    }
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Welcome to the Dashboard 🎉</h1>
            <button onClick={GoToCase}>Caseoversigt</button>
        </div>
    )
}
    export default Dashboard