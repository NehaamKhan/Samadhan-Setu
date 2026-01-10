/**
 * About Page
 * Information about the CivicMind platform
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FiTarget, FiEye, FiAward, FiUsers } from 'react-icons/fi';

export default function AboutPage() {
  const values = [
    {
      icon: <FiTarget size={32} />,
      title: 'Transparency',
      description: 'Every complaint is tracked publicly, ensuring accountability and clear communication.',
    },
    {
      icon: <FiEye size={32} />,
      title: 'Efficiency',
      description: 'AI-powered analytics help prioritize and resolve issues faster than traditional methods.',
    },
    {
      icon: <FiAward size={32} />,
      title: 'Quality',
      description: 'Continuous monitoring ensures high standards of civic services and citizen satisfaction.',
    },
    {
      icon: <FiUsers size={32} />,
      title: 'Community',
      description: 'Empowering citizens to actively participate in improving their neighborhoods.',
    },
  ];

  const team = [
    { name: 'Ramesh Kumar', role: 'Ward Administrator', avatar: '👨‍💼' },
    { name: 'Priya Sharma', role: 'Technical Lead', avatar: '👩‍💻' },
    { name: 'Amit Patel', role: 'Community Manager', avatar: '👨‍💼' },
    { name: 'Sneha Gupta', role: 'Data Analyst', avatar: '👩‍🔬' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20 blur-3xl"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 backdrop-blur-sm mb-6">
            <p className="text-cyan-400 text-sm font-bold">ℹ️ About Us</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Building a <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Smarter City</span> Together
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            CivicMind is a revolutionary platform that connects citizens with local authorities through intelligent complaint aggregation, real-time tracking, and AI-powered analytics.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-3xl mb-4">
              🎯
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Our Mission</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              To create a transparent, efficient, and responsive civic management system that empowers every citizen to contribute to their community's well-being through seamless technology integration.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl mb-4">
              👁️
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Our Vision</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              A future where every neighborhood thrives through proactive civic engagement, data-driven decision making, and collaborative problem-solving between citizens and authorities.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-300">Principles that guide every decision we make</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-white/20"
              >
                <div className="text-cyan-400 mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-slate-300">Dedicated professionals working for you</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm text-center hover:bg-white/10 transition-all hover:border-white/20 transform hover:scale-105"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-sm text-cyan-400 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-black text-white mb-4">
              Join Us in Building a Better Tomorrow
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Your participation makes all the difference. Start reporting issues today.
            </p>
            <Link
              href="/submit"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
