import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useAPI';
import { caseService } from '../api/services/caseService';

// Hook for managing case list state, fetching, and data transformation.
// Centralizes case list logic that was previously in case.jsx.
export function useCaseList() {
    // Compose the generic useApi hook with case service
    const {
        data: apiCases,
        loading,
        error,
        execute: fetchCases
    } = useApi(caseService.getAllCases);

    const [cases, setCases] = useState([]);

    // Map door configuration type to display string
    // - from this line on most of the Logic was moved from case.jsx
    const formatDoorType = useCallback((doorItems) => {
        if (!doorItems || doorItems.length === 0) return "N/A";
        const type = doorItems[0]?.doorConfiguration?.type;
        const typeMap = {
            'SINGLE': 'Single',
            'DOUBLE': 'Double'
        };
        return typeMap[type] || type || "N/A";
    }, []);

    // Map backend status to lowercase
    const mapStatus = useCallback((dealStatus) => {
        return dealStatus?.toLowerCase() || 'lead';
    }, []);

    // Format price with Danish locale
    const formatPrice = useCallback((totalPrice) => {
        if (totalPrice === null || totalPrice === undefined) return '0 kr';
        return `${totalPrice.toLocaleString('da-DK')} kr`;
    }, []);

    //  backend response to display format
    const mapCaseToDisplay = useCallback((apiCase) => {
        return {
            id: apiCase.caseId,
            client: apiCase.customerName,
            assigned: apiCase.sellerName,
            doorType: formatDoorType(apiCase.doorItems),
            status: mapStatus(apiCase.dealStatus),
            date: new Date(apiCase.createdDate).toLocaleDateString('da-DK'),
            price: formatPrice(apiCase.totalPrice),
            details: apiCase // Preserve full API response for navigation
        };
    }, [formatDoorType, mapStatus, formatPrice]);

    // Fetch cases on hook initialization
    useEffect(() => {
        fetchCases();
    }, []);

    // Transform API data when received
    useEffect(() => {
        if (apiCases && apiCases.length > 0) {
            const transformedCases = apiCases.map(mapCaseToDisplay);
            setCases(transformedCases);
        } else if (apiCases) {
            setCases([]);
        }
    }, [apiCases, mapCaseToDisplay]);

    // Refresh cases manually
    const refreshCases = useCallback(() => {
        fetchCases();
    }, [fetchCases]);

    return {
        // Case list state
        cases,
        loading,
        error,

        // Actions
        refreshCases
    };
}
