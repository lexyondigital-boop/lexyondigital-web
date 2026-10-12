import { TallerForm } from "@/components/admin/TallerForm";
import { crearTaller } from "@/lib/talleres-actions";

export default function NuevoTallerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-texto)]">Nuevo taller</h1>
      <div className="mt-6">
        <TallerForm accion={crearTaller} />
      </div>
    </div>
  );
}
