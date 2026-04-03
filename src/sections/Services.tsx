import { useEffect, useRef, useState } from 'react';
import {
  Smartphone,
  Palette,
  Sparkles,
  Code,
  Settings,
  Bot,
  FolderOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Send,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const WHATSAPP_NUMBER = '254118407026'; // Full number format with country code

interface Package {
  name: string;
  price: number;
  vat: number;
  total: number;
  billing: string;
  popular?: boolean;
  description: string;
  features: string[];
}

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  packages: Package[];
}

const services: Service[] = [
  {
    id: 'smm',
    icon: Smartphone,
    title: 'Social Media Management',
    description: 'Account management, content creation & growth support.',
    packages: [
      {
        name: 'Starter (1 Account)',
        price: 3000,
        vat: 480,
        total: 3480,
        billing: 'Monthly',
        description: 'Best for: Small businesses just starting out',
        features: [
          '10 photo posts/month',
          '5 short videos/reels',
          'Caption & hashtag writing',
          'Comment replying',
          '1 platform (FB/IG/TikTok/X)',
          'Basic performance summary',
        ],
      },
      {
        name: 'Growth (2 Accounts)',
        price: 5500,
        vat: 880,
        total: 6380,
        billing: 'Monthly',
        popular: true,
        description: 'Best for: Growing brands needing more reach',
        features: [
          '15 photo posts/month',
          '7 videos/reels',
          'Caption, hashtags & stories',
          'Comment replying & DM handling',
          '2 platforms managed',
          'Audience interaction strategy',
          'Monthly analytics report',
        ],
      },
      {
        name: 'Pro (3 Accounts)',
        price: 7500,
        vat: 1200,
        total: 8700,
        billing: 'Monthly',
        description: 'Best for: Established brands wanting full presence',
        features: [
          '20 photo posts/month',
          '10 videos/reels',
          'Full content timetable (init)',
          'All interactions & DM handling',
          '3 platforms fully managed',
          'Influencer/collaboration support',
          'Monthly performance report',
          'Content strategy review',
        ],
      },
    ],
  },
  {
    id: 'graphics',
    icon: Palette,
    title: 'Graphics Design',
    description: 'Social media creatives, print materials & digital assets.',
    packages: [
      {
        name: 'Basic (Starter Pack)',
        price: 2500,
        vat: 400,
        total: 2900,
        billing: 'One-time',
        description: 'Best for: One-off needs & small promos',
        features: [
          '5 social media graphics',
          '1 flyer or poster',
          'Brand color application',
          '1 revision round',
          'JPEG/PNG delivery',
          '3–5 day turnaround',
        ],
      },
      {
        name: 'Standard (Business Pack)',
        price: 6500,
        vat: 1040,
        total: 7540,
        billing: 'One-time',
        popular: true,
        description: 'Best for: Businesses needing complete print + digital',
        features: [
          '12 social media graphics',
          '2 flyers/posters',
          'Business card design',
          'Letterhead design',
          '2 revision rounds',
          'Print-ready + digital files',
          'Source files included',
        ],
      },
      {
        name: 'Premium (Full Creative)',
        price: 14000,
        vat: 2240,
        total: 16240,
        billing: 'One-time',
        description: 'Best for: Full rebrand or launch campaigns',
        features: [
          '20+ social media graphics',
          'Full stationery set',
          'Email signature design',
          'Banner/signage design',
          'Branded templates (Canva)',
          'Unlimited revisions',
          'All source files',
          'Priority delivery',
        ],
      },
    ],
  },
  {
    id: 'branding',
    icon: Sparkles,
    title: 'Branding',
    description: 'Brand identity, positioning & visual guidelines.',
    packages: [
      {
        name: 'Identity Starter',
        price: 8000,
        vat: 1280,
        total: 9280,
        billing: 'One-time',
        description: 'Best for: New businesses needing a logo',
        features: [
          'Logo design (3 concepts)',
          'Brand color palette',
          'Typography selection',
          '2 revision rounds',
          'PNG/SVG/PDF formats',
          'Basic brand usage guide',
        ],
      },
      {
        name: 'Brand Kit',
        price: 18000,
        vat: 2880,
        total: 20880,
        billing: 'One-time',
        popular: true,
        description: 'Best for: Businesses ready for professional presence',
        features: [
          'Logo (primary + variants)',
          'Full brand color system',
          'Typography hierarchy',
          'Business card design',
          'Letterhead & email sig',
          'Social media profile kit',
          'Brand guidelines PDF',
          '3 revision rounds',
        ],
      },
      {
        name: 'Full Brand Strategy',
        price: 30000,
        vat: 4800,
        total: 34800,
        billing: 'One-time',
        description: 'Best for: New companies or full rebrands',
        features: [
          'Brand strategy & positioning',
          'Logo + full identity system',
          'Competitor brand analysis',
          'Tone of voice & messaging',
          'Complete brand guidelines',
          'Social media brand kit',
          'Pitch deck template',
          'Stationery + print materials',
          'Unlimited revisions',
        ],
      },
    ],
  },
  {
    id: 'website',
    icon: Code,
    title: 'Software & Website Creation',
    description: 'Websites, web apps, M-Pesa integrations & custom builds.',
    packages: [
      {
        name: 'Landing Page',
        price: 15000,
        vat: 2400,
        total: 17400,
        billing: 'One-time',
        description: 'Best for: Small businesses needing online presence',
        features: [
          '5-page responsive website',
          'Mobile-optimized design',
          'Contact form setup',
          'Google Maps embed',
          'Basic SEO setup',
          'Social media links',
          '1 month support',
        ],
      },
      {
        name: 'Business Website',
        price: 35000,
        vat: 5600,
        total: 40600,
        billing: 'One-time',
        popular: true,
        description: 'Best for: Businesses needing full functionality',
        features: [
          '10+ page website',
          'M-Pesa payment integration',
          'WhatsApp chat widget',
          'Blog/news section',
          'Email newsletter setup',
          'Google Analytics',
          'Admin dashboard',
          '3 months support',
        ],
      },
      {
        name: 'Custom Web App',
        price: 70000,
        vat: 11200,
        total: 81200,
        billing: 'Project-based',
        description: 'Best for: SACCOs, agencies, complex systems',
        features: [
          'Custom web application',
          'User roles & authentication',
          'Database design',
          'M-Pesa/payment gateway',
          'Admin + client dashboards',
          'API integrations',
          'PWA (works offline)',
          '6 months support',
          'Deployment & hosting setup',
        ],
      },
    ],
  },
  {
    id: 'system',
    icon: Settings,
    title: 'System Creation',
    description: 'Workflows, operations design & business process setup.',
    packages: [
      {
        name: 'Workflow Mapping',
        price: 8000,
        vat: 1280,
        total: 9280,
        billing: 'One-time',
        description: 'Best for: Small teams wanting structured ops',
        features: [
          'Business process mapping',
          '2 workflow diagrams',
          'SOP document (1 dept)',
          'Process bottleneck audit',
          'Recommended tools list',
          '1 review session',
        ],
      },
      {
        name: 'Ops System',
        price: 22000,
        vat: 3520,
        total: 25520,
        billing: 'One-time',
        popular: true,
        description: 'Best for: Growing companies standardizing ops',
        features: [
          'Full operations design',
          '5+ workflow diagrams',
          'SOP docs (all departments)',
          'Notion/Trello workspace setup',
          'Reporting templates',
          'Staff onboarding doc',
          '2 review sessions',
        ],
      },
      {
        name: 'Business OS',
        price: 45000,
        vat: 7200,
        total: 52200,
        billing: 'One-time',
        description: 'Best for: Companies building scalable operations',
        features: [
          'End-to-end business system',
          'All departments mapped',
          'Notion HQ workspace',
          'CRM setup (Zoho/HubSpot)',
          'Financial tracking system',
          'HR & staff management',
          'Automation integrations',
          '1 month handover support',
        ],
      },
    ],
  },
  {
    id: 'ai',
    icon: Bot,
    title: 'AI Automation',
    description: 'Automations, chatbots & AI-assisted business operations.',
    packages: [
      {
        name: 'AutoFlow',
        price: 8500,
        vat: 1360,
        total: 9860,
        billing: 'One-time',
        description: 'Best for: Teams wasting time on manual tasks',
        features: [
          '1 automation flow (Make/Zapier)',
          'WhatsApp/email trigger setup',
          'Data routing & alerts',
          'Testing & documentation',
          '1 week support',
        ],
      },
      {
        name: 'SmartBiz',
        price: 20000,
        vat: 3200,
        total: 23200,
        billing: 'One-time',
        popular: true,
        description: 'Best for: Businesses wanting hands-free operations',
        features: [
          '3 automation flows',
          'AI chatbot (WhatsApp/web)',
          'Lead capture + follow-up',
          'Auto-reports & notifications',
          'CRM auto-updates',
          '1 month support',
        ],
      },
      {
        name: 'AI Enterprise',
        price: 40000,
        vat: 6400,
        total: 46400,
        billing: 'Project-based',
        description: 'Best for: Forward-thinking businesses going AI-first',
        features: [
          'Unlimited automation flows',
          'AI chatbot (multi-platform)',
          'AI content generation setup',
          'Document processing automation',
          'Custom AI workflows',
          'Staff AI tools training',
          'Dashboard & monitoring',
          '3 months support',
        ],
      },
    ],
  },
  {
    id: 'portfolio',
    icon: FolderOpen,
    title: 'Portfolio Creation',
    description: 'Case studies, proof-of-work & professional showcase.',
    packages: [
      {
        name: 'Case Study Pack',
        price: 4500,
        vat: 720,
        total: 5220,
        billing: 'One-time',
        description: 'Best for: Freelancers & small agencies',
        features: [
          '2 written case studies',
          'Before/after documentation',
          'Results & metrics write-up',
          'PDF portfolio format',
          'Branded design',
        ],
      },
      {
        name: 'Portfolio Kit',
        price: 9000,
        vat: 1440,
        total: 10440,
        billing: 'One-time',
        popular: true,
        description: 'Best for: Agencies pitching to corporate clients',
        features: [
          '5 detailed case studies',
          'Credentials deck (PPT)',
          'Client testimonials layout',
          'Proof-of-work gallery',
          'Branded PDF + web version',
          'LinkedIn optimization tips',
        ],
      },
      {
        name: 'Full Portfolio Site',
        price: 20000,
        vat: 3200,
        total: 23200,
        billing: 'One-time',
        description: 'Best for: Agencies building serious credibility',
        features: [
          'Portfolio website (custom)',
          '10 case studies published',
          'Services & pricing page',
          'Contact & inquiry form',
          'Client testimonials section',
          'Blog/updates section',
          'SEO optimized',
          '3 months hosting included',
        ],
      },
    ],
  },
];

