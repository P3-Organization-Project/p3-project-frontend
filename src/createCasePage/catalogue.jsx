import React, { useState } from "react";
import "./Catalogue.css";

import buttonImageA from './images/singleDoorA.jpg'
import buttonImageB from './images/singleDoorB.jpg'
import buttonImageC from './images/singleDoorC.jpg'
import buttonImageD from './images/singleDoorD.jpg'

import doubleDoorImageA from './images/doubleDoorA.jpg'
import doubleDoorImageB from './images/doubleDoorB.jpg'
import doubleDoorImageC from './images/doubleDoorC.jpg'
import doubleDoorImageD from './images/doubleDoorD.jpg'

import { useNavigate } from "react-router-dom";

function Catalogue() {
  const navigate = useNavigate();
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [selectedTab, setSelectedTab] = useState("single");

  const goTo = (path) => () => navigate(path);

  const singleDoors = [
    { id: "S1", label: "Door A", image: buttonImageA },
    { id: "S2", label: "Door B", image: buttonImageB },
    { id: "S3", label: "Door C", image: buttonImageC },
    { id: "S4", label: "Door D", image: buttonImageD },
  ];

  const doubleDoors = [
    { id: "D1", label: "Double Door A", image: doubleDoorImageA },
    { id: "D2", label: "Double Door B", image: doubleDoorImageB },
    { id: "D3", label: "Double Door C", image: doubleDoorImageC },
    { id: "D4", label: "Double Door D", image: doubleDoorImageD },
  ];

  const doors = selectedTab === "single" ? singleDoors : doubleDoors;

  return (
    <div className="flex flex-col items-center w-screen min-h-screen bg-white text-black overflow-x-hidden">

      {/* Fixed Header Section */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex flex-col items-center">
        <h1 className="text-2xl font-bold mt-4">Door Catalog</h1>

        {/* Navigation Buttons */}
        <div className="flex gap-6 mt-4">
          <button onClick={goTo("/catalogue")} className="px-4 py-2 bg-gray-300 rounded w-20 h-10 text-white hover:bg-gray-400">1</button>
          <button onClick={goTo("/practical")} className="px-4 py-2 bg-gray-300 rounded w-20 h-10 text-white hover:bg-gray-400">2</button>
          <button onClick={goTo("/doormateriel")} className="px-4 py-2 bg-gray-300 rounded w-20 h-10 text-white hover:bg-gray-400">3</button>
          <button onClick={goTo("/orderoverview")} className="px-4 py-2 bg-gray-300 rounded w-20 h-10 text-white hover:bg-gray-400">4</button>
          <button onClick={goTo("/createcase")} className="absolute bottom-4 left-4 px-4 py-2 bg-gray-200 rounded w-40 h-15 text-white">Afbryd</button>
          <button onClick={goTo("/practical")} className="absolute bottom-4 right-4 px-4 py-2 bg-gray-200 rounded w-40 h-15 text-white">Næste</button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mt-6 border-b border-gray-300 pb-2 w-full justify-center">
          <button
            onClick={() => setSelectedTab("single")}
            className={`px-6 py-2 font-semibold rounded-t-md transition-colors duration-200 ${
              selectedTab === "single"
                ? "bg-blue-500 text-white border-b-4 border-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            Single Doors
          </button>
          <button
            onClick={() => setSelectedTab("double")}
            className={`px-6 py-2 font-semibold rounded-t-md transition-colors duration-200 ${
              selectedTab === "double"
                ? "bg-blue-500 text-white border-b-4 border-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600"
            }`}
          >
            Double Doors
          </button>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-56" />

      {/* Door Grid Section */}
      <div className="flex-grow flex items-center justify-center mt-10 w-full px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl justify-items-center">
          {doors.map((door) => (
            <button
              key={door.id}
              onClick={() => setSelectedDoor(door.id)}
              style={{
                backgroundImage: `url(${door.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`text-white font-semibold text-xl px-10 py-5 h-80 w-80 rounded-xl shadow-md transition-all duration-200 ${
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
    </div>
  );
}

export default Catalogue;
