import { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';

type FormData = {
  name: string;
  company: string;
  email: string;
  message: string;
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormData>({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const els = el.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    els.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1400);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0F172A 0%, #0d0a1a 50%, #0F172A 100%)' }}>

      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.4), rgba(124,58,237,0.4), transparent)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, rgba(14,165,233,0.06) 50%, transparent 70%)', filter: 'blur(40px)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top banner */}
        <div className="text-center mb-16 reveal">
          <div className="section-pill mb-5 mx-auto inline-flex">
            <Mail size={12} className="text-brand-teal" />
            Get In Touch
          </div>
          <h2 className="font-black text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4">
            <span className="text-white">Ready to Go </span>
            <span className="gradient-text">Global?</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Tell us about your business goals and we'll connect you with the right team in your target markets.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div className="reveal-left">
            <h3 className="font-bold text-white text-2xl mb-2">Let's build something together.</h3>
            <p className="text-white/50 text-base leading-relaxed mb-10">
              Whether you're exploring a new market, optimizing your supply chain, or seeking a trusted trade partner — our team of specialists is ready to engage.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: MapPin, label: 'Headquarters', value: '60 Paya Lebar Road, Unit 04-15, Paya Lebar Square, Singapore – 409051' },
                { icon: Phone, label: 'Phone', value: '+65 6904 9541', href: 'tel:+6569049541' },
                { icon: Mail, label: 'Email', value: 'info@expertinox.com', href: 'mailto:info@expertinox.com' },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.2)' }}>
                    <Icon size={15} className="text-brand-teal" />
                  </div>
                  <div>
                    <div className="text-white/35 text-xs uppercase tracking-widest font-medium mb-0.5">{label}</div>
                    {href
                      ? <a href={href} className="text-white/75 text-sm hover:text-white transition-colors">{value}</a>
                      : <div className="text-white/75 text-sm">{value}</div>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient badge */}
            <div className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(124,58,237,0.12) 100%)', border: '1px solid rgba(249,115,22,0.2)' }}>
              <div className="text-2xl">🇸🇬</div>
              <div>
                <div className="font-bold text-white text-sm">Singapore Registered</div>
                <div className="text-white/45 text-xs">UEN: 201827423C · Est. 2018</div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="reveal-right">
            <div className="glass-strong rounded-2xl p-7 lg:p-8">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)' }}>
                    <CheckCircle2 size={28} className="text-brand-teal" />
                  </div>
                  <h3 className="font-bold text-white text-xl mb-2">Message Received</h3>
                  <p className="text-white/50 text-sm max-w-xs mb-6">
                    Thank you for reaching out. Our team will respond within one business day.
                  </p>
                  <button className="text-brand-teal text-sm hover:text-white transition-colors"
                    onClick={() => { setSubmitted(false); setForm({ name: '', company: '', email: '', message: '' }); }}>
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-bold text-white text-lg mb-5">Send us a message</h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name" name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                    <Field label="Company" name="company" type="text" placeholder="Company name" value={form.company} onChange={handleChange} />
                  </div>
                  <Field label="Email Address" name="email" type="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required />

                  <div>
                    <label className="block text-white/40 text-xs font-semibold tracking-widest uppercase mb-1.5">Message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Describe your requirements, target markets, or questions..."
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 resize-none outline-none transition-all duration-200"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(14,165,233,0.5)')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center text-sm disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type, placeholder, value, onChange, required }: {
  label: string; name: string; type: string; placeholder: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-white/40 text-xs font-semibold tracking-widest uppercase mb-1.5">{label}</label>
      <input
        type={type} name={name} placeholder={placeholder} value={value}
        onChange={onChange} required={required}
        className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
        onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(14,165,233,0.5)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
      />
    </div>
  );
}