import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import { Flame, AlertTriangle, Users, MapPin, Activity } from 'lucide-react';

interface OutbreakHotspot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  disease: 'Dengue' | 'Malaria' | 'Influenza';
  activeCases: number;
  radiusMeters: number;
  riskLevel: 'Severe' | 'Elevated' | 'Guarded';
  color: string;
}

const hotspots: OutbreakHotspot[] = [
  {
    id: 'hs-1',
    name: 'Kalyanpur Sector 3 Corridor',
    lat: 26.4950,
    lng: 80.2580,
    disease: 'Dengue',
    activeCases: 28,
    radiusMeters: 1400,
    riskLevel: 'Severe',
    color: '#EF4444'
  },
  {
    id: 'hs-2',
    name: 'Kakadeo Coaching Hub',
    lat: 26.4852,
    lng: 80.3012,
    disease: 'Dengue',
    activeCases: 17,
    radiusMeters: 1100,
    riskLevel: 'Elevated',
    color: '#F59E0B'
  },
  {
    id: 'hs-3',
    name: 'Ganga Barrage Riparian Belt',
    lat: 26.5080,
    lng: 80.3290,
    disease: 'Malaria',
    activeCases: 31,
    radiusMeters: 1800,
    riskLevel: 'Severe',
    color: '#EF4444'
  },
  {
    id: 'hs-4',
    name: 'Barra Sector 4 & 5',
    lat: 26.4420,
    lng: 80.3120,
    disease: 'Malaria',
    activeCases: 11,
    radiusMeters: 900,
    riskLevel: 'Elevated',
    color: '#F59E0B'
  },
  {
    id: 'hs-5',
    name: 'Civil Lines Transit Zone',
    lat: 26.4715,
    lng: 80.3478,
    disease: 'Influenza',
    activeCases: 22,
    radiusMeters: 1200,
    riskLevel: 'Guarded',
    color: '#25C5E9'
  }
];

const createHotspotMarker = (color: string) => {
  const html = `
    <div style="position: relative; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${color}; opacity: 0.45; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="position: relative; width: 16px; height: 16px; border-radius: 50%; background: #061426; border: 2.5px solid ${color}; box-shadow: 0 0 14px ${color};"></div>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'custom-leaflet-hotspot',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
};

export const DiseaseDensityMap: React.FC = () => {
  const [selectedDisease, setSelectedDisease] = useState<'All' | 'Dengue' | 'Malaria' | 'Influenza'>('All');

  const filteredHotspots = hotspots.filter(
    (h) => selectedDisease === 'All' || h.disease === selectedDisease
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.03] p-4 rounded-xl border border-white/10">
        <div className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-rose-400" />
          <span className="font-heading font-bold text-white text-base">
            Geographic Outbreak Density Map
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
            Demo outbreak-density visualization
          </span>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {(['All', 'Dengue', 'Malaria', 'Influenza'] as const).map((dis) => (
            <button
              key={dis}
              onClick={() => setSelectedDisease(dis)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedDisease === dis
                  ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {dis}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[450px] lg:h-[520px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl z-0">
        <MapContainer
          center={[26.4780, 80.3120]}
          zoom={12}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          {filteredHotspots.map((spot) => (
            <React.Fragment key={spot.id}>
              {/* Density halo circle */}
              <Circle
                center={[spot.lat, spot.lng]}
                radius={spot.radiusMeters}
                pathOptions={{
                  color: spot.color,
                  fillColor: spot.color,
                  fillOpacity: 0.22,
                  weight: 1.5,
                }}
              />

              {/* Central Marker */}
              <Marker
                position={[spot.lat, spot.lng]}
                icon={createHotspotMarker(spot.color)}
              >
                <Popup className="custom-dark-popup">
                  <div className="p-1 space-y-1.5">
                    <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1">
                      <span className="font-bold text-sm text-cyan-300 font-heading">
                        {spot.name}
                      </span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: `${spot.color}25`,
                          color: spot.color,
                          border: `1px solid ${spot.color}50`
                        }}
                      >
                        {spot.riskLevel}
                      </span>
                    </div>

                    <div className="text-xs text-slate-300 flex items-center space-x-1">
                      <Activity className="w-3.5 h-3.5 text-rose-400" />
                      <span>Active Trajectory: <strong>{spot.disease}</strong></span>
                    </div>

                    <div className="text-xs text-slate-300 flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-amber-400" />
                      <span>Reported Vector Cases: <strong>{spot.activeCases}</strong></span>
                    </div>

                    <div className="text-[11px] text-slate-400 italic pt-1 border-t border-white/5">
                      Targeted larvicidal fogging and door-to-door survey deployed.
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          ))}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[400] bg-navy-950/90 backdrop-blur-md border border-white/15 rounded-xl p-3 shadow-xl pointer-events-auto">
          <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
            Outbreak Risk Level
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_6px_#EF4444]" />
              <span className="text-slate-300">Severe (&gt;25)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_6px_#F59E0B]" />
              <span className="text-slate-300">Elevated (10-25)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#25C5E9]" />
              <span className="text-slate-300">Guarded (&lt;10)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
