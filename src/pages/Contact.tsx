import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api';
import { useTranslation } from '@/context/LanguageContext';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await apiClient.createMessage(formData);
      toast.success(t.thankYouMessage);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error(t.failedToSend);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-sage-light py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">{t.contactPageTitle}</h1>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            {t.contactPageDescription}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact form */}
            <div>
              <h2 className="font-display text-3xl text-foreground mb-6">{t.sendUsMessage}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm text-foreground block mb-2">{t.nameLabel}</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder}
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm text-foreground block mb-2">{t.emailLabel}</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.emailPlaceholder}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm text-foreground block mb-2">{t.subjectLabel}</label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t.subjectPlaceholder}
                    required
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-foreground block mb-2">{t.messageLabel}</label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.messagePlaceholder}
                    rows={5}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="btn-primary font-body uppercase tracking-wider"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.sending : t.sendMessageBtn}
                </Button>
              </form>
            </div>

            {/* Contact info */}
            <div>
              <h2 className="font-display text-3xl text-foreground mb-6">{t.getInTouchTitle}</h2>
              <p className="font-body text-muted-foreground mb-8">
                {t.getInTouchDescription}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground">{t.addressLabel}</h3>
                    <p className="font-body text-muted-foreground whitespace-pre-line">Albania</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground">{t.phoneLabel}</h3>
                    <p className="font-body text-muted-foreground">+355 00 000 000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground">{t.emailLabel}</h3>
                    <p className="font-body text-muted-foreground">example@email.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground">{t.businessHoursLabel}</h3>
                    <p className="font-body text-muted-foreground whitespace-pre-line">
                      {t.businessHoursDetails}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
