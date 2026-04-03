import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Eye, FolderOpen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const categories = [
  'All',
  'Web Development',
  'Branding',
  'Graphics Design',
  'AI Automation',
];

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    category: 'Web Development',
    description:
      'A full-featured online store with payment integration, inventory management, and analytics dashboard.',
    image:
      'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&q=80',
    tags: ['React', 'Node.js', 'Stripe'],
  },
  {
    id: 2,
    title: 'TechStart Branding',
    category: 'Branding',
    description:
      'Complete brand identity including logo, color palette, typography, and brand guidelines for a tech startup.',
    image:
      'https://images.unsplash.com/photo-1634942537034-2531766767d1?w=800&q=80',
    tags: ['Logo Design', 'Brand Strategy', 'Guidelines'],
  },
  {
    id: 3,
    title: 'Social Media Campaign',
    category: 'Graphics Design',
    description:
      'Eye-catching social media graphics and marketing materials for a product launch campaign.',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    tags: ['Social Media', 'Marketing', 'Design'],
  },
  {
    id: 4,
    title: 'AI Customer Support Bot',
    category: 'AI Automation',
    description:
      'Intelligent chatbot that handles customer inquiries, reducing response time by 80%.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['AI', 'Chatbot', 'Automation'],
  },
  {
    id: 5,
    title: 'Restaurant Website',
    category: 'Web Development',
    description:
      'Modern, responsive website with online reservation system and menu management.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    tags: ['WordPress', 'Booking', 'Responsive'],
  },
  {
    id: 6,
    title: 'Fitness App UI/UX',
    category: 'Graphics Design',
    description:
      'User interface design for a fitness tracking mobile application with intuitive navigation.',
    image:
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&q=80',
    tags: ['UI/UX', 'Mobile', 'Figma'],
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

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

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section
      id="portfolio"
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
            <FolderOpen className="w-4 h-4 text-steff-orange" />
            <span className="text-sm font-medium text-steff-orange">
              Our Portfolio
            </span>
          </div>
          <h2 className="reveal opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-steff-black mb-6">
            Featured
            <span className="text-gradient-orange"> Projects</span>
          </h2>
          <p className="reveal opacity-0 stagger-2 text-lg text-steff-gray">
            Explore some of our recent work and see how we've helped businesses
            achieve their digital goals.
          </p>
        </div>

        {/* Category Filter */}
        <div className="reveal opacity-0 stagger-3 flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-steff-orange text-white shadow-orange'
                  : 'bg-steff-cream text-steff-gray hover:bg-steff-orange/10 hover:text-steff-orange'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="reveal opacity-0 group relative bg-white rounded-2xl overflow-hidden shadow-orange hover-lift cursor-pointer"
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-steff-black/80 via-steff-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-steff-orange flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="text-xs font-medium text-steff-orange mb-2">
                  {project.category}
                </div>
                <h3 className="text-lg font-semibold text-steff-black mb-2 group-hover:text-steff-orange transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-steff-gray line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-steff-cream text-xs font-medium text-steff-gray rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="reveal opacity-0 mt-12 text-center">
          <p className="text-steff-gray mb-4">
            Want to see more of our work?
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-steff-orange font-medium hover:underline"
          >
            Let's discuss your project
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <DialogHeader>
                <div className="text-sm font-medium text-steff-orange mb-1">
                  {selectedProject.category}
                </div>
                <DialogTitle className="text-2xl text-steff-black">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-steff-gray">
                  {selectedProject.description}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-steff-orange/10 text-sm font-medium text-steff-orange rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
