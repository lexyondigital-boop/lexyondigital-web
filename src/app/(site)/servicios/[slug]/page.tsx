import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICIOS, type Servicio } from "@/lib/servicios";
import { SOLUCIONES } from "@/lib/soluciones";
import { metadataPagina } from "@/lib/metadata-pagina";
import { NOMBRE_SITIO, URL_SITIO, URL_WHATSAPP } from "@/lib/sitio";

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const servicio = SERVICIOS.find((s) => s.slug === slug);
  if (!servicio) return {};
  return metadataPagina({
    titulo: servicio.tituloSeo,
    descripcion: servicio.descripcionSeo,
    ruta: `/servicios/${servicio.slug}`,
  });
}

function destinoCta(s: Servicio) {
  if (s.cta.destino === "registro") return "/registro";
  return `${URL_WHATSAPP}?text=${encodeURIComponent(s.cta.mensajeWhatsapp ?? "Hola, quiero información.")}`;
}

// Service + FAQPage + BreadcrumbList. El Service apunta a la organización del
// inicio por @id para que Google los relacione.
function datosEstructurados(s: Servicio) {
  const url = `${URL_SITIO}/servicios/${s.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${url}#servicio`,
        name: s.nombre,
        serviceType: s.palabraClave,
        description: s.descripcionSeo,
        url,
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
          { "@type": "ListItem", position: 2, name: "Servicios", item: `${URL_SITIO}/#servicios` },
          { "@type": "ListItem", position: 3, name: s.nombre, item: url },
        ],
      },
    ],
  };
}

function BotonCta({ s, className = "" }: { s: Servicio; className?: string }) {
  const externo = s.cta.destino === "whatsapp";
  return (
    <a
      href={destinoCta(s)}
      {...(externo ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`inline-block rounded-full px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 ${className}`}
      style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)", boxShadow: "var(--halo-accion)" }}
    >
      {s.cta.boton}
    </a>
  );
}

const TITULO_SECCION = "text-2xl font-bold text-[var(--color-texto)] sm:text-3xl";
const TARJETA = "rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-5";

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = SERVICIOS.find((x) => x.slug === slug);
  if (!s) notFound();

  const relacionados = s.relacionados.map((r) => SERVICIOS.find((x) => x.slug === r)).filter((x): x is Servicio => !!x);


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
        <Link href="/#servicios" className="hover:underline">
          Servicios
        </Link>{" "}
        › <span className="text-[var(--color-texto)]">{s.nombre}</span>
      </nav>

      <header className="mt-6">
        <h1 className="text-balance text-3xl font-bold leading-tight text-[var(--color-texto)] sm:text-5xl">{s.h1}</h1>
        <p className="mt-5 text-base leading-relaxed text-[var(--color-texto-mute)] sm:text-lg">{s.intro}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <BotonCta s={s} />
          {s.cta.destino === "registro" && (
            <Link
              href="/precios"
              className="inline-block rounded-full border border-[var(--color-borde)] px-6 py-3 text-sm font-semibold text-[var(--color-texto)] hover:border-[var(--color-marca)]"
            >
              Ver precios
            </Link>
          )}
        </div>
      </header>

      <section className="mt-16">
        <h2 className={TITULO_SECCION}>Beneficios</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {s.beneficios.map((b) => (
            <div key={b.titulo} className={TARJETA}>
              <h3 className="font-semibold text-[var(--color-texto)]">{b.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-texto-mute)]">{b.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-10 sm:grid-cols-2">
        <div>
          <h2 className={TITULO_SECCION}>Qué incluye</h2>
          <ul className="mt-5 space-y-2.5">
            {s.incluye.map((i) => (
              <li key={i} className="flex gap-2.5 text-[15px] text-[var(--color-texto-mute)]">
                <span className="text-[var(--color-en-vivo)]">✓</span>
                {i}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={TITULO_SECCION}>Para quién es</h2>
          <ul className="mt-5 space-y-2.5">
            {s.paraQuien.map((p) => (
              <li key={p} className="flex gap-2.5 text-[15px] text-[var(--color-texto-mute)]">
                <span className="text-[var(--color-marca)]">•</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {s.slug === "automatizacion-agentes-ia" && (
        <section className="mt-16">
          <h2 className={TITULO_SECCION}>El agente de IA para tu giro</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {SOLUCIONES.map((g) => (
              <Link key={g.slug} href={`/soluciones/${g.slug}`} className={`${TARJETA} transition-colors hover:border-[var(--color-marca)]`}>
                <h3 className="font-semibold text-[var(--color-texto)]">{g.giro}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-[var(--color-texto-mute)]">{g.descripcionSeo}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16">
        <h2 className={TITULO_SECCION}>Cómo funciona</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {s.pasos.map((p, n) => (
            <li key={p.titulo} className={TARJETA}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-marca)] text-sm font-bold text-white">
                {n + 1}
              </span>
              <h3 className="mt-3 font-semibold text-[var(--color-texto)]">{p.titulo}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-texto-mute)]">{p.texto}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16">
        <h2 className={TITULO_SECCION}>Preguntas frecuentes</h2>
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
        <h2 className="text-2xl font-bold text-[var(--color-texto)]">{s.cta.titulo}</h2>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-texto-mute)]">{s.cta.texto}</p>
        <BotonCta s={s} className="mt-6" />
      </section>

      {relacionados.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold text-[var(--color-texto)]">También te puede interesar</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {relacionados.map((r) => (
              <Link key={r.slug} href={`/servicios/${r.slug}`} className={`${TARJETA} transition-colors hover:border-[var(--color-marca)]`}>
                <h3 className="font-semibold text-[var(--color-texto)]">{r.nombre}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-[var(--color-texto-mute)]">{r.resumen}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
