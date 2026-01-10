/**
 * Contact Page
 * Contact form and information
 */

'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend } from 'react-icons/fi';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FiMapPin size={24} />,
      title: 'Visit Us',
      info: 'Ward 12 Office, Municipal Corporation',
      detail: 'Civic Center, Connaught Place, New Delhi - 110001',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FiPhone size={24} />,
      title: 'Call Us',
      info: '+91 11 2345 6789',
      detail: 'Mon-Fri: 9:00 AM - 6:00 PM',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <FiMail size={24} />,
      title: 'Email Us',
      info: 'support@civicmind.gov.in',
      detail: 'We reply within 24 hours',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <FiClock size={24} />,
      title: 'Office Hours',
      info: 'Monday - Friday',
      detail: '9:00 AM - 6:00 PM IST',
      color: 'from-green-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 backdrop-blur-sm mb-4">
            <p className="text-cyan-400 text-sm font-bold">✉️ Get in Touch</p>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Contact <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Our Team</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help you navigate civic services.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all hover:border-white/20 transform hover:scale-105"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-cyan-400 font-semibold mb-1">{item.info}</p>
              <p className="text-sm text-slate-400">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-black text-white mb-6">Send Us a Message</h2>
            
            {submitted && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 mb-6 animate-pulse">
                <p className="text-green-300 font-bold">✅ Message sent successfully!</p>
                <p className="text-green-200 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="How can we help you?"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2 uppercase tracking-wider">
                  Message *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  placeholder="Tell us more about your inquiry..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-cyan-500/50 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <FiSend size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm h-64">
              <div className="w-full h-full bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-white font-bold">Map Location</p>
                  <p className="text-slate-400 text-sm">Connaught Place, New Delhi</p>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-black text-white mb-4">Quick Help</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-cyan-400 font-bold mb-1">How do I track my complaint?</h4>
                  <p className="text-sm text-slate-300">Visit the dashboard and search for your complaint ID.</p>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-bold mb-1">What's the response time?</h4>
                  <p className="text-sm text-slate-300">Most complaints are addressed within 24-48 hours.</p>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-bold mb-1">Can I submit anonymous complaints?</h4>
                  <p className="text-sm text-slate-300">Yes, but providing contact info helps us resolve issues faster.</p>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-black text-white mb-2">🚨 Emergency?</h3>
              <p className="text-red-200 text-sm mb-3">For urgent issues requiring immediate attention:</p>
              <a
                href="tel:100"
                className="block bg-red-500 hover:bg-red-600 text-white text-center px-6 py-3 rounded-xl font-bold transition-all"
              >
                📞 Call Emergency: 100
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
