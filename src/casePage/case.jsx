import './Case.css'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePersistentForm from "../hooks/persistentForm.js";
import overgaardLogo from "./images/overgaardwoodlogo.jpg";

function Case() {
  const [showExitModal, setShowExitModal] = useState(false);
  
    const navigate = useNavigate();
    const [accountOpen, setAccountOpen] = useState(false);
    const goTo = (path) => () => navigate(path);


  return (
  <div className="flex min-h-screen min-w-screen bg-white text-black">

      {/* Top bar */}
      <div className="fixed top-0 left-0 w-full h-12 !bg-gray-500 shadow-md z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <button className="h-10 w-10" style={{ backgroundImage: `url(${overgaardLogo})`, backgroundSize: "cover", backgroundPosition: "center" }}></button>
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

     {/* Main Content */}
    <div className="h-screen w-screen overflow-hidden bg-white">
            <div className="case-page">
                <table className="case-table">
                    <thead>
                    <tr>
                        <th>Case ID:</th>
                        <th>Klient:</th>
                        <th>Sagsbehandler:</th>
                        <th>Dør Type:</th>
                        <th>Dato:</th>
                        <th>Status:</th>
                        <th>Pris:</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>

                        <td className="caseID">56842364</td>
                        <td className="client">Ole Jensen</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type A</td>
                        <td>08/10/25</td>
                        <td><span className="status performa">Performa</span></td>
                        <td>7.000 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">66238965</td>
                        <td className="client">Pia Kjærsgaard</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type B</td>
                        <td>12/10/25</td>
                        <td><span className="status lead">Lead</span></td>
                        <td>7.500 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">66842362</td>
                        <td className="client">Lars Løkke</td>
                        <td className="assigned">Rosa Nielsen</td>
                        <td className="doortype">Door Type C</td>
                        <td>06/12/25</td>
                        <td><span className="status finish">Finish</span></td>
                        <td>8.000 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">12345678</td>
                        <td className="client">Anders Hemmingsen</td>
                        <td className="assigned">Stine Petersen</td>
                        <td className="doortype">Door Type D</td>
                        <td>10/10/25</td>
                        <td><span className="status performa">Performa</span></td>
                        <td>8.250 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">21345678</td>
                        <td className="client">Jacob Hermann</td>
                        <td className="assigned">Stine Petersen</td>
                        <td className="doortype">Door Type E</td>
                        <td>17/10/25</td>
                        <td><span className="status lead">Lead</span></td>
                        <td>8.500 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">26842365</td>
                        <td className="client">Peter Olsen</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type F</td>
                        <td>18/10/25</td>
                        <td><span className="status performa">Performa</span></td>
                        <td>6.000 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">36842361</td>
                        <td className="client">Julie Pedersen</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type G</td>
                        <td>19/10/25</td>
                        <td><span className="status performa">Performa</span></td>
                        <td>4.000 DKK</td>
                    </tr>
                    <tr>
                        <td className="caseID">76842305</td>
                        <td className="client">Ida Sofie Nielsen</td>
                        <td className="assigned">Hans Marker</td>
                        <td className="doortype">Door Type H</td>
                        <td>25/10/25</td>
                        <td><span className="status finish">Finish</span></td>
                        <td>6.500 DKK</td>
                    </tr>
                    </tbody>
                </table>
            </div>

    </div>
        {/* Bottom Button */}
        <button
          onClick={goTo("/catalogue")}
          className="fixed bottom-4 right-4 px-6 py-3 !bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          + Opret Case
        </button>

        </div>
  );
}

export default Case;