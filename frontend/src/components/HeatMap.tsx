/**
 * HeatMap Component
 * Displays geographic visualization of complaint density using Leaflet
 */

'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContent = dynamic(
  () => import('./MapContent').then(mod => mod.MapContent),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="animate-pulse text-4xl mb-3">🗺️</div>
        <p className="text-slate-300 font-medium">Loading interactive map...</p>
        <div className="mt-4 flex gap-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    )
  }
);

interface HeatmapPoint {
  id: string;
  latitude: number;
  longitude: number;
  complaint_count: number;
  priority_score: number;
  intensity: string;
  color: string;
  categories: string[];
  summary: string;
}

interface HeatMapProps {
  data: HeatmapPoint[];
  loading: boolean;
  onPointClick?: (point: HeatmapPoint) => void;
}

export const HeatMap: React.FC<HeatMapProps> = ({ data, loading, onPointClick }) => {
  if (loading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="animate-pulse text-4xl mb-3">🗺️</div>
        <p className="text-slate-300 font-medium">Loading interactive map...</p>
        <div className="mt-4 flex gap-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
        </div>
      </div>
    );
  }

  return <MapContent data={data} onPointClick={onPointClick} />;
};
