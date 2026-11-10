import Link from "next/link";
import { FondoPuntos } from "@/components/hero/FondoPuntos";
import { PalabraRotativa } from "@/components/hero/PalabraRotativa";
import { ChatAnimado } from "@/components/hero/ChatAnimado";

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

// Posición de cada etiqueta flotante alrededor del teléfono (escritorio).
const POSICIONES = [
  "left-[2%] top-[12%]",
  "right-[0%] top-[6%]",
  "right-[4%] top-[46%]",
  "left-[0%] top-[52%]",
  "right-[10%] bottom-[6%]",
  "left-[8%] bottom-[2%]",
];

function colorDe(color: Nodo["color"]) {
  return color === "ia" ? "#ec4899" : color === "datos" ? "#35d6c4" : "#a855f7";
}

const PRIMERA_LINEA = "Todo lo que tu negocio necesita para".split(" ");

export function Hero() {
  return (
    <section className="hero-oscuro relative isolate overflow-hidden bg-[var(--hero-bg)] text-[var(--hero-texto)]">
      <FondoPuntos className="absolute inset-0 -z-10 h-full w-full" />

      <div className="mx-auto max-w-6xl px-5 pb-16 pt-16 text-center sm:pb-20 sm:px-8 sm:pt-24">
        <span className="aparecer inline-block rounded-full border border-[var(--hero-borde)] bg-[var(--hero-chip)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--hero-mute)] backdrop-blur">
          Marketing · Legal · Contable · IA
        </span>

        <h1 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          <span className="block">
            {PRIMERA_LINEA.map((p, n) => (
              <span key={n} className="palabra-entrada inline-block" style={{ animationDelay: `${120 + n * 90}ms` }}>
                {p}&nbsp;
              </span>
            ))}
          </span>
          <span className="palabra-entrada mt-1 block" style={{ animationDelay: `${120 + PRIMERA_LINEA.length * 90}ms` }}>
            <PalabraRotativa palabras={["crecer", "vender más", "atender 24/7", "estar en orden"]} />
          </span>
        </h1>

        <p className="aparecer mx-auto mt-6 max-w-2xl text-base text-[var(--hero-mute)] [animation-delay:900ms] sm:text-lg">
          <strong className="font-semibold text-[var(--hero-texto)]">LexyonDigital</strong> une capacitación en marketing, asesoría{" "}
          <strong className="font-semibold text-[var(--hero-texto)]">legal y contable</strong> y un{" "}
          <strong className="font-semibold text-[var(--hero-texto)]">agente de IA</strong> que atiende a tus clientes por WhatsApp — sin que se te
          escape ni un mensaje.
        </p>

        <div className="aparecer mt-9 flex flex-wrap justify-center gap-3 [animation-delay:1050ms]">
          <Link href="/registro" className="boton-brillo rounded-full px-6 py-3 text-sm font-semibold text-white">
            Prueba gratis 14 días
          </Link>
          <a
            href="#servicios"
            className="rounded-full border border-[var(--hero-borde)] px-6 py-3 text-sm font-semibold text-[var(--hero-texto)] transition-colors hover:border-[var(--color-marca)]"
          >
            Conoce nuestros servicios
          </a>
        </div>

        <ul className="aparecer mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 [animation-delay:1200ms]">
          {BENEFICIOS.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-[var(--hero-mute)]">
              <span className="text-[var(--color-en-vivo)]">✓</span>
              {b}
            </li>
          ))}
        </ul>

        <div className="aparecer relative mx-auto mt-14 max-w-4xl [animation-delay:1300ms]">
          <div aria-hidden="true" className="halo-telefono absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <ChatAnimado />
          {NODOS.map((n, k) => (
            <div
              key={n.label}
              className={`flotar absolute hidden items-center gap-2 rounded-full border border-[var(--hero-borde)] bg-[var(--hero-chip)] px-3.5 py-2 text-xs font-medium text-[var(--hero-texto)] shadow-sm backdrop-blur-md md:flex ${POSICIONES[k]}`}
              style={{ animationDelay: `${k * -1.3}s` }}
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
