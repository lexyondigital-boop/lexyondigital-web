export function Proximamente({ titulo }: { titulo: string }) {
  return (
    <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8">
      <span className="mb-3 inline-block rounded-full border border-[var(--color-borde)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-texto-mute)]">
        Próximamente
      </span>
      <h1 className="text-3xl font-bold text-[var(--color-texto)]">{titulo}</h1>
      <p className="mt-3 text-[var(--color-texto-mute)]">Estamos construyendo esta sección. Vuelve pronto.</p>
    </section>
  );
}
