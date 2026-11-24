import type { Metadata } from "next";
import Link from "next/link";
import { metadataPagina } from "@/lib/metadata-pagina";
import { URL_WHATSAPP } from "@/lib/sitio";

// Quiénes somos. Reemplaza el placeholder "Próximamente" que tenía esta
// ruta -- se mantiene /acerca-de (ya enlazada en el header y conocida por
// Google) en vez de abrir una página nueva.

const ENLACE_PRUEBA = "/registro";

// No hay todavía un link de agenda propio (tipo Calendly) para Gilberto
// León: por ahora manda al WhatsApp de LexyonDigital con un mensaje
// precargado, que es el mismo número que ya usa el resto del sitio.
const ENLACE_AGENDA = `${URL_WHATSAPP}?text=${encodeURIComponent("Hola, quiero agendar una sesión con Gilberto León de LexyonDigital.")}`;

const URL_PPR = "https://elgueydeloseguross.com.mx/ppr";

const TITULO = "Quiénes somos | LexyonDigital";
const DESCRIPCION =
  "Tecnología que trabaja para tu negocio, aunque tú no estés: agentes de IA para WhatsApp, marketing, asesoría legal, contable y de seguros con LexyonDigital.";

export const metadata: Metadata = metadataPagina({ titulo: TITULO, descripcion: DESCRIPCION, ruta: "/acerca-de" });

const TITULO_SECCION = "text-2xl font-bold text-[var(--color-texto)] sm:text-3xl";
const TARJETA = "rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6";

