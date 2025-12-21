import { useState, useEffect, useCallback } from 'react';
import { useApi } from './useAPI';
import { customerService } from '../api/services/customerService';

export function useCustomerManager(formData, handleChange) {
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

    const {
        loading: updateLoading,
        error: updateError,
        execute: executeUpdateCustomer
    } = useApi(customerService.updateCustomer);

    // Add hook for fetching single customer
    const {
        loading: fetchOneLoading,
        execute: fetchCustomerById
    } = useApi(customerService.getCustomerById);

    const [tempClient, setTempClient] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        companyName: "",
    });

    const [showClientModal, setShowClientModal] = useState(false);
    const [isEditingClient, setIsEditingClient] = useState(false);

    // Fetch customers on hook initialization
    useEffect(() => {
        fetchCustomers();
    }, []);

    // Autoload customer details when customerId exists but customerDetails is missing
    // This handles edit mode where we have the ID from the case but need to fetch details
    useEffect(() => {
        const loadCustomerDetails = async () => {
            if (formData.customerId && !formData.customerDetails) {
                const result = await fetchCustomerById(formData.customerId);
                if (result.success && result.data) {
                    handleChange("customerDetails", {
                        name: result.data.name,
                        email: result.data.email,
                        phoneNumber: result.data.phoneNumber,
                        address: result.data.address,
                        companyName: result.data.companyName
                    });
                }
            }
        };
        loadCustomerDetails();
    }, [formData.customerId, formData.customerDetails, fetchCustomerById, handleChange]);

    const handleTempClientInput = useCallback((e) => {
        const { name, value } = e.target;
        setTempClient((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSaveClient = useCallback(async () => {
        const { name, email, phoneNumber, address, companyName } = tempClient;

        if (!name || !email || !phoneNumber) {
            alert("Udfyld venligst alle påkrævede felter!");
            return { success: false };
        }

        try {
            let result;

            // Check if we're editing an existing customer
            if (isEditingClient && formData.customerId) {
                // Update existing customer
                result = await executeUpdateCustomer(formData.customerId, {
                    name,
                    email,
                    phoneNumber,
                    address: address || "",
                    companyName: companyName || ""
                });
            } else {
                // Create new customer
                result = await executeCreateCustomer({
                    name,
                    email,
                    phoneNumber,
                    address: address || "",
                    companyName: companyName || ""
                });
            }

            // Update form with customer data
            handleChange("customerId", result.id);
            handleChange("customerDetails", {
                name: result.name,
                email: result.email,
                phoneNumber: result.phoneNumber,
                address: result.address,
                companyName: result.companyName
            });

            await fetchCustomers();
            setShowClientModal(false);
            setIsEditingClient(false);
            return { success: true };
        } catch (err) {
            alert("Fejl ved oprettelse/opdatering af klient: " + (err.message || "Ukendt fejl"));
            return { success: false, error: err };
        }
    }, [tempClient, isEditingClient, formData.customerId, executeCreateCustomer, executeUpdateCustomer, handleChange, fetchCustomers]);


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

    const handleResetClient = useCallback(() => {
        handleChange("customerId", null);
        handleChange("customerDetails", null);
        setIsEditingClient(false);
    }, [handleChange]);

    // Open modal for editing existing client
    const handleEditClient = useCallback(() => {
        if (formData.customerDetails) {
            setTempClient({
                name: formData.customerDetails.name || "",
                email: formData.customerDetails.email || "",
                phoneNumber: formData.customerDetails.phoneNumber || "",
                address: formData.customerDetails.address || "",
                companyName: formData.customerDetails.companyName || "",
            });
            setIsEditingClient(true);
        }
        setShowClientModal(true);
    }, [formData.customerDetails]);

    // Open modal for new client
    const openNewClientModal = useCallback(() => {
        setTempClient({ name: "", email: "", phoneNumber: "", address: "", companyName: "" });
        setIsEditingClient(false);
        setShowClientModal(true);
    }, []);

    // Derived state  derived from formData
    const hasClient = Boolean(formData.customerId && formData.customerDetails);
    const loading = createLoading || updateLoading || fetchOneLoading;
    const error = createError || updateError;

    return {
        // Customer list state
        customers,
        customersLoading,
        customersError,

        // Create customer state
        createLoading: loading,
        createError: error,

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
