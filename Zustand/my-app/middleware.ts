// middleware.ts (프로젝트 루트에)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 쿠키에서 인증 상태 확인
    const authCookie = request.cookies.get("auth-storage")?.value;
    let isAuthenticated = false;

    if (authCookie) {
        try {
            const authData = JSON.parse(authCookie);
            isAuthenticated = authData.state?.isAuthenticated === true;
        } catch {
            isAuthenticated = false;
        }
    }

    // 인증이 필요한 페이지들
    const protectedRoutes = ["/dashboard"];

    // 인증된 사용자가 접근하면 안 되는 페이지들
    const guestOnlyRoutes = ["/login", "/signup", "/find-account"];

    // 보호된 라우트 접근 시
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    // 게스트 전용 라우트 접근 시
    if (guestOnlyRoutes.some((route) => pathname.startsWith(route))) {
        if (isAuthenticated) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
