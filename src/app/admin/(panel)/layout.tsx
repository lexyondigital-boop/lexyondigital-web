import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { obtenerSesionAdmin } from "@/lib/session";

const NAV = [
  { href: "/admin", label: "Inicio" },
  { href: "/admin/talleres", label: "Talleres" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/tendencias", label: "Tendencias" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = await obtenerSesionAdmin();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 shrink-0 flex-col border-r border-[var(--color-borde)] bg-[var(--color-bg-elevada)] p-4">
        <Link href="/" className="mb-6">
          <Logo tamaño="sm" />
        </Link>
        <nav className="flex-1 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-texto)] hover:bg-[var(--color-bg)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="space-y-2 border-t border-[var(--color-borde)] pt-3">
          <p className="truncate px-3 text-xs text-[var(--color-texto-mute)]">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 bg-[var(--color-bg)] p-6 sm:p-8">{children}</main>
    </div>
  );
}
