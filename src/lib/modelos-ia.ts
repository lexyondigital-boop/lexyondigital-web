// Tabla de modelos de IA con los créditos de LexyonDigital: copia de
// tablaModelos() de la app (lexyondigital-saas, src/lib/precios-ia.ts).
// Precio = costo del proveedor + 70 %, con IVA incluido. Si cambia allá,
// se regenera aquí.
export type NivelModelo = "economico" | "medio" | "alto";
export type ModeloIa = {
  tipo: "texto" | "imagen" | "video";
  modelo: string;
  proveedor: string;
  uso: string;
  nivel: NivelModelo;
  calidad: number;
  precio: number;
  precio10s: number | null;
  unidad: string;
};

export const ETIQUETA_NIVEL: Record<NivelModelo, string> = { economico: "Económico", medio: "Medio", alto: "Alto" };
export const ETIQUETA_CALIDAD: Record<number, string> = { 2: "Básica", 3: "Buena", 4: "Muy buena", 5: "Excelente" };

export const MODELOS_IA: ModeloIa[] = [
  {
    "tipo": "texto",
    "modelo": "Qwen3.8 Flash",
    "proveedor": "Alibaba",
    "uso": "El más barato; bien para preguntas frecuentes y agendar",
    "nivel": "economico",
    "calidad": 3,
    "precio": 1.0047,
    "precio10s": null,
    "unidad": "por 1,000 respuestas"
  },
  {
    "tipo": "texto",
    "modelo": "GPT-4o mini",
    "proveedor": "OpenAI",
    "uso": "Respuestas rápidas y correctas; buena opción por defecto",
    "nivel": "economico",
    "calidad": 3,
    "precio": 1.071,
    "precio10s": null,
    "unidad": "por 1,000 respuestas"
  },
  {
    "tipo": "texto",
    "modelo": "Qwen Plus",
    "proveedor": "Alibaba",
    "uso": "Más cuidadoso con instrucciones largas",
    "nivel": "medio",
    "calidad": 4,
    "precio": 2.652,
    "precio10s": null,
    "unidad": "por 1,000 respuestas"
  },
  {
    "tipo": "texto",
    "modelo": "Claude Sonnet 5.5",
    "proveedor": "Anthropic",
    "uso": "El mejor siguiendo instrucciones y redactando; ventas consultivas",
    "nivel": "alto",
    "calidad": 5,
    "precio": 15.3,
    "precio10s": null,
    "unidad": "por 1,000 respuestas"
  },
  {
    "tipo": "texto",
    "modelo": "Kimi K3.1 Pro",
    "proveedor": "Moonshot, vía Alibaba",
    "uso": "Razonamiento fuerte, textos largos",
    "nivel": "alto",
    "calidad": 5,
    "precio": 15.3,
    "precio10s": null,
    "unidad": "por 1,000 respuestas"
  },
  {
    "tipo": "imagen",
    "modelo": "Nano Banana – Gemini",
    "proveedor": "Replicate",
    "uso": "Sigue el prompt al pie de la letra: textos, íconos de redes, sellos y tu logo real como referencia",
    "nivel": "medio",
    "calidad": 5,
    "precio": 0.0663,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "Ideogram v3 Turbo",
    "proveedor": "Replicate",
    "uso": "El mejor para tipografía: anuncios, flyers y diseños con varios textos legibles",
    "nivel": "economico",
    "calidad": 4,
    "precio": 0.051,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "GPT Image",
    "proveedor": "OpenAI",
    "uso": "Entiende instrucciones complicadas y escribe texto legible dentro de la imagen",
    "nivel": "medio",
    "calidad": 5,
    "precio": 0.068,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "Flux 1.1 Pro",
    "proveedor": "Replicate",
    "uso": "El más realista: fotografía de producto, personas, ambientes",
    "nivel": "medio",
    "calidad": 5,
    "precio": 0.068,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "Flux Schnell",
    "proveedor": "Replicate",
    "uso": "Rápido y barato, para probar ideas antes de gastar en la buena",
    "nivel": "economico",
    "calidad": 2,
    "precio": 0.0051,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "Imagen 4",
    "proveedor": "Google AI Studio",
    "uso": "Muy buen acabado general y respeta bien el encuadre pedido",
    "nivel": "medio",
    "calidad": 4,
    "precio": 0.068,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "Runway Gen-4 Image",
    "proveedor": "Runway",
    "uso": "Mismo motor que el video Gen-4 -- útil para mantener el mismo estilo si ya generas los clips con Runway, sin pagar Replicate aparte",
    "nivel": "alto",
    "calidad": 4,
    "precio": 0.085,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "Runway GPT Image 2",
    "proveedor": "Runway",
    "uso": "El modelo de imagen que Runway promueve actualmente en su documentación -- prueba esta opción si Gen-4 Image no da el resultado que buscas",
    "nivel": "alto",
    "calidad": 4,
    "precio": 0.085,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "Grok Image",
    "proveedor": "xAI",
    "uso": "Mismo proveedor que el video con voz de Grok Imagine -- evita conectar una cuenta más si ya usas xAI",
    "nivel": "economico",
    "calidad": 3,
    "precio": 0.034,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "Qwen-Image 3.0",
    "proveedor": "Alibaba (Qwen / Wan)",
    "uso": "Muy buena relación precio-calidad y escribe bien textos en español dentro de la imagen (promociones, avisos, flyers)",
    "nivel": "medio",
    "calidad": 4,
    "precio": 0.0595,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "imagen",
    "modelo": "Wan 2.6 Imagen",
    "proveedor": "Alibaba (Qwen / Wan)",
    "uso": "Económico, fotos realistas e ilustraciones",
    "nivel": "economico",
    "calidad": 3,
    "precio": 0.051,
    "precio10s": null,
    "unidad": "por imagen"
  },
  {
    "tipo": "video",
    "modelo": "Runway Gen-4.5",
    "proveedor": "Runway",
    "uso": "Modelo más reciente: excelente apego a la imagen ancla y movimiento natural",
    "nivel": "medio",
    "calidad": 4,
    "precio": 0.425,
    "precio10s": 0.85,
    "unidad": "clip de 5 s"
  },
  {
    "tipo": "video",
    "modelo": "Runway Seedance 2.5",
    "proveedor": "Runway",
    "uso": "Especializado en movimientos fluidos y dinámicos, ideal para secuencias activas",
    "nivel": "economico",
    "calidad": 4,
    "precio": 0.374,
    "precio10s": 0.765,
    "unidad": "clip de 5 s"
  },
  {
    "tipo": "video",
    "modelo": "Veo 3.1",
    "proveedor": "Runway",
    "uso": "Modelo de Google accesible con tu misma llave de Runway. Puede incluir audio nativo según la documentación de Runway, pero esto no está c…",
    "nivel": "alto",
    "calidad": 5,
    "precio": 0.68,
    "precio10s": 1.36,
    "unidad": "clip de 5 s"
  },
  {
    "tipo": "video",
    "modelo": "WAN 3",
    "proveedor": "Runway",
    "uso": "Otro modelo de terceros disponible con tu llave de Runway. Puede incluir audio nativo, pendiente de confirmar en vivo -- usa el bloque de…",
    "nivel": "medio",
    "calidad": 3,
    "precio": 0.425,
    "precio10s": 0.85,
    "unidad": "clip de 5 s"
  },
  {
    "tipo": "video",
    "modelo": "Grok Imagine 1.5",
    "proveedor": "Runway",
    "uso": "Mismo modelo que la opción de xAI de abajo, pero facturado a través de Runway en vez de xAI. No acepta muestras de audio de referencia po…",
    "nivel": "alto",
    "calidad": 4,
    "precio": 0.595,
    "precio10s": 1.19,
    "unidad": "clip de 5 s"
  },
  {
    "tipo": "video",
    "modelo": "Runway Act-Two",
    "proveedor": "Runway",
    "uso": "Transfiere una actuación real: sube un video tuyo (o de quien sea) diciendo el diálogo, y tu imagen ancla lo actúa calcando gestos, labio…",
    "nivel": "medio",
    "calidad": 4,
    "precio": 0.51,
    "precio10s": 1.02,
    "unidad": "clip de 5 s"
  },
  {
    "tipo": "video",
    "modelo": "Grok Imagine",
    "proveedor": "xAI",
    "uso": "Genera el video completo en un solo paso: voz, diálogo, audio ambiente y labios sincronizados, a partir de tu imagen ancla y el prompt. N…",
    "nivel": "medio",
    "calidad": 4,
    "precio": 0.51,
    "precio10s": 1.02,
    "unidad": "clip de 5 s"
  },
  {
    "tipo": "video",
    "modelo": "Grok Imagine 1.5",
    "proveedor": "xAI",
    "uso": "La versión completa de Grok Imagine: mejor calidad, hasta 1080p, y acepta hasta 3 muestras de audio de referencia para que el personaje h…",
    "nivel": "alto",
    "calidad": 5,
    "precio": 0.595,
    "precio10s": 1.19,
    "unidad": "clip de 5 s"
  },
  {
    "tipo": "video",
    "modelo": "Grok Imagine 1.5 Lite",
    "proveedor": "xAI",
    "uso": "Misma referencia de voz que la 1.5, pero más barata -- pensada para videos simples, no para la máxima calidad.",
    "nivel": "economico",
    "calidad": 3,
    "precio": 0.34,
    "precio10s": 0.68,
    "unidad": "clip de 5 s"
  }
];

export function formatoPrecioModelo(n: number): string {
  return n < 0.1 ? n.toFixed(3) : n.toFixed(2);
}
