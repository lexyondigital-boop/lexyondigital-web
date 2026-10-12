"use client";

import { useActionState, useState, type FormEvent } from "react";

// Deja margen bajo el límite de 10MB del body de la Server Action (ver
// next.config.ts) -- multipart/form-data agrega overhead de boundaries y
// metadata además del archivo en sí.
const MAX_IMAGEN_BYTES = 8 * 1024 * 1024;

type Taller = {
  titulo: string;
  descripcion: string;
  publicado: boolean;
  orden: number;
  imagen_url: string | null;
};

type Resultado = { error: string } | undefined;

export function TallerForm({
  taller,
  accion,
}: {
  taller?: Taller;
  accion: (prevState: Resultado, formData: FormData) => Promise<Resultado>;
}) {
  const [state, formAction, pending] = useActionState(accion, undefined);
  const [errorArchivo, setErrorArchivo] = useState<string | null>(null);
  const [archivoElegido, setArchivoElegido] = useState(false);

  function alEnviar(e: FormEvent<HTMLFormElement>) {
    const archivo = new FormData(e.currentTarget).get("imagen") as File | null;
    if (archivo && archivo.size > MAX_IMAGEN_BYTES) {
      e.preventDefault();
      setErrorArchivo(`Esa imagen pesa ${(archivo.size / 1024 / 1024).toFixed(1)}MB; el máximo es 8MB.`);
      return;
    }
    setErrorArchivo(null);
  }

  const error = errorArchivo ?? state?.error;

  const inputClase =
    "w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)] disabled:opacity-60";

  return (
    <form
      action={formAction}
      onSubmit={alEnviar}
      className="max-w-xl space-y-4 rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6"
    >
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Título</span>
        <input name="titulo" required disabled={pending} defaultValue={taller?.titulo} placeholder="Meta Ads" className={inputClase} />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Descripción</span>
        <textarea
          name="descripcion"
          required
          disabled={pending}
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
        <input
          name="imagen"
          type="file"
          accept="image/*"
          disabled={pending}
          onChange={(e) => setArchivoElegido(!!e.target.files?.length)}
          className={inputClase}
        />
        {pending && archivoElegido && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--color-marca)]">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Subiendo imagen…
          </p>
        )}
      </label>

      <label className="block w-28">
        <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Orden</span>
        <input name="orden" type="number" disabled={pending} defaultValue={taller?.orden ?? 0} className={inputClase} />
      </label>

      <label className="flex items-center gap-2">
        <input name="publicado" type="checkbox" disabled={pending} defaultChecked={taller?.publicado ?? false} />
        <span className="text-sm text-[var(--color-texto)]">Publicado (visible en /biblioteca)</span>
      </label>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold disabled:opacity-60"
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
      >
        {pending && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />}
        {pending ? "Guardando…" : "Guardar"}
      </button>
    </form>
  );
}
