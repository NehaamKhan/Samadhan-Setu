/**
 * Navbar Component
 * Main navigation for the website
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiHome, FiFileText, FiBarChart2, FiInfo, FiMail } from 'react-icons/fi';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: <FiHome size={18} /> },
    { href: '/submit', label: 'Submit Complaint', icon: <FiFileText size={18} /> },
    { href: '/dashboard', label: 'Dashboard', icon: <FiBarChart2 size={18} /> },
    { href: '/about', label: 'About', icon: <FiInfo size={18} /> },
    { href: '/contact', label: 'Contact', icon: <FiMail size={18} /> },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 border-b border-blue-500/30 sticky top-0 z-50 shadow-2xl backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-3 rounded-xl shadow-lg group-hover:shadow-cyan-500/50 transition-all transform group-hover:scale-110">
              <span className="text-2xl">🏛️</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">Samadhan Setu</h1>
              <p className="text-xs text-blue-200 font-medium">AI-Powered Civic Intelligence Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-blue-100 hover:text-white hover:bg-white/10 transition-all"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/submit"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105"
            >
              Report Issue
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-blue-500/30">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-blue-100 hover:text-white hover:bg-white/10 transition-all"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <Link
              href="/submit"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 mx-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg mt-4"
            >
              <FiFileText size={18} />
              Report Issue
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
