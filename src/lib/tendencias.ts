import { createClient } from "@/lib/supabase/server";

// Tendencias de contenido capturadas por la plataforma de LexyonDigital
// (app.lexyondigital.com.mx -- tabla "tendencias", alimentada por n8n y por
// captura manual del equipo) en el mismo proyecto de Supabase compartido.
// Esta web solo LEE: la captura/edición de tendencias vive allá.
//
// "emprendedores" es el nicho de la cuenta "lexyondigital" dentro de esa
// plataforma (confirmado en vivo: id 3d1982c3-5fa3-4a6f-a9dd-24ca13b7f446,
// la cuenta real con 3 perfiles, no "Lexyondigital (interno)" que es de
// prueba) -- se filtra por ese nicho + esa cuenta (más las tendencias
// globales del nicho, cuenta_id null) para no mezclar tendencias de otros
// clientes de la plataforma (abogados, cobranza, etc.).
const NICHO = "emprendedores";
const CUENTA_ID = "3d1982c3-5fa3-4a6f-a9dd-24ca13b7f446";
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

export async function obtenerTendenciasVigentes(): Promise<Tendencia[]> {
  const supabase = await createClient();
  const desde = new Date(Date.now() - DIAS_VIGENCIA * 86_400_000).toISOString().slice(0, 10);

  const { data } = await supabase
    .from("tendencias")
    .select("id, termino, fuente, descripcion, metrica, url, relevancia, capturada_en")
    .eq("nicho", NICHO)
    .eq("region", REGION)
    .gte("capturada_en", desde)
    .or(`cuenta_id.is.null,cuenta_id.eq.${CUENTA_ID}`)
    .order("relevancia", { ascending: false })
    .order("capturada_en", { ascending: false });

  return data ?? [];
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
