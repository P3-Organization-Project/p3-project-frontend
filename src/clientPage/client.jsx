import "./client.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import placeholderClients from "../data/placeholderClients.json";


import TopBar from "../components/layout/TopBar";

function Client() {
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const savedClients = JSON.parse(localStorage.getItem("savedClients") || "[]");
        setClients([...placeholderClients, ...savedClients]);
    }, []);

    const goTo = (path) => () => navigate(path);

    return (
        <div className="flex min-h-screen min-w-screen bg-white text-black">
            {/* TopBar component  */}
            <TopBar onLogoClick={() => navigate("/dashboard")} />
            {/* Main Content */}
            <div className="h-screen w-screen overflow-hidden bg-white">
                <div className="client-page">
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
