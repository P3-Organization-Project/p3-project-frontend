// Displays a summary of the case/order before submission.
// Shows customer info, door configuration, and practical details.
//  almost all logic moved from orderoverview.jsx
import React from "react";
import { FIELD_LABELS, FIELD_GROUPS } from "./constants/fieldMappings";

/// Renders customer information section
function CustomerInfoSection({ customerDetails, formData }) {
    // Support both new customerDetails format and legacy individual fields
    const name = customerDetails?.name || formData.klientNavn || "Standard klient";
    const email = customerDetails?.email || formData.klientMail || "-";
    const phone = customerDetails?.phoneNumber || formData.klientNummer || "-";
    const address = customerDetails?.address || formData.klientAdresse || "-";

    return (
        <div className="mb-6 p-6 border rounded shadow-sm bg-gray-50">
            <h2 className="font-bold text-2xl mb-6 border-b pb-2 text-center">
                Klientoplysninger
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <p><strong>Navn:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Telefon:</strong> {phone}</p>
                <p><strong>Adresse:</strong> {address}</p>
            </div>
        </div>
    );
}

//Renders a group of form fields
function FieldGroup({ groupKey, group, formData }) {
    const visibleFields = group.fields.filter(
        (field) => formData[field] && formData[field] !== ""
    );

    if (visibleFields.length === 0) {
        return null;
    }

    return (
        <div className="mb-6">
            <h3 className="font-bold text-xl mb-4 underline decoration-2 decoration-black text-center">
                {group.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {visibleFields.map((field) => (
                    <p key={field} className="text-md">
                        <strong>{FIELD_LABELS[field] || field}:</strong> {formData[field]}
                    </p>
                ))}
            </div>
        </div>
    );
}

// Renders the selected door image
function SelectedDoorSection({ selectedDoor }) {
    if (!selectedDoor) {
        return null;
    }

    return (
        <div className="mb-6 text-center">
            <h2 className="font-bold text-xl mb-4 underline decoration-2 decoration-black text-center">
                Valgt Dør:
            </h2>
            <img
                src={selectedDoor}
                alt="Valgt Dør"
                className="w-72 h-auto rounded shadow-md mx-auto"
            />
        </div>
    );
}

// Renders the price placeholder section
function PriceSection({ price = "Price will Be shown once the case is saved" }) {
    return (
        <div className="mb-6 p-8 border rounded bg-gray-100 w-full">
            <h2 className="font-bold text-2xl mb-6 border-b bg-gray-100 pb-2 text-center underline decoration-2 decoration-black">
                Pris
            </h2>
            <div className="text-center bg-gray-100 text-xl font-semibold">
                {price}
            </div>
        </div>
    );
}

// Status selector dropdown
function StatusSelector({ selectedStatus, onStatusChange }) {
    return (
        <div className="flex flex-col mb-6">
            <label className="!text-red-600 font-semibold mb-2">
                Vælg Status *
            </label>
            <select
                value={selectedStatus}
                onChange={(e) => onStatusChange(e.target.value)}
                className="bg-blue-600 text-white rounded px-4 py-2 shadow-md"
            >
                <option value="lead">Lead</option>
                <option value="performa">Performa</option>
                <option value="finish">Finish</option>
            </select>
        </div>
    );
}

// Main OrderSummary component
// Combines all sections into a complete order overview
function OrderSummary({
                          formData,
                          selectedStatus,
                          onStatusChange,
                          price,
                          showStatusSelector = true
                      }) {
    return (
        <div className="bg-white p-10 space-y-8 shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-center underline">
                Order Oversigt
            </h1>

            {/* Status selector */}
            {showStatusSelector && (
                <StatusSelector
                    selectedStatus={selectedStatus}
                    onStatusChange={onStatusChange}
                />
            )}

            {/* Selected door image */}
            <SelectedDoorSection selectedDoor={formData.selectedDoor} />

            {/* Customer information */}
            <CustomerInfoSection
                customerDetails={formData.customerDetails}
                formData={formData}
            />

            {/* Practical information  */}
            <div className="mb-6 p-8 border rounded shadow-lg bg-gray-50 w-full">
                <h2 className="font-bold text-2xl mb-6 border-b pb-2 text-center">
                    Praktiske Informationer
                </h2>

                {Object.entries(FIELD_GROUPS).map(([groupKey, group]) => (
                    <FieldGroup
                        key={groupKey}
                        groupKey={groupKey}
                        group={group}
                        formData={formData}
                    />
                ))}

                {/* Price section */}
                <PriceSection price={price} />
            </div>
        </div>
    );
}

export default OrderSummary;

// Also export sub-components for flexibility
export {
    CustomerInfoSection,
    FieldGroup,
    SelectedDoorSection,
    PriceSection,
    StatusSelector
};
