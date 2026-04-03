import { toast } from 'sonner';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  MessageCircle,
} from 'lucide-react';

const WHATSAPP_NUMBER = '254118407026'; // Full number format with country code
const EMAIL = 'info@steffcloud.online';

// Social media links
const socialLinks = [
  { 
    icon: Facebook, 
    href: 'https://www.facebook.com/share/1HiawsDA31/', 
    label: 'Facebook',
    external: true 
  },
  { 
    icon: Instagram, 
    href: 'https://instagram.com/steffcloud', 
    label: 'Instagram',
    external: true 
  },
  { 
    icon: Twitter, 
    href: 'https://twitter.com/steffcloud', 
    label: 'Twitter',
    external: true 
  },
  { 
    icon: Linkedin, 
    href: 'https://linkedin.com/company/steffcloud', 
    label: 'LinkedIn',
    external: true 
  },
  { 
    icon: Youtube, 
    href: 'https://youtube.com/@steffcloud', 
    label: 'YouTube',
    external: true 
  },
  { 
    icon: MessageCircle, 
    href: 'https://tiktok.com/@cloud.steff', 
    label: 'TikTok',
    external: true 
  },
];

const footerLinks = {
  services: [
    { name: 'AI Automation', href: '#services' },
    { name: 'Web Development', href: '#services' },
    { name: 'Branding', href: '#services' },
    { name: 'Graphics Design', href: '#services' },
    { name: 'Electronics', href: '#electronics' },
  ],
  company: [
    { name: 'About Us', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
    { name: 'Careers', href: '#' },
  ],
  support: [
    { name: 'FAQ', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Support', href: '#contact' },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    if (href === '#') {
      toast.info('Coming soon!', {
        description: 'This feature is under development.',
      });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (e: React.MouseEvent, link: typeof socialLinks[0]) => {
    if (!link.external) {
      e.preventDefault();
      toast.info(`${link.label} coming soon!`, {
        description: 'Follow us on social media.',
      });
    }
  };

  return (
    <footer className="relative bg-steff-black text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-steff-orange/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-steff-orange/5 rounded-full translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#home');
                }}
                className="flex items-center gap-2 mb-6 group"
              >
                <img
                  src="/logo.jpg"
                  alt="Steff Cloud"
                  className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
                />
                <span className="text-xl font-bold">
                  Steff<span className="text-steff-orange">Cloud</span>
                </span>
              </a>
              <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
                Your trusted partner for AI automation, web development, branding,
                graphics design, and electronics solutions. Let's build something
                amazing together.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-steff-orange transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>+{WHATSAPP_NUMBER}</span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 text-gray-400 hover:text-steff-orange transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>{EMAIL}</span>
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 hover:text-steff-orange transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 hover:text-steff-orange transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-gray-400 hover:text-steff-orange transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-gray-400 text-sm text-center sm:text-left">
                © {new Date().getFullYear()} Steff Cloud. All rights reserved.
                <span className="text-steff-orange ml-1">estd 2026</span>
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.external ? '_blank' : undefined}
                    rel={social.external ? 'noopener noreferrer' : undefined}
                    onClick={(e) => handleSocialClick(e, social)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-steff-orange hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full bg-steff-orange flex items-center justify-center text-white hover:bg-steff-orange-dark transition-colors"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
