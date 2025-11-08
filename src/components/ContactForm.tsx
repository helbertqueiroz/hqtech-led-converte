import { useEffect } from "react";

declare global {
  interface Window {
    hbspt: any;
  }
}

const ContactForm = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.hsforms.net/forms/embed/v3.js';
    script.async = true;
    script.charset = 'utf-8';
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "43624841",
          formId: "e73a190c-dfa0-4352-b864-39ba9bdb537a",
          target: '#hubspot-form'
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="orcamento" className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Solicite seu <span className="text-gradient">orçamento</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Preencha o formulário e nossa equipe entrará em contato com uma proposta personalizada
            </p>
          </div>
          
          {/* HubSpot Form Container */}
          <div className="bg-card rounded-2xl shadow-medium p-6 md:p-8 border border-border/50">
            <div id="hubspot-form"></div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Seus dados estão seguros conosco e não serão compartilhados com terceiros
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
