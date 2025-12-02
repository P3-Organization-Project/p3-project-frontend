import { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export function useHealth() {
    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchHealth = async () => {
            try {
                setLoading(true);
                const response = await api.get('/actuator/health', {
                    signal: controller.signal,
                });
                setHealth(response.data);
                setError(null);
            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchHealth();

        return () => controller.abort();
    }, []);

    return { health, loading, error };
}
