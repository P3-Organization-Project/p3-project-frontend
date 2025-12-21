import "./catalogue.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCaseForm } from "../context/CaseFormContext";

import buttonImageA from "./images/singledoorA.jpg";
import buttonImageB from "./images/singleDoorB.jpg";
import buttonImageC from "./images/singleDoorC.jpg";
import buttonImageD from "./images/singleDoorD.jpg";
import buttonImageE from "./images/singleDoorE.jpg";
import buttonImageF from "./images/singleDoorF.jpg";

import doubleDoorImageA from "./images/doubleDoorA.jpg";
import doubleDoorImageB from "./images/doubleDoorB.jpg";
import doubleDoorImageC from "./images/doubleDoorC.jpg";
import doubleDoorImageD from "./images/doubleDoorD.jpg";
import doubleDoorImageE from "./images/doubleDoorE.jpg";
import doubleDoorImageF from "./images/doubleDoorF.jpg";

// Customer management imports
import { useCustomerManager } from "../hooks/useCustomerManager";
import CustomerModal from "../components/customer/CustomerModal.jsx";
import CustomerSelector from "../components/customer/CustomerSelector.jsx";

import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";

function Catalogue() {
    const [showExitModal, setShowExitModal] = useState(false);
    const [selectedDoor, setSelectedDoor] = useState(null);
    const [selectedTab, setSelectedTab] = useState("single");

    // Use context instead of usePersistentForm
    const { formData, updateField, isEditMode, loading } = useCaseForm();

    const sidebarSteps = [
        { path: "/catalogue", label: "1: Dør Katalog" },
        { path: "/practical", label: "2: Det Praktiske" },
        { path: "/orderoverview", label: "3: Order Oversigt" },
    ];

    const handleChange = (field, value) => {
        updateField(field, value);
    };

    // Customer management hook
    const {
        customers,
        customersLoading,
        customersError,
        createLoading,
        createError,
        showClientModal,
        setShowClientModal,
        tempClient,
        handleTempClientInput,
        handleSaveClient,
        handleSelectExistingClient,
        handleResetClient,
        handleEditClient,
        openNewClientModal,
        hasClient
    } = useCustomerManager(formData, handleChange);

    const handleSelectDoor = (door) => {
        setSelectedDoor(door.id);
        handleChange("selectedDoor", door.image);
    };

    const navigate = useNavigate();
    const goTo = (path) => () => navigate(path);

    const singleDoors = [
        { id: "S1", label: "Door A", image: buttonImageA },
        { id: "S2", label: "Door B", image: buttonImageB },
        { id: "S3", label: "Door C", image: buttonImageC },
        { id: "S4", label: "Door D", image: buttonImageD },
        { id: "S5", label: "Door E", image: buttonImageE },
        { id: "S6", label: "Door F", image: buttonImageF },
    ];

    const doubleDoors = [
        { id: "D1", label: "Double Door A", image: doubleDoorImageA },
        { id: "D2", label: "Double Door B", image: doubleDoorImageB },
        { id: "D3", label: "Double Door C", image: doubleDoorImageC },
        { id: "D4", label: "Double Door D", image: doubleDoorImageD },
        { id: "D5", label: "Double Door E", image: doubleDoorImageE },
        { id: "D6", label: "Double Door F", image: doubleDoorImageF },
    ];

    const doors = selectedTab === "single" ? singleDoors : doubleDoors;

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Indlæser sag...</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen min-w-screen bg-white text-black">

            {showExitModal && (
                <div className="fixed inset-0 !bg-black/40 flex items-center justify-center z-50">
                    <div className="backdrop-blur-xl !bg-white p-6 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
                        <h2 className="text-xl font-semibold mb-4 text-white">
                            Afbryd uden at gemme?
                        </h2>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowExitModal(false)}
                                className="px-4 py-2 bg-gray-200/60 text-black rounded hover:bg-gray-300/70"
                            >
                                Nej
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("createCaseForm");
                                    navigate("/case");
                                }}
                                className="px-4 py-2 bg-blue-500/60 text-white rounded hover:bg-blue-600/70"
                            >
                                Ja
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Top bar */}
            <TopBar onLogoClick={() => setShowExitModal(true)} />

            {/* Sidebar */}
            <Sidebar steps={sidebarSteps}>
                <CustomerSelector
                    customers={customers}
                    customerDetails={formData.customerDetails}
                    hasClient={hasClient}
                    customersLoading={customersLoading}
                    customersError={customersError}
                    onSelectCustomer={handleSelectExistingClient}
                    onNewClient={openNewClientModal}
                    onResetClient={handleResetClient}
                    onEditClient={handleEditClient}
                />
            </Sidebar>

            {/* Client Modal - uses shared CustomerModal component */}
            <CustomerModal
                isOpen={showClientModal}
                onClose={() => setShowClientModal(false)}
                tempClient={tempClient}
                onInputChange={handleTempClientInput}
                onSave={handleSaveClient}
                loading={createLoading}
                error={createError}
            />

            {/* Main Door Grid */}
            <div className="flex-1 ml-64 overflow-y-auto p-10 relative">
                {/* Tabs */}
                <div className="sticky top-12 bg-white z-30 py-4 flex justify-center gap-6 border-b border-gray-200">
                    <button
                        onClick={() => setSelectedTab("single")}
                        className={`px-4 py-2 rounded font-medium transition ${
                            selectedTab === "single"
                                ? "bg-blue-500 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                        }`}
                    >
                        Single Doors
                    </button>
                    <button
                        onClick={() => setSelectedTab("double")}
                        className={`px-4 py-2 rounded font-medium transition ${
                            selectedTab === "double"
                                ? "bg-blue-500 text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                        }`}
                    >
                        Double Doors
                    </button>
                </div>

                <div className="flex-grow flex items-center justify-center mt-10 w-full px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-8 w-full max-w-5xl justify-items-center">
                        {doors.map((door) => (
                            <button
                                key={door.id}
                                onClick={() => handleSelectDoor(door)}
                                style={{
                                    backgroundImage: `url(${door.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                className={`text-white font-semibold text-xl px-10 py-5 h-120 w-120 rounded-xl shadow-md transition-all duration-200 ${
                                    selectedDoor === door.id
                                        ? "ring-4 ring-blue-500 scale-105"
                                        : "hover:scale-105 hover:ring-2 hover:ring-blue-300"
                                }`}
                            >
                                {door.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bottom Buttons */}
                <button onClick={goTo("/case")} className="fixed bottom-4 left-4 px-6 py-3 bg-gray-200 rounded text-white hover:bg-gray-300 shadow">Afbryd</button>

                <button
                    onClick={goTo("/case")}
                    className="fixed bottom-4 left-4 px-6 py-3 bg-gray-200 rounded text-white hover:bg-gray-300 shadow"
                >
                    Afbryd
                </button>

                <button
                    onClick={goTo("/practical")}
                    disabled={!hasClient}
                    className={`fixed bottom-4 right-4 px-6 py-3 rounded shadow transition ${
                        hasClient
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "!bg-gray-300 !text-gray-400 cursor-not-allowed"
                    }`}
                >
                    Næste
                </button>
            </div>
        </div>
    );
}

export default Catalogue;
