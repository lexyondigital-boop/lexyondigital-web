"use client";

import { startTransition, useActionState } from "react";

type Resultado = { error: string } | undefined;

export function ConfirmDeleteButton({
  accion,
  confirmar,
  etiqueta = "Eliminar",
}: {
  accion: (prevState: Resultado) => Promise<Resultado>;
  confirmar: string;
  etiqueta?: string;
}) {
  const [state, dispatch, pending] = useActionState(accion, undefined);

  function eliminar() {
    if (!window.confirm(confirmar)) return;
    startTransition(() => dispatch());
  }

  return (
    <div>
      <button
        type="button"
        onClick={eliminar}
        disabled={pending}
        aria-busy={pending}
        className="flex items-center gap-1.5 text-sm font-medium text-red-500 hover:underline disabled:opacity-60"
      >
        {pending && <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {pending ? "Eliminando…" : etiqueta}
      </button>
      {state?.error && <p className="mt-1 text-xs text-red-500">{state.error}</p>}
    </div>
  );
}
