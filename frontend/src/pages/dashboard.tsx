/**
 * Dashboard Page
 * Analytics dashboard for authorities
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HeatMap } from '../components/HeatMap';
import { TopIssuesWidget } from '../components/TopIssuesWidget';
import { StatsPanel } from '../components/StatsPanel';
import { useHeatmapData, useTopIssues, useStatistics } from '../hooks/useApi';

export default function Dashboard() {
  const { data: heatmapData, loading: heatmapLoading, error: heatmapError } = useHeatmapData();
  const { data: topIssuesData, loading: issuesLoading, error: issuesError } = useTopIssues();
  const { data: statsData, loading: statsLoading, error: statsError } = useStatistics();
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [dateString, setDateString] = useState('');
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(12);
  const [categoryFilters, setCategoryFilters] = useState<Record<string, boolean>>({
    'Water Supply': true,
    'Electricity': true,
    'Sanitation': true,
    'Roads/Potholes': true,
    'Streetlights': true,
    'Drainage': true,
    'Garbage Collection': true,
    'Parks & Gardens': true,
    'Others': true,
  });

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setDateString(now.toLocaleDateString('en-IN', options));
  }, []);

  // Handle issue click from TopIssuesWidget
  const handleIssueClick = (issue: any) => {
    if (!issue || !issue.category) return;

    // Prefer direct coordinates from issue when available
    // 1) Exact cluster match by id when available
    if (issue.cluster_id) {
      const matchById: any = heatmapData.find((p: any) => String(p.id) === String(issue.cluster_id));
      if (matchById) {
        setMapCenter([matchById.latitude, matchById.longitude]);
        setMapZoom(15);
        setSelectedPoint(matchById);
        return;
      }
    }

    // 2) Prefer direct coordinates from issue when available
    if (issue.latitude && issue.longitude) {
      const point = {
        latitude: issue.latitude,
        longitude: issue.longitude,
        complaint_count: issue.complaint_count,
        priority_score: issue.priority_score,
        categories: [issue.category],
        summary: issue.location || 'Issue location',
      };
      setMapCenter([point.latitude, point.longitude]);
      setMapZoom(15);
      setSelectedPoint(point);
      return;
    }

    // 3) Fallback: match best cluster by category and highest priority, break ties by complaint_count
    const matchingPoint: any = heatmapData
      .filter((point: any) => Array.isArray(point.categories) && point.categories.some((cat: string) =>
        cat.toLowerCase().replace(/\s+/g, '') === issue.category.toLowerCase().replace(/\s+/g, '')
      ))
      .sort((a: any, b: any) => {
        const prioDiff = (b.priority_score || 0) - (a.priority_score || 0);
        if (prioDiff !== 0) return prioDiff;
        return (b.complaint_count || 0) - (a.complaint_count || 0);
      })[0];

    if (matchingPoint) {
      setMapCenter([matchingPoint.latitude, matchingPoint.longitude]);
      setMapZoom(15);
      setSelectedPoint(matchingPoint);
    }
  };

  // Filter heatmap data based on selected categories
  const filteredHeatmapData = heatmapData.filter((point: any) => {
    // Check if any of the point's categories match enabled filters
    return point.categories.some((cat: string) => {
      // Normalize category names for matching
      const normalizedCat = cat.toLowerCase().replace(/\s+/g, '');
      return Object.entries(categoryFilters).some(([filterName, enabled]) => {
        if (!enabled) return false;
        const normalizedFilter = filterName.toLowerCase().replace(/\s+/g, '').replace('/', '');
        return normalizedCat.includes(normalizedFilter) || normalizedFilter.includes(normalizedCat);
      });
    });
  });

  const handleFilterChange = (category: string) => {
    setCategoryFilters(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navbar />

      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900/50 via-blue-800/50 to-indigo-900/50 border-b border-blue-500/30 px-6 py-8 shadow-2xl backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black text-white drop-shadow-lg tracking-tight">
                Analytics Dashboard
              </h1>
              <p className="text-blue-100 text-sm mt-2 font-medium">
                🗺️ Ward 12 Civic Complaint Dashboard
              </p>
              <p className="text-blue-200 text-xs mt-1">
                {dateString || 'Loading...'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-blue-100 text-sm font-semibold">Real-time Monitoring System</p>
              <div className="mt-2 flex items-center gap-2 justify-end">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-green-300 text-xs font-medium">System Active</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Error Messages */}
      {(heatmapError || issuesError || statsError) && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-200 p-4 m-6 rounded-lg backdrop-blur">
          <p className="font-semibold">⚠️ Data Loading Error</p>
          {heatmapError && <p className="text-sm">Heatmap: {heatmapError}</p>}
          {issuesError && <p className="text-sm">Issues: {issuesError}</p>}
          {statsError && <p className="text-sm">Statistics: {statsError}</p>}
        </div>
      )}

      {/* Main Content */}
      <main className="p-6 lg:p-8">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start">
            {/* Left Panel: Statistics */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <StatsPanel
                totalComplaints={statsData.total_complaints}
                byCategory={statsData.by_category}
                loading={statsLoading}
              />

              {/* Filters */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                <p className="text-xs text-blue-200 uppercase mb-4 font-bold tracking-widest">📊 Category Filters</p>
                <div className="space-y-3">
                  {Object.entries(categoryFilters).map(([filter, checked]) => (
                    <label key={filter} className="flex items-center gap-3 text-sm cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleFilterChange(filter)}
                        className="w-4 h-4 rounded accent-blue-500"
                      />
                      <span className="text-slate-200 font-medium">{filter}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Panel: Heat Map */}
            <div className="lg:col-span-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-[55vh] min-h-[320px] shadow-2xl backdrop-blur-sm">
                <HeatMap 
                  data={filteredHeatmapData} 
                  loading={heatmapLoading} 
                  onPointClick={setSelectedPoint}
                  center={mapCenter || undefined}
                  zoom={mapZoom}
                  selectedPoint={selectedPoint}
                />
              </div>
            </div>

            {/* Right Panel: Action Items */}
            <div className="lg:col-span-3">
              <TopIssuesWidget 
                issues={topIssuesData} 
                loading={issuesLoading}
                onIssueClick={handleIssueClick}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
