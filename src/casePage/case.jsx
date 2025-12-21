import './Case.css';
import React from "react";
import { useNavigate } from "react-router-dom";

// Import shared hooks and components
import { useAuth } from "../hooks/useAuth";
import { useCaseList } from "../hooks/useCaseList";
import CaseCard from "../components/caseView/CaseCard";
import TopBar from "../components/layout/TopBar";

function Case() {
    const navigate = useNavigate();

    // Use useAuth hook for user state and logout
    const { user, logout } = useAuth();

    // Use useCaseList hook for case data management
    const { cases, loading, error } = useCaseList();

    const goTo = (path) => () => navigate(path);

    // Logic kept in component - navigation requires component context
    const handleCaseClick = (caseItem) => {
        localStorage.setItem("selectedCase", JSON.stringify(caseItem.details));
        // Navigate with caseId to trigger edit mode
        navigate(`/practical/${caseItem.id}`);
    };

    return (
        <div className="flex min-h-screen min-w-screen bg-white text-black">
            {/* TopBar component  */}
            <TopBar
                user={user}
                onLogout={logout}
                onLogoClick={goTo("/case")}
            />

            <div className="h-screen w-screen overflow-hidden bg-white">
                <div className="case-page">
                    {/* Loading and error states from useCaseList */}
                    {loading && <p className="text-gray-600">Indlæser sager...</p>}
                    {error && <p className="text-red-600">Fejl: {error}</p>}

                    <h1 className="text-2xl font-bold overflow-hidden">Oversigt Over Sager</h1>

                    <table className="case-table">
                        <thead>
                        <tr>
                            <th>Sags ID</th>
                            <th>Klient</th>
                            <th>Tildelt</th>
                            <th>Dør Type</th>
                            <th>Dato</th>
                            <th>Status</th>
                            <th>Pris</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cases.map((caseItem) => (
                            <CaseCard
                                key={caseItem.id}
                                caseData={caseItem}
                                onCaseClick={handleCaseClick}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <button
                onClick={goTo("/catalogue")}
                className="fixed top-14 right-4 px-6 py-3 !bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
                + Opret Case
            </button>
        </div>
    );
}

export default Case;
