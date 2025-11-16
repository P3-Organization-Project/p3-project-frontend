import "./catalogue.css";
import React, { useState } from "react";
import usePersistentForm from "../hooks/persistentForm.js";

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

import overgaardLogo from "./images/overgaardwoodlogo.jpg";
import { useNavigate } from "react-router-dom";

function Catalogue() {
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [selectedTab, setSelectedTab] = useState("single");
  const [showExitModal, setShowExitModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);

  const [formData, setFormData] = usePersistentForm("createCaseForm", {
    klientNavn: "",
    klientMail: "",
    klientNummer: "",
    klientAdresse: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectDoor = (door) => {
  setSelectedDoor(door.id);
  handleChange("selectedDoor", door.image); 
};


  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);
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

  const [tempClient, setTempClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleTempClientInput = (e) => {
    const { name, value } = e.target;
    setTempClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClient = () => {
    const { name, email, phone, address } = tempClient;
    if (!name || !email || !phone) {
      alert("Udfyld venligst alle påkrævede felter!");
      return;
    }

    handleChange("klientNavn", name);
    handleChange("klientMail", email);
    handleChange("klientNummer", phone);
    handleChange("klientAdresse", address || "");

    setShowClientModal(false);
  };

  const handleSelectExistingClient = (e) => {
    const value = e.target.value;
    if (!value) return;

    const clients = {
      "1": { name: "John Doe", email: "john@example.com", phone: "12345678", address: "Fake Street 1" },
      "2": { name: "Jane Doe", email: "jane@example.com", phone: "87654321", address: "Fake Street 2" },
    };

    const selected = clients[value];
    handleChange("klientNavn", selected.name);
    handleChange("klientMail", selected.email);
    handleChange("klientNummer", selected.phone);
    handleChange("klientAdresse", selected.address);
  };

  const handleResetClient = () => {
    handleChange("klientNavn", "");
    handleChange("klientMail", "");
    handleChange("klientNummer", "");
    handleChange("klientAdresse", "");
  };

  const handleEditClient = () => {
    setTempClient({
      name: formData.klientNavn,
      email: formData.klientMail,
      phone: formData.klientNummer,
      address: formData.klientAdresse,
    });
    setShowClientModal(true);
  };

  const hasClient = formData.klientNavn && formData.klientMail && formData.klientNummer;

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
            <button onClick={goTo("/catalogue")} className="px-4 py-2 bg-gray-100 text-gray-400 rounded font-medium hover:bg-blue-100 hover:text-blue-600">1: Dør Katalog</button>
            <button onClick={goTo("/practical")} className="px-4 py-2 bg-blue-500 rounded text-white font-medium hover:bg-blue-600">2: Det Praktiske</button>
            <button onClick={goTo("/orderoverview")} className="px-4 py-2 bg-blue-500 rounded text-white font-medium hover:bg-blue-600">3: Order Oversigt</button>
          </div>
          <div className="border-t border-gray-200 mb-5"></div>

          {/* Client Section */}
          <div className={`rounded-lg p-4 border shadow-sm ${!hasClient ? "client-warning" : "border-gray-200 bg-gray-50"}`}>
            {!hasClient && (
              <>
                <label className="text-base font-semibold text-gray-800 mb-3 block">Vælg Klient *</label>
                <select onChange={handleSelectExistingClient} className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 mb-3">
                  <option value="">Vælg et Klient...</option>
                  <option value="1">John Doe</option>
                  <option value="2">Jane Doe</option>
                </select>
                <button className="w-full bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md mb-4 hover:bg-blue-600" onClick={() => { setTempClient({name:"",email:"",phone:"",address:""}); setShowClientModal(true); }}>+ Ny Klient</button>
                <p className="!text-red-600 font-medium">* Vælg venligst en klient for at fortsætte</p>
              </>
            )}
            {hasClient && (
              <div className="bg-white rounded-md border p-3 mt-3">
                <h3 className="font-semibold text-gray-800 mb-2">Klientoplysninger</h3>
                <p><strong>Navn:</strong> <input value={formData.klientNavn} onChange={(e) => handleChange("klientNavn", e.target.value)} /></p>
                <p><strong>Email:</strong> <input value={formData.klientMail} onChange={(e) => handleChange("klientMail", e.target.value)} /></p>
                <p><strong>Telefon:</strong> <input value={formData.klientNummer} onChange={(e) => handleChange("klientNummer", e.target.value)} /></p>
                <p><strong>Adresse:</strong> <input value={formData.klientAdresse} onChange={(e) => handleChange("klientAdresse", e.target.value)} /></p>
                <div className="flex justify-center gap-2 mt-3">
                  <button className="text-gray-400 text-xs underline hover:text-gray-600 transition" onClick={handleResetClient}>Skift</button>
                  <button className="text-gray-400 text-xs underline hover:text-gray-600 transition" onClick={handleEditClient}>Rediger</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Client Modal */}
      {showClientModal && (
        <div className="fixed inset-0 !bg-black/40 flex items-center justify-center z-50">
          <div className="backdrop-blur-xl !bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

            <h2 className="text-2xl font-semibold mb-6 text-white text-center">
              Klientoplysninger
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block text-white/80 mb-1 font-medium">Navn *</label>
                <input
                  type="text"
                  name="name"
                  value={tempClient.name}
                  onChange={handleTempClientInput}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                  placeholder="Indtast navn"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-1 font-medium">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={tempClient.email}
                  onChange={handleTempClientInput}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                  placeholder="Indtast email"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-1 font-medium">Telefon *</label>
                <input
                  type="tel"
                  name="phone"
                  value={tempClient.phone}
                  onChange={handleTempClientInput}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                  placeholder="Indtast telefonnummer"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-1 font-medium">Adresse *</label>
                <input
                  type="text"
                  name="address"
                  value={tempClient.address}
                  onChange={handleTempClientInput}
                  className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                  placeholder="Indtast adresse"
                />
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowClientModal(false)}
                className="px-4 py-2 bg-gray-200/60 text-black rounded hover:bg-gray-300/70"
              >
                Afbryd
              </button>

              <button
                onClick={handleSaveClient}
                className="px-4 py-2 bg-blue-500/60 text-white rounded hover:bg-blue-600/70"
              >
                Gem Klient
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main Door Grid */}
      <div className="flex-1 ml-64 overflow-y-auto p-10 relative">
        {/* Tabs */}
        <div className="sticky top-12 bg-white z-30 py-4 flex justify-center gap-6 border-b border-gray-200">
          <button onClick={() => setSelectedTab("single")} className={`px-4 py-2 bg-blue-500 rounded font-medium transition ${selectedTab === "single" ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"}`}>Single Doors</button>
          <button onClick={() => setSelectedTab("double")} className={`px-4 py-2 bg-blue-500 rounded font-medium transition ${selectedTab === "double" ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"}`}>Double Doors</button>
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
                  selectedDoor === door.id ? "ring-4 ring-blue-500 scale-105" : "hover:scale-105 hover:ring-2 hover:ring-blue-300"
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
          onClick={(goTo("/practical"))}
          disabled={!hasClient}
          className={`fixed bottom-4 right-4 px-6 py-3 rounded shadow transition ${
            hasClient
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "!bg-gray-300 !text-gray-400 c!ursor-not-allowed !button-pulse !button-shake"
          }`}
        >
          Næste
        </button>
      </div>
    </div>
  );
}

export default Catalogue;
