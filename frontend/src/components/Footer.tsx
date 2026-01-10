/**
 * Footer Component
 * Website footer with links and information
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-2 rounded-lg">
                <span className="text-xl">🏛️</span>
              </div>
              <div>
                <h3 className="text-xl font-black">CivicMind</h3>
                <p className="text-xs text-blue-200">Smart Civic Solutions</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Empowering citizens to report and resolve civic issues efficiently through AI-powered complaint aggregation and intelligent clustering.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-cyan-400">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'Submit Complaint', 'Dashboard', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-slate-300 hover:text-cyan-400 transition"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-cyan-400">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-slate-300">
                <FiMapPin className="text-cyan-400 mt-0.5 flex-shrink-0" size={16} />
                <span>Ward 12 Office, Municipal Corporation, Delhi</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <FiPhone className="text-cyan-400 flex-shrink-0" size={16} />
                <span>+91 11 2345 6789</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-300">
                <FiMail className="text-cyan-400 flex-shrink-0" size={16} />
                <span>support@civicmind.gov.in</span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 text-cyan-400">Stay Connected</h4>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="bg-white/10 hover:bg-cyan-500 p-2 rounded-lg transition transform hover:scale-110"
              >
                <FiFacebook size={18} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-cyan-500 p-2 rounded-lg transition transform hover:scale-110"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-cyan-500 p-2 rounded-lg transition transform hover:scale-110"
              >
                <FiInstagram size={18} />
              </a>
            </div>
            <p className="text-xs text-slate-400 mb-2">Subscribe to our newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
              />
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-r-lg font-bold text-sm hover:from-cyan-400 hover:to-blue-400 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © 2026 CivicMind. All rights reserved. | Developed for Smart Cities Mission
          </p>
          <div className="flex gap-4 text-sm text-slate-400">
            <Link href="#" className="hover:text-cyan-400 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
