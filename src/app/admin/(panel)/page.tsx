import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-texto)]">Panel de contenido</h1>
      <p className="mt-2 text-sm text-[var(--color-texto-mute)]">
        Administra la Biblioteca (talleres y módulos) y el Blog de lexyondigital.com.mx.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/talleres"
          className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-5 hover:border-[var(--color-borde-alto)]"
        >
          <h2 className="font-semibold text-[var(--color-texto)]">Talleres</h2>
          <p className="mt-1 text-sm text-[var(--color-texto-mute)]">
            Crea y edita talleres con sus módulos de video.
          </p>
        </Link>
        <Link
          href="/admin/blog"
          className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-5 hover:border-[var(--color-borde-alto)]"
        >
          <h2 className="font-semibold text-[var(--color-texto)]">Blog</h2>
          <p className="mt-1 text-sm text-[var(--color-texto-mute)]">Crea y edita entradas del blog.</p>
        </Link>
      </div>
    </div>
  );
}
