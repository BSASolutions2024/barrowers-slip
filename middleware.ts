// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ['/borrowers-list']
// const publicRoutes = ['/', '/login', '/signup']
export default async function middleware(req:NextRequest) {
    
//     const path = req.nextUrl.pathname
//     const isProtectedRoute = protectedRoutes.includes(path)
//     const isPublicRoute = publicRoutes.includes(path)

//     const cookie = cookies().get('token')?.value

//     console.log({cookie})
//     // const session = await decrypt(cookie)

//     // If accessing a protected route without a valid cookie, redirect to login
//     if (isProtectedRoute && !cookie) {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }

//     return NextResponse.next();
}

// export const config = {
//     matcher: ['/borrowers-list', '/api'], // Update with your routes
// };