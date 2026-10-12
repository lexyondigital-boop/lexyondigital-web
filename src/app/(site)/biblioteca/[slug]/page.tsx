import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ReproductorTaller } from "@/components/ReproductorTaller";

export const dynamic = "force-dynamic";

async function obtenerTaller(slug: string) {
  const supabase = await createClient();
  // Sin el filtro publicado=true explícito -- lo resuelve la RLS
  // (talleres_select: publicado=true OR es_super_admin()), así un
  // super_admin logueado puede previsualizar un borrador desde "Ver" en
  // /admin, y un visitante anónimo sigue sin poder verlo.
  const { data: taller } = await supabase
    .from("talleres")
    .select("id, titulo, descripcion, imagen_url, publicado")
    .eq("slug", slug)
    .maybeSingle();

  if (!taller) return null;

  const { data: modulosData } = await supabase
    .from("modulos")
    .select("id, titulo, orden, taller_modulos(id, titulo, descripcion, youtube_url, orden)")
    .eq("taller_id", taller.id)
    .order("orden", { ascending: true })
    .order("orden", { referencedTable: "taller_modulos", ascending: true });

  const modulos = (modulosData ?? []).map((m) => ({
    id: m.id,
    titulo: m.titulo,
    capitulos: m.taller_modulos,
  }));

  return { taller, modulos };
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
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      {!taller.publicado && (
        <span className="mb-3 inline-block rounded-full bg-[var(--color-aviso)]/15 px-3 py-1 text-xs font-medium text-[var(--color-aviso)]">
          Borrador — solo visible para administradores
        </span>
      )}
      <h1 className="text-3xl font-bold text-[var(--color-texto)] sm:text-4xl">{taller.titulo}</h1>
      <p className="mt-3 max-w-3xl text-[var(--color-texto-mute)]">{taller.descripcion}</p>

      <ReproductorTaller modulos={modulos} />
    </section>
  );
}
