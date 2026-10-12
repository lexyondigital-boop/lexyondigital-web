"use client";

import { useActionState } from "react";

type ModuloGrupo = {
  titulo: string;
  orden: number;
};

type Resultado = { error: string } | undefined;

export function ModuloGrupoForm({
  modulo,
  accion,
}: {
  modulo?: ModuloGrupo;
  accion: (prevState: Resultado, formData: FormData) => Promise<Resultado>;
}) {
  const [state, formAction, pending] = useActionState(accion, undefined);

  const inputClase =
    "w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg)] px-3 py-1.5 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)] disabled:opacity-60";

  return (
    <form action={formAction} className="flex flex-wrap items-end gap-2.5">
      <label className="min-w-[12rem] flex-1">
        <span className="mb-1 block text-xs text-[var(--color-texto-mute)]">Título del módulo</span>
        <input name="titulo" required disabled={pending} defaultValue={modulo?.titulo} placeholder="Módulo 1" className={inputClase} />
      </label>
      <label className="w-20">
        <span className="mb-1 block text-xs text-[var(--color-texto-mute)]">Orden</span>
        <input name="orden" type="number" disabled={pending} defaultValue={modulo?.orden ?? 0} className={inputClase} />
      </label>
      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold disabled:opacity-60"
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
      >
        {pending && <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {pending ? "Guardando…" : "Guardar"}
      </button>
      {state?.error && <p className="w-full text-xs text-red-500">{state.error}</p>}
    </form>
  );
}
