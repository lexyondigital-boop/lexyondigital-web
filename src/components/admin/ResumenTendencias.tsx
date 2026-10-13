import { obtenerResumenTendenciasPorNicho } from "@/lib/tendencias";

// Las fechas se calculan fuera del cuerpo del componente -- llamar
// Date.now() directo ahí dispara react-hooks/purity (un Server Component se
// trata como función de render, que debe ser pura).
function fechasDeHoy() {
  const hoy = new Date().toISOString().slice(0, 10);
  const corte = new Date(Date.now() - 30 * 86_400_000).toISOString().slice(0, 10);
  return { hoy, corte };
}

// Panel de inicio del admin: de un vistazo, qué tan al día está la
// recolección semanal de tendencias (n8n, en la plataforma hermana) por
// rubro -- sin tener que entrar a Tendencias y revisar nicho por nicho.
export async function ResumenTendencias() {
  const resumen = await obtenerResumenTendenciasPorNicho();
  const { hoy, corte } = fechasDeHoy();

  return (
    <div className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-5">
      <h2 className="font-semibold text-[var(--color-texto)]">Tendencias de contenido por nicho</h2>
      <p className="mt-1 text-sm text-[var(--color-texto-mute)]">
        Última captura global por rubro (corrida semanal de n8n, lunes). Vigentes = capturadas en los últimos 30 días.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-[var(--color-texto-mute)]">
              <th className="pb-2 pr-4 font-medium">Nicho</th>
              <th className="pb-2 pr-4 font-medium">Vigentes</th>
              <th className="pb-2 font-medium">Última actualización</th>
            </tr>
          </thead>
          <tbody>
            {resumen.map((r) => {
              const desactualizado = !r.ultimaActualizacion || r.ultimaActualizacion < corte;
              return (
                <tr key={r.clave} className="border-t border-[var(--color-borde)]">
                  <td className="py-2 pr-4 text-[var(--color-texto)]">{r.etiqueta}</td>
                  <td className="py-2 pr-4 text-[var(--color-texto)]">{r.vigentes}</td>
                  <td className={`py-2 ${desactualizado ? "font-medium text-[var(--color-aviso)]" : "text-[var(--color-texto-mute)]"}`}>
                    {r.ultimaActualizacion ?? "Sin capturas"}
                    {desactualizado && r.ultimaActualizacion && r.ultimaActualizacion !== hoy && " · sin actualizar"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
