import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface CountryData {
  flag: string;
  name: string;
  tagline: string;
  region: string;
}

const countries: CountryData[] = [
  { flag: '🇮🇳', name: 'India', tagline: 'Manufacturing & tech hub with 200+ enterprise clients', region: 'Asia Pacific' },
  { flag: '🇮🇩', name: 'Indonesia', tagline: 'Leading commodity trading and logistics operations', region: 'Asia Pacific' },
  { flag: '🇵🇭', name: 'Philippines', tagline: 'BPO and supply chain management center', region: 'Asia Pacific' },
  { flag: '🇹🇭', name: 'Thailand', tagline: 'ASEAN trade facilitation and distribution hub', region: 'Asia Pacific' },
  { flag: '🇰🇷', name: 'South Korea', tagline: 'Advanced manufacturing and technology procurement', region: 'Asia Pacific' },
  { flag: '🇦🇺', name: 'Australia', tagline: 'Premium commodities and financial services', region: 'Asia Pacific' },
  { flag: '🇧🇩', name: 'Bangladesh', tagline: 'Textile and garment supply chain solutions', region: 'Asia Pacific' },
  { flag: '🇦🇪', name: 'UAE', tagline: 'Middle East trade gateway and re-export hub', region: 'Middle East' },
  { flag: '🇸🇦', name: 'Saudi Arabia', tagline: 'Energy sector procurement and logistics', region: 'Middle East' },
  { flag: '🇰🇼', name: 'Kuwait', tagline: 'Financial services and investment facilitation', region: 'Middle East' },
  { flag: '🇹🇷', name: 'Turkey', tagline: 'Bridge between European and Asian markets', region: 'Europe' },
  { flag: '🇧🇷', name: 'Brazil', tagline: 'South American agri-commodities and trade', region: 'Americas' },
  { flag: '🇰🇪', name: 'Kenya', tagline: 'East African market development and logistics', region: 'Africa' },
  { flag: '🇺🇸', name: 'USA', tagline: 'North American enterprise and consulting hub', region: 'Americas' },
  { flag: '🇻🇳', name: 'Vietnam', tagline: 'Manufacturing relocation and export facilitation', region: 'Asia Pacific' },
  { flag: '🇲🇾', name: 'Malaysia', tagline: 'ASEAN headquarters for trade and compliance', region: 'Asia Pacific' },
];

const regionColors: Record<string, string> = {
  'Asia Pacific': 'from-sky-500/20 to-blue-600/20',
  'Middle East': 'from-amber-500/20 to-orange-600/20',
  'Europe': 'from-violet-500/20 to-purple-600/20',
  'Americas': 'from-emerald-500/20 to-teal-600/20',
  'Africa': 'from-rose-500/20 to-pink-600/20',
};

const regionBadgeColors: Record<string, string> = {
  'Asia Pacific': 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  'Middle East': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Europe': 'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'Americas': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Africa': 'text-rose-400 bg-rose-400/10 border-rose-400/20',
};

export default function Countries() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="countries" ref={sectionRef} className="relative py-24 lg:py-32"
      style={{ background: 'linear-gradient(180deg, #0A0F1E 0%, #0d0a1a 50%, #0A0F1E 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(14,165,233,0.4), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div className="section-pill mb-5 mx-auto inline-flex">
            <MapPin size={12} className="text-brand-teal" />
            Global Operations
          </div>
          <h2 className="font-black text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
            <span className="text-white">Our Global </span>
            <span className="gradient-text">Footprint</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Strategic presence across 16 countries spanning Asia Pacific, the Middle East, Africa, Europe, and the Americas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {countries.map((country, i) => (
            <div
              key={country.name}
              className={`country-card gradient-border rounded-xl p-5 cursor-default bg-gradient-to-br ${regionColors[country.region]} backdrop-blur-sm reveal`}
              style={{
                transitionDelay: `${i * 0.04}s`,
                background: `linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(10,15,30,0.9) 100%)`,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl" role="img" aria-label={country.name}>{country.flag}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${regionBadgeColors[country.region]}`}>
                  {country.region}
                </span>
              </div>
              <h3 className="font-bold text-white text-base mb-1.5">{country.name}</h3>
              <p className="text-white/45 text-xs leading-relaxed">{country.tagline}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
