import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TallerForm } from "@/components/admin/TallerForm";
import { ModulosManager } from "@/components/admin/ModulosManager";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { actualizarTaller, eliminarTaller } from "@/lib/talleres-actions";

export const dynamic = "force-dynamic";

export default async function EditarTallerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: taller } = await supabase
    .from("talleres")
    .select("id, slug, titulo, descripcion, publicado, orden, imagen_url")
    .eq("id", id)
    .maybeSingle();

  if (!taller) notFound();

  const { data: modulosData } = await supabase
    .from("modulos")
    .select("id, titulo, orden, taller_modulos(id, titulo, descripcion, youtube_url, orden)")
    .eq("taller_id", id)
    .order("orden", { ascending: true })
    .order("orden", { referencedTable: "taller_modulos", ascending: true });

  const modulos = (modulosData ?? []).map((m) => ({
    id: m.id,
    titulo: m.titulo,
    orden: m.orden,
    capitulos: m.taller_modulos,
  }));

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-texto)]">Editar taller</h1>
        <div className="flex items-center gap-4">
          <a
            href={`/biblioteca/${taller.slug}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-[var(--color-marca)] hover:underline"
          >
            Ver {!taller.publicado && "(borrador)"}
          </a>
          <ConfirmDeleteButton
            accion={eliminarTaller.bind(null, id)}
            confirmar={`¿Eliminar el taller "${taller.titulo}" y todos sus módulos?`}
            etiqueta="Eliminar taller"
          />
        </div>
      </div>

      <TallerForm taller={taller} accion={actualizarTaller.bind(null, id)} />

      <div>
        <h2 className="text-lg font-semibold text-[var(--color-texto)]">Módulos y capítulos</h2>
        <p className="mt-1 text-sm text-[var(--color-texto-mute)]">
          Organiza el taller en módulos (ej. &quot;Módulo 1&quot;) y, dentro de cada uno, sus capítulos en video.
        </p>
        <div className="mt-4">
          <ModulosManager tallerId={id} modulos={modulos} />
        </div>
      </div>
    </div>
  );
}
