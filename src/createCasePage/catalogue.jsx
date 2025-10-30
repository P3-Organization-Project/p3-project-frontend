import React from "react";
import './Catalogue.css'
import { useNavigate } from 'react-router-dom'

function Catalogue() {
    const navigate = useNavigate();

    const goTo = (path) => () => navigate(path);
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-3xl font-bold">Welcome to the catalogue oversigt 🎉</h1>
            <button onClick={goTo("/")}className>DoorA</button>
        </div>
    )
}
export default Catalogue
