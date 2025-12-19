import './Case.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import overgaardLogo from "./images/overgaardwoodlogo.jpg";
import { caseService } from "../api/services/caseService";
import { useApi } from "../hooks/useAPI";

function Case() {
    const navigate = useNavigate();
    const [accountOpen, setAccountOpen] = useState(false);
    const [cases, setCases] = useState([]);

    const { data: apiCases, loading, error, execute: fetchCases } = useApi(caseService.getAllCases);

    // Get user info from stored user object (set during login)
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const userName = user?.name || 'User';

    // Adapter: Transform backend response to display format
    const mapCaseToDisplay = (apiCase) => {
        return {
            id: apiCase.caseId,
            client: apiCase.customerName,
            assigned: apiCase.sellerName,
            doorType: formatDoorType(apiCase.doorItems),
            status: mapStatus(apiCase.dealStatus),
            date: new Date(apiCase.createdDate).toLocaleDateString('da-DK'),
            price: formatPrice(apiCase.totalPrice), // Direct from backend - no calculation needed
            details: apiCase // Preserve full API response for navigation
        };
    };

    // Map door configuration type to display string
    const formatDoorType = (doorItems) => {
        if (!doorItems || doorItems.length === 0) return "N/A";
        const type = doorItems[0]?.doorConfiguration?.type;
        const typeMap = {
            'SINGLE': 'Single',
            'DOUBLE': 'Double'
        };
        return typeMap[type] || type || "N/A";
    };

    // Map backend status
    const mapStatus = (dealStatus) => {
        // Backend returns "Lead", "Performa", "Finish" is converted to lowercase
        return dealStatus?.toLowerCase() || 'lead';
    };

    // Format price with our locale
    const formatPrice = (totalPrice) => {
        if (totalPrice === null || totalPrice === undefined) return '0 kr';
        return `${totalPrice.toLocaleString('da-DK')} kr`;
    };

    // Fetch cases on mount
    useEffect(() => {
        fetchCases();
    }, []);

    // Transform API data when received
    useEffect(() => {
        if (apiCases && apiCases.length > 0) {
            const transformedCases = apiCases.map(mapCaseToDisplay);
            setCases(transformedCases);
        } else if (apiCases) {
            // Empty array from API - show empty state
            setCases([]);
        }
    }, [apiCases]);

    const goTo = (path) => () => navigate(path);

    const handleCaseClick = (caseItem) => {
        // Store the full API case object for the order overview page
        localStorage.setItem("selectedCase", JSON.stringify(caseItem.details));
        navigate("/orderoverview");
    };

    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <div className="flex min-h-screen min-w-screen bg-white text-black">
            <div className="fixed top-0 left-0 w-full h-12 !bg-gray-500 shadow-md z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <button className="h-10 w-10" style={{ backgroundImage: `url(${overgaardLogo})`, backgroundSize: "cover", backgroundPosition: "center" }}></button>
                </div>
                <div className="relative">
                    <button onClick={() => setAccountOpen(!accountOpen)} className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                        <span className="text-gray-700 font-bold">{userName.charAt(0).toUpperCase()}</span>
                    </button>
                    {accountOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                            <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Sign Out</button>
                            <button onClick={() => {}} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Administer Account</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="h-screen w-screen overflow-hidden bg-white">
                <div className="case-page">
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
                            <tr key={caseItem.id}>
                                <td className="caseID" onClick={() => handleCaseClick(caseItem)} style={{ cursor: "pointer" }}>
                                    {caseItem.id}
                                </td>
                                <td className="client">{caseItem.client}</td>
                                <td>{caseItem.assigned}</td>
                                <td>{caseItem.doorType}</td>
                                <td>{caseItem.date}</td>
                                <td><span className={`status ${caseItem.status}`}>{caseItem.status}</span></td>
                                <td>{caseItem.price}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <button onClick={goTo("/catalogue")} className="fixed bottom-4 right-4 px-6 py-3 !bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">
                + Opret Case
            </button>
        </div>
    );
}

export default Case;
