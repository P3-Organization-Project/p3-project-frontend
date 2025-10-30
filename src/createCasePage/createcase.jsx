import './createcase.css'
import { useNavigate } from 'react-router-dom'
import React, { useState } from "react";

function Createcase() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    {/*Case ID - SHOULD BE GENERATED RANDOMLY */}
    const caseId = "📁12345678";

    const goTo = (path) => () => navigate(path);

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-white">
            <h1>Create Case 🎉</h1>

            <div className={"case-id-box"}>
                <span className={"case-id-value"}>{caseId}</span>
            </div>

            <div className="case-main">
                {/*Client*/}
                <div className="client-section">
                    <label className="client-label">Choose Client *</label>

                    <div className="client-controls">
                        <select className="client-dropdown">
                            <option>-----</option>
                        </select>

                        <button className="createcase-createClient">+ Create New Client</button>
                    </div>
                </div>


                {/*Door*/}
                <h2>Add Door Model (Minimum 1)*</h2>
                <button onClick={goTo("/catalogue")} className="createcase-catalogue-btn">Door Catalogue</button>

                <h2>Added Doors:</h2>

                {/*Status*/}
            <div className="createcase-status">
                <div className="status-box">
                    <label htmlFor = "status" className="status-label">Status *</label>
                    <select
                        id = "status"
                        className="status-dropdown"
                        value = {status}
                        onChange = {(e) => setStatus(e.target.value)}
                        >
                        <option value = "">-----</option>
                        <option value = "Lead">Lead</option>
                        <option value = "Performa">Performa</option>
                        <option value = "Finish">Finish</option>
                    </select>
                </div>

        
            </div>
            </div>
            {/*Action Buttons*/}
                <div className="createcase-action-btn">
                    <button
                        className="createcase-cancel-btn"
                        onClick={goTo("/case")}
                        type="submit"
                    >
                        Cancel
                    </button>
                    <button
                        className="createcase-create-btn"
                        onClick={goTo("/case")}
                        type={"submit"}
                    >
                        + Create Case
                    </button>
                </div>
        </div>
    )
}

export default Createcase
