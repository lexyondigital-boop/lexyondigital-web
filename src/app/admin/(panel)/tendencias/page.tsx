import { obtenerTendenciasVigentes, etiquetaFuente } from "@/lib/tendencias";
import { CrearBlogButton } from "@/components/admin/CrearBlogButton";

export const dynamic = "force-dynamic";

export default async function TendenciasPage() {
  const tendencias = await obtenerTendenciasVigentes();

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-texto)]">Tendencias</h1>
        <p className="mt-1 text-sm text-[var(--color-texto-mute)]">
          Tendencias del sector capturadas por la plataforma de LexyonDigital (app.lexyondigital.com.mx → Contenido →
          Tendencias). Genera un blog corto con IA a partir de cualquiera; queda como borrador en{" "}
          <span className="font-medium">Blog</span> para revisar antes de publicar.
        </p>
      </div>

      <div className="space-y-3">
        {tendencias.map((t) => (
          <div key={t.id} className="flex items-start justify-between gap-4 rounded-xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-marca)]">
                {etiquetaFuente(t.fuente)} · relevancia {t.relevancia}/5
              </p>
              <h2 className="mt-1 font-semibold text-[var(--color-texto)]">{t.termino}</h2>
              {t.descripcion && <p className="mt-1 text-sm text-[var(--color-texto-mute)]">{t.descripcion}</p>}
              <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-[var(--color-texto-mute)]">
                {t.metrica && <span>{t.metrica}</span>}
                <span>{t.capturada_en}</span>
                {t.url && (
                  <a href={t.url} target="_blank" rel="noreferrer" className="text-[var(--color-marca)] hover:underline">
                    Fuente
                  </a>
                )}
              </div>
            </div>
            <CrearBlogButton tendenciaId={t.id} />
          </div>
        ))}

        {tendencias.length === 0 && (
          <p className="text-sm text-[var(--color-texto-mute)]">
            No hay tendencias vigentes todavía. Se capturan automáticamente desde app.lexyondigital.com.mx (Contenido →
            Tendencias) o a mano desde ahí mismo.
          </p>
        )}
      </div>
    </div>
  );
}
