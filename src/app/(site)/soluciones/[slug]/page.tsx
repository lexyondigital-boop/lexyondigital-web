import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SOLUCIONES, type Solucion } from "@/lib/soluciones";
import { metadataPagina } from "@/lib/metadata-pagina";
import { NOMBRE_SITIO, URL_SITIO } from "@/lib/sitio";

const RUTA_SERVICIO_IA = "/servicios/automatizacion-agentes-ia";

export function generateStaticParams() {
  return SOLUCIONES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SOLUCIONES.find((x) => x.slug === slug);
  if (!s) return {};
  return metadataPagina({ titulo: s.tituloSeo, descripcion: s.descripcionSeo, ruta: `/soluciones/${s.slug}` });
}

function datosEstructurados(s: Solucion) {
  const url = `${URL_SITIO}/soluciones/${s.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#servicio`,
        name: `Agente de IA para WhatsApp — ${s.giro}`,
        serviceType: s.palabraClave,
        description: s.descripcionSeo,
        url,
        audience: { "@type": "BusinessAudience", name: s.giro },
        provider: { "@id": `${URL_SITIO}/#organizacion` },
        areaServed: { "@type": "Country", name: "México" },
      },
      {
        "@type": "FAQPage",
        mainEntity: s.preguntas.map((p) => ({
          "@type": "Question",
          name: p.pregunta,
          acceptedAnswer: { "@type": "Answer", text: p.respuesta },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: NOMBRE_SITIO, item: URL_SITIO },
          { "@type": "ListItem", position: 2, name: "Agente de IA para WhatsApp", item: `${URL_SITIO}${RUTA_SERVICIO_IA}` },
          { "@type": "ListItem", position: 3, name: s.giro, item: url },
        ],
      },
    ],
  };
}

const TITULO = "text-2xl font-bold text-[var(--color-texto)] sm:text-3xl";
const TARJETA = "rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-5";

function Botones() {
  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/registro"
        className="inline-block rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)", boxShadow: "var(--halo-accion)" }}
      >
        Prueba gratis 14 días
      </Link>
      <Link
        href="/precios"
        className="inline-block rounded-full border border-[var(--color-borde)] px-6 py-3 text-sm font-semibold text-[var(--color-texto)] hover:border-[var(--color-marca)]"
      >
        Ver precios
      </Link>
    </div>
  );
}

export default async function SolucionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SOLUCIONES.find((x) => x.slug === slug);
  if (!s) notFound();
  const otras = SOLUCIONES.filter((x) => x.slug !== s.slug);

  return (
    <article className="mx-auto max-w-4xl px-5 py-14 sm:px-8 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados(s)).replace(/</g, "\\u003c") }}
      />
      <nav aria-label="Ruta" className="text-sm text-[var(--color-texto-mute)]">
        <Link href="/" className="hover:underline">
          Inicio
        </Link>{" "}
        ›{" "}
        <Link href={RUTA_SERVICIO_IA} className="hover:underline">
          Agente de IA para WhatsApp
        </Link>{" "}
        › <span className="text-[var(--color-texto)]">{s.giro}</span>
      </nav>

      <header className="mt-6 grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h1 className="text-balance text-3xl font-bold leading-tight text-[var(--color-texto)] sm:text-4xl">{s.h1}</h1>
          <p className="mt-5 text-base leading-relaxed text-[var(--color-texto-mute)] sm:text-lg">{s.intro}</p>
          <div className="mt-7">
            <Botones />
          </div>
        </div>
        <figure className="rounded-[2rem] border border-[var(--color-borde)] bg-[#0f0b14] p-4 shadow-xl">
          <figcaption className="mb-3 text-center text-xs text-white/60">Ejemplo de conversación</figcaption>
          <div className="flex flex-col gap-2">
            {s.conversacion.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${
                  m.de === "cliente" ? "self-end rounded-br-md bg-[#c6ff3d] text-[#10130a]" : "self-start rounded-bl-md bg-white/10 text-white"
                }`}
              >
                {m.texto}
              </p>
            ))}
          </div>
        </figure>
      </header>

      <section className="mt-16">
        <h2 className={TITULO}>¿Te pasa esto?</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {s.dolores.map((d) => (
            <li key={d} className="flex gap-2.5 text-[15px] text-[var(--color-texto-mute)]">
              <span className="text-[var(--color-ia)]">✕</span>
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className={TITULO}>Cómo te ayuda el agente de IA</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {s.comoAyuda.map((c) => (
            <div key={c.titulo} className={TARJETA}>
              <h3 className="font-semibold text-[var(--color-texto)]">{c.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-texto-mute)]">{c.texto}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-[var(--color-texto-mute)]">
          Conoce todas las funciones en la página del{" "}
          <Link href={RUTA_SERVICIO_IA} className="text-[var(--color-marca)] underline">
            agente de IA para WhatsApp
          </Link>
          .
        </p>
      </section>

      <section className="mt-16">
        <h2 className={TITULO}>Preguntas frecuentes</h2>
        <div className="mt-6 divide-y divide-[var(--color-borde)] rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)]">
          {s.preguntas.map((p) => (
            <details key={p.pregunta} className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-[var(--color-texto)]">
                {p.pregunta}
                <span className="text-[var(--color-texto-mute)] transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-texto-mute)]">{p.respuesta}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-3xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-8 text-center">
        <h2 className="text-2xl font-bold text-[var(--color-texto)]">Pruébalo 14 días gratis</h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-texto-mute)]">
          Conecta tu WhatsApp y deja que el agente atienda a tus clientes mientras tú te enfocas en tu negocio.
        </p>
        <div className="mt-6 flex justify-center">
          <Botones />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-lg font-semibold text-[var(--color-texto)]">El agente de IA en otros giros</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {otras.map((o) => (
            <Link key={o.slug} href={`/soluciones/${o.slug}`} className={`${TARJETA} transition-colors hover:border-[var(--color-marca)]`}>
              <h3 className="font-semibold text-[var(--color-texto)]">{o.giro}</h3>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
