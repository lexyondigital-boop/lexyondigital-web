import Link from "next/link";

// Contenido informativo del inicio (SEO y conversión): qué es la
// plataforma, qué incluye, para quién es, beneficios y preguntas
// frecuentes. Solo describe funciones que de verdad existen en
// app.lexyondigital.com.mx -- nada de "próximamente" disfrazado de hoy.

const FUNCIONES = [
  {
    titulo: "Agente de IA en WhatsApp",
    texto:
      "Responde a tus clientes las 24 horas con el tono y la información de tu negocio, y agenda, reagenda o cancela citas respetando tus horarios reales.",
  },
  {
    titulo: "Conversaciones en un solo lugar",
    texto:
      "Todo tu equipo atiende WhatsApp desde la misma bandeja: asigna conversaciones, envía plantillas aprobadas, imágenes, videos y documentos.",
  },
  {
    titulo: "CRM de contactos",
    texto:
      "Importa tus clientes desde un archivo CSV o Google Sheets, agrega campos personalizados, etiquetas y asignaciones, y encuentra a cualquiera en segundos.",
  },
  {
    titulo: "Pipeline de oportunidades",
    texto: "Da seguimiento a cada venta por etapas y sabe en todo momento quién tiene cada prospecto.",
  },
  {
    titulo: "Agenda y citas",
    texto: "Calendarios por profesional sincronizados con Google Calendar para que nunca se te empalme una cita.",
  },
  {
    titulo: "Campañas y automatizaciones",
    texto:
      "Envía campañas por WhatsApp, correo o llamadas con agentes de voz, y arma flujos automáticos: recordatorios, seguimientos y avisos internos.",
  },
];

const PUBLICO = [
  "Pymes y emprendedores que reciben clientes por WhatsApp y no alcanzan a contestar a tiempo.",
  "Negocios de servicios con agenda: consultorios, despachos, estéticas, talleres y servicios a domicilio.",
  "Equipos de ventas y cobranza que necesitan ordenar contactos, seguimientos y asignaciones.",
  "Dueños de negocio que quieren aprender a anunciarse en Meta y tener su parte legal y contable en orden.",
];

const BENEFICIOS = [
  { titulo: "Ningún mensaje sin respuesta", texto: "El agente de IA atiende de noche, en fines de semana y en horas pico." },
  { titulo: "Menos tareas repetitivas", texto: "Recordatorios, confirmaciones y seguimientos salen solos con las automatizaciones." },
  { titulo: "Todo tu negocio en un lugar", texto: "Clientes, conversaciones, citas y ventas en la misma plataforma, sin hojas sueltas." },
  { titulo: "Respaldo profesional", texto: "Asesoría legal y contable y capacitación en marketing de parte del mismo equipo." },
];

const PREGUNTAS = [
  {
    pregunta: "¿Qué es LexyonDigital?",
    respuesta:
      "Es una plataforma mexicana que combina un CRM con un agente de inteligencia artificial para WhatsApp, más servicios de capacitación en marketing digital, asesoría legal y contabilidad para negocios.",
  },
  {
    pregunta: "¿Cómo funciona el agente de IA en WhatsApp?",
    respuesta:
      "Se conecta a tu número de WhatsApp Business, aprende la información de tu negocio (servicios, horarios, preguntas frecuentes y documentos) y responde a tus clientes. Si está configurado, también agenda citas directo en tu calendario.",
  },
  {
    pregunta: "¿Puedo probarlo sin costo?",
    respuesta: "Sí. Puedes registrarte y usar la plataforma gratis durante 14 días, sin tarjeta de crédito.",
  },
  {
    pregunta: "¿Mis clientes saben que hablan con una IA?",
    respuesta:
      "Tú decides el tono y la forma en que se presenta el agente, y en cualquier momento una persona de tu equipo puede tomar la conversación.",
  },
];

export function InformacionInicio() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-[var(--color-texto)]">Una plataforma para atender, vender y dar seguimiento</h2>
          <p className="mt-3 text-[var(--color-texto-mute)]">
            LexyonDigital reúne en un solo lugar las herramientas que un negocio necesita para no perder clientes por
            falta de respuesta: un agente de inteligencia artificial en WhatsApp, un CRM y la agenda de tu equipo.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FUNCIONES.map((f) => (
            <div key={f.titulo} className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6">
              <h3 className="text-base font-semibold text-[var(--color-texto)]">{f.titulo}</h3>
              <p className="mt-2 text-sm text-[var(--color-texto-mute)]">{f.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-texto)]">¿Para quién es?</h2>
            <ul className="mt-5 space-y-3">
              {PUBLICO.map((p) => (
                <li key={p} className="flex gap-2.5 text-sm text-[var(--color-texto-mute)]">
                  <span aria-hidden="true" className="mt-0.5 text-[var(--color-marca)]">●</span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-texto)]">Beneficios</h2>
            <dl className="mt-5 space-y-4">
              {BENEFICIOS.map((b) => (
                <div key={b.titulo}>
                  <dt className="text-sm font-semibold text-[var(--color-texto)]">{b.titulo}</dt>
                  <dd className="mt-1 text-sm text-[var(--color-texto-mute)]">{b.texto}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h2 className="text-center text-2xl font-bold text-[var(--color-texto)]">Preguntas frecuentes</h2>
        <div className="mt-8 divide-y divide-[var(--color-borde)] rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)]">
          {PREGUNTAS.map((p) => (
            <details key={p.pregunta} className="group px-6 py-4">
              <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--color-texto)]">
                {p.pregunta}
              </summary>
              <p className="mt-2 text-sm text-[var(--color-texto-mute)]">{p.respuesta}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/registro"
            className="inline-block rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)", boxShadow: "var(--halo-accion)" }}
          >
            Prueba gratis 14 días
          </Link>
        </div>
      </section>
    </>
  );
}
