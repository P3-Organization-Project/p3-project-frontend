import React, {useState} from "react";
import './team.css';
import overgaardLogo from "../casePage/images/overgaardwoodlogo.jpg";
import { useNavigate } from 'react-router-dom'




function Team ()  {
    const [accountOpen, setAccountOpen] = useState(false);
    const navigate = useNavigate();
    const goTo = (path) => () => navigate(path);

    return (
        <div className="h-screen w-screen overflow-hidden bg-white">

            {/* Top bar */}
            <div className="fixed top-0 left-0 w-full h-12 !bg-gray-500 shadow-md z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <button onClick={goTo("/dashboard")} className="h-10 w-10" style={{ backgroundImage: `url(${overgaardLogo})`, backgroundSize: "cover", backgroundPosition: "center" }}></button>

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

            {/* Team Stats */}
            <div className="Team-page pt-12">
                <div className="header-actions">
                    <h1>📁 Team Oversigt </h1>
                    <button className="text-white px-4 py-2 rounded !bg-blue-500" >
                        + Opret Sælger
                    </button>
                </div>

                <div className="flex gap-8 my-6 justify-center items-center">

                    {/* Alle Medarbejdere */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow">
                        <div className="text-2xl p-3 rounded-lg bg-blue-100 text-blue-700">👥</div>
                        <div>
                            <p className="text-sm text-gray-500 m-0">Alle Medarbejdere</p>
                            <h3 className="text-xl font-semibold m-0 text-black">8</h3>
                        </div>
                    </div>

                    {/* Aktive */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow">
                        <div className="text-2xl p-3 rounded-lg bg-green-100 text-green-700">✅</div>
                        <div>
                            <p className="text-sm text-gray-500 m-0">Aktive</p>
                            <h3 className="text-xl font-semibold m-0 text-black">5</h3>
                        </div>
                    </div>

                    {/* På Orlov */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow">
                        <div className="text-2xl p-3 rounded-lg bg-yellow-100 text-yellow-700">🕓</div>
                        <div>
                            <p className="text-sm text-gray-500 m-0">På Orlov</p>
                            <h3 className="text-xl font-semibold m-0 text-black">2</h3>
                        </div>
                    </div>

                    {/* Inaktive */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow">
                        <div className="text-2xl p-3 rounded-lg bg-red-100 text-red-700">❌</div>
                        <div>
                            <p className="text-sm text-gray-500 m-0">Inaktive</p>
                            <h3 className="text-xl font-semibold m-0 text-black">1</h3>
                        </div>
                    </div>

                </div>



                {/*  Main Content*/}
                <div className="overflow-x-auto shadow-lg rounded-lg mt-6">
                    <table className="min-w-full border-collapse bg-white">
                        <thead>
                        <tr className="bg-gray-100 text-gray-700 text-left">
                            <th className="py-3 px-4 font-medium">User ID</th>
                            <th className="py-3 px-4 font-medium">Navn</th>
                            <th className="py-3 px-4 font-medium">Email</th>
                            <th className="py-3 px-4 font-medium">Antal Case</th>
                            <th className="py-3 px-4 font-medium">Status</th>
                        </tr>
                        </thead>

                        <tbody>
                        {[
                            { id: "56842364", name: "Ole Jensen", email: "OJ@overgaard.dk", cases: 5, status: "Aktiv" },
                            { id: "56842365", name: "Mette Hansen", email: "MH@overgaard.dk", cases: 3, status: "På Orlov" },
                            { id: "56842366", name: "Lars Nielsen", email: "LN@overgaard.dk", cases: 1, status: "Inaktiv" },
                        ].map((row, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-4">{row.id}</td>
                                <td className="py-3 px-4">{row.name}</td>
                                <td className="py-3 px-4">{row.email}</td>
                                <td className="py-3 px-4">
            <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm">
              {row.cases}
            </span>
                                </td>
                                <td className="py-3 px-4">{row.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default Team;
