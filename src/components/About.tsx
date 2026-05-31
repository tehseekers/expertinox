import { useEffect, useRef } from 'react';
import { CheckCircle2, ArrowRight, Globe as Globe2, Handshake, TrendingUp, DollarSign } from 'lucide-react';

const differentiators = [
  'Strong trade presence across key markets in Asia, Middle East and beyond',
  'ISO 9001:2015 certified operations and QMS framework',
  'Dedicated team with deep hands-on expertise in stainless steel trading',
  'Experienced team serving diverse clients across multiple regions',
  'Dedicated compliance team for cross-border regulatory adherence',
  'Strategic alliances with 30+ Tier-1 manufacturers and carriers',
];

const pillars = [
  { icon: DollarSign, title: 'Annual Revenue',  value: '$100M+',        color: 'text-amber-400', bg: '#F59E0B', width: '100%' },
  { icon: Globe2,     title: 'Global Reach',    value: '20+ Countries', color: 'text-sky-400',   bg: '#0EA5E9', width: '80%'  },
  { icon: Handshake,  title: 'Client Trust',    value: '98% Retention', color: 'text-green-400', bg: '#22C55E', width: '98%'  },
  { icon: TrendingUp, title: 'Annual Growth',   value: '12%',           color: 'text-orange-400',bg: '#F97316', width: '40%'  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const els = el.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    els.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: '#0A0F1E' }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.3), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="reveal-left">
            <div className="section-pill mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
              About Us
            </div>

            <h2 className="font-black text-4xl md:text-5xl tracking-tight leading-tight mb-6">
              <span className="text-white">Built for the</span>
              <span className="block gradient-text">Complex World of</span>
              <span className="text-white">Global Steel Trade</span>
            </h2>

            <p className="text-white/55 text-base leading-relaxed mb-5">
              Founded in 2018 and headquartered in Singapore, Expertinox Ventures has grown from a regional trading intermediary into a full-spectrum stainless steel trading platform. We bridge the gap between ambition and execution for manufacturers and industries expanding across borders.
            </p>

            <p className="text-white/55 text-base leading-relaxed mb-8">
              Our edge lies in direct mill relationships and global logistics expertise. With partners across Asia, Europe, and beyond, we ensure every transaction is backed by quality, compliance, and on-time delivery — without compromise.
            </p>

            {/* Checklist */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {differentiators.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={15} className="text-brand-teal mt-0.5 flex-shrink-0" />
                  <span className="text-white/65 text-sm leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-primary inline-flex text-sm">
              Partner With Us <ArrowRight size={15} />
            </a>
          </div>

          {/* Right */}
          <div className="reveal-right">
            <div className="grid gap-4">
              {pillars.map(({ icon: Icon, title, value, color, bg, width }, idx) => (
                <div key={title} className="glass-strong rounded-2xl p-5 flex items-center gap-5 relative overflow-hidden"
                  style={idx === 0 ? { border: `1px solid rgba(245,158,11,0.3)`, background: 'rgba(245,158,11,0.05)' } : {}}>
                  {idx === 0 && (
                    <div className="absolute inset-0 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at left center, rgba(245,158,11,0.08) 0%, transparent 60%)' }} />
                  )}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: idx === 0 ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${idx === 0 ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.08)'}` }}>
                    <Icon size={22} className={color} />
                  </div>
                  <div>
                    <div className={`font-black ${idx === 0 ? 'text-3xl' : 'text-2xl'} ${color}`}>{value}</div>
                    <div className="text-white/50 text-sm">{title}</div>
                  </div>
                  <div className="flex-1 ml-auto">
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width, background: bg }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
