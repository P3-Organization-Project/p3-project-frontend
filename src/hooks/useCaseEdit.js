import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { caseService } from '../api/services/caseService';
import { mapApiToFormData } from '../components/caseCreation/ApiToFormMapper';
import { mapFormToApiPayload } from '../components/caseCreation/DoorConfigMapper';

export function useCaseEdit(caseId) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [originalCase, setOriginalCase] = useState(null);

    // Tracks if we're in edit mode
    const isEditMode = Boolean(caseId);

    // Load case data and transform to form format
    const loadCase = useCallback(async () => {
        if (!caseId) return null;

        setLoading(true);
        setError(null);

        try {
            const apiCase = await caseService.getCaseById(caseId);
            setOriginalCase(apiCase);

            // Transform API response to form data using reverse mapper
            const formData = mapApiToFormData(apiCase);
            return formData;

        } catch (err) {
            setError(err.message || 'Kunne ikke indlæse sagen');
            return null;
        } finally {
            setLoading(false);
        }
    }, [caseId]);

    // Update existing case
    const updateCase = useCallback(async (formData, selectedStatus) => {
        if (!caseId) {
            setError('Ingen sag at opdatere');
            return { success: false, error: 'Ingen sag at opdatere' };
        }

        setLoading(true);
        setError(null);

        try {
            // Determine door type from original case
            const doorType = originalCase?.doorItems?.[0]?.doorConfiguration?.type;
            const selectedTab = doorType === 'DOUBLE' ? 'double' : 'single';

            // Transform form data to API payload using forward mapper
            const payload = mapFormToApiPayload(formData, selectedStatus, selectedTab);

            await caseService.updateCase(caseId, payload);

            // Clear form and navigate on success
            localStorage.removeItem('createCaseForm');
            navigate('/case');
            return { success: true };

        } catch (err) {
            const errorMsg = err.message || 'Kunne ikke opdatere sagen';
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    }, [caseId, originalCase, navigate]);

    return {
        isEditMode,
        loading,
        error,
        originalCase,
        loadCase,
        updateCase
    };
}
