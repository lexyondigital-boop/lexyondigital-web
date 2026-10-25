import type { Metadata } from "next";
import { NOMBRE_SITIO } from "@/lib/sitio";
import { ALT_IMAGEN_SOCIAL, TAMANO_IMAGEN_SOCIAL } from "@/lib/imagen-social-datos";

// Metadata completa de una página pública: título, descripción, canonical y
// sus propias etiquetas Open Graph/Twitter. Sin esto, una página que solo
// declara title/description heredaría el og:title del inicio (Next reemplaza
// openGraph completo, no lo mezcla), y al compartir /blog en WhatsApp o
// Facebook saldría el título de la página principal.
export function metadataPagina({
  titulo,
  descripcion,
  ruta,
  tipo = "website",
  imagen,
}: {
  titulo: string;
  descripcion: string;
  ruta: string;
  tipo?: "website" | "article";
  imagen?: string | null;
}): Metadata {
  // Al declarar openGraph/twitter aquí, Next deja de agregar la imagen de
  // app/opengraph-image.tsx por su cuenta -- se pone explícita. Una página
  // con portada propia (post, taller) usa esa en su lugar.
  const og = imagen
    ? [{ url: imagen, alt: titulo }]
    : [{ url: "/opengraph-image", ...TAMANO_IMAGEN_SOCIAL, type: "image/png", alt: ALT_IMAGEN_SOCIAL }];
  const tw = imagen ? [{ url: imagen, alt: titulo }] : [{ url: "/twitter-image", alt: ALT_IMAGEN_SOCIAL }];
  return {
    title: titulo,
    description: descripcion,
    alternates: { canonical: ruta },
    openGraph: {
      type: tipo,
      locale: "es_MX",
      siteName: NOMBRE_SITIO,
      title: titulo,
      description: descripcion,
      url: ruta,
      images: og,
    },
    twitter: {
      card: "summary_large_image",
      title: titulo,
      description: descripcion,
      images: tw,
    },
  };
}
