// Datos únicos del sitio para SEO: metadata, Open Graph, JSON-LD, robots y
// sitemap los leen de aquí para que nunca se desalineen entre sí.
//
// El dominio canónico es www -- el apex (lexyondigital.com.mx) redirige aquí
// con 308 (ver redirects en next.config.ts), así Google no ve dos copias de
// cada página.
export const URL_SITIO = "https://www.lexyondigital.com.mx";

export const NOMBRE_SITIO = "LexyonDigital";

export const TITULO_INICIO = "LexyonDigital — Agente de IA para WhatsApp, CRM, marketing, legal y contable";

// 140–155 caracteres: lo que Google muestra completo en el resultado.
export const DESCRIPCION_INICIO =
  "Agente de IA para WhatsApp 24/7, CRM y agenda de citas, más capacitación en Meta Ads y asesoría legal y contable para pymes y emprendedores en México.";

export const CORREO_CONTACTO = "info@lexyondigital.com.mx";

// Teléfono de contacto (confirmado por el negocio). Se muestra con el "1"
// tradicional de celular mexicano; para wa.me, tel: y Schema.org va en
// formato internacional E.164 (sin el "1", que ya no se usa desde 2019 y
// WhatsApp no necesita).
export const TELEFONO_VISIBLE = "+52 1 720 137 7472";
export const TELEFONO_E164 = "+527201377472";
export const URL_WHATSAPP = "https://wa.me/527201377472";
