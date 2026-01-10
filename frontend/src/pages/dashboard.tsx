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
      <main className="p-8">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-340px)]">
            {/* Left Panel: Statistics */}
            <div className="col-span-3 flex flex-col gap-4 overflow-auto">
              <StatsPanel
                totalComplaints={statsData.total_complaints}
                byCategory={statsData.by_category}
                loading={statsLoading}
              />

              {/* Filters */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
                <p className="text-xs text-blue-200 uppercase mb-4 font-bold tracking-widest">📊 Category Filters</p>
                <div className="space-y-3">
                  {['Water Supply', 'Sanitation', 'Roads', 'Streetlights', 'Electricity'].map(
                    (filter) => (
                      <label key={filter} className="flex items-center gap-3 text-sm cursor-pointer hover:bg-white/5 p-2 rounded-lg transition">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded accent-blue-500"
                        />
                        <span className="text-slate-200 font-medium">{filter}</span>
                      </label>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Center Panel: Heat Map */}
            <div className="col-span-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-full shadow-2xl backdrop-blur-sm">
                <HeatMap data={heatmapData} loading={heatmapLoading} onPointClick={setSelectedPoint} />
              </div>
            </div>

            {/* Right Panel: Action Items */}
            <div className="col-span-3">
              <TopIssuesWidget issues={topIssuesData} loading={issuesLoading} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
