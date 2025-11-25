import React, { useState } from "react";

function Door() {
    const [doorType, setDoorType] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === "image/png") {
                setFile(selectedFile);
                setError("");
            } else {
                setFile(null);
                setError("Upload en PNG fil.");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!doorType) {
            setError("Vælg Single Door or Double Door.");
            return;
        }

        if (!file) {
            setError("Upload en PNG fil.");
            return;
        }

        setError("");
        console.log("Door Type:", doorType);
        console.log("File:", file);
        // send data to backend here
    };

    let singleButtonClass = "bg-white";
    let doubleButtonClass = "bg-white";

    if (doorType === "single") {
        singleButtonClass = "bg-blue-500 text-white";
    }

    if (doorType === "double") {
        doubleButtonClass = "bg-blue-500 text-white";
    }

    const renderFilePreview = () => {
        if (file) {
            return (
                <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="object-cover w-full h-full"
                />
            );
        } else {
            return (
                <span className="text-gray-400 text-center">
          Klik for at uploade PNG fil
        </span>
            );
        }
    };

    return (
        <div className="h-screen w-screen overflow-hidden bg-white">
            <div className="Team-page pt-12">
                <h1 className="text-2xl font-bold overflow-hidden">Dør Side</h1>
            </div>
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
        >
            {/* Single Dør eller Double Dør knapper */}
            <div>
                <label className="block mb-2 font-semibold">Vælg Dør Type:</label>
                <div className="flex gap-4">
                    <button
                        type="button"
                        className={"p-3 border rounded w-24 " + singleButtonClass}
                        onClick={() => setDoorType("single")}
                    >
                        Single Door
                    </button>
                    <button
                        type="button"
                        className={"p-3 border rounded w-24 " + doubleButtonClass}
                        onClick={() => setDoorType("double")}
                    >
                        Double Door
                    </button>
                </div>
            </div>

            {/* PNG upload */}
            <div>
                <label className="block mb-2 font-semibold">Upload Dør Billede:</label>
                <div
                    className="border-2 border-dashed border-gray-400 rounded-lg w-48 h-48 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={() => document.getElementById("fileInput").click()}
                >
                    {renderFilePreview()}
                </div>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/png"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {/* Error message */}
            {error && <p className="text-red-500">{error}</p>}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                + Opret Dør
            </button>
        </form>
        </div>
    );
}export default Door;
