import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { metadataPagina } from "@/lib/metadata-pagina";

export const dynamic = "force-dynamic";

export const metadata: Metadata = metadataPagina({
  titulo: "Blog — LexyonDigital",
  descripcion: "Artículos sobre marketing digital, legal, contable e inteligencia artificial.",
  ruta: "/blog",
});

export default async function BlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, titulo, resumen, imagen_url, publicado_en")
    .eq("publicado", true)
    .order("publicado_en", { ascending: false });

  return (
    <section className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <div className="mb-10 text-center">
        <span className="mb-3 inline-block rounded-full border border-[var(--color-borde)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-texto-mute)]">
          Blog
        </span>
        <h1 className="text-3xl font-bold text-[var(--color-texto)] sm:text-4xl">Artículos</h1>
      </div>

      {posts && posts.length > 0 ? (
        <div className="space-y-6">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="flex gap-5 overflow-hidden rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-5 transition-colors hover:border-[var(--color-borde-alto)]"
            >
              {p.imagen_url && (
                <div className="relative hidden h-28 w-40 shrink-0 overflow-hidden rounded-xl bg-[var(--color-bg-elevada)] sm:block">
                  <Image src={p.imagen_url} alt={p.titulo} fill className="object-cover" />
                </div>
              )}
              <div>
                <h2 className="font-semibold text-[var(--color-texto)]">{p.titulo}</h2>
                {p.resumen && <p className="mt-1.5 line-clamp-2 text-sm text-[var(--color-texto-mute)]">{p.resumen}</p>}
                {p.publicado_en && (
                  <p className="mt-2 text-xs text-[var(--color-texto-mute)]">
                    {new Date(p.publicado_en).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-[var(--color-texto-mute)]">Pronto publicaremos los primeros artículos.</p>
      )}
    </section>
  );
}
