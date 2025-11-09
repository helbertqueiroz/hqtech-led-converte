import { useEffect } from "react";

const StructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "HQ Tech",
      "description": "Especialistas em painéis de LED profissionais para igrejas com parcelamento em até 48x sem entrada",
      "url": "https://hqtech.com.br",
      "logo": "https://hqtech.com.br/logo-hqtech.svg",
      "image": "https://hqtech.com.br/og-image.jpg",
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": "Av. Osvaldo Reis, 3385, Ed. Riviera Concept",
          "addressLocality": "Itajaí",
          "addressRegion": "SC",
          "postalCode": "88306-001",
          "addressCountry": "BR"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": "2801 NW 74TH AVE",
          "addressLocality": "Miami",
          "addressRegion": "FL",
          "postalCode": "33122-1443",
          "addressCountry": "US"
        }
      ],
      "telephone": ["+55-47-93618-0776", "+1-786-548-8102"],
      "email": ["hq@hqtech.com.br", "sales@hqtech.us"],
      "sameAs": [
        "https://instagram.com/hqtech",
        "https://youtube.com/@hqtech",
        "https://linkedin.com/company/hqtech"
      ],
      "areaServed": ["BR", "US"],
      "priceRange": "$$",
      "paymentAccepted": "Parcelamento em até 48x",
      "openingHours": "Mo-Fr 09:00-18:00"
    };

    const productData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Painéis de LED para Igrejas",
      "description": "Painéis de LED profissionais para igrejas com parcelamento em até 48x sem entrada. Transforme o ambiente da sua igreja com tecnologia de ponta.",
      "brand": {
        "@type": "Brand",
        "name": "HQ Tech"
      },
      "offers": {
        "@type": "Offer",
        "price": "Consulte",
        "priceCurrency": "BRL",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "HQ Tech"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5",
        "reviewCount": "3"
      }
    };

    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Qual o prazo de parcelamento para painéis de LED?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Oferecemos parcelamento em até 48x sem entrada para facilitar o investimento da sua igreja."
          }
        },
        {
          "@type": "Question",
          "name": "Qual a área de atuação da HQ Tech?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Atuamos em todo o Brasil e também nos Estados Unidos, com escritórios em Itajaí-SC e Miami-FL."
          }
        },
        {
          "@type": "Question",
          "name": "A HQ Tech oferece suporte técnico após a instalação?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, oferecemos suporte técnico completo e garantia em todos os nossos produtos e instalações."
          }
        }
      ]
    };

    // Add structured data scripts
    const scripts = [
      { id: 'structured-data-org', data: structuredData },
      { id: 'structured-data-product', data: productData },
      { id: 'structured-data-faq', data: faqData }
    ];

    scripts.forEach(({ id, data }) => {
      let script = document.getElementById(id) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    });

    return () => {
      scripts.forEach(({ id }) => {
        const script = document.getElementById(id);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  return null;
};

export default StructuredData;
