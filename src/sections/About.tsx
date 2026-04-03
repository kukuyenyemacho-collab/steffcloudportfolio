import { useEffect, useRef } from 'react';
import {
  Target,
  Lightbulb,
  Users,
  Award,
  Zap,
  Heart,
  CheckCircle2,
} from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Results-Driven',
    description: 'We focus on delivering measurable outcomes that impact your bottom line.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description: 'We stay ahead of trends to provide cutting-edge solutions.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    description: 'We work as an extension of your team, not just a vendor.',
  },
  {
    icon: Award,
    title: 'Quality Excellence',
    description: 'We never compromise on quality, no matter the project size.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'We respect deadlines and deliver projects on time, every time.',
  },
  {
    icon: Heart,
    title: 'Passionate Team',
    description: 'We love what we do, and it shows in our work.',
  },
];

const process = [
  {
    step: '01',
    title: 'Discovery',
    description: 'We understand your goals, audience, and requirements.',
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'We create a tailored plan aligned with your objectives.',
  },
  {
    step: '03',
    title: 'Design',
    description: 'We craft beautiful, user-centered designs.',
  },
  {
    step: '04',
    title: 'Development',
    description: 'We build robust, scalable solutions.',
  },
  {
    step: '05',
    title: 'Launch',
    description: 'We deploy and ensure everything runs smoothly.',
  },
];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 lg:py-32 bg-steff-cream"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="orange-blob w-[500px] h-[500px] top-1/4 -right-64 opacity-20" />
        <div className="orange-blob w-[400px] h-[400px] bottom-1/4 -left-48 opacity-15" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          <div>
            <div className="reveal opacity-0 inline-flex items-center gap-2 px-4 py-2 bg-steff-orange/10 rounded-full mb-6">
              <Heart className="w-4 h-4 text-steff-orange" />
              <span className="text-sm font-medium text-steff-orange">
                About Us
              </span>
            </div>
            <h2 className="reveal opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-steff-black mb-6 leading-tight">
              We're a Team of
              <span className="text-gradient-orange"> Digital Creators</span>
            </h2>
          </div>
          <div className="reveal opacity-0 stagger-2 lg:pt-16">
            <p className="text-lg text-steff-gray leading-relaxed mb-6">
              Founded in 2026, Steff Cloud has quickly become a trusted partner
              for businesses looking to establish and grow their digital presence.
              We combine creativity with technical expertise to deliver solutions
              that make a real difference.
            </p>
            <p className="text-lg text-steff-gray leading-relaxed">
              Our diverse team brings together expertise in design, development,
              AI, and electronics to offer comprehensive digital services under
              one roof.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="reveal opacity-0 stagger-3 grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            { value: '50+', label: 'Projects Completed' },
            { value: '30+', label: 'Happy Clients' },
            { value: '5+', label: 'Years Experience' },
            { value: '99%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 text-center shadow-orange hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-steff-orange mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-steff-gray">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="reveal opacity-0 text-2xl sm:text-3xl font-bold text-steff-black mb-4">
              Our Core Values
            </h3>
            <p className="reveal opacity-0 stagger-1 text-steff-gray max-w-2xl mx-auto">
              These principles guide everything we do and help us deliver
              exceptional results for our clients.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`reveal opacity-0 bg-white rounded-2xl p-6 shadow-orange hover-lift card-hover`}
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-steff-orange/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-steff-orange" />
                </div>
                <h4 className="text-lg font-semibold text-steff-black mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-steff-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Process */}
        <div>
          <div className="text-center mb-12">
            <h3 className="reveal opacity-0 text-2xl sm:text-3xl font-bold text-steff-black mb-4">
              How We Work
            </h3>
            <p className="reveal opacity-0 stagger-1 text-steff-gray max-w-2xl mx-auto">
              Our proven process ensures every project is delivered on time,
              on budget, and exceeds expectations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((step, index) => (
              <div
                key={step.title}
                className={`reveal opacity-0 relative`}
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-orange hover-lift h-full">
                  <div className="text-4xl font-bold text-steff-orange/20 mb-4">
                    {step.step}
                  </div>
                  <h4 className="text-lg font-semibold text-steff-black mb-2">
                    {step.title}
                  </h4>
                  <p className="text-sm text-steff-gray leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-steff-orange flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
