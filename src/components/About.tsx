import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Mais de 10 anos de experiência no mercado audiovisual",
  "Revenda autorizada das principais marcas do segmento",
  "Projetos personalizados para cada ambiente",
  "Atuação em todo Brasil e no exterior",
];

const About = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Sobre a <span className="text-gradient">HQ Tech</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            A HQ Tech desenvolve projetos audiovisuais personalizados para cada ambiente.
            Especialistas em soluções profissionais de som, projeção e painéis de LED,
            garantindo qualidade, suporte e excelência em cada instalação.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-foreground font-medium">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
