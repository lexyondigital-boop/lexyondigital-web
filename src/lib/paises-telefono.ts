// Catálogo de códigos de país para el teléfono del formulario de registro
// público -- mismos países que ya cubre la plataforma (ver
// ZONAS_SUGERIDAS/PAIS_MONEDA_POR_ZONA en lexyondigital-saas), uno por país
// en vez de uno por zona horaria, porque aquí solo hace falta el código de
// marcado, no la zona.
// Etiquetas cortas a propósito -- el desplegable comparte fila con el input
// del número, así que "México (+52)" ya no cabe sin empujar el número fuera
// de la tarjeta. "MX +52" alcanza para distinguirlos sin ese problema.
export const PAISES_TELEFONO: { codigo: string; etiqueta: string }[] = [
  { codigo: "52", etiqueta: "MX +52" },
  { codigo: "57", etiqueta: "CO +57" },
  { codigo: "51", etiqueta: "PE +51" },
  { codigo: "56", etiqueta: "CL +56" },
  { codigo: "54", etiqueta: "AR +54" },
  { codigo: "502", etiqueta: "GT +502" },
  { codigo: "506", etiqueta: "CR +506" },
  { codigo: "507", etiqueta: "PA +507" },
  { codigo: "1", etiqueta: "DO/US +1" },
  { codigo: "34", etiqueta: "ES +34" },
];

export const CODIGO_PAIS_POR_DEFECTO = "52";
