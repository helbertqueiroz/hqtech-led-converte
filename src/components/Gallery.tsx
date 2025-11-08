import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const images = [
  { src: gallery1, alt: "Painel de LED em igreja - Projeto 1" },
  { src: gallery2, alt: "Painel de LED em igreja - Projeto 2" },
  { src: gallery3, alt: "Painel de LED em igreja - Projeto 3" },
  { src: gallery4, alt: "Painel de LED em igreja - Projeto 4" },
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-medium hover-lift group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
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
