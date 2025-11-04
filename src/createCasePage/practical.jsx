import './createcase.css'
import { useNavigate } from 'react-router-dom'
import React from "react";
import { useState } from "react";


function Practical() {
    const [hulmaal, setHulmaal] = useState({ length: "", width: "" });

    const navigate = useNavigate();

    const goTo = (path) => () => navigate(path);
    return(
    <div className="flex flex-col items-center justify-center justify-start h-screen w-screen bg-white text-black">
Practical


        <div className="flex gap-10 mt-4" >
            <button onClick={goTo("/catalogue")} className="px-4 py-2 bg-gray-200 rounded w-20 h-10 text-white"> 1</button>
            <button onClick={goTo("/practical")} className="px-4 py-2 bg-gray-200 rounded w-20 h-10 text-white"> 2</button>
            <button onClick={goTo("/doormateriel")} className="px-4 py-2 bg-gray-200 rounded w-20 h-10 text-white"> 3</button>
            <button onClick={goTo("/orderoverview")} className="px-4 py-2 bg-gray-200 rounded w-20 h-10 text-white"> 4</button>
            <button onClick={goTo("/catalogue")} className="absolute bottom-4 left-4 px-4 py-2 bg-gray-200 rounded w-40 h-15 text-white">Tilbage</button>
            <button onClick={goTo("/doormateriel")} className="absolute bottom-4 right-4 px-4 py-2 bg-gray-200 rounded w-40 h-15 text-white">Næste</button>
        </div>
            <div className="flex flex-col items-center justify-start min-h-screen w-full bg-white p-8 space-y-8">
                {/* Hulmål Section */}
                <section className="w-full max-w-md">
                    <h2 className="font-bold text-xl mb-2">Hulmål:</h2>
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
                                    value={hulmaal.length}
                                    onChange={(e) => setHulmaal({ ...hulmaal, length: e.target.value })}
                                    placeholder="fx. 2000mm"
                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                />
                            </td>
                            <td className="border px-4 py-2">
                                <input
                                    type="text"
                                    value={hulmaal.width}
                                    onChange={(e) => setHulmaal({ ...hulmaal, width: e.target.value })}
                                    placeholder="fx. 1400mm"
                                    className="w-full border border-gray-300 rounded px-2 py-1"
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </section>

                {/* Fuge luft Section */}
                <section className="w-full max-w-md">
                    <h2 className="font-bold text-xl mb-2">Fuge luft:</h2>
                    <div className="flex gap-8 items-center">
                        <label className="flex flex-col items-center">
                            <span>5mm</span>
                            <input type="checkbox" className="w-5 h-5 mt-1" />
                        </label>
                        <label className="flex flex-col items-center">
                            <span>10mm</span>
                            <input type="checkbox" className="w-5 h-5 mt-1" />
                        </label>
                    </div>
                </section>

                {/* Hængsel side Section */}
                <section className="w-full max-w-md">
                    <h2 className="font-bold text-xl mb-2">Hængsel side:</h2>
                    <div className="flex justify-around items-center">
                        <label className="flex flex-col items-center">
                            <span>Venstre</span>
                            {/* Add SVG or image for hinge illustration */}
                            <div className="w-16 h-8 bg-gray-100 border border-black mt-1"></div>
                            <input type="checkbox" className="w-5 h-5 mt-2" />
                        </label>

                        <label className="flex flex-col items-center">
                            <span>Højre</span>
                            <div className="w-16 h-8 bg-gray-100 border border-black mt-1"></div>
                            <input type="checkbox" className="w-5 h-5 mt-2" />
                        </label>
                    </div>
                </section>

                {/* Karm Bredde Offset Section */}
                <section className="w-full max-w-md">
                    <h2 className="font-bold text-xl mb-2">Karm Bredde Offset:</h2>
                    <div className="flex justify-around items-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-8 bg-gray-100 border border-black flex items-center justify-center">-</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-8 bg-gray-100 border border-black flex items-center justify-center">+</div>
                        </div>
                    </div>
                </section>

                {/* Antal Section */}
                <section className="w-full max-w-md">
                    <h2 className="font-bold text-xl mb-2">Antal</h2>
                    <input
                        type="text"
                        placeholder="1, 2, 3 etc"
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </section>
            </div>
    </div>
)
}
export default Practical