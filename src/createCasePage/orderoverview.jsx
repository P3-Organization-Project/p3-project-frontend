import './createcase.css'
import { useNavigate } from 'react-router-dom'
import React from "react";
import { useState } from "react";

import overgaardLogo from './images/overgaardwoodlogo.jpg';


function Orderoverview() {
    const navigate = useNavigate();

    const goTo = (path) => () => navigate(path);
    const [accountOpen, setAccountOpen] = useState(false); 

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
  );
}

export default Orderoverview;
