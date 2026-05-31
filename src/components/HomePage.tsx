import { useEffect, useRef } from 'react';
import {
  Globe, MapPin, TrendingUp, Package,
  ChevronRight, Layers, Pipette, BarChart2, Circle,
  Building2, Users
} from 'lucide-react';
import WorldMap from './WorldMap';

// ─── Static data ──────────────────────────────────────────────────────────────

interface Stat {
  label: string;
  value: string;
  icon: React.ElementType;
}

const STATS: Stat[] = [
  { value: '50,000 MT+',  label: 'Annual Volume',    icon: Package },
  { value: '$100M+',      label: 'Annual Revenue',   icon: TrendingUp },
  { value: '20+',         label: 'Countries Served', icon: Globe },
  { value: 'ISO 9001:2015', label: 'Certified',      icon: Users },
];

interface Product {
  name: string;
  descriptor: string;
  icon: React.ElementType;
  gradient: string;
  accent: string;
  grades: string[];
  image: string;
}

const PRODUCTS: Product[] = [
  {
    name: 'Stainless Steel Coils',
    descriptor: 'Hot-rolled and cold-rolled coils in a wide range of thicknesses and surface finishes for industrial use.',
    icon: Circle,
    gradient: 'linear-gradient(135deg, #1c2e3d 0%, #2a4255 40%, #1a3040 100%)',
    accent: '#4a90d9',
    grades: ['304 / 304L', '316 / 316L', '430', '201', '309S', '310S'],
    image: 'https://images.pexels.com/photos/32845682/pexels-photo-32845682.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Stainless Steel Sheets',
    descriptor: '2B, BA, No.4, and mirror-finish sheets for precision fabrication, food processing, and architectural use.',
    icon: Layers,
    gradient: 'linear-gradient(135deg, #2a2a2a 0%, #3d3d3d 40%, #252525 100%)',
    accent: '#c0c0c0',
    grades: ['304 / 304L', '316 / 316L', '430', '201', '321', '347'],
    image: 'https://images.pexels.com/photos/32845674/pexels-photo-32845674.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Stainless Steel Bars',
    descriptor: 'Round, flat, square, and hex bars for machining, construction, and structural applications.',
    icon: BarChart2,
    gradient: 'linear-gradient(135deg, #1a2535 0%, #253548 40%, #1a2030 100%)',
    accent: '#d4af37',
    grades: ['304 / 304L', '316 / 316L', '410', '416', '420', '431'],
    image: 'https://images.pexels.com/photos/19825178/pexels-photo-19825178.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    name: 'Stainless Steel Pipes',
    descriptor: 'Seamless and welded pipes for fluid transport, heat exchangers, process industries, and oil & gas.',
    icon: Pipette,
    gradient: 'linear-gradient(135deg, #1e1e2e 0%, #2d2d42 40%, #181828 100%)',
    accent: '#5bbfd6',
    grades: ['304 / 304L', '316 / 316L', '321', '310S', 'Duplex 2205', 'Super Duplex'],
    image: 'https://images.pexels.com/photos/13100561/pexels-photo-13100561.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const REP_OFFICES = [
  { country: 'Turkey',    city: 'Istanbul',  flag: '🇹🇷' },
  { country: 'UAE',       city: 'Dubai',     flag: '🇦🇪' },
  { country: 'India',     city: 'Mumbai',    flag: '🇮🇳' },
  { country: 'Indonesia', city: 'Jakarta',   flag: '🇮🇩' },
];

const COUNTRY_CHIPS = [
  'India', 'Indonesia', 'Philippines', 'Thailand', 'South Korea',
  'Australia', 'Bangladesh', 'UAE', 'Saudi Arabia', 'Kuwait',
  'Turkey', 'Brazil', 'Kenya', 'USA', 'Vietnam', 'Malaysia', 'China',
];

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('hp-visible'); obs.unobserve(el); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #0d1520 0%, #1a2535 30%, #141e2d 60%, #0d1118 100%)' }} />
        <div className="absolute inset-0 opacity-30"
          style={{ background: 'repeating-linear-gradient(90deg, transparent 0, transparent 2px, rgba(192,192,192,0.03) 2px, rgba(192,192,192,0.03) 4px)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(74,144,217,0.08) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, #0d1118)' }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]"
          viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 18 }).map((_, i) => (
            <ellipse key={i} cx="720" cy="450"
              rx={120 + i * 55} ry={60 + i * 28}
              fill="none" stroke="#c0c0c0" strokeWidth="1.2" />
          ))}
        </svg>
      </div>

      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #4a90d9 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)', filter: 'blur(50px)' }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-semibold tracking-[0.15em] uppercase"
          style={{ background: 'rgba(74,144,217,0.12)', border: '1px solid rgba(74,144,217,0.3)', color: '#7eb8e8' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#4a90d9] animate-pulse" />
          Singapore Headquartered · Est. 2018
        </div>

        <h1 className="font-black leading-[1.04] tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', color: '#f0f4f8' }}>
          Global Leaders in
          <span className="block" style={{
            background: 'linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 30%, #4a90d9 60%, #d4af37 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            paddingBottom: '0.15em', display: 'inline-block',
          }}>
            Stainless Steel Trading
          </span>
        </h1>

        <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: 'rgba(192,200,212,0.8)' }}>
          Delivering premium stainless steel products to manufacturers and industries across the world since 2018.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(192,192,192,0.15)', color: '#d4d8e0' }}>
              <Icon size={13} style={{ color: '#4a90d9' }} />
              <span style={{ color: '#e8c84a' }}>{value}</span>
              <span className="text-white/40 font-normal">· {label}</span>
            </div>
          ))}
        </div>

        {/* Rep offices */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-white/30 text-xs tracking-widest uppercase mr-1">Sales Representatives:</span>
          {REP_OFFICES.map(({ country, city }) => (
            <span key={country} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#c8a83a' }}>
              <MapPin size={9} />{city}, {country}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#products"
            className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(135deg, #4a90d9 0%, #2d6fad 100%)', boxShadow: '0 4px 20px rgba(74,144,217,0.35)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 32px rgba(74,144,217,0.55)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(74,144,217,0.35)')}
          >
            <Package size={15} /> Explore Products
          </a>
          <a href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            style={{ color: '#c8d4e0', border: '1px solid rgba(192,192,192,0.25)' }}
          >
            Get in Touch <ChevronRight size={15} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        style={{ color: 'rgba(192,192,192,0.4)' }}>
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 relative overflow-hidden rounded-full"
          style={{ background: 'rgba(192,192,192,0.15)' }}>
          <div className="absolute top-0 left-0 right-0 h-4 rounded-full"
            style={{ background: 'linear-gradient(to bottom, #4a90d9, transparent)', animation: 'hp-scrollDrop 2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes hp-scrollDrop {
          0%   { transform: translateY(-100%); opacity: 0; }
          40%  { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

// ─── Products ─────────────────────────────────────────────────────────────────

function ProductStrip() {
  const ref = useReveal();
  return (
    <section
      id="products"
      ref={ref as React.RefObject<HTMLElement>}
      className="hp-reveal relative py-20 lg:py-28"
      style={{ background: 'linear-gradient(180deg, #0d1118 0%, #111927 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(74,144,217,0.4), rgba(212,175,55,0.3), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.2)', color: '#7eb8e8' }}>
            <Package size={11} /> Our Products
          </div>
          <h2 className="font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-3"
            style={{ color: '#f0f4f8' }}>
            What We Trade
          </h2>
          <p className="text-base max-w-xl" style={{ color: 'rgba(192,200,212,0.65)' }}>
            Certified mill sourcing across all major stainless steel product forms — in every grade your application demands.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRODUCTS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.name}
                className="group relative rounded-2xl overflow-hidden cursor-default transition-all duration-300 hover:-translate-y-2 flex flex-col"
                style={{ background: p.gradient, border: '1px solid rgba(255,255,255,0.07)' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${p.accent}40`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                {/* Product image */}
                <div className="relative h-36 overflow-hidden flex-shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ filter: 'brightness(0.55) saturate(0.7)' }}
                  />
                  <div className="absolute inset-0"
                    style={{ background: `linear-gradient(to bottom, transparent 30%, ${p.gradient.match(/#[0-9a-f]{6}/i)?.[0] ?? '#111'})` }} />
                  <div className="absolute top-3 left-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${p.accent}25`, border: `1px solid ${p.accent}40`, backdropFilter: 'blur(4px)' }}>
                      <Icon size={18} style={{ color: p.accent }} />
                    </div>
                  </div>
                </div>

                {/* Card body */}
                <div className="relative p-5 flex flex-col flex-1">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${p.accent}12 0%, transparent 65%)` }} />

                  <h3 className="font-bold text-white text-sm mb-1.5 leading-tight">{p.name}</h3>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(192,200,212,0.6)' }}>
                    {p.descriptor}
                  </p>

                  {/* Grades grid */}
                  <div className="mt-auto">
                    <div className="text-[9px] font-bold tracking-widest uppercase mb-2" style={{ color: p.accent }}>Available Grades</div>
                    <div className="flex flex-wrap gap-1">
                      {p.grades.map(g => (
                        <span key={g} className="px-1.5 py-0.5 rounded text-[9px] font-semibold"
                          style={{ background: `${p.accent}15`, color: p.accent, border: `1px solid ${p.accent}25` }}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl transition-all duration-300 group-hover:h-1"
                    style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Indonesia Operations ──────────────────────────────────────────────────────

function IndonesiaSection() {
  const ref = useReveal();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="hp-reveal relative py-16 lg:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #111927 0%, #0e1a28 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)' }} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[400px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(ellipse, #d4af37 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
              style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#d4af37' }}>
              <MapPin size={11} /> Indonesia Operations
            </div>
            <h2 className="font-black text-3xl md:text-4xl tracking-tight mb-4" style={{ color: '#f0f4f8' }}>
              Strong Presence in{' '}
              <span style={{
                background: 'linear-gradient(135deg, #d4af37, #f0d060)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>Indonesia</span>
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(192,200,212,0.7)' }}>
              Our Jakarta-based sales representative provides on-the-ground support to Indonesian manufacturers, fabricators, and distributors. Indonesia is one of our fastest-growing markets, with growing demand across construction, automotive, food processing, and petrochemical sectors.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                'Dedicated local sales representative in Jakarta',
                'Deep knowledge of Indonesian import regulations and certifications',
                'Fast turnaround on quotes and documentation',
                'Competitive pricing with flexible payment terms for Indonesian clients',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#d4af37' }} />
                  </div>
                  <span className="text-sm" style={{ color: 'rgba(192,200,212,0.75)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — Rep offices grid */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'rgba(192,192,192,0.4)' }}>
              Sales Representative Offices
            </div>
            <div className="grid grid-cols-2 gap-4">
              {REP_OFFICES.map(({ country, city, flag }) => (
                <div key={country} className="rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.12)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'; e.currentTarget.style.background = 'rgba(212,175,55,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(212,175,55,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                >
                  <div className="text-3xl mb-3">{flag}</div>
                  <div className="font-bold text-white text-sm mb-0.5">{country}</div>
                  <div className="text-xs flex items-center gap-1" style={{ color: '#d4af37' }}>
                    <MapPin size={9} />{city}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl p-4 flex items-center gap-3"
              style={{ background: 'rgba(74,144,217,0.07)', border: '1px solid rgba(74,144,217,0.15)' }}>
              <Users size={18} style={{ color: '#4a90d9', flexShrink: 0 }} />
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(192,200,212,0.65)' }}>
                Each representative office provides local language support, market intelligence, and hands-on logistics coordination.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── World Map ─────────────────────────────────────────────────────────────────

function WorldMapSection() {
  const ref = useReveal();
  return (
    <section
      id="map"
      ref={ref as React.RefObject<HTMLElement>}
      className="hp-reveal relative py-20 lg:py-28 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0e1a28 0%, #0e1520 50%, #0d1118 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), rgba(74,144,217,0.3), transparent)' }} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(ellipse, #1a3a5c 0%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', color: '#d4af37' }}>
            <Globe size={11} /> Global Reach
          </div>
          <h2 className="font-black text-3xl md:text-4xl lg:text-5xl tracking-tight mb-3"
            style={{ color: '#f0f4f8' }}>
            Our Global Reach
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(192,200,212,0.65)' }}>
            Trusted by manufacturers and industries across 20+ countries
          </p>
        </div>

        <div className="relative w-full rounded-2xl overflow-hidden mb-10"
          style={{ background: '#0a1220', border: '1px solid rgba(74,144,217,0.15)' }}>
          <div className="absolute top-0 left-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #0a1220, transparent)' }} />
          <div className="absolute top-0 right-0 bottom-0 w-12 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #0a1220, transparent)' }} />
          <div className="absolute top-0 left-0 right-0 h-8 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #0a1220, transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #0a1220, transparent)' }} />
          <div className="w-full" style={{ aspectRatio: '960/500' }}>
            <WorldMap />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {COUNTRY_CHIPS.map((name, i) => (
            <span key={name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-default hover:-translate-y-0.5"
              style={{
                background: i % 2 === 0 ? 'rgba(212,175,55,0.1)' : 'rgba(74,144,217,0.1)',
                border: i % 2 === 0 ? '1px solid rgba(212,175,55,0.25)' : '1px solid rgba(74,144,217,0.25)',
                color: i % 2 === 0 ? '#d4af37' : '#7eb8e8',
              }}
            >
              <MapPin size={9} />{name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <style>{`
        .hp-reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease-out, transform 0.7s ease-out; }
        .hp-visible { opacity: 1; transform: translateY(0); }
      `}</style>
      <HeroSection />
      <ProductStrip />
      <IndonesiaSection />
      <WorldMapSection />
    </>
  );
}
