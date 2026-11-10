import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { metadataPagina } from "@/lib/metadata-pagina";

export const metadata: Metadata = metadataPagina({
  titulo: "Política de Cookies — LexyonDigital",
  descripcion: "Qué cookies y tecnologías similares usa el sitio lexyondigital.com.mx.",
  ruta: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalLayout titulo="Política de Cookies" actualizado="10 de noviembre de 2026">
      <h2>1. Alcance de este aviso</h2>
      <p>
        Este aviso describe el uso de cookies y tecnologías similares en el sitio{" "}
        <strong>lexyondigital.com.mx</strong> (el sitio de marketing e información pública de LexyonDigital).
        No cubre la plataforma de administración <strong>app.lexyondigital.com.mx</strong>, a la que acceden
        nuestros clientes ya registrados y que se rige por sus propias condiciones de uso una vez que inician
        sesión.
      </p>

      <h2>2. Cookies de medición y publicidad (solo con tu consentimiento)</h2>
      <p>
        Para saber cómo llegan las personas a nuestro sitio y mejorar nuestros anuncios usamos{" "}
        <strong>Google Analytics 4</strong> y <strong>Google Ads</strong>, de Google LLC. Estas cookies{" "}
        <strong>solo se activan si pulsas &quot;Aceptar&quot;</strong> en el aviso de cookies que aparece en tu primera visita.
        Si las rechazas o no eliges, no se guarda ninguna cookie de Google en tu navegador; Google solo recibe señales
        anónimas sin cookies (por ejemplo, que hubo una visita), que no permiten identificarte.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie</th>
            <th>De quién</th>
            <th>Para qué</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>_ga, _ga_*</td>
            <td>Google Analytics</td>
            <td>Distinguir visitas y medir qué páginas se ven y qué acciones se hacen (registro, clic en WhatsApp)</td>
            <td>Hasta 2 años</td>
          </tr>
          <tr>
            <td>_gcl_au, _gcl_aw</td>
            <td>Google Ads</td>
            <td>Saber si una visita llegó desde un anuncio y si terminó en registro</td>
            <td>90 días</td>
          </tr>
        </tbody>
      </table>
      <p>
        No vendemos tus datos ni construimos perfiles para terceros. Puedes cambiar tu decisión cuando quieras con el enlace{" "}
        <strong>&quot;Preferencias de cookies&quot;</strong> al pie de cualquier página. Más información sobre cómo usa Google estos
        datos: <a href="https://policies.google.com/technologies/partner-sites">policies.google.com/technologies/partner-sites</a>.
      </p>

      <h2>3. Elemento de seguridad que sí utilizamos</h2>
      <p>
        El formulario de registro de prueba gratuita usa <strong>Cloudflare Turnstile</strong>, un reto
        anti-bot que verifica que quien llena el formulario es una persona real y no un programa automatizado.
        Turnstile puede establecer una cookie o almacenamiento técnico propio de Cloudflare, necesario
        únicamente para completar esa verificación; no se usa para rastrear tu actividad en otros sitios. Para
        más información sobre cómo opera, puedes consultar la política de privacidad de Cloudflare.
      </p>

      <h2>4. Datos que sí recabamos en este sitio (sin cookies)</h2>
      <p>
        Si usas el formulario de registro de prueba gratuita, recabamos directamente los datos que tú
        escribes (nombre, teléfono, correo y giro del negocio) y tu dirección IP al momento del envío, con
        fines de seguridad (prevención de abuso) — esto no ocurre mediante una cookie, sino como parte normal
        de cualquier envío de formulario web. El tratamiento completo de esos datos se explica en nuestro{" "}
        <a href="/privacidad">Aviso de Privacidad</a>.
      </p>

      <h2>5. Cómo administrar cookies en tu navegador</h2>
      <p>
        Además del aviso de cookies, cualquier navegador te permite bloquear o eliminar cookies desde su
        configuración de privacidad. Ten en cuenta que bloquear el reto de
        verificación de Cloudflare Turnstile puede impedir que el formulario de registro funcione
        correctamente.
      </p>

      <h2>6. Cambios a esta política</h2>
      <p>
        Si incorporamos otras herramientas de medición o publicidad, actualizaremos esta política antes de activarlas y
        te pediremos tu consentimiento en el mismo aviso de cookies.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Dudas sobre esta política: <a href="mailto:info@lexyondigital.com.mx">info@lexyondigital.com.mx</a>.
      </p>
    </LegalLayout>
  );
}
