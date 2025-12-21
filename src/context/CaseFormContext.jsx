import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { caseService } from '../api/services/caseService';
import { mapApiToFormData } from '../components/caseCreation/ApiToFormMapper';
import { mapFormToApiPayload } from '../components/caseCreation/DoorConfigMapper';

const initialFormData = {
    hulmaalLength: "",
    hulmaalWidth: "",
    hulmaalThickness: "",
    fugeLuft: "",
    haengselSide: "",
    karmOffsetMinus: "",
    karmOffsetPlus: "",
    antal: "",
    customerId: null,
    customerDetails: null,
    dørebund: "",
    note: "",
    selectedDoor: null,
    "dørflade": "",
    "dørkant": "",
    "karm": "",
    "udførsel": "",
    "naturlighed": "",
    "lappe farve": "",
    "behandling": "",
    "hængsel": "",
    "låsekasse": ""
};

const initialState = {
    formData: initialFormData,
    isEditMode: false,
    caseId: null,
    loading: false,
    saving: false,
    error: null,
    originalCase: null
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                formData: { ...state.formData, [action.field]: action.value }
            };
        case 'SET_FORM_DATA':
            return { ...state, formData: { ...state.formData, ...action.payload } };
        case 'LOAD_START':
            return { ...state, loading: true, error: null };
        case 'LOAD_SUCCESS':
            return {
                ...state,
                loading: false,
                formData: action.formData,
                originalCase: action.originalCase,
                isEditMode: true,
                caseId: action.caseId
            };
        case 'LOAD_ERROR':
            return { ...state, loading: false, error: action.error };
        case 'SAVE_START':
            return { ...state, saving: true, error: null };
        case 'SAVE_SUCCESS':
            return { ...state, saving: false };
        case 'SAVE_ERROR':
            return { ...state, saving: false, error: action.error };
        case 'RESET':
            return { ...initialState };
        default:
            return state;
    }
}

const CaseFormContext = createContext(null);

export function CaseFormProvider({ children, caseId }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Persist to localStorage
    useEffect(() => {
        if (!state.isEditMode) {
            localStorage.setItem('createCaseForm', JSON.stringify(state.formData));
        }
    }, [state.formData, state.isEditMode]);

    // Load from localStorage on mount (create mode only)
    useEffect(() => {
        if (!caseId) {
            const saved = localStorage.getItem('createCaseForm');
            if (saved) {
                dispatch({ type: 'SET_FORM_DATA', payload: JSON.parse(saved) });
            }
        }
    }, [caseId]);

    // Load case for editing
    useEffect(() => {
        if (caseId) {
            dispatch({ type: 'LOAD_START' });
            caseService.getCaseById(caseId)
                .then(apiCase => {
                    const formData = mapApiToFormData(apiCase);
                    dispatch({
                        type: 'LOAD_SUCCESS',
                        formData,
                        originalCase: apiCase,
                        caseId
                    });
                })
                .catch(err => {
                    dispatch({ type: 'LOAD_ERROR', error: err.message });
                });
        }
    }, [caseId]);

    const handleChange = useCallback((field, value) => {
        dispatch({ type: 'SET_FIELD', field, value });
    }, []);

    const updateField = useCallback((field, value) => {
        dispatch({ type: 'SET_FIELD', field, value });
    }, []);

    const resetForm = useCallback(() => {
        localStorage.removeItem('createCaseForm');
        dispatch({ type: 'RESET' });
    }, []);

    // Submit case (create or update)
    const submitCase = useCallback(async (selectedStatus, selectedTab = 'single') => {
        dispatch({ type: 'SAVE_START' });

        try {
            const payload = mapFormToApiPayload(state.formData, selectedStatus, selectedTab);

            let result;
            if (state.isEditMode && state.caseId) {
                result = await caseService.updateCase(state.caseId, payload);
            } else {
                result = await caseService.createCase(payload);
            }

            dispatch({ type: 'SAVE_SUCCESS' });
            localStorage.removeItem('createCaseForm');

            return { success: true, data: result };
        } catch (err) {
            dispatch({ type: 'SAVE_ERROR', error: err.message });
            return { success: false, error: err.message };
        }
    }, [state.formData, state.isEditMode, state.caseId]);

    return (
        <CaseFormContext.Provider value={{
            ...state,
            handleChange,
            updateField,
            resetForm,
            submitCase
        }}>
            {children}
        </CaseFormContext.Provider>
    );
}

export function useCaseForm() {
    const context = useContext(CaseFormContext);
    if (!context) {
        throw new Error('useCaseForm must be used within CaseFormProvider');
    }
    return context;
}