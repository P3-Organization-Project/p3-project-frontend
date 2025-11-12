import "./materiel.css"
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import overgaardLogo from "./images/overgaardwoodlogo.jpg";

function Materiel() {
  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <div className="flex min-h-screen min-w-screen bg-white text-black">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full h-12 bg-gray-700 shadow-md z-50 flex items-center justify-between px-6">
        {/* Logo Left */}
        <div className="flex items-center gap-2">
          <button
            className="logoButton h-10 w-10"
            onClick={goTo("/dashboard")}
            style={{
              backgroundImage: `url(${overgaardLogo})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></button>
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
                onClick={() => {
                  /* add sign out logic */
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                Sign Out
              </button>
              <button
                onClick={() => {
                  /* navigate to account settings */
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                Administer Account
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 items-center overflow-y-auto p-10 mt-16">
        <h1 className="text-2xl font-semibold mb-6">Add New Material</h1>

        <form className="space-y-4 max-w-md">
          <div>
            <label htmlFor="materialName" className="block text-sm font-medium text-gray-700 mb-1">
              Material Name
            </label>
            <input
              type="text"
              id="materialName"
              placeholder="Enter material name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="materialType" className="block text-sm font-medium text-gray-700 mb-1">
              Applicable Doors
            </label>
            <input
              type="text"
              id="materialType"
              placeholder="Door A, Door B, etc."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label htmlFor="materialCost" className="block text-sm font-medium text-gray-700 mb-1">
              Cost (DKK)
            </label>
            <input
              type="number"
              id="materialCost"
              placeholder="0.00"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={goTo("/materiel")}
              className="px-6 py-2 bg-gray-200 rounded text-gray-700 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 rounded text-white hover:bg-blue-700 transition"
            >
              Save Material
            </button>
          </div>
        </form>

        <table class="table-fixed">
        <thead>
            <tr>
            <th>Material</th>
            <th>Doors Affected</th>
            <th>Cost</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>Wood</td>
            <td>Door A. Door B, Door C</td>
            <td>2000</td>
            </tr>
            <tr>
            <td>Handle</td>
            <td>Door D, Door E, Door F</td>
            <td>500</td>
            </tr>
            <tr>
            <td>Hinges</td>
            <td>Door A, Door B, Door E</td>
            <td>200</td>
            </tr>
        </tbody>
        </table>
      </div>
    </div>
  );
}

export default Materiel
