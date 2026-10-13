import { createClient } from "@/lib/supabase/server";

// Tendencias de contenido capturadas por la plataforma de LexyonDigital
// (app.lexyondigital.com.mx -- tabla "tendencias", alimentada por n8n y por
// captura manual del equipo) en el mismo proyecto de Supabase compartido.
// Esta web solo LEE: la captura/edición de tendencias vive allá.
//
// Vista "cuenta master": todos los nichos que cubre la corrida semanal de
// n8n, no solo el de la cuenta de lexyondigital -- así se pueden generar
// blogs de cualquier sector desde un solo lugar. Solo las globales
// (cuenta_id null); lo que una sub-cuenta captura a mano para sí misma no
// aparece aquí.
export const NICHOS: { clave: string; etiqueta: string }[] = [
  { clave: "emprendedores", etiqueta: "Emprendedores y negocios" },
  { clave: "clinicas", etiqueta: "Clínicas, médicos y consultorios" },
  { clave: "abogados", etiqueta: "Abogados y despachos jurídicos" },
  { clave: "contadores", etiqueta: "Contadores y despachos contables" },
  { clave: "inmobiliaria", etiqueta: "Inmobiliaria y agentes" },
  { clave: "servicios", etiqueta: "Servicios y atención técnica" },
  { clave: "cobranza", etiqueta: "Cobranza y recuperación de cartera" },
];
const REGION = "MX";

// Mismo criterio de vigencia que la plataforma (src/lib/tendencias.ts allá):
// una tendencia de hace más de 30 días ya no es una tendencia.
const DIAS_VIGENCIA = 30;

export type Tendencia = {
  id: string;
  termino: string;
  fuente: string;
  descripcion: string | null;
  metrica: string | null;
  url: string | null;
  relevancia: number;
  capturada_en: string;
};

// Etiquetas de las fuentes -- subconjunto de las que usa la plataforma,
// solo para mostrar algo legible en vez de la clave cruda.
const ETIQUETAS_FUENTE: Record<string, string> = {
  tiktok_creative_center: "TikTok Creative Center",
  google_trends: "Google Trends",
  exploding_topics: "Exploding Topics",
  buzzsumo: "BuzzSumo",
  answerthepublic: "AnswerThePublic",
  viral_new: "Viral.new",
  predis_contentstudio: "Predis / ContentStudio",
  noticias: "Prensa del sector",
  regulatorio: "Cambio regulatorio",
  manual: "Captura manual",
  otra: "Otra fuente",
};

export function etiquetaFuente(clave: string): string {
  return ETIQUETAS_FUENTE[clave] ?? clave;
}

export type GrupoNicho = { clave: string; etiqueta: string; tendencias: Tendencia[] };

// Todas las tendencias vigentes, globales (cuenta_id null), agrupadas por
// nicho en el mismo orden que NICHOS -- un nicho sin tendencias vigentes
// igual aparece con el arreglo vacío, para que la sección exista y quede
// claro que no es que falte cargar algo.
export async function obtenerTendenciasPorNicho(): Promise<GrupoNicho[]> {
  const supabase = await createClient();
  const desde = new Date(Date.now() - DIAS_VIGENCIA * 86_400_000).toISOString().slice(0, 10);

  const { data } = await supabase
    .from("tendencias")
    .select("id, nicho, termino, fuente, descripcion, metrica, url, relevancia, capturada_en")
    .in(
      "nicho",
      NICHOS.map((n) => n.clave),
    )
    .eq("region", REGION)
    .gte("capturada_en", desde)
    .is("cuenta_id", null)
    .order("relevancia", { ascending: false })
    .order("capturada_en", { ascending: false });

  const porNicho = new Map<string, Tendencia[]>();
  for (const fila of (data as (Tendencia & { nicho: string })[] | null) ?? []) {
    const lista = porNicho.get(fila.nicho) ?? [];
    lista.push(fila);
    porNicho.set(fila.nicho, lista);
  }

  return NICHOS.map((n) => ({ clave: n.clave, etiqueta: n.etiqueta, tendencias: porNicho.get(n.clave) ?? [] }));
}

export async function obtenerTendencia(id: string): Promise<Tendencia | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tendencias")
    .select("id, termino, fuente, descripcion, metrica, url, relevancia, capturada_en")
    .eq("id", id)
    .maybeSingle();
  return data;
}
