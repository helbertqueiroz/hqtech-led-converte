import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-church-led.jpg";
import logoHQTech from "@/assets/logo-hqtech.svg";

const Hero = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("orcamento");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Painel de LED instalado em igreja"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/90 to-navy-dark/95" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img 
              src={logoHQTech} 
              alt="HQ Tech" 
              className="h-16 md:h-20 lg:h-24 w-auto"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Painéis de LED para Igrejas com{" "}
            <span className="text-gradient">Parcelamento em até 48x</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto font-light">
            Transforme o ambiente da sua igreja com tecnologia profissional e visual impactante.
          </p>
          <Button
            size="lg"
            onClick={scrollToForm}
            className="bg-accent hover:bg-gold-light text-accent-foreground font-semibold text-lg px-8 py-6 rounded-full shadow-medium hover-lift whitespace-nowrap"
            translate="no"
          >
            Solicite seu orçamento agora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
