import { MapPin, Phone, Mail, Instagram, Youtube, Linkedin } from "lucide-react";
import logoHQTech from "@/assets/logo-hqtech.svg";

const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Company Info */}
          <div>
            <img 
              src={logoHQTech} 
              alt="HQ Tech" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-primary-foreground/80 leading-relaxed mb-6">
              Especialistas em soluções audiovisuais profissionais para igrejas, 
              com mais de 10 anos de experiência no mercado.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/hqtech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@hqtech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent flex items-center justify-center transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/hqtech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-accent/10 hover:bg-accent flex items-center justify-center transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact USA */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Estados Unidos</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <p className="font-medium text-primary-foreground">HQ TECH IMPORT EXPORT LLC</p>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <p>2801 NW 74TH AVE<br />Miami, FL, US, 33122-1443</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+17865488102" className="hover:text-accent transition-colors">
                  +1 (786) 548-8102
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:sales@hqtech.us" className="hover:text-accent transition-colors">
                  sales@hqtech.us
                </a>
              </div>
            </div>
          </div>

          {/* Contact Brazil */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-accent">Brasil</h4>
            <div className="space-y-3 text-sm text-primary-foreground/80">
              <p className="font-medium text-primary-foreground">HQ TECH COMÉRCIO E REPRESENTAÇÃO</p>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                <p>Av. Osvaldo Reis, 3385<br />Ed. Riviera Concept<br />Praia Brava, Itajaí – SC, 88306-001</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+554736180776" className="hover:text-accent transition-colors">
                  +55 (47) 93618-0776
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:hq@hqtech.com.br" className="hover:text-accent transition-colors">
                  hq@hqtech.com.br
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} HQ Tech. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
