import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  display?: string;
  label: string;
  sublabel: string;
  color: string;
}

const stats: StatItem[] = [
  { value: 100, suffix: 'M+', prefix: '$', label: 'Annual Revenue',     sublabel: 'Transactions processed',    color: '#F59E0B' },
  { value: 50,  suffix: 'K MT+',           label: 'Annual Volume',      sublabel: 'Metric tonnes traded',       color: '#d4af37' },
  { value: 20,  suffix: '+',               label: 'Countries Served',   sublabel: 'Global operations',          color: '#0EA5E9' },
  { value: 0,   suffix: '',   display: 'ISO 9001', label: 'ISO 9001:2015 Certified', sublabel: 'Quality Management System', color: '#22C55E' },
];

function Stat({ item, start }: { item: StatItem; start: boolean }) {
  const count = useCountUp(item.value, 2000, start);
  const displayed = item.display ?? `${item.prefix ?? ''}${count}${item.suffix}`;
  return (
    <div className="flex flex-col items-center text-center px-4 py-8 relative group">
      <div
        className="font-black text-5xl md:text-6xl mb-2 tabular-nums"
        style={{ color: item.color, textShadow: `0 0 40px ${item.color}60` }}
      >
        {displayed}
      </div>
      <div className="font-bold text-white text-base mb-1">{item.label}</div>
      <div className="text-white/40 text-sm">{item.sublabel}</div>

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full transition-all duration-300 group-hover:w-24"
        style={{ background: item.color }}
      />
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(el); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-4 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0F172A 0%, #101a2e 50%, #0F172A 100%)' }}>
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.5), rgba(212,175,55,0.4), rgba(249,115,22,0.4), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/5">
          {stats.map((item, i) => (
            <Stat key={i} item={item} start={started} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), rgba(14,165,233,0.5), transparent)' }} />
    </section>
  );
}
