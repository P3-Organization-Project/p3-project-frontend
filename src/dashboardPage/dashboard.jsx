import "./dash.css"
import {useNavigate} from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const goTo = (path) => () => navigate(path);
        return (
            <div className="fixed inset-0 bg-white text-black">
            <div className="fixed top-0 left-0 w-full bg-white z-50 p-4 shadow">
            <form className="max-w-md mx-auto">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                Search
                </label>
                <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                    >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                    </svg>
                </div>
                <input
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg 
                            bg-gray-50" 
                    placeholder="Search"
                    required
                />
                </div>
            </form>
            <div className="flex-grow flex items-center justify-center mt-24 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5x1">
                    <button onClick={goTo("/case")}className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Cases</button>
                    <button onClick={goTo("/client")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Klient</button>
                    <button onClick={goTo("/materiel")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Materialer</button>
                    <button onClick={goTo("/createCase")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Opret Case</button>
                    <button onClick={goTo("/door")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Dør</button>
                    <button onClick={goTo("/team")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Teamet</button>
            </div>
            </div>

            </div>
            </div>
        )
}
    export default Dashboard