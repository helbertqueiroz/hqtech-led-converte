import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Pr. Eduardo Silva",
    text: "Tivemos o prazer de adquirir nossos Leds com essa Empresa maravilhosa, desde o nosso primeiro contato fomos atendidos de maneira eficaz e atenciosa, só temos que agradecer a toda a Equipe.",
  },
  {
    name: "Renato Ferrari",
    text: "Atendimento muito bom, pessoal muito atencioso, realizei a instalação remota com auxílio dos técnicos sem nenhum problema.",
  },
  {
    name: "Eduardo Vargas",
    text: "Experiência fantástica. Equipe atenciosa super recomendo.",
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
            Veja a experiência de igrejas que já escolheram nossas soluções
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
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
