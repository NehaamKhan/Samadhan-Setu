/**
 * API Service
 * Centralized axios instance for backend communication
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  headers: {
    'Content-Type': 'application/json',
  },
});

export const complaintApi = {
  // Submit a new complaint (backend expects query params)
  submitComplaint: (
    text: string,
    latitude: number,
    longitude: number,
    ward?: string,
    areaName?: string,
  ) =>
    apiClient.post('/api/complaints/submit', null, {
      params: { text, latitude, longitude, ward, area_name: areaName },
    }),

  // Get recent complaints
  getRecentComplaints: (hours: number = 24, limit: number = 100) =>
    apiClient.get('/api/complaints', { params: { hours, limit } }),

  // Get complaint by ID
  getComplaintById: (id: string) =>
    apiClient.get(`/api/complaints/${id}`),

  // Get nearby complaints
  getNearbyComplaints: (latitude: number, longitude: number, radiusKm: number = 1.0) =>
    apiClient.get('/api/complaints/location/nearby', {
      params: { latitude, longitude, radius_km: radiusKm },
    }),
};

export const dashboardApi = {
  // Get heat map data
  getHeatmapData: () =>
    apiClient.get('/api/dashboard/heatmap'),

  // Get top issues
  getTopIssues: (limit: number = 3) =>
    apiClient.get('/api/dashboard/top-issues', { params: { limit } }),

  // Get statistics
  getStatistics: () =>
    apiClient.get('/api/dashboard/statistics'),
};

export default apiClient;
