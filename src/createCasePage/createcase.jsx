import './createcase.css'
import { useNavigate } from 'react-router-dom'
import React, { useState } from "react";

function Createcase() {
    const navigate = useNavigate();
    const [status, setStatus] = useState("");

    const [showClientModal, setShowClientModal] = useState(false);
    const [client, setClient] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleClientInput = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
    };

    const handleSaveClient = () => {
        if (!client.name || !client.email || !client.phone) {
            alert("Please fill out all client fields!");
            return;
        }
        console.log("New client created:", client);
        setShowClientModal(false);
        setClient({ name: "", email: "", phone: "" });
    };

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

                        <button
                            className="createcase-createClient"
                            onClick={() => setShowClientModal(true)}
                        >
                            + Create New Client
                        </button>
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
            {/*Client popup*/}
            {showClientModal && (
                <div className="modal-overlay">
                    <div className="modal-box">
                        <h2>Client Info</h2>

                        <label>Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={client.name}
                            onChange={handleClientInput}
                            placeholder="Enter Client Name"
                        />

                        <label>Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={client.email}
                            onChange={handleClientInput}
                            placeholder="Enter Client Email"
                        />

                        <label>Phone *</label>
                        <input
                            type="tel"
                            name="phone"
                            value={client.phone}
                            onChange={handleClientInput}
                            placeholder="Enter Client Phone Number"
                        />

                        <div className="modal-actions">
                            <button onClick={() => setShowClientModal(false)} className="modal-cancel-btn">
                                Cancel
                            </button>
                            <button onClick={handleSaveClient} className="modal-save-btn">
                                + Create Client
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Createcase
