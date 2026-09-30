import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  Map,
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const contactItems = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email Us',
    value: 'hello@ecom.store',
    href: 'mailto:hello@ecom.store',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Call Us',
    value: '+1 (800) 326-6673',
    href: 'tel:+18003266673',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    id: 'address',
    icon: MapPin,
    label: 'Visit Us',
    value: '123 Commerce St, San Francisco, CA 94102',
    href: 'https://maps.google.com/?q=123+Commerce+St,+San+Francisco,+CA+94102',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'hours',
    icon: Clock,
    label: 'Business Hours',
    value: 'Mon–Fri: 9am – 6pm EST',
    href: null,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
];

const subjectOptions = [
  'General Inquiry',
  'Order Support',
  'Product Question',
  'Returns & Refunds',
  'Other',
];

const faqs = [
  {
    id: 'shipping',
    question: 'How long does shipping take?',
    answer:
      'Standard shipping typically takes 5–7 business days within the continental US. Expedited options (2–3 business days) and overnight shipping are also available at checkout. Orders placed before 2pm EST on business days are usually processed the same day.',
  },
  {
    id: 'returns',
    question: 'What is your return policy?',
    answer:
      'We offer a hassle-free 30-day return window from the date of delivery. Items must be in their original, unused condition with all tags attached. Simply initiate a return from your account dashboard or contact our support team and we\'ll arrange a free pickup label.',
  },
  {
    id: 'international',
    question: 'Do you offer international shipping?',
    answer:
      'Yes! We ship to over 40 countries worldwide. International shipping rates and delivery estimates are calculated at checkout based on your destination. Please note that customs duties and import taxes may apply and are the responsibility of the recipient.',
  },
  {
    id: 'tracking',
    question: 'How can I track my order?',
    answer:
      'Once your order ships you\'ll receive a confirmation email with a tracking number. You can also visit the "Orders" section of your account at any time to see real-time carrier updates. Our support team is happy to help if you have any questions about your shipment.',
  },
];

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields) {
  const errs = {};
  if (!fields.name.trim()) errs.name = 'Full name is required.';
  if (!fields.email.trim()) {
    errs.email = 'Email address is required.';
  } else if (!EMAIL_RE.test(fields.email.trim())) {
    errs.email = 'Please enter a valid email address.';
  }
  if (!fields.subject) errs.subject = 'Please select a subject.';
  if (!fields.message.trim()) {
    errs.message = 'Message is required.';
  } else if (fields.message.trim().length < 10) {
    errs.message = 'Message must be at least 10 characters.';
  }
  return errs;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** A single contact info card */
function ContactCard({ item }) {
  const Icon = item.icon;
  const inner = (
    <div className="flex items-start gap-4">
      <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${item.iconBg} flex items-center justify-center`}>
        <Icon size={22} className={item.iconColor} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-0.5">
          {item.label}
        </p>
        <p className="text-slate-800 font-medium leading-snug">{item.value}</p>
      </div>
    </div>
  );

  const base =
    'block w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-5 transition-all duration-200';

  return item.href ? (
    <a
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className={`${base} hover:shadow-md hover:border-indigo-100 hover:-translate-y-0.5`}
    >
      {inner}
    </a>
  ) : (
    <div className={`${base} cursor-default`}>{inner}</div>
  );
}

/** Inline error message */
function FieldError({ message }) {
  if (!message) return null;
  return <p className="mt-1.5 text-sm text-red-500 font-medium">{message}</p>;
}

/** Single FAQ accordion item */
function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 bg-white text-left hover:bg-indigo-50/50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
      >
        <span className="font-semibold text-slate-800">{faq.question}</span>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-indigo-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Animated answer panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 pt-1 bg-indigo-50/30 text-slate-600 leading-relaxed text-sm">
          {faq.answer}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { showToast } = useToast();

  // Form state
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState(null);

  // -------------------------------------------------------------------------
  // Handlers
  // -------------------------------------------------------------------------

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear individual field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate async API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setForm(INITIAL_FORM);
    showToast('Message sent! We\'ll be in touch soon.', 'success');
  }

  function toggleFaq(id) {
    setOpenFaq((prev) => (prev === id ? null : id));
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="page-enter min-h-screen bg-slate-50">

      {/* ── PAGE HEADER ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-violet-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link to="/" className="hover:text-indigo-600 transition-colors duration-150">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-medium">Contact</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Have a question, comment, or just want to say hello? We'd love to hear from you.
              Our friendly team is always here to help and typically responds within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── TWO-COLUMN LAYOUT ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* ── LEFT: Contact Information ─────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Contact Information</h2>
              <p className="text-slate-500 text-sm">Multiple ways to reach our team.</p>
            </div>

            {contactItems.map((item) => (
              <ContactCard key={item.id} item={item} />
            ))}

            {/* Decorative gradient blob */}
            <div
              aria-hidden="true"
              className="hidden lg:block h-24 rounded-2xl bg-gradient-to-br from-indigo-100 to-violet-100 opacity-60"
            />
          </div>

          {/* ── RIGHT: Contact Form ───────────────────────────────────── */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">Send Us a Message</h2>
              <p className="text-slate-500 text-sm mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              {/* ── Success Banner ── */}
              {submitted && (
                <div
                  role="alert"
                  className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl px-5 py-4 mb-8"
                >
                  <span className="mt-0.5 flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <p className="text-sm font-medium leading-relaxed">
                    Thank you! Your message has been sent. We'll get back to you within 24 hours.
                  </p>
                </div>
              )}

              {/* ── Form ── */}
              <form onSubmit={handleSubmit} noValidate className="space-y-6">

                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-400' : ''}`}
                  />
                  <FieldError message={errors.name} />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                  />
                  <FieldError message={errors.email} />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    aria-invalid={!!errors.subject}
                    className={`input-field appearance-none cursor-pointer ${errors.subject ? 'border-red-400 focus:ring-red-400' : ''} ${!form.subject ? 'text-slate-400' : 'text-slate-800'}`}
                  >
                    <option value="" disabled>Select a subject…</option>
                    {subjectOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-slate-800">{opt}</option>
                    ))}
                  </select>
                  <FieldError message={errors.subject} />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us how we can help you…"
                    value={form.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`input-field resize-none ${errors.message ? 'border-red-400 focus:ring-red-400' : ''}`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <FieldError message={errors.message} />
                    <span className={`text-xs ml-auto ${form.message.length < 10 && form.message.length > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                      {form.message.length} / 10 min
                    </span>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP PLACEHOLDER ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div
          aria-hidden="true"
          className="relative w-full h-64 md:h-80 bg-indigo-50 rounded-3xl border border-indigo-100 overflow-hidden flex flex-col items-center justify-center gap-3 shadow-inner"
        >
          {/* Faint grid overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,transparent,transparent 39px,#a5b4fc 39px,#a5b4fc 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#a5b4fc 39px,#a5b4fc 40px)',
            }}
          />
          {/* Soft radial glow */}
          <div className="absolute inset-0 bg-gradient-radial from-indigo-100/60 via-transparent to-transparent" />

          {/* Pin */}
          <div className="relative z-10 w-16 h-16 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center">
            <Map size={30} className="text-white" />
          </div>
          <p className="relative z-10 text-indigo-700 font-semibold text-lg tracking-wide">
            San Francisco, CA
          </p>
          <p className="relative z-10 text-indigo-400 text-sm">123 Commerce St, CA 94102</p>
        </div>
      </section>

      {/* ── FAQ SECTION ────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-slate-500">
            Can't find an answer? Reach out via the form above — we're happy to help.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <FaqItem
              key={faq.id}
              faq={faq}
              isOpen={openFaq === faq.id}
              onToggle={() => toggleFaq(faq.id)}
            />
          ))}
        </div>
      </section>

    </div>
  );
}
