import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Download, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { getAssetPath } from '@/utils/assets';

export const AboutSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [expandedId, setExpandedId] = useState<string | null>('avipam');

  interface ExperienceItem {
    id?: string;
    company: string;
    role: string;
    description: string;
    highlights?: string[];
  }

  const skills = (t('about.skills', { returnObjects: true }) as string[]) || [];
  const experiences = (t('about.experiences', { returnObjects: true }) as ExperienceItem[]) || [];

  // 🌍 Detecta idioma corretamente
  const isEnglish = i18n.language.startsWith('en');

  const resumeFileName = isEnglish
    ? 'Everton_Leao_Full_Stack_DotNet_EN.pdf'
    : 'Everton_Leao_Desenvolvedor_FullStack_PT.pdf';

  const resumeUrl = getAssetPath(resumeFileName);

  const toggleExpand = (id?: string) => {
    if (!id) return;
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Profile Image */}
          <div className="lg:col-span-5 flex justify-center lg:sticky lg:top-24">
            <div className="relative w-64 h-64 md:w-80 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 rounded-2xl rotate-3" />
              <img
                src={getAssetPath('/images/profile.jpg')}
                alt="Everton Leão"
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
                style={{ objectPosition: '80% center' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.intro')}
              </p>
            </div>

            {/* Interactive Experience Cards */}
            {Array.isArray(experiences) && experiences.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t('about.experienceTitle')}
                </h3>
                <div className="space-y-3">
                  {experiences.map((exp, index) => {
                    const id = exp.id || `exp-${index}`;
                    const isExpanded = expandedId === id;

                    return (
                      <div
                        key={id}
                        onClick={() => toggleExpand(id)}
                        className={`p-5 bg-background rounded-xl border transition-all cursor-pointer ${
                          isExpanded
                            ? 'border-primary shadow-md ring-1 ring-primary/20'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-bold text-foreground text-base sm:text-lg">
                                {exp.company}
                              </span>
                              <span className="text-xs px-2.5 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                                {exp.role}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {exp.description}
                            </p>
                          </div>
                          <button
                            type="button"
                            className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors shrink-0"
                            aria-label="Toggle details"
                          >
                            {isExpanded ? (
                              <ChevronUp className="h-5 w-5 text-primary" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                        </div>

                        {/* Expanded Details / Highlights */}
                        {isExpanded && exp.highlights && exp.highlights.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-border/60 animate-in fade-in duration-300">
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2.5">
                              Atividades &amp; Especialidades:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {exp.highlights.map((highlight, hIdx) => (
                                <div key={hIdx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground">
                                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                                  <span>{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Skills */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {t('about.expertise')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border hover:border-primary transition-colors"
                  >
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm font-medium text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 📄 Download automático por idioma */}
            <div>
              <a href={resumeUrl} download={resumeFileName}>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  <Download className="mr-2 h-5 w-5" />
                  {t('about.cta')}
                </Button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
