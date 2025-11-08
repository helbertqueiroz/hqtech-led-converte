import { CreditCard, MapPin, Headphones, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: CreditCard,
    title: "Parcelamento em até 48x",
    description: "Condições especiais de pagamento para sua igreja",
  },
  {
    icon: MapPin,
    title: "Instalação em todo o Brasil",
    description: "Equipe técnica especializada em todo território nacional",
  },
  {
    icon: Headphones,
    title: "Suporte técnico especializado",
    description: "Atendimento profissional durante e após a instalação",
  },
  {
    icon: ShieldCheck,
    title: "Garantia e qualidade profissional",
    description: "Produtos de alta qualidade com garantia estendida",
  },
];

const Benefits = () => {
  return (
    <section className="section-padding bg-secondary/50">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="p-6 text-center hover-lift bg-card border-border/50 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                <benefit.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
