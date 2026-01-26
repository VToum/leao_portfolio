import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, i18n } = useTranslation();

  const skills = t('about.skills', { returnObjects: true }) as string[];

  // 🌍 Detecta idioma corretamente
  const isEnglish = i18n.language.startsWith('en');

  const resumeFileName = isEnglish
    ? 'Everton_Leao_Full_Stack_DotNet_EN.pdf'
    : 'Everton_Leao_Desenvolvedor_FullStack_PT.pdf';

  const resumeUrl = `/${resumeFileName}`;

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">

          {/* Profile Image */}
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-100">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 rounded-2xl rotate-3" />
              <img
                src="/images/profile.jpg"
                alt="Everton Leão"
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
                style={{ objectPosition: '80% center' }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.intro')}
              </p>
            </div>

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
                    <span className="text-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 📄 Download automático por idioma */}
            <a href={resumeUrl} download={resumeFileName}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Download className="mr-2 h-5 w-5" />
                {t('about.cta')}
              </Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
