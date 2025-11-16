import "./catalogue.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePersistentForm from "../hooks/persistentForm.js";
import overgaardLogo from "./images/overgaardwoodlogo.jpg";

function Orderoverview() {
  const [showExitModal, setShowExitModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("lead");
    const [formData, setFormData] = usePersistentForm("createCaseForm", {
    hulmaalLength: "", hulmaalWidth: "", hulmaalThickness: "", fugeLuft: "", haengselSide: "", karmOffsetMinus: "", karmOffsetPlus: "", antal: "", klientNavn: "", klientNummer: "", klientMail: "", klientAdresse: "", "tætningsbånd": "",
    }); 
    
    const handleChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const navigate = useNavigate();
    const [accountOpen, setAccountOpen] = useState(false);
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
      <div className="fixed top-0 left-0 w-full h-12 !bg-gray-500 shadow-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <button className="h-10 w-10" onClick={() => setShowExitModal(true)} style={{ backgroundImage: `url(${overgaardLogo})`, backgroundSize: "cover", backgroundPosition: "center" }}></button>
        </div>
        <div className="relative">
          <button onClick={() => setAccountOpen(!accountOpen)} className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 transition">
            <span className="text-gray-200 font-bold">B</span>
          </button>
          {accountOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
              <button onClick={() => {}} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Sign Out</button>
              <button onClick={() => {}} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition">Administer Account</button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div className="mt-4 fixed top-15 left-0 h-190 w-64 bg-white shadow-md z-40 flex flex-col justify-between">
        <div className="flex flex-col h-full overflow-y-auto px-4 py-6">
          <div className="flex flex-col gap-3 mb-6">
            <button onClick={goTo("/catalogue")} className="px-4 py-2 bg-blue-500 rounded text-white font-medium hover:bg-blue-600">1: Dør Katalog</button>
            <button onClick={goTo("/practical")} className="px-4 py-2 bg-blue-500 rounded text-white font-medium hover:bg-blue-600">2: Det Praktiske</button>
            <button onClick={goTo("/orderoverview")} className="px-4 py-2 bg-gray-100 text-gray-400 rounded font-medium hover:bg-blue-100 hover:text-blue-600">3: Order Oversigt</button>
          </div>
          <div className="border-t border-gray-200 mb-5"></div>

      
          
        </div>
      </div>

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
          <p><strong>Navn:</strong> {formData.klientNavn}</p>
          <p><strong>Email:</strong> {formData.klientMail}</p>
          <p><strong>Telefon:</strong> {formData.klientNummer}</p>
          <p><strong>Adresse:</strong> {formData.klientAdresse}</p>
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
          onClick={() => {
              // Get existing cases or initialize empty array
              const existingCases = JSON.parse(localStorage.getItem("savedCases") || "[]");

              // Check if we're editing an existing case
              const editingCaseId = formData.caseId;
              // Create new case object
              if (editingCaseId) {
                  // Update existing case
                  const caseIndex = existingCases.findIndex(c => c.id === editingCaseId);
                  if (caseIndex !== -1) {
                      existingCases[caseIndex] = {
                          ...existingCases[caseIndex],
                          status: selectedStatus,
                          client: formData.klientNavn,
                          date: new Date().toLocaleDateString('da-DK').replace(/\./g, '/'),
                          details: formData
                      };
                  }
              } else {
                  // Create new case
                  //generate id
                  const newCaseId = existingCases.length > 0
                      ? Math.max(...existingCases.map(c => parseInt(c.id))) + 1
                      : 56842365;

                  existingCases.push({
                      id: newCaseId.toString(),
                      client: formData.klientNavn,
                      assigned: "Hans Marker",
                      doorType: "Custom Door",
                      date: new Date().toLocaleDateString('da-DK').replace(/\./g, '/'),
                      status: selectedStatus,
                      price: placeholderPrice,
                      details: formData
                  });
              }

              // Add to cases array
              localStorage.setItem("savedCases", JSON.stringify(existingCases));

              // Clear the form
              localStorage.removeItem("createCaseForm");

              // Navigate to case page
              navigate("/case");
          }}
          className="fixed bottom-4 right-4 px-6 py-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          Bekræft og Opret
        </button>
        </div>
  );
}

export default Orderoverview;
