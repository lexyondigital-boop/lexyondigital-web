import { obtenerTendenciasPorNicho, etiquetaFuente } from "@/lib/tendencias";
import { CrearBlogButton } from "@/components/admin/CrearBlogButton";

export const dynamic = "force-dynamic";

export default async function TendenciasPage() {
  const grupos = await obtenerTendenciasPorNicho();
  const totalTendencias = grupos.reduce((n, g) => n + g.tendencias.length, 0);

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-texto)]">Tendencias</h1>
        <p className="mt-1 text-sm text-[var(--color-texto-mute)]">
          Tendencias globales capturadas por la plataforma de LexyonDigital (app.lexyondigital.com.mx → Contenido →
          Tendencias), de todos los nichos que cubre la corrida semanal -- no solo el de esta cuenta. Genera un blog
          corto con IA a partir de cualquiera; queda como borrador en <span className="font-medium">Blog</span> para
          revisar antes de publicar.
        </p>
      </div>

      {totalTendencias > 0 && (
        <nav className="flex flex-wrap gap-2 text-xs">
          {grupos
            .filter((g) => g.tendencias.length > 0)
            .map((g) => (
              <a
                key={g.clave}
                href={`#nicho-${g.clave}`}
                className="rounded-full border border-[var(--color-borde)] px-3 py-1 font-medium text-[var(--color-texto-mute)] hover:border-[var(--color-marca)] hover:text-[var(--color-marca)]"
              >
                {g.etiqueta} ({g.tendencias.length})
              </a>
            ))}
        </nav>
      )}

      {totalTendencias === 0 && (
        <p className="text-sm text-[var(--color-texto-mute)]">
          No hay tendencias vigentes todavía. Se capturan automáticamente desde app.lexyondigital.com.mx (Contenido →
          Tendencias) o a mano desde ahí mismo.
        </p>
      )}

      {grupos.map(
        (grupo) =>
          grupo.tendencias.length > 0 && (
            <section key={grupo.clave} id={`nicho-${grupo.clave}`} className="scroll-mt-20 space-y-3">
              <h2 className="text-lg font-semibold text-[var(--color-texto)]">
                {grupo.etiqueta} <span className="text-sm font-normal text-[var(--color-texto-mute)]">({grupo.tendencias.length})</span>
              </h2>

              <div className="space-y-3">
                {grupo.tendencias.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-start justify-between gap-4 rounded-xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-4"
                  >
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-marca)]">
                        {etiquetaFuente(t.fuente)} · relevancia {t.relevancia}/5
                      </p>
                      <h3 className="mt-1 font-semibold text-[var(--color-texto)]">{t.termino}</h3>
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
              </div>
            </section>
          ),
      )}
    </div>
  );
}
