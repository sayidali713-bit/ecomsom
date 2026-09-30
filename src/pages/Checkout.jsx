import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Truck, AlertTriangle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
  'France', 'Netherlands', 'Sweden', 'Norway', 'Denmark', 'Spain',
  'Italy', 'Japan', 'South Korea', 'Singapore', 'New Zealand',
];

const INITIAL_FORM = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

const formatCardNumber = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

const validate = (form) => {
  const errors = {};
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Enter a valid email address.';
  if (!form.firstName.trim()) errors.firstName = 'First name is required.';
  if (!form.lastName.trim()) errors.lastName = 'Last name is required.';
  if (!form.address.trim()) errors.address = 'Address is required.';
  if (!form.city.trim()) errors.city = 'City is required.';
  if (!form.state.trim()) errors.state = 'State / Province is required.';
  if (!form.zip.trim()) errors.zip = 'ZIP / Postal code is required.';
  const rawCard = form.cardNumber.replace(/\s/g, '');
  if (rawCard.length !== 16) errors.cardNumber = 'Enter a valid 16-digit card number.';
  if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errors.expiry = 'Enter expiry as MM/YY.';
  if (!/^\d{3,4}$/.test(form.cvv)) errors.cvv = 'Enter a 3 or 4-digit CVV.';
  return errors;
};

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const { addToast } = useToast();

  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [items, navigate]);

  const shipping = subtotal > 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processed = value;
    if (name === 'cardNumber') processed = formatCardNumber(value);
    if (name === 'expiry') processed = formatExpiry(value);
    if (name === 'cvv') processed = value.replace(/\D/g, '').slice(0, 4);
    setForm((prev) => ({ ...prev, [name]: processed }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      addToast('Please fix the errors before continuing.', 'error');
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    clearCart();
    navigate('/order-success');
  };

  const inputClass = (field) =>
    `input-field w-full ${errors[field] ? 'border-red-400 focus:ring-red-300' : ''}`;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your order securely</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* ── LEFT COLUMN ── */}
            <div className="flex-1 space-y-6">

              {/* Contact Info */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">1</span>
                  Contact Information
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">2</span>
                  Shipping Address
                  <Truck size={16} className="text-gray-400 ml-1" />
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="firstName">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      className={inputClass('firstName')}
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="lastName">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={inputClass('lastName')}
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="address">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="address"
                      name="address"
                      type="text"
                      autoComplete="street-address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main St, Apt 4B"
                      className={inputClass('address')}
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="New York"
                      className={inputClass('city')}
                    />
                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">
                      State / Province <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="state"
                      name="state"
                      type="text"
                      autoComplete="address-level1"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="NY"
                      className={inputClass('state')}
                    />
                    {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="zip">
                      ZIP / Postal Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="zip"
                      name="zip"
                      type="text"
                      autoComplete="postal-code"
                      value={form.zip}
                      onChange={handleChange}
                      placeholder="10001"
                      className={inputClass('zip')}
                    />
                    {errors.zip && <p className="mt-1 text-xs text-red-500">{errors.zip}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="country">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      value={form.country}
                      onChange={handleChange}
                      className="input-field w-full"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Payment Info */}
              <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold">3</span>
                  Payment Information
                  <CreditCard size={16} className="text-gray-400 ml-1" />
                </h2>

                {/* Demo Warning */}
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
                  <AlertTriangle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800 font-medium">
                    * Demo only — no real payment will be processed. Do not enter real card details.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cardNumber">
                      Card Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        inputMode="numeric"
                        value={form.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        className={`${inputClass('cardNumber')} pr-12`}
                      />
                      <CreditCard size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    {errors.cardNumber && <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="expiry">
                        Expiry Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="expiry"
                        name="expiry"
                        type="text"
                        inputMode="numeric"
                        value={form.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={inputClass('expiry')}
                      />
                      {errors.expiry && <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cvv">
                        CVV <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="cvv"
                          name="cvv"
                          type="text"
                          inputMode="numeric"
                          value={form.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          className={`${inputClass('cvv')} pr-10`}
                        />
                        <Lock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                      {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              </section>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-base transition-all duration-200 shadow-md hover:shadow-lg"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Processing Order…
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Place Order · ${total.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <Lock size={12} /> Secured with 256-bit SSL encryption
              </p>
            </div>

            {/* ── RIGHT COLUMN: Order Summary ── */}
            <div className="w-full lg:w-96 lg:sticky lg:top-6 space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ShoppingBag size={18} className="text-indigo-500" />
                  Order Summary
                  <span className="ml-auto text-sm font-normal text-gray-500">
                    {items.reduce((s, i) => s + i.quantity, 0)} item{items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}
                  </span>
                </h2>

                {/* Items List */}
                <ul className="divide-y divide-gray-50 mb-5 space-y-1">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 py-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover border border-gray-100 bg-gray-50"
                        />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Totals */}
                <div className="space-y-2 border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Truck size={13} className="text-gray-400" /> Shipping
                    </span>
                    <span className={shipping === 0 ? 'text-emerald-600 font-medium' : ''}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-gray-400">
                      Free shipping on orders over $75
                    </p>
                  )}
                  <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-100 pt-3 mt-1">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-4">
                <ul className="space-y-2 text-xs text-indigo-700">
                  <li className="flex items-center gap-2"><Lock size={13} /> SSL encrypted checkout</li>
                  <li className="flex items-center gap-2"><Truck size={13} /> Free returns within 30 days</li>
                  <li className="flex items-center gap-2"><CreditCard size={13} /> Demo — no real charge</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
