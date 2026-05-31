import { useEffect, useRef } from 'react';
import {
  ShieldCheck, Globe, Truck, DollarSign, FileText,
  CreditCard, Ruler, Factory, Award
} from 'lucide-react';

interface Reason {
  icon: React.ElementType;
  title: string;
  description: string;
  accent: string;
}

const REASONS: Reason[] = [
  {
    icon: CreditCard,
    title: 'Flexible Payment Terms',
    description: 'We work with buyers to structure payment terms that fit their business needs — including LC, TT, and deferred payment arrangements.',
    accent: '#34D399',
  },
  {
    icon: Ruler,
    title: 'Customized Sizes',
    description: 'We source and supply material cut to your exact specifications — custom widths, lengths, thicknesses, and surface finishes available.',
    accent: '#FB923C',
  },
  {
    icon: Factory,
    title: 'Vast SS Industry Experience',
    description: 'With years of deep expertise in stainless steel trading, our team understands mill capabilities, market trends, and technical requirements across every grade.',
    accent: '#FBBF24',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'Every shipment undergoes rigorous inspection and testing. We source only from certified mills with proven track records.',
    accent: '#0EA5E9',
  },
  {
    icon: Globe,
    title: 'Global Sourcing',
    description: 'Access to a network of reliable mills and suppliers across Asia, Europe, and beyond ensures the best pricing and availability.',
    accent: '#d4af37',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    description: 'Efficient logistics management ensures your materials arrive on time, every time, with full documentation and tracking.',
    accent: '#22C55E',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description: 'Strong mill relationships and efficient operations allow us to offer market-competitive pricing without compromising on quality.',
    accent: '#F97316',
  },
  {
    icon: Award,
    title: 'ISO 9001:2015 Certified',
    description: 'Our quality management system is ISO 9001:2015 certified, ensuring consistent processes, traceability, and continuous improvement across all operations.',
    accent: '#38BDF8',
  },
  {
    icon: FileText,
    title: 'Full Documentation',
    description: 'Complete mill test certificates, inspection reports, and shipping documentation provided with every order for full traceability.',
    accent: '#E879F9',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.wcu-card');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('wcu-visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    items.forEach(c => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0d1118 0%, #0A0F1E 100%)' }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.4), rgba(212,175,55,0.3), transparent)' }} />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #0EA5E9 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase mb-5"
            style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)', color: '#7eb8e8' }}>
            <ShieldCheck size={11} /> Why Choose Us
          </div>
          <h2 className="font-black text-4xl md:text-5xl lg:text-6xl tracking-tight mb-5 text-white">
            Why Choose{' '}
            <span style={{
              background: 'linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 30%, #4a90d9 70%, #d4af37 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Expertinox
            </span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'rgba(192,200,212,0.65)' }}>
            We bring together the expertise, relationships, and operational discipline that makes every transaction seamless.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REASONS.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="wcu-card group relative rounded-2xl p-7 cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transitionDelay: `${i * 0.06}s`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = `rgba(${hexToRgb(r.accent)}, 0.06)`;
                  e.currentTarget.style.borderColor = `rgba(${hexToRgb(r.accent)}, 0.3)`;
                  e.currentTarget.style.boxShadow = `0 16px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(${hexToRgb(r.accent)}, 0.15)`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-2xl pointer-events-none overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `radial-gradient(circle at top right, rgba(${hexToRgb(r.accent)}, 0.15), transparent 70%)` }} />
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `rgba(${hexToRgb(r.accent)}, 0.1)`, border: `1px solid rgba(${hexToRgb(r.accent)}, 0.25)` }}>
                  <Icon size={20} style={{ color: r.accent }} />
                </div>

                <h3 className="font-bold text-white text-lg mb-3 leading-tight">{r.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(192,200,212,0.6)' }}>
                  {r.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-px rounded-full transition-all duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, rgba(${hexToRgb(r.accent)}, 0.5), transparent)`, opacity: 0 }}
                  ref={el => { if (el) el.style.opacity = '0'; }}
                />
                <div className="absolute bottom-0 left-6 right-6 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${r.accent}, transparent)` }} />
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .wcu-card {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.55s ease-out, transform 0.55s ease-out, background 0.25s, border-color 0.25s, box-shadow 0.25s, translate 0.25s;
        }
        .wcu-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
