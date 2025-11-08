import { useEffect } from "react";

declare global {
  interface Window {
    hbspt: any;
  }
}

const ContactForm = () => {
  useEffect(() => {
    const targetSelector = "#hubspot-form";

    const createForm = () => {
      try {
        if (window.hbspt?.forms?.create) {
          window.hbspt.forms.create({
            region: "na1",
            portalId: "43624841",
            formId: "e73a190c-dfa0-4352-b864-39ba9bdb537a",
            target: targetSelector,
          });
        }
      } catch (e) {
        console.error("HubSpot form creation failed", e);
      }
    };

    // If script already available (from tracking code or previous load), create immediately
    if (window.hbspt?.forms?.create) {
      createForm();
      return;
    }

    // Ensure container exists before loading script
    const container = document.querySelector(targetSelector);
    if (!container) return;

    // Check if v2.js is already present
    const existingScript = document.querySelector(
      'script[src="https://js.hsforms.net/forms/v2.js"]'
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.getAttribute("data-loaded") === "true") {
        createForm();
      } else {
        existingScript.addEventListener("load", createForm, { once: true });
      }
      return;
    }

    // Load HubSpot Forms v2.js
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      script.setAttribute("data-loaded", "true");
      createForm();
    };
    document.body.appendChild(script);

    // Do not remove the script on cleanup (can be reused). Only remove the listener if added.
    return () => {
      existingScript?.removeEventListener("load", createForm as any);
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
            <div id="hubspot-form" />
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
