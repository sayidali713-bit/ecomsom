import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  quickLinks: [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/categories', label: 'Categories' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ],
  customerService: [
    { label: 'FAQ', to: '/contact' },
    { label: 'Shipping Policy', to: '/contact' },
    { label: 'Returns & Refunds', to: '/contact' },
    { label: 'Privacy Policy', to: '/contact' },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group" aria-label="E-COM Home">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                <span className="text-indigo-400">E</span>
                <span className="text-white">-COM</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Your modern destination for quality products. Discover, shop, and enjoy a seamless online experience with E-COM.
            </p>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <button aria-label="Facebook" className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </button>
              {/* Instagram */}
              <button aria-label="Instagram" className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </button>
              {/* Twitter/X */}
              <button aria-label="Twitter/X" className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              {/* LinkedIn */}
              <button aria-label="LinkedIn" className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Customer Service</h3>
            <ul className="space-y-3">
              {footerLinks.customerService.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none focus:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">hello@ecom.store</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">+1 (800) 326-6673</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-indigo-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">123 Commerce St, San Francisco, CA 94102</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            © 2026 E-COM. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-600 bg-slate-800 px-3 py-1 rounded-full">
              Secure Shopping
            </span>
            <span className="text-xs text-slate-600 bg-slate-800 px-3 py-1 rounded-full">
              Free Returns
            </span>
            <span className="text-xs text-slate-600 bg-slate-800 px-3 py-1 rounded-full">
              24/7 Support
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
