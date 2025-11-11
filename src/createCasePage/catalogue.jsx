import React, { useState } from "react";
import "./catalogue.css";

import buttonImageA from './images/singleDoorA.jpg';
import buttonImageB from './images/singleDoorB.jpg';
import buttonImageC from './images/singleDoorC.jpg';
import buttonImageD from './images/singleDoorD.jpg';
import buttonImageE from './images/singleDoorE.jpg';
import buttonImageF from './images/singleDoorF.jpg';

import doubleDoorImageA from './images/doubleDoorA.jpg';
import doubleDoorImageB from './images/doubleDoorB.jpg';
import doubleDoorImageC from './images/doubleDoorC.jpg';
import doubleDoorImageD from './images/doubleDoorD.jpg';
import doubleDoorImageE from './images/doubleDoorE.jpg';
import doubleDoorImageF from './images/doubleDoorF.jpg';

import overgaardLogo from './images/overgaardwoodlogo.jpg';

import { useNavigate } from "react-router-dom";

function Catalogue() {
  const navigate = useNavigate();
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [selectedTab, setSelectedTab] = useState("single");
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

  return (
    <div className="flex min-h-screen min-w-screen bg-white text-black padding-top-2">
      <div className="flex min-h-screen min-w-screen bg-white text-black">
      
      {/*  Top bar  */}
      <div className="fixed top-0 left-0 w-full h-12 bg-gray-700 shadow-md z-50 flex items-center justify-between px-6">
        {/* Logo Left */}
        <div className="flex items-center gap-2">
          <button onClick={goTo("/dashboard")} className=" h-10 w-10"
          
          style={{
                  backgroundImage: `url(${overgaardLogo})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}></button>
        </div>

        {/* Tab Selection */}
        <div className="absolute left-1/2 transform -translate-x-1/2 font-semibold text-xl text-gray-800">
        <div className="flex gap-5 mt-6 mb-4 border-gray-300 pb-2 w-full justify-center">
          <button
            onClick={() => setSelectedTab("single")}
            className={`sngbtn px-6 py-1 font-semibold rounded-t-md transition-colors duration-200 ${
              selectedTab === "single"
                ? " text-white border-b-4 border-blue-700"
                : " text-gray-600 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            Single Doors
          </button>
          <button
            onClick={() => setSelectedTab("double")}
            className={`dbbtn px-6 py-1 font-semibold rounded-t-md transition-colors duration-200 ${
              selectedTab === "double"
                ? "text-white border-b-4 border-blue-700"
                : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            Double Doors
          </button>
        </div>
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
      <div className="flex-1 ml-64 overflow-y-auto p-10 relative">

        {/* Door Grid Section */}
        <div className="flex-grow flex items-center justify-center mt-10 w-full px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl justify-items-center">
            {doors.map((door) => (
              <button
                key={door.id}
                onClick={() => setSelectedDoor(door.id)}
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
        <button
          onClick={goTo("/createcase")}
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
    </div>
  );
}

export default Catalogue;
