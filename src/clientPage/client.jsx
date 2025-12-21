import "./client.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import CustomerModal from "../components/customer/CustomerModal";
import { useCustomerManager } from "../hooks/useCustomerManager";

function Client() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerId: null,
        customerDetails: null
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const {
        customers,
        customersLoading,
        customersError,
        showClientModal,
        setShowClientModal,
        tempClient,
        createLoading,
        handleTempClientInput,
        handleSaveClient,
        openNewClientModal
    } = useCustomerManager(formData, handleChange);

    const handleCreateClient = async () => {
        const result = await handleSaveClient();
        if (result.success) {
            // Modal automatically closes on success
        }
    };

    return (
        <div className="flex min-h-screen min-w-screen bg-white text-black overscroll-hidden">
            <TopBar onLogoClick={() => navigate("/dashboard")} />

            <div className="h-screen w-screen overflow-hidden bg-white">
                <div className="client-page">
                    <div className="flex items-center justify-between mb-6 ">
                        <h1 className="text-2xl font-bold ">Oversigt Over Klienter</h1>
                        <button
                            onClick={openNewClientModal}
                            className="px-6 py-3 !bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
                        >
                            + Opret Klient
                        </button>
                    </div>

                    {customersLoading && (
                        <p className="text-gray-600 mb-4">Indlæser klienter...</p>
                    )}

                    {customersError && (
                        <p className="text-red-600 mb-4">Fejl: {customersError}</p>
                    )}

                    {!customersLoading && customers && (
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
                            {customers.map((client) => (
                                <tr key={client.id}>
                                    <td className="clientID" style={{ cursor: "pointer" }}>
                                        {client.id}
                                    </td>
                                    <td className="clientName">{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phoneNumber}</td>
                                    <td>{client.address || "-"}</td>
                                    <td>{client.companyName || "-"}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}

                    {!customersLoading && customers?.length === 0 && (
                        <p className="text-gray-600 text-center mt-8">
                            Ingen klienter fundet. Opret din første klient.
                        </p>
                    )}
                </div>
            </div>

            <CustomerModal
                isOpen={showClientModal}
                onClose={() => setShowClientModal(false)}
                tempClient={tempClient}
                onInputChange={handleTempClientInput}
                onSave={handleCreateClient}
                loading={createLoading}
                error={null}
            />
        </div>
    );
}

export default Client;
