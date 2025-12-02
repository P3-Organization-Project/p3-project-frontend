import "./client.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import overgaardLogo from "../createCasePage/images/overgaardwoodlogo.jpg";
import placeholderClients from "../data/placeholderClients.json";

function Client() {
    const navigate = useNavigate();
    const [accountOpen, setAccountOpen] = useState(false);
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const savedClients = JSON.parse(localStorage.getItem("savedClients") || "[]");
        setClients([...placeholderClients, ...savedClients]);
    }, []);

    const goTo = (path) => () => navigate(path);

    return (
        <div className="flex min-h-screen min-w-screen bg-white text-black">
            {/* Top bar */}
            <div className="fixed top-0 left-0 w-full h-12 !bg-gray-500 shadow-md z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <button
                        className="h-10 w-10"
                        onClick={goTo("/case")}
                        style={{
                            backgroundImage: `url(${overgaardLogo})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    ></button>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setAccountOpen(!accountOpen)}
                        className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                        <span className="text-gray-200 font-bold">B</span>
                    </button>
                    {accountOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                            <button
                                onClick={() => {}}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                            >
                                Sign Out
                            </button>
                            <button
                                onClick={() => {}}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                            >
                                Administer Account
                            </button>
                        </div>
                    )}
                </div>
            </div>

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
