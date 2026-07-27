import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { ExternalLink, Globe, Smartphone } from 'lucide-react';

interface ProjectButton {
  label: string;
  url: string;
  type?: 'playstore' | 'website' | 'github' | string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  buttons?: ProjectButton[];
  liveUrl?: string;
  githubUrl?: string;
}

export const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();

  // Fetch projects from translations
  const projects = t('projects.items', { returnObjects: true }) as Project[];

  const renderIcon = (type?: string, label?: string) => {
    if (type === 'playstore' || (label && label.toLowerCase().includes('play store'))) {
      return <Smartphone className="h-4 w-4 mr-2" />;
    }
    if (type === 'website' || (label && (label.toLowerCase().includes('site') || label.toLowerCase().includes('website')))) {
      return <Globe className="h-4 w-4 mr-2" />;
    }
    return <ExternalLink className="h-4 w-4 mr-2" />;
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {Array.isArray(projects) && projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card hover:border-primary transition-all duration-300 hover:shadow-xl"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-secondary">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 bg-primary/10 text-primary font-medium rounded-md border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links / Action Buttons - Destaque em evidencia */}
              <div className="p-6 pt-0 flex flex-col gap-2.5 mt-auto">
                {project.buttons && project.buttons.length > 0 ? (
                  project.buttons.map((btn, idx) => (
                    <Button
                      key={idx}
                      size="lg"
                      variant={idx === 0 ? "default" : "outline"}
                      className={`w-full font-semibold transition-all duration-200 ${
                        idx === 0 
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-emerald-900/20' 
                          : 'border-primary/40 hover:bg-primary/10'
                      }`}
                      asChild
                    >
                      <a href={btn.url} target="_blank" rel="noopener noreferrer">
                        {renderIcon(btn.type, btn.label)}
                        {btn.label}
                      </a>
                    </Button>
                  ))
                ) : (
                  <>
                    {project.liveUrl && (
                      <Button
                        size="lg"
                        variant="default"
                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Ver Projeto
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          Code
                        </a>
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

