import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminTalleresPage() {
  const supabase = await createClient();
  const { data: talleres } = await supabase
    .from("talleres")
    .select("id, titulo, slug, publicado, orden")
    .order("orden", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-texto)]">Talleres</h1>
        <Link
          href="/admin/talleres/nuevo"
          className="rounded-lg px-4 py-2 text-sm font-semibold"
          style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
        >
          Nuevo taller
        </Link>
      </div>

      <div className="mt-6 space-y-2">
        {(talleres ?? []).map((t) => (
          <Link
            key={t.id}
            href={`/admin/talleres/${t.id}`}
            className="flex items-center justify-between rounded-xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] px-4 py-3 hover:border-[var(--color-borde-alto)]"
          >
            <span className="font-medium text-[var(--color-texto)]">{t.titulo}</span>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                t.publicado
                  ? "bg-[var(--color-en-vivo)]/15 text-[var(--color-en-vivo)]"
                  : "bg-[var(--color-texto-mute)]/15 text-[var(--color-texto-mute)]"
              }`}
            >
              {t.publicado ? "Publicado" : "Borrador"}
            </span>
          </Link>
        ))}
        {talleres?.length === 0 && (
          <p className="text-sm text-[var(--color-texto-mute)]">Aún no hay talleres. Crea el primero.</p>
        )}
      </div>
    </div>
  );
}
