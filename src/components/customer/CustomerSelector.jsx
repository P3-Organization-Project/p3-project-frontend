import React from "react";

// a component for selecting or displaying customers.
//renders either a selection interface OR customer details based on the hasClient prop.
function CustomerSelector({
                              // Data
                              customers,
                              customerDetails,
                              hasClient,

                              // Loading/Error states
                              customersLoading,
                              customersError,

                              // Handlers
                              onSelectCustomer,
                              onNewClient,
                              onResetClient,
                              onEditClient
                          }) {
    return (
        <div className={`rounded-lg p-4 border shadow-sm ${!hasClient ? "client-warning" : "border-gray-200 bg-gray-50"}`}>

            {/* LOADING/ERROR STATES - Moved from practical.jsx and catalogue.jsx */}
            {customersLoading && (
                <p className="text-gray-600 text-sm mb-2">Indlæser klienter...</p>
            )}
            {customersError && (
                <p className="text-red-600 text-sm mb-2">Fejl: {customersError}</p>
            )}

            {/* SELECTION MODE - Moved from practical.jsx and catalogue.jsx*/}
            {!hasClient && (
                <>
                    <label className="text-base font-semibold text-gray-800 mb-3 block">
                        Vælg Klient *
                    </label>

                    <select
                        onChange={onSelectCustomer}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 mb-3"
                        disabled={customersLoading}
                    >
                        <option value="">Vælg et Klient...</option>
                        {customers?.map(customer => (
                            <option key={customer.id} value={customer.id}>
                                {customer.name}
                            </option>
                        ))}
                    </select>

                    <button
                        className="w-full bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md mb-4 hover:bg-blue-600"
                        onClick={onNewClient}
                    >
                        + Ny Klient
                    </button>

                    <p className="!text-red-600 font-medium">
                        * Vælg venligst en klient for at fortsætte
                    </p>
                </>
            )}

            {/* DISPLAY MODE - Moved from practical.jsx and catalogue.jsx */}
            {hasClient && customerDetails && (
                <div className="bg-white rounded-md border p-3 mt-3">
                    <h3 className="font-semibold text-gray-800 mb-2">Klientoplysninger</h3>

                    <p><strong>Navn:</strong> {customerDetails.name}</p>
                    <p><strong>Email:</strong> {customerDetails.email}</p>
                    <p><strong>Telefon:</strong> {customerDetails.phoneNumber}</p>
                    <p><strong>Adresse:</strong> {customerDetails.address || "-"}</p>

                    {customerDetails.companyName && (
                        <p><strong>Firma:</strong> {customerDetails.companyName}</p>
                    )}

                    <div className="flex justify-center gap-2 mt-3">
                        <button
                            className="text-gray-400 text-xs underline hover:text-gray-600 transition"
                            onClick={onResetClient}
                        >
                            Skift
                        </button>
                        <button
                            className="text-gray-400 text-xs underline hover:text-gray-600 transition"
                            onClick={onEditClient}
                        >
                            Rediger
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CustomerSelector;
