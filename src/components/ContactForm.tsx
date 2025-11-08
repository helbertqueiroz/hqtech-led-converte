import { useEffect } from "react";

const ContactForm = () => {
  useEffect(() => {
    // HubSpot form will be automatically loaded by the script in index.html
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
            <div 
              className="hs-form-frame" 
              data-region="na1" 
              data-form-id="e73a190c-dfa0-4352-b864-39ba9bdb537a" 
              data-portal-id="43624841"
            />
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
