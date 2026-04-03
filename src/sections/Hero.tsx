import { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Code, Palette, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

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

    const elements = heroRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-steff-cream">
        {/* Orange blob shapes like in invoice */}
        <div className="orange-blob w-[500px] h-[500px] -top-48 -right-48 opacity-60" />
        <div className="orange-blob w-[400px] h-[400px] -bottom-32 -left-32 opacity-40" />
        <div className="orange-blob w-[300px] h-[300px] top-1/3 right-1/4 opacity-30" />
        
        {/* Decorative dots pattern */}
        <div className="absolute top-20 left-10 grid grid-cols-5 gap-2 opacity-20">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-steff-orange"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
        
        <div className="absolute bottom-32 right-20 grid grid-cols-4 gap-2 opacity-15">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-steff-orange"
              style={{ animationDelay: `${i * 0.08}s` }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-orange">
              <Sparkles className="w-4 h-4 text-steff-orange" />
              <span className="text-sm font-medium text-steff-gray">
                Creative Digital Agency
              </span>
              <span className="text-xs text-steff-orange-light font-semibold">
                estd 2026
              </span>
            </div>

            {/* Main Heading */}
            <div className="reveal opacity-0 stagger-1 space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-steff-black leading-tight">
                Transform Your
                <span className="block text-gradient-orange">
                  Digital Presence
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-steff-gray max-w-xl leading-relaxed">
                We craft innovative solutions in AI automation, web development, 
                branding, and electronics to elevate your business to new heights.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="reveal opacity-0 stagger-2 flex flex-wrap gap-4">
              <Button
                size="lg"
                onClick={() => scrollToSection('#contact')}
                className="bg-steff-orange hover:bg-steff-orange-dark text-white font-semibold px-8 py-6 text-base btn-shine shadow-orange-lg hover:shadow-orange-xl transition-shadow"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('#services')}
                className="border-2 border-steff-orange text-steff-orange hover:bg-steff-orange hover:text-white font-semibold px-8 py-6 text-base transition-all"
              >
                Explore Services
              </Button>
            </div>

            {/* Stats */}
            <div className="reveal opacity-0 stagger-3 grid grid-cols-3 gap-6 pt-8 border-t border-steff-orange/20">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-steff-orange">
                  50+
                </div>
                <div className="text-sm text-steff-gray">Projects Done</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-steff-orange">
                  30+
                </div>
                <div className="text-sm text-steff-gray">Happy Clients</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-steff-orange">
                  99%
                </div>
                <div className="text-sm text-steff-gray">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Service Cards */}
          <div className="reveal opacity-0 stagger-2 relative">
            <div className="grid grid-cols-2 gap-4">
              {/* AI Automation Card */}
              <div className="bg-white rounded-2xl p-6 shadow-orange hover-lift card-hover group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-steff-orange to-steff-orange-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-steff-black mb-2">
                  AI Automation
                </h3>
                <p className="text-sm text-steff-gray">
                  Smart workflows & chatbots
                </p>
              </div>

              {/* Web Dev Card */}
              <div className="bg-white rounded-2xl p-6 shadow-orange hover-lift card-hover group mt-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-steff-orange to-steff-orange-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-steff-black mb-2">
                  Web Development
                </h3>
                <p className="text-sm text-steff-gray">
                  Modern, responsive sites
                </p>
              </div>

              {/* Branding Card */}
              <div className="bg-white rounded-2xl p-6 shadow-orange hover-lift card-hover group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-steff-orange to-steff-orange-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-steff-black mb-2">
                  Branding
                </h3>
                <p className="text-sm text-steff-gray">
                  Identity & strategy
                </p>
              </div>

              {/* Electronics Card */}
              <div className="bg-white rounded-2xl p-6 shadow-orange hover-lift card-hover group mt-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-steff-orange to-steff-orange-dark flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-steff-black mb-2">
                  Electronics
                </h3>
                <p className="text-sm text-steff-gray">
                  Tech solutions & sales
                </p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-steff-orange text-white px-6 py-3 rounded-full shadow-orange-xl animate-float">
              <span className="text-sm font-semibold">
                Let's Build Together!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
