import React, { useState } from 'react';
import { useHospital } from '../../context/HospitalContext';
import { DrugItem } from '../../types';
import { MetricCard } from '../../components/common/MetricCard';
import { GlassCard } from '../../components/common/GlassCard';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import {
  Pill,
  AlertTriangle,
  Package,
  Search,
  PlusCircle,
  Clock,
  ShieldCheck,
  CheckCircle2,
  FileText
} from 'lucide-react';

export const DrugInventory: React.FC = () => {
  const { inventory, restockDrug, showToast } = useHospital();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedDrug, setSelectedDrug] = useState<DrugItem | null>(null);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [restockQty, setRestockQty] = useState(50);

  const totalItems = inventory.length;
  const lowStockCount = inventory.filter((d) => d.status === 'Low').length;
  const criticalCount = inventory.filter((d) => d.status === 'Critical').length;

  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.medicine.toLowerCase().includes(search.toLowerCase()) ||
      item.genericName.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier.toLowerCase().includes(search.toLowerCase());

    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

    return matchesSearch && matchesCat && matchesStatus;
  });

  const handleOpenRestock = (drug: DrugItem) => {
    setSelectedDrug(drug);
    setIsRestockModalOpen(true);
  };

  const handleRestockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDrug) return;
    restockDrug(selectedDrug.id, restockQty);
    setIsRestockModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* 3 Inventory Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard
          icon={Package}
          value={totalItems}
          label="Total Cataloged Items"
          trend="Allopathy & AYUSH"
          trendType="neutral"
          colorTheme="cyan"
        />
        <MetricCard
          icon={AlertTriangle}
          value={lowStockCount}
          label="Low Stock Items"
          trend="Order Buffer"
          trendType="warning"
          colorTheme="purple"
        />
        <MetricCard
          icon={AlertTriangle}
          value={criticalCount}
          label="Critical Stock Alert"
          trend="Immediate PO Required"
          trendType="warning"
          colorTheme="teal"
        />
      </div>

      {/* Filter and Search Bar */}
      <GlassCard className="p-4 sm:p-5 border-cyan-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by drug name (Paracetamol, Guduchi...), generic or supplier..."
              className="w-full pl-10 pr-4 py-2.5 bg-navy-950/70 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-navy-950/70 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Categories</option>
              <option value="Allopathy">Allopathy</option>
              <option value="Ayurvedic">Ayurvedic</option>
              <option value="Emergency">Emergency</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-navy-950/70 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="All">All Statuses</option>
              <option value="Adequate">Adequate</option>
              <option value="Low">Low</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Inventory Data Table */}
      <GlassCard className="p-0 border-white/[0.08] overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-navy-950/80">
          <div className="flex items-center space-x-2">
            <Pill className="w-5 h-5 text-cyan-400" />
            <h3 className="font-heading font-bold text-white text-base">
              Central Pharmaceutical & AYUSH Formulary ({filteredInventory.length})
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Automated Reorder Thresholds Active
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="py-3.5 px-4 font-semibold">Medicine & Generic Name</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Current Stock</th>
                <th className="py-3.5 px-4 font-semibold">Unit Type</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Supplier / Batch</th>
                <th className="py-3.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.04] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white text-sm">
                      {item.medicine}
                    </div>
                    <div className="text-[11px] text-slate-400 font-sans">
                      {item.genericName}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block text-[11px] px-2 py-0.5 rounded-md font-medium ${
                        item.category === 'Ayurvedic'
                          ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30'
                          : item.category === 'Emergency'
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                      }`}
                    >
                      {item.category}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-sm">
                    <span
                      className={
                        item.status === 'Critical'
                          ? 'text-rose-400'
                          : item.status === 'Low'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }
                    >
                      {item.stock}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-300 font-mono">
                    {item.unit}
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        item.status === 'Adequate'
                          ? 'success'
                          : item.status === 'Low'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                    >
                      <span className="flex items-center space-x-1">
                        {(item.status === 'Low' || item.status === 'Critical') && (
                          <AlertTriangle className="w-3 h-3 mr-0.5" />
                        )}
                        <span>{item.status}</span>
                      </span>
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    <div>{item.supplier}</div>
                    <div className="font-mono text-slate-500">Exp: {item.expiryDate}</div>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenRestock(item)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 text-xs font-semibold flex items-center space-x-1 ml-auto transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Restock</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Restock Modal */}
      {selectedDrug && (
        <Modal
          isOpen={isRestockModalOpen}
          onClose={() => setIsRestockModalOpen(false)}
          title={`Restock Inventory: ${selectedDrug.medicine}`}
          subtitle={`Current stock: ${selectedDrug.stock} ${selectedDrug.unit} • Threshold: ${selectedDrug.minThreshold}`}
          maxWidth="md"
        >
          <form onSubmit={handleRestockSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Batch / Purchase Order Quantity ({selectedDrug.unit})
              </label>
              <input
                type="number"
                min="10"
                step="10"
                value={restockQty}
                onChange={(e) => setRestockQty(Number(e.target.value))}
                className="w-full bg-navy-950/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Supplier:</span>
                <span className="font-semibold text-white">{selectedDrug.supplier}</span>
              </div>
              <div className="flex justify-between">
                <span>New Predicted Total:</span>
                <span className="font-mono font-bold text-emerald-400">
                  {selectedDrug.stock + restockQty} {selectedDrug.unit}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsRestockModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-gradient-to-r from-cyan-400 to-teal-300 text-navy-950 font-heading font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20"
              >
                Confirm Restock
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
