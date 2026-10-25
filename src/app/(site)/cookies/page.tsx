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
    <LegalLayout titulo="Política de Cookies" actualizado="11 de octubre de 2026">
      <h2>1. Alcance de este aviso</h2>
      <p>
        Este aviso describe el uso de cookies y tecnologías similares en el sitio{" "}
        <strong>lexyondigital.com.mx</strong> (el sitio de marketing e información pública de LexyonDigital).
        No cubre la plataforma de administración <strong>app.lexyondigital.com.mx</strong>, a la que acceden
        nuestros clientes ya registrados y que se rige por sus propias condiciones de uso una vez que inician
        sesión.
      </p>

      <h2>2. Este sitio no usa cookies de rastreo ni de analítica</h2>
      <p>
        lexyondigital.com.mx <strong>no coloca cookies propias de analítica web, publicidad o rastreo de
        comportamiento</strong> (por ejemplo, no usamos Google Analytics, píxeles de redes sociales ni
        herramientas similares de medición en este sitio). No construimos perfiles de navegación de quienes
        visitan el sitio ni compartimos datos de navegación con fines publicitarios.
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
        Aunque este sitio no coloca cookies de rastreo propias, cualquier navegador te permite bloquear o
        eliminar cookies desde su configuración de privacidad. Ten en cuenta que bloquear el reto de
        verificación de Cloudflare Turnstile puede impedir que el formulario de registro funcione
        correctamente.
      </p>

      <h2>6. Cambios a esta política</h2>
      <p>
        Si en el futuro incorporamos herramientas de analítica o publicidad en este sitio, actualizaremos esta
        política antes de activarlas y, cuando la ley lo requiera, solicitaremos tu consentimiento primero.
      </p>

      <h2>7. Contacto</h2>
      <p>
        Dudas sobre esta política: <a href="mailto:info@lexyondigital.com">info@lexyondigital.com</a>.
      </p>
    </LegalLayout>
  );
}
