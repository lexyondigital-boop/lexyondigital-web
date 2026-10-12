import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PostForm } from "@/components/admin/PostForm";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";
import { actualizarPost, eliminarPost } from "@/lib/blog-actions";

export const dynamic = "force-dynamic";

export default async function EditarPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("id, titulo, resumen, contenido, publicado, imagen_url")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-texto)]">Editar post</h1>
        <ConfirmDeleteButton
          accion={eliminarPost.bind(null, id)}
          confirmar={`¿Eliminar el post "${post.titulo}"?`}
          etiqueta="Eliminar post"
        />
      </div>

      <PostForm post={post} accion={actualizarPost.bind(null, id)} />
    </div>
  );
}
