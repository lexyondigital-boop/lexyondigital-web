import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Solo necesario bajo /admin -- el resto del sitio es estático y no
// involucra sesión de Supabase.
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: ["/admin/:path*"],
};
