/**
 * API service for bill-related operations.
 * 
 * This module handles all the API calls to the backend. I kept it
 * separate from components so it's easier to test and modify.
 * 
 * Uses Axios instance from api.js which has the base URL configured.
 * 
 * @author Tanmay Badhe
 */

import api from './api';

/**
 * Fetch all available bills from the backend.
 * @returns {Promise<Array>} List of bill objects
 */
export const billService = {
    getBills: async () => {
        const response = await api.get('/bills');
        return response.data;
    },

    /**
     * Upload a PDF bill and get its summary.
     * 
     * This is the main function - takes a PDF file, sends it to the
     * compression pipeline, and returns the summary + metrics.
     * 
     * @param {File} file - PDF file to process
     * @returns {Promise<Object>} Summary and compression metrics
     */
    summarizeBill: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await api.post('/summary', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Get compression metrics for a specific bill.
     * 
     * Shows how much the document was compressed at each stage.
     * 
     * @param {string} billId - ID of the bill
     * @returns {Promise<Object>} Token counts and compression rate
     */
    getMetrics: async (billId) => {
        const response = await api.get(`/metrics/${billId}`);
        return response.data;
    },
};
