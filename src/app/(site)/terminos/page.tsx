import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";
import { metadataPagina } from "@/lib/metadata-pagina";
import { PAQUETES, pesos } from "@/lib/planes";

export const metadata: Metadata = metadataPagina({
  titulo: "Términos y Condiciones — LexyonDigital",
  descripcion: "Términos y condiciones de uso de la plataforma LexyonDigital.",
  ruta: "/terminos",
});

export default function TerminosPage() {
  return (
    <LegalLayout titulo="Términos y Condiciones" actualizado="25 de octubre de 2026">
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
        Puedes registrarte para una prueba gratuita de 14 días sin necesidad de tarjeta de crédito, con las
        funciones y límites del plan Profesional. Al
        finalizar el periodo de prueba sin que se convierta en una suscripción de pago, el acceso a la cuenta
        se suspende. Eres responsable de la veracidad de la información que proporciones al registrarte y de
        mantener la confidencialidad de tus credenciales de acceso.
      </p>

      <h2>4. Planes, precios y pagos</h2>
      <p>
        La plataforma se contrata en uno de los siguientes planes. Todos los precios están en pesos mexicanos
        (MXN) y <strong>no incluyen el Impuesto al Valor Agregado (IVA)</strong>, que se agrega al momento del
        cobro:
      </p>
      <ul>
        {PAQUETES.map((p) => (
          <li key={p.clave}>
            <strong>{p.nombre}</strong>: {pesos(p.mensual)} MXN al mes + IVA, o {pesos(p.anual)} MXN al año + IVA
            (precio de lista: {pesos(p.listaMensual)} MXN al mes y {pesos(p.listaAnual)} MXN al año).
          </li>
        ))}
      </ul>
      <p>
        Los precios anteriores son los que pagas; el precio de lista se muestra como referencia del
        descuento vigente y podemos dejar de aplicar ese descuento a nuevas contrataciones con el aviso previsto
        en esta sección. Los límites y funciones de cada plan (usuarios, contactos, números de WhatsApp, respuestas del agente
        de inteligencia artificial, profesionales con agenda, automatizaciones, páginas web, reportes y
        módulos incluidos), así como los precios de los extras, la implementación y las tarifas del saldo
        prepago, son los
        publicados en nuestra <a href="/precios">página de precios</a>, que forma parte de estos términos. Si
        contrataste condiciones especiales por escrito con LexyonDigital, prevalecen esas condiciones.
      </p>
      <p>
        La suscripción se paga por adelantado, mensual o anualmente según la modalidad elegida, y se renueva
        al término de cada periodo mientras no la canceles. No hay plazo forzoso: puedes cambiar de plan o
        cancelar en cualquier momento, y el cambio aplica a partir del siguiente periodo de facturación, salvo
        que acordemos otra cosa. Los periodos ya pagados no son reembolsables, salvo que la ley aplicable
        disponga lo contrario.
      </p>
      <p>
        Al alcanzar un límite de tu plan, lo que ya tienes sigue funcionando, pero no podrás crear más
        elementos de ese tipo hasta que contrates un extra o cambies de plan. Los contactos que te escriben
        por WhatsApp se registran siempre, aunque hayas llegado al límite. Cambiar a un plan menor no elimina
        tu información; solo restringe la creación de nuevos elementos y el acceso a los módulos que el nuevo
        plan no incluye.
      </p>
      <p>
        El servicio de implementación (conexión con Meta, configuración del agente, plantillas y flujos) es
        opcional, se cobra en un solo pago y no forma parte de la suscripción mensual. Podemos modificar los
        precios con al menos 30 días de aviso previo; el nuevo precio aplica a partir del siguiente periodo de
        facturación.
      </p>

      <h2>5. Mensajes de WhatsApp: cargos de Meta</h2>
      <p>
        <strong>El costo de los mensajes de WhatsApp no está incluido en ningún plan.</strong> Meta Platforms
        cobra los mensajes de plantilla (los que la empresa envía primero, como campañas, recordatorios o
        avisos) conforme a su tarifa vigente, directamente al método de pago que registres en tu cuenta de
        WhatsApp Business. Esa relación de pago es entre tú y Meta: LexyonDigital no cobra, factura ni
        reembolsa esos cargos, no controla sus tarifas y no es responsable de sus cambios. Las tarifas que
        mostramos en nuestro sitio son solo de referencia.
      </p>
      <p>
        Eres responsable de mantener un método de pago válido ante Meta. Si Meta suspende el envío de mensajes
        por falta de pago, por la calidad de tu número o por incumplir sus políticas, la plataforma no podrá
        enviar mensajes desde ese número, sin que esto genere responsabilidad para LexyonDigital ni reduzca el
        precio de tu plan.
      </p>

      <h2>6. Saldo prepago, recargas y facturación</h2>
      <p>
        Las llamadas con agentes de voz con inteligencia artificial, la generación de imágenes y video, las
        estrategias de contenido y el acceso a tendencias del sector no están incluidos en ningún plan: se pagan,
        por defecto, mediante un <strong>saldo prepago en dólares americanos (USD)</strong> que recargas y
        administras desde la sección de Configuración de tu cuenta. Para usar esas funciones debes tener saldo
        disponible. Cada uso se descuenta del saldo conforme a las tarifas en USD publicadas en nuestra{" "}
        <a href="/precios">página de precios</a> vigentes al momento del uso; a las recargas se les agrega el IVA
        correspondiente. Puedes recargar tu saldo en cualquier momento
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
        Las cuotas de suscripción de los planes se rigen por la sección 4 de estos términos.
      </p>

      <h2>7. Uso aceptable, en especial respecto a WhatsApp</h2>
      <p>
        El uso del canal de WhatsApp a través de nuestra plataforma está sujeto, además de estos términos, a
        las políticas de Meta para la Plataforma de WhatsApp Business (incluyendo su Política Comercial y
        Política de la Plataforma WhatsApp Business). Te comprometes a:
      </p>
      <ul>
        <li>No enviar mensajes masivos no solicitados (spam) ni contenido que viole las políticas de Meta.</li>
        <li>
          Contar con el consentimiento previo de cada persona antes de contactarla por WhatsApp, salvo que
          ella te haya escrito primero. Ese consentimiento no tiene que mencionar WhatsApp por su nombre ni
          recabarse dentro de la propia conversación: basta con una autorización general de esa persona para
          que tu negocio le mande mensajes, obtenida por cualquier medio (tu sitio web, SMS, una llamada
          telefónica, en persona o en papel), conforme a la Política de Mensajería Comercial de WhatsApp
          vigente. Debes respetar la solicitud de baja de cualquier persona aunque te llegue por un canal
          distinto a WhatsApp, y declarar en la plataforma cómo obtuviste ese consentimiento al dar de alta
          tus contactos -- la plataforma te lo va a pedir antes de dejarte mandar mensajes a un contacto
          nuevo.
        </li>
        <li>
          No revender, redistribuir ni cobrar a ningún tercero por el acceso a la Plataforma de WhatsApp
          Business a través de LexyonDigital, ni permitir que un tercero distinto de ti se integre, acceda o
          la use por tu cuenta. La suscripción o el saldo que contrates con nosotros es para el uso de tu
          propio negocio -- esto no te impide cobrar por tus propios productos o servicios, solo revender el
          acceso a WhatsApp en sí. Tampoco puedes usar el nombre o las marcas de Meta sin su autorización.
        </li>
        <li>No usar el servicio para fines ilegales, fraudulentos, difamatorios o que infrinjan derechos de terceros.</li>
        <li>No intentar vulnerar, descompilar o sobrecargar deliberadamente nuestra infraestructura.</li>
      </ul>
      <p>
        El incumplimiento de las políticas de Meta puede resultar en la suspensión de tu número de WhatsApp
        por parte de Meta, fuera de nuestro control. Nos reservamos el derecho de suspender cuentas que
        pongan en riesgo nuestro acceso a la Plataforma de WhatsApp Business.
      </p>

      <h2>8. Propiedad intelectual</h2>
      <p>
        LexyonDigital conserva todos los derechos sobre la plataforma, su software y su marca. El contenido
        que generes a través de la plataforma (texto, imágenes, video) con tus propios insumos es tuyo,
        sujeto a los términos de licencia del proveedor de inteligencia artificial subyacente que lo generó.
        Los datos de tu negocio y de tus contactos siguen siendo tuyos; LexyonDigital los trata únicamente
        para prestarte el servicio, conforme a nuestro <a href="/privacidad">Aviso de Privacidad</a>.
      </p>

      <h2>9. Disponibilidad del servicio y proveedores externos</h2>
      <p>
        Hacemos un esfuerzo razonable por mantener la plataforma disponible, pero no garantizamos un
        funcionamiento ininterrumpido o libre de errores. El servicio depende de proveedores externos (Meta,
        OpenAI, Anthropic, Google, Retell, Stripe, entre otros); una interrupción o cambio en esos proveedores
        puede afectar la disponibilidad de ciertas funciones y está fuera de nuestro control directo.
      </p>

      <h2>10. Limitación de responsabilidad</h2>
      <p>
        En la máxima medida permitida por la ley aplicable, LexyonDigital no será responsable por daños
        indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso de la plataforma,
        incluyendo pérdida de datos, de ingresos o de oportunidades de negocio, salvo en los casos en que la
        ley no permita limitar dicha responsabilidad.
      </p>

      <h2>11. Cancelación y eliminación de datos</h2>
      <p>
        Puedes cancelar tu cuenta en cualquier momento. Tras la cancelación, tus datos y los de tus contactos
        asociados a la cuenta se eliminan de forma automática a los 30 días, conforme se describe en nuestro{" "}
        <a href="/privacidad">Aviso de Privacidad</a>. Podemos suspender o cancelar tu cuenta si incumples
        estos términos, incluyendo el uso indebido del canal de WhatsApp descrito en la sección 7. Si quieres
        conocer más acerca de cómo solicitar la eliminación de tus datos, da clic en el siguiente enlace:{" "}
        <a href="https://app.lexyondigital.com.mx/eliminacion-de-datos" target="_blank" rel="noreferrer">
          Instrucciones de eliminación de datos
        </a>
        .
      </p>

      <h2>12. Ley aplicable y jurisdicción</h2>
      <p>
        Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia,
        las partes se someten a los tribunales competentes de la ciudad de Mérida, Yucatán, renunciando a
        cualquier otro fuero que pudiera corresponderles.
      </p>

      <h2>13. Modificaciones a estos términos</h2>
      <p>
        Podemos actualizar estos Términos y Condiciones. Publicaremos los cambios en esta misma página con
        la fecha de última actualización; el uso continuado de la plataforma después de un cambio implica tu
        aceptación de los nuevos términos.
      </p>

      <h2>14. Contacto</h2>
      <p>
        Para cualquier duda sobre estos términos: <a href="mailto:info@lexyondigital.com">info@lexyondigital.com</a>.
      </p>
    </LegalLayout>
  );
}
