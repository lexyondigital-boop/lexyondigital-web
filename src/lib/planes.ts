// Paquetes de la plataforma tal como se publican en /precios y se citan en
// /terminos. Los límites y módulos son los mismos que aplica la app
// (tabla public.planes en lexyondigital-saas): si cambian allá, se cambian
// aquí. Precios en MXN SIN IVA.

export type Paquete = {
  clave: "esencial" | "profesional" | "empresarial";
  nombre: string;
  mensual: number;
  anual: number;
  implementacion: number;
  para: string;
  destacado?: boolean;
  resumen: string[];
};

export const PAQUETES: Paquete[] = [
  {
    clave: "esencial",
    nombre: "Esencial",
    mensual: 499,
    anual: 4990,
    implementacion: 990,
    para: "Para el negocio que atiende y agenda por WhatsApp.",
    resumen: [
      "1 usuario y 1 número de WhatsApp",
      "Agente de IA 24/7: 500 respuestas al mes",
      "Calendario con 1 profesional y Google Calendar",
      "Recordatorio automático de citas",
      "CRM con 500 contactos e importación CSV",
      "Dashboard general",
      "1 página web con IA",
    ],
  },
  {
    clave: "profesional",
    nombre: "Profesional",
    mensual: 799,
    anual: 7990,
    implementacion: 1990,
    destacado: true,
    para: "Para el negocio con equipo de ventas y agenda compartida.",
    resumen: [
      "3 usuarios con permisos por agente",
      "Agente de IA 24/7: 2,500 respuestas al mes",
      "Calendario con 3 profesionales",
      "CRM con 2,500 contactos y Google Sheets",
      "Pipeline de ventas con tareas",
      "Campañas por WhatsApp",
      "5 automatizaciones activas",
      "Dashboard y 3 reportes",
    ],
  },
  {
    clave: "empresarial",
    nombre: "Empresarial",
    mensual: 1999,
    anual: 19990,
    implementacion: 3990,
    para: "Para la empresa que automatiza, hace campañas y trabaja en campo.",
    resumen: [
      "10 usuarios y 2 números de WhatsApp",
      "Agente de IA 24/7: 10,000 respuestas al mes",
      "Calendario con profesionales ilimitados",
      "CRM con 10,000 contactos",
      "Automatizaciones ilimitadas y webhooks",
      "Campañas por WhatsApp, correo y llamadas con IA",
      "Contenido, imágenes y video con IA",
      "Mapas para equipos de campo",
      "Todos los reportes y auditoría",
    ],
  },
];

// Valor por paquete, en el orden de PAQUETES. true/false = incluido o no;
// texto = el límite o la variante.
export type Fila = { concepto: string; valores: [string | boolean, string | boolean, string | boolean] };
export type Grupo = { titulo: string; filas: Fila[] };

export const COMPARATIVA: Grupo[] = [
  {
    titulo: "Capacidad",
    filas: [
      { concepto: "Usuarios", valores: ["1", "3", "10"] },
      { concepto: "Contactos", valores: ["500", "2,500", "10,000"] },
      { concepto: "Números de WhatsApp", valores: ["1", "1", "2"] },
    ],
  },
  {
    titulo: "Atención por WhatsApp",
    filas: [
      { concepto: "Bandeja de conversaciones compartida", valores: [true, true, true] },
      { concepto: "Imágenes, videos y documentos en el chat", valores: [true, true, true] },
      { concepto: "Plantillas de WhatsApp aprobadas por Meta", valores: [true, true, true] },
      { concepto: "Asignación de conversaciones y permisos por agente", valores: [false, true, true] },
    ],
  },
  {
    titulo: "Agente de inteligencia artificial",
    filas: [
      { concepto: "Respuestas del agente al mes", valores: ["500", "2,500", "10,000"] },
      { concepto: "Base de conocimiento (PDF y sitio web)", valores: ["1 fuente", "5 fuentes", "Ilimitadas"] },
      { concepto: "Agenda, reagenda y cancela citas", valores: [true, true, true] },
    ],
  },
  {
    titulo: "Calendario y citas",
    filas: [
      { concepto: "Profesionales con agenda propia", valores: ["1", "3", "Ilimitados"] },
      { concepto: "Sincronización con Google Calendar", valores: [true, true, true] },
      { concepto: "Bloqueos de horario y vacaciones", valores: [true, true, true] },
      { concepto: "Recordatorios automáticos de cita", valores: ["24 h antes", "Configurables", "Configurables"] },
    ],
  },
  {
    titulo: "CRM y ventas",
    filas: [
      { concepto: "Etiquetas, campos personalizados e importación CSV", valores: [true, true, true] },
      { concepto: "Importar y exportar con Google Sheets", valores: [false, true, true] },
      { concepto: "Pipeline de oportunidades y tareas", valores: [false, true, true] },
      { concepto: "Mapas para equipos de campo y cobranza", valores: [false, false, true] },
    ],
  },
  {
    titulo: "Reportes",
    filas: [
      { concepto: "Dashboard general", valores: [true, true, true] },
      { concepto: "Reportes configurables", valores: [false, "3", "Ilimitados"] },
      { concepto: "Dashboard de automatizaciones", valores: [false, true, true] },
      { concepto: "Estadísticas de llamadas y bitácora de auditoría", valores: [false, false, true] },
    ],
  },
  {
    titulo: "Marketing y automatización",
    filas: [
      { concepto: "Automatizaciones activas", valores: ["1", "5", "Ilimitadas"] },
      { concepto: "Webhooks hacia otros sistemas", valores: [false, false, true] },
      { concepto: "Campañas por WhatsApp", valores: [false, true, true] },
      { concepto: "Campañas por correo", valores: [false, false, true] },
      { concepto: "Agentes de voz y campañas de llamadas", valores: [false, false, "Con créditos"] },
      { concepto: "Contenido, imágenes y video con IA", valores: [false, false, "Con créditos"] },
      { concepto: "Tendencias del sector", valores: ["Con créditos", "Con créditos", "Con créditos"] },
      { concepto: "Páginas web con IA", valores: ["1", "1", "3 + dominio propio"] },
    ],
  },
];

export const EXTRAS: { concepto: string; precio: string }[] = [
  { concepto: "Usuario adicional", precio: "$129 al mes" },
  { concepto: "1,000 contactos adicionales", precio: "$99 al mes" },
  { concepto: "Número de WhatsApp adicional", precio: "$199 al mes" },
  { concepto: "1,000 respuestas adicionales del agente de IA", precio: "$79 al mes" },
];

export const CONSUMO_CREDITOS: { concepto: string; creditos: string }[] = [
  { concepto: "Minuto de llamada con agente de voz", creditos: "6 créditos" },
  { concepto: "Imagen generada con IA", creditos: "5 créditos" },
  { concepto: "Video generado con IA", creditos: "25 créditos" },
  { concepto: "Estrategia de contenido con IA", creditos: "10 créditos" },
  { concepto: "Tendencias del sector: la semana de tu nicho", creditos: "10 créditos" },
  { concepto: "Tendencias con recomendaciones para tu negocio", creditos: "20 créditos" },
  { concepto: "Tendencias: reporte completo del mes", creditos: "30 créditos" },
];

export const PAQUETES_CREDITOS: { creditos: string; precio: string }[] = [
  { creditos: "300 créditos", precio: "$300" },
  { creditos: "1,000 créditos + 5% de bono", precio: "$1,000" },
  { creditos: "3,000 créditos + 10% de bono", precio: "$3,000" },
];

export function pesos(monto: number) {
  return `$${monto.toLocaleString("es-MX")}`;
}
