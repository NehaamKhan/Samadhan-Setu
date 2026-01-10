'use client';

import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { FiInfo, FiMapPin } from 'react-icons/fi';

const colorMap = {
  red: '#ef4444',
  yellow: '#eab308',
  green: '#22c55e',
};

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

interface MapContentProps {
  data: HeatmapPoint[];
  onPointClick?: (point: HeatmapPoint) => void;
}

export const MapContent: React.FC<MapContentProps> = ({ data, onPointClick }) => {
  const mapCenter: [number, number] = [
    parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT || '28.7041'),
    parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG || '77.1025'),
  ];

  const zoomLevel = parseInt(process.env.NEXT_PUBLIC_MAP_ZOOM_LEVEL || '12');

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoomLevel}
      style={{ width: '100%', height: '100%' }}
      className="rounded-xl"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {data.map((point) => {
        const colorValue = colorMap[point.color as keyof typeof colorMap] || '#22c55e';
        const radius = Math.sqrt(point.complaint_count) * 2;
        
        return (
          <CircleMarker
            key={point.id}
            center={[point.latitude, point.longitude]}
            pathOptions={{
              fillColor: colorValue,
              color: colorValue,
              weight: 3,
              opacity: 0.9,
              fillOpacity: 0.7,
              radius: radius,
            }}
            eventHandlers={{
              click: () => onPointClick?.(point),
            }}
          >
            <Popup>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-4 rounded-lg text-white w-64 shadow-xl border border-slate-700">
                {/* Header */}
                <div className="flex items-start gap-2 mb-3 pb-3 border-b border-slate-600">
                  <FiMapPin className="text-blue-400 mt-0.5 flex-shrink-0" size={18} />
                  <div className="flex-1">
                    <p className="font-bold text-base text-white">{point.summary}</p>
                    <p className="text-xs text-slate-400 mt-1">{point.intensity} Priority Area</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-xs text-blue-300 uppercase font-bold mb-1">Reports</p>
                    <p className="text-2xl font-black text-blue-400">{point.complaint_count}</p>
                  </div>
                  <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3">
                    <p className="text-xs text-purple-300 uppercase font-bold mb-1">Priority</p>
                    <p className="text-2xl font-black text-purple-400">{point.priority_score.toFixed(1)}</p>
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-3">
                  <p className="text-xs text-slate-400 uppercase font-bold mb-2">Categories</p>
                  <div className="flex flex-wrap gap-1">
                    {point.categories.slice(0, 3).map((cat, i) => (
                      <span
                        key={i}
                        className="bg-slate-700/50 text-slate-200 text-xs px-2 py-1 rounded-md border border-slate-600"
                      >
                        {cat}
                      </span>
                    ))}
                    {point.categories.length > 3 && (
                      <span className="bg-slate-700/50 text-slate-400 text-xs px-2 py-1 rounded-md border border-slate-600">
                        +{point.categories.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <FiInfo size={14} className="text-blue-400 flex-shrink-0" />
                    <p className="text-xs text-blue-200">Click for detailed analysis</p>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
};
