import { PostForm } from "@/components/admin/PostForm";
import { crearPost } from "@/lib/blog-actions";

export default function NuevoPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-texto)]">Nuevo post</h1>
      <div className="mt-6">
        <PostForm accion={crearPost} />
      </div>
    </div>
  );
}
