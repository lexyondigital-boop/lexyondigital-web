import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PostForm } from "@/components/admin/PostForm";
import { GenerarImagenIA } from "@/components/admin/GenerarImagenIA";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { actualizarPost, eliminarPost } from "@/lib/blog-actions";

export const dynamic = "force-dynamic";

export default async function EditarPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ imagen?: string }>;
}) {
  const { id } = await params;
  const { imagen } = await searchParams;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("id, slug, titulo, resumen, contenido, publicado, imagen_url, imagen_prompt_sugerido")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-texto)]">Editar post</h1>
        <div className="flex items-center gap-4">
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-[var(--color-marca)] hover:underline"
          >
            Ver {!post.publicado && "(borrador)"}
          </a>
          <ConfirmDeleteButton
            accion={eliminarPost.bind(null, id)}
            confirmar={`¿Eliminar el post "${post.titulo}"?`}
            etiqueta="Eliminar post"
          />
        </div>
      </div>

      {imagen === "ok" && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-green-600/30 bg-green-600/10 px-4 py-2.5 text-sm text-green-600">
          <span>Imagen generada y guardada con éxito.</span>
          <a href={`/admin/blog/${id}`} className="shrink-0 font-medium hover:underline">
            Cerrar
          </a>
        </div>
      )}

      <GenerarImagenIA postId={id} promptSugerido={post.imagen_prompt_sugerido} />

      <PostForm post={post} accion={actualizarPost.bind(null, id)} />
    </div>
  );
}
