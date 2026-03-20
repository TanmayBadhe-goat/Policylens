/**
 * Zustand store for bill-related state.
 * 
 * I chose Zustand over Redux because it's much simpler - no actions,
 * reducers, or dispatch. Just a store with methods to update it.
 * 
 * This store tracks:
 * - bills: List of all available bills
 * - selectedBill: Currently viewed bill
 * - summaryResult: Result from the compression pipeline
 * - loading/error: UI state
 * 
 * @author Tanmay Badhe
 */

import { create } from 'zustand';

const useBillStore = create((set) => ({
    // List of all bills from the API
    bills: [],
    
    // Currently selected bill for viewing details
    selectedBill: null,
    
    // Result from the summarization pipeline
    // Contains 'summary' and 'metrics' keys
    summaryResult: null,
    
    // Loading state for async operations
    loading: false,
    
    // Error message if something goes wrong
    error: null,

    // Actions to update state
    setBills: (bills) => set({ bills }),
    setSelectedBill: (bill) => set({ selectedBill: bill }),
    setSummaryResult: (result) => set({ summaryResult: result }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));

export default useBillStore;
