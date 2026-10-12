"use client";

import { useState, type FormEvent } from "react";

type Post = {
  titulo: string;
  resumen: string | null;
  contenido: string;
  publicado: boolean;
  imagen_url: string | null;
};

export function PostForm({
  post,
  accion,
}: {
  post?: Post;
  accion: (formData: FormData) => Promise<{ error: string } | undefined>;
}) {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      const resultado = await accion(new FormData(e.currentTarget));
      if (resultado?.error) {
        setEnviando(false);
        setError(resultado.error);
      }
    } catch {
      setEnviando(false);
      setError("No se pudo guardar. Si subiste una imagen, intenta con una más liviana (menos de 10MB).");
    }
  }

  const inputClase =
    "w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]";

  return (
    <form onSubmit={enviar} className="max-w-2xl space-y-4 rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Título</span>
        <input name="titulo" required defaultValue={post?.titulo} className={inputClase} />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Resumen (opcional)</span>
        <textarea name="resumen" rows={2} defaultValue={post?.resumen ?? ""} className={inputClase} />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Contenido</span>
        <textarea name="contenido" required rows={14} defaultValue={post?.contenido} className={`${inputClase} font-mono text-xs`} />
        <span className="mt-1 block text-xs text-[var(--color-texto-mute)]">Texto plano, con saltos de línea para separar párrafos.</span>
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">
          Imagen de portada {post && "(deja vacío para conservar la actual)"}
        </span>
        {post?.imagen_url && (
          // eslint-disable-next-line @next/next/no-img-element -- vista previa rápida
          <img src={post.imagen_url} alt="" className="mb-2 h-24 w-40 rounded-lg object-cover" />
        )}
        <input name="imagen" type="file" accept="image/*" className={inputClase} />
      </label>

      <label className="flex items-center gap-2">
        <input name="publicado" type="checkbox" defaultChecked={post?.publicado ?? false} />
        <span className="text-sm text-[var(--color-texto)]">Publicado (visible en /blog)</span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60"
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
      >
        {enviando ? "Guardando…" : "Guardar"}
      </button>
    </form>
  );
}