// Overview table data
const overviewData = [
  { service: '📲 Social Media Management', starter: 3000, standard: 5500, premium: 7500, billing: 'Monthly' },
  { service: '🎨 Graphics Design', starter: 2500, standard: 6500, premium: 14000, billing: 'One-time' },
  { service: '✦ Branding', starter: 8000, standard: 18000, premium: 30000, billing: 'One-time' },
  { service: '💻 Software & Website', starter: 15000, standard: 35000, premium: 70000, billing: 'One-time/Project' },
  { service: '⚙️ System Creation', starter: 8000, standard: 22000, premium: 45000, billing: 'One-time' },
  { service: '🤖 AI Automation', starter: 8500, standard: 20000, premium: 40000, billing: 'One-time/Project' },
  { service: '📁 Portfolio Creation', starter: 4500, standard: 9000, premium: 20000, billing: 'One-time' },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [showOverview, setShowOverview] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price: number) => {
    return `KSH ${price.toLocaleString()}`;
  };

  const sendServiceInquiry = (serviceTitle: string, packageName: string, price: number) => {
    const logoUrl = `${window.location.origin}/logo.jpg`;
    const totalWithVat = Math.round(price * 1.16);
    
    let message = `*Steff Cloud Service Inquiry*\n\n`;
    message += `🔧 *Service:* ${serviceTitle}\n`;
    message += `📦 *Package:* ${packageName}\n`;
    message += `💰 *Price:* ${formatPrice(price)} (excl. VAT)\n`;
    message += `💰 *Total with VAT (16%):* ${formatPrice(totalWithVat)}\n\n`;
    message += `Logo: ${logoUrl}\n\n`;
    message += `I'm interested in this service. Please contact me for more details. Thank you! 🧡`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    toast.success('Service inquiry sent to WhatsApp!');
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-white"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orange-blob w-[600px] h-[600px] -top-64 -right-64 opacity-15" />
        <div className="orange-blob w-[500px] h-[500px] -bottom-48 -left-48 opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 bg-steff-orange/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-steff-orange" />
            <span className="text-sm font-medium text-steff-orange">
              Services & Pricing
            </span>
          </div>
          <h2 className="reveal opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-steff-black mb-6">
            Our<span className="text-gradient-orange"> Services</span>
          </h2>
          <p className="reveal opacity-0 stagger-2 text-lg text-steff-gray mb-4">
            All prices in Kenyan Shillings (KSH) · 16% VAT applicable
          </p>
          <p className="reveal opacity-0 stagger-3 text-sm text-steff-gray">
            Payment via M-Pesa Till: 3401106 or Bank Transfer
          </p>
        </div>

        {/* Pricing Overview Table */}
        <div className="reveal opacity-0 stagger-3 mb-16">
          <button
            onClick={() => setShowOverview(!showOverview)}
            className="flex items-center gap-2 text-steff-black font-semibold mb-4 hover:text-steff-orange transition-colors"
          >
            {showOverview ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            Quick Price Overview (excl. VAT)
          </button>
          
          {showOverview && (
            <div className="bg-white rounded-2xl shadow-orange overflow-hidden border border-steff-orange/10">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-steff-orange text-white">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold">Service</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Starter</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Standard</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Premium</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold">Billing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {overviewData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-steff-cream/30' : 'bg-white'}>
                        <td className="px-4 py-3 text-sm font-medium text-steff-black">{item.service}</td>
                        <td className="px-4 py-3 text-center text-sm text-steff-gray">{formatPrice(item.starter)}</td>
                        <td className="px-4 py-3 text-center text-sm text-steff-orange font-medium">{formatPrice(item.standard)}</td>
                        <td className="px-4 py-3 text-center text-sm text-steff-gray">{formatPrice(item.premium)}</td>
                        <td className="px-4 py-3 text-center text-xs text-steff-gray">{item.billing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Services Accordion */}
        <div className="space-y-6">
          {services.map((service, serviceIndex) => (
            <div
              key={service.id}
              className="reveal opacity-0 bg-white rounded-2xl shadow-orange border border-steff-orange/10 overflow-hidden"
              style={{ animationDelay: `${(serviceIndex + 4) * 0.1}s` }}
            >
              {/* Service Header */}
              <button
                onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-steff-cream/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-steff-orange to-steff-orange-dark flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-steff-black">{service.title}</h3>
                    <p className="text-sm text-steff-gray">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:block text-sm text-steff-gray">
                    From {formatPrice(service.packages[0].price)}
                  </span>
                  {expandedService === service.id ? (
                    <ChevronUp className="w-6 h-6 text-steff-orange" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-steff-gray" />
                  )}
                </div>
              </button>

              {/* Service Packages */}
              {expandedService === service.id && (
                <div className="p-6 pt-0 border-t border-steff-orange/10">
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    {service.packages.map((pkg, pkgIndex) => (
                      <div
                        key={pkgIndex}
                        className={`relative rounded-xl p-5 ${
                          pkg.popular
                            ? 'bg-gradient-to-br from-steff-orange to-steff-orange-dark text-white'
                            : 'bg-steff-cream'
                        }`}
                      >
                        {pkg.popular && (
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-steff-orange text-xs font-bold rounded-full">
                            Most Popular
                          </div>
                        )}
                        
                        <h4 className={`font-bold text-lg mb-1 ${pkg.popular ? 'text-white' : 'text-steff-black'}`}>
                          {pkg.name}
                        </h4>
                        <p className={`text-xs mb-3 ${pkg.popular ? 'text-white/80' : 'text-steff-gray'}`}>
                          {pkg.description}
                        </p>
                        
                        <div className="mb-4">
                          <div className={`text-2xl font-bold ${pkg.popular ? 'text-white' : 'text-steff-orange'}`}>
                            {formatPrice(pkg.price)}
                          </div>
                          <div className={`text-xs ${pkg.popular ? 'text-white/70' : 'text-steff-gray'}`}>
                            + VAT (16%) = {formatPrice(pkg.total)} · {pkg.billing}
                          </div>
                        </div>

                        <ul className="space-y-2 mb-5">
                          {pkg.features.map((feature, fIndex) => (
                            <li key={fIndex} className={`flex items-start gap-2 text-sm ${pkg.popular ? 'text-white/90' : 'text-steff-gray'}`}>
                              <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-white' : 'text-steff-orange'}`} />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          onClick={() => sendServiceInquiry(service.title, pkg.name, pkg.price)}
                          className={`w-full ${
                            pkg.popular
                              ? 'bg-white text-steff-orange hover:bg-steff-cream'
                              : 'bg-steff-orange text-white hover:bg-steff-orange-dark'
                          } font-medium`}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Inquire on WhatsApp
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="reveal opacity-0 mt-16 text-center">
          <div className="bg-gradient-to-r from-steff-orange to-steff-orange-dark rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Not sure which package?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss your needs and find the perfect solution for your business.
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-steff-orange font-semibold rounded-xl hover:bg-steff-cream transition-colors"
              >
                <Send className="w-5 h-5" />
                Get a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
