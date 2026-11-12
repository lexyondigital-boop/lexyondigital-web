// Páginas de servicio. Cada una apunta a UNA búsqueda principal (palabra
// clave) y a sus variantes; el mapa completo está en el manual de SEO
// (Paso 7). Regla: solo afirmaciones que el negocio sostiene hoy -- sin
// precios ni plazos inventados para legal y contable.
export type Servicio = {
  slug: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  color: "marca" | "ia" | "datos";
  // SEO
  palabraClave: string;
  tituloSeo: string; // <= 60 caracteres, con la palabra clave al inicio
  descripcionSeo: string; // <= 155 caracteres
  h1: string;
  intro: string;
  beneficios: { titulo: string; texto: string }[];
  incluye: string[];
  pasos: { titulo: string; texto: string }[];
  paraQuien: string[];
  preguntas: { pregunta: string; respuesta: string }[];
  cta: { titulo: string; texto: string; boton: string; destino: "registro" | "whatsapp"; mensajeWhatsapp?: string };
  relacionados: string[]; // slugs
};

export const SERVICIOS: Servicio[] = [
  {
    slug: "automatizacion-agentes-ia",
    nombre: "Automatización con Agentes de IA",
    resumen:
      "Nuestra propia plataforma: un CRM con un agente de inteligencia artificial que atiende WhatsApp por ti las 24 horas —responde dudas, agenda, reagenda y cancela citas directo en tu calendario.",
    descripcion:
      "Nuestra propia plataforma: un CRM con un agente de inteligencia artificial que atiende WhatsApp por ti las 24 horas — responde dudas de tus clientes, agenda, reagenda y cancela citas directo en tu calendario, y se conecta con Google Calendar para que nunca se te empalme una cita.",
    color: "ia",
    palabraClave: "agente de IA para WhatsApp",
    tituloSeo: "Agente de IA para WhatsApp que agenda citas | LexyonDigital",
    descripcionSeo:
      "Agente de inteligencia artificial que responde tu WhatsApp 24/7, agenda citas en tu calendario y guarda cada cliente en un CRM. Prueba gratis 14 días.",
    h1: "Agente de IA para WhatsApp que atiende y agenda por ti, 24/7",
    intro:
      "Cada mensaje que no contestas a tiempo es un cliente que se va con la competencia. Nuestro agente de inteligencia artificial responde tu WhatsApp al instante, a cualquier hora: resuelve dudas con la información de tu negocio, agenda, reagenda y cancela citas en tu calendario y guarda a cada persona en un CRM para que tu equipo dé seguimiento.",
    beneficios: [
      {
        titulo: "Respuesta inmediata, día y noche",
        texto:
          "El agente contesta en segundos, también fines de semana y fuera de horario. Tus clientes no esperan y tú no pierdes ventas por no estar frente al teléfono.",
      },
      {
        titulo: "Citas sin ida y vuelta",
        texto:
          "Revisa tu disponibilidad real, ofrece horarios y agenda directo en el calendario, sincronizado con Google Calendar, sin empalmes. También reagenda y cancela.",
      },
      {
        titulo: "Contesta como tu negocio",
        texto:
          "Le das tus precios, servicios, políticas y preguntas frecuentes (en PDF o desde tu sitio web) y responde con esa información, en el tono que tú elijas.",
      },
      {
        titulo: "Todo queda en tu CRM",
        texto:
          "Cada conversación crea o actualiza el contacto con etiquetas y campos personalizados. Cuando hace falta una persona, tu equipo toma la conversación desde la misma bandeja.",
      },
    ],
    incluye: [
      "Agente de IA conectado a la API oficial de WhatsApp Business",
      "Bandeja de conversaciones compartida para tu equipo",
      "Calendario con profesionales y sincronización con Google Calendar",
      "Recordatorios automáticos de cita",
      "CRM con etiquetas, campos personalizados e importación de contactos",
      "Automatizaciones (seguimientos, avisos internos, recordatorios)",
      "Plantillas de WhatsApp aprobadas por Meta para campañas",
      "Reportes y dashboard de atención",
    ],
    pasos: [
      {
        titulo: "Conecta tu WhatsApp",
        texto: "Vinculas tu número con WhatsApp Business de Meta desde la plataforma, en unos minutos.",
      },
      {
        titulo: "Enséñale tu negocio",
        texto: "Cargas tus servicios, horarios y respuestas frecuentes, y defines qué datos debe pedir a cada cliente.",
      },
      {
        titulo: "Actívalo y mide",
        texto: "El agente empieza a atender; tú ves cada conversación, cita y contacto en tiempo real.",
      },
    ],
    paraQuien: [
      "Consultorios, clínicas y profesionales de la salud",
      "Despachos legales y contables",
      "Salones, spas y estudios",
      "Inmobiliarias y equipos de venta",
      "Escuelas, academias y cursos",
      "Cualquier negocio que agenda o vende por WhatsApp",
    ],
    preguntas: [
      {
        pregunta: "¿Qué es un agente de IA para WhatsApp?",
        respuesta:
          "Es un asistente de inteligencia artificial conectado a tu número de WhatsApp que entiende lo que escribe el cliente y responde con la información de tu negocio. A diferencia de un chatbot de menús, conversa de forma natural y puede hacer acciones como agendar una cita.",
      },
      {
        pregunta: "¿Es lo mismo que un chatbot?",
        respuesta:
          "Un chatbot tradicional sigue un menú fijo de opciones. El agente de IA entiende preguntas escritas a su manera, responde con tu información y realiza tareas (agendar, reagendar, cancelar, capturar datos) sin que el cliente tenga que elegir números.",
      },
      {
        pregunta: "¿Necesito WhatsApp Business?",
        respuesta:
          "Sí. El agente funciona con la API oficial de WhatsApp Business de Meta. Te guiamos para conectar tu número desde la plataforma.",
      },
      {
        pregunta: "¿Puedo intervenir en una conversación?",
        respuesta:
          "Sí. Tu equipo ve todas las conversaciones en una bandeja compartida y puede tomar el control en cualquier momento.",
      },
      {
        pregunta: "¿Cuánto cuesta?",
        respuesta:
          "Hay tres paquetes mensuales según el número de usuarios, contactos y respuestas del agente. Puedes ver precios y lo que incluye cada uno en la página de precios, y probar la plataforma 14 días gratis.",
      },
    ],
    cta: {
      titulo: "Pruébalo 14 días gratis",
      texto: "Conecta tu WhatsApp y deja que el agente atienda a tus clientes mientras tú te enfocas en tu negocio.",
      boton: "Empezar prueba gratis",
      destino: "registro",
    },
    relacionados: ["capacitacion-marketing-digital", "asesoria-legal"],
  },
  {
    slug: "capacitacion-marketing-digital",
    nombre: "Capacitación en Marketing Digital",
    resumen:
      "Aprende a correr tus propias campañas de Meta Ads sin depender de una agencia. Talleres prácticos —desde cero hasta optimización avanzada— con acompañamiento real y plantillas listas para usar.",
    descripcion:
      "Talleres prácticos de Facebook e Instagram Ads pensados para dueños de negocio y equipos de marketing que quieren dejar de depender de terceros.",
    color: "marca",
    palabraClave: "curso de Meta Ads",
    tituloSeo: "Curso de Meta Ads: Facebook e Instagram Ads | LexyonDigital",
    descripcionSeo:
      "Capacitación práctica en Meta Ads: aprende a crear, segmentar, medir y optimizar tus campañas de Facebook e Instagram sin depender de una agencia.",
    h1: "Curso de Meta Ads: aprende a anunciarte en Facebook e Instagram",
    intro:
      "Pagar una agencia sin entender qué hace con tu presupuesto sale caro. En nuestra capacitación de Meta Ads aprendes a crear y manejar tus propias campañas de Facebook e Instagram: desde configurar el Administrador de anuncios hasta leer los resultados y decidir dónde invertir el siguiente peso.",
    beneficios: [
      {
        titulo: "Práctico desde la primera sesión",
        texto: "Trabajas sobre tu propio negocio y tu propia cuenta publicitaria, no sobre ejemplos genéricos.",
      },
      {
        titulo: "De cero a optimización",
        texto: "Empiezas con la estructura correcta de campañas y avanzas hasta segmentación, pruebas y escalamiento.",
      },
      {
        titulo: "Métricas que sí importan",
        texto: "Aprendes a leer costo por resultado, frecuencia y conversiones para saber qué funciona y qué apagar.",
      },
      {
        titulo: "Plantillas listas para usar",
        texto: "Te llevas estructuras de campaña, guías de anuncios y listas de verificación para aplicar al día siguiente.",
      },
    ],
    incluye: [
      "Configuración del Administrador de anuncios y del portafolio comercial",
      "Estructura de campañas, conjuntos de anuncios y anuncios",
      "Públicos: intereses, personalizados y similares",
      "Píxel de Meta y medición de conversiones",
      "Creatividades y textos que convierten",
      "Lectura de métricas y optimización del presupuesto",
      "Campañas para mensajes de WhatsApp",
      "Acompañamiento y plantillas",
    ],
    pasos: [
      { titulo: "Diagnóstico", texto: "Revisamos tu negocio, tu cuenta y tus objetivos para definir por dónde empezar." },
      { titulo: "Talleres prácticos", texto: "Sesiones paso a paso en las que construyes tus campañas con nuestra guía." },
      { titulo: "Acompañamiento", texto: "Resolvemos dudas mientras tus campañas corren y ajustamos con datos reales." },
    ],
    paraQuien: [
      "Dueños de negocio que quieren anunciarse por su cuenta",
      "Equipos de marketing que empiezan con Meta Ads",
      "Emprendedores que gastan en anuncios sin ver resultados",
      "Profesionales que quieren conseguir clientes por WhatsApp",
    ],
    preguntas: [
      {
        pregunta: "¿Qué es Meta Ads?",
        respuesta:
          "Es la plataforma de publicidad de Meta para anunciarte en Facebook, Instagram, Messenger y WhatsApp. Desde un solo lugar, el Administrador de anuncios, creas campañas, eliges a quién mostrarlas y mides los resultados.",
      },
      {
        pregunta: "¿Necesito experiencia previa?",
        respuesta: "No. Empezamos desde la configuración de la cuenta y avanzamos al ritmo del grupo.",
      },
      {
        pregunta: "¿Cuánto debo invertir en anuncios?",
        respuesta:
          "Depende de tu negocio y objetivo. En la capacitación aprendes a empezar con un presupuesto pequeño, medir y aumentar solo lo que funciona.",
      },
      {
        pregunta: "¿Hay talleres grabados?",
        respuesta: "Sí, en nuestra Biblioteca hay talleres que puedes ver a tu ritmo.",
      },
    ],
    cta: {
      titulo: "Aprende a anunciarte con resultados",
      texto: "Escríbenos y te decimos qué taller va mejor con tu negocio.",
      boton: "Quiero información del curso",
      destino: "whatsapp",
      mensajeWhatsapp: "Hola, quiero información de la capacitación en Meta Ads.",
    },
    relacionados: ["automatizacion-agentes-ia", "asesoria-legal"],
  },
  {
    slug: "asesoria-legal",
    nombre: "Asesoría Legal",
    resumen:
      "Protege tu marca y tu operación con respaldo legal hecho para emprendedores y pymes: contratos, términos y condiciones, cumplimiento normativo y registro de marca.",
    descripcion:
      "Respaldo legal pensado para la realidad de un emprendedor o una pyme: contratos claros, términos y condiciones para tu sitio o app, cumplimiento normativo y registro de marca.",
    color: "marca",
    palabraClave: "registro de marca y asesoría legal para pymes",
    tituloSeo: "Registro de marca y asesoría legal | LexyonDigital",
    descripcionSeo:
      "Asesoría legal para emprendedores y pymes en México: registro de marca ante el IMPI, contratos, términos y condiciones, aviso de privacidad y cumplimiento.",
    h1: "Asesoría legal para pymes: registro de marca, contratos y cumplimiento",
    intro:
      "Una marca sin registrar, un contrato de palabra o un sitio web sin aviso de privacidad son riesgos que muchas pymes descubren cuando ya es tarde. Te damos respaldo legal claro y a la medida de tu negocio, sin la complejidad ni los tiempos de un despacho tradicional.",
    beneficios: [
      {
        titulo: "Protege tu marca",
        texto: "Te acompañamos en la búsqueda y el registro de tu marca ante el IMPI para que nadie más pueda usarla.",
      },
      {
        titulo: "Contratos claros",
        texto: "Contratos de prestación de servicios, compraventa, confidencialidad y más, redactados para tu operación.",
      },
      {
        titulo: "Tu sitio y tus datos en regla",
        texto: "Términos y condiciones, aviso de privacidad y políticas para tu página web, tienda o app.",
      },
      {
        titulo: "Lenguaje sencillo",
        texto: "Te explicamos cada documento y cada paso sin tecnicismos, para que sepas qué firmas y por qué.",
      },
    ],
    incluye: [
      "Búsqueda de antecedentes y registro de marca ante el IMPI",
      "Contratos civiles y mercantiles",
      "Términos y condiciones para sitio web, tienda en línea o app",
      "Aviso de privacidad conforme a la ley de protección de datos",
      "Revisión de documentos antes de firmar",
      "Cumplimiento normativo para tu giro",
    ],
    pasos: [
      { titulo: "Cuéntanos tu caso", texto: "Nos escribes por WhatsApp y entendemos qué necesitas." },
      { titulo: "Propuesta", texto: "Te decimos el alcance, los documentos y el costo antes de empezar." },
      { titulo: "Entrega y seguimiento", texto: "Preparamos los documentos o el trámite y te acompañamos hasta concluir." },
    ],
    paraQuien: [
      "Emprendedores que lanzan una marca",
      "Pymes que trabajan con contratos de palabra",
      "Negocios con página web, tienda en línea o app",
      "Profesionales independientes que prestan servicios",
    ],
    preguntas: [
      {
        pregunta: "¿Por qué registrar mi marca?",
        respuesta:
          "El registro ante el IMPI te da el derecho exclusivo de usar tu marca en México para los productos o servicios registrados, y te permite actuar contra quien la copie. Sin registro, otra persona podría registrarla primero.",
      },
      {
        pregunta: "¿Qué necesita mi página web legalmente?",
        respuesta:
          "Como mínimo, un aviso de privacidad si recabas datos personales (formularios, registros, cookies) y términos y condiciones si vendes o prestas servicios en línea.",
      },
      {
        pregunta: "¿Atienden en todo México?",
        respuesta: "Sí, la asesoría es en línea para todo el país.",
      },
    ],
    cta: {
      titulo: "Protege tu negocio",
      texto: "Cuéntanos qué necesitas y te enviamos una propuesta sin compromiso.",
      boton: "Hablar con un asesor legal",
      destino: "whatsapp",
      mensajeWhatsapp: "Hola, necesito asesoría legal para mi negocio.",
    },
    relacionados: ["contabilidad", "automatizacion-agentes-ia"],
  },
  {
    slug: "contabilidad",
    nombre: "Contabilidad",
    resumen:
      "Lleva tu contabilidad y tus obligaciones fiscales al día sin dolores de cabeza: facturación, declaraciones, régimen fiscal y reportes financieros claros.",
    descripcion:
      "Contabilidad y cumplimiento fiscal llevados de principio a fin: facturación, declaraciones, régimen fiscal y reportes financieros claros y a tiempo.",
    color: "marca",
    palabraClave: "contabilidad para pymes",
    tituloSeo: "Contabilidad para pymes y emprendedores | LexyonDigital",
    descripcionSeo:
      "Servicio contable para pymes y emprendedores en México: facturación, declaraciones ante el SAT, elección de régimen fiscal y reportes financieros claros.",
    h1: "Contabilidad para pymes y emprendedores, al día con el SAT",
    intro:
      "Multas, recargos y declaraciones fuera de tiempo le quitan a tu negocio dinero y tranquilidad. Llevamos tu contabilidad y tus obligaciones fiscales de principio a fin, con reportes claros para que sepas cómo va tu negocio y tomes decisiones con números reales.",
    beneficios: [
      { titulo: "Obligaciones al día", texto: "Declaraciones mensuales y anuales presentadas en tiempo ante el SAT." },
      {
        titulo: "El régimen correcto",
        texto: "Revisamos tu actividad para que estés en el régimen fiscal que más te conviene, como RESICO cuando aplica.",
      },
      { titulo: "Facturación sin errores", texto: "Te apoyamos con tus CFDI para que factures y deduzcas correctamente." },
      { titulo: "Números claros", texto: "Reportes financieros entendibles para saber cuánto ganas y en qué se va el dinero." },
    ],
    incluye: [
      "Contabilidad mensual",
      "Declaraciones mensuales y anual ante el SAT",
      "Asesoría en régimen fiscal (incluido RESICO)",
      "Apoyo con facturación electrónica (CFDI)",
      "Reportes financieros",
      "Atención a requerimientos y dudas fiscales",
    ],
    pasos: [
      { titulo: "Diagnóstico fiscal", texto: "Revisamos tu situación ante el SAT y lo que hay pendiente." },
      { titulo: "Puesta al día", texto: "Ordenamos lo atrasado y definimos el calendario de obligaciones." },
      { titulo: "Contabilidad mensual", texto: "Llevamos tu contabilidad y te enviamos reportes claros cada mes." },
    ],
    paraQuien: [
      "Personas físicas con actividad empresarial",
      "Profesionales independientes",
      "Pequeñas y medianas empresas",
      "Emprendedores que empiezan a facturar",
    ],
    preguntas: [
      {
        pregunta: "¿Qué es el RESICO?",
        respuesta:
          "El Régimen Simplificado de Confianza es un régimen fiscal con tasas reducidas de ISR para personas físicas y morales que cumplen ciertos límites de ingresos. Revisamos si te conviene según tu actividad.",
      },
      {
        pregunta: "Tengo declaraciones atrasadas, ¿me pueden ayudar?",
        respuesta: "Sí. Primero hacemos un diagnóstico de lo pendiente y luego te ponemos al día con un plan claro.",
      },
      { pregunta: "¿Trabajan en línea?", respuesta: "Sí, atendemos en línea a negocios de todo México." },
    ],
    cta: {
      titulo: "Pon tu contabilidad en orden",
      texto: "Escríbenos y revisamos tu situación fiscal.",
      boton: "Hablar con un contador",
      destino: "whatsapp",
      mensajeWhatsapp: "Hola, necesito apoyo con la contabilidad de mi negocio.",
    },
    relacionados: ["asesoria-legal", "automatizacion-agentes-ia"],
  },
];
