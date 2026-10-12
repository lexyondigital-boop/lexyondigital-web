import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICIOS } from "@/lib/servicios";

export function generateStaticParams() {
  return SERVICIOS.map((s) => ({ slug: s.slug }));
}

export default async function ServicioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const servicio = SERVICIOS.find((s) => s.slug === slug);
  if (!servicio) notFound();

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/#servicios" className="text-sm font-medium text-[var(--color-marca)] hover:underline">
        ← Volver a servicios
      </Link>
      <h1 className="mt-4 text-3xl font-bold text-[var(--color-texto)] sm:text-4xl">{servicio.nombre}</h1>
      <p className="mt-5 text-base leading-relaxed text-[var(--color-texto-mute)] sm:text-lg">
        {servicio.descripcion}
      </p>

      <div className="mt-8 rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6">
        <p className="text-sm text-[var(--color-texto-mute)]">
          Estamos afinando el detalle completo de este servicio (planes, precios y casos de uso). Mientras
          tanto, escríbenos y te asesoramos directo.
        </p>
        <Link
          href="/contacto"
          className="mt-4 inline-block rounded-lg px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)", boxShadow: "var(--halo-accion)" }}
        >
          Contactar
        </Link>
      </div>
    </section>
  );
}
