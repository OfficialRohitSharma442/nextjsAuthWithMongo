import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/_next')) {
        return NextResponse.next();
    }
    const isPublicPath = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register";
    console.log({ isPublicPath })
    const token = request.cookies.get("token") || "";
    console.log({ token })
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
    if (!isPublicPath && !token) {
        console.log("url", request.nextUrl)
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}
export const config = {
    // This property should be named `path` instead of `matcher`
    macher: [
        // '/((?!api|_next/static|_next/image|favicon.ico).*)',
        "/",
        // "/login",
        "/register",
        // '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ],
}
