"use client";

import { useState, type FormEvent } from "react";

type Modulo = {
  titulo: string;
  descripcion: string | null;
  youtube_url: string;
  orden: number;
};

export function ModuloForm({
  modulo,
  accion,
  alGuardar,
}: {
  modulo?: Modulo;
  accion: (formData: FormData) => Promise<{ error: string } | undefined>;
  alGuardar?: () => void;
}) {
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    const resultado = await accion(new FormData(e.currentTarget));
    if (resultado?.error) {
      setEnviando(false);
      setError(resultado.error);
      return;
    }
    alGuardar?.();
  }

  const inputClase =
    "w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg)] px-3 py-1.5 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]";

  return (
    <form onSubmit={enviar} className="space-y-2.5">
      <input name="titulo" required defaultValue={modulo?.titulo} placeholder="Título del módulo" className={inputClase} />
      <textarea
        name="descripcion"
        rows={2}
        defaultValue={modulo?.descripcion ?? ""}
        placeholder="Descripción (opcional)"
        className={inputClase}
      />
      <input
        name="youtube_url"
        required
        defaultValue={modulo?.youtube_url}
        placeholder="https://www.youtube.com/watch?v=..."
        className={inputClase}
      />
      <div className="flex items-end gap-2.5">
        <label className="w-24">
          <span className="mb-1 block text-xs text-[var(--color-texto-mute)]">Orden</span>
          <input name="orden" type="number" defaultValue={modulo?.orden ?? 0} className={inputClase} />
        </label>
        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg px-3 py-1.5 text-sm font-semibold disabled:opacity-60"
          style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
        >
          {enviando ? "Guardando…" : "Guardar módulo"}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  );
}
