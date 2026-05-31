import { useState, useEffect, useRef, useMemo } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import type { GeoPermissibleObjects } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';

// ─── Country pin data ─────────────────────────────────────────────────────────

interface CountryPin {
  name: string;
  lat: number;
  lon: number;
  color: 'orange' | 'teal';
}

const PINS: CountryPin[] = [
  { name: 'India',        lat: 20.59,  lon: 78.96,   color: 'orange' },
  { name: 'Indonesia',    lat: -0.79,  lon: 113.92,  color: 'teal'   },
  { name: 'Philippines',  lat: 12.88,  lon: 121.77,  color: 'orange' },
  { name: 'Thailand',     lat: 15.87,  lon: 100.99,  color: 'teal'   },
  { name: 'South Korea',  lat: 35.91,  lon: 127.77,  color: 'orange' },
  { name: 'Australia',    lat: -25.27, lon: 133.78,  color: 'teal'   },
  { name: 'Bangladesh',   lat: 23.69,  lon: 90.36,   color: 'orange' },
  { name: 'UAE',          lat: 23.42,  lon: 53.85,   color: 'teal'   },
  { name: 'Saudi Arabia', lat: 23.89,  lon: 45.08,   color: 'orange' },
  { name: 'Kuwait',       lat: 29.31,  lon: 47.48,   color: 'teal'   },
  { name: 'Turkey',       lat: 38.96,  lon: 35.24,   color: 'orange' },
  { name: 'Brazil',       lat: -14.24, lon: -51.93,  color: 'teal'   },
  { name: 'Kenya',        lat: -0.02,  lon: 37.91,   color: 'orange' },
  { name: 'USA',          lat: 37.09,  lon: -95.71,  color: 'teal'   },
  { name: 'Vietnam',      lat: 14.06,  lon: 108.28,  color: 'orange' },
  { name: 'Malaysia',     lat: 4.21,   lon: 101.98,  color: 'teal'   },
];

// ─── Dimensions ───────────────────────────────────────────────────────────────

const W = 960;
const H = 500;

// ─── Component ────────────────────────────────────────────────────────────────

interface GeoFeature {
  type: string;
  geometry: GeoPermissibleObjects;
  properties: Record<string, unknown>;
}

