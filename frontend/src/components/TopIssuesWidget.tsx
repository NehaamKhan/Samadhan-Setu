/**
 * TopIssuesWidget Component
 * Displays the top 3 critical issues for quick action
 */

'use client';

import React from 'react';
import { FiAlertCircle, FiTrendingUp, FiMapPin, FiMessageSquare } from 'react-icons/fi';

interface Issue {
  rank: number;
  category: string;
  location: string;
  complaint_count: number;
  priority_score: number;
  urgency: string;
}

interface TopIssuesWidgetProps {
  issues: Issue[];
  loading: boolean;
}

const UrgencyBadge: React.FC<{ urgency: string }> = ({ urgency }) => {
  const configs = {
    Critical: {
      bg: 'bg-red-500/20',
      border: 'border-red-500/50',
      text: 'text-red-300',
      dot: 'bg-red-500',
    },
    High: {
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/50',
      text: 'text-orange-300',
      dot: 'bg-orange-500',
    },
    Medium: {
      bg: 'bg-yellow-500/20',
      border: 'border-yellow-500/50',
      text: 'text-yellow-300',
      dot: 'bg-yellow-500',
    },
    Low: {
      bg: 'bg-green-500/20',
      border: 'border-green-500/50',
      text: 'text-green-300',
      dot: 'bg-green-500',
    },
  };

  const config = configs[urgency as keyof typeof configs] || configs.Low;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${config.bg} border ${config.border}`}>
      <div className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></div>
      <span className={config.text}>{urgency}</span>
    </div>
  );
};

const IssueCard: React.FC<{ issue: Issue; index: number }> = ({ issue, index }) => {
  const rankColors = ['from-red-600 to-red-700', 'from-orange-600 to-orange-700', 'from-yellow-600 to-yellow-700'];
  const rankGradient = rankColors[index] || rankColors[2];

  return (
    <div className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      {/* Rank Bar */}
      <div className={`bg-gradient-to-r ${rankGradient} px-4 py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-black text-white">
            #{issue.rank}
          </div>
          <h4 className="font-bold text-white text-sm">{issue.category}</h4>
        </div>
        <UrgencyBadge urgency={issue.urgency} />
      </div>

      {/* Content */}
      <div className="px-4 py-4 space-y-3">
        {/* Location */}
        <div className="flex items-start gap-2">
          <FiMapPin className="text-blue-400 mt-0.5 flex-shrink-0" size={16} />
          <div className="flex-1">
            <p className="text-xs text-slate-400 uppercase font-semibold">Location</p>
            <p className="text-sm text-slate-200 font-medium">{issue.location}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Reports</p>
            <div className="flex items-center gap-2">
              <FiMessageSquare size={14} className="text-cyan-400" />
              <p className="text-lg font-bold text-cyan-300">{issue.complaint_count}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Priority</p>
            <div className="flex items-center gap-2">
              <FiTrendingUp size={14} className="text-purple-400" />
              <p className="text-lg font-bold text-purple-300">{issue.priority_score.toFixed(1)}/10</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold py-2 rounded-lg transition transform hover:scale-105 active:scale-95">
          View Details →
        </button>
      </div>
    </div>
  );
};

export const TopIssuesWidget: React.FC<TopIssuesWidgetProps> = ({ issues, loading }) => {
  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full flex items-center justify-center backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin text-2xl">⏳</div>
          <p className="text-slate-300 text-sm font-medium">Loading action items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full overflow-y-auto backdrop-blur-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
          <FiAlertCircle className="text-white" size={20} />
        </div>
        <div>
          <h2 className="text-lg font-black text-white">Action Items</h2>
          <p className="text-xs text-slate-400 font-medium">Top 3 Critical Issues</p>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-4 flex-1">
        {issues.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-center">
            <div className="text-4xl mb-2">✨</div>
            <p className="text-slate-300 text-sm font-semibold">No Urgent Issues</p>
            <p className="text-slate-400 text-xs mt-1">All systems running smoothly!</p>
          </div>
        ) : (
          issues.map((issue, index) => <IssueCard key={issue.rank} issue={issue} index={index} />)
        )}
      </div>

      {/* Footer */}
      {issues.length > 0 && (
        <div className="mt-5 pt-4 border-t border-white/10">
          <button className="w-full bg-gradient-to-r from-blue-600/50 to-indigo-600/50 hover:from-blue-600 hover:to-indigo-600 text-white text-xs font-bold py-3 rounded-lg transition border border-blue-400/30 hover:border-blue-400/60">
            View All Issues (60)
          </button>
        </div>
      )}
    </div>
  );
};
