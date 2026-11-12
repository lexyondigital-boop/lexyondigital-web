import { SERVICIOS, type Servicio } from "@/lib/servicios";

// Elige el servicio al que debe llevar un artículo del blog según su tema:
// cada artículo termina con un recuadro hacia la página de servicio que le
// corresponde (enlace interno = autoridad para esa página). El primer grupo
// que coincida gana; si ninguno coincide, va al agente de IA.
const REGLAS: { slug: string; patron: RegExp }[] = [
  { slug: "contabilidad", patron: /\b(sat|resico|iva|isr|contab\w*|fiscal\w*|factur\w*|cfdi|declaraci\w*)\b/i },
  { slug: "asesoria-legal", patron: /\b(impi|marca|contrato\w*|legal\w*|cofepris|aviso de privacidad|t[eé]rminos y condiciones)\b/i },
  { slug: "paginas-web-seo", patron: /\b(seo|google analytics|ga4|search console|p[aá]gina web|landing)\b/i },
  { slug: "capacitacion-marketing-digital", patron: /\b(meta ads|facebook ads|instagram ads|anuncio\w*|campa[nñ]a\w*)\b/i },
  { slug: "automatizacion-agentes-ia", patron: /\b(whatsapp|agente|chatbot|inteligencia artificial|ia|citas?)\b/i },
];

export function servicioRelacionado(titulo: string, contenido: string): Servicio {
  const texto = `${titulo}\n${titulo}\n${contenido.slice(0, 1500)}`;
  for (const r of REGLAS) {
    if (r.patron.test(texto)) {
      const s = SERVICIOS.find((x) => x.slug === r.slug);
      if (s) return s;
    }
  }
  return SERVICIOS.find((x) => x.slug === "automatizacion-agentes-ia") ?? SERVICIOS[0];
}
