import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Why Us',   href: '#services' },
  { label: 'About',    href: '#about' },
  { label: 'Contact',  href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'glass border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo + Wordmark */}
          <a href="#" className="flex items-center gap-3" aria-label="Expertinox Home">
            <img
              src="/expertinox/Logo.png"
              alt="Expertinox"
              className="h-10 w-auto"
              style={{ mixBlendMode: 'screen', filter: 'brightness(1.1) contrast(1.05)' }}
            />
            <div className="flex flex-col leading-none">
              <span className="font-black tracking-[0.08em] text-white" style={{ fontSize: '1.1rem', letterSpacing: '0.08em' }}>
                EXPERTINOX
              </span>
              <span className="font-semibold tracking-[0.2em] uppercase" style={{ fontSize: '0.52rem', color: '#e8a020', letterSpacing: '0.2em' }}>
                RELIABILITY PERSONIFIED
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" className="btn-primary text-sm py-2.5 px-5">
              Get Started
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="glass border-t border-white/5 px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2.5 text-sm font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary text-sm mt-2 justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
