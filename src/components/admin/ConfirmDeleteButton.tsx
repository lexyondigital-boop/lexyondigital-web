"use client";

import { useState } from "react";

export function ConfirmDeleteButton({
  accion,
  confirmar,
  etiqueta = "Eliminar",
}: {
  accion: () => Promise<{ error: string } | undefined>;
  confirmar: string;
  etiqueta?: string;
}) {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function eliminar() {
    if (!window.confirm(confirmar)) return;
    setCargando(true);
    setError(null);
    try {
      const resultado = await accion();
      if (resultado?.error) {
        setCargando(false);
        setError(resultado.error);
      }
    } catch {
      setCargando(false);
      setError("No se pudo eliminar. Intenta de nuevo.");
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={eliminar}
        disabled={cargando}
        className="text-sm font-medium text-red-500 hover:underline disabled:opacity-60"
      >
        {cargando ? "Eliminando…" : etiqueta}
      </button>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
