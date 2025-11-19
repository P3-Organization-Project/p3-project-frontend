import React, {useState} from "react";
import './team.css';
import overgaardLogo from "../casePage/images/overgaardwoodlogo.jpg";
import { useNavigate } from 'react-router-dom'


function Team ()  {
    const [accountOpen, setAccountOpen] = useState(false);
    const navigate = useNavigate();
    const goTo = (path) => () => navigate(path);

    const [showSellerModal, setShowSellerModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);

    const [seller, setSeller] = useState({ name: "", email: "", password: "" });
    const [sellers, setSellers] = useState([
        { id: "56842364", name: "Ole Jensen", email: "OJ@overgaard.dk", password: "123", cases: 5, status: "Aktiv" },
        { id: "56842365", name: "Mette Hansen", email: "MH@overgaard.dk", password: "123", cases: 3, status: "På Orlov" },
        { id: "56842366", name: "Lars Nielsen", email: "LN@overgaard.dk", password: "123", cases: 1, status: "Inaktiv" },
    ]);

    const handleSellerInput = (e) => {
        const { name, value } = e.target;
        setSeller({ ...seller, [name]: value });
    };

    {/* Save Seller Input */}
    const handleSaveSeller = () => {
        if (!seller.name || !seller.email || !seller.password) {
            alert("Udfyld venligst alle felter!");
            return;
        }
        if (editingIndex !== null) {
            const updatedSellers = [...sellers];
            updatedSellers[editingIndex] = { ...updatedSellers[editingIndex], ...seller };
            setSellers(updatedSellers);
        } else {
            {/* Generate random UserID */}
            const randomId = Math.floor(10000000 + Math.random() * 90000000).toString();
            {/* Initialize Seller stats */}
            setSellers([...sellers, { ...seller, id: randomId, cases: 0, status: "Aktiv" }]);
        }
        setShowSellerModal(false);
        setSeller({ name: "", email: "", password: "" });
        setEditingIndex(null);
    };
    {/* When the user clicks "Edit" */}
    const handleEditSeller = (index) => {
        setEditingIndex(index);
        setSeller({
            name: sellers[index].name,
            email: sellers[index].email,
            password: sellers[index].password,
        });
        setShowSellerModal(true);
    };

    {/* When the user clicks "Delete" */}
    const handleDeleteSeller = (index) => {
        if (window.confirm("Er du sikker på at slette sælgeren?")) {
            const updatedSellers = [...sellers];
            updatedSellers.splice(index, 1);
            setSellers(updatedSellers);
        }
    };

    // Stats calculation
    const total = sellers.length;
    const active = sellers.filter(s => s.status === "Aktiv").length;
    const onLeave = sellers.filter(s => s.status === "På Orlov").length;
    const inactive = sellers.filter(s => s.status === "Inaktiv").length;



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

            {/* Seller Modal */}
            {showSellerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96 shadow-lg flex flex-col gap-4">
                        <h2 className="text-xl font-semibold">Seller Info</h2>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={seller.name}
                                onChange={handleSellerInput}
                                placeholder="Indtast Sælgerens Navn"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={seller.email}
                                onChange={handleSellerInput}
                                placeholder="Indtast Sælgerens Email"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Password *</label>
                            <input
                                type="tel"
                                name="password"
                                value={seller.password}
                                onChange={handleSellerInput}
                                placeholder="Indtast Sælgerens Password"
                                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => setShowSellerModal(false)}
                                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Afbryd
                            </button>
                            <button
                                onClick={handleSaveSeller}
                                className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                            >
                                + Opret Sælger
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Titel and Create button */}
            <div className="Team-page pt-12">
                <div className="header-actions">
                    <h1 className="text-2xl font-bold">📁 Team Oversigt  </h1>
                    <button className="text-white px-4 py-2 rounded !bg-blue-500"
                            onClick={() => setShowSellerModal(true)}>
                            + Opret Sælger
                    </button>
                </div>

                <div className="flex gap-8 my-6 justify-center items-center">

                    {/* Team Stats Alle Medarbejdere */}
                    {/* Alle Medarbejdere */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow">
                        <div className="text-2xl p-3 rounded-lg bg-blue-100 text-blue-700">👥</div>
                        <div>
                            <p className="text-sm text-gray-500 m-0">Alle Medarbejdere</p>
                            <h3 className="text-xl font-semibold m-0 text-black">{total}</h3>
                        </div>
                    </div>

                    {/* Aktive */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow">
                        <div className="text-2xl p-3 rounded-lg bg-green-100 text-green-700">✅</div>
                        <div>
                            <p className="text-sm text-gray-500 m-0">Aktive</p>
                            <h3 className="text-xl font-semibold m-0 text-black">{active}</h3>
                        </div>
                    </div>

                    {/* På Orlov */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow">
                        <div className="text-2xl p-3 rounded-lg bg-yellow-100 text-yellow-700">🕓</div>
                        <div>
                            <p className="text-sm text-gray-500 m-0">På Orlov</p>
                            <h3 className="text-xl font-semibold m-0 text-black">{onLeave}</h3>
                        </div>
                    </div>

                    {/* Inaktive */}
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-4 shadow">
                        <div className="text-2xl p-3 rounded-lg bg-red-100 text-red-700">❌</div>
                        <div>
                            <p className="text-sm text-gray-500 m-0">Inaktive</p>
                            <h3 className="text-xl font-semibold m-0 text-black">{inactive}</h3>
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
                        {sellers.map((row, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="py-3 px-4">{row.id}</td>
                                <td className="py-3 px-4">{row.name}</td>
                                <td className="py-3 px-4">{row.email}</td>
                                <td className="py-3 px-4">
                                    <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm">{row.cases}</span>
                                </td>
                                <td className="py-3 px-4">{row.status}</td>
                                <td className="py-3 px-4 text-right">
                                    <div className="flex justify-end gap-3">
                                        <button
                                            onClick={() => handleEditSeller(index)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteSeller(index)}
                                            className="text-red-600 hover:underline"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
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