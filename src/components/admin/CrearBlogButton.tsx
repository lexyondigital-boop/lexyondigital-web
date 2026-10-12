"use client";

import { startTransition, useActionState, useState } from "react";
import { generarBlogDesdeTendencia } from "@/lib/tendencias-actions";
import { MODELOS_TEXTO, type ModeloTexto } from "@/lib/ia-opciones";

const ETIQUETA_MODELO: Record<ModeloTexto, string> = {
  "claude-opus-5-5": "Opus 5.5 -- mejor redacción, más caro",
  "claude-sonnet-5-5": "Sonnet 5.5 -- más barato, buena calidad",
};

export function CrearBlogButton({ tendenciaId }: { tendenciaId: string }) {
  const [modelo, setModelo] = useState<ModeloTexto>("claude-sonnet-5-5");
  const [state, dispatch, pending] = useActionState(generarBlogDesdeTendencia.bind(null, tendenciaId, modelo), undefined);

  function generar() {
    if (!window.confirm("¿Generar un blog con IA a partir de esta tendencia? Claude escribe el texto y propone un prompt de portada; la imagen se genera después, desde la edición del post.")) return;
    startTransition(() => dispatch());
  }

  return (
    <div className="shrink-0 text-right">
      <select
        value={modelo}
        onChange={(e) => setModelo(e.target.value as ModeloTexto)}
        disabled={pending}
        className="mb-1.5 w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-2 py-1 text-xs text-[var(--color-texto)] disabled:opacity-60"
      >
        {MODELOS_TEXTO.map((m) => (
          <option key={m} value={m}>
            {ETIQUETA_MODELO[m]}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={generar}
        disabled={pending}
        aria-busy={pending}
        className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold disabled:opacity-60"
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
      >
        {pending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {pending ? "Generando…" : "Crear blog con IA"}
      </button>
      {state?.error && <p className="mt-1 max-w-[16rem] text-xs text-red-500">{state.error}</p>}
    </div>
  );
}
