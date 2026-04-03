import { useEffect, useRef, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CreditCard,
  Smartphone,
  Clock,
  CheckCircle2,
  Send,
  MessageCircle,
  Briefcase,
  DollarSign,
  FileText,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const WHATSAPP_NUMBER = '254118407026'; // Full number format with country code
const EMAIL = 'info@steffcloud.online';

const services = [
  'AI Automation',
  'Website Development',
  'Branding',
  'Graphics Design',
  'Electronics',
  'Mobile Apps',
  'E-commerce',
  'Digital Marketing',
  'Other',
];

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    project: '',
    budget: '',
    service: '',
    description: '',
  });

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

  // Send project inquiry to WhatsApp
  const sendInquiryToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inquiryData.name || !inquiryData.project || !inquiryData.service) {
      toast.error('Please fill in all required fields');
      return;
    }

    const logoUrl = `${window.location.origin}/logo.jpg`;
    
    let message = `*Steff Cloud Project Inquiry*\n\n`;
    message += `👤 *Name:* ${inquiryData.name}\n`;
    message += `📋 *Project:* ${inquiryData.project}\n`;
    message += `💰 *Budget:* ${inquiryData.budget || 'Not specified'}\n`;
    message += `🔧 *Service:* ${inquiryData.service}\n\n`;
    
    if (inquiryData.description) {
      message += `📝 *Description:*\n${inquiryData.description}\n\n`;
    }
    
    message += `Logo: ${logoUrl}\n\n`;
    message += `Please contact me for more details. Thank you! 🧡`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast.success('Inquiry sent to WhatsApp!');
    
    // Reset form
    setInquiryData({
      name: '',
      project: '',
      budget: '',
      service: '',
      description: '',
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-steff-cream"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orange-blob w-[600px] h-[600px] -top-64 -right-64 opacity-20" />
        <div className="orange-blob w-[500px] h-[500px] -bottom-48 -left-48 opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 bg-steff-orange/10 rounded-full mb-6">
            <MessageSquare className="w-4 h-4 text-steff-orange" />
            <span className="text-sm font-medium text-steff-orange">
              Get In Touch
            </span>
          </div>
          <h2 className="reveal opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-steff-black mb-6">
            Let's Start Your
            <span className="text-gradient-orange"> Project</span>
          </h2>
          <p className="reveal opacity-0 stagger-2 text-lg text-steff-gray">
            Ready to transform your digital presence? Reach out and let's discuss
            how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Details */}
            <div className="reveal opacity-0 stagger-3 bg-white rounded-2xl p-6 shadow-orange">
              <h3 className="text-xl font-bold text-steff-black mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-steff-cream transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-steff-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-steff-orange group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5 text-steff-orange group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-steff-gray">Phone</div>
                    <div className="font-medium text-steff-black group-hover:text-steff-orange transition-colors">
                      +{WHATSAPP_NUMBER}
                    </div>
                  </div>
                </a>
                
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-steff-cream transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-steff-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-steff-orange group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-steff-orange group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-steff-gray">Email</div>
                    <div className="font-medium text-steff-black group-hover:text-steff-orange transition-colors">
                      {EMAIL}
                    </div>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-steff-cream transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5 text-green-500 group-hover:text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-steff-gray">WhatsApp</div>
                    <div className="font-medium text-steff-black group-hover:text-green-500 transition-colors">
                      Chat with us
                    </div>
                  </div>
                </a>
                
                <div className="flex items-start gap-4 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-steff-orange/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-steff-orange" />
                  </div>
                  <div>
                    <div className="text-sm text-steff-gray">Location</div>
                    <div className="font-medium text-steff-black">
                      Nairobi, Kenya
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-steff-orange/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-steff-orange" />
                  </div>
                  <div>
                    <div className="text-sm text-steff-gray">Working Hours</div>
                    <div className="font-medium text-steff-black">
                      Mon - Sat: 8AM - 6PM
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="reveal opacity-0 stagger-4 bg-white rounded-2xl p-6 shadow-orange">
              <h3 className="text-xl font-bold text-steff-black mb-2">
                Payment Details
              </h3>
              <p className="text-sm text-steff-gray mb-6">
                Convenient payment options for our services
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-steff-cream rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-steff-black">
                      Lipa Na M-Pesa
                    </div>
                    <div className="text-sm text-steff-gray">
                      Buy Goods Till: 3401106
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-steff-cream rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-steff-black">
                      Bank Transfer
                    </div>
                    <div className="text-sm text-steff-gray">
                      Available on request
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Promise */}
            <div className="reveal opacity-0 stagger-5 bg-gradient-to-r from-steff-orange to-steff-orange-dark rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-6 h-6" />
                <h3 className="text-lg font-bold">Fast Response</h3>
              </div>
              <p className="text-white/90 text-sm">
                We typically respond to all inquiries within 24 hours. For urgent
                matters, please call or WhatsApp us directly.
              </p>
            </div>
          </div>

          {/* Project Inquiry Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={sendInquiryToWhatsApp}
              className="reveal opacity-0 stagger-4 bg-white rounded-2xl p-6 lg:p-8 shadow-orange"
            >
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-steff-orange" />
                <h3 className="text-xl font-bold text-steff-black">
                  Project Inquiry
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-steff-black flex items-center gap-1">
                    <User className="w-4 h-4" />
                    Full Name <span className="text-steff-orange">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={inquiryData.name}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, name: e.target.value })
                    }
                    required
                    className="border-steff-orange/20 focus:border-steff-orange focus:ring-steff-orange/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project" className="text-steff-black flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    Project Name <span className="text-steff-orange">*</span>
                  </Label>
                  <Input
                    id="project"
                    placeholder="What project do you have?"
                    value={inquiryData.project}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, project: e.target.value })
                    }
                    required
                    className="border-steff-orange/20 focus:border-steff-orange focus:ring-steff-orange/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-steff-black flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Budget (KSH)
                  </Label>
                  <Input
                    id="budget"
                    type="text"
                    placeholder="e.g. 50,000 - 100,000"
                    value={inquiryData.budget}
                    onChange={(e) =>
                      setInquiryData({ ...inquiryData, budget: e.target.value })
                    }
                    className="border-steff-orange/20 focus:border-steff-orange focus:ring-steff-orange/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service" className="text-steff-black flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Service Needed <span className="text-steff-orange">*</span>
                  </Label>
                  <Select
                    value={inquiryData.service}
                    onValueChange={(value) =>
                      setInquiryData({ ...inquiryData, service: value })
                    }
                  >
                    <SelectTrigger className="border-steff-orange/20 focus:border-steff-orange focus:ring-steff-orange/20">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="description" className="text-steff-black flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Project Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell us more about your project requirements, timeline, and any specific needs..."
                  rows={5}
                  value={inquiryData.description}
                  onChange={(e) =>
                    setInquiryData({ ...inquiryData, description: e.target.value })
                  }
                  className="border-steff-orange/20 focus:border-steff-orange focus:ring-steff-orange/20 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-6 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Inquiry via WhatsApp
              </Button>

              <p className="text-center text-sm text-steff-gray mt-4">
                Your inquiry will be sent to our WhatsApp: +{WHATSAPP_NUMBER}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
