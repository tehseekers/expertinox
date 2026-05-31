import { ArrowRight, Globe, Users, Award, TrendingUp } from 'lucide-react';
import WorldMap from './WorldMap';

const stats = [
  { icon: Globe, value: '16+', label: 'Countries' },
  { icon: Users, value: '100+', label: 'Enterprise Clients' },
  { icon: Award, value: '8+', label: 'Years Experience' },
  { icon: TrendingUp, value: '$100M+', label: 'Transactions' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(160deg, #0F172A 0%, #0A0F1E 40%, #1a0533 100%)' }}>
      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-0 left-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)', filter: 'blur(50px)' }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center pt-32 pb-8 px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Pill label */}
        <div className="section-pill mb-6 animate-[fadeUp_0.5s_ease-out_0.1s_both]">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse inline-block" />
          Trusted Stainless Steel Trading Partner Since 2018
        </div>

        <h1
          className="font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-6 animate-[fadeUp_0.6s_ease-out_0.2s_both]"
          style={{ willChange: 'transform' }}
        >
          Connecting Global Markets,
          <span className="block gradient-text mt-1">Delivering Excellence</span>
        </h1>

        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 animate-[fadeUp_0.6s_ease-out_0.35s_both]">
          A premier B2B services platform operating across 16+ countries — bridging manufacturers, distributors, and enterprises with seamless cross-border solutions.
        </p>

        <div className="flex flex-wrap gap-4 justify-center animate-[fadeUp_0.6s_ease-out_0.45s_both]">
          <a href="#contact" className="btn-primary text-sm">
            Start a Partnership <ArrowRight size={15} />
          </a>
          <a href="#services" className="btn-secondary text-sm">
            Explore Services
          </a>
        </div>

        {/* Stat pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-12 animate-[fadeUp_0.6s_ease-out_0.55s_both]">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="glass flex items-center gap-2.5 px-4 py-2.5 rounded-xl"
            >
              <Icon size={15} className="text-brand-teal flex-shrink-0" />
              <span className="font-bold text-white text-sm">{value}</span>
              <span className="text-white/50 text-xs">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* World Map */}
      <div className="relative z-10 flex-1 w-full min-h-[340px] md:min-h-[420px] lg:min-h-[460px]">
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-20 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #0A0F1E, transparent)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #0A0F1E, transparent)' }} />
        {/* Side fades */}
        <div className="absolute top-0 left-0 bottom-0 w-16 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0A0F1E, transparent)' }} />
        <div className="absolute top-0 right-0 bottom-0 w-16 z-20 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0A0F1E, transparent)' }} />

        <WorldMap />
      </div>
    </section>
  );
}
