import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { metadataPagina } from "@/lib/metadata-pagina";
import { ContenidoArticulo } from "@/components/ContenidoArticulo";
import { servicioRelacionado } from "@/lib/servicio-relacionado";
import { NOMBRE_SITIO, URL_SITIO } from "@/lib/sitio";
import { embedYoutube, extraerIdYoutube, miniaturaYoutube } from "@/lib/youtube";

export const dynamic = "force-dynamic";

async function obtenerPost(slug: string) {
  const supabase = await createClient();
  // Sin el filtro publicado=true explícito -- lo resuelve la RLS
  // (blog_posts_select: publicado=true OR es_super_admin()), así un
  // super_admin logueado puede previsualizar un borrador desde "Ver" en
  // /admin, y un visitante anónimo sigue sin poder verlo.
  const { data: post } = await supabase
    .from("blog_posts")
    .select("titulo, resumen, contenido, imagen_url, video_url, publicado_en, publicado, updated_at")
    .eq("slug", slug)
    .maybeSingle();
  return post;
}

// Portada del post: si tiene video de YouTube, manda el video (y su
// miniatura sirve de imagen para redes y buscadores cuando no hay imagen).
function portada(post: { imagen_url: string | null; video_url: string | null }) {
  const videoId = post.video_url ? extraerIdYoutube(post.video_url) : null;
  return { videoId, imagen: post.imagen_url ?? (videoId ? miniaturaYoutube(videoId) : null) };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await obtenerPost(slug);
  if (!post) return {};
  return metadataPagina({
    titulo: `${post.titulo} — Blog LexyonDigital`,
    descripcion: post.resumen ?? post.titulo,
    ruta: `/blog/${slug}`,
    tipo: "article",
    imagen: portada(post).imagen,
  });
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await obtenerPost(slug);
  if (!post) notFound();

  const url = `${URL_SITIO}/blog/${slug}`;
  const { videoId, imagen } = portada(post);
  const servicio = servicioRelacionado(post.titulo, post.contenido);
  const datos = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#articulo`,
        headline: post.titulo,
        description: post.resumen ?? undefined,
        image: imagen ?? undefined,
        datePublished: post.publicado_en ?? undefined,
        dateModified: post.updated_at ?? post.publicado_en ?? undefined,
        mainEntityOfPage: url,
        inLanguage: "es-MX",
        author: { "@id": `${URL_SITIO}/#organizacion` },
        publisher: { "@id": `${URL_SITIO}/#organizacion` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: NOMBRE_SITIO, item: URL_SITIO },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${URL_SITIO}/blog` },
          { "@type": "ListItem", position: 3, name: post.titulo, item: url },
        ],
      },
    ],
  };

  return (
    <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      {post.publicado && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos).replace(/</g, "\\u003c") }} />
      )}
      <Link href="/blog" className="text-sm font-medium text-[var(--color-marca)] hover:underline">
        ← Volver al blog
      </Link>

      {!post.publicado && (
        <span className="mt-4 block w-fit rounded-full bg-[var(--color-aviso)]/15 px-3 py-1 text-xs font-medium text-[var(--color-aviso)]">
          Borrador — solo visible para administradores
        </span>
      )}

      <h1 className="mt-4 text-3xl font-bold leading-tight text-[var(--color-texto)] sm:text-4xl">{post.titulo}</h1>
      {post.publicado_en && (
        <p className="mt-2 text-sm text-[var(--color-texto-mute)]">
          {new Date(post.publicado_en).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
        </p>
      )}

      {videoId ? (
        <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl border border-[var(--color-borde)] bg-black">
          <iframe
            src={embedYoutube(videoId)}
            title={post.titulo}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      ) : post.imagen_url && (
        <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl bg-[var(--color-bg-elevada)]">
          <Image src={post.imagen_url} alt={post.titulo} fill className="object-cover" />
        </div>
      )}

      <div className="mt-8">
        <ContenidoArticulo contenido={post.contenido} />
      </div>

      <aside className="mt-12 rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6">
        <p className="text-sm font-medium text-[var(--color-marca)]">¿Te ayudamos con esto?</p>
        <p className="mt-1 text-lg font-semibold text-[var(--color-texto)]">{servicio.nombre}</p>
        <p className="mt-2 text-sm text-[var(--color-texto-mute)]">{servicio.resumen}</p>
        <Link
          href={`/servicios/${servicio.slug}`}
          className="mt-4 inline-block rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
        >
          Conocer el servicio
        </Link>
      </aside>
    </article>
  );
}
