import { SERVICIOS } from "@/lib/servicios";
import { CORREO_CONTACTO, DESCRIPCION_INICIO, NOMBRE_SITIO, URL_SITIO } from "@/lib/sitio";

// Schema.org (JSON-LD) del inicio. LexyonDigital es a la vez una empresa de
// servicios (capacitación, legal, contable) y un software propio (el CRM con
// agente de IA), así que el grafo describe las tres piezas enlazadas por @id:
//   Organization        -> quién es, logo, contacto, qué servicios ofrece
//   WebSite             -> el sitio y su editor
//   SoftwareApplication -> la plataforma, con su prueba gratis de 14 días
// Solo datos que el propio sitio ya muestra -- nada inventado (sin dirección
// física, teléfono ni calificaciones).
export function datosEstructuradosInicio() {
  const idOrganizacion = `${URL_SITIO}/#organizacion`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": idOrganizacion,
        name: NOMBRE_SITIO,
        url: URL_SITIO,
        logo: { "@type": "ImageObject", url: `${URL_SITIO}/logo.png`, width: 1024, height: 1024 },
        description: DESCRIPCION_INICIO,
        email: CORREO_CONTACTO,
        areaServed: { "@type": "Country", name: "México" },
        knowsLanguage: "es-MX",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de LexyonDigital",
          itemListElement: SERVICIOS.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.nombre,
              description: s.resumen,
              url: `${URL_SITIO}/servicios/${s.slug}`,
              provider: { "@id": idOrganizacion },
              areaServed: { "@type": "Country", name: "México" },
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${URL_SITIO}/#sitio`,
        url: URL_SITIO,
        name: NOMBRE_SITIO,
        inLanguage: "es-MX",
        publisher: { "@id": idOrganizacion },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${URL_SITIO}/#plataforma`,
        name: "Plataforma LexyonDigital",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://app.lexyondigital.com.mx",
        description:
          "CRM con agente de inteligencia artificial que atiende WhatsApp las 24 horas, agenda citas sincronizadas con Google Calendar, organiza contactos y oportunidades, y automatiza seguimientos y campañas.",
        inLanguage: "es-MX",
        publisher: { "@id": idOrganizacion },
        offers: {
          "@type": "Offer",
          description: "Prueba gratis de 14 días, sin tarjeta de crédito.",
          price: "0",
          priceCurrency: "MXN",
          url: `${URL_SITIO}/registro`,
        },
      },
    ],
  };
}
