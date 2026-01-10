"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { FiInfo } from 'react-icons/fi';
import L from 'leaflet';
import 'leaflet.heat';

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

const HeatLayer: React.FC<{ data: HeatmapPoint[] }> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    // Weight heat intensity primarily by complaint density, with a small
    // contribution from priority score to emphasize critical clusters.
    const maxCount = Math.max(...data.map((p) => p.complaint_count), 1);
    const points: [number, number, number][] = data.map((p) => {
      const densityWeight = p.complaint_count / maxCount; // 0..1
      const priorityWeight = Math.min(1, Math.max(0, p.priority_score / 10)); // 0..1
      const weight = Math.min(1, densityWeight * 0.7 + priorityWeight * 0.3);
      return [p.latitude, p.longitude, weight];
    });

    const layer = (L as any).heatLayer(points, {
      radius: 28,
      blur: 18,
      maxZoom: 17,
      gradient: {
        0.0: '#0a3b69',
        0.2: '#2563eb',
        0.4: '#22c55e',
        0.7: '#f59e0b',
        1.0: '#ef4444',
      },
    });

    layer.addTo(map);
    return () => {
      layer.remove();
    };
  }, [data, map]);

  return null;
};

export const MapContent: React.FC<MapContentProps> = ({ data, onPointClick }) => {
  const mapCenter: [number, number] = [
    parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT || '28.7041'),
    parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG || '77.1025'),
  ];

  const zoomLevel = parseInt(process.env.NEXT_PUBLIC_MAP_ZOOM_LEVEL || '12');
  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        style={{ width: "100%", height: "100%" }}
        className="rounded-xl"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <HeatLayer data={data} />
      </MapContainer>

      {/* Legend */}
      <div className="absolute left-4 bottom-4 z-[1000] bg-white/90 border border-slate-200 rounded-md p-3 w-64 shadow">
        <div className="text-xs text-slate-800 font-semibold mb-2 flex items-center gap-2">
          <FiInfo className="text-blue-600" />
          Intensity Scale
        </div>
        <div
          className="h-2 w-full rounded"
          style={{
            background:
              'linear-gradient(to right, #0a3b69 0%, #2563eb 25%, #22c55e 50%, #f59e0b 75%, #ef4444 100%)',
          }}
        />
        <div className="flex justify-between text-[10px] text-slate-600 mt-1">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>
    </div>
  );
};
