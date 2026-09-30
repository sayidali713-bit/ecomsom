import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Shield, MessageCircle, ArrowRight, ChevronRight } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'Quality Products',
    description: 'We curate only the finest products from trusted brands and suppliers around the world.',
    color: 'indigo',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
  },
  {
    icon: ShoppingBag,
    title: 'Simple Shopping',
    description: 'An intuitive design that makes discovering and buying the things you love effortless.',
    color: 'emerald',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Shield,
    title: 'Secure Experience',
    description: 'Your personal data and payments are always protected with enterprise-grade security.',
    color: 'blue',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: MessageCircle,
    title: 'Fast Support',
    description: 'Our dedicated support team is available around the clock, ready to help you anytime.',
    color: 'violet',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
];

const stats = [
  { value: '10K+', label: 'Products' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '20+', label: 'Categories' },
  { value: '24/7', label: 'Support' },
];

const values = [
  {
    title: 'Integrity',
    description: 'We believe in honest pricing, transparent policies, and always doing right by our customers.',
  },
  {
    title: 'Innovation',
    description: 'We continuously improve our platform to deliver a smoother, smarter shopping experience.',
  },
  {
    title: 'Community',
    description: 'Every purchase supports a growing community of shoppers, sellers, and creators we are proud of.',
  },
];

export default function About() {
  return (
    <div className="page-enter min-h-screen bg-white">

      {/* ── PAGE HEADER ── */}
      <section className="bg-gradient-to-b from-indigo-50 to-white py-14 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-slate-800 font-medium">About</span>
          </nav>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            About{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              E-COM
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Your modern shopping destination — where quality meets simplicity, and every purchase feels like a great decision.
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              A platform built around you
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-5">
              E-COM is a modern online shopping platform focused on delivering quality products
              with a seamlessly simple experience. We believe shopping online should feel as
              natural and enjoyable as walking into your favorite store — without the hassle.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-5">
              Since our founding, we have partnered with hundreds of trusted brands and
              independent makers to bring you a curated selection across every category you
              care about — from everyday essentials to unique finds you won't discover anywhere else.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Our technology, design, and customer-care teams work hand-in-hand to ensure that
              every touchpoint — from first browse to final delivery — exceeds your expectations.
            </p>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"
              alt="E-COM team working together"
              className="rounded-2xl shadow-xl object-cover w-full max-w-md lg:max-w-none lg:w-full h-80 sm:h-96 lg:h-[480px]"
            />
          </div>
        </div>
      </section>

      {/* ── OUR MISSION ── */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-violet-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-4">
            Our Mission
          </p>
          <blockquote className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-6">
            "Our mission is to make online shopping{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              simple, enjoyable,
            </span>{' '}
            and accessible to everyone."
          </blockquote>
          <p className="text-lg text-slate-600 leading-relaxed">
            We are driven by a belief that great products and great experiences should not be
            reserved for the few. By combining thoughtful curation, fair pricing, and a
            frictionless platform, we work every day to bring the joy of discovering something
            wonderful to shoppers everywhere.
          </p>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
              Our Advantages
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Why Choose Us
            </h2>
            <p className="mt-3 text-lg text-slate-500 max-w-xl mx-auto">
              We go beyond transactions to deliver an experience worth coming back for.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, description, iconBg, iconColor }) => (
              <div
                key={title}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-start gap-4 hover:shadow-md transition-shadow"
              >
                <div className={`${iconBg} p-3 rounded-xl`}>
                  <Icon size={24} className={iconColor} />
                </div>
                <h3 className="text-base font-bold text-slate-900">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATISTICS ── */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 text-center">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-4xl font-extrabold text-white">{value}</span>
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wide">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM / VALUES ── */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Our Commitment to Quality
            </h2>
            <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
              Behind every product listing and support ticket is a team of people who genuinely care.
              These are the values that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {values.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-8"
              >
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center mb-5">
                  <span className="text-white font-extrabold text-sm">
                    {title.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-indigo-100 text-lg mb-8">
            Explore thousands of quality products handpicked just for you.
            Your next favourite thing is just a click away.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-white text-indigo-700 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-indigo-50 hover:shadow-xl transition-all duration-200 group"
          >
            Shop Now
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
