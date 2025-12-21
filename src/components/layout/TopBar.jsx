import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import overgaardLogo from "../../createCasePage/images/overgaardwoodlogo.jpg";

function TopBar({ onLogoClick, showExitModal = false }) {
    const [accountOpen, setAccountOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const userName = user?.name || localStorage.getItem("clientName") || "User";

    const handleLogoClick = () => {
        if (onLogoClick) {
            onLogoClick();
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-12 !bg-gray-500 shadow-md z-50 flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
                <button
                    className="h-10 w-10"
                    onClick={handleLogoClick}
                    style={{
                        backgroundImage: `url(${overgaardLogo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </div>
            <div className="relative">
                <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                >
                    <span className="text-gray-700 font-bold">
                        {userName.charAt(0).toUpperCase()}
                    </span>
                </button>
                {accountOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Sign Out
                        </button>
                        <button
                            onClick={() => navigate("/account")}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                        >
                            Administer Account
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopBar;
