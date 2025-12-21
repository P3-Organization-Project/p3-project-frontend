import React from "react";
import CaseStatusBadge from "./CaseStatusBadge";

// A table row component for displaying a single case.
// Receives case data and click handler via props.
function CaseCard({
                      caseData,
                      onCaseClick
                  }) {
    return (
        <tr>
            {/* clickable case ID cell - moved from case.jsx*/}
            <td
                className="caseID"
                onClick={() => onCaseClick(caseData)}
                style={{ cursor: "pointer" }}
            >
                {caseData.id}
            </td>

            {/* case display columns - moved from case.jsx**/}
            <td className="client">{caseData.client}</td>
            <td>{caseData.assigned}</td>
            <td>{caseData.doorType}</td>
            <td>{caseData.date}</td>

            {/* Uses CaseStatusBadge instead of inline status span */}
            <td>
                <CaseStatusBadge status={caseData.status} />
            </td>

            <td>{caseData.price}</td>
        </tr>
    );
}

export default CaseCard;
