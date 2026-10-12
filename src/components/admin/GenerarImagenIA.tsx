"use client";

import { useActionState } from "react";
import { generarImagenPost } from "@/lib/blog-actions";
import { CALIDADES_IMAGEN, type CalidadImagen } from "@/lib/ia-opciones";

const ETIQUETA_CALIDAD: Record<CalidadImagen, string> = {
  low: "Baja -- ~$0.01-0.02 por imagen",
  medium: "Media -- ~$0.06-0.08 por imagen",
  high: "Alta -- ~$0.20-0.25 por imagen",
};

export function GenerarImagenIA({ postId, promptSugerido }: { postId: string; promptSugerido: string | null }) {
  const [state, formAction, pending] = useActionState(generarImagenPost.bind(null, postId), undefined);

  return (
    <form
      action={formAction}
      className="max-w-2xl space-y-3 rounded-2xl border border-dashed border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-4"
    >
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Generar portada con IA (OpenAI)</span>
        <textarea
          name="prompt"
          rows={3}
          required
          disabled={pending}
          defaultValue={promptSugerido ?? ""}
          placeholder="Describe la imagen que quieres generar…"
          className="w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2 text-xs text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)] disabled:opacity-60"
        />
        {promptSugerido && (
          <span className="mt-1 block text-xs text-[var(--color-texto-mute)]">
            Prompt sugerido por Claude -- revísalo y edítalo antes de generar.
          </span>
        )}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-[var(--color-texto)]">Calidad</span>
        <select
          name="calidad"
          defaultValue="medium"
          disabled={pending}
          className="w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-2 py-1.5 text-xs text-[var(--color-texto)] disabled:opacity-60"
        >
          {CALIDADES_IMAGEN.map((c) => (
            <option key={c} value={c}>
              {ETIQUETA_CALIDAD[c]}
            </option>
          ))}
        </select>
      </label>

      {state?.error && <p className="text-xs text-red-500">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold disabled:opacity-60"
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
      >
        {pending && <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {pending ? "Generando imagen…" : "Generar imagen con IA"}
      </button>
    </form>
  );
}
