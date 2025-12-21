import React from "react";


// a modal for creating/editing customers.
// it receives its data and callbacks via props, utlized in different pages (Catalogue, Practical).
function CustomerModal({
                           isOpen,
                           onClose,
                           tempClient,
                           onInputChange,
                           onSave,
                           loading,
                           error
                       }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 !bg-black/40 flex items-center justify-center z-50">
            <div className="backdrop-blur-xl !bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

                <h2 className="text-2xl font-semibold mb-6 text-white text-center">
                    Klientoplysninger
                </h2>

                {error && (
                    <p className="text-red-600 mb-4 text-center">{error}</p>
                )}

                {/* INPUT FIELDS - Moved from practical.jsx and catalogue.jsx */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-white/80 mb-1 font-medium">Navn *</label>
                        <input
                            type="text"
                            name="name"
                            value={tempClient.name}
                            onChange={onInputChange}
                            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                            placeholder="Indtast navn"
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 mb-1 font-medium">Email *</label>
                        <input
                            type="email"
                            name="email"
                            value={tempClient.email}
                            onChange={onInputChange}
                            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                            placeholder="Indtast email"
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 mb-1 font-medium">Telefon *</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={tempClient.phoneNumber}
                            onChange={onInputChange}
                            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                            placeholder="Indtast telefonnummer"
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 mb-1 font-medium">Adresse</label>
                        <input
                            type="text"
                            name="address"
                            value={tempClient.address}
                            onChange={onInputChange}
                            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                            placeholder="Indtast adresse"
                        />
                    </div>

                    <div>
                        <label className="block text-white/80 mb-1 font-medium">Firmanavn</label>
                        <input
                            type="text"
                            name="companyName"
                            value={tempClient.companyName}
                            onChange={onInputChange}
                            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none"
                            placeholder="Indtast firmanavn (valgfrit)"
                        />
                    </div>
                </div>

                {/* ACTION BUTTONS - Moved from practical.jsx and catalogue.jsx */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200/60 text-black rounded hover:bg-gray-300/70"
                        disabled={loading}
                    >
                        Afbryd
                    </button>

                    <button
                        onClick={onSave}
                        className="px-4 py-2 !bg-blue-500 text-white rounded hover:bg-blue-600/70"
                        disabled={loading}
                    >
                        {loading ? "Gemmer..." : "Gem Klient"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CustomerModal;
