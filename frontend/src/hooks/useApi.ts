/**
 * Custom Hook: useHeatmapData
 * Fetches and manages heat map data
 */

import { useState, useEffect } from 'react';
import { dashboardApi } from '../services/api';

export const useHeatmapData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await dashboardApi.getHeatmapData();
        console.log('Heatmap response:', response.data);
        setData(response.data.heatmap_points || []);
      } catch (err: any) {
        console.error('Error fetching heatmap:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};

export const useTopIssues = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await dashboardApi.getTopIssues(3);
        console.log('Top issues response:', response.data);
        setData(response.data.top_issues || []);
      } catch (err: any) {
        console.error('Error fetching top issues:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};

export const useStatistics = () => {
  const [data, setData] = useState({ total_complaints: 0, by_category: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await dashboardApi.getStatistics();
        console.log('Statistics response:', response.data);
        setData(response.data);
      } catch (err: any) {
        console.error('Error fetching statistics:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