function BotonSecundario({ href, children, externo = false }: { href: string; children: React.ReactNode; externo?: boolean }) {
  return (
    <a
      href={href}
      {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-block rounded-full border border-[var(--color-borde)] px-6 py-3 text-sm font-semibold text-[var(--color-texto)] hover:border-[var(--color-marca)]"
    >
      {children}
    </a>
  );
}

const QUE_HACEMOS: {
  titulo: string;
  texto: string;
  etiqueta?: string;
  boton?: { texto: string; href: string; externo?: boolean };
  extra?: React.ReactNode;
}[] = [
  {
    titulo: "Agentes de IA para atención y ventas",
    texto:
      "Un asistente que contesta a tus clientes en WhatsApp, Instagram y Facebook las 24 horas. Agenda citas, resuelve dudas frecuentes y da seguimiento a cada persona interesada, para que ningún cliente se quede sin respuesta.",
  },
  {
    titulo: "Talleres personalizados de marketing",
    texto:
      "Sesiones prácticas en línea, diseñadas para tu negocio y no como cursos genéricos. Te enseñamos a crear contenido para redes sociales, entender a tu cliente ideal, hacer campañas en Meta, Instagram y TikTok y convertir seguidores en clientes. Sales de cada taller con un plan que puedes aplicar desde el día siguiente.",
    etiqueta: "Sin costo por tiempo limitado",
    boton: { texto: "Agenda tu taller gratis", href: ENLACE_AGENDA, externo: true },
  },
  {
    titulo: "Consultoría personalizada de negocio",
    texto:
      "Un especialista revisa tu negocio contigo en una sesión en línea para encontrar oportunidades de crecimiento: nuevos servicios, canales de venta, procesos que se pueden automatizar y áreas donde estás perdiendo tiempo o dinero. Después te acompañamos con asesoría para que las ideas se conviertan en resultados.",
    etiqueta: "Sin costo por tiempo limitado",
    boton: { texto: "Agenda tu consultoría gratis", href: ENLACE_AGENDA, externo: true },
  },
  {
    titulo: "Soluciones digitales para tu negocio",
    texto: "Páginas, embudos de venta y herramientas que te ayudan a atraer clientes y ordenar tu operación.",
  },
];

const VALORES = [
  { titulo: "Claridad", texto: "Te explicamos todo sin tecnicismos." },
  { titulo: "Honestidad", texto: "Te decimos qué hacemos nosotros y en qué te conectamos con especialistas." },
  { titulo: "Resultados", texto: "Medimos nuestro trabajo por lo que logras tú." },
  { titulo: "Cercanía", texto: "Hablas con personas reales que conocen tu negocio." },
];

const ICONO_VALOR: Record<string, React.ReactNode> = {
  Claridad: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  Honestidad: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="m4 12 5.5 5.5L20 7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Resultados: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  Cercanía: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M20.5 8.3c0 4.9-7.6 10-8.5 10.5-.9-.5-8.5-5.6-8.5-10.5a4.3 4.3 0 0 1 8.5-1 4.3 4.3 0 0 1 8.5 1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const PARA_QUIEN = [
  "Médicos",
  "Psicólogos",
  "Nutricionistas",
  "Clínicas",
  "Despachos",
  "Abogados",
  "Agentes inmobiliarios",
  "Agentes de seguros",
  "Negocios que quieren dejar de perder clientes y crecer con orden",
];

export default function AcercaDePage() {
  return (
    <article>
      <header className="mx-auto max-w-4xl px-5 py-14 text-center sm:px-8 sm:py-20">
        <h1 className="text-balance text-3xl font-bold leading-tight text-[var(--color-texto)] sm:text-5xl">
          Tecnología que trabaja para tu negocio, aunque tú no estés.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--color-texto-mute)] sm:text-lg">
          Somos LexyonDigital. Ayudamos a negocios, despachos, clínicas, médicos, psicólogos y nutricionistas a atender,
          vender y crecer con inteligencia artificial, marketing y asesoría hecha a su medida.
        </p>
      </header>

      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
        <h2 className={TITULO_SECCION}>Nuestra historia</h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-[var(--color-texto-mute)]">
          <p>
            LexyonDigital nació en 2026 en Mérida porque vimos un problema que se repite: muchos negocios pierden
            clientes porque no contestan a tiempo, no dan seguimiento o no tienen presencia digital. Las grandes
            empresas tienen equipos completos para eso. Los consultorios, despachos y negocios locales casi nunca.
          </p>
          <p>
            Decidimos cambiar eso. Construimos nuestra propia plataforma para que cualquier negocio tenga acceso a la
            misma tecnología y estrategia que usan los grandes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <h2 className={`${TITULO_SECCION} text-center`}>Qué hacemos</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {QUE_HACEMOS.map((q) => (
            <div key={q.titulo} className={TARJETA}>
              {q.etiqueta && (
                <span className="mb-3 inline-block rounded-full bg-[var(--color-en-vivo)]/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-en-vivo)]">
                  {q.etiqueta}
                </span>
              )}
              <h3 className="text-lg font-semibold text-[var(--color-texto)]">{q.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-texto-mute)]">{q.texto}</p>
              {q.boton && (
                <a
                  href={q.boton.href}
                  {...(q.boton.externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-marca)] hover:underline"
                >
                  {q.boton.texto} →
                </a>
              )}
            </div>
          ))}

          <div className={TARJETA}>
            <h3 className="text-lg font-semibold text-[var(--color-texto)]">Red de especialistas</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-texto-mute)]">
              Trabajamos con aliados de confianza y nosotros coordinamos todo para que no tengas que buscar por tu
              cuenta:
            </p>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[var(--color-texto-mute)]">
              <li className="flex gap-2.5">
                <span className="text-[var(--color-en-vivo)]">✓</span>
                <span>
                  <strong className="font-semibold text-[var(--color-texto)]">Legal:</strong> trámites, contratos y
                  asesoría jurídica.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-[var(--color-en-vivo)]">✓</span>
                <span>
                  <strong className="font-semibold text-[var(--color-texto)]">Contable:</strong> impuestos,
                  facturación y obligaciones fiscales.
                </span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-[var(--color-en-vivo)]">✓</span>
                <span>
                  <strong className="font-semibold text-[var(--color-texto)]">Seguros y retiro:</strong> con nuestro
                  aliado El Güey de los Seguros te ayudamos a armar tu Plan Personal de Retiro (PPR), una forma de
                  hacer crecer tu dinero a largo plazo y recuperar impuestos cada año. Puedes empezar con lo que
                  gastas en un fin de semana.
                </span>
              </li>
            </ul>
            <a
              href={URL_PPR}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-marca)] hover:underline"
            >
              Conoce tu plan de retiro →
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
        <div className={`${TARJETA} text-center`}>
          <h2 className="text-xl font-bold text-[var(--color-texto)] sm:text-2xl">
            Somos Proveedor de Tecnología de Meta (Tech Provider).
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-texto-mute)] sm:text-base">
            Meta aprobó nuestro negocio y nuestra aplicación, así que nuestras integraciones con WhatsApp, Instagram y
            Facebook funcionan de forma oficial, segura y dentro de sus políticas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 pb-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className={TITULO_SECCION}>Misión</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-texto-mute)]">
              Hacer que la tecnología, el marketing y la asesoría de negocio sean accesibles y útiles para negocios y
              profesionales, para que dediquen su tiempo a lo que mejor saben hacer.
            </p>
          </div>
          <div>
            <h2 className={TITULO_SECCION}>Visión</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-texto-mute)]">
              Ser el aliado digital y estratégico de confianza de los negocios y profesionales independientes de
              [México / Latinoamérica].
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <h2 className={`${TITULO_SECCION} text-center`}>Nuestros valores</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALORES.map((v) => (
            <div key={v.titulo} className={TARJETA}>
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "color-mix(in srgb, var(--color-marca) 14%, transparent)", color: "var(--color-marca)" }}
              >
                {ICONO_VALOR[v.titulo]}
              </span>
              <h3 className="mt-4 font-semibold text-[var(--color-texto)]">{v.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-texto-mute)]">{v.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
        <h2 className={`${TITULO_SECCION} text-center`}>¿Para quién trabajamos?</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {PARA_QUIEN.map((p) => (
            <span
              key={p}
              className="rounded-full border border-[var(--color-borde)] px-3.5 py-1.5 text-sm text-[var(--color-texto)]"
            >
              {p}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 pb-20 sm:px-8">
        <div className="rounded-3xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-[var(--color-texto)] sm:text-3xl">Empieza hoy, sin costo.</h2>
          <p className="mx-auto mt-3 max-w-xl text-[var(--color-texto-mute)]">
            Prueba nuestro agente de IA gratis durante 14 días, o agenda una sesión en línea con un especialista para
            revisar tu negocio.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href={ENLACE_PRUEBA}
              className="inline-block rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
              style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)", boxShadow: "var(--halo-accion)" }}
            >
              Empieza tu prueba gratis
            </Link>
            <BotonSecundario href={ENLACE_AGENDA} externo>
              Agenda una sesión gratis
            </BotonSecundario>
          </div>
        </div>
      </section>
    </article>
  );
}
