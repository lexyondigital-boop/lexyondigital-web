"use client";

import { useRef, useState, type FormEvent } from "react";
import { CAPTCHA_SITE_KEY, Turnstile, type TurnstileHandle } from "@/components/Turnstile";
import { PAISES_TELEFONO, CODIGO_PAIS_POR_DEFECTO } from "@/lib/paises-telefono";

// Mismo dominio donde vive la plataforma -- el endpoint público de registro
// (/api/registro-publico) tiene CORS abierto solo para este origen.
const URL_REGISTRO = "https://app.lexyondigital.com.mx/api/registro-publico";

const inputClase =
  "w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2.5 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]";

export function RegistroForm() {
  const [nombreCuenta, setNombreCuenta] = useState("");
  const [giro, setGiro] = useState("");
  const [nombreAdmin, setNombreAdmin] = useState("");
  const [codigoPais, setCodigoPais] = useState(CODIGO_PAIS_POR_DEFECTO);
  const [telefonoAdmin, setTelefonoAdmin] = useState("");
  const [emailAdmin, setEmailAdmin] = useState("");
  // Oculto por CSS -- un visitante real nunca lo llena, un bot que completa
  // todos los campos del formulario sí. Ver /api/registro-publico.
  const [sitioWeb, setSitioWeb] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exito, setExito] = useState(false);
  const [avisoCorreo, setAvisoCorreo] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const turnstileRef = useRef<TurnstileHandle>(null);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    // Mismo formato que ya espera el resto de la plataforma para teléfonos
    // (código de país + número, solo dígitos, sin "+") -- ver
    // normalizarDestinatario en lexyondigital-saas/src/lib/meta.ts.
    const telefonoLimpio = telefonoAdmin.replace(/\D/g, "");
    const telefonoConCodigo = telefonoLimpio ? `${codigoPais}${telefonoLimpio}` : "";

    // /api/registro-publico necesita DOS tokens de Turnstile: uno para su
    // propio check anti-bot y otro aparte para el captchaToken que exige
    // Supabase al mandar el correo de "define tu contraseña" -- un token de
    // Cloudflare solo es válido la primera vez que se verifica, así que no
    // puede ser el mismo que ya se usó arriba.
    const turnstileTokenCorreo = await turnstileRef.current?.obtenerTokenFresco();

    const res = await fetch(URL_REGISTRO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre_cuenta: nombreCuenta,
        giro,
        nombre_admin: nombreAdmin,
        telefono_admin: telefonoConCodigo,
        email_admin: emailAdmin,
        sitio_web: sitioWeb,
        turnstile_token: captchaToken,
        turnstile_token_correo: turnstileTokenCorreo,
      }),
    }).catch(() => null);

    setEnviando(false);

    if (!res) {
      setError("No se pudo conectar. Revisa tu conexión e intenta de nuevo.");
      return;
    }

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.error ?? "No se pudo completar el registro.");
      return;
    }

    setAvisoCorreo(data.avisoCorreo ?? null);
    setExito(true);
  }

  if (exito) {
    return (
      <div className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-8 text-center">
        <span
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-xl"
          style={{ background: "var(--color-marca)", color: "#fff" }}
        >
          ✓
        </span>
        <h2 className="text-lg font-semibold text-[var(--color-texto)]">¡Listo, {nombreCuenta}!</h2>
        {avisoCorreo ? (
          <p className="mt-2 text-sm text-amber-600">{avisoCorreo}</p>
        ) : (
          <p className="mt-2 text-sm text-[var(--color-texto-mute)]">
            Te mandamos un correo a <strong className="text-[var(--color-texto)]">{emailAdmin}</strong> para que
            definas tu contraseña y entres a la plataforma.
          </p>
        )}
        <p className="mt-2 text-sm text-[var(--color-texto-mute)]">Tu prueba gratuita de 14 días ya está activa.</p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6 sm:p-8">
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Nombre de tu negocio</span>
          <input
            value={nombreCuenta}
            onChange={(e) => setNombreCuenta(e.target.value)}
            required
            className={inputClase}
            placeholder="Mi Agencia S.A. de C.V."
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Giro (opcional)</span>
          <input value={giro} onChange={(e) => setGiro(e.target.value)} className={inputClase} placeholder="Marketing, legal, contable…" />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Tu nombre</span>
          <input
            value={nombreAdmin}
            onChange={(e) => setNombreAdmin(e.target.value)}
            required
            className={inputClase}
            placeholder="Nombre y apellido"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Teléfono (opcional)</span>
          <div className="flex gap-2">
            {/* inputClase trae w-full -- aquí no sirve, cada campo de esta
                fila necesita su propio ancho (uno fijo, el otro flexible)
                para no salirse de la tarjeta. */}
            <select
              value={codigoPais}
              onChange={(e) => setCodigoPais(e.target.value)}
              aria-label="Código de país"
              className="w-28 shrink-0 rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-2 py-2.5 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]"
            >
              {PAISES_TELEFONO.map((p) => (
                <option key={p.codigo} value={p.codigo}>
                  {p.etiqueta}
                </option>
              ))}
            </select>
            <input
              value={telefonoAdmin}
              onChange={(e) => setTelefonoAdmin(e.target.value)}
              type="tel"
              className="min-w-0 flex-1 rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2.5 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]"
              placeholder="10 dígitos"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Correo electrónico</span>
          <input
            value={emailAdmin}
            onChange={(e) => setEmailAdmin(e.target.value)}
            type="email"
            required
            className={inputClase}
            placeholder="tu@correo.com"
          />
        </label>

        <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            Sitio web
            <input value={sitioWeb} onChange={(e) => setSitioWeb(e.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2 text-sm text-[var(--color-texto-mute)]">
        <input
          type="checkbox"
          checked={aceptaTerminos}
          onChange={(e) => setAceptaTerminos(e.target.checked)}
          required
          className="mt-0.5"
        />
        <span>
          Acepto los{" "}
          <a href="/terminos" target="_blank" rel="noreferrer" className="underline hover:text-[var(--color-texto)]">
            Términos y Condiciones
          </a>{" "}
          y el{" "}
          <a href="/privacidad" target="_blank" rel="noreferrer" className="underline hover:text-[var(--color-texto)]">
            Aviso de Privacidad
          </a>
          .
        </span>
      </label>

      <div className="mt-4">
        <Turnstile ref={turnstileRef} onVerify={setCaptchaToken} />
      </div>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={enviando || !aceptaTerminos || (Boolean(CAPTCHA_SITE_KEY) && !captchaToken)}
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)", boxShadow: "var(--halo-accion)" }}
        className="mt-6 w-full rounded-lg px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {enviando ? "Creando tu cuenta…" : "Empezar prueba gratis de 14 días"}
      </button>

      <p className="mt-3 text-center text-xs text-[var(--color-texto-mute)]">Sin tarjeta de crédito. Cancela cuando quieras.</p>
    </form>
  );
}
