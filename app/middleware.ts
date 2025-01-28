import { NextResponse, type NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function middleware(request: NextRequest) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return user;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
