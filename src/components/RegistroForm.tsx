"use client";

import { useRef, useState, type FormEvent } from "react";
import { CAPTCHA_SITE_KEY, Turnstile, type TurnstileHandle } from "@/components/Turnstile";
import { PAISES_TELEFONO, CODIGO_PAIS_POR_DEFECTO } from "@/lib/paises-telefono";
import { NICHOS } from "@/lib/nichos";
import { PAQUETES, type Paquete } from "@/lib/planes";

// Mismo dominio donde vive la plataforma -- el endpoint público de registro
// (/api/registro-publico) tiene CORS abierto solo para este origen.
const URL_REGISTRO = "https://app.lexyondigital.com.mx/api/registro-publico";

const inputClase =
  "w-full rounded-lg border border-[var(--color-borde)] bg-[var(--color-bg-elevada)] px-3 py-2.5 text-sm text-[var(--color-texto)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-marca)]";

function pesos(monto: number) {
  return `$${monto.toLocaleString("es-MX")}`;
}

// planInicial: viene de /registro?plan=… (los botones de /precios). Sin él
// se preselecciona el paquete destacado.
export function RegistroForm({ planInicial }: { planInicial?: Paquete["clave"] | null }) {
  const [plan, setPlan] = useState<Paquete["clave"]>(planInicial ?? PAQUETES.find((p) => p.destacado)?.clave ?? PAQUETES[0].clave);
  const [periodo, setPeriodo] = useState<"mensual" | "anual">("mensual");
  const [nombreCuenta, setNombreCuenta] = useState("");
  const [giro, setGiro] = useState("");
  const [nicho, setNicho] = useState("");
  const [nichoOtro, setNichoOtro] = useState("");
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

    if (nicho === "otro" && !nichoOtro.trim()) {
      setError("Cuéntanos cuál es tu nicho.");
      return;
    }

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
        nicho,
        nicho_otro: nichoOtro,
        nombre_admin: nombreAdmin,
        telefono_admin: telefonoConCodigo,
        email_admin: emailAdmin,
        sitio_web: sitioWeb,
        turnstile_token: captchaToken,
        turnstile_token_correo: turnstileTokenCorreo,
        plan_elegido: plan,
        periodo_elegido: periodo,
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
        <p className="mt-2 text-sm text-[var(--color-texto-mute)]">
          Elegiste el plan <strong className="text-[var(--color-texto)]">{PAQUETES.find((p) => p.clave === plan)?.nombre}</strong> ({periodo}): lo
          contratas desde Mi plan cuando quieras, antes de que termine la prueba.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="rounded-2xl border border-[var(--color-borde)] bg-[var(--color-tarjeta)] p-6 sm:p-8">
      <fieldset className="mb-6">
        <legend className="mb-1 text-sm font-medium text-[var(--color-texto)]">¿Qué plan te interesa?</legend>
        <p className="mb-3 text-xs text-[var(--color-texto-mute)]">
          La prueba de 14 días es gratis y sin tarjeta. Al terminar contratas este plan (o cambias a otro) desde la plataforma.
        </p>
        <div className="mb-3 flex rounded-lg border border-[var(--color-borde)] p-0.5 text-xs" role="group" aria-label="Periodo de pago">
          {(["mensual", "anual"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPeriodo(p)}
              aria-pressed={periodo === p}
              className={`flex-1 rounded-md px-3 py-1.5 font-medium transition-colors ${
                periodo === p ? "bg-[var(--color-accion)] text-[var(--color-accion-fg)]" : "bg-transparent text-[var(--color-texto-mute)]"
              }`}
            >
              {p === "anual" ? "Anual (2 meses gratis)" : "Mensual"}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {PAQUETES.map((p) => {
            const elegido = plan === p.clave;
            return (
              <label
                key={p.clave}
                // Color de borde en línea: el "* { border-color }" de globals.css
                // no está en una capa y le gana a las clases de Tailwind.
                className={`flex cursor-pointer items-start gap-3 rounded-xl p-3 transition-colors ${elegido ? "border-2" : "border"}`}
                style={{ borderColor: elegido ? "var(--color-accion)" : "var(--color-borde)" }}
              >
                <input type="radio" name="plan" value={p.clave} checked={elegido} onChange={() => setPlan(p.clave)} className="mt-1" />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <span className="font-semibold text-[var(--color-texto)]">
                      {p.nombre}
                      {p.destacado && <span className="ml-2 text-[10px] font-semibold uppercase text-[var(--color-marca)]">Más elegido</span>}
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-texto)]">
                      {pesos(periodo === "anual" ? p.anual : p.mensual)}
                      <span className="ml-1 text-xs font-normal text-[var(--color-texto-mute)]">{periodo === "anual" ? "/año" : "/mes"} + IVA</span>
                    </span>
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--color-texto-mute)]">{p.para}</span>
                </span>
              </label>
            );
          })}
        </div>
        <a href="/precios" target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-[var(--color-texto-mute)] underline hover:text-[var(--color-texto)]">
          Comparar planes a detalle
        </a>
      </fieldset>

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
          <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">Nicho (opcional)</span>
          <select value={nicho} onChange={(e) => setNicho(e.target.value)} className={inputClase}>
            <option value="">Sin definir</option>
            {NICHOS.map((n) => (
              <option key={n.clave} value={n.clave}>
                {n.etiqueta}
              </option>
            ))}
          </select>
        </label>

        {nicho === "otro" && (
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[var(--color-texto)]">¿Cuál es tu nicho?</span>
            <input
              value={nichoOtro}
              onChange={(e) => setNichoOtro(e.target.value)}
              required
              className={inputClase}
              placeholder="Ej. Limpieza de albercas"
            />
          </label>
        )}

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
