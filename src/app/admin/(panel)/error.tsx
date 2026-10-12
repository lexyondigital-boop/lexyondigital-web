"use client";

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6">
      <h1 className="font-semibold text-[var(--color-texto)]">Algo salió mal</h1>
      <p className="mt-2 text-sm text-[var(--color-texto-mute)]">{error.message || "Ocurrió un error inesperado."}</p>
      <button
        onClick={reset}
        className="mt-4 rounded-lg px-4 py-2 text-sm font-semibold"
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
      >
        Reintentar
      </button>
    </div>
  );
}
