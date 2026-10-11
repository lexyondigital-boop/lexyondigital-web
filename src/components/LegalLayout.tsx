import Link from "next/link";

export function LegalLayout({
  titulo,
  actualizado,
  children,
}: {
  titulo: string;
  actualizado: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <Link href="/" className="text-sm font-medium text-[var(--color-marca)] hover:underline">
        ← Volver al inicio
      </Link>
      <h1 className="mt-4 text-3xl font-bold leading-tight text-[var(--color-texto)] sm:text-4xl">{titulo}</h1>
      <p className="mt-3 text-sm text-[var(--color-texto-mute)]">Última actualización: {actualizado}</p>
      <div className="legal-doc mt-8">{children}</div>
    </section>
  );
}
