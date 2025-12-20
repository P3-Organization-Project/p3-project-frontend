import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useAPI';
import { customerService } from '../api/services/customerService';

//  Instead of each component managing its own customer state,
//  this hook provides a single source of truth that can be
//  shared across components.
export function useCustomerManager(formData, handleChange) {
    // Logic moved from practical.jsx and catalogue.jsx

    // Compose the generic useApi hook with specific customer services
    const {
        data: customers,
        loading: customersLoading,
        error: customersError,
        execute: fetchCustomers
    } = useApi(customerService.getAllCustomers);

    const {
        loading: createLoading,
        error: createError,
        execute: executeCreateCustomer
    } = useApi(customerService.createCustomer);

    // Logic moved from practical.jsx and catalogue.jsx
    const [tempClient, setTempClient] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        companyName: "",
    });

    const [showClientModal, setShowClientModal] = useState(false);

    // Fetch customers on hook initialization
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Logic moved from practical.jsx and catalogue.jsx
    const handleTempClientInput = useCallback((e) => {
        const { name, value } = e.target;
        setTempClient((prev) => ({ ...prev, [name]: value }));
    }, []);

    // Logic moved from practical.jsx and catalogue.jsx
    const handleSaveClient = useCallback(async () => {
        const { name, email, phoneNumber, address, companyName } = tempClient;

        if (!name || !email || !phoneNumber) {
            alert("Udfyld venligst alle påkrævede felter!");
            return { success: false };
        }

        try {
            const newCustomer = await executeCreateCustomer({
                name,
                email,
                phoneNumber,
                address: address || "",
                companyName: companyName || ""
            });

            // Update form with new customer data
            handleChange("customerId", newCustomer.id);
            handleChange("customerDetails", {
                name: newCustomer.name,
                email: newCustomer.email,
                phoneNumber: newCustomer.phoneNumber,
                address: newCustomer.address,
                companyName: newCustomer.companyName
            });

            await fetchCustomers();
            setShowClientModal(false);
            return { success: true };
        } catch (err) {
            alert("Fejl ved oprettelse af klient: " + (err.message || "Ukendt fejl"));
            return { success: false, error: err };
        }
    }, [tempClient, executeCreateCustomer, handleChange, fetchCustomers]);

    // Logic moved from practical.jsx and catalogue.jsx
    const handleSelectExistingClient = useCallback((e) => {
        const customerId = e.target.value;
        if (!customerId) return;

        const selected = customers?.find(c => c.id.toString() === customerId);
        if (!selected) return;

        handleChange("customerId", selected.id);
        handleChange("customerDetails", {
            name: selected.name,
            email: selected.email,
            phoneNumber: selected.phoneNumber,
            address: selected.address,
            companyName: selected.companyName
        });
    }, [customers, handleChange]);

    // Logic moved from practical.jsx and catalogue.jsx
    const handleResetClient = useCallback(() => {
        handleChange("customerId", null);
        handleChange("customerDetails", null);
    }, [handleChange]);

    // Logic moved from practical.jsx and catalogue.jsx
    const handleEditClient = useCallback(() => {
        if (formData.customerDetails) {
            setTempClient({
                name: formData.customerDetails.name || "",
                email: formData.customerDetails.email || "",
                phoneNumber: formData.customerDetails.phoneNumber || "",
                address: formData.customerDetails.address || "",
                companyName: formData.customerDetails.companyName || "",
            });
        }
        setShowClientModal(true);
    }, [formData.customerDetails]);

    // Open modal for new client
    const openNewClientModal = useCallback(() => {
        setTempClient({ name: "", email: "", phoneNumber: "", address: "", companyName: "" });
        setShowClientModal(true);
    }, []);

    // Derived state - computed from formData
    const hasClient = Boolean(formData.customerId && formData.customerDetails);

    return {
        // Customer list state
        customers,
        customersLoading,
        customersError,

        // Create customer state
        createLoading,
        createError,

        // Modal state
        showClientModal,
        setShowClientModal,
        tempClient,

        // Handlers
        handleTempClientInput,
        handleSaveClient,
        handleSelectExistingClient,
        handleResetClient,
        handleEditClient,
        openNewClientModal,

        // Derived state
        hasClient
    };
}
