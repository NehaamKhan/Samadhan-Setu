/**
 * Submit Complaint Page
 * Form for citizens to report civic issues
 */

'use client';

import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { FiMapPin, FiFileText, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { complaintApi } from '../services/api';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    latitude: '',
    longitude: '',
    locationName: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { value: 'water_supply', label: '💧 Water Supply', color: 'from-blue-500 to-cyan-500' },
    { value: 'electricity', label: '⚡ Electricity', color: 'from-yellow-500 to-orange-500' },
    { value: 'sanitation', label: '🧹 Sanitation', color: 'from-green-500 to-teal-500' },
    { value: 'roads_potholes', label: '🛣️ Roads/Potholes', color: 'from-gray-500 to-slate-600' },
    { value: 'streetlights', label: '💡 Street Lights', color: 'from-purple-500 to-pink-500' },
    { value: 'drainage', label: '🌊 Drainage', color: 'from-indigo-500 to-blue-500' },
    { value: 'garbage_collection', label: '🗑️ Garbage', color: 'from-red-500 to-orange-500' },
    { value: 'parks_gardens', label: '🌳 Parks & Gardens', color: 'from-green-600 to-lime-500' },
  ];

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          });
        },
        () => {
          setError('Unable to get your location. Please enter manually.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const complaint = {
        category: formData.category,
        description: formData.description,
        location: {
          type: 'Point',
          coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)],
        },
        location_name: formData.locationName || 'Not specified',
        timestamp: new Date().toISOString(),
      };

      await complaintApi.submit(complaint);
      setSuccess(true);
      setFormData({
        category: '',
        description: '',
        latitude: '',
        longitude: '',
        locationName: '',
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit complaint. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 backdrop-blur-sm mb-4">
            <p className="text-cyan-400 text-sm font-bold">📝 Report an Issue</p>
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            Submit Your <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Complaint</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Help us improve your neighborhood. Your report will be reviewed and addressed promptly.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-8 backdrop-blur-sm animate-pulse">
            <div className="flex items-center gap-3">
              <FiCheckCircle className="text-green-400" size={24} />
              <div>
                <p className="text-green-300 font-bold text-lg">Complaint Submitted Successfully!</p>
                <p className="text-green-200 text-sm">We'll review your report and take appropriate action.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-8 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <FiAlertCircle className="text-red-400" size={20} />
              <p className="text-red-300">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                <FiFileText className="inline mr-2" />
                Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat.value })}
                    className={`p-4 rounded-xl border-2 transition-all transform hover:scale-105 ${
                      formData.category === cat.value
                        ? `bg-gradient-to-br ${cat.color} border-white/50 text-white`
                        : 'bg-white/5 border-white/20 text-slate-300 hover:border-white/40'
                    }`}
                  >
                    <p className="text-sm font-bold">{cat.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                placeholder="Please describe the issue in detail..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  <FiMapPin className="inline mr-2" />
                  Latitude *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={formData.latitude}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="28.7041"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                  Longitude *
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  value={formData.longitude}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="77.1025"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-4 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                >
                  📍 Use My Location
                </button>
              </div>
            </div>

            {/* Location Name */}
            <div>
              <label className="block text-sm font-bold text-white mb-3 uppercase tracking-wider">
                Location Name (Optional)
              </label>
              <input
                type="text"
                value={formData.locationName}
                onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                placeholder="e.g., Near Central Park, Sector 12"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6 flex gap-4">
              <button
                type="submit"
                disabled={loading || !formData.category}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:from-slate-600 disabled:to-slate-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : '🚀 Submit Complaint'}
              </button>
              <button
                type="button"
                onClick={() => setFormData({ category: '', description: '', latitude: '', longitude: '', locationName: '' })}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                Clear Form
              </button>
            </div>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-2">💡 Tips for Better Reports</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Be specific and detailed in your description</li>
            <li>• Include landmarks or nearby locations for easier identification</li>
            <li>• Add photos if the issue requires visual context (coming soon!)</li>
            <li>• Check if a similar complaint has already been filed</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
