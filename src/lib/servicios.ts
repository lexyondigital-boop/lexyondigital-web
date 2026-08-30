export type Servicio = {
  slug: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  color: "marca" | "ia" | "datos";
};

export const SERVICIOS: Servicio[] = [
  {
    slug: "capacitacion-marketing-digital",
    nombre: "Capacitación en Marketing Digital",
    resumen:
      "Aprende a correr tus propias campañas de Meta Ads sin depender de una agencia. Talleres prácticos —desde cero hasta optimización avanzada— con acompañamiento real y plantillas listas para usar.",
    descripcion:
      "Talleres prácticos de Facebook e Instagram Ads pensados para dueños de negocio y equipos de marketing que quieren dejar de depender de terceros. Vas a aprender a estructurar campañas, segmentar audiencias, leer métricas reales y optimizar presupuesto, con acompañamiento y plantillas listas para usar desde la primera sesión.",
    color: "marca",
  },
  {
    slug: "asesoria-legal",
    nombre: "Asesoría Legal",
    resumen:
      "Protege tu marca y tu operación con respaldo legal hecho para emprendedores y pymes: contratos, términos y condiciones, cumplimiento normativo y registro de marca.",
    descripcion:
      "Respaldo legal pensado para la realidad de un emprendedor o una pyme: contratos claros, términos y condiciones para tu sitio o app, cumplimiento normativo y registro de marca, sin la complejidad ni los tiempos de un despacho tradicional.",
    color: "marca",
  },
  {
    slug: "contabilidad",
    nombre: "Contabilidad",
    resumen:
      "Lleva tu contabilidad y tus obligaciones fiscales al día sin dolores de cabeza: facturación, declaraciones, régimen fiscal y reportes financieros claros.",
    descripcion:
      "Contabilidad y cumplimiento fiscal llevados de principio a fin: facturación, declaraciones, régimen fiscal y reportes financieros claros y a tiempo, para que puedas enfocarte en operar tu negocio y no en el SAT.",
    color: "marca",
  },
  {
    slug: "automatizacion-agentes-ia",
    nombre: "Automatización con Agentes de IA",
    resumen:
      "Nuestra propia plataforma: un CRM con un agente de inteligencia artificial que atiende WhatsApp por ti las 24 horas —responde dudas, agenda, reagenda y cancela citas directo en tu calendario.",
    descripcion:
      "Nuestra propia plataforma: un CRM con un agente de inteligencia artificial que atiende WhatsApp por ti las 24 horas — responde dudas de tus clientes, agenda, reagenda y cancela citas directo en tu calendario, y se conecta con Google Calendar para que nunca se te empalme una cita. Configurable a tu manera: tono, horarios, y qué información debe capturar de cada cliente.",
    color: "ia",
  },
];
