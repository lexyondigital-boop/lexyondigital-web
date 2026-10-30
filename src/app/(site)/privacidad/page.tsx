import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { metadataPagina } from "@/lib/metadata-pagina";

export const metadata: Metadata = metadataPagina({
  titulo: "Aviso de Privacidad — LexyonDigital",
  descripcion: "Aviso de Privacidad Integral de LexyonDigital conforme a la LFPDPPP.",
  ruta: "/privacidad",
});

export default function PrivacidadPage() {
  return (
    <LegalLayout titulo="Aviso de Privacidad" actualizado="18 de octubre de 2026">
      <h2>1. Identidad y domicilio del responsable</h2>
      <p>
        <strong>CONSULTINGOLD S.A.S. DE C.V.</strong>, RFC <strong>CON260325H62</strong>, con domicilio en
        Calle 127 número 624, Fraccionamiento Los Héroes, Mérida, Yucatán, C.P. 97306 (en adelante,
        &quot;LexyonDigital&quot;), es responsable del tratamiento de tus datos personales conforme a la Ley
        Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.
      </p>

      <h2>2. Datos personales que recabamos</h2>
      <p>Según cómo interactúes con nosotros, podemos recabar las siguientes categorías de datos:</p>
      <h3>2.1 Si eres contacto de uno de nuestros clientes (atención por WhatsApp, llamadas o correo)</h3>
      <p>
        Cuando escribes al número de WhatsApp, recibes una llamada o un correo de un negocio que usa
        LexyonDigital para automatizar su atención, podemos recabar: tu nombre o nombre de perfil, número de
        teléfono, correo electrónico, el contenido de tus mensajes de texto, notas o etiquetas que el negocio
        capture sobre ti en su CRM, datos de citas que agendes (fecha, hora, motivo), y, si envías audio o
        imágenes por WhatsApp, ese archivo de audio o imagen (el audio de voz puede considerarse un dato
        sensible). Si el negocio usa nuestro agente de llamadas con inteligencia artificial, también se
        recaba la grabación y transcripción de la llamada.
      </p>
      <p>
        Este tratamiento lo realizamos <strong>por cuenta e instrucción del negocio con el que tú tienes la
        relación directa</strong> (nuestro cliente), quien es el responsable primario de informarte sobre el
        uso de tus datos conforme a su propio aviso de privacidad. LexyonDigital actúa como encargado del
        tratamiento de esos datos en la infraestructura que opera para dicho negocio.
      </p>
      <p>
        Es responsabilidad de ese negocio haber obtenido tu autorización previa para contactarte por
        WhatsApp antes de agregarte a su plataforma, salvo que tú le hayas escrito primero. Si no diste esa
        autorización, o ya no quieres recibir mensajes suyos, puedes solicitar la baja directamente con ese
        negocio o escribiéndonos a <a href="mailto:info@lexyondigital.com.mx">info@lexyondigital.com.mx</a>, y lo
        haremos valer con el negocio correspondiente.
      </p>
      <h3>2.2 Si eres usuario o administrador de la plataforma LexyonDigital</h3>
      <p>
        Si tu negocio contrata LexyonDigital, recabamos tu nombre, teléfono y correo electrónico (de ti y de
        las personas que registres como usuarios adicionales de tu cuenta), así como registros de acceso
        (dirección IP, navegador y fecha/hora de inicio de sesión) con fines de seguridad.
      </p>
      <h3>2.3 Si visitas este sitio o llenas el formulario de prueba gratuita</h3>
      <p>
        Al registrarte para la prueba gratuita de 14 días en lexyondigital.com.mx, recabamos el nombre y giro
        de tu negocio, tu nombre, teléfono y correo, y tu dirección IP (esta última únicamente con fines de
        seguridad para prevenir abuso del formulario; se elimina a las 24 horas).
      </p>

      <h2>3. Finalidades del tratamiento</h2>
      <p>Usamos tus datos personales para las siguientes finalidades, necesarias para el servicio que contrataste o para el servicio que el negocio con el que interactúas nos contrató:</p>
      <ul>
        <li>Operar el agente de inteligencia artificial que responde mensajes de WhatsApp, incluyendo generar respuestas automáticas con base en el contenido de la conversación.</li>
        <li>Agendar, reagendar o cancelar citas cuando lo solicites.</li>
        <li>Realizar o recibir llamadas telefónicas, incluyendo llamadas atendidas por un agente de voz con inteligencia artificial.</li>
        <li>Enviar correos electrónicos o campañas de mensajería autorizadas por el negocio del que eres contacto.</li>
        <li>Administrar tu cuenta de usuario de la plataforma, incluyendo autenticación y control de accesos.</li>
        <li>Procesar pagos y recargas de saldo cuando el servicio lo requiera.</li>
        <li>Dar seguimiento a solicitudes de prueba gratuita y contacto comercial.</li>
        <li>Cumplir obligaciones legales y atender requerimientos de autoridad competente.</li>
      </ul>
      <p>
        Finalidades secundarias (no necesarias para el servicio, pero que nos permiten mejorar nuestra
        relación contigo): envío de comunicaciones informativas o promocionales sobre LexyonDigital. Puedes
        oponerte a estas finalidades secundarias en cualquier momento sin que esto afecte el servicio
        principal, usando los medios de contacto de la sección 8.
      </p>

      <h2>4. Transferencia de datos a terceros</h2>
      <p>
        Para operar el servicio, compartimos los datos estrictamente necesarios con los siguientes terceros,
        cada uno bajo su propia política de privacidad y, en su caso, acuerdo de procesamiento de datos:
      </p>
      <ul>
        <li><strong>Meta Platforms, Inc.</strong> (WhatsApp Business Platform) — para enviar y recibir los mensajes de WhatsApp.</li>
        <li><strong>OpenAI, L.L.C.</strong> — para generar respuestas de texto, transcribir audio de voz y generar imágenes, según la configuración de cada cuenta.</li>
        <li><strong>Anthropic, PBC</strong> — como proveedor alternativo de generación de respuestas de texto con IA.</li>
        <li><strong>xAI Corp.</strong> — como proveedor alternativo de generación de imágenes/video.</li>
        <li><strong>Runway AI, Inc.</strong> — para generación de video, incluyendo, cuando el cliente use esa función, un video de referencia que este haya subido.</li>
        <li><strong>Replicate, Inc.</strong> — como proveedor alternativo de generación de imágenes/video.</li>
        <li><strong>ElevenLabs, Inc.</strong> — como proveedor alternativo de síntesis de voz.</li>
        <li><strong>Retell AI, Inc.</strong> — para operar llamadas atendidas por agentes de voz con IA; recibe el nombre, teléfono y correo del contacto, además de la grabación y transcripción de la llamada.</li>
        <li><strong>Google LLC</strong> — para agendar citas en Google Calendar, enviar correos (si el negocio conecta su Gmail) o respaldar contactos en Google Sheets/Drive, cuando el negocio activa esas integraciones.</li>
        <li><strong>Zadarma Ltd.</strong> — como proveedor de telefonía para llamadas de voz.</li>
        <li><strong>Stripe, Inc.</strong> — para procesar pagos y recargas de saldo.</li>
        <li><strong>Supabase, Inc.</strong> — como proveedor de base de datos y almacenamiento donde se guarda la información.</li>
        <li><strong>Hostinger International Ltd.</strong> — como proveedor del servidor donde corre la aplicación (no recibe datos personales de forma independiente, únicamente hospeda el cómputo).</li>
        <li><strong>Cloudflare, Inc.</strong> — para verificación anti-abuso (captcha) en el formulario de registro.</li>
      </ul>
      <p>
        No vendemos tus datos personales ni los compartimos con terceros para fines distintos a los descritos
        en este aviso.
      </p>

      <h2>5. Transferencia internacional de datos</h2>
      <p>
        Parte de los datos personales que tratamos se almacenan y procesan fuera de México. Nuestra base de
        datos principal está hospedada en servidores ubicados en <strong>Estados Unidos</strong>, y los
        terceros listados en la sección 4 operan, en su mayoría, desde Estados Unidos u otros países fuera de
        México. Al usar nuestros servicios o interactuar con un negocio que los usa, consientes esta
        transferencia internacional, necesaria para la prestación del servicio, conforme al artículo 36 de la
        LFPDPPP.
      </p>

      <h2>6. Medidas de seguridad</h2>
      <p>
        Implementamos medidas técnicas razonables para proteger tus datos personales, entre ellas: cifrado
        AES-256-GCM de las credenciales de acceso a servicios de terceros almacenadas en nuestra base de
        datos, controles de acceso a nivel de fila que restringen que cada cuenta solo vea su propia
        información, verificación en dos pasos para el acceso administrativo, y verificación de firma
        criptográfica en las notificaciones que recibimos de WhatsApp y otros proveedores. No obstante,
        ningún sistema es infalible: no garantizamos la seguridad absoluta de la información y, en caso de
        un incidente que comprometa tus datos, te notificaremos conforme lo exige la ley aplicable.
      </p>

      <h2>7. Conservación y eliminación de datos</h2>
      <p>
        Conservamos tus datos personales mientras exista una relación contractual vigente con el negocio del
        que eres contacto o mientras tu cuenta de plataforma esté activa. Si una cuenta de plataforma se
        cancela, sus datos asociados se eliminan de forma automática a los 30 días de la cancelación. Si un
        contacto se elimina del CRM de un negocio, el contenido de sus conversaciones asociadas también se
        elimina en ese momento. Los respaldos (backups) de la base de datos se conservan por un periodo
        adicional conforme a la política de nuestro proveedor de infraestructura, con el único fin de
        recuperación ante fallas. Si quieres conocer más acerca de cómo solicitar la eliminación de tus datos,
        da clic en el siguiente enlace:{" "}
        <a href="https://app.lexyondigital.com.mx/eliminacion-de-datos" target="_blank" rel="noreferrer">
          Instrucciones de eliminación de datos
        </a>
        .
      </p>

      <h2>8. Derechos ARCO y cómo ejercerlos</h2>
      <p>
        Tienes derecho a Acceder a tus datos personales, Rectificarlos si son inexactos, Cancelarlos cuando
        consideres que no se requieren para alguna de las finalidades señaladas, y Oponerte al tratamiento de
        los mismos para fines específicos (derechos ARCO). También puedes revocar el consentimiento que, en
        su caso, nos hayas otorgado.
      </p>
      <p>
        Para ejercer cualquiera de estos derechos, contáctanos en{" "}
        <a href="mailto:info@lexyondigital.com.mx">info@lexyondigital.com.mx</a> indicando tu nombre, el medio por
        el que tuviste contacto con nosotros (por ejemplo, el negocio cuyo WhatsApp usaste) y el derecho que
        deseas ejercer. Si tu solicitud corresponde a datos tratados por LexyonDigital por cuenta de un
        negocio cliente, podemos canalizarla a dicho negocio como responsable primario de esos datos.
      </p>

      <h2>9. Uso de cookies</h2>
      <p>
        El sitio lexyondigital.com.mx no utiliza cookies de rastreo o analítica propias. Consulta el detalle
        completo en nuestra <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>10. Cambios a este aviso</h2>
      <p>
        Podemos modificar este Aviso de Privacidad para reflejar cambios en nuestras prácticas o en la
        legislación aplicable. Publicaremos cualquier cambio en esta misma página indicando la fecha de
        última actualización.
      </p>

      <h2>11. Contacto</h2>
      <p>
        Para cualquier duda sobre este aviso: <a href="mailto:info@lexyondigital.com.mx">info@lexyondigital.com.mx</a>.
      </p>
    </LegalLayout>
  );
}
