// Medición del sitio: Google Analytics 4 + Google Ads con una sola etiqueta
// de Google (gtag.js) y Consent Mode v2.
//
// Los IDs son públicos (aparecen en el código de cualquier página que los
// usa), por eso pueden ir aquí. Si una variable NEXT_PUBLIC_* existe en el
// build, gana; si no hay ningún ID, no se carga nada y no hay banner.
//
// Consentimiento: ninguna cookie de Google se activa hasta que la persona
// pulsa "Aceptar" en el banner (así lo promete la Política de Cookies). Sin
// consentimiento Google solo recibe señales anónimas sin cookies, que usa
// para estimar conversiones (modo avanzado de Consent Mode).

// ID público de medición de GA4 (no es secreto). La variable de entorno, si existe, tiene prioridad.
export const ID_GA4 = process.env.NEXT_PUBLIC_GA_ID || "G-6VEQWQDM51";
export const ID_GOOGLE_ADS = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-18566298338";
// Etiqueta de la acción de conversión "Registro" en Google Ads (lo que va
// después de la diagonal en "AW-123/AbCdEf"). Opcional: sin ella, el
// registro se importa a Ads desde GA4.
export const ETIQUETA_ADS_REGISTRO = process.env.NEXT_PUBLIC_GOOGLE_ADS_REGISTRO_LABEL || "";

export const MEDICION_ACTIVA = Boolean(ID_GA4 || ID_GOOGLE_ADS);

// Dominios entre los que se sigue a la misma persona (sitio → app).
export const DOMINIOS_ENLAZADOS = ["lexyondigital.com.mx", "www.lexyondigital.com.mx", "app.lexyondigital.com.mx"];

export const CLAVE_CONSENTIMIENTO = "ld_consentimiento_cookies";
export type EstadoConsentimiento = "aceptado" | "rechazado";
export const EVENTO_ABRIR_PREFERENCIAS = "ld:abrir-preferencias-cookies";

type Gtag = (...args: unknown[]) => void;
const gtag = (): Gtag | null => (typeof window !== "undefined" && typeof (window as unknown as { gtag?: Gtag }).gtag === "function" ? (window as unknown as { gtag: Gtag }).gtag : null);

export function leerConsentimiento(): EstadoConsentimiento | null {
  try {
    const v = window.localStorage.getItem(CLAVE_CONSENTIMIENTO);
    return v === "aceptado" || v === "rechazado" ? v : null;
  } catch {
    return null;
  }
}

export function valoresConsentimiento(estado: EstadoConsentimiento) {
  const v = estado === "aceptado" ? "granted" : "denied";
  return { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v };
}

export function guardarConsentimiento(estado: EstadoConsentimiento) {
  try {
    window.localStorage.setItem(CLAVE_CONSENTIMIENTO, estado);
  } catch {
    // Sin almacenamiento (modo privado): vale para esta visita.
  }
  gtag()?.("consent", "update", valoresConsentimiento(estado));
}

// Evento de GA4 (y conversión de Ads si se pasa su etiqueta). No hace nada si
// la etiqueta no está cargada.
export function evento(nombre: string, parametros: Record<string, unknown> = {}, etiquetaAds?: string) {
  const g = gtag();
  if (!g) return;
  g("event", nombre, parametros);
  if (etiquetaAds && ID_GOOGLE_ADS) g("event", "conversion", { send_to: `${ID_GOOGLE_ADS}/${etiquetaAds}` });
}

// Qué evento corresponde a un clic en un enlace (null = ninguno). Pura, para
// poder probarla sin navegador.
export function eventoDeEnlace(href: string): { nombre: string; destino: string } | null {
  if (/(^|\/\/)(api\.whatsapp\.com|wa\.me)\//i.test(href)) return { nombre: "clic_whatsapp", destino: "whatsapp" };
  if (/^tel:/i.test(href)) return { nombre: "clic_telefono", destino: "telefono" };
  if (/^mailto:/i.test(href)) return { nombre: "clic_correo", destino: "correo" };
  if (/\/registro(\b|[/?#]|$)/.test(href)) return { nombre: "clic_probar_gratis", destino: "registro" };
  if (/\/precios(\b|[/?#]|$)/.test(href)) return { nombre: "clic_ver_precios", destino: "precios" };
  if (/app\.lexyondigital\.com\.mx/.test(href)) return { nombre: "clic_ir_a_la_app", destino: "app" };
  return null;
}

// Script que va antes de gtag.js: cola, consentimiento por defecto (todo
// negado salvo lo que la persona ya haya aceptado antes) y configuración.
export function scriptInicialGoogle(): string {
  const ids = [ID_GA4, ID_GOOGLE_ADS].filter(Boolean);
  const config = ids
    .map((id) => `gtag('config',${JSON.stringify(id)}${id === ID_GA4 ? `,{linker:{domains:${JSON.stringify(DOMINIOS_ENLAZADOS)}}}` : ""});`)
    .join("");
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});try{if(localStorage.getItem(${JSON.stringify(CLAVE_CONSENTIMIENTO)})==='aceptado'){gtag('consent','update',{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'});}}catch(e){}gtag('set','url_passthrough',true);gtag('js',new Date());${config}`;
}
