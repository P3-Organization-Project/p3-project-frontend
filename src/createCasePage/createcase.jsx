import './createcase.css'
import { useNavigate } from 'react-router-dom'
import React from "react";

function Createcase() {
    const navigate = useNavigate()
    const goToCaseOverview = () => {
        navigate('/case')
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <h1>Create Case 🎉</h1>

            <div className="case-main">
                {/*Client*/}
                <div className="client-section">
                    <label className="client-label">Choose Client *</label>
                    <select className="client-dropdown">
                        <option>-----</option>
                    </select>

                    <button className="opretcase-createClient">+ Create New Client</button>
                </div>

                {/*Door*/}
                <h2>Add Door Model</h2>
                <button className="opretcase-catalogue-btn">Door Catalogue</button>

                <h2>Added Doors</h2>

                {/*Status*/}
            <div className="opretCase-status">
                <div className="status-box">
                    <label className="status-label">Status *</label>
                    <select className="status-dropdown">
                        <option>-----</option>
                    </select>
                </div>

        
            </div>
            </div>
            {/*Action Buttons*/}
                <div className="opretcase-action-btn">
                    <button
                        className="opretcase-cancel-btn"
                        onClick={goToCaseOverview}
                        type="submit"
                    >
                        Cancel
                    </button>
                    <button className="opretcase-create-btn">Create Case</button>
                </div>
        </div>
    )
}

export default Createcase
