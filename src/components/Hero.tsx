import { Logo } from "@/components/Logo";

const BENEFICIOS = [
  "Agente de IA que atiende WhatsApp 24/7",
  "Respaldo legal y contable siempre al día",
  "Capacitación práctica en Meta Ads",
];

type Nodo = {
  top: string;
  left: string;
  label: string;
  color: "marca" | "ia" | "datos";
  icono: React.ReactNode;
};

const ICONO_TAMAÑO = 16;

const NODOS: Nodo[] = [
  {
    top: "8%",
    left: "6%",
    label: "Agente de IA en WhatsApp",
    color: "ia",
    icono: (
      <svg width={ICONO_TAMAÑO} height={ICONO_TAMAÑO} viewBox="0 0 24 24" fill="none">
        <path
          d="M4 12a8 8 0 1 1 3.3 6.5L4 20l1.3-3.6A7.96 7.96 0 0 1 4 12Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    top: "2%",
    left: "58%",
    label: "CRM y Contactos",
    color: "datos",
    icono: (
      <svg width={ICONO_TAMAÑO} height={ICONO_TAMAÑO} viewBox="0 0 24 24" fill="none">
        <rect x="3.5" y="5" width="17" height="14" rx="2.2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M3.5 9.5h17" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    top: "30%",
    left: "78%",
    label: "Agenda y Citas",
    color: "marca",
    icono: (
      <svg width={ICONO_TAMAÑO} height={ICONO_TAMAÑO} viewBox="0 0 24 24" fill="none">
        <rect x="4" y="5.5" width="16" height="14.5" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4 10h16M8 3.5v3M16 3.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    top: "56%",
    left: "4%",
    label: "Marketing Digital",
    color: "marca",
    icono: (
      <svg width={ICONO_TAMAÑO} height={ICONO_TAMAÑO} viewBox="0 0 24 24" fill="none">
        <path d="M3 10v4l4 1 12 4V5L7 9l-4 1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    top: "62%",
    left: "62%",
    label: "Legal y Contable",
    color: "marca",
    icono: (
      <svg width={ICONO_TAMAÑO} height={ICONO_TAMAÑO} viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M6 7l-3 6a3 3 0 0 0 6 0l-3-6ZM18 7l-3 6a3 3 0 0 0 6 0l-3-6ZM6 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    top: "86%",
    left: "34%",
    label: "Automatización",
    color: "datos",
    icono: (
      <svg width={ICONO_TAMAÑO} height={ICONO_TAMAÑO} viewBox="0 0 24 24" fill="none">
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const LINEAS = [
  "M 50 50 L 14 15",
  "M 50 50 L 65 8",
  "M 50 50 L 82 36",
  "M 50 50 L 11 62",
  "M 50 50 L 68 67",
  "M 50 50 L 40 88",
];

function colorDe(color: Nodo["color"]) {
  return color === "ia" ? "var(--color-ia)" : color === "datos" ? "var(--color-datos)" : "var(--color-marca)";
}

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="mb-4 inline-block rounded-full border border-[var(--color-borde)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-texto-mute)]">
            Marketing · Legal · Contable · IA
          </span>
          <h1 className="text-balance text-4xl font-bold leading-[1.1] text-[var(--color-texto)] sm:text-5xl">
            Todo lo que tu negocio necesita para crecer,{" "}
            <span
              style={{
                backgroundImage: "var(--gradiente-marca)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              en un solo lugar
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base text-[var(--color-texto-mute)] sm:text-lg">
            Capacitación en marketing digital, asesoría legal y contable, y nuestra propia plataforma con un
            agente de inteligencia artificial que atiende a tus clientes por WhatsApp — sin que se te escape
            ni un mensaje.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#servicios"
              className="rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)", boxShadow: "var(--halo-accion)" }}
            >
              Conoce nuestros servicios
            </a>
            <a
              href="https://app.lexyondigital.com.mx"
              className="rounded-lg border border-[var(--color-borde)] px-5 py-3 text-sm font-semibold text-[var(--color-texto)] transition-colors hover:border-[var(--color-borde-alto)]"
            >
              Ir a la plataforma
            </a>
          </div>

          <ul className="mt-9 space-y-2.5">
            {BENEFICIOS.map((b) => (
              <li key={b} className="flex items-center gap-2.5 text-sm text-[var(--color-texto-mute)]">
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px]"
                  style={{ background: "var(--color-marca)", color: "#fff" }}
                >
                  ✓
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-md lg:max-w-none">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            {LINEAS.map((d) => (
              <path key={d} d={d} stroke="var(--color-borde-alto)" strokeWidth="0.4" fill="none" />
            ))}
          </svg>

          <div
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)]"
            style={{ boxShadow: "0 0 0 6px color-mix(in srgb, var(--color-marca) 8%, transparent)" }}
          >
            <Logo tamaño="sm" />
          </div>

          {NODOS.map((n) => (
            <div
              key={n.label}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-[var(--color-tarjeta)] px-3 py-2 text-xs font-medium text-[var(--color-texto)] shadow-sm"
              style={{ top: n.top, left: n.left, borderColor: "var(--color-borde)" }}
            >
              <span style={{ color: colorDe(n.color) }}>{n.icono}</span>
              <span className="whitespace-nowrap">{n.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
