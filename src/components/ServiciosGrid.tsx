import Link from "next/link";
import { SERVICIOS, type Servicio } from "@/lib/servicios";

const ICONOS: Record<string, React.ReactNode> = {
  "capacitacion-marketing-digital": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path d="M3 10v4l4 1 12 4V5L7 9l-4 1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  "asesoria-legal": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3v18M6 7l-3 6a3 3 0 0 0 6 0l-3-6ZM18 7l-3 6a3 3 0 0 0 6 0l-3-6ZM6 7h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  contabilidad: (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="3.5" width="16" height="17" rx="1.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  "automatizacion-agentes-ia": (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 12a8 8 0 1 1 3.3 6.5L4 20l1.3-3.6A7.96 7.96 0 0 1 4 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

function colorDe(color: Servicio["color"]) {
  return color === "ia" ? "var(--color-ia)" : color === "datos" ? "var(--color-datos)" : "var(--color-marca)";
}

export function ServiciosGrid() {
  return (
    <section id="servicios" className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-bold text-[var(--color-texto)]">Nuestros servicios</h2>
        <p className="mt-3 text-[var(--color-texto-mute)]">
          Todo lo que necesitas para operar, promocionar y proteger tu negocio, en un solo lugar.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {SERVICIOS.map((s) => (
          <Link
            key={s.slug}
            href={`/servicios/${s.slug}`}
            className="group rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6 transition-colors hover:border-[var(--color-borde-alto)]"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "color-mix(in srgb, " + colorDe(s.color) + " 14%, transparent)", color: colorDe(s.color) }}
            >
              {ICONOS[s.slug]}
            </span>
            <h3 className="mt-4 text-lg font-semibold text-[var(--color-texto)]">{s.nombre}</h3>
            <p className="mt-2 text-sm text-[var(--color-texto-mute)]">{s.resumen}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-marca)]">
              Saber más
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
