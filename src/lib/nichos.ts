// Mismo catálogo que NICHOS en lexyondigital-saas/src/lib/contenido.ts --
// duplicado a propósito porque son dos repos con builds independientes, igual
// que paises-telefono.ts. Si se agrega un nicho allá, hay que agregarlo aquí
// también para que el registro público pueda ofrecerlo.
export const NICHOS: { clave: string; etiqueta: string }[] = [
  { clave: "emprendedores", etiqueta: "Emprendedores y negocios" },
  { clave: "clinicas", etiqueta: "Clínicas, médicos y consultorios" },
  { clave: "abogados", etiqueta: "Abogados y despachos jurídicos" },
  { clave: "contadores", etiqueta: "Contadores y despachos contables" },
  { clave: "inmobiliaria", etiqueta: "Inmobiliaria y agentes" },
  { clave: "servicios", etiqueta: "Servicios y atención técnica" },
  { clave: "cobranza", etiqueta: "Cobranza y recuperación de cartera" },
  { clave: "agencia_marketing", etiqueta: "Agencia de marketing / IA" },
  { clave: "limpieza_tapiceria", etiqueta: "Limpieza de salas, colchones y vestiduras de auto" },
  { clave: "otro", etiqueta: "Otro" },
];
