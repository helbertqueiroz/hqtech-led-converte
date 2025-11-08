import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Pastor João Silva",
    church: "Igreja Batista Central",
    location: "São Paulo - SP",
    text: "A HQ Tech transformou completamente nossa experiência de culto. O painel de LED trouxe vida e modernidade para nossa igreja. A equipe foi extremamente profissional!",
  },
  {
    name: "Pastor Carlos Mendes",
    church: "Comunidade Evangélica",
    location: "Florianópolis - SC",
    text: "Excelente custo-benefício e parcelamento facilitado. A instalação foi rápida e o suporte técnico é excepcional. Recomendamos para todas as igrejas!",
  },
  {
    name: "Pastora Maria Santos",
    church: "Igreja Assembleia de Deus",
    location: "Rio de Janeiro - RJ",
    text: "Superou todas as expectativas! O visual ficou incrível e a qualidade do equipamento é premium. Valeu cada centavo investido.",
  },
];

const Testimonials = () => {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            O que dizem nossos <span className="text-gradient">clientes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Veja a experiência de igrejas que já escolheram a HQ Tech
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover-lift border-border/50">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-card-foreground mb-4 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-card-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.church}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {testimonial.location}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