export default function WorldMap() {
  const [features, setFeatures] = useState<GeoFeature[]>([]);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Fetch real Natural Earth TopoJSON and convert to GeoJSON features
  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then((topo: Topology) => {
        const col = feature(
          topo,
          topo.objects.countries as GeometryCollection
        );
        setFeatures((col as unknown as { features: GeoFeature[] }).features);
      })
      .catch(console.error);
  }, []);

  // Projection & path generator (memoised — never changes)
  const { pathGen, project } = useMemo(() => {
    const proj = geoNaturalEarth1().scale(153).translate([W / 2, H / 2]);
    return {
      pathGen: geoPath(proj),
      project: (lon: number, lat: number) => {
        const pt = proj([lon, lat]);
        return pt ? { x: pt[0], y: pt[1] } : null;
      },
    };
  }, []);

  // Pre-project all pin positions
  const pins = useMemo(
    () => PINS.map(p => ({ ...p, pos: project(p.lon, p.lat) })),
    [project]
  );

  const handleEnter = (e: React.MouseEvent<SVGGElement>, name: string) => {
    const svg = svgRef.current;
    if (!svg) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const sp = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    setTooltip({ name, x: sp.x, y: sp.y });
  };

  return (
    <div className="relative w-full h-full" aria-label="World map">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          <radialGradient id="wm-og" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0.6" />
          </radialGradient>
          <radialGradient id="wm-tg" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.6" />
          </radialGradient>
          <filter id="wm-glo" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="wm-ocean" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a1525" />
            <stop offset="100%" stopColor="#060e1a" />
          </linearGradient>
          <pattern id="wm-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="0.5" cy="0.5" r="0.55" fill="rgba(14,165,233,0.1)" />
          </pattern>
        </defs>

        {/* Ocean */}
        <rect width={W} height={H} fill="url(#wm-ocean)" />
        <rect width={W} height={H} fill="url(#wm-dots)" />

        {/* Country land masses — real Natural Earth shapes */}
        {features.map((f, i) => (
          <path
            key={i}
            d={pathGen(f.geometry) ?? ''}
            fill="#1a2e42"
            stroke="rgba(14,165,233,0.22)"
            strokeWidth="0.45"
            strokeLinejoin="round"
          />
        ))}

        {/* Loading indicator */}
        {features.length === 0 && (
          <text x={W / 2} y={H / 2} textAnchor="middle"
            fill="rgba(14,165,233,0.35)" fontSize="13"
            fontFamily="Inter, sans-serif">
            Loading map data…
          </text>
        )}

        {/* Graticule: lat lines */}
        {[-60, -30, 0, 30, 60].map(lat => {
          const pts = Array.from({ length: 73 }, (_, k) => project(-180 + k * 5, lat))
            .filter(Boolean)
            .map(p => `${p!.x},${p!.y}`)
            .join(' ');
          return pts ? (
            <polyline key={`lat${lat}`} points={pts} fill="none"
              stroke={lat === 0 ? 'rgba(14,165,233,0.16)' : 'rgba(14,165,233,0.07)'}
              strokeWidth={lat === 0 ? '0.8' : '0.5'}
              strokeDasharray={lat === 0 ? '4 7' : '2 12'} />
          ) : null;
        })}

        {/* Graticule: lon lines */}
        {[-120, -60, 0, 60, 120].map(lon => {
          const pts = Array.from({ length: 33 }, (_, k) => project(lon, -80 + k * 5))
            .filter(Boolean)
            .map(p => `${p!.x},${p!.y}`)
            .join(' ');
          return pts ? (
            <polyline key={`lon${lon}`} points={pts} fill="none"
              stroke="rgba(14,165,233,0.07)" strokeWidth="0.5" strokeDasharray="2 12" />
          ) : null;
        })}

        {/* Connection lines from India to every other pin */}
        {(() => {
          const hub = pins.find(p => p.name === 'India');
          if (!hub?.pos) return null;
          return pins
            .filter(p => p.name !== 'India' && p.pos)
            .map((p, i) => {
              const x1 = hub.pos!.x, y1 = hub.pos!.y;
              const x2 = p.pos!.x, y2 = p.pos!.y;
              const mx = (x1 + x2) / 2;
              const my = Math.min(y1, y2) - Math.hypot(x2 - x1, y2 - y1) * 0.2;
              const d = `M${x1},${y1} Q${mx},${my} ${x2},${y2}`;
              const delay = (i * 0.3) % 4;
              const dur = 3 + (i % 3);
              const col = p.color === 'orange' ? '#F97316' : '#0EA5E9';
              return (
                <g key={`c-${p.name}`}>
                  <path d={d} fill="none" stroke="rgba(14,165,233,0.14)"
                    strokeWidth="0.6" strokeDasharray="4 8" />
                  <path d={d} fill="none" stroke={col}
                    strokeWidth="1.6" strokeOpacity="0.75"
                    strokeDasharray="28 600" strokeDashoffset="600"
                    style={{ animation: `wm-travel ${dur}s linear ${delay}s infinite` }} />
                </g>
              );
            });
        })()}

        {/* Country dots */}
        {pins.map((p, i) => {
          if (!p.pos) return null;
          const { x, y } = p.pos;
          const isOrange = p.color === 'orange';
          const col = isOrange ? '#F97316' : '#0EA5E9';
          const delay = (i * 0.32) % 2.5;
          return (
            <g key={p.name}
              onMouseEnter={e => handleEnter(e, p.name)}
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: 'pointer' }}
              role="button"
              aria-label={p.name}
            >
              {[0, 0.85].map((d, ri) => (
                <circle key={ri} cx={x} cy={y} r={5}
                  fill="none" stroke={col}
                  strokeWidth={ri === 0 ? 1.2 : 0.8}
                  opacity="0"
                  style={{
                    animation: `wm-pulse 2.6s ease-out ${delay + d}s infinite`,
                    transformOrigin: `${x}px ${y}px`,
                  }}
                />
              ))}
              <circle cx={x} cy={y} r={4.5}
                fill={`url(#${isOrange ? 'wm-og' : 'wm-tg'})`}
                filter="url(#wm-glo)" />
              <circle cx={x} cy={y} r={1.8} fill="white" opacity="0.9" />
            </g>
          );
        })}

        {/* Tooltip */}
        {tooltip && (() => {
          const lw = tooltip.name.length * 7.2 + 20;
          const tx = Math.min(Math.max(tooltip.x, lw / 2 + 6), W - lw / 2 - 6);
          const ty = tooltip.y - 16;
          return (
            <g pointerEvents="none">
              <rect x={tx - lw / 2} y={ty - 17} width={lw} height={21} rx={4}
                fill="rgba(6,14,26,0.95)"
                stroke="rgba(14,165,233,0.55)" strokeWidth="0.8" />
              <text x={tx} y={ty - 2} textAnchor="middle"
                fill="white" fontSize="9.5"
                fontFamily="Inter, sans-serif" fontWeight="600">
                {tooltip.name}
              </text>
            </g>
          );
        })()}
      </svg>

      <style>{`
        @keyframes wm-pulse {
          0%   { r: 5;  opacity: 0.9; }
          80%  { r: 18; opacity: 0;   }
          100% { r: 5;  opacity: 0;   }
        }
        @keyframes wm-travel {
          0%   { stroke-dashoffset: 600; opacity: 0;   }
          8%   { opacity: 0.85; }
          92%  { opacity: 0.85; }
          100% { stroke-dashoffset: 0;   opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
