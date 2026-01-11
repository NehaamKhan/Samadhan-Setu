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
    let isInitialLoad = true;

    const fetchData = async () => {
      try {
        // Only show loading spinner on initial load
        if (isInitialLoad) {
          setLoading(true);
        }
        setError(null);
        const response = await dashboardApi.getHeatmapData();
        console.log('Heatmap response:', response.data);
        setData(response.data.heatmap_points || []);
      } catch (err: any) {
        console.error('Error fetching heatmap:', err);
        setError(err.message);
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          isInitialLoad = false;
        }
      }
    };

    // Initial fetch
    fetchData();

    // Poll every 30 seconds - silently updates without showing loader
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
    let isInitialLoad = true;

    const fetchData = async () => {
      try {
        if (isInitialLoad) {
          setLoading(true);
        }
        setError(null);
        const response = await dashboardApi.getTopIssues(5);
        console.log('Top issues response:', response.data);
        setData(response.data.top_issues || []);
      } catch (err: any) {
        console.error('Error fetching top issues:', err);
        setError(err.message);
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          isInitialLoad = false;
        }
      }
    };

    fetchData();

    // Poll every 30 seconds - silently updates without showing loader
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
    let isInitialLoad = true;

    const fetchData = async () => {
      try {
        if (isInitialLoad) {
          setLoading(true);
        }
        setError(null);
        const response = await dashboardApi.getStatistics();
        console.log('Statistics response:', response.data);
        setData(response.data);
      } catch (err: any) {
        console.error('Error fetching statistics:', err);
        setError(err.message);
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          isInitialLoad = false;
        }
      }
    };

    fetchData();

    // Poll every 30 seconds - silently updates without showing loader
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
};
