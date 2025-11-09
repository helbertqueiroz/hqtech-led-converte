import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const Index = () => {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen">
        <Hero />
        <Benefits />
        <About />
        <Gallery />
        <Testimonials />
        <ContactForm />
        <Footer />
      </main>
    </>
  );
};

export default Index;
