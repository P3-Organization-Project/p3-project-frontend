import "./client.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placeholderClients from "../data/placeholderClients.json";
import { useApi } from "../hooks/useAPI";
import { healthCheckService } from "../api/services/healthCheckService";

import TopBar from "../components/layout/TopBar";

function Client() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const { data: health, loading, error, execute: fetchHealth } = useApi(healthCheckService.getHealth);

    useEffect(() => {
        const savedClients = JSON.parse(localStorage.getItem("savedClients") || "[]");
        setClients([...placeholderClients, ...savedClients]);

        // Fetch health check on component mount
        fetchHealth();
    }, []);

    const goTo = (path) => () => navigate(path);

    return (
        <div className="flex min-h-screen min-w-screen bg-white text-black">
            {/* TopBar component  */}
            <TopBar onLogoClick={() => navigate("/dashboard")} />
            {/* Main Content */}
            <div className="h-screen w-screen overflow-hidden bg-white">
                <div className="client-page">
                    {/* Health Check Display */}
                    <div className="mb-4 p-4 bg-gray-100 border border-gray-300 rounded">
                        <h3 className="font-bold mb-2">Backend Health Check:</h3>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-red-600">Error: {error}</p>}
                        {health && <pre>{JSON.stringify(health, null, 2)}</pre>}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">Oversigt Over Klienter</h1>
                        <button
                            onClick={goTo("/catalogue")}
                            className="px-6 py-3 !bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
                        >
                            + Opret Klient
                        </button>
                    </div>
                    <table className="client-table">
                        <thead>
                        <tr>
                            <th>Klient ID</th>
                            <th>Navn</th>
                            <th>Email</th>
                            <th>Telefon</th>
                            <th>Adresse</th>
                            <th>Firmanavn</th>
                            <th>Antal Sager</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td className="clientID" style={{ cursor: "pointer" }}>
                                    {client.id}
                                </td>
                                <td className="clientName">{client.navn}</td>
                                <td>{client.email}</td>
                                <td>{client.telefon}</td>
                                <td>{client.adresse}</td>
                                <td>{client.firmanavn || "-"}</td>
                                <td>{client.antalSager}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Client;
