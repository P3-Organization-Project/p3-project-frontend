import './Case.css'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePersistentForm from "../hooks/persistentForm.js";
import overgaardLogo from "./images/overgaardwoodlogo.jpg";
import placeholderCases from "../data/placeholderCases.json";

function Case() {
    const [showExitModal, setShowExitModal] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = usePersistentForm("createCaseForm", {});

    const [accountOpen, setAccountOpen] = useState(false);
    const goTo = (path) => () => navigate(path);
    const [cases, setCases] = useState([]);

    useEffect(() => {
        const savedCases = JSON.parse(localStorage.getItem("savedCases") || "[]");
        // Merge placeholder cases with saved cases
        setCases([...placeholderCases, ...savedCases]);
    }, []);
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
                        <th>Sags ID</th>
                        <th>Klient</th>
                        <th>Tildelt</th>
                        <th>Dør Type</th>
                        <th>Dato</th>
                        <th>Status</th>
                        <th>Pris</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cases.map((caseItem) => (
                        <tr key={caseItem.id}>
                            <td
                                className="caseID"
                                onClick={() => {
                                    setFormData({ ...caseItem.details, caseId: caseItem.id });
                                    navigate("/orderoverview");
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                {caseItem.id}
                            </td>
                            <td className="client">{caseItem.client}</td>
                            <td>{caseItem.assigned}</td>
                            <td>{caseItem.doorType}</td>
                            <td>{caseItem.date}</td>
                            <td>
                                <span className={`status ${caseItem.status}`}>{caseItem.status}</span>
                            </td>
                            <td>{caseItem.price}</td>
                        </tr>
                    ))}
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