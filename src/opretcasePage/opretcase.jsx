import './opretcase.css'
import { useNavigate } from 'react-router-dom'
import React from "react";



function Opretcase() {
    const navigate = useNavigate()
    const goToCaseOverview = () => {
        navigate('/case')
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Create Case 🎉</h1>

            <h2>Choose Client*</h2>
            <h2>Add Door Model</h2>
            <h2>Added Doors</h2>
            <h2>Status</h2>

            <div className="mt-4 flex flex-col gap-2">
                <button className="opretcase-chooseClient">Choose Client</button>
                <button className="opretcase-createClient">+ Create New Client</button>
                <button className="opretcase-catalogue-btn">Door Catalogue</button>
                <button className="opretcase-status-btn">Change Status</button>
                <button className="opretcase-cancel-btn"
                        onClick={goToCaseOverview}
                        type="submit">Cancel</button>
                <button className="opretcase-create-btn">Create Case</button>
            </div>


        </div>
    )
}

export default Opretcase
