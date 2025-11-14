import React, { useState } from "react";

function CollapsibleSection({ title, children }) {
    const [open, setOpen] = useState(true);

    const toggleOpen = () => setOpen(!open);

    return (
        <div className="w-180 flex-w-md mb-6 border border-gray-200 rounded-lg shadow-sm">
            {/* Klikbar titel – ligner din oprindelige h2 */}
            <h2
                onClick={toggleOpen}
                className="font-bold text-xl mb-2 px-2 py-2 cursor-pointer select-none flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                {title}
                <span className="text-gray-500 text-sm">{open ? "▲" : "▼"}</span>
            </h2>

            {/* Kun vis indhold, når sektionen er åben */}
            {open && <div className="p-2">{children}</div>}
        </div>
    );
}

export default CollapsibleSection;
