import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Hospital } from '../../types';
import { BedDouble, Phone, Star, Navigation } from 'lucide-react';

interface HospitalMapProps {
  hospitals: Hospital[];
  selectedHospitalId?: string;
  onSelectHospital: (hospital: Hospital) => void;
}

// Custom pulsing map marker icon generator
const createCustomIcon = (status: Hospital['status'], isSelected: boolean) => {
  const color =
    status === 'available'
      ? '#22C55E'
      : status === 'limited'
      ? '#F59E0B'
      : '#EF4444';

  const html = `
    <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
      <div style="position: absolute; width: 100%; height: 100%; border-radius: 50%; background: ${color}; opacity: 0.35; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
      <div style="position: relative; width: 22px; height: 22px; border-radius: 50%; background: #081C2F; border: 2.5px solid ${color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 12px ${color};">
        <div style="width: 7px; height: 7px; border-radius: 50%; background: ${color};"></div>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -18],
  });
};

export const HospitalMap: React.FC<HospitalMapProps> = ({
  hospitals,
  selectedHospitalId,
  onSelectHospital,
}) => {
  // Kanpur center coordinate
  const centerLat = 26.4760;
  const centerLng = 80.3250;

  return (
    <div className="relative w-full h-[400px] lg:h-[620px] rounded-2xl overflow-hidden border border-cyan-500/25 shadow-2xl z-0">
      <MapContainer
        center={[centerLat, centerLng]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        {/* Dark futuristic OpenStreetMap tile layer with carto dark filter */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {hospitals.map((hosp) => {
          const isSelected = hosp.id === selectedHospitalId;
          const icon = createCustomIcon(hosp.status, isSelected);

          return (
            <Marker
              key={hosp.id}
              position={[hosp.lat, hosp.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onSelectHospital(hosp),
              }}
            >
              <Popup className="custom-dark-popup">
                <div className="p-1 space-y-2 text-slate-100">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-1.5">
                    <span className="font-bold text-sm text-cyan-300 font-heading">
                      {hosp.name}
                    </span>
                    <span className="flex items-center text-xs text-amber-400 font-semibold">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                      {hosp.rating}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300">{hosp.address}</p>

                  <div className="grid grid-cols-3 gap-1.5 py-1 text-center bg-navy-950/80 rounded-lg p-1.5 border border-white/5">
                    <div className="text-[10px]">
                      <div className="text-slate-400">ICU</div>
                      <div className="font-bold text-cyan-300">{hosp.beds.icu}</div>
                    </div>
                    <div className="text-[10px]">
                      <div className="text-slate-400">General</div>
                      <div className="font-bold text-emerald-300">{hosp.beds.general}</div>
                    </div>
                    <div className="text-[10px]">
                      <div className="text-slate-400">Emergency</div>
                      <div className="font-bold text-purple-300">{hosp.beds.emergency}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectHospital(hosp)}
                    className="w-full mt-1 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/40 rounded-lg text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>View Hospital Details</span>
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute top-4 right-4 z-[400] bg-navy-900/90 backdrop-blur-md border border-white/15 rounded-xl p-3 shadow-xl pointer-events-auto">
        <div className="text-[11px] font-bold text-slate-300 tracking-wider uppercase mb-2">
          Bed Status Legend
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#22C55E]" />
            <span className="text-slate-300">Available (&gt;10 beds)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
            <span className="text-slate-300">Limited (3-10 beds)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_#EF4444]" />
            <span className="text-slate-300">Critical (&lt;3 beds)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
