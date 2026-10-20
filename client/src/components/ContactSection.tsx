import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, ExternalLink } from 'lucide-react';

const LINKEDIN_URL = 'https://www.linkedin.com/in/evertonle%C3%A3otrue/';
const GITHUB_URL = 'https://github.com/VToum';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center space-y-5">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('contact.subtitle')}
          </p>
          <div className="flex flex-col justify-center gap-3 pt-3 sm:flex-row">
            <Button size="lg" className="font-semibold" asChild>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="font-semibold" asChild>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
