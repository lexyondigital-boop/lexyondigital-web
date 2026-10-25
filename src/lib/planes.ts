// Paquetes de la plataforma tal como se publican en /precios y se citan en
// /terminos. Los límites y módulos son los mismos que aplica la app
// (tabla public.planes en lexyondigital-saas): si cambian allá, se cambian
// aquí. Precios en MXN SIN IVA.

export type Paquete = {
  clave: "esencial" | "profesional" | "empresarial";
  nombre: string;
  mensual: number;
  anual: number;
  // Precio de lista: se muestra tachado. +30%, +20% y +10% sobre el precio
  // de Esencial, Profesional y Empresarial (mismos valores que la tabla
  // planes de la app).
  listaMensual: number;
  listaAnual: number;
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
    listaMensual: 649,
    listaAnual: 6490,
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
    listaMensual: 959,
    listaAnual: 9590,
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
    listaMensual: 2199,
    listaAnual: 21990,
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
      { concepto: "Agentes de voz y campañas de llamadas", valores: [false, false, "Con saldo"] },
      { concepto: "Contenido, imágenes y video con IA", valores: [false, false, "Con saldo"] },
      { concepto: "Tendencias del sector", valores: ["Con saldo", "Con saldo", "Con saldo"] },
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

// Lo que tiene costo variable se paga con saldo prepago en dólares: el
// cliente recarga y cada uso se descuenta. Precios en USD + IVA, convertidos
// de la propuesta en pesos (tipo de cambio ~18.7) y redondeados.
export const CONSUMO_USD: { concepto: string; precio: string }[] = [
  { concepto: "Minuto de llamada con agente de voz", precio: "$0.35" },
  { concepto: "Imagen generada con IA", precio: "$0.25" },
  { concepto: "Video con IA, clip de 5 segundos", precio: "$1.25" },
  { concepto: "Video con IA, clip de 10 segundos", precio: "$2.25" },
  { concepto: "Estrategia de contenido con IA", precio: "$0.50" },
  { concepto: "Tendencias del sector: la semana de tu nicho", precio: "$0.50" },
  { concepto: "Tendencias con recomendaciones para tu negocio", precio: "$1.00" },
  { concepto: "Tendencias: reporte completo del mes", precio: "$1.50" },
];

// Montos de recarga que ofrece la app (Configuración → saldo), en USD.
export const RECARGAS_USD = [10, 25, 50, 100];

export function descuento(precio: number, lista: number) {
  return Math.round((1 - precio / lista) * 100);
}

export function pesos(monto: number) {
  return `$${monto.toLocaleString("es-MX")}`;
}
