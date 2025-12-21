import "./catalogue.css";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePersistentForm from "../hooks/persistentForm.js";

// Layout components
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";

// Case creation components and hooks
import { useCaseCreation } from "../hooks/useCaseCreation";
import OrderSummary from "../components/caseCreation/OrderSummary";
import { useCaseEdit } from "../hooks/useCaseEdit";

function Orderoverview() {
    const [showExitModal, setShowExitModal] = useState(false);
    const navigate = useNavigate();

    const { caseId } = useParams();
    const { isEditMode, updateCase, loadCase, loading: editLoading } = useCaseEdit(caseId);

    // Form state using persistent form as too keep data across page navigation
    const [formData, setFormData] = usePersistentForm("createCaseForm", {
        // Measurements
        hulmaalLength: "",
        hulmaalWidth: "",
        hulmaalThickness: "",
        fugeLuft: "",
        haengselSide: "",
        karmOffsetMinus: "",
        karmOffsetPlus: "",
        antal: "",
        note: "",

        // Customer
        customerId: null,
        customerDetails: null,

        // old customer
        klientNavn: "",
        klientNummer: "",
        klientMail: "",
        klientAdresse: "",

        // Door selection
        selectedDoor: null,

        // Wood selections
        "dørflade": "",
        "dørkant": "",
        "karm": "",

        // Appearance
        "udførsel": "",
        "naturlighed": "",
        "lappe farve": "",
        "behandling": "",

        // Hardware
        "hængsel": "",
        "låsekasse": "",
        "tætningsbånd": "",
    });
    // Load case data when in edit mode
    useEffect(() => {
        if (isEditMode && caseId) {
            loadCase().then((loadedFormData) => {
                if (loadedFormData) {
                    setFormData(loadedFormData);
                }
            });
        }
    }, [isEditMode, caseId, loadCase, setFormData]);
    // Sidebar steps configuration
    const sidebarSteps = [
        { path: "/catalogue", label: "1: Dør Katalog" },
        { path: "/practical", label: "2: Det Praktiske" },
        { path: "/orderoverview", label: "3: Order Oversigt" },
    ];

    // Case creation hook that handles API submission and validation
    // Replaces: inline onClick handler, useApi call, local state management
    const {
        selectedStatus,
        setSelectedStatus,
        saving,
        validationErrors,
        apiError,
        submitCase
    } = useCaseCreation(formData, setFormData);

    const goTo = (path) => () => navigate(path);

    // Placeholder price - will be calculated by backend in future
    const placeholderPrice = "priset vil bleve vist ved godkendelse";

    // Handles case submission
    const handleSubmit = async () => {
        let result;
        if (isEditMode) {
            // Use updateCase from useCaseEdit hook
            result = await updateCase(formData, selectedStatus);
        } else {
            // Use submitCase from useCaseCreation hook
            result = await submitCase();
        }

        if (!result.success) {
            alert(`Failed to save: ${result.error || apiError}`);
        } else {
            navigate("/case");
        }
    };

    return (
        <div className="flex min-h-screen min-w-screen bg-white text-black">

            {/* Exit confirmation modal */}
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
            <Sidebar steps={sidebarSteps} />

            {/* Main Content */}
            {/* Replaces: inline JSX for customer info, field groups, price display */}
            <div
                className="flex-grow flex items-center justify-center mt-10 w-full px-8"
                style={{ marginLeft: '16rem' }}
            >
                <div className="w-full" style={{ maxWidth: 'calc(100% - 4rem)' }}>
                    <OrderSummary
                        formData={formData}
                        selectedStatus={selectedStatus}
                        onStatusChange={setSelectedStatus}
                        price={placeholderPrice}
                        showStatusSelector={true}
                    />

                    {/* Validation errors display */}
                    {validationErrors.length > 0 && (
                        <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded">
                            <h3 className="font-bold text-red-700 mb-2">
                                Fejl i formularen:
                            </h3>
                            <ul className="list-disc list-inside text-red-600">
                                {validationErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Buttons */}
            <button
                onClick={goTo("/practical")}
                className="fixed bottom-4 left-4 px-6 py-3 bg-gray-200 rounded text-white hover:bg-gray-300 shadow"
            >
                Tilbage
            </button>

            {/* Submit button*/}
            <button
                onClick={handleSubmit}
                disabled={saving}
                className="fixed bottom-4 right-4 px-6 py-3 !bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition disabled:opacity-50"
            >
                {saving ? "Gemmer..." : "Bekræft og Opret"}
            </button>
        </div>
    );
}

export default Orderoverview;
