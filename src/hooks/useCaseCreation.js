// Hook for managing case creation workflow.
// Centralizes case creation logic including form validation,
//API payload mapping, and submission.
// Uses: DoorConfigMapper, caseService, usePersistentForm
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from './useAPI';
import { caseService } from '../api/services/caseService';
import {
    mapFormToApiPayload,
    validateFormData
} from '../components/caseCreation/DoorConfigMapper';

export function useCaseCreation(formData, setFormData) {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState("lead");
    const [selectedTab, setSelectedTab] = useState("single");
    const [validationErrors, setValidationErrors] = useState([]);

    // Use generic API hook for case creation
    const { execute: saveCase, loading: saving, error: apiError } = useApi(caseService.createCase);

    // Validates form and shows errors
    const validate = useCallback(() => {
        const { isValid, errors } = validateFormData(formData);
        setValidationErrors(errors);
        return isValid;
    }, [formData]);

    //Handles form field changes
    //Moved from orderoverview.jsx handleChange pattern
    const handleChange = useCallback((field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    }, [setFormData]);

    // Creates the case via API
    //Logic moved from orderoverview.jsx onClick handler
    const createCase = useCallback(async () => {
        // Validate before submission
        if (!validate()) {
            return { success: false, error: "Validation failed", errors: validationErrors };
        }

        try {
            // Map form data to API payload using DoorConfigMapper
            const apiPayload = mapFormToApiPayload(formData, selectedStatus, selectedTab);

            // Execute API call
            const result = await saveCase(apiPayload);

            if (result.success) {
                const caseId = result.data?.caseId || result.data?.id || Date.now();

                // Logic moved from orderoverview.jsx - Store details locally for rich display
                const savedCaseDetails = JSON.parse(localStorage.getItem("savedCaseDetails") || "{}");
                savedCaseDetails[caseId] = {
                    clientName: formData.customerDetails?.name || "Standard klient",
                    clientEmail: formData.customerDetails?.email,
                    clientPhone: formData.customerDetails?.phoneNumber,
                    clientAddress: formData.customerDetails?.address,
                    selectedDoor: formData.selectedDoor,
                    doorType: formData["dørflade"] || "Custom Door",
                    status: selectedStatus,
                    formData: { ...formData },
                    createdAt: new Date().toISOString()
                };
                localStorage.setItem("savedCaseDetails", JSON.stringify(savedCaseDetails));

                // Clear form after successful creation
                localStorage.removeItem("createCaseForm");

                return { success: true, caseId };
            } else {
                return { success: false, error: result.error };
            }
        } catch (err) {
            return { success: false, error: err.message };
        }
    }, [formData, selectedStatus, selectedTab, saveCase, validate, validationErrors]);

    //Handles successful case creation - navigates to case list
    const handleCreateSuccess = useCallback(() => {
        navigate("/case");
    }, [navigate]);

    // Full submit handler with navigation
    const submitCase = useCallback(async () => {
        const result = await createCase();
        if (result.success) {
            handleCreateSuccess();
        }
        return result;
    }, [createCase, handleCreateSuccess]);

    // Cancels case creation and clears form
    const cancelCreation = useCallback(() => {
        localStorage.removeItem("createCaseForm");
        navigate("/case");
    }, [navigate]);

    //Gets preview of API payload (for debugging/display)
    const getPayloadPreview = useCallback(() => {
        return mapFormToApiPayload(formData, selectedStatus, selectedTab);
    }, [formData, selectedStatus, selectedTab]);

    return {
        // State
        selectedStatus,
        selectedTab,
        validationErrors,
        saving,
        apiError,

        // Setters
        setSelectedStatus,
        setSelectedTab,

        // Actions
        handleChange,
        validate,
        createCase,
        submitCase,
        cancelCreation,
        getPayloadPreview
    };
}
