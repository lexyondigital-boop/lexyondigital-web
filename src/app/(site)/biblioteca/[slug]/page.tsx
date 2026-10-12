import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { extraerIdYoutube } from "@/lib/youtube";

export const dynamic = "force-dynamic";

async function obtenerTaller(slug: string) {
  const supabase = await createClient();
  const { data: taller } = await supabase
    .from("talleres")
    .select("id, titulo, descripcion, imagen_url")
    .eq("slug", slug)
    .eq("publicado", true)
    .maybeSingle();

  if (!taller) return null;

  const { data: modulos } = await supabase
    .from("taller_modulos")
    .select("id, titulo, descripcion, youtube_url, orden")
    .eq("taller_id", taller.id)
    .order("orden", { ascending: true });

  return { taller, modulos: modulos ?? [] };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const datos = await obtenerTaller(slug);
  if (!datos) return {};
  return { title: `${datos.taller.titulo} — Biblioteca LexyonDigital`, description: datos.taller.descripcion };
}

export default async function TallerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const datos = await obtenerTaller(slug);
  if (!datos) notFound();
  const { taller, modulos } = datos;

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h1 className="text-3xl font-bold text-[var(--color-texto)] sm:text-4xl">{taller.titulo}</h1>
      <p className="mt-3 text-[var(--color-texto-mute)]">{taller.descripcion}</p>

      <div className="mt-10 space-y-10">
        {modulos.map((m, i) => {
          const videoId = extraerIdYoutube(m.youtube_url);
          return (
            <div key={m.id}>
              <h2 className="text-lg font-semibold text-[var(--color-texto)]">
                {i + 1}. {m.titulo}
              </h2>
              {m.descripcion && <p className="mt-1 text-sm text-[var(--color-texto-mute)]">{m.descripcion}</p>}
              {videoId && (
                <div className="mt-3 aspect-video overflow-hidden rounded-2xl border border-[var(--color-borde)]">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={m.titulo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
              )}
            </div>
          );
        })}
        {modulos.length === 0 && <p className="text-[var(--color-texto-mute)]">Este taller aún no tiene módulos publicados.</p>}
      </div>
    </section>
  );
}
