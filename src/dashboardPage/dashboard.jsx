    import "./dash.css"
    import { useNavigate } from 'react-router-dom'
    import React from "react";
    import { useState } from "react";

    import TopBar from "../components/layout/TopBar";
    
    
    function Dashboard() {    
        const navigate = useNavigate();
    
        const goTo = (path) => () => navigate(path);
    
        return(
        
        <div className="flex min-h-screen min-w-screen bg-white text-black padding-top-2">
          <div className="flex min-h-screen min-w-screen bg-white text-black">

          {/* TopBar component  */}
          <TopBar onLogoClick={() => navigate("/dashboard")} />

          {/*  Main Content */}
          <div className="flex-grow flex items-center justify-center mt-24 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5x1">
                    <button onClick={goTo("/case")}className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Sager</button>
                    <button onClick={goTo("/client")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Klient</button>
                    <button onClick={goTo("/materiel")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Materialer</button>
                    <button onClick={goTo("/catalogue")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Opret Sag</button>
                    <button onClick={goTo("/door")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Dør</button>
                    <button onClick={goTo("/team")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Teamet</button>
            </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default Dashboard;
    