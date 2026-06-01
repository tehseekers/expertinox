import { Mail, Phone, MapPin, Globe, Linkedin, Twitter, Printer } from 'lucide-react';

const products = ['Stainless Steel Coils', 'Stainless Steel Sheets', 'Stainless Steel Bars', 'Stainless Steel Pipes'];
const markets = ['India', 'Indonesia', 'Philippines', 'Thailand', 'UAE', 'Saudi Arabia', 'Malaysia', 'Vietnam', 'Australia', 'South Korea', 'Turkey', 'Brazil', 'USA', 'Kenya', 'Kuwait', 'Bangladesh'];
const quickLinks = ['About Us', 'Why Choose Us', 'Contact', 'Privacy Policy', 'Terms of Service'];

export default function Footer() {
  return (
    <footer className="relative" style={{ background: '#060a14', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(14,165,233,0.4), rgba(212,175,55,0.3), rgba(249,115,22,0.2), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="mb-4 -ml-1">
              <img
                src="/Logo.png"
                alt="Expertinox"
                className="h-24 w-auto"
              />
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Premium stainless steel trading, connecting mills and manufacturers across 30+ countries with reliability at every step.
            </p>
            <div className="text-white/30 text-xs mb-5 space-y-1">
              <div>UEN: 201835835W</div>
              <div>Singapore-registered · Est. 2018</div>
            </div>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Globe].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-5">Products</h4>
            <ul className="space-y-2.5">
              {products.map((s) => (
                <li key={s}>
                  <a href="#products" className="text-white/40 hover:text-white text-sm transition-colors duration-200">{s}</a>
                </li>
              ))}
            </ul>
            <h4 className="font-bold text-white text-sm tracking-widest uppercase mt-8 mb-5">Company</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l}>
                  <a href="#" className="text-white/40 hover:text-white text-sm transition-colors duration-200">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-5">Markets</h4>
            <div className="grid grid-cols-2 gap-x-2 gap-y-2">
              {markets.map((c) => (
                <span key={c} className="text-white/40 text-xs">{c}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm tracking-widest uppercase mb-5">Contact</h4>
            <div className="space-y-4">
              {[
              { icon: MapPin,   text: '60 Paya Lebar Road, Unit 04-15, Paya Lebar Square, Singapore – 409051' },
                { icon: Phone,   text: '+65 6904 9541', href: 'tel:+6569049541' },
                { icon: Printer, text: '+65 6722 0740', label: 'Fax' },
                { icon: Mail,    text: 'info@expertinox.com', href: 'mailto:info@expertinox.com' },
              ].map(({ icon: Icon, text, href, label }) => (
                <div key={text} className="flex items-start gap-2.5">
                  <Icon size={13} className="text-brand-teal mt-0.5 flex-shrink-0" />
                  <span className="text-white/40 text-xs leading-relaxed">
                    {label && <span className="text-white/25 mr-1">{label}:</span>}
                    {href
                      ? <a href={href} className="hover:text-white transition-colors">{text}</a>
                      : text
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} Expertinox Ventures Pte Ltd. All rights reserved.
          </p>
          <p className="text-white/15 text-xs">
            Singapore · UEN 201835835W
          </p>
        </div>
      </div>
    </footer>
  );
}
