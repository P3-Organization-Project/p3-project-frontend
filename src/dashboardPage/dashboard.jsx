import "./dash.css"
import {useNavigate} from "react-router-dom";

function Dashboard() {

    const caseNavigate = useNavigate()
    const GoToCase = () => {
        caseNavigate("/case");
    }

    const clientNavigate = useNavigate()
    const GoToClient = () => {
        clientNavigate("/Client");
    }

    const materialerNavigate = useNavigate()
    const GoToMaterialer = () => {
        materialerNavigate("/materialer");
    }

    const opretcaseNavigate = useNavigate()
    const GoToOpretcase = () => {
        opretcaseNavigate("/opretcase");
    }

    const doorNavigate = useNavigate()
    const GoToDoor = () => {
        doorNavigate("/door");
    }
    const teamNavigate = useNavigate()
    const GoToTeam = () => {
        teamNavigate("/team");
    }
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">Welcome to the Dashboard 🎉</h1>
                <button onClick={GoToCase}>Case oversigt</button>
                <button onClick={GoToClient}>Klient oversigt</button>
                <button onClick={GoToMaterialer}>materiale oversigt</button>
                <button onClick={GoToOpretcase}>opret case</button>
                <button onClick={GoToDoor}>dør</button>
                <button onClick={GoToTeam}>hold</button>

            </div>

        )
}
    export default Dashboard