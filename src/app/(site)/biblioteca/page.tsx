import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Biblioteca de recursos — LexyonDigital",
  description: "Talleres gratuitos de marketing digital, legal, contable e inteligencia artificial.",
};

export default async function BibliotecaPage() {
  const supabase = await createClient();
  const { data: talleres } = await supabase
    .from("talleres")
    .select("id, slug, titulo, descripcion, imagen_url")
    .eq("publicado", true)
    .order("orden", { ascending: true });

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div className="mb-10 text-center">
        <span className="mb-3 inline-block rounded-full border border-[var(--color-borde)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-texto-mute)]">
          Biblioteca
        </span>
        <h1 className="text-3xl font-bold text-[var(--color-texto)] sm:text-4xl">Talleres gratuitos</h1>
        <p className="mx-auto mt-3 max-w-xl text-[var(--color-texto-mute)]">
          Aprende marketing digital, legal, contable e inteligencia artificial con nuestros talleres, a tu ritmo.
        </p>
      </div>

      {talleres && talleres.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {talleres.map((t) => (
            <Link
              key={t.id}
              href={`/biblioteca/${t.slug}`}
              className="overflow-hidden rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] transition-colors hover:border-[var(--color-borde-alto)]"
            >
              <div className="relative aspect-video bg-[var(--color-bg-elevada)]">
                {t.imagen_url && <Image src={t.imagen_url} alt={t.titulo} fill className="object-cover" />}
              </div>
              <div className="p-5">
                <h2 className="font-semibold text-[var(--color-texto)]">{t.titulo}</h2>
                <p className="mt-1.5 line-clamp-3 text-sm text-[var(--color-texto-mute)]">{t.descripcion}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--color-texto-mute)]">Estamos preparando los primeros talleres. Vuelve pronto.</p>
      )}
    </section>
  );
}
