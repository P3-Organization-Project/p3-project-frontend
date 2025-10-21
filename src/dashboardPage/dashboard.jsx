import "./dash.css"
import {useNavigate} from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const goTo = (path) => () => navigate(path);
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">Welcome to the Dashboard 🎉</h1>
                <button onClick={goTo("/case")}>Case</button>
                <button onClick={goTo("/client")}>Klient</button>
                <button onClick={goTo("/materialer")}>Materialer</button>
                <button onClick={goTo("/opretcase")}>Opret Case</button>
                <button onClick={goTo("/door")}>Dør</button>
                <button onClick={goTo("/team")}>Team</button>

            </div>

        )
}
    export default Dashboard