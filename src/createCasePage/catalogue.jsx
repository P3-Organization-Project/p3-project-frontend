import React from "react";
import './Catalogue.css'
import { useNavigate } from 'react-router-dom'

function Catalogue() {
    const navigate = useNavigate();

    const goTo = (path) => () => navigate(path);
    return (
       <div className="flex flex-col items-center justify-center justify-start h-screen w-screen bg-white text-black">
        Door Catalog


        <div className="flex gap-10 mt-4" >
            <button onClick={goTo("/catalogue")} className="px-4 py-2 bg-gray-200 rounded w-20 h-10 text-white"> 1</button>
            <button onClick={goTo("/practical")} className="px-4 py-2 bg-gray-200 rounded w-20 h-10 text-white"> 2</button>
            <button onClick={goTo("/doormateriel")} className="px-4 py-2 bg-gray-200 rounded w-20 h-10 text-white"> 3</button>
            <button onClick={goTo("/orderoverview")} className="px-4 py-2 bg-gray-200 rounded w-20 h-10 text-white"> 4</button>
        </div>
                
    </div>
    )
}
export default Catalogue
