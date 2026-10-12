"use client";

import { startTransition, useActionState } from "react";
import { generarBlogDesdeTendencia } from "@/lib/tendencias-actions";

export function CrearBlogButton({ tendenciaId }: { tendenciaId: string }) {
  const [state, dispatch, pending] = useActionState(generarBlogDesdeTendencia.bind(null, tendenciaId), undefined);

  function generar() {
    if (!window.confirm("¿Generar un blog con IA a partir de esta tendencia? Usa las APIs de Claude y OpenAI y tarda unos segundos.")) return;
    startTransition(() => dispatch());
  }

  return (
    <div className="shrink-0 text-right">
      <button
        type="button"
        onClick={generar}
        disabled={pending}
        aria-busy={pending}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold disabled:opacity-60"
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
      >
        {pending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {pending ? "Generando…" : "Crear blog con IA"}
      </button>
      {state?.error && <p className="mt-1 max-w-[16rem] text-xs text-red-500">{state.error}</p>}
    </div>
  );
}
