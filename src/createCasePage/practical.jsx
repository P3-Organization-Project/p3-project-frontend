// src/createCasePage/practical.jsx
import "./catalogue.css";
import React, { useState, useEffect } from "react";
import usePersistentForm from "../hooks/persistentForm.js";

import overgaardLogo from "./images/overgaardwoodlogo.jpg";
import rightHingeside from "./images/rightHingeside.png";
import leftHingeside from "./images/leftHingeside.png";

import { useNavigate } from "react-router-dom";
import CollapsibleSection from "../hooks/CollapsibleSection.jsx";

import { customerService } from "../api/services/customerService";
import { useApi } from "../hooks/useAPI";

function Practical() {
    const [showExitModal, setShowExitModal] = useState(false);
    const [showClientModal, setShowClientModal] = useState(false);

    // form structure to include customerId
    const [formData, setFormData] = usePersistentForm("createCaseForm", {
        hulmaalLength: "",
        hulmaalWidth: "",
        hulmaalThickness: "",
        fugeLuft: "",
        haengselSide: "",
        karmOffsetMinus: "",
        karmOffsetPlus: "",
        antal: "",
        customerId: null,
        customerDetails: null,
        tætningsbånd: "",
        note: "",
        selectedDoor: null,
    });

    // Fetch customers from backend
    const {
        data: customers,
        loading: customersLoading,
        error: customersError,
        execute: fetchCustomers
    } = useApi(customerService.getAllCustomers);

    //API hook for creating customers
    const {
        loading: createLoading,
        error: createError,
        execute: executeCreateCustomer
    } = useApi(customerService.createCustomer);

    //Fetch customers on component mount
    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const navigate = useNavigate();
    const [accountOpen, setAccountOpen] = useState(false);
    const goTo = (path) => () => navigate(path);

    const [tempClient, setTempClient] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        companyName: "",
    });

    const handleTempClientInput = (e) => {
        const { name, value } = e.target;
        setTempClient((prev) => ({ ...prev, [name]: value }));
    };

    // Save client via backend API
    const handleSaveClient = async () => {
        const { name, email, phoneNumber, address, companyName } = tempClient;
        if (!name || !email || !phoneNumber) {
            alert("Udfyld venligst alle påkrævede felter!");
            return;
        }

        try {
            // Create customer via backend API
            const newCustomer = await executeCreateCustomer({
                name,
                email,
                phoneNumber,
                address: address || "",
                companyName: companyName || ""
            });

            // Store customer ID and cached details in form
            handleChange("customerId", newCustomer.id);
            handleChange("customerDetails", {
                name: newCustomer.name,
                email: newCustomer.email,
                phoneNumber: newCustomer.phoneNumber,
                address: newCustomer.address,
                companyName: newCustomer.companyName
            });

            // Refresh customer list
            await fetchCustomers();
            setShowClientModal(false);
        } catch (err) {
            alert("Fejl ved oprettelse af klient: " + (err.message || "Ukendt fejl"));
        }
    };

    // Select existing customer from API data
    const handleSelectExistingClient = (e) => {
        const customerId = e.target.value;
        if (!customerId) return;

        // Find customer from API data
        const selected = customers?.find(c => c.id.toString() === customerId);
        if (!selected) return;

        // Store customer ID and cached details
        handleChange("customerId", selected.id);
        handleChange("customerDetails", {
            name: selected.name,
            email: selected.email,
            phoneNumber: selected.phoneNumber,
            address: selected.address,
            companyName: selected.companyName
        });
    };

    const handleResetClient = () => {
        handleChange("customerId", null);
        handleChange("customerDetails", null);
    };

    const handleEditClient = () => {
        if (formData.customerDetails) {
            setTempClient({
                name: formData.customerDetails.name || "",
                email: formData.customerDetails.email || "",
                phoneNumber: formData.customerDetails.phoneNumber || "",
                address: formData.customerDetails.address || "",
                companyName: formData.customerDetails.companyName || "",
            });
        }
        setShowClientModal(true);
    };

    //Check for customer using nthe data structure
    const hasClient = formData.customerId && formData.customerDetails;

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
                        <button onClick={goTo("/practical")} className="px-4 py-2 bg-gray-100 text-gray-400 rounded font-medium hover:bg-blue-100 hover:text-blue-600">2: Det Praktiske</button>
                        <button onClick={goTo("/orderoverview")} className="px-4 py-2 bg-blue-500 rounded text-white font-medium hover:bg-blue-600">3: Order Oversigt</button>
                    </div>
                    <div className="border-t border-gray-200 mb-5"></div>

                    {/* Client Section - UPDATED to use API data */}
                    <div className={`rounded-lg p-4 border shadow-sm ${!hasClient ? "client-warning" : "border-gray-200 bg-gray-50"}`}>
                        {/* Loading/Error states for customer fetch */}
                        {customersLoading && <p className="text-gray-600 text-sm mb-2">Indlæser klienter...</p>}
                        {customersError && <p className="text-red-600 text-sm mb-2">Fejl: {customersError}</p>}

                        {!hasClient && (
                            <>
                                <label className="text-base font-semibold text-gray-800 mb-3 block">Vælg Klient *</label>
                                {/* CHANGED: Populate dropdown from API data */}
                                <select
                                    onChange={handleSelectExistingClient}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 mb-3"
                                    disabled={customersLoading}
                                >
                                    <option value="">Vælg et Klient...</option>
                                    {customers?.map(customer => (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    className="w-full bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
                                    onClick={() => {
                                        setTempClient({name:"",email:"",phoneNumber:"",address:"",companyName:""});
                                        setShowClientModal(true);
                                    }}
                                >
                                    + Ny Klient
                                </button>
                                <p className="!text-red-600 font-medium">* Vælg venligst en klient for at fortsætte</p>
                            </>
                        )}
                        {hasClient && (
                            <div className="bg-white rounded-md border p-3 mt-3">
                                <h3 className="font-semibold text-gray-800 mb-2">Klientoplysninger</h3>
                                {/* CHANGED: Display cached customer details (read-only) */}
                                <p><strong>Navn:</strong> {formData.customerDetails.name}</p>
                                <p><strong>Email:</strong> {formData.customerDetails.email}</p>
                                <p><strong>Telefon:</strong> {formData.customerDetails.phoneNumber}</p>
                                <p><strong>Adresse:</strong> {formData.customerDetails.address || "-"}</p>
                                {formData.customerDetails.companyName && (
                                    <p><strong>Firma:</strong> {formData.customerDetails.companyName}</p>
                                )}
                                <div className="flex justify-center gap-2 mt-3">
                                    <button className="text-gray-400 text-xs underline hover:text-gray-600 transition" onClick={handleResetClient}>Skift</button>
                                    <button className="text-gray-400 text-xs underline hover:text-gray-600 transition" onClick={handleEditClient}>Rediger</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Client Modal field */}
            {showClientModal && (
                <div className="fixed inset-0 !bg-black/40 flex items-center justify-center z-50">
                    <div className="backdrop-blur-xl !bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

                        <h2 className="text-2xl font-semibold mb-6 text-white text-center">
                            Klientoplysninger
                        </h2>

                        {/* Show create error if any */}
                        {createError && (
                            <p className="text-red-600 mb-4 text-center">{createError}</p>
                        )}

                        {/* INPUT FIELDS */}
                        <div className="space-y-4">

                            <div>
                                <label className="block text-white/80 mb-1 font-medium">Navn *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={tempClient.name}
                                    onChange={handleTempClientInput}
                                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none "
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
                                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none "
                                    placeholder="Indtast email"
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 mb-1 font-medium">Telefon *</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={tempClient.phoneNumber}
                                    onChange={handleTempClientInput}
                                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none "
                                    placeholder="Indtast telefonnummer"
                                />
                            </div>

                            <div>
                                <label className="block text-white/80 mb-1 font-medium">Adresse</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={tempClient.address}
                                    onChange={handleTempClientInput}
                                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none "
                                    placeholder="Indtast adresse"
                                />
                            </div>

                            {/*Company name field */}
                            <div>
                                <label className="block text-white/80 mb-1 font-medium">Firmanavn</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    value={tempClient.companyName}
                                    onChange={handleTempClientInput}
                                    className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none "
                                    placeholder="Indtast firmanavn (valgfrit)"
                                />
                            </div>

                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex justify-between mt-6">

                            <button
                                onClick={() => setShowClientModal(false)}
                                className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition font-medium"
                                disabled={createLoading}
                            >
                                Afbryd
                            </button>

                            <button
                                onClick={handleSaveClient}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                                disabled={createLoading}
                            >
                                {createLoading ? "Gemmer..." : "Gem Klient"}
                            </button>

                        </div>

                    </div>
                </div>
            )}


            {/*  Main Content */}
            <div className="ml-0 md:ml-64 mt-12 p-4 md:p-10 flex flex-col min-h-screen overflow-y-auto">
                <div className="flex flex-col md:flex-row items-start min-h-screen w-full bg-white p-8 gap-8">
                    {/* Left side: collapsible sections */}
                    <div className="flex-1 flex flex-col space-y-8">
                        {/* Hulmål Section */}
                        <CollapsibleSection title="Hulmål" className="w-full max-w-md">
                            <table className="w-full border border-gray-300">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-left">Længde</th>
                                    <th className="border px-4 py-2 text-left">Bredde</th>
                                    <th className="border px-4 py-2 text-left">Tykkelse</th>
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
                                    <td className="border px-4 py-2">
                                        <input
                                            type="text"
                                            value={formData.hulmaalThickness || ""}
                                            onChange={(e) => handleChange("hulmaalThickness", e.target.value)}
                                            placeholder=""
                                            className="w-full border border-gray-300 rounded px-2 py-1"
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </CollapsibleSection>

                        {/* Fuge luft Section */}
                        <CollapsibleSection title="Fuge luft" className="w-full max-w-md">
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
                        <CollapsibleSection title="Hængselside" className="w-full max-w-md">
                            <div className="flex justify-around items-center">
                                <label className="flex flex-col items-center">
                                    <span>Venstre</span>
                                    <div
                                        style={{ backgroundImage: `url(${leftHingeside})`}}
                                        className="w-64 h-19 bg-gray-100 border border-black mt-1"></div>
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 mt-2"
                                        checked={formData.haengselSide === "venstre"}
                                        onChange={() => handleChange("haengselSide", formData.haengselSide === "venstre" ? "" : "venstre")}
                                    />
                                </label>

                                <label className="flex flex-col items-center">
                                    <span>Højre</span>
                                    <div
                                        style={{ backgroundImage: `url(${rightHingeside})`}}
                                        className="w-64 h-19 bg-gray-100 border border-black mt-1"></div>
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
                        <CollapsibleSection title="Karm bredde offset" className="w-full max-w-md">
                            <table className="w-full border border-gray-300">
                                <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-left">Minus</th>
                                    <th className="border px-4 py-2 text-left">Plus</th>
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
                                        <option value="Eg">Eg</option>
                                        <option value="Douglas">Douglas</option>
                                        <option value="Andet">Andet</option>
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
                                        <option value="Som dørflade">Som dørflade</option>
                                        <option value="Eg">Eg</option>
                                        <option value="Douglas">Douglas</option>
                                        <option value="andet">Andet</option>
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
                                        <option value="Som dørflade">Som dørflade</option>
                                        <option value="Eg">Eg</option>
                                        <option value="Duglas">Duglas</option>
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
                                        <option value="Forskalling">Forskalling</option>
                                        <option value="Finér: Bookmatched">Finér: Bookmatched</option>
                                        <option value="Finér: Kaotisk">Finér: Kaotisk</option>

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
                                        <option value="Ren">Ren</option>
                                        <option value="Naturlig: Mild">Naturlig: Mild</option>
                                        <option value="Naturlig: Mellem">Naturlig: Mellem</option>
                                        <option value="Naturlig: Høj">Naturlig: Høj</option>
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
                                        <option value="Sort">Sort</option>
                                        <option value="Valnød">Valnød</option>
                                        <option value="Snedkerens Valg">Snedkerens Valg</option>
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
                                        <option value="Pure">Pure</option>
                                        <option value="Natural">Natural</option>
                                        <option value="White 5%">White 5%</option>
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
                                        <option value="Tectus TE 340 3D">Tectus TE 340 3D</option>
                                        <option value="Hamborghængsel">Hamborghængsel</option>

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
                                        <option value="Boda 2014">Boda 2014</option>
                                        <option value="Arrone AR3313">Arrone AR3313</option>
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
                                        <option value="Schall EX-L 15/30">Schall EX-L 15/30</option>
                                        <option value="Bundstykke">Bundstykke</option>
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
                        <CollapsibleSection title="Note" className="w-full max-w-md">
                            <input
                                type="text"
                                value={formData.note}
                                onChange={(e) => handleChange("note", e.target.value)}
                                placeholder=""
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </CollapsibleSection>
                    </div>
                    {/* Right side: selected door */}
                    {formData.selectedDoor && (
                        <div className="w-full md:w-1/3 flex justify-center items-start sticky top-20">
                            <img
                                src={formData.selectedDoor}
                                alt="Valgt Dør"
                                className="w-full h-auto rounded shadow-md"
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Bottom Buttons */}
            <button onClick={goTo("/catalogue")} className="fixed bottom-4 left-4 px-6 py-3 bg-gray-200 rounded text-white hover:bg-gray-300 shadow">Tilbage</button>

            <button
                onClick={goTo("/orderoverview")}
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
    );
}

export default Practical;
