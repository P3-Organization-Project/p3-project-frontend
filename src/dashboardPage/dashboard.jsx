    import "./dash.css"
    import { useNavigate } from 'react-router-dom'
    import React from "react";
    import { useState } from "react";
    
    import overgaardLogo from './images/overgaardwoodlogo.jpg';
    
    
    function Dashboard() {    
        const navigate = useNavigate();
    
        const goTo = (path) => () => navigate(path);
        const [accountOpen, setAccountOpen] = useState(false); 
    
        return(
        
        <div className="flex min-h-screen min-w-screen bg-white text-black padding-top-2">
          <div className="flex min-h-screen min-w-screen bg-white text-black">
          
          {/*  Top bar  */}
          <div className="fixed top-0 left-0 w-full h-12 !bg-gray-500 shadow-md z-50 flex items-center justify-between px-6">
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
                    onClick={() => { /* navigate to account settings (need to still make this) */ }}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Administer Account
                  </button>
                </div>
              )}
            </div>
          </div>
    
          {/*  Main Content */}
          <div className="flex-grow flex items-center justify-center mt-24 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-5x1">
                    <button onClick={goTo("/case")}className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Cases</button>
                    <button onClick={goTo("/client")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Klient</button>
                    <button onClick={goTo("/materiel")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Materialer</button>
                    <button onClick={goTo("/catalogue")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Opret Case</button>
                    <button onClick={goTo("/door")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Dør</button>
                    <button onClick={goTo("/team")} className="dashboardButton text-white font-semibold text-xl px-10 py-5 h-30 rounded-xl w-full sm:w-auto shadow-md transition-transform hover:scale-105">Teamet</button>
            </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default Dashboard;
    