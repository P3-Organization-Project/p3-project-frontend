import { useEffect, useState } from "react";

export default function usePersistentForm(key, initialValues) {
    const [formData, setFormData] = useState(() => {
        // Load from localStorage immediately
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValues;
    });

    // Save to localStorage whenever formData changes
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(formData));
    }, [key, formData]);

    return [formData, setFormData];

}
