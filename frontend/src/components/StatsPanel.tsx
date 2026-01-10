/**
 * StatsPanel Component
 * Displays global statistics and summary data
 */

'use client';

import React from 'react';
import { FiBarChart2, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

interface StatsPanelProps {
  totalComplaints: number;
  byCategory: Record<string, number>;
  loading: boolean;
}

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: number | string; gradient: string }> = ({
  icon,
  label,
  value,
  gradient,
}) => (
  <div className={`${gradient} rounded-xl p-4 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider opacity-90">{label}</p>
        <p className="text-3xl font-black mt-2">{value}</p>
      </div>
      <div className="text-3xl opacity-60">{icon}</div>
    </div>
  </div>
);

const CategoryBar: React.FC<{ category: string; count: number; total: number }> = ({
  category,
  count,
  total,
}) => {
  const percentage = (count / total) * 100;
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-green-500 to-teal-500',
    'from-indigo-500 to-blue-500',
  ];
  const colorIndex = category.length % colors.length;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-200">{category}</span>
        <span className="text-xs font-bold text-blue-300 bg-blue-900/50 px-2 py-1 rounded">{count}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colors[colorIndex]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export const StatsPanel: React.FC<StatsPanelProps> = ({ totalComplaints, byCategory, loading }) => {
  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 flex items-center justify-center h-40 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin">⏳</div>
          <p className="text-slate-300 text-sm">Loading statistics...</p>
        </div>
      </div>
    );
  }

  const totalByCategory = Object.values(byCategory).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-4">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<FiCheckCircle size={24} />}
          label="Total Complaints"
          value={totalComplaints}
          gradient="bg-gradient-to-br from-blue-600 to-blue-800"
        />
        <StatCard
          icon={<FiAlertTriangle size={24} />}
          label="Categories"
          value={Object.keys(byCategory).length}
          gradient="bg-gradient-to-br from-red-600 to-red-800"
        />
      </div>

      {/* Category Breakdown */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <FiBarChart2 className="text-cyan-400" size={18} />
          <h3 className="font-bold text-white text-sm uppercase tracking-wide">Breakdown by Category</h3>
        </div>
        <div className="space-y-4">
          {Object.entries(byCategory)
            .sort(([, a], [, b]) => b - a)
            .map(([category, count]) => (
              <CategoryBar
                key={category}
                category={category}
                count={count}
                total={totalByCategory}
              />
            ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm">
        <p className="text-xs text-green-200 font-bold uppercase mb-2">System Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <p className="text-green-300 text-sm font-semibold">All Systems Operational</p>
        </div>
        <p className="text-xs text-green-200/70 mt-2">Data updates every 30 seconds</p>
      </div>
    </div>
  );
};
