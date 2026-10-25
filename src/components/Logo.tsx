import Image from "next/image";

// Mismo isotipo + wordmark que app.lexyondigital.com.mx (logo oficial del
// león en /public/logo.png + "Lexyon" en texto sólido + "Digital" en
// degradado), para que la marca se vea idéntica entre el sitio de
// marketing y la plataforma.
export function Logo({ tamaño = "md" }: { tamaño?: "sm" | "md" | "lg" }) {
  const alturaTexto = tamaño === "sm" ? "text-lg" : tamaño === "lg" ? "text-3xl" : "text-2xl";
  const tamañoIcono = tamaño === "sm" ? 28 : tamaño === "lg" ? 44 : 36;

  return (
    <div className="flex items-center gap-2.5">
      <Image
        src="/logo.png"
        alt="Logotipo de LexyonDigital"
        width={tamañoIcono}
        height={tamañoIcono}
        className="shrink-0 rounded-[22%] object-cover"
      />
      <span className={`${alturaTexto} font-bold text-[var(--color-texto)]`}>
        Lexyon
        <span
          style={{
            backgroundImage: "linear-gradient(90deg, #a855f7, #ec4899, #ffb020, #35d6c4)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Digital
        </span>
      </span>
    </div>
  );
}
