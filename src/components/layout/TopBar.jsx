import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import overgaardLogo from "../../images/overgaardwoodlogo.jpg";
import { FaUser } from 'react-icons/fa';

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
                    className="fixed h-10 w-10 rounded-full"
                    onClick={handleLogoClick}
                    style={{
                        backgroundImage: `url(${overgaardLogo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </div>
            <div className="absolute ">
                <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="fixed top-1 right-5 h-10 w-10 rounded-full bg-gray-100">
                    <span className="flex items-center justify-center">
                        <FaUser className="h-6 w-6 absolute" />
                    </span>
                </button>
                {accountOpen && (
                    <div className="fixed right-5 top-14 w-48 border border-gray-200 rounded-md shadow-lg">
                        <button
                            onClick={logout}
                            className="w-full text-center px-4 py-2"
                        >
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopBar;
