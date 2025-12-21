import React from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function Sidebar({ steps, children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { caseId } = useParams();

    const handleStepClick = (basePath) => {
        // Append caseId if we're in edit mode
        const path = caseId ? `${basePath}/${caseId}` : basePath;
        navigate(path);
    };

    return (
        <div className="mt-4 fixed top-15 left-0 h-190 w-64 bg-white shadow-md z-40 flex flex-col justify-between">
            <div className="flex flex-col h-full overflow-y-auto px-4 py-6">
                {steps && (
                    <>
                        <div className="flex flex-col gap-3 mb-6">
                            {steps.map((step, index) => {
                                // Check if current path matches this step (with or without caseId)
                                const isActive = location.pathname.startsWith(step.path);

                                return (
                                    <button
                                        key={step.path || index}
                                        onClick={() => handleStepClick(step.path)}
                                        className={`px-4 py-2 rounded font-medium transition ${
                                            isActive
                                                ? "bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-600"
                                                : "bg-blue-500 text-white hover:bg-blue-600"
                                        }`}
                                    >
                                        {step.label}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="border-t border-gray-200 mb-5"></div>
                    </>
                )}
                {children}
            </div>
        </div>
    );
}

export default Sidebar;
