"use client";

import { useActionState } from "react";

type Capitulo = {
  titulo: string;
  descripcion: string | null;
  youtube_url: string;
  orden: number;
};

type Resultado = { error: string } | undefined;

export function CapituloForm({
  capitulo,
  accion,
  alGuardar,
}: {
  capitulo?: Capitulo;
  accion: (prevState: Resultado, formData: FormData) => Promise<Resultado>;
  alGuardar?: () => void;
}) {
  const [state, formAction, pending] = useActionState(async (prevState: Resultado, formData: FormData) => {
    const resultado = await accion(prevState, formData);
    if (!resultado?.error) alGuardar?.();
    return resultado;
  }, undefined);

  const inputClase =
    "w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg)] px-3 py-1.5 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)] disabled:opacity-60";

  return (
    <form action={formAction} className="space-y-2.5">
      <input name="titulo" required disabled={pending} defaultValue={capitulo?.titulo} placeholder="Título del capítulo" className={inputClase} />
      <textarea
        name="descripcion"
        rows={2}
        disabled={pending}
        defaultValue={capitulo?.descripcion ?? ""}
        placeholder="Descripción (opcional)"
        className={inputClase}
      />
      <input
        name="youtube_url"
        required
        disabled={pending}
        defaultValue={capitulo?.youtube_url}
        placeholder="https://www.youtube.com/watch?v=..."
        className={inputClase}
      />
      <div className="flex items-end gap-2.5">
        <label className="w-24">
          <span className="mb-1 block text-xs text-[var(--color-texto-mute)]">Orden</span>
          <input name="orden" type="number" disabled={pending} defaultValue={capitulo?.orden ?? 0} className={inputClase} />
        </label>
        <button
          type="submit"
          disabled={pending}
          aria-busy={pending}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold disabled:opacity-60"
          style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
        >
          {pending && <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />}
          {pending ? "Guardando…" : "Guardar capítulo"}
        </button>
      </div>
      {state?.error && <p className="text-xs text-red-500">{state.error}</p>}
    </form>
  );
}
