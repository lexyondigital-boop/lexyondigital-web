import type { Metadata } from "next";
import Link from "next/link";
import { metadataPagina } from "@/lib/metadata-pagina";
import { URL_WHATSAPP } from "@/lib/sitio";
import { COMPARATIVA, CONSUMO_USD, EXTRAS, PAQUETES, RECARGAS_USD, descuento, pesos } from "@/lib/planes";

export const metadata: Metadata = metadataPagina({
  titulo: "Precios — LexyonDigital",
  descripcion:
    "Planes Esencial, Profesional y Empresarial desde $499 + IVA al mes: agente de IA para WhatsApp, CRM, agenda de citas, campañas y reportes. Prueba gratis 14 días.",
  ruta: "/precios",
});

const TARJETA = "rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)]";

function Celda({ valor }: { valor: string | boolean }) {
  if (valor === true) return <span className="font-semibold text-[var(--color-datos)]" aria-label="Incluido">✓</span>;
  if (valor === false) return <span className="text-[var(--color-texto-mute)]" aria-label="No incluido">—</span>;
  return <>{valor}</>;
}

export default function PreciosPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mx-auto max-w-2xl text-center">
        <span className="mb-3 inline-block rounded-full border border-[var(--color-borde)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--color-texto-mute)]">
          Precios en pesos mexicanos + IVA
        </span>
        <h1 className="text-balance text-3xl font-bold leading-tight text-[var(--color-texto)] sm:text-4xl">
          Un agente de IA para tu WhatsApp desde el primer plan
        </h1>
        <p className="mt-4 text-[var(--color-texto-mute)]">
          Precio por cuenta, no por usuario. Sin plazo forzoso. Prueba gratis de 14 días con todo lo del plan
          Profesional, sin tarjeta de crédito.
        </p>
      </header>

      <section aria-label="Planes" className="mt-12 grid gap-5 lg:grid-cols-3">
        {PAQUETES.map((p) => (
          <article
            key={p.clave}
            className={`${TARJETA} relative flex flex-col p-6 ${p.destacado ? "border-2 border-[var(--color-marca)]" : ""}`}
          >
            {p.destacado && (
              <span className="absolute -top-3 left-6 rounded-full bg-[var(--color-marca)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Más popular
              </span>
            )}
            <h2 className="text-lg font-semibold text-[var(--color-texto)]">{p.nombre}</h2>
            <p className="mt-1 text-sm text-[var(--color-texto-mute)]">{p.para}</p>
            <p className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <s className="text-[var(--color-texto-mute)]" aria-label={`Precio de lista ${pesos(p.listaMensual)}`}>
                {pesos(p.listaMensual)}
              </s>
              <span className="rounded-full px-2 py-0.5 text-xs font-semibold" style={{ background: "var(--color-datos)", color: "#06302b" }}>
                {descuento(p.mensual, p.listaMensual)}% de descuento
              </span>
            </p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className="text-4xl font-bold tracking-tight text-[var(--color-texto)]">{pesos(p.mensual)}</span>
              <span className="text-sm text-[var(--color-texto-mute)]">MXN al mes + IVA</span>
            </p>
            <p className="mt-1 text-sm text-[var(--color-texto-mute)]">
              Anual: <s>{pesos(p.listaAnual)}</s> {pesos(p.anual)} + IVA (2 meses gratis)
            </p>
            <ul className="mt-6 flex-1 space-y-2.5 text-sm text-[var(--color-texto)]">
              {p.resumen.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <span className="text-[var(--color-datos)]" aria-hidden="true">
                    ✓
                  </span>
                  {r}
                </li>
              ))}
            </ul>
            <Link
              href={`/registro?plan=${p.clave}`}
              className="mt-6 rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-opacity hover:opacity-90"
              style={
                p.destacado
                  ? { background: "var(--color-accion)", color: "var(--color-accion-fg)" }
                  : { border: "1px solid var(--color-borde-alto)", color: "var(--color-texto)" }
              }
            >
              Probar gratis 14 días
            </Link>
          </article>
        ))}
      </section>

      <aside className={`${TARJETA} mt-8 border-l-4 p-5`} style={{ borderLeftColor: "var(--color-aviso)" }}>
        <h2 className="font-semibold text-[var(--color-texto)]">Los mensajes de WhatsApp los cobra Meta por separado</h2>
        <p className="mt-2 text-sm text-[var(--color-texto-mute)]">
          Ningún plan incluye el costo de los mensajes de plantilla de WhatsApp, que son los que tú envías primero:
          campañas, recordatorios y avisos. Meta los cobra directamente a la tarjeta que registras en tu cuenta de
          WhatsApp Business, con su tarifa vigente para México (como referencia, alrededor de USD 0.04 por mensaje de
          marketing y USD 0.01 por mensaje de utilidad). Contestarle a un cliente dentro de las 24 horas desde su último
          mensaje no tiene costo de Meta. LexyonDigital no cobra ni factura estos cargos.
        </p>
      </aside>

      <section aria-labelledby="t-comparativa" className="mt-16">
        <h2 id="t-comparativa" className="text-2xl font-bold text-[var(--color-texto)]">
          Qué incluye cada plan
        </h2>
        <div className={`${TARJETA} mt-6 overflow-x-auto`}>
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-[var(--color-borde)] text-left text-xs uppercase tracking-wide text-[var(--color-texto-mute)]">
                <th className="px-5 py-3 font-semibold">Función</th>
                {PAQUETES.map((p) => (
                  <th key={p.clave} className="px-5 py-3 text-center font-semibold">
                    {p.nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-[var(--color-texto)]">
              {COMPARATIVA.map((g) => [
                <tr key={g.titulo} className="bg-[var(--color-bg)]">
                  <td colSpan={4} className="px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-texto-mute)]">
                    {g.titulo}
                  </td>
                </tr>,
                ...g.filas.map((f) => (
                  <tr key={`${g.titulo}-${f.concepto}`} className="border-t border-[var(--color-borde)]">
                    <td className="px-5 py-2.5">{f.concepto}</td>
                    {f.valores.map((v, i) => (
                      <td key={i} className="px-5 py-2.5 text-center">
                        <Celda valor={v} />
                      </td>
                    ))}
                  </tr>
                )),
              ])}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="t-extras" className="mt-16 grid gap-6 lg:grid-cols-2">
        <div>
          <h2 id="t-extras" className="text-2xl font-bold text-[var(--color-texto)]">
            Extras
          </h2>
          <p className="mt-2 text-sm text-[var(--color-texto-mute)]">Se suman a cualquier plan. Precios en MXN + IVA.</p>
          <ul className={`${TARJETA} mt-4 divide-y divide-[var(--color-borde)] text-sm`}>
            {EXTRAS.map((e) => (
              <li key={e.concepto} className="flex justify-between gap-4 px-5 py-3">
                <span className="text-[var(--color-texto)]">{e.concepto}</span>
                <span className="shrink-0 font-semibold tabular-nums text-[var(--color-texto)]">{e.precio}</span>
              </li>
            ))}
            <li className="flex justify-between gap-4 px-5 py-3">
              <span className="text-[var(--color-texto)]">
                Implementación (pago único): conexión con Meta, agente de IA, plantillas y flujos
              </span>
              <span className="shrink-0 text-right font-semibold tabular-nums text-[var(--color-texto)]">
                {PAQUETES.map((p) => pesos(p.implementacion)).join(" · ")}
              </span>
            </li>
          </ul>
          <p className="mt-2 text-xs text-[var(--color-texto-mute)]">
            La implementación es opcional y varía por plan (Esencial · Profesional · Empresarial). Puedes configurar
            tu cuenta tú mismo con nuestras guías.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[var(--color-texto)]">Saldo prepago en dólares</h2>
          <p className="mt-2 text-sm text-[var(--color-texto-mute)]">
            Las llamadas con IA, las imágenes, los videos, las estrategias de contenido y las tendencias se pagan con
            saldo prepago: recargas tu cuenta y cada uso se descuenta. Sin saldo, estas funciones se pausan hasta tu
            siguiente recarga. Precios en dólares (USD) + IVA.
          </p>
          <ul className={`${TARJETA} mt-4 divide-y divide-[var(--color-borde)] text-sm`}>
            {CONSUMO_USD.map((c) => (
              <li key={c.concepto} className="flex justify-between gap-4 px-5 py-3">
                <span className="text-[var(--color-texto)]">{c.concepto}</span>
                <span className="shrink-0 font-semibold tabular-nums text-[var(--color-texto)]">{c.precio} USD</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-medium text-[var(--color-texto)]">Recargas</p>
          <ul className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {RECARGAS_USD.map((monto) => (
              <li key={monto} className={`${TARJETA} p-4 text-center`}>
                <span className="block text-xl font-bold text-[var(--color-texto)]">${monto}</span>
                <span className="mt-1 block text-xs text-[var(--color-texto-mute)]">USD + IVA</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="t-preguntas" className="mt-16 max-w-3xl">
        <h2 id="t-preguntas" className="text-2xl font-bold text-[var(--color-texto)]">
          Preguntas frecuentes
        </h2>
        <dl className="mt-6 space-y-6 text-sm">
          <div>
            <dt className="font-semibold text-[var(--color-texto)]">¿Los precios incluyen IVA?</dt>
            <dd className="mt-1 text-[var(--color-texto-mute)]">
              No. Los planes y extras están en pesos mexicanos y el saldo prepago en dólares; a todo se le suma el
              16% de IVA al cobrar. El precio tachado es el precio de lista de cada plan.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[var(--color-texto)]">¿Qué pasa si llego al límite de mi plan?</dt>
            <dd className="mt-1 text-[var(--color-texto-mute)]">
              Lo que ya tienes sigue funcionando; solo no podrás crear más (usuarios, contactos, profesionales…)
              hasta que agregues un extra o cambies de plan. Los contactos que te escriben por WhatsApp siempre se
              registran, aunque hayas llegado al límite.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[var(--color-texto)]">¿Puedo cambiar de plan o cancelar?</dt>
            <dd className="mt-1 text-[var(--color-texto-mute)]">
              Sí, cuando quieras y sin penalización. Bajar de plan no borra tu información. Si cancelas, tus datos se
              eliminan a los 30 días, como explican los <Link href="/terminos" className="underline">Términos y Condiciones</Link>.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-[var(--color-texto)]">¿Por qué Meta cobra aparte los mensajes?</dt>
            <dd className="mt-1 text-[var(--color-texto-mute)]">
              Meta (la empresa dueña de WhatsApp) cobra cada mensaje de plantilla según su tarifa. Pagarlo directo
              con tu tarjeta te da la tarifa oficial sin recargos de intermediarios, y la puedes revisar en tu cuenta
              de WhatsApp Business.
            </dd>
          </div>
        </dl>
      </section>

      <section className={`${TARJETA} mt-16 p-8 text-center`}>
        <h2 className="text-2xl font-bold text-[var(--color-texto)]">¿No sabes cuál elegir?</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--color-texto-mute)]">
          Empieza con la prueba gratis o escríbenos por WhatsApp y te ayudamos a elegir el plan para tu negocio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/registro"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
          >
            Probar gratis 14 días
          </Link>
          <a
            href={URL_WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-[var(--color-borde-alto)] px-5 py-2.5 text-sm font-semibold text-[var(--color-texto)] transition-opacity hover:opacity-90"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
