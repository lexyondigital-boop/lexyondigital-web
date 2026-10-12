import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, titulo, publicado, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-texto)]">Blog</h1>
        <Link
          href="/admin/blog/nuevo"
          className="rounded-lg px-4 py-2 text-sm font-semibold"
          style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
        >
          Nuevo post
        </Link>
      </div>

      <div className="mt-6 space-y-2">
        {(posts ?? []).map((p) => (
          <Link
            key={p.id}
            href={`/admin/blog/${p.id}`}
            className="flex items-center justify-between rounded-xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] px-4 py-3 hover:border-[var(--color-borde-alto)]"
          >
            <span className="font-medium text-[var(--color-texto)]">{p.titulo}</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                p.publicado
                  ? "bg-[var(--color-en-vivo)]/15 text-[var(--color-en-vivo)]"
                  : "bg-[var(--color-texto-mute)]/15 text-[var(--color-texto-mute)]"
              }`}
            >
              {p.publicado ? "Publicado" : "Borrador"}
            </span>
          </Link>
        ))}
        {posts?.length === 0 && <p className="text-sm text-[var(--color-texto-mute)]">Aún no hay posts. Crea el primero.</p>}
      </div>
    </div>
  );
}
