import "./catalogue.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePersistentForm from "../hooks/persistentForm.js";

import { caseService } from "../api/services/caseService";
import { useApi } from "../hooks/useAPI";

import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";
import CustomerSelector from "../components/customer/CustomerSelector.jsx";

function Orderoverview() {
    const [showExitModal, setShowExitModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("lead");
    const { execute: saveCase, loading: saving } = useApi(caseService.createCase);

    const [formData, setFormData] = usePersistentForm("createCaseForm", {
        hulmaalLength: "", hulmaalWidth: "", hulmaalThickness: "", fugeLuft: "", haengselSide: "", karmOffsetMinus: "", karmOffsetPlus: "", antal: "", klientNavn: "", klientNummer: "", klientMail: "", klientAdresse: "", "tætningsbånd": "",
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const sidebarSteps = [
        { path: "/catalogue", label: "1: Dør Katalog" },
        { path: "/practical", label: "2: Det Praktiske" },
        { path: "/orderoverview", label: "3: Order Oversigt" },
    ];

    const navigate = useNavigate();
    const goTo = (path) => () => navigate(path);

    const fieldLabels = {
        hulmaalLength: "Hulmål Længde",
        hulmaalWidth: "Hulmål Bredde",
        hulmaalThickness: "Hulmål Tykkelse",
        fugeLuft: "Fuge luft",
        haengselSide: "Hængselside",
        karmOffsetMinus: "Karm Offset Minus",
        karmOffsetPlus: "Karm Offset Plus",
        antal: "Antal",
        note: "Note",
        "tætningsbånd": "Tætningsbånd",
        dørflade: "Dørflade",
        dørkant: "Dørkant",
        udførsel: "Udførsel",
        naturlighed: "Naturlighed",
        "lappe farve": "Lappe farve",
        behandling: "Behandling",
        hængsel: "Hængsel",
        låsekasse: "Låsekasse",

    };

    const groups = {
        door: {
            title: "Dørvalg:",
            fields: [
                "dørflade",
                "udførsel",
                "dørkant",
                "karm",
                "naturlighed",
                "lappe farve",
                "behandling",
            ],
        },
        hardware: {
            title: "Beslag & Hardware:",
            fields: ["hængsel", "låsekasse", "tætningsbånd"],
        },
        practical: {
            title: "Praktiske Mål:",
            fields: [
                "hulmaalLength",
                "hulmaalWidth",
                "hulmaalThickness",
                "fugeLuft",
                "haengselSide",
                "karmOffsetMinus",
                "karmOffsetPlus",
                "antal",
                "note",
            ],
        },
    };
    const placeholderPrice = "12.345 kr";

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
      <Sidebar steps={sidebarSteps}/>

     {/* Main Content */}
<div className="flex-grow flex items-center justify-center mt-10 w-full px-8"
  style={{ marginLeft: '16rem' }}>
  <div className="w-full" style={{ maxWidth: 'calc(100% - 4rem)' }}>
    <div className="bg-white p-10 space-y-8 shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center underline">Order Oversigt</h1>
      {/* Låsekasse */}
                        <div className="flex flex-col mb-6">
                            <label className="!text-red-600 font-semibold mb-2">Vælg Status *</label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                            >
                                <option value="lead">Lead</option>
                                <option value="performa">Performa</option>
                                <option value="finish">Finish</option>
                            </select>
                        </div>

      {/* Door Image */}
      {formData.selectedDoor && (
        <div className="mb-6 text-center">
          <h2 className="font-bold text-xl mb-4 underline decoration-2 decoration-black text-center">Valgt Dør:</h2>
          <img
            src={formData.selectedDoor}
            alt="Valgt Dør"
            className="w-72 h-auto rounded shadow-md mx-auto"
          />
        </div>
      )}

      {/* Client Information */}
       <div className="mb-6 p-6 border rounded shadow-sm bg-gray-50">
         <h2 className="font-bold text-2xl mb-6 border-b pb-2 text-center">Klientoplysninger</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <p><strong>Navn:</strong> {formData.klientNavn || "Standard klient"}</p>
                <p><strong>Email:</strong> {formData.klientMail || "-"}</p>
                <p><strong>Telefon:</strong> {formData.klientNummer || "-"}</p>
                <p><strong>Adresse:</strong> {formData.klientAdresse || "-"}</p>
            </div>
       </div>

      {/* Practical Information */}
      <div className="mb-6 p-8 border rounded shadow-lg bg-gray-50 w-full">
        <h2 className="font-bold text-2xl mb-6 border-b pb-2 text-center">Praktiske Informationer</h2>

        {Object.entries(groups).map(([groupKey, group]) => {
          const visible = group.fields.filter((f) => formData[f] && formData[f] !== "");
          if (visible.length === 0) return null;

          return (
            <div key={groupKey} className="mb-6">
              <h3 className="font-bold text-xl mb-4 underline decoration-2 decoration-black text-center">{group.title}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {visible.map((field) => (
                  <p key={field} className="text-md">
                    <strong>{fieldLabels[field] || field}:</strong> {formData[field]}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
        {/* Pricing Placeholder */}
        <div className="mb-6 p-8 border rounded bg-gray-100 w-full">
          <h2 className="font-bold text-2xl mb-6 border-b bg-gray-100 pb-2 text-center underline decoration-2 decoration-black">
            Pris
          </h2>

          <div className="text-center bg-gray-100 text-xl font-semibold">
            {placeholderPrice}
          </div>
        </div>
      </div>
    </div>
  </div>


    </div>
        {/* Bottom Buttons */}
        <button
          onClick={goTo("/catalogue")}
          className="fixed bottom-4 left-4 px-6 py-3 bg-gray-200 rounded text-white hover:bg-gray-300 shadow"
        >
          Tilbage
        </button>

        <button
            onClick={async () => {
                const clientName = formData.klientNavn || "Standard klient";

                const apiPayload = {
                    customerId: 1,
                    dealStatus: selectedStatus?.toUpperCase() || "LEAD",
                    doorItems: [{
                        height: parseFloat(formData.hulmaalLength) || 200.0,
                        width: parseFloat(formData.hulmaalWidth) || 90.0,
                        hingeSide: formData.haengselSide === "venstre" ? "LEFT" : formData.haengselSide === "hojre" ? "RIGHT" : "LEFT",
                        openingDirection: "INWARD",
                        materialCosts: [150.0, 80.0]
                    }]
                };
                try {
                    const result = await saveCase(apiPayload);

                    if (result.success) {
                        const caseId = result.data?.caseId || result.data?.id || Date.now();

                        // Store complete form data locally for rich display
                        const savedCaseDetails = JSON.parse(localStorage.getItem("savedCaseDetails") || "{}");
                        savedCaseDetails[caseId] = {
                            clientName: clientName,
                            clientEmail: formData.klientMail,
                            clientPhone: formData.klientNummer,
                            clientAddress: formData.klientAdresse,
                            selectedDoor: formData.selectedDoor,
                            doorType: formData.dørflade || "Custom Door",
                            status: selectedStatus,
                            formData: { ...formData },
                            createdAt: new Date().toISOString()
                        };
                        localStorage.setItem("savedCaseDetails", JSON.stringify(savedCaseDetails));

                        localStorage.removeItem("createCaseForm");
                        navigate("/case");
                    } else {
                        alert(`Failed to save: ${result.error}`);
                    }
                } catch (err) {
                    alert(`Error: ${err.message}`);
                }
            }}
            disabled={saving}
            className="fixed bottom-4 right-4 px-6 py-3 !bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
            {saving ? "Gemmer..." : "Bekræft og Opret"}
        </button>
        </div>
  );
}

export default Orderoverview;
