import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Términos y Condiciones — LexyonDigital",
  description: "Términos y condiciones de uso de la plataforma LexyonDigital.",
};

export default function TerminosPage() {
  return (
    <LegalLayout titulo="Términos y Condiciones" actualizado="11 de octubre de 2026">
      <h2>1. Quiénes somos y a qué aplican estos términos</h2>
      <p>
        Estos Términos y Condiciones rigen el uso de la plataforma LexyonDigital, operada por{" "}
        <strong>CONSULTINGOLD S.A.S. DE C.V.</strong> (&quot;LexyonDigital&quot;, &quot;nosotros&quot;),
        accesible en app.lexyondigital.com.mx. Al registrarte o usar la plataforma, aceptas estos términos.
        Si no estás de acuerdo, no debes usar el servicio.
      </p>

      <h2>2. Descripción del servicio</h2>
      <p>
        LexyonDigital es una plataforma de automatización comercial que incluye, entre otras funciones: un
        agente de atención por WhatsApp con inteligencia artificial, agentes de voz para llamadas telefónicas,
        gestión de contactos y pipelines de venta (CRM), agenda de citas, envío de campañas de correo
        electrónico, y generación de contenido (imágenes y video) con inteligencia artificial. No todas las
        funciones están disponibles en todos los planes.
      </p>

      <h2>3. Registro y periodo de prueba</h2>
      <p>
        Puedes registrarte para una prueba gratuita de 14 días sin necesidad de tarjeta de crédito. Al
        finalizar el periodo de prueba sin que se convierta en una suscripción de pago, el acceso a la cuenta
        se suspende. Eres responsable de la veracidad de la información que proporciones al registrarte y de
        mantener la confidencialidad de tus credenciales de acceso.
      </p>

      <h2>4. Saldo prepago, recargas y facturación</h2>
      <p>
        Las funciones de generación de imágenes, video y voz operan, por defecto, mediante un{" "}
        <strong>saldo prepago en dólares americanos (USD)</strong> que administras desde la sección de
        Configuración de tu cuenta. El saldo se consume conforme al costo real de cada generación con el
        proveedor de inteligencia artificial correspondiente. Puedes recargar tu saldo en cualquier momento
        mediante tarjeta a través de Stripe, nuestro procesador de pagos. Te notificaremos dentro de la
        plataforma y por correo cuando tu saldo esté próximo a agotarse; si se agota por completo, esas
        funciones se bloquean hasta que recargues.
      </p>
      <p>
        Las recargas de saldo <strong>no son reembolsables</strong>, salvo que la ley aplicable disponga lo
        contrario. Un administrador de tu cuenta puede, en lugar de usar el saldo prepago administrado por
        LexyonDigital, conectar y usar sus propias credenciales (API keys) de los proveedores de inteligencia
        artificial, caso en el cual el costo de uso lo paga directamente al proveedor correspondiente y no se
        descuenta saldo con LexyonDigital. Esta opción, cuando está disponible, puede habilitarse o
        deshabilitarse por decisión nuestra para cada cuenta.
      </p>
      <p>
        Las cuotas de suscripción, cuando apliquen según tu plan, se cobran conforme a lo acordado al
        contratar el servicio. Podemos modificar precios con aviso previo razonable.
      </p>

      <h2>5. Uso aceptable, en especial respecto a WhatsApp</h2>
      <p>
        El uso del canal de WhatsApp a través de nuestra plataforma está sujeto, además de estos términos, a
        las políticas de Meta para la Plataforma de WhatsApp Business (incluyendo su Política Comercial y
        Política de la Plataforma WhatsApp Business). Te comprometes a:
      </p>
      <ul>
        <li>No enviar mensajes masivos no solicitados (spam) ni contenido que viole las políticas de Meta.</li>
        <li>Contar con el consentimiento de las personas a quienes contactas por WhatsApp fuera de una conversación que ellas mismas iniciaron, cuando la plataforma de Meta así lo requiera.</li>
        <li>No usar el servicio para fines ilegales, fraudulentos, difamatorios o que infrinjan derechos de terceros.</li>
        <li>No intentar vulnerar, descompilar o sobrecargar deliberadamente nuestra infraestructura.</li>
      </ul>
      <p>
        El incumplimiento de las políticas de Meta puede resultar en la suspensión de tu número de WhatsApp
        por parte de Meta, fuera de nuestro control. Nos reservamos el derecho de suspender cuentas que
        pongan en riesgo nuestro acceso a la Plataforma de WhatsApp Business.
      </p>

      <h2>6. Propiedad intelectual</h2>
      <p>
        LexyonDigital conserva todos los derechos sobre la plataforma, su software y su marca. El contenido
        que generes a través de la plataforma (texto, imágenes, video) con tus propios insumos es tuyo,
        sujeto a los términos de licencia del proveedor de inteligencia artificial subyacente que lo generó.
        Los datos de tu negocio y de tus contactos siguen siendo tuyos; LexyonDigital los trata únicamente
        para prestarte el servicio, conforme a nuestro <a href="/privacidad">Aviso de Privacidad</a>.
      </p>

      <h2>7. Disponibilidad del servicio y proveedores externos</h2>
      <p>
        Hacemos un esfuerzo razonable por mantener la plataforma disponible, pero no garantizamos un
        funcionamiento ininterrumpido o libre de errores. El servicio depende de proveedores externos (Meta,
        OpenAI, Anthropic, Google, Retell, Stripe, entre otros); una interrupción o cambio en esos proveedores
        puede afectar la disponibilidad de ciertas funciones y está fuera de nuestro control directo.
      </p>

      <h2>8. Limitación de responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley aplicable, LexyonDigital no será responsable por daños
        indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de la plataforma,
        incluyendo pérdida de datos, de ingresos o de oportunidades de negocio, salvo en los casos en que la
        ley no permita limitar dicha responsabilidad.
      </p>

      <h2>9. Cancelación y eliminación de datos</h2>
      <p>
        Puedes cancelar tu cuenta en cualquier momento. Tras la cancelación, tus datos y los de tus contactos
        asociados a la cuenta se eliminan de forma automática a los 30 días, conforme se describe en nuestro{" "}
        <a href="/privacidad">Aviso de Privacidad</a>. Podemos suspender o cancelar tu cuenta si incumples
        estos términos, incluyendo el uso indebido del canal de WhatsApp descrito en la sección 5.
      </p>

      <h2>10. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia,
        las partes se someten a los tribunales competentes de la ciudad de Mérida, Yucatán, renunciando a
        cualquier otro fuero que pudiera corresponderles.
      </p>

      <h2>11. Modificaciones a estos términos</h2>
      <p>
        Podemos actualizar estos Términos y Condiciones. Publicaremos los cambios en esta misma página con
        la fecha de última actualización; el uso continuado de la plataforma después de un cambio implica tu
        aceptación de los nuevos términos.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Para cualquier duda sobre estos términos: <a href="mailto:info@lexyondigital.com">info@lexyondigital.com</a>.
      </p>
    </LegalLayout>
  );
}
