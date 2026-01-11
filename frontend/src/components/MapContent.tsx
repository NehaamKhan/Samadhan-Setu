"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, CircleMarker, Popup } from 'react-leaflet';
import { FiInfo } from 'react-icons/fi';
import L from 'leaflet';

// Load leaflet.heat plugin via dynamic import
if (typeof window !== 'undefined') {
  require('leaflet.heat');
}

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
  center?: [number, number];
  zoom?: number;
  selectedPoint?: Partial<HeatmapPoint> | null;
}

const HeatLayer: React.FC<{ data: HeatmapPoint[] }> = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !data || data.length === 0) {
      console.warn('[HeatLayer] Missing map or data:', { map: !!map, data: data?.length });
      return;
    }

    // Weight heat intensity primarily by complaint density, with a small
    // contribution from priority score to emphasize critical clusters.
    const maxCount = Math.max(...data.map((p) => p.complaint_count), 1);
    const points: [number, number, number][] = data.map((p) => {
      const densityWeight = p.complaint_count / maxCount; // 0..1
      const priorityWeight = Math.min(1, Math.max(0, p.priority_score / 10)); // 0..1
      const weight = Math.min(1, densityWeight * 0.7 + priorityWeight * 0.3);
      return [p.latitude, p.longitude, weight];
    });

    try {
      const HeatLayer = (L as any).heatLayer;
      if (!HeatLayer) {
        console.error('[HeatLayer] L.heatLayer not available. Ensure leaflet.heat is loaded.');
        return;
      }

      const layer = HeatLayer(points, {
        radius: 30,
        blur: 20,
        maxZoom: 17,
        minOpacity: 0.2,
        gradient: {
          0.0: '#0a3b69',
          0.2: '#2563eb',
          0.4: '#22c55e',
          0.7: '#f59e0b',
          1.0: '#ef4444',
        },
      });

      layer.addTo(map);
      console.log('[HeatLayer] Successfully added to map');

      return () => {
        layer.remove();
      };
    } catch (err) {
      console.error('[HeatLayer] Error:', err);
    }
  }, [data, map]);

  return null;
};

// Component to update map view when user location changes
const MapViewUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({
  center,
  zoom,
}) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom, { duration: 0.6 });
  }, [center, zoom, map]);

  return null;
};

export const MapContent: React.FC<MapContentProps> = ({ data, onPointClick, center: propCenter, zoom: propZoom, selectedPoint }) => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Fallback center (Delhi)
  const fallbackCenter: [number, number] = [
    parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LAT || '28.7041'),
    parseFloat(process.env.NEXT_PUBLIC_MAP_CENTER_LNG || '77.1025'),
  ];

  // Prioritize: prop center > user location > fallback
  const mapCenter = propCenter || userLocation || fallbackCenter;
  const zoomLevel = propZoom || parseInt(process.env.NEXT_PUBLIC_MAP_ZOOM_LEVEL || '12');

  // Request user's current location on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          console.log('[MapContent] User location detected:', latitude, longitude);
        },
        (error) => {
          console.warn('[MapContent] Geolocation error:', error.message);
          setLocationError(error.message);
          // Silently fall back to default center
        }
      );
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={zoomLevel}
        style={{ width: "100%", height: "100%" }}
        className="rounded-xl"
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <MapViewUpdater center={mapCenter} zoom={zoomLevel} />
        <HeatLayer data={data} />
        {selectedPoint && selectedPoint.latitude && selectedPoint.longitude && (
          <CircleMarker
            center={[selectedPoint.latitude, selectedPoint.longitude]}
            radius={12}
            color="#2563eb"
            weight={2}
            fillColor="#60a5fa"
            fillOpacity={0.35}
          >
            <Popup>
              <div className="text-sm font-semibold text-slate-800">
                {selectedPoint.summary || 'Selected issue'}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {selectedPoint.categories?.[0] || 'Category'} • {selectedPoint.complaint_count || 'N/A'} reports
              </div>
              {selectedPoint.priority_score && (
                <div className="text-xs text-slate-500 mt-1">Priority: {selectedPoint.priority_score}/10</div>
              )}
            </Popup>
          </CircleMarker>
        )}
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

        {/* Location indicator */}
        {userLocation && (
          <div className="mt-3 pt-3 border-t border-slate-300 text-[10px] text-slate-600">
            📍 Showing your location
          </div>
        )}
      </div>
    </div>
  );
};
