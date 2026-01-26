import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'; // Adicionei MessageCircle se quiser usar
import { toast } from 'sonner';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Número do WhatsApp (somente números, com código do país)
  const WHATSAPP_NUMBER = "5511981425347";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim() || !formData.message.trim()) {
      toast.error(t('contact.form.error'));
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // 1. Cria a mensagem formatada
    const textMessage = `
*Nova mensagem do Portfólio* 🚀

👤 *Nome:* ${formData.name}
📧 *Email:* ${formData.email}
📝 *Assunto:* ${formData.subject}

────── Mensagem ──────
${formData.message}
    `.trim();

    // 2. Codifica para URL
    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // 3. Abre o WhatsApp em nova aba
    window.open(whatsappUrl, '_blank');

    toast.success(t('contact.form.success'));
    
    // Opcional: Limpar o formulário após enviar
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t('contact.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informações de Contato (Esquerda) */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('contact.info.email')}</h3>
                <a href="mailto:everleao@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  everleao@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{t('contact.info.phone')}</h3>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  +55 11 98142-5347
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {t('contact.info.location')}
                </h3>
                <p className="text-muted-foreground">São Paulo, Brazil</p>
              </div>
            </div>
          </div>

          {/* Formulário (Direita) */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  name="name"
                  placeholder={t('contact.form.name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder={t('contact.form.email')}
                  value={formData.email}
                  onChange={handleChange}
                  // Email opcional agora, já que vai pro WhatsApp, mas bom manter
                />
              </div>

              <Input
                name="subject"
                placeholder={t('contact.form.subject')}
                value={formData.subject}
                onChange={handleChange}
                required
              />

              <Textarea
                name="message"
                rows={6}
                placeholder={t('contact.form.message')}
                value={formData.message}
                onChange={handleChange}
                required
              />

              <Button type="submit" className="w-full md:w-auto px-8">
                <Send className="mr-2 h-5 w-5" />
                {t('contact.form.submit')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};