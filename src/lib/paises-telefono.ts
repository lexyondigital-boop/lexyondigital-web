// Catálogo de códigos de país para el teléfono del formulario de registro
// público -- mismos países que ya cubre la plataforma (ver
// ZONAS_SUGERIDAS/PAIS_MONEDA_POR_ZONA en lexyondigital-saas), uno por país
// en vez de uno por zona horaria, porque aquí solo hace falta el código de
// marcado, no la zona.
export const PAISES_TELEFONO: { codigo: string; etiqueta: string }[] = [
  { codigo: "52", etiqueta: "México (+52)" },
  { codigo: "57", etiqueta: "Colombia (+57)" },
  { codigo: "51", etiqueta: "Perú (+51)" },
  { codigo: "56", etiqueta: "Chile (+56)" },
  { codigo: "54", etiqueta: "Argentina (+54)" },
  { codigo: "502", etiqueta: "Guatemala (+502)" },
  { codigo: "506", etiqueta: "Costa Rica (+506)" },
  { codigo: "507", etiqueta: "Panamá (+507)" },
  { codigo: "1", etiqueta: "República Dominicana / Estados Unidos (+1)" },
  { codigo: "34", etiqueta: "España (+34)" },
];

export const CODIGO_PAIS_POR_DEFECTO = "52";
