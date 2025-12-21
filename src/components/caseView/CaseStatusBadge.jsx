import React from "react";

// A reusable badge component for displaying case status.
// Renders a colored dot indicator with status text.
function CaseStatusBadge({ status }) {
    // Logic moved from case.jsx
    const normalizedStatus = status?.toLowerCase() || 'lead';

    return (
        <span className={`status ${normalizedStatus}`}>
            {normalizedStatus}
        </span>
    );
}

export default CaseStatusBadge;
