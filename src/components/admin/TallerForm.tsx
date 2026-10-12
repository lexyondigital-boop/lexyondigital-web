"use client";

import { useState, type FormEvent } from "react";

type Taller = {
  titulo: string;
  descripcion: string;
  publicado: boolean;
  orden: number;
  imagen_url: string | null;
};

export function TallerForm({
  taller,
  accion,
}: {
  taller?: Taller;
  accion: (formData: FormData) => Promise<{ error: string } | undefined>;
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
    }
    // Sin error: la acción ya hizo redirect() -- no hay nada más que hacer aquí.
  }

  const inputClase =
    "w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]";

  return (
    <form onSubmit={enviar} className="max-w-xl space-y-4 rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Título</span>
        <input name="titulo" required defaultValue={taller?.titulo} placeholder="Meta Ads" className={inputClase} />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Descripción</span>
        <textarea
          name="descripcion"
          required
          rows={3}
          defaultValue={taller?.descripcion}
          placeholder="Aprende a crear y optimizar campañas de Meta Ads desde cero."
          className={inputClase}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">
          Imagen de portada {taller && "(deja vacío para conservar la actual)"}
        </span>
        {taller?.imagen_url && (
          // eslint-disable-next-line @next/next/no-img-element -- vista previa rápida, no vale la pena el loader de next/image aquí
          <img src={taller.imagen_url} alt="" className="mb-2 h-24 w-40 rounded-lg object-cover" />
        )}
        <input name="imagen" type="file" accept="image/*" className={inputClase} />
      </label>

      <label className="block w-28">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Orden</span>
        <input name="orden" type="number" defaultValue={taller?.orden ?? 0} className={inputClase} />
      </label>

      <label className="flex items-center gap-2">
        <input name="publicado" type="checkbox" defaultChecked={taller?.publicado ?? false} />
        <span className="text-sm text-[var(--color-texto)]">Publicado (visible en /biblioteca)</span>
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
