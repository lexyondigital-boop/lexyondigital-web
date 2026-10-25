import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { SERVICIOS } from "@/lib/servicios";
import { URL_SITIO } from "@/lib/sitio";

// Se regenera cada hora: un post o taller recién publicado entra solo, sin
// redeploy.
export const revalidate = 3600;

// Solo URLs públicas, canónicas (www) y con contenido. Fuera a propósito:
// /admin (privado) y las secciones que hoy son "Próximamente" (acerca-de,
// contacto, tienda, calculadora-ads) -- además llevan noindex hasta que
// tengan contenido real.
const PAGINAS_FIJAS: { ruta: string; prioridad: number; frecuencia: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { ruta: "/", prioridad: 1, frecuencia: "weekly" },
  { ruta: "/registro", prioridad: 0.9, frecuencia: "monthly" },
  { ruta: "/blog", prioridad: 0.7, frecuencia: "weekly" },
  { ruta: "/biblioteca", prioridad: 0.7, frecuencia: "weekly" },
  { ruta: "/privacidad", prioridad: 0.2, frecuencia: "yearly" },
  { ruta: "/terminos", prioridad: 0.2, frecuencia: "yearly" },
  { ruta: "/cookies", prioridad: 0.2, frecuencia: "yearly" },
];

type FilaPublicada = { slug: string; updated_at: string | null; publicado_en?: string | null };

// Blog y biblioteca vienen de Supabase con la llave anónima: la RLS solo
// deja ver lo publicado. Si la consulta falla, el sitemap sale igual con
// las páginas fijas en vez de romperse.
async function publicadas(tabla: "blog_posts" | "talleres", columnas: string): Promise<FilaPublicada[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const llave = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !llave) return [];
  try {
    const supabase = createClient(url, llave, { auth: { persistSession: false } });
    const { data, error } = await supabase.from(tabla).select(columnas).eq("publicado", true);
    if (error || !data) return [];
    return data as unknown as FilaPublicada[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, talleres] = await Promise.all([
    publicadas("blog_posts", "slug, updated_at, publicado_en"),
    publicadas("talleres", "slug, updated_at"),
  ]);

  return [
    ...PAGINAS_FIJAS.map((p) => ({
      url: p.ruta === "/" ? URL_SITIO : `${URL_SITIO}${p.ruta}`,
      changeFrequency: p.frecuencia,
      priority: p.prioridad,
    })),
    ...SERVICIOS.map((s) => ({
      url: `${URL_SITIO}/servicios/${s.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${URL_SITIO}/blog/${p.slug}`,
      lastModified: p.updated_at ?? p.publicado_en ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...talleres.map((t) => ({
      url: `${URL_SITIO}/biblioteca/${t.slug}`,
      lastModified: t.updated_at ?? undefined,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
