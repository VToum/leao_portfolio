import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Smartphone, Code2, ShieldCheck, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12"
    >
      {/* Background Overlay with Gradient Accent */}
      <div
        className="absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: 'url(/images/hero-background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-background/60 via-background/90 to-background" />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-1000">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4" />
            <span>{t('hero.badge')}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-foreground tracking-tight leading-tight">
            Desenvolvedor <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">Full Stack .NET</span> &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Mobile</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          {/* Feature Highlights Pills */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-card/80 border border-border rounded-lg text-xs md:text-sm text-foreground font-medium shadow-sm">
              <Smartphone className="h-4 w-4 text-emerald-500" />
              <span>4 Apps Publicados na Play Store</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-card/80 border border-border rounded-lg text-xs md:text-sm text-foreground font-medium shadow-sm">
              <Code2 className="h-4 w-4 text-blue-500" />
              <span>C# .NET &amp; React Native</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 bg-card/80 border border-border rounded-lg text-xs md:text-sm text-foreground font-medium shadow-sm">
              <ShieldCheck className="h-4 w-4 text-teal-500" />
              <span>Offline-First &amp; IA</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-600/20 px-8"
              onClick={scrollToProjects}
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-border hover:bg-secondary font-semibold"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('nav.contact')}
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-6 animate-bounce">
            <p className="text-xs text-muted-foreground mb-1">
              {t('hero.scroll')}
            </p>
            <div className="flex justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

