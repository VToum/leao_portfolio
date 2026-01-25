import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Travel Management System',
    description: 'Full-stack web application for managing travel bookings and itineraries. Built with ASP.NET Core, React, and SQL Server.',
    technologies: ['C#', 'ASP.NET Core', 'React', 'SQL Server', 'Azure'],
    image: '/images/ToDoList.png',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '2',
    title: 'E-Commerce Platform',
    description: 'Scalable e-commerce solution with product catalog, shopping cart, and payment integration.',
    technologies: ['ASP.NET Core', 'Entity Framework', 'PostgreSQL', 'Docker'],
    image: '/images/TipsforLIfeAPI.png',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: '3',
    title: 'Real-Time Analytics Dashboard',
    description: 'Interactive dashboard for real-time data visualization and business intelligence.',
    technologies: ['C#', 'SignalR', 'React', 'TypeScript', 'Chart.js'],
    image: '/images/projects-section-bg.jpg',
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-xl border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4">
                  {project.liveUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      asChild
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
