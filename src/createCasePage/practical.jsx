import './createcase.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import usePersistentForm from "../hooks/persistentForm.js";
import overgaardLogo from './images/overgaardwoodlogo.jpg';
import CollapsibleSection from "../hooks/CollapsibleSection.jsx";

function Practical() {
    const navigate = useNavigate();
    const [accountOpen, setAccountOpen] = useState(false);


    const [formData, setFormData] = usePersistentForm("createCaseForm", {
        hulmaalLength: "", hulmaalWidth: "", fugeLuft: "", haengselSide: "", karmOffsetMinus: "", karmOffsetPlus: "", antal: "", klientNavn: "", klientNummer: "", klientMail: "", klientAdresse: "", "tætningsbånd": "",
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({...prev, [field]: value,
        }));
    };


    const goTo = (path) => () => navigate(path);



    return(
    
    <div className="flex min-h-screen min-w-screen bg-white text-black padding-top-2">
      <div className="flex min-h-screen min-w-screen bg-white text-black">
      
      {/*  Top bar  */}
      <div className="fixed top-0 left-0 w-full h-12 bg-gray-700 shadow-md z-50 flex items-center justify-between px-6">
        {/* Logo Left */}
        <div className="flex items-center gap-2">
          <button className=" h-10 w-10"
          onClick={goTo("/dashboard")}
          style={{
                  backgroundImage: `url(${overgaardLogo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></button>
        </div>
        {/* Account Icon */}
        <div className="relative">
          <button
            onClick={() => setAccountOpen(!accountOpen)}
            className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          >
            <span className="text-gray-200 font-bold">B</span> 
          </button>

          {/* Dropdown */}
          {accountOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
              <button
                onClick={() => { /* add sign out logic */ }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                Sign Out
              </button>
              <button
                onClick={() => { /* navigate to account settings */ }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                Administer Account
              </button>
            </div>
          )}
        </div>
      </div>

      {/*Fixed Left Sidebar*/}
      <div className="mt-4 fixed top-15 left-0 h-190 w-64 bg-white shadow-md z-50 flex flex-col justify-between">
        <div className="flex flex-col h-full overflow-y-auto px-4 py-6">
          
          {/* Navigation Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <button onClick={goTo("/catalogue")} className="ktlbtn px-4 py-2 bg-blue-500 rounded text-white font-medium hover:bg-blue-600 transition">
              1: Dør Katalog
            </button>
            <button onClick={goTo("/practical")} className="prakbtn px-4 py-2 bg-gray-100 text-gray-400 rounded font-medium hover:bg-blue-100 hover:text-blue-600 transition">
              2: Det Praktiske
            </button>
            <button onClick={goTo("/orderoverview")} className="oversigtbtn px-4 py-2 bg-gray-100 text-gray-400 rounded font-medium hover:bg-blue-100 hover:text-blue-600 transition">
              3: Order Oversigt
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mb-5"></div>

          {/* Client Section */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm">

            {/* Choose Client */}
            <label className="text-base font-semibold text-gray-800 mb-3">
              Vælg Klient *
            </label>
            <select
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="">Vælg et Klient...</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Doe</option>
            </select>

            <button
              className="w-full bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md mb-4 hover:bg-blue-600 transition"
            >
              + Ny Klient
            </button>

            {/* Client Info */}
            <div className="space-y-3">
              <div>
                <label htmlFor="clientName" className="block text-sm text-gray-600 font-medium mb-1">
                  
                </label>
                <input
                  type="text"
                  value={formData.klientNavn}
                  onChange={(e) => handleChange("klientNavn", e.target.value)}
                  id="clientName"
                  placeholder="Klient Navn"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              <div>
                <label htmlFor="clientEmail" className="block text-sm text-gray-600 font-medium mb-1">
                  
                </label>
                <input
                  type="text"
                  value={formData.klientMail}
                  onChange={(e) => handleChange("klientMail", e.target.value)}
                  id="clientEmail"
                  placeholder="Klient@Mail.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              <div>
                <label htmlFor="clientNumber" className="block text-sm text-gray-600 font-medium mb-1">
                  
                </label>
                <input
                  type="text"
                  value={formData.klientNummer}
                  onChange={(e) => handleChange("klientNummer", e.target.value)}
                  id="clientNumber"
                  placeholder="Telefon (optional) +45"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              <div>
                <label htmlFor="clientAddress" className="block text-sm text-gray-600 font-medium mb-1">
                  
                </label>
                <input
                  type="text"
                  value={formData.klientAdresse}
                  onChange={(e) => handleChange("klientAdresse", e.target.value)}
                  id="clientAddress"
                  placeholder="Adresse..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  Main Content */}
      <div className="flex-1 overflow-y-auto p-10 relative">
            <div className="flex flex-col items-center justify-start min-h-screen w-full bg-white p-8 space-y-8">
                {/* Hulmål Section */}
                <CollapsibleSection title="hulmål" className="w-full max-w-md">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">Længde</th>
                            <th className="border px-4 py-2 text-left">Bredde</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={formData.hulmaalLength || ""}
                                    onChange={(e) => handleChange("hulmaalLength", e.target.value)}
                                    placeholder=""
                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={formData.hulmaalWidth || ""}
                                    onChange={(e) => handleChange("hulmaalWidth", e.target.value)}
                                    placeholder=""
                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </CollapsibleSection>

                {/* Fuge luft Section */}
                <CollapsibleSection title="fuge luft" className="w-full max-w-md">
                    <div className="flex gap-8 items-center">
                        <label className="flex flex-col items-center">
                            <span>5mm</span>
                            <input
                                type="checkbox"
                                className="w-5 h-5 mt-1"
                                checked={formData.fugeLuft === "5mm"}
                                onChange={() => handleChange("fugeLuft", formData.fugeLuft === "5mm" ? "" : "5mm")}
                            />
                        </label>

                        <label className="flex flex-col items-center">
                            <span>10mm</span>
                            <input
                                type="checkbox"
                                className="w-5 h-5 mt-1"
                                checked={formData.fugeLuft === "10mm"}
                                onChange={() => handleChange("fugeLuft", formData.fugeLuft === "10mm" ? "" : "10mm")}
                            />
                        </label>

                    </div>
                </CollapsibleSection>


                {/* Hængsel side Section */}
                <CollapsibleSection title="hængselside" className="w-full max-w-md">
                    <div className="flex justify-around items-center">
                        <label className="flex flex-col items-center">
                            <span>Venstre</span>
                            <div className="w-16 h-8 bg-gray-100 border border-black mt-1"></div>
                            <input
                                type="checkbox"
                                className="w-5 h-5 mt-2"
                                checked={formData.haengselSide === "venstre"}
                                onChange={() => handleChange("haengselSide", formData.haengselSide === "venstre" ? "" : "venstre")}
                            />
                        </label>

                        <label className="flex flex-col items-center">
                            <span>Højre</span>
                            <div className="w-16 h-8 bg-gray-100 border border-black mt-1"></div>
                            <input
                                type="checkbox"
                                className="w-5 h-5 mt-2"
                                checked={formData.haengselSide === "hojre"}
                                onChange={() => handleChange("haengselSide", formData.haengselSide === "hojre" ? "" : "hojre")}
                            />
                        </label>

                    </div>
                </CollapsibleSection>

                {/* Karm Bredde Offset Section */}
                <CollapsibleSection title="karm bredde offset" className="w-full max-w-md">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2 text-left">minus</th>
                            <th className="border px-4 py-2 text-left">plus</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={formData.karmOffsetMinus || ""}
                                    onChange={(e) => handleChange("karmOffsetMinus", e.target.value)}
                                    placeholder="-"
                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={formData.karmOffsetPlus || ""}
                                    onChange={(e) => handleChange("karmOffsetPlus", e.target.value)}
                                    placeholder="+"
                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </CollapsibleSection>
                {/* Træsort Section */}
                <CollapsibleSection title="Træsort">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
                        {/* Dørflade */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Dørflade</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["dørflade"] || ""}
                                onChange={(e) => handleChange("dørflade", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Dørflade-1">Dørflade valg 1</option>
                                <option value="Dørflade-2">Dørflade valg 2</option>
                            </select>
                        </div>

                        {/* Dørkant */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Dørkant</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["dørkant"] || ""}
                                onChange={(e) => handleChange("dørkant", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Dørkant-1">Dørkant valg 1</option>
                                <option value="Dørkant-2">Dørkant valg 2</option>
                            </select>
                        </div>

                        {/* Karm */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Karm</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["karm"] || ""}
                                onChange={(e) => handleChange("karm", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Karm-1">Karm valg 1</option>
                                <option value="Karm-2">Karm valg 2</option>
                            </select>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* Udseende Section */}
                <CollapsibleSection title="Udseende">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 p-4">
                        {/* Udførsel */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Udførsel</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["udførsel"] || ""}
                                onChange={(e) => handleChange("udførsel", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Udførsel-1">Udførsel valg 1</option>
                                <option value="Udførsel-2">Udførsel valg 2</option>
                            </select>
                        </div>

                        {/* Naturlighed */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Naturlighed</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["naturlighed"] || ""}
                                onChange={(e) => handleChange("naturlighed", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Naturlighed-1">Naturlighed valg 1</option>
                                <option value="Naturlighed-2">Naturlighed valg 2</option>
                            </select>
                        </div>

                        {/* Lappe Farve */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Lappe Farve</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["lappe farve"] || ""}
                                onChange={(e) => handleChange("lappe farve", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Lappe Farve-1">Lappe Farve valg 1</option>
                                <option value="Lappe Farve-2">Lappe Farve valg 2</option>
                            </select>
                        </div>

                        {/* Behandling */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Behandling</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["behandling"] || ""}
                                onChange={(e) => handleChange("behandling", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Behandling-1">Behandling valg 1</option>
                                <option value="Behandling-2">Behandling valg 2</option>
                            </select>
                        </div>
                    </div>
                </CollapsibleSection>

                {/* Hardware Section */}
                <CollapsibleSection title="Hardware">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
                        {/* Hængsel */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Hængsel</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["hængsel"] || ""}
                                onChange={(e) => handleChange("hængsel", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Hængsel-1">Hængsel valg 1</option>
                                <option value="Hængsel-2">Hængsel valg 2</option>
                            </select>
                        </div>

                        {/* Låsekasse */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Låsekasse</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["låsekasse"] || ""}
                                onChange={(e) => handleChange("låsekasse", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Låsekasse-1">Låsekasse valg 1</option>
                                <option value="Låsekasse-2">Låsekasse valg 2</option>
                            </select>
                        </div>

                        {/* Tætningsbånd */}
                        <div className="flex flex-col">
                            <label className="font-semibold mb-2">Vælg Tætningsbånd</label>
                            <select
                                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
                                value={formData["tætningsbånd"] || ""}
                                onChange={(e) => handleChange("tætningsbånd", e.target.value)}
                            >
                                <option value="">-------</option>
                                <option value="Tætningsbånd-1">Tætningsbånd valg 1</option>
                                <option value="Tætningsbånd-2">Tætningsbånd valg 2</option>
                            </select>
                        </div>
                    </div>
                </CollapsibleSection>



                {/* Antal Section */}
                <CollapsibleSection title="Antal" className="w-full max-w-md">
                    <input
                        type="text"
                        value={formData.antal}
                        onChange={(e) => handleChange("antal", e.target.value)}
                        placeholder="1, 2, 3"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </CollapsibleSection>
            </div>
    </div>

        {/* Bottom Buttons */}
        <button
            onClick={() => {
                localStorage.removeItem("createCaseForm");
                goTo("/createcase")();
            }}
          className="fixed bottom-4 left-4 px-6 py-3 bg-gray-200 rounded text-white hover:bg-gray-300 shadow"
        >
          Afbryd
        </button>
        <button
          onClick={goTo("/practical")}
          className="fixed bottom-4 right-4 px-6 py-3 bg-gray-200 rounded text-white hover:bg-gray-300 shadow"
        >
          Næste
        </button>

      </div>
    </div>
  );
}

export default Practical;
