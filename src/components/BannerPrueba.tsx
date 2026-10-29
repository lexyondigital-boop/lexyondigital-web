// Sello de la prueba gratis: el "14 días gratis" tiene que verse antes que
// cualquier otra cosa en /registro y /precios. Fondo y texto con
// --color-accion / --color-accion-fg (legibles en los cuatro temas) y el
// degradado de marca solo como marco -- texto encima del degradado no se
// lee en la parte amarilla y turquesa.
export function BannerPrueba({ compacto = false }: { compacto?: boolean }) {
  return (
    <div className="mx-auto w-fit max-w-full rounded-2xl p-[3px] shadow-lg" style={{ background: "var(--gradiente-marca)" }}>
      <div
        className={`flex items-center gap-3 rounded-[13px] text-left ${compacto ? "px-4 py-2.5" : "px-5 py-3.5 sm:px-6"}`}
        style={{ background: "var(--color-accion)", color: "var(--color-accion-fg)" }}
      >
        <span className={`shrink-0 font-black leading-none tracking-tight ${compacto ? "text-3xl" : "text-4xl sm:text-5xl"}`}>14</span>
        <span className="min-w-0">
          <span className={`block font-extrabold uppercase leading-tight tracking-wide ${compacto ? "text-sm" : "text-base sm:text-lg"}`}>
            días gratis 🎁
          </span>
          <span className="block text-xs font-medium opacity-90">Sin tarjeta de crédito · Con todo lo del plan Profesional · Cancela cuando quieras</span>
        </span>
      </div>
    </div>
  );
}
