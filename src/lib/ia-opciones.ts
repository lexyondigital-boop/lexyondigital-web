// Opciones de modelo/calidad compartidas entre las Server Actions (que no
// pueden exportar más que funciones async, al estar en un archivo
// "use server") y los componentes cliente que arman los selectores.

export const MODELOS_TEXTO = ["claude-opus-5-5", "claude-sonnet-5-5"] as const;
export type ModeloTexto = (typeof MODELOS_TEXTO)[number];

export const CALIDADES_IMAGEN = ["low", "medium", "high"] as const;
export type CalidadImagen = (typeof CALIDADES_IMAGEN)[number];
