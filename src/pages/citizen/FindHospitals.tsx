import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { Hospital } from '../../types';
import { HospitalMap } from '../../components/maps/HospitalMap';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  BedDouble,
  Phone,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

export const FindHospitals: React.FC = () => {
  const { hospitals, showToast } = useHospital();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | 'available' | 'limited' | 'critical'>('All');
  const [icuOnly, setIcuOnly] = useState(false);
  const [emergencyOnly, setEmergencyOnly] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract all unique specialties
  const allSpecialties = Array.from(
    new Set(hospitals.flatMap((h) => h.specialties))
  );

  // Filtered hospitals
  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpecialty =
      selectedSpecialty === 'All' || h.specialties.includes(selectedSpecialty);

    const matchesAvailability =
      availabilityFilter === 'All' || h.status === availabilityFilter;

    const matchesIcu = !icuOnly || h.beds.icu > 0;
    const matchesEmergency = !emergencyOnly || h.beds.emergency > 0;

    return matchesSearch && matchesSpecialty && matchesAvailability && matchesIcu && matchesEmergency;
  });

  const handleOpenDetails = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpen(true);
  };

  const handleBookTriage = () => {
    setIsModalOpen(false);
    showToast(
      `Fast-Track Triage Pass generated for ${selectedHospital?.name}! Live Bed Token #KMH-${Math.floor(1000 + Math.random() * 9000)} sent to your device.`,
      'success'
    );
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header Bar */}
      <GlassCard className="p-4 sm:p-5 border-cyan-500/20">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospital, area (Civil Lines, Kakadeo...) or specialty..."
              className="w-full pl-10 pr-4 py-2.5 bg-navy-950/70 border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 transition-all"
            />
          </div>

          {/* Specialty Dropdown */}
          <div className="flex items-center space-x-2">
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="bg-navy-950/70 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Specialties</option>
              {allSpecialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Availability Filter */}
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value as any)}
              className="bg-navy-950/70 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Capacity</option>
              <option value="available">Available (&gt;10)</option>
              <option value="limited">Limited</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        {/* Quick filter chips */}
        <div className="flex items-center flex-wrap gap-2 mt-3 pt-3 border-t border-white/5 text-xs">
          <span className="text-slate-400 flex items-center mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1 text-cyan-400" />
            Quick Filters:
          </span>

          <button
            onClick={() => setIcuOnly(!icuOnly)}
            className={`px-3 py-1 rounded-lg border transition-all ${
              icuOnly
                ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/50'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            ICU Ready Only
          </button>

          <button
            onClick={() => setEmergencyOnly(!emergencyOnly)}
            className={`px-3 py-1 rounded-lg border transition-all ${
              emergencyOnly
                ? 'bg-rose-500/20 text-rose-200 border-rose-500/50'
                : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
            }`}
          >
            24/7 Trauma / Emergency
          </button>

          {(searchQuery || selectedSpecialty !== 'All' || availabilityFilter !== 'All' || icuOnly || emergencyOnly) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('All');
                setAvailabilityFilter('All');
                setIcuOnly(false);
                setEmergencyOnly(false);
              }}
              className="text-xs text-rose-400 hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </GlassCard>

      {/* Main 50/50 Grid: Map & Hospital Cards List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 50%: Interactive Map */}
        <div className="lg:col-span-6 sticky top-24">
          <div className="mb-2 flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Kanpur Metropolitan Bed Grid</span>
            <span className="text-cyan-400 font-mono">Live OpenStreetMap Leaflet</span>
          </div>
          <HospitalMap
            hospitals={filteredHospitals}
            selectedHospitalId={selectedHospital?.id}
            onSelectHospital={handleOpenDetails}
          />
        </div>

        {/* Right 50%: Hospital Cards */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredHospitals.length} healthcare facilities</span>
            <span className="font-mono text-emerald-400">Synced with Grid</span>
          </div>

          {filteredHospitals.length === 0 ? (
            <GlassCard className="p-8 text-center space-y-3">
              <MapPin className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-300">No hospitals found matching your filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpecialty('All');
                  setAvailabilityFilter('All');
                  setIcuOnly(false);
                  setEmergencyOnly(false);
                }}
                className="text-xs text-cyan-400 hover:underline"
              >
                Clear all filters
              </button>
            </GlassCard>
          ) : (
            filteredHospitals.map((hosp) => (
              <GlassCard
                key={hosp.id}
                hoverEffect
                onClick={() => handleOpenDetails(hosp)}
                className="p-5 space-y-4 border-white/[0.08] hover:border-cyan-500/40"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-heading font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                        {hosp.name}
                      </h3>
                      {hosp.isOpen ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          OPEN 24/7
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-500/15 text-slate-300 border border-slate-500/30">
                          CLOSED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 mt-1 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{hosp.address}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-cyan-300 font-semibold">{hosp.distance}</span>
                    </p>
                  </div>

                  <div className="flex flex-col items-end space-y-1">
                    <span className="flex items-center text-xs text-amber-400 font-bold bg-amber-400/10 px-2 py-1 rounded-lg border border-amber-400/20">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {hosp.rating}
                    </span>
                    <Badge
                      variant={
                        hosp.status === 'available'
                          ? 'success'
                          : hosp.status === 'limited'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      {hosp.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Bed Status Breakdown */}
                <div className="grid grid-cols-3 gap-2 bg-navy-950/70 p-3 rounded-xl border border-white/5 text-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">
                      ICU Beds
                    </div>
                    <div className="text-base font-extrabold font-heading text-cyan-300 mt-0.5">
                      {hosp.beds.icu} <span className="text-xs font-normal text-slate-500">/ {hosp.beds.icuTotal}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">
                      General
                    </div>
                    <div className="text-base font-extrabold font-heading text-emerald-300 mt-0.5">
                      {hosp.beds.general} <span className="text-xs font-normal text-slate-500">/ {hosp.beds.generalTotal}</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">
                      Emergency
                    </div>
                    <div className="text-base font-extrabold font-heading text-purple-300 mt-0.5">
                      {hosp.beds.emergency} <span className="text-xs font-normal text-slate-500">/ {hosp.beds.emergencyTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5">
                  {hosp.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[11px] px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Action footer */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Last updated: {hosp.lastUpdated}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDetails(hosp);
                    }}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold text-cyan-200 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 transition-colors flex items-center space-x-1.5"
                  >
                    <span>View Details & Triage</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>

      {/* Hospital Detail Modal */}
      {selectedHospital && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedHospital.name}
          subtitle={`Kanpur Metro Hospital ID: ${selectedHospital.id.toUpperCase()}`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Quick overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-navy-950/70 p-4 rounded-xl border border-white/10">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <div className="text-xs">
                  <div className="text-slate-400">Distance</div>
                  <div className="font-bold text-white">{selectedHospital.distance}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-amber-400" />
                <div className="text-xs">
                  <div className="text-slate-400">Rating</div>
                  <div className="font-bold text-white">{selectedHospital.rating} / 5.0</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <div className="text-xs">
                  <div className="text-slate-400">24/7 Helpline</div>
                  <div className="font-bold text-white font-mono">{selectedHospital.phone}</div>
                </div>
              </div>
            </div>

            {/* Bed capacity meters */}
            <div>
              <h4 className="text-sm font-bold font-heading text-white mb-3 flex items-center space-x-1.5">
                <BedDouble className="w-4 h-4 text-cyan-400" />
                <span>Live Bed Allocation Details</span>
              </h4>

              <div className="space-y-3 bg-white/[0.03] p-4 rounded-xl border border-white/5">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">ICU Beds</span>
                    <span className="font-mono text-cyan-300 font-bold">
                      {selectedHospital.beds.icu} of {selectedHospital.beds.icuTotal} available
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-navy-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full transition-all duration-500"
                      style={{
                        width: `${(selectedHospital.beds.icu / selectedHospital.beds.icuTotal) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">General Ward Beds</span>
                    <span className="font-mono text-emerald-300 font-bold">
                      {selectedHospital.beds.general} of {selectedHospital.beds.generalTotal} available
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-navy-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                      style={{
                        width: `${(selectedHospital.beds.general / selectedHospital.beds.generalTotal) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Emergency / Trauma Beds</span>
                    <span className="font-mono text-purple-300 font-bold">
                      {selectedHospital.beds.emergency} of {selectedHospital.beds.emergencyTotal} available
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-navy-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-400 rounded-full transition-all duration-500"
                      style={{
                        width: `${(selectedHospital.beds.emergency / selectedHospital.beds.emergencyTotal) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties & Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Specialties Available
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedHospital.specialties.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Emergency Facilities
                </h5>
                <div className="space-y-1">
                  {selectedHospital.features.map((f) => (
                    <div key={f} className="flex items-center space-x-1.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBookTriage}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-navy-950 font-heading font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Issue Fast-Track Emergency Triage Pass</span>
              </button>

              <button
                onClick={() => {
                  setIsModalOpen(false);
                  showToast(`Opening GPS Navigation to ${selectedHospital.address}...`, 'info');
                }}
                className="py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <Navigation className="w-4 h-4 text-cyan-400" />
                <span>Navigate (GPS)</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
