/**
 * Home Page
 * Landing page with hero section and features
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FiZap, FiMapPin, FiBarChart2, FiUsers, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

export default function HomePage() {
  const features = [
    {
      icon: <FiMapPin size={32} />,
      title: 'Location-Based Tracking',
      description: 'Report issues with precise geolocation for faster resolution and efficient resource allocation.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FiBarChart2 size={32} />,
      title: 'Smart Analytics',
      description: 'AI-powered clustering identifies patterns and prioritizes critical issues for immediate action.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: <FiUsers size={32} />,
      title: 'Community Engagement',
      description: 'Connect with neighbors, track complaint status, and participate in civic improvement initiatives.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: <FiZap size={32} />,
      title: 'Real-Time Updates',
      description: 'Get instant notifications about complaint status, resolution progress, and civic announcements.',
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  const stats = [
    { value: '2,450+', label: 'Issues Resolved', icon: <FiCheckCircle size={24} /> },
    { value: '15K+', label: 'Active Citizens', icon: <FiUsers size={24} /> },
    { value: '12', label: 'Wards Covered', icon: <FiMapPin size={24} /> },
    { value: '92%', label: 'Satisfaction Rate', icon: <FiTrendingUp size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
                <p className="text-cyan-400 text-sm font-bold">🚀 Smart Cities Initiative 2026</p>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
                Your Voice for a
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> Better City</span>
              </h1>
              
              <p className="text-xl text-slate-300 leading-relaxed">
                Report civic issues instantly, track resolutions in real-time, and be part of building a smarter, more responsive community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 text-center"
                >
                  Report an Issue
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg backdrop-blur-sm transition-all text-center"
                >
                  View Dashboard
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center text-cyan-400 mb-2">
                      {stat.icon}
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-white">{stat.value}</p>
                    <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="space-y-4">
                  {/* Mock Notification Cards */}
                  <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 border border-green-500/30 rounded-xl p-4 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <FiCheckCircle className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">Issue Resolved</p>
                        <p className="text-xs text-slate-300">Street light fixed in Sector 12</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FiMapPin className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">New Report</p>
                        <p className="text-xs text-slate-300">Water supply issue near Park Avenue</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <FiBarChart2 className="text-white" size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">Critical Alert</p>
                        <p className="text-xs text-slate-300">14 complaints in same location</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Powerful Features for <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Smart Governance</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Advanced technology meets civic engagement to create responsive, efficient, and transparent urban management.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-white/20 hover:shadow-lg hover:shadow-cyan-500/10 transform hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of citizens making their neighborhoods better, one report at a time.
            </p>
            <Link
              href="/submit"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Submit Your First Complaint
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
