import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShoppingBag, Truck, Package } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [orderNumber] = useState(
    () => `ECM-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [visible, setVisible] = useState(false);

  // Trigger entrance animation after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleTrackOrder = () => {
    addToast('Order tracking coming soon!', 'info');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center px-4 py-16">
      <div
        className={`w-full max-w-lg text-center transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Animated Checkmark */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer pulse ring */}
            <span className="absolute inset-0 rounded-full bg-emerald-200 animate-ping opacity-40" />
            {/* Circle */}
            <div className="relative w-24 h-24 rounded-full bg-emerald-500 shadow-lg shadow-emerald-200 flex items-center justify-center">
              <Check
                size={44}
                strokeWidth={3}
                className="text-white drop-shadow"
              />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-500 text-base sm:text-lg mb-8 leading-relaxed">
          Thank you for your purchase. Your order has been confirmed and is
          being prepared for shipment.
        </p>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-8 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Package size={15} className="text-indigo-400" />
              Order Number
            </span>
            <span className="text-sm font-bold text-indigo-600 tracking-wide">
              #{orderNumber}
            </span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
              <Truck size={15} className="text-indigo-400" />
              Estimated Delivery
            </span>
            <span className="text-sm font-semibold text-gray-700">
              3–5 business days
            </span>
          </div>
          <div className="h-px bg-gray-100" />
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Status</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Confirmed
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate('/shop')}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ShoppingBag size={16} />
            Continue Shopping
          </button>
          <button
            onClick={handleTrackOrder}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-700 font-semibold text-sm border border-gray-200 transition-all duration-200 shadow-sm"
          >
            <Truck size={16} />
            Track Order
          </button>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-xs text-gray-400">
          A confirmation email would be sent to your registered address in a
          real application.
        </p>
      </div>
    </div>
  );
}
