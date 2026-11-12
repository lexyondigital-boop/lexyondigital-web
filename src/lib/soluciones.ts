// Fase 2B del SEO: una página del agente de IA por giro. Cada una persigue
// una búsqueda más específica ("agente de IA para consultorios") que la
// página general del servicio, con menos competencia y más intención de
// compra. Mismo criterio que servicios.ts: solo lo que la plataforma hace hoy.
export type Solucion = {
  slug: string;
  giro: string;
  palabraClave: string;
  tituloSeo: string; // <= 60
  descripcionSeo: string; // <= 155
  h1: string;
  intro: string;
  dolores: string[];
  comoAyuda: { titulo: string; texto: string }[];
  conversacion: { de: "cliente" | "agente"; texto: string }[];
  preguntas: { pregunta: string; respuesta: string }[];
};

export const SOLUCIONES: Solucion[] = [
  {
    slug: "consultorios-y-clinicas",
    giro: "Consultorios y clínicas",
    palabraClave: "agente de IA para consultorios",
    tituloSeo: "Agente de IA en WhatsApp para consultorios | LexyonDigital",
    descripcionSeo:
      "Agenda pacientes por WhatsApp 24/7 con un agente de IA: confirma, reagenda y envía recordatorios de cita para reducir inasistencias en tu consultorio.",
    h1: "Agente de IA para consultorios y clínicas: tus pacientes agendan por WhatsApp a cualquier hora",
    intro:
      "Entre consultas no alcanzas a contestar el teléfono ni el WhatsApp, y cada mensaje sin respuesta es un paciente que agenda en otro lado. El agente de IA atiende por ti: responde dudas sobre servicios, costos y ubicación, ofrece horarios reales de tu agenda y deja la cita registrada, con recordatorio automático.",
    dolores: [
      "Mensajes de pacientes que se quedan sin responder durante la consulta",
      "Llamadas y mensajes para agendar que quitan tiempo a recepción",
      "Pacientes que no llegan porque olvidaron su cita",
      "Agenda en papel o en varias apps que se empalma",
    ],
    comoAyuda: [
      {
        titulo: "Agenda con tu disponibilidad real",
        texto: "Ofrece solo los horarios libres de cada profesional y registra la cita en el calendario, sincronizado con Google Calendar.",
      },
      {
        titulo: "Recordatorios automáticos",
        texto: "Envía el recordatorio por WhatsApp antes de la cita para que el paciente confirme o reagende, y bajen las inasistencias.",
      },
      {
        titulo: "Responde con tu información",
        texto: "Precios de consulta, servicios, ubicación, formas de pago y preparación para estudios, tal como tú lo defines.",
      },
      {
        titulo: "Expediente de contacto",
        texto: "Cada paciente queda en el CRM con sus datos y el historial de la conversación para que recepción dé seguimiento.",
      },
    ],
    conversacion: [
      { de: "cliente", texto: "Hola, ¿tienen cita con el doctor esta semana?" },
      { de: "agente", texto: "¡Hola! Sí, tengo el jueves a las 10:00 o el viernes a las 16:30. ¿Cuál prefieres?" },
      { de: "cliente", texto: "El jueves" },
      { de: "agente", texto: "Listo ✅ Tu cita quedó el jueves a las 10:00. Te enviaré un recordatorio un día antes." },
    ],
    preguntas: [
      {
        pregunta: "¿El agente puede dar diagnósticos?",
        respuesta:
          "No. El agente atiende temas administrativos: citas, horarios, costos, ubicación y dudas generales que tú definas. Las preguntas médicas las canaliza a tu equipo.",
      },
      {
        pregunta: "¿Funciona con varios doctores?",
        respuesta: "Sí. Cada profesional puede tener su propia agenda y el agente ofrece los horarios de quien corresponda.",
      },
      {
        pregunta: "¿Mi recepcionista puede seguir contestando?",
        respuesta: "Sí. Todas las conversaciones están en una bandeja compartida y cualquier persona del equipo puede tomar el control.",
      },
    ],
  },
  {
    slug: "despachos-legales-y-contables",
    giro: "Despachos legales y contables",
    palabraClave: "agente de IA para despachos",
    tituloSeo: "Agente de IA en WhatsApp para despachos | LexyonDigital",
    descripcionSeo:
      "Atiende prospectos de tu despacho jurídico o contable por WhatsApp 24/7: el agente de IA filtra el caso, agenda la asesoría y registra todo en tu CRM.",
    h1: "Agente de IA para despachos legales y contables: atiende prospectos y agenda asesorías",
    intro:
      "Un despacho vive de responder rápido al prospecto que tiene un problema hoy. El agente de IA contesta tu WhatsApp al instante, pregunta lo necesario para entender el caso, agenda la asesoría inicial y deja todo registrado para que tu equipo llegue preparado.",
    dolores: [
      "Prospectos que escriben fuera de horario y no vuelven",
      "Tiempo perdido en llamadas con casos que no son de tu especialidad",
      "Seguimiento de clientes en libretas o chats sueltos",
      "Recordatorios de vencimientos y documentos que se olvidan",
    ],
    comoAyuda: [
      {
        titulo: "Filtra y captura el caso",
        texto: "Pregunta tipo de asunto, urgencia y datos de contacto, y los guarda en campos del CRM para clasificar a cada prospecto.",
      },
      {
        titulo: "Agenda la asesoría",
        texto: "Ofrece horarios del abogado o contador que corresponda y confirma la cita en su calendario.",
      },
      {
        titulo: "Seguimiento en pipeline",
        texto: "Cada prospecto avanza por etapas (contacto, asesoría, propuesta, cliente) con tareas para tu equipo.",
      },
      {
        titulo: "Automatizaciones",
        texto: "Recordatorios de documentos pendientes, avisos internos y mensajes de seguimiento sin hacerlo a mano.",
      },
    ],
    conversacion: [
      { de: "cliente", texto: "Buenas noches, necesito ayuda con un contrato de arrendamiento" },
      { de: "agente", texto: "¡Claro! ¿Es para revisar uno que ya tienes o para redactar uno nuevo?" },
      { de: "cliente", texto: "Redactar uno nuevo" },
      { de: "agente", texto: "Perfecto. Puedo agendarte una asesoría mañana a las 11:00 o a las 17:00. ¿Cuál te acomoda?" },
    ],
    preguntas: [
      {
        pregunta: "¿El agente da asesoría legal o fiscal?",
        respuesta:
          "No. Responde dudas generales que tú defines (servicios, honorarios de consulta, documentos a traer) y agenda; la asesoría la da tu equipo.",
      },
      {
        pregunta: "¿Puedo distinguir prospectos de clientes?",
        respuesta: "Sí, con etiquetas, campos personalizados y etapas del pipeline.",
      },
      {
        pregunta: "¿Se maneja la información con confidencialidad?",
        respuesta:
          "Cada cuenta es independiente y solo tu equipo con permisos ve las conversaciones. Te recomendamos indicar en tu aviso de privacidad el uso de WhatsApp.",
      },
    ],
  },
  {
    slug: "inmobiliarias",
    giro: "Inmobiliarias",
    palabraClave: "agente de IA para inmobiliarias",
    tituloSeo: "Agente de IA en WhatsApp para inmobiliarias | LexyonDigital",
    descripcionSeo:
      "Responde a cada interesado en una propiedad por WhatsApp al instante, agenda visitas y organiza a tus prospectos en un pipeline con tu equipo de asesores.",
    h1: "Agente de IA para inmobiliarias: responde a cada interesado y agenda visitas",
    intro:
      "Cuando un anuncio funciona, llegan decenas de mensajes al mismo tiempo y el primero que responde se queda con el cliente. El agente de IA contesta cada consulta sobre tus propiedades, pregunta presupuesto y zona, agenda la visita con el asesor disponible y deja al prospecto listo en tu pipeline.",
    dolores: [
      "Mensajes de anuncios que se enfrían antes de responder",
      "Asesores que repiten la misma información todo el día",
      "Prospectos perdidos entre varios teléfonos",
      "Sin saber qué anuncio trae compradores reales",
    ],
    comoAyuda: [
      {
        titulo: "Respuesta inmediata a cada anuncio",
        texto: "Contesta precio, ubicación, requisitos y disponibilidad con la información de tus propiedades.",
      },
      {
        titulo: "Califica al prospecto",
        texto: "Pregunta presupuesto, zona, forma de pago y tiempos, y lo guarda en el CRM.",
      },
      {
        titulo: "Agenda visitas",
        texto: "Ofrece horarios del asesor y confirma la visita en su calendario con recordatorio.",
      },
      {
        titulo: "Equipo y campo",
        texto: "Reparte conversaciones entre asesores, da seguimiento por pipeline y ubica propiedades y visitas en el mapa.",
      },
    ],
    conversacion: [
      { de: "cliente", texto: "Hola, vi la casa en renta de la zona norte, ¿sigue disponible?" },
      { de: "agente", texto: "¡Hola! Sí está disponible. ¿Para cuántas personas sería y en qué fecha te mudarías?" },
      { de: "cliente", texto: "Somos 3, para el próximo mes" },
      { de: "agente", texto: "Perfecto. ¿Te gustaría visitarla? El asesor tiene sábado 10:00 o 12:00." },
    ],
    preguntas: [
      {
        pregunta: "¿Puede manejar varias propiedades?",
        respuesta: "Sí. Le das la información de tus propiedades (en PDF o desde tu sitio web) y responde según la que pregunte el cliente.",
      },
      {
        pregunta: "¿Funciona con anuncios de Facebook e Instagram?",
        respuesta: "Sí. Si tus anuncios llevan a WhatsApp, el agente atiende cada mensaje que llega de ellos.",
      },
      {
        pregunta: "¿Cómo se reparten los prospectos entre asesores?",
        respuesta: "Con asignación de conversaciones y reparto equilibrado mediante automatizaciones, según el plan.",
      },
    ],
  },
  {
    slug: "servicios-a-domicilio",
    giro: "Servicios técnicos y a domicilio",
    palabraClave: "agente de IA para servicios a domicilio",
    tituloSeo: "Agente de IA para servicios a domicilio | LexyonDigital",
    descripcionSeo:
      "Cotiza, agenda y confirma servicios a domicilio por WhatsApp 24/7: limpieza, mantenimiento, instalación y reparación, con tu equipo organizado en un CRM.",
    h1: "Agente de IA para servicios técnicos y a domicilio: cotiza y agenda por WhatsApp",
    intro:
      "Si tu equipo está en la calle haciendo servicios, nadie contesta el WhatsApp de la oficina. El agente de IA responde precios base, pide la dirección y los detalles del servicio, agenda la visita en el horario disponible y avisa a tu equipo.",
    dolores: [
      "Clientes que piden cotización y nadie responde a tiempo",
      "Agenda de técnicos desordenada",
      "Direcciones y datos del servicio que se pierden en el chat",
      "Clientes que no reciben recordatorio y no están en casa",
    ],
    comoAyuda: [
      {
        titulo: "Cotiza al instante",
        texto: "Responde precios base y condiciones del servicio con tu lista de precios.",
      },
      {
        titulo: "Captura dirección y detalles",
        texto: "Pide ubicación, tipo de servicio y fotos si hace falta, y lo guarda en el contacto.",
      },
      {
        titulo: "Agenda y recuerda",
        texto: "Programa la visita en el calendario del técnico y envía recordatorio al cliente.",
      },
      {
        titulo: "Equipo en campo",
        texto: "Ubica a tus clientes en el mapa y organiza rutas y seguimiento desde la plataforma.",
      },
    ],
    conversacion: [
      { de: "cliente", texto: "¿Cuánto cuesta lavar una sala de 3 piezas?" },
      { de: "agente", texto: "¡Hola! La limpieza de una sala de 3 piezas está en $1,200 e incluye secado rápido. ¿En qué colonia estás?" },
      { de: "cliente", texto: "En el centro" },
      { de: "agente", texto: "Tenemos visita el martes a las 9:00 o a las 13:00. ¿Te agendo?" },
    ],
    preguntas: [
      {
        pregunta: "¿Puede mandar la ubicación del cliente al técnico?",
        respuesta: "La dirección queda en el contacto y se ve en el mapa de la plataforma; tu equipo la consulta desde ahí.",
      },
      {
        pregunta: "¿Qué pasa si el servicio necesita revisión antes de cotizar?",
        respuesta: "El agente pide detalles o fotos y agenda una visita de diagnóstico, o pasa la conversación a tu equipo.",
      },
      {
        pregunta: "¿Funciona fuera de horario?",
        respuesta: "Sí, responde 24/7 y agenda en los horarios que tú habilites.",
      },
    ],
  },
];
