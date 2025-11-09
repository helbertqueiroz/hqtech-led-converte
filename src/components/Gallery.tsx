import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import project5 from "@/assets/project-5.jpg";
import project6 from "@/assets/project-6.jpg";

const images = [
  { src: project1, alt: "Painel de LED instalado em igreja - Projeto HQ Tech" },
  { src: project2, alt: "Sistema LED profissional para igreja - Projeto HQ Tech" },
  { src: project3, alt: "Instalação de painel LED em auditório - Projeto HQ Tech" },
  { src: project4, alt: "Setup audiovisual completo em igreja - Projeto HQ Tech" },
  { src: project5, alt: "Painel LED com banda ao vivo em igreja - Projeto HQ Tech" },
  { src: project6, alt: "Cenário LED profissional para igreja - Projeto HQ Tech" },
];

const Gallery = () => {
  return (
    <section className="section-padding bg-navy text-primary-foreground">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Nossos <span className="text-gradient">Projetos</span>
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Conheça algumas das igrejas que já transformamos com nossas soluções de painéis de LED
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-medium hover-lift group"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
