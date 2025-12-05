import './Case.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import overgaardLogo from "./images/overgaardwoodlogo.jpg";
import placeholderCases from "../data/placeholderCases.json";
import { caseService } from "../api/services/caseService";
import { useApi } from "../hooks/useAPI";

function Case() {
    const navigate = useNavigate();
    const [accountOpen, setAccountOpen] = useState(false);
    const [cases, setCases] = useState([]);

    const { data: apiCases, loading, error, execute: fetchCases } = useApi(caseService.getAllCases);

    const userName = localStorage.getItem('userName') || 'Sælger';
    const clientName = localStorage.getItem('clientName') || 'Standard klient';

    const CaseWithLocalData = (apiCase) => {
        const savedDetails = JSON.parse(localStorage.getItem("savedCaseDetails") || "{}");
        const caseId = apiCase.caseId || apiCase.id;
        const localData = savedDetails[caseId];
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

        return {
            id: caseId,
            client: localData?.clientName || clientName,
            assigned: user?.name || userName,
            doorType: localData?.doorType || (apiCase.doorItems?.[0]
                ? `${apiCase.doorItems[0].width}x${apiCase.doorItems[0].height}mm`
                : "Custom Door"),
            status: localData?.status || mapStatus(apiCase.dealStatus),
            date: localData?.createdAt
                ? new Date(localData.createdAt).toLocaleDateString('da-DK')
                : new Date().toLocaleDateString('da-DK'),
            price: calculatePrice(apiCase.doorItems),
            details: apiCase,
            localData: localData
        };
    };

    const mapStatus = (dealStatus) => {
        const statusMap = {
            'PENDING': 'lead',
            'LEAD': 'lead',
            'APPROVED': 'performa',
            'PERFORMA': 'performa',
            'COMPLETED': 'finish',
            'FINISH': 'finish',
            'REJECTED': 'finish'
        };
        return statusMap[dealStatus] || 'lead';
    };

    const calculatePrice = (doorItems) => {
        if (!doorItems || doorItems.length === 0) return '0 kr';
        const total = doorItems.reduce((sum, item) => {
            const materialSum = item.materialCosts?.reduce((a, b) => a + b, 0) || 0;
            return sum + materialSum;
        }, 0);
        return `${total.toLocaleString('da-DK')} kr`;
    };

    useEffect(() => {
        fetchCases();
    }, []);

    useEffect(() => {
        let allCases = [];

        if (apiCases && apiCases.length > 0) {
            allCases = apiCases.map(CaseWithLocalData);
        } else {
            allCases = [...placeholderCases];
        }

        setCases(allCases);
    }, [apiCases, clientName, userName]);

    const goTo = (path) => () => navigate(path);

    const handleCaseClick = (caseItem) => {
        localStorage.setItem("selectedCase", JSON.stringify(caseItem.details || caseItem));
        navigate("/orderoverview");
    };

    const handleSignOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('userName');
        localStorage.removeItem('clientName');
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

                    <h1 className="text-2xl font-bold overflow-hidden">📁 Oversigt Over Sager</h1>
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
